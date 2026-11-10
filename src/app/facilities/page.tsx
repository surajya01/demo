"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Clock, Sparkles, Waves, Utensils, Calendar, ShieldCheck, Phone, MessageSquare } from "lucide-react";
import { FACILITIES_DATA, FacilityItem } from "@/data/facilities.data";
import { SectionHeader } from "@/components/common/SectionHeader";
import { MotionWrapper } from "@/components/common/MotionWrapper";
import { Lightbox, LightboxImage } from "@/components/common/Lightbox";
import { QuickEnquiryModal } from "@/components/common/QuickEnquiryModal";

export default function FacilitiesPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const lightboxImages: LightboxImage[] = FACILITIES_DATA.map((fac) => ({
    src: fac.image,
    title: fac.title,
    caption: fac.summary,
    category: fac.category,
  }));

  return (
    <>
      <main className="min-h-screen bg-[#FAF9F6]">
        {/* Banner */}
        <section className="relative py-20 sm:py-28 bg-[#234B3C] text-white overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-25">
            <Image
              src="/images/resort/swimming_pool.jpg"
              alt="Dhuri Resort Facilities Banner"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A46D] font-semibold block mb-3">
              Recreation & Hospitality
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Facilities & Experiences
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#F4EFE5]/85 max-w-2xl mx-auto font-light">
              Explore our outdoor swimming pool, banquet lawns, multi-cuisine restaurant, and 24-hour amenities crafted for seamless comfort in Vasai East.
            </p>
          </div>
        </section>

        {/* Facilities Section by Section */}
        <section className="py-20 sm:py-24 border-b border-[#E8DEC9]/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">
            {FACILITIES_DATA.map((facility, index) => {
              const isEven = index % 2 === 1;

              return (
                <div
                  key={facility.id}
                  id={facility.id}
                  className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
                >
                  {/* Photo Column */}
                  <MotionWrapper
                    direction={isEven ? "right" : "left"}
                    className={`lg:col-span-6 ${isEven ? "lg:order-2" : ""}`}
                  >
                    <div
                      onClick={() => setLightboxIndex(index)}
                      className="relative h-80 sm:h-96 w-full rounded-3xl overflow-hidden shadow-xl border border-[#C5A46D]/20 cursor-pointer group bg-slate-100"
                    >
                      <Image
                        src={facility.image}
                        alt={facility.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#234B3C]/90 px-3.5 py-1 text-xs font-semibold text-[#F4EFE5] backdrop-blur-sm">
                          <Sparkles className="h-3.5 w-3.5 text-[#C5A46D]" />
                          Verified Property Facility
                        </span>
                      </div>

                      {facility.timings && (
                        <div className="absolute bottom-4 left-4 rounded-xl bg-black/60 px-3 py-1.5 text-xs text-white backdrop-blur-md border border-white/20 flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-[#C5A46D]" />
                          <span>{facility.timings}</span>
                        </div>
                      )}
                    </div>
                  </MotionWrapper>

                  {/* Text Column */}
                  <MotionWrapper
                    direction={isEven ? "left" : "right"}
                    className={`lg:col-span-6 ${isEven ? "lg:order-1" : ""}`}
                  >
                    <div className="space-y-4">
                      <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-bold">
                        {facility.category}
                      </span>
                      <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#234B3C]">
                        {facility.title}
                      </h2>
                      <p className="text-base text-[#292D2A]/80 leading-relaxed">
                        {facility.description}
                      </p>

                      <div className="pt-2 space-y-2 text-xs sm:text-sm text-[#292D2A]/85">
                        {facility.keyHighlights.map((highlight, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2.5">
                            <Check className="h-4 w-4 text-[#234B3C] mt-0.5 flex-shrink-0" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 flex flex-wrap items-center gap-3">
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="rounded-xl bg-[#234B3C] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#1b3b2f] transition flex items-center gap-2"
                        >
                          <Calendar className="h-4 w-4 text-[#C5A46D]" />
                          <span>Enquire About {facility.title.split(" ")[0]}</span>
                        </button>

                        <a
                          href="https://wa.me/919820000000?text=Hello%20Dhuri%20Resort,%20I%20would%20like%20to%20enquire%20about%20your%20facilities."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-xl border border-[#234B3C]/30 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#234B3C] hover:bg-[#FAF9F6] transition flex items-center gap-2"
                        >
                          <MessageSquare className="h-4 w-4 text-[#25D366]" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </MotionWrapper>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          isOpen={lightboxIndex !== null}
          onClose={() => setLightboxIndex(null)}
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        />
      )}

      {/* Quick Enquiry Modal */}
      <QuickEnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

