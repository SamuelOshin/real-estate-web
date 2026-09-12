"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site.config";
import { AdminUserMenu } from "@/features/auth/components/AdminUserMenu";
import { useAuth } from "@/features/auth/hooks/useAuth";

const ROLE_LABELS: Record<string, string> = {
  super_admin: "Super Admin",
  agent: "Field Agent",
  finance_docs: "Finance / Conveyancing",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  // Restore collapsed state from localStorage after mount
  useEffect(() => {
    const saved = localStorage.getItem("admin_sidebar_collapsed");
    if (saved !== null) {
      setSidebarCollapsed(saved === "true");
    }
  }, []);

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("admin_sidebar_collapsed", String(next));
      return next;
    });
  };

  // Keyboard shortcut Ctrl+B / Cmd+B to toggle sidebar collapse
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        toggleSidebarCollapse();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navItems = [
    { label: "Dashboard Overview", href: "/admin/dashboard", icon: "grid_view" },
    { label: "Property Listings", href: "/properties", icon: "holiday_village" },
    { label: "Publish New Property", href: "/admin/properties/new", icon: "add_business" },
    { label: "Inspection Rosters", href: "/contact", icon: "event_available" },
  ];

  const cadastralNav = [
    { label: "Cadastral Dossiers", href: "/properties", icon: "verified" },
    { label: "Public Landing Page", href: "/", icon: "public" },
  ];

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar backdrop for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-primary text-white flex flex-col justify-between shadow-2xl transition-[width,transform] duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${sidebarCollapsed ? "w-72 lg:w-20" : "w-72"}`}
      >
        <div className="flex flex-col">
          {/* Brand header */}
          <div
            className={`h-20 px-4 sm:px-6 flex items-center border-b border-white/10 bg-primary/40 transition-all ${
              sidebarCollapsed
                ? "justify-between lg:justify-center lg:px-2"
                : "justify-between"
            }`}
          >
            <Link
              href="/"
              className={`flex items-center gap-3 group focus:outline-none ${
                sidebarCollapsed ? "lg:justify-center" : ""
              }`}
              title="Prison Gihon Home"
            >
              <div className="w-9 h-9 flex items-center justify-center flex-shrink-0 bg-white/10 rounded-lg p-1.5 group-hover:scale-105 transition-transform">
                <Image
                  src="/logo-icon.svg"
                  alt="Prison Gihon Logo"
                  width={28}
                  height={28}
                  className="w-7 h-7 object-contain"
                />
              </div>
              <div
                className={`flex flex-col transition-opacity duration-200 ${
                  sidebarCollapsed ? "lg:hidden" : "flex"
                }`}
              >
                <span className="font-heading font-extrabold text-headline-sm text-white tracking-tight leading-none">
                  PRISON GIHON
                </span>
                <span className="font-body text-[10px] text-surface-tint uppercase tracking-widest mt-1 font-semibold">
                  Institutional Portal
                </span>
              </div>
            </Link>

            {/* Desktop Collapse Toggle in Header */}
            <button
              type="button"
              onClick={toggleSidebarCollapse}
              className={`hidden lg:flex p-1.5 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer ${
                sidebarCollapsed ? "hidden" : "flex"
              }`}
              aria-label="Collapse sidebar (Ctrl+B)"
              title="Collapse sidebar (Ctrl+B)"
            >
              <span className="material-symbols-outlined text-[20px]">
                keyboard_double_arrow_left
              </span>
            </button>

            {/* Mobile close button */}
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-white/70 hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close sidebar"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Core Operations Nav */}
          <div className="px-3 pt-6">
            <div
              className={`px-3 pb-2 font-body text-[10px] uppercase tracking-wider text-surface-tint font-bold transition-all ${
                sidebarCollapsed ? "lg:hidden" : "block"
              }`}
            >
              Core Operations
            </div>
            {sidebarCollapsed && (
              <div className="hidden lg:block h-px bg-white/10 my-2 mx-2" />
            )}

            <nav className="flex flex-col gap-1.5">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center rounded-lg font-body text-label-md transition-all relative group ${
                      sidebarCollapsed
                        ? "lg:justify-center lg:px-0 lg:h-11 px-3 py-2.5 gap-3"
                        : "px-3 py-2.5 gap-3"
                    } ${
                      isActive
                        ? "bg-secondary text-white font-semibold shadow-1"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <span className="material-symbols-outlined text-[22px] flex-shrink-0">
                      {item.icon}
                    </span>
                    <span
                      className={`truncate transition-all ${
                        sidebarCollapsed ? "lg:hidden" : "inline"
                      }`}
                    >
                      {item.label}
                    </span>

                    {/* Floating Tooltip Pill (when collapsed on desktop) */}
                    {sidebarCollapsed && (
                      <div className="hidden lg:group-hover:flex absolute left-full ml-3 px-2.5 py-1.5 bg-primary text-white text-xs font-semibold rounded-md shadow-2xl whitespace-nowrap pointer-events-none z-50 items-center gap-1.5 border border-white/20">
                        <span>{item.label}</span>
                      </div>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Cadastral & Growth Nav */}
          <div className="px-3 pt-5">
            <div
              className={`px-3 pb-2 font-body text-[10px] uppercase tracking-wider text-surface-tint font-bold transition-all ${
                sidebarCollapsed ? "lg:hidden" : "block"
              }`}
            >
              Cadastral &amp; Growth
            </div>
            {sidebarCollapsed && (
              <div className="hidden lg:block h-px bg-white/10 my-2 mx-2" />
            )}

            <nav className="flex flex-col gap-1.5">
              {cadastralNav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center rounded-lg font-body text-label-md transition-all relative group ${
                    sidebarCollapsed
                      ? "lg:justify-center lg:px-0 lg:h-11 px-3 py-2.5 gap-3"
                      : "px-3 py-2.5 gap-3"
                  } text-white/80 hover:bg-white/10 hover:text-white`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <span className="material-symbols-outlined text-[22px] flex-shrink-0">
                    {item.icon}
                  </span>
                  <span
                    className={`truncate transition-all ${
                      sidebarCollapsed ? "lg:hidden" : "inline"
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Floating Tooltip Pill */}
                  {sidebarCollapsed && (
                    <div className="hidden lg:group-hover:flex absolute left-full ml-3 px-2.5 py-1.5 bg-primary text-white text-xs font-semibold rounded-md shadow-2xl whitespace-nowrap pointer-events-none z-50 items-center gap-1.5 border border-white/20">
                      <span>{item.label}</span>
                    </div>
                  )}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="p-3 pb-6 flex flex-col gap-2">
          {/* Collapse / Expand quick button at bottom for desktop */}
          <button
            type="button"
            onClick={toggleSidebarCollapse}
            className={`hidden lg:flex items-center rounded-lg p-2.5 text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer group relative ${
              sidebarCollapsed ? "justify-center" : "gap-2.5 px-3"
            }`}
            title={sidebarCollapsed ? "Expand sidebar (Ctrl+B)" : "Collapse sidebar (Ctrl+B)"}
          >
            <span className="material-symbols-outlined text-[20px]">
              {sidebarCollapsed ? "keyboard_double_arrow_right" : "keyboard_double_arrow_left"}
            </span>
            <span
              className={`font-body text-label-md transition-all ${
                sidebarCollapsed ? "hidden" : "inline"
              }`}
            >
              Collapse Sidebar
            </span>
            <span
              className={`ml-auto font-mono text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-surface-tint ${
                sidebarCollapsed ? "hidden" : "inline"
              }`}
            >
              Ctrl+B
            </span>
            {sidebarCollapsed && (
              <div className="hidden lg:group-hover:flex absolute left-full ml-3 px-2.5 py-1.5 bg-primary text-white text-xs font-semibold rounded-md shadow-2xl whitespace-nowrap pointer-events-none z-50 items-center gap-1.5 border border-white/20">
                <span>Expand Sidebar (Ctrl+B)</span>
              </div>
            )}
          </button>

          {/* Registry Conduit status card */}
          {sidebarCollapsed ? (
            <div className="hidden lg:flex flex-col items-center justify-center p-2.5 rounded-xl bg-white/5 border border-white/10 relative group cursor-pointer">
              <span className="h-2.5 w-2.5 rounded-full bg-verified animate-pulse" />
              <div className="hidden lg:group-hover:flex flex-col absolute left-full ml-3 p-3 bg-primary text-white text-xs rounded-lg shadow-2xl whitespace-nowrap pointer-events-none z-50 border border-white/20">
                <div className="flex items-center gap-2 pb-1">
                  <span className="font-bold text-surface-tint uppercase text-[10px]">
                    Registry Conduit
                  </span>
                  <span className="h-2 w-2 rounded-full bg-verified" />
                </div>
                <span className="font-semibold text-white">Alausa Cadastral: Online</span>
                <span className="text-[10px] text-surface-tint mt-0.5">SCUML Reg #084920</span>
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between pb-1">
                <span className="font-body text-[10px] uppercase text-surface-tint font-bold">
                  Registry Conduit
                </span>
                <span className="h-2 w-2 rounded-full bg-verified animate-pulse" />
              </div>
              <div className="font-body text-body-sm text-white font-medium">
                Alausa Cadastral: Online
              </div>
              <div className="font-body text-[10px] text-surface-tint mt-0.5">
                SCUML Reg #084920
              </div>
            </div>
          )}

          {/* User Profile & Sign Out */}
          <AdminUserMenu collapsed={sidebarCollapsed} />
        </div>
      </aside>

      {/* Main Wrapper */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-[padding] duration-300 ease-in-out ${
          sidebarCollapsed ? "lg:pl-20" : "lg:pl-72"
        }`}
      >
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-16 bg-surface-card border-b border-border px-3 sm:px-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Universal Sidebar Toggle (Mobile opens drawer; Desktop collapses/expands) */}
            <button
              type="button"
              onClick={() => {
                if (window.innerWidth >= 1024) {
                  toggleSidebarCollapse();
                } else {
                  setSidebarOpen((prev) => !prev);
                }
              }}
              className="p-2 rounded-lg text-text-primary hover:bg-surface-tint transition-colors cursor-pointer flex items-center justify-center"
              aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              title={sidebarCollapsed ? "Expand sidebar (Ctrl+B)" : "Collapse sidebar (Ctrl+B)"}
            >
              <span className="material-symbols-outlined text-[24px]">
                {sidebarCollapsed ? "menu_open" : "menu"}
              </span>
            </button>

            {/* Currency Pill */}
            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-lg bg-surface border border-border text-xs">
              <span className="material-symbols-outlined text-secondary text-[17px] sm:text-[18px]">
                currency_exchange
              </span>
              <span className="hidden sm:inline font-body text-label-caps text-text-muted font-bold">
                USD/NGN:
              </span>
              <span className="font-body text-label-md text-text-primary font-semibold">
                ₦1,495.50
              </span>
              <span className="hidden md:inline font-body text-label-caps text-verified bg-badge-cofo-bg px-1.5 py-0.5 rounded font-bold">
                CBN FIX
              </span>
            </div>

            {/* Compliance Pill */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-lg bg-surface border border-border text-xs">
              <span className="material-symbols-outlined text-verified text-[18px]">
                verified_user
              </span>
              <span className="font-body text-label-caps text-text-muted font-bold">
                COMPLIANCE:
              </span>
              <span className="font-body text-label-md text-text-primary">
                EFCC SCUML &amp; Lagos Alausa Synced
              </span>
              <span className="h-2 w-2 rounded-full bg-verified" />
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/admin/properties/new"
              className="flex items-center gap-1.5 bg-primary hover:bg-secondary text-white px-2.5 sm:px-4 py-2 rounded-lg font-body text-label-md transition-colors shadow-1"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span className="hidden sm:inline">New Listing</span>
            </Link>

            <div className="flex items-center gap-1">
              <button
                type="button"
                className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-tint transition-colors relative"
                aria-label="Notifications"
              >
                <span className="material-symbols-outlined text-[20px]">notifications</span>
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-secondary" />
              </button>
            </div>

            <div className="hidden sm:block h-6 w-px bg-border" />

            <div className="flex items-center gap-2">
              <div className="hidden lg:flex flex-col text-right">
                <span className="font-heading text-label-md font-bold text-primary leading-tight">
                  {user?.name ?? "Admin Officer"}
                </span>
                <span className="font-body text-[10px] text-text-muted uppercase">
                  {user ? (ROLE_LABELS[user.role] ?? user.role) : "Managing Partner"}
                </span>
              </div>
              <div
                className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center font-heading font-bold text-xs shadow-xs"
                title={user ? `${user.name} (${ROLE_LABELS[user.role] ?? user.role})` : "Admin Officer"}
              >
                {user
                  ? user.name
                      .split(" ")
                      .map((n) => n[0])
                      .filter(Boolean)
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()
                  : "PG"}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-3.5 sm:p-6 lg:p-8 bg-surface min-w-0 max-w-full overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
