# Database Design

## Dhuri Resort Digital Hospitality Platform

**Database:** PostgreSQL (Supabase recommended)

This document defines a logical schema. Exact column types, indexes, RLS
policies and migrations must be reviewed against the final operating
rules before production.

## 1. Design principles

-   Use UUID primary keys for internal entities.
-   Store timestamps in `timestamptz`; display in the resort's
    configured timezone.
-   Store money as integer minor units (paise) or `numeric(12,2)`, never
    floating point.
-   Store currency explicitly (e.g. INR).
-   Use foreign keys and check constraints.
-   Keep immutable transaction and booking snapshots.
-   Avoid storing card data or CVV.
-   Soft-delete master records only where audit/history requires it; do
    not silently erase financial records.

## 2. Core identity tables

### `profiles`

-   `id uuid PK` --- matches auth user ID
-   `full_name text`
-   `phone text`
-   `email text`
-   `is_active boolean`
-   `created_at timestamptz`
-   `updated_at timestamptz`

### `roles`

-   `id uuid PK`
-   `code text UNIQUE`
-   `name text`

### `permissions`

-   `id uuid PK`
-   `code text UNIQUE`
-   `description text`

### `user_roles`

-   `user_id uuid FK profiles`
-   `role_id uuid FK roles`
-   Composite primary key (`user_id`, `role_id`)

### `role_permissions`

-   `role_id uuid FK roles`
-   `permission_id uuid FK permissions`
-   Composite primary key (`role_id`, `permission_id`)

Suggested roles: `SUPER_ADMIN`, `MANAGER`, `RECEPTIONIST`,
`RESTAURANT_MANAGER`, `KITCHEN_STAFF`, `HOUSEKEEPING`, `SERVICE_STAFF`.

## 3. Room catalogue and inventory

### `room_types`

-   `id uuid PK`
-   `name text`
-   `slug text UNIQUE`
-   `description text`
-   `max_adults smallint`
-   `max_children smallint`
-   `max_occupancy smallint`
-   `is_published boolean`
-   `sort_order integer`

### `rooms`

-   `id uuid PK`
-   `room_type_id uuid FK room_types`
-   `room_number text UNIQUE`
-   `floor_label text NULL`
-   `operational_status text` --- e.g. `ACTIVE`, `MAINTENANCE`,
    `OUT_OF_SERVICE`
-   `is_bookable boolean`

### `room_images`

-   `id uuid PK`
-   `room_type_id uuid FK room_types`
-   `storage_path text`
-   `alt_text text`
-   `sort_order integer`

### `rate_plans`

-   `id uuid PK`
-   `name text`
-   `description text`
-   `meal_plan text NULL`
-   `cancellation_policy_id uuid NULL`
-   `is_active boolean`

### `room_rates`

-   `id uuid PK`
-   `room_type_id uuid FK room_types`
-   `rate_plan_id uuid FK rate_plans`
-   `valid_from date`
-   `valid_to date`
-   `day_of_week smallint NULL`
-   `base_amount numeric(12,2)`
-   `currency char(3) DEFAULT 'INR'`
-   `is_active boolean`

### `room_inventory`

-   `id uuid PK`
-   `room_type_id uuid FK room_types`
-   `stay_date date`
-   `total_units integer`
-   `blocked_units integer DEFAULT 0`
-   Unique (`room_type_id`, `stay_date`)

Inventory constraints must ensure available units never become negative.
If specific room assignment is required at booking time, allocate room
units transactionally rather than relying only on aggregate counts.

## 4. Guests and reservations

### `guests`

-   `id uuid PK`
-   `full_name text`
-   `email text NULL`
-   `phone text`
-   `created_at timestamptz`

Restrict access to personal information. Avoid collecting identity
documents unless the resort has a lawful, approved requirement and
secure handling process.

### `bookings`

