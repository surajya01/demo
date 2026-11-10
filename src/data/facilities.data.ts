export interface FacilityItem {
  id: string;
  slug: string;
  title: string;
  category: "Recreation" | "Dining" | "Events" | "Hospitality" | "Accessibility";
  summary: string;
  description: string;
  timings?: string;
  image: string;
  galleryImages: string[];
  keyHighlights: string[];
  isVerified: boolean;
}

export const FACILITIES_DATA: FacilityItem[] = [
  {
    id: "swimming-pool",
    slug: "swimming-pool",
    title: "Crystal Outdoor Swimming Pool",
    category: "Recreation",
    summary: "Sprawling outdoor pool framed by tropical palm trees, checkered patio tiles, and decorative evening illuminations.",
    description: "The crown jewel of Apexify Resort, our outdoor pool offers refreshing leisure under the Vasai sunshine. Whether you are swimming laps in the morning or enjoying a relaxed poolside mocktail with your family in the afternoon, the well-maintained pool provides the ideal vacation respite. In the evening, the pool deck transforms into an enchanting setting illuminated by warm fairy lights for private parties and cocktail gatherings.",
    timings: "7:00 AM – 7:00 PM (Daily)",
    image: "/images/resort/swimming_pool.jpg",
    galleryImages: [
      "/images/resort/swimming_pool.jpg",
      "/images/resort/swimming_pool_night.jpg",
      "/images/resort/exterior_facade.jpg"
    ],
    keyHighlights: [
      "Depth suitable for adults & supervised children",
      "Regularly filtered and treated freshwater",
      "Comfortable poolside sun loungers & umbrellas",
      "Magical fairy-lit evening ambiance",
      "Poolside snack & beverage service available"
    ],
    isVerified: true
  },
  {
    id: "restaurant-bar",
    slug: "restaurant-bar",
    title: "Family Restaurant & Bar",
    category: "Dining",
    summary: "Authentic multi-cuisine dining featuring flavorful Indian gravies, tandoori grills, Chinese stir-fries, and refreshing beverages.",
    description: "Apexify Resort's Family Restaurant & Bar welcomes in-house guests and local diners with heartwarming hospitality. Our experienced chefs prepare a wide selection of vegetarian and non-vegetarian specialties using fresh, locally sourced spices and ingredients. Enjoy meals in the air-conditioned dining room, open poolside patio, or directly delivered to your room.",
    timings: "11:00 AM – 11:30 PM (Daily)",
    image: "/images/resort/restaurant_entrance.jpg",
    galleryImages: [
      "/images/resort/restaurant_entrance.jpg",
      "/images/resort/restaurant_dining.jpg"
    ],
    keyHighlights: [
      "Separate Vegetarian & Non-Vegetarian kitchens",
      "Authentic North Indian, Mughlai & coastal specialties",
      "Full bar serving spirits, beers, wines & cocktails",
      "Buffet breakfast & live counter catering for events",
      "Direct room service delivery across all floors"
    ],
    isVerified: true
  },
  {
    id: "banquet-lawn",
    slug: "banquet-lawn",
    title: "Grand Banquet Lawn & Party Lawns",
    category: "Events",
    summary: "Spacious green lawn with red-carpet aisles, stage setups, and fairy-lit canopy seating for unforgettable celebrations.",
    description: "Host your dream wedding reception, engagement ceremony, birthday milestone, or corporate celebration at Apexify Resort's expansive Banquet Lawn. Decorated with red carpet walkways, grand stage backdrop options, sophisticated lighting, and plush sofa lounge seating, our venue accommodates both intimate gatherings and grand celebrations of up to 500+ guests.",
    timings: "Booking by Reservation",
    image: "/images/resort/banquet_lawn.jpg",
    galleryImages: [
      "/images/resort/banquet_lawn.jpg",
      "/images/resort/swimming_pool_night.jpg",
      "/images/resort/exterior_facade.jpg"
    ],
    keyHighlights: [
      "Capacity for 50 to 500+ guests",
      "Customizable stage, mandap, and audio-visual setups",
      "Dedicated multi-cuisine banquet catering menus",
      "Bridal / host green room access on the event day",
      "Ample guest vehicle parking on premises"
    ],
    isVerified: true
  },
  {
    id: "front-desk",
    slug: "front-desk",
    title: "24-Hour Front Desk & Reception",
    category: "Hospitality",
    summary: "Welcoming reception lobby with official property branding, dedicated travel assistance, and round-the-clock service.",
    description: "From the moment you arrive, our dedicated reception team is on hand 24 hours a day to facilitate smooth check-ins, arrange transportation, organize room service, or provide insider tips on Vasai and Palghar attractions.",
    timings: "24 Hours / 7 Days",
    image: "/images/resort/reception_lobby.jpg",
    galleryImages: [
      "/images/resort/reception_lobby.jpg",
      "/images/resort/corridor_lifts.jpg"
    ],
    keyHighlights: [
      "24/7 check-in and luggage storage assistance",
      "Express check-out options",
      "Local travel, taxi, and auto-rickshaw arrangements",
      "Direct phone assistance from any room intercom",
      "ATM / cash transaction assistance nearby"
    ],
    isVerified: true
  },
  {
    id: "accessibility-lifts",
    slug: "accessibility-lifts",
    title: "Modern Dual Lifts & Granite Lobbies",
    category: "Accessibility",
    summary: "Dual passenger elevators serving all guest room floors with wide, brightly lit granite corridors.",
    description: "Apexify Resort is built with thoughtful universal design in mind. Dual high-speed passenger elevators ensure senior citizens, families with strollers, and guests with heavy luggage can navigate effortlessly between the reception lobby, restaurant, and all guest rooms.",
    timings: "24 Hours (Continuous)",
    image: "/images/resort/corridor_lifts.jpg",
    galleryImages: [
      "/images/resort/corridor_lifts.jpg",
      "/images/resort/bathroom_modern.jpg"
    ],
    keyHighlights: [
      "Dual elevators with automatic doors",
      "Wide granite-tiled corridors with emergency signage",
      "Wheelchair accessibility on ground and guest room levels",
      "Bright LED lighting and security monitoring throughout"
    ],
    isVerified: true
  },
  {
    id: "secure-parking",
    slug: "secure-parking",
    title: "Complimentary Secure Parking",
    category: "Accessibility",
    summary: "Spacious on-site private parking area accommodating guest cars, two-wheelers, and banquet coaches.",
    description: "Travel with complete peace of mind. Apexify Resort provides dedicated, complimentary on-site parking for all staying guests and restaurant visitors, protected by property gates and 24-hour perimeter security.",
    timings: "24 Hours",
    image: "/images/resort/exterior_facade.jpg",
    galleryImages: [
      "/images/resort/exterior_facade.jpg"
    ],
    keyHighlights: [
      "100% Free parking for all registered guests",
      "Space for cars, bikes, and party buses",
      "Gated entry with 24-hour security personnel",
      "Easy vehicle access directly off Waliv / Pelhar link road"
    ],
    isVerified: true
  }
];

