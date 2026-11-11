"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Users, Maximize, Wind, Check, Calendar, Sparkles, Phone, MessageSquare, 
  ChevronRight, ArrowLeft, ShieldCheck, Clock, Eye 
} from "lucide-react";
import { RoomItem } from "@/data/rooms.data";
import { BRAND_CONFIG } from "@/config/brand";
import { Lightbox, LightboxImage } from "@/components/common/Lightbox";
import { QuickEnquiryModal } from "@/components/common/QuickEnquiryModal";

interface RoomDetailsClientProps {
  room: RoomItem;
  relatedRooms: RoomItem[];
}

export function RoomDetailsClient({ room, relatedRooms }: RoomDetailsClientProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  const galleryImages: LightboxImage[] = room.galleryImages.map((src, i) => ({
    src,
    title: `${room.name} — Photo ${i + 1}`,
    caption: `Verified view of ${room.name} at Apexify Resort, Waliv, Vasai East`,
  }));

  return (
    <>
      <main className="min-h-screen bg-[#F8F6F1] pb-24">
        {/* Breadcrumb Bar */}
        <div className="border-b border-[#E8E3DA] bg-white py-3.5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-[#77736D]">
            <Link href="/" className="hover:text-[#252525] transition">Home</Link>
            <ChevronRight className="h-3 w-3 text-[#A78355]" />
            <Link href="/rooms" className="hover:text-[#252525] transition">Rooms</Link>
            <ChevronRight className="h-3 w-3 text-[#A78355]" />
            <span className="font-medium text-[#252525] truncate">{room.name}</span>
          </div>
        </div>

        {/* Hero Gallery Section */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Gallery Column (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Main Featured Photo */}
              <div
                onClick={() => setIsLightboxOpen(true)}
                className="relative h-[360px] sm:h-[460px] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-card border border-[#E8E3DA] cursor-pointer group bg-white"
              >
                <Image
                  src={room.galleryImages[activeImageIndex] || room.coverImage}
                  alt={`${room.name} active photo`}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {room.isVerified ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#252525] px-3.5 py-1 text-xs font-medium text-white shadow-xs">
                      <Sparkles className="h-3.5 w-3.5 text-[#A78355]" />
                      Verified Room Photo
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-[#252525]/85 px-3.5 py-1 text-xs font-medium text-white shadow-xs">
                      Room Preview
                    </span>
                  )}
                </div>

                {/* View Fullscreen Overlay Button */}
                <div className="absolute bottom-4 right-4 rounded-xl bg-[#252525]/90 px-3.5 py-2 text-xs font-medium text-white border border-white/10 flex items-center gap-2 group-hover:bg-[#252525] transition">
                  <Eye className="h-3.5 w-3.5 text-[#A78355]" />
                  <span>Click to Expand Photos ({room.galleryImages.length})</span>
                </div>
              </div>

              {/* Thumbnails Row */}
              {room.galleryImages.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {room.galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative h-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all bg-white ${
                        activeImageIndex === idx
                          ? "border-[#A78355] ring-2 ring-[#A78355]/30"
                          : "border-[#E8E3DA] opacity-75 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${room.name} thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="160px"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Room Narrative Description */}
              <div className="mt-8 pt-6 border-t border-[#E8E3DA] space-y-4">
                <h3 className="font-serif text-2xl font-medium text-[#252525]">
                  About This Accommodation
                </h3>
                {room.longDescription.map((paragraph, idx) => (
                  <p key={idx} className="text-sm sm:text-base text-[#77736D] leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Technical Specifications Table */}
              <div className="mt-8 pt-6 border-t border-[#E8E3DA]">
                <h4 className="font-serif text-xl font-medium text-[#252525] mb-4">
                  Room Specifications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {room.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#E8E3DA] shadow-xs"
                    >
                      <span className="font-medium text-[#77736D]">{feat.label}</span>
                      <span className="font-semibold text-[#252525]">{feat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Full Amenities Checklist */}
              <div className="mt-8 pt-6 border-t border-[#E8E3DA]">
                <h4 className="font-serif text-xl font-medium text-[#252525] mb-4">
                  All Room Amenities & Services
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {room.amenities.map((amenity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#E8E3DA] text-xs text-[#252525] shadow-xs"
                    >
                      <Check className="h-4 w-4 text-[#A78355] flex-shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resort Policies Note */}
              <div className="mt-8 p-5 rounded-2xl bg-white border border-[#E8E3DA] text-xs text-[#77736D] space-y-2 shadow-subtle">
                <span className="font-semibold text-[#252525] uppercase tracking-wider block">
                  Important Stay Guidelines:
                </span>
                <p>• Standard Check-in: 12:00 PM | Standard Check-out: 10:00 AM.</p>
                <p>• Extra Bed charge: ₹500 per guest per night.</p>
                <p>• Strictly non-smoking inside guest suites. Pets are not permitted.</p>
                <p>• Swimming pool access is complimentary for all registered room guests.</p>
              </div>
            </div>

            {/* Right Sticky Booking Card (5 cols) */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 rounded-2xl sm:rounded-3xl bg-white p-6 sm:p-8 shadow-card border border-[#E8E3DA] space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-[#A78355] font-semibold">
                    {room.categoryName}
                  </span>
                  <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#252525] mt-1">
                    {room.name}
                  </h1>
                  <p className="mt-2 text-xs sm:text-sm text-[#77736D]">
                    {room.shortDescription}
                  </p>
                </div>

                {/* Price Display */}
                <div className="p-4 rounded-2xl bg-[#F8F6F1] border border-[#E8E3DA] flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-medium tracking-wider text-[#77736D] block">
                      Standard Direct Rate
                    </span>
                    <div className="font-serif text-3xl font-bold text-[#252525]">
                      ₹{room.basePrice.toLocaleString()}
                      <span className="text-xs font-normal text-[#77736D] font-sans"> / night</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#A78355] font-semibold block">Weekend Rate</span>
                    <span className="font-serif font-bold text-sm text-[#252525]">
                      ₹{room.weekendPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Direct Booking Inclusions */}
                <div className="space-y-2 text-xs text-[#252525]">
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-[#A78355]" />
                    <span>Complimentary Swimming Pool Access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-[#A78355]" />
                    <span>High-Speed Wi-Fi & Private Parking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-[#A78355]" />
                    <span>24-Hour Front Desk Key Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-[#A78355]" />
                    <span>Direct In-Room Dining Delivery</span>
                  </div>
                </div>

                {/* Primary CTA Buttons */}
                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => setIsEnquiryModalOpen(true)}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#A78355] hover:bg-[#936F43] py-3.5 px-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white shadow-subtle hover:shadow-card transition"
                  >
                    <Calendar className="h-4 w-4 text-white" />
                    <span>Check Availability & Enquire</span>
                  </button>

                  <a
                    href={`https://wa.me/919820000000?text=Hello%20Apexify%20Resort,%20I%20am%20inquiring%20about%20booking%20the%20${encodeURIComponent(room.name)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#252525] hover:bg-[#1A1A1A] py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white shadow-subtle transition"
                  >
                    <MessageSquare className="h-4 w-4 text-[#A78355]" />
                    <span>Chat on WhatsApp Directly</span>
                  </a>

                  <a
                    href="tel:+919820000000"
                    className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#E8E3DA] bg-white py-2.5 px-4 text-xs font-semibold text-[#252525] hover:bg-[#F8F6F1] transition"
                  >
                    <Phone className="h-3.5 w-3.5 text-[#A78355]" />
                    <span>Call Reception: +91 98200 00000</span>
                  </a>
                </div>

                <div className="pt-2 text-center text-[11px] text-[#77736D] flex items-center justify-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#A78355]" />
                  <span>Guaranteed Direct Best Rate · No Booking Fees</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Rooms Section */}
        {relatedRooms.length > 0 && (
          <section className="mt-16 border-t border-[#E8E3DA] pt-16 bg-[#FFFFFF]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#A78355] font-semibold">
                    Alternative Options
                  </span>
                  <h3 className="font-serif text-2xl font-medium text-[#252525] mt-0.5">
                    Other Rooms You May Like
                  </h3>
                </div>
                <Link
                  href="/rooms"
                  className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#252525] hover:text-[#A78355] transition"
                >
                  View All Rooms →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedRooms.map((rel) => (
                  <div
                    key={rel.id}
                    className="flex flex-col sm:flex-row rounded-2xl bg-[#F8F6F1] overflow-hidden shadow-subtle hover:shadow-card transition border border-[#E8E3DA]"
                  >
                    <div className="relative h-48 sm:h-auto sm:w-48 flex-shrink-0 bg-white">
                      <Image
                        src={rel.coverImage}
                        alt={rel.name}
                        fill
                        className="object-cover"
                        sizes="200px"
                      />
                    </div>
                    <div className="p-5 flex flex-col justify-between flex-grow">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#A78355] font-bold">
                          {rel.categoryName}
                        </span>
                        <h4 className="font-serif font-medium text-lg text-[#252525] mt-0.5">
                          {rel.name}
                        </h4>
                        <p className="mt-1 text-xs text-[#77736D] line-clamp-2">
                          {rel.shortDescription}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-[#E8E3DA] flex items-center justify-between">
                        <span className="font-serif font-bold text-base text-[#252525]">
                          ₹{rel.basePrice.toLocaleString()}
                          <span className="text-xs font-normal font-sans text-[#77736D]"> / night</span>
                        </span>
                        <Link
                          href={`/rooms/${rel.slug}`}
                          className="rounded-xl bg-[#252525] hover:bg-[#1A1A1A] px-3.5 py-1.5 text-xs font-semibold text-white transition"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Lightbox for Gallery */}
      <Lightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={galleryImages}
        currentIndex={activeImageIndex}
        onNavigate={(newIdx) => setActiveImageIndex(newIdx)}
      />

      {/* Quick Enquiry Modal */}
      <QuickEnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        initialRoomSlug={room.slug}
      />
    </>
  );
}
