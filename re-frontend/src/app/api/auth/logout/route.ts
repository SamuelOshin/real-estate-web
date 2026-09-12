import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME } from "@/config/auth.config";

/**
 * Real implementation only needs to add a call to the backend's
 * /api/v1/auth/logout (if it does server-side token revocation) before
 * clearing the local cookie — the cookie-clearing behavior itself doesn't
 * change.
 */
export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(AUTH_COOKIE_NAME);
  return response;
}
