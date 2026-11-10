# Implementation Plan

## Dhuri Resort Digital Hospitality Platform

## 1. Delivery strategy

Build in controlled releases. First establish verified resort data and
the design system, then implement the public website and operational
backend. Booking and QR flows must be tested with real staff workflows
before launch.

## 2. Phase 0 --- Discovery and approvals

### Tasks

-   Confirm official resort name, logo and brand assets.
-   Verify address, phone, email and map pin.
-   Collect room inventory and room types.
-   Confirm occupancy rules and rate plans.
-   Confirm taxes, deposits, cancellation and refund policy.
-   Collect restaurant menu and pricing.
-   Count and label restaurant tables.
-   Confirm room numbering and QR placement.
-   Define staff roles and operating hours.
-   Select payment provider and notification channels.

### Exit criteria

-   Management signs off on content and operating rules.
-   Required data is available.
-   Payment and hosting ownership are agreed.

## 3. Phase 1 --- UX and visual system

### Tasks

-   Sitemap and user journeys.
-   Wireframes for website, booking, QR portal and admin.
-   Responsive design system.
-   Component library.
-   Design review with resort management.

### Exit criteria

-   Desktop and mobile designs approved.
-   Booking and QR flows reviewed.
-   Accessibility and reduced-motion states considered.

## 4. Phase 2 --- Foundation

### Tasks

-   Create monorepo and applications.
-   Configure TypeScript, linting and formatting.
-   Configure Supabase environments.
-   Implement migrations and seed data.
-   Implement authentication and roles.
-   Configure storage buckets and upload rules.
-   Add logging and error monitoring.
-   Set up CI and staging deployment.

### Exit criteria

-   Staging apps deploy.
-   Database migrations run from source control.
-   Role and RLS tests pass.

## 5. Phase 3 --- Public website and CMS

### Tasks

-   Header/footer and homepage.
-   About, rooms, facilities, restaurant and gallery.
-   Contact and location.
-   CMS management.
-   SEO metadata, sitemap and structured data.
-   Image optimization and performance.

### Exit criteria

-   All approved content is published.
-   Forms and contact actions work.
-   Mobile QA passes.
-   No unverified claims or sample pricing remain.

## 6. Phase 4 --- Booking engine

### Tasks

-   Availability search.
-   Rate calculation.
-   Inventory allocation.
-   Temporary holds and expiry.
-   Guest details and booking creation.
-   Enquiry workflow.
-   Payment provider integration.
-   Webhook verification and reconciliation.
-   Confirmation and cancellation handling.

### Exit criteria

-   Concurrent booking tests do not oversell inventory.
-   Payment callbacks are idempotent.
-   Enquiry cannot be mistaken for confirmation.
-   Staff can create and update manual bookings.
-   Price and policy snapshots are retained.

## 7. Phase 5 --- Restaurant QR

### Tasks

-   Menu categories and items.
-   Table management.
-   QR generation and assignment.
-   Guest menu and cart.
-   Order submission.
-   Kitchen queue.
-   Status updates.
-   Payment methods.
-   Table session close/cleaning workflow.

### Exit criteria

-   Each QR maps to the correct table.
-   Duplicate order prevention works.
-   Kitchen staff can process orders.
-   Table state follows the approved workflow.

## 8. Phase 6 --- Room QR service

### Tasks

-   Room QR assignment.
-   Guest portal.
-   Service catalogue.
-   Request creation and tracking.
-   Staff assignment.
-   Notifications and escalation.
-   Optional room-service food ordering.

### Exit criteria

-   QR cannot expose another room.
-   Staff can complete requests.
-   Guest can view only permitted request status.
-   Revoked QR is rejected.

## 9. Phase 7 --- Admin and reporting

### Tasks

-   Dashboard overview.
-   Room and inventory management.
-   Booking and guest management.
-   Restaurant menu, table and order management.
-   QR management.
-   Staff and permissions.
-   Payment/refund records.
-   CMS.
-   Reports and audit logs.

### Exit criteria

-   Each role sees only permitted actions.
-   Reports reconcile to underlying records.
-   Sensitive actions are audited.

## 10. Phase 8 --- QA and launch

### Test areas

-   Functional and regression tests.
-   Booking concurrency and date-boundary tests.
-   Payment success, failure, duplicate webhook and refund tests.
-   QR revocation and cross-room/table access tests.
-   Mobile and tablet responsive tests.
-   Accessibility checks.
-   Performance and SEO checks.
-   Backup restoration test.
-   Staff acceptance testing.

### Launch checklist

-   Production domain and SSL.
-   Production environment secrets.
-   Verified payment credentials.
-   Approved resort content.
-   Analytics and Search Console.
-   Backup schedule.
-   Monitoring and alerting.
-   Staff training.
-   Printed QR labels tested in actual locations.
-   Manual fallback process documented.

## 11. Regression safeguards

-   Keep business rules in domain services, not UI components.
-   Use migrations; do not make undocumented production schema edits.
-   Add automated tests for booking allocation, price calculations and
    status transitions.
-   Use staging before production.
-   Require review for payment, inventory, permission and QR changes.
-   Preserve audit logs.
-   Take backups before risky migrations.
-   Release behind feature flags where useful.
-   Verify rollback procedures.

## 12. Suggested release order

### MVP

-   Public website and CMS.
-   Room listing and enquiry booking.
-   Online booking and payment after inventory rules are approved.
-   Basic admin dashboard.
-   Restaurant QR menu and ordering.
-   Room QR service requests.

### Release 2

-   Advanced analytics.
-   Offers and coupons.
-   Automated notifications.
-   More detailed staff workflows.
-   Guest feedback and review management.

### Release 3

-   Dynamic pricing.
-   Forecasting.
-   Loyalty features.
-   Advanced integrations.

## 13. Schedule estimation

A realistic schedule depends on the amount of content, integrations and
staff feedback. A possible planning range for a small experienced team
is:

  Workstream                  Indicative duration
  ------------------------- ---------------------
  Discovery and approvals       3--5 working days
  UX/UI                         5--8 working days
  Foundation and database       4--7 working days
  Public website and CMS        5--8 working days
  Booking engine               8--14 working days
  Restaurant QR                6--10 working days
  Room QR                       4--7 working days
  Admin, QA and launch         7--12 working days

These ranges overlap in places and are not additive promises. Payment
onboarding, missing resort data, revisions and operational testing can
extend delivery. Do not commit to a fixed launch date until discovery is
complete.

## 14. Project risks

  -----------------------------------------------------------------------
  Risk                                Mitigation
  ----------------------------------- -----------------------------------
  Incorrect room inventory            Management-approved inventory and
                                      daily reconciliation

  Double booking                      Transaction-safe allocation and
                                      concurrency tests

  Payment mismatch                    Signed webhooks, idempotency and
                                      reconciliation

  QR misuse                           Opaque tokens, revocation and
                                      scoped access

  Staff do not use dashboard          Short training and simple
                                      role-specific screens

  Menu/prices become outdated         Admin availability and price
                                      controls

  Unverified website claims           Content approval before publishing

  Scope creep                         Change log and release
                                      prioritization
  -----------------------------------------------------------------------
