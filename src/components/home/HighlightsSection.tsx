import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Waves, Utensils, Sparkles, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { MotionWrapper } from "@/components/common/MotionWrapper";

const HIGHLIGHTS = [
  {
    title: "Crystal Outdoor Swimming Pool",
    eyebrow: "Recreation & Relaxation",
    description: "Immerse yourself in our expansive outdoor freshwater swimming pool surrounded by tropical palm trees and sunbathing patio decks. In the evening, festive illumination turns the water into an enchanting social venue for birthday splashes and pool parties.",
    image: "/images/resort/swimming_pool.jpg",
    nightImage: "/images/resort/swimming_pool_night.jpg",
    linkText: "Discover Pool Experience",
    linkHref: "/facilities#swimming-pool",
    icon: Waves,
    bulletPoints: [
      "Open year-round from 7:00 AM – 7:00 PM",
      "Magical fairy-lit evening party ambiance",
      "Poolside snack and cocktail service available"
    ]
  },
  {
    title: "Family Restaurant & Cocktail Bar",
    eyebrow: "Culinary & Dining",
    description: "Savor a flavorful journey through Indian tandoori delicacies, hearty curries, Chinese favorites, and refreshing beverages. Whether you are dining poolside or ordering directly to your room, our kitchen offers fresh, authentic meals prepared with care.",
    image: "/images/resort/restaurant_entrance.jpg",
    nightImage: "/images/resort/restaurant_dining.jpg",
    linkText: "Explore Menu & Bar",
    linkHref: "/dining",
    icon: Utensils,
    bulletPoints: [
      "Separate Vegetarian & Non-Vegetarian kitchens",
      "Full bar serving spirits, beers, wines & cocktails",
      "Direct in-room dining delivery across all floors"
    ]
  },
  {
    title: "Grand Banquet Lawn & Event Spaces",
    eyebrow: "Weddings & Celebrations",
    description: "Host memorable wedding receptions, engagement ceremonies, corporate galas, and family milestones on our expansive green banquet lawn. Complete with red-carpet walkways, stage backdrops, sofa lounge seating, and lavish buffet counters.",
    image: "/images/resort/banquet_lawn.jpg",
    nightImage: "/images/resort/swimming_pool_night.jpg",
    linkText: "Plan Your Event",
    linkHref: "/facilities#banquet-lawn",
    icon: Sparkles,
    bulletPoints: [
      "Generous capacity from 50 to 500+ guests",
      "Customizable stage, mandap & audio-visual setups",
      "Comprehensive multi-cuisine catering packages"
    ]
  }
];

export function HighlightsSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#F8F6F1] border-b border-[#E8E3DA] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Resort Highlights"
          title="Curated Experiences for Every Guest"
          subtitle="Whether you are unwinding beside the pool, dining with loved ones, or hosting a grand celebration, Apexify Resort offers the perfect setting."
        />

        <div className="space-y-20 sm:space-y-24">
          {HIGHLIGHTS.map((item, index) => {
            const isReversed = index % 2 === 1;
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                  isReversed ? "lg:grid-flow-dense" : ""
                }`}
              >
                {/* Visual Image Column */}
                <MotionWrapper
                  direction={isReversed ? "right" : "left"}
                  className={isReversed ? "lg:col-start-2" : ""}
                >
                  <div className="relative group rounded-2xl overflow-hidden shadow-card border border-[#E8E3DA] bg-white">
                    <div className="relative h-[340px] sm:h-[420px] w-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>

                    {/* Secondary Floating Image */}
                    <div className="hidden sm:block absolute bottom-4 right-4 w-44 h-32 rounded-xl overflow-hidden shadow-elevated border-4 border-white bg-white">
                      <Image
                        src={item.nightImage}
                        alt={`${item.title} alternate view`}
                        fill
                        className="object-cover"
                        sizes="180px"
                      />
                    </div>
                  </div>
                </MotionWrapper>

                {/* Text Description Column */}
                <MotionWrapper
                  direction={isReversed ? "left" : "right"}
                  className={isReversed ? "lg:col-start-1" : ""}
                >
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#252525] border border-[#E8E3DA]">
                      <Icon className="h-3.5 w-3.5 text-[#A78355]" />
                      <span>{item.eyebrow}</span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl lg:text-[38px] font-medium text-[#252525] tracking-tight leading-[1.2]">
                      {item.title}
                    </h3>

                    <p className="text-base text-[#77736D] leading-relaxed">
                      {item.description}
                    </p>

                    {/* Feature points */}
                    <ul className="space-y-2 pt-2 text-sm text-[#252525]">
                      {item.bulletPoints.map((point, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#A78355] mt-2 flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-4">
                      <Link
                        href={item.linkHref}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#252525] hover:bg-[#1A1A1A] px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white shadow-subtle hover:shadow-card transition"
                      >
                        <span>{item.linkText}</span>
                        <ArrowRight className="h-4 w-4 text-[#A78355]" />
                      </Link>
                    </div>
                  </div>
                </MotionWrapper>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
