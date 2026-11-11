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
      <section className="py-20 sm:py-28 bg-[#F8F6F1] border-b border-[#E8E3DA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Special Packages & Deals"
            title="Tailored Leisure Packages"
            subtitle="Take advantage of our seasonal staycation deals, day picnic pool passes, and banquet event celebration packages."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {OFFERS_DATA.map((offer, index) => (
              <MotionWrapper key={offer.id} delay={index * 0.12}>
                <div className="group flex flex-col h-full rounded-2xl bg-white overflow-hidden shadow-subtle hover:shadow-card hover:-translate-y-1.5 hover:border-[#A78355]/40 transition-all duration-300 border border-[#E8E3DA]">
                  {/* Image - NO gradient overlay */}
                  <div className="relative h-56 w-full overflow-hidden bg-[#F8F6F1]">
                    <Image
                      src={offer.image}
                      alt={offer.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-3.5 left-3.5">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#A78355] px-3.5 py-1 text-[11px] font-semibold text-white shadow-xs">
                        <Tag className="h-3 w-3" />
                        {offer.badge}
                      </span>
                    </div>
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 rounded-xl bg-[#252525]/90 px-3 py-1.5 text-white">
                      <span className="text-[10px] uppercase tracking-wider font-medium text-[#A78355] block">
                        {offer.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-serif text-xl font-medium text-[#252525]">
                      {offer.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-[#77736D] leading-relaxed">
                      {offer.description}
                    </p>

                    {/* Price banner */}
                    <div className="my-4 rounded-xl bg-[#F8F6F1] p-3 border border-[#E8E3DA] text-xs font-semibold text-[#252525]">
                      {offer.priceNote}
                    </div>

                    {/* Inclusions */}
                    <div className="space-y-2 mb-6 flex-grow">
                      <span className="text-[11px] font-medium uppercase tracking-wider text-[#77736D] block">
                        Package Inclusions:
                      </span>
                      {offer.inclusions.slice(0, 4).map((inc, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-[#252525]">
                          <Check className="h-3.5 w-3.5 text-[#A78355] mt-0.5 flex-shrink-0" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>

                    {/* Sample disclaimer */}
                    <div className="mb-4 text-[11px] text-[#77736D] italic border-t border-[#E8E3DA] pt-3">
                      * Sample seasonal package preview. Rates subject to date availability.
                    </div>

                    {/* CTA */}
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="w-full rounded-xl bg-[#A78355] hover:bg-[#936F43] py-2.5 px-4 text-center text-xs font-semibold uppercase tracking-wider text-white shadow-subtle hover:shadow-card transition flex items-center justify-center gap-2"
                    >
                      <Calendar className="h-3.5 w-3.5 text-white" />
                      <span>Enquire About Package</span>
                    </button>
                  </div>
                </div>
              </MotionWrapper>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/offers"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#252525] hover:text-[#A78355] transition"
            >
              <span>View full terms & seasonal offer details</span>
              <ArrowRight className="h-4 w-4 text-[#A78355]" />
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
