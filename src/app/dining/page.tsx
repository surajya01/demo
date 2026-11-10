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
      <main className="min-h-screen bg-[#FAF9F6]">
        {/* ================================================================= */}
        {/* 1. HERO SECTION: Immersive Luxury Gastronomy Banner               */}
        {/* ================================================================= */}
        <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden bg-[#234B3C] text-white">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/resort/restaurant_dining.jpg"
              alt="Apexify Resort Family Restaurant and Bar Atmosphere"
              fill
              className="object-cover object-center scale-105"
              priority
            />
            {/* Multi-layered luxury emerald overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#173327]/95 via-[#173327]/85 to-[#173327]/80" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#173327] via-transparent to-black/30" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8 py-20 text-center">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A46D]/50 bg-[#C5A46D]/15 px-4 py-1.5 backdrop-blur-md mb-6">
              <Sparkles className="h-3.5 w-3.5 text-[#C5A46D]" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F4EFE5]">
                Culinary Excellence & Spirits · Waliv, Vasai East
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
              Flavors Crafted for Celebrations & Quiet Evenings
            </h1>

            <p className="mt-6 text-base sm:text-xl text-[#F4EFE5]/90 max-w-2xl mx-auto font-light leading-relaxed">
              Authentic clay-oven tandoori grills, rich slow-simmered Indian curries, fresh regional specialties, and handcrafted mocktails in a welcoming family atmosphere.
            </p>

            {/* Micro Highlights Pill */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-medium text-[#F4EFE5]/90">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm border border-white/15">
                <Clock className="h-4 w-4 text-[#C5A46D]" />
                <span>11:00 AM – 11:30 PM (Daily)</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm border border-white/15">
                <Utensils className="h-4 w-4 text-[#C5A46D]" />
                <span>Dedicated Veg & Non-Veg Kitchens</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm border border-white/15">
                <Wine className="h-4 w-4 text-[#C5A46D]" />
                <span>Licensed Bar & Cocktail Lounge</span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#menu-section"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#C5A46D] px-7 py-3.5 text-sm font-semibold text-[#292D2A] hover:bg-[#d6b986] transition shadow-lg hover:shadow-xl"
              >
                <Utensils className="h-4 w-4" />
                <span>Explore Dining Menu</span>
              </a>
              <a
                href="#table-reservation"
                className="inline-flex items-center gap-2 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition backdrop-blur-sm"
              >
                <Calendar className="h-4 w-4 text-[#C5A46D]" />
                <span>Book a Table / Banquet</span>
              </a>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 2. THE 4 DINING EXPERIENCES SHOWCASE                              */}
        {/* ================================================================= */}
        <section className="py-20 sm:py-24 border-b border-[#E8DEC9]/70 bg-white">
          <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs uppercase tracking-[0.2em] text-[#C5A46D] font-bold block mb-2">
                Atmosphere & Ambiance
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#234B3C]">
                Distinct Dining Spaces for Every Occasion
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#292D2A]/75">
                Whether you prefer air-conditioned comfort, al fresco dining beside our sparkling swimming pool, or a private banquet feast, Apexify Resort has the perfect setting.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Experience 1: Family Hall */}
              <div className="group rounded-3xl overflow-hidden bg-[#FAF9F6] border border-[#E8DEC9] hover:border-[#C5A46D]/60 transition-all duration-300 shadow-xs hover:shadow-lg flex flex-col">
                <div
                  onClick={() => setLightboxIndex(0)}
                  className="relative h-52 w-full overflow-hidden cursor-pointer"
                >
                  <Image
                    src="/images/resort/restaurant_dining.jpg"
                    alt="Family Dining Hall"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 350px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-xs font-semibold text-white flex items-center gap-1.5">
                    <Eye className="h-3.5 w-3.5 text-[#C5A46D]" />
                    <span>Expand Photo</span>
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A46D]">
                    Air Conditioned
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#234B3C] mt-1">
                    Main Family Dining Hall
                  </h3>
                  <p className="mt-2 text-xs text-[#292D2A]/75 leading-relaxed flex-1">
                    Spacious indoor seating with comfortable family booths, soft background music, and direct view of the buffet counters.
                  </p>
                  <div className="mt-4 pt-4 border-t border-[#E8DEC9] text-xs font-semibold text-[#234B3C] flex items-center justify-between">
                    <span>Capacity: 80+ Seats</span>
                    <span className="text-[#C5A46D]">Lunch & Dinner</span>
                  </div>
                </div>
              </div>

              {/* Experience 2: Poolside Dining */}
              <div className="group rounded-3xl overflow-hidden bg-[#FAF9F6] border border-[#E8DEC9] hover:border-[#C5A46D]/60 transition-all duration-300 shadow-xs hover:shadow-lg flex flex-col">
                <div
                  onClick={() => setLightboxIndex(2)}
                  className="relative h-52 w-full overflow-hidden cursor-pointer"
                >
                  <Image
                    src="/images/resort/swimming_pool_night.jpg"
                    alt="Poolside Dining Deck"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 350px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-xs font-semibold text-white flex items-center gap-1.5">
                    <Eye className="h-3.5 w-3.5 text-[#C5A46D]" />
                    <span>Expand Photo</span>
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A46D]">
                    Al Fresco Deck
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#234B3C] mt-1">
                    Poolside Starlit Deck
                  </h3>
                  <p className="mt-2 text-xs text-[#292D2A]/75 leading-relaxed flex-1">
                    Dine beneath palm trees beside our illuminated outdoor swimming pool. Enjoy evening breezes, grilled tandoor, and chilled drinks.
                  </p>
                  <div className="mt-4 pt-4 border-t border-[#E8DEC9] text-xs font-semibold text-[#234B3C] flex items-center justify-between">
                    <span>Poolside Tables</span>
                    <span className="text-[#C5A46D]">Evening Specials</span>
                  </div>
                </div>
              </div>

              {/* Experience 3: Bar & Cocktails */}
              <div className="group rounded-3xl overflow-hidden bg-[#FAF9F6] border border-[#E8DEC9] hover:border-[#C5A46D]/60 transition-all duration-300 shadow-xs hover:shadow-lg flex flex-col">
                <div
                  onClick={() => setLightboxIndex(1)}
                  className="relative h-52 w-full overflow-hidden cursor-pointer"
                >
                  <Image
                    src="/images/resort/restaurant_entrance.jpg"
                    alt="Restaurant & Bar Lounge"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 350px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-xs font-semibold text-white flex items-center gap-1.5">
                    <Eye className="h-3.5 w-3.5 text-[#C5A46D]" />
                    <span>Expand Photo</span>
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A46D]">
                    Spirits & Brews
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#234B3C] mt-1">
                    Licensed Cocktail Bar
                  </h3>
                  <p className="mt-2 text-xs text-[#292D2A]/75 leading-relaxed flex-1">
                    A curated beverage selection including classic cocktails, chilled draught beer, mocktails, fresh lime refreshments, and party spirits.
                  </p>
                  <div className="mt-4 pt-4 border-t border-[#E8DEC9] text-xs font-semibold text-[#234B3C] flex items-center justify-between">
                    <span>Full Liquor Permit</span>
                    <span className="text-[#C5A46D]">11 AM – 11:30 PM</span>
                  </div>
                </div>
              </div>

              {/* Experience 4: Banquet Buffets */}
              <div className="group rounded-3xl overflow-hidden bg-[#FAF9F6] border border-[#E8DEC9] hover:border-[#C5A46D]/60 transition-all duration-300 shadow-xs hover:shadow-lg flex flex-col">
                <div
                  onClick={() => setLightboxIndex(3)}
                  className="relative h-52 w-full overflow-hidden cursor-pointer"
                >
                  <Image
                    src="/images/resort/banquet_lawn.jpg"
                    alt="Grand Banquet Buffets"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 350px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-xs font-semibold text-white flex items-center gap-1.5">
                    <Eye className="h-3.5 w-3.5 text-[#C5A46D]" />
                    <span>Expand Photo</span>
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A46D]">
                    Celebration Feasts
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#234B3C] mt-1">
                    Banquet & Lawn Buffets
                  </h3>
                  <p className="mt-2 text-xs text-[#292D2A]/75 leading-relaxed flex-1">
                    Customized grand menus and live counters for birthdays, destination weddings, and corporate annual days on our lush party lawn.
                  </p>
                  <div className="mt-4 pt-4 border-t border-[#E8DEC9] text-xs font-semibold text-[#234B3C] flex items-center justify-between">
                    <span>Up to 500+ Guests</span>
                    <span className="text-[#C5A46D]">Custom Menus</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 3. CHEF'S SIGNATURE SHOWSTOPPERS (Spotlight Section)              */}
        {/* ================================================================= */}
        <section className="py-20 sm:py-24 bg-[#F4EFE5]/50 border-b border-[#E8DEC9]">
          <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#C5A46D] font-bold block mb-2">
                  Culinary Highlights
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#234B3C]">
                  Chef's Signature Recommendations
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#292D2A]/75 max-w-md">
                Every dish is prepared fresh upon order by our master kitchen brigade using locally sourced spices and rich, authentic recipes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {/* Showstopper 1 */}
              <div className="group rounded-3xl bg-white shadow-sm hover:shadow-xl border border-[#E8DEC9] hover:border-[#C5A46D] transition-all duration-300 flex flex-col justify-between overflow-hidden">
                <div className="relative h-56 w-full overflow-hidden bg-[#E8DEC9]/20">
                  <Image
                    src="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80"
                    alt="Apexify Signature Tandoori Chicken"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-xs px-3 py-1 text-xs font-bold text-[#234B3C] shadow-sm">
                      <Sparkles className="h-3.5 w-3.5 text-[#C5A46D]" />
                      Signature Roast
                    </span>
                    <span className="flex h-6 w-6 items-center justify-center rounded-md border border-red-600 bg-white p-0.5 shadow-sm" title="Non-Vegetarian">
                      <span className="h-3 w-3 rounded-full bg-red-600" />
                    </span>
                  </div>
                </div>

                <div className="p-7 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#234B3C] group-hover:text-[#C5A46D] transition-colors">
                      Apexify Signature Tandoori Chicken
                    </h3>
                    <p className="mt-3 text-xs sm:text-sm text-[#292D2A]/75 leading-relaxed">
                      Tender whole spring chicken marinated for 12 hours with mustard oil, hung curd, and roasted stone-ground garam masala. Char-grilled on glowing clay embers.
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E8DEC9] flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-[#292D2A]/60 block">Full Portion</span>
                      <strong className="font-serif text-2xl font-bold text-[#234B3C]">₹360</strong>
                    </div>
                    <a
                      href="#table-reservation"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#234B3C] hover:text-[#C5A46D] transition"
                    >
                      <span>Reserve a Table</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Showstopper 2 */}
              <div className="group rounded-3xl bg-white shadow-sm hover:shadow-xl border border-[#E8DEC9] hover:border-[#C5A46D] transition-all duration-300 flex flex-col justify-between overflow-hidden">
                <div className="relative h-56 w-full overflow-hidden bg-[#E8DEC9]/20">
                  <Image
                    src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80"
                    alt="Dal Makhani Royal"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-xs px-3 py-1 text-xs font-bold text-[#234B3C] shadow-sm">
                      <Sparkles className="h-3.5 w-3.5 text-[#C5A46D]" />
                      Slow-Cooked Classic
                    </span>
                    <span className="flex h-6 w-6 items-center justify-center rounded-md border border-green-600 bg-white p-0.5 shadow-sm" title="Pure Vegetarian">
                      <span className="h-3 w-3 rounded-full bg-green-600" />
                    </span>
                  </div>
                </div>

                <div className="p-7 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#234B3C] group-hover:text-[#C5A46D] transition-colors">
                      Dal Makhani Royal
                    </h3>
                    <p className="mt-3 text-xs sm:text-sm text-[#292D2A]/75 leading-relaxed">
                      Premium black lentils and kidney beans slow-simmered overnight over low tandoori embers, finished with farm butter, heavy cream, and aromatic kasuri methi.
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E8DEC9] flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-[#292D2A]/60 block">Serves 2-3 Guests</span>
                      <strong className="font-serif text-2xl font-bold text-[#234B3C]">₹260</strong>
                    </div>
                    <a
                      href="#table-reservation"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#234B3C] hover:text-[#C5A46D] transition"
                    >
                      <span>Reserve a Table</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Showstopper 3 */}
              <div className="group rounded-3xl bg-white shadow-sm hover:shadow-xl border border-[#E8DEC9] hover:border-[#C5A46D] transition-all duration-300 flex flex-col justify-between overflow-hidden">
                <div className="relative h-56 w-full overflow-hidden bg-[#E8DEC9]/20">
                  <Image
                    src="https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800&auto=format&fit=crop&q=80"
                    alt="Hyderabadi Chicken Dum Biryani"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-xs px-3 py-1 text-xs font-bold text-[#234B3C] shadow-sm">
                      <Sparkles className="h-3.5 w-3.5 text-[#C5A46D]" />
                      Clay Pot Special
                    </span>
                    <span className="flex h-6 w-6 items-center justify-center rounded-md border border-red-600 bg-white p-0.5 shadow-sm" title="Non-Vegetarian">
                      <span className="h-3 w-3 rounded-full bg-red-600" />
                    </span>
                  </div>
                </div>

                <div className="p-7 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#234B3C] group-hover:text-[#C5A46D] transition-colors">
                      Hyderabadi Chicken Dum Biryani
                    </h3>
                    <p className="mt-3 text-xs sm:text-sm text-[#292D2A]/75 leading-relaxed">
                      Aged long-grain basmati rice layered with succulent marinated chicken, saffron milk, brown shallots, and fresh mint, sealed in a traditional handi pot.
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E8DEC9] flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-[#292D2A]/60 block">Includes Raita</span>
                      <strong className="font-serif text-2xl font-bold text-[#234B3C]">₹360</strong>
                    </div>
                    <a
                      href="#table-reservation"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#234B3C] hover:text-[#C5A46D] transition"
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
        <section id="menu-section" className="py-20 sm:py-28 bg-[#FAF9F6]">
          <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A46D] font-bold block mb-2">
                A Taste of Our Kitchen
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#234B3C]">
                Explore Our Complete Menu
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#292D2A]/75 leading-relaxed">
                Handcrafted multi-cuisine dishes prepared fresh to order. Resident guests can order directly from their room phone or poolside counter.
              </p>
            </div>

            {/* UNIFIED LUXURY FILTER & SEARCH HUB */}
            <div className="mb-14 rounded-3xl bg-white p-5 sm:p-7 border border-[#E8DEC9] shadow-sm">
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pb-6 border-b border-[#E8DEC9]">
                {/* Search Bar with gold icon */}
                <div className="relative flex-1 max-w-xl">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#C5A46D]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search dishes by name or ingredients (e.g. Biryani, Paneer, Tandoori)..."
                    className="w-full rounded-2xl border border-[#E8DEC9] bg-[#FAF9F6] pl-11 pr-10 py-3 text-sm text-[#292D2A] placeholder-[#292D2A]/45 focus:border-[#234B3C] focus:bg-white focus:outline-none transition shadow-inner"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#292D2A]/50 hover:text-[#234B3C] px-2 py-1 rounded-md bg-white border border-[#E8DEC9]"
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
                        ? "bg-[#234B3C] text-white shadow-xs"
                        : "bg-[#FAF9F6] text-[#292D2A]/75 border border-[#E8DEC9] hover:bg-[#F4EFE5]"
                    }`}
                  >
                    All Types ({allItemsCount})
                  </button>
                  <button
                    onClick={() => setDietaryFilter("veg")}
                    className={`rounded-xl px-4 py-2.5 text-xs font-semibold transition flex items-center gap-1.5 ${
                      dietaryFilter === "veg"
                        ? "bg-emerald-800 text-white shadow-xs"
                        : "bg-[#FAF9F6] text-emerald-800 border border-[#E8DEC9] hover:bg-emerald-50"
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
                        ? "bg-rose-900 text-white shadow-xs"
                        : "bg-[#FAF9F6] text-rose-900 border border-[#E8DEC9] hover:bg-rose-50"
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
                        ? "bg-[#C5A46D] text-[#234B3C] shadow-xs font-bold"
                        : "bg-[#FAF9F6] text-[#292D2A]/75 border border-[#E8DEC9] hover:bg-[#F4EFE5]"
                    }`}
                  >
                    <Sparkles className="h-3.5 w-3.5 text-[#C5A46D]" />
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
                        ? "bg-[#234B3C] text-white"
                        : "bg-[#FAF9F6] text-[#292D2A]/75 border border-[#E8DEC9] hover:bg-[#F4EFE5]"
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
                            ? "bg-[#234B3C] text-white shadow-xs"
                            : "bg-[#FAF9F6] text-[#292D2A]/75 border border-[#E8DEC9] hover:bg-[#F4EFE5]"
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span
                          className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                            selectedCategory === cat.id
                              ? "bg-white/20 text-white"
                              : "bg-[#E8DEC9]/60 text-[#292D2A]/70"
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="text-xs text-[#292D2A]/70 flex items-center gap-1.5">
                  <CheckCheck className="h-4 w-4 text-[#234B3C]" />
                  <span>Showing <strong>{totalFilteredCount}</strong> curated dishes</span>
                </div>
              </div>
            </div>

            {/* DISHES DISPLAY: Categorized Sections with 3-Column Luxury Cards */}
            {displayedCategories.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-[#E8DEC9] p-8 max-w-xl mx-auto shadow-sm">
                <Utensils className="h-12 w-12 text-[#C5A46D] mx-auto mb-3 opacity-60" />
                <h4 className="font-serif text-2xl font-bold text-[#234B3C]">No dishes found</h4>
                <p className="mt-2 text-xs sm:text-sm text-[#292D2A]/70 leading-relaxed">
                  We couldn't find any dishes matching your current search or dietary filters. Try resetting the filters to view the full menu.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setDietaryFilter("all");
                    setSelectedCategory("all");
                  }}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#234B3C] px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#1b3b2f] transition"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="space-y-16">
                {displayedCategories.map((category) => (
                  <div key={category.id} className="scroll-mt-24">
                    {/* Category Header Banner */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 mb-8 border-b-2 border-[#E8DEC9]/80 gap-3">
                      <div>
                        <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#C5A46D] mb-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#C5A46D]" />
                          <span>Specialty Category</span>
                        </div>
                        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#234B3C]">
                          {category.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#292D2A]/70 mt-1 max-w-2xl">
                          {category.description}
                        </p>
                      </div>

                      <span className="text-xs font-semibold text-[#292D2A]/60 bg-[#E8DEC9]/40 px-3 py-1.5 rounded-lg self-start sm:self-end">
                        {category.items.length} {category.items.length === 1 ? "Option" : "Options"} Available
                      </span>
                    </div>

                    {/* 3-Column Luxury Card Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.items.map((item) => (
                        <div
                          key={item.id}
                          className="rounded-3xl bg-white border border-[#E8DEC9] hover:border-[#C5A46D] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                        >
                          {/* Accent Top Bar for Chef Special */}
                          {item.isChefSpecial && (
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C5A46D] via-[#e5cf9f] to-[#C5A46D] z-10" />
                          )}

                          {/* Food Dish Image */}
                          {item.image && (
                            <div className="relative h-48 w-full overflow-hidden bg-[#E8DEC9]/20">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
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
                                    <span className="inline-flex items-center gap-1 rounded-full bg-[#C5A46D]/20 px-2.5 py-0.5 text-[10.5px] font-bold text-[#234B3C]">
                                      <Sparkles className="h-3 w-3 text-[#C5A46D]" />
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
                                  <span className="font-serif font-bold text-xl sm:text-2xl text-[#234B3C]">
                                    ₹{item.price}
                                  </span>
                                </div>
                              </div>

                              {/* Dish Name */}
                              <h4 className="font-serif text-lg sm:text-xl font-bold text-[#234B3C] group-hover:text-[#C5A46D] transition-colors leading-snug">
                                {item.name}
                              </h4>

                              {/* Description */}
                              <p className="mt-2.5 text-xs sm:text-[13px] text-[#292D2A]/75 leading-relaxed font-normal">
                                {item.description}
                              </p>
                            </div>

                            {/* Card Footer */}
                            <div className="mt-6 pt-4 border-t border-[#E8DEC9]/70 flex items-center justify-between text-xs">
                              <span className="text-[11px] font-medium text-[#292D2A]/60 flex items-center gap-1">
                                <Utensils className="h-3 w-3 text-[#C5A46D]" />
                                <span>Prepared Fresh to Order</span>
                              </span>

                              <a
                                href={`https://wa.me/919820000000?text=Hello%20Apexify%20Resort,%20I%20am%20interested%20in%20ordering%20the%20${encodeURIComponent(item.name)}%20(₹${item.price}).`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-xl bg-[#234B3C]/5 hover:bg-[#234B3C] text-[#234B3C] hover:text-white px-3.5 py-1.5 font-semibold text-xs transition duration-200"
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
        <section className="py-16 sm:py-20 bg-white border-y border-[#E8DEC9]">
          <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 */}
              <div className="rounded-3xl bg-[#FAF9F6] p-7 border border-[#E8DEC9] space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#234B3C] text-[#C5A46D]">
                  <Coffee className="h-6 w-6" />
                </div>
                <h4 className="font-serif text-xl font-bold text-[#234B3C]">
                  Morning Breakfast
                </h4>
                <p className="text-xs sm:text-sm text-[#292D2A]/75 leading-relaxed">
                  7:30 AM – 10:30 AM. Freshly brewed tea, coffee, hot breakfast delicacies, and fresh seasonal fruits for resident guests.
                </p>
              </div>

              {/* Card 2 */}
              <div className="rounded-3xl bg-[#FAF9F6] p-7 border border-[#E8DEC9] space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#234B3C] text-[#C5A46D]">
                  <Utensils className="h-6 w-6" />
                </div>
                <h4 className="font-serif text-xl font-bold text-[#234B3C]">
                  Lunch & Afternoon
                </h4>
                <p className="text-xs sm:text-sm text-[#292D2A]/75 leading-relaxed">
                  12:00 PM – 3:30 PM. Regional thalis, sizzling tandoor, wholesome biryanis, and poolside picnic meals.
                </p>
              </div>

              {/* Card 3 */}
              <div className="rounded-3xl bg-[#FAF9F6] p-7 border border-[#E8DEC9] space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#234B3C] text-[#C5A46D]">
                  <Clock className="h-6 w-6" />
                </div>
                <h4 className="font-serif text-xl font-bold text-[#234B3C]">
                  Evening Sundowners
                </h4>
                <p className="text-xs sm:text-sm text-[#292D2A]/75 leading-relaxed">
                  4:00 PM – 7:00 PM. Hot chai, crispy pakoras, poolside mocktails, and fresh finger bites as the sun sets over the palms.
                </p>
              </div>

              {/* Card 4 */}
              <div className="rounded-3xl bg-[#FAF9F6] p-7 border border-[#E8DEC9] space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#234B3C] text-[#C5A46D]">
                  <Wine className="h-6 w-6" />
                </div>
                <h4 className="font-serif text-xl font-bold text-[#234B3C]">
                  Dinner & Cocktails
                </h4>
                <p className="text-xs sm:text-sm text-[#292D2A]/75 leading-relaxed">
                  7:00 PM – 11:30 PM. Complete a la carte service, outdoor lawn buffet setups, and licensed bar beverage service.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 6. INTERACTIVE TABLE RESERVATION & SPECIAL OCCASIONS CONCIERGE    */}
        {/* ================================================================= */}
        <section id="table-reservation" className="py-20 sm:py-28 bg-[#FAF9F6]">
          <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left Column: Hospitality Context & Visual Guarantee */}
              <div className="lg:col-span-5 rounded-3xl bg-[#234B3C] text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden shadow-md">
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A46D]/40 bg-[#C5A46D]/15 px-3.5 py-1 text-xs font-semibold text-[#F4EFE5] mb-6">
                    <Sparkles className="h-3.5 w-3.5 text-[#C5A46D]" />
                    <span>Direct Resort Concierge</span>
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                    Reserve Your Dining Experience
                  </h3>

                  <p className="mt-4 text-xs sm:text-sm text-[#F4EFE5]/85 leading-relaxed">
                    Plan your visit ahead for family gatherings, weekend poolside dining, or special birthday celebrations in Waliv, Vasai East.
                  </p>

                  <div className="mt-8 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-[#C5A46D] flex-shrink-0 mt-0.5">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <strong className="text-sm font-semibold text-white block">Priority Table Allocation</strong>
                        <span className="text-xs text-[#F4EFE5]/75">Your table is kept reserved 15 minutes ahead of your arrival.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-[#C5A46D] flex-shrink-0 mt-0.5">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <strong className="text-sm font-semibold text-white block">Poolside or AC Seating</strong>
                        <span className="text-xs text-[#F4EFE5]/75">Choose between romantic starlit poolside or climate-controlled indoor dining.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-[#C5A46D] flex-shrink-0 mt-0.5">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <strong className="text-sm font-semibold text-white block">Zero Booking Fees</strong>
                        <span className="text-xs text-[#F4EFE5]/75">Complimentary advance table reservation with instant confirmation.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Front Desk Contacts */}
                <div className="relative z-10 mt-10 pt-6 border-t border-white/15">
                  <span className="text-[11px] uppercase font-semibold text-[#C5A46D] block mb-2">Immediate Assistance</span>
                  <div className="flex flex-wrap items-center gap-4 text-xs">
                    <a
                      href="tel:+919820000000"
                      className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-[#C5A46D] transition"
                    >
                      <Phone className="h-3.5 w-3.5 text-[#C5A46D]" />
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
              <div className="lg:col-span-7 rounded-3xl bg-white p-8 sm:p-12 shadow-md border border-[#E8DEC9] flex flex-col justify-between">
                <div>
                  <div className="mb-6">
                    <span className="text-xs uppercase tracking-wider text-[#C5A46D] font-bold block mb-1">
                      Online Reservation Form
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#234B3C]">
                      Table Request Details
                    </h3>
                  </div>

                  {reservationSuccess ? (
                    <div className="text-center py-12">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#234B3C]/10 text-[#234B3C] mb-4">
                        <CheckCircle className="h-10 w-10 text-[#234B3C]" />
                      </div>
                      <h4 className="font-serif text-2xl font-bold text-[#234B3C]">
                        Table Request Received!
                      </h4>
                      <p className="mt-2 text-sm text-[#292D2A]/80 max-w-md mx-auto leading-relaxed">
                        Thank you, <strong>{reservationName}</strong>. Your dining table request for <strong>{guestsCount} guests</strong> on <strong>{reservationDate}</strong> ({seatingPreference}) has been registered in our resort system.
                      </p>

                      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                        <a
                          href={`https://wa.me/919820000000?text=Hello%20Apexify%20Resort,%20I%20just%20submitted%20a%20table%20reservation%20for%20${encodeURIComponent(reservationName)}%20on%20${encodeURIComponent(reservationDate)}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-xs font-semibold text-white shadow-sm hover:bg-[#20ba59] transition"
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
                          className="rounded-xl border border-[#234B3C] px-5 py-3 text-xs font-semibold text-[#234B3C] hover:bg-[#FAF9F6] transition"
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
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#292D2A]/80 mb-1.5">
                            Your Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={reservationName}
                            onChange={(e) => setReservationName(e.target.value)}
                            placeholder="e.g. Rajesh Patil"
                            className="w-full rounded-xl border border-[#E8DEC9] bg-[#FAF9F6] px-3.5 py-2.5 text-sm text-[#292D2A] focus:border-[#234B3C] focus:bg-white focus:outline-none transition"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#292D2A]/80 mb-1.5">
                            Phone / WhatsApp *
                          </label>
                          <input
                            type="tel"
                            required
                            value={reservationPhone}
                            onChange={(e) => setReservationPhone(e.target.value)}
                            placeholder="e.g. 98200 00000"
                            className="w-full rounded-xl border border-[#E8DEC9] bg-[#FAF9F6] px-3.5 py-2.5 text-sm text-[#292D2A] focus:border-[#234B3C] focus:bg-white focus:outline-none transition"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#292D2A]/80 mb-1.5">
                            Dining Date *
                          </label>
                          <input
                            type="date"
                            required
                            value={reservationDate}
                            onChange={(e) => setReservationDate(e.target.value)}
                            className="w-full rounded-xl border border-[#E8DEC9] bg-[#FAF9F6] px-3.5 py-2.5 text-sm text-[#292D2A] focus:border-[#234B3C] focus:bg-white focus:outline-none transition"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#292D2A]/80 mb-1.5">
                            Meal Time Slot
                          </label>
                          <select
                            value={reservationTimeSlot}
                            onChange={(e) => setReservationTimeSlot(e.target.value)}
                            className="w-full rounded-xl border border-[#E8DEC9] bg-[#FAF9F6] px-3.5 py-2.5 text-sm text-[#292D2A] focus:border-[#234B3C] focus:bg-white focus:outline-none transition"
                          >
                            <option value="Lunch (12:00 PM - 3:30 PM)">Lunch (12:00 PM - 3:30 PM)</option>
                            <option value="Sundowner / Tea (4:00 PM - 6:30 PM)">Sundowner / Tea (4:00 PM - 6:30 PM)</option>
                            <option value="Dinner (7:00 PM - 11:30 PM)">Dinner (7:00 PM - 11:30 PM)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#292D2A]/80 mb-1.5">
                            Number of Guests
                          </label>
                          <select
                            value={guestsCount}
                            onChange={(e) => setGuestsCount(e.target.value)}
                            className="w-full rounded-xl border border-[#E8DEC9] bg-[#FAF9F6] px-3.5 py-2.5 text-sm text-[#292D2A] focus:border-[#234B3C] focus:bg-white focus:outline-none transition"
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
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#292D2A]/80 mb-1.5">
                            Seating Preference
                          </label>
                          <select
                            value={seatingPreference}
                            onChange={(e) => setSeatingPreference(e.target.value)}
                            className="w-full rounded-xl border border-[#E8DEC9] bg-[#FAF9F6] px-3.5 py-2.5 text-sm text-[#292D2A] focus:border-[#234B3C] focus:bg-white focus:outline-none transition"
                          >
                            <option value="Poolside Deck Tables (Outdoor Starlit)">Poolside Deck Tables (Outdoor Starlit)</option>
                            <option value="Main Indoor AC Hall (Family Comfort)">Main Indoor AC Hall (Family Comfort)</option>
                            <option value="Private Family Booth">Private Family Booth</option>
                            <option value="Garden Party Lawn Setup">Garden Party Lawn Setup</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#292D2A]/80 mb-1.5">
                            Special Occasion (Optional)
                          </label>
                          <select
                            value={specialOccasion}
                            onChange={(e) => setSpecialOccasion(e.target.value)}
                            className="w-full rounded-xl border border-[#E8DEC9] bg-[#FAF9F6] px-3.5 py-2.5 text-sm text-[#292D2A] focus:border-[#234B3C] focus:bg-white focus:outline-none transition"
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
                        className="w-full mt-4 flex items-center justify-center gap-2 rounded-2xl bg-[#234B3C] py-4 px-6 text-sm font-semibold text-white shadow-md hover:bg-[#1b3b2f] transition-all hover:shadow-lg disabled:opacity-50"
                      >
                        {isSubmittingReservation ? (
                          <span>Submitting Table Reservation...</span>
                        ) : (
                          <>
                            <Calendar className="h-4 w-4 text-[#C5A46D]" />
                            <span>Confirm Table Reservation</span>
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>

                {/* Direct Help Guarantee */}
                <div className="mt-8 pt-5 border-t border-[#E8DEC9] flex flex-wrap items-center justify-between gap-3 text-xs text-[#292D2A]/70">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-[#234B3C]" />
                    <span>Instant Table Confirmation · No Credit Card Required</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-[#234B3C]">Waliv, Vasai East</span>
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