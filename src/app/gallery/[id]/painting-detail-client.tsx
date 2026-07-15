"use client";

import Link from "next/link";
import { useState } from "react";
import { Painting } from "@/lib/types";

function formatPrice(cents: number): string {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(cents / 100);
}

export function PaintingDetailClient({ initial }: { initial: Painting }) {
  const [painting, setPainting] = useState(initial);

  const isAvailable = painting.status === "available";
  const isSold = painting.status === "sold";
  const isReserved = painting.status === "reserved";

  const revolutUrl = `https://revolut.me/hinterland_payment?amount=${painting.priceEur}&description=${encodeURIComponent(painting.title)}&note=${encodeURIComponent(painting.title)}`;

  return (
    <div className="max-w-7xl mx-auto py-16 px-6">
      <Link href="/gallery" className="text-xs uppercase tracking-widest text-charcoal/40 hover:text-charcoal transition-colors mb-8 inline-block">
        ← Zurück zur Galerie
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="aspect-[3/4] relative bg-mist overflow-hidden">
          <img
            src={painting.imageUrl}
            alt={painting.title}
            className={`w-full h-full object-cover ${isSold ? "grayscale opacity-70" : ""}`}
          />
          {isReserved && (
            <div className="absolute inset-0 bg-charcoal/10 flex items-center justify-center backdrop-blur-[2px]">
              <span className="font-display text-xl text-charcoal/70 italic">Reserviert</span>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="font-display text-3xl mb-2">{painting.title}</h1>
          <p className={`text-2xl mb-6 ${isSold ? "text-charcoal/30 line-through" : "text-charcoal/60"}`}>
            {formatPrice(painting.priceEur)}
          </p>

          {painting.description && (
            <p className="text-charcoal/60 leading-relaxed mb-8">{painting.description}</p>
          )}

          <div className="flex gap-3 mb-8">
            <span className={`text-xs uppercase tracking-widest px-3 py-1 border ${
              isAvailable ? "border-sage text-sage" : isSold ? "border-charcoal/20 text-charcoal/30" : "border-clay text-clay"
            }`}>
              {isAvailable ? "Verfügbar" : isSold ? "Verkauft" : "Reserviert"}
            </span>
          </div>

          {isAvailable && (
            <div className="space-y-4">
              <a href={revolutUrl} target="_blank" rel="noopener noreferrer"
                className="block w-full bg-charcoal text-bone py-3 text-center text-sm uppercase tracking-widest hover:bg-charcoal/80 transition-colors">
                Jetzt kaufen über Revolut
              </a>
              <p className="text-xs text-charcoal/40 leading-relaxed">
                Sie werden zu Revolut weitergeleitet. Bitte geben Sie bei der Überweisung den Werktitel &bdquo;{painting.title}&rdquo; als Verwendungszweck an. Das Werk wird nach Zahlungseingang als verkauft markiert.
              </p>
              <p className="text-xs text-charcoal/40 leading-relaxed">
                Bei einer Direktübergabe mit dem Künstler vor Ort sind individuell abweichende Konditionen nach Absprache möglich (u. a. Barzahlung).
              </p>
            </div>
          )}

          {!isAvailable && (
            <p className="text-sm text-charcoal/40 italic">
              {isSold
                ? "Dieses Werk ist verkauft. Halten Sie Ausschau nach dem nächsten Drop."
                : "Dieses Werk ist reserviert und erwartet die Zahlung."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
