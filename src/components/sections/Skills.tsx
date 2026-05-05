import type { CSSProperties, FC } from "react";
import { SKILLS } from "../../constants/data";
import { sectionTitleStyle } from "../../styles/globalStyles";
import SectionLabel from "../ui/SectionLabel";
import SkillBar from "../ui/SkillBar";

/**
 * Skills section — three cards, one per category
 * (Programming, Web Development, Networking).
 * Each card contains animated SkillBar rows.
 */
const Skills: FC = () => (
  <section id="skills" style={{ padding: "100px 8%", background: "#0d0d14" }}>
    <SectionLabel label="02 / Skills" />
    <h2 style={sectionTitleStyle}>Technical Skills</h2>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 24,
        marginTop: 48,
      }}
    >
      {SKILLS.map((cat) => (
        <div
          key={cat.category}
          className="skill-card"
          style={
            {
              padding: "32px",
              borderRadius: "16px",
              border: "1px solid #1e1e2e",
              background: "#11111b",
              "--skill-accent": cat.accent,
              "--skill-accent-glow": cat.accent + "22",
            } as CSSProperties
          }
        >
          {/* Category header */}
          <div style={{ marginBottom: "24px" }}>
            <span style={{ fontSize: "24px", marginRight: 10 }}>
              {cat.icon}
            </span>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "13px",
                color: cat.accent,
                fontWeight: 700,
              }}
            >
              {cat.category}
            </span>
          </div>

          {/* Skill rows */}
          {cat.items.map((item, i) => (
            <SkillBar
              key={item.name}
              name={item.name}
              icon={item.icon}
              level={item.level}
              accent={cat.accent}
              delay={i * 120}
            />
          ))}
        </div>
      ))}
    </div>
  </section>
);

export default Skills;
