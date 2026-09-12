"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui";

export function HomeInspectionBooking() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [targetEstate, setTargetEstate] = useState("The Grand Crest, Epe");
  const [inspectionMode, setInspectionMode] = useState("Physical (This Saturday)");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <>
      <div className="bg-surface-card rounded-xl p-6 sm:p-7 shadow-2 border border-border text-text-primary">
        <h3 className="font-heading font-bold text-headline-sm text-primary mb-1">
          Book Free Inspection
        </h3>
        <p className="font-body text-xs text-text-muted mb-5">
          Physical Saturday visit or diaspora Zoom walkthrough.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-text-muted mb-1 font-body">
              Full Name
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Olumide Babatunde"
              className="w-full px-3 py-2 text-xs rounded-lg bg-surface border border-border focus:outline-none focus:border-secondary focus:bg-white transition-colors text-text-primary font-body"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-text-muted mb-1 font-body">
                Phone / WhatsApp
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+234 or +44 / +1..."
                className="w-full px-3 py-2 text-xs rounded-lg bg-surface border border-border focus:outline-none focus:border-secondary focus:bg-white transition-colors text-text-primary font-body"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-text-muted mb-1 font-body">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="investor@domain.com"
                className="w-full px-3 py-2 text-xs rounded-lg bg-surface border border-border focus:outline-none focus:border-secondary focus:bg-white transition-colors text-text-primary font-body"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-text-muted mb-1 font-body">
                Target Estate
              </label>
              <div className="relative">
                <select
                  value={targetEstate}
                  onChange={(e) => setTargetEstate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-surface border border-border focus:outline-none focus:border-secondary focus:bg-white appearance-none cursor-pointer text-text-primary font-body"
                >
                  <option>The Grand Crest, Epe</option>
                  <option>Sovereign Heights, Guzape Abuja</option>
                  <option>Oasis Greenfield, Alaro Axis</option>
                  <option>Heritage Valley, Ibadan</option>
                </select>
                <span className="material-symbols-outlined absolute right-2.5 top-2 text-text-muted pointer-events-none text-[16px]">
                  expand_more
                </span>
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-text-muted mb-1 font-body">
                Inspection Mode
              </label>
              <div className="relative">
                <select
                  value={inspectionMode}
                  onChange={(e) => setInspectionMode(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-surface border border-border focus:outline-none focus:border-secondary focus:bg-white appearance-none cursor-pointer text-text-primary font-body"
                >
                  <option>Physical (This Saturday)</option>
                  <option>Physical (Next Saturday)</option>
                  <option>Live Zoom Drone (Diaspora)</option>
                  <option>WhatsApp Video Call</option>
                </select>
                <span className="material-symbols-outlined absolute right-2.5 top-2 text-text-muted pointer-events-none text-[16px]">
                  expand_more
                </span>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            variant="secondary"
            size="md"
            className="mt-2 w-full font-heading font-bold text-xs"
          >
            Confirm Free Inspection Seat
          </Button>

          <p className="text-center text-[10px] text-text-muted mt-1 font-body">
            Protected under NDPR regulations. Zero payment required for inspection.
          </p>
        </form>
      </div>

      {/* Booking Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-surface-card rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-3 text-center border border-border">
            <div className="w-16 h-16 rounded-full bg-verified/10 text-verified flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[36px]">event_available</span>
            </div>
            <span className="inline-block px-3 py-1 rounded-full bg-surface-tint text-secondary text-xs font-bold uppercase tracking-wider mb-2 font-heading">
              Ref: PG-LND-2025
            </span>
            <h3 className="font-heading text-headline-sm font-bold text-primary mb-2">
              Inspection Reserved!
            </h3>
            <p className="font-body text-xs text-text-muted mb-6 leading-relaxed">
              Your inspection seat has been reserved with complimentary chauffeur dispatch. Our
              Senior Conveyancer will contact you on WhatsApp to confirm pickup details.
            </p>
            <div className="flex flex-col gap-2.5 font-body">
              <Link
                href="/properties"
                onClick={() => setShowModal(false)}
                className="w-full py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-bold font-heading transition-colors"
              >
                Browse Available Plots
              </Link>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-full py-2.5 rounded-lg bg-surface hover:bg-surface-tint text-text-primary text-xs font-semibold border border-border transition-colors font-body"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
