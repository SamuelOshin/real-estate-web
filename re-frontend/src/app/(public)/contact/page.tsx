"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, Card, Input, Select } from "@/components/ui";
import { InspectionBookingForm } from "@/features/inquiries/components/InspectionBookingForm";
import { ConveyancingInquiryForm } from "@/features/inquiries/components/ConveyancingInquiryForm";
import { InspectionDaySteps } from "@/features/inquiries/components/InspectionDaySteps";
import { RegionalOfficesList } from "@/features/inquiries/components/RegionalOfficesList";

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<"inspection" | "conveyancing" | "diaspora">(
    "inspection"
  );

  // Diaspora form state
  const [timezone, setTimezone] = useState("GMT (London, United Kingdom)");
  const [currency, setCurrency] = useState("United States Dollar ($ USD)");
  const [platform, setPlatform] = useState("Zoom Meeting");
  const [diasporaSubmitted, setDiasporaSubmitted] = useState(false);

  const handleDiasporaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDiasporaSubmitted(true);
  };

  const galleryImages = [
    {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9_ZEyajDUA6EkXwGitAqAM4T52-s1vtySYgEFrDXh7A16vZiISpAhJHhKGWL-tm63yri7QUJqj0dy4mOcNulefGtUzVzdlhAXUcky-QXhn0fmMt-nHjTBwi3u-shs_sdAXy_XhHpuLy0ZpbULG3zJO_93E8K_XX9BzmeZJmH0vUepDPJnsaE7QUMyGwmq25JqFRecX22UPpXLoVp8-3xD0273_-OB8_yWet8LzpCSYBQdZZ7drLZe_Q",
      caption: "Cadastral Boundary Mapping \u2022 The Grand Crest Epe",
    },
    {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdh-H8KVAp7W954z1sC6RLTYLhEAriiqDTrzpqty7RHHCzyGFNMKui-aK9PTkkf_OySsTA9ceM0VY9XUEdHsKwE-_wfNQAK7OxNn97-Mayfj1k0BM3ge7j-Bl3VHcrjNv2z-TfXU8lzM-9GGJFTgjOW4aiEfENBuL_v0Jx4qUJZrWJQ0TWcCAclcK_3sIlkzBiHmnmD0P0Kk61dF3pCu9iYbh_A5AiucOP4noTkD4EZkM2g0k25aJ_IQ",
      caption: "Real-Time Drone Beacon Telemetry \u2022 Guzape II",
    },
    {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAEHYWMDnqmuNL-GF3cOQ1vic3LWWCiuPbbo0H9e4fBnuUEKq_aVw9qZDkjZ7WIdsvyNaLTz8eyVPW2wXE52NveDtyt4WG7MlvQylrH_mC2wjsBC-eMPUq8WEyNI-itbpvuwtjSN6P0LyVgcPtkIDf9a9b2cpljvtBJjw3XO0P-NfCplrNXNyZGz-gOW1NnXKFJqNxFMONu3uxm2GTRZ_qn1zHxn3_jWfVOWLvNt8LpS5EJEr3aGWmww",
      caption: "On-Site Title Document Verification \u2022 Alaro Corridor",
    },
  ];

  return (
    <div className="flex w-full flex-col">
      {/* Top Notice & Breadcrumb Ribbon */}
      <section className="w-full border-b border-border bg-surface-card py-3 px-4 md:px-6 lg:px-12">
        <div className="mx-auto flex max-w-container flex-wrap items-center justify-between gap-3 font-body text-label-md text-text-muted">
          <div className="flex items-center gap-2">
            <Link href="/" className="transition-colors hover:text-primary">
              Home
            </Link>
            <span>&gt;</span>
            <span className="font-semibold text-primary">Contact &amp; Inspection Booking</span>
          </div>

          <div className="flex items-center gap-2 font-medium text-verified">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-verified opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-verified" />
            </span>
            <span>
              Saturday Convoy Departure Roster:{" "}
              <strong className="font-semibold text-primary">14 seats remaining for this weekend</strong>
            </span>
          </div>
        </div>
      </section>

      {/* Header & Narrative Statement */}
      <section className="w-full border-b border-border bg-surface py-12 px-4 md:px-6 lg:px-12">
        <div className="mx-auto flex max-w-container flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-surface-tint px-3 py-1 font-body text-label-caps uppercase tracking-wider text-primary">
              <span className="font-bold text-verified">&bull;</span>
              <span>Inspection Desk &amp; Client Services &bull; Lagos, Abuja &amp; Diaspora</span>
            </div>
            <h1 className="font-display text-headline-xl font-bold tracking-tight text-primary">
              Schedule a Site Inspection or Speak to Our Land Conveyancers
            </h1>
            <p className="mt-3 font-body text-body-lg text-text-muted leading-relaxed">
              Whether you are visiting our estates in person on our complimentary Saturday
              chauffeur tours, booking a private weekday walkthrough, or requesting a live 4K drone
              Zoom inspection from abroad, we ensure complete transparency.
            </p>
          </div>

          {/* Quick Trust Indicators */}
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col min-w-[280px]">
            <div className="flex items-center gap-3 rounded-xl border border-border bg-surface-card p-3 shadow-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-tint font-bold text-secondary">
                <span className="material-symbols-outlined text-xl">directions_car</span>
              </div>
              <div>
                <p className="font-heading text-headline-sm font-bold text-primary leading-tight">
                  ₦0.00 Fee
                </p>
                <p className="font-body text-body-sm text-text-muted">
                  Complimentary Chauffeur Escort
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-border bg-surface-card p-3 shadow-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-badge-cofo-bg font-bold text-verified">
                <span className="material-symbols-outlined text-xl">videocam</span>
              </div>
              <div>
                <p className="font-heading text-headline-sm font-bold text-primary leading-tight">
                  4K Ultra HD
                </p>
                <p className="font-body text-body-sm text-text-muted">
                  Live Drone Cadastral Feed
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dual Column Workspace */}
      <section className="w-full py-12 px-4 md:px-6 lg:px-12 bg-surface">
        <div className="mx-auto grid max-w-container grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* LEFT COLUMN: Booking Center & Forms (7 cols) */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            {/* 3 Tab Switcher Box */}
            <div className="flex flex-col gap-2 rounded-xl border border-border bg-surface-card p-2 shadow-1 sm:flex-row font-body">
              <button
                type="button"
                onClick={() => setActiveTab("inspection")}
                className={`flex-1 rounded-lg py-2.5 px-4 font-body text-label-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                  activeTab === "inspection"
                    ? "bg-primary text-white shadow-1"
                    : "bg-surface text-text-primary hover:bg-surface-tint"
                }`}
              >
                <span className="material-symbols-outlined text-base">pin_drop</span>
                <span>Site Inspection</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("conveyancing")}
                className={`flex-1 rounded-lg py-2.5 px-4 font-body text-label-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                  activeTab === "conveyancing"
                    ? "bg-primary text-white shadow-1"
                    : "bg-surface text-text-primary hover:bg-surface-tint"
                }`}
              >
                <span className="material-symbols-outlined text-base">gavel</span>
                <span>Title Conveyancing</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("diaspora")}
                className={`flex-1 rounded-lg py-2.5 px-4 font-body text-label-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                  activeTab === "diaspora"
                    ? "bg-primary text-white shadow-1"
                    : "bg-surface text-text-primary hover:bg-surface-tint"
                }`}
              >
                <span className="material-symbols-outlined text-base">public</span>
                <span>Diaspora Video Call</span>
              </button>
            </div>

            {/* TAB 1: Site Inspection Reservation Form */}
            {activeTab === "inspection" && (
              <InspectionBookingForm showExtendedFields={true} />
            )}

            {/* TAB 2: Conveyancing Form */}
            {activeTab === "conveyancing" && <ConveyancingInquiryForm />}

            {/* TAB 3: Diaspora Consultation Form */}
            {activeTab === "diaspora" && (
              <Card elevation="resting" padding="md" className="border-border">
                <div className="mb-4">
                  <h2 className="font-display text-headline-md font-bold text-primary">
                    Diaspora Private Video Consultation
                  </h2>
                  <p className="mt-1 font-body text-body-sm text-text-muted leading-relaxed">
                    Designed for buyers based in the UK, North America, Europe, and the Middle East.
                    Book a private Zoom session with live 3D terrain projections.
                  </p>
                </div>

                {diasporaSubmitted ? (
                  <div className="rounded-xl border border-border bg-surface-tint p-6 text-center">
                    <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-badge-cofo-bg text-verified font-bold text-xl">
                      <span className="material-symbols-outlined text-2xl">check_circle</span>
                    </div>
                    <h3 className="font-heading text-headline-sm font-bold text-primary">
                      Consultation Booked!
                    </h3>
                    <p className="mt-2 font-body text-body-sm text-text-muted">
                      A meeting invite for your timezone ({timezone}) via {platform} has been queued.
                    </p>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="mt-4"
                      onClick={() => setDiasporaSubmitted(false)}
                    >
                      Book Another Session
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleDiasporaSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label htmlFor="diaspora-timezone" className="block font-body text-label-md font-semibold text-text-primary mb-1">
                          Current Timezone
                        </label>
                        <Select
                          id="diaspora-timezone"
                          value={timezone}
                          onChange={(e) => setTimezone(e.target.value)}
                        >
                          <option value="GMT (London, United Kingdom)">GMT (London, United Kingdom)</option>
                          <option value="EST (New York, Toronto)">EST (New York, Toronto)</option>
                          <option value="CST (Chicago, Houston)">CST (Chicago, Houston)</option>
                          <option value="PST (Los Angeles, Vancouver)">PST (Los Angeles, Vancouver)</option>
                          <option value="GST (Dubai, UAE)">GST (Dubai, UAE)</option>
                        </Select>
                      </div>

                      <div>
                        <label htmlFor="diaspora-currency" className="block font-body text-label-md font-semibold text-text-primary mb-1">
                          Preferred Currency for Allocation
                        </label>
                        <Select
                          id="diaspora-currency"
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value)}
                        >
                          <option value="Nigerian Naira (₦ NGN)">Nigerian Naira (₦ NGN)</option>
                          <option value="United States Dollar ($ USD)">United States Dollar ($ USD)</option>
                          <option value="British Pound Sterling (£ GBP)">British Pound Sterling (£ GBP)</option>
                          <option value="Euro (€ EUR)">Euro (€ EUR)</option>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-body text-label-md font-semibold text-text-primary mb-2">
                        Preferred Call Platform
                      </label>
                      <div className="flex flex-wrap gap-4">
                        {["Zoom Meeting", "Google Meet", "WhatsApp Direct Video"].map((item) => (
                          <label
                            key={item}
                            className="flex cursor-pointer items-center gap-2 font-body text-body-sm text-text-primary"
                          >
                            <input
                              type="radio"
                              name="diaspora_platform"
                              checked={platform === item}
                              onChange={() => setPlatform(item)}
                              className="h-4 w-4 accent-primary"
                            />
                            <span>{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <Button type="submit" variant="primary" className="w-full">
                      Reserve Diaspora Private Session &rarr;
                    </Button>
                  </form>
                )}
              </Card>
            )}

            {/* Inspection Day 4-Step Guide */}
            <InspectionDaySteps />
          </div>

          {/* RIGHT COLUMN: Regional Offices, International Desks, Maps & FAQs (5 cols) */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {/* Physical Regional Offices */}
            <RegionalOfficesList />

            {/* Dedicated International Desks */}
            <div className="flex flex-col gap-3 rounded-xl bg-primary p-6 text-white shadow-1">
              <div>
                <h4 className="font-display text-headline-sm font-bold text-white">
                  Dedicated International Desks
                </h4>
                <p className="mt-1 font-body text-body-sm text-surface-tint leading-relaxed">
                  Direct routing to licensed Nigerian legal counsel stationed across global timezones:
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-primary-hover p-3">
                  <span className="font-body text-label-caps uppercase text-surface-tint">
                    UNITED KINGDOM
                  </span>
                  <a
                    href="tel:+442079460912"
                    className="block font-body text-label-lg font-bold text-white hover:text-surface-tint mt-0.5"
                  >
                    +44 20 7946 0912
                  </a>
                </div>

                <div className="rounded-lg bg-primary-hover p-3">
                  <span className="font-body text-label-caps uppercase text-surface-tint">
                    USA &amp; CANADA
                  </span>
                  <a
                    href="tel:+18005550199"
                    className="block font-body text-label-lg font-bold text-white hover:text-surface-tint mt-0.5"
                  >
                    +1 800 555 0199
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-primary-hover pt-3 font-body text-body-sm text-surface-tint">
                <span>
                  Email:{" "}
                  <a href="mailto:diaspora@prisongihon.com" className="underline text-white">
                    diaspora@prisongihon.com
                  </a>
                </span>
                <span className="rounded bg-verified px-2 py-0.5 font-body text-label-caps uppercase text-white font-bold">
                  24/7 SLA Backed
                </span>
              </div>
            </div>

            {/* Regional Highway & Site Waypoints Map Placeholder */}
            <Card elevation="resting" padding="md" className="border-border">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="font-display text-headline-sm font-bold text-primary">
                  Regional Highway &amp; Site Waypoints
                </h4>
                <span className="font-body text-label-caps uppercase font-bold text-secondary">
                  Alausa &bull; AGIS Mapped
                </span>
              </div>

              <div className="relative flex h-56 w-full items-center justify-center rounded-lg border border-border bg-surface-tint p-4 text-center">
                <div className="flex flex-col items-center gap-1.5">
                  <span className="rounded-full bg-surface-card px-3 py-1 font-display text-label-lg font-bold text-primary shadow-1">
                    Waypoint Map Placeholder
                  </span>
                  <p className="font-body text-body-sm text-text-muted">
                    Lekki-Epe Expressway &bull; Guzape Highway Corridor
                  </p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-label-caps uppercase text-secondary hover:underline font-bold mt-1"
                  >
                    Launch Google Maps
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </a>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between font-body text-label-caps text-text-muted">
                <span>Lagos Hub GPS: 6.4474° N, 3.4723° E</span>
                <span>Abuja Hub GPS: 9.0306° N, 7.5147° E</span>
              </div>
            </Card>

            {/* FAQ Accordion */}
            <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 shadow-1">
              <h4 className="font-heading text-headline-sm font-bold text-primary">
                Inspection Logistics FAQ
              </h4>

              <div className="space-y-2 font-body text-body-sm text-text-muted">
                <details className="rounded-lg border border-border bg-surface-card p-3 group cursor-pointer">
                  <summary className="font-body text-label-md font-semibold text-primary list-none flex items-center justify-between">
                    <span>Are there hidden costs or mobilization fees?</span>
                    <span className="material-symbols-outlined text-secondary group-open:rotate-180 transition-transform">
                      expand_more
                    </span>
                  </summary>
                  <p className="mt-2 text-text-muted leading-relaxed">
                    Zero. Prison Gihon does not charge for fuel, escort, survey inspection gear, or
                    refreshment logistics. All weekend bus tours and private visits are fully hosted.
                  </p>
                </details>

                <details className="rounded-lg border border-border bg-surface-card p-3 group cursor-pointer">
                  <summary className="font-body text-label-md font-semibold text-primary list-none flex items-center justify-between">
                    <span>Can I bring my own independent surveyor?</span>
                    <span className="material-symbols-outlined text-secondary group-open:rotate-180 transition-transform">
                      expand_more
                    </span>
                  </summary>
                  <p className="mt-2 text-text-muted leading-relaxed">
                    Yes, absolutely. We encourage buyers to bring independent SURCON-registered
                    surveyors. We provide on-site access to all registered pillar beacons and the
                    approved layout survey sheets.
                  </p>
                </details>

                <details className="rounded-lg border border-border bg-surface-card p-3 group cursor-pointer">
                  <summary className="font-body text-label-md font-semibold text-primary list-none flex items-center justify-between">
                    <span>How does the 4K Drone Zoom walkthrough work?</span>
                    <span className="material-symbols-outlined text-secondary group-open:rotate-180 transition-transform">
                      expand_more
                    </span>
                  </summary>
                  <p className="mt-2 text-text-muted leading-relaxed">
                    Our diaspora team coordinates with an on-site pilot. During your scheduled Zoom
                    appointment, the drone streams high-definition aerial footage, hovers over
                    specific beacon coordinates, and lets you inspect topography in real-time.
                  </p>
                </details>

                <details className="rounded-lg border border-border bg-surface-card p-3 group cursor-pointer">
                  <summary className="font-body text-label-md font-semibold text-primary list-none flex items-center justify-between">
                    <span>Can a relative or local proxy attend on my behalf?</span>
                    <span className="material-symbols-outlined text-secondary group-open:rotate-180 transition-transform">
                      expand_more
                    </span>
                  </summary>
                  <p className="mt-2 text-text-muted leading-relaxed">
                    Yes. Simply state their name and contact number in the additional notes field. We
                    will provide full VIP concierge service and issue an official inspection
                    certificate to you via email.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Scrim / Trust Showcase */}
      <section className="w-full border-t border-border bg-surface-card py-12 px-4 md:px-6 lg:px-12">
        <div className="mx-auto max-w-container">
          <div className="mb-6 flex flex-col justify-between gap-2 md:flex-row md:items-end">
            <div>
              <span className="font-body text-label-caps uppercase tracking-wider text-secondary">
                ON-SITE RIGOR
              </span>
              <h3 className="font-display text-headline-lg font-bold text-primary">
                Live Field Records &amp; Inspection Convoys
              </h3>
            </div>
            <p className="max-w-md font-body text-body-sm text-text-muted">
              Real snapshots from our weekly Saturday tours across the Lekki Free Trade Corridor, Epe
              Expressway Megacity, and Guzape Hills.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {galleryImages.map((img) => (
              <div
                key={img.caption}
                className="group relative aspect-video overflow-hidden rounded-xl border border-border shadow-1"
              >
                <Image
                  src={img.url}
                  alt={img.caption}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent flex items-end p-3 text-white">
                  <span className="font-body text-label-md font-medium text-white">
                    {img.caption}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
