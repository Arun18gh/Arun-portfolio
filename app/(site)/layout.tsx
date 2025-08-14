// app/(site)/layout.tsx
import "@/styles/globals.css";
import type { Metadata } from "next";
// If you created CursorGlow earlier, keep this import; otherwise remove it.
import CursorGlow from "@/components/CursorGlow";

export const metadata: Metadata = {
  title: "Arun Sudhakar — Portfolio",
  description:
    "Cybersecurity-minded Full-Stack Developer. I build clean UIs, secure APIs, and animated experiences.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased bg-app">
        {/* Optional global cursor glow (remove if you didn't add the component) */}
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
