"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import FullScreenMenu from "./FullScreenMenu";
import { Menu, ShoppingBag, Heart, Search, User } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ⚙️ If your hero pin distance changes, adjust this (0 = no pin, just 100vh hero)
const HERO_PIN_DISTANCE = 1500;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount] = useState(2);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const threshold = () => window.innerHeight + HERO_PIN_DISTANCE - 100;
      const morphStart = () => threshold() - 400;

      // ✅ FIXED: animate `width` (not maxWidth) with a responsive function.
      // Desktop/laptop → 920px pill | Tablet/mobile → full width minus 24px gaps
      gsap.to(containerRef.current, {
        width: () => Math.min(920, window.innerWidth - 24),
        marginTop: 16,
        borderRadius: 9999,
        paddingInline: 16,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#FFFFFF",
        borderColor: "rgba(0, 0, 0, 0.06)",
        boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: morphStart,
          end: threshold,
          scrub: 0.6,
          invalidateOnRefresh: true, // recalculates width on resize (responsive)
        },
      });

      // Toggle text/icon colors + blur at the same scroll point
      ScrollTrigger.create({
        trigger: document.body,
        start: morphStart,
        end: threshold,
        onEnter: () => setIsScrolled(true),
        onLeaveBack: () => setIsScrolled(false),
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full">
        <div
          ref={containerRef}
          className={`mx-auto w-full px-4 sm:px-6 lg:px-10 py-4 lg:py-5 bg-transparent border border-transparent ${
            isScrolled ? "backdrop-blur-xl " : ""
          }`}
        >
          <div className="grid grid-cols-[1fr_auto_1fr] items-center">
            {/* Left - Menu */}
            <div className="justify-self-start">
              <button
                onClick={() => setIsMenuOpen(true)}
                className={`flex items-center gap-2 sm:gap-3 group transition-colors duration-300 ${
                  isScrolled
                    ? "text-[var(--color-text)]"
                    : "text-[var(--color-header-font)]"
                } hover:opacity-80`}
                aria-label="Open menu"
              >
                <span
                  className={`p-1.5 sm:p-2 rounded-full transition-colors duration-300 ${
                    isScrolled
                      ? "bg-[var(--color-text)]/5 group-hover:bg-[var(--color-text)]/10"
                      : "bg-[var(--font-color-5)]/10 group-hover:bg-[var(--font-color-5)]/20"
                  }`}
                >
                  <Menu className="w-5 h-5" />
                </span>
                <span className="font-medium text-[10px] sm:text-xs tracking-[0.2em] uppercase hidden sm:block">
                  Menu
                </span>
              </button>
            </div>

            {/* Center - Logo */}
            <Link
              href="/"
              className="justify-self-center"
              aria-label="Shawq Home"
            >
              <h1
                style={{ fontFamily: "var(--font-decorative)" }}
                className={` font-medium tracking-wide leading-none transition-all duration-500 ${
                  isScrolled
                    ? "text-lg sm:text-xl lg:text-2xl text-[var(--color-text)]"
                    : "text-2xl sm:text-4xl lg:text-[50px] text-[var(--color-header-font)]"
                }`}
              >
                SHAWQ
              </h1>
            </Link>

            {/* Right - Icons */}
            <div className="justify-self-end flex items-center gap-0.5 sm:gap-1.5 lg:gap-2">
              <button
                className={`hidden md:flex p-2 rounded-full transition-colors duration-300 ${
                  isScrolled
                    ? "text-[var(--color-text)] hover:bg-brand-black/10"
                    : "text-[var(--color-header-font)] hover:bg-[var(--color-header-font)]/10"
                }`}
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                className={`hidden sm:flex p-2 rounded-full transition-colors duration-300 ${
                  isScrolled
                    ? "text-[var(--color-text)] hover:bg-brand-black/10"
                    : "text-[var(--color-header-font)] hover:bg-[var(--color-header-font)]/10"
                }`}
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </button>

              <button
                className={`p-1.5 sm:p-2 rounded-full transition-colors duration-300 ${
                  isScrolled
                    ? "text-[var(--color-text)] hover:bg-brand-black/10"
                    : "text-[var(--color-header-font)] hover:bg-[var(--color-header-font)]/10"
                }`}
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
              </button>

              <button
                className={`relative p-1.5 sm:p-2 rounded-full transition-colors duration-300 ${
                  isScrolled
                    ? "text-[var(--color-text)] hover:bg-brand-black/10"
                    : "text-[var(--color-header-font)] hover:bg-[var(--color-header-font)]/10"
                }`}
                aria-label="Shopping cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span
                    className={`absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 text-[9px] sm:text-[10px] font-bold rounded-full flex items-center justify-center ${
                      isScrolled
                        ? "bg-brand-black text-brand-white"
                        : "bg-[#000000] text-brand-black"
                    }`}
                  >
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <FullScreenMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
}
