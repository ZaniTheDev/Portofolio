import type { FC } from "react";
import { CONTACT_LINKS } from "../../constants/data";
import { sectionTitleStyle } from "../../styles/globalStyles";
import SectionLabel from "../ui/SectionLabel";

/**
 * Contact section with email, LinkedIn, and GitHub links.
 * Each link glows with its own accent color on hover.
 */
const Contact: FC = () => (
  <section id="contact" style={{ padding: "100px 8%", textAlign: "center" }}>
    <SectionLabel label="05 / Contact" />

    <h2 style={{ ...sectionTitleStyle, textAlign: "center" }}>
      Let's Build Something
    </h2>

    <p
      style={{
        color: "#6c7086",
        maxWidth: 440,
        margin: "16px auto 48px",
        lineHeight: 1.8,
      }}
    >
      Saya selalu terbuka untuk peluang baru dan kolaborasi menarik. Jangan ragu
      untuk menghubungi saya! 😎
    </p>

    {/* Contact link buttons */}
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 16,
        flexWrap: "wrap",
      }}
    >
      {CONTACT_LINKS.map((link) => (
        <a
          key={link.label}
          href={link.href}
          style={{
            padding: "14px 28px",
            borderRadius: "10px",
            border: `1px solid ${link.accent}44`,
            background: `${link.accent}0a`,
            color: link.accent,
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "14px",
            transition: "all .2s",
            display: "inline-block",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = `${link.accent}18`;
            e.currentTarget.style.boxShadow = `0 0 20px ${link.accent}33`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = `${link.accent}0a`;
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {link.label}
        </a>
      ))}
    </div>

    {/* Footer */}
    <p
      style={{
        color: "#313244",
        marginTop: 80,
        fontSize: "13px",
        fontFamily: "'Space Mono', monospace",
      }}
    >
      © 2024 Hamzah · dibuat dengan React + TypeScript
    </p>
  </section>
);

export default Contact;
