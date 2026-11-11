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
      <section className="relative px-3 sm:px-6 lg:px-8 pt-3 pb-8 max-w-[1600px] mx-auto">
        {/* Main Hero Container - 70-85vh on desktop with elegant architectural framing */}
        <div className="relative min-h-[72vh] lg:h-[78vh] lg:max-h-[820px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-card border border-[#E8E3DA] flex flex-col justify-between p-6 sm:p-10 lg:p-14">
          {/* Architectural Background Photography (Natural lighting & evening ambience) */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src="/images/resort/exterior_facade.jpg"
              alt="Apexify Resort Luxury Facade and Swimming Pool with Warm Evening Lighting"
              fill
              priority
              className="object-cover object-center transition-transform duration-1000 ease-out"
              sizes="100vw"
            />
            {/* Minimal solid overlay only for text legibility - Strict NO gradient */}
            <div className="absolute inset-0 bg-black/45" />
          </div>

          {/* Top Location Badge */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-xs text-white"
            >
              <MapPin className="h-3.5 w-3.5 text-[#A78355]" />
              <span className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.2em] text-[#F8F6F1]">
                Waliv · Vasai East · Maharashtra
              </span>
            </motion.div>
          </div>

          {/* Center Content: Title, Description, and CTAs */}
          <div className="relative z-10 max-w-3xl my-auto py-6 sm:py-8 text-white">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.12] text-white"
            >
              Your Peaceful Boutique Retreat in Vasai
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 sm:mt-5 text-base sm:text-lg text-[#F8F6F1]/90 leading-relaxed font-normal max-w-2xl"
            >
              Immerse yourself in lush greenery, a sparkling outdoor swimming pool, comfortable air-conditioned suites, and authentic multi-cuisine dining.
            </motion.p>

            {/* CTAs: Clear Book Now CTA & Secondary Explore Rooms CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-7 flex flex-wrap items-center gap-3.5"
            >
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2.5 rounded-xl bg-[#A78355] hover:bg-[#936F43] px-6 py-3.5 text-xs sm:text-sm font-semibold tracking-wider uppercase text-white shadow-subtle transition-all hover:shadow-card active:scale-[0.98]"
              >
                <span>Book Now</span>
                <ArrowRight className="h-4 w-4 text-white" />
              </button>

              <Link
                href="/rooms"
                className="inline-flex items-center gap-2 rounded-xl border border-white/80 bg-white/10 hover:bg-white text-white hover:text-[#252525] px-6 py-3.5 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all backdrop-blur-xs"
              >
                <span>Explore Rooms</span>
              </Link>
            </motion.div>

            {/* Key Value Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 hidden sm:flex flex-wrap gap-5 text-xs text-[#F8F6F1]/90"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-[#A78355]">
                  <Waves className="h-3.5 w-3.5 text-white" />
                </div>
                <span>Outdoor Swimming Pool</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-[#A78355]">
                  <Utensils className="h-3.5 w-3.5 text-white" />
                </div>
                <span>Restaurant & Bar</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-[#A78355]">
                  <Sparkles className="h-3.5 w-3.5 text-white" />
                </div>
                <span>Banquet Party Lawn</span>
              </div>
            </motion.div>
          </div>

          {/* Integrated Clean Booking / Availability Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="relative z-10 w-full rounded-2xl bg-white p-4 sm:p-5 shadow-card border border-[#E8E3DA]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 items-end">
              {/* Check-in */}
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[#77736D] mb-1.5 flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-[#A78355]" />
                  <span>Check-in Date</span>
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full rounded-xl border border-[#E8E3DA] bg-[#F8F6F1] px-3.5 py-2.5 text-xs sm:text-sm text-[#252525] focus:border-[#A78355] focus:bg-white focus:outline-none transition"
                />
              </div>

              {/* Check-out */}
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[#77736D] mb-1.5 flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-[#A78355]" />
                  <span>Check-out Date</span>
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full rounded-xl border border-[#E8E3DA] bg-[#F8F6F1] px-3.5 py-2.5 text-xs sm:text-sm text-[#252525] focus:border-[#A78355] focus:bg-white focus:outline-none transition"
                />
              </div>

              {/* Room Preference */}
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[#77736D] mb-1.5 flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-[#A78355]" />
                  <span>Room Category</span>
                </label>
                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="w-full rounded-xl border border-[#E8E3DA] bg-[#F8F6F1] px-3.5 py-2.5 text-xs sm:text-sm text-[#252525] focus:border-[#A78355] focus:bg-white focus:outline-none transition"
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
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#A78355] hover:bg-[#936F43] py-2.5 sm:py-3 px-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white shadow-subtle hover:shadow-card transition-all active:scale-[0.99]"
                >
                  <span>Check Availability</span>
                  <ArrowRight className="h-4 w-4 text-white" />
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
