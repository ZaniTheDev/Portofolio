// ─── Domain Types ─────────────────────────────────────────────────────────────

export interface SkillItem {
  name: string;
  icon: string;
  level: number;
}

export interface SkillCategory {
  category: string;
  icon: string;
  accent: string;
  items: SkillItem[];
}

export interface Project {
  title: string;
  type: string;
  desc: string;
  tags: string[];
  accent: string;
  emoji: string;
}

export interface JourneyEntry {
  year: string;
  title: string;
  desc: string;
  accent: string;
}

export interface ContactLink {
  label: string;
  href: string;
  accent: string;
}

export interface StatCard {
  icon: string;
  label: string;
  sub: string;
}

// ─── Component Prop Types ──────────────────────────────────────────────────────

export interface SkillBarProps {
  name: string;
  icon: string;
  level: number;
  accent: string;
  delay: number;
}

export interface SectionLabelProps {
  label: string;
}

export interface JourneyItemProps extends JourneyEntry {
  idx: number;
}

export interface NavbarProps {
  scrolled: boolean;
  onNavClick: (id: string) => void;
}

export interface HeroProps {
  typedText: string;
  onScrollTo: (id: string) => void;
}
