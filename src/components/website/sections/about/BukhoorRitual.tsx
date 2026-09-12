"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";

const ritualTabs = [
  {
    title: "the gathering",
    desc: "Where creators and collectors meet to share ideas over slow-burning aromatic resins.",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "the smoke study",
    desc: "Testing wood density and resin retention for optimal aromatic dispersion.",
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "the quiet hours",
    desc: "Unwinding in the atelier after a full day of compounding raw extraits.",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1400&auto=format&fit=crop",
  },
];

export default function BukhoorRitual() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="bg-[#11100F] px-6 py-32 text-[#F5F0E8] sm:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <FadeIn>
              <span className="text-[10px] uppercase tracking-[0.5em] text-[#C5A880]">
                culture & tradition
              </span>
              <h2 className="mt-4 font-serif text-4xl sm:text-5xl">
                the bukhoor <span className="italic text-[#C5A880]">ritual</span>
              </h2>
              <p className="mt-6 text-sm leading-[2] text-[#E8DED0]/70">
                Beyond formulations, the daily bukhoor session is the heartbeat of our house. 
                It grounds our team, clears the palate, and invites slow, meaningful dialogue.
              </p>
            </FadeIn>

            <div className="mt-10 flex flex-col gap-4">
              {ritualTabs.map((tab, idx) => (
                <button
                  key={tab.title}
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center justify-between border-b pb-4 text-left transition-all ${
                    activeTab === idx
                      ? "border-[#C5A880] text-[#C5A880]"
                      : "border-[#C5A880]/15 text-[#E8DED0]/40 hover:text-[#E8DED0]"
                  }`}
                >
                  <span className="font-serif text-xl">{tab.title}</span>
                  <span className="text-[10px] uppercase tracking-[0.3em]">0{idx + 1}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative lg:col-span-7">
            <div className="relative aspect-[16/11] w-full overflow-hidden rounded-sm bg-[#161412]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={ritualTabs[activeTab].image}
                    alt={ritualTabs[activeTab].title}
                    fill
                    sizes="(max-width: 1024px) 92vw, 55vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11100F]/70 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <p className="text-sm text-[#E8DED0]/90">{ritualTabs[activeTab].desc}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}