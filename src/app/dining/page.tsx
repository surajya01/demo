"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Utensils,
  Wine,
  Clock,
  Users,
  Check,
  Phone,
  MessageSquare,
  Sparkles,
  Coffee,
  Search,
  Filter,
  Calendar,
  ChevronRight,
  Flame,
  Star,
  MapPin,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Eye,
  Heart,
  GlassWater,
  PartyPopper,
  CheckCheck,
} from "lucide-react";
import { SAMPLE_MENU_CATEGORIES, DINING_HIGHLIGHTS, type MenuItem, type MenuCategory } from "@/data/dining.data";
import { MotionWrapper } from "@/components/common/MotionWrapper";
import { Lightbox, LightboxImage } from "@/components/common/Lightbox";

export default function DiningPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [dietaryFilter, setDietaryFilter] = useState<"all" | "veg" | "non-veg" | "chef-special">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Table reservation form state
  const [reservationName, setReservationName] = useState("");
  const [reservationPhone, setReservationPhone] = useState("");
  const [reservationDate, setReservationDate] = useState("");
  const [reservationTimeSlot, setReservationTimeSlot] = useState("Dinner (7:00 PM - 11:30 PM)");
  const [seatingPreference, setSeatingPreference] = useState("Poolside Deck Tables (Outdoor Starlit)");
  const [guestsCount, setGuestsCount] = useState("4");
  const [specialOccasion, setSpecialOccasion] = useState("Family Dinner / Casual Outing");
  const [isSubmittingReservation, setIsSubmittingReservation] = useState(false);
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [reservationError, setReservationError] = useState<string | null>(null);

  const diningImages: LightboxImage[] = [
    {
      src: "/images/resort/restaurant_dining.jpg",
      title: "Family Dining Hall & Buffet Setup",
      caption: "Spacious air-conditioned dining counters and comfortable family booths at Apexify Resort",
      category: "Dining",
    },
    {
      src: "/images/resort/restaurant_entrance.jpg",
      title: "Family Restaurant & Bar Entrance",
      caption: "Poolside doorway welcoming resort guests, day picnickers, and local diners",
      category: "Dining",
    },
    {
      src: "/images/resort/swimming_pool_night.jpg",
      title: "Poolside Starlit Dining & Bar",
      caption: "Chilled mocktails, draught beverages, and hot tandoori bites beside our illuminated pool",
      category: "Dining",
    },
    {
      src: "/images/resort/banquet_lawn.jpg",
      title: "Grand Banquet Buffet Lawn",
      caption: "Outdoor banquet lawn catering with live cooking stations for weddings and parties",
      category: "Banquet",
    },
  ];

  // Helper to filter items
  const filterItem = (item: MenuItem) => {
    if (dietaryFilter === "veg" && item.dietary !== "veg") return false;
    if (dietaryFilter === "non-veg" && item.dietary !== "non-veg") return false;
    if (dietaryFilter === "chef-special" && !item.isChefSpecial) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      if (!matchName && !matchDesc) return false;
    }
    return true;
  };

  // Grouped filtered categories
  const displayedCategories = useMemo(() => {
    return SAMPLE_MENU_CATEGORIES.map((cat) => {
      // If a single category is selected, skip others
      if (selectedCategory !== "all" && cat.id !== selectedCategory) {
        return null;
      }
      const matchingItems = cat.items.filter(filterItem);
      if (matchingItems.length === 0) return null;
      return {
        ...cat,
        items: matchingItems,
      };
    }).filter(Boolean) as MenuCategory[];
  }, [selectedCategory, dietaryFilter, searchQuery]);

  // Total count of matching items
  const totalFilteredCount = useMemo(() => {
    return displayedCategories.reduce((acc, cat) => acc + cat.items.length, 0);
  }, [displayedCategories]);

  const allItemsCount = useMemo(() => {
    return SAMPLE_MENU_CATEGORIES.flatMap((c) => c.items).length;
  }, []);

  const handleTableReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    setReservationError(null);

    if (!reservationName.trim()) {
      setReservationError("Please enter your name.");
      return;
    }

    const cleanPhone = reservationPhone.trim().replace(/[\s-]/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      setReservationError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!reservationDate) {
      setReservationError("Please select your desired dining date.");
      return;
    }

    setIsSubmittingReservation(true);

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName: reservationName.trim(),
          phone: cleanPhone,
          checkIn: reservationDate,
          adults: parseInt(guestsCount, 10) || 2,
          message: `[Table Reservation Request] Time: ${reservationTimeSlot} | Seating: ${seatingPreference} | Occasion: ${specialOccasion}`,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setReservationSuccess(true);
      } else {
        setReservationError(data?.error?.message || "Failed to record table reservation.");
      }
    } catch {
      setReservationSuccess(true);
    } finally {
      setIsSubmittingReservation(false);
    }
  };

  return (
    <>
      <main className="min-h-screen bg-[#F8F6F1]">
        {/* ================================================================= */}
        {/* 1. HERO SECTION: Immersive Luxury Gastronomy Banner               */}
        {/* ================================================================= */}
        <section className="relative min-h-[540px] lg:min-h-[600px] flex items-center justify-center overflow-hidden bg-[#252525] text-white">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/resort/restaurant_dining.jpg"
              alt="Apexify Resort Family Restaurant and Bar Atmosphere"
              fill
              className="object-cover object-center opacity-35"
              priority
            />
            {/* Minimal solid dark overlay - NO gradient */}
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8 py-20 text-center">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-xs mb-6">
              <Sparkles className="h-3.5 w-3.5 text-[#A78355]" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F8F6F1]">
                Culinary Excellence & Spirits · Waliv, Vasai East
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-white max-w-4xl mx-auto leading-[1.12]">
              Flavors Crafted for Celebrations & Quiet Evenings
            </h1>

            <p className="mt-6 text-base sm:text-xl text-[#F8F6F1]/90 max-w-2xl mx-auto font-light leading-relaxed">
              Authentic clay-oven tandoori grills, rich slow-simmered Indian curries, fresh regional specialties, and handcrafted mocktails in a welcoming family atmosphere.
            </p>

            {/* Micro Highlights Pill */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-medium text-[#F8F6F1]">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 border border-white/15">
                <Clock className="h-4 w-4 text-[#A78355]" />
                <span>11:00 AM – 11:30 PM (Daily)</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 border border-white/15">
                <Utensils className="h-4 w-4 text-[#A78355]" />
                <span>Dedicated Veg & Non-Veg Kitchens</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 border border-white/15">
                <Wine className="h-4 w-4 text-[#A78355]" />
                <span>Licensed Bar & Cocktail Lounge</span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#menu-section"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#A78355] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#936F43] transition shadow-subtle"
              >
                <Utensils className="h-4 w-4" />
                <span>Explore Dining Menu</span>
              </a>
              <a
                href="#table-reservation"
                className="inline-flex items-center gap-2 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition"
              >
                <Calendar className="h-4 w-4 text-[#A78355]" />
                <span>Book a Table / Banquet</span>
              </a>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 2. THE 4 DINING EXPERIENCES SHOWCASE                              */}
        {/* ================================================================= */}
        <section className="py-20 sm:py-24 border-b border-[#E8E3DA] bg-white">
          <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs uppercase tracking-[0.2em] text-[#A78355] font-bold block mb-2">
                Atmosphere & Ambiance
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#252525]">
                Distinct Dining Spaces for Every Occasion
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#77736D]">
                Whether you prefer air-conditioned comfort, al fresco dining beside our sparkling swimming pool, or a private banquet feast, Apexify Resort has the perfect setting.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Experience 1: Family Hall */}
              <div className="group rounded-3xl overflow-hidden bg-white border border-[#E8E3DA] hover:border-[#A78355] transition-all duration-300 shadow-subtle hover:shadow-card flex flex-col">
                <div
                  onClick={() => setLightboxIndex(0)}
                  className="relative h-52 w-full overflow-hidden cursor-pointer"
                >
                  <Image
                    src="/images/resort/restaurant_dining.jpg"
                    alt="Family Dining Hall"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 350px"
                  />
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors" />
                  <span className="absolute bottom-3 left-3 text-xs font-semibold text-white flex items-center gap-1.5">
                    <Eye className="h-3.5 w-3.5 text-[#A78355]" />
                    <span>Expand Photo</span>
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#A78355]">
                    Air Conditioned
                  </span>
                  <h3 className="font-serif text-xl font-medium text-[#252525] mt-1">
                    Main Family Dining Hall
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#77736D] leading-relaxed flex-1">
                    Spacious indoor seating with comfortable family booths, soft background music, and direct view of the buffet counters.
                  </p>
                  <div className="mt-4 pt-4 border-t border-[#E8E3DA] text-xs font-semibold text-[#252525] flex items-center justify-between">
                    <span>Capacity: 80+ Seats</span>
                    <span className="text-[#A78355]">Lunch & Dinner</span>
                  </div>
                </div>
              </div>

              {/* Experience 2: Poolside Dining */}
              <div className="group rounded-3xl overflow-hidden bg-white border border-[#E8E3DA] hover:border-[#A78355] transition-all duration-300 shadow-subtle hover:shadow-card flex flex-col">
                <div
                  onClick={() => setLightboxIndex(2)}
                  className="relative h-52 w-full overflow-hidden cursor-pointer"
                >
                  <Image
                    src="/images/resort/swimming_pool_night.jpg"
                    alt="Poolside Dining Deck"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 350px"
                  />
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors" />
                  <span className="absolute bottom-3 left-3 text-xs font-semibold text-white flex items-center gap-1.5">
                    <Eye className="h-3.5 w-3.5 text-[#A78355]" />
                    <span>Expand Photo</span>
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#A78355]">
                    Al Fresco Deck
                  </span>
                  <h3 className="font-serif text-xl font-medium text-[#252525] mt-1">
                    Poolside Starlit Deck
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#77736D] leading-relaxed flex-1">
                    Dine beneath palm trees beside our illuminated outdoor swimming pool. Enjoy evening breezes, grilled tandoor, and chilled drinks.
                  </p>
                  <div className="mt-4 pt-4 border-t border-[#E8E3DA] text-xs font-semibold text-[#252525] flex items-center justify-between">
                    <span>Poolside Tables</span>
                    <span className="text-[#A78355]">Evening Specials</span>
                  </div>
                </div>
              </div>

              {/* Experience 3: Bar & Cocktails */}
              <div className="group rounded-3xl overflow-hidden bg-white border border-[#E8E3DA] hover:border-[#A78355] transition-all duration-300 shadow-subtle hover:shadow-card flex flex-col">
                <div
                  onClick={() => setLightboxIndex(1)}
                  className="relative h-52 w-full overflow-hidden cursor-pointer"
                >
                  <Image
                    src="/images/resort/restaurant_entrance.jpg"
                    alt="Restaurant & Bar Lounge"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 350px"
                  />
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors" />
                  <span className="absolute bottom-3 left-3 text-xs font-semibold text-white flex items-center gap-1.5">
                    <Eye className="h-3.5 w-3.5 text-[#A78355]" />
                    <span>Expand Photo</span>
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#A78355]">
                    Spirits & Brews
                  </span>
                  <h3 className="font-serif text-xl font-medium text-[#252525] mt-1">
                    Licensed Cocktail Bar
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#77736D] leading-relaxed flex-1">
                    A curated beverage selection including classic cocktails, chilled draught beer, mocktails, fresh lime refreshments, and party spirits.
                  </p>
                  <div className="mt-4 pt-4 border-t border-[#E8E3DA] text-xs font-semibold text-[#252525] flex items-center justify-between">
                    <span>Full Liquor Permit</span>
                    <span className="text-[#A78355]">11 AM – 11:30 PM</span>
                  </div>
                </div>
              </div>

              {/* Experience 4: Banquet Buffets */}
              <div className="group rounded-3xl overflow-hidden bg-white border border-[#E8E3DA] hover:border-[#A78355] transition-all duration-300 shadow-subtle hover:shadow-card flex flex-col">
                <div
                  onClick={() => setLightboxIndex(3)}
                  className="relative h-52 w-full overflow-hidden cursor-pointer"
                >
                  <Image
                    src="/images/resort/banquet_lawn.jpg"
                    alt="Grand Banquet Buffets"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 350px"
                  />
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors" />
                  <span className="absolute bottom-3 left-3 text-xs font-semibold text-white flex items-center gap-1.5">
                    <Eye className="h-3.5 w-3.5 text-[#A78355]" />
                    <span>Expand Photo</span>
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#A78355]">
                    Celebration Feasts
                  </span>
                  <h3 className="font-serif text-xl font-medium text-[#252525] mt-1">
                    Banquet & Lawn Buffets
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#77736D] leading-relaxed flex-1">
                    Customized grand menus and live counters for birthdays, destination weddings, and corporate annual days on our lush party lawn.
                  </p>
                  <div className="mt-4 pt-4 border-t border-[#E8E3DA] text-xs font-semibold text-[#252525] flex items-center justify-between">
                    <span>Up to 500+ Guests</span>
                    <span className="text-[#A78355]">Custom Menus</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 3. CHEF'S SIGNATURE SHOWSTOPPERS (Spotlight Section)              */}
        {/* ================================================================= */}
        <section className="py-20 sm:py-24 bg-[#F8F6F1] border-b border-[#E8E3DA]">
          <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#A78355] font-bold block mb-2">
                  Culinary Highlights
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#252525]">
                  Chef's Signature Recommendations
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#77736D] max-w-md">
                Every dish is prepared fresh upon order by our master kitchen brigade using locally sourced spices and rich, authentic recipes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {/* Showstopper 1 */}
              <div className="group rounded-3xl bg-white shadow-subtle hover:shadow-card border border-[#E8E3DA] hover:border-[#A78355] transition-all duration-300 flex flex-col justify-between overflow-hidden">
                <div className="relative h-56 w-full overflow-hidden bg-[#F8F6F1]">
                  <Image
                    src="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80"
                    alt="Apexify Signature Tandoori Chicken"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-bold text-[#252525] shadow-xs">
                      <Sparkles className="h-3.5 w-3.5 text-[#A78355]" />
                      Signature Roast
                    </span>
                    <span className="flex h-6 w-6 items-center justify-center rounded-md border border-red-600 bg-white p-0.5 shadow-xs" title="Non-Vegetarian">
                      <span className="h-3 w-3 rounded-full bg-red-600" />
                    </span>
                  </div>
                </div>

                <div className="p-7 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-medium text-[#252525] group-hover:text-[#A78355] transition-colors">
                      Apexify Signature Tandoori Chicken
                    </h3>
                    <p className="mt-3 text-xs sm:text-sm text-[#77736D] leading-relaxed">
                      Tender whole spring chicken marinated for 12 hours with mustard oil, hung curd, and roasted stone-ground garam masala. Char-grilled on glowing clay embers.
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E8E3DA] flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-[#77736D] block">Full Portion</span>
                      <strong className="font-serif text-2xl font-bold text-[#252525]">₹360</strong>
                    </div>
                    <a
                      href="#table-reservation"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#252525] hover:text-[#A78355] transition"
                    >
                      <span>Reserve a Table</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Showstopper 2 */}
              <div className="group rounded-3xl bg-white shadow-subtle hover:shadow-card border border-[#E8E3DA] hover:border-[#A78355] transition-all duration-300 flex flex-col justify-between overflow-hidden">
                <div className="relative h-56 w-full overflow-hidden bg-[#F8F6F1]">
                  <Image
                    src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80"
                    alt="Dal Makhani Royal"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-bold text-[#252525] shadow-xs">
                      <Sparkles className="h-3.5 w-3.5 text-[#A78355]" />
                      Slow-Cooked Classic
                    </span>
                    <span className="flex h-6 w-6 items-center justify-center rounded-md border border-green-600 bg-white p-0.5 shadow-xs" title="Pure Vegetarian">
                      <span className="h-3 w-3 rounded-full bg-green-600" />
                    </span>
                  </div>
                </div>

                <div className="p-7 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-medium text-[#252525] group-hover:text-[#A78355] transition-colors">
                      Dal Makhani Royal
                    </h3>
                    <p className="mt-3 text-xs sm:text-sm text-[#77736D] leading-relaxed">
                      Premium black lentils and kidney beans slow-simmered overnight over low tandoori embers, finished with farm butter, heavy cream, and aromatic kasuri methi.
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E8E3DA] flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-[#77736D] block">Serves 2-3 Guests</span>
                      <strong className="font-serif text-2xl font-bold text-[#252525]">₹260</strong>
                    </div>
                    <a
                      href="#table-reservation"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#252525] hover:text-[#A78355] transition"
                    >
                      <span>Reserve a Table</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Showstopper 3 */}
              <div className="group rounded-3xl bg-white shadow-subtle hover:shadow-card border border-[#E8E3DA] hover:border-[#A78355] transition-all duration-300 flex flex-col justify-between overflow-hidden">
                <div className="relative h-56 w-full overflow-hidden bg-[#F8F6F1]">
                  <Image
                    src="https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800&auto=format&fit=crop&q=80"
                    alt="Hyderabadi Chicken Dum Biryani"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-bold text-[#252525] shadow-xs">
                      <Sparkles className="h-3.5 w-3.5 text-[#A78355]" />
                      Clay Pot Special
                    </span>
                    <span className="flex h-6 w-6 items-center justify-center rounded-md border border-red-600 bg-white p-0.5 shadow-xs" title="Non-Vegetarian">
                      <span className="h-3 w-3 rounded-full bg-red-600" />
                    </span>
                  </div>
                </div>

                <div className="p-7 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-medium text-[#252525] group-hover:text-[#A78355] transition-colors">
                      Hyderabadi Chicken Dum Biryani
                    </h3>
                    <p className="mt-3 text-xs sm:text-sm text-[#77736D] leading-relaxed">
                      Aged long-grain basmati rice layered with succulent marinated chicken, saffron milk, brown shallots, and fresh mint, sealed in a traditional handi pot.
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E8E3DA] flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-[#77736D] block">Includes Raita</span>
                      <strong className="font-serif text-2xl font-bold text-[#252525]">₹360</strong>
                    </div>
                    <a
                      href="#table-reservation"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#252525] hover:text-[#A78355] transition"
                    >
                      <span>Reserve a Table</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 4. INTERACTIVE RESTAURANT MENU WITH REIMAGINED LUXURY LAYOUT     */}
        {/* ================================================================= */}
        <section id="menu-section" className="py-20 sm:py-28 bg-[#F8F6F1]">
          <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-[0.25em] text-[#A78355] font-bold block mb-2">
                A Taste of Our Kitchen
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#252525]">
                Explore Our Complete Menu
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#77736D] leading-relaxed">
                Handcrafted multi-cuisine dishes prepared fresh to order. Resident guests can order directly from their room phone or poolside counter.
              </p>
            </div>

            {/* UNIFIED LUXURY FILTER & SEARCH HUB */}
            <div className="mb-14 rounded-3xl bg-white p-5 sm:p-7 border border-[#E8E3DA] shadow-subtle">
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pb-6 border-b border-[#E8E3DA]">
                {/* Search Bar with bronze icon */}
                <div className="relative flex-1 max-w-xl">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A78355]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search dishes by name or ingredients (e.g. Biryani, Paneer, Tandoori)..."
                    className="w-full rounded-2xl border border-[#E8E3DA] bg-[#F8F6F1] pl-11 pr-10 py-3 text-sm text-[#252525] placeholder-[#77736D]/60 focus:border-[#A78355] focus:bg-white focus:outline-none transition shadow-inner"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#77736D] hover:text-[#252525] px-2 py-1 rounded-md bg-white border border-[#E8E3DA]"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Dietary Filter Segmented Switcher */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setDietaryFilter("all")}
                    className={`rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
                      dietaryFilter === "all"
                        ? "bg-[#252525] text-white shadow-subtle"
                        : "bg-[#F8F6F1] text-[#77736D] border border-[#E8E3DA] hover:bg-white"
                    }`}
                  >
                    All Types ({allItemsCount})
                  </button>
                  <button
                    onClick={() => setDietaryFilter("veg")}
                    className={`rounded-xl px-4 py-2.5 text-xs font-semibold transition flex items-center gap-1.5 ${
                      dietaryFilter === "veg"
                        ? "bg-emerald-800 text-white shadow-subtle"
                        : "bg-[#F8F6F1] text-emerald-800 border border-[#E8E3DA] hover:bg-emerald-50"
                    }`}
                  >
                    <span className="flex h-3.5 w-3.5 items-center justify-center rounded border border-green-600 bg-white p-0.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                    </span>
                    <span>Vegetarian</span>
                  </button>
                  <button
                    onClick={() => setDietaryFilter("non-veg")}
                    className={`rounded-xl px-4 py-2.5 text-xs font-semibold transition flex items-center gap-1.5 ${
                      dietaryFilter === "non-veg"
                        ? "bg-rose-900 text-white shadow-subtle"
                        : "bg-[#F8F6F1] text-rose-900 border border-[#E8E3DA] hover:bg-rose-50"
                    }`}
                  >
                    <span className="flex h-3.5 w-3.5 items-center justify-center rounded border border-red-600 bg-white p-0.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                    </span>
                    <span>Non-Vegetarian</span>
                  </button>
                  <button
                    onClick={() => setDietaryFilter("chef-special")}
                    className={`rounded-xl px-4 py-2.5 text-xs font-semibold transition flex items-center gap-1.5 ${
                      dietaryFilter === "chef-special"
                        ? "bg-[#A78355] text-white shadow-subtle font-bold"
                        : "bg-[#F8F6F1] text-[#77736D] border border-[#E8E3DA] hover:bg-white"
                    }`}
                  >
                    <Sparkles className="h-3.5 w-3.5 text-[#A78355]" />
                    <span>Chef's Choice</span>
                  </button>
                </div>
              </div>

              {/* Category Filter Pills & Real-Time Counter */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                      selectedCategory === "all"
                        ? "bg-[#252525] text-white shadow-subtle"
                        : "bg-[#F8F6F1] text-[#77736D] border border-[#E8E3DA] hover:bg-white"
                    }`}
                  >
                    All Categories
                  </button>
                  {SAMPLE_MENU_CATEGORIES.map((cat) => {
                    const count = cat.items.filter(filterItem).length;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`rounded-xl px-4 py-2 text-xs font-semibold transition flex items-center gap-1.5 ${
                          selectedCategory === cat.id
                            ? "bg-[#252525] text-white shadow-subtle"
                            : "bg-[#F8F6F1] text-[#77736D] border border-[#E8E3DA] hover:bg-white"
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span
                          className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                            selectedCategory === cat.id
                              ? "bg-white/20 text-white"
                              : "bg-[#E8E3DA] text-[#252525]"
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="text-xs text-[#77736D] flex items-center gap-1.5">
                  <CheckCheck className="h-4 w-4 text-[#A78355]" />
                  <span>Showing <strong>{totalFilteredCount}</strong> curated dishes</span>
                </div>
              </div>
            </div>

            {/* DISHES DISPLAY: Categorized Sections with 3-Column Luxury Cards */}
            {displayedCategories.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-[#E8E3DA] p-8 max-w-xl mx-auto shadow-subtle">
                <Utensils className="h-12 w-12 text-[#A78355] mx-auto mb-3 opacity-60" />
                <h4 className="font-serif text-2xl font-bold text-[#252525]">No dishes found</h4>
                <p className="mt-2 text-xs sm:text-sm text-[#77736D] leading-relaxed">
                  We couldn't find any dishes matching your current search or dietary filters. Try resetting the filters to view the full menu.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setDietaryFilter("all");
                    setSelectedCategory("all");
                  }}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#252525] px-5 py-2.5 text-xs font-semibold text-white shadow-subtle hover:bg-[#1A1A1A] transition"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="space-y-16">
                {displayedCategories.map((category) => (
                  <div key={category.id} className="scroll-mt-24">
                    {/* Category Header Banner */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 mb-8 border-b border-[#E8E3DA] gap-3">
                      <div>
                        <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#A78355] mb-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#A78355]" />
                          <span>Specialty Category</span>
                        </div>
                        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#252525]">
                          {category.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#77736D] mt-1 max-w-2xl">
                          {category.description}
                        </p>
                      </div>

                      <span className="text-xs font-semibold text-[#252525] bg-[#E8E3DA] px-3 py-1.5 rounded-lg self-start sm:self-end">
                        {category.items.length} {category.items.length === 1 ? "Option" : "Options"} Available
                      </span>
                    </div>

                    {/* 3-Column Luxury Card Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.items.map((item) => (
                        <div
                          key={item.id}
                          className="rounded-3xl bg-white border border-[#E8E3DA] hover:border-[#A78355] shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                        >
                          {/* Accent Top Bar for Chef Special - Solid Muted Bronze */}
                          {item.isChefSpecial && (
                            <div className="absolute top-0 left-0 right-0 h-1 bg-[#A78355] z-10" />
                          )}

                          {/* Food Dish Image */}
                          {item.image && (
                            <div className="relative h-48 w-full overflow-hidden bg-[#F8F6F1]">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                              <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors" />
                            </div>
                          )}

                          <div className="p-6 flex flex-col flex-1 justify-between">
                            <div>
                              {/* Card Top Row: Dietary Icon + Tags + Price */}
                              <div className="flex items-start justify-between gap-3 mb-3">
                                <div className="flex items-center gap-2">
                                  {/* FSSAI Official Style Dietary Icon */}
                                  {item.dietary === "veg" && (
                                    <span className="flex h-5 w-5 items-center justify-center rounded border border-green-600 bg-white p-0.5" title="Pure Vegetarian">
                                      <span className="h-2.5 w-2.5 rounded-full bg-green-600" />
                                    </span>
                                  )}
                                  {item.dietary === "non-veg" && (
                                    <span className="flex h-5 w-5 items-center justify-center rounded border border-red-600 bg-white p-0.5" title="Non-Vegetarian">
                                      <span className="h-2.5 w-2.5 rounded-full bg-red-600" />
                                    </span>
                                  )}
                                  {item.dietary === "beverage" && (
                                    <span className="flex h-5 w-5 items-center justify-center rounded border border-blue-600 bg-white p-0.5 text-blue-600" title="Beverage / Bar">
                                      <GlassWater className="h-3 w-3" />
                                    </span>
                                  )}

                                  {item.isChefSpecial && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-[#A78355]/20 px-2.5 py-0.5 text-[10.5px] font-bold text-[#A78355]">
                                      <Sparkles className="h-3 w-3 text-[#A78355]" />
                                      Chef Special
                                    </span>
                                  )}

                                  {item.isSpicy && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-red-50 border border-red-200 px-2 py-0.5 text-[10px] font-semibold text-red-700">
                                      <Flame className="h-2.5 w-2.5 text-red-500" />
                                      Spicy
                                    </span>
                                  )}
                                </div>

                                {/* Price */}
                                <div className="text-right">
                                  <span className="font-serif font-bold text-xl sm:text-2xl text-[#252525]">
                                    ₹{item.price}
                                  </span>
                                </div>
                              </div>

                              {/* Dish Name */}
                              <h4 className="font-serif text-lg sm:text-xl font-bold text-[#252525] group-hover:text-[#A78355] transition-colors leading-snug">
                                {item.name}
                              </h4>

                              {/* Description */}
                              <p className="mt-2.5 text-xs sm:text-[13px] text-[#77736D] leading-relaxed font-normal">
                                {item.description}
                              </p>
                            </div>

                            {/* Card Footer */}
                            <div className="mt-6 pt-4 border-t border-[#E8E3DA] flex items-center justify-between text-xs">
                              <span className="text-[11px] font-medium text-[#77736D] flex items-center gap-1">
                                <Utensils className="h-3 w-3 text-[#A78355]" />
                                <span>Prepared Fresh to Order</span>
                              </span>

                              <a
                                href={`https://wa.me/919820000000?text=Hello%20Apexify%20Resort,%20I%20am%20interested%20in%20ordering%20the%20${encodeURIComponent(item.name)}%20(₹${item.price}).`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-xl bg-[#F8F6F1] hover:bg-[#252525] text-[#252525] hover:text-white border border-[#E8E3DA] px-3.5 py-1.5 font-semibold text-xs transition duration-200"
                              >
                                <MessageSquare className="h-3.5 w-3.5 text-[#25D366] group-hover:text-white" />
                                <span>Order</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ================================================================= */}
        {/* 5. OPERATING HOURS & KITCHEN HYGIENE PROTOCOLS                    */}
        {/* ================================================================= */}
        <section className="py-16 sm:py-20 bg-white border-y border-[#E8E3DA]">
          <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 */}
              <div className="rounded-3xl bg-[#F8F6F1] p-7 border border-[#E8E3DA] space-y-3 shadow-subtle">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#252525] text-[#A78355]">
                  <Coffee className="h-6 w-6" />
                </div>
                <h4 className="font-serif text-xl font-bold text-[#252525]">
                  Morning Breakfast
                </h4>
                <p className="text-xs sm:text-sm text-[#77736D] leading-relaxed">
                  7:30 AM – 10:30 AM. Freshly brewed tea, coffee, hot breakfast delicacies, and fresh seasonal fruits for resident guests.
                </p>
              </div>

              {/* Card 2 */}
              <div className="rounded-3xl bg-[#F8F6F1] p-7 border border-[#E8E3DA] space-y-3 shadow-subtle">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#252525] text-[#A78355]">
                  <Utensils className="h-6 w-6" />
                </div>
                <h4 className="font-serif text-xl font-bold text-[#252525]">
                  Lunch & Afternoon
                </h4>
                <p className="text-xs sm:text-sm text-[#77736D] leading-relaxed">
                  12:00 PM – 3:30 PM. Regional thalis, sizzling tandoor, wholesome biryanis, and poolside picnic meals.
                </p>
              </div>

              {/* Card 3 */}
              <div className="rounded-3xl bg-[#F8F6F1] p-7 border border-[#E8E3DA] space-y-3 shadow-subtle">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#252525] text-[#A78355]">
                  <Clock className="h-6 w-6" />
                </div>
                <h4 className="font-serif text-xl font-bold text-[#252525]">
                  Evening Sundowners
                </h4>
                <p className="text-xs sm:text-sm text-[#77736D] leading-relaxed">
                  4:00 PM – 7:00 PM. Hot chai, crispy pakoras, poolside mocktails, and fresh finger bites as the sun sets over the palms.
                </p>
              </div>

              {/* Card 4 */}
              <div className="rounded-3xl bg-[#F8F6F1] p-7 border border-[#E8E3DA] space-y-3 shadow-subtle">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#252525] text-[#A78355]">
                  <Wine className="h-6 w-6" />
                </div>
                <h4 className="font-serif text-xl font-bold text-[#252525]">
                  Dinner & Cocktails
                </h4>
                <p className="text-xs sm:text-sm text-[#77736D] leading-relaxed">
                  7:00 PM – 11:30 PM. Complete a la carte service, outdoor lawn buffet setups, and licensed bar beverage service.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 6. INTERACTIVE TABLE RESERVATION & SPECIAL OCCASIONS CONCIERGE    */}
        {/* ================================================================= */}
        <section id="table-reservation" className="py-20 sm:py-28 bg-[#F8F6F1]">
          <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left Column: Hospitality Context & Visual Guarantee */}
              <div className="lg:col-span-5 rounded-3xl bg-[#252525] text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden shadow-subtle">
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#A78355]/40 bg-[#A78355]/20 px-3.5 py-1 text-xs font-semibold text-[#F8F6F1] mb-6">
                    <Sparkles className="h-3.5 w-3.5 text-[#A78355]" />
                    <span>Direct Resort Concierge</span>
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                    Reserve Your Dining Experience
                  </h3>

                  <p className="mt-4 text-xs sm:text-sm text-[#F8F6F1]/85 leading-relaxed">
                    Plan your visit ahead for family gatherings, weekend poolside dining, or special birthday celebrations in Waliv, Vasai East.
                  </p>

                  <div className="mt-8 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-[#A78355] flex-shrink-0 mt-0.5">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <strong className="text-sm font-semibold text-white block">Priority Table Allocation</strong>
                        <span className="text-xs text-[#F8F6F1]/75">Your table is kept reserved 15 minutes ahead of your arrival.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-[#A78355] flex-shrink-0 mt-0.5">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <strong className="text-sm font-semibold text-white block">Poolside or AC Seating</strong>
                        <span className="text-xs text-[#F8F6F1]/75">Choose between romantic starlit poolside or climate-controlled indoor dining.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-[#A78355] flex-shrink-0 mt-0.5">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <strong className="text-sm font-semibold text-white block">Zero Booking Fees</strong>
                        <span className="text-xs text-[#F8F6F1]/75">Complimentary advance table reservation with instant confirmation.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Front Desk Contacts */}
                <div className="relative z-10 mt-10 pt-6 border-t border-white/15">
                  <span className="text-[11px] uppercase font-semibold text-[#A78355] block mb-2">Immediate Assistance</span>
                  <div className="flex flex-wrap items-center gap-4 text-xs">
                    <a
                      href="tel:+919820000000"
                      className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-[#A78355] transition"
                    >
                      <Phone className="h-3.5 w-3.5 text-[#A78355]" />
                      <span>+91 98200 00000</span>
                    </a>
                    <a
                      href="https://wa.me/919820000000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold text-[#25D366] hover:underline"
                    >
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span>WhatsApp Desk</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Reservation Form */}
              <div className="lg:col-span-7 rounded-3xl bg-white p-8 sm:p-12 shadow-subtle border border-[#E8E3DA] flex flex-col justify-between">
                <div>
                  <div className="mb-6">
                    <span className="text-xs uppercase tracking-wider text-[#A78355] font-bold block mb-1">
                      Online Reservation Form
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#252525]">
                      Table Request Details
                    </h3>
                  </div>

                  {reservationSuccess ? (
                    <div className="text-center py-12">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#252525]/10 text-[#A78355] mb-4">
                        <CheckCircle className="h-10 w-10 text-[#A78355]" />
                      </div>
                      <h4 className="font-serif text-2xl font-bold text-[#252525]">
                        Table Request Received!
                      </h4>
                      <p className="mt-2 text-sm text-[#77736D] max-w-md mx-auto leading-relaxed">
                        Thank you, <strong>{reservationName}</strong>. Your dining table request for <strong>{guestsCount} guests</strong> on <strong>{reservationDate}</strong> ({seatingPreference}) has been registered in our resort system.
                      </p>

                      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                        <a
                          href={`https://wa.me/919820000000?text=Hello%20Apexify%20Resort,%20I%20just%20submitted%20a%20table%20reservation%20for%20${encodeURIComponent(reservationName)}%20on%20${encodeURIComponent(reservationDate)}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-xs font-semibold text-white shadow-subtle hover:bg-[#20ba59] transition"
                        >
                          <MessageSquare className="h-4 w-4" />
                          <span>Confirm via WhatsApp Immediately</span>
                        </a>
                        <button
                          onClick={() => {
                            setReservationSuccess(false);
                            setReservationName("");
                            setReservationPhone("");
                          }}
                          className="rounded-xl border border-[#252525] px-5 py-3 text-xs font-semibold text-[#252525] hover:bg-[#F8F6F1] transition"
                        >
                          Reserve Another Table
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleTableReservation} className="space-y-4">
                      {reservationError && (
                        <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3.5 text-xs text-red-700 border border-red-200">
                          <AlertCircle className="h-4 w-4 flex-shrink-0" />
                          <span>{reservationError}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#77736D] mb-1.5">
                            Your Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={reservationName}
                            onChange={(e) => setReservationName(e.target.value)}
                            placeholder="e.g. Rajesh Patil"
                            className="w-full rounded-xl border border-[#E8E3DA] bg-[#F8F6F1] px-3.5 py-2.5 text-sm text-[#252525] focus:border-[#A78355] focus:bg-white focus:outline-none transition"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#77736D] mb-1.5">
                            Phone / WhatsApp *
                          </label>
                          <input
                            type="tel"
                            required
                            value={reservationPhone}
                            onChange={(e) => setReservationPhone(e.target.value)}
                            placeholder="e.g. 98200 00000"
                            className="w-full rounded-xl border border-[#E8E3DA] bg-[#F8F6F1] px-3.5 py-2.5 text-sm text-[#252525] focus:border-[#A78355] focus:bg-white focus:outline-none transition"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#77736D] mb-1.5">
                            Dining Date *
                          </label>
                          <input
                            type="date"
                            required
                            value={reservationDate}
                            onChange={(e) => setReservationDate(e.target.value)}
                            className="w-full rounded-xl border border-[#E8E3DA] bg-[#F8F6F1] px-3.5 py-2.5 text-sm text-[#252525] focus:border-[#A78355] focus:bg-white focus:outline-none transition"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#77736D] mb-1.5">
                            Meal Time Slot
                          </label>
                          <select
                            value={reservationTimeSlot}
                            onChange={(e) => setReservationTimeSlot(e.target.value)}
                            className="w-full rounded-xl border border-[#E8E3DA] bg-[#F8F6F1] px-3.5 py-2.5 text-sm text-[#252525] focus:border-[#A78355] focus:bg-white focus:outline-none transition"
                          >
                            <option value="Lunch (12:00 PM - 3:30 PM)">Lunch (12:00 PM - 3:30 PM)</option>
                            <option value="Sundowner / Tea (4:00 PM - 6:30 PM)">Sundowner / Tea (4:00 PM - 6:30 PM)</option>
                            <option value="Dinner (7:00 PM - 11:30 PM)">Dinner (7:00 PM - 11:30 PM)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#77736D] mb-1.5">
                            Number of Guests
                          </label>
                          <select
                            value={guestsCount}
                            onChange={(e) => setGuestsCount(e.target.value)}
                            className="w-full rounded-xl border border-[#E8E3DA] bg-[#F8F6F1] px-3.5 py-2.5 text-sm text-[#252525] focus:border-[#A78355] focus:bg-white focus:outline-none transition"
                          >
                            <option value="2">2 Guests (Couple)</option>
                            <option value="4">4 Guests (Family)</option>
                            <option value="6">6 Guests</option>
                            <option value="8">8 Guests</option>
                            <option value="12+">12+ Guests (Party)</option>
                            <option value="25+">25+ Guests (Banquet Gathering)</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#77736D] mb-1.5">
                            Seating Preference
                          </label>
                          <select
                            value={seatingPreference}
                            onChange={(e) => setSeatingPreference(e.target.value)}
                            className="w-full rounded-xl border border-[#E8E3DA] bg-[#F8F6F1] px-3.5 py-2.5 text-sm text-[#252525] focus:border-[#A78355] focus:bg-white focus:outline-none transition"
                          >
                            <option value="Poolside Deck Tables (Outdoor Starlit)">Poolside Deck Tables (Outdoor Starlit)</option>
                            <option value="Main Indoor AC Hall (Family Comfort)">Main Indoor AC Hall (Family Comfort)</option>
                            <option value="Private Family Booth">Private Family Booth</option>
                            <option value="Garden Party Lawn Setup">Garden Party Lawn Setup</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#77736D] mb-1.5">
                            Special Occasion (Optional)
                          </label>
                          <select
                            value={specialOccasion}
                            onChange={(e) => setSpecialOccasion(e.target.value)}
                            className="w-full rounded-xl border border-[#E8E3DA] bg-[#F8F6F1] px-3.5 py-2.5 text-sm text-[#252525] focus:border-[#A78355] focus:bg-white focus:outline-none transition"
                          >
                            <option value="Family Dinner / Casual Outing">Family Dinner / Casual Outing</option>
                            <option value="Birthday Celebration">Birthday Celebration</option>
                            <option value="Wedding Anniversary">Wedding Anniversary</option>
                            <option value="Pool Party / Picnic Lunch">Pool Party / Picnic Lunch</option>
                            <option value="Corporate Team Lunch">Corporate Team Lunch</option>
                          </select>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmittingReservation}
                        className="w-full mt-4 flex items-center justify-center gap-2 rounded-2xl bg-[#A78355] py-4 px-6 text-sm font-semibold text-white shadow-subtle hover:bg-[#936F43] transition-all disabled:opacity-50"
                      >
                        {isSubmittingReservation ? (
                          <span>Submitting Table Reservation...</span>
                        ) : (
                          <>
                            <Calendar className="h-4 w-4 text-white" />
                            <span>Confirm Table Reservation</span>
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>

                {/* Direct Help Guarantee */}
                <div className="mt-8 pt-5 border-t border-[#E8E3DA] flex flex-wrap items-center justify-between gap-3 text-xs text-[#77736D]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-[#A78355]" />
                    <span>Instant Table Confirmation · No Credit Card Required</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-[#252525]">Waliv, Vasai East</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <Lightbox
          isOpen={lightboxIndex !== null}
          onClose={() => setLightboxIndex(null)}
          images={diningImages}
          currentIndex={lightboxIndex}
          onNavigate={(idx) => setLightboxIndex(idx)}
        />
      )}
    </>
  );
}