"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Tag, Check, Calendar, MessageSquare, AlertCircle } from "lucide-react";
import { OFFERS_DATA } from "@/data/offers.data";
import { MotionWrapper } from "@/components/common/MotionWrapper";
import { QuickEnquiryModal } from "@/components/common/QuickEnquiryModal";

export default function OffersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <main className="min-h-screen bg-[#F8F6F1]">
        {/* Banner - Solid dark tint, no gradients */}
        <section className="relative py-20 sm:py-28 bg-[#252525] text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/resort/swimming_pool_night.jpg"
              alt="Apexify Resort Offers Header"
              fill
              className="object-cover opacity-30"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-[#A78355] font-semibold block mb-3">
              Promotions & Getaway Deals
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white">
              Special Offers & Packages
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#F8F6F1]/90 max-w-2xl mx-auto font-light">
              Make the most of your stay with tailored packages for weekend staycations, day pool picnics, and grand banquet milestones.
            </p>
          </div>
        </section>

        {/* Offers Grid */}
        <section className="py-20 sm:py-28 border-b border-[#E8E3DA]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Transparency Note */}
            <div className="max-w-2xl mx-auto mb-14 rounded-2xl bg-white border border-[#E8E3DA] p-4 flex items-start gap-3 text-xs text-[#77736D] shadow-subtle">
              <AlertCircle className="h-4 w-4 text-[#A78355] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#252525]">Direct Booking Notice:</strong> Packages shown below reflect current seasonal offers. Final rates, festival dates, and custom group requirements can be confirmed directly with resort management via WhatsApp or telephone.
              </div>
            </div>

            <div className="space-y-16">
              {OFFERS_DATA.map((offer, index) => {
                const isEven = index % 2 === 1;

                return (
                  <MotionWrapper key={offer.id} delay={index * 0.1}>
                    <div className="rounded-3xl bg-white border border-[#E8E3DA] overflow-hidden shadow-subtle hover:shadow-card transition-all duration-300 grid grid-cols-1 lg:grid-cols-12">
                      {/* Image container */}
                      <div className={`relative h-72 sm:h-96 lg:h-auto lg:col-span-5 bg-[#F8F6F1] ${isEven ? "lg:order-2" : ""}`}>
                        <Image
                          src={offer.image}
                          alt={offer.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 40vw"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#A78355] px-3.5 py-1 text-xs font-semibold text-white shadow-xs">
                            <Tag className="h-3.5 w-3.5" />
                            {offer.badge}
                          </span>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-[#252525]/90 p-3 text-white border border-white/10 text-xs shadow-xs">
                          <span className="text-[#A78355] font-semibold block">Validity:</span>
                          <span>{offer.validity}</span>
                        </div>
                      </div>

                      {/* Content Container */}
                      <div className={`p-6 sm:p-8 lg:p-10 lg:col-span-7 flex flex-col justify-between ${isEven ? "lg:order-1" : ""}`}>
                        <div>
                          <span className="text-xs uppercase tracking-[0.2em] text-[#A78355] font-semibold">
                            {offer.subtitle}
                          </span>
                          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#252525] mt-1">
                            {offer.title}
                          </h2>

                          <p className="mt-3 text-sm text-[#77736D] leading-relaxed">
                            {offer.description}
                          </p>

                          <div className="my-5 p-4 rounded-2xl bg-[#F8F6F1] border border-[#E8E3DA] text-sm font-semibold text-[#252525] flex items-center justify-between">
                            <span>{offer.priceNote}</span>
                            <span className="text-xs font-normal text-[#77736D]">Subject to dates</span>
                          </div>

                          {/* Inclusions */}
                          <div className="mb-6">
                            <span className="text-xs font-medium uppercase tracking-wider text-[#77736D] block mb-2.5">
                              Package Inclusions:
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#252525]">
                              {offer.inclusions.map((inc, i) => (
                                <div key={i} className="flex items-start gap-2">
                                  <Check className="h-3.5 w-3.5 text-[#A78355] mt-0.5 flex-shrink-0" />
                                  <span>{inc}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Terms */}
                          <div className="text-[11px] text-[#77736D] space-y-1 border-t border-[#E8E3DA] pt-3">
                            <span className="font-semibold text-[#252525]">Key Terms:</span>
                            {offer.terms.map((t, idx) => (
                              <p key={idx}>• {t}</p>
                            ))}
                          </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="mt-8 pt-5 border-t border-[#E8E3DA] flex flex-wrap items-center gap-3">
                          <button
                            onClick={() => setIsModalOpen(true)}
                            className="rounded-xl bg-[#A78355] hover:bg-[#936F43] px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white shadow-subtle hover:shadow-card transition flex items-center gap-2"
                          >
                            <Calendar className="h-4 w-4 text-white" />
                            <span>Enquire for Dates</span>
                          </button>
                          <a
                            href={`https://wa.me/919820000000?text=Hello%20Apexify%20Resort,%20I%20would%20like%20to%20enquire%20about%20the%20${encodeURIComponent(offer.title)}.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-xl bg-[#252525] hover:bg-[#1A1A1A] px-5 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white shadow-subtle transition flex items-center gap-2"
                          >
                            <MessageSquare className="h-4 w-4 text-[#A78355]" />
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
