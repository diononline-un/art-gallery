"use client";

import { useState, useEffect } from "react";
import { Painting, Drop } from "@/lib/types";

function formatPrice(cents: number): string {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(cents / 100);
}

export function AdminClient() {
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [drops, setDrops] = useState<Drop[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"paintings" | "drops">("paintings");
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);

  function authHeaders() {
    return { "X-Admin-Key": password };
  }

  useEffect(() => {
    fetch("/api/paintings.php")
      .then((r) => r.json())
      .then((d) => {
        setPaintings(d.paintings ?? []);
        setDrops(d.drops ?? []);
        setLoading(false);
      });
  }, []);

  async function updateStatus(id: string, status: string) {
    if (!authed) return alert("Bitte zuerst Passwort eingeben.");
    const res = await fetch("/api/admin.php", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify({ action: "updateStatus", id, status }),
    });
    if (res.ok) {
      setPaintings((prev) => prev.map((p) => (p.id === id ? { ...p, status: status as any } : p)));
    } else {
      alert("Fehler: " + (await res.text()));
    }
  }

  async function toggleDropPublished(id: string, isPublished: boolean) {
    if (!authed) return alert("Bitte zuerst Passwort eingeben.");
    const res = await fetch("/api/admin.php", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify({ action: "toggleDrop", id, isPublished }),
    });
    if (res.ok) {
      setDrops((prev) => prev.map((d) => (d.id === id ? { ...d, isPublished } : d)));
    } else {
      alert("Fehler: " + (await res.text()));
    }
  }

  if (loading) return <div className="py-24 text-center"><p>Lade…</p></div>;

  return (
    <div className="max-w-7xl mx-auto py-16 px-6">
      <h1 className="font-display text-3xl mb-8">Admin</h1>

      <div className="mb-6 flex items-center gap-4">
        <input
          type="password"
          placeholder="Admin-Passwort"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setAuthed(false); }}
          className="border border-mist px-4 py-2 text-sm w-48"
        />
        <button
          onClick={async () => {
            const res = await fetch("/api/admin.php", { headers: { "X-Admin-Key": password } });
            if (res.ok) setAuthed(true);
            else alert("Falsches Passwort");
          }}
          className="text-sm uppercase tracking-widest px-4 py-2 bg-charcoal text-bone hover:bg-charcoal/80"
        >
          Login
        </button>
        {authed && <span className="text-xs text-sage">✓ Eingeloggt</span>}
      </div>

      <div className="flex gap-6 mb-8 border-b border-mist">
        <button onClick={() => setTab("paintings")} className={`pb-3 text-sm uppercase tracking-widest transition-colors ${tab === "paintings" ? "text-charcoal border-b-2 border-charcoal" : "text-charcoal/40 hover:text-charcoal"}`}>
          Werke ({paintings.length})
        </button>
        <button onClick={() => setTab("drops")} className={`pb-3 text-sm uppercase tracking-widest transition-colors ${tab === "drops" ? "text-charcoal border-b-2 border-charcoal" : "text-charcoal/40 hover:text-charcoal"}`}>
          Drops
        </button>
      </div>

      {tab === "paintings" && (
        <div className="space-y-3">
          {paintings.map((p) => (
            <div key={p.id} className="border border-mist p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img src={p.imageUrl} alt="" className="w-16 h-12 object-cover" />
                <div>
                  <p className="text-sm font-medium">{p.title}</p>
                  <p className="text-xs text-charcoal/50">{formatPrice(p.priceEur)}</p>
                </div>
              </div>
              <div className="flex gap-2">
                {(["available", "reserved", "sold"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(p.id, s)}
                    className={`text-xs uppercase tracking-widest px-3 py-1 border transition-colors ${
                      p.status === s
                        ? s === "sold" ? "bg-charcoal/10 border-charcoal/30 text-charcoal/40"
                          : s === "available" ? "bg-sage/10 border-sage text-sage"
                          : "bg-clay/10 border-clay text-clay"
                        : "border-mist text-charcoal/30 hover:border-charcoal/30"
                    }`}
                  >
                    {s === "available" ? "Verfügbar" : s === "sold" ? "Verkauft" : "Reserviert"}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "drops" && (
        <div className="space-y-3">
          {drops.map((d) => (
            <div key={d.id} className="border border-mist p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{d.title}</p>
                <p className="text-xs text-charcoal/50">
                  {new Date(d.publishAt).toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
              <button
                onClick={() => toggleDropPublished(d.id, !d.isPublished)}
                className={`text-xs uppercase tracking-widest px-3 py-1.5 border transition-colors ${d.isPublished ? "border-sage text-sage hover:bg-sage/10" : "border-clay text-clay hover:bg-clay/10"}`}
              >
                {d.isPublished ? "Veröffentlicht" : "Geplant"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
