"use client";
import { motion } from "framer-motion";
import type { TimelineItem } from "@/content/experience";

export default function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="relative">
      {/* gradient spine */}
      <div className="absolute left-4 md:left-1/2 -translate-x-px h-full w-0.5 bg-gradient-to-b from-accent-cyan/60 via-white/20 to-accent-violet/60" />
      <ol className="space-y-10">
        {items.map((it, i) => {
          const left = i % 2 === 0;
          return (
            <li key={i} className={`relative md:grid md:grid-cols-2 md:gap-10 ${left ? "" : ""}`}>
              {/* node */}
              <span className="absolute left-4 md:left-1/2 -translate-x-1/2 mt-1 h-4 w-4 rounded-full bg-accent-cyan shadow-glow ring-2 ring-white/30" />
              {/* card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className={`card p-5 md:col-span-1 ${left ? "md:mr-auto md:max-w-xl" : "md:ml-auto md:max-w-xl"}`}
                style={{ backdropFilter: "blur(6px)" }}
              >
                <h4 className="text-lg font-semibold">{it.title}</h4>
                <div className="text-sm text-base-muted">{it.org} • {it.period}</div>
                {it.bullets && (
                  <ul className="mt-2 list-disc pl-5 text-sm text-base-muted space-y-1">
                    {it.bullets.map((b, idx) => <li key={idx}>{b}</li>)}
                  </ul>
                )}
              </motion.div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
