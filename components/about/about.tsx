"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import teamPhoto from "../../public/images/about/team.jpg";
import teamPhoto2 from "../../public/images/about/team1.jpg";
import spotify from "../../public/images/about/spotify.png";
import firstlaptop from "../../public/images/about/first_laptop.jpeg";
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
    alt: "Hanging out with friends",
    captionTitle: "Friends",
    captionText: "Good people, good memories.",
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: "spotify",
    src: spotify,
    alt: "Spotify playing music",
    captionTitle: "Spotify",
    captionText: "Usually have music playing somewhere in the background.",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: "routine",
    src: teamPhoto2,
    alt: "Daily routine",
    captionTitle: "Having fun :)",
    captionText: "Just hanging out at my house",
    aspectRatio: "aspect-square",
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#14171A]/95 backdrop-blur-md p-4 md:p-12 transition-opacity"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-[#EDEAE3] font-mono text-sm uppercase tracking-widest hover:text-[#B4622A] transition-colors focus:outline-none px-4 py-2"
          onClick={onClose}
          aria-label="Close lightbox"
        >
          [ Close ]
        </button>
        <div className="relative w-full max-h-[75vh] flex justify-center border border-[#EDEAE3]/10 bg-[#14171A] p-2">
          <Image
            src={photo.src}
            alt={photo.alt}
            className="object-contain max-h-[73vh] w-auto"
          />
        </div>
        <div className="mt-6 flex flex-col items-center text-center text-[#EDEAE3]">
          <p className="font-mono text-xs uppercase tracking-widest text-[#B4622A] mb-1">
            {photo.captionTitle}
          </p>
          <p className="text-sm font-body text-[#EDEAE3]/80">
            {photo.captionText}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 30, clipPath: "inset(100% 0 0 0)" },
          {
            autoAlpha: 1,
            y: 0,
            clipPath: "inset(0% 0 0 0)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
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
            duration: 1.5,
            ease: "expo.out",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: line,
              start: "top 90%",
            },
          },
        );
      });

      gsap.utils
        .toArray<HTMLElement>(".gsap-image-container")
        .forEach((container) => {
          const img = container.querySelector("img");
          if (img) {
            gsap.fromTo(
              img,
              { yPercent: -10, scale: 1.1 },
              {
                yPercent: 10,
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: container,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              },
            );
          }
        });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={containerRef}
      className="min-h-screen font-body overflow-hidden bg-[#EDEAE3] text-[#14171A] selection:bg-[#B4622A] selection:text-[#EDEAE3]"
    >
      {/* 01 — WHO */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 px-6 md:px-12 max-w-screen-2xl mx-auto border-x border-[#14171A]/10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-end relative z-10">
          <div className="md:col-span-8 gsap-reveal">
            <span className="block font-mono text-xs uppercase tracking-widest text-[#B4622A] mb-8">
              01 — Who
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-display font-bold leading-[0.9] tracking-tighter">
              So, who <br /> is Zani?
            </h1>
          </div>
          <div className="md:col-span-4 pb-2 md:pb-4 gsap-reveal">
            <p className="text-lg md:text-xl leading-relaxed text-[#14171A]/80 font-body border-l border-[#B4622A] pl-6">
              I'm 18, from Indonesia, and I spend a probably unreasonable amount
              of time building things on a laptop that doesn't even have an
              extra M.2 slot.
            </p>
          </div>
        </div>
        <hr className="mt-32 border-t border-[#14171A]/20 gsap-line origin-left" />
      </section>

      {/* 02 — HOW IT STARTED (Now with Hardware Prototype Image) */}
      <section className="py-32 px-6 md:px-12 max-w-screen-2xl mx-auto border-x border-[#14171A]/10 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4 md:sticky md:top-32 self-start gsap-reveal">
            <span className="block font-mono text-xs uppercase tracking-widest text-[#B4622A] mb-4">
              02 — How it started
            </span>
            <div className="w-12 h-[1px] bg-[#14171A]"></div>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <div className="space-y-12 text-2xl md:text-4xl font-display font-medium leading-tight text-[#14171A] gsap-reveal">
              <p>
                I started coding because I wanted to make a video game. Way back
                in 2015, I found Unity and thought it would be cool to make
                something of my own. I had no idea what I was doing, I just
                wanted to understand how games actually worked.
              </p>
              <p className="text-[#14171A]/50">
                I never really lost that curiosity. What started with trying to
                make a game eventually turned into building websites, learning
                how software works, and spending an unreasonable amount of time
                figuring out why something I wrote wasn't working.
              </p>
            </div>

            {/* Archival Hardware Image Insert */}
            <div className="my-16 gsap-reveal border border-[#14171A]/10 bg-[#14171A]/5 p-2 md:p-4">
              <div className="relative w-full aspect-video overflow-hidden gsap-image-container bg-[#14171A]/10">
                <Image
                  src={firstlaptop}
                  alt="Early Arduino RC Car Prototype"
                  fill
                  className="object-cover filter grayscale mix-blend-multiply opacity-80"
                />
              </div>
              <div className="mt-4 flex justify-between items-center border-t border-[#14171A]/10 pt-4">
                <span className="font-mono text-xs uppercase tracking-widest text-[#B4622A]">
                  SYS_LOG // MY_FIRST_LAPTOP
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#14171A]/50">
                  Photo Archive
                </span>
              </div>
            </div>

            <div className="text-2xl md:text-4xl font-display font-medium leading-tight text-[#14171A] gsap-reveal">
              <p>
                That same mindset bled into software and networking. I prefer
                learning the fundamentals over relying on automated shortcuts.
              </p>
            </div>
          </div>
        </div>
        <hr className="mt-32 border-t border-[#14171A]/20 gsap-line origin-left" />
      </section>

      {/* 03 — BEYOND THE KEYBOARD */}
      <section className="py-32 px-6 md:px-12 max-w-screen-2xl mx-auto border-x border-[#14171A]/10">
        <div className="mb-24 md:mb-40 max-w-4xl gsap-reveal">
          <span className="block font-mono text-xs uppercase tracking-widest text-[#B4622A] mb-6">
            03 — Beyond the keyboard
          </span>
          <h2 className="text-4xl md:text-7xl font-display font-bold leading-[1.1] tracking-tight">
            When I'm not building something, I'm usually doing something
            considerably less productive.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start">
          <div className="md:col-span-5 space-y-32">
            <button
              type="button"
              className="group block w-full text-left gsap-reveal focus:outline-none"
              onClick={() => setSelectedPhoto(PHOTOS[0])}
            >
              <div
                className={`relative w-full overflow-hidden ${PHOTOS[0].aspectRatio} bg-[#14171A]/5 gsap-image-container cursor-zoom-in border border-[#14171A]/10 p-2`}
              >
                <Image
                  src={PHOTOS[0].src}
                  alt={PHOTOS[0].alt}
                  fill
                  className="object-cover transition-all duration-700 filter grayscale group-hover:grayscale-0"
                />
              </div>
              <div className="mt-6 flex justify-between items-center border-t border-[#14171A]/10 pt-4">
                <span className="font-mono text-xs uppercase tracking-widest text-[#B4622A]">
                  {PHOTOS[0].captionTitle}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#14171A]/40">
                  [ Click to view ]
                </span>
              </div>
            </button>

            <div className="gsap-reveal border-l-2 border-[#14171A] pl-6 py-2">
              <h3 className="text-3xl font-display font-bold mb-4 tracking-tight">
                There's usually something playing.
              </h3>
              <p className="text-[#14171A]/70 mb-8 font-body text-lg">
                Music makes coding sessions considerably better.
              </p>

              <button
                type="button"
                className="group block w-full text-left focus:outline-none"
                onClick={() => setSelectedPhoto(PHOTOS[1])}
              >
                <div
                  className={`relative w-full overflow-hidden ${PHOTOS[1].aspectRatio} bg-[#14171A]/5 gsap-image-container cursor-zoom-in border border-[#14171A]/10 p-2`}
                >
                  <Image
                    src={PHOTOS[1].src}
                    alt={PHOTOS[1].alt}
                    fill
                    className="object-cover transition-all duration-700 filter grayscale group-hover:grayscale-0"
                  />
                </div>
                <div className="mt-6 flex justify-between items-center border-t border-[#14171A]/10 pt-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#B4622A]">
                    {PHOTOS[1].captionTitle}
                  </span>
                </div>
              </button>
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7 space-y-32 md:mt-48">
            <div className="gsap-reveal bg-[#14171A] text-[#EDEAE3] p-10 md:p-16">
              <h3 className="font-display font-bold text-3xl md:text-5xl mb-6 tracking-tight leading-tight">
                I also spend an unreasonable amount of time hitting things on
                beat.
              </h3>
              <p className="font-mono text-xs uppercase tracking-widest text-[#B4622A]">
                // Rhythm games are a serious commitment.
              </p>
            </div>

            <button
              type="button"
              className="group block w-full text-left gsap-reveal focus:outline-none"
              onClick={() => setSelectedPhoto(PHOTOS[2])}
            >
              <div
                className={`relative w-full overflow-hidden ${PHOTOS[2].aspectRatio} bg-[#14171A]/5 gsap-image-container cursor-zoom-in border border-[#14171A]/10 p-2`}
              >
                <Image
                  src={PHOTOS[2].src}
                  alt={PHOTOS[2].alt}
                  fill
                  className="object-cover transition-all duration-700 filter grayscale group-hover:grayscale-0"
                />
              </div>
              <div className="mt-6 flex justify-between items-center border-t border-[#14171A]/10 pt-4">
                <span className="font-mono text-xs uppercase tracking-widest text-[#B4622A]">
                  {PHOTOS[2].captionTitle}
                </span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* 04 — LITTLE THINGS */}
      <section className="py-32 px-6 md:px-12 max-w-screen-2xl mx-auto border-x border-[#14171A]/10 border-t">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-16 gap-x-6">
          <div className="gsap-reveal flex flex-col justify-between h-full">
            <p className="font-mono text-xs uppercase tracking-widest text-[#B4622A] mb-4">
              Age
            </p>
            <p className="text-6xl md:text-8xl font-display font-bold tracking-tighter">
              18
            </p>
          </div>
          <div className="gsap-reveal flex flex-col justify-between h-full border-l border-[#14171A]/10 pl-6">
            <p className="font-mono text-xs uppercase tracking-widest text-[#B4622A] mb-4">
              Location
            </p>
            <p className="text-6xl md:text-8xl font-display font-bold tracking-tighter">
              IDN
            </p>
          </div>
          <div className="gsap-reveal flex flex-col justify-between h-full border-l border-[#14171A]/10 pl-6">
            <p className="font-mono text-xs uppercase tracking-widest text-[#B4622A] mb-4">
              Focus
            </p>
            <p className="text-4xl md:text-6xl font-display font-bold tracking-tighter">
              WEB
            </p>
          </div>
          <div className="gsap-reveal flex flex-col justify-between h-full border-l border-[#14171A]/10 pl-6">
            <p className="font-mono text-xs uppercase tracking-widest text-[#B4622A] mb-4">
              Drive
            </p>
            <p className="text-3xl md:text-5xl font-display font-bold tracking-tighter break-words">
              CURIOSITY
            </p>
          </div>
        </div>
      </section>

      {/* 05 — CURRENTLY */}
      <section className="py-32 px-6 md:px-12 bg-[#14171A] text-[#EDEAE3]">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5 md:sticky md:top-32 self-start gsap-reveal">
            <span className="block font-mono text-xs uppercase tracking-widest text-[#B4622A] mb-6">
              05 — Currently
            </span>
            <h2 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] tracking-tight">
              Things I'm <br /> currently <br /> figuring out
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 text-xl md:text-2xl text-[#EDEAE3]/80 space-y-12 font-body gsap-reveal">
            <p className="leading-relaxed">
              I'm always experimenting with something new. Right now, my focus
              is split between building out web interfaces and digging into the
              infrastructure that powers them.
            </p>

            <ul className="flex flex-col w-full border-t border-[#EDEAE3]/20 pt-8">
              {[
                "Frontend development (React, Next.js)",
                "JavaScript & TypeScript",
                "WebSockets and real-time data",
                "Python network automation",
                "MikroTik firewall logic and routing",
                "Configuring BIND9 on Debian servers",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center py-4 border-b border-[#EDEAE3]/10 hover:text-[#B4622A] transition-colors group cursor-default"
                >
                  <span className="font-mono text-sm text-[#EDEAE3]/40 group-hover:text-[#B4622A] transition-colors">
                    0{i + 1}
                  </span>
                  <span className="font-display text-xl tracking-tight text-right">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Lightbox photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </main>
  );
}
