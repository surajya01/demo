"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Maximize2 } from "lucide-react";
import { GALLERY_ITEMS, GALLERY_CATEGORIES } from "@/data/gallery.data";
import { MotionWrapper } from "@/components/common/MotionWrapper";
import { Lightbox, LightboxImage } from "@/components/common/Lightbox";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeCategory === "all") return true;
    return item.category === activeCategory;
  });

  const lightboxImages: LightboxImage[] = filteredItems.map((item) => ({
    src: item.src,
    title: item.title,
    caption: item.caption,
    category: item.categoryLabel,
  }));

  return (
    <>
      <main className="min-h-screen bg-[#F8F6F1]">
        {/* Banner - Solid dark tint, no gradients */}
        <section className="relative py-20 sm:py-28 bg-[#252525] text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/resort/swimming_pool_night.jpg"
              alt="Apexify Resort Gallery Header"
              fill
              className="object-cover opacity-30"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-[#A78355] font-semibold block mb-3">
              Official Property Visuals
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white">
              Apexify Resort Photo Gallery
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#F8F6F1]/90 max-w-2xl mx-auto font-light">
              Explore authentic photographs of our outdoor swimming pool, guest suites, dining areas, and expansive banquet lawns in Waliv, Vasai East.
            </p>
          </div>
        </section>

        {/* Gallery Content */}
        <section className="py-16 sm:py-24 border-b border-[#E8E3DA]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
              {GALLERY_CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider transition ${
                    activeCategory === cat.key
                      ? "bg-[#A78355] text-white shadow-subtle"
                      : "bg-white text-[#252525] border border-[#E8E3DA] hover:bg-[#F8F6F1]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Photographic Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => (
                <MotionWrapper key={item.id} delay={index * 0.08}>
                  <div
                    role="button"
                    tabIndex={0}
                    aria-label={`View photograph: ${item.title}`}
                    onClick={() => setLightboxIndex(index)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setLightboxIndex(index);
                      }
                    }}
                    className="group relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden shadow-subtle hover:shadow-card transition-all duration-300 cursor-pointer border border-[#E8E3DA] bg-white focus:outline-none focus:ring-2 focus:ring-[#A78355]"
                  >
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    {/* Solid minimal overlay - NO gradient */}
                    <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors" />

                    {/* Verified Badge */}
                    <div className="absolute top-3.5 left-3.5">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#252525] px-3 py-1 text-[11px] font-medium text-white shadow-xs">
                        <Sparkles className="h-3 w-3 text-[#A78355]" />
                        {item.categoryLabel}
                      </span>
                    </div>

                    {/* Expand icon on hover */}
                    <div className="absolute top-3.5 right-3.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/30 text-white backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="h-4 w-4" />
                    </div>

                    {/* Captions - Solid clean card */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 rounded-xl bg-[#252525]/90 p-3 text-white border border-white/10 shadow-xs">
                      <h3 className="font-serif text-base font-medium tracking-tight truncate">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-xs text-[#F8F6F1]/80 line-clamp-1">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </MotionWrapper>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          isOpen={lightboxIndex !== null}
          onClose={() => setLightboxIndex(null)}
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        />
      )}
    </>
  );
}
