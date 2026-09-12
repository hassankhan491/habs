"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    name: "Oud Royale",
    description:
      "A regal blend of aged oud wood, saffron, and amber. This luxurious fragrance embodies sophistication and timeless elegance.",
    image: "/images/image (11).png",
  },
  {
    id: 2,
    name: "Amber Essence",
    description:
      "Warm amber notes intertwined with vanilla and sandalwood. A captivating scent that leaves a lasting impression.",
    image: "/images/products-02.jpeg",
  },
];

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // =========================
      // DESKTOP
      // =========================
      mm.add("(min-width: 1024px)", () => {
        productRefs.current.forEach((product) => {
          if (!product) return;

          const coloredImage = product.querySelector(
            ".colored-image",
          ) as HTMLElement;

          const title = product.querySelector(".product-title");
          const description = product.querySelector(".product-description");
          const button = product.querySelector(".product-button");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: product,
              start: "top top+=80px",
              end: "+=2000",
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          // Image color reveal
          tl.to(
            coloredImage,
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 0.9,
              ease: "none",
            },
            0,
          );

          // Text animations
          tl.fromTo(
            title,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.2 },
            0.12,
          );

          tl.fromTo(
            description,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.2 },
            0.2,
          );

          tl.fromTo(
            button,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.2 },
            0.28,
          );
        });
      });

      // =========================
      // MOBILE + TABLET
      // =========================
      mm.add("(max-width: 1023px)", () => {
        productRefs.current.forEach((product) => {
          if (!product) return;

          const coloredImage = product.querySelector(
            ".colored-image",
          ) as HTMLElement;

          const title = product.querySelector(".product-title");
          const description = product.querySelector(".product-description");
          const button = product.querySelector(".product-button");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: product,

              // Account for mobile header
              start: "top top+=72px",

              // Shorter animation on smaller screens
              end: "+=1100",

              // Faster response on mobile
              scrub: 0.45,

              pin: true,

              anticipatePin: 1,

              invalidateOnRefresh: true,
            },
          });

          // Faster image color reveal on mobile
          tl.to(
            coloredImage,
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 0.45,
              ease: "none",
            },
            0,
          );

          // Faster text animations
          tl.fromTo(
            title,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.12 },
            0.08,
          );

          tl.fromTo(
            description,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.12 },
            0.14,
          );

          tl.fromTo(
            button,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.12 },
            0.2,
          );
        });
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[var(--color-bg)]">
      {products.map((product, index) => {
        const isReversed = index % 2 !== 0;

        return (
          <div
            key={product.id}
            ref={(el) => {
              productRefs.current[index] = el;
            }}
            className="
              product-item
              relative
              min-h-[calc(100svh-72px)]
              lg:min-h-screen
              w-full
              overflow-hidden
              bg-[var(--color-bg)]
            "
          >
            <div
              className={`
                flex
                h-full
                min-h-[calc(100svh-72px)]
                w-full
                flex-col
                lg:min-h-screen
                lg:flex-row
                ${isReversed ? "lg:flex-row-reverse" : ""}
              `}
            >
              {/* =========================================
                  IMAGE
              ========================================= */}
              <div
                className="
                  relative
                  flex
                  w-full
                  h-[45svh]
                  min-h-[300px]
                  items-center
                  justify-center
                  px-5
                  pt-4
                  pb-3
                  sm:h-[50svh]
                  sm:px-8
                  md:h-[52svh]
                  lg:h-full
                  lg:w-1/2
                  lg:px-10
                  lg:py-12
                  lg:-translate-y-6
                  xl:px-16
                  2xl:px-24
                "
              >
                <div
                  className="
                    relative
                    h-full
                    w-auto
                    aspect-[3/4]
                    overflow-hidden
                    rounded-lg
                    shadow-2xl

                    max-h-[42svh]
                    max-w-[82vw]

                    sm:max-h-[46svh]
                    sm:max-w-[360px]

                    md:max-h-[48svh]
                    md:max-w-[400px]

                    lg:h-[70vh]
                    lg:max-h-none
                    lg:max-w-[520px]

                    xl:h-[78vh]
                    xl:max-w-[560px]

                    2xl:h-[82vh]
                    2xl:max-w-[620px]
                  "
                >
                  {/* B&W image */}
                  <img
                    src={product.image}
                    alt={`${product.name} B&W`}
                    className="
                      absolute
                      inset-0
                      h-full
                      w-full
                      object-cover
                    "
                    style={{
                      filter: "grayscale(100%)",
                    }}
                  />

                  {/* Colored image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="
                      colored-image
                      absolute
                      inset-0
                      h-full
                      w-full
                      object-cover
                    "
                    style={{
                      clipPath: "inset(0% 0% 100% 0%)",
                    }}
                  />
                </div>
              </div>

              {/* =========================================
                  CONTENT
              ========================================= */}
              <div
                className="
                  flex
                  w-full
                  flex-1
                  items-center
                  justify-center
                  px-6
                  py-8

                  sm:px-8
                  sm:py-10

                  md:px-12
                  md:py-12

                  lg:w-1/2
                  lg:flex-none
                  lg:px-12
                  lg:py-0

                  xl:px-20

                  2xl:px-28
                "
              >
                <div className="w-full max-w-md lg:max-w-lg">
                  <h2
                    className="
                      product-title
                      mb-3
                      text-3xl
                      leading-tight
                      font-medium
                      text-[var(--color-text)]

                      sm:text-4xl

                      md:text-5xl

                      lg:mb-4
                      lg:text-5xl

                      xl:text-6xl
                    "
                    style={{
                      fontFamily: "var(--font-serif)",
                      opacity: 0,
                    }}
                  >
                    {product.name}
                  </h2>

                  <p
                    className="
                      product-description
                      mb-6
                      text-sm
                      leading-relaxed
                      text-[#6b6b6b]

                      sm:text-base

                      lg:mb-10
                    "
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "16px",
                      letterSpacing: "0.03em",
                      lineHeight: "1.6",
                      opacity: 0,
                    }}
                  >
                    {product.description}
                  </p>

                  {/* BUTTON */}
                  <a
                    href="/products"
                    className="
                    product-button
                    w-full
                    pointer-events-auto
                    inline-flex
                    items-center
                    justify-center
                    rounded-none
                    border
                    border-[var(--color-gold)]
                    bg-[var(--color-gold)]
                    px-8
                    py-3.5
                    text-xs
                    font-medium
                    uppercase
                    tracking-[0.2em]
                    text-[var(--font-color-4)]
                    transition-all
                    duration-300
                    hover:bg-[#DFC27B]
                    hover:shadow-lg
                    sm:py-4
                    sm:text-sm
                    leading-none
                    text-center
                  "
                    style={{
                      fontFamily: "var(--font-body)",
                      opacity: 1,
                    }}
                  >
                    Quick View
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
