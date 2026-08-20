import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const REF_COOKIE = "ss_ref";
const REF_COOKIE_MAX_AGE = 30 * 24 * 60 * 60; // 30 days

/**
 * Captures ?ref=CODE on the landing page or /join into a cookie so the
 * referral survives navigation up to registration. Cookie-only — no
 * database access here (Proxy runs before the Node runtime is guaranteed
 * available), so click counts are recorded separately by a beacon call
 * from the client (see /api/referrals/click).
 */
export function proxy(request: NextRequest) {
  const ref = request.nextUrl.searchParams.get("ref");
  if (!ref) return NextResponse.next();

  const sanitized = ref.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 15);
  if (!sanitized) return NextResponse.next();

  const response = NextResponse.next();
  response.cookies.set(REF_COOKIE, sanitized, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: REF_COOKIE_MAX_AGE,
  });
  return response;
}

export const config = {
  matcher: ["/", "/join"],
};
