"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function FlashCard({
  title,
  body,
  tag,
}: {
  title: string;
  body: string;
  tag?: string;
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const px = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const py = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    setTilt({ x: px * 6, y: -py * 6 }); // degrees
  }
  function onLeave() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transform: `perspective(900px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
        transformStyle: "preserve-3d",
      }}
      whileTap={{ scale: 0.98 }}
      className="group relative"
    >
      <div className="card p-6 relative overflow-hidden">
        {/* shine */}
        <div className="pointer-events-none absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
             style={{
               background:
                 "linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.06) 40%, transparent 60%)",
               transform: "translateZ(30px)",
             }}
        />
        {tag && (
          <span className="text-[11px] uppercase tracking-wider text-accent-cyan">
            {tag}
          </span>
        )}
        <h3 className="mt-2 text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-base-muted leading-relaxed">{body}</p>
      </div>
    </motion.div>
  );
}
