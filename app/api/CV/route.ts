// app/api/CV/route.ts
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs"; // we use fs on the server

export async function GET() {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "CV",
      "arun-sudhakar-cv.pdf"
    );

    // Read file as a Node Buffer
    const buf = await fs.readFile(filePath);

    // Convert Buffer -> ArrayBuffer (Web BodyInit accepts ArrayBuffer)
    const arrayBuffer = buf.buffer.slice(
      buf.byteOffset,
      buf.byteOffset + buf.byteLength
    );

    return new NextResponse(arrayBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        // inline to view in browser (use 'attachment' to force download)
        "Content-Disposition": 'inline; filename="arun-sudhakar-cv.pdf"',
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "CV not found" }, { status: 404 });
  }
}
