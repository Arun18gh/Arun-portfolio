// components/Section.tsx
import { ReactNode } from "react";

export default function Section({
  id,
  title,
  subtitle,
  children,
  dense = false,
}: {
  id?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  dense?: boolean;
}) {
  return (
    <section id={id} className={dense ? "container py-12" : "container py-16 md:py-24"}>
      <header className={dense ? "mb-6 md:mb-8" : "mb-8 md:mb-10"}>
        <h2 className="text-4xl md:text-5xl font-extrabold">{title}</h2>
        {subtitle ? (
          <p className="text-base-muted mt-2 max-w-2xl">{subtitle}</p>
        ) : null}
      </header>
      {children}
    </section>
  );
}
