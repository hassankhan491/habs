"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 12, suffix: "", label: "signature extraits in library" },
  { value: 50, suffix: "k+", label: "bottles hand-poured globally" },
  { value: 3, suffix: "", label: "international flagship ateliers" },
];

export default function HouseNumbers() {
  const sectionRef = useRef<HTMLElement>(null);
  const refs = useRef<(HTMLSpanElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      stats.forEach((s, i) => {
        const el = refs.current[i];
        if (!el) return;
        const obj = { v: 0 };
        gsap.to(obj, {
          v: s.value,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v)).padStart(2, "0") + s.suffix;
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#161412] px-6 py-28 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="rounded-sm border border-[#C5A880]/15 bg-[#11100F] p-10 text-center transition-all duration-500 hover:border-[#C5A880]/40"
            >
              <span
                ref={(el) => { refs.current[i] = el; }}
                className="block font-serif text-6xl font-light text-[#C5A880] drop-shadow-[0_0_20px_rgba(197,168,128,0.15)] sm:text-7xl"
              >
                00{s.suffix}
              </span>
              <p className="mt-4 text-[10px] uppercase tracking-[0.4em] text-[#E8DED0]/50">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}