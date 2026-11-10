# Product Requirements Document (PRD)

## Dhuri Resort Digital Hospitality Platform

**Version:** 1.0\
**Product owner:** Dhuri Resort management\
**Technology partner:** Apexify

## 1. Product vision

Provide one digital platform through which prospective guests can
discover Dhuri Resort, enquire or book rooms, and use QR-enabled
restaurant and in-room services. Resort staff should manage these
workflows through a centralized admin dashboard.

## 2. Goals

-   Establish a professional, search-friendly resort website.
-   Enable direct online booking and enquiry-based reservations.
-   Reduce manual restaurant ordering through table QR codes.
-   Let in-house guests request room services using room QR codes.
-   Give staff operational visibility over bookings, orders and service
    requests.
-   Give management basic occupancy, booking and revenue reporting.

## 3. Out of scope for initial release

-   OTA/channel-manager synchronization unless separately approved.
-   Native iOS/Android applications.
-   AI concierge or automated recommendations.
-   Complex loyalty points and membership engine.
-   Dynamic pricing optimization.
-   Multi-property management.

## 4. User groups

  -----------------------------------------------------------------------
  User                                Needs
  ----------------------------------- -----------------------------------
  Website visitor                     Resort information, facilities,
                                      photos, location and contact

  Prospective guest                   Check availability, compare room
                                      types, book or enquire

  In-house guest                      Menu, room service, assistance and
                                      request tracking

  Restaurant guest                    Scan table QR, browse menu and
                                      place order

  Receptionist                        Manage enquiries, bookings,
                                      check-in and check-out

  Restaurant staff                    Manage tables and incoming orders

  Kitchen staff                       See accepted orders and update
                                      preparation status

  Housekeeping/service staff          Receive and complete assigned
                                      requests

  Manager/admin                       Configure rooms, rates, content,
                                      users and reports
  -----------------------------------------------------------------------

## 5. Public website requirements

### Pages

-   Home
-   About
-   Rooms and room details
-   Restaurant
-   Facilities and experiences
-   Gallery
-   Offers
-   Contact and location
-   FAQs
-   Privacy policy, terms and cancellation policy

### Homepage sections

1.  Hero with approved resort image/video and booking CTA.
2.  Availability search.
3.  Resort introduction.
4.  Featured rooms.
5.  Facilities.
6.  Restaurant and dining.
7.  Experiences.
8.  Gallery.
9.  Guest reviews (only verified/approved content).
10. Location/map.
11. Contact and footer.

### Content management

Authorized staff must be able to update banners, descriptions, room
content, gallery images, facilities, offers, FAQs, contact details and
SEO metadata without code changes.

## 6. Booking requirements

### Search inputs

-   Check-in and check-out dates
-   Adults and children
-   Number of rooms
-   Optional room preference

### Online booking flow

1.  Validate dates and guest counts.
2.  Retrieve available inventory and applicable rates.
3.  Show room options and inclusions.
4.  Collect lead guest details.
5.  Show itemized price, taxes and policies.
6.  Create a temporary inventory hold.
7.  Initiate payment when required.
8.  Verify payment server-side.
9.  Confirm reservation and issue booking reference.
10. Send confirmation to guest and resort staff.

### Enquiry booking flow

1.  Guest submits dates, guest count, room preference and contact
    details.
2.  Create an enquiry with `PENDING` status.
3.  Notify authorized resort staff.
4.  Staff checks inventory and responds.
5.  Staff can convert the enquiry to a confirmed booking after guest
    agreement and required payment.
6.  Do not present an enquiry as a confirmed reservation.

### Booking statuses

`PENDING`, `AWAITING_PAYMENT`, `CONFIRMED`, `CHECKED_IN`, `CHECKED_OUT`,
`CANCELLED`, `REFUND_PENDING`, `REFUNDED`, `NO_SHOW`, `EXPIRED`.

### Booking rules

-   Check-out must be later than check-in.
-   Occupancy must not exceed room capacity.
-   Inventory must not be oversold.
-   Holds must expire after a configurable interval.
-   Repeated payment callbacks must be idempotent.
-   Price and policy snapshot must be stored with the booking.
-   Cancellation/refund eligibility must follow management-approved
    policy.

