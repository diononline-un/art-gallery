import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sebastian Maria Otto — Galerie",
  description: "Zeitgenössische skandinavische Kunst von Sebastian Maria Otto. Wöchentliche Drops mit Originalwerken.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${geistSans.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bone text-charcoal">
        <Nav />
        <main className="flex-1">{children}</main>
        <footer className="py-12 text-center text-sm text-charcoal/40 border-t border-mist">
          <p>© {new Date().getFullYear()} Sebastian Maria Otto. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
