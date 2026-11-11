"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, Maximize, Wind, Check, Calendar, Sparkles, Phone, ArrowRight, ShieldCheck } from "lucide-react";
import { ROOMS_DATA } from "@/data/rooms.data";
import { MotionWrapper } from "@/components/common/MotionWrapper";
import { QuickEnquiryModal } from "@/components/common/QuickEnquiryModal";

export default function RoomsPage() {
  const [selectedRoomSlug, setSelectedRoomSlug] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "ac" | "value">("all");

  const filteredRooms = ROOMS_DATA.filter((room) => {
    if (filter === "ac") return room.id !== "standard-double-room-fan";
    if (filter === "value") return room.id === "standard-double-room-fan";
    return true;
  });

  return (
    <>
      <main className="min-h-screen bg-[#F8F6F1]">
        {/* Banner - Solid dark tint, no gradients */}
        <section className="relative py-20 sm:py-28 bg-[#252525] text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/resort/room_deluxe_double.jpg"
              alt="Apexify Resort Rooms Header"
              fill
              className="object-cover opacity-30"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-[#A78355] font-semibold block mb-3">
              Accommodation & Lodging
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white">
              Rooms & Suites in Vasai East
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#F8F6F1]/90 max-w-2xl mx-auto font-light">
              Meticulously maintained accommodations designed for restful weekends, business stopovers, and family celebrations with pool access.
            </p>

            {/* Filter Pills */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                  filter === "all"
                    ? "bg-[#A78355] text-white shadow-subtle"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                All Categories ({ROOMS_DATA.length})
              </button>
              <button
                onClick={() => setFilter("ac")}
                className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                  filter === "ac"
                    ? "bg-[#A78355] text-white shadow-subtle"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                Air Conditioned Only
              </button>
              <button
                onClick={() => setFilter("value")}
                className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                  filter === "value"
                    ? "bg-[#A78355] text-white shadow-subtle"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                Value Non-AC (Fan)
              </button>
            </div>
          </div>
        </section>

        {/* Room Listing Grid */}
        <section className="py-20 sm:py-28 border-b border-[#E8E3DA]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {filteredRooms.map((room, index) => (
                <MotionWrapper key={room.id} delay={index * 0.1}>
                  <div className="flex flex-col lg:flex-row rounded-3xl bg-white overflow-hidden shadow-subtle hover:shadow-card transition-all duration-300 border border-[#E8E3DA]">
                    {/* Left: Image Container */}
                    <div className="relative h-72 sm:h-96 lg:h-auto lg:w-5/12 overflow-hidden flex-shrink-0 bg-[#F8F6F1]">
                      <Image
                        src={room.coverImage}
                        alt={room.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />

                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {room.isVerified ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#252525] px-3.5 py-1 text-xs font-medium text-white shadow-xs">
                            <Sparkles className="h-3.5 w-3.5 text-[#A78355]" />
                            Verified Genuine Photo
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-[#252525]/85 px-3.5 py-1 text-xs font-medium text-white shadow-xs">
                            Preview Placeholder
                          </span>
                        )}
                        {room.isPopular && (
                          <span className="inline-flex items-center rounded-full bg-[#A78355] px-3.5 py-1 text-xs font-semibold text-white shadow-xs">
                            Most Popular
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs bg-[#252525]/85 px-4 py-2 rounded-xl border border-white/10 shadow-xs">
                        <span>{room.view}</span>
                        <span>{room.sizeSqFt} sq.ft</span>
                      </div>
                    </div>

                    {/* Right: Room Content */}
                    <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between flex-grow">
                      <div>
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div>
                            <span className="text-xs uppercase tracking-[0.2em] text-[#A78355] font-semibold">
                              {room.categoryName}
                            </span>
                            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#252525] mt-1">
                              <Link href={`/rooms/${room.slug}`} className="hover:text-[#A78355] transition">
                                {room.name}
                              </Link>
                            </h2>
                          </div>

                          {/* Pricing Badge */}
                          <div className="rounded-2xl bg-[#F8F6F1] px-5 py-3 border border-[#E8E3DA] text-right">
                            <span className="text-[10px] uppercase tracking-wider font-medium text-[#77736D] block">
                              Standard Nightly Rate
                            </span>
                            <div className="font-serif text-2xl font-bold text-[#252525]">
                              ₹{room.basePrice.toLocaleString()}
                              <span className="text-xs font-normal text-[#77736D] font-sans"> / night</span>
                            </div>
                            <span className="text-[10px] text-[#77736D] block mt-0.5">
                              Weekend: ₹{room.weekendPrice.toLocaleString()} / night
                            </span>
                          </div>
                        </div>

                        <p className="mt-4 text-sm sm:text-base text-[#77736D] leading-relaxed">
                          {room.description}
                        </p>

                        {/* Specs Grid */}
                        <div className="my-6 grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#F8F6F1] border border-[#E8E3DA] text-xs">
                          <div>
                            <span className="text-[10px] uppercase text-[#77736D] block">Occupancy</span>
                            <span className="font-medium text-[#252525]">Max {room.maxOccupancy} Guests</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase text-[#77736D] block">Bed Layout</span>
                            <span className="font-medium text-[#252525]">{room.bedConfiguration}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase text-[#77736D] block">Bathroom</span>
                            <span className="font-medium text-[#252525]">Private Ensuite Bath</span>
                          </div>
                        </div>

                        {/* Key Amenities */}
                        <div>
                          <span className="text-xs font-medium uppercase tracking-wider text-[#77736D] block mb-2.5">
                            Key Room Inclusions:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#252525]">
                            {room.amenities.slice(0, 6).map((amenity, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <Check className="h-3.5 w-3.5 text-[#A78355] flex-shrink-0" />
                                <span>{amenity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-8 pt-6 border-t border-[#E8E3DA] flex flex-wrap items-center justify-between gap-4">
                        <Link
                          href={`/rooms/${room.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#252525] hover:text-[#A78355] transition"
                        >
                          <span>View Full Photos & Specifications</span>
                          <ArrowRight className="h-4 w-4 text-[#A78355]" />
                        </Link>

                        <div className="flex items-center gap-3">
                          <Link
                            href={`/rooms/${room.slug}`}
                            className="rounded-xl border border-[#E8E3DA] bg-[#F8F6F1] hover:bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wide text-[#252525] transition"
                          >
                            Details
                          </Link>
                          <button
                            onClick={() => setSelectedRoomSlug(room.slug)}
                            className="inline-flex items-center gap-2 rounded-xl bg-[#A78355] hover:bg-[#936F43] px-6 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white shadow-subtle hover:shadow-card transition"
                          >
                            <Calendar className="h-4 w-4 text-white" />
                            <span>Reserve / Enquire</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </MotionWrapper>
              ))}
            </div>
          </div>
        </section>

        {/* Direct Booking Assurance Banner */}
        <section className="py-14 bg-[#FFFFFF] border-b border-[#E8E3DA]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center sm:text-left">
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-6 w-6 text-[#A78355] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-medium text-base text-[#252525]">Direct Best Rate Guarantee</h4>
                  <p className="text-xs text-[#77736D] mt-1">Book directly through our website or phone for the guaranteed lowest room rates.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="h-6 w-6 text-[#A78355] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-medium text-base text-[#252525]">Flexible Check-in Support</h4>
                  <p className="text-xs text-[#77736D] mt-1">24-hour reception desk to accommodate late evening arrivals and luggage holding.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-6 w-6 text-[#A78355] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-medium text-base text-[#252525]">Immediate WhatsApp Confirmation</h4>
                  <p className="text-xs text-[#77736D] mt-1">Get fast answers to room queries directly from resort front desk staff.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quick Enquiry Modal */}
      {selectedRoomSlug && (
        <QuickEnquiryModal
          isOpen={!!selectedRoomSlug}
          onClose={() => setSelectedRoomSlug(null)}
          initialRoomSlug={selectedRoomSlug}
        />
      )}
    </>
  );
}
