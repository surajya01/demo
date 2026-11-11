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
          className={`inline-block text-xs sm:text-[13px] font-semibold tracking-[0.25em] uppercase mb-3 ${
            light ? "text-[#A78355]" : "text-[#A78355]"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-serif text-3xl sm:text-4xl lg:text-[42px] font-medium tracking-tight leading-[1.2] ${
          light ? "text-white" : "text-[#252525]"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base sm:text-lg leading-relaxed ${
            light ? "text-[#F8F6F1]/85" : "text-[#77736D]"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

