"use client";

import { useState } from "react";
import { Button, Input, Select, Textarea, Card, TileRadioGroup, type TileRadioOption } from "@/components/ui";
import { formatNaira } from "@/lib/utils/format";
import type { Property } from "@/types/property";

export interface InspectionBookingFormProps {
  property?: Property;
  showExtendedFields?: boolean;
  className?: string;
}

const modalityOptions: TileRadioOption[] = [
  {
    value: "saturday_convoy",
    title: "Saturday Tour",
    subtitle: "Chauffeured SUV escort with refreshments & survey crew",
  },
  {
    value: "weekday_private",
    title: "Private Weekday",
    subtitle: "1-on-1 survey advisor, tailored timing for HNIs & founders",
  },
  {
    value: "drone_virtual",
    title: "Live 4K Drone",
    subtitle: "Real-time Zoom broadcast with live GPS coordinate overlay",
  },
];

export function InspectionBookingForm({
  property,
  showExtendedFields = false,
  className,
}: InspectionBookingFormProps) {
  const [inspectionMode, setInspectionMode] = useState<"physical" | "drone">("physical");
  const [modality, setModality] = useState("saturday_convoy");
  const [titlePrefix, setTitlePrefix] = useState("Mr");
  const [fullName, setFullName] = useState("");
  const [phoneCode, setPhoneCode] = useState("+234");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedEstate, setSelectedEstate] = useState(
    property ? property.title : "the-grand-crest-epe"
  );
  const [date, setDate] = useState("2025-04-19");
  const [timeSlot, setTimeSlot] = useState("10:00 AM");
  const [pickupPoint, setPickupPoint] = useState("lekki");
  const [plotOption, setPlotOption] = useState("500");
  const [questions, setQuestions] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfirmed(true);
  };

  const estateName = property ? property.title : "The Grand Crest Estate";
  const isFullMode = showExtendedFields || !property;

  return (
    <div className={className} id="diaspora-inspection-hub">
      <Card elevation="resting" padding="md" className="border-border">
        {/* Header Block */}
        <div className="flex flex-col gap-1.5 pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <span className="font-body text-label-caps uppercase tracking-wider text-secondary">
              Allocation Reservation
            </span>
            <span className="flex items-center gap-1 font-body text-label-caps uppercase font-bold text-verified">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-verified opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-verified" />
              </span>
              <span>Active Booking Slot</span>
            </span>
          </div>

          <h3 className="font-heading text-headline-md font-bold text-primary">
            {isFullMode ? "Estate Site Inspection Reservation" : "Reserve Plot or Book Free Inspection"}
          </h3>
          <p className="font-body text-body-sm text-text-muted">
            Verify land coordinates, beacons, and perimeter topography in person or live via drone stream.
          </p>

          {property && (
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-heading text-price-display font-extrabold text-primary">
                {formatNaira(property.priceNgn)}
              </span>
              <span className="font-body text-body-sm text-text-muted">
                / {property.plotSizeSqm} SQM Plot
              </span>
            </div>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          {/* Title & Full Name */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-4">
              <label htmlFor="title-prefix-select" className="block font-body text-label-md font-semibold text-text-primary mb-1">
                Title
              </label>
              <Select
                id="title-prefix-select"
                value={titlePrefix}
                onChange={(e) => setTitlePrefix(e.target.value)}
              >
                <option value="Mr">Mr.</option>
                <option value="Mrs">Mrs.</option>
                <option value="Dr">Dr.</option>
                <option value="Engr">Engr.</option>
                <option value="Barrister">Barrister</option>
                <option value="Chief">Chief</option>
              </Select>
            </div>
            <div className="sm:col-span-8">
              <label htmlFor="booking-name-input" className="block font-body text-label-md font-semibold text-text-primary mb-1">
                Full Legal Name
              </label>
              <Input
                id="booking-name-input"
                type="text"
                required
                placeholder="e.g. Chukwuma Babatunde Adeyemi"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="booking-email-input" className="block font-body text-label-md font-semibold text-text-primary mb-1">
                Official / Personal Email
              </label>
              <Input
                id="booking-email-input"
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="booking-phone-input" className="block font-body text-label-md font-semibold text-text-primary mb-1">
                Phone / WhatsApp Number
              </label>
              <div className="flex gap-2">
                <Select
                  className="w-28"
                  value={phoneCode}
                  onChange={(e) => setPhoneCode(e.target.value)}
                >
                  <option value="+234">🇳🇬 +234</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+971">🇦🇪 +971</option>
                  <option value="+1-ca">🇨🇦 +1</option>
                </Select>
                <Input
                  id="booking-phone-input"
                  type="tel"
                  required
                  placeholder="803 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          {/* Modality Tile Radio Group */}
          <div>
            <label className="block font-body text-label-md font-semibold text-text-primary mb-2">
              Preferred Inspection Modality
            </label>
            <TileRadioGroup
              name="inspection_modality"
              options={modalityOptions}
              value={modality}
              onChange={setModality}
            />
          </div>

          {/* Select Estate of Interest (when not pre-scoped to a specific property) */}
          {!property && (
            <div>
              <label htmlFor="estate-select-input" className="block font-body text-label-md font-semibold text-text-primary mb-1">
                Select Estate of Interest
              </label>
              <Select
                id="estate-select-input"
                value={selectedEstate}
                onChange={(e) => setSelectedEstate(e.target.value)}
              >
                <option value="the-grand-crest-epe">
                  The Grand Crest Estate — Epe Highway, Lagos (Governor&apos;s Consent in view)
                </option>
                <option value="sovereign-heights-guzape">
                  Sovereign Heights — Guzape Diplomatic Zone, Abuja (C of O)
                </option>
                <option value="oasis-greenfield-alaro">
                  Oasis Greenfield Park — Alaro City Corridors, Lekki (Free Zone Gazette)
                </option>
                <option value="atlantic-crest-bay">
                  Atlantic Crest Bay — Coastal Road, Ibeju-Lekki (Registered Excision)
                </option>
                <option value="heritage-valley-ibadan">
                  Heritage Valley Logistics Hub — Moniya Inland Port, Ibadan
                </option>
                <option value="general-multisite">
                  General Advisory Portfolio (Multiple Estate Tour)
                </option>
              </Select>
            </div>
          )}

          {/* Date & Time Slot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="booking-date-input" className="block font-body text-label-md font-semibold text-text-primary mb-1">
                Preferred Date
              </label>
              <Input
                id="booking-date-input"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="booking-timeslot-select" className="block font-body text-label-md font-semibold text-text-primary mb-1">
                Time Slot
              </label>
              <Select
                id="booking-timeslot-select"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
              >
                <option value="10:00 AM">10:00 AM (Morning Departure &amp; Light Refreshments)</option>
                <option value="1:00 PM">1:00 PM (Midday Comprehensive Surveyor Walk)</option>
                <option value="3:30 PM">3:30 PM (Golden Hour Aerial &amp; Boundary Survey)</option>
              </Select>
            </div>
          </div>

          {/* Pickup Point & Plot Option */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="booking-pickup-select" className="block font-body text-label-md font-semibold text-text-primary mb-1">
                Lagos / Abuja Meeting &amp; Pickup Point
              </label>
              <Select
                id="booking-pickup-select"
                value={pickupPoint}
                onChange={(e) => setPickupPoint(e.target.value)}
              >
                <option value="lekki">Lekki Phase 1 Executive Lounge (Plot 14 Admiralty Way)</option>
                <option value="ikeja">Ikeja GRA Office (Mainland Chauffeur Bay)</option>
                <option value="abuja">Guzape Diplomatic Hub (Abuja Environs Departure)</option>
                <option value="self_drive">Self-Drive / Direct Estate Beacon Meetup (GPS Waypoint provided)</option>
                <option value="virtual">Virtual Zoom Room (Link emailed 1 hour prior)</option>
              </Select>
            </div>
            <div>
              <label htmlFor="booking-plotoption-select" className="block font-body text-label-md font-semibold text-text-primary mb-1">
                Plot Option
              </label>
              <Select
                id="booking-plotoption-select"
                value={plotOption}
                onChange={(e) => setPlotOption(e.target.value)}
              >
                <option value="500">500 SQM Standard</option>
                <option value="300">300 SQM Executive</option>
                <option value="corner">Commercial Corner</option>
              </Select>
            </div>
          </div>

          {/* Specific Questions textarea */}
          <div>
            <label htmlFor="booking-questions-input" className="block font-body text-label-md font-semibold text-text-primary mb-1">
              Specific Land Questions or Survey Verification Requests (Optional)
            </label>
            <Textarea
              id="booking-questions-input"
              rows={3}
              placeholder="e.g. I want to inspect Beacon 492 boundary pillar coordinates, request topographic survey elevation sheets, or verify Alausa file number..."
              value={questions}
              onChange={(e) => setQuestions(e.target.value)}
            />
          </div>

          {/* Zero-Fee Commitment notice */}
          <div className="rounded-xl border border-border bg-surface-tint p-3 font-body text-body-sm text-text-primary flex items-start gap-2">
            <span className="font-bold text-verified">&bull;</span>
            <p>
              <strong>Institutional Zero-Fee Commitment:</strong> Prison Gihon never charges
              inspection or administrative mobilization fees. Chauffeured transports include vetted
              security personnel, licensed land surveyor equipment, and chilled refreshments.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <Button type="submit" variant="primary" className="flex-1 flex items-center justify-center gap-1">
              <span>Confirm Free Site Inspection Reservation</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Button>
            <a
              href="https://wa.me/2348000000000?text=Hello%20Prison%20Gihon,%20I%20have%20an%20inspection%20question"
              target="_blank"
              rel="noopener noreferrer"
              className="sm:w-auto"
            >
              <Button type="button" variant="verified" className="w-full">
                Diaspora WhatsApp Desk
              </Button>
            </a>
          </div>
        </form>
      </Card>

      {/* Confirmation Modal */}
      {isConfirmed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-text-primary/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-border bg-surface-card p-6 shadow-3 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-badge-cofo-bg text-verified">
              <span className="material-symbols-outlined text-3xl">check_circle</span>
            </div>
            <span className="rounded-full bg-surface-tint px-3 py-1 font-body text-label-caps uppercase tracking-wider text-verified">
              Convoy Seat Guaranteed
            </span>
            <h3 className="mt-2 font-heading text-headline-sm font-bold text-primary">
              Inspection Reserved!
            </h3>
            <p className="mt-2 font-body text-body-sm text-text-muted leading-relaxed">
              Your complimentary site inspection tour has been scheduled. Your pickup pass, GPS
              coordinates, and assigned conveyancer details are now ready.
            </p>

            <div className="my-4 rounded-xl border border-border bg-surface p-3 text-left font-body text-body-sm space-y-1.5">
              <div className="flex justify-between">
                <span className="text-text-muted">Pass Code:</span>
                <span className="font-mono font-bold text-text-primary">PG-INS-2025-091</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Meeting Point:</span>
                <span className="font-medium text-text-primary">Lekki Phase 1 VIP Lounge</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Departure Time:</span>
                <span className="font-bold text-text-primary">Saturday &bull; 10:00 AM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Transport:</span>
                <span className="font-semibold text-verified">Chauffeured VIP Shuttle (Free)</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <a
                href="https://wa.me/2348000000000?text=Hello%20Prison%20Gihon,%20I%20just%20scheduled%20an%20inspection%20tour"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="verified" className="w-full">
                  WhatsApp Lead
                </Button>
              </a>
              <Button
                variant="secondary"
                onClick={() => setIsConfirmed(false)}
                className="flex-1"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
