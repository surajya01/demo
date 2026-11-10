"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Calendar, ArrowRight, Tag } from "lucide-react";
import { OFFERS_DATA } from "@/data/offers.data";
import { SectionHeader } from "@/components/common/SectionHeader";
import { MotionWrapper } from "@/components/common/MotionWrapper";
import { QuickEnquiryModal } from "@/components/common/QuickEnquiryModal";

export function SpecialOffersSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="py-20 sm:py-24 bg-[#F4EFE5]/50 border-b border-[#E8DEC9]/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Special Packages & Deals"
            title="Tailored Leisure Packages"
            subtitle="Take advantage of our seasonal staycation deals, day picnic pool passes, and banquet event celebration packages."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {OFFERS_DATA.map((offer, index) => (
              <MotionWrapper key={offer.id} delay={index * 0.15}>
                <div className="flex flex-col h-full rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#E8DEC9]">
                  {/* Image */}
                  <div className="relative h-52 w-full overflow-hidden">
                    <Image
                      src={offer.image}
                      alt={offer.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#C5A46D] px-3 py-1 text-[11px] font-bold text-[#234B3C] shadow-sm">
                        <Tag className="h-3 w-3" />
                        {offer.badge}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[10px] uppercase font-semibold text-[#C5A46D] block">
                        {offer.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-serif text-xl font-bold text-[#234B3C]">
                      {offer.title}
                    </h3>

                    <p className="mt-2 text-xs text-[#292D2A]/75 leading-relaxed">
                      {offer.description}
                    </p>

                    {/* Price banner */}
                    <div className="my-4 rounded-xl bg-[#FAF9F6] p-3 border border-[#E8DEC9] text-xs font-semibold text-[#234B3C]">
                      {offer.priceNote}
                    </div>

                    {/* Inclusions */}
                    <div className="space-y-2 mb-6 flex-grow">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#292D2A]/70 block">
                        Package Inclusions:
                      </span>
                      {offer.inclusions.slice(0, 4).map((inc, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-[#292D2A]/80">
                          <Check className="h-3.5 w-3.5 text-[#234B3C] mt-0.5 flex-shrink-0" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>

                    {/* Sample disclaimer */}
                    <div className="mb-4 text-[10px] text-[#292D2A]/60 italic border-t border-[#E8DEC9]/50 pt-2">
                      * Sample seasonal package for Phase 2 frontend preview. Rates subject to date availability.
                    </div>

                    {/* CTA */}
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="w-full rounded-xl bg-[#234B3C] py-2.5 px-4 text-center text-xs font-semibold text-white shadow-sm hover:bg-[#1b3b2f] transition flex items-center justify-center gap-2"
                    >
                      <Calendar className="h-3.5 w-3.5 text-[#C5A46D]" />
                      <span>Enquire About Package</span>
                    </button>
                  </div>
                </div>
              </MotionWrapper>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/offers"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#234B3C] hover:text-[#C5A46D] transition"
            >
              <span>View full terms & seasonal offer details</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <QuickEnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

