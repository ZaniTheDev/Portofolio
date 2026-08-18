"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import teamPhoto from "../../public/images/about/team.jpg";
import teamPhoto2 from "../../public/images/about/team1.jpg";
import spotify from "../../public/images/about/spotify.png";

import HowItStarted from "./HowItStarted";

gsap.registerPlugin(ScrollTrigger);

type Photo = {
  id: string;
  src: any;
  alt: string;
  captionTitle: string;
  captionText: string;
  aspectRatio: string;
};

const PHOTOS: Photo[] = [
  {
    id: "friends",
    src: teamPhoto,
    alt: "Hanging out with friends after graduation",
    captionTitle: "Post-Graduation",
    captionText:
      "Wrapping up high school and hanging out with everyone before starting work.",
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: "spotify",
    src: spotify,
    alt: "Spotify playing music",
    captionTitle: "Soundtrack",
    captionText:
      "Music plays nonstop in the background so I don't go insane debugging.",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: "routine",
    src: teamPhoto2,
    alt: "Hanging out at home",
    captionTitle: "At the house",
    captionText: "Messing around at home with friends on a random afternoon.",
    aspectRatio: "aspect-square",
  },
];

const SKILL_DOMAINS = [
  {
    category: "Networking & Infra",
    items: [
      "MikroTik dynamic routing and custom firewall rules",
      "Debian server setups running BIND9 for local DNS",
      "VLAN segregation and network isolation logic",
      "Tracking router health using Cacti SNMP monitoring",
    ],
  },
  {
    category: "Web & Real-Time",
    items: [
      "Full-stack React & Next.js web applications",
      "Real-time features built with vanilla WebSockets",
      "TypeScript logic and engine fundamentals",
      "Custom layout architectures built from scratch",
    ],
  },
  {
    category: "Automation & Scripting",
    items: [
      "Python scripts for network automation tasks",
      "Arduino hardware projects using C++ and sensors",
      "Custom Bash scripts for everyday Linux terminal workflows",
    ],
  },
];

