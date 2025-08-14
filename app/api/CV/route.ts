// app/api/CV/route.ts
import { NextResponse, type NextRequest } from "next/server";

// This route is static and can run on the Edge runtime safely
export const runtime = "edge";
export const dynamic = "force-static";

export function GET(req: NextRequest) {
  // Redirect /api/CV -> /CV/arun-sudhakar-cv.pdf (served from /public/CV)
  const url = new URL("/CV/arun-sudhakar-cv.pdf", req.url);
  return NextResponse.redirect(url, 307); // 307 preserves method and is cache-friendly
}
