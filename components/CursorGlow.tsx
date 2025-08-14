"use client";
import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  const springX = useSpring(-9999, { stiffness: 120, damping: 20, mass: 0.2 });
  const springY = useSpring(-9999, { stiffness: 120, damping: 20, mass: 0.2 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      springX.set(e.clientX);
      springY.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [springX, springY]);

  return (
    <motion.div
      aria-hidden
      style={{ left: springX, top: springY }}
      className="pointer-events-none fixed z-[60] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full"
    >
      <div className="absolute inset-0 blur-3xl opacity-20 bg-[radial-gradient(circle,rgba(0,229,255,0.55)_0%,transparent_60%)]" />
    </motion.div>
  );
}
