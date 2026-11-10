import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck, HeartHandshake, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { MotionWrapper } from "@/components/common/MotionWrapper";

export function WelcomeSection() {
  return (
    <section className="py-20 sm:py-24 bg-[#FAF9F6] border-b border-[#E8DEC9]/50 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Story & Narrative */}
          <MotionWrapper direction="left">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A46D] mb-3 block">
                Welcome to Dhuri Resort
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#234B3C] leading-[1.15]">
                Where Natural Tranquility Meets Heartfelt Hospitality
              </h2>

              <p className="mt-6 text-base sm:text-lg text-[#292D2A]/80 leading-relaxed">
                Tucked away in the serene greenery of Waliv, Vasai East, Dhuri Resort offers a refreshing respite from Mumbai and Thane. Combining modern room comforts with expansive recreational spaces, our property is tailored for leisurely weekend staycations, family celebrations, intimate weddings, and group picnics.
              </p>

              <p className="mt-4 text-base text-[#292D2A]/75 leading-relaxed">
                From our sparkling outdoor swimming pool to our multi-cuisine Family Restaurant & Bar and 24-hour dedicated front desk team, every detail is crafted to make your stay effortless, relaxed, and genuinely memorable.
              </p>

              {/* Value Points */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium text-[#234B3C]">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#234B3C]/10 text-[#234B3C]">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span>24-Hour Reception & Key Support</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#234B3C]/10 text-[#234B3C]">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span>Year-Round Outdoor Swimming Pool</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#234B3C]/10 text-[#234B3C]">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span>Multi-Cuisine Restaurant & Full Bar</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#234B3C]/10 text-[#234B3C]">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span>Dual Passenger Lifts & Accessibility</span>
                </div>
              </div>

              {/* Action Link */}
              <div className="mt-10 flex items-center gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#234B3C] hover:text-[#C5A46D] transition group"
                >
                  <span>Learn more about Dhuri Resort story</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </MotionWrapper>

          {/* Right Column: Imagery Collage (Genuine photos only) */}
          <MotionWrapper direction="right">
            <div className="relative">
              {/* Primary Large Image: Reception Lobby with Official Logo */}
              <div className="relative h-[340px] sm:h-[420px] w-full rounded-2xl overflow-hidden shadow-xl border border-[#C5A46D]/20">
                <Image
                  src="/images/resort/reception_lobby.jpg"
                  alt="Dhuri Resort Front Desk and Reception Lobby with Official Wall Logo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute top-4 left-4 rounded-full bg-[#234B3C]/90 px-3.5 py-1 text-[11px] font-semibold text-[#F4EFE5] backdrop-blur-sm">
                  Verified Property Reception
                </div>
              </div>

              {/* Secondary Overlapping Image: Modern Bathroom & Corridors */}
              <div className="hidden sm:block absolute -bottom-10 -left-8 w-60 h-44 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/images/resort/corridor_lifts.jpg"
                  alt="Dhuri Resort Dual Passenger Lifts and Granite Corridor"
                  fill
                  className="object-cover"
                  sizes="240px"
                />
              </div>

              {/* Experience Badge Card */}
              <div className="absolute -bottom-6 -right-4 sm:right-6 rounded-2xl bg-white p-5 shadow-xl border border-[#C5A46D]/30 max-w-[200px]">
                <div className="flex items-center gap-2 text-[#C5A46D] mb-1">
                  <Sparkles className="h-5 w-5 fill-[#C5A46D]" />
                  <span className="font-serif text-2xl font-bold text-[#234B3C]">100%</span>
                </div>
                <p className="text-xs text-[#292D2A]/80 font-medium">
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

