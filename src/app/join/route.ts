import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * /join?ref=CODE is the "official" shareable referral link shape from the
 * spec. It just forwards to the landing page with the same query string —
 * the proxy (matched on both "/" and "/join") is what actually sets the
 * attribution cookie, so this keeps a single code path for both entry URLs.
 */
export async function GET(request: NextRequest) {
  const ref = request.nextUrl.searchParams.get("ref");
  const url = new URL("/", request.url);
  if (ref) url.searchParams.set("ref", ref);
  return NextResponse.redirect(url);
}
