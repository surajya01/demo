import React from "react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
  light?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
  light = false,
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`max-w-3xl mb-12 sm:mb-16 ${
        isCenter ? "mx-auto text-center" : "text-left"
      } ${className}`}
    >
      {eyebrow && (
        <span
          className={`inline-block text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-3 ${
            light ? "text-[#C5A46D]" : "text-[#C5A46D]"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] ${
          light ? "text-[#FAF9F6]" : "text-[#234B3C]"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base sm:text-lg leading-relaxed ${
            light ? "text-[#F4EFE5]/80" : "text-[#292D2A]/75"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

