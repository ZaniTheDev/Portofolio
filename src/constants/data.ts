import type { SkillCategory, Project, JourneyEntry, ContactLink, StatCard } from "../types";

export const NAV_LINKS: string[] = ["About", "Skills", "Projects", "Journey", "Contact"];

export const TAGLINE = "Full-Stack Developer & Network Enthusiast";

export const TECH_PILLS: string[] = [
  "Python",
  "JavaScript",
  "MikroTik",
  "Cisco",
  "FastAPI",
  "React",
];

export const SKILLS: SkillCategory[] = [
  {
    category: "Programming",
    icon: "⌨️",
    accent: "#00ff9d",
    items: [
      { name: "Python",     icon: "🐍", level: 90 },
      { name: "JavaScript", icon: "⚡", level: 85 },
    ],
  },
  {
    category: "Web Development",
    icon: "🌐",
    accent: "#00c8ff",
    items: [
      { name: "Backend Dev",  icon: "🔧", level: 85 },
      { name: "Frontend Dev", icon: "🎨", level: 80 },
      { name: "REST APIs",    icon: "🔗", level: 82 },
      { name: "Databases",    icon: "🗄️", level: 78 },
    ],
  },
  {
    category: "Networking",
    icon: "📡",
    accent: "#7c3aed",
    items: [
      { name: "MikroTik",       icon: "📶", level: 88 },
      { name: "Cisco",          icon: "🔌", level: 80 },
      { name: "Network Config", icon: "⚙️", level: 84 },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    title: "AutoBot Dashboard",
    type: "Web App",
    desc: "Full-stack dashboard built with FastAPI & React for monitoring automation tasks in real-time.",
    tags: ["Python", "React", "FastAPI", "WebSocket"],
    accent: "#00ff9d",
    emoji: "🤖",
  },
  {
    title: "NetScan CLI",
    type: "Python Tool",
    desc: "CLI automation tool for scanning & auditing network devices, generating reports for MikroTik and Cisco environments.",
    tags: ["Python", "Scapy", "Paramiko", "CLI"],
    accent: "#00c8ff",
    emoji: "🔍",
  },
  {
    title: "RouterConfig Manager",
    type: "Network Project",
    desc: "Automated configuration management system for MikroTik routers with backup & rollback support.",
    tags: ["MikroTik", "Python", "API", "RouterOS"],
    accent: "#7c3aed",
    emoji: "📡",
  },
  {
    title: "TaskFlow API",
    type: "Backend",
    desc: "RESTful API backend for task management with JWT auth, built with Express.js and MongoDB.",
    tags: ["Node.js", "Express", "MongoDB", "JWT"],
    accent: "#f59e0b",
    emoji: "⚡",
  },
];

export const JOURNEY: JourneyEntry[] = [
  {
    year: "2019",
    title: "First Lines of Code",
    desc: "Started with Python scripting — automation and simple web scrapers. The spark that ignited everything.",
    accent: "#00ff9d",
  },
  {
    year: "2020",
    title: "Into the Web",
    desc: "Dived deep into JavaScript, HTML/CSS. Built first full web projects. Fell in love with frontend-backend interaction.",
    accent: "#00c8ff",
  },
  {
    year: "2021",
    title: "Network Exploration",
    desc: "Began experimenting with MikroTik and Cisco. Understood the infrastructure layer beneath every app.",
    accent: "#7c3aed",
  },
  {
    year: "2022",
    title: "Full-Stack Projects",
    desc: "Started building complete solutions — from database to UI. Blending backend logic with clean interfaces.",
    accent: "#f59e0b",
  },
  {
    year: "2024",
    title: "Continuous Exploration",
    desc: "Combining networking expertise with software skills. Building tools that bridge both worlds.",
    accent: "#00ff9d",
  },
];

export const CONTACT_LINKS: ContactLink[] = [
  { label: "📧 Email",    href: "mailto:hamzah@example.com", accent: "#00ff9d" },
  { label: "💼 LinkedIn", href: "#",                         accent: "#00c8ff" },
  { label: "🐙 GitHub",   href: "#",                         accent: "#7c3aed" },
];

export const ABOUT_STAT_CARDS: StatCard[] = [
  { icon: "🐍", label: "Python Dev",     sub: "Scripting & Backend"   },
  { icon: "⚡", label: "JS Dev",         sub: "Web & Frontend"        },
  { icon: "📡", label: "Networking",     sub: "MikroTik & Cisco"      },
  { icon: "🔧", label: "Problem Solver", sub: "Always Experimenting"  },
];
