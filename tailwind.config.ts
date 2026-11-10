import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./packages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        forest: {
          DEFAULT: "#234B3C",
          50: "#F0F5F2",
          100: "#DDE8E2",
          200: "#B8D1C4",
          300: "#8CB4A2",
          400: "#5D927E",
          500: "#3E7461",
          600: "#234B3C",
          700: "#1C3C30",
          800: "#152D24",
          900: "#0E1E18",
          dark: "#1A372C",
        },
        beige: {
          DEFAULT: "#F4EFE5",
          50: "#FCFAF6",
          100: "#F8F5EE",
          200: "#F4EFE5",
          300: "#E8DEC9",
          400: "#D8C7A5",
          500: "#C4AC7D",
        },
        gold: {
          DEFAULT: "#C5A46D",
          50: "#FAF7F2",
          100: "#F3ECE0",
          200: "#E5D6BD",
          300: "#D7BF9A",
          400: "#C5A46D",
          500: "#B08A4E",
          600: "#8E6D38",
          700: "#6B522A",
        },
        offwhite: {
          DEFAULT: "#FAF9F6",
        },
        charcoal: {
          DEFAULT: "#292D2A",
          light: "#3E433F",
          dark: "#1B1E1C",
          muted: "#5A615C",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        112: "28rem",
        128: "32rem",
      },
      borderRadius: {
        luxury: "1rem",
        "luxury-lg": "1.5rem",
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(41, 45, 42, 0.05), 0 1px 2px 0 rgba(41, 45, 42, 0.03)",
        card: "0 4px 20px -2px rgba(35, 75, 60, 0.06), 0 2px 6px -1px rgba(35, 75, 60, 0.04)",
        elevated: "0 10px 30px -5px rgba(35, 75, 60, 0.1), 0 4px 10px -2px rgba(35, 75, 60, 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
