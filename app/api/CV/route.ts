// app/api/CV/route.ts
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs"; // using fs

export async function GET() {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "CV",
      "arun-sudhakar-cv.pdf"
    );

    // Read as Node Buffer (extends Uint8Array)
    const buf = await fs.readFile(filePath);

    // Create a Uint8Array view over exactly the PDF bytes
    const uint8 = new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);

    return new NextResponse(uint8, {
      headers: {
        "Content-Type": "application/pdf",
        // Use 'inline' to view in browser; change to 'attachment' to force download
        "Content-Disposition": 'inline; filename="arun-sudhakar-cv.pdf"',
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "CV not found" }, { status: 404 });
  }
}
