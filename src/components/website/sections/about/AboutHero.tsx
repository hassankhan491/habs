"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function AboutHero() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, ease: "power3.out", delay: 0.2 }
      );
      gsap.fromTo(
        imgRef.current,
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.6, ease: "power3.out", delay: 0.4 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-[#11100F] px-6 pt-32 pb-20 text-[#F5F0E8] sm:px-12 lg:px-24 lg:pt-40"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-12">
        {/* Left Editorial Text */}
        <div ref={textRef} className="lg:col-span-6">
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-[#C5A880]" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-[#C5A880]">
              est. mmxxvi · karachi
            </span>
          </div>

          <h1 className="mt-8 font-serif text-5xl leading-[1.08] sm:text-6xl lg:text-7xl">
            the anatomy of <span className="italic text-[#C5A880]">scent</span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-[2] text-[#E8DED0]/70">
            SHAWQ is born from a uncompromising dedication to liquid poetry. 
            We bypass ordinary perfumery constraints, curating private extraits 
            that capture the depth of the East with modernist architectural precision.
          </p>

          <div className="mt-12 flex items-center gap-8">
            <div>
              <span className="block font-serif text-3xl text-[#C5A880]">100%</span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#E8DED0]/40">independent house</span>
            </div>
            <div className="h-10 w-px bg-[#C5A880]/20" />
            <div>
              <span className="block font-serif text-3xl text-[#C5A880]">Private</span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#E8DED0]/40">oil reserves</span>
            </div>
          </div>
        </div>

        {/* Right Floating Image Composition */}
        <div ref={imgRef} className="relative lg:col-span-6">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-[#1A1816] shadow-2xl">
            <Image
              src="/images/about-1.jpeg"
              alt="SHAWQ luxury extrait flacon"
              fill
              priority
              sizes="(max-width: 1024px) 92vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#11100F]/60 via-transparent to-transparent" />
          </div>

          {/* Floating secondary badge box */}
          <div className="absolute -bottom-6 -left-6 hidden rounded-sm border border-[#C5A880]/20 bg-[#161412]/90 p-6 backdrop-blur-md sm:block">
            <p className="font-serif text-lg text-[#C5A880]">Handcrafted flacons</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-[#E8DED0]/50">Karachi atelier</p>
          </div>
        </div>
      </div>
    </section>
  );
}