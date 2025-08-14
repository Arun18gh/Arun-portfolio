"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type Project = {
  title: string;
  description: string;
  images: string[];
  stack: string[];
  repo: string;
};

export default function ProjectCard({
  project,
  screenshotsAnchor = "#helpdesk-gallery",
}: {
  project: Project;
  /** id (or #id) of the gallery on the page to scroll to */
  screenshotsAnchor?: string;
}) {
  const img = project.images?.[0] || "/favicon.ico";
  const anchor =
    screenshotsAnchor.startsWith("#") ? screenshotsAnchor : `#${screenshotsAnchor}`;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="group card overflow-hidden"
      aria-label={`${project.title} project`}
    >
      {/* Cover */}
      <div className="relative h-56 w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img}
          alt={project.title}
          className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* soft gradient + badge */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/40 px-2 py-0.5 text-[11px]">
          {project.images?.length || 0} screenshots
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl font-semibold">{project.title}</h3>
          <Link
            href={project.repo}
            target="_blank"
            className="text-accent-cyan text-sm hover:underline"
            aria-label="View source code on GitHub"
          >
            View Code →
          </Link>
        </div>

        <p className="mt-2 text-sm text-base-muted">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((t) => (
            <span
              key={t}
              className="px-2 py-1 text-xs rounded-full border border-white/15"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href={project.repo}
            target="_blank"
            className="px-4 py-2 rounded-lg bg-accent-cyan text-black font-semibold shadow-glow"
            aria-label="Open project on GitHub"
          >
            View on GitHub
          </Link>
          <a
            href={anchor}
            className="px-4 py-2 rounded-lg border border-white/20"
            aria-label="Jump to screenshots"
          >
            View screenshots
          </a>
        </div>
      </div>
    </motion.div>
  );
}
