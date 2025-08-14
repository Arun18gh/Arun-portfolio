// app/api/CV/route.ts
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export const runtime = "nodejs";

async function readIfExists(p: string) {
  try { return await fs.readFile(p); } catch { return null; }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  let file = url.searchParams.get("file"); // optional

  const candidates: string[] = [];
  if (file) {
    try { file = decodeURIComponent(file); } catch {}
    if (!file.startsWith("/")) file = `/${file}`;
    candidates.push(file);
  }

  // Try common spots (both cases)
  candidates.push(
    "/CV/arun-sudhakar-cv.pdf",
    "/cv/arun-sudhakar-cv.pdf",
    "/CV/CV - Arun sudhakar.pdf",
    "/cv/CV - Arun sudhakar.pdf"
  );

  let buf: Buffer | null = null;
  let used = "";
  for (const rel of candidates) {
    if (rel.includes("..")) continue;
    const abs = path.join(process.cwd(), "public", rel.replace(/^\//, ""));
    const b = await readIfExists(abs);
    if (b) { buf = b; used = rel; break; }
  }

  if (!buf) {
    return NextResponse.json({ ok:false, error:"CV not found", tried:candidates }, { status:404 });
  }

  return new NextResponse(buf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Arun_Sudhakar_CV.pdf"',
      "Cache-Control": "public, max-age=3600, immutable",
      "X-Served-From": used,
    },
  });
}
