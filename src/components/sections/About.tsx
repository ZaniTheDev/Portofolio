import type { FC } from "react";
import { ABOUT_STAT_CARDS } from "../../constants/data";
import { useInView } from "../../hooks/useInView";
import SectionLabel from "../ui/SectionLabel";
import { sectionTitleStyle } from "../../styles/globalStyles";

/**
 * About Me section — two-column layout with a bio on the left
 * and four animated stat cards on the right.
 */
const About: FC = () => {
  const [ref, visible] = useInView();

  return (
    <section id="about" style={{ padding: "100px 8%" }}>
      <SectionLabel label="01 / About" />

      <div
        ref={ref}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "center",
          marginTop: 48,
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(24px)",
          transition: "opacity .8s ease, transform .8s ease",
        }}
      >
        {/* ── Bio ── */}
        <div>
          <h2 style={{ ...sectionTitleStyle, marginBottom: 24 }}>About Me</h2>

          <p style={{ color: "#a6adc8", lineHeight: 1.9, marginBottom: 20 }}>
            Saya adalah seorang developer yang senang bereksperimen dan
            menjelajahi berbagai aspek teknologi — dari membangun aplikasi web
            yang efisien hingga mengonfigurasi infrastruktur jaringan yang
            andal.
          </p>

          <p style={{ color: "#a6adc8", lineHeight: 1.9, marginBottom: 20 }}>
            Dengan dasar yang kuat di{" "}
            <span style={{ color: "#00ff9d" }}>Python</span> dan{" "}
            <span style={{ color: "#f7df1e" }}>JavaScript</span>, saya menikmati
            membangun solusi full-stack yang menghubungkan logika backend yang
            solid dengan antarmuka frontend yang intuitif.
          </p>

          <p style={{ color: "#a6adc8", lineHeight: 1.9 }}>
            Di luar kode, dunia networking adalah bidang eksplorasi saya —
            memahami infrastruktur di balik setiap aplikasi melalui konfigurasi
            perangkat <span style={{ color: "#7c3aed" }}>MikroTik</span> dan{" "}
            <span style={{ color: "#00c8ff" }}>Cisco</span>.
          </p>
        </div>

        {/* ── Stat cards ── */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
        >
          {ABOUT_STAT_CARDS.map((stat) => (
            <div
              key={stat.label}
              style={{
                padding: "24px",
                borderRadius: "14px",
                background: "#11111b",
                border: "1px solid #1e1e2e",
                transition: "border-color .2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "#00ff9d33")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "#1e1e2e")
              }
            >
              <span
                style={{ fontSize: "28px", display: "block", marginBottom: 10 }}
              >
                {stat.icon}
              </span>
              <div
                style={{ fontWeight: 700, fontSize: "14px", color: "#e6e9f0" }}
              >
                {stat.label}
              </div>
              <div style={{ fontSize: "12px", color: "#6c7086", marginTop: 4 }}>
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
