// components/layout/Preloader.tsx
"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

let isFirstLoad = true;

export default function Preloader() {
  const pathname = usePathname();
  
  const [done, setDone] = useState(true);
  const [mounted, setMounted] = useState(false);

  const countRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    if (pathname !== "/") {
      setDone(true);
      isFirstLoad = false;
      return;
    }

    if (!isFirstLoad) {
      setDone(true);
      return;
    }

    setDone(false);
  }, [pathname]);

  useLayoutEffect(() => {
    if (!mounted || done || pathname !== "/") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }

    const lenis = (window as any).__lenis;
    lenis?.stop();
    document.body.style.overflow = "hidden";

    let isTimelineStarted = false;
    let ctx: gsap.Context | null = null;
    let rafId: number;
    let safetyTimeout: NodeJS.Timeout;

    const startPreloader = () => {
      if (isTimelineStarted) return;
      isTimelineStarted = true;
      clearTimeout(safetyTimeout);

      rafId = requestAnimationFrame(() => {
        ctx = gsap.context(() => {
          const counter = { v: 0 };

          const tl = gsap.timeline({
            onComplete: () => {
              document.body.style.overflow = "";
              lenis?.start();
              setDone(true);
              isFirstLoad = false;
            },
          });

          gsap.set(".ld-content-group", { opacity: 1, y: 0 });
          gsap.set(".ld-image-wrapper", { scale: 1, filter: "brightness(0.7)" });
          gsap.set(".ld-line-progress", { scaleX: 0, transformOrigin: "left center" });

          tl.to(counter, {
            v: 100,
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate: () => {
              if (countRef.current) {
                countRef.current.textContent = `LOADING SCENE... ${Math.round(counter.v)}%`;
              }
            },
          }, 0)
          .to(".ld-line-progress", {
            scaleX: 1,
            duration: 1.5,
            ease: "power2.inOut",
          }, 0) // Animate scaleX alongside the counter
          .to(".ld-content-group", {
            opacity: 0,
            y: -15,
            duration: 0.4,
            ease: "power2.in",
          })
          .to(".ld-image-wrapper", {
            scale: 1.12,
            filter: "brightness(1)",
            duration: 1.1,
            ease: "power3.inOut",
          }, "-=0.2")
          .to(containerRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
          }, "-=0.3");
        }, containerRef);
      });
    };

    const imgSrc = window.innerWidth < 768 ? "/images/loader-mob.jpg" : "/images/loader.webp";
    const img = new Image();
    img.src = imgSrc;
    img.decoding = "async"; 
    img.fetchPriority = "high"; 

    const initPreloader = async () => {
      try {
        await img.decode();
      } catch (e) {
        console.warn("Image decode failed, starting anyway", e);
      }
      
      if (document.fonts && document.fonts.status === "loading") {
        await document.fonts.ready;
      }

      startPreloader();
    };

    if (img.complete) {
      initPreloader();
    } else {
      img.onload = initPreloader;
      img.onerror = initPreloader; 
    }

    safetyTimeout = setTimeout(initPreloader, 2000);

    return () => {
      clearTimeout(safetyTimeout);
      cancelAnimationFrame(rafId);
      if (ctx) {
        ctx.revert();
      }
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [done, pathname, mounted]);

  if (!mounted || done) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0f0e0d] overflow-hidden pointer-events-auto px-4 sm:px-6"
      aria-hidden="true"
    >
      {/* Background Image Container */}
      <div className="ld-image-wrapper absolute inset-0 overflow-hidden">
        <picture className="absolute inset-0 h-full w-full">
          <source media="(max-width: 767px)" srcSet="/images/loader-mob.jpg" />
          <img
            src="/images/loader.webp"
            alt="Preloader background"
            decoding="async"
            fetchPriority="high"
            className="h-full w-full object-cover object-center filter brightness-[0.7]"
            draggable={false}
          />
        </picture>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Central Content Layout */}
      <div className="ld-content-group relative z-10 flex flex-col items-center text-center px-4 max-w-xl sm:max-w-2xl mx-auto w-full">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.35em] text-[#E8DED0]/80 font-light mb-2 sm:mb-3">
          WELCOME TO THE
        </span>
        
        <h1 
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal uppercase tracking-[0.1em] sm:tracking-[0.12em] text-[#F5F0E8] mb-6 sm:mb-8 leading-tight"
          style={{ fontFamily: "var(--font-decorative)" }}
        >
          SHAWQ HOUSE
        </h1>

        <div className="w-48 sm:w-64 flex flex-col items-center gap-2.5 sm:gap-3">
          <span
            ref={countRef}
            className="text-[9px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#C5A880]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            LOADING SCENE... 0%
          </span>
          
          {/* Progress bar container */}
          <div className="relative h-[2px] w-full overflow-visible bg-white/20 rounded-full">
            {/* Glowing animated line */}
            <div
              className="ld-line-progress absolute inset-y-0 left-0 w-full h-full bg-[#C5A880] shadow-[0_0_12px_#C5A880,0_0_4px_#E8DED0]"
            />
          </div>
        </div>
      </div>

      {/* Bottom Center Brand Badge */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/80 border border-white/20 flex items-center justify-center text-white text-xs font-semibold tracking-wider shadow-lg backdrop-blur-md">
          S.
        </div>
      </div>
    </div>
  );
}