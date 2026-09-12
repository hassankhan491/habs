"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

const products = [
  {
    id: 1,
    brand: "PUMA",
    name: "SPRING STEP",
    headline: ["UNMATCHED COMFORT", "PREMIUM DESIGN", "ULTIMATE SPEED"],
    price: "€189",
    heroImage: "/images/nikww.png",
    cardImage: "/images/onee.png",
    theme: { bg: "#0f0c1b", glow1: "#00f2fe", glow2: "#7928ca", accent: "#38ef7d" },
  },
  {
    id: 2,
    brand: "PUMA",
    name: "L'ARTISTE",
    headline: ["UNMATCHED COMFORT", "PREMIUM DESIGN", "ULTIMATE SPEED"],
    price: "€245",
    heroImage: "/images/twoo.png",
    cardImage: "/images/twoo.png",
    theme: { bg: "#060f12", glow1: "#00c853", glow2: "#0288d1", accent: "#00e676" },
  },
  {
    id: 3,
    brand: "PUMA",
    name: "FLEXUS",
    price: "€199",
    headline: ["UNMATCHED COMFORT", "PREMIUM DESIGN", "ULTIMATE SPEED"],
    heroImage: "/images/threee.png",
    cardImage: "/images/threee.png",
    theme: { bg: "#070b19", glow1: "#1d4ed8", glow2: "#f43f5e", accent: "#60a5fa" },
  },
  {
    id: 4,
    brand: "PUMA",
    name: "CA PRO LUX",
    price: "€154",
    headline: ["UNMATCHED COMFORT", "PREMIUM DESIGN", "ULTIMATE SPEED"],
    heroImage: "/images/fourr.png",
    cardImage: "/images/fourr.png",
    theme: { bg: "#18090c", glow1: "#9f1239", glow2: "#d97706", accent: "#fb7185" },
  },
  {
    id: 5,
    brand: "PUMA",
    name: "SUEDE XL",
    price: "€179",
    headline: ["UNMATCHED COMFORT", "PREMIUM DESIGN", "ULTIMATE SPEED"],
    heroImage: "/images/onee.png",
    cardImage: "/images/onee.png",
    theme: { bg: "#0e1117", glow1: "#3b82f6", glow2: "#64748b", accent: "#93c5fd" },
  },
];

const displayProducts = [...products, ...products, ...products];

