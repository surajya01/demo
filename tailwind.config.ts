import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
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
        sapphire: {
          DEFAULT: "#0F2C59",
          50: "#F0F4FA",
          100: "#DCE7F5",
          200: "#B9D0EB",
          300: "#8EB3DD",
          400: "#5D91CB",
          500: "#3672B5",
          600: "#0F2C59",
          700: "#0C2347",
          800: "#091B36",
          900: "#061225",
          dark: "#0A1C38",
        },
        forest: {
          DEFAULT: "#0F2C59",
          50: "#F0F4FA",
          100: "#DCE7F5",
          200: "#B9D0EB",
          300: "#8EB3DD",
          400: "#5D91CB",
          500: "#3672B5",
          600: "#0F2C59",
          700: "#0C2347",
          800: "#091B36",
          900: "#061225",
          dark: "#0A1C38",
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
          DEFAULT: "#1B2430",
          light: "#2C3847",
          dark: "#10161E",
          muted: "#4F5D70",
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
        subtle: "0 1px 3px 0 rgba(15, 44, 89, 0.05), 0 1px 2px 0 rgba(15, 44, 89, 0.03)",
        card: "0 4px 20px -2px rgba(15, 44, 89, 0.06), 0 2px 6px -1px rgba(15, 44, 89, 0.04)",
        elevated: "0 10px 30px -5px rgba(15, 44, 89, 0.1), 0 4px 10px -2px rgba(15, 44, 89, 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
