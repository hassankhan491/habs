"use client";

import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";

const chapters = [
  {
    n: "01",
    title: "the first drop",
    text: "Founded in MMXXVI with a single foundational maceration: aged Indian oud resting in pure Taif rose attar.",
    image: "/images/about-3.jpg",
    span: "lg:col-span-7",
  },
  {
    n: "02",
    title: "through the blends",
    text: "Pioneering new standards in luxury concentration, shaping how intense extraits wear across diverse climates.",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1400&auto=format&fit=crop",
    span: "lg:col-span-5",
  },
  {
    n: "03",
    title: "private commissions",
    text: "Expanding bespoke blending services for private collectors seeking personalized signature notes.",
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=1400&auto=format&fit=crop",
    span: "lg:col-span-5",
  },
  {
    n: "04",
    title: "the future horizon",
    text: "Continuing sustainable harvesting partnerships while maintaining absolute uncompromising quality in every batch.",
    image: "/images/about-4.jpeg",
    span: "lg:col-span-7",
  },
];

export default function StoryChapters() {
  return (
    <section className="bg-[#11100F] px-6 py-32 text-[#F5F0E8] sm:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="mb-20">
            <span className="text-[10px] uppercase tracking-[0.5em] text-[#C5A880]">
              chronicles
            </span>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">
              milestones of the <span className="italic text-[#C5A880]">house</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {chapters.map((c, i) => (
            <FadeIn key={c.n} delay={i * 0.1} className={`${c.span} flex flex-col justify-between`}>
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-[#1A1816] mb-6">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  sizes="(max-width: 1024px) 92vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880]">{c.n}</span>
                  <span className="h-px w-8 bg-[#C5A880]/30" />
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F0E8]">{c.title}</h3>
                <p className="mt-3 text-sm leading-[1.8] text-[#E8DED0]/60 max-w-xl">{c.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}