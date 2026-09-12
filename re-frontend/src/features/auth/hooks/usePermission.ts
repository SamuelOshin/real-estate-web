"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { hasPermission, type Permission } from "@/config/permissions.config";

export function usePermission(permission: Permission): boolean {
  const { user } = useAuth();
  return hasPermission(user?.role, permission);
}
