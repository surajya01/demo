"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Users, ArrowRight, Waves, Utensils, Sparkles, MapPin } from "lucide-react";
import { QuickEnquiryModal } from "@/components/common/QuickEnquiryModal";

export function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [roomType, setRoomType] = useState("deluxe-double-room");

  return (
    <>
      <section className="relative min-h-[90vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#234B3C]">
        {/* Background Image with Dark Vignette */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/resort/exterior_facade.jpg"
            alt="Dhuri Resort Exterior Facade and Pool Deck in Waliv, Vasai East"
            fill
            priority
            className="object-cover object-center scale-100 sm:scale-105 transition-transform duration-1000 ease-out"
            sizes="100vw"
          />
          {/* Multi-layered luxury overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#234B3C]/95 via-[#234B3C]/75 to-[#234B3C]/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#234B3C] via-transparent to-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28 text-white w-full">
          <div className="max-w-3xl">
            {/* Top Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#C5A46D]/40 bg-[#C5A46D]/15 px-4 py-1.5 backdrop-blur-sm mb-6"
            >
              <MapPin className="h-3.5 w-3.5 text-[#C5A46D]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#F4EFE5]">
                Waliv · Vasai East · Maharashtra
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-white"
            >
              Your Peaceful Luxury Retreat in Vasai
            </motion.h1>

            {/* Tagline & Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-[#F4EFE5]/90 leading-relaxed font-light max-w-2xl"
            >
              Immerse yourself in lush greenery, sparkling outdoor swimming pool, comfortable air-conditioned suites, and authentic multi-cuisine dining.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-2 font-serif italic text-base sm:text-lg text-[#C5A46D]"
            >
              “Dhuri Resort — Your Stay, Simplified.”
            </motion.p>

            {/* Key Value Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm text-[#F4EFE5]/85"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#C5A46D]/20 text-[#C5A46D]">
                  <Waves className="h-4 w-4" />
                </div>
                <span>Outdoor Swimming Pool</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#C5A46D]/20 text-[#C5A46D]">
                  <Utensils className="h-4 w-4" />
                </div>
                <span>Family Restaurant & Bar</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#C5A46D]/20 text-[#C5A46D]">
                  <Sparkles className="h-4 w-4" />
                </div>
                <span>Grand Banquet Lawn</span>
              </div>
            </motion.div>
          </div>

          {/* Floating Search & Booking Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 sm:mt-16 w-full rounded-2xl bg-white/95 p-4 sm:p-6 shadow-2xl backdrop-blur-md border border-[#C5A46D]/30"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              {/* Check-in */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#292D2A]/80 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-[#C5A46D]" />
                  <span>Check-in Date</span>
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full rounded-xl border border-[#E8DEC9] bg-[#FAF9F6] px-3.5 py-2.5 text-sm text-[#292D2A] focus:border-[#234B3C] focus:bg-white focus:outline-none transition"
                />
              </div>

              {/* Check-out */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#292D2A]/80 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-[#C5A46D]" />
                  <span>Check-out Date</span>
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full rounded-xl border border-[#E8DEC9] bg-[#FAF9F6] px-3.5 py-2.5 text-sm text-[#292D2A] focus:border-[#234B3C] focus:bg-white focus:outline-none transition"
                />
              </div>

              {/* Room Preference */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#292D2A]/80 mb-1.5 flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-[#C5A46D]" />
                  <span>Room Category</span>
                </label>
                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="w-full rounded-xl border border-[#E8DEC9] bg-[#FAF9F6] px-3.5 py-2.5 text-sm text-[#292D2A] focus:border-[#234B3C] focus:bg-white focus:outline-none transition"
                >
                  <option value="deluxe-double-room">Deluxe Double Room (AC)</option>
                  <option value="executive-double-room">Executive Double Room</option>
                  <option value="standard-double-room-fan">Standard Double Room (Fan)</option>
                </select>
              </div>

              {/* CTA Button */}
              <div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#234B3C] py-3 px-4 text-sm font-semibold text-white shadow-md hover:bg-[#1b3b2f] transition-all hover:shadow-lg"
                >
                  <span>Check Availability</span>
                  <ArrowRight className="h-4 w-4 text-[#C5A46D]" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Enquiry Modal */}
      <QuickEnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialRoomSlug={roomType}
        initialCheckIn={checkIn}
        initialCheckOut={checkOut}
      />
    </>
  );
}

