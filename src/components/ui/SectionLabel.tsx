import type { FC } from "react";
import type { SectionLabelProps } from "../../types";

/**
 * Small monospace label displayed above every section heading.
 * e.g. "01 / About"
 */
const SectionLabel: FC<SectionLabelProps> = ({ label }) => (
  <span
    style={{
      fontFamily: "'Space Mono', monospace",
      fontSize: "11px",
      color: "#00ff9d",
      letterSpacing: "2px",
      display: "block",
      marginBottom: "12px",
      textTransform: "uppercase",
    }}
  >
    {label}
  </span>
);

export default SectionLabel;
