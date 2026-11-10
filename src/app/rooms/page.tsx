"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, Maximize, Wind, Check, Calendar, Sparkles, Phone, ArrowRight, ShieldCheck } from "lucide-react";
import { ROOMS_DATA } from "@/data/rooms.data";
import { SectionHeader } from "@/components/common/SectionHeader";
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
      <main className="min-h-screen bg-[#FAF9F6]">
        {/* Banner */}
        <section className="relative py-20 sm:py-24 bg-[#234B3C] text-white overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            <Image
              src="/images/resort/room_deluxe_double.jpg"
              alt="Dhuri Resort Rooms Header"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A46D] font-semibold block mb-3">
              Accommodation & Lodging
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Rooms & Suites in Vasai East
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#F4EFE5]/85 max-w-2xl mx-auto font-light">
              Meticulously maintained accommodations designed for restful weekends, business stopovers, and family celebrations with pool access.
            </p>

            {/* Filter Pills */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`rounded-full px-5 py-2 text-xs font-semibold transition ${
                  filter === "all"
                    ? "bg-[#C5A46D] text-[#292D2A]"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                All Room Categories ({ROOMS_DATA.length})
              </button>
              <button
                onClick={() => setFilter("ac")}
                className={`rounded-full px-5 py-2 text-xs font-semibold transition ${
                  filter === "ac"
                    ? "bg-[#C5A46D] text-[#292D2A]"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                Air Conditioned Only
              </button>
              <button
                onClick={() => setFilter("value")}
                className={`rounded-full px-5 py-2 text-xs font-semibold transition ${
                  filter === "value"
                    ? "bg-[#C5A46D] text-[#292D2A]"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                Value Non-AC (Fan)
              </button>
            </div>
          </div>
        </section>

        {/* Room Listing Grid */}
        <section className="py-20 sm:py-24 border-b border-[#E8DEC9]/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {filteredRooms.map((room, index) => (
                <MotionWrapper key={room.id} delay={index * 0.1}>
                  <div className="flex flex-col lg:flex-row rounded-3xl bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#E8DEC9]">
                    {/* Left: Image Container */}
                    <div className="relative h-72 sm:h-96 lg:h-auto lg:w-5/12 overflow-hidden flex-shrink-0 bg-slate-100">
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
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#234B3C]/95 px-3 py-1 text-xs font-semibold text-[#F4EFE5] backdrop-blur-sm">
                            <Sparkles className="h-3.5 w-3.5 text-[#C5A46D]" />
                            Verified Genuine Photography
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-[#292D2A]/85 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                            Preview Placeholder
                          </span>
                        )}
                        {room.isPopular && (
                          <span className="inline-flex items-center rounded-full bg-[#C5A46D] px-3 py-1 text-xs font-bold text-[#234B3C]">
                            Most Booked
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10">
                        <span>{room.view}</span>
                        <span>{room.sizeSqFt} sq.ft</span>
                      </div>
                    </div>

                    {/* Right: Room Content */}
                    <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between flex-grow">
                      <div>
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div>
                            <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold">
                              {room.categoryName}
                            </span>
                            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#234B3C] mt-1">
                              <Link href={`/rooms/${room.slug}`} className="hover:text-[#C5A46D] transition">
                                {room.name}
                              </Link>
                            </h2>
                          </div>

                          {/* Pricing Badge */}
                          <div className="rounded-2xl bg-[#F4EFE5] px-5 py-3 border border-[#C5A46D]/30 text-right">
                            <span className="text-[10px] uppercase font-semibold text-[#292D2A]/70 block">
                              Standard Nightly Rate
                            </span>
                            <div className="font-serif text-2xl font-bold text-[#234B3C]">
                              ₹{room.basePrice.toLocaleString()}
                              <span className="text-xs font-normal text-[#292D2A]/70 font-sans"> / night</span>
                            </div>
                            <span className="text-[10px] text-[#292D2A]/60 block mt-0.5">
                              Weekend: ₹{room.weekendPrice.toLocaleString()} / night
                            </span>
                          </div>
                        </div>

                        <p className="mt-4 text-sm sm:text-base text-[#292D2A]/80 leading-relaxed">
                          {room.description}
                        </p>

                        {/* Specs Grid */}
                        <div className="my-6 grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8DEC9] text-xs">
                          <div>
                            <span className="text-[10px] uppercase text-[#292D2A]/60 block">Occupancy</span>
                            <span className="font-semibold text-[#234B3C]">Max {room.maxOccupancy} Guests</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase text-[#292D2A]/60 block">Bed Layout</span>
                            <span className="font-semibold text-[#234B3C]">{room.bedConfiguration}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase text-[#292D2A]/60 block">Bathroom</span>
                            <span className="font-semibold text-[#234B3C]">Private Ensuite Bath</span>
                          </div>
                        </div>

                        {/* Key Amenities */}
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-[#292D2A]/70 block mb-2.5">
                            Key Room Inclusions:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#292D2A]/85">
                            {room.amenities.slice(0, 6).map((amenity, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <Check className="h-3.5 w-3.5 text-[#234B3C] flex-shrink-0" />
                                <span>{amenity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-8 pt-6 border-t border-[#E8DEC9] flex flex-wrap items-center justify-between gap-4">
                        <Link
                          href={`/rooms/${room.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#234B3C] hover:text-[#C5A46D] transition"
                        >
                          <span>View Full Photos & Specifications</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>

                        <div className="flex items-center gap-3">
                          <Link
                            href={`/rooms/${room.slug}`}
                            className="rounded-xl border border-[#234B3C]/30 bg-transparent px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#234B3C] hover:bg-[#FAF9F6] transition"
                          >
                            Details
                          </Link>
                          <button
                            onClick={() => setSelectedRoomSlug(room.slug)}
                            className="inline-flex items-center gap-2 rounded-xl bg-[#234B3C] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#1b3b2f] transition"
                          >
                            <Calendar className="h-4 w-4 text-[#C5A46D]" />
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
        <section className="py-14 bg-[#F4EFE5] border-b border-[#E8DEC9]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center sm:text-left">
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-6 w-6 text-[#234B3C] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-base text-[#234B3C]">Direct Best Rate Guarantee</h4>
                  <p className="text-xs text-[#292D2A]/70 mt-1">Book directly through our website or phone for the guaranteed lowest room rates.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="h-6 w-6 text-[#234B3C] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-base text-[#234B3C]">Flexible Check-in Support</h4>
                  <p className="text-xs text-[#292D2A]/70 mt-1">24-hour reception desk to accommodate late evening arrivals and luggage holding.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-6 w-6 text-[#234B3C] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-base text-[#234B3C]">Immediate WhatsApp Confirmation</h4>
                  <p className="text-xs text-[#292D2A]/70 mt-1">Get fast answers to room queries directly from resort front desk staff.</p>
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

