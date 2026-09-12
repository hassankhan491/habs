"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const collectionProducts = [
  {
    id: 1,
    category: "FLORAL EDITIONS",
    name: "MIDNIGHT JASMINE SPRAY",
    price: "$299.00",
    image: "/images/NB-13.png",
  },
  {
    id: 2,
    category: "ESSENTIALS",
    name: "AMBER NOIR EXTRACT",
    price: "$279.00",
    image: "/images/NB-12.png",
  },
  {
    id: 3,
    category: "LIMITED EDITION",
    name: "GOLDEN MUSK ESSENCE",
    price: "$199.00",
    image: "/images/NB-14.png",
  },
];

export default function ProductGrid() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const colorImageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const cleanupFunctions: (() => void)[] = [];

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      const colorImage = colorImageRefs.current[index];
      const button = buttonRefs.current[index];

      if (!colorImage || !button) return;

      // Initial state
      gsap.set(colorImage, {
        clipPath: "circle(0% at 50% 50%)",
      });

      gsap.set(button, {
        opacity: 0,
        y: 12,
      });

      const handleMouseEnter = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();

        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        gsap.killTweensOf(colorImage);

        gsap.set(colorImage, {
          clipPath: `circle(0% at ${x}% ${y}%)`,
        });

        gsap.to(colorImage, {
          clipPath: `circle(150% at ${x}% ${y}%)`,
          duration: 0.65,
          ease: "power3.out",
        });

        gsap.killTweensOf(button);

        gsap.to(button, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power3.out",
        });
      };

      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();

        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        gsap.to(colorImage, {
          clipPath: `circle(150% at ${x}% ${y}%)`,
          duration: 1.35,
          ease: "power2.out",
          overwrite: true,
        });
      };

      const handleMouseLeave = () => {
        // Slow color disappearance
        gsap.killTweensOf(colorImage);

        gsap.to(colorImage, {
          clipPath: "circle(0% at 50% 50%)",
          duration: 1.35,
          ease: "power3.inOut",
        });

        // Slow button disappearance
        gsap.killTweensOf(button);

        gsap.to(button, {
          opacity: 0,
          y: 12,
          duration: 0.8,
          ease: "power2.inOut",
        });
      };

      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);

      cleanupFunctions.push(() => {
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      });
    });

    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <section className="relative w-full bg-white py-12 sm:py-16 lg:py-24">
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between border-b border-black/10 pb-5 sm:mb-10 lg:mb-10">
          <h3
            className="text-[9px] uppercase tracking-[0.3em] text-[#6f6a64] sm:text-[10px]"
            style={{
              fontFamily: "var(--font-body)",
            }}
          >
            OVERVIEW
          </h3>

          <button
            className="group flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] text-[#0f0a08] sm:gap-2 sm:text-[10px]"
            style={{
              fontFamily: "var(--font-body)",
            }}
          >
            VIEW COLLECTION
            <svg
              className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1 sm:h-3.5 sm:w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>

        {/* PRODUCT GRID */}
        <div
          className="
            grid
            grid-cols-1
            justify-items-center
            gap-6
            sm:gap-8
            md:grid-cols-2
            md:gap-8
            lg:grid-cols-3
            lg:gap-10
          "
        >
          {collectionProducts.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="
                relative
                w-full
                max-w-[350px]
                overflow-hidden
                border
                border-black/10
                bg-white

                h-[520px]
                sm:h-[540px]
                md:h-[565px]
                lg:h-[565px]
              "
            >
              {/* IMAGE */}
              <div
                className="
                  relative
                  w-full
                  overflow-hidden
                  bg-[#f1f1f1]

                  h-[365px]
                  sm:h-[385px]
                  md:h-[400px]
                  lg:h-[400px]
                "
              >
                {/* B&W BASE IMAGE */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 h-full w-full object-cover grayscale"
                />

                {/* COLOR IMAGE */}
                <img
                  ref={(el) => {
                    colorImageRefs.current[index] = el;
                  }}
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                {/* VIEW DETAILS */}
                <a
                  href={`/products/${product.id}`}
                  ref={(el) => {
                    buttonRefs.current[index] =
                      el as unknown as HTMLButtonElement;
                  }}
                  className="
                    absolute
                    bottom-6
                    left-0
                    right-0
                    mx-auto
                    w-max
                    z-10
                    whitespace-nowrap
                    rounded-full
                    border
                    border-black/10
                    bg-white
                    px-6
                    py-3
                    text-[9px]
                    uppercase
                    tracking-[0.16em]
                    text-[#171311]
                    shadow-[0_4px_20px_rgba(0,0,0,0.12)]
                    transition-all
                    duration-300
                    hover:bg-[#F5F0E8]
                    hover:shadow-[0_6px_25px_rgba(0,0,0,0.18)]

                    sm:bottom-7
                    sm:px-8
                    sm:py-3.5
                    sm:text-[10px]
                  "
                  style={{
                    fontFamily: "var(--font-body)",
                  }}
                >
                  VIEW DETAILS
                </a>
              </div>

              {/* PRODUCT INFO */}
              <div
                className="
                  px-4
                  text-center

                  h-[155px]
                  py-6

                  sm:h-[155px]
                  sm:px-6
                  sm:py-7

                  md:h-[165px]
                  md:px-6
                  md:py-7
                "
              >
                <p
                  className="
                    mb-2
                    text-[8px]
                    uppercase
                    tracking-[0.3em]
                    text-[#8b8378]

                    sm:mb-3
                    sm:text-[9px]
                    sm:tracking-[0.35em]
                  "
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                  }}
                >
                  {product.category}
                </p>

                <h4
                  className="
                    mx-auto
                    mb-2
                    max-w-[290px]
                    text-[18px]
                    font-medium
                    leading-[1.35]
                    tracking-[0.06em]
                    text-[#171311]

                    sm:mb-3
                    sm:text-[20px]
                    sm:tracking-[0.08em]
                  "
                  style={{
                    fontFamily: "var(--font-serif)",
                  }}
                >
                  {product.name}
                </h4>

                <p
                  className="
                    text-[12px]
                    tracking-[0.1em]
                    text-[#55504c]

                    sm:text-[14px]
                    sm:tracking-[0.12em]
                  "
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                  }}
                >
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}