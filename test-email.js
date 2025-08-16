import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import nodemailer from "nodemailer";

console.log("SMTP_USER:", process.env.SMTP_USER);
console.log("SMTP_PASS exists:", !!process.env.SMTP_PASS);

if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
  console.error("❌ Missing SMTP_USER or SMTP_PASS in .env.local");
  process.exit(1);
}

async function sendTestEmail() {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: process.env.SMTP_PORT || 465,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.CONTACT_FROM,
      to: process.env.CONTACT_TO,
      subject: "Test Email from Portfolio",
      text: "This is a test email to verify SMTP settings.",
    });

    console.log("✅ Email sent:", info.messageId);
  } catch (err) {
    console.error("❌ Error sending email:", err);
  }
}

sendTestEmail();
