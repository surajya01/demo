import * as React from "react";
import Image, { type ImageProps } from "next/image";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ResortImageProps extends Omit<ImageProps, "src"> {
  src?: string | null;
  alt: string;
  fallbackSrc?: string;
  aspectRatio?: "video" | "square" | "portrait" | "wide";
}

export function ResortImage({
  src,
  alt,
  fallbackSrc = "/images/placeholders/resort_placeholder.svg",
  aspectRatio = "video",
  className,
  ...props
}: ResortImageProps) {
  const [imgSrc, setImgSrc] = React.useState<string>(src || fallbackSrc);
  const [hasError, setHasError] = React.useState<boolean>(false);

  React.useEffect(() => {
    setImgSrc(src || fallbackSrc);
    setHasError(false);
  }, [src, fallbackSrc]);

  const aspectStyles = {
    video: "aspect-[16/9]",
    square: "aspect-square",
    portrait: "aspect-[4/5]",
    wide: "aspect-[21/9]",
  }[aspectRatio];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-[#F4EFE5]/50",
        aspectStyles,
        className
      )}
    >
      <Image
        src={imgSrc}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className={cn(
          "object-cover transition-all duration-300",
          hasError && "opacity-80 grayscale-[30%]"
        )}
        onError={() => {
          if (!hasError) {
            setHasError(true);
            setImgSrc(fallbackSrc);
          }
        }}
        {...props}
      />
    </div>
  );
}
