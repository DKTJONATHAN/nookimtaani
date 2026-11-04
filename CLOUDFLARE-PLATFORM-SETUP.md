# Nooki Mtaani — Cloudflare platform setup

## Cloudflare resources
Create a D1 database named `nooki-mtaani-db` and a private R2 bucket named `nooki-mtaani-media`. Create a Turnstile widget for the production hostname and a Cloudflare Access application for admin routes.

Add Worker bindings in Worker → Settings → Bindings:
- `DB` → D1 database `nooki-mtaani-db`
- `MEDIA` → R2 bucket `nooki-mtaani-media`

Add Worker variables/secrets:
- `ALLOWED_ORIGINS`: exact comma-separated production/preview origins.
- `ADMIN_EMAILS`: comma-separated administrator email addresses.
- `ACCESS_TEAM_DOMAIN`: Access team hostname, without https://.
- `ACCESS_AUD`: Access application's AUD tag.
- `TURNSTILE_SECRET_KEY`: secret; never expose in browser code.

## Apply the database schema
Open Cloudflare Dashboard → Storage & databases → D1 → `nooki-mtaani-db` → Console. Run the complete SQL from `migrations/0001_initial_schema.sql`. This creates the initial tables and indexes. (For CLI migrations, first add the actual D1 database ID and binding to `wrangler.jsonc`; do not use a made-up ID.)

## API currently implemented
- `GET /api/health`: verifies D1 connection and reports R2 binding status.
- `GET /api/spaces?area=&type=&size=`: returns published listings only.
- `POST /api/host-enquiries`: validates and stores host enquiries in D1.
- `POST /api/contact`: validates and stores contact messages in D1.
- `GET /api/admin/enquiries`: requires a valid Cloudflare Access JWT and admin email allowlist.
- `POST /api/admin/spaces`: creates a draft listing for the authenticated administrator.

## Database model
Initial D1 tables include users, user_roles, host_profiles, host_enquiries, contact_messages, spaces, space_photos, space_availability, bookings and audit_logs. Roles are constrained to customer, host, admin and moderator. The role tables are schema groundwork only until customer/host authentication and role-management endpoints are implemented.

## Not yet production-ready
The R2 binding is reserved but upload/download endpoints are not implemented. Customer/host self-service sign-in, email OTP delivery, role-management endpoints, host verification, booking APIs, payment/M-Pesa, email notifications, moderation actions and disputes remain to be implemented and tested. Do not advertise them as live.
Turnstile verification is enforced when `TURNSTILE_SECRET_KEY` is configured; configure it before accepting public production form submissions. Legal pages in this branch are drafts and need review against the final product and Kenyan law before publication.
