"use client";

import React from "react";
import Image from "next/image";
import firstlaptop from "../../public/images/about/rc-car.jpg"; // Adjust path as needed
import profilePic from "../../public/images/about/pfp.jpg"; // Uncomment and adjust path when ready

export default function HowItStarted() {
  return (
    <section className="py-32 px-6 md:px-12 max-w-screen-2xl mx-auto border-x border-[#0F1115]/10 bg-[#EAE8E1]">
      <div className="flex flex-col gap-16 md:gap-28">
        {/* Editorial Lead / Thesis */}
        <div className="max-w-5xl gsap-reveal">
          <span className="block font-mono text-xs uppercase tracking-widest text-[#0F1115]/60 mb-8">
            Background & Origins
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium tracking-tight leading-[1.05] text-[#0F1115]">
            I started coding because I wanted to make a video game. I bought a
            physical book on Unity, having no idea what I was doing, but the
            urge to see something I wrote actually move on a screen kicked
            everything off.
          </h2>
        </div>

        {/* Magazine-style Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
          {/* Column 1: The Author Frame (Registration Mark Style) */}
          <div className="md:col-span-3 gsap-reveal pt-2">
            <div className="relative p-2 border border-[#0F1115]/15 bg-[#EAE8E1]">
              {/* Print Registration Marks (Corners) */}
              <div className="absolute -top-[5px] -left-[5px] w-3 h-3 border-t border-l border-[#0F1115]"></div>
              <div className="absolute -top-[5px] -right-[5px] w-3 h-3 border-t border-r border-[#0F1115]"></div>
              <div className="absolute -bottom-[5px] -left-[5px] w-3 h-3 border-b border-l border-[#0F1115]"></div>
              <div className="absolute -bottom-[5px] -right-[5px] w-3 h-3 border-b border-r border-[#0F1115]"></div>

              {/* Image Container */}
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#0F1115]/5">
                <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-[#0F1115]/40 uppercase tracking-widest text-center px-4 border border-[#0F1115]/10 border-dashed m-2">
                  <Image
                    src={profilePic}
                    alt="Hamzah"
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover filter grayscale contrast-125"
                  />
                </div>
              </div>

              {/* Metadata */}
              <div className="mt-3 flex flex-col gap-1 border-t border-[#0F1115]/10 pt-2">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#0F1115] font-bold">
                    Hamzah [Zani]
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#0F1115]/60">
                    Dev
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#0F1115]/50">
                    Loc: Jakarta IDN
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#0F1115]/50">
                    Est. 2008
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Text Content - Refactored for Typographic Pacing */}
          <div className="md:col-span-5 font-body gsap-reveal">
            {/* The Lead Paragraph */}
            <p className="text-xl md:text-2xl text-[#0F1115] font-medium leading-snug mb-8 tracking-tight">
              <span className="float-left text-6xl md:text-7xl font-display leading-[0.75] pr-3 pt-2 text-[#0F1115]">
                E
              </span>
              ventually, I got into web development after following in my older
              brother's footsteps. I started with the basics—plain HTML, CSS,
              and JavaScript—and slowly worked my way up to React and Next.js.
            </p>

            {/* The Body Paragraphs */}
            <div className="text-base text-[#0F1115]/80 space-y-5 leading-relaxed">
              <p>
                I also went to a vocational high school where I majored in
                computer networking. A lot of my schoolwork involved networking,
                from setting up networks to learning how different devices
                communicate. School gave me a good foundation, but I ended up
                learning a lot more on my own outside of class.
              </p>

              {/* Structural Break for technical context */}
              <div className="border-l-2 border-[#0F1115]/20 pl-5 py-1 my-8">
                <p className="italic text-[#0F1115]/90">
                  I didn't always have the hardware to practice with either.
                  When I wanted to learn more about MikroTik, I didn't have a
                  router at home to work with, so I used GNS3 to build virtual
                  networks and experiment with them instead. It wasn't quite the
                  same as having the actual hardware, but it gave me a way to
                  practice things I couldn't otherwise try.
                </p>
              </div>

              <p>
                As I worked with networking and web development, I started
                getting more interested in what was happening behind the things
                I was building. I wanted to understand what actually happens
                when a request is sent, how a backend handles it, and how the
                different parts of an application connect to each other.
              </p>

              <p>
                Around 2025, I also worked on an RC car for a school project. It
                used an Arduino, so I had to learn some C++, wire up sensors,
                and spend a lot of time figuring out why something wasn't
                working. Sometimes it was the code, sometimes the wiring, and
                sometimes I just couldn't figure out what I'd done wrong. It was
                pretty different from debugging a website, but I enjoyed working
                through those problems.
              </p>
            </div>
          </div>

          {/* Column 3: Photojournalism Insert */}
          <div className="md:col-span-4 gsap-reveal">
            <div className="border border-[#0F1115]/15 bg-[#0F1115]/5 p-2 md:p-3">
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#EAE8E1] border border-[#0F1115]/10 gsap-image-container">
                <Image
                  src={firstlaptop}
                  alt="Early Arduino RC Car Prototype hardware setup"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover filter grayscale contrast-[1.2] opacity-90 hover:opacity-100 transition-opacity duration-500"
                />
              </div>
              <div className="mt-4 flex justify-between items-end border-t border-[#0F1115]/10 pt-3">
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#0F1115]">
                    Fig 01. — Hardware
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#0F1115]/50 mt-1">
                    Arduino Project Archive
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#0F1115]/40">
                  2024
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
