/**
 * Dhuri Resort Brand Configuration
 * Developed by Apexify
 */

export const BRAND_CONFIG = {
  resortName: "Dhuri Resort",
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

  // Approved Brand Color Hexes
  colors: {
    forestGreen: "#234B3C",
    warmBeige: "#F4EFE5",
    mutedGold: "#C5A46D",
    offWhite: "#FAF9F6",
    charcoal: "#292D2A",
    pureWhite: "#FFFFFF",
  },
} as const;
