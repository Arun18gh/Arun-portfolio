// app/api/contact/route.ts
import { NextResponse } from "next/server";
// @ts-ignore
import nodemailer from "nodemailer";
import { z } from "zod";

/* ================================
   Your existing code continues here
   ================================ */

// Example (keep your existing logic below this point)
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send the email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: body.subject || "No Subject",
      text: body.message || "",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, error: "Failed to send email" });
  }
}
