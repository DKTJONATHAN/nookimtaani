# Nooki Mtaani — Cloudflare platform setup

This document describes the code that is currently present and the Cloudflare configuration still required. **A code deployment does not create D1/R2 resources or secrets automatically.**

## 1. Create Cloudflare resources

In Cloudflare Dashboard for the `nooki-mtaani` Worker:

1. Create a D1 database named `nooki-mtaani-db`.
2. Create an R2 bucket named `nooki-mtaani-media`. Keep it private; do not attach a public R2.dev URL or public custom domain.
3. Create a Turnstile widget for the production hostname.
4. Create a Cloudflare Access application to protect the admin API routes.
5. Add these bindings under Worker → Settings → Bindings:
   - `DB` → the D1 database `nooki-mtaani-db`
   - `MEDIA` → the private R2 bucket `nooki-mtaani-media`

The binding names are case-sensitive. Do not create a second Worker or change the current `nooki-mtaani` deployment.

## 2. Apply both D1 migrations

Open Storage & databases → D1 → `nooki-mtaani-db` → Console and run these files in order:

1. `migrations/0001_initial_schema.sql`
2. `migrations/0002_marketplace_workflows.sql`

Do not run migration 0002 first. It adds fields and tables on top of the initial schema.

## 3. Configure Worker variables and secrets

Set non-secret variables in Worker → Settings → Variables:

| Name | Value |
|---|---|
| `ENVIRONMENT` | `production` |
| `PUBLIC_APP_URL` | The exact production website origin, e.g. `https://your-domain.example` |
| `ALLOWED_ORIGINS` | Comma-separated exact allowed origins; include the production origin only |
| `ADMIN_EMAILS` | Comma-separated email addresses allowed to administer Nooki |
| `ACCESS_TEAM_DOMAIN` | Cloudflare Access team hostname, without `https://` |
| `ACCESS_AUD` | Access application's AUD tag |
| `DARAJA_ENV` | `sandbox` until Safaricom production approval |

Set secrets using Worker → Settings → Variables → Secrets (or `wrangler secret put NAME`):

- `TURNSTILE_SECRET_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM` (verified sender address; store as a secret if preferred)
- `DARAJA_CONSUMER_KEY`
- `DARAJA_CONSUMER_SECRET`
- `DARAJA_PASSKEY`
- `DARAJA_SHORTCODE`
- `DARAJA_CALLBACK_URL`

Never put secret values in React, GitHub source files, `.env` committed to Git, or public variables. Do not invent Daraja credentials. Keep Daraja in sandbox until the business has the required Safaricom approval and callback endpoint.

## 4. Configure the public Turnstile key

In the Cloudflare build environment, set `VITE_TURNSTILE_SITE_KEY` to the public site key from the same Turnstile widget. This is a public key and is used by the React forms. The secret key belongs only in Worker secrets.

The contact and host-enquiry forms send the Turnstile token to the Worker. In production, the Worker rejects these submissions if the secret or valid token is missing. Test both forms after configuring the keys.

## 5. Configure email verification

The account registration flow stores a password hash and creates a one-time email verification token. It sends the verification link through Resend only when both `RESEND_API_KEY` and `RESEND_FROM` are configured and the sender domain is verified. Until then, registration can create a pending account, but the user cannot sign in because the verification email has not been delivered.

The link opens `/verify-email?token=...`; connect the verification page in the frontend before enabling public account registration.

## 6. Current API surface

### Public
- `GET /api/health` — checks D1 and reports whether R2, Turnstile and Daraja configuration are present.
- `GET /api/csrf` — creates a CSRF cookie.
- `GET /api/spaces?area=&type=&size=` — returns published listings only.
- `GET /api/spaces/:id` — returns public listing details; exact address is withheld unless the signed-in user is the host, an administrator, or a renter with a confirmed/active/completed booking.
- `POST /api/contact` — validates and stores contact messages.
- `POST /api/host-enquiries` — validates and stores public host enquiries.
- `POST /api/auth/register`, `POST /api/auth/verify`, `POST /api/auth/login`, `GET /api/auth/me`, `POST /api/auth/logout` — password account and session endpoints.

### Signed-in customer/host
- `POST /api/host/apply` — submits a host application for admin review.
- `POST /api/host/spaces` — creates a draft-for-review listing for an approved host.
- `POST /api/uploads` and `GET /api/media/:id` — private R2 upload and access-controlled media retrieval.
- `POST /api/bookings`, `GET /api/bookings`, `POST /api/bookings/:id/decision`, `POST /api/bookings/:id/cancel` — booking requests and host decisions.
- `POST /api/bookings/:id/handover` — check-in/check-out transition after evidence photos have been uploaded.
- `POST /api/disputes` — opens a dispute for a booking participant.
- `POST /api/payments/stk` — initiates a Daraja STK request for an accepted booking.
- `GET /api/account/export`, `DELETE /api/account` — account data export and account closure.

### Cloudflare Access-protected admin
- `GET /api/admin/enquiries`, `PATCH /api/admin/enquiries`
- `POST /api/admin/host-applications` — approve/reject host applications.
- `GET /api/admin/spaces`, `POST /api/admin/spaces` — listing moderation.
- `GET /api/admin/disputes`, `PATCH /api/admin/disputes`
- `GET /api/admin/payments`, `PATCH /api/admin/payments` — manual Daraja reconciliation.

The admin API requires both a valid Cloudflare Access JWT and an email in `ADMIN_EMAILS`. Protect the admin path with Access as well as using the API checks.

## 7. Payment safety

The Daraja callback is treated as an untrusted notification. It is correlated to the saved CheckoutRequestID and recorded idempotently, but a successful callback is **not** enough to mark a booking paid. An administrator must reconcile the receipt against the Safaricom/Daraja transaction record and then confirm it through the admin payment review endpoint. This is a deliberate safety control; do not bypass it or mark payments paid from browser state.

No wallet, escrow, automated host payout or refund automation is implemented. Do not describe these as available.

## 8. Important implementation limits

The code now contains the backend foundations and API handlers, but this is not yet a complete production marketplace. The following still need implementation or verification before launch:

- Customer/host sign-in, verification, dashboard, listing detail, booking and admin pages need to be connected in the React UI; the API routes alone are not a finished user journey.
- Turnstile, Resend, D1 and R2 must be configured and tested against the actual Cloudflare resources.
- Image byte-signature validation, EXIF stripping, upload malware scanning, storage lifecycle/retention and operational backups need a production hardening pass.
- Host identity/property verification document review and account deletion/retention policy require operational and legal decisions.
- Daraja sandbox tests and production approval are required. Payment callbacks do not automatically confirm bookings.
- Dispute resolution, refunds, fee calculation, cancellation policy and any host payout model require legal and commercial approval.
- Privacy, terms and cookies pages are draft text and must be reviewed against the actual data flows and Kenyan law before publication.

Never seed fake live listings, reviews, testimonials, verification badges, booking counts or payment success. Keep demo content clearly marked and disabled in production.
