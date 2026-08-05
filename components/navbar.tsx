"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";

/**
 * Same token set as hero.tsx. If you haven't already, pull TOKENS and the
 * three next/font declarations out into a shared lib/tokens.ts and
 * app/layout.tsx respectively — Navbar and Hero should not each be
 * instantiating their own copy of the same fonts.
 */
const TOKENS = {
  paper: "#EDEAE3",
  ink: "#14171A",
  accent: "#B4622A",
  trust: "#1F3D2B",
  hairline: "#D8D3C7",
};

const links = [
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Work", href: "#case-studies" },
  { label: "How I Work", href: "#how-i-work" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLAnchorElement[]>([]);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  // scroll state — toggles the hairline/bg once the page moves
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll + animate mobile menu open/close
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (menuOpen) {
      document.body.style.overflow = "hidden";
      firstLinkRef.current?.focus();

      if (!reduceMotion && menuRef.current) {
        gsap.set(menuRef.current, { display: "flex" });
        gsap.fromTo(
          menuRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power2.out" },
        );
        gsap.fromTo(
          menuLinksRef.current,
          { yPercent: 40, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: "power3.out",
            delay: 0.05,
          },
        );
      } else if (menuRef.current) {
        gsap.set(menuRef.current, { display: "flex", opacity: 1 });
        gsap.set(menuLinksRef.current, { opacity: 1, yPercent: 0 });
      }
    } else {
      document.body.style.overflow = "";
      if (!reduceMotion && menuRef.current) {
        gsap.to(menuRef.current, {
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
          onComplete: () => gsap.set(menuRef.current, { display: "none" }),
        });
      } else if (menuRef.current) {
        gsap.set(menuRef.current, { display: "none" });
      }
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 font-[family-name:var(--font-body)]">
      <nav
        className="flex items-center justify-between border-b px-6 transition-[padding,background-color,border-color] duration-300 sm:px-10"
        style={{
          backgroundColor: scrolled ? TOKENS.paper : "transparent",
          borderColor: scrolled ? TOKENS.hairline : "transparent",
          paddingTop: scrolled ? "1rem" : "1.5rem",
          paddingBottom: scrolled ? "1rem" : "1.5rem",
        }}
      >
        {/* wordmark */}
        <Link
          href="#top"
          className="font-[family-name:var(--font-display)] text-xl font-extrabold tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
          style={{ color: TOKENS.ink, outlineColor: TOKENS.accent }}
        >
          Zani<span style={{ color: TOKENS.accent }}>.</span>
        </Link>

        {/* desktop links */}
        <ul className="hidden items-center gap-9 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.1em] transition-opacity hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                style={{ color: TOKENS.ink, outlineColor: TOKENS.accent }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* right: availability + CTA (desktop), hamburger (mobile) */}
        <div className="flex items-center gap-5">
          <div
            className="hidden items-center gap-2 rounded-full border px-3 py-1.5 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wide md:flex"
            style={{ borderColor: TOKENS.hairline, color: "#54524B" }}
          >
            <span
              className="motion-safe:animate-pulse inline-block h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: TOKENS.trust }}
              aria-hidden
            />
            Booking new projects
          </div>

          <Link
            href="#contact"
            className="hidden items-center gap-2 px-5 py-2.5 font-[family-name:var(--font-mono)] text-[11px] font-semibold uppercase tracking-wide transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 lg:inline-flex"
            style={{
              backgroundColor: TOKENS.ink,
              color: TOKENS.paper,
              outlineColor: TOKENS.accent,
            }}
          >
            Book a free audit
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 lg:hidden"
            style={{ outlineColor: TOKENS.accent }}
          >
            <span
              className="h-px w-6 transition-transform duration-300"
              style={{
                backgroundColor: TOKENS.ink,
                transform: menuOpen ? "translateY(3px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="h-px w-6 transition-opacity duration-200"
              style={{ backgroundColor: TOKENS.ink, opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="h-px w-6 transition-transform duration-300"
              style={{
                backgroundColor: TOKENS.ink,
                transform: menuOpen
                  ? "translateY(-3px) rotate(-45deg)"
                  : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {/* mobile menu overlay */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className="fixed inset-0 top-0 hidden flex-col justify-between px-6 pb-10 pt-24 sm:px-10 lg:hidden"
        style={{ backgroundColor: TOKENS.paper, display: "none" }}
      >
        <ul className="flex flex-col gap-1">
          {links.map((link, i) => (
            <li
              key={link.href}
              className="overflow-hidden border-b"
              style={{ borderColor: TOKENS.hairline }}
            >
              <Link
                ref={(el) => {
                  if (el) {
                    menuLinksRef.current[i] = el;
                    if (i === 0) firstLinkRef.current = el;
                  }
                }}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-5 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                style={{ color: TOKENS.ink, outlineColor: TOKENS.accent }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-5">
          <Link
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center gap-2 py-4 font-[family-name:var(--font-mono)] text-xs font-semibold uppercase tracking-wide"
            style={{ backgroundColor: TOKENS.ink, color: TOKENS.paper }}
          >
            Book a free audit
          </Link>
          <p
            className="text-center font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wide"
            style={{ color: "#8A8880" }}
          >
            Currently booking new projects
          </p>
        </div>
      </div>
    </header>
  );
}
