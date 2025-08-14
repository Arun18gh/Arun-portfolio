import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import CertificatesCarousel from "@/components/CertificatesCarousel";
import { certificates } from "@/content/certificates";

export default function CertificatesPage() {
  return (
    <main>
      <Navbar />
      <Section title="Certificates" subtitle="Verified credentials & workshops.">
        <CertificatesCarousel items={certificates} grid />
      </Section>
      <Footer />
    </main>
  );
}
