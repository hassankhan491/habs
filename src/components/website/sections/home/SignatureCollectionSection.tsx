// components/sections/ShowcaseSection.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import gsap from "gsap";
import { useReducedMotion } from "framer-motion";

interface ShowcaseProduct {
  name: string;
  family: string;
  notes: string;
  image: string;
}

const PRODUCTS: ShowcaseProduct[] = [
  {
    name: "Noir",
    family: "A dark smoky amber",
    notes: "Star Anise · Coffee · Cassis",
    image: "/images/NB-06.png",
  },
  {
    name: "Rouge",
    family: "A blaze of saffron and rose",
    notes: "Saffron · Damask Rose · Oud",
    image: "/images/NB-07.png",
  },
  {
    name: "Élan",
    family: "A bright aromatic wood",
    notes: "Bergamot · Iris · White Musk",
    image: "/images/NB-08.png",
  },
  {
    name: "Ambre",
    family: "A warm, enveloping amber",
    notes: "Golden Amber · Vanilla · Sandalwood",
    image: "/images/NB-09.png",
  },
];

const RED = "#C73234";
const LUX_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export default function ShowcaseSection() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [info, setInfo] = useState<ShowcaseProduct>(PRODUCTS[0]);
  const swiperRef = useRef<SwiperClass | null>(null);

  const familyRef = useRef<HTMLParagraphElement>(null);
  const notesRef = useRef<HTMLParagraphElement>(null);
  const shopRef = useRef<HTMLAnchorElement>(null);
  const shownName = useRef(PRODUCTS[0].name);

  useEffect(
    () => () => {
      gsap.killTweensOf([familyRef.current, notesRef.current, shopRef.current]);
    },
    []
  );

  /* Cinematic crossfade transition for product info */
  const changeInfo = (p: ShowcaseProduct) => {
    if (p.name === shownName.current) return;
    shownName.current = p.name;
    if (reduced) {
      setInfo(p);
      return;
    }
    const targets = [familyRef.current, notesRef.current, shopRef.current].filter(
      Boolean
    ) as Element[];

    gsap.to(targets, {
      autoAlpha: 0,
      y: -10,
      duration: 0.22,
      ease: "power2.in",
      stagger: 0.02,
      onComplete() {
        setInfo(p);
        gsap.to(targets, {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          ease: "power3.out",
          stagger: 0.04,
        });
      },
    });
  };

  const onSlideChange = (s: SwiperClass) => {
    const idx = s.realIndex % PRODUCTS.length;
    setActive(idx);
    changeInfo(PRODUCTS[idx]);
  };

  return (
    <section
      aria-label="SHAWQ Signature Collection"
      className="relative overflow-hidden bg-[#EAE6DF] pt-20 pb-16 md:pt-28 md:pb-20 lg:pt-36 lg:pb-24 select-none"
    >
      {/* Dynamic Luxury Ambient Glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-1000"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(255,255,255,0.6) 0%, rgba(234,230,223,0) 70%)",
        }}
      />

      {/* ===== TOP: Header Section ===== */}
      <div className="relative z-10 mb-8 px-6 text-center md:mb-12">
        <span
          className="block text-xs font-semibold uppercase tracking-[0.45em] sm:text-sm md:text-base lg:text-lg mb-2"
          style={{ fontFamily: "var(--font-body)", color: RED }}
        >
          Signature Collection
        </span>

        <h2
          className="text-3xl font-light uppercase tracking-[0.2em] text-[#0F0A08] sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Four Expressions
        </h2>

        <p
          className="mt-3 text-[10px] uppercase tracking-[0.35em] text-black/50 sm:text-xs md:text-sm"
          style={{ fontFamily: "var(--font-body)" }}
        >
          One Identity
        </p>
      </div>

      {/* ===== STAGE: Centered Carousel ===== */}
      <div className="relative z-10">
        <Swiper
          modules={[Autoplay, Keyboard]}
          slidesPerView={1.35}
          centeredSlides
          loop
          grabCursor
          speed={950}
          spaceBetween={24}
          onSwiper={(s) => (swiperRef.current = s)}
          keyboard={{ enabled: true, onlyInViewport: true }}
          autoplay={
            reduced
              ? false
              : {
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
          }
          breakpoints={{
            576: { slidesPerView: 1.8, spaceBetween: 32 },
            992: { slidesPerView: 2.4, spaceBetween: 40 },
            1280: { slidesPerView: 3, spaceBetween: 52 },
            1600: { slidesPerView: 3.4, spaceBetween: 64 },
          }}
          onSlideChange={onSlideChange}
          style={{ overflow: "visible" }}
        >
          {[...PRODUCTS, ...PRODUCTS].map((p, i) => (
            <SwiperSlide key={`${p.name}-${i}`} className="flex justify-center">
              <div className="relative flex flex-col items-center justify-center">
                <img
                  src={p.image}
                  alt={`${p.name} — Extrait de Parfum`}
                  loading="lazy"
                  className={`
                    w-[78vw] h-[58vw] object-contain
                    sm:w-[min(100%,340px)] sm:h-[40vh]
                    md:w-[min(100%,380px)] md:h-[42vh]
                    lg:w-[min(100%,420px)] lg:h-[clamp(260px,44vh,440px)]
                    xl:w-[min(100%,480px)] xl:h-[clamp(260px,46vh,480px)]
                    2xl:w-[min(100%,520px)] 2xl:h-[clamp(300px,50vh,520px)]
                    blur-[12px] opacity-35 scale-90
                    transition-all duration-[900ms]
                    will-change-[filter,opacity,transform]
                    [.swiper-slide-active_&]:blur-none [.swiper-slide-active_&]:opacity-100 [.swiper-slide-active_&]:scale-100
                    [.swiper-slide-active_&]:drop-shadow-[0_25px_35px_rgba(0,0,0,0.18)]
                  `}
                  style={{ transitionTimingFunction: LUX_EASE }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ===== BOTTOM: Interactive Details ===== */}
      <div className="relative z-10 mt-8 px-6 text-center md:mt-12">
        <p
          ref={familyRef}
          className="text-xs uppercase tracking-[0.3em] font-medium text-[#0F0A08] sm:text-sm md:text-base"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {info.family}
        </p>

        <p
          ref={notesRef}
          className="mt-2 text-xs font-light text-black/60 sm:text-sm md:text-base"
          style={{
            fontFamily: "var(--font-body)",
            letterSpacing: "0.05em",
          }}
        >
          {info.notes}
        </p>

        <a
  ref={shopRef}
  href="/shop"
  className="mt-7 pointer-events-auto relative group overflow-hidden inline-flex items-center justify-center rounded-none border border-[#C9A962] bg-[#0F0A08] px-9 py-4 text-xs font-medium uppercase tracking-[0.3em] text-[#FAF8F3] transition-all duration-500 hover:border-[#C9A962] hover:shadow-[0_10px_25px_rgba(201,169,98,0.25)] sm:px-12 sm:py-4 sm:text-xs leading-none"
  style={{ fontFamily: "var(--font-body)" }}
>
  <span className="relative z-10 transition-colors duration-500 group-hover:text-[#0F0A08]">
    Explore {info.name}
  </span>
  <div className="absolute inset-0 z-0 translate-y-full bg-[#C9A962] transition-transform duration-500 ease-out group-hover:translate-y-0" />
</a>

        {/* Interactive Segmented Progress Bar */}
        <div
          className="mt-10 flex justify-center items-center gap-2 sm:gap-3"
          aria-label="Carousel Navigation"
        >
          {PRODUCTS.map((p, i) => (
            <button
              key={p.name}
              onClick={() => swiperRef.current?.slideToLoop(i)}
              className="group relative py-2"
              aria-label={`Go to slide ${i + 1}`}
            >
              <span className="relative block h-[3px] w-8 overflow-hidden rounded-full bg-black/15 transition-all duration-300 group-hover:bg-black/30 sm:w-12 md:w-16">
                <span
                  className={`absolute inset-0 origin-left bg-[#C73234] transition-transform duration-500 ${
                    i === active ? "scale-x-100" : "scale-x-0"
                  }`}
                  style={{ transitionTimingFunction: LUX_EASE }}
                />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}