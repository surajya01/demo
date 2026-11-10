/**
 * Dhuri Resort Verified Property Catalogue
 * Extracted from official property documents & Booking.com property listing.
 * Serves as the verified source of truth and fallback data for the public website.
 */

export interface VerifiedRoom {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  maxAdults: number;
  maxChildren: number;
  maxOccupancy: number;
  basePrice: number;
  currency: string;
  sizeSqFt: number;
  bedConfiguration: string;
  coverImage: string;
  galleryImages: string[];
  amenities: string[];
  isVerified: boolean;
}

export const VERIFIED_ROOMS: VerifiedRoom[] = [
  {
    id: "deluxe-double-room",
    slug: "deluxe-double-room",
    name: "Deluxe Double Room",
    shortDescription: "Air-conditioned luxury double room with ensuite bathroom and pool access.",
    description: "Our signature Deluxe Double Room offers restful luxury with a plush double bed, private modern bathroom, flat-screen TV with cable channels, dedicated work desk, air conditioning, and wake-up service.",
    maxAdults: 2,
    maxChildren: 1,
    maxOccupancy: 3,
    basePrice: 3200,
    currency: "INR",
    sizeSqFt: 280,
    bedConfiguration: "1 Double Bed",
    coverImage: "/images/resort/room_deluxe_double.jpg",
    galleryImages: [
      "/images/resort/room_deluxe_double.jpg",
      "/images/resort/bathroom_modern.jpg",
      "/images/resort/corridor_lifts.jpg",
    ],
    amenities: [
      "Air Conditioning",
      "Private Ensuite Bathroom",
      "Flat-screen TV",
      "Free High-speed WiFi",
      "Work Desk & Chair",
      "24-Hour Room Service",
      "Daily Housekeeping",
      "Shower & Fresh Towels",
    ],
    isVerified: true,
  },
  {
    id: "executive-double-room",
    slug: "executive-double-room",
    name: "Executive Double Room",
    shortDescription: "Spacious premium room with enhanced furnishings and courtyard view.",
    description: "The Executive Double Room is tailored for business travelers and couples seeking elevated comfort, featuring a generous floor plan, premium bedding, tea/coffee station, work desk, and upgraded bathroom amenities.",
    maxAdults: 2,
    maxChildren: 1,
    maxOccupancy: 3,
    basePrice: 4200,
    currency: "INR",
    sizeSqFt: 350,
    bedConfiguration: "1 King Bed or 1 Double Bed",
    coverImage: "/images/placeholders/room_placeholder.svg",
    galleryImages: [
      "/images/placeholders/room_placeholder.svg",
      "/images/resort/bathroom_modern.jpg",
    ],
    amenities: [
      "Air Conditioning",
      "Upgraded Bath Amenities",
      "Private Balcony Area",
      "Flat-screen TV",
      "Free High-speed WiFi",
      "Electric Kettle & Tea Setup",
      "24-Hour Front Desk Support",
    ],
    isVerified: false, // Awaiting official interior photo from management
  },
  {
    id: "standard-double-room-fan",
    slug: "standard-double-room-fan",
    name: "Standard Double Room with Fan",
    shortDescription: "Economical room with ceiling fan, extra-large double bed and garden breeze.",
    description: "An economical, comfortable choice for budget-conscious families and travelers, featuring an extra-large double bed, ceiling fan, private bathroom with shower, and tile/marble flooring.",
    maxAdults: 2,
    maxChildren: 2,
    maxOccupancy: 4,
    basePrice: 2200,
    currency: "INR",
    sizeSqFt: 240,
    bedConfiguration: "1 Extra-Large Double Bed",
    coverImage: "/images/placeholders/room_placeholder.svg",
    galleryImages: [
      "/images/placeholders/room_placeholder.svg",
    ],
    amenities: [
      "Ceiling Fan",
      "Private Bathroom",
      "Tile/Marble Flooring",
      "Free WiFi",
      "Wake-up Service",
      "Wardrobe or Closet",
    ],
    isVerified: false,
  },
];

export const RESORT_FACILITIES = [
  {
    id: "swimming-pool",
    title: "Outdoor Swimming Pool",
    category: "Recreation",
    description: "Expansive outdoor swimming pool with tropical palm surroundings, poolside sun loungers, and decorative lighting for evening events.",
    image: "/images/resort/swimming_pool.jpg",
    tags: ["Open All Year", "Poolside Deck", "Evening Lighting"],
  },
  {
    id: "dining-bar",
    title: "Family Restaurant & Bar",
    category: "Dining",
    description: "On-site multi-cuisine dining serving authentic Indian curries, tandoori kebabs, Chinese specialties, seafood, and cocktail refreshments.",
    image: "/images/resort/restaurant_entrance.jpg",
    tags: ["Multi-Cuisine", "Cocktail Hour", "Room Delivery Available"],
  },
  {
    id: "banquet-lawn",
    title: "Grand Banquet Lawn",
    category: "Events & Weddings",
    description: "Lush party lawn accommodating wedding receptions, corporate gatherings, and festive celebrations with red-carpet aisles and fairy-light canopies.",
    image: "/images/resort/banquet_lawn.jpg",
    tags: ["Wedding Mandap", "Sofa Lounges", "Catering Setup"],
  },
  {
    id: "reception",
    title: "24-Hour Front Desk",
    category: "Services",
    description: "Dedicated 24/7 guest reception lobby providing private check-in/out, luggage assistance, travel guidance, and room service coordination.",
    image: "/images/resort/reception_lobby.jpg",
    tags: ["24/7 Support", "Luggage Storage", "ATM on site"],
  },
  {
    id: "parking",
    title: "Free Private Parking",
    category: "Convenience",
    description: "Secure, complimentary private vehicle parking on-site for resort guests and banquet attendees.",
    image: "/images/resort/exterior_facade.jpg",
    tags: ["On-site", "Secure Parking", "Valet Support"],
  },
  {
    id: "modern-elevators",
    title: "Lift & Floor Accessibility",
    category: "Accessibility",
    description: "Modern granite-clad elevator lobby with dual lifts ensuring smooth, effortless access to all guest room floors.",
    image: "/images/resort/corridor_lifts.jpg",
    tags: ["Wheelchair Accessible", "Dual Lifts", "Marble Corridors"],
  },
];

export const RESORT_SURROUNDINGS = [
  { name: "Prime Industrial Park", distance: "2.8 km", type: "Business" },
  { name: "Baronda Devi Mountain", distance: "5.0 km", type: "Nature / Trekking" },
  { name: "Vasai Road Railway Station", distance: "7.0 km", type: "Transit" },
  { name: "Nalasopara Railway Station", distance: "7.0 km", type: "Transit" },
  { name: "Chhatrapati Shivaji Maharaj Mumbai Airport (BOM)", distance: "36 - 42 km", type: "Airport" },
  { name: "Thane City", distance: "28 km", type: "City Center" },
];

