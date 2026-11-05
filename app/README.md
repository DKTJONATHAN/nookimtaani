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

The root `package.json` forwards build commands into `app/`. GitHub Actions verifies this same root-level build and Wrangler dry-run on changes. The root `wrangler.jsonc` deploys `app/worker.js` and serves `app/dist/` as Cloudflare Static Assets. This means Cloudflare can use the repository root as its build directory without accidentally serving the old static prototype.

## Cloudflare deployment
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy --config wrangler.jsonc`
- Worker: `nooki-mtaani`
- Worker entry: `app/worker.js`
- Assets: `app/dist/`

Follow `../CLOUDFLARE-WORKERS-R2-PROMPT.md` for the D1 and private R2 backend plan. Keep R2 private and use Worker-mediated access checks.

## Implemented platform workflows
The React app and Worker contain account registration and email verification, sign-in, published space discovery, booking requests, host applications and listing submissions, private R2 evidence uploads, host booking decisions, Daraja STK initiation and callback recording, an Access-protected operations workspace, manual payment reconciliation, disputes, account export and account closure.

## Launch checks still required
These code paths must be tested against the actual Cloudflare D1/R2 bindings, Turnstile, Resend and Daraja sandbox credentials. Payment callbacks are not proof of settlement: an administrator must reconcile the receipt and amount against Safaricom before confirming a booking. Availability calendar management, automated refunds/payouts, wallet/escrow and independent identity/property verification are not implemented. Do not present these as available.
