# UI/UX Design Specification

## Dhuri Resort Digital Hospitality Platform

## 1. Design objective

Create a premium, welcoming resort experience without making the
interface visually heavy. The public website should sell the stay
through strong photography and clear booking actions. The admin should
prioritize operational speed. The QR portal should be simple enough to
use without staff assistance.

## 2. Brand hierarchy

-   Primary brand: Dhuri Resort.
-   Developer credit: Designed & Developed by Apexify.
-   Do not place Apexify branding above the resort brand in guest-facing
    pages.
-   Resort contact details remain the primary support contact.

## 3. Visual direction

Suggested palette: \| Token \| Hex \| Use \| \|---\|---\|---\| \| Forest
green \| `#234B3C` \| Primary actions and highlights \| \| Warm beige \|
`#F4EFE5` \| Soft section backgrounds \| \| Muted gold \| `#C5A46D` \|
Small accent details \| \| Off-white \| `#FAF9F6` \| Main background \|
\| Charcoal \| `#292D2A` \| Main text \| \| White \| `#FFFFFF` \| Cards
and surfaces \|

Use the palette as a starting point. Confirm against the official logo
and resort photography before locking the design system.

## 4. Typography

-   Use a highly legible sans-serif for body text.
-   Use a restrained display face for major headings if it remains
    readable.
-   Keep body text comfortable on mobile.
-   Avoid decorative fonts for forms, prices and operational data.

## 5. Public website layout

### Header

-   Resort logo.
-   Desktop navigation.
-   Primary Book Now action.
-   Mobile menu with accessible open/close controls.

### Hero

-   Large approved resort image.
-   Short headline and supporting line.
-   Book Now and WhatsApp Enquiry actions.
-   Search widget either overlaid or directly below, depending on image
    contrast.

### Room cards

-   Image, room name, occupancy, key amenities and starting price only
    when verified.
-   Clear distinction between "View Details", "Check Availability" and
    "Enquire".
-   Do not show fabricated "limited rooms" or urgency labels.

### Facilities

-   Consistent icon and image treatment.
-   Only advertise facilities confirmed by management.

### Gallery

-   Responsive grid.
-   Image lightbox with keyboard and close controls.
-   Descriptive alt text.

### Contact

-   Approved phone/email.
-   Map and directions.
-   Enquiry form with clear success/error states.

## 6. Booking UX

-   Keep date and guest fields visible and easy to edit.
-   Show timezone and check-in/check-out rules clearly.
-   Display itemized charges before payment.
-   Show cancellation and payment terms before final confirmation.
-   Preserve form data when validation fails.
-   Use a clear progress indicator for multi-step checkout.
-   Confirmation page must show booking reference and next steps.

## 7. QR guest portal UX

### Restaurant

-   Table identifier displayed in a privacy-safe form.
-   Menu categories as scrollable chips or a clear category list.
-   Search/filter only if menu size justifies it.
-   Large food images, clear prices and dietary markers.
-   Sticky cart summary on mobile.
-   Confirm table and items before submission.
-   Show order number and status timeline after submission.

### Room service

-   Show resort logo and room context without exposing personal data.
-   Present service choices as large, simple cards.
-   Minimize typing.
-   Confirm request before submission.
-   Show request status and expected response guidance.
-   Provide a clear contact/reception fallback.

## 8. Admin UX

-   Persistent sidebar on desktop; collapsible navigation on
    tablet/mobile.
-   Dashboard cards for key operational metrics.
-   Tables with search, filters, sorting and pagination.
-   Clear status labels and action confirmations.
-   Avoid destructive actions without confirmation.
-   Use skeleton loading states and meaningful empty states.
-   Provide bulk actions only where safe and auditable.
-   Kitchen queue should be optimized for quick scanning and touch use.

## 9. Components

-   Header and footer
-   Booking search widget
-   Date-range picker
-   Guest selector
-   Room card
-   Facility card
-   Gallery grid/lightbox
-   Price breakdown
-   Booking status badge
-   Menu category navigation
-   Menu item card
-   Cart drawer
-   Order timeline
-   Table status card
-   Service request card
-   Admin data table
-   Confirmation dialog
-   Toast/notification
-   Form field and validation message

## 10. Motion and interaction

-   Use subtle fade/slide transitions.
-   Keep hover effects restrained.
-   Avoid scroll hijacking and excessive parallax.
-   Respect `prefers-reduced-motion`.
-   Do not animate essential status changes in a way that delays
    comprehension.
-   Use loading indicators for real operations, not decorative waiting.

## 11. Accessibility

-   Semantic HTML.
-   Keyboard-accessible navigation and dialogs.
-   Visible focus states.
-   Sufficient text/background contrast.
-   Labels for all form controls.
-   Alt text for meaningful images.
-   Do not communicate status by colour alone.
-   Touch targets should be comfortably sized.

## 12. Content and trust

-   Use genuine resort photographs.
-   Use real, approved reviews only.
-   Display transparent pricing and policies.
-   Avoid fake ratings, fake availability and invented testimonials.
-   Confirm all contact details before launch.
