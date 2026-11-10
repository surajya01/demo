export interface FAQItem {
  id: string;
  category: "Stay & Rooms" | "Dining & Pool" | "Events & Banquets" | "Location & Policies";
  question: string;
  answer: string;
  isVerified: boolean;
}

export const FAQS_DATA: FAQItem[] = [
  {
    id: "checkin-checkout",
    category: "Stay & Rooms",
    question: "What are the standard check-in and check-out timings at Apexify Resort?",
    answer: "Our standard check-in time is 12:00 PM (noon) and check-out time is 10:00 AM. Early check-in or late check-out is subject to room availability upon arrival and may incur an additional nominal charge. Our 24-hour reception desk is always available to store your luggage securely.",
    isVerified: true,
  },
  {
    id: "pool-timings",
    category: "Dining & Pool",
    question: "What are the swimming pool timings and rules?",
    answer: "The outdoor swimming pool is open daily from 7:00 AM to 7:00 PM. Proper nylon or lycra swimwear is mandatory for all swimmers. Children under 12 years of age must be accompanied and supervised by an adult at all times.",
    isVerified: true,
  },
  {
    id: "extra-bed-charges",
    category: "Stay & Rooms",
    question: "What are the charges for an extra guest or rollaway bed?",
    answer: "Extra rollaway beds or mattresses can be arranged upon advance request for ₹500 per person / per night, subject to room category capacity.",
    isVerified: true,
  },
  {
    id: "pet-policy",
    category: "Location & Policies",
    question: "Are pets allowed at the resort?",
    answer: "To ensure hygiene, tranquility, and safety for all guests, pets are strictly not permitted on resort premises.",
    isVerified: true,
  },
  {
    id: "smoking-policy",
    category: "Location & Policies",
    question: "What is the resort's smoking and alcohol policy?",
    answer: "All indoor guest rooms, elevators, and enclosed restaurant areas are 100% non-smoking. Designated outdoor smoking zones are provided on the property grounds. Alcoholic beverages are served exclusively within our licensed Family Restaurant & Bar and private banquet events.",
    isVerified: true,
  },
  {
    id: "location-directions",
    category: "Location & Policies",
    question: "How do I reach Apexify Resort from Mumbai or Vasai Road railway station?",
    answer: "Apexify Resort is located Near Navjeevan Naka, Waliv, Vasai Road - East, Maharashtra 401208. It is approximately 7.0 km (15-20 minutes by auto-rickshaw or taxi) from Vasai Road Railway Station (Western Railway line). By road from Mumbai/Thane, exit the Western Express Highway (NH 48) at Pelhar / Sativali and proceed toward Waliv.",
    isVerified: true,
  },
  {
    id: "dining-room-service",
    category: "Dining & Pool",
    question: "Is room service available, and what are the restaurant hours?",
    answer: "Yes, our Family Restaurant & Bar serves à la carte lunch, dinner, and snacks from 11:00 AM to 11:30 PM. Room service delivery is available to all guest room floors during restaurant operating hours, with round-the-clock front desk assistance for tea, coffee, and drinking water.",
    isVerified: true,
  },
  {
    id: "parking-facility",
    category: "Stay & Rooms",
    question: "Is car parking available on the resort premises?",
    answer: "Yes, Apexify Resort offers spacious, complimentary on-site private parking for all registered staying guests and event attendees, monitored with 24-hour perimeter security.",
    isVerified: true,
  },
  {
    id: "banquet-booking",
    category: "Events & Banquets",
    question: "How do I enquire or book the Banquet Lawn for a wedding or corporate function?",
    answer: "You can submit an event enquiry through our website Contact form, speak directly with our reception manager, or message us on WhatsApp. Our events team will schedule a property visit, discuss guest capacity, and prepare customized catering package quotes.",
    isVerified: true,
  }
];

export const FAQ_CATEGORIES = [
  "All",
  "Stay & Rooms",
  "Dining & Pool",
  "Events & Banquets",
  "Location & Policies"
] as const;

