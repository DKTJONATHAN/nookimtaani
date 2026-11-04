# Nooki Mtaani — Cloudflare Workers prototype

The `app/` directory contains the new micro-storage product interface. The current page is a front-end prototype: it intentionally shows no invented inventory and does not store host enquiry details. Authentication, D1, R2, verification, bookings and payments are not live yet.

## Local preview
```bash
cd app
npx wrangler dev
```

## Deploy the static prototype
```bash
npx wrangler deploy
```
This deploys the interface and a health endpoint only. It is not a live booking marketplace. Follow `../CLOUDFLARE-WORKERS-R2-PROMPT.md` to implement the actual backend, D1 schema, private R2 upload/download routes, auth, moderation and payment integration.

Do not connect a production domain or accept customer data until the backend and security tests pass.