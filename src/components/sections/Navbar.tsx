import type { FC } from "react";
import { NAV_LINKS } from "../../constants/data";
import type { NavbarProps } from "../../types";

/**
 * Fixed top navigation bar.
 * Becomes opaque with a glass-blur effect once the user scrolls past 40 px.
 */
const Navbar: FC<NavbarProps> = ({ scrolled, onNavClick }) => (
  <nav
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: "0 5%",
      height: "64px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: scrolled ? "rgba(10,10,15,.92)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid #00ff9d18" : "none",
      transition: "all .3s ease",
    }}
  >
    {/* Brand */}
    <span
      style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: "18px",
        color: "#00ff9d",
        fontWeight: 700,
        letterSpacing: "-1px",
      }}
    >
      &lt;Hamzah /&gt;
    </span>

    {/* Links */}
    <div style={{ display: "flex", gap: "32px" }}>
      {NAV_LINKS.map((link) => (
        <button
          key={link}
          className="nav-link"
          onClick={() => onNavClick(link)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#a6adc8",
            fontSize: "14px",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            padding: "4px 0",
            transition: "color .2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#cdd6f4")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#a6adc8")}
        >
          {link}
        </button>
      ))}
    </div>
  </nav>
);

export default Navbar;
