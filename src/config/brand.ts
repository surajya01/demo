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

  // Approved Brand Color Hexes (Royal Sapphire & Champagne Gold)
  colors: {
    royalSapphire: "#0F2C59",
    forestGreen: "#0F2C59", // alias for backwards compatibility
    midnightNavy: "#0A1C38",
    warmBeige: "#F4EFE5",
    mutedGold: "#C5A46D",
    offWhite: "#FAF9F6",
    charcoal: "#1B2430",
    pureWhite: "#FFFFFF",
  },
} as const;
