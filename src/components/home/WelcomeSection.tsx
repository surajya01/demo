import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { MotionWrapper } from "@/components/common/MotionWrapper";

export function WelcomeSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#F8F6F1] border-b border-[#E8E3DA] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Story & Narrative */}
          <MotionWrapper direction="left">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A78355] mb-3 block">
                Welcome to Apexify Resort
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-medium tracking-tight text-[#252525] leading-[1.18]">
                Where Natural Tranquility Meets Heartfelt Hospitality
              </h2>

              <p className="mt-6 text-base sm:text-lg text-[#77736D] leading-relaxed">
                Tucked away in the serene greenery of Waliv, Vasai East, Apexify Resort offers a refreshing respite from Mumbai and Thane. Combining modern room comforts with expansive recreational spaces, our property is tailored for leisurely weekend staycations, family celebrations, intimate weddings, and group picnics.
              </p>

              <p className="mt-4 text-base text-[#77736D] leading-relaxed">
                From our sparkling outdoor swimming pool to our multi-cuisine Family Restaurant & Bar and 24-hour dedicated front desk team, every detail is crafted to make your stay effortless, relaxed, and genuinely memorable.
              </p>

              {/* Value Points */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium text-[#252525]">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E8E3DA] text-[#A78355]">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span>24-Hour Reception & Support</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E8E3DA] text-[#A78355]">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span>Year-Round Swimming Pool</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E8E3DA] text-[#A78355]">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span>Multi-Cuisine Restaurant & Bar</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E8E3DA] text-[#A78355]">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span>Dual Passenger Lifts</span>
                </div>
              </div>

              {/* Action Link */}
              <div className="mt-10 flex items-center gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-[#252525] hover:text-[#A78355] transition group"
                >
                  <span>Learn more about Apexify Resort story</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-[#A78355]" />
                </Link>
              </div>
            </div>
          </MotionWrapper>

          {/* Right Column: Imagery Collage (Genuine photos only) */}
          <MotionWrapper direction="right">
            <div className="relative">
              {/* Primary Large Image: Reception Lobby */}
              <div className="relative h-[340px] sm:h-[420px] w-full rounded-2xl overflow-hidden shadow-card border border-[#E8E3DA] bg-white">
                <Image
                  src="/images/resort/reception_lobby.jpg"
                  alt="Apexify Resort Front Desk and Reception Lobby"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute top-4 left-4 rounded-full bg-[#252525] px-3.5 py-1 text-[11px] font-medium text-[#F8F6F1]">
                  Verified Property Reception
                </div>
              </div>

              {/* Secondary Overlapping Image: Corridors & Lifts */}
              <div className="hidden sm:block absolute -bottom-8 -left-8 w-60 h-44 rounded-2xl overflow-hidden shadow-elevated border-4 border-white bg-white">
                <Image
                  src="/images/resort/corridor_lifts.jpg"
                  alt="Apexify Resort Dual Passenger Lifts and Granite Corridor"
                  fill
                  className="object-cover"
                  sizes="240px"
                />
              </div>

              {/* Experience Badge Card */}
              <div className="absolute -bottom-6 -right-4 sm:right-6 rounded-2xl bg-white p-5 shadow-elevated border border-[#E8E3DA] max-w-[210px]">
                <div className="flex items-center gap-2 text-[#A78355] mb-1">
                  <Sparkles className="h-5 w-5 text-[#A78355]" />
                  <span className="font-serif text-2xl font-bold text-[#252525]">100%</span>
                </div>
                <p className="text-xs text-[#77736D] font-normal leading-snug">
                  Genuine property photography & verified guest amenities.
                </p>
              </div>
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
}
