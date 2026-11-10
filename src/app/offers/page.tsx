"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Tag, Check, Calendar, Phone, MessageSquare, AlertCircle, Sparkles } from "lucide-react";
import { OFFERS_DATA } from "@/data/offers.data";
import { SectionHeader } from "@/components/common/SectionHeader";
import { MotionWrapper } from "@/components/common/MotionWrapper";
import { QuickEnquiryModal } from "@/components/common/QuickEnquiryModal";

export default function OffersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <main className="min-h-screen bg-[#FAF9F6]">
        {/* Banner */}
        <section className="relative py-20 sm:py-28 bg-[#234B3C] text-white overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-25">
            <Image
              src="/images/resort/swimming_pool_night.jpg"
              alt="Dhuri Resort Offers Header"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A46D] font-semibold block mb-3">
              Promotions & Getaway Deals
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Special Offers & Packages
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#F4EFE5]/85 max-w-2xl mx-auto font-light">
              Make the most of your stay with tailored packages for weekend staycations, day pool picnics, and grand banquet milestones.
            </p>
          </div>
        </section>

        {/* Offers Grid */}
        <section className="py-20 sm:py-24 border-b border-[#E8DEC9]/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Transparency Note */}
            <div className="max-w-2xl mx-auto mb-14 rounded-2xl bg-[#F4EFE5] border border-[#C5A46D]/40 p-4 flex items-start gap-3 text-xs text-[#292D2A]/80">
              <AlertCircle className="h-4 w-4 text-[#C5A46D] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#234B3C]">Phase 2 Preview Notice:</strong> Packages shown below reflect representative sample offers designed for frontend demonstration. Final rates, seasonal discounts, and festival availability can be confirmed directly with resort management via WhatsApp or telephone.
              </div>
            </div>

            <div className="space-y-16">
              {OFFERS_DATA.map((offer, index) => {
                const isEven = index % 2 === 1;

                return (
                  <MotionWrapper key={offer.id} delay={index * 0.1}>
                    <div className="rounded-3xl bg-white border border-[#E8DEC9] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12">
                      {/* Image container */}
                      <div className={`relative h-72 sm:h-96 lg:h-auto lg:col-span-5 ${isEven ? "lg:order-2" : ""}`}>
                        <Image
                          src={offer.image}
                          alt={offer.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 40vw"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#C5A46D] px-3.5 py-1 text-xs font-bold text-[#234B3C] shadow-md">
                            <Tag className="h-3.5 w-3.5" />
                            {offer.badge}
                          </span>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-black/60 p-3 text-white backdrop-blur-md border border-white/10 text-xs">
                          <span className="text-[#C5A46D] font-semibold block">Validity:</span>
                          <span>{offer.validity}</span>
                        </div>
                      </div>

                      {/* Content Container */}
                      <div className={`p-6 sm:p-8 lg:p-10 lg:col-span-7 flex flex-col justify-between ${isEven ? "lg:order-1" : ""}`}>
                        <div>
                          <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold">
                            {offer.subtitle}
                          </span>
                          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#234B3C] mt-1">
                            {offer.title}
                          </h2>

                          <p className="mt-3 text-sm text-[#292D2A]/80 leading-relaxed">
                            {offer.description}
                          </p>

                          <div className="my-5 p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8DEC9] text-sm font-semibold text-[#234B3C] flex items-center justify-between">
                            <span>{offer.priceNote}</span>
                            <span className="text-xs font-normal text-[#292D2A]/60">Subject to date</span>
                          </div>

                          {/* Inclusions */}
                          <div className="mb-6">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#292D2A]/70 block mb-2.5">
                              Package Inclusions:
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#292D2A]/85">
                              {offer.inclusions.map((inc, i) => (
                                <div key={i} className="flex items-start gap-2">
                                  <Check className="h-3.5 w-3.5 text-[#234B3C] mt-0.5 flex-shrink-0" />
                                  <span>{inc}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Terms */}
                          <div className="text-[11px] text-[#292D2A]/65 space-y-1 border-t border-[#E8DEC9] pt-3">
                            <span className="font-semibold text-[#292D2A]/80">Key Terms:</span>
                            {offer.terms.map((t, idx) => (
                              <p key={idx}>• {t}</p>
                            ))}
                          </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="mt-8 pt-5 border-t border-[#E8DEC9] flex flex-wrap items-center gap-3">
                          <button
                            onClick={() => setIsModalOpen(true)}
                            className="rounded-xl bg-[#234B3C] px-6 py-3 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#1b3b2f] transition flex items-center gap-2"
                          >
                            <Calendar className="h-4 w-4 text-[#C5A46D]" />
                            <span>Enquire for Dates</span>
                          </button>
                          <a
                            href={`https://wa.me/919820000000?text=Hello%20Dhuri%20Resort,%20I%20would%20like%20to%20enquire%20about%20the%20${encodeURIComponent(offer.title)}.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-xl bg-[#25D366] px-5 py-3 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#20ba5a] transition flex items-center gap-2"
                          >
                            <MessageSquare className="h-4 w-4" />
                            <span>WhatsApp Enquiry</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </MotionWrapper>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <QuickEnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

