import type { Role } from "@/types/user";

/**
 * Single source of truth for "who can do what," mirroring the PRD's
 * Roles & Permissions table exactly. Both the UI (RequirePermission,
 * usePermission) and — once the backend exists — the API's authorization
 * checks should be generated from or validated against this same table,
 * so the two never drift apart.
 *
 * IMPORTANT: this file governs what the UI *shows*. It is not a security
 * boundary by itself — the backend must independently enforce every one
 * of these checks server-side (see docs/design-system's companion TRD,
 * "Authentication and Authorization" section). Hiding a button here stops
 * a legitimate user from seeing an action they can't take; it does not
 * stop a malicious request that skips the UI entirely.
 */
export const permissions = {
  "listings.create": ["super_admin", "agent"],
  "listings.approve": ["super_admin"],
  "users.manage": ["super_admin"],
  "leads.view_all": ["super_admin"],
  "leads.view_assigned": ["super_admin", "agent"],
  "payments.manage": ["super_admin", "finance_docs"],
} as const satisfies Record<string, readonly Role[]>;

export type Permission = keyof typeof permissions;

export function hasPermission(role: Role | null | undefined, permission: Permission): boolean {
  if (!role) return false;
  return (permissions[permission] as readonly Role[]).includes(role);
}
