import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Zani | System Architect for Local Service Businesses",
  description:
    "I build premium digital infrastructure and automated lead generation systems for pest control, HVAC, roofing, and local service businesses.",
  keywords: [
    "Web Design for Contractors",
    "HVAC Lead Generation",
    "Pest Control Websites",
    "Business Automation",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <body
        className="min-h-full flex flex-col font-[family-name:var(--font-body)]"
        style={{ backgroundColor: "#EDEAE3", color: "#14171A" }}
      >
        {children}
      </body>
    </html>
  );
}
