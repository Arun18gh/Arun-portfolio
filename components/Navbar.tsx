"use client";
import Link from "next/link";

const links = [
  { href: "/#about",        label: "About" },
  { href: "/#project",      label: "Project" },
  { href: "/#certificates", label: "Certificates" },
  { href: "/#contact",      label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-white/10">
      <nav className="container flex h-14 items-center justify-between">
        <Link href="/" className="font-extrabold text-xl">
          Arun Sudhakar<span className="text-accent-cyan">.</span>
        </Link>
        <div className="flex items-center gap-6">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-white/90">
              {l.label}
            </Link>
          ))}
        </div>
        <a href="/api/CV?file=/CV/arun-sudhakar-cv.pdf"
          className="px-5 py-3 rounded-xl bg-accent-cyan text-black font-semibold shadow-glow">Download CV
        </a>


      </nav>
    </header>
  );
}
