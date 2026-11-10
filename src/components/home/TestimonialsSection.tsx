import React from "react";
import { Star, Quote, Info } from "lucide-react";
import { TESTIMONIALS_DATA } from "@/data/testimonials.data";
import { SectionHeader } from "@/components/common/SectionHeader";
import { MotionWrapper } from "@/components/common/MotionWrapper";

export function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-24 bg-[#FAF9F6] border-b border-[#E8DEC9]/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Guest Impressions"
          title="Loved by Families & Travelers"
          subtitle="Read reflections from guests who chose Apexify Resort for peaceful weekend staycations, pool outings, and family gatherings in Vasai East."
        />

        {/* Clear Sample Disclaimer Callout */}
        <div className="max-w-xl mx-auto -mt-6 mb-12 rounded-xl bg-[#F4EFE5] border border-[#C5A46D]/30 p-3 flex items-center gap-2.5 text-xs text-[#292D2A]/80">
          <Info className="h-4 w-4 text-[#C5A46D] flex-shrink-0" />
          <span>
            <strong>Transparency Notice:</strong> Testimonials below represent clearly identified sample guest feedback for this Phase 2 frontend preview.
          </span>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((item, index) => (
            <MotionWrapper key={item.id} delay={index * 0.15}>
              <div className="flex flex-col h-full rounded-2xl bg-white p-7 shadow-sm hover:shadow-md transition-shadow border border-[#E8DEC9] relative">
                <Quote className="h-8 w-8 text-[#C5A46D]/30 mb-3" />

                {/* Star rating */}
                <div className="flex items-center gap-1 text-[#C5A46D] mb-4">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#C5A46D]" />
                  ))}
                </div>

                {/* Comment quote */}
                <p className="text-sm text-[#292D2A]/80 leading-relaxed italic flex-grow">
                  “{item.comment}”
                </p>

                {/* Author Info */}
                <div className="mt-6 pt-4 border-t border-[#E8DEC9]/60">
                  <div className="font-serif font-bold text-base text-[#234B3C]">
                    {item.guestName}
                  </div>
                  <div className="text-xs text-[#292D2A]/60 flex items-center justify-between mt-0.5">
                    <span>{item.location}</span>
                    <span className="text-[#C5A46D] font-medium">{item.roomType}</span>
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