export default function HeroBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const glow1Ref = useRef<HTMLDivElement>(null);
  const glow2Ref = useRef<HTMLDivElement>(null);
  const shoeContainerRef = useRef<HTMLDivElement>(null);
  const shoeShadowRef = useRef<HTMLDivElement>(null);
  const textLinesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [currentIndex, setCurrentIndex] = useState(products.length);

  const activeProductIndex = (currentIndex + 1) % products.length;
  const activeProduct = products[activeProductIndex];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      gsap.set(bgTextRef.current, { opacity: 0, scale: 1.15, y: 30 });
      gsap.set(textLinesRef.current, { y: 60, opacity: 0 });
      gsap.set(shoeContainerRef.current, { opacity: 0, scale: 0.6, y: 80, rotateZ: -12 });
      gsap.set(cardRefs.current.filter(Boolean), { opacity: 0, y: 50, scale: 0.9 });

      tl.to(bgTextRef.current, { opacity: 0.08, scale: 1, y: 0, duration: 2, ease: "power4.out" })
        .to(textLinesRef.current, { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power4.out" }, "-=1.6")
        .to(shoeContainerRef.current, { opacity: 1, scale: 1, y: 0, rotateZ: 0, duration: 1.8, ease: "elastic.out(1, 0.75)" }, "-=1.2")
        .to(cardRefs.current.filter(Boolean), { opacity: 1, y: 0, scale: 1, duration: 1, stagger: 0.1, ease: "power3.out" }, "-=1.0");

      gsap.to(shoeContainerRef.current, { y: -15, rotateZ: 2, duration: 3.5, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to(shoeShadowRef.current, { scale: 0.85, opacity: 0.15, duration: 3.5, ease: "sine.inOut", yoyo: true, repeat: -1 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.to(sectionRef.current, { backgroundColor: activeProduct.theme.bg, duration: 1.2, ease: "power2.out" });
    if (glow1Ref.current) gsap.to(glow1Ref.current, { backgroundColor: activeProduct.theme.glow1, duration: 1.4, ease: "power2.out" });
    if (glow2Ref.current) gsap.to(glow2Ref.current, { backgroundColor: activeProduct.theme.glow2, duration: 1.4, ease: "power2.out" });

    if (shoeContainerRef.current) {
      gsap.fromTo(shoeContainerRef.current, { scale: 0.88, opacity: 0.3, rotateZ: -6 }, { scale: 1, opacity: 1, rotateZ: 0, duration: 0.7, ease: "power3.out" });
    }
  }, [activeProductIndex, activeProduct]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 2;
    const y = (e.clientY / innerHeight - 0.5) * 2;

    if (bgTextRef.current) gsap.to(bgTextRef.current, { x: x * 30, y: y * 30, duration: 1.2, ease: "power2.out" });
    if (shoeContainerRef.current) gsap.to(shoeContainerRef.current, { rotateY: x * 12, rotateX: -y * 12, x: x * 10, y: y * 10, duration: 1, ease: "power2.out" });
  };

  const handleNext = () => setCurrentIndex((prev) => (prev >= displayProducts.length - 3 ? products.length : prev + 1));
  const handlePrev = () => setCurrentIndex((prev) => (prev <= 0 ? products.length - 1 : prev - 1));

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen max-h-screen bg-[#0f0c1b] text-white overflow-hidden flex flex-col justify-between selection:bg-white selection:text-black transition-colors duration-700 font-['Syne',sans-serif]"
    >
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap" rel="stylesheet" />

      {/* Dynamic Background Glows */}
      <div ref={glow1Ref} className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] lg:w-[650px] h-[300px] sm:h-[500px] lg:h-[650px] bg-[#00f2fe]/20 rounded-full blur-[100px] sm:blur-[150px] pointer-events-none transition-colors duration-700" />
      <div ref={glow2Ref} className="absolute bottom-5 left-5 w-[250px] sm:w-[350px] lg:w-[450px] h-[250px] sm:h-[350px] lg:h-[450px] bg-[#7928ca]/20 rounded-full blur-[90px] sm:blur-[130px] pointer-events-none transition-colors duration-700" />

      {/* Watermark */}
      <div ref={bgTextRef} className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <span className="text-[30vw] lg:text-[24vw] font-black text-white/5 tracking-tighter leading-none uppercase stroke-text">HABS</span>
      </div>

      {/* Main Container */}
      <div className="relative z-20 flex-1 grid grid-cols-1 lg:grid-cols-12 items-center px-6 sm:px-12 lg:px-16 pt-16 sm:pt-20 lg:pt-12 pb-2 max-w-[1920px] mx-auto w-full h-full">
        
        {/* Left Column Text */}
        <div className="lg:col-span-6 flex flex-col justify-center gap-3 sm:gap-4 z-20 mt-6 lg:mt-8 text-center lg:text-left items-center lg:items-start w-full">
          <span className="text-xs sm:text-sm font-mono tracking-widest uppercase transition-colors duration-500" style={{ color: activeProduct.theme.accent }}>
            {activeProduct.brand} // {activeProduct.name}
          </span>

          <div className="flex flex-col space-y-1 font-extrabold uppercase tracking-tight leading-[0.92] w-full max-w-full">
            {activeProduct.headline.map((text, i) => (
              <div key={`${activeProduct.id}-${i}`} className="w-full">
                <span
                  ref={(el) => { textLinesRef.current[i] = el; }}
                  className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/60 text-[clamp(1.8rem,3.8vw,3.8rem)]"
                >
                  {text}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/products"
              className="inline-flex items-center gap-3 px-6 sm:px-7 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white font-semibold text-xs sm:text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
            >
              <span>Discover {activeProduct.name}</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Shoe Image Column */}
        <div className="lg:col-span-6 relative flex items-center justify-center h-full perspective-1000 z-10">
          <div ref={shoeContainerRef} className="relative w-full max-w-[280px] sm:max-w-[420px] lg:max-w-[540px] xl:max-w-[600px] transform-gpu" style={{ transformStyle: "preserve-3d" }}>
            <div ref={shoeShadowRef} className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[70%] h-6 bg-black/80 rounded-[100%] blur-xl" />
            <Image
              src={activeProduct.heroImage}
              alt={activeProduct.name}
              width={1000}
              height={750}
              priority
              className="w-full h-auto object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.6)]"
            />
          </div>
        </div>
      </div>

      {/* Carousel Track */}
      <div className="relative z-30 px-6 sm:px-12 lg:px-16 pb-6 pt-2 max-w-[1920px] mx-auto w-full flex justify-center lg:justify-end">
        <div className="relative w-full sm:w-[500px] lg:w-[630px] xl:w-[680px]">
          <button
            onClick={handlePrev}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-white text-black shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label="Previous Products"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-white text-black shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label="Next Products"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          <div className="w-full overflow-hidden rounded-[1.8rem] py-1">
            <div
              className="flex items-center gap-4 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / 3 + 0.9)}%)` }}
            >
              {displayProducts.map((product, index) => {
                const isCenter = index === currentIndex + 1;
                return (
                  <div
                    key={`${product.id}-${index}`}
                    ref={(el) => { cardRefs.current[index] = el; }}
                    onClick={() => setCurrentIndex(index - 1)}
                    className="w-[calc((100%-2rem)/3)] flex-shrink-0"
                  >
                    <VerticalProductCard product={product} isActive={isCenter} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .stroke-text {
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.08);
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
}

function VerticalProductCard({ product, isActive }: { product: any; isActive: boolean }) {
  return (
    <div
      className={`group relative h-[210px] w-full rounded-[1.8rem] p-4 flex flex-col justify-between shadow-2xl backdrop-blur-xl transition-all duration-500 cursor-pointer overflow-hidden ${
        isActive
          ? "bg-white text-black scale-100 shadow-[0_20px_40px_rgba(0,0,0,0.5)] border-2 border-white opacity-100"
          : "bg-white/20 text-white/70 scale-95 opacity-50 hover:opacity-80 border border-white/10"
      }`}
    >
      <div className="z-10 flex items-center justify-between">
        <h4 className={`text-[11px] font-black tracking-wider uppercase truncate ${isActive ? "text-black" : "text-white"}`}>
          {product.name}
        </h4>
      </div>

      <div className="relative w-full h-[95px] my-auto flex items-center justify-center z-10">
        <div className={`absolute bottom-1 w-16 h-2.5 rounded-full blur-sm transition-all duration-500 ${isActive ? "bg-black/15" : "bg-black/40"}`} />
        <Image
          src={product.cardImage}
          alt={product.name}
          width={150}
          height={100}
          className={`object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.2)] transition-all duration-500 ${
            isActive ? "scale-110 -rotate-3" : "scale-90"
          }`}
        />
      </div>

      <div className="flex items-center justify-between z-10">
        <span className={`text-xs font-black ${isActive ? "text-black" : "text-white"}`}>
          {product.price}
        </span>

        <button
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
            isActive ? "bg-black text-white" : "bg-white/20 text-white border border-white/20"
          }`}
          aria-label="Select Product"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
          </svg>
        </button>
      </div>
    </div>
  );
}