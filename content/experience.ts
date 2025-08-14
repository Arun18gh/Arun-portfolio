export type TimelineItem = {
  title: string;
  org: string;
  period: string;
  bullets?: string[];
};

export const timeline: TimelineItem[] = [
  {
    title: "Full‑Stack Developer Intern",
    org: "Trishana Technologies, Bangalore, India",
    period: "Jun 2024 – Oct 2024",
    bullets: [
      "Built front‑ and back‑end features using Python/JS and MySQL.",
      "Followed Agile practices, Git branching, and code reviews.",
      "Implemented REST APIs, debugging, and small deployments."
    ],
  },
  {
    title: "MSc Cybersecurity (Pursuing)",
    org: "Dublin Business School, Ireland",
    period: "2025 – 2026",
    bullets: [
      "Focus: secure coding, networks, risk, Linux & SQL, cloud."
    ],
  },
  {
    title: "BSc Computer Science (CGPA 8.21)",
    org: "Adhiparasakthi College of Arts & Science, Tamil Nadu - CGPA - 8.28",
    period: "2021 – 2024",
  },
];
