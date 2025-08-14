// app/api/contact/route.ts
export const runtime = "nodejs";         // Nodemailer needs Node runtime
export const dynamic = "force-dynamic";  // avoid static optimization

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(2),
  service: z.string().optional(),
  phone: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(5),
  linkedin: z.string().url().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,                      // e.g. smtp.gmail.com
      port: Number(process.env.MAIL_PORT || 587),       // 587 STARTTLS (recommended)
      secure: process.env.MAIL_PORT === "465",          // true only for 465
      auth: {
        user: process.env.MAIL_USER!,                   // SMTP username
        pass: process.env.MAIL_PASS!,                   // SMTP password / app password
      },
    });

    const to = process.env.MAIL_TO || process.env.MAIL_USER!;
    const from = process.env.MAIL_FROM || process.env.MAIL_USER!;

    await transporter.sendMail({
      from: `"Portfolio Contact" <${from}>`,
      to,
      subject: `Portfolio: ${data.subject}`,
      replyTo: data.email,
      text: `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone ?? "-"}
Service: ${data.service ?? "-"}
Budget: ${data.budget ?? "-"}
Timeline: ${data.timeline ?? "-"}
LinkedIn: ${data.linkedin ?? "-"}
Message:
${data.message}
      `.trim(),
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error(err);
    const msg = err?.message ?? "Unknown error";
    return NextResponse.json({ ok: false, error: msg }, { status: 400 });
  }
}
