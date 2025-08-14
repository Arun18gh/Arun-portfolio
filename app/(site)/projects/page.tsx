import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import ProjectGallery from "@/components/ProjectGallery";
import { helpdeskProject } from "@/content/projects";
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <main>
      <Navbar />
      <Section title="Projects" subtitle="Selected builds and experiments.">
        <div className="grid md:grid-cols-2 gap-6">
          <ProjectCard project={helpdeskProject} screenshotsAnchor="helpdesk-gallery" />
        </div>

        <div className="mt-8">
          <Link href={helpdeskProject.repo} target="_blank" className="inline-block px-5 py-3 rounded-xl bg-accent-cyan text-black font-semibold shadow-glow">
            View on GitHub
          </Link>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-4">All Screenshots</h3>
          <ProjectGallery id="helpdesk-gallery" images={helpdeskProject.images} />
        </div>
      </Section>
      <Footer />
    </main>
  );
}
