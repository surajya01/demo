# Responsive Design & Testing Specification

## Dhuri Resort Website, Admin Dashboard and QR Guest Portal

## 1. Objective

All guest-facing and staff-facing interfaces must adapt to mobile,
tablet and desktop without horizontal overflow, clipped content,
inaccessible controls or broken workflows.

Mobile is the priority for the public website and QR guest portal. Admin
screens must remain usable on tablets and provide a functional mobile
fallback.

## 2. Supported viewport targets

Use content-driven breakpoints rather than designing only for fixed
devices.

  Target                Width reference Primary use
  ----------------- ------------------- ---------------------------
  Small mobile              320--374 px Compact Android/iPhone
  Standard mobile           375--430 px Most phones
  Large mobile              431--767 px Large phones
  Tablet                   768--1023 px Tablet portrait/landscape
  Laptop                  1024--1439 px Standard laptop
  Desktop             1440 px and above Large desktop

Test at minimum: 320, 360, 375, 390, 414, 768, 1024, 1280 and 1440 CSS
pixels.

## 3. Global responsive rules

-   Use a centered content container with a sensible maximum width.
-   Use fluid widths and CSS grid/flexbox.
-   Avoid fixed widths for primary content.
-   Prevent horizontal page scrolling.
-   Use responsive image sizing and correct aspect ratios.
-   Allow long text, addresses and booking references to wrap.
-   Keep spacing and typography fluid within defined limits.
-   Use `min-width: 0` for flex/grid children where truncation or
    overflow can occur.
-   Do not rely on hover for essential actions.
-   Support keyboard navigation and visible focus.
-   Respect safe areas on modern phones.
-   Keep sticky elements clear of browser controls and bottom safe
    areas.

## 4. Suggested breakpoints

Example Tailwind-oriented approach: - Base: below 640 px. - `sm`: 640 px
and above. - `md`: 768 px and above. - `lg`: 1024 px and above. - `xl`:
1280 px and above. - `2xl`: 1536 px and above.

These are starting points. Change them when actual content requires it.

## 5. Public website responsiveness

### Header

-   Desktop: full navigation and visible Book Now action.
-   Mobile: logo, menu toggle and a clear booking action.
-   Menu opens as an accessible drawer or dropdown.
-   Lock background scrolling while modal navigation is open.
-   Close on Escape and provide a visible close button.

### Hero

-   Use a mobile-specific crop or focal position.
-   Keep headline readable over image.
-   Do not let the booking CTA fall below excessive decorative content.
-   Use a poster image if video is too heavy or unsupported.
-   Avoid autoplay audio.

### Booking search

-   Desktop: horizontal fields where space permits.
-   Mobile: stacked fields or a compact step-based search panel.
-   Date pickers must fit the viewport.
-   Guest selectors must be keyboard and touch accessible.
-   Show selected dates and guest counts clearly.

### Room cards

-   Desktop: two or three columns depending on content width.
-   Tablet: two columns where cards remain readable.
-   Mobile: one column.
-   Keep image ratios consistent.
-   Stack price and CTA without overlap.
-   Avoid hiding important amenities behind hover.

### Gallery

-   Responsive grid with consistent gaps.
-   Mobile: two columns only when images and controls remain usable;
    otherwise one column.
-   Lightbox fits viewport and supports swipe only as an enhancement,
    not the only navigation method.

### Facilities and restaurant

-   Use responsive card grids.
-   Keep icons and text aligned.
-   Avoid overly long horizontal carousels for essential information.

### Footer

-   Desktop: multiple columns.
-   Mobile: stacked sections or accessible accordions.
-   Phone and email links must be tappable.

## 6. Booking flow responsiveness

-   Use a single-column form on phones.
-   Keep labels above inputs.
-   Inputs should not cause iOS zoom; use appropriate font sizing.
-   Display price breakdown in a collapsible summary if necessary.
-   Keep final amount visible before payment.
-   Make validation messages appear near the relevant field.
-   Buttons should span the available width on narrow screens.
-   Confirmation reference must wrap safely and offer copy action.
-   Never allow sticky checkout controls to cover form fields or legal
    text.

