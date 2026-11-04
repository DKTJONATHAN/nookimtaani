# Cloudflare Workers + R2 implementation prompt — Nooki Mtaani

Build Nooki Mtaani as a production-minded neighbourhood micro-storage marketplace for small merchants, online sellers, event vendors and growing local businesses. Do not turn it into a generic office, accommodation or warehouse directory. The initial wedge is small secure spaces rented flexibly by day/week/month. Treat demand as unvalidated until interviews and real paid pilot bookings prove it.

## Product scope
Implement real renter, host and operations workflows: search by area/period/size/budget; listing detail with measured capacity, permitted goods, access hours, security, restrictions and genuine photos; host application; host identity and authority verification; availability and booking requests; plain-language terms and full price; booking lifecycle; check-in/out photo evidence; incident/dispute reporting; admin moderation. Hide exact addresses until a booking is confirmed. Never seed fake live inventory, testimonials, reviews, booking counts or verified badges. Seed data must be visibly labelled DEMO and disabled in production.

## Cloudflare stack
- Cloudflare Workers + Static Assets for the website and API routes.
- D1 for relational records: users, profiles, host applications, spaces, media metadata, availability, bookings, booking events, payment intents, payment callbacks, disputes, verification records, audit events.
- R2 bucket binding `MEDIA` (bucket name configured by owner) for private listing photos, identity/property evidence, booking handover photos and dispute evidence. Use separate prefixes: `listings/{spaceId}/...`, `verification/{userId}/...`, `bookings/{bookingId}/checkin/...`, `bookings/{bookingId}/checkout/...`, `disputes/{caseId}/...`. Never use user-provided object keys directly.
- R2 private by default. Serve files only through authenticated Worker routes or short-lived signed URLs. Validate MIME type, file size, extension, ownership, booking membership and upload purpose. Generate random object keys server-side. Strip EXIF metadata where practical. Never expose R2 access keys in browser code.
- D1 migrations, indexes, foreign keys, uniqueness constraints, transactions and explicit status transitions. Use prepared statements and parameterized queries. Enforce owner/renter/admin authorization on every endpoint. Avoid trusting client-provided user IDs or payment status.
- Cloudflare Turnstile for public host enquiry/signup where appropriate, rate limits, CSRF protection for cookie sessions, secure HttpOnly/SameSite cookies, password hashing or a reputable auth provider, email verification, account deletion/export, privacy retention policy.
- Optional R2 custom domain only for genuinely public, non-sensitive listing images after moderation. Do not expose private identity documents or handover evidence through a public bucket/domain.
- Use Queues for asynchronous image processing/notifications only if needed; add retries and dead-letter handling. Add scheduled cleanup for expired upload intents and retention-policy tasks.
- Add `/api/health` endpoint; structured logs with PII redaction.

## Payments (Kenya)
Integrate Safaricom Daraja only after credentials and callback URL are supplied. Store credentials as Worker secrets. Initiate STK push server-side; validate callback authenticity and reconcile status server-side; make callbacks idempotent with unique provider transaction IDs and durable event logs. Never mark paid based on frontend response. Do not implement wallet/escrow or payouts until legal and provider approval. Include cancellation/refund/dispute policy and clear fees before payment.

## Required deliverables
- Complete responsive interface and API, D1 schema/migrations, R2 upload/download endpoints, access policies, tests, seed/demo strategy, privacy/terms/cancellation content, admin moderation view, deployment docs, environment-variable matrix and backup/restore plan.
- Cloudflare setup instructions: create Worker, D1 database, R2 bucket, bindings, Turnstile widget, secrets, custom domain, deploy, test upload and restore.
- Use environment names: `DB` (D1), `MEDIA` (R2), `TURNSTILE_SECRET_KEY`, `DARAJA_CONSUMER_KEY`, `DARAJA_CONSUMER_SECRET`, `DARAJA_PASSKEY`, `DARAJA_SHORTCODE`, `DARAJA_CALLBACK_URL`, `SESSION_SECRET`, `PUBLIC_APP_URL`. Store secrets only with `wrangler secret put`; public site key may be a non-secret variable.
- Never claim that verification, payment, notifications, storage or bookings work until tested against the live Cloudflare resources. No production deploy or DNS change without owner approval.

## Anti-slop and acceptance
Use a distinctive, practical Kenyan neighbourhood identity, not generic SaaS template styling. Strong typography, real product content, calm colour, meaningful empty/error/loading states, accessible labels and keyboard operation, visible focus, 44px touch targets, responsive 320–1440px, reduced-motion support, no transition:all, no fake urgency, no invented reviews. Use shadcn/ui/Radix only if React is selected and components genuinely help; don't install a template wholesale. Add Playwright end-to-end tests for search, host application, auth, listing moderation, booking lifecycle, private R2 access and payment callback idempotency. Record pass/fail evidence in the checklist.