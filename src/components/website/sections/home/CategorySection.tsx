"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/* Detect mobile (< 640px) */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");

    setIsMobile(mq.matches);

    const onChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    mq.addEventListener("change", onChange);

    return () => mq.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}

export default function HeroGalleryScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

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

  /* CATEGORY CARD SCALES */
  const topScale = useTransform(progress, [0, 0.85], [1, isMobile ? 1 : 0.8]);

  const leftScale = useTransform(progress, [0, 0.85], [1, isMobile ? 1 : 0.72]);

  const rightScale = useTransform(
    progress,
    [0, 0.85],
    [1, isMobile ? 1 : 0.72],
  );

  /* CENTER CONTENT */
  const textOpacity = useTransform(progress, [0.2, 0.75], [0, 1]);
  const textScale = useTransform(progress, [0.2, 0.75], [0.8, 1]);
  const textY = useTransform(progress, [0.2, 0.75], [60, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-[180vh] bg-black sm:h-[350vh]"
    >
      {/* Desktop heading */}
      <h2
        className="hidden pb-3 pt-18 text-center text-4xl text-white sm:block sm:text-5xl md:text-6xl"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        Find Your Expression
      </h2>

      {/* Sticky stage */}
      <div className="sticky top-0 flex h-screen h-svh w-full flex-col overflow-hidden px-0 pt-20 sm:px-4 sm:pt-3">
        {/* Mobile heading */}
        <h2
          className="shrink-0 py-[30px] text-center text-4xl text-white sm:hidden"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Find Your Expression
        </h2>

        {/* CATEGORY GRID */}
        <div className="grid min-h-0 w-full flex-1 grid-cols-2 grid-rows-2 gap-0 sm:grid-rows-[1fr_1.25fr] sm:gap-1">
          {/* ================= UNISEX ================= */}
          <motion.div
            style={{ scale: topScale, willChange: "transform" }}
            className="relative col-span-2 origin-top overflow-hidden shadow-xl"
          >
            <Link
              href="/shop?category=unisex"
              className="group absolute inset-0 z-10"
              aria-label="Shop Unisex fragrances"
            >
              <img
                src="/images/unisex4.jpeg"
                alt="Unisex fragrance collection"
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

              <div
                className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/30"
                aria-hidden="true"
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span
                  className="text-[clamp(2rem,5vw,4.5rem)] text-white"
                  style={{
                    fontFamily: "var(--font-serif)",
                    textShadow: "0 2px 24px rgba(0,0,0,0.4)",
                    letterSpacing: "0.08em",
                  }}
                >
                  UNISEX
                </span>

                <span className="mt-2 text-[10px] uppercase tracking-[0.3em] text-white/75">
                  For every expression
                </span>
              </div>
            </Link>
          </motion.div>

          {/* ================= MEN ================= */}
          <motion.div
            style={{ scale: leftScale, willChange: "transform" }}
            className="relative origin-bottom-left overflow-hidden shadow-xl"
          >
            <Link
              href="/shop?category=men"
              className="group absolute inset-0 z-10"
              aria-label="Shop men's fragrances"
            >
              <img
                src="/images/men-2.jpeg"
                alt="Men's fragrance collection"
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

              <div
                className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/30"
                aria-hidden="true"
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span
                  className="text-3xl text-white sm:text-4xl md:text-5xl"
                  style={{
                    fontFamily: "var(--font-serif)",
                    textShadow: "0 2px 24px rgba(0,0,0,0.4)",
                    letterSpacing: "0.08em",
                  }}
                >
                  MEN
                </span>

                <span className="mt-2 text-[9px] uppercase tracking-[0.25em] text-white/70 sm:text-[10px]">
                  Bold. Refined. Distinct.
                </span>
              </div>
            </Link>
          </motion.div>

          {/* ================= WOMEN ================= */}
          <motion.div
            style={{ scale: rightScale, willChange: "transform" }}
            className="relative origin-bottom-right overflow-hidden shadow-xl"
          >
            <Link
              href="/shop?category=women"
              className="group absolute inset-0 z-10"
              aria-label="Shop women's fragrances"
            >
              <img
                src="/images/women-2.jpeg"
                alt="Women's fragrance collection"
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

              <div
                className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/30"
                aria-hidden="true"
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span
                  className="text-3xl text-white sm:text-4xl md:text-5xl"
                  style={{
                    fontFamily: "var(--font-serif)",
                    textShadow: "0 2px 24px rgba(0,0,0,0.4)",
                    letterSpacing: "0.08em",
                  }}
                >
                  WOMEN
                </span>

                <span className="mt-2 text-[9px] uppercase tracking-[0.25em] text-white/70 sm:text-[10px]">
                  Soft. Magnetic. Unforgettable.
                </span>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Mobile-only dark veil */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="absolute inset-0 z-10 bg-black/50 sm:hidden"
          aria-hidden="true"
        />

        {/* ================= CENTER CONTENT ================= */}
        <motion.div
          style={{
            opacity: textOpacity,
            scale: textScale,
            y: textY,
          }}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center sm:inset-x-0 sm:bottom-0 sm:top-[6%]"
        >
          <span
            className="mb-4 text-[10px] uppercase tracking-[0.4em] text-white/50"
            style={{ fontFamily: "var(--font-body)" }}
          >
            SHAWQ
          </span>

          <h2
            className="text-[clamp(2.2rem,5vw,4rem)] text-white"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            The Art of Scent
          </h2>

          <p
            className="mt-4 max-w-xl text-sm leading-relaxed text-white/70 md:text-base"
            style={{
              fontFamily: "var(--font-body)",
              letterSpacing: "0.03em",
              lineHeight: 1.6,
            }}
          >
            Discover distinctive compositions crafted with oud, amber and rare
            botanicals — made to become part of your story.
          </p>

          <div className="pointer-events-auto mt-8 flex flex-col items-center gap-4 sm:flex-row">
            <a
              href="/products"
              className="pointer-events-auto inline-flex items-center justify-center min-h-[48px] bg-[#C9A962] px-8 py-3 text-xs font-medium uppercase tracking-[0.2em] text-[#0F0A08] rounded-none leading-none transition-all duration-500 ease-out hover:bg-[#DFC27B] hover:shadow-lg"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Explore Collection
            </a>

            {/* Secondary Button (Keeps the Slide-Up Animation) */}
            <a
              href="/about"
              className="pointer-events-auto relative group overflow-hidden flex min-h-[48px] items-center justify-center border border-[#C9A962] px-8 py-3 text-xs font-medium uppercase tracking-[0.2em] text-[#C9A962] rounded-none bg-transparent leading-none transition-all duration-500 ease-out hover:border-[#C9A962]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <span className="relative z-10 transition-colors duration-500 group-hover:text-[#0F0A08]">
                Our Story
              </span>
              <div className="absolute inset-0 z-0 translate-y-full bg-[#C9A962] transition-transform duration-500 ease-out group-hover:translate-y-0" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
