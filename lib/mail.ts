import nodemailer from 'nodemailer';

let transporter: any = null;

const host = process.env.SMTP_HOST || "smtp.gmail.com";
const port = Number(process.env.SMTP_PORT || 465);
const secure = process.env.SMTP_SECURE === "true"; // true for 465, false for 587

const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;

if (user && pass) {
  transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  }) as any;
}

export async function sendMail(to: string, subject: string, html: string) {
  if (!transporter) {
    throw new Error("Mail transporter not configured.");
  }

  const from = process.env.CONTACT_FROM || `"Portfolio Bot" <${user}>`;

  return transporter.sendMail({
    from,
    to,
    subject,
    html,
  });
}

export default transporter;
