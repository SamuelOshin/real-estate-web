"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/utils/cn";
import { transitions } from "@/lib/motion/transitions";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <>
      {/* Top Utility Bar (Diaspora Announcement) */}
      <aside
        aria-label="Diaspora announcement"
        className="bg-primary text-white border-b border-white/10 text-xs py-2 px-4 md:px-6 lg:px-12 font-body"
      >
        <div className="max-w-container mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-verified opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-verified" />
            </span>
            <span className="text-surface-tint tracking-normal font-normal">
              Diaspora Advisory Desk open 24/7{" "}
              <span className="hidden sm:inline text-white/30">•</span>{" "}
              <span className="hidden sm:inline text-surface-tint">
                Lagos, Abuja, Epe &amp; Ibadan
              </span>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              className="flex items-center gap-1.5 text-surface-tint hover:text-white transition-colors"
              href={`tel:${siteConfig.contact.phone}`}
            >
              <span className="material-symbols-outlined text-[15px]">call</span>
              <span className="font-medium tracking-wide">{siteConfig.contact.phone}</span>
            </a>
            <div className="hidden md:flex items-center gap-2 pl-4 border-l border-white/15 text-[11px] text-surface-tint">
              <span className="px-1.5 py-0.5 rounded bg-white/10 font-semibold text-white tracking-wide">
                ₦ NGN
              </span>
              <span>/</span>
              <span className="text-surface-tint/80">$ USD Escrow Backed</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-50 bg-surface-card/95 backdrop-blur-md border-b border-border shadow-1">
        <div className="max-w-container mx-auto px-4 md:px-6 lg:px-12 h-20 flex items-center justify-between gap-6">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
              <Image
                src="/logo-icon.svg"
                alt="Prison Gihon Logo"
                width={38}
                height={38}
                priority
                className="w-9 h-9 object-contain group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 leading-none">
                <span className="font-display font-extrabold text-lg tracking-tight text-primary">
                  PRISON
                </span>
                <span className="font-display font-extrabold text-lg tracking-tight text-secondary">
                  GIHON
                </span>
              </div>
              <span className="text-[9px] tracking-wider uppercase font-semibold text-text-muted mt-0.5 font-body">
                LANDED PROPERTIES • NIGERIA
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {siteConfig.nav.public.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative px-3.5 py-2 rounded-lg font-body text-sm font-semibold transition-colors duration-200 flex items-center gap-1.5",
                    isActive
                      ? "text-secondary font-bold"
                      : "text-text-muted hover:text-primary hover:bg-surface-tint/50"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeDesktopNavPill"
                      transition={{ type: "spring", stiffness: 450, damping: 30 }}
                      className="absolute inset-0 bg-surface-tint rounded-lg border border-secondary/20 shadow-xs"
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {isActive && (
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"
                        aria-hidden="true"
                      />
                    )}
                    <span>{item.label}</span>
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Nav CTA Actions */}
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={transitions.snappy}>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-primary hover:bg-primary-hover text-white font-semibold px-4 py-2.5 rounded-lg text-xs transition-colors shadow-sm font-body"
              >
                Schedule Inspection
              </Link>
            </motion.div>
            {user && (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={transitions.snappy}>
                <Link
                  href="/admin/dashboard"
                  className="inline-flex items-center gap-1.5 border border-primary/20 text-primary bg-surface-tint hover:bg-surface-tint-strong font-semibold px-3.5 py-2.5 rounded-lg text-xs transition-colors shadow-xs font-body"
                >
                  <span className="material-symbols-outlined text-[15px]">dashboard</span>
                  <span>Admin Portal</span>
                </Link>
              </motion.div>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-text-muted hover:text-primary hover:bg-surface-tint transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-t border-border bg-surface-card px-5 py-4 space-y-1.5 shadow-2"
            >
              {siteConfig.nav.public.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between py-2.5 px-3.5 rounded-lg text-base font-body font-semibold transition-colors",
                      isActive
                        ? "bg-surface-tint text-secondary font-bold border-l-4 border-secondary"
                        : "text-text-primary hover:bg-surface-tint/60 hover:text-primary"
                    )}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
                    )}
                  </Link>
                );
              })}
              <div className="pt-3 border-t border-border flex flex-col gap-2">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center py-2.5 px-4 rounded-lg text-sm font-semibold text-white bg-primary hover:bg-primary-hover transition-colors font-body shadow-sm"
                >
                  Schedule Inspection
                </Link>
                {user && (
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="w-full text-center py-2.5 px-4 rounded-lg text-sm font-semibold text-primary bg-surface-tint hover:bg-surface-tint-strong transition-colors font-body border border-primary/20"
                  >
                    Admin Portal
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
