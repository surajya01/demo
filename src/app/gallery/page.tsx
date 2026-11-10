"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Maximize2, Filter } from "lucide-react";
import { GALLERY_ITEMS, GALLERY_CATEGORIES, GalleryItem } from "@/data/gallery.data";
import { SectionHeader } from "@/components/common/SectionHeader";
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
      <main className="min-h-screen bg-[#FAF9F6]">
        {/* Banner */}
        <section className="relative py-20 sm:py-28 bg-[#234B3C] text-white overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-25">
            <Image
              src="/images/resort/swimming_pool_night.jpg"
              alt="Apexify Resort Gallery Header"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A46D] font-semibold block mb-3">
              Official Property Visuals
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Apexify Resort Photo Gallery
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#F4EFE5]/85 max-w-2xl mx-auto font-light">
              Explore authentic photographs of our outdoor swimming pool, guest suites, dining areas, and expansive banquet lawns in Waliv, Vasai East.
            </p>
          </div>
        </section>

        {/* Gallery Content */}
        <section className="py-16 sm:py-20 border-b border-[#E8DEC9]/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
              {GALLERY_CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition ${
                    activeCategory === cat.key
                      ? "bg-[#234B3C] text-white shadow-md"
                      : "bg-white text-[#292D2A] border border-[#E8DEC9] hover:bg-[#F4EFE5]"
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
                    aria-label={`View high-resolution photograph: ${item.title}`}
                    onClick={() => setLightboxIndex(index)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setLightboxIndex(index);
                      }
                    }}
                    className="group relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-[#E8DEC9] bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#234B3C]"
                  >
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                    {/* Verified Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#234B3C]/90 px-3 py-1 text-[11px] font-medium text-[#F4EFE5] backdrop-blur-sm">
                        <Sparkles className="h-3 w-3 text-[#C5A46D]" />
                        {item.categoryLabel}
                      </span>
                    </div>

                    {/* Expand icon on hover */}
                    <div className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="h-4 w-4" />
                    </div>

                    {/* Captions */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="font-serif text-lg font-bold tracking-tight">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs text-[#F4EFE5]/80 line-clamp-2">
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

