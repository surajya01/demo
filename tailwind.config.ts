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
        // Luxury Boutique Hotel Solid Palette
        ivory: {
          DEFAULT: "#F8F6F1",
          50: "#FDFAF6",
          100: "#FAF6EE",
          200: "#F8F6F1",
          300: "#EEE8DC",
          400: "#E3DAC7",
        },
        charcoal: {
          DEFAULT: "#252525",
          light: "#3A3A3A",
          dark: "#1A1A1A",
          muted: "#77736D",
        },
        bronze: {
          DEFAULT: "#A78355",
          hover: "#936F43",
          light: "#C5A982",
          muted: "#B89A72",
          dark: "#7E613B",
          50: "#FAF7F2",
          100: "#F4EDE2",
          200: "#E6D7C1",
          300: "#D4BE9B",
          400: "#BF9F72",
          500: "#A78355",
          600: "#936F43",
          700: "#7E613B",
        },
        warmgrey: {
          DEFAULT: "#77736D",
          light: "#9A9690",
          dark: "#5A5651",
        },
        lightbeige: {
          DEFAULT: "#E8E3DA",
          light: "#F2EFEB",
          dark: "#D6CFC3",
        },

        // Backward compatibility mappings for legacy classes
        sapphire: {
          DEFAULT: "#252525",
          50: "#F8F6F1",
          100: "#FAF6EE",
          200: "#E8E3DA",
          300: "#C5A982",
          400: "#A78355",
          500: "#252525",
          600: "#252525",
          700: "#1A1A1A",
          800: "#151515",
          900: "#101010",
          dark: "#1A1A1A",
        },
        forest: {
          DEFAULT: "#252525",
          50: "#F8F6F1",
          100: "#FAF6EE",
          200: "#E8E3DA",
          300: "#C5A982",
          400: "#A78355",
          500: "#252525",
          600: "#252525",
          700: "#1A1A1A",
          800: "#151515",
          900: "#101010",
          dark: "#1A1A1A",
        },
        beige: {
          DEFAULT: "#F8F6F1",
          50: "#FDFAF6",
          100: "#FAF6EE",
          200: "#F8F6F1",
          300: "#E8E3DA",
          400: "#D6CFC3",
          500: "#C5A982",
        },
        gold: {
          DEFAULT: "#A78355",
          50: "#FAF7F2",
          100: "#F4EDE2",
          200: "#E6D7C1",
          300: "#D4BE9B",
          400: "#BF9F72",
          500: "#A78355",
          600: "#936F43",
          700: "#7E613B",
        },
        offwhite: {
          DEFAULT: "#F8F6F1",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        112: "28rem",
        128: "32rem",
      },
      borderRadius: {
        luxury: "0.75rem",
        "luxury-lg": "1.25rem",
      },
      boxShadow: {
        subtle: "0 2px 8px 0 rgba(37, 37, 37, 0.04)",
        card: "0 8px 24px -4px rgba(37, 37, 37, 0.06), 0 2px 6px -1px rgba(37, 37, 37, 0.03)",
        elevated: "0 16px 36px -8px rgba(37, 37, 37, 0.08), 0 4px 12px -2px rgba(37, 37, 37, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
