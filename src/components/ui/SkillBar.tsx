import type { FC } from "react";
import { useInView } from "../../hooks/useInView";
import type { SkillBarProps } from "../../types";

/**
 * Animated horizontal progress bar for a single skill.
 * The bar transitions in width when it first scrolls into view.
 */
const SkillBar: FC<SkillBarProps> = ({ name, icon, level, accent, delay }) => {
  const [ref, visible] = useInView();

  return (
    <div ref={ref} style={{ marginBottom: "14px" }}>
      {/* Label row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "6px",
          fontSize: "13px",
          color: "#cdd6f4",
        }}
      >
        <span>
          {icon} {name}
        </span>
        <span style={{ color: accent, fontWeight: 700 }}>{level}%</span>
      </div>

      {/* Track */}
      <div
        style={{
          height: "6px",
          background: "#1e1e2e",
          borderRadius: "99px",
          overflow: "hidden",
        }}
      >
        {/* Fill — animates only after entering viewport */}
        <div
          style={{
            height: "100%",
            width: visible ? `${level}%` : "0%",
            background: `linear-gradient(90deg, ${accent}88, ${accent})`,
            borderRadius: "99px",
            transition: `width 1.2s cubic-bezier(.4, 0, .2, 1) ${delay}ms`,
            boxShadow: `0 0 10px ${accent}66`,
          }}
        />
      </div>
    </div>
  );
};

export default SkillBar;
