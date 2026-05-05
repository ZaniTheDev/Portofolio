import type { FC } from "react";
import { JOURNEY } from "../../constants/data";
import { useInView } from "../../hooks/useInView";
import { sectionTitleStyle } from "../../styles/globalStyles";
import SectionLabel from "../ui/SectionLabel";
import type { JourneyItemProps } from "../../types";

// ─── JourneyItem ──────────────────────────────────────────────────────────────

/**
 * A single entry in the learning timeline.
 * Slides in from the left when it enters the viewport.
 */
const JourneyItem: FC<JourneyItemProps> = ({
  year,
  title,
  desc,
  accent,
  idx,
}) => {
  const [ref, visible] = useInView();

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        gap: 32,
        marginBottom: 48,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateX(-20px)",
        transition: `opacity .6s ease ${idx * 100}ms, transform .6s ease ${idx * 100}ms`,
      }}
    >
      {/* Timeline dot */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minWidth: 40,
        }}
      >
        <div
          className="journey-dot"
          style={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: accent,
            boxShadow: `0 0 16px ${accent}`,
            border: "3px solid #0a0a0f",
            flexShrink: 0,
            marginTop: 4,
          }}
        />
      </div>

      {/* Text */}
      <div style={{ paddingBottom: 8 }}>
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "11px",
            color: accent,
            fontWeight: 700,
            marginBottom: 6,
            display: "block",
          }}
        >
          {year}
        </span>
        <h3
          style={{
            fontSize: "17px",
            fontWeight: 700,
            color: "#e6e9f0",
            marginBottom: 8,
          }}
        >
          {title}
        </h3>
        <p style={{ fontSize: "14px", color: "#6c7086", lineHeight: 1.7 }}>
          {desc}
        </p>
      </div>
    </div>
  );
};

// ─── Journey Section ──────────────────────────────────────────────────────────

const Journey: FC = () => (
  <section id="journey" style={{ padding: "100px 8%", background: "#0d0d14" }}>
    <SectionLabel label="04 / Experience" />
    <h2 style={sectionTitleStyle}>Learning Journey</h2>

    <div style={{ position: "relative", maxWidth: 720, margin: "56px auto 0" }}>
      {/* Vertical timeline line */}
      <div
        style={{
          position: "absolute",
          left: 19,
          top: 0,
          bottom: 0,
          width: 2,
          background:
            "linear-gradient(to bottom, #00ff9d44, #00c8ff44, transparent)",
        }}
      />

      {JOURNEY.map((entry, i) => (
        <JourneyItem key={entry.year} {...entry} idx={i} />
      ))}
    </div>
  </section>
);

export default Journey;
