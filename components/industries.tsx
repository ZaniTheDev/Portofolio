"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type Industry = {
  code: string;
  name: string;
  detail: string;
  outcome: string;
};

const INDUSTRIES: Industry[] = [
  {
    code: "SEC // 01",
    name: "Pest Control",
    detail:
      "Recurring-treatment reminders and same-day quote requests that keep customers on schedule.",
    outcome:
      "Business Value: Increases customer lifetime value (LTV) by automating seasonal follow-ups.",
  },
  {
    code: "SEC // 02",
    name: "HVAC",
    detail:
      "Emergency-repair visibility and maintenance-plan sign-ups that turn one call into a year of business.",
    outcome:
      "Business Value: Captures high-intent emergency traffic before they call the next competitor.",
  },
  {
    code: "SEC // 03",
    name: "Roofing",
    detail:
      "Storm-lead capture and before/after galleries that build trust before the first estimate.",
    outcome:
      "Business Value: Pre-qualifies leads and builds immediate authority to justify premium estimates.",
  },
  {
    code: "SEC // 04",
    name: "Plumbing",
    detail:
      "24/7 emergency booking and clear pricing that stops panicked callers from calling the next name.",
    outcome:
      "Business Value: Frictionless mobile UX converts late-night panic searches into booked dispatch routes.",
  },
  {
    code: "SEC // 05",
    name: "Electrical",
    detail:
      "License and insurance front and center, with quotes that route straight to your phone.",
    outcome:
      "Business Value: Elevates perceived trust to help win lucrative commercial contracts, not just residential fixes.",
  },
  {
    code: "SEC // 06",
    name: "Landscaping",
    detail:
      "Seasonal galleries and recurring-maintenance sign-ups that fill your calendar before the spring rush.",
    outcome:
      "Business Value: Secures predictable monthly cash flow via seamless subscription funnels.",
  },
  {
    code: "SEC // 07",
    name: "Cleaning Services",
    detail:
      "Simple online booking and recurring-plan upsells that turn one-time cleans into standing appointments.",
    outcome:
      "Business Value: Automates the quoting process to help you reclaim hours of manual admin work.",
  },
  {
    code: "SEC // 08",
    name: "Gyms",
    detail:
      "Class schedules and trial sign-ups built to convert browsers into members.",
    outcome:
      "Business Value: Removes friction from trial sign-ups to dramatically lower your customer acquisition cost (CAC).",
  },
];

export default function Industries() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cellRefs = useRef<Array<HTMLDivElement | null>>([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          full: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduced } = context.conditions as { reduced: boolean };

          if (reduced) {
            gsap.set(cellRefs.current, { autoAlpha: 1, y: 0 });
            return;
          }

          gsap.set(cellRefs.current, { autoAlpha: 0, y: 24 });

          gsap.to(cellRefs.current, {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: { each: 0.08, from: "start", grid: "auto" },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              once: true,
            },
          });
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="industries"
      className="border-t bg-[#EDEAE3] text-[#14171A]"
      style={{ borderColor: "#D8D3C7" }}
    >
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        {/* Header */}
        <div className="mb-16 grid grid-cols-1 gap-6 lg:mb-20 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p
              className="font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-[0.18em]"
              style={{ color: "#B4622A" }}
            >
              Sector Analysis
            </p>
          </div>
          <div className="lg:col-span-8">
            <h2 className="font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Eight industries. One standard.
            </h2>
            <p className="mt-6 max-w-xl font-[family-name:var(--font-body)] text-base leading-relaxed opacity-70 sm:text-lg">
              Every trade has different customers, different urgency, and a
              different reason people search for you at 11pm. The site should
              reflect that, not run on the same template as everyone else.
            </p>
          </div>
        </div>

        {/* Specialization grid with group-dimming */}
        <div
          className="group/grid grid grid-cols-1 border-l border-t sm:grid-cols-2 lg:grid-cols-4"
          style={{ borderColor: "#D8D3C7" }}
        >
          {INDUSTRIES.map((industry, i) => (
            <div
              key={industry.code}
              ref={(el) => {
                cellRefs.current[i] = el;
              }}
              tabIndex={0}
              className="group/cell relative border-b border-r p-8 outline-none transition-all duration-500 hover:!opacity-100 group-hover/grid:opacity-40 focus-visible:ring-2 focus-visible:ring-inset"
              style={{
                borderColor: "#D8D3C7",
                outlineColor: "#B4622A",
              }}
            >
              {/* hover tint */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/cell:opacity-100"
                style={{ backgroundColor: "#E4E0D6" }}
              />

              {/* architectural corner bracket */}
              <span
                aria-hidden
                className="absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 opacity-0 transition-all duration-300 group-hover/cell:-translate-x-6 group-hover/cell:translate-y-6 group-hover/cell:opacity-100"
                style={{ borderColor: "#B4622A" }}
              />

              {/* Top Row: Sector Code & Responsive Hint */}
              <div className="flex w-full items-center justify-between">
                <span
                  className="font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-[0.14em] opacity-50 transition-colors duration-300 group-hover/cell:opacity-100 group-focus/cell:opacity-100"
                  style={{ color: "#B4622A" }}
                >
                  {industry.code}
                </span>

                {/* Visual Hint - Swaps text based on breakpoint and fades out on hover/focus */}
                <span className="font-[family-name:var(--font-mono)] text-[9px] font-medium uppercase tracking-[0.2em] opacity-40 transition-opacity duration-300 group-hover/cell:opacity-0 group-focus-visible/cell:opacity-0 group-focus/cell:opacity-0">
                  <span className="md:hidden">Tap to reveal +</span>
                  <span className="hidden md:inline">Hover to reveal +</span>
                </span>
              </div>

              <h3 className="mt-6 font-[family-name:var(--font-display)] text-xl font-bold leading-tight tracking-tight sm:text-2xl">
                {industry.name}
              </h3>

              <p className="mt-4 font-[family-name:var(--font-body)] text-sm leading-relaxed opacity-70">
                {industry.detail}
              </p>

              {/* Expanding Explanation - Now reacts to standard focus for mobile taps */}
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover/cell:grid-rows-[1fr] group-focus-visible/cell:grid-rows-[1fr] group-focus/cell:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <div
                    className="mt-5 border-t pt-4"
                    style={{ borderColor: "rgba(216, 211, 199, 0.5)" }}
                  >
                    <p
                      className="font-[family-name:var(--font-body)] text-sm font-medium leading-relaxed opacity-0 transition-opacity duration-500 delay-100 group-hover/cell:opacity-100 group-focus-visible/cell:opacity-100 group-focus/cell:opacity-100"
                      style={{ color: "#B4622A" }}
                    >
                      {industry.outcome}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer line unified CTA */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="font-[family-name:var(--font-body)] text-sm opacity-70">
            Don&apos;t see your trade listed? I still might be a fit.
          </p>
          <a
            href="#contact"
            className="font-[family-name:var(--font-mono)] text-xs font-semibold uppercase tracking-[0.14em] underline decoration-2 underline-offset-4 transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            style={{
              color: "#B4622A",
              textDecorationColor: "#B4622A",
              outlineColor: "#B4622A",
            }}
          >
            Book a strategy call →
          </a>
        </div>
      </div>
    </section>
  );
}
