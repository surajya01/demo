"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Maximize2, Sparkles } from "lucide-react";
import { GALLERY_ITEMS } from "@/data/gallery.data";
import { SectionHeader } from "@/components/common/SectionHeader";
import { MotionWrapper } from "@/components/common/MotionWrapper";
import { Lightbox, LightboxImage } from "@/components/common/Lightbox";

export function GalleryPreview() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const previewItems = GALLERY_ITEMS.slice(0, 6);
  const lightboxImages: LightboxImage[] = previewItems.map((item) => ({
    src: item.src,
    title: item.title,
    caption: item.caption,
    category: item.categoryLabel,
  }));

  return (
    <>
      <section className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#E8E3DA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <SectionHeader
              eyebrow="Photographic Tour"
              title="A Glimpse Into Apexify Resort"
              subtitle="All photographs are verified, genuine captures of our Waliv property, suites, swimming pool, and banquet grounds."
              align="left"
              className="mb-0"
            />
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 rounded-xl border border-[#E8E3DA] bg-[#F8F6F1] hover:bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wide text-[#252525] transition-all shadow-subtle hover:shadow-card"
            >
              <span>View Full Gallery (10+ Photos)</span>
              <ArrowRight className="h-4 w-4 text-[#A78355]" />
            </Link>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {previewItems.map((item, index) => (
              <MotionWrapper key={item.id} delay={index * 0.08}>
                <div
                  onClick={() => setLightboxIndex(index)}
                  className="group relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden shadow-subtle hover:shadow-card transition-all duration-300 cursor-pointer border border-[#E8E3DA] bg-[#F8F6F1]"
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Solid clean overlay tint - NO gradient */}
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors" />

                  {/* Badge */}
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

                  {/* Caption at bottom - Solid clean card */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 rounded-xl bg-[#252525]/90 p-3 text-white shadow-xs border border-white/10">
                    <h4 className="font-serif text-base font-medium tracking-tight truncate">
                      {item.title}
                    </h4>
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

      {/* Lightbox Modal */}
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
