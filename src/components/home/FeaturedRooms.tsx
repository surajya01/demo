"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, Maximize, Wind, Check, ArrowRight, Calendar, Sparkles } from "lucide-react";
import { ROOMS_DATA, RoomItem } from "@/data/rooms.data";
import { SectionHeader } from "@/components/common/SectionHeader";
import { MotionWrapper } from "@/components/common/MotionWrapper";
import { QuickEnquiryModal } from "@/components/common/QuickEnquiryModal";

export function FeaturedRooms() {
  const [selectedRoomSlug, setSelectedRoomSlug] = useState<string | null>(null);

  return (
    <>
      <section className="py-20 sm:py-24 bg-[#F4EFE5]/40 border-b border-[#E8DEC9]/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Accommodations & Suites"
            title="Designed for Restful Comfort"
            subtitle="Choose from our air-conditioned deluxe suites, executive rooms, and value accommodations — all featuring ensuite bathrooms, high-speed Wi-Fi, and access to all resort recreation."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ROOMS_DATA.map((room, index) => (
              <MotionWrapper key={room.id} delay={index * 0.15}>
                <div className="group flex flex-col h-full rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#E8DEC9]/80">
                  {/* Room Cover Image */}
                  <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={room.coverImage}
                      alt={room.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Status Badge */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      {room.isVerified ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#234B3C]/90 px-3 py-1 text-[11px] font-semibold text-[#F4EFE5] backdrop-blur-sm shadow-sm">
                          <Sparkles className="h-3 w-3 text-[#C5A46D]" />
                          Verified Genuine Photo
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-[#292D2A]/80 px-3 py-1 text-[11px] font-semibold text-white/90 backdrop-blur-sm shadow-sm">
                          Preview Placeholder
                        </span>
                      )}
                      {room.isPopular && (
                        <span className="inline-flex items-center rounded-full bg-[#C5A46D] px-3 py-1 text-[11px] font-bold text-[#234B3C] shadow-sm">
                          Most Popular
                        </span>
                      )}
                    </div>

                    {/* Price Tag Overlay */}
                    <div className="absolute bottom-3 right-3 rounded-xl bg-white/95 px-3.5 py-1.5 text-right shadow-md backdrop-blur-sm border border-[#C5A46D]/20">
                      <span className="text-[10px] uppercase font-semibold text-[#292D2A]/70 block">Starting From</span>
                      <div className="font-serif text-lg font-bold text-[#234B3C]">
                        ₹{room.basePrice.toLocaleString()}
                        <span className="text-xs font-normal text-[#292D2A]/70 font-sans"> / night</span>
                      </div>
                    </div>
                  </div>

                  {/* Room Card Body */}
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A46D]">
                      {room.categoryName}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#234B3C] mt-1 group-hover:text-[#C5A46D] transition">
                      <Link href={`/rooms/${room.slug}`}>{room.name}</Link>
                    </h3>

                    <p className="mt-2 text-sm text-[#292D2A]/75 line-clamp-2 leading-relaxed">
                      {room.shortDescription}
                    </p>

                    {/* Quick Specs */}
                    <div className="my-5 grid grid-cols-2 gap-3 py-3 border-y border-[#E8DEC9]/60 text-xs text-[#292D2A]/80">
                      <div className="flex items-center gap-1.5">
                        <Users className="h-4 w-4 text-[#C5A46D]" />
                        <span>Max {room.maxOccupancy} Guests</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Maximize className="h-4 w-4 text-[#C5A46D]" />
                        <span>{room.sizeSqFt} sq.ft</span>
                      </div>
                      <div className="flex items-center gap-1.5 col-span-2">
                        <Wind className="h-4 w-4 text-[#C5A46D]" />
                        <span className="truncate">{room.bedConfiguration}</span>
                      </div>
                    </div>

                    {/* Amenities Checklist Preview */}
                    <div className="space-y-1.5 mb-6 text-xs text-[#292D2A]/80">
                      {room.amenities.slice(0, 3).map((amenity, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Check className="h-3.5 w-3.5 text-[#234B3C] flex-shrink-0" />
                          <span className="truncate">{amenity}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-auto grid grid-cols-2 gap-2.5 pt-2">
                      <Link
                        href={`/rooms/${room.slug}`}
                        className="rounded-xl border border-[#234B3C]/30 bg-transparent py-2.5 px-3 text-center text-xs sm:text-sm font-semibold text-[#234B3C] hover:bg-[#FAF9F6] transition"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => setSelectedRoomSlug(room.slug)}
                        className="rounded-xl bg-[#234B3C] py-2.5 px-3 text-center text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#1b3b2f] transition flex items-center justify-center gap-1.5"
                      >
                        <Calendar className="h-3.5 w-3.5 text-[#C5A46D]" />
                        <span>Enquire</span>
                      </button>
                    </div>
                  </div>
                </div>
              </MotionWrapper>
            ))}
          </div>

          {/* Bottom View All Link */}
          <div className="mt-12 text-center">
            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 rounded-xl bg-[#234B3C] px-7 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-[#1b3b2f] transition"
            >
              <span>Explore All Rooms & Accommodation Plans</span>
              <ArrowRight className="h-4 w-4 text-[#C5A46D]" />
            </Link>
          </div>
        </div>
      </section>

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

