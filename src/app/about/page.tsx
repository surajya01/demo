import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, ShieldCheck, Heart, Sparkles, MapPin, Phone, ArrowRight, Waves, Utensils, Users } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { MotionWrapper } from "@/components/common/MotionWrapper";

export const metadata: Metadata = {
  title: "About Us | Dhuri Resort, Waliv, Vasai East",
  description: "Discover the story of Dhuri Resort in Waliv, Vasai East. Learn about our peaceful grounds, genuine hospitality, swimming pool, dining experience, and event lawn.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      {/* Page Header Banner */}
      <section className="relative py-20 sm:py-28 bg-[#234B3C] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-25">
          <Image
            src="/images/resort/exterior_facade.jpg"
            alt="Dhuri Resort Property Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C5A46D] font-semibold block mb-3">
            Our Story & Heritage
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            About Dhuri Resort
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#F4EFE5]/85 max-w-2xl mx-auto font-light">
            A sanctuary of peace, relaxation, and genuine hospitality nestled amidst the green outskirts of Waliv, Vasai East.
          </p>
        </div>
      </section>

      {/* Main Story & Values Section */}
      <section className="py-20 sm:py-24 border-b border-[#E8DEC9]/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Story Text */}
            <MotionWrapper direction="left">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold block mb-2">
                  Hospitality with Heart
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#234B3C] leading-snug">
                  Designed for Effortless Escapes and Meaningful Celebrations
                </h2>
                <p className="mt-5 text-base text-[#292D2A]/80 leading-relaxed">
                  Established with the vision of offering city dwellers and traveling families a serene, unpretentious retreat, <strong>Dhuri Resort</strong> has become a beloved destination for weekend staycations, day picnics, and celebratory events in the Palghar and Mumbai metropolitan region.
                </p>
                <p className="mt-4 text-base text-[#292D2A]/80 leading-relaxed">
                  Located near Navjeevan Naka in Waliv, Vasai East, our property combines modern architectural conveniences — including dual passenger elevators and contemporary ensuite bathrooms — with the timeless pleasure of open skies, breezy palm groves, and a sparkling swimming pool.
                </p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-xl bg-[#F4EFE5] p-4 border border-[#C5A46D]/30">
                    <h4 className="font-serif font-bold text-[#234B3C] text-base mb-1">Our Mission</h4>
                    <p className="text-xs text-[#292D2A]/75 leading-relaxed">
                      To deliver warm, hassle-free hospitality that lets guests recharge, celebrate, and feel completely at home.
                    </p>
                  </div>
                  <div className="rounded-xl bg-[#F4EFE5] p-4 border border-[#C5A46D]/30">
                    <h4 className="font-serif font-bold text-[#234B3C] text-base mb-1">Our Promise</h4>
                    <p className="text-xs text-[#292D2A]/75 leading-relaxed">
                      Clean air-conditioned accommodations, authentic cuisine, genuine property care, and transparent pricing.
                    </p>
                  </div>
                </div>
              </div>
            </MotionWrapper>

            {/* Collage of Verified Images */}
            <MotionWrapper direction="right">
              <div className="grid grid-cols-2 gap-4 relative">
                <div className="relative h-60 sm:h-72 rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src="/images/resort/reception_lobby.jpg"
                    alt="Dhuri Resort Reception Lobby"
                    fill
                    className="object-cover"
                    sizes="300px"
                  />
                </div>
                <div className="relative h-60 sm:h-72 rounded-2xl overflow-hidden shadow-md mt-6">
                  <Image
                    src="/images/resort/swimming_pool_night.jpg"
                    alt="Evening Swimming Pool at Dhuri Resort"
                    fill
                    className="object-cover"
                    sizes="300px"
                  />
                </div>
                <div className="relative h-60 sm:h-72 rounded-2xl overflow-hidden shadow-md -mt-6">
                  <Image
                    src="/images/resort/room_deluxe_double.jpg"
                    alt="Deluxe Double Room Interior"
                    fill
                    className="object-cover"
                    sizes="300px"
                  />
                </div>
                <div className="relative h-60 sm:h-72 rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src="/images/resort/banquet_lawn.jpg"
                    alt="Banquet Party Lawn"
                    fill
                    className="object-cover"
                    sizes="300px"
                  />
                </div>
              </div>
            </MotionWrapper>
          </div>
        </div>
      </section>

      {/* Core Hospitality Pillars */}
      <section className="py-20 sm:py-24 bg-[#F4EFE5]/40 border-b border-[#E8DEC9]/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="The Dhuri Distinction"
            title="Why Guests Return to Dhuri Resort"
            subtitle="Built upon genuine values of cleanliness, warmth, accessibility, and community."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl bg-white p-8 shadow-sm border border-[#E8DEC9] space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#234B3C] text-[#C5A46D]">
                <Waves className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#234B3C]">
                Recreation in Every Corner
              </h3>
              <p className="text-sm text-[#292D2A]/75 leading-relaxed">
                From morning pool dips under swaying palms to evening fairy-lit strolls and lawn celebrations, recreation is woven into the very fabric of our property.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-sm border border-[#E8DEC9] space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#234B3C] text-[#C5A46D]">
                <Utensils className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#234B3C]">
                Homestyle Quality Dining
              </h3>
              <p className="text-sm text-[#292D2A]/75 leading-relaxed">
                Our kitchen prides itself on fresh spices, rich gravies, sizzling tikkas, and honest flavors that bring families and friends together around the table.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-sm border border-[#E8DEC9] space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#234B3C] text-[#C5A46D]">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#234B3C]">
                Caring 24/7 Front Desk
              </h3>
              <p className="text-sm text-[#292D2A]/75 leading-relaxed">
                Whether arriving late after work or requesting morning tea, our attentive reception staff is available round the clock to ensure peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 bg-[#234B3C] text-white text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold block mb-2">
            Plan Your Visit
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
            We Look Forward to Welcoming You
          </h2>
          <p className="mt-3 text-base text-[#F4EFE5]/85 max-w-xl mx-auto">
            Experience our hospitality in person. Inquire about rooms, pool day passes, or banquet lawn dates today.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/rooms"
              className="rounded-xl bg-[#C5A46D] px-6 py-3 text-sm font-semibold text-[#292D2A] hover:bg-[#d6b986] transition shadow-md"
            >
              Explore Rooms & Suites
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-white/30 bg-transparent px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
            >
              Contact Reception
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