function Lightbox({
  photo,
  onClose,
}: {
  photo: Photo | null;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F1115]/95 backdrop-blur-md p-4 md:p-12 transition-opacity"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-[#EAE8E1] font-mono text-xs uppercase tracking-widest hover:text-[#D97706] transition-colors focus:outline-none px-4 py-2 border border-[#EAE8E1]/20"
          onClick={onClose}
          aria-label="Close photo"
        >
          [ Esc / Close ]
        </button>
        <div className="relative w-full max-h-[75vh] flex justify-center border border-[#EAE8E1]/10 bg-[#0F1115] p-2">
          <Image
            src={photo.src}
            alt={photo.alt}
            className="object-contain max-h-[73vh] w-auto"
          />
        </div>
        <div className="mt-6 flex flex-col items-center text-center text-[#EAE8E1]">
          <p className="font-mono text-xs uppercase tracking-widest text-[#D97706] mb-1">
            {photo.captionTitle}
          </p>
          <p className="text-sm font-body text-[#EAE8E1]/80">
            {photo.captionText}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [activeDomain, setActiveDomain] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".gsap-line").forEach((line) => {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "expo.out",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: line,
              start: "top 92%",
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen font-body bg-[#EAE8E1] text-[#0F1115] selection:bg-[#D97706] selection:text-[#EAE8E1]"
    >
      {/* INTRO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-12 max-w-screen-2xl mx-auto border-x border-[#0F1115]/10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end relative z-10">
          <div className="md:col-span-8 gsap-reveal">
            <span className="block font-mono text-xs uppercase tracking-widest text-[#D97706] mb-6">
              A bit about me
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-[8.5rem] font-display font-bold leading-[0.92] tracking-tighter">
              So, who <br /> is Zani?
            </h1>
          </div>
          <div className="md:col-span-4 pb-2 gsap-reveal">
            <p className="text-base md:text-lg leading-relaxed text-[#0F1115]/80 font-body border-l-2 border-[#D97706] pl-6">
              I'm 18, living in Indonesia. Most of my day goes into building web
              apps and messing around with home network labs. I prefer taking
              the time to figure out how things actually work under the hood
              instead of just relying on AI to churn out code.
            </p>
          </div>
        </div>
        <hr className="mt-24 border-t border-[#0F1115]/15 gsap-line" />
      </section>

      {/* HOW IT STARTED (Extracted) */}
      <HowItStarted />

      {/* LIFE OUTSIDE CODING */}
      <section className="py-28 px-6 md:px-12 max-w-screen-2xl mx-auto border-x border-[#0F1115]/10">
        <div className="mb-20 max-w-3xl gsap-reveal">
          <span className="block font-mono text-xs uppercase tracking-widest text-[#D97706] mb-4">
            Outside of coding
          </span>
          <h2 className="text-3xl md:text-6xl font-display font-bold leading-[1.1] tracking-tight">
            When I'm not configuring routers or stuck debugging TypeScript, I'm
            usually hanging out, listening to music, or playing rhythm games.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 space-y-20">
            <button
              type="button"
              className="group block w-full text-left gsap-reveal focus:outline-none focus:ring-2 focus:ring-[#D97706]"
              onClick={() => setSelectedPhoto(PHOTOS[0])}
            >
              <div
                className={`relative w-full overflow-hidden ${PHOTOS[0].aspectRatio} bg-[#0F1115]/5 border border-[#0F1115]/15 p-2`}
              >
                <Image
                  src={PHOTOS[0].src}
                  alt={PHOTOS[0].alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 41.67vw"
                  className="object-cover filter grayscale contrast-125 transition-all duration-500 group-hover:grayscale-0"
                />
              </div>
              <div className="mt-4 flex justify-between items-center border-t border-[#0F1115]/10 pt-3">
                <span className="font-mono text-xs uppercase tracking-wider text-[#D97706]">
                  {PHOTOS[0].captionTitle}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#0F1115]/50">
                  [ View Photo ]
                </span>
              </div>
            </button>

            <div className="gsap-reveal border-l-2 border-[#0F1115] pl-6 py-1">
              <h3 className="text-2xl font-display font-bold mb-2 tracking-tight">
                Always something playing
              </h3>
              <p className="text-[#0F1115]/75 font-body text-base mb-6">
                I can't focus in complete silence, so music is pretty much
                mandatory whenever I'm working on a project.
              </p>

              <button
                type="button"
                className="group block w-full text-left focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                onClick={() => setSelectedPhoto(PHOTOS[1])}
              >
                <div
                  className={`relative w-full overflow-hidden ${PHOTOS[1].aspectRatio} bg-[#0F1115]/5 border border-[#0F1115]/15 p-2`}
                >
                  <Image
                    src={PHOTOS[1].src}
                    alt={PHOTOS[1].alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 41.67vw"
                    className="object-cover filter grayscale contrast-125 transition-all duration-500 group-hover:grayscale-0"
                  />
                </div>
                <div className="mt-4 flex justify-between items-center border-t border-[#0F1115]/10 pt-3">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#D97706]">
                    {PHOTOS[1].captionTitle}
                  </span>
                </div>
              </button>
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7 space-y-20 md:mt-24">
            <div className="gsap-reveal bg-[#0F1115] text-[#EAE8E1] p-8 md:p-12 border border-[#0F1115]">
              <h3 className="font-display font-bold text-2xl md:text-4xl mb-4 tracking-tight leading-snug">
                Hitting notes on beat
              </h3>
              <p className="font-mono text-xs uppercase tracking-widest text-[#D97706]">
                // Rhythm games take up a lot of my free time. It's my favorite
                way to clear my head after sitting in a terminal for hours.
              </p>
            </div>

            <button
              type="button"
              className="group block w-full text-left gsap-reveal focus:outline-none focus:ring-2 focus:ring-[#D97706]"
              onClick={() => setSelectedPhoto(PHOTOS[2])}
            >
              <div
                className={`relative w-full overflow-hidden ${PHOTOS[2].aspectRatio} bg-[#0F1115]/5 border border-[#0F1115]/15 p-2`}
              >
                <Image
                  src={PHOTOS[2].src}
                  alt={PHOTOS[2].alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover filter grayscale contrast-125 transition-all duration-500 group-hover:grayscale-0"
                />
              </div>
              <div className="mt-4 flex justify-between items-center border-t border-[#0F1115]/10 pt-3">
                <span className="font-mono text-xs uppercase tracking-wider text-[#D97706]">
                  {PHOTOS[2].captionTitle}
                </span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* QUICK FACTS */}
      <section className="py-24 px-6 md:px-12 max-w-screen-2xl mx-auto border-x border-[#0F1115]/10 border-t border-[#0F1115]/15">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6">
          <div className="gsap-reveal flex flex-col justify-between h-full">
            <p className="font-mono text-xs uppercase tracking-widest text-[#D97706] mb-3">
              Age
            </p>
            <p className="text-5xl md:text-7xl font-display font-bold tracking-tighter">
              18
            </p>
          </div>
          <div className="gsap-reveal flex flex-col justify-between h-full border-l border-[#0F1115]/10 pl-6">
            <p className="font-mono text-xs uppercase tracking-widest text-[#D97706] mb-3">
              Location
            </p>
            <p className="text-5xl md:text-7xl font-display font-bold tracking-tighter">
              IDN
            </p>
          </div>
          <div className="gsap-reveal flex flex-col justify-between h-full border-l border-[#0F1115]/10 pl-6">
            <p className="font-mono text-xs uppercase tracking-widest text-[#D97706] mb-3">
              Primary Focus
            </p>
            <p className="text-3xl md:text-5xl font-display font-bold tracking-tighter">
              Full Stack
            </p>
          </div>
          <div className="gsap-reveal flex flex-col justify-between h-full border-l border-[#0F1115]/10 pl-6">
            <p className="font-mono text-xs uppercase tracking-widest text-[#D97706] mb-3">
              Secondary Focus
            </p>
            <p className="text-3xl md:text-5xl font-display font-bold tracking-tighter">
              Networking
            </p>
          </div>
        </div>
      </section>

      {/* WHAT I'M WORKING WITH */}
      <section className="py-28 px-6 md:px-12 bg-[#0F1115] text-[#EAE8E1]">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5 gsap-reveal">
            <span className="block font-mono text-xs uppercase tracking-widest text-[#D97706] mb-4">
              What I use
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-bold leading-[1.05] tracking-tight mb-6">
              Tools & stuff I build with
            </h2>
            <p className="text-[#EAE8E1]/70 font-body text-base leading-relaxed">
              Right now I split my time between building frontend interfaces,
              messing around with real-time WebSocket apps, and configuring
              Linux servers and MikroTik routers.
            </p>
          </div>

          {/* Interactive Tech Panel */}
          <div className="md:col-span-7 md:col-start-6 gsap-reveal">
            <div className="border border-[#EAE8E1]/20 bg-[#0F1115]">
              {/* Domain Tabs */}
              <div className="flex border-b border-[#EAE8E1]/20">
                {SKILL_DOMAINS.map((domain, index) => (
                  <button
                    key={domain.category}
                    onClick={() => setActiveDomain(index)}
                    className={`flex-1 py-4 px-4 font-mono text-xs uppercase tracking-wider text-left transition-colors border-r last:border-r-0 border-[#EAE8E1]/20 ${
                      activeDomain === index
                        ? "bg-[#D97706] text-[#0F1115] font-bold"
                        : "text-[#EAE8E1]/60 hover:text-[#EAE8E1] hover:bg-[#EAE8E1]/5"
                    }`}
                  >
                    {domain.category}
                  </button>
                ))}
              </div>

              {/* Items Panel */}
              <div className="p-6 md:p-8">
                <p className="font-mono text-[11px] uppercase tracking-widest text-[#D97706] mb-6">
                  {SKILL_DOMAINS[activeDomain].category.toUpperCase()}
                </p>
                <ul className="space-y-4">
                  {SKILL_DOMAINS[activeDomain].items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-4 text-base font-body text-[#EAE8E1]/90"
                    >
                      <span className="font-mono text-xs text-[#D97706] pt-1">
                        &gt;
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Lightbox photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </div>
  );
}
