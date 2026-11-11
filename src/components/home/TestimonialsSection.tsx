import React from "react";
import { Star, Quote, Info } from "lucide-react";
import { TESTIMONIALS_DATA } from "@/data/testimonials.data";
import { SectionHeader } from "@/components/common/SectionHeader";
import { MotionWrapper } from "@/components/common/MotionWrapper";

export function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#E8E3DA]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Guest Impressions"
          title="Loved by Families & Travelers"
          subtitle="Read reflections from guests who chose Apexify Resort for peaceful weekend staycations, pool outings, and family gatherings in Vasai East."
        />

        {/* Transparency Notice Callout */}
        <div className="max-w-xl mx-auto -mt-6 mb-12 rounded-xl bg-[#F8F6F1] border border-[#E8E3DA] p-3.5 flex items-center gap-2.5 text-xs text-[#77736D]">
          <Info className="h-4 w-4 text-[#A78355] flex-shrink-0" />
          <span>
            <strong className="text-[#252525]">Transparency Notice:</strong> Representative guest feedback collected from visitors across Mumbai and Thane.
          </span>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((item, index) => (
            <MotionWrapper key={item.id} delay={index * 0.12}>
              <div className="flex flex-col h-full rounded-2xl bg-[#F8F6F1] p-7 sm:p-8 shadow-subtle hover:shadow-card transition-shadow border border-[#E8E3DA] relative">
                <Quote className="h-7 w-7 text-[#A78355]/40 mb-3" />

                {/* Star rating */}
                <div className="flex items-center gap-1 text-[#A78355] mb-4">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[#A78355]" />
                  ))}
                </div>

                {/* Comment quote */}
                <p className="text-sm text-[#77736D] leading-relaxed italic flex-grow">
                  “{item.comment}”
                </p>

                {/* Author Info */}
                <div className="mt-6 pt-4 border-t border-[#E8E3DA]">
                  <div className="font-serif font-medium text-base text-[#252525]">
                    {item.guestName}
                  </div>
                  <div className="text-xs text-[#77736D] flex items-center justify-between mt-0.5">
                    <span>{item.location}</span>
                    <span className="text-[#A78355] font-semibold">{item.roomType}</span>
                  </div>
                </div>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
