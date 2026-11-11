"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, Maximize, Wind, Check, ArrowRight, Calendar, Sparkles } from "lucide-react";
import { ROOMS_DATA } from "@/data/rooms.data";
import { SectionHeader } from "@/components/common/SectionHeader";
import { MotionWrapper } from "@/components/common/MotionWrapper";
import { QuickEnquiryModal } from "@/components/common/QuickEnquiryModal";

export function FeaturedRooms() {
  const [selectedRoomSlug, setSelectedRoomSlug] = useState<string | null>(null);

  return (
    <>
      <section className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#E8E3DA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Accommodations & Suites"
            title="Designed for Restful Comfort"
            subtitle="Choose from our air-conditioned deluxe suites, executive rooms, and value accommodations — all featuring ensuite bathrooms, high-speed Wi-Fi, and access to all resort recreation."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ROOMS_DATA.map((room, index) => (
              <MotionWrapper key={room.id} delay={index * 0.12}>
                <div className="group flex flex-col h-full rounded-2xl bg-white overflow-hidden shadow-subtle hover:shadow-card hover:-translate-y-1.5 hover:border-[#A78355]/40 transition-all duration-300 border border-[#E8E3DA]">
                  {/* Room Cover Image */}
                  <div className="relative h-64 w-full overflow-hidden bg-[#F8F6F1]">
                    <Image
                      src={room.coverImage}
                      alt={room.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Status Badge */}
                    <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5">
                      {room.isVerified ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#252525] px-3 py-1 text-[11px] font-medium text-white shadow-xs">
                          <Sparkles className="h-3 w-3 text-[#A78355]" />
                          Verified Genuine Photo
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-[#252525]/85 px-3 py-1 text-[11px] font-medium text-white shadow-xs">
                          Room Preview
                        </span>
                      )}
                      {room.isPopular && (
                        <span className="inline-flex items-center rounded-full bg-[#A78355] px-3 py-1 text-[11px] font-semibold text-white shadow-xs">
                          Most Popular
                        </span>
                      )}
                    </div>

                    {/* Price Tag Overlay - Solid white card */}
                    <div className="absolute bottom-3.5 right-3.5 rounded-xl bg-white px-3.5 py-1.5 text-right shadow-card border border-[#E8E3DA]">
                      <span className="text-[10px] uppercase font-medium tracking-wider text-[#77736D] block">From</span>
                      <div className="font-serif text-lg font-bold text-[#252525]">
                        ₹{room.basePrice.toLocaleString()}
                        <span className="text-xs font-normal text-[#77736D] font-sans"> / night</span>
                      </div>
                    </div>
                  </div>

                  {/* Room Card Body */}
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#A78355]">
                      {room.categoryName}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#252525] mt-1 group-hover:text-[#A78355] transition">
                      <Link href={`/rooms/${room.slug}`}>{room.name}</Link>
                    </h3>

                    <p className="mt-2 text-sm text-[#77736D] line-clamp-2 leading-relaxed">
                      {room.shortDescription}
                    </p>

                    {/* Quick Specs */}
                    <div className="my-5 grid grid-cols-2 gap-3 py-3 border-y border-[#E8E3DA] text-xs text-[#77736D]">
                      <div className="flex items-center gap-1.5">
                        <Users className="h-4 w-4 text-[#A78355]" />
                        <span>Max {room.maxOccupancy} Guests</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Maximize className="h-4 w-4 text-[#A78355]" />
                        <span>{room.sizeSqFt} sq.ft</span>
                      </div>
                      <div className="flex items-center gap-1.5 col-span-2">
                        <Wind className="h-4 w-4 text-[#A78355]" />
                        <span className="truncate">{room.bedConfiguration}</span>
                      </div>
                    </div>

                    {/* Amenities Checklist Preview */}
                    <div className="space-y-1.5 mb-6 text-xs text-[#77736D]">
                      {room.amenities.slice(0, 3).map((amenity, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Check className="h-3.5 w-3.5 text-[#A78355] flex-shrink-0" />
                          <span className="truncate">{amenity}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-auto grid grid-cols-2 gap-2.5 pt-2">
                      <Link
                        href={`/rooms/${room.slug}`}
                        className="rounded-xl border border-[#E8E3DA] bg-[#F8F6F1] hover:bg-white py-2.5 px-3 text-center text-xs sm:text-sm font-semibold tracking-wide text-[#252525] transition"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => setSelectedRoomSlug(room.slug)}
                        className="rounded-xl bg-[#A78355] hover:bg-[#936F43] py-2.5 px-3 text-center text-xs sm:text-sm font-semibold tracking-wide text-white shadow-subtle hover:shadow-card transition flex items-center justify-center gap-1.5"
                      >
                        <Calendar className="h-3.5 w-3.5 text-white" />
                        <span>Book Now</span>
                      </button>
                    </div>
                  </div>
                </div>
              </MotionWrapper>
            ))}
          </div>

          {/* Bottom View All Link */}
          <div className="mt-14 text-center">
            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 rounded-xl bg-[#252525] hover:bg-[#1A1A1A] px-7 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white shadow-subtle hover:shadow-card transition"
            >
              <span>Explore All Rooms & Suites</span>
              <ArrowRight className="h-4 w-4 text-[#A78355]" />
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
