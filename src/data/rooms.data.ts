import { BRAND_CONFIG } from "@/config/brand";

export interface RoomAmenity {
  name: string;
  category: "comfort" | "bathroom" | "media" | "convenience";
  isVerified: boolean;
}

export interface RoomItem {
  id: string;
  slug: string;
  name: string;
  categoryName: string;
  shortDescription: string;
  description: string;
  longDescription: string[];
  maxAdults: number;
  maxChildren: number;
  maxOccupancy: number;
  basePrice: number;
  weekendPrice: number;
  currency: string;
  sizeSqFt: number;
  bedConfiguration: string;
  view: string;
  coverImage: string;
  galleryImages: string[];
  amenities: string[];
  features: { label: string; value: string }[];
  isVerified: boolean;
  isPopular?: boolean;
}

export const ROOMS_DATA: RoomItem[] = [
  {
    id: "deluxe-double-room",
    slug: "deluxe-double-room",
    name: "Deluxe Double Room",
    categoryName: "Deluxe Collection",
    shortDescription: "Air-conditioned luxury room featuring plush double bed, private ensuite bathroom, and direct swimming pool access.",
    description: "Our signature Deluxe Double Room is meticulously appointed for couples, business travelers, and small families seeking tranquil resort comfort in Vasai.",
    longDescription: [
      "The Deluxe Double Room at Apexify Resort combines modern hospitality with the peaceful ambiance of our lush Vasai property. Featuring an extra-comfortable double bed with crisp white linens, high-velocity air conditioning, and a dedicated workspace, it is designed for both restful weekends and extended stays.",
      "Guests enjoy a private ensuite bathroom equipped with a contemporary vanity, instant hot water shower, premium toiletries, and fresh plush towels. Large windows welcome natural garden light while insulated glazing ensures a quiet, peaceful sleep.",
      "Step directly out toward the palm-fringed swimming pool deck or order 24-hour in-room dining from our Family Restaurant & Bar with a single phone call to reception."
    ],
    maxAdults: 2,
    maxChildren: 1,
    maxOccupancy: 3,
    basePrice: 3200,
    weekendPrice: 3800,
    currency: "INR",
    sizeSqFt: 280,
    bedConfiguration: "1 Double Bed (Extra Bed available on request)",
    view: "Pool deck & Tropical Garden view",
    coverImage: "/images/resort/room_deluxe_double.jpg",
    galleryImages: [
      "/images/resort/room_deluxe_double.jpg",
      "/images/resort/bathroom_modern.jpg",
      "/images/resort/corridor_lifts.jpg",
      "/images/resort/swimming_pool.jpg"
    ],
    amenities: [
      "High-Efficiency Air Conditioning",
      "Private Ensuite Bathroom with Modern Shower",
      "Flat-screen TV with Cable Channels",
      "Complimentary High-Speed Wi-Fi",
      "Dedicated Work Desk & Ergonomic Chair",
      "24-Hour Room Service & Wake-up Calls",
      "Daily Housekeeping & Fresh Linens",
      "Direct Pool Deck Access",
      "Complimentary Toiletries & Towels",
      "Intercom Direct to Front Desk"
    ],
    features: [
      { label: "Room Size", value: "280 sq.ft (26 m²)" },
      { label: "Bed Setup", value: "1 Queen / Double Bed" },
      { label: "Max Guests", value: "2 Adults + 1 Child" },
      { label: "Air Conditioning", value: "Included (Split AC)" },
      { label: "Bathroom", value: "Ensuite with Shower" },
      { label: "Check-in / Check-out", value: "12:00 PM / 10:00 AM" }
    ],
    isVerified: true,
    isPopular: true
  },
  {
    id: "executive-double-room",
    slug: "executive-double-room",
    name: "Executive Double Room",
    categoryName: "Executive Collection",
    shortDescription: "Spacious premium retreat offering enhanced living space, king bedding, sitting lounge, and curated amenities.",
    description: "The Executive Double Room delivers extra floor space, refined décor, and thoughtful touches for discerning travelers celebrating anniversaries or corporate getaways.",
    longDescription: [
      "Offering generous proportions and tailored furnishings, the Executive Double Room provides a peaceful sanctuary away from the city hustle. With a sprawling 350 sq.ft layout, it accommodates an oversized King bed, a cozy sitting area with coffee table, and an executive writing desk.",
      "The private bathroom features premium sanitary fittings, modern counter-top washbasin, and complimentary luxury toiletries. Enjoy the tranquil courtyard breeze or stay entertained with satellite television and high-speed Wi-Fi.",
      "Ideal for business executives visiting Waliv's industrial hub or couples enjoying a rejuvenating weekend escape in Vasai East."
    ],
    maxAdults: 2,
    maxChildren: 1,
    maxOccupancy: 3,
    basePrice: 4200,
    weekendPrice: 4800,
    currency: "INR",
    sizeSqFt: 350,
    bedConfiguration: "1 King Bed or 2 Twin Beds",
    view: "Resort Courtyard & Garden view",
    coverImage: "/images/placeholders/room_placeholder.svg",
    galleryImages: [
      "/images/placeholders/room_placeholder.svg",
      "/images/resort/bathroom_modern.jpg",
      "/images/resort/corridor_lifts.jpg"
    ],
    amenities: [
      "Climate Controlled Air Conditioning",
      "Spacious Private Bathroom with Shower",
      "Smart Flat-screen TV",
      "Complimentary High-Speed Wi-Fi",
      "Sitting Area with Coffee Table",
      "Tea & Coffee Maker Setup",
      "24-Hour Front Desk & In-room Dining",
      "Wardrobe with Luggage Rack",
      "Premium Toiletries & Bath Slippers"
    ],
    features: [
      { label: "Room Size", value: "350 sq.ft (32.5 m²)" },
      { label: "Bed Setup", value: "1 King Bed" },
      { label: "Max Guests", value: "2 Adults + 1 Child" },
      { label: "Air Conditioning", value: "Yes (Split AC)" },
      { label: "Bathroom", value: "Ensuite Modern Bath" },
      { label: "Status", value: "Photography Awaiting Management Approval" }
    ],
    isVerified: false,
    isPopular: false
  },
  {
    id: "standard-double-room-fan",
    slug: "standard-double-room-fan",
    name: "Standard Double Room with Fan",
    categoryName: "Value Collection",
    shortDescription: "Economical, comfortable retreat equipped with high-speed ceiling fan, extra-large double bed, and tiled bathroom.",
    description: "An economical, value-focused accommodation designed for budget travelers, families, and transit guests requiring clean, dependable lodging.",
    longDescription: [
      "Designed for guests who prefer natural air flow and value affordability, the Standard Double Room features high-grade ceiling fans, an extra-large double bed, tiled flooring, and ample wardrobe storage.",
      "Enjoy full access to all resort amenities including our swimming pool, restaurant, free private parking, and 24-hour front desk assistance at our most accessible nightly rate.",
      "Every room is sanitized daily to the highest hospitality standards, ensuring a pleasant, stress-free stay in Vasai East."
    ],
    maxAdults: 2,
    maxChildren: 2,
    maxOccupancy: 4,
    basePrice: 2200,
    weekendPrice: 2600,
    currency: "INR",
    sizeSqFt: 240,
    bedConfiguration: "1 Extra-Large Double Bed",
    view: "Inner courtyard view",
    coverImage: "/images/placeholders/room_placeholder.svg",
    galleryImages: [
      "/images/placeholders/room_placeholder.svg",
      "/images/resort/corridor_lifts.jpg"
    ],
    amenities: [
      "High-Speed Ceiling Fan",
      "Private Tiled Bathroom with Shower",
      "Free High-Speed Wi-Fi",
      "Flat-screen TV",
      "Wardrobe & Storage Space",
      "24-Hour Front Desk Support",
      "Complimentary Swimming Pool Access",
      "Secure On-Site Vehicle Parking"
    ],
    features: [
      { label: "Room Size", value: "240 sq.ft (22 m²)" },
      { label: "Bed Setup", value: "1 Extra-Large Double Bed" },
      { label: "Max Guests", value: "2 Adults + 2 Children" },
      { label: "Ventilation", value: "Ceiling Fan (Non-AC)" },
      { label: "Bathroom", value: "Private Ensuite Bath" },
      { label: "Status", value: "Photography Awaiting Management Approval" }
    ],
    isVerified: false,
    isPopular: false
  }
];

export function getRoomBySlug(slug: string): RoomItem | undefined {
  return ROOMS_DATA.find((r) => r.slug === slug);
}

export function getRelatedRooms(currentSlug: string): RoomItem[] {
  return ROOMS_DATA.filter((r) => r.slug !== currentSlug);
}

