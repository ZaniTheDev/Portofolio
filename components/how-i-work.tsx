"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const TOKENS = {
  ink: "#14171A",
  paper: "#EDEAE3",
  accent: "#B4622A",
  mutedLight: "rgba(237, 234, 227, 0.4)",
  hairlineDark: "rgba(237, 234, 227, 0.15)",
};

const PROCESS_STEPS = [
  {
    phase: "STEP // 01",
    title: "Strategy & Blueprint",
    description:
      "We don't guess. I look at exactly what your top local competitors are doing right and where they are failing. Then, we map out a website structure specifically designed to intercept the people in your area who need your services right now.",
    deliverable: "Strategic Blueprint & Project Scope",
  },
  {
    phase: "STEP // 02",
    title: "Custom Design & Build",
    description:
      "I don't use cheap templates or generic site-builders that break the moment you try to update them. Your site is custom-built from the ground up to look premium, establish immediate trust, and load instantly on a smartphone—which is where 80% of your customers are searching.",
    deliverable: "High-Speed Custom Website",
  },
  {
    phase: "STEP // 03",
    title: "Testing & Automation",
    description:
      "Before anything goes live, we test every button, form, and link. We set up the automation so that the moment a customer requests a quote, it bypasses messy email inboxes and sends a text message directly to your phone. No lost leads.",
    deliverable: "Tested Lead Generation Pipeline",
  },
  {
    phase: "STEP // 04",
    title: "Launch & Ongoing Care",
    description:
      "We flip the switch and go live. But I don't just hand you a website and disappear. You get a fully managed digital storefront that stays secure, updated, and brings in jobs 24/7 without you having to lift a finger.",
    deliverable: "Live Launch & Priority Support",
  },
];

