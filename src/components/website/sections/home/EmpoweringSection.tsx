"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const users = [
  { id: 1, src: "/images/NB-09.jpg", alt: "Perfume 1" },
  { id: 2, src: "/images/NB-10.jpg", alt: "Perfume 2" },
  { id: 3, src: "/images/NB-11.jpg", alt: "Perfume 3" },
  { id: 4, src: "/images/NB-12.jpg", alt: "Perfume 4" },
  { id: 5, src: "/images/NB-13.jpg", alt: "Perfume 5" },
  { id: 6, src: "/images/NB-08.jpg", alt: "Perfume 6" },
  { id: 7, src: "/images/NB-07.jpg", alt: "Perfume 7" },
  { id: 8, src: "/images/NB-05.jpg", alt: "Perfume 8" },
];

export default function EmpoweringSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement | null>(null);
  const arcRef = useRef<SVGCircleElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isMobile: "(max-width: 639px)",
          isTablet: "(min-width: 640px) and (max-width: 1023px)",
          isDesktop: "(min-width: 1024px)",
        },
        (context) => {
          const { isMobile, isTablet } = context.conditions as {
            isMobile: boolean;
            isTablet: boolean;
            isDesktop: boolean;
          };

          const maxRadius = isMobile ? 135 : isTablet ? 180 : 225;
          const ARC_CIRCUMFERENCE = 2 * Math.PI * maxRadius;

          if (arcRef.current) {
            gsap.set(arcRef.current, {
              strokeDasharray: ARC_CIRCUMFERENCE,
              strokeDashoffset: ARC_CIRCUMFERENCE,
            });
          }

          // Phase 1 Initial State: Cards are centered inside the inner ring (x: 0, y: 0)
          cardRefs.current.forEach((card, i) => {
            if (!card) return;
            gsap.set(card, {
              xPercent: -50,
              yPercent: -50,
              x: 0,
              y: 0, // Direct absolute center of the ring
              opacity: i === 0 ? 1 : 0,
              scale: 1,
            });
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=2000", // Fast & smooth scroll distance
              scrub: true,   // Direct 1:1 scroll coupling (stops when scroll stops)
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          // Phase 1 -> Phase 6: Expand cards outward from absolute center (0,0) to final ring radial coordinates
          cardRefs.current.forEach((card, i) => {
            if (!card) return;
            const angle = (i / users.length) * Math.PI * 2 - Math.PI / 2;
            const targetX = Math.cos(angle) * maxRadius;
            const targetY = Math.sin(angle) * maxRadius;

            tl.to(
              card,
              {
                x: targetX,
                y: targetY,
                opacity: 1,
                duration: 2,
                ease: "none",
              },
              0
            );
          });

          // Center text reveals smoothly during expansion
          if (textRef.current) {
            tl.to(
              textRef.current,
              {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: "power1.out",
              },
              0.3
            );
          }

          // Gold SVG stroke ring fills smoothly during scroll
          if (arcRef.current) {
            tl.to(
              arcRef.current,
              {
                strokeDashoffset: 0,
                duration: 2,
                ease: "none",
              },
              0
            );
          }

          // End padding buffer before releasing pin
          tl.to({}, { duration: 0.2 });
        }
      );
    }, section);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-[#0f0a08]">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/empower-bg.jpeg')" }}
      />

      <div className="absolute inset-0 z-0 bg-[#0f0a08]/50" />

      <div className="relative z-10 flex h-full w-full items-center justify-center">
        {/* INNER GOLD RING */}
        <div className="absolute pointer-events-none flex items-center justify-center">
          <svg
            className="w-[330px] h-[330px] sm:w-[440px] sm:h-[440px] lg:w-[510px] lg:h-[510px] overflow-visible"
            viewBox="0 0 510 510"
          >
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f0e4a8" />
                <stop offset="50%" stopColor="#d4b978" />
                <stop offset="100%" stopColor="#b8956a" />
              </linearGradient>

              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <circle
              cx="255"
              cy="255"
              r="225"
              fill="none"
              stroke="url(#goldGradient)"
              strokeWidth="3"
              opacity="0.6"
              filter="url(#glow)"
            />

            <circle
              ref={arcRef}
              cx="255"
              cy="255"
              r="225"
              fill="none"
              stroke="url(#goldGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              transform="rotate(-90 255 255)"
              filter="url(#glow)"
              style={{
                filter: "drop-shadow(0 0 8px rgba(212, 185, 120, 0.6))",
              }}
            />
          </svg>
        </div>

        {/* OUTER GOLD RING */}
        <div className="absolute pointer-events-none flex items-center justify-center">
          <svg
            className="w-[410px] h-[410px] sm:w-[540px] sm:h-[540px] lg:w-[610px] lg:h-[610px] overflow-visible"
            viewBox="0 0 610 610"
          >
            <circle
              cx="305"
              cy="305"
              r="275"
              fill="none"
              stroke="#d4b978"
              strokeWidth="2.5"
              opacity="0.5"
              style={{
                filter: "drop-shadow(0 0 4px rgba(212, 185, 120, 0.4))",
              }}
            />
          </svg>
        </div>

        {/* PERFUME CARDS */}
        {users.map((user, index) => (
          <div
            key={user.id}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className="absolute top-1/2 left-1/2 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-[#d4b978]/30 z-20 group cursor-pointer"
          >
            {/* Inner IMG: Safe for CSS Hover scale */}
            <img
              src={user.src}
              alt={user.alt}
              className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-115"
              loading="lazy"
            />
          </div>
        ))}

        {/* CENTER TEXT */}
        <div
          ref={textRef}
          className="relative z-10 text-center px-4 max-w-[220px] sm:max-w-[300px] md:max-w-[360px] pointer-events-none"
          style={{ opacity: 0, transform: "translateY(20px)" }}
        >
          <h2
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-[#f0e4a8] leading-[1.1] tracking-tight"
            style={{
              fontFamily: "var(--font-serif)",
              textShadow:
                "0 4px 20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(212, 185, 120, 0.3)",
            }}
          >
            SCENT IS
            <br />
            <span className="italic text-[var(--color-header-font)]">
              MEMORY
            </span>
          </h2>

          <p
            className="font-body text-[#e8e0d5] mt-2 sm:mt-3 md:mt-4 leading-relaxed font-light tracking-wide"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "16px",
              fontWeight: 400,
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.7)",
            }}
          >
            From royal oud to soft amber, Shawq crafts fragrances that speak
            your language.
          </p>
        </div>
      </div>
    </section>
  );
}