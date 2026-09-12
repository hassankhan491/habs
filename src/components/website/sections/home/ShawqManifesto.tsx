// components/sections/ShawqManifesto.tsx
"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const C = {
  red: "#C73234",
  cream: "#F4EFE7",
};

/* Word mask — each word rises out of its own clip box */
function Mask({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] ${className}`}
    >
      <span className="mani-word inline-block will-change-transform">
        {children}
      </span>
    </span>
  );
}

export default function ShawqManifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const shadeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMq.matches) {
      section.dataset.reduced = "true";
      return;
    }

    const mm = gsap.matchMedia();

    const build = (desktop: boolean) => {
      const words = section.querySelectorAll<HTMLElement>(".mani-word");
      const pillarWords = section.querySelectorAll<HTMLElement>(".pillar-word");
      const pillarParas = section.querySelectorAll<HTMLElement>(".pillar-para");
      const pillarNums = section.querySelectorAll<HTMLElement>(".pillar-num");

      /* ---------- initial states ---------- */
      gsap.set(imgRef.current, { scale: 1.12 });
      gsap.set(words, { y: "115%" });
      gsap.set(shadeRef.current, { opacity: 0 });
      gsap.set(pillarWords, { y: "6vh", opacity: 0 });
      gsap.set(pillarParas, { y: "2vh", opacity: 0 });
      gsap.set(pillarNums, { opacity: 0 });

      /* ---------- timeline ---------- */
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${desktop ? 3000 : 1800}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(imgRef.current, { scale: 1.02, duration: 4.6, ease: "none" }, 0)
        .to(
          words,
          { y: "0%", duration: 1.4, ease: "power3.out", stagger: 0.08 },
          0.2,
        )
        .to(titleRef.current, { y: "-6vh", opacity: 0, duration: 0.6 }, 2.6)
        .to(shadeRef.current, { opacity: 0.78, duration: 1, ease: "none" }, 2.6)
        .to(
          pillarWords,
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
          },
          3.0,
        )
        .to(
          pillarParas,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.12,
          },
          3.3,
        )
        .to(pillarNums, { opacity: 1, duration: 0.8, stagger: 0.12 }, 3.6)
        .set({}, {}, 5.0); // hold on the pillars frame

      return () => {
        tl.kill();
      };
    };

    mm.add("(min-width: 768px)", () => build(true));
    mm.add("(max-width: 767px)", () => build(false));

    const onReduce = (e: MediaQueryListEvent) => {
      if (e.matches) {
        mm.revert();
        section.dataset.reduced = "true";
      }
    };
    reduceMq.addEventListener("change", onReduce);

    return () => {
      reduceMq.removeEventListener("change", onReduce);
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-black"
      aria-label="SHAWQ manifesto"
    >
      <picture className="absolute inset-0 h-full w-full">
        {/* Mobile */}
        <source media="(max-width: 767px)" srcSet="/images/manifesto-bg2.jpg" />

        {/* Desktop */}
        <img
          ref={imgRef}
          src="/images/manifesto-desktop.jpeg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-top"
          draggable={false}
        />
      </picture>
      <div ref={shadeRef} className="absolute inset-0 bg-black" />

      {/* huge statement — word-mask reveal */}
      <div
        ref={titleRef}
        className="absolute inset-0 flex items-center justify-center px-4"
      >
        <h2
          className="max-w-6xl text-center text-[9vw] font-black uppercase leading-[0.95] tracking-wide md:text-[6.5vw]"
          style={{ fontFamily: "var(--font-serif)", color: C.cream }}
        >
          <Mask className="mr-[0.25em] px-[0.08em]">SHAWQ</Mask>
          <Mask className="mr-[0.25em] px-[0.08em]">IS</Mask>
          <Mask className="mr-[0.25em] px-[0.08em]">AN</Mask>
          <Mask className="mr-[0.25em] px-[0.08em]">INDEPENDENT,</Mask>
          <Mask className="mr-[0.25em] px-[0.08em]">ARTIST-FOUNDED</Mask>
          <Mask className="mr-[0.25em] px-[0.08em]">FRAGRANCE</Mask>
          <Mask className="px-[0.08em]">HOUSE</Mask>
        </h2>
      </div>

      {/* pillars */}
      <div className="absolute inset-0 grid grid-cols-1 gap-y-8 px-6 pt-[12vh] md:grid-cols-4 md:gap-x-10 md:gap-y-0 md:px-10 md:pt-[16vh]">
        {" "}
        <div>
          <p
            className="pillar-word text-[13vw] font-black uppercase leading-[0.9] md:text-[6.5vw]"
            style={{ fontFamily: "var(--font-serif)", color: C.red }}
          >
            TRUTH
          </p>
          <p className="pillar-para mt-6 max-w-[26ch] text-justify text-[11px] leading-relaxed tracking-wide text-white/70 md:text-xs">
            NO PERFORMANCE, NO FILTER. ONLY WHAT THE SKIN REMEMBERS WHEN THE
            ROOM GOES QUIET.
          </p>
          <p className="pillar-num mt-3 text-xs text-white/50">01</p>
        </div>
        <div className="md:mt-24">
          <p
            className="pillar-word text-[13vw] font-black uppercase leading-[0.9] md:text-[6.5vw]"
            style={{ fontFamily: "var(--font-serif)", color: C.red }}
          >
            DESIRE
          </p>
          <p className="pillar-para mt-6 max-w-[26ch] text-justify text-[11px] leading-relaxed tracking-wide text-white/70 md:text-xs">
            WE DON&apos;T CHASE ATTENTION. WE LET PRESENCE LINGER UNTIL IT IS
            MISSED.
          </p>
          <p className="pillar-num mt-3 text-xs text-white/50">02</p>
        </div>
        <div>
          <p
            className="pillar-word text-[13vw] font-black uppercase leading-[0.9] md:text-[6.5vw]"
            style={{ fontFamily: "var(--font-serif)", color: C.red }}
          >
            CRAFT
          </p>
          <p className="pillar-para mt-6 max-w-[26ch] text-justify text-[11px] leading-relaxed tracking-wide text-white/70 md:text-xs">
            SMALL BATCHES, SLOW MACERATION. NOTHING FORCED. NOTHING RUSHED.
          </p>
          <p className="pillar-num mt-3 text-xs text-white/50">03</p>
        </div>
        <div className="md:mt-24">
          <p
            className="pillar-word text-[13vw] font-black uppercase leading-[0.9] md:text-right md:text-[6.5vw]"
            style={{ fontFamily: "var(--font-serif)", color: C.red }}
          >
            IDENTITY
          </p>
          <p className="pillar-para mt-6 max-w-[26ch] text-justify text-[11px] leading-relaxed tracking-wide text-white/70 md:ml-auto md:text-right md:text-xs">
            A SCENT IS NOT WORN. IT IS RECOGNISED — IN YOU, BEFORE YOU SPEAK.
          </p>
          <p className="pillar-num mt-3 text-xs text-white/50 md:text-right">
            04
          </p>
        </div>
      </div>

      {/* film grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-50 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ♿ reduced-motion */}
      <style>{`
        [data-reduced="true"] { height: auto !important; overflow: visible !important; }
        [data-reduced="true"] > * { position: relative !important; inset: auto !important; transform: none !important; opacity: 1 !important; clip-path: none !important; }
        [data-reduced="true"] .pointer-events-none { pointer-events: auto !important; }
      `}</style>
    </section>
  );
}
