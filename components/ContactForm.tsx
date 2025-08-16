"use client";

import React, { useState } from "react";
import styles from "./ContactForm.module.css";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
    service: "",
    budget: "",
    timeline: "",
    message: "",
  });

  const [popup, setPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setPopup(true);
        setFormData({
          name: "",
          email: "",
          subject: "",
          phone: "",
          service: "",
          budget: "",
          timeline: "",
          message: "",
        });
      } else {
        console.error("Failed to send message");
      }
    } catch (err) {
      console.error("Error sending message", err);
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Let's Build Something</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
        <input name="service" placeholder="Service" value={formData.service} onChange={handleChange} />
        <input name="budget" placeholder="Budget" value={formData.budget} onChange={handleChange} />
        <input name="timeline" placeholder="Timeline" value={formData.timeline} onChange={handleChange} className={styles.fullWidth} />
        <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} className={styles.fullWidth}></textarea>
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>

      {popup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h3>Message Sent!</h3>
            <p>Thanks for reaching out, I'll get back to you shortly.</p>
            <button onClick={() => setPopup(false)} className={styles.closeBtn}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
