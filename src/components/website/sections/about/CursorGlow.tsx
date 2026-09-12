"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;

    el.style.opacity = "1";
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });

    const move = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] -ml-[140px] -mt-[140px] hidden h-[280px] w-[280px] rounded-full opacity-0 lg:block"
      style={{
        background:
          "radial-gradient(circle, rgba(197,168,128,0.20) 0%, rgba(197,168,128,0.08) 45%, transparent 70%)",
      }}
    />
  );
}