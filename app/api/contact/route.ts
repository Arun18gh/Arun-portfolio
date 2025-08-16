import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { name, email, subject, message, phone, service, budget, timeline } = await req.json();

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.CONTACT_TO) {
    return NextResponse.json({ success: false, error: "Email config missing" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 📩 Email to Owner
    const ownerEmail = {
      from: `"${name}" <${email}>`, // Sender's name & email
      to: process.env.CONTACT_TO,
      subject: `New Contact Form Submission: ${subject || "No Subject"}`,
      html: `
        <h2>📩 New Contact Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <p><strong>Timeline:</strong> ${timeline}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    };

    // 📬 Auto-reply to User
    const autoReply = {
      from: `"Arun Sudhakar" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Re: ${subject || "Your Request"}`, // 👈 Includes their subject
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for reaching out to me regarding <strong>${subject || "your request"}</strong>. I've received your message and will review it shortly.</p>
        <p>I'll get back to you as soon as possible.</p>
        <p>Best regards,<br><strong>Arun Sudhakar</strong></p>
      `,
    };

    // 🚀 Send both in parallel to reduce delay
    await Promise.all([
      transporter.sendMail(ownerEmail),
      transporter.sendMail(autoReply),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to send message" });
  }
}
