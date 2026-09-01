"use client";

interface KenBurnsBackgroundProps {
  src: string;
  srcSet?: string;
  alt?: string;
}

export function KenBurnsBackground({
  src,
  srcSet,
  alt = "",
}: KenBurnsBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        srcSet={srcSet}
        sizes="100vw"
        alt={alt}
        decoding="async"
        className="ken-burns h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/70" />
    </div>
  );
}
