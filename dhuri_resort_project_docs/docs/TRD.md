# Technical Requirements Document (TRD)

## Dhuri Resort Digital Hospitality Platform

## 1. Proposed architecture

Use a modular monorepo with three user-facing applications: - `website`:
public marketing pages and booking journey. - `admin`: authenticated
resort operations dashboard. - `guest-portal`: QR menu and room-service
experience.

Shared packages: - `database`: generated database types and query
helpers. - `shared-types`: domain types and enums. - `validation`: Zod
schemas shared by forms and server endpoints. - `ui`: reusable
design-system components.

Keep booking, restaurant and room-service domains separate even if they
share a database and authentication provider.

## 2. Technology

  -----------------------------------------------------------------------
  Layer                               Recommendation
  ----------------------------------- -----------------------------------
  Framework                           Next.js + React

  Language                            TypeScript

  Styling                             Tailwind CSS

  Motion                              Framer Motion, used sparingly

  Forms                               React Hook Form + Zod

  Database                            Supabase PostgreSQL

  Authentication                      Supabase Auth

  Storage                             Supabase Storage

  Server logic                        Next.js server actions/route
                                      handlers or dedicated Node service

  Payments                            Razorpay or approved provider

  Hosting                             Vercel + Supabase

  Monitoring                          Error tracking and structured
                                      server logs
  -----------------------------------------------------------------------

Choose a dedicated backend service if background jobs, queue processing
or integrations outgrow the Next.js server runtime.

## 3. Application boundaries

### Website

Public read access to approved CMS content, room descriptions and
published rates. Booking operations must call trusted server-side
services.

### Admin

Authenticated access only. Every API operation checks role and
permission. Do not rely on client-side route guards alone.

### Guest portal

Public entry through a QR token, with limited access to the specific
table or room workflow. Validate token state and scope on the server.
Require additional guest/session verification for sensitive actions.

## 4. Domain modules

-   Identity and access
-   CMS and media
-   Room catalogue
-   Rates and inventory
-   Reservations and enquiries
-   Payments and refunds
-   Restaurant menu
-   Tables and sessions
-   Restaurant orders
-   Room QR assignments
-   Guest service requests
-   Notifications
-   Reporting and audit

## 5. API design

Use versioned endpoints or clearly versioned server actions. Example
REST-style routes:

### Public

-   `GET /api/v1/content/pages/:slug`
-   `GET /api/v1/rooms`
-   `POST /api/v1/availability/search`
-   `POST /api/v1/enquiries`
-   `POST /api/v1/bookings/holds`
-   `POST /api/v1/bookings`
-   `GET /api/v1/bookings/:reference/status`

### QR guest

-   `GET /api/v1/qr/:token/context`
-   `GET /api/v1/guest/menu`
-   `POST /api/v1/guest/orders`
-   `GET /api/v1/guest/orders/:id`
-   `POST /api/v1/guest/service-requests`
-   `GET /api/v1/guest/service-requests/:id`

### Admin

-   `GET/POST/PATCH /api/v1/admin/rooms`
-   `GET/POST/PATCH /api/v1/admin/bookings`
-   `GET/POST/PATCH /api/v1/admin/menu-items`
-   `GET/POST/PATCH /api/v1/admin/tables`
-   `GET/PATCH /api/v1/admin/orders`
-   `GET/PATCH /api/v1/admin/service-requests`
-   `GET/POST/PATCH /api/v1/admin/qr-assignments`
-   `GET /api/v1/admin/reports`

These are logical route examples, not a mandate to expose every
operation as a public REST endpoint. Validate all inputs and authorize
every mutation.

## 6. Booking and inventory correctness

-   Store reservations as date ranges using a consistent resort-local
    timezone policy.
-   Treat occupied nights as `[check_in, check_out)` to allow same-day
    checkout/check-in where operationally permitted.
-   Use a database transaction to verify availability and allocate
    inventory.
-   Prevent overlapping active reservations using inventory-unit
    allocation and an appropriate PostgreSQL exclusion constraint, or an
    equivalent transaction-safe locking strategy.
-   Create temporary holds with expiry timestamps.
-   Expire holds through a scheduled job/queue.
-   Recheck availability immediately before confirmation.
-   Store immutable booking price, tax, policy and room details as a
    snapshot.
-   Use idempotency keys for booking creation and payment callbacks.

Do not rely on a frontend availability result as a guarantee; it can
become stale.

## 7. Payment integration

1.  Server creates payment order with provider.
2.  Browser receives only the provider's public checkout data.
3.  Provider processes payment.
4.  Server verifies signed webhook/callback.
5.  Server updates payment and booking in a transaction.
6.  Duplicate callbacks are safely ignored using provider event
    ID/idempotency.
7.  Failed or abandoned payments follow the configured hold-expiry
    policy.

Never expose secret keys in client bundles. Never trust a
client-supplied `paid=true`.

## 8. QR token design

-   Generate cryptographically random tokens.
-   Store only a hash of the token where practical.
-   QR URL contains an opaque token, not room number, guest name or
    booking ID.
-   Support revoke, rotate, activate and deactivate.
-   Rate-limit token lookup and order/request creation.
-   Validate token scope: table QR cannot access room functions and vice
    versa.
-   Consider session PIN or check-in verification for room-specific
    sensitive functions.
-   Do not put personal data in QR query parameters.

## 9. Notifications and background work

Use a durable queue or scheduled jobs for: - Booking confirmation
emails/messages. - Payment reconciliation. - Expiring booking holds. -
New restaurant order alerts. - Room-service assignment alerts. - Request
escalation. - Daily reports.

Notification delivery failure must not silently undo a valid booking or
order. Track delivery attempts and allow retries.

## 10. Security

-   Supabase Row Level Security on all exposed tables.
-   Least-privilege database roles.
-   Server-side role and permission checks.
-   Secure cookies and session handling.
-   CSRF protection where applicable.
-   Input validation and output encoding.
-   Rate limiting and abuse protection.
-   File upload type/size validation.
-   Secrets stored in environment variables.
-   Audit logs for booking, payment, refund, QR and permission changes.
-   Data retention and deletion policy approved by management.

## 11. Performance and SEO

-   Server-render public pages.
-   Use optimized responsive images and modern formats.
-   Lazy-load below-the-fold media.
-   Avoid large client bundles.
-   Cache public CMS content with controlled invalidation.
-   Do not cache personalized booking/payment responses publicly.
-   Add metadata, canonical URLs, sitemap and robots rules.
-   Use Hotel/LocalBusiness structured data only for verified fields.

## 12. Environments and deployment

-   Local development
-   Staging
-   Production

Required controls: - Separate credentials and payment modes per
environment. - Database migrations committed to source control. -
Preview deployment for UI review. - Automated lint, type-check and test
pipeline. - Backups before production migrations. - Rollback plan for
each release. - Production error and uptime monitoring.

## 13. Testing

-   Unit tests: pricing, date ranges, status transitions and
    permissions.
-   Integration tests: booking transactions, payment webhooks and QR
    validation.
-   End-to-end tests: booking, table order and room request journeys.
-   Security tests: RLS, role escalation, token guessing and rate
    limits.
-   Load tests: availability search and order submission.
-   Manual device tests: common Android/iOS browsers and QR camera
    flows.

## 14. Operational decisions to confirm

-   Resort timezone and business-day rules.
-   Inventory allocation model: room-unit or room-type pool.
-   Payment provider and refund process.
-   Guest verification method for room QR.
-   WhatsApp provider and template approval.
-   Notification escalation rules.
-   Backup retention and recovery objectives.
