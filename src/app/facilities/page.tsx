"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Clock, Sparkles, Calendar, Phone, MessageSquare } from "lucide-react";
import { FACILITIES_DATA } from "@/data/facilities.data";
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
      <main className="min-h-screen bg-[#F8F6F1]">
        {/* Banner - Solid dark tint, no gradients */}
        <section className="relative py-20 sm:py-28 bg-[#252525] text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/resort/swimming_pool.jpg"
              alt="Apexify Resort Facilities Banner"
              fill
              className="object-cover opacity-30"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-[#A78355] font-semibold block mb-3">
              Recreation & Hospitality
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white">
              Facilities & Experiences
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#F8F6F1]/90 max-w-2xl mx-auto font-light">
              Explore our outdoor swimming pool, banquet lawns, multi-cuisine restaurant, and 24-hour amenities crafted for seamless comfort in Vasai East.
            </p>
          </div>
        </section>

        {/* Facilities Section by Section */}
        <section className="py-20 sm:py-28 border-b border-[#E8E3DA]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-24">
            {FACILITIES_DATA.map((facility, index) => {
              const isEven = index % 2 === 1;

              return (
                <div
                  key={facility.id}
                  id={facility.id}
                  className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
                >
                  {/* Photo Column */}
                  <MotionWrapper
                    direction={isEven ? "right" : "left"}
                    className={`lg:col-span-6 ${isEven ? "lg:order-2" : ""}`}
                  >
                    <div
                      onClick={() => setLightboxIndex(index)}
                      className="relative h-80 sm:h-96 w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-card border border-[#E8E3DA] cursor-pointer group bg-white"
                    >
                      <Image
                        src={facility.image}
                        alt={facility.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />

                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#252525] px-3.5 py-1 text-xs font-medium text-white shadow-xs">
                          <Sparkles className="h-3.5 w-3.5 text-[#A78355]" />
                          Verified Facility
                        </span>
                      </div>

                      {facility.timings && (
                        <div className="absolute bottom-4 left-4 rounded-xl bg-[#252525]/90 px-3.5 py-1.5 text-xs text-white border border-white/10 flex items-center gap-1.5 shadow-xs">
                          <Clock className="h-3.5 w-3.5 text-[#A78355]" />
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
                      <span className="text-xs uppercase tracking-[0.2em] text-[#A78355] font-semibold">
                        {facility.category}
                      </span>
                      <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#252525]">
                        {facility.title}
                      </h2>
                      <p className="text-base text-[#77736D] leading-relaxed">
                        {facility.description}
                      </p>

                      <div className="pt-2 space-y-2 text-xs sm:text-sm text-[#252525]">
                        {facility.keyHighlights.map((highlight, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2.5">
                            <Check className="h-4 w-4 text-[#A78355] mt-0.5 flex-shrink-0" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 flex flex-wrap items-center gap-3">
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="rounded-xl bg-[#A78355] hover:bg-[#936F43] px-5 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white shadow-subtle hover:shadow-card transition flex items-center gap-2"
                        >
                          <Calendar className="h-4 w-4 text-white" />
                          <span>Enquire About {facility.title.split(" ")[0]}</span>
                        </button>

                        <a
                          href="https://wa.me/919820000000?text=Hello%20Apexify%20Resort,%20I%20would%20like%20to%20enquire%20about%20your%20facilities."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-xl border border-[#E8E3DA] bg-white px-4 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#252525] hover:bg-[#F8F6F1] transition flex items-center gap-2 shadow-subtle"
                        >
                          <MessageSquare className="h-4 w-4 text-[#A78355]" />
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
