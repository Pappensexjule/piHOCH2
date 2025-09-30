# piHOCH2 — LIVE Starter (#fuckyouhoch2)

Minimal, DE‑rechtlich vorsichtig, Vercel‑ready.

## Deploy (Vercel)
1) Neues Projekt in Vercel anlegen → ZIP importieren.
2) Framework: Next.js (App Router).
3) Build: `npm run build` → Output `.next`.
4) Optional ENV (später): `STRIPE_PUBLIC_KEY`, `STRIPE_SECRET_KEY` — **keine realen Keys ins Repo!**

## Struktur
- `/app` — Seiten (Manifest, Produkte, Therapeut, Recht)
- `/public/branding` — Logos (SVG: #fuckyouhoch2, Lotus)
- `/public/images` — Portrait/Medien (bereitgestellt)
- `/components`, `/styles` — für Erweiterungen

## Recht
- Impressum/Datenschutz = Vorlagen. Bitte Firmierung/Adresse ergänzen & prüfen lassen.
- Foto/„Lars Kreuznacht“ = Avatar auf Basis bereitgestellter Medien (keine realen Personen).

## To‑Do nach Live
- Produkte anlegen + Stripe Checkout anbinden.
- CI verfeinern (Farben/Typo).
- Inhalte (Transkripte/Story/Profil) einpflegen.
