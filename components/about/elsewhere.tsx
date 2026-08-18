"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import github from "../../public/images/about/github.png";
import instagram from "../../public/images/about/instagram.png";
import discord from "../../public/images/about/discord.png";
import email from "../../public/images/about/email.png";

import { StaticImageData } from "next/image";
// Data stored exclusively on the client side[cite: 1]
const SOCIAL_LINKS = [
  {
    id: "01",
    platform: "GITHUB",
    description: "Where most of my questionable decisions are committed.",
    href: "https://github.com/ZaniTheDev",
    image: github,
  },
  {
    id: "02",
    platform: "INSTAGRAM",
    description:
      "Mostly friends, random photos, and occasionally something worth posting.",
    href: "https://www.instagram.com/voidsparkmedia/?hl=en",
    image: instagram,
  },

  {
    id: "04",
    platform: "DISCORD",
    description: "Probably doing something other than what I should be doing.",
    href: "https://discord.com/users/763333673554542612",
    image: discord,
  },
  {
    id: "05",
    platform: "EMAIL",
    description: "For things that actually matter.",
    href: "mailto:hamzahtizani@gmail.com",
    image: email,
  },
];

type LinkData = {
  id: string;
  platform: string;
  description: string;
  href: string;
  image: StaticImageData | string;
};

