"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
// Replace these with actual images of your setup, sketches, coffee, etc.
import workspace1 from "../../public/images/about/team.jpg";
import workspace2 from "../../public/images/about/team1.jpg";
import workspace3 from "../../public/images/about/spotify.png";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const TOKENS = {
  ink: "#14171A",
  paper: "#EDEAE3",
  accent: "#B4622A",
  mutedDark: "rgba(20, 23, 26, 0.5)",
  mutedLight: "rgba(237, 234, 227, 0.5)",
  hairlineLight: "rgba(20, 23, 26, 0.15)",
  hairlineDark: "rgba(237, 234, 227, 0.15)",
};

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Shared reveal animation for sections
        const revealElements = gsap.utils.toArray(".reveal-up");
        revealElements.forEach((el: any) => {
          gsap.fromTo(
            el,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
              },
            },
          );
        });

        // Staggered lists (Process & Expectations)
        gsap.fromTo(
          ".process-step",
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.15,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#process-list",
              start: "top 75%",
            },
          },
        );
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="w-full font-[family-name:var(--font-body)] selection:bg-[#B4622A] selection:text-[#EDEAE3]"
    >
      {/* 1. STRONG OPENING */}
      <section
        className="relative flex min-h-[70vh] w-full flex-col justify-center px-6 pt-32 sm:px-10"
        style={{ backgroundColor: TOKENS.paper, color: TOKENS.ink }}
      >
        <div className="mx-auto w-full max-w-5xl">
          <h1 className="reveal-up font-[family-name:var(--font-display)] text-[3rem] font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-[5.5rem]">
            I don't build websites to win design awards.
          </h1>
          <p
            className="reveal-up mt-10 max-w-2xl text-xl leading-relaxed sm:text-2xl"
            style={{ color: TOKENS.mutedDark }}
          >
            When you work with me, you aren't hiring a massive agency. You're
            hiring a person who genuinely enjoys figuring out how things work,
            and how they can work better.
          </p>
        </div>
      </section>

      {/* 2. THE STORY & 3. PHILOSOPHY */}
      <section
        className="relative w-full px-6 py-32 sm:px-10"
        style={{ backgroundColor: TOKENS.ink, color: TOKENS.paper }}
      >
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-20 lg:grid-cols-2">
          {/* Your Story */}
          <div className="reveal-up">
            <span
              className="mb-6 block font-[family-name:var(--font-mono)] text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ color: TOKENS.accent }}
            >
              The Background
            </span>
            <h2 className="mb-6 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
              How everything started.
            </h2>
            <p
              className="text-lg leading-relaxed"
              style={{ color: TOKENS.mutedLight }}
            >
              Like a lot of people who get into programming, I started around
              the age of 16 with a very specific goal: I wanted to build video
              games.
            </p>
            <p
              className="mt-6 text-lg leading-relaxed"
              style={{ color: TOKENS.mutedLight }}
            >
              At first, it was just curiosity. I downloaded VS Code, started
              experimenting, and promptly spent days trying to figure out bugs
              that turned out to be a missing semicolon or a simple typo. Most
              of what I built back then wasn't very good. But every mistake
              taught me how things actually worked under the hood. Over time,
              that curiosity shifted away from games and toward the web—and I
              realized how much I cared about building things that felt solid,
              useful, and reliable.
            </p>
          </div>

          {/* Your Philosophy */}
          <div
            className="reveal-up lg:border-l lg:pl-20"
            style={{ borderColor: TOKENS.hairlineDark }}
          >
            <span
              className="mb-6 block font-[family-name:var(--font-mono)] text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ color: TOKENS.accent }}
            >
              Core Beliefs
            </span>
            <h2 className="mb-8 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
              What I've learned.
            </h2>
            <ul className="flex flex-col gap-6 text-lg">
              <li className="flex items-start gap-4">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B4622A]" />
                <p>
                  <strong>Simplicity usually beats complexity.</strong> I've
                  found that removing features and reducing friction almost
                  always solves more problems than adding new ones.
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B4622A]" />
                <p>
                  <strong>Performance is part of the design.</strong> I used to
                  think speed was something you worried about after a site was
                  finished. The more projects I built, the more I realized it
                  has to be built in from day one.
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B4622A]" />
                <p>
                  <strong>Animation should guide, not distract.</strong> Over
                  time, I learned that movement on a screen should only ever
                  point a person toward what they actually need to see.
                </p>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B4622A]" />
                <p>
                  <strong>Every section needs a reason to exist.</strong> If a
                  part of a page doesn't serve a clear purpose for the visitor,
                  it's better left out.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. HOW I WORK & 5. WHAT YOU CAN EXPECT */}
      <section
        className="relative w-full px-6 py-32 sm:px-10"
        style={{ backgroundColor: TOKENS.paper, color: TOKENS.ink }}
      >
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-20 lg:grid-cols-2">
          {/* How I Work */}
          <div>
            <div className="reveal-up mb-12">
              <h2 className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight">
                How we'll work together.
              </h2>
            </div>

            <div id="process-list" className="flex flex-col">
              {[
                {
                  phase: "Discover",
                  desc: "Before I write any code, we just talk. I want to understand your business, what's currently frustrating you, and what your customers actually need.",
                },
                {
                  phase: "Architect",
                  desc: "I map out the structure of your site, making sure everything is clear, easy to navigate, and makes sense for your goals.",
                },
                {
                  phase: "Build",
                  desc: "This is where I sit down and build it. I take my time here to make sure everything is reliable so you don't have to worry about it breaking later.",
                },
                {
                  phase: "Launch",
                  desc: "We test the site together, fix any small details we missed, and put it out into the world.",
                },
                {
                  phase: "Support",
                  desc: "I don't just disappear. I stick around to help you make small adjustments as your business grows.",
                },
              ].map((step, i) => (
                <div
                  key={i}
                  className="process-step group flex gap-6 border-b py-6"
                  style={{ borderColor: TOKENS.hairlineLight }}
                >
                  <span
                    className="font-[family-name:var(--font-mono)] text-sm font-bold"
                    style={{ color: TOKENS.accent }}
                  >
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="mb-1 text-xl font-bold">{step.phase}</h3>
                    <p style={{ color: TOKENS.mutedDark }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What you can expect */}
          <div className="lg:pl-20">
            <div className="reveal-up mb-12">
              <h2 className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight">
                What you can expect.
              </h2>
            </div>

            <div className="reveal-up grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-1">
              {[
                "I'll ask a lot of questions before we start.",
                "I'll be honest if I think an idea won't actually help your business.",
                "I'd much rather simplify a messy process than overcomplicate it.",
                "I keep you in the loop—communication matters just as much as the code.",
                "I avoid technical jargon and explain things in plain English.",
                "I treat your deadline as a promise.",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 border-b pb-4"
                  style={{ borderColor: TOKENS.hairlineLight }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={TOKENS.accent}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. PERSONALITY & 7. WORKSPACE GRID */}
      <section
        className="relative w-full border-t px-6 py-32 sm:px-10"
        style={{
          backgroundColor: TOKENS.paper,
          color: TOKENS.ink,
          borderColor: TOKENS.hairlineLight,
        }}
      >
        <div className="mx-auto w-full max-w-6xl">
          <div className="reveal-up mb-16 max-w-3xl">
            <h2 className="mb-6 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight sm:text-4xl">
              Beyond the keyboard.
            </h2>
            <p
              className="text-xl leading-relaxed"
              style={{ color: TOKENS.mutedDark }}
            >
              When I'm away from my desk, I'm usually out with friends,
              listening to music, or spending far too much time playing rhythm
              games. Most of the time, I'm just doing what any other teenager
              does laughing over dumb jokes, staying up later than I probably
              should, and enjoying the little moments in between projects.
            </p>
            <p
              className="mt-6 text-xl leading-relaxed"
              style={{ color: TOKENS.mutedDark }}
            >
              Those breaks matter more than I used to think. Stepping away from
              the screen gives me fresh ideas, and I often come back seeing a
              problem from a completely different angle.
            </p>
            <p
              className="mt-6 text-xl leading-relaxed"
              style={{ color: TOKENS.mutedDark }}
            >
              Building websites is a big part of my life, but it isn't my entire
              personality. I enjoy learning, making things, and gradually
              getting better at what I do, while still making time for the
              people and hobbies that keep life fun.
            </p>
          </div>

          {/* Workspace Image Grid (Replace src with your actual photos) */}
          <div className="reveal-up grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="relative aspect-square w-full overflow-hidden bg-[#D8D3C7]">
              <Image
                src={workspace1}
                alt="My desk setup"
                fill
                className="object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="relative aspect-square w-full overflow-hidden bg-[#D8D3C7] sm:mt-12">
              <Image
                src={workspace2}
                alt="Code and terminal"
                fill
                className="object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="relative aspect-square w-full overflow-hidden bg-[#D8D3C7]">
              <Image
                src={workspace3}
                alt="Notebook and sketches"
                fill
                className="object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8. CTA */}
      <section
        className="relative flex flex-col items-center justify-center px-6 py-40 text-center sm:px-10"
        style={{ backgroundColor: TOKENS.ink, color: TOKENS.paper }}
      >
        <div className="reveal-up w-full max-w-4xl">
          <h2 className="mb-10 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight sm:text-6xl">
            Let's build something useful together.
          </h2>
          <a
            href="/"
            className="inline-flex items-center justify-center gap-3 bg-[#B4622A] px-8 py-4 text-sm font-bold uppercase tracking-widest text-[#EDEAE3] transition-transform hover:scale-105"
          >
            Start the conversation
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
