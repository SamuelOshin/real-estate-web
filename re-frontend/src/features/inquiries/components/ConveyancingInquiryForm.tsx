"use client";

import { useState } from "react";
import { Button, Input, Select, Textarea, Card } from "@/components/ui";

export function ConveyancingInquiryForm() {
  const [contactName, setContactName] = useState("");
  const [entityType, setEntityType] = useState("");
  const [subject, setSubject] = useState("Alausa Lands Bureau File & Page Verification");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Card elevation="resting" padding="md" className="border-border">
      <div className="mb-4">
        <h2 className="font-display text-headline-md font-bold text-primary">
          Direct Land Title &amp; Conveyancing Inquiry
        </h2>
        <p className="mt-1 font-body text-body-sm text-text-muted leading-relaxed">
          Connect directly with our in-house solicitors regarding Governor&apos;s Consent verification,
          deed registration, and AGIS cadastral searches.
        </p>
      </div>

      {submitted ? (
        <div className="rounded-xl border border-border bg-surface-tint p-6 text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-badge-cofo-bg text-verified font-bold text-xl">
            &check;
          </div>
          <h3 className="font-display text-headline-sm font-bold text-primary">
            Brief Submitted Successfully
          </h3>
          <p className="mt-2 font-body text-body-sm text-text-muted">
            An accredited conveyancing solicitor will review your file and reach out within 2 hours.
          </p>
          <Button
            variant="secondary"
            size="sm"
            className="mt-4"
            onClick={() => setSubmitted(false)}
          >
            Submit Another Query
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="conveyancing-contact-name" className="block font-body text-label-md font-semibold text-text-primary mb-1">
                Contact Name
              </label>
              <Input
                id="conveyancing-contact-name"
                type="text"
                required
                placeholder="Full name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="conveyancing-entity-type" className="block font-body text-label-md font-semibold text-text-primary mb-1">
                Corporate Entity / Private Buyer
              </label>
              <Input
                id="conveyancing-entity-type"
                type="text"
                required
                placeholder="e.g. Oakline Global Asset Ltd or Individual"
                value={entityType}
                onChange={(e) => setEntityType(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="conveyancing-subject" className="block font-body text-label-md font-semibold text-text-primary mb-1">
              Title Query Subject
            </label>
            <Select
              id="conveyancing-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="Alausa Lands Bureau File & Page Verification">
                Alausa Lands Bureau File &amp; Page Verification
              </option>
              <option value="AGIS Cadastral Charting & Recertification (Abuja)">
                AGIS Cadastral Charting &amp; Recertification (Abuja)
              </option>
              <option value="Governor's Consent Endorsement Timeline">
                Governor&apos;s Consent Endorsement Timeline
              </option>
              <option value="Deed of Assignment & Contract of Sale Drafting">
                Deed of Assignment &amp; Contract of Sale Drafting
              </option>
              <option value="Diaspora Escrow Account Banking Verification">
                Diaspora Escrow Account Banking Verification
              </option>
            </Select>
          </div>

          <div>
            <label htmlFor="conveyancing-notes" className="block font-body text-label-md font-semibold text-text-primary mb-1">
              Case Notes &amp; Specific Plot Reference
            </label>
            <Textarea
              id="conveyancing-notes"
              rows={4}
              required
              placeholder="Detail your conveyancing request..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <Button type="submit" variant="primary" className="w-full">
            Submit Legal Verification Brief &rarr;
          </Button>
        </form>
      )}
    </Card>
  );
}
