# Product and interface standards

Use these references when building Nooki:
- Anthropic frontend-design: https://github.com/anthropics/skills/tree/main/skills/frontend-design
- Vercel Web Interface Guidelines: https://vercel.com/design/guidelines
- shadcn/ui: https://ui.shadcn.com/
- Radix UI: https://www.radix-ui.com/
- Lucide: https://lucide.dev/

## Product-first workflow
1. Build around the micro-storage renter and host workflows in PRODUCT-DIRECTION-2026.md.
2. Do not add a feature unless it improves discovery, trust, booking, handover, payment or support.
3. Use real listing data only. Label seed/demo records clearly in development.
4. Do not invent reviews, hosts, booking counts, occupancy rates, safety claims or payment success.
5. Do not call a space verified until a documented verification step has passed.
6. Design empty, loading, error, success, cancellation and dispute states.
7. Use mobile-first layouts that work on low-bandwidth connections and small Android screens.

## Anti-AI-slop visual rules
- No generic SaaS dashboard template, gradient blobs, glassmorphism, random floating cards or identical card grids.
- No excessive animations, autoplay or parallax.
- Choose type, colour and layout from the physical subject: neighbourhood spaces, storage, trust and access.
- Use a single memorable visual signature; keep controls and booking flows calm and legible.
- Use shadcn/ui and Radix primitives for standard interactions; customise tokens and composition rather than copying a full template.
- Use Lucide icons, not emoji icons.
- Respect prefers-reduced-motion and visible keyboard focus.

## Security and release
- Enforce per-user access in database policies.
- Never expose service-role keys or payment secrets to the browser.
- Verify M-Pesa/provider callbacks on the server and make payment processing idempotent.
- Do not implement an unlicensed wallet or escrow.
- Run lint, typecheck, tests and production build; review mobile and desktop screenshots before release.
- Do not deploy or merge until every quality-gate item in PRODUCT-DIRECTION-2026.md has evidence and the user approves the release.
