"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { Bricolage_Grotesque, Inter, IBM_Plex_Mono } from "next/font/google";

/**
 * Fonts are declared here so this file is drop-in ready.
 * If you're using this across the whole site, move these three
 * declarations to app/layout.tsx and pass the variables down instead
 * of re-instantiating them per component.
 */
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["500"],
});

const TOKENS = {
  paper: "#EDEAE3",
  paperDeep: "#E4E0D6",
  ink: "#14171A",
  accent: "#B4622A",
  trust: "#1F3D2B",
  hairline: "#D8D3C7",
};

const industries = [
  "Pest Control",
  "HVAC",
  "Roofing",
  "Plumbing",
  "Electrical",
  "Landscaping",
  "Cleaning",
  "Gyms",
];

const headlineLines = [
  "More calls.",
  "More jobs booked.",
  "Less time chasing leads.",
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(
          [
            ".hero-eyebrow",
            ".hero-line-inner",
            ".hero-sub",
            ".hero-cta",
            ".hero-tags",
            ".hero-ticket",
          ],
          { opacity: 1, y: 0, x: 0, yPercent: 0 },
        );
        return;
      }

      gsap.set(".hero-eyebrow", { opacity: 0, y: 12 });

      // Increased to 150 to ensure text starts completely below our newly expanded clipping mask
      gsap.set(".hero-line-inner", { yPercent: 150 });
      gsap.set([".hero-sub", ".hero-cta", ".hero-tags"], { opacity: 0, y: 16 });
      gsap.set(".hero-ticket", { opacity: 0, x: 28 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(".hero-eyebrow", { opacity: 1, y: 0, duration: 0.5 })
        .to(
          ".hero-line-inner",
          { yPercent: 0, duration: 0.9, stagger: 0.09, ease: "power4.out" },
          "-=0.15",
        )
        .to(".hero-sub", { opacity: 1, y: 0, duration: 0.6 }, "-=0.45")
        .to(".hero-cta", { opacity: 1, y: 0, duration: 0.5 }, "-=0.4")
        .to(".hero-tags", { opacity: 1, y: 0, duration: 0.5 }, "-=0.35")
        .to(
          ".hero-ticket",
          { opacity: 1, x: 0, duration: 0.9, ease: "power3.out" },
          "-=0.7",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${display.variable} ${body.variable} ${mono.variable} relative overflow-hidden bg-[#EDEAE3] font-[family-name:var(--font-body)]`}
      style={{ backgroundColor: TOKENS.paper }}
    >
      {/* faint structural rule grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 hidden h-full lg:block"
        style={{
          backgroundImage: `linear-gradient(to right, ${TOKENS.hairline} 1px, transparent 1px)`,
          backgroundSize: "calc((100% - 5rem) / 12) 100%",
          backgroundPosition: "2.5rem 0",
          opacity: 0.4,
        }}
      />

      {/* 
        Replaced the static 'lg:pt-44 lg:pb-28' with dynamic clamp() values. 
        This is 100% Tailwind v4 compliant and fluidly scales padding based on viewport height,
        preventing the section from being chopped off on 720p screens. 
      */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 pb-16 pt-24 sm:gap-14 sm:px-10 sm:pb-20 sm:pt-36 lg:grid-cols-12 lg:gap-8 lg:pt-[clamp(6rem,15vh,11rem)] lg:pb-[clamp(4rem,10vh,7rem)]">
        {/* LEFT: headline column */}
        <div className="lg:col-span-7">
          <p
            className="hero-eyebrow mb-5 inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.14em] sm:mb-7 sm:text-xs"
            style={{ color: TOKENS.trust }}
          >
            <span
              className="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: TOKENS.accent }}
            />
            Websites &amp; growth systems for pest control, HVAC, roofing &amp;
            other local service businesses
          </p>

          <h1
            className="font-[family-name:var(--font-display)] text-[12vw] font-extrabold leading-[1.02] tracking-[-0.02em] sm:text-6xl sm:leading-[0.98] md:text-7xl"
            style={{ color: TOKENS.ink }}
          >
            {headlineLines.map((line, i) => (
              /* 
                Added pt/pb and negative margins to symmetrically expand the clipping mask.
                This gives letters like 'j', 'g', and 'p' enough room so their bottoms don't get chopped off, 
                without actually changing your tight visual line height.
              */
              <span
                key={i}
                className="block overflow-hidden pt-[0.1em] pb-[0.3em] -mt-[0.1em] -mb-[0.3em]"
              >
                <span
                  className="hero-line-inner block"
                  style={i === 1 ? { color: TOKENS.accent } : undefined}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="hero-sub mt-5 max-w-xl text-[15px] leading-relaxed sm:mt-7 sm:text-lg"
            style={{ color: "#3B3F42" }}
          >
            I design and build websites that make service businesses look
            trustworthy online, turn more visitors into booked jobs, and
            automate the busywork eating into your week.
          </p>

          <div className="hero-cta mt-8 flex flex-col items-stretch gap-3 sm:mt-9 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href="#contact"
              className="group flex w-full items-center justify-center gap-2 px-6 py-3.5 text-[13px] font-semibold tracking-tight transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto sm:px-7 sm:py-4 sm:text-sm"
              style={{
                backgroundColor: TOKENS.ink,
                color: TOKENS.paper,
                outlineColor: TOKENS.accent,
              }}
            >
              Book a free website audit
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>

            <Link
              href="/#work"
              className="flex w-full items-center justify-center gap-2 px-6 py-3.5 text-[13px] font-semibold tracking-tight underline decoration-2 underline-offset-4 transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto sm:px-2 sm:py-4 sm:text-sm"
              style={{
                color: TOKENS.ink,
                textDecorationColor: TOKENS.accent,
                outlineColor: TOKENS.accent,
              }}
            >
              View case studies
            </Link>
          </div>

          <ul
            className="hero-tags mt-10 flex flex-wrap gap-1.5 sm:mt-12 sm:gap-2"
            aria-label="Industries served"
          >
            {industries.map((industry) => (
              <li
                key={industry}
                className="rounded-full border px-3 py-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wide sm:px-3.5 sm:py-1.5 sm:text-[11px]"
                style={{ borderColor: TOKENS.hairline, color: "#54524B" }}
              >
                {industry}
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT: signature "service intake ticket" panel */}
        <div className="lg:col-span-5 lg:pt-2">
          <div
            className="hero-ticket relative border font-[family-name:var(--font-mono)]"
            style={{
              borderColor: TOKENS.ink,
              backgroundColor: TOKENS.paperDeep,
            }}
          >
            <div
              aria-hidden
              className="absolute -top-2 left-5 h-4 w-4 rounded-full sm:left-8"
              style={{
                backgroundColor: TOKENS.paper,
                border: `1px solid ${TOKENS.hairline}`,
              }}
            />
            <div
              aria-hidden
              className="absolute -top-2 right-5 h-4 w-4 rounded-full sm:right-8"
              style={{
                backgroundColor: TOKENS.paper,
                border: `1px solid ${TOKENS.hairline}`,
              }}
            />

            <div
              className="flex items-center justify-between border-b px-5 py-3.5 sm:px-8 sm:py-4"
              style={{ borderColor: TOKENS.ink }}
            >
              <span
                className="text-[11px] font-medium uppercase tracking-[0.14em]"
                style={{ color: TOKENS.ink }}
              >
                Service Intake
              </span>
              <span className="text-[11px]" style={{ color: "#6B6A62" }}>
                No. SI-004
              </span>
            </div>

            <dl className="divide-y" style={{ borderColor: TOKENS.hairline }}>
              {[
                {
                  label: "Handles",
                  value: "Websites, landing pages & business automation",
                },
                { label: "Built for", value: "Local service businesses" },
                { label: "Turnaround", value: "2–4 week build" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[5.5rem_1fr] gap-4 px-5 py-3.5 sm:grid-cols-[6.5rem_1fr] sm:px-8 sm:py-4"
                  style={{ borderColor: TOKENS.hairline }}
                >
                  <dt
                    className="text-[10px] uppercase tracking-wide sm:text-[11px]"
                    style={{ color: "#6B6A62" }}
                  >
                    {row.label}
                  </dt>
                  <dd
                    className="text-[12px] leading-snug sm:text-[13px]"
                    style={{ color: TOKENS.ink }}
                  >
                    {row.value}
                  </dd>
                </div>
              ))}

              <div className="grid grid-cols-[5.5rem_1fr] items-center gap-4 px-5 py-3.5 sm:grid-cols-[6.5rem_1fr] sm:px-8 sm:py-4">
                <dt
                  className="text-[10px] uppercase tracking-wide sm:text-[11px]"
                  style={{ color: "#6B6A62" }}
                >
                  Status
                </dt>
                <dd
                  className="flex items-center gap-2 text-[12px] leading-snug sm:text-[13px]"
                  style={{ color: TOKENS.ink }}
                >
                  <span
                    className="motion-safe:animate-pulse inline-block h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: TOKENS.trust }}
                    aria-hidden
                  />
                  Booking new projects
                </dd>
              </div>
            </dl>

            <div
              className="border-t px-5 py-4 sm:px-8 sm:py-5"
              style={{ borderColor: TOKENS.ink }}
            >
              <Link
                href="#contact"
                className="flex w-full items-center justify-center gap-2 py-3 text-xs font-semibold uppercase tracking-wide transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:py-3.5"
                style={{
                  backgroundColor: TOKENS.ink,
                  color: TOKENS.paper,
                  outlineColor: TOKENS.accent,
                }}
              >
                Request a quote
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="relative hidden justify-center pb-10 sm:flex">
        <div
          className="flex flex-col items-center gap-3 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em]"
          style={{ color: "#8A8880" }}
        >
          <span>Scroll</span>
          <span
            className="motion-safe:animate-bounce h-8 w-px"
            style={{ backgroundColor: TOKENS.hairline }}
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
