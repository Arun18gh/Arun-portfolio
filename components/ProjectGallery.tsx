"use client";
import { useEffect, useState } from "react";

export default function ProjectGallery({ images, id }: { images: string[]; id?: string }) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const openAt = (i: number) => { setIdx(i); setOpen(true); };
  const next = () => setIdx((i) => (i + 1) % images.length);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div id={id}>
      {/* thumbs */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => openAt(i)}
            className="card overflow-hidden group"
            title={`Open screenshot ${i + 1}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={`Screenshot ${i + 1}`} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
          </button>
        ))}
      </div>

      {/* lightbox */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setOpen(false)}>
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images[idx]} alt="screenshot" className="w-full h-auto rounded-2xl border border-white/10" />
            <div className="absolute inset-x-0 -bottom-14 flex items-center justify-center gap-4">
              <button onClick={prev} className="px-4 py-2 rounded-lg border border-white/20">← Prev</button>
              <button onClick={() => setOpen(false)} className="px-4 py-2 rounded-lg bg-accent-cyan text-black font-semibold shadow-glow">Close</button>
              <button onClick={next} className="px-4 py-2 rounded-lg border border-white/20">Next →</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
