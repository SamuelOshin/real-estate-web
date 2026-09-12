"use client";

import type { ReactNode } from "react";
import { usePermission } from "@/features/auth/hooks/usePermission";
import type { Permission } from "@/config/permissions.config";

/**
 * Gates a piece of UI by permission, not by role — call sites express
 * intent ("listings.approve") rather than hardcoding which roles that
 * maps to, so the mapping can change in one place
 * (permissions.config.ts) without touching every component that checks
 * it. Reminder: this hides UI only. The backend must enforce the same
 * check independently — never treat this as the security boundary.
 */
export function RequirePermission({
  permission,
  children,
  fallback = null,
}: {
  permission: Permission;
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const allowed = usePermission(permission);
  return <>{allowed ? children : fallback}</>;
}
