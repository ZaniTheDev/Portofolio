import type { CSSProperties } from "react";

export const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    background: #0a0a0f;
    color: #cdd6f4;
    font-family: 'DM Sans', sans-serif;
    overflow-x: hidden;
  }

  ::selection { background: #00ff9d33; color: #00ff9d; }

  ::-webkit-scrollbar       { width: 4px; }
  ::-webkit-scrollbar-track { background: #0a0a0f; }
  ::-webkit-scrollbar-thumb { background: #00ff9d44; border-radius: 99px; }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-18px); }
  }
  @keyframes pulse-glow {
    0%, 100% { opacity: .5; }
    50%       { opacity: 1; }
  }
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }

  .hero-badge   { animation: fadeSlideUp .7s ease both; }
  .hero-name    { animation: fadeSlideUp .7s .15s ease both; }
  .hero-tagline { animation: fadeSlideUp .7s .30s ease both; }
  .hero-desc    { animation: fadeSlideUp .7s .45s ease both; }
  .hero-cta     { animation: fadeSlideUp .7s .60s ease both; }
  .hero-orb     { animation: float 6s ease-in-out infinite; }

  .cursor {
    pointer-events: none;
    position: fixed;
    top: 0; left: 0;
    z-index: 9999;
    mix-blend-mode: difference;
  }

  .project-card { transition: transform .3s ease, box-shadow .3s ease; }
  .project-card:hover { transform: translateY(-6px) scale(1.01); }

  .nav-link { position: relative; }
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -2px; left: 0;
    width: 0; height: 2px;
    background: #00ff9d;
    transition: width .3s ease;
  }
  .nav-link:hover::after { width: 100%; }

  .skill-card { transition: border-color .3s, box-shadow .3s; }
  .skill-card:hover {
    border-color: var(--skill-accent) !important;
    box-shadow: 0 0 24px var(--skill-accent-glow);
  }

  .journey-dot { animation: pulse-glow 2s ease-in-out infinite; }
`;

/** Shared section title style — spread into any heading's style prop */
export const sectionTitleStyle: CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: "clamp(28px, 4vw, 42px)",
  fontWeight: 700,
  color: "#e6e9f0",
  letterSpacing: "-1.5px",
  lineHeight: 1.15,
};
