export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  src: string;
  category: "all" | "rooms" | "pool" | "dining" | "events" | "property";
  categoryLabel: string;
  isVerified: boolean;
  featured?: boolean;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "exterior-facade",
    title: "Resort Exterior & Grounds",
    caption: "Multi-story Dhuri Resort building facade surrounded by lush tropical palm trees and open skies.",
    src: "/images/resort/exterior_facade.jpg",
    category: "property",
    categoryLabel: "Property & Grounds",
    isVerified: true,
    featured: true,
  },
  {
    id: "swimming-pool-day",
    title: "Crystal Outdoor Swimming Pool",
    caption: "Daytime view of the expansive outdoor swimming pool with checkered patio decks and serene palm backdrop.",
    src: "/images/resort/swimming_pool.jpg",
    category: "pool",
    categoryLabel: "Swimming Pool",
    isVerified: true,
    featured: true,
  },
  {
    id: "swimming-pool-night",
    title: "Evening Fairy-Lit Pool Ambiance",
    caption: "Festive evening lights illuminating the sparkling pool deck for celebrations, parties, and night relaxation.",
    src: "/images/resort/swimming_pool_night.jpg",
    category: "pool",
    categoryLabel: "Swimming Pool",
    isVerified: true,
    featured: true,
  },
  {
    id: "reception-lobby",
    title: "Front Desk & Reception Lobby",
    caption: "Official Dhuri Resort branded reception counter staffed 24 hours a day for guest check-in and assistance.",
    src: "/images/resort/reception_lobby.jpg",
    category: "property",
    categoryLabel: "Property & Grounds",
    isVerified: true,
    featured: true,
  },
  {
    id: "room-deluxe-double",
    title: "Deluxe Double Bedroom",
    caption: "Signature air-conditioned double room with celebratory swan towel décor, ambient lighting, and double bed.",
    src: "/images/resort/room_deluxe_double.jpg",
    category: "rooms",
    categoryLabel: "Rooms & Suites",
    isVerified: true,
    featured: true,
  },
  {
    id: "bathroom-modern",
    title: "Modern Ensuite Bathroom",
    caption: "Guest bathroom fitted with counter-top wash basin, wall tiling, modern sanitary ware, and hot shower.",
    src: "/images/resort/bathroom_modern.jpg",
    category: "rooms",
    categoryLabel: "Rooms & Suites",
    isVerified: true,
    featured: false,
  },
  {
    id: "restaurant-entrance",
    title: "Family Restaurant & Bar Entrance",
    caption: "Direct poolside doorway welcoming diners into the multi-cuisine family restaurant and cocktail bar.",
    src: "/images/resort/restaurant_entrance.jpg",
    category: "dining",
    categoryLabel: "Dining & Bar",
    isVerified: true,
    featured: true,
  },
  {
    id: "restaurant-dining",
    title: "Buffet & Dining Counter Setup",
    caption: "Spacious buffet catering counters and outdoor dining setup for events, lunches, and parties.",
    src: "/images/resort/restaurant_dining.jpg",
    category: "dining",
    categoryLabel: "Dining & Bar",
    isVerified: true,
    featured: false,
  },
  {
    id: "banquet-lawn",
    title: "Grand Banquet Lawn",
    caption: "Festive evening party lawn arranged with red-carpet aisle, stage canopy, and plush sofa seating.",
    src: "/images/resort/banquet_lawn.jpg",
    category: "events",
    categoryLabel: "Events & Lawns",
    isVerified: true,
    featured: true,
  },
  {
    id: "corridor-lifts",
    title: "Elevator Lobby & Guest Corridors",
    caption: "Polished granite elevator lobby with dual passenger lifts providing effortless access to all room floors.",
    src: "/images/resort/corridor_lifts.jpg",
    category: "property",
    categoryLabel: "Property & Grounds",
    isVerified: true,
    featured: false,
  }
];

export const GALLERY_CATEGORIES = [
  { key: "all", label: "All Photographs" },
  { key: "rooms", label: "Rooms & Suites" },
  { key: "pool", label: "Swimming Pool" },
  { key: "dining", label: "Dining & Bar" },
  { key: "events", label: "Events & Lawns" },
  { key: "property", label: "Property & Lobbies" },
] as const;

