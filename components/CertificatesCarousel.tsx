"use client";
import { useEffect, useRef } from "react";

type Cert = {
  title: string;
  issuer: string;
  date?: string;
  image: string;      // can be a PDF or an image
  verify?: string;    // optional: link to open (defaults to image/file)
};

export default function CertificatesCarousel({
  items,
  grid = false,
}: {
  items: Cert[];
  grid?: boolean;
}) {
  const Card = ({ c }: { c: Cert }) => {
    const isPdf = c.image.toLowerCase().endsWith(".pdf");
    const href = c.verify || c.image;

    return (
      <a key={c.title} href={href} target="_blank" className="card overflow-hidden">
        {isPdf ? (
          <div className="w-full h-44 flex items-center justify-center bg-white/5">
            <span className="text-sm">PDF • Open to view</span>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={c.image} alt={c.title} className="w-full h-44 object-cover" />
        )}
        <div className="p-4">
          <div className="font-medium">{c.title}</div>
          <div className="text-xs text-base-muted">
            {c.issuer}
            {c.date ? ` • ${c.date}` : ""}
          </div>
        </div>
      </a>
    );
  };

  if (grid) {
    return (
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((c) => (
          <Card key={c.title} c={c} />
        ))}
      </div>
    );
  }

  // simple autoplay slider
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let id = 0;
    let pos = 0;
    const step = () => {
      pos += 0.5;
      el.scrollLeft = pos;
      if (pos >= el.scrollWidth - el.clientWidth) pos = 0;
      id = requestAnimationFrame(step);
    };
    id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div ref={ref} className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-1">
      {items.map((c) => (
        <div key={c.title} className="min-w-[320px] snap-start">
          <Card c={c} />
        </div>
      ))}
    </div>
  );
}
