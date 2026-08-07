"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Draggable, useGSAP);
}

const TOKENS = {
  ink: "#14171A",
  paper: "#EDEAE3",
  paperDeep: "#E4E0D6",
  accent: "#B4622A",
  mutedLight: "rgba(237, 234, 227, 0.6)",
  mutedDark: "rgba(20, 23, 26, 0.6)",
  hairlineDark: "rgba(237, 234, 227, 0.15)",
  hairlineLight: "rgba(20, 23, 26, 0.15)",
};

/**
 * ======================================================================
 * BEHIND THE SCENES SLIDER COMPONENT
 * ======================================================================
 */
function ImageSlider({
  finishedSrc,
  btsSrc,
  alt,
  containerClassName,
}: {
  finishedSrc: string;
  btsSrc: string;
  alt: string;
  containerClassName: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const topLayerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !topLayerRef.current || !handleRef.current)
        return;

      let containerWidth = containerRef.current.offsetWidth;
      let currentProgress = 50;

      // Initialize the starting position (50% split)
      gsap.set(handleRef.current, { x: containerWidth / 2 });
      gsap.set(topLayerRef.current, {
        clipPath: `polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)`,
      });

      // Initialize GSAP Draggable on the Handle
      const draggable = Draggable.create(handleRef.current, {
        type: "x",
        bounds: containerRef.current,
        onDrag: function () {
          currentProgress = (this.x / containerRef.current!.offsetWidth) * 100;
          currentProgress = Math.max(0, Math.min(100, currentProgress));

          gsap.set(topLayerRef.current, {
            clipPath: `polygon(0% 0%, ${currentProgress}% 0%, ${currentProgress}% 100%, 0% 100%)`,
          });
        },
      });

      // Handle window resizes to maintain the percentage position
      const handleResize = () => {
        if (!containerRef.current || !handleRef.current) return;
        containerWidth = containerRef.current.offsetWidth;
        const newX = (currentProgress / 100) * containerWidth;

        gsap.set(handleRef.current, { x: newX });
        draggable[0].update(true);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${containerClassName}`}
    >
      {/* BASE LAYER (Behind The Scenes) */}
      <div className="absolute inset-0 z-10 w-full h-full overflow-hidden">
        <Image
          src={btsSrc}
          alt={`${alt} - Behind The Scenes`}
          fill
          className="parallax-image object-cover scale-[1.15]"
        />
        {/* Dark tint to differentiate the BTS shot */}
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />
        <div className="absolute bottom-4 right-4 text-[10px] font-[family-name:var(--font-mono)] text-white/70 uppercase tracking-widest z-10 px-2 py-1 border border-white/20 bg-black/60 backdrop-blur-sm pointer-events-none">
          Behind The Scenes
        </div>
      </div>

      {/* TOP LAYER (Finished Result) */}
      <div
        ref={topLayerRef}
        className="absolute inset-0 z-20 w-full h-full overflow-hidden"
      >
        <Image
          src={finishedSrc}
          alt={`${alt} - Finished Result`}
          fill
          className="parallax-image object-cover scale-[1.15]"
        />
        <div className="absolute inset-0 bg-black/20 mix-blend-multiply pointer-events-none" />
        <div className="absolute bottom-4 left-4 text-[10px] font-[family-name:var(--font-mono)] text-white/90 uppercase tracking-widest z-10 px-2 py-1 border border-white/30 bg-black/40 backdrop-blur-sm pointer-events-none">
          Final Output
        </div>
      </div>

      {/* DRAG HANDLE */}
      <div
        ref={handleRef}
        className="absolute top-0 bottom-0 left-0 w-1 cursor-ew-resize z-30 flex items-center justify-center -ml-[2px]"
        aria-label="Drag to compare before and after"
      >
        {/* The thin vertical line */}
        <div className="absolute inset-y-0 left-1/2 w-[2px] -ml-[1px] bg-[#B4622A] pointer-events-none shadow-[0_0_10px_rgba(0,0,0,0.5)]" />

        {/* The grab circle */}
        <div className="relative w-8 h-8 bg-[#B4622A] rounded-full flex items-center justify-center shadow-xl border-2 border-white pointer-events-none">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l-6-6 6-6M15 18l6-6-6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/**
 * ======================================================================
 * MAIN PAGE COMPONENT
 * ======================================================================
 */
export default function FeaturedWorkDynamic() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const sections = gsap.utils.toArray(".project-section");

        sections.forEach((section: any) => {
          // Changed to querySelectorAll so it grabs BOTH images in the slider
          const images = section.querySelectorAll(".parallax-image");
          const stat = section.querySelector(".floating-stat");
          const texts = section.querySelectorAll(".reveal-text");

          if (images.length) {
            gsap.to(images, {
              yPercent: 15,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            });
          }

          if (stat) {
            gsap.to(stat, {
              y: -60,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top center",
                end: "bottom top",
                scrub: 1,
              },
            });
          }

          if (texts.length) {
            gsap.fromTo(
              texts,
              {
                y: 50,
                opacity: 0,
                clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
              },
              {
                y: 0,
                opacity: 1,
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                duration: 1,
                stagger: 0.1,
                ease: "power4.out",
                scrollTrigger: {
                  trigger: section,
                  start: "top 60%",
                },
              },
            );
          }
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="w-full" id="work">
      {/* 
        ======================================================================
        BLUEPRINT 01: PEST CONTROL SYSTEM (DARK MODE)
        ======================================================================
      */}
      <section
        className="project-section relative w-full overflow-hidden pb-32 pt-24"
        style={{ backgroundColor: TOKENS.ink, color: TOKENS.paper }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
          <div
            className="reveal-text mb-16 flex items-center justify-between border-b pb-6"
            style={{ borderColor: TOKENS.hairlineDark }}
          >
            <span
              className="font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-[0.14em]"
              style={{ color: TOKENS.accent }}
            >
              Reference Blueprint // 01
            </span>
            <span
              className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest"
              style={{ color: TOKENS.mutedLight }}
            >
              Pest Control Infrastructure
            </span>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12">
            <div className="relative z-0 lg:col-span-8 lg:col-start-5">
              {/* SLIDER INJECTED HERE */}
              <ImageSlider
                containerClassName="aspect-[4/5] bg-[#1F2226] sm:aspect-[16/9] lg:aspect-[4/3]"
                finishedSrc="https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=2500&auto=format&fit=crop"
                btsSrc="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2500&auto=format&fit=crop"
                alt="Pest Control Lead System Architecture"
              />

              <div
                className="floating-stat absolute -bottom-10 right-4 z-40 w-48 border bg-[#EDEAE3] p-5 shadow-2xl sm:-left-10 sm:bottom-10 sm:right-auto sm:w-56 lg:-left-20 lg:bottom-20 lg:w-64"
                style={{ borderColor: TOKENS.ink }}
              >
                <div className="flex items-center gap-2 border-b border-[#14171A]/20 pb-3">
                  <div
                    className="h-2 w-2 rounded-full motion-safe:animate-pulse"
                    style={{ backgroundColor: TOKENS.accent }}
                  />
                  <span className="font-[family-name:var(--font-mono)] text-[10px] font-bold uppercase tracking-widest text-[#14171A]">
                    System Standard
                  </span>
                </div>
                <div className="pt-4">
                  <span className="block font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tighter text-[#14171A] lg:text-4xl">
                    &lt; 3 Sec
                  </span>
                  <span className="mt-1 block font-[family-name:var(--font-mono)] text-xs font-medium text-[#14171A]/70">
                    Lead Routing Speed
                  </span>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-12 bg-[#14171A] p-6 lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:-mr-32 lg:mt-32 lg:p-12 lg:pl-0 lg:shadow-[-20px_0_40px_rgba(20,23,26,1)] pointer-events-none">
              <h2 className="reveal-text font-[family-name:var(--font-display)] text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl pointer-events-auto">
                Engineered for immediate dispatches.
              </h2>
              <dl className="mt-12 flex flex-col gap-10 border-l border-[#B4622A]/30 pl-6 pointer-events-auto">
                <div className="reveal-text">
                  <dt
                    className="mb-3 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-widest"
                    style={{ color: TOKENS.accent }}
                  >
                    The Industry Flaw
                  </dt>
                  <dd
                    className="font-[family-name:var(--font-body)] text-base leading-relaxed"
                    style={{ color: TOKENS.mutedLight }}
                  >
                    Most pest control sites rely on slow, bloated templates that
                    force customers through a 10-field contact form—causing high
                    bounce rates precisely when a homeowner needs emergency
                    help.
                  </dd>
                </div>
                <div className="reveal-text">
                  <dt
                    className="mb-3 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-widest"
                    style={{ color: TOKENS.accent }}
                  >
                    The Engineered Solution
                  </dt>
                  <dd
                    className="font-[family-name:var(--font-body)] text-base leading-relaxed"
                    style={{ color: TOKENS.mutedLight }}
                  >
                    Built a headless, lightning-fast architecture featuring a
                    frictionless 2-step SMS quote request. Inbound leads
                    completely bypass inbox clutter and route straight to the
                    technician's mobile device instantly.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ======================================================================
        BLUEPRINT 02: GYM & FITNESS SYSTEM (LIGHT MODE)
        ======================================================================
      */}
      <section
        className="project-section relative w-full overflow-hidden pb-32 pt-24"
        style={{ backgroundColor: TOKENS.paper, color: TOKENS.ink }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
          <div
            className="reveal-text mb-16 flex items-center justify-between border-b pb-6"
            style={{ borderColor: TOKENS.hairlineLight }}
          >
            <span
              className="font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-[0.14em]"
              style={{ color: TOKENS.accent }}
            >
              Reference Blueprint // 02
            </span>
            <span
              className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest"
              style={{ color: TOKENS.mutedDark }}
            >
              Fitness Automation System
            </span>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12">
            <div className="relative z-0 lg:col-span-8 lg:col-start-1">
              {/* SLIDER INJECTED HERE */}
              <ImageSlider
                containerClassName="aspect-[4/5] bg-[#D8D3C7] sm:aspect-[16/9] lg:aspect-[4/3]"
                finishedSrc="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2500&auto=format&fit=crop"
                btsSrc="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2500&auto=format&fit=crop"
                alt="Gym booking application architecture"
              />

              <div
                className="floating-stat absolute -bottom-10 left-4 z-40 w-48 border bg-[#14171A] p-5 shadow-2xl sm:-right-10 sm:bottom-10 sm:left-auto sm:w-56 lg:-right-20 lg:bottom-20 lg:w-64"
                style={{ borderColor: TOKENS.hairlineDark }}
              >
                <div className="flex items-center gap-2 border-b border-[#EDEAE3]/20 pb-3">
                  <div
                    className="h-2 w-2 rounded-full motion-safe:animate-pulse"
                    style={{ backgroundColor: TOKENS.accent }}
                  />
                  <span className="font-[family-name:var(--font-mono)] text-[10px] font-bold uppercase tracking-widest text-[#EDEAE3]">
                    System Standard
                  </span>
                </div>
                <div className="pt-4">
                  <span className="block font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tighter text-[#EDEAE3] lg:text-4xl">
                    Zero
                  </span>
                  <span className="mt-1 block font-[family-name:var(--font-mono)] text-xs font-medium text-[#EDEAE3]/70">
                    Front-Desk Intervention
                  </span>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-12 bg-[#EDEAE3] p-6 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:-ml-32 lg:mt-32 lg:p-12 lg:pr-0 lg:shadow-[20px_0_40px_rgba(228,224,214,1)] pointer-events-none">
              <h2 className="reveal-text font-[family-name:var(--font-display)] text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl pointer-events-auto">
                Automating trial conversions completely.
              </h2>
              <dl className="mt-12 flex flex-col gap-10 border-l border-[#B4622A]/30 pl-6 pointer-events-auto">
                <div className="reveal-text">
                  <dt
                    className="mb-3 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-widest"
                    style={{ color: TOKENS.accent }}
                  >
                    The Industry Flaw
                  </dt>
                  <dd
                    className="font-[family-name:var(--font-body)] text-base leading-relaxed"
                    style={{ color: TOKENS.mutedDark }}
                  >
                    Gym websites typically bury their schedules behind
                    unreadable PDF downloads or force users to call during
                    business hours to book a basic trial session.
                  </dd>
                </div>
                <div className="reveal-text">
                  <dt
                    className="mb-3 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-widest"
                    style={{ color: TOKENS.accent }}
                  >
                    The Engineered Solution
                  </dt>
                  <dd
                    className="font-[family-name:var(--font-body)] text-base leading-relaxed"
                    style={{ color: TOKENS.mutedDark }}
                  >
                    Integrated a real-time scheduling interface directly into
                    the primary hero view, coupled with automated SMS and email
                    sequences that nurture trial sign-ups into paid members
                    automatically.
                  </dd>
                </div>
              </dl>

              <div className="reveal-text mt-12 pt-8 pointer-events-auto">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-3 font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-widest transition-opacity hover:opacity-70"
                  style={{ color: TOKENS.ink }}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#14171A]/30 transition-transform duration-300 group-hover:scale-110">
                    <span className="text-[#B4622A]">+</span>
                  </span>
                  Request Similar System Build
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