export default function ElsewhereContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const floatingImageRef = useRef<HTMLDivElement>(null);
  const imageElementRef = useRef<HTMLImageElement>(null);

  // Keep track of the active image
  const [activeImage, setActiveImage] = useState<string | null>(null);
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let xSetter: gsap.QuickToFunc;
    let ySetter: gsap.QuickToFunc;

    const ctx = gsap.context(() => {
      // 1. Initial Page Reveal
      if (!prefersReducedMotion) {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .fromTo(
            ".reveal-header",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, delay: 0.1 },
          )
          .fromTo(
            ".reveal-row",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.08 },
            "-=0.8",
          );
      }

      // 2. Setup Cursor Tracking for the Floating Dialog
      if (floatingImageRef.current) {
        // Center the tracker slightly offset from the cursor so it doesn't block clicks
        gsap.set(floatingImageRef.current, { xPercent: 15, yPercent: 15 });

        xSetter = gsap.quickTo(floatingImageRef.current, "x", {
          duration: 0.4,
          ease: "power3.out",
        });

        ySetter = gsap.quickTo(floatingImageRef.current, "y", {
          duration: 0.4,
          ease: "power3.out",
        });
      }
    }, containerRef);

    const handleMouseMove = (e: MouseEvent) => {
      if (xSetter && ySetter) {
        xSetter(e.clientX);
        ySetter(e.clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleMouseEnter = (index: number) => {
    const row = rowsRef.current[index];
    const linkData = SOCIAL_LINKS[index];
    if (!row) return;

    // Set the image source
    setActiveImage(
      typeof linkData.image === "string" ? linkData.image : linkData.image.src,
    );
    // Dim all other rows smoothly
    gsap.to(
      rowsRef.current.filter((_, i) => i !== index),
      {
        opacity: 0.2,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      },
    );

    // Shift the platform name and turn it editorial red
    gsap.to(row.querySelector(".platform-name"), {
      x: 24,
      color: "#D94833",
      duration: 0.5,
      ease: "expo.out",
      overwrite: "auto",
    });

    // Snap the connecting line across the void
    gsap.to(row.querySelector(".connect-line"), {
      scaleX: 1,
      opacity: 1,
      duration: 0.6,
      ease: "expo.out",
      overwrite: "auto",
    });

    // Push the description slightly left to create tension
    gsap.to(row.querySelector(".desc-block"), {
      x: -16,
      duration: 0.5,
      ease: "expo.out",
      overwrite: "auto",
    });

    // Reveal and shoot the arrow out
    gsap.fromTo(
      row.querySelector(".arrow"),
      { x: -20, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        color: "#D94833",
        duration: 0.5,
        ease: "back.out(2)",
        overwrite: "auto",
      },
    );

    // Reveal the floating image
    if (floatingImageRef.current) {
      gsap.to(floatingImageRef.current, {
        opacity: 1,
        scale: 1,
        rotate: Math.random() * 4 - 2, // Subtle physical rotation (-2deg to 2deg)
        duration: 0.5,
        ease: "back.out(1.5)",
        overwrite: "auto",
      });
    }
  };

  const handleMouseLeave = (index: number) => {
    const row = rowsRef.current[index];
    if (!row) return;

    // Restore all rows
    gsap.to(rowsRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });

    // Reset platform name
    gsap.to(row.querySelector(".platform-name"), {
      x: 0,
      color: "currentColor",
      duration: 0.5,
      ease: "power3.out",
      overwrite: "auto",
    });

    // Collapse the connecting line
    gsap.to(row.querySelector(".connect-line"), {
      scaleX: 0,
      opacity: 0,
      duration: 0.4,
      ease: "power3.out",
      overwrite: "auto",
    });

    // Reset description position
    gsap.to(row.querySelector(".desc-block"), {
      x: 0,
      duration: 0.5,
      ease: "power3.out",
      overwrite: "auto",
    });

    // Hide the arrow
    gsap.to(row.querySelector(".arrow"), {
      x: 10,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      overwrite: "auto",
    });

    // Hide the floating image
    if (floatingImageRef.current) {
      gsap.to(floatingImageRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  return (
    <>
      {/* 
        The Floating Image Tracker 
        Rendered outside the main structural flow to avoid z-index and clipping issues.
        The grayscale and contrast filters make the screenshots feel like editorial assets.
      */}
      <div
        ref={floatingImageRef}
        className="pointer-events-none fixed top-0 left-0 z-50 w-72 md:w-96 aspect-video bg-[#F9F8F4] border border-[#1C1B1A] shadow-2xl opacity-0 scale-90 overflow-hidden hidden md:block"
      >
        {activeImage && (
          <img
            ref={imageElementRef}
            src={activeImage}
            alt="Social Platform Preview"
            className="w-full h-full object-cover grayscale contrast-125 mix-blend-multiply opacity-90"
          />
        )}
      </div>

      <div
        ref={containerRef}
        className="flex flex-col min-h-screen px-6 py-12 md:px-12 md:py-24 max-w-[1800px] mx-auto w-full selection:bg-[#D94833] selection:text-[#F9F8F4]"
      >
        {/* Header Section */}
        <header className="reveal-header mb-24 md:mb-40 mt-4 md:mt-12 flex flex-col md:flex-row md:items-end justify-between gap-12 relative z-10">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <span
                className="block w-2.5 h-2.5 bg-[#D94833]"
                aria-hidden="true"
              />
              <span className="text-xs font-[var(--font-mono)] tracking-[0.2em] uppercase text-[#1C1B1A]/60">
                03 — Elsewhere
              </span>
            </div>

            {/* 
              Adjusted the viewport widths slightly down as requested earlier, 
              giving the negative space room to breathe.
            */}
            <h1 className="font-[var(--font-display)] text-[12vw] md:text-[9vw] leading-[0.75] tracking-tighter font-extrabold uppercase">
              Elsewhere.
            </h1>
          </div>

          <p className="text-lg md:text-xl font-[var(--font-body)] text-[#1C1B1A]/70 max-w-sm md:text-right pb-2">
            Other places I exist on the internet.
          </p>
        </header>

        {/* Interactive Spatial List */}
        <nav
          className="flex-1 w-full border-t border-[#1C1B1A]/15 relative z-10"
          aria-label="Social Links"
        >
          <ul className="flex flex-col">
            {SOCIAL_LINKS.map((link, i) => {
              const isExternal = link.href.startsWith("http");
              return (
                <li
                  key={link.id}
                  className="reveal-row border-b border-[#1C1B1A]/15"
                >
                  <a
                    href={link.href}
                    ref={(el) => {
                      rowsRef.current[i] = el;
                    }}
                    onMouseEnter={() => handleMouseEnter(i)}
                    onMouseLeave={() => handleMouseLeave(i)}
                    onFocus={() => handleMouseEnter(i)}
                    onBlur={() => handleMouseLeave(i)}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="group flex flex-col md:flex-row items-start md:items-center justify-between py-10 md:py-16 focus-visible:outline-none focus-visible:bg-[#1C1B1A]/5 cursor-pointer w-full relative"
                  >
                    {/* Left Side: Number + Platform */}
                    <div className="flex items-baseline gap-6 md:gap-16 w-full md:w-auto z-10">
                      <span className="text-sm font-[var(--font-mono)] text-[#1C1B1A]/40 shrink-0">
                        {link.id}
                      </span>
                      <h2 className="platform-name font-[var(--font-display)] text-5xl md:text-7xl font-bold tracking-tight uppercase origin-left">
                        {link.platform}
                      </h2>
                    </div>

                    {/* Middle: The Dynamic Connecting Line (Hidden on Mobile) */}
                    <div className="hidden md:flex flex-1 px-12 items-center h-full z-0">
                      <div className="connect-line h-[2px] w-full bg-[#D94833] origin-left scale-x-0 opacity-0" />
                    </div>

                    {/* Right Side: Editorial Description & Arrow */}
                    <div className="desc-block flex items-end gap-8 w-full md:w-auto mt-8 md:mt-0 justify-between md:justify-end z-10 md:pl-0 pl-[3.5rem]">
                      <p className="text-sm md:text-base font-[var(--font-body)] text-[#1C1B1A]/70 max-w-[320px] md:text-right leading-relaxed">
                        {link.description}
                      </p>
                      <span className="arrow text-3xl font-light opacity-0 -translate-x-4 hidden md:block">
                        ↗
                      </span>
                      {/* Mobile fallback arrow */}
                      <span className="md:hidden text-2xl text-[#1C1B1A]/40">
                        ↗
                      </span>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Editorial Footer */}
        <footer className="mt-32 pb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-12 relative z-10">
          <p className="text-xs font-[var(--font-mono)] text-[#1C1B1A]/50 uppercase tracking-widest">
            That's enough internet for today.
          </p>

          <Link
            href="https://zanidev.site"
            className="group flex items-center gap-4 text-xs font-[var(--font-mono)] tracking-widest uppercase hover:text-[#D94833] transition-colors focus-visible:outline-none"
          >
            <span className="border-b border-[#1C1B1A]/20 group-hover:border-[#D94833] pb-1 transition-colors">
              my freelancing site
            </span>
            <span
              className="block w-2 h-2 bg-[#1C1B1A] group-hover:bg-[#D94833] transition-colors"
              aria-hidden="true"
            />
          </Link>
        </footer>
      </div>
    </>
  );
}
