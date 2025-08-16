"use client";
import { useState } from "react";
import emailjs from "emailjs-com";
import styles from "./ContactForm.module.css";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    title: "",
    service: "",
    timeline: "",
    budget: "",
    message: ""
  });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      // Send Contact Us email to you
      await emailjs.send(
        "arunsudhakar", // Service ID
        "template_ga7npca", // Contact Us template
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          title: formData.title,
          service: formData.service,
          timeline: formData.timeline,
          budget: formData.budget,
          message: formData.message,
        },
        "ZG9jM1JksaSJmb-II" // Public Key
      );

      // Send Auto-Reply to user
      await emailjs.send(
        "arunsudhakar",
        "template_cr6v38l", // Auto-Reply template
        {
          from_name: formData.name,
          email: formData.email,
        },
        "ZG9jM1JksaSJmb-II"
      );

      setStatus("✅ Message sent, Thanks for Reaching out!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        title: "",
        service: "",
        timeline: "",
        budget: "",
        message: ""
      });
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("❌ Failed to send message. Try again!");
    }
  };

  return (
    <div className={styles.contactForm}>
      <h2>Contact Me</h2>
      <form onSubmit={handleSubmit} className={styles.formGrid}>
        <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone Number (optional)" value={formData.phone} onChange={handleChange} />
        <input type="text" name="title" placeholder="Subject / Title" value={formData.title} onChange={handleChange} required />

        {/* Service dropdown */}
        <select name="service" value={formData.service} onChange={handleChange} required>
          <option value="">-- Choose a Service --</option>
          <option value="Web App Development & Design">Web App Development & Design</option>
          <option value="Bug Fixing / Code Review">Bug Fixing / Code Review</option>
          <option value="Cybersecurity Check & Hardening">Cybersecurity Check & Hardening</option>
          <option value="Threat & Vulnerability Assessment">Threat & Vulnerability Assessment</option>
          <option value="Pen Testing & Security Audit">Pen Testing & Security Audit</option>
          <option value="Casual Tech Q&A / Friendly Consulting">Casual Tech Q&A / Friendly Consulting</option>
          <option value="Project Brainstorming Session">Project Brainstorming Session</option>
        </select>

        <input type="text" name="timeline" placeholder="Timeline (optional)" value={formData.timeline} onChange={handleChange} />
        <input type="text" name="budget" placeholder="Budget (optional)" value={formData.budget} onChange={handleChange} />
        <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required />
        <button type="submit">Send Message</button>
      </form>
      {status && <p className={styles.status}>{status}</p>}
    </div>
  );
}
