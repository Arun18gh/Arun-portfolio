// app/(site)/page.tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import FlashCard from "@/components/FlashCard";
import ProjectCard from "@/components/ProjectCard";
import CertificatesCarousel from "@/components/CertificatesCarousel";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import SkillsGrid from "@/components/SkillsGrid";
import Roadmap from "@/components/Roadmap";

import { skillGroups } from "@/content/skills";
import { helpdeskProject } from "@/content/projects";
import { certificates } from "@/content/certificates";
import { timeline } from "@/content/experience";
import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />

      {/* ===== About (richer copy + stats + pillars) ===== */}
      <Section
        id="about"
        title="About"
        subtitle="I build polished products that perform under pressure."
        dense
      >
        <div className="grid md:grid-cols-2 gap-8">
          {/* Narrative */}
          <div className="space-y-4 text-white/85">
            <p>
              I’m a full-stack developer with a cybersecurity mindset. I like to
              work where UX, APIs, and data meet—turning ideas into robust,
              animated products that feel fast and trustworthy.
            </p>
            <p>
              My latest build is an{" "}
              <span className="text-accent-cyan">
                IT Helpdesk Chatbot & Ticketing System
              </span>{" "}
              featuring a rule-based assistant, ticket workflows with file
              uploads, role-based access, and a clean analytics dashboard. I’m
              comfortable owning the entire path—from the schema and validation
              rules to the motion design that makes it feel premium.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-base-muted">
              <li>Secure by default: input validation, least-privilege, safe storage.</li>
              <li>Frontend craft: Next.js + Tailwind + Framer Motion.</li>
              <li>Backend clarity: Node/Flask, REST APIs, clean models.</li>
            </ul>

            {/* quick stats */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="card p-3 text-center">
                <div className="text-2xl font-bold">20+</div>
                <div className="text-[11px] text-base-muted">Front-end & Major full-stack build</div>
              </div>
              <div className="card p-3 text-center">
                <div className="text-2xl font-bold">15+</div>
                <div className="text-[11px] text-base-muted">Certifications/workshops</div>
              </div>
              <div className="card p-3 text-center">
                <div className="text-2xl font-bold">∞</div>
                <div className="text-[11px] text-base-muted">Curiosity & polish</div>
              </div>
            </div>
          </div>

          {/* Pillars */}
          <div className="grid gap-6">
            <FlashCard
              title="End-to-end ownership"
              body="Own UX, validation, database design, and delivery. No gaps between UI and API."
              tag="Ownership"
            />
            <FlashCard
              title="Security-first thinking"
              body="Apply secure defaults and careful data handling from the first line of code."
              tag="Security"
            />
            <FlashCard
              title="Motion & clarity"
              body="Micro-interactions that guide the eye without getting in the way."
              tag="Delight"
            />
          </div>
        </div>
      </Section>

      {/* ===== Skills (floating cards, compact spacing) ===== */}
      <Section id="skills" title="Skills" subtitle="Focused, modern stack." dense>
        <SkillsGrid groups={skillGroups} floating />
      </Section>

      {/* ===== Experience & Education (Roadmap) ===== */}
      <Section
        id="experience"
        title="Experience & Education"
        subtitle="A quick path of what I've built and studied."
        dense
      >
        <Roadmap items={timeline} />
      </Section>

      {/* ===== Featured Project ===== */}
      <Section
        id="project"
        title="Featured Project"
        subtitle="A solo build that shows end-to-end execution."
        dense
      >
        <div className="grid md:grid-cols-2 gap-6">
          <ProjectCard project={helpdeskProject} />
        </div>

        {/* More front-end work note */}
        <div className="mt-4 text-sm text-base-muted">
          I’ve also built several front-end mini-projects and UI experiments.{" "}
          <a
            href="https://github.com/Arun18gh?tab=repositories"
            target="_blank"
            className="text-accent-cyan underline"
          >
            Check out my GitHub for more →
          </a>
        </div>

        {/* Pointer to full gallery on /projects */}
        <div id="helpdesk-gallery" className="mt-6 text-sm text-base-muted">
          Want all screenshots?{" "}
          <Link
            href="/projects#helpdesk-gallery"
            className="text-accent-cyan underline"
          >
            Open the full gallery
          </Link>
          .
        </div>
      </Section>

      {/* ===== Certificates (preview + view all) ===== */}
      <Section
        id="certificates"
        title="Certificates"
        subtitle="Verified credentials & workshops."
        dense
      >
        <CertificatesCarousel items={certificates.slice(0, 4)} grid />
        <div className="mt-6">
          <a
            href="/certificates"
            className="inline-block px-5 py-3 rounded-xl border border-white/20"
          >
            View all certificates
          </a>
        </div>
      </Section>

      {/* ===== Contact ===== */}
      <Section
        id="contact"
        title="Let’s build something"
        subtitle="Your message lands in my inbox and database."
      >
        <div className="max-w-2xl mx-auto">
          <ContactForm />
        </div>
      </Section>

      <Footer />
    </main>
  );
}
