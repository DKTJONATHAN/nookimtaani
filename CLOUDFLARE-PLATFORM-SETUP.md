# Nooki Mtaani — Cloudflare platform setup

## Cloudflare resources to create
1. D1 database: `nooki-mtaani-db`.
2. Private R2 bucket: `nooki-mtaani-media`.
3. Turnstile widget configured for the production hostname.
4. Cloudflare Access application for administrator routes.

Add Worker bindings:
- `DB` → D1 database `nooki-mtaani-db`
- `MEDIA` → R2 bucket `nooki-mtaani-media`

Set Worker variables/secrets:
- `ALLOWED_ORIGINS`: comma-separated exact production/preview origins.
- `ADMIN_EMAILS`: comma-separated administrator emails.
- `ACCESS_TEAM_DOMAIN`: Access team hostname without https://.
- `ACCESS_AUD`: Access application's AUD tag.
- `TURNSTILE_SECRET_KEY`: secret, never a plain public variable.

Apply migration after creating D1:
```sh
npx wrangler d1 migrations apply nooki-mtaani-db --remote
```

## API implemented in this branch
- `GET /api/health`: D1 connectivity and R2 binding status.
- `GET /api/spaces?area=&type=&size=`: published listings only.
- `POST /api/host-enquiries`: validates and stores host interest in D1.
- `POST /api/contact`: validates and stores contact requests in D1.
- `GET /api/admin/enquiries`: Cloudflare Access JWT + administrator allowlist.
- `POST /api/admin/spaces`: creates administrator-owned draft listings.

## Not yet live — do not advertise as available
The R2 binding is reserved but upload/download endpoints are not implemented. Customer/host self-service sign-in, OTP delivery, host verification, booking lifecycle, payment/M-Pesa processing, moderation actions, disputes and transactional email still need implementation and tests. D1 schema includes initial space and booking tables but the booking API is not enabled.

Turnstile is enforced by the API when `TURNSTILE_SECRET_KEY` is configured. Configure it before opening public forms to production traffic. When the secret is absent, verification is bypassed for local development only.
