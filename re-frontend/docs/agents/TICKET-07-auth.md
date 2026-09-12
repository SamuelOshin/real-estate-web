# TICKET-07 — Authentication (Frontend Scaffolding + Backend Wiring Contract)

Status: **implemented and functionally verified** (not an agent ticket like
01–06 — this one was built and tested directly). This document exists so
whoever builds the FastAPI backend, and any agent who touches auth code
later, understands the contract they're wiring into.

## What exists now

A fully working mock auth system: login, session check, logout,
route-level protection on `/admin/*`, and permission-gated UI. It has been
tested end-to-end against a running dev server (redirect-when-unauthenticated,
401-on-bad-password, cookie issued on success, `/admin/*` passes through
with a valid cookie, session cleared on logout) — this is not just
type-checked, it runs correctly.

**None of it is real security yet.** The "session cookie" is a base64
string, not a signed JWT. There is no password hashing. Three hardcoded
mock users exist in `src/app/api/auth/login/route.ts` and
`src/app/api/auth/me/route.ts`. This is intentional — the goal of this
phase was to let every other layer (middleware, hooks, components) be
built and tested against a realistic contract before the backend exists,
not to ship a secure auth system.

## Architecture decision: Next.js as a BFF, not a passthrough

The browser never talks to FastAPI directly for auth. It talks to this
Next.js app's own `/api/auth/*` routes, which — once the backend exists —
will proxy to FastAPI server-side and mint a local cookie. This was a
deliberate choice, not a placeholder to be removed later:

- Avoids cross-origin cookie issues entirely (`SameSite`/`Secure` policy
  headaches when frontend and backend are on different domains).
- Means `features/auth/api.ts`, every hook, and every component are
  already final — they call `/api/auth/login` on their own origin and
  always will. Only the three route handler files change when the real
  backend goes in.

## Exactly what changes when FastAPI exists

Each of these three files has the real implementation already sketched in
a comment block at the top — this is not "figure it out later," it's
"replace the function body with the fetch call already written out for
you":

| File | Current (mock) | Becomes |
|---|---|---|
| `src/app/api/auth/login/route.ts` | Checks against `MOCK_USERS` array, mints a base64 fake token | `fetch()`s FastAPI's `POST /api/v1/auth/login`, relays the real JWT into the local cookie |
| `src/app/api/auth/me/route.ts` | Decodes the base64 fake token | `fetch()`s FastAPI's `GET /api/v1/auth/me` with `Authorization: Bearer <token>` |
| `src/app/api/auth/logout/route.ts` | Just clears the local cookie | (Optionally) calls a backend revocation endpoint first, then clears the cookie same as now |

Also required once the backend exists:

- **`src/middleware.ts`** — currently checks only that the cookie exists.
  Must be upgraded to verify the JWT signature using an edge-compatible
  library (`jose` is the standard choice) — the real sketch is already in
  a comment in that file. Cookie presence is not proof of validity; this
  is the one piece of mock behavior that is a genuine security gap, not
  just a stand-in.
- **`.env.local`** — copy `.env.local.example` and set `BACKEND_API_URL`
  to the real FastAPI base URL.
- **Backend-side:** the TRD already specifies JWT-based auth with
  HttpOnly cookies and server-side role checks on every write endpoint
  (see TRD "Authentication and Authorization"). The permission matrix in
  `src/config/permissions.config.ts` should be treated as the frontend's
  mirror of whatever the backend enforces — when the backend's role
  logic is built, cross-check it against that file so the two don't
  drift. The frontend hiding a button is not a substitute for the backend
  rejecting the request.

## Files in this delivery

```
src/types/user.ts                                  Role, AuthUser types
src/config/auth.config.ts                          cookie name, protected route prefixes
src/config/permissions.config.ts                   permission matrix (mirrors PRD roles table)
src/features/auth/api.ts                           login/logout/getSession — the abstraction everything else depends on
src/features/auth/context/AuthProvider.tsx         session state, wraps the whole app
src/features/auth/hooks/useAuth.ts
src/features/auth/hooks/usePermission.ts
src/features/auth/components/LoginForm.tsx
src/features/auth/components/RequirePermission.tsx  UI-level permission gate (not a security boundary)
src/features/auth/components/AdminUserMenu.tsx      shown in the admin sidebar
src/app/api/auth/login/route.ts                    mock backend — replace per table above
src/app/api/auth/logout/route.ts
src/app/api/auth/me/route.ts
src/app/(auth)/layout.tsx                          minimal centered layout for auth pages
src/app/(auth)/login/page.tsx
src/middleware.ts                                  route-level gate on /admin/* — MUST be at src/middleware.ts, not project root, because this project uses a src/ directory
.env.local.example
```

Two existing files were modified (merge these into your working copy —
they may look different from this reference if agent tickets 01–06 already
changed them; merge by hand, don't overwrite blindly):

- `src/app/layout.tsx` — wrapped children in `<AuthProvider>`.
- `src/app/(admin)/admin/layout.tsx` — added `<AdminUserMenu />` at the
  bottom of the sidebar, made the `<aside>` a flex column so it pins to
  the bottom.

## Mock accounts (for testing until the backend exists)

| Email | Password | Role |
|---|---|---|
| `admin@veritasprime.test` | `password123` | `super_admin` |
| `agent@veritasprime.test` | `password123` | `agent` |
| `finance@veritasprime.test` | `password123` | `finance_docs` |

## A bug worth knowing about (already fixed here, but instructive)

Middleware was initially placed at the project root (`middleware.ts`) and
Next.js silently ignored it — the middleware manifest came back empty, no
error thrown. Because this project uses a `src/` directory, Next.js only
picks up middleware at `src/middleware.ts`. If a future agent (or you)
ever "simplifies" this back to the root, the `/admin/*` gate will silently
stop working with no build error to catch it — the only way to catch this
class of bug is to actually run the dev server and hit a protected route,
which is why that test is worth re-running after any middleware change,
not just trusting `npm run build`.

## Suggested next tickets

- **TICKET-08**: Wire `RequirePermission` into the admin dashboard's
  approve/publish actions built in TICKET-04/05 (e.g. wrap the "Approve
  Listing" action in `RequirePermission permission="listings.approve"`).
- **TICKET-09**: Reconcile the Quick Publish modal (TICKET-04) with the
  full publish wizard (TICKET-05) now that both exist — this was flagged
  as an open question in both tickets and hasn't been resolved.
