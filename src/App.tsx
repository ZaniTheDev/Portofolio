import { useEffect, useState } from "react";
import type { FC } from "react";
import { TAGLINE } from "./constants/data";
import { globalCSS } from "./styles/globalStyles";

// Sections
import Navbar from "./components/sections/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Journey from "./components/sections/Journey";
import Contact from "./components/sections/Contact";

/**
 * Root application component.
 *
 * Responsibilities:
 *  - Injects global CSS
 *  - Manages shared UI state (scroll position, cursor pos, typed text)
 *  - Provides a single `scrollTo` utility passed down to children that need it
 *  - Renders the full page in order
 */
const App: FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [typedText, setTypedText] = useState<string>("");

  // ── Typing animation ────────────────────────────────────────────────────────
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setTypedText(TAGLINE.slice(0, index));
      index++;
      if (index > TAGLINE.length) clearInterval(timer);
    }, 45);
    return () => clearInterval(timer);
  }, []);

  // ── Navbar scroll detection ─────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Custom cursor tracking ──────────────────────────────────────────────────
  useEffect(() => {
    const onMouseMove = (e: MouseEvent): void =>
      setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  // ── Smooth-scroll helper ────────────────────────────────────────────────────
  const scrollTo = (id: string): void => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // ───────────────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Global styles */}
      <style>{globalCSS}</style>

      {/* Custom cursor glow */}
      <div
        className="cursor"
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "radial-gradient(circle, #00ff9d88 0%, transparent 70%)",
          transform: `translate(${cursorPos.x - 10}px, ${cursorPos.y - 10}px)`,
          transition: "transform .08s linear",
        }}
      />

      {/* Subtle dot-grid overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(0,255,157,.03) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(0,255,157,.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Page sections */}
      <Navbar scrolled={scrolled} onNavClick={scrollTo} />
      <Hero typedText={typedText} onScrollTo={scrollTo} />
      <About />
      <Skills />
      <Projects />
      <Journey />
      <Contact />
    </>
  );
};

export default App;
