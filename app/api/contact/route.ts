// app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

/* ================================
   Validation
================================== */
const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(120),
  subject: z.string().min(2).max(120),
  message: z.string().min(10).max(5000),

  // optional extras your form may send
  phone: z.string().optional(),
  linkedin: z.string().url().optional().or(z.literal("")),
  service: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),

  // honeypot (must be empty)
  company: z.string().optional(),
});

/* ================================
   SMTP transporter from env (Gmail)
================================== */
function createTransporter() {
  const host = process.env.SMTP_HOST ?? "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT ?? 465);
  const secure = String(process.env.SMTP_SECURE ?? "true") === "true";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error("Missing SMTP_USER/SMTP_PASS in env");
  }

  return nodemailer.createTransport({ host, port, secure, auth: { user, pass } });
}

/* ================================
   Optional Mongo save (skips if placeholder)
================================== */
async function maybeSaveToMongo(doc: Record<string, unknown>) {
  const uri = process.env.MONGODB_URI;
  if (!uri) return;
  if (uri.includes("<user>") || uri.includes("<cluster>") || uri.includes("<db>")) return;

  try {
    const { MongoClient } = await import("mongodb");
    const client = new MongoClient(uri);
    await client.connect();
    const dbName =
      process.env.MONGODB_DB || (new URL(uri).pathname.replace("/", "") || "portfolio");
    await client.db(dbName).collection("contacts").insertOne({
      ...doc,
      createdAt: new Date(),
    });
    await client.close();
  } catch (e) {
    console.warn("[contact] DB insert failed (ignored):", e);
  }
}

/* ================================
   Helpers
================================== */
function escapeHtml(str: string) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* ================================
   POST /api/contact
================================== */
export async function POST(req: Request) {
  try {
    const raw = await req.json();
    const parsed = schema.safeParse(raw);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid input", fields: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // honeypot: if filled, silently accept
    if (parsed.data.company && parsed.data.company.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    const { name, email, subject, message, phone, linkedin, service, budget, timeline } =
      parsed.data;

    const toAddress = process.env.CONTACT_TO || process.env.SMTP_USER!;
    // The actual envelope address we send from (your Gmail)
    const fromAddress = (process.env.CONTACT_FROM?.match(/<(.*)>/)?.[1]) ||
                        process.env.SMTP_USER!;

    const tx = createTransporter();

    // Optional: verify connection (good for first run)
    try {
      await tx.verify();
      console.log("[contact] SMTP OK");
    } catch (e) {
      console.error("[contact] SMTP verify failed:", e);
    }

    // ---------------------------
    // 1) Send the notification to you
    //    From header shows the sender's name (address = your Gmail)
    // ---------------------------
    const notifyHtml = `
      <div style="font-family:Inter,Segoe UI,Arial,sans-serif;line-height:1.6;">
        <h2 style="margin:0 0 8px">New message via Portfolio</h2>
        <p style="margin:0 0 8px"><b>Subject:</b> ${escapeHtml(subject)}</p>
        <p style="margin:0 0 8px"><b>From:</b> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
        ${phone ? `<p style="margin:0 0 8px"><b>Phone:</b> ${escapeHtml(phone)}</p>` : ""}
        ${linkedin ? `<p style="margin:0 0 8px"><b>LinkedIn:</b> ${escapeHtml(linkedin)}</p>` : ""}
        <p style="margin:0 0 8px"><b>Service:</b> ${escapeHtml(service || "-")}</p>
        <p style="margin:0 0 8px"><b>Budget:</b> ${escapeHtml(budget || "-")}</p>
        <p style="margin:0 0 8px"><b>Timeline:</b> ${escapeHtml(timeline || "-")}</p>
        <hr style="border:none;border-top:1px solid #eee;margin:12px 0" />
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      </div>
    `;
    const notifyText =
`New message via Portfolio
Subject: ${subject}
From: ${name} <${email}>
Phone: ${phone || "-"}
LinkedIn: ${linkedin || "-"}
Service: ${service || "-"}
Budget: ${budget || "-"}
Timeline: ${timeline || "-"}

${message}
`;

    const notifyInfo = await tx.sendMail({
      // From header shows sender name, but uses your Gmail as actual address to keep DKIM/SPF aligned
      from: `"${name}" <${fromAddress}>`,
      to: toAddress,
      subject: `💼 Portfolio — ${subject} (from ${name})`,
      html: notifyHtml,
      text: notifyText,
      replyTo: email, // reply goes straight to the sender
    });

    console.log("[contact] mail accepted:", notifyInfo.accepted, "rejected:", notifyInfo.rejected);

    // ---------------------------
    // 2) Auto-reply to the sender (signed as Arun sudhakar)
    // ---------------------------
    const thanksHtml = `
      <div style="font-family:Inter,Segoe UI,Arial,sans-serif;line-height:1.6;">
        <p>Hi ${escapeHtml(name)},</p>
        <p>Thanks for reaching out! Your application has been received and I’ll get back to you shortly.</p>
        <p>— Arun sudhakar</p>
      </div>
    `;
    const thanksText =
`Hi ${name},

Thanks for reaching out! Your application has been received and I’ll get back to you shortly.

— Arun sudhakar
`;

    await tx.sendMail({
      from: `"Arun sudhakar" <${fromAddress}>`,
      to: email,
      subject: "Thanks for reaching out 🙌",
      html: thanksHtml,
      text: thanksText,
    });

    // ---------------------------
    // 3) Save to DB (non-blocking; skipped if URI invalid)
    // ---------------------------
    void maybeSaveToMongo({
      name,
      email,
      subject,
      message,
      phone,
      linkedin,
      service,
      budget,
      timeline,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("[contact] fatal error:", err);
    return NextResponse.json(
      { ok: false, error: "Mail server error. Please try again." },
      { status: 500 }
    );
  }
}
