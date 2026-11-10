# Apexify Resort Digital Hospitality Platform

**Designed & Developed by Apexify**

A comprehensive, mobile-first resort platform for **Apexify Resort**, located in Waliv, Vasai East, Maharashtra, India. The platform integrates:
- Direct room reservations and enquiry workflows
- Restaurant QR digital menu, ordering, table sessions and billing
- Room-specific QR guest portal for housekeeping and service requests
- Central resort operations dashboard

---

## Phase 1 & 2 Status: COMPLETED

- **Phase 1 (Architecture & Database):** MySQL normalized relational schema (30 models, 20 enums), Prisma ORM configuration, Serializable transaction isolation, and asset pipeline verified.
- **Phase 2 (Public Website Frontend):** Complete, mobile-first responsive public website with 17 routes, typed static content architecture, Framer Motion interactions, genuine resort photography, filterable lightbox gallery, interactive sample menu, enquiry modal with honest simulation feedback, and sitemap/robots SEO configuration. Zero database dependency required for frontend preview.

---

## Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Frontend:** React 18, TypeScript (Strict)
- **Styling:** Tailwind CSS v3.4 + Brand Theme Tokens
- **Database:** MySQL 8.0+
- **ORM:** Prisma ORM 5.22
- **Validation:** Zod
- **Animations:** Framer Motion

---

## Approved Brand Color Palette

| Token | Hex | Role |
| :--- | :--- | :--- |
| **Forest Green** | `#234B3C` | Primary brand color, headers, primary buttons |
| **Warm Beige** | `#F4EFE5` | Soft section backgrounds, cards |
| **Muted Gold** | `#C5A46D` | Accent details, badges, highlight borders |
| **Off White** | `#FAF9F6` | Primary background canvas |
| **Charcoal** | `#292D2A` | Primary typography and high-contrast text |
| **Pure White** | `#FFFFFF` | Card surfaces and input backgrounds |

---

## Project Structure

```
apexify-resort/
├── packages/
│   ├── database/         # Prisma client instance and transaction helpers
│   ├── shared-types/     # DTOs, Enums, API response contracts
│   ├── validation/       # Shared Zod validation schemas
│   └── ui/               # Luxury UI primitives (Button, Card, Badge, Inputs, Navbar, Footer)
├── docs/                 # Complete documentation package (PRD, TRD, DATABASE, UI-UX, etc.)
│   ├── ASSET-MAPPING.md  # Curated verified images and placeholder mapping
│   └── PHASE-1-REPORT.md # Technical completion report
├── prisma/
│   ├── schema.prisma     # 30 normalized models & 20 enums for MySQL 8.0+
│   ├── migrations/       # Initial DDL migration script
│   └── seed.ts           # Development-only seed data script
├── public/
│   └── images/
│       ├── resort/       # 10 curated verified resort photographs
│       └── placeholders/ # Branded SVG placeholders for pending assets
├── scripts/
│   └── verify-db-connection.ts # Database diagnostic verification utility
├── src/
│   ├── app/              # Next.js App Router (layout, globals.css, Phase 1 dashboard, health API)
│   ├── lib/              # Database client, logger, AppError classes
│   ├── config/           # Brand constants and validated environment config
│   └── services/         # Domain services (room, booking, restaurant, qr)
├── .env.example          # Sample environment variables
└── README.md
```

---

## Getting Started

### 1. Prerequisites
- Node.js 18.17+ or 20+ (tested on Node v22)
- MySQL 8.0+ server

### 2. Setup Environment
```bash
cp .env.example .env
```
Ensure `DATABASE_URL` in `.env` points to your MySQL server:
```
DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/apexify_resort"
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Database Commands
```bash
# Verify database handshake and table counts
npm run db:verify

# Push Prisma schema to MySQL
npm run prisma:push

# Seed development-only sample data
npm run prisma:seed
```

### 5. Build and Run
```bash
# Type check
npm run type-check

# Next.js production build
npm run build

# Start local development server
npm run dev
```

---

## Documentation Index

- `docs/PRD.md`: Product vision, user personas, functional requirements.
- `docs/TRD.md`: Architectural decisions, API contracts, security standards.
- `docs/DATABASE.md`: Normalized schema definitions, indexing, constraints.
- `docs/UI-UX.md`: Design system, page layouts, component specs.
- `docs/QR-SYSTEM.md`: Restaurant table and in-room QR token flows.
- `docs/IMPLEMENTATION-PLAN.md`: Delivery roadmap and phase gates.
- `docs/responsive.md`: Breakpoints, touch targets, mobile-first guidelines.
- `docs/ASSET-MAPPING.md`: Curated photo catalog and placeholder mappings.
- `docs/PHASE-1-REPORT.md`: Detailed Phase 1 signoff report.

---

**Project: Apexify Resort**  
**Technology Partner: Apexify**

