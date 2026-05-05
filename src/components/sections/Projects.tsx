import { useState } from "react";
import type { FC } from "react";
import { PROJECTS } from "../../constants/data";
import { useInView } from "../../hooks/useInView";
import { sectionTitleStyle } from "../../styles/globalStyles";
import SectionLabel from "../ui/SectionLabel";
import type { Project } from "../../types";

// ─── ProjectCard ──────────────────────────────────────────────────────────────

/**
 * Individual project card with scroll-triggered fade-in
 * and hover lift + glow effect.
 */
const ProjectCard: FC<Project> = ({
  title,
  type,
  desc,
  tags,
  accent,
  emoji,
}) => {
  const [ref, visible] = useInView();
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <div
      ref={ref}
      className="project-card"
      style={{
        padding: "28px",
        borderRadius: "16px",
        background: "#11111b",
        border: `1px solid ${hovered ? accent + "44" : "#1e1e2e"}`,
        boxShadow: hovered ? `0 8px 40px ${accent}18` : "none",
        cursor: "default",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(20px)",
        transition:
          "opacity .7s ease, transform .7s ease, border-color .3s, box-shadow .3s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Header row: emoji + type badge */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 16,
        }}
      >
        <span style={{ fontSize: "32px" }}>{emoji}</span>
        <span
          style={{
            padding: "3px 10px",
            borderRadius: "99px",
            background: accent + "18",
            color: accent,
            fontSize: "11px",
            fontFamily: "'Space Mono', monospace",
            fontWeight: 700,
          }}
        >
          {type}
        </span>
      </div>

      <h3
        style={{
          fontSize: "18px",
          fontWeight: 700,
          color: "#e6e9f0",
          marginBottom: 10,
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontSize: "13px",
          color: "#6c7086",
          lineHeight: 1.7,
          marginBottom: 20,
        }}
      >
        {desc}
      </p>

      {/* Tag pills */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {tags.map((tag) => (
          <span
            key={tag}
            style={{
              padding: "3px 10px",
              borderRadius: "99px",
              border: "1px solid #313244",
              fontSize: "11px",
              color: "#a6adc8",
              fontFamily: "'Space Mono', monospace",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

// ─── Projects Section ─────────────────────────────────────────────────────────

const Projects: FC = () => (
  <section id="projects" style={{ padding: "100px 8%" }}>
    <SectionLabel label="03 / Projects" />
    <h2 style={sectionTitleStyle}>Featured Work</h2>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 24,
        marginTop: 48,
      }}
    >
      {PROJECTS.map((project) => (
        <ProjectCard key={project.title} {...project} />
      ))}
    </div>
  </section>
);

export default Projects;
