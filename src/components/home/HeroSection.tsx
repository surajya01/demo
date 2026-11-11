"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Users, ArrowRight, Waves, Utensils, Sparkles, MapPin, CheckCircle2, ShieldCheck } from "lucide-react";
import { QuickEnquiryModal } from "@/components/common/QuickEnquiryModal";

export function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [roomType, setRoomType] = useState("deluxe-double-room");

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. FULL-WIDTH PANORAMIC 5-STAR HOTEL HERO BANNER                          */}
      {/* ========================================================================= */}
      <section className="relative w-full min-h-[80vh] lg:min-h-[86vh] flex flex-col justify-between overflow-hidden">
        {/* Cinematic Background with Slow Ambient Scale Reveal */}
        <motion.div
          initial={{ scale: 1.1, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/images/resort/exterior_facade.jpg"
            alt="Apexify Hotel Resort Architectural Facade at Sunset with Warm Evening Lighting"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Minimal Solid Dark Tint for Contrast (Zero Gradients) */}
          <div className="absolute inset-0 bg-black/35" />
        </motion.div>

        {/* Center Content: Grand Editorial Typography & Animated CTAs */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 text-center text-white my-auto">
          {/* Animated Headline with Smooth Upward Drift */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal tracking-tight text-white leading-[1.12] drop-shadow-sm"
          >
            Your Peaceful Boutique <br className="hidden sm:inline" />
            <span className="italic font-light text-[#F8F6F1]">Retreat in Vasai</span>
          </motion.h1>

          {/* Animated Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 sm:mt-6 text-base sm:text-lg lg:text-xl text-[#F8F6F1]/90 font-light max-w-2xl mx-auto leading-relaxed"
          >
            Immerse yourself in lush greenery, an illuminated outdoor swimming pool, comfortable air-conditioned suites, and authentic multi-cuisine dining.
          </motion.p>

          {/* Action CTAs with Interactive Micro-Animations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsModalOpen(true)}
              className="group inline-flex items-center gap-2.5 rounded-xl bg-[#A78355] hover:bg-[#936F43] px-8 py-4 text-xs sm:text-sm font-semibold tracking-wider uppercase text-white shadow-subtle hover:shadow-card transition-all"
            >
              <span>Book Your Stay</span>
              <ArrowRight className="h-4 w-4 text-white group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/rooms"
                className="inline-flex items-center gap-2 rounded-xl border border-white/60 bg-black/25 hover:bg-white text-white hover:text-[#252525] px-8 py-4 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all backdrop-blur-md"
              >
                <span>Explore Rooms</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Luxury Resort Amenities Quick Row with Soft Fade */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75 }}
            className="mt-10 hidden sm:flex items-center justify-center gap-6 lg:gap-8 text-xs font-medium tracking-wider text-[#F8F6F1]/85"
          >
            <div className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
              <Waves className="h-3.5 w-3.5 text-[#A78355]" />
              <span>Outdoor Swimming Pool</span>
            </div>
            <span className="text-white/40">·</span>
            <div className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
              <Utensils className="h-3.5 w-3.5 text-[#A78355]" />
              <span>Multi-Cuisine Dining</span>
            </div>
            <span className="text-white/40">·</span>
            <div className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
              <Sparkles className="h-3.5 w-3.5 text-[#A78355]" />
              <span>Banquet Party Lawn</span>
            </div>
          </motion.div>
        </div>

        {/* Elegant Animated Scroll Hint Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-10 hidden lg:flex flex-col items-center pointer-events-none"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 rounded-full bg-[#A78355]" />
          </motion.div>
        </motion.div>

        {/* Bottom Spacer for the Floating Booking Bar */}
        <div className="h-10 sm:h-14" />
      </section>

      {/* ========================================================================= */}
      {/* 2. SIGNATURE 5-STAR FLOATING RESERVATION CONSOLE                          */}
      {/* ========================================================================= */}
      <section className="relative z-30 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl bg-white p-5 sm:p-7 shadow-card border border-[#E8E3DA] transition-shadow duration-300 hover:shadow-lg"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            {/* 1. Check-In */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#77736D] mb-1.5 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-[#A78355]" />
                <span>Check-In Date</span>
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full rounded-xl border border-[#E8E3DA] bg-[#F8F6F1] px-3.5 py-3 text-xs sm:text-sm font-medium text-[#252525] focus:border-[#A78355] focus:bg-white focus:outline-none transition shadow-inner"
              />
            </div>

            {/* 2. Check-Out */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#77736D] mb-1.5 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-[#A78355]" />
                <span>Check-Out Date</span>
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full rounded-xl border border-[#E8E3DA] bg-[#F8F6F1] px-3.5 py-3 text-xs sm:text-sm font-medium text-[#252525] focus:border-[#A78355] focus:bg-white focus:outline-none transition shadow-inner"
              />
            </div>

            {/* 3. Room Category */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#77736D] mb-1.5 flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-[#A78355]" />
                <span>Room Category</span>
              </label>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="w-full rounded-xl border border-[#E8E3DA] bg-[#F8F6F1] px-3.5 py-3 text-xs sm:text-sm font-medium text-[#252525] focus:border-[#A78355] focus:bg-white focus:outline-none transition"
              >
                <option value="deluxe-double-room">Deluxe Double Room (AC)</option>
                <option value="executive-double-room">Executive Double Room</option>
                <option value="standard-double-room-fan">Standard Double Room (Fan)</option>
              </select>
            </div>

            {/* 4. Action CTA with Interactive Hover Lift */}
            <div>
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsModalOpen(true)}
                className="group w-full h-[48px] flex items-center justify-center gap-2 rounded-xl bg-[#A78355] hover:bg-[#936F43] px-5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white shadow-subtle hover:shadow-card transition-all"
              >
                <span>Check Availability</span>
                <ArrowRight className="h-4 w-4 text-white group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </div>

          {/* Reassurance Micro-Bar */}
          <div className="mt-4 pt-3.5 border-t border-[#E8E3DA] flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#77736D]">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#A78355]" />
              <span>Best Direct Booking Rates</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-[#A78355]" />
              <span>Instant Confirmation · 24/7 Front Desk Assistance</span>
            </div>
          </div>
        </motion.div>
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
