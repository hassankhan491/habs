"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FadeIn from "@/components/ui/FadeIn";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: "sourcing",
    title: "the sourcing",
    text: "Rare ingredients are hand-selected from the finest estates across the East. Aged ouds, Grasse roses, and pure musks form the foundation of our private olfactory library.",
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "maceration",
    title: "the maceration",
    text: "Time is our most vital ingredient. Oils rest in climate-controlled vaults for months, allowing the complex accords to mature, breathe, and deepen in character.",
    image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "blending",
    title: "the blending",
    text: "Master perfumers compose each formula drop by drop. It is a meticulous balance of art and science, ensuring every scent tells a cohesive, emotional story.",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "bottling",
    title: "the bottling",
    text: "Every flacon is hand-filled, inspected, and sealed in our Karachi atelier. This final human touch guarantees that no two bottles are exactly alike.",
    image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=1400&auto=format&fit=crop",
  },
];

export default function TheAtelier() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      stepRefs.current.forEach((step, index) => {
        if (!step) return;

        ScrollTrigger.create({
          trigger: step,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveStep(index),
          onEnterBack: () => setActiveStep(index),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0d0c0a] px-6 py-32 text-[#F5F0E8] sm:px-12 lg:px-24 lg:py-44"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <FadeIn>
          <div className="mb-20 flex flex-col items-start justify-between gap-8 border-b border-[#C5A880]/15 pb-8 lg:flex-row lg:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#C5A880]/60">
                the atelier
              </p>
              <h2 className="mt-4 font-serif text-4xl text-[#F5F0E8] sm:text-5xl lg:text-6xl">
                crafted by <span className="italic text-[#C5A880]">hand</span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-[1.9] text-[#E8DED0]/50">
              From raw ingredient to final flacon, every step of our process is 
              guided by patience, precision, and an unwavering commitment to the art of scent.
            </p>
          </div>
        </FadeIn>

        {/* Split Layout */}
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          
          {/* Left: Scrollable Steps */}
          <div className="flex flex-col space-y-32 lg:space-y-48">
            {steps.map((step, index) => {
              const isActive = index === activeStep;
              return (
                <div
                  key={step.id}
                  ref={(el) => { stepRefs.current[index] = el; }}
                  className="relative transition-opacity duration-700"
                  style={{ opacity: isActive ? 1 : 0.3 }}
                >
                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-[19px] top-16 bottom-[-128px] w-px bg-[#C5A880]/10 lg:left-[23px] lg:bottom-[-192px]" />
                  )}

                  <div className="flex gap-6 lg:gap-8">
                    {/* Number Circle */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#C5A880]/20 transition-all duration-500 lg:h-14 lg:w-14">
                      <span
                        className={`font-serif text-lg transition-colors duration-500 ${
                          isActive ? "text-[#C5A880]" : "text-[#C5A880]/30"
                        }`}
                      >
                        0{index + 1}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="pt-2 lg:pt-3">
                      <h3
                        className={`font-serif text-3xl transition-colors duration-500 sm:text-4xl ${
                          isActive ? "text-[#F5F0E8]" : "text-[#F5F0E8]/40"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`mt-6 max-w-md text-[15px] leading-[1.9] transition-colors duration-500 ${
                          isActive ? "text-[#E8DED0]/70" : "text-[#E8DED0]/30"
                        }`}
                      >
                        {step.text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Sticky Image Stage */}
          <div className="relative hidden lg:block">
            <div className="sticky top-32 h-[75vh] w-full overflow-hidden bg-[#161310]">
              {steps.map((step, index) => {
                const isActive = index === activeStep;
                return (
                  <div
                    key={step.id}
                    className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-105"
                    }`}
                  >
                    <Image
                      src={step.image}
                      alt={`The atelier process: ${step.title}`}
                      fill
                      sizes="45vw"
                      className="object-cover"
                      priority={index === 0}
                    />
                    {/* Subtle Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0a]/40 via-transparent to-transparent" />
                  </div>
                );
              })}

              {/* Floating Counter */}
              <div className="absolute bottom-8 right-8 flex items-center gap-4">
                <span className="font-serif text-2xl text-[#F5F0E8]/80">
                  0{activeStep + 1}
                </span>
                <span className="h-px w-12 bg-[#F5F0E8]/30" />
                <span className="text-[10px] uppercase tracking-[0.4em] text-[#F5F0E8]/50">
                  04
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}