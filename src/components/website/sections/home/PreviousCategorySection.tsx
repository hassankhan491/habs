// components/sections/HeroGalleryScroll.tsx
// category section with 3 images (unisex, men, women) and it is not using
"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

export default function HeroGalleryScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 400,
    restDelta: 0.001,
  });

  const progress = prefersReducedMotion ? scrollYProgress : smoothProgress;

  /* IMAGES: full-screen grid at top → shrink on scroll */
  const topScale = useTransform(progress, [0, 0.6], [1, 0.55]);
  const leftScale = useTransform(progress, [0, 0.6], [1, 0.5]);
  const rightScale = useTransform(progress, [0, 0.6], [1, 0.5]);

  /* TEXT: fades/scales in as images move apart */
  const textOpacity = useTransform(progress, [0.15, 0.5], [0, 1]);
  const textScale = useTransform(progress, [0.15, 0.5], [0.8, 1]);
  const textY = useTransform(progress, [0.15, 0.5], [60, 0]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-black">
      {/* Sticky full-screen stage */}
      <div className="sticky top-0 h-screen h-svh w-full overflow-hidden p-3 sm:p-4">
        <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-3 sm:gap-4">
          {/* TOP IMAGE — UNISEX */}
          <motion.div
            style={{ scale: topScale, willChange: "transform" }}
            className="relative col-span-2 origin-top overflow-hidden shadow-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=1600&h=900&fit=crop"
              alt="Unisex fragrance collection"
              className="h-full w-full object-cover object-center"
            />
            {/* Subtle overlay for label readability */}
            <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-4xl text-white sm:text-5xl md:text-6xl lg:text-7xl"
                style={{
                  fontFamily: "var(--font-serif)",
                  textShadow: "0 2px 24px rgba(0,0,0,0.4)",
                  letterSpacing: "0.05em",
                }}
              >
                UNISEX
              </span>
            </div>
          </motion.div>

          {/* BOTTOM LEFT — MEN */}
          <motion.div
            style={{ scale: leftScale, willChange: "transform" }}
            className="relative origin-bottom-left overflow-hidden shadow-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=900&h=900&fit=crop"
              alt="Men's fragrance collection"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-3xl text-white sm:text-4xl md:text-5xl"
                style={{
                  fontFamily: "var(--font-serif)",
                  textShadow: "0 2px 24px rgba(0,0,0,0.4)",
                  letterSpacing: "0.05em",
                }}
              >
                MEN
              </span>
            </div>
          </motion.div>

          {/* BOTTOM RIGHT — WOMEN */}
          <motion.div
            style={{ scale: rightScale, willChange: "transform" }}
            className="relative origin-bottom-right overflow-hidden shadow-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=900&h=900&fit=crop"
              alt="Women's fragrance collection"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-3xl text-white sm:text-4xl md:text-5xl"
                style={{
                  fontFamily: "var(--font-serif)",
                  textShadow: "0 2px 24px rgba(0,0,0,0.4)",
                  letterSpacing: "0.05em",
                }}
              >
                WOMEN
              </span>
            </div>
          </motion.div>
        </div>

        {/* CENTER TEXT — appears as images move apart */}
        <motion.div
          style={{ opacity: textOpacity, scale: textScale, y: textY }}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
        >
          <h2
            className="text-4xl text-white sm:text-5xl md:text-6xl"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            The Art of Scent
          </h2>
          <p
            className="mt-4 max-w-xl text-white/70"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "16px",
              letterSpacing: "0.03em",
              lineHeight: 1.6,
            }}
          >
            Experience the art of fine fragrances, crafted with passion and
            precision.
          </p>
          <div className="pointer-events-auto mt-8 flex flex-col items-center gap-4 sm:flex-row">
            <button
              className="bg-white px-8 py-3 text-xs font-medium uppercase tracking-[0.2em] text-black transition-colors duration-300 hover:bg-white/90"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Explore Collection
            </button>
            <button
              className="border border-white/30 px-8 py-3 text-xs font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-white/10"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Our Story
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}