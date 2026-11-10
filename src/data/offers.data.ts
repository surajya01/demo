export interface OfferItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  priceNote: string;
  validity: string;
  image: string;
  inclusions: string[];
  terms: string[];
  isSample: boolean;
}

export const OFFERS_DATA: OfferItem[] = [
  {
    id: "weekend-getaway",
    slug: "weekend-getaway",
    title: "Weekend Leisure Getaway",
    subtitle: "2 Days / 1 Night Relaxing Stay for Two",
    badge: "Popular Staycation",
    description: "Escape the Mumbai hustle with an effortless weekend retreat in Vasai East. Includes overnight Deluxe Room stay, complimentary pool access, and breakfast for two.",
    priceNote: "Starting from ₹3,499 per couple / night",
    validity: "Valid for Friday, Saturday & Sunday check-ins",
    image: "/images/resort/swimming_pool_night.jpg",
    inclusions: [
      "1 Night stay in Deluxe Double Room (AC)",
      "Complimentary breakfast for 2 adults",
      "Unlimited access to Outdoor Swimming Pool",
      "10% discount on à la carte food & non-alcoholic beverages",
      "Free high-speed Wi-Fi and private parking",
      "Flexible early check-in (subject to availability)"
    ],
    terms: [
      "Pre-booking recommended at least 48 hours in advance",
      "Standard check-in at 12:00 PM; check-out at 10:00 AM",
      "Taxes applicable as per standard government GST rates"
    ],
    isSample: true,
  },
  {
    id: "day-picnic-pool-pass",
    slug: "day-picnic-pool-pass",
    title: "Day Picnic & Pool Splash Pass",
    subtitle: "Full Day Leisure with Lunch & Pool Access",
    badge: "Day Outing",
    description: "Ideal for family groups, friends, and school reunions looking for a refreshing day escape near Mumbai and Thane without an overnight commitment.",
    priceNote: "Starting from ₹799 per person (Min 4 guests)",
    validity: "Daily: 10:00 AM – 6:00 PM",
    image: "/images/resort/swimming_pool.jpg",
    inclusions: [
      "Full day pool access with changing room facilities",
      "Welcome beverage on arrival (Soft drink / Lime soda)",
      "Delicious 3-course buffet lunch at Family Restaurant",
      "High tea and evening snacks by the poolside",
      "Lawn games and lounge access"
    ],
    terms: [
      "Appropriate swimwear required for swimming pool",
      "Advance deposit required for groups of 10+ persons",
      "Children under 5 years free entry"
    ],
    isSample: true,
  },
  {
    id: "banquet-wedding-package",
    slug: "banquet-wedding-package",
    title: "Grand Banquet & Wedding Lawn Package",
    subtitle: "Turnkey Celebration for up to 500 Guests",
    badge: "Weddings & Galas",
    description: "Celebrate milestones against the open-air backdrop of our grand party lawn. Complete with red-carpet aisles, stage décor, lighting, and multi-cuisine catering.",
    priceNote: "Custom pricing based on guest count & menu selection",
    validity: "Available all year by prior reservation",
    image: "/images/resort/banquet_lawn.jpg",
    inclusions: [
      "Exclusive access to Grand Banquet Lawn & Pool Deck",
      "Red carpet pathway, fairy-light canopy & stage backdrop",
      "Full multi-cuisine buffet catering (Veg & Non-Veg options)",
      "Bridal & Groom preparation rooms with AC",
      "Generator backup and full property security",
      "Complimentary overnight stay for the host couple"
    ],
    terms: [
      "Mandatory initial booking enquiry & date check",
      "50% advance deposit required for event date confirmation",
      "Sound restrictions as per local municipal guidelines apply after 10:00 PM"
    ],
    isSample: true,
  }
];

