---
status: in-development
progress: 45
version: "0.1.0"
tags: [nextjs, galerie, drops, php]
scope: "Kunst-Galerie mit wöchentlichen Drops, Galerie-Ansicht und Admin-Bereich als Next.js-Static-Export plus PHP-API für ALL-INKL"
last_updated: "2026-08-13"
next_steps:
  - Scripts scripts/export-static-data.ts und scripts/seed.ts anlegen (in package.json referenziert, fehlen im Repo)
  - Datenquelle vereinheitlichen: aktuell static paintings.json, SQLite-Dateien und MySQL-Schema parallel
  - README vom create-next-app-Template auf Projektbeschreibung umschreiben
  - Build/Deployment testen: next build + PHP-Export auf ALL-INKL-Zielumgebung
  - Docker-Compose für lokale Entwicklung einrichten und Port aus Ring vergeben
---

# Aktueller Stand
- Next.js 16.2.10 App (React 19, Tailwind 4, framer-motion, drizzle) mit Home, Gallery, Detailseite und Admin-Seite
- Home zeigt neuesten veröffentlichten Drop und Countdown zum nächsten unveröffentlichten Drop
- Daten aktuell aus static src/data/paintings.json (Seeds mit Fjord/Wald/Stein/Meer-Motiven), dazu ungenutzte SQLite-Dateien und MySQL-Schema für ALL-INKL-Hosting
- PHP-API (php/api/paintings.php, admin.php) für Hosting vorhanden, wird per postbuild-Script nach out/ kopiert
- Nur ein Commit, README noch Stock-Template, keine Docker-Infrastruktur, Scripts fehlen
