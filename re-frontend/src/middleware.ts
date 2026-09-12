import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, PROTECTED_ROUTE_PREFIXES } from "@/config/auth.config";

/**
 * Route-level gate, enforced server-side at the edge — this is what
 * actually stops an unauthenticated request from reaching admin pages
 * (RequirePermission in features/auth/components only hides UI within a
 * page that's already been allowed through here).
 *
 * Current check is "does the session cookie exist." It does NOT verify a
 * signature, because the mock login route doesn't issue a real signed
 * JWT yet. Once the backend exists and issues real JWTs:
 *
 *   import { jwtVerify } from "jose"; // edge-compatible
 *   const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
 *   try {
 *     await jwtVerify(token, secretKey);
 *   } catch {
 *     return redirectToLogin();
 *   }
 *
 * replaces the presence-only check below. Don't skip this step when
 * wiring the real backend — a cookie merely existing is not proof it's
 * valid.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_ROUTE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  if (!isProtected) return NextResponse.next();

  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
