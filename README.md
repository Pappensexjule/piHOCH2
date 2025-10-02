# FINCHI Bootstrap (Φ) — Das Gehirn des Imperiums

Bereitgestellt: 2025-10-02T19:44:45.097376

## Was ist drin?
- **Mobile-First Fixes** (Viewport, Safe-Areas, Fluid Type, Tap Targets)
- **Kontrollbots** (GitHub Actions): Lighthouse Mobil, Uptime/Redirects, Playwright iPhone
- **Stripe Checkout**: API-Route + React-Button
- **FINCHI Landing**: Minimal-Startseite mit CTA

## Einmal hochladen & mergen (schnellste Route)
1. **GitHub → New Repository** (`pihoch2/imperium` oder Wunschname) → leer anlegen.
2. Lade **diese ZIP** hoch und entpacke im Repo (oder lokal entpacken und pushen).
3. Erstelle Branch: `release/0001-finchi-bootstrap` und committe alles hinein.
4. Öffne Pull Request gegen `main` → **Merge**.
5. **Vercel**: Repo verknüpfen, deployen. Domain `pihoch2.me` zuordnen.

## Env/Secrets
- Benenne `.env.local.example` in `.env.local` um und trage **Stripe Keys** ein.
- Setze in GitHub → Settings → Secrets zusätzlich (optional) `OP_SERVICE_ACCOUNT_TOKEN` für 1Password o.ä.
- In Stripe: Live-Mode aktiv + Allowed Origins (`https://pihoch2.me`).

## NPM
```
npm i
npm run build
npm start
```
oder für Dev: `npm run dev`

## Notes
- Workflows laufen automatisch nach Merge.
- Playwright erzeugt iPhone-Checks.
- Lighthouse warnt bei schlechten Mobil-Scores.
- Uptime checkt HTTPS/Redirects/TLS.

— π²
