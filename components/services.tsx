"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Same token set as hero.tsx / navbar.tsx — pull into lib/tokens.ts
 * once you've got a third component reaching for these.
 */
const TOKENS = {
  ink: "#14171A",
  paper: "#EDEAE3",
  accent: "#B4622A",
  trust: "#4A7A5D", // lifted a step for legibility on a dark background
  hairlineOnDark: "rgba(237, 234, 227, 0.14)",
  mutedOnDark: "rgba(237, 234, 227, 0.56)",
};

type Service = {
  number: string;
  name: string;
  description: string;
  includes: string[];
};

const services: Service[] = [
  {
    number: "01",
    name: "Website design & build",
    description:
      "A site built to load fast, look premium, and turn visitors into calls — not just another template with your logo on it.",
    includes: [
      "Conversion-focused layout",
      "Mobile-first build",
      "SEO foundations",
    ],
  },
  {
    number: "02",
    name: "Business automation",
    description:
      "Quote requests, booking confirmations, and follow-ups handled automatically, so nothing slips through the cracks.",
    includes: [
      "Automated quote requests",
      "Booking & reminders",
      "CRM-friendly workflows",
    ],
  },
  {
    number: "03",
    name: "Local visibility & SEO",
    description:
      "Show up when someone nearby searches for what you do — before they land on a competitor's site instead.",
    includes: [
      "Local SEO setup",
      "Google Business optimization",
      "Fast, indexable pages",
    ],
  },
  {
    number: "04",
    name: "Ongoing care & support",
    description:
      "Your site stays fast, secure, and current, without it becoming one more thing on your to-do list.",
    includes: [
      "Updates & backups",
      "Priority support",
      "Small changes, handled fast",
    ],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.set(".service-row", { opacity: 0, y: 24 });

      gsap.to(".service-row", {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".service-list",
          start: "top 80%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative font-[family-name:var(--font-body)]"
      style={{ backgroundColor: TOKENS.ink }}
    >
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-32">
        {/* header */}
        <div className="max-w-2xl">
          <p
            className="mb-6 flex items-center gap-2 font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.14em]"
            style={{ color: TOKENS.accent }}
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: TOKENS.accent }}
            />
            Services — what&rsquo;s included
          </p>
          <h2
            className="font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl"
            style={{ color: TOKENS.paper }}
          >
            Built to bring in work,
            <br />
            not just look nice.
          </h2>
          <p
            className="mt-6 max-w-md text-base leading-relaxed"
            style={{ color: TOKENS.mutedOnDark }}
          >
            Four things, done properly, instead of ten things done halfway.
          </p>
        </div>

        {/* itemized service list */}
        <div
          className="service-list mt-16 border-t sm:mt-20"
          style={{ borderColor: TOKENS.hairlineOnDark }}
        >
          {services.map((service) => (
            <div
              key={service.number}
              className="service-row group grid grid-cols-1 gap-4 border-b py-9 transition-colors duration-300 sm:gap-8 sm:py-11 lg:grid-cols-[4rem_1fr_16rem]"
              style={{ borderColor: TOKENS.hairlineOnDark }}
            >
              <span
                className="font-[family-name:var(--font-mono)] text-sm"
                style={{ color: TOKENS.mutedOnDark }}
              >
                {service.number}
              </span>

              <div>
                <h3
                  className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight transition-colors duration-300 sm:text-3xl"
                  style={{ color: TOKENS.paper }}
                >
                  {service.name}
                </h3>
                <p
                  className="mt-3 max-w-xl text-[15px] leading-relaxed"
                  style={{ color: TOKENS.mutedOnDark }}
                >
                  {service.description}
                </p>
              </div>

              <ul className="flex flex-col gap-2 lg:items-end lg:text-right">
                {service.includes.map((item) => (
                  <li
                    key={item}
                    className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wide"
                    style={{ color: TOKENS.mutedOnDark }}
                  >
                    {item}
                  </li>
                ))}
              </ul>

              {/* accent bar, appears on hover — the only "reward" motion in this section */}
              <span
                aria-hidden
                className="absolute -ml-6 hidden h-full w-0.5 -translate-x-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:block"
                style={{ backgroundColor: TOKENS.accent }}
              />
            </div>
          ))}
        </div>

        {/* soft close */}
        <div className="mt-14 flex flex-col items-start gap-4 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm" style={{ color: TOKENS.mutedOnDark }}>
            Not sure which of these you actually need?
          </p>
          <a
            href="/audit"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-xs font-semibold uppercase tracking-wide underline decoration-2 underline-offset-4 transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            style={{
              color: TOKENS.paper,
              textDecorationColor: TOKENS.accent,
              outlineColor: TOKENS.accent,
            }}
          >
            Get a free audit →
          </a>
        </div>
      </div>
    </section>
  );
}
