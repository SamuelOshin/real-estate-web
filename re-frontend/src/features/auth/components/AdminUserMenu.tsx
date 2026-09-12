"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";

const ROLE_LABELS: Record<string, string> = {
  super_admin: "Super Admin",
  agent: "Field Agent",
  finance_docs: "Finance / Conveyancing",
};

interface AdminUserMenuProps {
  collapsed?: boolean;
}

export function AdminUserMenu({ collapsed = false }: AdminUserMenuProps) {
  const router = useRouter();
  const { user, logout, isLoading } = useAuth();

  if (isLoading || !user) return null;

  async function handleLogout() {
    await logout();
    router.push("/login");
    router.refresh();
  }

  // Generate 2 initials from user name (e.g. "Adaeze Okonkwo" -> "AO")
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase() || "U";

  if (collapsed) {
    return (
      <div className="flex flex-col items-center gap-2 border-t border-white/10 pt-3 relative group">
        <button
          type="button"
          onClick={handleLogout}
          className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center font-heading font-bold text-xs shadow-xs hover:ring-2 hover:ring-white/40 transition-all cursor-pointer"
          title={`Sign out (${user.name})`}
          aria-label={`Sign out (${user.name})`}
        >
          {initials}
        </button>
        {/* Tooltip on hover */}
        <div className="hidden lg:group-hover:flex flex-col absolute left-full ml-3 bottom-0 p-3 bg-primary text-white text-xs rounded-lg shadow-2xl whitespace-nowrap pointer-events-none z-50 border border-white/20">
          <span className="font-bold text-white">{user.name}</span>
          <span className="text-[10px] text-surface-tint mt-0.5">{ROLE_LABELS[user.role] ?? user.role}</span>
          <span className="text-[10px] text-white/60 mt-1">Click avatar to sign out</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-auto flex flex-col gap-3 border-t border-white/10 pt-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-secondary text-white flex items-center justify-center font-heading font-bold text-xs flex-shrink-0 shadow-xs">
          {initials}
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <p className="font-body text-label-md font-semibold text-white truncate leading-tight">
            {user.name}
          </p>
          <p className="font-body text-[11px] text-surface-tint uppercase tracking-wider mt-0.5 truncate">
            {ROLE_LABELS[user.role] ?? user.role}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="flex items-center justify-center gap-2 rounded-lg px-3 py-2 font-body text-label-sm text-white/80 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 transition-colors cursor-pointer"
      >
        <span className="material-symbols-outlined text-[18px]">logout</span>
        <span>Sign Out</span>
      </button>
    </div>
  );
}
