"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";

const segments = [
  {
    id: "extrait",
    title: "extrait de parfum",
    subtitle: "maximum concentration",
    text: "Long-lasting extraits composed with high oil ratios for unmatched projection.",
    image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "attar",
    title: "attar & oud",
    subtitle: "pure distillation",
    text: "Aged natural oils extracted from rare agarwood trees and botanical blossoms.",
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "bukhoor",
    title: "bukhoor blends",
    subtitle: "sacred smoke",
    text: "Resin-infused wood chips crafted to burn slow and fill spaces with warmth.",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "layering",
    title: "layering oils",
    subtitle: "bespoke harmony",
    text: "Designed to merge seamlessly on skin, allowing custom signature creations.",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1400&auto=format&fit=crop",
  },
];

export default function CollectionSegments() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#161412] px-6 py-32 text-[#F5F0E8] sm:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="mb-20 flex flex-col items-start justify-between gap-6 border-b border-[#C5A880]/15 pb-8 lg:flex-row lg:items-end">
            <div>
              <span className="text-[10px] uppercase tracking-[0.5em] text-[#C5A880]">
                the catalog
              </span>
              <h2 className="mt-4 font-serif text-4xl sm:text-5xl">
                four pillars of <span className="italic text-[#C5A880]">craft</span>
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-[11px] uppercase tracking-[0.35em] text-[#C5A880] transition-colors hover:text-[#F5F0E8]"
            >
              explore full collection →
            </Link>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {segments.map((seg, i) => (
            <div
              key={seg.id}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative aspect-[3/4] overflow-hidden rounded-sm bg-[#11100F] border border-[#C5A880]/15 transition-all duration-500 hover:border-[#C5A880]"
            >
              <Image
                src={seg.image}
                alt={seg.title}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#11100F] via-[#11100F]/40 to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <span className="text-[9px] uppercase tracking-[0.4em] text-[#C5A880]">
                  {seg.subtitle}
                </span>
                <h3 className="mt-2 font-serif text-2xl text-[#F5F0E8]">{seg.title}</h3>
                <p className="mt-3 text-xs leading-[1.8] text-[#E8DED0]/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {seg.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}