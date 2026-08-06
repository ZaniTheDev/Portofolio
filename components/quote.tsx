"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import pfp from "../public/images/pfp.jpeg";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const TOKENS = {
  ink: "#14171A",
  paper: "#EDEAE3",
  accent: "#B4622A",
  mutedDark: "rgba(20, 23, 26, 0.5)",
  hairlineLight: "rgba(20, 23, 26, 0.15)",
};

export default function FoundersManifesto() {
  const containerRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const quoteLines = gsap.utils.toArray(".quote-line-inner");
        const sidebarElements = gsap.utils.toArray(".sidebar-reveal");
        const divider = document.querySelector(".vertical-divider");
        const portrait = document.querySelector(".portrait-image");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        });

        // The vertical line grows down
        if (divider) {
          tl.fromTo(
            divider,
            { height: "0%" },
            { height: "100%", duration: 1.2, ease: "power3.inOut" },
          );
        }

        // The massive quote rises
        tl.fromTo(
          quoteLines,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power4.out",
          },
          "-=0.8",
        )
          // Sidebar details and portrait fade in and slide up
          .fromTo(
            sidebarElements,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.12,
              ease: "power3.out",
            },
            "-=0.6",
          );

        // Subtle parallax on the founder portrait
        if (portrait) {
          gsap.fromTo(
            portrait,
            { scale: 1.1, yPercent: -5 },
            {
              scale: 1,
              yPercent: 5,
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        }
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[80vh] w-full items-center border-t py-32 overflow-hidden"
      style={{
        backgroundColor: TOKENS.paper,
        color: TOKENS.ink,
        borderColor: TOKENS.hairlineLight,
      }}
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="relative grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-0">
          {/* LEFT COLUMN: Massive Manifesto */}
          <div className="relative lg:col-span-8 lg:pr-20 lg:pt-10">
            {/* Architectural Opening Quotation Mark */}
            <span
              aria-hidden
              className="absolute -left-4 -top-8 font-[family-name:var(--font-display)] text-[120px] leading-none opacity-10 sm:-left-10 sm:-top-12 sm:text-[160px]"
              style={{ color: TOKENS.accent }}
            >
              "
            </span>

            <h2
              ref={quoteRef}
              className="relative z-10 font-[family-name:var(--font-display)] text-[2.5rem] font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-[4.2rem]"
            >
              <span className="block overflow-hidden pb-2">
                <span className="quote-line-inner block">
                  A beautiful website without
                </span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span className="quote-line-inner block">
                  an automated lead system
                </span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span className="quote-line-inner block">
                  is just an expensive digital
                </span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span className="quote-line-inner block">business card.</span>
              </span>
              <span className="mt-4 block overflow-hidden pb-2 sm:mt-6">
                <span
                  className="quote-line-inner block"
                  style={{ color: TOKENS.accent }}
                >
                  I don't build those."
                </span>
              </span>
            </h2>
          </div>

          {/* EDITORIAL DIVIDER (Desktop Only) */}
          <div className="absolute bottom-0 left-[66.666%] top-0 hidden w-px lg:block">
            <div className="vertical-divider w-full bg-[#14171A]/15" />
          </div>

          {/* RIGHT COLUMN: Author Portrait & Bio */}
          <div className="flex flex-col justify-between lg:col-span-4 lg:pl-16 lg:pt-10">
            {/* High-End Founder Portrait */}
            <div className="sidebar-reveal relative mb-12 aspect-[4/5] w-full max-w-[280px] overflow-hidden bg-[#D8D3C7] lg:mb-0">
              {/* 
                Use a sharp, professional, preferably monochromatic or subtly color-graded photo of yourself here. 
                Look directly at the camera. Look confident. 
              */}
              <Image
                src={pfp}
                alt="Zani - System Architect"
                fill
                className="portrait-image object-cover filter grayscale"
              />
              <div className="absolute inset-0 bg-[#14171A]/10 mix-blend-multiply" />
            </div>

            {/* Author Details */}
            <div
              className="mt-auto border-t pt-8 lg:mt-16"
              style={{ borderColor: TOKENS.hairlineLight }}
            >
              <div className="flex items-center gap-4">
                <div>
                  <h3 className="sidebar-reveal font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight">
                    Zani
                  </h3>
                  <span
                    className="sidebar-reveal block font-[family-name:var(--font-mono)] text-[10px] font-bold uppercase tracking-[0.14em]"
                    style={{ color: TOKENS.accent }}
                  >
                    System Architect
                  </span>
                </div>
              </div>

              <p
                className="sidebar-reveal mt-6 font-[family-name:var(--font-body)] text-sm leading-relaxed"
                style={{ color: TOKENS.mutedDark }}
              >
                I engineer your digital infrastructure from the foundation up.
                By avoiding generic, bloated templates, I ensure your system
                operates flawlessly, loads instantly, and captures leads with
                absolute stability.
              </p>

              {/* Signature / Tech Nod */}
              <div className="sidebar-reveal mt-8 flex items-center gap-2">
                <span
                  className="block h-px w-6"
                  style={{ backgroundColor: TOKENS.accent }}
                />
                <span
                  className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest"
                  style={{ color: TOKENS.mutedDark }}
                >
                  Custom Built Architecture
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
