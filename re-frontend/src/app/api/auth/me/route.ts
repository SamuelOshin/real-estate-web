import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE_NAME } from "@/config/auth.config";
import type { AuthUser } from "@/types/user";

/**
 * MOCK IMPLEMENTATION — see login/route.ts for the full explanation.
 *
 * Real implementation sketch:
 *
 *   const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
 *   if (!token) return NextResponse.json(null, { status: 401 });
 *   const backendRes = await fetch(`${process.env.BACKEND_API_URL}/api/v1/auth/me`, {
 *     headers: { Authorization: `Bearer ${token}` },
 *   });
 *   if (!backendRes.ok) return NextResponse.json(null, { status: 401 });
 *   return NextResponse.json(await backendRes.json());
 *
 * The mock below just decodes the fake token minted in login/route.ts.
 */

const MOCK_USER_LOOKUP: Record<string, Omit<AuthUser, "id">> = {
  u_super: { name: "Adaeze Okonkwo", email: "admin@veritasprime.test", role: "super_admin" },
  u_agent: { name: "Tunde Bakare", email: "agent@veritasprime.test", role: "agent" },
  u_finance: { name: "Ngozi Eze", email: "finance@veritasprime.test", role: "finance_docs" },
};

export async function GET(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json(null, { status: 401 });
  }

  const [userId] = Buffer.from(token, "base64").toString("utf-8").split(":");
  const found = MOCK_USER_LOOKUP[userId];
  if (!found) {
    return NextResponse.json(null, { status: 401 });
  }

  const user: AuthUser = { id: userId, ...found };
  return NextResponse.json(user);
}
