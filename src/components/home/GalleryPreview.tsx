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
      <section className="py-20 sm:py-24 bg-[#FAF9F6] border-b border-[#E8DEC9]/50">
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
              className="inline-flex items-center gap-2 rounded-xl border border-[#0F2C59] bg-white px-5 py-2.5 text-sm font-semibold text-[#0F2C59] hover:bg-[#0F2C59] hover:text-white transition-all shadow-sm"
            >
              <span>View Full Gallery (10+ Photos)</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {previewItems.map((item, index) => (
              <MotionWrapper key={item.id} delay={index * 0.1}>
                <div
                  onClick={() => setLightboxIndex(index)}
                  className="group relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-[#E8DEC9]/80"
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/50 px-3 py-1 text-[11px] font-medium text-white/90 backdrop-blur-sm">
                      <Sparkles className="h-3 w-3 text-[#C5A46D]" />
                      {item.categoryLabel}
                    </span>
                  </div>

                  {/* Expand icon on hover */}
                  <div className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="h-4 w-4" />
                  </div>

                  {/* Caption at bottom */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h4 className="font-serif text-lg font-bold tracking-tight">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-xs text-white/80 line-clamp-1">
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

