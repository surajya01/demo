/**
 * Dhuri Resort Design Tokens
 * Approved Brand Palette:
 * - Forest Green: #234B3C
 * - Warm Beige:   #F4EFE5
 * - Muted Gold:   #C5A46D
 * - Off White:    #FAF9F6
 * - Charcoal:     #292D2A
 * - Pure White:   #FFFFFF
 */

export const colors = {
  forest: {
    primary: "#234B3C",
    dark: "#1A372C",
    light: "#3E7461",
    subtle: "#F0F5F2",
  },
  beige: {
    primary: "#F4EFE5",
    surface: "#FAF8F3",
    border: "#E8DEC9",
  },
  gold: {
    primary: "#C5A46D",
    hover: "#B08A4E",
    light: "#F3ECE0",
  },
  offwhite: "#FAF9F6",
  charcoal: {
    primary: "#292D2A",
    muted: "#5A615C",
    light: "#7B827D",
  },
  white: "#FFFFFF",
} as const;

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const spacing = {
  xs: "0.25rem", // 4px
  sm: "0.5rem",  // 8px
  md: "1rem",    // 16px
  lg: "1.5rem",  // 24px
  xl: "2rem",    // 32px
  "2xl": "3rem", // 48px
  "3xl": "4rem", // 64px
} as const;

export const typography = {
  fontFamily: {
    serif: "'Playfair Display', Georgia, serif",
    sans: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
  },
  fontSize: {
    xs: "0.75rem",   // 12px
    sm: "0.875rem",  // 14px
    base: "1rem",    // 16px
    lg: "1.125rem",  // 18px
    xl: "1.25rem",   // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem",  // 36px
    "5xl": "3rem",     // 48px
  },
} as const;
