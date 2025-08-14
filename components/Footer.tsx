import Link from "next/link";
import { profile } from "@/content/profile";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20">
      <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-base-muted">© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <div className="flex items-center gap-4 text-sm">
          <Link href={profile.socials.github} target="_blank">GitHub</Link>
          <Link href={profile.socials.linkedin} target="_blank">LinkedIn</Link>
          <Link href={profile.resumeHref} target="_blank">Download CV</Link>
        </div>
      </div>
    </footer>
  );
}
