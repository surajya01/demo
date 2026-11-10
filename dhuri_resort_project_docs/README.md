# Dhuri Resort Digital Hospitality Platform

**Designed & developed by Apexify**\
Project documentation package: PRD, TRD, database design, UI/UX, QR
system, implementation plan, and responsive requirements.

## Project objective

Build a mobile-first resort platform combining: - Public resort website
and content management - Direct room booking and enquiry-based booking -
Restaurant QR menu, ordering, table sessions and payments -
Room-specific QR guest portal and service requests - Central admin
dashboard for resort operations

## Documentation index

  -----------------------------------------------------------------------
  File                                Purpose
  ----------------------------------- -----------------------------------
  `docs/PRD.md`                       Product goals, users, features,
                                      workflows and acceptance criteria

  `docs/TRD.md`                       Architecture, technology, APIs,
                                      security and deployment

  `docs/DATABASE.md`                  PostgreSQL entities, relationships,
                                      constraints and indexing

  `docs/UI-UX.md`                     Visual direction, page layouts,
                                      components and interaction rules

  `docs/QR-SYSTEM.md`                 Restaurant and room QR flows,
                                      security and operations

  `docs/IMPLEMENTATION-PLAN.md`       Phases, dependencies, testing and
                                      release gates

  `responsive.md`                     Responsive design requirements and
                                      device-level QA
  -----------------------------------------------------------------------

## Recommended architecture

Use a single repository with separate applications for the public
website, admin dashboard and guest portal. Share types, validation
schemas and UI primitives. Keep booking, restaurant ordering and
room-service workflows logically separate.

## Suggested stack

-   Next.js + React + TypeScript
-   Tailwind CSS
-   Supabase PostgreSQL, Auth and Storage
-   Server-side application services / Next.js route handlers
-   Razorpay or another approved payment provider
-   Vercel for web deployment

The exact stack can be adjusted after hosting, budget and operational
requirements are confirmed.

## Important source-data note

The supplied four-page PDF is a Booking.com property listing reference.
It shows Dhuri Resort in Waliv, Vasai Road East, Vasai, Maharashtra, and
lists facilities and example room categories. It does **not** establish
the resort's official phone number, email, current room inventory, live
rates, official cancellation rules, payment account or restaurant menu.
Treat these as unverified until management supplies and approves them.

## Pre-development inputs required

1.  Official logo, brand assets and approved photographs.
2.  Official phone, email, address and map pin.
3.  Room inventory, room numbers, occupancy and rate plans.
4.  Taxes, fees, deposits, cancellation and refund policies.
5.  Restaurant menu, prices, variants and item availability.
6.  Restaurant table count and table numbering.
7.  Staff list, roles and operational responsibilities.
8.  Payment gateway merchant account and settlement details.
9.  Domain, hosting and access credentials.
10. Legal pages and privacy/contact wording approved by the resort.

## Non-negotiable engineering rules

-   Never trust frontend payment success; verify provider
    signatures/webhooks server-side.
-   Prevent overlapping room reservations at database level.
-   Do not expose service-role keys or payment secrets in browser code.
-   QR URLs must use unguessable tokens and must not expose guest
    personal information.
-   Enforce permissions in backend/database policies, not only by hiding
    UI.
-   Log sensitive administrative changes.
-   Keep a staging environment and backups before production changes.

## Brand usage

Dhuri Resort remains the primary guest-facing brand. Use "Designed &
Developed by Apexify" in the website footer and optional "Powered by
Apexify" in the guest portal/admin login. Do not display an Apexify
phone number. The resort's approved contact details remain the primary
guest contact.
