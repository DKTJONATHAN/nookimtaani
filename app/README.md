# Nooki Mtaani — React + Cloudflare Workers

React 19 + Vite front-end for a neighbourhood micro-storage marketplace. The current interface is a front-end prototype. Search does not claim to find live listings, and the host interest form deliberately does not transmit or store personal details until the secure API is implemented.

## Local development
```bash
npm install
npm run dev
``

## Build and preview Worker
```bash
npm run build
npx wrangler dev
``

## Deploy
```bash
npm run deploy
``
The Worker currently serves static assets and a health endpoint only. It is not a live marketplace. Implement the D1 schema, private R2 upload/download routes, authentication, host verification, moderation, booking lifecycle and payment callback handling before accepting customers or personal information. Follow `../CLOUDFLARE-WORKERS-R2-PROMPT.md`.

R2 must be private by default. Do not expose identity documents, property evidence or booking handover photos through a public bucket or public custom domain.