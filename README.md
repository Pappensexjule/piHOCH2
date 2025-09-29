# piHOCH2 · Live-Dashboard (Next.js + Tailwind + Recharts)

## Schnellstart
```bash
# 1) Projekt holen
npm install

# 2) Entwicklung
npm run dev

# 3) Produktion
npm run build && npm start
```

## Stack
- Next.js (App Router)
- Tailwind CSS (Dark/Black Theme)
- Recharts (Wellen & Ticker)
- lucide-react (Icons)

## Dateien
- `app/layout.tsx` — globales Layout + Dark Theme
- `app/page.tsx` — Einstieg, rendert das Dashboard
- `components/Dashboard.tsx` — Dashboard-Komponente
- `styles/globals.css` — Tailwind
- `tailwind.config.js`, `postcss.config.js`, `next.config.mjs`, `tsconfig.json`

## Hinweise
- Zahlen sind aktuell Dummy-Daten (Balance=€2). Anbindung an echte Quellen erfolgt per API/CSV-Import.
- Für Stripe/PayPal Buttons später API-Keys/Links hinterlegen.
- Für Vercel-Deploy: Repo pushen → Vercel importieren → build starten.
