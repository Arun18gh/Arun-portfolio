"use client";
import { motion } from "framer-motion";
import type { TimelineItem } from "@/content/experience";

// expects items with { title, org, period, bullets? }
// sorts by the first 4-digit year it finds (desc)

const yearOf = (p: string) => {
  const m = p.match(/\d{4}/);
  return m ? parseInt(m[0], 10) : 0;
};

export default function Roadmap({ items }: { items: TimelineItem[] }) {
  const sorted = [...items].sort((a, b) => yearOf(b.period) - yearOf(a.period));

  return (
    <div className="relative">
      <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-accent-cyan/60 via-white/20 to-accent-violet/60 rounded-full h-full" />
      <ol className="space-y-10">
        {sorted.map((it, i) => (
          <li key={i} className="relative md:grid md:grid-cols-2 md:gap-10">
            {/* node */}
            <span className="absolute left-8 md:left-1/2 -translate-x-1/2 mt-1 h-4 w-4 rounded-full bg-accent-cyan shadow-glow ring-2 ring-white/30" />

            {/* card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className={`card p-5 md:max-w-xl ${i % 2 ? "md:ml-auto" : "md:mr-auto"}`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <h4 className="text-lg font-semibold">{it.title}</h4>
                <span className="text-xs rounded-full border border-white/15 px-2 py-0.5 text-base-muted">
                  {it.period}
                </span>
              </div>
              <div className="text-sm text-base-muted">{it.org}</div>
              {it.bullets?.length ? (
                <ul className="mt-2 list-disc pl-5 text-sm text-base-muted space-y-1">
                  {it.bullets.map((b, idx) => <li key={idx}>{b}</li>)}
                </ul>
              ) : null}
            </motion.div>
          </li>
        ))}
      </ol>
    </div>
  );
}