-   `id uuid PK`
-   `booking_reference text UNIQUE`
-   `lead_guest_id uuid FK guests`
-   `check_in date`
-   `check_out date`
-   `adults integer`
-   `children integer`
-   `status text`
-   `subtotal numeric(12,2)`
-   `tax_amount numeric(12,2)`
-   `discount_amount numeric(12,2)`
-   `total_amount numeric(12,2)`
-   `currency char(3)`
-   `price_snapshot jsonb`
-   `policy_snapshot jsonb`
-   `source text` --- `WEBSITE`, `WHATSAPP`, `PHONE`, `WALK_IN`, `ADMIN`
-   `created_by uuid NULL`
-   `created_at timestamptz`
-   `updated_at timestamptz`

### `booking_rooms`

-   `id uuid PK`
-   `booking_id uuid FK bookings`
-   `room_type_id uuid FK room_types`
-   `room_id uuid NULL FK rooms`
-   `rate_plan_id uuid FK rate_plans`
-   `quantity integer`
-   `nightly_rate_snapshot jsonb`
-   `occupancy_snapshot jsonb`

### `booking_guest_details`

-   `id uuid PK`
-   `booking_id uuid FK bookings`
-   `guest_id uuid FK guests`
-   `guest_type text`

### `booking_holds`

-   `id uuid PK`
-   `hold_token_hash text UNIQUE`
-   `room_type_id uuid FK room_types`
-   `check_in date`
-   `check_out date`
-   `quantity integer`
-   `expires_at timestamptz`
-   `status text`

### `booking_enquiries`

-   `id uuid PK`
-   `guest_name text`
-   `phone text`
-   `email text NULL`
-   `check_in date`
-   `check_out date`
-   `adults integer`
-   `children integer`
-   `preferred_room_type_id uuid NULL`
-   `message text NULL`
-   `status text`
-   `assigned_to uuid NULL`
-   `created_at timestamptz`

## 5. Payments

### `payments`

-   `id uuid PK`
-   `booking_id uuid NULL FK bookings`
-   `order_id uuid NULL FK orders`
-   `provider text`
-   `provider_order_id text NULL`
-   `provider_payment_id text NULL`
-   `amount numeric(12,2)`
-   `currency char(3)`
-   `status text`
-   `idempotency_key text UNIQUE`
-   `verified_at timestamptz NULL`
-   `created_at timestamptz`

### `refunds`

-   `id uuid PK`
-   `payment_id uuid FK payments`
-   `provider_refund_id text NULL`
-   `amount numeric(12,2)`
-   `status text`
-   `reason text NULL`
-   `created_at timestamptz`

At least one of `booking_id` or `order_id` must be present. Enforce this
with a check constraint. Add provider-event records to deduplicate
webhooks.

## 6. Restaurant

### `menu_categories`

-   `id uuid PK`
-   `name text`
-   `description text NULL`
-   `sort_order integer`
-   `is_active boolean`

### `menu_items`

-   `id uuid PK`
-   `category_id uuid FK menu_categories`
-   `name text`
-   `description text NULL`
-   `image_path text NULL`
-   `price numeric(12,2)`
-   `currency char(3) DEFAULT 'INR'`
-   `dietary_type text`
-   `is_available boolean`
-   `preparation_minutes integer NULL`

### `menu_item_variants`

-   `id uuid PK`
-   `menu_item_id uuid FK menu_items`
-   `name text`
-   `price_delta numeric(12,2)`

### `restaurant_tables`

-   `id uuid PK`
-   `table_number text UNIQUE`
-   `capacity integer`
-   `status text`
-   `is_active boolean`

### `table_sessions`

-   `id uuid PK`
-   `table_id uuid FK restaurant_tables`
-   `qr_assignment_id uuid NULL`
-   `opened_at timestamptz`
-   `closed_at timestamptz NULL`
-   `status text`

### `orders`

-   `id uuid PK`
-   `order_number text UNIQUE`
-   `table_session_id uuid NULL FK table_sessions`
-   `booking_id uuid NULL FK bookings`
-   `room_id uuid NULL FK rooms`
-   `order_type text` --- `DINE_IN`, `ROOM_SERVICE`
-   `status text`
-   `subtotal numeric(12,2)`
-   `tax_amount numeric(12,2)`
-   `total_amount numeric(12,2)`
-   `special_instructions text NULL`
-   `created_at timestamptz`

