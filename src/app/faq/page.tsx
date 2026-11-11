"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Phone, MessageSquare, CheckCircle, ShieldCheck } from "lucide-react";
import { FAQS_DATA, FAQ_CATEGORIES, FAQItem } from "@/data/faqs.data";
import { SectionHeader } from "@/components/common/SectionHeader";
import { MotionWrapper } from "@/components/common/MotionWrapper";

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [openId, setOpenId] = useState<string | null>("checkin-checkout");

  const filteredFaqs = FAQS_DATA.filter((item) => {
    if (activeCategory === "All") return true;
    return item.category === activeCategory;
  });

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <main className="min-h-screen bg-[#F8F6F1]">
      {/* Banner */}
      <section className="relative py-20 sm:py-28 bg-[#252525] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/resort/reception_lobby.jpg"
            alt="Apexify Resort Front Desk FAQ"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-[#A78355] font-semibold block mb-3">
            Help & Information
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#F8F6F1]/85 max-w-2xl mx-auto font-light">
            Find clear answers to questions regarding room bookings, swimming pool timings, policies, dining, and event banquet arrangements.
          </p>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-20 sm:py-24 border-b border-[#E8E3DA]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {FAQ_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition ${
                  activeCategory === cat
                    ? "bg-[#A78355] text-white shadow-subtle"
                    : "bg-white text-[#252525] border border-[#E8E3DA] hover:bg-[#F8F6F1]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;

              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl transition-all duration-200 border ${
                    isOpen
                      ? "bg-white border-[#A78355] shadow-subtle"
                      : "bg-white border-[#E8E3DA] hover:border-[#A78355]/40"
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="flex w-full items-center justify-between p-5 sm:p-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3 pr-4">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0 transition-colors ${
                          isOpen ? "bg-[#252525] text-[#A78355]" : "bg-[#F8F6F1] text-[#A78355]"
                        }`}
                      >
                        <HelpCircle className="h-4 w-4" />
                      </div>
                      <span className="font-serif font-bold text-base sm:text-lg text-[#252525]">
                        {faq.question}
                      </span>
                    </div>

                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full bg-[#F8F6F1] text-[#252525] flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 bg-[#A78355] text-white" : ""
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-1 text-sm text-[#77736D] leading-relaxed border-t border-[#E8E3DA] mt-1">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Still Have Questions Card */}
          <div className="mt-16 rounded-3xl bg-white p-8 sm:p-10 border border-[#E8E3DA] shadow-subtle text-center space-y-4">
            <h3 className="font-serif text-2xl font-bold text-[#252525]">
              Have a Question Not Listed Here?
            </h3>
            <p className="text-sm text-[#77736D] max-w-lg mx-auto">
              Our 24-hour reception staff is happy to answer specific queries regarding date availability, wedding packages, or corporate gatherings.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href="tel:+919820000000"
                className="inline-flex items-center gap-2 rounded-xl bg-[#252525] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-subtle hover:bg-[#1A1A1A] transition"
              >
                <Phone className="h-4 w-4 text-[#A78355]" />
                <span>Call Front Desk: +91 98200 00000</span>
              </a>
              <a
                href="https://wa.me/919820000000?text=Hello%20Apexify%20Resort,%20I%20have%20a%20question%20regarding%20my%20stay."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-subtle hover:bg-[#20ba5a] transition"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Ask on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
