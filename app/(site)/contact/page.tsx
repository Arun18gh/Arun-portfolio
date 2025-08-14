import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <Section title="Contact" subtitle="Your message lands in my inbox and database.">
        <div className="max-w-2xl mx-auto">
          <ContactForm />
        </div>
      </Section>
      <Footer />
    </main>
  );
}