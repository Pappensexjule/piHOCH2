# CHIBot – Secret Internal Bot (piHOCH2)

This bundle adds a **secret, token-protected** CHIBot to your Next.js project.
It supports both `pages/` and `app/` routers. Keep your secrets in Vercel.

## Files in this bundle
- `pages/api/chi.ts` – API route for Pages Router (only used if your project has `pages/`)
- `app/api/chi/route.ts` – API route for App Router (only used if your project has `app/`)
- `pages/chi.tsx` – Minimal private console UI (only accessible with your secret)
- `.env.example` – Example of the required environment variables

## Required Vercel Environment Variables
- `OPENAI_API_KEY` = your OpenAI key
- `CHI_SECRET` = a strong random string
- `NEXT_PUBLIC_CHI_SECRET` = same value as `CHI_SECRET`

## Deploy
1) Upload these files into your GitHub repo (preserve folders).
2) In Vercel: Project → Settings → Environment Variables → add the three vars above.
3) Trigger a redeploy (push or "Redeploy").
4) Test:
   - POST https://<your-domain>/api/chi  with header `x-secret-token: <your secret>`
   - Open https://<your-domain>/chi  and chat (the page sends the token from env).

## Notes
- No logs are stored. Add your own logging if needed.
- Changing `CHI_SECRET` immediately invalidates all previous access.
- If both routers exist, Next.js will pick the one matching your project config.
