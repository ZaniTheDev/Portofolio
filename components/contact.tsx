"use client";

import { useEffect, useRef, useActionState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bricolage_Grotesque, Inter, IBM_Plex_Mono } from "next/font/google";
import { submitContactAction } from "@/app/actions/submit-contact"; // Adjust path as needed

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  ink: "#14171A",
  accent: "#B4622A",
  hairlineDark: "#2D3136",
  muted: "#8A8F94",
};

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  // Hooking up the Server Action
  const [state, formAction, isPending] = useActionState(
    submitContactAction,
    {},
  );

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-reveal",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`${display.variable} ${body.variable} ${mono.variable} relative font-[family-name:var(--font-body)]`}
      style={{ backgroundColor: TOKENS.ink, color: TOKENS.paper }}
    >
      <div className="relative mx-auto max-w-7xl px-6 pt-24 sm:px-10 sm:pt-32 lg:pt-40">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
          {/* LEFT: Massive Headline & Direct Contact */}
          <div className="lg:col-span-6 lg:pr-12">
            <p
              className="contact-reveal mb-6 inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.14em]"
              style={{ color: TOKENS.accent }}
            >
              <span
                className="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: TOKENS.accent }}
              />
              Initiate Project
            </p>

            <h2 className="contact-reveal font-[family-name:var(--font-display)] text-[12vw] font-extrabold leading-[0.95] tracking-tight sm:text-7xl lg:text-[5.5rem]">
              Let&apos;s build
              <br />
              your machine.
            </h2>

            <p
              className="contact-reveal mt-8 max-w-md text-base leading-relaxed sm:text-lg"
              style={{ color: TOKENS.muted }}
            >
              Stop paying for dead-end clicks and generic templates. Request a
              callback below or email me directly to discuss automating your
              service business.
            </p>

            <div
              className="contact-reveal mt-12 grid grid-cols-2 gap-8 border-t pt-8"
              style={{ borderColor: TOKENS.hairlineDark }}
            >
              <div>
                <p
                  className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest"
                  style={{ color: TOKENS.muted }}
                >
                  Direct Inquiry
                </p>
                <a
                  href="mailto:hamzahtizani@gmail.com"
                  className="mt-3 block text-sm transition-opacity hover:opacity-70 sm:text-base"
                >
                  hamzahtizani@gmail.com
                </a>
              </div>
              <div>
                <p
                  className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest"
                  style={{ color: TOKENS.muted }}
                >
                  Current Status
                </p>
                <div className="mt-3 flex items-center gap-2 text-sm sm:text-base">
                  <span className="motion-safe:animate-pulse inline-block h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                  Booking for next month
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Clean, Architectural Form */}
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-4">
            {state.success ? (
              <div
                className="contact-reveal flex h-full flex-col justify-center rounded-lg border p-8"
                style={{ borderColor: TOKENS.hairlineDark }}
              >
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold">
                  Transmission Successful
                </h3>
                <p
                  className="mt-4 text-sm leading-relaxed"
                  style={{ color: TOKENS.muted }}
                >
                  Your inquiry has been received. Check your inbox for a
                  confirmation, and I will be in touch shortly to discuss your
                  project.
                </p>
              </div>
            ) : (
              <form
                action={formAction}
                className="contact-reveal flex flex-col gap-12"
              >
                <div className="flex flex-col gap-4">
                  <label
                    htmlFor="name"
                    className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest"
                    style={{ color: TOKENS.muted }}
                  >
                    01. Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="John Doe"
                    className="w-full border-b border-l-0 border-r-0 border-t-0 bg-transparent pb-3 text-lg transition-colors placeholder:opacity-30 focus:outline-none focus:ring-0"
                    style={{
                      borderColor: TOKENS.hairlineDark,
                      color: TOKENS.paper,
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = TOKENS.accent)
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = TOKENS.hairlineDark)
                    }
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <label
                    htmlFor="company"
                    className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest"
                    style={{ color: TOKENS.muted }}
                  >
                    02. Company / Trade
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    placeholder="Apex Plumbing"
                    className="w-full border-b border-l-0 border-r-0 border-t-0 bg-transparent pb-3 text-lg transition-colors placeholder:opacity-30 focus:outline-none focus:ring-0"
                    style={{
                      borderColor: TOKENS.hairlineDark,
                      color: TOKENS.paper,
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = TOKENS.accent)
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = TOKENS.hairlineDark)
                    }
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <label
                    htmlFor="email"
                    className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest"
                    style={{ color: TOKENS.muted }}
                  >
                    03. Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="john@apexplumbing.com"
                    className="w-full border-b border-l-0 border-r-0 border-t-0 bg-transparent pb-3 text-lg transition-colors placeholder:opacity-30 focus:outline-none focus:ring-0"
                    style={{
                      borderColor: TOKENS.hairlineDark,
                      color: TOKENS.paper,
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = TOKENS.accent)
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = TOKENS.hairlineDark)
                    }
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <label
                    htmlFor="details"
                    className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest"
                    style={{ color: TOKENS.muted }}
                  >
                    04. Project Details
                  </label>
                  <textarea
                    id="details"
                    name="details"
                    rows={2}
                    placeholder="What is your biggest bottleneck right now?"
                    className="w-full resize-none border-b border-l-0 border-r-0 border-t-0 bg-transparent pb-3 text-lg transition-colors placeholder:opacity-30 focus:outline-none focus:ring-0"
                    style={{
                      borderColor: TOKENS.hairlineDark,
                      color: TOKENS.paper,
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = TOKENS.accent)
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = TOKENS.hairlineDark)
                    }
                  />
                </div>

                {state.error && (
                  <p className="text-sm text-red-500">{state.error}</p>
                )}

                <button
                  type="submit"
                  disabled={isPending}
                  className="group mt-2 flex w-full items-center justify-between border px-6 py-5 text-sm font-bold uppercase tracking-widest transition-transform duration-200 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50"
                  style={{
                    backgroundColor: TOKENS.paper,
                    borderColor: TOKENS.paper,
                    color: TOKENS.ink,
                  }}
                >
                  <span>
                    {isPending ? "Transmitting..." : "Request Callback"}
                  </span>
                  <span
                    aria-hidden
                    className="transition-transform duration-200 group-hover:translate-x-2"
                  >
                    →
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Massive Footer Anchor */}
      <div
        className="relative mt-24 border-t px-6 pb-6 pt-12 sm:px-10 sm:pt-16 lg:mt-32"
        style={{ borderColor: TOKENS.hairlineDark }}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <ul
            className="flex flex-wrap items-center gap-6 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest"
            style={{ color: TOKENS.muted }}
          >
            <li>
              <Link
                href="#services"
                className="transition-colors hover:text-white"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="#industries"
                className="transition-colors hover:text-white"
              >
                Industries
              </Link>
            </li>
            <li>
              <Link href="#work" className="transition-colors hover:text-white">
                Work
              </Link>
            </li>
            <li>
              <Link href="#faq" className="transition-colors hover:text-white">
                FAQ
              </Link>
            </li>
          </ul>

          <div
            className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest"
            style={{ color: TOKENS.muted }}
          >
            &copy; {new Date().getFullYear()} ZANI. ALL RIGHTS RESERVED.
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-7xl overflow-hidden sm:mt-24">
          <h2
            className="font-[family-name:var(--font-display)] text-[2vw] font-extrabold leading-[0.75] tracking-tight selection:bg-transparent"
            style={{ color: TOKENS.paper, opacity: 0.95 }}
          >
            Zani<span style={{ color: TOKENS.accent }}>.</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