## 7. QR guest portal responsiveness

This is the highest-priority mobile experience.

### Restaurant menu

-   Fast initial load on mobile networks.
-   Table context visible but not intrusive.
-   Category navigation can scroll horizontally with clear overflow
    cues.
-   Food cards should have readable names and prices.
-   Add buttons must be large enough for touch.
-   Cart summary can be sticky at the bottom, respecting safe areas.
-   Cart drawer must fit short screens and allow scrolling.
-   Confirmation step must show table, items, quantities and total.

### Room service

-   Large service tiles.
-   Minimal typing.
-   Full-width primary action.
-   Status timeline that wraps on small screens.
-   Clear fallback contact action.
-   Avoid requiring app installation.

## 8. Admin dashboard responsiveness

### Desktop

-   Sidebar plus main content.
-   Dense tables where appropriate.
-   Filters and actions grouped logically.

### Tablet

-   Collapsible sidebar.
-   Tables may use horizontal scrolling inside their own container.
-   Keep key row actions accessible.

### Mobile

-   Use compact navigation or drawer.
-   Convert wide data tables into stacked cards where practical.
-   Keep critical actions visible.
-   Use filters in a drawer or expandable panel.
-   Forms use one column.
-   Kitchen queue cards must support touch and quick status updates.
-   Do not shrink desktop tables until text becomes unreadable.

## 9. Typography and spacing

-   Body text should remain comfortably readable on small screens.
-   Use `clamp()` for fluid headings where useful.
-   Avoid very small metadata text.
-   Maintain consistent spacing tokens.
-   Do not use fixed heights for content-heavy cards.
-   Use minimum heights only when they improve alignment.

## 10. Images and performance

-   Use Next.js image optimization or an equivalent image pipeline.
-   Supply responsive image sizes.
-   Use modern formats where supported.
-   Set width/height or aspect ratio to prevent layout shift.
-   Lazy-load below-the-fold images.
-   Prioritize the hero image appropriately.
-   Avoid large background videos on mobile unless performance is
    acceptable.
-   Compress QR portal menu images aggressively without making food
    images unclear.

## 11. Interaction and accessibility

-   Touch targets should generally be around 44 × 44 CSS pixels where
    practical.
-   Provide focus indicators.
-   Use semantic buttons and links.
-   Dialogs and drawers must trap focus appropriately and restore focus
    on close.
-   Do not communicate status by colour alone.
-   Support reduced motion.
-   Forms must be usable with screen readers.
-   Ensure text contrast is sufficient.

## 12. Responsive QA checklist

### Global

-   [ ] No horizontal page overflow at 320 px.
-   [ ] No clipped headings or buttons.
-   [ ] Navigation works with touch and keyboard.
-   [ ] Images preserve intended crop.
-   [ ] Text remains readable at browser zoom.
-   [ ] Sticky elements do not cover content.

### Website

-   [ ] Hero and booking CTA usable on mobile.
-   [ ] Room cards stack correctly.
-   [ ] Gallery lightbox fits screen.
-   [ ] Contact links are tappable.
-   [ ] Footer layout works.

### Booking

-   [ ] Date picker fits small screens.
-   [ ] Guest selector works.
-   [ ] Validation messages are visible.
-   [ ] Price summary remains understandable.
-   [ ] Payment return and confirmation work on mobile.

### QR portal

-   [ ] QR opens in mobile browser without app installation.
-   [ ] Menu loads on typical mobile network.
-   [ ] Cart is usable with one hand.
-   [ ] Order confirmation is clear.
-   [ ] Room requests can be submitted and tracked.

### Admin

-   [ ] Sidebar collapses correctly.
-   [ ] Tables remain usable.
-   [ ] Filters are accessible.
-   [ ] Kitchen status actions work on touch devices.
-   [ ] Forms do not overflow.

## 13. Definition of done

A responsive feature is complete only when it has been checked at the
agreed viewport widths, on at least one real Android device and one real
iOS device where available, and with keyboard navigation for relevant
controls. Screenshots alone are not sufficient; complete the actual
booking, order and service-request workflows at mobile sizes.
