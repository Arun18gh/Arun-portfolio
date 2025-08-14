"use client";
import { useState } from "react";

type ErrorMap = Record<string, string>;

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<ErrorMap>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFieldErrors({});

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: (fd.get("name") || "").toString(),
      email: (fd.get("email") || "").toString(),
      subject: (fd.get("subject") || "").toString(),
      message: (fd.get("message") || "").toString(),
      phone: (fd.get("phone") || "").toString() || undefined,
      linkedin: (fd.get("linkedin") || "").toString() || undefined,
      service: (fd.get("service") || "").toString() || undefined,
      budget: (fd.get("budget") || "").toString() || undefined,
      timeline: (fd.get("timeline") || "").toString() || undefined,
      company: (fd.get("company") || "").toString(), // honeypot
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    const body = await res.json().catch(() => ({} as any));
    if (res.ok && body?.ok) {
      setDone(true);
    } else {
      setError(body?.error || "Something went wrong. Please try again.");
      if (body?.fields) setFieldErrors(body.fields as ErrorMap);
    }
  }

  if (done) {
    return (
      <div className="card p-6 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-400/30">
          {/* check icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" className="text-emerald-400">
            <path fill="currentColor" d="M9.0 16.2L4.8 12l-1.4 1.4L9 19l12-12-1.4-1.4z"/>
          </svg>
        </div>
        <h4 className="text-lg font-semibold">Thanks for reaching out!</h4>
        <p className="mt-1 text-sm text-base-muted">
          Your application has been received. I’ll reach out to you shortly.
        </p>
        <a href="/#about" className="mt-4 inline-block px-4 py-2 rounded-lg border border-white/15">
          Back to Home
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card p-6 grid gap-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="field-label">Name</label>
          <input name="name" required className="input mt-1" placeholder="Your full name" />
          {fieldErrors.name && <p className="text-red-400 text-xs mt-1">{fieldErrors.name}</p>}
        </div>
        <div>
          <label className="field-label">Email</label>
          <input type="email" name="email" required className="input mt-1" placeholder="you@example.com" />
          {fieldErrors.email && <p className="text-red-400 text-xs mt-1">{fieldErrors.email}</p>}
        </div>
      </div>

      <div>
        <label className="field-label">Subject</label>
        <input name="subject" required className="input mt-1" placeholder="Project inquiry, collaboration, feedback…" />
        {fieldErrors.subject && <p className="text-red-400 text-xs mt-1">{fieldErrors.subject}</p>}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="field-label">Service</label>
          <select name="service" className="select mt-1" defaultValue="">
            <option value="" className="text-black">Choose…</option>
            <option value="web_dev" className="text-black">Web development</option>
            <option value="full_stack" className="text-black">Full-stack build</option>
            <option value="api_backend" className="text-black">API / backend</option>
            <option value="security_review" className="text-black">Security review</option>
            <option value="other" className="text-black">Other</option>
          </select>
        </div>

        <div>
          <label className="field-label">Budget</label>
          <select name="budget" className="select mt-1" defaultValue="">
            <option value="" className="text-black">Choose…</option>
            <option value="<€500" className="text-black">&lt; €500</option>
            <option value="€500–€1k" className="text-black">€500–€1k</option>
            <option value="€1k–€3k" className="text-black">€1k–€3k</option>
            <option value="€3k+" className="text-black">€3k+</option>
          </select>
        </div>

        <div>
          <label className="field-label">Timeline</label>
          <select name="timeline" className="select mt-1" defaultValue="">
            <option value="" className="text-black">Choose…</option>
            <option value="ASAP" className="text-black">ASAP</option>
            <option value="<1 month" className="text-black">&lt; 1 month</option>
            <option value="1–3 months" className="text-black">1–3 months</option>
            <option value="3+ months" className="text-black">3+ months</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="field-label">Phone (optional)</label>
          <input name="phone" className="input mt-1" placeholder="+353 83 123 4567" />
          {fieldErrors.phone && <p className="text-red-400 text-xs mt-1">{fieldErrors.phone}</p>}
        </div>
        <div>
          <label className="field-label">LinkedIn (optional)</label>
          <input name="linkedin" className="input mt-1" placeholder="https://linkedin.com/in/your-profile" />
          {fieldErrors.linkedin && <p className="text-red-400 text-xs mt-1">{fieldErrors.linkedin}</p>}
        </div>
      </div>

      <div>
        <label className="field-label">Message</label>
        <textarea name="message" required rows={6} className="textarea mt-1" placeholder="Tell me about your idea, goals, users, and timeline…" />
        {fieldErrors.message && <p className="text-red-400 text-xs mt-1">{fieldErrors.message}</p>}
      </div>

      {/* Honeypot (hidden) */}
      <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        disabled={loading}
        className="justify-center inline-flex items-center gap-2 rounded-xl px-5 py-3 font-medium bg-accent-cyan text-black shadow-glow disabled:opacity-60"
      >
        {loading ? "Sending…" : "Send message"}
      </button>

      <p className="text-xs text-base-muted">
        By sending, you agree that your details may be stored for the purpose of replying to your message.
      </p>
    </form>
  );
}
