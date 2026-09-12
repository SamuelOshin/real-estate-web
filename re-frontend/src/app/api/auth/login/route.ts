import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, SESSION_MAX_AGE_SECONDS } from "@/config/auth.config";
import type { AuthUser } from "@/types/user";

/**
 * MOCK IMPLEMENTATION — replace the body of this function when the FastAPI
 * backend exists. Nothing outside this file needs to change: the contract
 * below (request shape, response shape, cookie behavior) is the real
 * contract this route will keep once it's wired to a real backend.
 *
 * Real implementation sketch:
 *
 *   const backendRes = await fetch(`${process.env.BACKEND_API_URL}/api/v1/auth/login`, {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify({ email, password }),
 *   });
 *   if (!backendRes.ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
 *   const { access_token, user } = await backendRes.json();
 *   // Mint a local cookie wrapping the backend's JWT — components never
 *   // see the token itself, only this route and middleware.ts do.
 *   const res = NextResponse.json(user);
 *   res.cookies.set(AUTH_COOKIE_NAME, access_token, { httpOnly: true, secure: true, sameSite: "lax", maxAge: SESSION_MAX_AGE_SECONDS, path: "/" });
 *   return res;
 *
 * The mock below stores `${userId}:${role}` instead of a real signed JWT.
 * It is NOT a security mechanism — it's a placeholder so every other layer
 * (middleware, hooks, components) can be built and tested against a
 * realistic contract before the backend exists. Do not ship this mock.
 */

const MOCK_USERS: Array<AuthUser & { password: string }> = [
  { id: "u_super", name: "Adaeze Okonkwo", email: "admin@veritasprime.test", password: "password123", role: "super_admin" },
  { id: "u_agent", name: "Tunde Bakare", email: "agent@veritasprime.test", password: "password123", role: "agent" },
  { id: "u_finance", name: "Ngozi Eze", email: "finance@veritasprime.test", password: "password123", role: "finance_docs" },
];

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const match = MOCK_USERS.find((u) => u.email === email && u.password === password);
  if (!match) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const { password: _password, ...user } = match;
  const mockToken = Buffer.from(`${user.id}:${user.role}`).toString("base64");

  const response = NextResponse.json(user satisfies AuthUser);
  response.cookies.set(AUTH_COOKIE_NAME, mockToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: "/",
  });
  return response;
}
