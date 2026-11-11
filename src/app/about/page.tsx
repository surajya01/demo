import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Waves, Utensils, Users, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { MotionWrapper } from "@/components/common/MotionWrapper";

export const metadata: Metadata = {
  title: "About Us | Apexify Resort, Waliv, Vasai East",
  description: "Discover the story of Apexify Resort in Waliv, Vasai East. Learn about our peaceful grounds, genuine hospitality, swimming pool, dining experience, and event lawn.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F8F6F1]">
      {/* Page Header Banner - Clean architectural photo with solid dark overlay */}
      <section className="relative py-20 sm:py-28 bg-[#252525] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/resort/exterior_facade.jpg"
            alt="Apexify Resort Property Background"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-[#A78355] font-semibold block mb-3">
            Our Story & Heritage
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white">
            About Apexify Resort
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#F8F6F1]/90 max-w-2xl mx-auto font-light">
            A sanctuary of peace, relaxation, and genuine hospitality nestled amidst the green outskirts of Waliv, Vasai East.
          </p>
        </div>
      </section>

      {/* Main Story & Values Section */}
      <section className="py-20 sm:py-28 border-b border-[#E8E3DA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Story Text */}
            <MotionWrapper direction="left">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#A78355] font-semibold block mb-2">
                  Hospitality with Heart
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#252525] leading-snug">
                  Designed for Effortless Escapes and Meaningful Celebrations
                </h2>
                <p className="mt-5 text-base text-[#77736D] leading-relaxed">
                  Established with the vision of offering city dwellers and traveling families a serene, unpretentious retreat, <strong>Apexify Resort</strong> has become a beloved destination for weekend staycations, day picnics, and celebratory events in the Palghar and Mumbai metropolitan region.
                </p>
                <p className="mt-4 text-base text-[#77736D] leading-relaxed">
                  Located near Navjeevan Naka in Waliv, Vasai East, our property combines modern architectural conveniences — including dual passenger elevators and contemporary ensuite bathrooms — with the timeless pleasure of open skies, breezy palm groves, and a sparkling swimming pool.
                </p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-xl bg-white p-5 border border-[#E8E3DA] shadow-subtle">
                    <h4 className="font-serif font-medium text-[#252525] text-base mb-1">Our Mission</h4>
                    <p className="text-xs text-[#77736D] leading-relaxed">
                      To deliver warm, hassle-free hospitality that lets guests recharge, celebrate, and feel completely at home.
                    </p>
                  </div>
                  <div className="rounded-xl bg-white p-5 border border-[#E8E3DA] shadow-subtle">
                    <h4 className="font-serif font-medium text-[#252525] text-base mb-1">Our Promise</h4>
                    <p className="text-xs text-[#77736D] leading-relaxed">
                      Clean air-conditioned accommodations, authentic cuisine, genuine property care, and transparent pricing.
                    </p>
                  </div>
                </div>
              </div>
            </MotionWrapper>

            {/* Collage of Verified Images */}
            <MotionWrapper direction="right">
              <div className="grid grid-cols-2 gap-4 relative">
                <div className="relative h-60 sm:h-72 rounded-2xl overflow-hidden shadow-subtle border border-[#E8E3DA] bg-white">
                  <Image
                    src="/images/resort/reception_lobby.jpg"
                    alt="Apexify Resort Reception Lobby"
                    fill
                    className="object-cover"
                    sizes="300px"
                  />
                </div>
                <div className="relative h-60 sm:h-72 rounded-2xl overflow-hidden shadow-subtle border border-[#E8E3DA] bg-white mt-6">
                  <Image
                    src="/images/resort/swimming_pool_night.jpg"
                    alt="Evening Swimming Pool at Apexify Resort"
                    fill
                    className="object-cover"
                    sizes="300px"
                  />
                </div>
                <div className="relative h-60 sm:h-72 rounded-2xl overflow-hidden shadow-subtle border border-[#E8E3DA] bg-white -mt-6">
                  <Image
                    src="/images/resort/room_deluxe_double.jpg"
                    alt="Deluxe Double Room Interior"
                    fill
                    className="object-cover"
                    sizes="300px"
                  />
                </div>
                <div className="relative h-60 sm:h-72 rounded-2xl overflow-hidden shadow-subtle border border-[#E8E3DA] bg-white">
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
      <section className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#E8E3DA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="The Apexify Distinction"
            title="Why Guests Return to Apexify Resort"
            subtitle="Built upon genuine values of cleanliness, warmth, accessibility, and community."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl bg-[#F8F6F1] p-8 shadow-subtle border border-[#E8E3DA] space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#252525] text-[#A78355]">
                <Waves className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#252525]">
                Recreation in Every Corner
              </h3>
              <p className="text-sm text-[#77736D] leading-relaxed">
                From morning pool dips under swaying palms to evening fairy-lit strolls and lawn celebrations, recreation is woven into the very fabric of our property.
              </p>
            </div>

            <div className="rounded-2xl bg-[#F8F6F1] p-8 shadow-subtle border border-[#E8E3DA] space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#252525] text-[#A78355]">
                <Utensils className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#252525]">
                Homestyle Quality Dining
              </h3>
              <p className="text-sm text-[#77736D] leading-relaxed">
                Our kitchen prides itself on fresh spices, rich gravies, sizzling tikkas, and honest flavors that bring families and friends together around the table.
              </p>
            </div>

            <div className="rounded-2xl bg-[#F8F6F1] p-8 shadow-subtle border border-[#E8E3DA] space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#252525] text-[#A78355]">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#252525]">
                Caring 24/7 Front Desk
              </h3>
              <p className="text-sm text-[#77736D] leading-relaxed">
                Whether arriving late after work or requesting morning tea, our attentive reception staff is available round the clock to ensure peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 bg-[#252525] text-white text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase tracking-widest text-[#A78355] font-semibold block mb-2">
            Plan Your Visit
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-white tracking-tight">
            We Look Forward to Welcoming You
          </h2>
          <p className="mt-3 text-base text-[#F8F6F1]/85 max-w-xl mx-auto">
            Experience our hospitality in person. Inquire about rooms, pool day passes, or banquet lawn dates today.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/rooms"
              className="rounded-xl bg-[#A78355] hover:bg-[#936F43] px-6 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white transition shadow-subtle hover:shadow-card"
            >
              Explore Rooms & Suites
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-[#E8E3DA] bg-transparent px-6 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white hover:bg-white/10 transition"
            >
              Contact Reception
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