export default function HowIWork() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const steps = gsap.utils.toArray(".process-step");

        steps.forEach((step: any) => {
          const number = step.querySelector(".step-number");
          const line = step.querySelector(".step-line");
          const content = step.querySelector(".step-content");

          // Mobile-specific animated elements
          const mobileBg = step.querySelector(".mobile-bg");
          const mobileHighlight = step.querySelector(".mobile-highlight");

          gsap.timeline({
            scrollTrigger: {
              trigger: step,
              start: "top 65%", // Adjusted to trigger perfectly on mobile screens
              end: "bottom 65%",
              toggleClass: { targets: step, className: "is-active" },
              onEnter: () =>
                activateStep(number, line, content, mobileBg, mobileHighlight),
              onLeaveBack: () =>
                deactivateStep(
                  number,
                  line,
                  content,
                  mobileBg,
                  mobileHighlight,
                ),
            },
          });
        });

        function activateStep(
          number: any,
          line: any,
          content: any,
          mobileBg: any,
          mobileHighlight: any,
        ) {
          gsap.to(number, { color: TOKENS.accent, duration: 0.4 });

          // Desktop line animation
          if (line)
            gsap.to(line, {
              backgroundColor: TOKENS.accent,
              height: "100%",
              duration: 0.6,
              ease: "power3.out",
            });

          // Mobile-exclusive card animations
          if (mobileBg)
            gsap.to(mobileBg, {
              backgroundColor: "#1A1D22",
              borderColor: "rgba(180, 98, 42, 0.4)",
              duration: 0.5,
            });
          if (mobileHighlight)
            gsap.to(mobileHighlight, {
              width: "100%",
              duration: 0.6,
              ease: "power3.out",
            });

          gsap.to(content, {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        }

        function deactivateStep(
          number: any,
          line: any,
          content: any,
          mobileBg: any,
          mobileHighlight: any,
        ) {
          gsap.to(number, { color: TOKENS.mutedLight, duration: 0.4 });

          if (line)
            gsap.to(line, {
              backgroundColor: TOKENS.hairlineDark,
              height: "0%",
              duration: 0.4,
            });

          if (mobileBg)
            gsap.to(mobileBg, {
              backgroundColor: "#14171A",
              borderColor: "rgba(237,234,227,0.08)",
              duration: 0.4,
            });
          if (mobileHighlight)
            gsap.to(mobileHighlight, { width: "0%", duration: 0.4 });

          gsap.to(content, { opacity: 0.4, x: -10, duration: 0.4 });
        }
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="process"
      className="relative w-full border-t"
      style={{
        backgroundColor: TOKENS.ink,
        color: TOKENS.paper,
        borderColor: TOKENS.hairlineDark,
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:py-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Left Column: Sticky Header */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <p
                className="mb-6 flex items-center gap-2 font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.14em]"
                style={{ color: TOKENS.accent }}
              >
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: TOKENS.accent }}
                />
                Standard Operating Procedure
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                No guesswork. <br /> Just a system that works.
              </h2>
              <p
                className="mt-8 max-w-md font-[family-name:var(--font-body)] text-lg leading-relaxed"
                style={{ color: TOKENS.mutedLight }}
              >
                A predictable, four-step process to take you from a frustrating,
                outdated website to a 24/7 automated digital storefront that
                actually books jobs.
              </p>

              <div className="mt-12 hidden lg:block">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-xs font-semibold uppercase tracking-wide underline decoration-2 underline-offset-4 transition-opacity hover:opacity-70"
                  style={{
                    color: TOKENS.paper,
                    textDecorationColor: TOKENS.accent,
                  }}
                >
                  Initiate Project →
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Scrolling Timeline */}
          <div className="relative lg:col-span-7 lg:pl-10">
            {/* Background hairline tracking line (Desktop Only) */}
            <div
              className="absolute bottom-0 left-0 top-0 hidden w-px lg:block"
              style={{ backgroundColor: TOKENS.hairlineDark }}
            />

            {/* Tighter gap on mobile to make the cards stack rhythmically, airy on desktop */}
            <div className="flex flex-col gap-6 sm:gap-8 lg:gap-16">
              {PROCESS_STEPS.map((step, index) => (
                <div
                  key={index}
                  className="process-step group relative flex flex-col p-7 lg:flex-row lg:p-0 lg:pl-12"
                >
                  {/* --- MOBILE ONLY ENHANCEMENTS --- */}
                  {/* Base Card Background */}
                  <div className="mobile-bg absolute inset-0 -z-10 block border border-[rgba(237,234,227,0.08)] bg-[#14171A] lg:hidden" />

                  {/* Active Top Progress Line */}
                  <div className="mobile-highlight absolute left-0 top-0 z-0 block h-[2px] w-0 bg-[#B4622A] lg:hidden" />

                  {/* Massive Depth Watermark */}
                  <div className="pointer-events-none absolute right-4 top-2 z-0 font-[family-name:var(--font-display)] text-[80px] font-extrabold leading-none tracking-tighter text-[#EDEAE3] opacity-[0.02] lg:hidden">
                    0{index + 1}
                  </div>
                  {/* -------------------------------- */}

                  {/* Animated timeline indicator (Desktop only) */}
                  <div className="absolute bottom-0 left-0 top-0 hidden w-px lg:block">
                    <div
                      className="step-line h-0 w-full"
                      style={{ backgroundColor: TOKENS.accent }}
                    />
                  </div>

                  {/* Phase Marker */}
                  <div className="relative z-10 mb-5 lg:mb-0 lg:w-32 lg:shrink-0 lg:pt-1">
                    <span
                      className="step-number font-[family-name:var(--font-mono)] text-[11px] font-bold uppercase tracking-widest transition-colors duration-300"
                      style={{ color: TOKENS.mutedLight }}
                    >
                      {step.phase}
                    </span>
                  </div>

                  {/* Content Block */}
                  <div className="step-content relative z-10 opacity-40 transition-all duration-500 lg:-translate-x-2">
                    <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight sm:text-3xl">
                      {step.title}
                    </h3>
                    <p
                      className="mt-4 font-[family-name:var(--font-body)] text-[15px] leading-relaxed lg:max-w-md"
                      style={{ color: TOKENS.mutedLight }}
                    >
                      {step.description}
                    </p>

                    <div
                      className="mt-6 flex items-center gap-3 border-t pt-4"
                      style={{ borderColor: TOKENS.hairlineDark }}
                    >
                      <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest text-[#B4622A]">
                        Output:
                      </span>
                      <span
                        className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-widest"
                        style={{ color: TOKENS.paper }}
                      >
                        {step.deliverable}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile CTA */}
            <div
              className="mt-16 block border-t pt-8 lg:hidden"
              style={{ borderColor: TOKENS.hairlineDark }}
            >
              <a
                href="#contact"
                className="inline-flex w-full items-center justify-center gap-2 bg-[#EDEAE3] py-4 font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-widest text-[#14171A]"
              >
                Initiate Project →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
