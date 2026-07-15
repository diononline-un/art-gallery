"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PaintingCard } from "@/components/painting-card";
import { Countdown } from "@/components/countdown";
import { Painting, Drop } from "@/lib/types";

type Props = {
  initialPaintings: Painting[];
  initialNextDrop: Drop | null;
  initialLatestDrop: Drop | null;
};

export function HomeClient({ initialPaintings, initialNextDrop, initialLatestDrop }: Props) {
  const [paintings, setPaintings] = useState(initialPaintings);
  const [nextDrop, setNextDrop] = useState(initialNextDrop);
  const [latestDrop, setLatestDrop] = useState(initialLatestDrop);

  useEffect(() => {
    fetch("/api/paintings.php")
      .then((res) => res.json())
      .then((data: { paintings: Painting[]; drops: Drop[] }) => {
        setPaintings(data.paintings);
        const pub = data.drops.filter((d) => d.isPublished).sort((a, b) => +new Date(b.publishAt) - +new Date(a.publishAt));
        const unpub = data.drops.filter((d) => !d.isPublished).sort((a, b) => +new Date(a.publishAt) - +new Date(b.publishAt));
        setLatestDrop(pub[0] ?? null);
        setNextDrop(unpub[0] ?? null);
      })
      .catch(() => {});
  }, []);

  const currentDropPaintings = latestDrop
    ? paintings.filter((p) => p.dropId === latestDrop.id).sort((a, b) => a.sortOrder - b.sortOrder)
    : [];

  return (
    <div>
      <section className="py-24 px-6 text-center">
        <h1 className="font-display text-4xl md:text-6xl tracking-wide">
          Sebastian Maria Otto
        </h1>
      </section>

      {nextDrop && (
        <section className="py-16 px-6 border-t border-mist">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-charcoal/40 mb-6">Nächster Drop</p>
            <h2 className="font-display text-2xl mb-8">{nextDrop.title}</h2>
            <Countdown targetDate={nextDrop.publishAt} />
          </div>
        </section>
      )}

      {latestDrop && currentDropPaintings.length > 0 && (
        <section className="py-16 px-6 border-t border-mist">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-baseline justify-between mb-10">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-charcoal/40 mb-2">Aktueller Drop</p>
                <h2 className="font-display text-2xl">{latestDrop.title}</h2>
              </div>
              <Link href="/gallery" className="text-sm uppercase tracking-widest text-charcoal/50 hover:text-charcoal transition-colors">
                Alle anzeigen →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentDropPaintings.map((p) => (
                <PaintingCard key={p.id} id={p.id} title={p.title} imageUrl={p.imageUrl} priceEur={p.priceEur} status={p.status} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
