import type {
  SkillCategory,
  Project,
  JourneyEntry,
  ContactLink,
  StatCard,
} from "../types";

export const NAV_LINKS: string[] = [
  "About",
  "Skills",
  "Projects",
  "Journey",
  "Contact",
];

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
      { name: "Python", icon: "🐍", level: 65 },
      { name: "JavaScript", icon: "⚡", level: 75 },
    ],
  },
  {
    category: "Web Development",
    icon: "🌐",
    accent: "#00c8ff",
    items: [
      { name: "Backend Dev", icon: "🔧", level: 55 },
      { name: "Frontend Dev", icon: "🎨", level: 90 },
      { name: "REST APIs", icon: "🔗", level: 60 },
      { name: "Databases", icon: "🗄️", level: 70 },
    ],
  },
  {
    category: "Networking",
    icon: "📡",
    accent: "#7c3aed",
    items: [
      { name: "MikroTik", icon: "📶", level: 88 },
      { name: "Cisco", icon: "🔌", level: 80 },
      { name: "Network Config", icon: "⚙️", level: 84 },
    ],
  },
];

export const PROJECTS: Project[] = [
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
    year: "2020",
    title: "acknowledging the Spark",
    desc: "dimulai dengan rasa ingin tahu yang besar terhadap dunia teknologi. Mulai dengan Python untuk scripting dan otomasi, menemukan kegembiraan dalam menyelesaikan masalah nyata.",
    accent: "#00ff9d",
  },
  {
    year: "2021",
    title: "Into the Web",
    desc: "Menyelami pengembangan web dengan JavaScript. Membangun proyek frontend sederhana, lalu memperluas ke backend dengan Node.js. Merasakan kepuasan mengubah ide menjadi aplikasi nyata.",
    accent: "#00c8ff",
  },
  {
    year: "2022",
    title: "Network Exploration",
    desc: "Mulai mengeksplorasi dunia jaringan, terutama dengan MikroTik dan Cisco. Memahami infrastruktur di balik aplikasi, dan bagaimana mengonfigurasi perangkat untuk mendukung solusi yang saya bangun.",
    accent: "#7c3aed",
  },
  {
    year: "2024",
    title: "Full-Stack Projects",
    desc: "Membangun proyek full-stack yang menggabungkan keahlian pemrograman dan jaringan. Menerapkan solusi yang tidak hanya berfungsi dengan baik, tetapi juga dioptimalkan untuk performa dan skalabilitas.",
    accent: "#f59e0b",
  },
  {
    year: "2025 - Present",
    title: "Continuous Exploration",
    desc: "Terus belajar dan bereksperimen dengan teknologi baru, memperdalam keahlian yang sudah ada, dan selalu mencari cara untuk menerapkan pengetahuan saya dalam proyek nyata yang berdampak.",
    accent: "#00ff9d",
  },
];

export const CONTACT_LINKS: ContactLink[] = [
  { label: "📧 Email", href: "hamzahtizani@gmail.com", accent: "#00ff9d" },
  { label: "💼 LinkedIn", href: "#", accent: "#00c8ff" },
  {
    label: "🐙 GitHub",
    href: "https://github.com/ZaniThedev",
    accent: "#7c3aed",
  },
];

export const ABOUT_STAT_CARDS: StatCard[] = [
  { icon: "🐍", label: "Python Dev", sub: "Scripting & Backend" },
  { icon: "⚡", label: "JS Dev", sub: "Web & Frontend" },
  { icon: "📡", label: "Networking", sub: "MikroTik & Cisco" },
  { icon: "🔧", label: "Problem Solver", sub: "Always Experimenting" },
];
