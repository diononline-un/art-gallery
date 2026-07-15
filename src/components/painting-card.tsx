import Link from "next/link";

type PaintingCardProps = {
  id: string;
  title: string;
  imageUrl: string;
  priceEur: number;
  status: "available" | "sold" | "reserved";
};

function formatPrice(cents: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}

export function PaintingCard({ id, title, imageUrl, priceEur, status }: PaintingCardProps) {
  const isSold = status === "sold";
  const isReserved = status === "reserved";

  return (
    <Link href={`/gallery/${id}`} className="group block relative overflow-hidden">
      <div className="aspect-[3/4] relative overflow-hidden bg-mist">
        <img
          src={imageUrl}
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${isSold ? "grayscale opacity-70" : ""}`}
          loading="lazy"
        />
        {isReserved && (
          <div className="absolute inset-0 bg-charcoal/10 flex items-center justify-center backdrop-blur-[2px]">
              <span className="font-display text-lg text-charcoal/70 italic">Reserviert</span>
          </div>
        )}
      </div>
      <div className="mt-3 flex justify-between items-baseline">
        <h3 className="text-sm font-medium tracking-wide">{title}</h3>
        <span className={`text-sm ${isSold ? "text-charcoal/30 line-through" : "text-charcoal/70"}`}>
          {formatPrice(priceEur)}
        </span>
      </div>
    </Link>
  );
}
