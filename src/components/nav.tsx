"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Start" },
  { href: "/gallery", label: "Galerie" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-bone/90 backdrop-blur-sm border-b border-mist">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-display text-xl tracking-wide text-charcoal hover:text-sage transition-colors">
          Sebastian Maria Otto
        </Link>
        <div className="flex gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm uppercase tracking-widest transition-colors ${
                pathname === l.href
                  ? "text-charcoal border-b border-charcoal pb-0.5"
                  : "text-charcoal/50 hover:text-charcoal"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
