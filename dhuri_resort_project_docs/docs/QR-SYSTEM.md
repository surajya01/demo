# QR Smart Guest System

## Restaurant Table QR + Room Service QR

## 1. Purpose

Provide two separate QR experiences through one guest portal: 1.
Restaurant QR: menu browsing and table ordering. 2. Room QR: in-room
service requests and optional room-service food ordering.

The QR code is an entry point, not proof of guest identity or payment.

## 2. QR types

  -----------------------------------------------------------------------
  Type                    Assigned to             Main capabilities
  ----------------------- ----------------------- -----------------------
  Table QR                Restaurant table        Menu, cart, dine-in
                                                  order, table session

  Room QR                 Guest room              Service requests,
                                                  room-service menu,
                                                  request tracking
  -----------------------------------------------------------------------

Each QR assignment has a unique opaque token and a server-side target.

## 3. Restaurant guest journey

1.  Guest scans table QR.
2.  Server validates token and active table assignment.
3.  Guest portal shows the correct table context.
4.  Guest browses available menu items.
5.  Guest adds items and optional variants.
6.  Server revalidates item availability and current price.
7.  Guest confirms order.
8.  Server creates order and immutable item/price snapshots.
9.  Staff receives new order.
10. Kitchen updates preparation status.
11. Guest sees status updates.
12. Staff marks served/completed and closes the table session when
    appropriate.

## 4. Restaurant order states

`PLACED → ACCEPTED → PREPARING → READY → SERVED → COMPLETED`

Alternative transitions: - `PLACED → REJECTED` - Eligible active order →
`CANCELLED`

Define permitted transitions server-side. A client must not be able to
jump directly from placed to completed.

## 5. Table status

Suggested states: - `AVAILABLE` - `OCCUPIED` - `RESERVED` - `CLEANING` -
`OUT_OF_SERVICE`

Do not infer that a table is free simply because an order is paid. A
table session is closed by authorized staff after the guest leaves and
the table is ready.

## 6. Room guest journey

1.  Guest scans room QR.
2.  Server validates active QR assignment.
3.  Portal displays available services.
4.  Guest selects a service and enters optional notes.
5.  Server creates a request for the mapped room.
6.  Staff receives an alert.
7.  Staff accepts and processes the request.
8.  Guest sees progress.
9.  Staff marks completed.

## 7. Room service catalogue

Initial configurable service types: - Housekeeping/cleaning - Fresh
towels - Drinking water - Maintenance - Reception assistance - Extra
amenities - Restaurant/food order - Other request

Management must decide which services are available at which hours and
whether charges apply.

## 8. Request states

`SUBMITTED → ACCEPTED → IN_PROGRESS → COMPLETED`

Additional states: - `CANCELLED` - `REJECTED`

Every state change should record actor, timestamp and optional note.

## 9. QR generation and lifecycle

-   Generate cryptographically secure random token.
-   Store token hash in the database.
-   Print QR containing only the guest portal URL and opaque token.
-   Assign QR to exactly one active target.
-   Support activate, deactivate, revoke and regenerate.
-   Keep historical assignment records for audit.
-   Replacing a QR invalidates the old token.
-   Use HTTPS only.

## 10. Security model

-   Do not encode room number, guest name, phone, booking reference or
    personal data in QR URL.
-   Validate token on every server-side request.
-   Scope permissions to the mapped table or room.
-   Rate-limit lookups, orders and requests.
-   Add bot/abuse controls where necessary.
-   Do not expose another table's order or another room's requests.
-   For sensitive room actions, require active guest session, booking
    verification or a short PIN.
-   Avoid treating possession of a printed QR as sufficient
    authorization for access to guest bills or personal data.

## 11. Payments

Possible restaurant methods: - Pay online at order time. - Pay at
table. - Pay at reception. - Pay after service if approved.

For room service: - Add to room folio only if the resort has a reliable
folio/reconciliation process. - Otherwise use online payment or
pay-at-property.

Payment state is independent of kitchen/service state. A paid order is
not necessarily served; a served order is not necessarily paid.

## 12. Preparation time

-   Store estimated preparation minutes per menu item.
-   Calculate a practical order estimate using kitchen rules and current
    workload.
-   Show estimate as approximate.
-   Allow staff to update delays.
-   Do not promise an exact completion time unless operations can
    support it.

## 13. Admin operations

Restaurant staff: - View new orders. - Accept/reject. - Update kitchen
status. - Mark served. - View table sessions.

Manager: - Manage tables and QR assignments. - Manage menu, categories,
pricing and availability. - View sales and order reports.

Housekeeping/service staff: - View assigned requests. - Accept and
update progress. - Mark completed with optional notes.

## 14. Failure handling

-   Invalid/revoked QR: show a helpful unavailable page and reception
    contact.
-   Network failure during order: prevent duplicate submission using
    idempotency key.
-   Item becomes unavailable: revalidate and ask guest to update cart.
-   Notification failure: retain order/request and retry delivery.
-   Payment failure: show retry or pay-at-property options according to
    policy.
-   Staff device offline: queue/retry synchronization or provide a
    manual fallback process.

## 15. QR acceptance tests

-   Table QR A never opens table B.
-   Room QR A never exposes room B.
-   Revoked QR stops working.
-   Duplicate taps do not create duplicate orders.
-   Price is recalculated on server.
-   Unavailable items cannot be ordered.
-   Staff-only status transitions are protected.
-   Guest sees only permitted order/request details.
-   QR portal is usable on common mobile browsers.
