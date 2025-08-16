"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <header className="container pt-14 md:pt-20 pb-6">
      <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
        {/* Left — NEW copy */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl font-extrabold leading-tight"
          >
            Arun <span className="text-accent-cyan">Sudhakar</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-3 text-lg md:text-xl text-base-muted"
          >
            Product engineer focused on <span className="text-white/90">security</span> and{" "}
            <span className="text-white/90">UX</span>. I ship fast, reliable web apps with clean
            APIs, strong validation, and premium micro-interactions.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-4 text-base text-white/85 max-w-2xl"
          >
            Recent work: a full <span className="text-accent-cyan">IT Helpdesk Chatbot & Ticketing
            Platform</span> — chatbot (200+ intents), ticket CRUD with uploads, role flows, and
            analytics.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 grid sm:grid-cols-2 gap-3 text-sm text-base-muted"
          >
            <li className="badge">Auth & data validation</li>
            <li className="badge">Animated, accessible UI</li>
            <li className="badge">Clean DB & API design</li>
            <li className="badge">Production polish</li>
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            {/* Keep uppercase paths since your folders/routes use 'CV' */}
            <a
              href="/CV/arun-sudhakar-cv.pdf"
              className="inline-flex items-center gap-2 rounded-xl bg-accent-cyan text-black font-semibold px-5 py-3 shadow-glow"
            >
              Download CV
            </a>

            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-3 border border-white/15"
            >
              Contact me
            </Link>
          </motion.div>
        </div>

        {/* Right — NEW dynamic frame (no grid, no glow) */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative"
        >
          {/* Animated gradient border */}
          <div className="frame-anim rounded-[2rem]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/profile/IMG-20250621-WA0015.jpg"
              alt="Arun Sudhakar"
              className="h-full w-full object-contain select-none rounded-[1.7rem] bg-black/10"
              draggable={false}
            />
          </div>
        </motion.div>
      </div>

      {/* scoped styles */}
      <style jsx>{`
        .badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 12px; border-radius: 14px;
          border: 1px solid rgba(255,255,255,.12);
          background: linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.03));
        }
        .badge::before {
          content: ""; width: 8px; height: 8px; border-radius: 9999px;
          background: rgba(0,229,255,.9);
          box-shadow: 0 0 0 2px rgba(0,229,255,.18);
        }

        /* === Dynamic photo frame (no grid, no glow) ===
           - Outer element draws an animated conic-gradient border
           - Mask trims it to a ring; inner content is your image
        */
        .frame-anim {
          position: relative;
          width: 100%;
          height: 18rem;           /* h-72 */
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .frame-anim { height: 28rem; } /* md:h-[28rem] */
        }
        .frame-anim::before {
          content: "";
          position: absolute;
          inset: 0;
          padding: 6px;                       /* border thickness */
          border-radius: inherit;
          background:
            conic-gradient(
              from var(--ang, 0deg),
              #00e5ff,
              #7c7cff,
              #00e5ff
            );
          animation: spin 10s linear infinite;
          /* ring mask */
          -webkit-mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
                  mask-composite: exclude;
          pointer-events: none;
        }
        .frame-anim::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(120% 120% at 100% 0%, rgba(255,255,255,.06), transparent 40%),
                      radial-gradient(120% 120% at 0% 100%, rgba(255,255,255,.04), transparent 40%),
                      linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.02));
          /* soft inner border for structure */
          box-shadow: inset 0 0 0 1px rgba(255,255,255,.06);
          pointer-events: none;
        }
        @keyframes spin {
          to { --ang: 360deg; }
        }
      `}</style>
    </header>
  );
}
