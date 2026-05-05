import type { FC } from "react";
import { TECH_PILLS } from "../../constants/data";
import type { HeroProps } from "../../types";

/**
 * Full-viewport hero section with typing animation, ambient orbs,
 * CTA buttons, and tech-pill badges.
 */
const Hero: FC<HeroProps> = ({ typedText, onScrollTo }) => (
  <section
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      padding: "0 8%",
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* ── Ambient orbs ── */}
    <div
      className="hero-orb"
      style={{
        position: "absolute",
        top: "15%",
        right: "8%",
        width: 420,
        height: 420,
        borderRadius: "50%",
        background: "radial-gradient(circle, #00ff9d18 0%, transparent 70%)",
        filter: "blur(40px)",
        pointerEvents: "none",
      }}
    />
    <div
      style={{
        position: "absolute",
        bottom: "10%",
        left: "5%",
        width: 300,
        height: 300,
        borderRadius: "50%",
        background: "radial-gradient(circle, #00c8ff12 0%, transparent 70%)",
        filter: "blur(50px)",
        pointerEvents: "none",
      }}
    />

    {/* ── Content ── */}
    <div style={{ maxWidth: 740, position: "relative", zIndex: 1 }}>
      {/* Status badge */}
      <div
        className="hero-badge"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 14px",
          borderRadius: "99px",
          border: "1px solid #00ff9d33",
          background: "#00ff9d0a",
          fontSize: "12px",
          color: "#00ff9d",
          fontFamily: "'Space Mono', monospace",
          marginBottom: "24px",
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#00ff9d",
            display: "inline-block",
            animation: "pulse-glow 2s infinite",
          }}
        />
        Available for projects
      </div>

      {/* Name */}
      <h1
        className="hero-name"
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "clamp(52px, 9vw, 96px)",
          fontWeight: 700,
          lineHeight: 1,
          color: "#e6e9f0",
          marginBottom: "16px",
          letterSpacing: "-3px",
        }}
      >
        Hamzah
      </h1>

      {/* Typing tagline */}
      <p
        className="hero-tagline"
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "clamp(14px, 2vw, 18px)",
          color: "#00ff9d",
          marginBottom: "20px",
          minHeight: "28px",
        }}
      >
        {typedText}
        <span style={{ animation: "blink 1s infinite", color: "#00ff9d" }}>
          |
        </span>
      </p>

      {/* Description */}
      <p
        className="hero-desc"
        style={{
          fontSize: "16px",
          color: "#6c7086",
          lineHeight: 1.8,
          maxWidth: 520,
          marginBottom: "40px",
        }}
      >
        Crafting robust backends, intuitive frontends, and resilient network
        infrastructures. I turn ideas into scalable, real-world solutions.
      </p>

      {/* CTA buttons */}
      <div
        className="hero-cta"
        style={{ display: "flex", gap: 16, flexWrap: "wrap" }}
      >
        <button
          onClick={() => onScrollTo("Projects")}
          style={{
            padding: "12px 28px",
            borderRadius: "8px",
            background: "#00ff9d",
            border: "none",
            cursor: "pointer",
            color: "#0a0a0f",
            fontWeight: 700,
            fontSize: "14px",
            fontFamily: "'DM Sans', sans-serif",
            transition: "all .2s",
            boxShadow: "0 0 24px #00ff9d44",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow = "0 0 40px #00ff9d88")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.boxShadow = "0 0 24px #00ff9d44")
          }
        >
          View Projects →
        </button>

        <button
          onClick={() => onScrollTo("Contact")}
          style={{
            padding: "12px 28px",
            borderRadius: "8px",
            background: "transparent",
            border: "1px solid #313244",
            cursor: "pointer",
            color: "#cdd6f4",
            fontWeight: 600,
            fontSize: "14px",
            fontFamily: "'DM Sans', sans-serif",
            transition: "all .2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#00ff9d44";
            e.currentTarget.style.color = "#00ff9d";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#313244";
            e.currentTarget.style.color = "#cdd6f4";
          }}
        >
          Get in Touch
        </button>
      </div>

      {/* Tech pills */}
      <div
        style={{ display: "flex", gap: 10, marginTop: 40, flexWrap: "wrap" }}
      >
        {TECH_PILLS.map((tech) => (
          <span
            key={tech}
            style={{
              padding: "4px 12px",
              borderRadius: "99px",
              border: "1px solid #313244",
              fontSize: "12px",
              color: "#6c7086",
              fontFamily: "'Space Mono', monospace",
            }}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default Hero;
