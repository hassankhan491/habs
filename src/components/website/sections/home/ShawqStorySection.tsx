"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const C = {
  red: "#C73234",
  black: "#0D0907",
  burgundy: "#2E0E12",
  deepRed: "#4A131B",
  gold: "#C9A962",
  goldGlow: "rgba(201, 169, 98, 0.15)",
};

export default function ShawqStorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgMeshRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  // Content Blocks
  const block1Ref = useRef<HTMLDivElement>(null);
  const block2Ref = useRef<HTMLDivElement>(null);
  const block4Ref = useRef<HTMLDivElement>(null);

  // Block 3 Elements
  const noteHeaderRef = useRef<HTMLDivElement>(null);
  const noteTopRef = useRef<HTMLDivElement>(null);
  const noteHeartRef = useRef<HTMLDivElement>(null);
  const noteBaseRef = useRef<HTMLDivElement>(null);

  // Rig & 3D Lighting Elements
  const rigRef = useRef<HTMLDivElement>(null);
  const bottleContainerRef = useRef<HTMLDivElement>(null);
  const bottleImgRef = useRef<HTMLImageElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMq.matches) return;

    const mm = gsap.matchMedia();

    // Subtle continuous luxury floating physics for the bottle
    const floatTween = gsap.to(bottleImgRef.current, {
      y: "-=12",
      rotationZ: "+=1.5",
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean };

        const rig = rigRef.current!;
        const bottleContainer = bottleContainerRef.current!;
        const shadow = shadowRef.current!;
        const bgMesh = bgMeshRef.current!;

        /* ---------- Initial States (Clean Offsets) ---------- */
        gsap.set(rig, {
          xPercent: -50,
          yPercent: -50,
          x: 0,
          y: isDesktop ? "-10vh" : "-12vh",
        });
        gsap.set(bottleContainer, {
          scale: isDesktop ? 0.9 : 0.8,
          rotationZ: 0,
        });
        gsap.set(shadow, { opacity: 0.35, scaleX: 0.6, scaleY: 0.6 });

        gsap.set([block1Ref.current, block2Ref.current, block4Ref.current], {
          opacity: 0,
          y: "30px",
          rotateX: -10,
        });

        gsap.set(
          [
            noteHeaderRef.current,
            noteTopRef.current,
            noteHeartRef.current,
            noteBaseRef.current,
          ],
          {
            opacity: 0,
            x: isDesktop ? "40px" : 0,
            y: isDesktop ? 0 : "30px",
          },
        );

        /* ---------- Master Cinematic Timeline ---------- */
        const tl = gsap.timeline({
          defaults: { ease: "power3.inOut" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: `+=${isDesktop ? 4800 : 3600}`,
            scrub: 1.2, // Smoother inertia scroll
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const step = Math.min(4, Math.floor(self.progress * 4) + 1);
              if (counterRef.current) {
                counterRef.current.textContent = `0${step} / 04`;
              }
            },
          },
        });

        /* ============================================================
           01 — UNVEILING: SHAWQ IS THE SCENT
           ============================================================ */
        tl.to(
          bgMesh,
          {
            background: `radial-gradient(circle at 50% 30%, ${C.burgundy} 0%, ${C.black} 75%)`,
            duration: 1,
          },
          0,
        )
          .to(rig, { y: isDesktop ? "-8vh" : "-10vh", duration: 1 }, 0)
          .to(bottleContainer, { scale: isDesktop ? 1 : 0.85, duration: 1 }, 0)
          .to(
            block1Ref.current,
            { opacity: 1, y: 0, rotateX: 0, duration: 0.8 },
            0.2,
          )
          .to(block1Ref.current, { opacity: 0, y: "20px", duration: 0.5 }, 1.2);

        /* ============================================================
           02 — PHILOSOPHY: FRAGRANCE IS IDENTITY
           ============================================================ */
        tl.to(
          bgMesh,
          {
            background: `radial-gradient(circle at 50% 60%, #1c080a 0%, ${C.black} 80%)`,
            duration: 1,
          },
          1.5,
        )
          .to(rig, { y: isDesktop ? "10vh" : "8vh", duration: 1 }, 1.5)
          .to(
            bottleContainer,
            { scale: isDesktop ? 1.08 : 0.95, rotationZ: -2, duration: 1 },
            1.5,
          )
          .to(shadow, { opacity: 0.6, scaleX: 1.15, duration: 1 }, 1.5)
          .to(
            block2Ref.current,
            { opacity: 1, y: 0, rotateX: 0, duration: 0.8 },
            1.7,
          )
          .to(block2Ref.current, { opacity: 0, y: "-20px", duration: 0.5 }, 2.7)
          .to(bottleContainer, { rotationZ: 0, duration: 0.5 }, 2.7);

        /* ============================================================
           03 — OLFACTORY CRAFT: STAGGERED NOTES REVEAL
           ============================================================ */
        tl.to(
          bgMesh,
          {
            background: `radial-gradient(circle at 30% 50%, ${C.deepRed} 0%, ${C.black} 80%)`,
            duration: 1,
          },
          3.0,
        )
          .to(
            rig,
            {
              x: isDesktop ? "-22vw" : 0,
              y: isDesktop ? "0" : "-16vh",
              duration: 1,
            },
            3.0,
          )
          .to(
            bottleContainer,
            { scale: isDesktop ? 0.85 : 0.7, duration: 1 },
            3.0,
          )
          // Staggered Note Rows
          .to(
            noteHeaderRef.current,
            { opacity: 1, x: 0, y: 0, duration: 0.5 },
            3.1,
          )
          .to(
            noteTopRef.current,
            { opacity: 1, x: 0, y: 0, duration: 0.5 },
            3.3,
          )
          .to(
            noteHeartRef.current,
            { opacity: 1, x: 0, y: 0, duration: 0.5 },
            3.5,
          )
          .to(
            noteBaseRef.current,
            { opacity: 1, x: 0, y: 0, duration: 0.5 },
            3.7,
          )
          // Clean Exit
          .to(
            [
              noteHeaderRef.current,
              noteTopRef.current,
              noteHeartRef.current,
              noteBaseRef.current,
            ],
            {
              opacity: 0,
              x: isDesktop ? "-20px" : 0,
              duration: 0.5,
              stagger: 0.08,
            },
            4.5,
          );

        /* ============================================================
           04 — IMPRESSION: A SCENT THAT REMAINS
           ============================================================ */
        tl.to(
          bgMesh,
          {
            background: `radial-gradient(circle at 50% 40%, ${C.burgundy} 0%, ${C.black} 85%)`,
            duration: 1,
          },
          4.8,
        )
          .to(rig, { x: 0, y: isDesktop ? "-14vh" : "-16vh", duration: 1 }, 4.8)
          .to(
            bottleContainer,
            { scale: isDesktop ? 0.85 : 0.72, duration: 1 },
            4.8,
          )
          .to(shadow, { opacity: 0.4, scaleX: 0.9, duration: 1 }, 4.8)
          .to(
            block4Ref.current,
            { opacity: 1, y: 0, rotateX: 0, duration: 0.8 },
            5.0,
          )
          .set({}, {}, 5.8);
      },
    );

    return () => {
      floatTween.kill();
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden text-[#FAF8F3] select-none"
      style={{ backgroundColor: C.black }}
      aria-label="Shawq Fragrance Story"
    >
      {/* Dynamic Lighting & Atmospheric Radial Canvas */}
      <div
        ref={bgMeshRef}
        className="absolute inset-0 transition-all duration-700 ease-out will-change-[background]"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${C.burgundy} 0%, ${C.black} 75%)`,
        }}
      />

      {/* Persistent Corner Details */}
      <div className="absolute left-6 top-8 z-40 mix-blend-difference md:left-12 md:top-10">
        <span
          ref={counterRef}
          className="block font-mono text-xs font-medium tracking-[0.35em] text-[#C9A962]"
        >
          01 / 04
        </span>
        <span className="mt-1 block text-[9px] font-light tracking-[0.4em] text-white/50 uppercase">
          Shawq Fragrances
        </span>
      </div>

      <div className="absolute right-6 top-8 z-40 mix-blend-difference md:right-12 md:top-10 text-right">
        <span className="block text-[9px] font-light tracking-[0.4em] text-white/50 uppercase">
          Extrait De Parfum
        </span>
        <span className="mt-1 block font-mono text-[9px] tracking-[0.2em] text-[#C9A962]/80">
          50ML / 1.7 FL. OZ.
        </span>
      </div>

      {/* 01 — THIS IS SHAWQ */}
      <div
        ref={block1Ref}
        className="pointer-events-none absolute inset-x-0 bottom-[8vh] z-30 flex flex-col items-center px-6 text-center md:bottom-[10vh] [perspective:1000px]"
      >
        <span className="text-xs font-medium tracking-[0.45em] text-[#C9A962] uppercase mb-2">
          01 — Unveiling
        </span>
        <h2
          className="text-4xl font-light tracking-wide md:text-7xl"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          SHAWQ IS THE SCENT
        </h2>
        <p className="mt-3 max-w-md text-xs font-light tracking-[0.22em] text-[#F4EFE7]/70 uppercase md:text-sm">
          An invisible statement of identity, tailored for those who leave an
          undeniable mark.
        </p>
      </div>

      {/* 02 — FRAGRANCE IS IDENTITY */}
      <div
        ref={block2Ref}
        className="pointer-events-none absolute inset-x-0 top-[10vh] z-30 flex flex-col items-center px-4 text-center md:top-[12vh] [perspective:1000px]"
      >
        <span className="text-xs font-medium tracking-[0.45em] text-[#C9A962] uppercase mb-2">
          02 — Philosophy
        </span>
        <p
          className="text-[9vw] leading-[0.92] tracking-tight md:text-[6.5vw]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          FRAGRANCE IS
        </p>
        <p
          className="text-[9vw] leading-[0.92] text-[#C73234] italic md:text-[6.5vw]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          IDENTITY.
        </p>
      </div>

      {/* 03 — HOW SHAWQ CREATES THAT IDENTITY */}
      <div className="pointer-events-none absolute inset-x-6 bottom-[8vh] z-30 space-y-6 md:inset-x-auto md:bottom-auto md:right-[8vw] md:top-1/2 md:-translate-y-1/2 md:space-y-8">
        <div ref={noteHeaderRef} className="mb-2 md:text-right">
          <span className="text-xs font-medium tracking-[0.45em] text-[#C9A962] uppercase">
            03 — The Olfactory Craft
          </span>
        </div>

        <div
          ref={noteTopRef}
          className="group flex items-center gap-5 border-b border-white/10 pb-3 md:justify-end md:border-b-0 md:pb-0"
        >
          <span className="font-mono text-xl text-[#C73234] md:text-2xl">
            01
          </span>
          <div className="md:text-right">
            <p className="text-[9px] font-medium tracking-[0.35em] text-white/40 uppercase">
              Top Accent
            </p>
            <p
              className="text-lg md:text-2xl font-light"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Bergamot · Pink Pepper
            </p>
          </div>
        </div>

        <div
          ref={noteHeartRef}
          className="group flex items-center gap-5 border-b border-white/10 pb-3 md:justify-end md:border-b-0 md:pb-0"
        >
          <span className="font-mono text-xl text-[#C73234] md:text-2xl">
            02
          </span>
          <div className="md:text-right">
            <p className="text-[9px] font-medium tracking-[0.35em] text-white/40 uppercase">
              Heart Core
            </p>
            <p
              className="text-lg md:text-2xl font-light"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Damask Rose · Saffron
            </p>
          </div>
        </div>

        <div
          ref={noteBaseRef}
          className="group flex items-center gap-5 md:justify-end"
        >
          <span className="font-mono text-xl text-[#C73234] md:text-2xl">
            03
          </span>
          <div className="md:text-right">
            <p className="text-[9px] font-medium tracking-[0.35em] text-white/40 uppercase">
              Base Trail
            </p>
            <p
              className="text-lg md:text-2xl font-light"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Aged Oud · Amber · Vanilla
            </p>
          </div>
        </div>
      </div>

      {/* 04 — THE FEELING WE WANT YOU TO REMEMBER */}
      <div
        ref={block4Ref}
        className="pointer-events-none absolute inset-x-0 bottom-[8vh] z-30 flex flex-col items-center px-6 text-center md:bottom-[10vh] [perspective:1000px]"
      >
        <span className="mb-2 text-xs font-medium tracking-[0.45em] text-[#C9A962] uppercase">
          04 — The Impression
        </span>

        <h3
          className="text-3xl font-light leading-tight md:text-6xl"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          A Scent That Remains
        </h3>

        <p className="mt-2 max-w-sm text-xs font-light tracking-[0.2em] text-white/70 uppercase md:text-sm">
          Long after you leave the room.
        </p>

        <a
          href="/products"
          className="pointer-events-auto mt-8 relative group overflow-hidden rounded-none border border-[#C9A962]/50 bg-[#0D0907]/60 px-9 py-4 inline-flex items-center justify-center text-xs font-medium tracking-[0.35em] text-[#FAF8F3] uppercase backdrop-blur-md transition-all duration-500 hover:border-[#C9A962] hover:shadow-[0_0_25px_rgba(201,169,98,0.3)]"
        >
          <span className="relative z-10 transition-colors duration-500 group-hover:text-[#0D0907]">
            Explore The Signature
          </span>
          <div className="absolute inset-0 z-0 bg-[#C9A962] translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0" />
        </a>
      </div>

      {/* Stage Rig & Bottle Assembly */}
      <div
        ref={rigRef}
        className="absolute left-1/2 top-1/2 z-20 will-change-transform"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        {/* Dynamic Floor Projection Shadow */}
        <div className="absolute left-1/2 top-[92%] -translate-x-1/2 pointer-events-none">
          <div
            ref={shadowRef}
            className="h-10 w-[55vw] max-w-[340px] rounded-[100%] md:h-12"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 40%, transparent 75%)",
              filter: "blur(12px)",
            }}
          />
        </div>

        {/* Scalable Container for GSAP Scroll Scaling */}
        <div ref={bottleContainerRef} className="will-change-transform">
          {/* Floating Element targeted by GSAP idle Physics */}
          <img
            ref={bottleImgRef}
            src="/images/shawq-bottle2.png"
            alt="Shawq Extrait de Parfum Bottle"
            className="block h-auto w-[48vw] max-w-[300px] select-none drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)] md:w-[26vw] md:max-w-[420px]"
            draggable={false}
          />
        </div>
      </div>

      {/* Tactical Film Grain & Vignette Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-50 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-40 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(0,0,0,0.4)_100%)]"
      />
    </section>
  );
}
