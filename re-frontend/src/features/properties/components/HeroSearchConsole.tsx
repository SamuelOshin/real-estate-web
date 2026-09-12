"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function HeroSearchConsole() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"all" | "residential" | "commercial" | "diaspora">("all");
  const [corridor, setCorridor] = useState("all");
  const [titleGuarantee, setTitleGuarantee] = useState("all");
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (corridor && corridor !== "all") params.set("corridor", corridor);
    if (titleGuarantee && titleGuarantee !== "all") params.set("title", titleGuarantee);
    if (query.trim()) params.set("search", query.trim());
    if (activeTab === "residential") params.set("size", "500");
    if (activeTab === "commercial") params.set("corridor", "alaro");

    const queryString = params.toString();
    router.push(`/properties${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <div className="relative z-30 max-w-5xl mx-auto -mt-16 sm:-mt-20 px-4 sm:px-6">
      <div className="bg-surface-card rounded-2xl sm:rounded-3xl shadow-3 border border-border p-5 sm:p-6 backdrop-blur-md">
        {/* Category Tabs */}
        <div className="flex items-center gap-6 sm:gap-8 pb-3.5 border-b border-border text-xs sm:text-sm font-semibold overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`pb-3 -mb-[15px] transition-colors whitespace-nowrap font-display ${
              activeTab === "all"
                ? "text-primary border-b-2 border-secondary font-bold"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            All Verified Plots
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("residential")}
            className={`pb-3 -mb-[15px] transition-colors whitespace-nowrap font-display ${
              activeTab === "residential"
                ? "text-primary border-b-2 border-secondary font-bold"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            Residential (500 SQM)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("commercial")}
            className={`pb-3 -mb-[15px] transition-colors whitespace-nowrap font-display ${
              activeTab === "commercial"
                ? "text-primary border-b-2 border-secondary font-bold"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            Commercial Corridors
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("diaspora")}
            className={`pb-3 -mb-[15px] transition-colors whitespace-nowrap font-display ${
              activeTab === "diaspora"
                ? "text-primary border-b-2 border-secondary font-bold"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            Diaspora Escrow Ready
          </button>
        </div>

        {/* Inline Filter Form */}
        <form
          onSubmit={handleSubmit}
          className="pt-4 flex flex-col md:flex-row items-stretch md:items-center gap-4 justify-between"
        >
          {/* City / Corridor Dropdown */}
          <div className="flex-1 min-w-[170px]">
            <label className="block text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1 font-body">
              City / Corridor
            </label>
            <div className="relative">
              <select
                value={corridor}
                onChange={(e) => setCorridor(e.target.value)}
                className="w-full bg-transparent border-0 text-sm font-bold text-text-primary py-1 pl-0 pr-6 focus:ring-0 focus:outline-none cursor-pointer font-body"
              >
                <option value="all">All Locations (Lagos, Abuja, Ibadan)</option>
                <option value="epe">Lagos — Epe Expressway</option>
                <option value="ibeju">Lagos — Ibeju-Lekki</option>
                <option value="guzape">Abuja — Guzape &amp; Katampe</option>
                <option value="moniya">Oyo — Moniya Corridor</option>
              </select>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="hidden md:block w-px h-10 bg-border" />

          {/* Title Documentation Dropdown */}
          <div className="flex-1 min-w-[170px]">
            <label className="block text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1 font-body">
              Title Guarantee
            </label>
            <div className="relative">
              <select
                value={titleGuarantee}
                onChange={(e) => setTitleGuarantee(e.target.value)}
                className="w-full bg-transparent border-0 text-sm font-bold text-text-primary py-1 pl-0 pr-6 focus:ring-0 focus:outline-none cursor-pointer font-body"
              >
                <option value="all">Any Authenticated Title</option>
                <option value="c_of_o">Governor&apos;s Consent / C of O</option>
                <option value="gazette_excision">Government Gazette</option>
                <option value="freehold_survey">Registered Survey &amp; Deed</option>
              </select>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="hidden md:block w-px h-10 bg-border" />

          {/* Location Search Input */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1 font-body">
              Estate or Location
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined text-text-muted text-[18px] mr-2 flex-shrink-0">
                search
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search The Grand Crest, Epe..."
                className="w-full bg-transparent text-sm font-bold text-text-primary placeholder:text-text-muted placeholder:font-normal focus:outline-none py-1 font-body"
              />
            </div>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="shrink-0 h-12 w-full md:w-12 rounded-xl bg-secondary hover:bg-secondary/90 text-white flex items-center justify-center shadow-1 hover:shadow-2 transition-all duration-200 cursor-pointer group"
            title="Search Verified Properties"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">
              search
            </span>
            <span className="md:hidden font-heading font-bold text-sm ml-2">
              Search Listings
            </span>
          </button>
        </form>
      </div>

      {/* Micro Trust Signals Under the Console (Faithful to .html and screenshot 2) */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-semibold text-text-muted font-body">
        <span className="inline-flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px] text-verified">verified</span>
          <span>100% Verified Titles (C of O &amp; Gazette)</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px] text-secondary">pin_drop</span>
          <span>Immediate Physical Allocation</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px] text-amber-600">payments</span>
          <span>12-Mo Payment Plans</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px] text-secondary">videocam</span>
          <span>Diaspora 4K Video Tours</span>
        </span>
      </div>
    </div>
  );
}
