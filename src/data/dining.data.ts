export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  dietary: "veg" | "non-veg" | "beverage";
  isSpicy?: boolean;
  isChefSpecial?: boolean;
  image?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  description: string;
  items: MenuItem[];
}

export const SAMPLE_MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "starters-tandoor",
    name: "Tandoori Starters & Appetizers",
    description: "Sizzling clay oven tikkas, crispy fritters, and spiced finger foods crafted to order.",
    items: [
      {
        id: "paneer-tikka",
        name: "Paneer Tikka Angara",
        description: "Fresh cottage cheese cubes marinated in Kashmiri chili, hung curd, and stone-ground spices, clay-oven roasted to perfection.",
        category: "starters-tandoor",
        price: 280,
        dietary: "veg",
        isSpicy: true,
        isChefSpecial: true,
      },
      {
        id: "veg-crispy",
        name: "Crispy Vegetable Toss",
        description: "Battered seasonal vegetables tossed with spring onions, garlic, and sweet-spicy oriental reduction.",
        category: "starters-tandoor",
        price: 240,
        dietary: "veg",
      },
      {
        id: "chicken-tandoori",
        name: "Dhuri Signature Tandoori Chicken",
        description: "Tender whole spring chicken marinated for 12 hours with mustard oil, hung curd, and roasted garam masala.",
        category: "starters-tandoor",
        price: 360,
        dietary: "non-veg",
        isChefSpecial: true,
      },
      {
        id: "chicken-pahadi",
        name: "Murgh Pahadi Tikka",
        description: "Succulent boneless chicken morsels infused with mint, fresh coriander, ginger, and green chillies.",
        category: "starters-tandoor",
        price: 320,
        dietary: "non-veg",
      },
      {
        id: "fish-koliwada",
        name: "Fish Koliwada Bites",
        description: "Authentic coastal Maharashtra style crisp battered fish cubes served with spicy garlic mint chutney.",
        category: "starters-tandoor",
        price: 390,
        dietary: "non-veg",
        isChefSpecial: true,
      }
    ]
  },
  {
    id: "main-course-indian",
    name: "Indian Curries & Gravies",
    description: "Slow-simmered regional gravies prepared with whole roasted spices, butter, and rich aromatics.",
    items: [
      {
        id: "dal-makhani",
        name: "Dal Makhani Royal",
        description: "Black lentils slow-cooked overnight on tandoor embers with butter, cream, and slow-roasted tomatoes.",
        category: "main-course-indian",
        price: 260,
        dietary: "veg",
        isChefSpecial: true,
      },
      {
        id: "paneer-butter-masala",
        name: "Paneer Butter Masala",
        description: "Soft paneer cubes simmered in a velvet tomato gravy enriched with cashew paste and fragrant kasuri methi.",
        category: "main-course-indian",
        price: 290,
        dietary: "veg",
      },
      {
        id: "butter-chicken",
        name: "Murgh Makhani (Butter Chicken)",
        description: "Char-grilled tandoori chicken cooked in classic satin-smooth tomato, butter, and cream reduction.",
        category: "main-course-indian",
        price: 380,
        dietary: "non-veg",
        isChefSpecial: true,
      },
      {
        id: "mutton-rogan-josh",
        name: "Kashmiri Mutton Rogan Josh",
        description: "Tender goat meat slow-cooked in aromatic gravy infused with Kashmiri red chillies and fennel.",
        category: "main-course-indian",
        price: 450,
        dietary: "non-veg",
        isSpicy: true,
      }
    ]
  },
  {
    id: "rice-biryani",
    name: "Dum Biryani & Rice",
    description: "Long-grain aged basmati rice layered with fragrant saffron, mint, and tender proteins or vegetables.",
    items: [
      {
        id: "veg-dum-biryani",
        name: "Subz Dum Biryani",
        description: "Fragrant basmati rice layered with garden vegetables, caramelized onions, and kewra water, served with raita.",
        category: "rice-biryani",
        price: 280,
        dietary: "veg",
      },
      {
        id: "chicken-dum-biryani",
        name: "Hyderabadi Chicken Dum Biryani",
        description: "Traditional sealed handi biryani featuring succulent marinated chicken, saffron milk, and fried shallots.",
        category: "rice-biryani",
        price: 360,
        dietary: "non-veg",
        isChefSpecial: true,
      },
      {
        id: "jeera-rice",
        name: "Steamed Jeera Rice & Dal Tadka",
        description: "Aromatic cumin-tempered basmati rice paired with yellow lentils tempered with ghee, garlic, and cumin.",
        category: "rice-biryani",
        price: 220,
        dietary: "veg",
      }
    ]
  },
  {
    id: "beverages-bar",
    name: "Beverages, Mocktails & Spirits",
    description: "Chilled tropical mocktails, fresh lime refreshments, sodas, and full alcoholic bar service.",
    items: [
      {
        id: "vasai-cooler",
        name: "Vasai Breeze Mocktail",
        description: "Refreshing blend of fresh mint, crushed lime, blue curacao syrup, and sparkling soda.",
        category: "beverages-bar",
        price: 160,
        dietary: "beverage",
        isChefSpecial: true,
      },
      {
        id: "fresh-lime-soda",
        name: "Fresh Lime Soda (Sweet / Salted)",
        description: "Freshly squeezed lime juice with club soda, served on crushed ice.",
        category: "beverages-bar",
        price: 90,
        dietary: "beverage",
      },
      {
        id: "masala-chaas",
        name: "Spiced Masala Buttermilk",
        description: "Traditional churned curd with toasted cumin, black salt, and coriander leaves.",
        category: "beverages-bar",
        price: 80,
        dietary: "beverage",
      },
      {
        id: "bar-cocktails",
        name: "Classic Cocktails & Draught Beers",
        description: "Mojitos, Long Island Iced Tea, and chilled beers available at the bar counter.",
        category: "beverages-bar",
        price: 350,
        dietary: "beverage",
      }
    ]
  }
];

export const DINING_HIGHLIGHTS = [
  {
    title: "Family Friendly Ambiance",
    description: "Comfortable seating arrangements tailored for family dinners, weekend gatherings, and social celebrations.",
    icon: "Users"
  },
  {
    title: "Poolside Dining Service",
    description: "Sip chilled beverages and order hot tandoori bites right beside our illuminated swimming pool.",
    icon: "Waves"
  },
  {
    title: "Direct In-Room Delivery",
    description: "Enjoy breakfast in bed or a late-night dinner delivered directly to your room door.",
    icon: "Utensils"
  },
  {
    title: "Grand Banquet Catering",
    description: "Customized lavish buffet arrangements with live counters for up to 500+ event guests.",
    icon: "Sparkles"
  }
];