### `order_items`

-   `id uuid PK`
-   `order_id uuid FK orders`
-   `menu_item_id uuid NULL FK menu_items`
-   `item_name_snapshot text`
-   `unit_price_snapshot numeric(12,2)`
-   `quantity integer`
-   `variant_snapshot jsonb NULL`
-   `line_total numeric(12,2)`

Snapshot item name and price so menu edits do not rewrite historical
orders.

## 7. QR and room service

### `qr_assignments`

-   `id uuid PK`
-   `token_hash text UNIQUE`
-   `target_type text` --- `TABLE`, `ROOM`
-   `table_id uuid NULL FK restaurant_tables`
-   `room_id uuid NULL FK rooms`
-   `status text`
-   `created_at timestamptz`
-   `revoked_at timestamptz NULL`

A check constraint must ensure exactly one target is assigned and it
matches `target_type`.

### `service_types`

-   `id uuid PK`
-   `name text`
-   `description text NULL`
-   `is_active boolean`
-   `default_priority text`

### `room_service_requests`

-   `id uuid PK`
-   `room_id uuid FK rooms`
-   `booking_id uuid NULL FK bookings`
-   `service_type_id uuid FK service_types`
-   `description text NULL`
-   `status text`
-   `priority text`
-   `assigned_to uuid NULL`
-   `created_at timestamptz`
-   `completed_at timestamptz NULL`

## 8. CMS and reporting

### `website_pages`

-   `id uuid PK`
-   `slug text UNIQUE`
-   `title text`
-   `content jsonb`
-   `meta_title text`
-   `meta_description text`
-   `is_published boolean`

### `media_assets`

-   `id uuid PK`
-   `storage_path text`
-   `file_type text`
-   `alt_text text`
-   `uploaded_by uuid`
-   `created_at timestamptz`

### `offers`

-   `id uuid PK`
-   `title text`
-   `description text`
-   `code text NULL`
-   `valid_from timestamptz`
-   `valid_to timestamptz`
-   `is_active boolean`

### `audit_logs`

-   `id uuid PK`
-   `actor_user_id uuid NULL`
-   `action text`
-   `entity_type text`
-   `entity_id uuid NULL`
-   `metadata jsonb`
-   `created_at timestamptz`

## 9. Key relationships

-   One room type has many physical rooms.
-   One room type has many rates and inventory dates.
-   One booking has one lead guest and one or more booking-room rows.
-   One booking may have multiple payment attempts and refunds.
-   One restaurant table has many historical table sessions.
-   One table session may have multiple orders.
-   One order has many order items.
-   One room may have many QR assignments over time, but only one active
    assignment if that is the chosen policy.
-   One room may have many service requests.

## 10. Critical constraints and indexes

Recommended indexes: - `bookings(status, check_in, check_out)` -
`bookings(booking_reference)` -
`room_inventory(room_type_id, stay_date)` unique -
`booking_holds(expires_at, status)` - `orders(status, created_at)` -
`room_service_requests(status, created_at)` -
`qr_assignments(token_hash)` unique - `payments(provider_payment_id)`
where not null - `audit_logs(entity_type, entity_id, created_at)`

Use transactions and row locks or exclusion constraints to prevent
overlapping reservations. Add check constraints for positive quantities,
valid date ranges, non-negative money and valid status values.

## 11. RLS policy outline

-   Public users can read only published website content, published room
    types, and available public menu data.
-   Guests can access only their own booking information through a
    verified access mechanism.
-   QR users can access only the scoped table/room guest operations.
-   Staff can access only records allowed by their assigned permissions.
-   Super Admin can manage configuration.
-   Service-role credentials must remain server-only.

RLS policies must be implemented and tested; this outline is not
executable SQL.
