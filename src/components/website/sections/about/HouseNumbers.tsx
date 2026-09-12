"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 12, suffix: "", label: "signature extraits" },
  { value: 50, suffix: "k+", label: "bottles hand-filled" },
  { value: 3, suffix: "", label: "ateliers worldwide" },
];

export default function HouseNumbers() {
  const sectionRef = useRef<HTMLElement>(null);
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const dividerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const introRef = useRef<HTMLParagraphElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Intro text fade in
      if (introRef.current) {
        gsap.fromTo(
          introRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: introRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Counter animation
      stats.forEach((s, i) => {
        const el = refs.current[i];
        if (!el) return;
        const obj = { v: 0 };
        gsap.to(obj, {
          v: s.value,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
          onUpdate: () => {
            el.textContent =
              String(Math.round(obj.v)).padStart(2, "0") + s.suffix;
          },
        });
      });

      // Divider lines
      dividerRefs.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      // Bottom line fade in
      if (bottomLineRef.current) {
        gsap.fromTo(
          bottomLineRef.current,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: bottomLineRef.current,
              start: "top 90%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0d0c0a] px-6 py-32 sm:px-12 lg:px-24 lg:py-44"
    >
      <div className="mx-auto max-w-5xl">
        {/* Intro text */}
        <p
          ref={introRef}
          className="mx-auto max-w-2xl text-center text-[15px] leading-[2] text-[#E8DED0]/50"
        >
          since mmxxvi, SHAWQ has shaped iconic experiences through timeless
          compositions and technical excellence — with a devoted atelier team
          and presence in karachi, dubai and london, combining global reach
          with deep olfactory expertise.
        </p>

        {/* Stats grid */}
        <div className="mt-24 grid grid-cols-1 gap-0 text-center sm:grid-cols-3">
          {stats.map((s, i) => (
            <div key={s.label} className="relative py-12 sm:py-0">
              {/* Vertical divider */}
              {i > 0 && (
                <div
                  ref={(el) => {
                    dividerRefs.current[i] = el;
                  }}
                  className="absolute left-0 top-1/2 hidden h-16 w-px -translate-y-1/2 origin-top bg-[#C5A880]/15 sm:block"
                />
              )}

              <div className="flex flex-col items-center">
                <span
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  className="block font-serif text-6xl font-extralight text-[#C5A880] sm:text-7xl lg:text-8xl"
                >
                  00{s.suffix}
                </span>
                <p className="mt-5 text-[10px] uppercase tracking-[0.45em] text-[#E8DED0]/40">
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decorative line */}
        <div
          ref={bottomLineRef}
          className="mx-auto mt-20 flex items-center gap-6"
        >
          <span className="h-px flex-1 bg-[#C5A880]/10" />
          <span className="text-[9px] uppercase tracking-[0.5em] text-[#C5A880]/30">
            and counting
          </span>
          <span className="h-px flex-1 bg-[#C5A880]/10" />
        </div>
      </div>
    </section>
  );
}