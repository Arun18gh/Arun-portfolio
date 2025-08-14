"use client";
import { motion } from "framer-motion";

export default function StatsStrip({
  items,
}: {
  items: { value: string; label: string }[];
}) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map((s) => (
        <motion.div
          key={s.label}
          whileHover={{ y: -4 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center"
        >
          <div className="text-2xl font-bold">{s.value}</div>
          <div className="text-xs text-base-muted">{s.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
