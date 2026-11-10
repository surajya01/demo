import React from "react";
import { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { WelcomeSection } from "@/components/home/WelcomeSection";
import { FeaturedRooms } from "@/components/home/FeaturedRooms";
import { HighlightsSection } from "@/components/home/HighlightsSection";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { SpecialOffersSection } from "@/components/home/SpecialOffersSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { LocationSection } from "@/components/home/LocationSection";

export const metadata: Metadata = {
  title: "Dhuri Resort | Luxury Resort & Dining in Waliv, Vasai East",
  description: "Experience serene relaxation at Dhuri Resort in Waliv, Vasai East. Featuring outdoor swimming pool, air-conditioned deluxe rooms, multi-cuisine restaurant, and grand banquet party lawn.",
  keywords: [
    "Dhuri Resort",
    "Dhuri Resort Vasai",
    "Resorts in Vasai East",
    "Resorts near Mumbai",
    "Resort with swimming pool Vasai",
    "Waliv resort",
    "Family restaurant Vasai",
    "Banquet lawn Vasai"
  ],
  openGraph: {
    title: "Dhuri Resort | Luxury Resort & Dining in Waliv, Vasai East",
    description: "Your Stay, Simplified. Featuring outdoor swimming pool, air-conditioned suites, multi-cuisine dining, and grand party lawn in Vasai East.",
    url: "https://dhuri-resort.example.com",
    siteName: "Dhuri Resort",
    images: [
      {
        url: "/images/resort/exterior_facade.jpg",
        width: 1024,
        height: 683,
        alt: "Dhuri Resort Exterior Facade and Swimming Pool",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* 1. Hero with Genuine Resort Photography */}
      <HeroSection />

      {/* 2. Resort Welcome & Story */}
      <WelcomeSection />

      {/* 3. Featured Rooms & Accommodation */}
      <FeaturedRooms />

      {/* 4. Experience Highlights (Pool, Dining, Lawn) */}
      <HighlightsSection />

      {/* 5. Visual Gallery Preview with Lightbox */}
      <GalleryPreview />

      {/* 6. Special Offers & Day Packages */}
      <SpecialOffersSection />

      {/* 7. Guest Testimonials (Sample Preview) */}
      <TestimonialsSection />

      {/* 8. Location, Directions & Transit Map */}
      <LocationSection />
    </main>
  );
}
