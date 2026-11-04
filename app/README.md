# Nooki Mtaani — React + Cloudflare Workers

Nooki is a neighbourhood micro-storage marketplace concept for Kenyan small merchants, online sellers and growing businesses.

## Frontend architecture
- React 19 + Vite.
- Reusable components live under `app/src/components/`.
- Responsive, mobile-first interface with accessible navigation and reduced-motion support.
- No invented inventory, reviews, host profiles, prices or booking metrics.
- Host registration is preview-only until the secure API is connected.

## Local development
From the repository root:
```bash
npm install
npm run dev
npm run build
npx wrangler dev --config wrangler.jsonc
```

The root `package.json` forwards build commands into `app/`. The root `wrangler.jsonc` deploys `app/worker.js` and serves `app/dist/` as Cloudflare Static Assets. This means Cloudflare can use the repository root as its build directory without accidentally serving the old static prototype.

## Cloudflare deployment
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy --config wrangler.jsonc`
- Worker: `nooki-mtaani`
- Worker entry: `app/worker.js`
- Assets: `app/dist/`

Follow `../CLOUDFLARE-WORKERS-R2-PROMPT.md` for the D1 and private R2 backend plan. Keep R2 private and use Worker-mediated access checks.

## Current limitations
This is a designed React frontend, not yet a live booking marketplace. Authentication, D1 persistence, R2 uploads, host verification, availability, booking lifecycle, Daraja payment callbacks, moderation and dispute handling are not live. The preview host form does not send or store personal information.
