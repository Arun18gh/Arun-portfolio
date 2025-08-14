import nodemailer from "nodemailer";

const host = process.env.MAIL_HOST;
const user = process.env.MAIL_USER;
const pass = process.env.MAIL_PASS;
const port = Number(process.env.MAIL_PORT || 587);

let transporter: nodemailer.Transporter | null = null;

if (host && user && pass) {
  transporter = nodemailer.createTransport({ host, port, auth: { user, pass } });
}

export async function sendMail({ name, email, message }: { name: string; email: string; message: string; }) {
  if (!transporter) return; // email disabled
  await transporter.sendMail({
    from: `Portfolio <${user}>`,
    to: process.env.CONTACT_TO || email, // send to your inbox; default to user for testing
    subject: `New message from ${name}`,
    text: message,
    html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p>${message}</p>`
  });
}