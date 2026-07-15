"use client";

import { useState, useEffect } from "react";
import { PaintingCard } from "@/components/painting-card";
import { Painting } from "@/lib/types";

export function GalleryClient({ initialPaintings }: { initialPaintings: Painting[] }) {
  const [paintings, setPaintings] = useState(initialPaintings);

  useEffect(() => {
    fetch("/api/paintings.php")
      .then((res) => res.json())
      .then((data: { paintings: Painting[] }) => setPaintings(data.paintings))
      .catch(() => {});
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-16 px-6">
      <div className="mb-12">
        <h1 className="font-display text-3xl mb-2">Galerie</h1>
        <p className="text-charcoal/50">{paintings.length} Werke</p>
      </div>

      {paintings.length === 0 ? (
        <div className="py-24 text-center text-charcoal/40">
          <p className="font-display text-xl">Noch keine Werke.</p>
          <p className="text-sm mt-2">Der nächste Drop kommt bald.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paintings.map((p) => (
            <PaintingCard key={p.id} id={p.id} title={p.title} imageUrl={p.imageUrl} priceEur={p.priceEur} status={p.status} />
          ))}
        </div>
      )}
    </div>
  );
}
