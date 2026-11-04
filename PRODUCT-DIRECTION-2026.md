# Nooki Mtaani — Product Direction (2026)

## Decision

Keep the Nooki Mtaani brand and test a narrower first product:

**A neighbourhood micro-storage marketplace for small merchants, online sellers, event vendors and growing local businesses.**

The first use case is secure, flexible storage in spare rooms, lockable garages, small stores and underused commercial premises. Do not launch as a generic marketplace for every kind of space.

This is a market hypothesis, not a claim that demand has already been proven.

## Why this wedge

Kenya already has products for flexible desks and offices, broader work/stay/play bookings, and larger vetted warehouse networks. Nooki should not copy those products.

The opportunity to test is the gap between:
- a shopkeeper or online seller who needs a few square metres for stock for 2 weeks or 2 months; and
- enterprise warehousing that is designed around pallets, floors, contracts and larger operating budgets.

Potential later categories (not MVP): temporary retail stalls, event preparation space, equipment yards and parking.

## First customer

A small merchant or online seller who:
- has stock overflowing from a shop, home or office;
- needs a secure nearby space for a short, changeable period;
- cannot justify a full warehouse lease;
- wants clear access rules, transparent pricing and proof of the space's condition.

## MVP workflows

### Renter
1. Search by area, storage size, monthly/daily budget and required dates.
2. Compare verified spaces with clear dimensions, access hours, security details, restrictions and real photos.
3. Request or confirm availability.
4. Review plain-language rental terms and the total price before paying.
5. Receive booking confirmation, directions and access instructions.
6. Record check-in/check-out condition with timestamped photos.
7. Raise a support or dispute request with evidence.

### Host
1. Create a listing with dimensions, capacity, permitted goods, access schedule, security, photos and price.
2. Complete identity and property/authority checks.
3. Manage availability and booking requests.
4. Confirm handover and condition evidence.
5. View booking history, earnings and payout status.

### Operations
- Verify hosts and spaces before publication.
- Review suspicious listings and reports.
- Keep an auditable booking, payment and dispute history.
- Hide exact addresses until a booking is confirmed.
- Make listing, availability, booking, payment and payout states explicit.

## Trust and payment requirements

- Never claim a space is verified until the verification process has actually passed.
- Use a licensed payment provider / Safaricom Daraja integration for payment collection.
- Validate payment callbacks server-side; make callbacks idempotent.
- Never trust a client-side M-Pesa success screen as proof of payment.
- Do not build an escrow or wallet product without appropriate legal and payment-provider review.
- Keep renter and host personal data private; enforce tenant isolation in database policies.
- Provide clear cancellation, damage, prohibited-goods and dispute policies before accepting money.

## Monetisation hypotheses to test

- Commission on completed bookings.
- Optional paid host tools for repeat hosts / multiple spaces.
- Paid verification only if it does not undermine trust or exclude small hosts.

Do not set final pricing before interviews and pilot bookings. A competitor's fee is a benchmark, not evidence of willingness to pay.

## What not to build yet

- A broad coworking / accommodation / lifestyle marketplace.
- A full warehouse management system.
- Delivery fleets, insurance underwriting or an in-app wallet.
- AI chat as a substitute for real availability, trust checks or support.
- Fake reviews, fake booking counts or placeholder host profiles.

## Validation gates before public launch

- Interview at least 15 potential renters and 15 potential hosts in one chosen pilot area.
- Obtain at least 10 genuine spaces with owner/manager permission and verification evidence.
- Secure at least 5 real paid pilot bookings before expanding categories.
- Measure search-to-enquiry, enquiry-to-booking, booking completion, repeat usage and dispute rate.
- Confirm hosts will maintain availability and renters will pay for the proposed short-term storage use case.

## Current repository reality

The existing repository is a static HTML/CSS/JavaScript prototype. Treat existing page copy, testimonials, sample locations and sample listings as unverified content. Do not present them as real inventory, users, bookings or traction.

## Competitive landscape to account for

- DeskShare: flexible desks, offices and meeting rooms.
- SPACIA: workspaces, accommodation and experiences.
- KásiOS: vetted business warehousing and storage.
- Store In My Space: peer-to-peer storage concept.

Nooki's differentiation must be proven in the micro-storage / small-merchant segment, not asserted through marketing copy.
