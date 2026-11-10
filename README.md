# Apexify Resort Frontend Website

**Designed & Developed by Apexify**

A modern, responsive, mobile-first frontend website for **Apexify Resort**, located in Waliv, Vasai East, Maharashtra, India.

---

## Features

- **Luxury Brand Aesthetic:** Built with a curated color palette (Royal Sapphire `#0F2C59`, Deep Midnight Navy `#0A1C38`, Warm Beige `#F4EFE5`, Champagne Gold `#C5A46D`, and Off-White `#FAF9F6`).
- **Comprehensive Public Pages (17 Routes):**
  - Home (`/`) with Hero, Highlights, Featured Rooms, Special Offers, Dining & Banquet, Gallery preview, Location & Testimonials.
  - Accommodation (`/rooms`) with room filters, amenity highlights, and individual room detail pages (`/rooms/[slug]`).
  - Dining & Banqueting (`/dining`, `/restaurant`) with interactive digital menu cards, category filters, and table reservation request form.
  - Facilities & Amenities (`/facilities`) showcasing the Swimming Pool, Lawn, Banquet Hall, AC Conference Rooms, and Children's Play Area.
  - Photo Gallery (`/gallery`) with category filter tabs and interactive lightbox modal.
  - Special Offers & Day Packages (`/offers`) with pool passes and celebration package deals.
  - Reservation Lookup (`/booking/lookup`) guest portal with instant status viewer.
  - Contact & Location (`/contact`) with direct inquiry form, Google Maps directions, and contact details.
  - Policy & Legal pages (`/about`, `/faq`, `/terms`, `/privacy-policy`, `/cancellation-policy`).
- **Zero Backend / Database Dependency:** The entire website runs standalone with typed static data in `src/data/`.
- **Direct WhatsApp & Phone Integration:** Booking and inquiry CTAs directly route to WhatsApp chat and telephone for instant guest communication.

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Library:** React 18
- **Language:** TypeScript
- **Styling:** Tailwind CSS v3.4 + Custom Brand Design Tokens
- **Icons:** Lucide React
- **Animations:** Framer Motion

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the website.

### 3. Build for Production
```bash
npm run build
```
