"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";

type Skill = { name: string; hint?: string };
type Group = { title: string; items: Skill[] };

export default function SkillsGrid({
  groups,
  floating = false,
}: {
  groups: Group[];
  floating?: boolean;
}) {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {groups.map((g, i) => (
        <TiltCard key={g.title} floating={floating} delay={i * 0.04}>
          <header className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold">{g.title}</h3>
            <span className="text-[11px] rounded-full border border-white/15 px-2 py-0.5 text-base-muted">
              {dedupe(g.items).length} skills
            </span>
          </header>
          <ul className="flex flex-wrap gap-2">
            {dedupe(g.items).map((s) => (
              <li key={s.name} title={s.hint || s.name} className="skill-pill">
                <span className="dot" />
                {s.name}
              </li>
            ))}
          </ul>
        </TiltCard>
      ))}
    </div>
  );
}

function dedupe(items: Skill[]) {
  const seen = new Set<string>();
  return items.filter((s) => {
    const k = s.name.toLowerCase().trim();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

function TiltCard({
  children,
  delay = 0,
  floating = false,
}: {
  children: React.ReactNode;
  delay?: number;
  floating?: boolean;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(x, { stiffness: 100, damping: 12, mass: 0.2 });
  const ry = useSpring(y, { stiffness: 100, damping: 12, mass: 0.2 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    x.set(dy * -6);
    y.set(dx * 6);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformStyle: "preserve-3d",
      }}
      className={`card p-5 ${
        floating ? "animate-float-slow" : ""
      }`}
    >
      {children}
    </motion.div>
  );
}