## 7. Restaurant QR requirements

-   Each table has a unique QR assignment.
-   QR opens the mobile digital menu for the correct table/session.
-   Categories and menu items are manageable by authorized staff.
-   Item details include name, description, image, price, dietary
    marker, availability and optional variants/add-ons.
-   Guest can add items to cart, review quantities and submit order.
-   Staff can accept/reject and update order status.
-   Kitchen view displays new and accepted orders.
-   Table session closes only through an authorized workflow.
-   Table status is not automatically marked available merely because an
    order is paid.

### Restaurant order statuses

`PLACED`, `ACCEPTED`, `REJECTED`, `PREPARING`, `READY`, `SERVED`,
`COMPLETED`, `CANCELLED`.

## 8. Room QR requirements

-   Each room has a unique, revocable QR token.
-   QR opens a room-specific guest portal.
-   Guest can request housekeeping, towels, water, maintenance,
    reception assistance and other configured services.
-   Food ordering can be enabled if the restaurant supports room
    delivery.
-   Guest sees request status.
-   Staff can assign and update requests.
-   Sensitive guest details are never embedded in the QR URL.

### Service request statuses

`SUBMITTED`, `ACCEPTED`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`.

## 9. Payment requirements

Support configured methods such as online advance payment,
pay-at-property, cash or pay-after-service, subject to resort policy.

Payment states: `CREATED`, `PENDING`, `AUTHORIZED`, `CAPTURED`,
`FAILED`, `PARTIALLY_REFUNDED`, `REFUNDED`.

-   Online payments require server-side verification.
-   Store provider transaction references, amount, currency and status.
-   Do not store card numbers, CVV or sensitive payment credentials.
-   Refunds must be initiated and recorded through an authorized
    process.
-   Reconcile payment webhooks and admin records.

## 10. Admin dashboard requirements

### Dashboard

-   Today's arrivals/departures
-   Booking counts and pending enquiries
-   Occupancy and available inventory
-   Restaurant orders by status
-   Open room-service requests
-   Revenue summary (based on recorded, reconciled transactions)

### Modules

-   Room types, rooms, inventory and rate plans
-   Bookings and enquiries
-   Guests
-   Restaurant categories and menu items
-   Tables and table sessions
-   Orders and kitchen queue
-   Room QR assignments and service requests
-   Staff users and roles
-   Payments and refunds
-   Website CMS and gallery
-   Offers and FAQs
-   Reports and audit logs

## 11. Roles

-   Super Admin: full configuration and access.
-   Resort Manager: operational and reporting access.
-   Receptionist: bookings, guest records and check-in/out.
-   Restaurant Manager: menu, tables and restaurant orders.
-   Kitchen Staff: kitchen order queue and permitted status updates.
-   Housekeeping: assigned room-service requests.
-   Service Staff: assigned operational requests.

Permissions must be enforced server-side and in database policies.

## 12. Non-functional requirements

-   Mobile-first responsive interface.
-   Accessible labels, focus states and keyboard navigation.
-   Fast loading and optimized images.
-   Secure authentication and authorization.
-   Reliable inventory and payment processing.
-   Auditable administrative actions.
-   Daily backups and tested restoration process.
-   Useful error messages and operational logging.
-   SEO metadata and structured data based on verified facts.

## 13. Success measures

Measure after launch: - Direct booking conversion rate. -
Enquiry-to-booking conversion. - Booking abandonment rate. - QR menu
visits and order conversion. - Average order processing time. -
Room-service request completion time. - Booking/inventory mismatch
incidents. - Payment reconciliation exceptions. - Mobile performance and
form completion.

Set numeric targets only after baseline traffic and operating data are
available.

## 14. Acceptance criteria

-   Public pages display approved information and work on supported
    screen sizes.
-   Online booking checks inventory and prevents overlapping
    allocations.
-   Enquiries remain distinct from confirmed reservations.
-   Payment confirmation is server-verified.
-   Each active table QR opens the correct table flow.
-   Each active room QR opens the correct room flow.
-   Staff can process orders and service requests through their
    permitted roles.
-   Admin changes persist and appear in the correct modules.
-   Audit records exist for sensitive actions.
-   Backup and restore procedures are tested before launch.
