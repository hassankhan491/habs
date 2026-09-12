// components/sections/NewsletterSection.tsx
"use client";

import React, { useState, FormEvent } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      console.log("Subscribed:", email);
      setEmail("");
    }
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#edeae3" }}
      aria-label="Newsletter subscription"
    >
      {/* Top black bar */}
      <hr className="h-[1px] w-full bg-gradient-to-r from-transparent via-black to-transparent border-0" aria-hidden="true" />


      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-10 sm:px-10 sm:pt-28 sm:pb-14 md:pt-36 md:pb-16 lg:px-16">
        {/* THE INNER CIRCLE label */}
        <p
          className="mb-6 text-xs font-medium uppercase tracking-[0.35em] sm:mb-8 sm:text-sm md:tracking-[0.4em]"
          style={{
            color: "#c41e3a",
            fontFamily: "var(--font-body)",
          }}
        >
          The Inner Circle
        </p>

        {/* Heading + Watermark wrapper */}
        {/* FIX: Removed large min-heights. Added small padding-bottom so the watermark doesn't get cut off. */}
        <div className="relative pb-6 sm:pb-10">
          {/* SHAWQ Watermark (outlined text) */}
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
            aria-hidden="true"
          >
            <span
              className="block leading-none"
              style={{
                fontFamily: "var(--font-decorative)",
                fontSize: "clamp(120px, 20vw, 280px)",
                fontWeight: 400,
                color: "transparent",
                WebkitTextFillColor: "transparent",
                WebkitTextStroke: "1.5px rgba(0, 0, 0, 0.18)",
                paintOrder: "stroke fill",
                letterSpacing: "-0.01em",
                whiteSpace: "nowrap",
              }}
            >
              SHAWQ
            </span>
          </div>

          {/* Main Heading */}
          <h2
            className="relative z-10 max-w-3xl text-[clamp(2.5rem,6vw,5.5rem)] font-normal leading-[1.05] tracking-tight text-black"
            style={{
              fontFamily: "var(--font-serif)",
            }}
          >
            Stay Close to the
            <br />
            Scent.
          </h2>
        </div>

        {/* Email Input */}
        {/* FIX: Reduced top margin (mt) to bring it closer to the heading */}
        <form
          onSubmit={handleSubmit}
          className="relative z-10 mt-4 flex flex-col gap-4 sm:mt-6 sm:flex-row sm:items-end md:mt-8"
          role="form"
          aria-label="Subscribe to newsletter"
        >
          <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
            <label
              htmlFor="newsletter-email"
              className="text-[10px] font-medium uppercase tracking-[0.2em] text-black/60 sm:text-xs"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Your E-mail
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              autoComplete="email"
              className="w-full flex-1 bg-transparent pb-2 text-sm text-black outline-none placeholder:text-black/30 focus:placeholder:text-black/50 sm:text-base"
              style={{
                fontFamily: "var(--font-body)",
                borderBottom: "1px solid rgba(0, 0, 0, 0.8)",
                letterSpacing: "0.03em",
              }}
              aria-label="Email address"
            />
          </div>

          <button
            type="submit"
            className="group flex items-center justify-center gap-2 self-start text-[10px] font-medium uppercase tracking-[0.25em] text-black transition-opacity duration-300 hover:opacity-60 sm:self-auto sm:text-xs"
            style={{ fontFamily: "var(--font-body)" }}
            aria-label="Join Shawq newsletter"
          >
            Join Shawq
            <svg
              className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </form>

        {/* Bottom note */}
        <p
          className="relative z-10 mt-6 text-[10px] font-medium uppercase tracking-[0.25em] text-black/40 sm:mt-8 sm:text-xs md:tracking-[0.3em]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          One letter per month. No noise.
        </p>
      </div>

      {/* Bottom black bar */}
      <div className="h-2 w-full bg-black" aria-hidden="true" />
    </section>
  );
}