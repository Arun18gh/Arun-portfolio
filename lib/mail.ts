// lib/mail.ts
import nodemailer, { Transporter } from "nodemailer";

const host = process.env.MAIL_HOST;
const user = process.env.MAIL_USER;
const pass = process.env.MAIL_PASS;
const port = Number(process.env.MAIL_PORT || 587);

let transporter: Transporter | null = null;

console.log("MAIL_USER:", process.env.MAIL_USER);
console.log("MAIL_PASS exists:", !!process.env.MAIL_PASS);
console.log("Host:", host, "Port:", port);


if (host && user && pass) {
  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // Gmail SSL if port 465
    auth: { user, pass },
  });
}

export async function sendMail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  if (!transporter) return;

  await transporter.sendMail({
    from: `Portfolio <${user}>`,
    to: process.env.CONTACT_TO || user,
    subject: `New message from ${name}`,
    text: message,
    html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p>${message}</p>`,
  });
}
