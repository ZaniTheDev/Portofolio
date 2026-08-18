"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import PestControl from "../public/images/Cascade-pest-control.png";
import CodePortfolio from "../public/images/code-portfolio.png";
import VercelAnalytics from "../public/images/vercel-analytics.png";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Draggable, useGSAP);
}

// 1. EXTRACTED STATIC ASSETS
// Moved outside the render tree so React doesn't re-evaluate this string on every render.
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

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
  finishedSrc: StaticImageData | string;
  btsSrc: StaticImageData | string;
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
      let currentProgress = 20;

      const setClip = (progress: number) => {
        gsap.set(topLayerRef.current, {
          clipPath: `polygon(0% 0%, ${progress}% 0%, ${progress}% 100%, 0% 100%)`,
        });
      };

      gsap.set(handleRef.current, { x: (containerWidth / 100) * 20 });
      setClip(20);

      const draggable = Draggable.create(handleRef.current, {
        type: "x",
        bounds: containerRef.current,
        onDrag: function () {
          currentProgress = (this.x / containerRef.current!.offsetWidth) * 100;
          currentProgress = Math.max(0, Math.min(100, currentProgress));
          setClip(currentProgress);
        },
      });

      const scrollDrag = gsap.to(
        { progress: 20 },
        {
          progress: 90,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "center center",
            end: "+=1000",
            scrub: 1,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
          },
          onUpdate: function () {
            // 2. PREVENT RACE CONDITIONS
            // Only update via scroll if the user isn't actively dragging
            if (!draggable[0].isDragging) {
              currentProgress = this.targets()[0].progress;
              const x = (currentProgress / 100) * containerWidth;

              gsap.set(handleRef.current, { x });
              setClip(currentProgress);
              draggable[0].update(true);
            }
          },
        },
      );

      // 3. DEBOUNCED RESIZE
      let resizeTimer: NodeJS.Timeout;
      const handleResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          if (!containerRef.current || !handleRef.current) return;
          containerWidth = containerRef.current.offsetWidth;
          const newX = (currentProgress / 100) * containerWidth;

          gsap.set(handleRef.current, { x: newX });
          draggable[0].update(true);
        }, 150); // 150ms debounce
      };

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
        clearTimeout(resizeTimer);
        scrollDrag.scrollTrigger?.kill();
      };
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${containerClassName}`}
      // Hint to the browser to prepare for internal layer movement
      style={{ willChange: "transform" }}
    >
      {/* BASE LAYER */}
      <div className="absolute inset-0 z-10 w-full h-full overflow-hidden">
        {/* 4. OPTIMIZED NEXT.JS IMAGES + GPU ACCELERATION */}
        <Image
          src={btsSrc}
          alt={`${alt} - Behind The Scenes`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="parallax-image object-cover scale-[1.15]"
          style={{ willChange: "transform", transform: "translateZ(0)" }}
        />
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />
        <div className="absolute bottom-4 right-4 text-[10px] font-[family-name:var(--font-mono)] text-white/70 uppercase tracking-widest z-10 px-2 py-1 border border-white/20 bg-black/60 backdrop-blur-sm pointer-events-none">
          Behind The Scenes
        </div>
      </div>

      {/* TOP LAYER */}
      <div
        ref={topLayerRef}
        className="absolute inset-0 z-20 w-full h-full overflow-hidden"
        // Force hardware acceleration for the heavy clip-path operation
        style={{
          willChange: "clip-path, transform",
          transform: "translateZ(0)",
        }}
      >
        <Image
          src={finishedSrc}
          alt={`${alt} - Finished Result`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="parallax-image object-cover scale-[1.15]"
          style={{ willChange: "transform", transform: "translateZ(0)" }}
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
        style={{ willChange: "transform", transform: "translateZ(0)" }}
      >
        <div className="absolute inset-y-0 left-1/2 w-[2px] -ml-[1px] bg-[#B4622A] pointer-events-none shadow-[0_0_10px_rgba(0,0,0,0.5)]" />
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
                // 5. REMOVED SCRUB ON TEXT REVEAL
                // Once triggered, let the text animate independently instead of tying it to the scroll thread
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
      {/* BLUEPRINT 01 */}
      <section
        className="project-section relative w-full overflow-hidden pb-[clamp(4rem,15vh,8rem)] pt-[clamp(4rem,10vh,6rem)]"
        style={{ backgroundColor: TOKENS.ink, color: TOKENS.paper }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: NOISE_SVG }}
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
              <ImageSlider
                containerClassName="max-h-[75vh] aspect-[4/5] bg-[#1F2226] sm:aspect-[16/9] lg:aspect-[4/3]"
                finishedSrc={PestControl}
                btsSrc={CodePortfolio}
                alt="Pest Control Lead System Architecture"
              />

              <div
                className="floating-stat absolute -bottom-10 right-4 z-40 w-48 border bg-[#EDEAE3] p-5 shadow-2xl sm:-left-10 sm:bottom-10 sm:right-auto sm:w-56 lg:-left-20 lg:bottom-20 lg:w-64"
                style={{
                  borderColor: TOKENS.ink,
                  willChange: "transform",
                  transform: "translateZ(0)",
                }}
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

            <div className="relative z-10 mt-12 bg-[#14171A] p-6 lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:-mr-32 lg:mt-[clamp(2rem,10vh,8rem)] lg:p-12 lg:pl-0 lg:shadow-[-20px_0_40px_rgba(20,23,26,1)] pointer-events-none">
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

      {/* BLUEPRINT 02 */}
      <section
        className="project-section relative w-full overflow-hidden pb-[clamp(4rem,15vh,8rem)] pt-[clamp(4rem,10vh,6rem)]"
        style={{ backgroundColor: TOKENS.paper, color: TOKENS.ink }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: NOISE_SVG }}
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
              <ImageSlider
                containerClassName="max-h-[75vh] aspect-[4/5] bg-[#D8D3C7] sm:aspect-[16/9] lg:aspect-[4/3]"
                finishedSrc="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2500&auto=format&fit=crop"
                btsSrc={VercelAnalytics}
                alt="Gym booking application architecture"
              />

              <div
                className="floating-stat absolute -bottom-10 left-4 z-40 w-48 border bg-[#14171A] p-5 shadow-2xl sm:-right-10 sm:bottom-10 sm:left-auto sm:w-56 lg:-right-20 lg:bottom-20 lg:w-64"
                style={{
                  borderColor: TOKENS.hairlineDark,
                  willChange: "transform",
                  transform: "translateZ(0)",
                }}
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

            <div className="relative z-10 mt-12 bg-[#EDEAE3] p-6 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:-ml-32 lg:mt-[clamp(2rem,10vh,8rem)] lg:p-12 lg:pr-0 lg:shadow-[20px_0_40px_rgba(228,224,214,1)] pointer-events-none">
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
