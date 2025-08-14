// app/api/CV/route.ts
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs"; // allow fs on Vercel

export async function GET() {
  try {
    // public/CV/arun-sudhakar-cv.pdf
    const filePath = path.join(
      process.cwd(),
      "public",
      "CV",
      "arun-sudhakar-cv.pdf"
    );

    // Read the file as a Node Buffer
    const file = await fs.readFile(filePath);

    // Convert Buffer -> Blob so it's a Web Fetch-compatible body
    const blob = new Blob([file], { type: "application/pdf" });

    return new NextResponse(blob, {
      headers: {
        "Content-Type": "application/pdf",
        // inline = open in browser; switch to "attachment" to force download
        "Content-Disposition": 'inline; filename="arun-sudhakar-cv.pdf"',
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "CV not found" }, { status: 404 });
  }
}
