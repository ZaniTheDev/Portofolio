"use client";

import { useEffect, useRef, useState, useActionState } from "react";
import { gsap } from "gsap";
import { Bricolage_Grotesque, Inter, IBM_Plex_Mono } from "next/font/google";
import { submitAuditAction } from "@/app/actions/submit-audit";

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

const BOTTLENECKS = [
  "We get traffic, but no phone calls.",
  "Relying too much on Angie's List / Ads.",
  "Wasting time quoting tire-kickers.",
  "Website looks outdated next to competitors.",
];

const GOALS = [
  "More emergency/same-day calls.",
  "More high-ticket/commercial jobs.",
  "Automate booking so my team can breathe.",
];

export default function AuditPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [selectedBottleneck, setSelectedBottleneck] = useState<string | null>(
    null,
  );
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  // Hooking Next.js Server Action state
  const [state, formAction, isPending] = useActionState(submitAuditAction, {});

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (!reduceMotion) {
        gsap.set(".animate-in", { opacity: 0, y: 24 });
        gsap.set(".ticket-wrap", { opacity: 0, x: 30 });

        gsap.to(".animate-in", {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        });

        gsap.to(".ticket-wrap", {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.3,
        });

        const scannerTl = gsap.timeline({ repeat: -1 });
        scannerTl
          .to(".scanner-line", {
            yPercent: 100,
            duration: 2.5,
            ease: "sine.inOut",
          })
          .to(".scanner-line", {
            yPercent: 0,
            duration: 2.5,
            ease: "sine.inOut",
          });

        gsap.to(".radar-circle", {
          rotation: 360,
          duration: 8,
          repeat: -1,
          ease: "linear",
          transformOrigin: "center center",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${display.variable} ${body.variable} ${mono.variable} min-h-screen overflow-hidden font-[family-name:var(--font-body)]`}
      style={{ backgroundColor: TOKENS.paper, color: TOKENS.ink }}
    >
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

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 pb-24 pt-32 sm:px-10 sm:pt-40 lg:grid-cols-12 lg:gap-16">
        <div className="relative lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <div className="animate-in mb-8 flex items-center gap-4">
              <div
                className="relative flex h-16 w-16 overflow-hidden rounded-full border border-dashed"
                style={{
                  borderColor: TOKENS.ink,
                  backgroundColor: TOKENS.paperDeep,
                }}
              >
                <div
                  className="radar-circle absolute inset-0 rounded-full border-t-2"
                  style={{ borderColor: TOKENS.accent, opacity: 0.7 }}
                />
                <div
                  className="scanner-line absolute left-0 top-0 h-[2px] w-full"
                  style={{
                    backgroundColor: TOKENS.accent,
                    boxShadow: `0 0 8px ${TOKENS.accent}`,
                  }}
                />
                <div className="m-auto font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-widest opacity-60">
                  Diag
                </div>
              </div>
              <div>
                <p
                  className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em]"
                  style={{ color: TOKENS.accent }}
                >
                  System Diagnostics
                </p>
                <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.1em] opacity-60">
                  Ready for input
                </p>
              </div>
            </div>

            <h1 className="animate-in font-[family-name:var(--font-display)] text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Find the leaks in your foundation.
            </h1>

            <p
              className="animate-in mt-6 text-[15px] leading-relaxed sm:text-lg"
              style={{ color: "#3B3F42" }}
            >
              Drop your URL below. In 48 hours, I’ll send you a custom,
              10-minute video breaking down exactly why you’re losing leads to
              competitors and 3 things you can fix this week. No hard sell.
            </p>

            <ul className="animate-in mt-10 space-y-4">
              {[
                "Speed & mobile performance check",
                "Conversion bottleneck analysis",
                "Competitor gap analysis",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm sm:text-base"
                >
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: TOKENS.accent }}
                  />
                  <span style={{ color: TOKENS.ink, fontWeight: 500 }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="ticket-wrap lg:col-span-7 lg:pl-10">
          <div
            className="relative border shadow-sm"
            style={{
              borderColor: TOKENS.ink,
              backgroundColor: TOKENS.paperDeep,
            }}
          >
            <div
              aria-hidden
              className="absolute -top-3 left-8 h-6 w-6 rounded-full border-b border-l border-r"
              style={{ backgroundColor: TOKENS.paper, borderColor: TOKENS.ink }}
            />
            <div
              aria-hidden
              className="absolute -top-3 right-8 h-6 w-6 rounded-full border-b border-l border-r"
              style={{ backgroundColor: TOKENS.paper, borderColor: TOKENS.ink }}
            />

            <div
              className="flex items-center justify-between border-b px-6 py-5 sm:px-10"
              style={{ borderColor: TOKENS.ink }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="motion-safe:animate-pulse inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: TOKENS.trust }}
                />
                <span
                  className="font-[family-name:var(--font-mono)] text-[11px] font-semibold uppercase tracking-[0.14em]"
                  style={{ color: TOKENS.ink }}
                >
                  Official Intake
                </span>
              </div>
              <span
                className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-widest"
                style={{ color: "#6B6A62" }}
              >
                REF // 099-A
              </span>
            </div>

            {state.success ? (
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <div
                  className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest"
                  style={{ color: TOKENS.trust }}
                >
                  [ Status: Diagnostic Initiated ]
                </div>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold">
                  Ticket Transmitted
                </h3>
                <p className="mt-2 text-sm opacity-80">
                  Your site analysis request is queued. Expect your video report
                  within 24–48 hours.
                </p>
              </div>
            ) : (
              <form
                action={formAction}
                className="flex flex-col gap-10 px-6 py-10 sm:px-10 sm:py-12"
              >
                {/* Hidden input sync for interactive chips */}
                <input
                  type="hidden"
                  name="bottleneck"
                  value={selectedBottleneck || ""}
                />
                <input type="hidden" name="goal" value={selectedGoal || ""} />

                <div className="flex flex-col gap-8">
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <div className="relative">
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        required
                        placeholder="First Name"
                        className="peer w-full rounded-none border-b border-t-0 border-x-0 bg-transparent py-3 text-base placeholder-transparent transition-colors focus:border-b-2 focus:outline-none focus:ring-0"
                        style={{
                          borderColor: TOKENS.hairline,
                          color: TOKENS.ink,
                        }}
                      />
                      <label
                        htmlFor="firstName"
                        className="pointer-events-none absolute left-0 top-3 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-widest peer-focus:opacity-100 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest peer-[:not(:placeholder-shown)]:opacity-100"
                        style={{ color: TOKENS.accent, opacity: 0.6 }}
                      >
                        First Name
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Last Name"
                        className="peer w-full rounded-none border-b border-t-0 border-x-0 bg-transparent py-3 text-base placeholder-transparent transition-colors focus:border-b-2 focus:outline-none focus:ring-0"
                        style={{
                          borderColor: TOKENS.hairline,
                          color: TOKENS.ink,
                        }}
                      />
                      <label
                        htmlFor="lastName"
                        className="pointer-events-none absolute left-0 top-3 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-widest peer-focus:opacity-100 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest peer-[:not(:placeholder-shown)]:opacity-100"
                        style={{ color: TOKENS.accent, opacity: 0.6 }}
                      >
                        Last Name
                      </label>
                    </div>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      name="website"
                      id="website"
                      required
                      placeholder="Website URL"
                      className="peer w-full rounded-none border-b border-t-0 border-x-0 bg-transparent py-3 text-base placeholder-transparent transition-colors focus:border-b-2 focus:outline-none focus:ring-0"
                      style={{
                        borderColor: TOKENS.hairline,
                        color: TOKENS.ink,
                      }}
                    />
                    <label
                      htmlFor="website"
                      className="pointer-events-none absolute left-0 top-3 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-widest peer-focus:opacity-100 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest peer-[:not(:placeholder-shown)]:opacity-100"
                      style={{ color: TOKENS.accent, opacity: 0.6 }}
                    >
                      Website URL (e.g. www.yourcompany.com)
                    </label>
                  </div>
                </div>

                <div
                  className="flex flex-col gap-6 pt-4 border-t"
                  style={{ borderColor: TOKENS.hairline }}
                >
                  <div className="space-y-4 pt-4">
                    <p
                      className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-widest opacity-60"
                      style={{ color: TOKENS.ink }}
                    >
                      Primary Bottleneck
                    </p>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {BOTTLENECKS.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() =>
                            setSelectedBottleneck(
                              selectedBottleneck === option ? null : option,
                            )
                          }
                          className="group relative overflow-hidden border p-4 text-left text-xs font-medium transition-all duration-300 focus-visible:outline focus-visible:outline-2 hover:-translate-y-0.5"
                          style={{
                            borderColor:
                              selectedBottleneck === option
                                ? TOKENS.ink
                                : TOKENS.hairline,
                            backgroundColor:
                              selectedBottleneck === option
                                ? TOKENS.ink
                                : TOKENS.paper,
                            color:
                              selectedBottleneck === option
                                ? TOKENS.paper
                                : TOKENS.ink,
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <p
                      className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-widest opacity-60"
                      style={{ color: TOKENS.ink }}
                    >
                      6-Month Objective
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {GOALS.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() =>
                            setSelectedGoal(
                              selectedGoal === option ? null : option,
                            )
                          }
                          className="group relative overflow-hidden border p-4 text-left text-xs font-medium transition-all duration-300 focus-visible:outline focus-visible:outline-2 hover:-translate-y-0.5"
                          style={{
                            borderColor:
                              selectedGoal === option
                                ? TOKENS.ink
                                : TOKENS.hairline,
                            backgroundColor:
                              selectedGoal === option
                                ? TOKENS.ink
                                : TOKENS.paper,
                            color:
                              selectedGoal === option
                                ? TOKENS.paper
                                : TOKENS.ink,
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {state.error && (
                  <p className="text-xs font-semibold text-red-600">
                    {state.error}
                  </p>
                )}

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="group flex w-full items-center justify-between border px-6 py-5 text-sm font-bold uppercase tracking-widest transition-transform duration-200 hover:-translate-y-1 focus-visible:outline disabled:opacity-50"
                    style={{
                      backgroundColor: TOKENS.accent,
                      borderColor: TOKENS.accent,
                      color: TOKENS.paper,
                    }}
                  >
                    <span>
                      {isPending ? "Transmitting..." : "Initiate Audit"}
                    </span>
                    <span
                      aria-hidden
                      className="transition-transform duration-200 group-hover:translate-x-2"
                    >
                      →
                    </span>
                  </button>
                  <div
                    className="mt-4 flex items-center justify-between font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wide opacity-50"
                    style={{ color: TOKENS.ink }}
                  >
                    <span>Secure Transmission</span>
                    <span>Est. Response: 24-48h</span>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
