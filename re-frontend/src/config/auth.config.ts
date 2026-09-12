/**
 * Auth-specific settings, kept separate from site.config.ts (brand/content)
 * and theme.tokens.js (style) — this is neither, it's infrastructure
 * config that will eventually be driven by real environment variables
 * once the backend exists.
 */
export const AUTH_COOKIE_NAME = "vp_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours

/** Route prefixes that require an authenticated session. Read by
 * middleware.ts. Keep in sync with the actual (admin) route group. */
export const PROTECTED_ROUTE_PREFIXES = ["/admin"];
