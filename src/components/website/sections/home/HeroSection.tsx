"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HEADER_HEIGHT = 80;

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const videoWrapRef = useRef<HTMLDivElement | null>(null);
  const line1Ref = useRef<HTMLDivElement | null>(null);
  const line2Ref = useRef<HTMLDivElement | null>(null);
  const fadeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // DESKTOP
      mm.add("(min-width: 640px)", () => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=1450",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            onEnter: () =>
              window.dispatchEvent(
                new CustomEvent("hero-state", { detail: { active: true } }),
              ),
            onLeave: () =>
              window.dispatchEvent(
                new CustomEvent("hero-state", { detail: { active: false } }),
              ),
            onEnterBack: () =>
              window.dispatchEvent(
                new CustomEvent("hero-state", { detail: { active: true } }),
              ),
            onLeaveBack: () =>
              window.dispatchEvent(
                new CustomEvent("hero-state", { detail: { active: false } }),
              ),
          },
        });

        tl.to(
          fadeRef.current,
          { opacity: 0, y: -40, duration: 0.5, ease: "power1.out" },
          0.35,
        )
          .to(
            line1Ref.current,
            { x: "-45vw", opacity: 0, duration: 1, ease: "power2.inOut" },
            0,
          )
          .to(
            line2Ref.current,
            { x: "45vw", opacity: 0, duration: 1, ease: "power2.inOut" },
            0,
          )
          .to(
            videoWrapRef.current,
            {
              width: Math.round(vw * 0.9),
              height: Math.round(vh * 0.88),
              borderRadius: 16,
              duration: 1.6,
              ease: "power2.inOut",
            },
            0.1,
          )
          .to(
            bgRef.current,
            { opacity: 0.25, scale: 1.08, duration: 1.6, ease: "power2.inOut" },
            0.1,
          );
      });

      // MOBILE
      mm.add("(max-width: 639px)", () => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=900",
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            onEnter: () =>
              window.dispatchEvent(
                new CustomEvent("hero-state", { detail: { active: true } }),
              ),
            onLeave: () =>
              window.dispatchEvent(
                new CustomEvent("hero-state", { detail: { active: false } }),
              ),
            onEnterBack: () =>
              window.dispatchEvent(
                new CustomEvent("hero-state", { detail: { active: true } }),
              ),
            onLeaveBack: () =>
              window.dispatchEvent(
                new CustomEvent("hero-state", { detail: { active: false } }),
              ),
          },
        });

        tl.to(
          fadeRef.current,
          { opacity: 0, y: -30, duration: 0.45, ease: "power1.out" },
          0.3,
        )
          .to(
            line1Ref.current,
            { x: "-110vw", opacity: 0, duration: 0.95, ease: "power2.inOut" },
            0,
          )
          .to(
            line2Ref.current,
            { x: "110vw", opacity: 0, duration: 0.95, ease: "power2.inOut" },
            0,
          )
          .to(
            videoWrapRef.current,
            {
              width: Math.round(vw * 0.88),
              height: Math.round(vh * 0.62),
              borderRadius: 14,
              duration: 1.45,
              ease: "power2.inOut",
            },
            0.1,
          )
          .to(
            bgRef.current,
            {
              opacity: 0.25,
              scale: 1.06,
              duration: 1.45,
              ease: "power2.inOut",
            },
            0.1,
          );
      });

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, []);

  // Responsive background positioning
  useEffect(() => {
    const setBg = () => {
      if (!bgRef.current) return;
      const width = window.innerWidth;
      bgRef.current.style.backgroundPosition =
        width < 640 ? "75% center" : width < 1024 ? "60% 30%" : "center 30%";
    };
    setBg();
    window.addEventListener("resize", setBg);
    return () => window.removeEventListener("resize", setBg);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero-banner"
      className="relative h-screen overflow-hidden bg-[#0f0a08]"
      style={{
        marginTop: `-${HEADER_HEIGHT}px`,
        height: `calc(100svh + ${HEADER_HEIGHT}px)`,
      }}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-[url('/images/new.png')] bg-cover bg-no-repeat will-change-transform"
        style={{ backgroundPosition: "center 30%" }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f0a08]/80 via-[#0f0a08]/30 to-[#0f0a08]/80" />

      {/* Content Container */}
      <div
        className="absolute left-0 right-0 flex flex-col items-center justify-center"
        style={{
          top: `${HEADER_HEIGHT}px`,
          bottom: 0,
          transform: "translateY(-8%)",
        }}
      >
        {/* Video Card */}
        <div
          ref={videoWrapRef}
          className="absolute inset-0 m-auto z-10 w-[260px] h-[360px] sm:w-[300px] sm:h-[420px] md:w-[380px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl shadow-black/60 will-change-transform"
        >
          <video
            src="/videos/main-hero-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Main Hero Headings & Branding with mix-blend-mode */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none text-center mix-blend-difference">
          <div className="absolute top-[12%] flex flex-col items-center gap-1 uppercase">
            <span className="text-[#c9a962] text-[10px] sm:text-xs tracking-[0.4em] font-medium">
              SHAWQ
            </span>
            <span className="text-[#e8e0d5]/80 text-[8px] sm:text-[9px] tracking-[0.35em]">
              FRAGRANCE HOUSE
            </span>
          </div>

          <div className="flex flex-col items-center leading-[0.95] px-5">
            <div
              ref={line1Ref}
              className="font-serif font-light text-[clamp(2.7rem,8vw,7rem)] text-[#f5f0eb] whitespace-nowrap"
            >
              Find the Scent
            </div>
            <div
              ref={line2Ref}
              className="font-serif font-light italic text-[clamp(2.7rem,8vw,7rem)] text-[#c73234] whitespace-nowrap"
            >
              That Becomes You
            </div>
          </div>
        </div>

        {/* Bottom CTA / Intro */}
        <div className="absolute inset-x-0 bottom-[8vh] z-20 flex justify-center">
          <div
            ref={fadeRef}
            className="flex flex-col items-center gap-4 text-center px-6"
          >
            <p
              className="text-[#f5f0eb] sm:text-[#cfc6bc] text-sm md:text-base max-w-md leading-relaxed drop-shadow-md font-medium"
              style={{
                fontFamily: "var(--font-body)",
                letterSpacing: "0.03em",
              }}
            >
              Distinctive compositions of oud, amber and rare botanicals made to
              linger beyond the moment.
            </p>

            <Link
              href="/products"
              className="pointer-events-auto inline-flex items-center justify-center min-h-[48px] px-9 sm:px-10 py-3 border border-[#C9A962] bg-[#0D0907]/60 text-[#C9A962] font-medium text-xs sm:text-sm tracking-[0.22em] uppercase rounded-none relative group overflow-hidden backdrop-blur-md transition-all duration-500 hover:border-[#C9A962] hover:shadow-[0_0_25px_rgba(201,169,98,0.3)]"
            >
              <span className="relative z-10 transition-colors duration-500 group-hover:text-[#0D0907]">
                Explore the Signature
              </span>
              <div className="absolute inset-0 z-0 translate-y-full bg-[#C9A962] transition-transform duration-500 ease-out group-hover:translate-y-0" />
            </Link>

            <div className="flex items-center gap-2 text-[#e8e0d5]/80 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase font-medium">
              <span>Scroll to Discover</span>
              <span className="text-[#c9a962] animate-bounce text-sm">↓</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
