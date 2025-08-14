export type Skill = { name: string; hint?: string };
export type Group = { title: string; items: Skill[] };

export const skillGroups: Group[] = [
  {
    title: "Languages & Markup",
    items: [
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "Python" },
      { name: "Java" },
      { name: "HTML5" },
      { name: "CSS3" },
    ],
  },
  {
    title: "Frontend",
    items: [
      { name: "React" },
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "Bootstrap" },
      { name: "Framer Motion", hint: "Micro-interactions & motion" },
    ],
  },
  {
    title: "Backend & APIs",
    items: [
      { name: "Node.js" },
      { name: "Flask" },
      { name: "Jinja2" },
      { name: "REST" },
      { name: "Auth & Validation" },
    ],
  },
  {
    title: "Databases",
    items: [{ name: "MongoDB" }, { name: "MySQL" }, { name: "Neo4j" }],
  },
  {
    title: "Networking & Security",
    items: [
      { name: "Networking Systems" },
      { name: "Forensics" },
      { name: "Cryptography" },
    ],
  },
  {
    title: "Cloud, OS & Tools",
    items: [
      { name: "Linux" },
      { name: "AWS (basic)" },
      { name: "Git & GitHub" },
      { name: "MS Office" },
      { name: "Chart.js", hint: "Dashboards & charts" },
    ],
  },
];
