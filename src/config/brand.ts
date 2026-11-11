/**
 * Apexify Resort Brand Configuration
 * Developed by Apexify
 */

export const BRAND_CONFIG = {
  resortName: "Apexify Resort",
  brandSubtitle: "Resort & Dining · Vasai",
  developerCredit: "Designed & Developed by Apexify",
  developerName: "Apexify",
  poweredByCredit: "Powered by Apexify",
  
  // Location details derived from verified property listing
  location: {
    address: "Near Navjeevan Naka, Waliv, Vasai Road - East",
    city: "Vasai",
    district: "Palghar",
    state: "Maharashtra",
    pincode: "401208",
    country: "India",
    landmark: "Near Navjeevan Naka / Pelhar / Sativali Road",
    coordinates: {
      // Approximate map coordinates in Waliv, Vasai East
      latitude: 19.3919,
      longitude: 72.8687,
    },
  },

  // Operational Rules (from property listing)
  rules: {
    checkInTime: "12:00 PM",
    checkOutTime: "10:00 AM",
    extraBedChargePerNight: 500, // INR
    petsAllowed: false,
    smokingAllowed: false,
  },

  // Approved Luxury Hospitality Color Palette (Solid tones, no gradients)
  colors: {
    ivory: "#F8F6F1",
    white: "#FFFFFF",
    charcoal: "#252525",
    mutedBronze: "#A78355",
    warmGrey: "#77736D",
    lightBeige: "#E8E3DA",
    // Backwards compatible aliases
    royalSapphire: "#252525",
    forestGreen: "#252525",
    midnightNavy: "#1C1C1C",
    warmBeige: "#F8F6F1",
    mutedGold: "#A78355",
    offWhite: "#F8F6F1",
    pureWhite: "#FFFFFF",
  },
} as const;
