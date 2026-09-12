"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site.config";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    // Simulate brief network submission
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSubmitting(false);
    setSubscribed(true);
  };

  return (
    <footer className="border-t border-border bg-surface-card text-text-muted font-body text-body-sm pt-16 pb-12 transition-colors">
      <div className="mx-auto max-w-container px-4 md:px-6 lg:px-12">
        {/* Institutional Title Guarantee Strip */}
        <div className="rounded-xl bg-surface-tint border border-border p-6 mb-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-1">
          <div className="flex items-start sm:items-center gap-4">
            <div className="p-2.5 rounded-lg bg-white border border-border shadow-xs text-verified flex-shrink-0">
              <span className="material-symbols-outlined text-[28px] leading-none">
                verified_user
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-heading font-bold text-headline-sm text-primary tracking-tight">
                  100% Verified Titles Guaranteed
                </h4>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-verified/10 text-verified uppercase tracking-wider">
                  Insured
                </span>
              </div>
              <p className="text-body-sm text-text-muted mt-0.5">
                C of O, Governor&apos;s Consent, and Gazette titles only. Complete legal indemnification &amp; zero encumbrance.
              </p>
            </div>
          </div>

          {/* Institutional Accreditation Chips */}
          <div className="flex flex-wrap items-center gap-2.5 self-stretch sm:self-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-border text-[11px] font-semibold text-text-primary font-body tracking-wider uppercase shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-verified" />
              Alausa Land Registry Validated
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-border text-[11px] font-semibold text-text-primary font-body tracking-wider uppercase shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-verified" />
              AGIS Cadastral Audited
            </span>
          </div>
        </div>

        {/* 4-Column Balanced Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-border">
          {/* Column 1: Brand & Compliance Credentials (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-3 mb-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-lg"
              >
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-surface rounded-lg border border-border p-1">
                  <Image
                    src="/logo-icon.svg"
                    alt="Prison Gihon Cadastral Beacon"
                    width={36}
                    height={36}
                    className="w-8 h-8 object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1.5 leading-none">
                    <span className="text-[19px] font-extrabold tracking-tight text-primary font-heading">
                      PRISON
                    </span>
                    <span className="text-[19px] font-extrabold tracking-tight text-secondary font-heading">
                      GIHON
                    </span>
                  </div>
                  <span className="text-[10px] tracking-[0.16em] font-bold text-text-muted uppercase mt-0.5 font-body">
                    CADASTRAL &amp; LANDED ASSETS &bull; NIGERIA
                  </span>
                </div>
              </Link>

              <p className="font-body text-body-sm text-text-muted leading-relaxed mb-5 max-w-sm">
                {siteConfig.tagline}
              </p>
            </div>

            {/* Direct Contact Anchors */}
            <div className="space-y-2 pt-2 text-body-sm">
              <p className="flex items-center gap-2 text-text-primary font-medium">
                <span className="material-symbols-outlined text-[18px] text-secondary">
                  location_on
                </span>
                <span>{siteConfig.contact.address}</span>
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-secondary focus-visible:underline focus-visible:outline-none transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">mail</span>
                  <span>{siteConfig.contact.email}</span>
                </a>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
                  className="hover:text-secondary focus-visible:underline focus-visible:outline-none transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">call</span>
                  <span>{siteConfig.contact.phone}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Cadastral Corridors (Deep-Filtered Links) (2 cols) */}
          <div className="lg:col-span-2">
            <h5 className="font-heading font-bold text-label-caps text-primary uppercase tracking-wider mb-4">
              Growth Corridors
            </h5>
            <ul className="flex flex-col gap-2.5 font-body text-body-sm">
              <li>
                <Link
                  href="/properties?corridor=epe"
                  className="hover:text-secondary focus-visible:ring-1 focus-visible:ring-secondary rounded transition-colors inline-block"
                >
                  Epe Expressway Corridor
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?corridor=ibeju"
                  className="hover:text-secondary focus-visible:ring-1 focus-visible:ring-secondary rounded transition-colors inline-block"
                >
                  Ibeju-Lekki Coastal Belt
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?corridor=guzape"
                  className="hover:text-secondary focus-visible:ring-1 focus-visible:ring-secondary rounded transition-colors inline-block"
                >
                  Guzape Phase 2, Abuja
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?corridor=moniya"
                  className="hover:text-secondary focus-visible:ring-1 focus-visible:ring-secondary rounded transition-colors inline-block"
                >
                  Moniya Train Axis, Ibadan
                </Link>
              </li>
              <li>
                <Link
                  href="/properties"
                  className="text-secondary font-semibold hover:underline inline-flex items-center gap-1 mt-1 text-xs"
                >
                  <span>Browse all parcels</span>
                  <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Title Services & Escrow (3 cols) */}
          <div className="lg:col-span-3">
            <h5 className="font-heading font-bold text-label-caps text-primary uppercase tracking-wider mb-4">
              Verification &amp; Advisory
            </h5>
            <ul className="flex flex-col gap-2.5 font-body text-body-sm">
              <li>
                <Link
                  href="/contact?service=title-audit"
                  className="hover:text-secondary transition-colors inline-block"
                >
                  Title Search &amp; Alausa Audits
                </Link>
              </li>
              <li>
                <Link
                  href="/contact?service=drone-inspection"
                  className="hover:text-secondary transition-colors inline-block"
                >
                  Diaspora Virtual Drone Inspection
                </Link>
              </li>
              <li>
                <Link
                  href="/about#escrow-protocol"
                  className="hover:text-secondary transition-colors inline-block"
                >
                  Clean Escrow Guarantee Terms
                </Link>
              </li>
              <li>
                <Link
                  href="/about#survey-deeds"
                  className="hover:text-secondary transition-colors inline-block"
                >
                  SURCON Registered Beacon Deeds
                </Link>
              </li>
              <li>
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}?text=Hello%20Prison%20Gihon,%20I%20would%20like%20to%20verify%20a%20property%20listing`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 mt-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold hover:bg-emerald-100 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px] text-emerald-600">chat</span>
                  <span>WhatsApp 24/7 Advisory Desk</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Diaspora Advisory Dispatch (3 cols) */}
          <div className="lg:col-span-3">
            <h5 className="font-heading font-bold text-label-caps text-primary uppercase tracking-wider mb-2">
              Diaspora Advisory Dispatch
            </h5>
            <p className="text-body-sm text-text-muted mb-4">
              Bi-weekly legal title audits, government acquisition updates, and vetted pre-market releases for overseas buyers.
            </p>

            {subscribed ? (
              <div className="p-3.5 rounded-lg bg-surface-tint border border-secondary/20 text-text-primary text-xs flex items-start gap-2">
                <span className="material-symbols-outlined text-verified text-[18px] flex-shrink-0">
                  check_circle
                </span>
                <div>
                  <p className="font-semibold text-primary">Subscription confirmed.</p>
                  <p className="text-text-muted text-[11px] mt-0.5">
                    You will receive our next Alausa Cadastral Briefing.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2.5">
                <div>
                  <label htmlFor="footer-email" className="sr-only">
                    Email address for diaspora research briefing
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    required
                    placeholder="Enter diaspora email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-10 px-3.5 text-xs rounded-lg bg-surface border border-border focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-text-primary placeholder:text-text-muted transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-10 px-4 rounded-lg bg-secondary hover:bg-primary text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 font-heading shadow-xs disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary"
                >
                  {isSubmitting ? (
                    <span className="material-symbols-outlined text-[15px] animate-spin">
                      progress_activity
                    </span>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[15px]">send</span>
                      <span>Join Advisory Dispatch</span>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-text-muted flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">lock</span>
                  <span>Zero spam. Strict institutional privacy.</span>
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Legal, Accreditation & Corporate Metadata */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-text-muted font-body">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-center lg:text-left">
            <span>&copy; {new Date().getFullYear()} {siteConfig.name} Ltd.</span>
            <span className="hidden sm:inline">&bull;</span>
            <span className="font-medium text-text-primary">RC: {siteConfig.compliance.rc}</span>
            <span className="hidden sm:inline">&bull;</span>
            <span className="font-medium text-text-primary">SCUML Reg: {siteConfig.compliance.scuml}</span>
            <span className="hidden sm:inline">&bull;</span>
            <span>All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-xs">
            <Link
              href="/about#title-protocol"
              className="hover:text-primary transition-colors focus-visible:underline"
            >
              Title Protocol
            </Link>
            <Link
              href="/about#escrow-terms"
              className="hover:text-primary transition-colors focus-visible:underline"
            >
              Diaspora Escrow Terms
            </Link>
            <Link
              href="/contact"
              className="hover:text-primary transition-colors focus-visible:underline"
            >
              Institutional Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
