"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PARTNER_APPLICATION_TYPE_LABELS, type PartnerApplicationType } from "@/types/partner";

const TYPE_OPTIONS = Object.entries(PARTNER_APPLICATION_TYPE_LABELS) as [PartnerApplicationType, string][];

export function ApplyForm({ defaultEmail }: { defaultEmail: string }) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState(defaultEmail);
  const [phone, setPhone] = useState("");
  const [partnerType, setPartnerType] = useState<PartnerApplicationType>("INDIVIDUAL_AFFILIATE");
  const [organizationName, setOrganizationName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [promotionPlan, setPromotionPlan] = useState("");
  const [audienceSize, setAudienceSize] = useState("");
  const [website, setWebsite] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const showOrganization = partnerType !== "INDIVIDUAL_AFFILIATE" && partnerType !== "INFLUENCER";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/partner/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          partnerType,
          organizationName: organizationName || undefined,
          city: city || undefined,
          state: state || undefined,
          promotionPlan,
          audienceSize: audienceSize || undefined,
          website: website || undefined,
          agreedToTerms: true,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }
      setSubmitted(data.application.publicId);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border bg-brand-soft p-5 text-center">
        <p className="font-display text-lg font-bold text-brand-strong">Application submitted</p>
        <p className="mt-1 text-sm text-foreground">
          Reference {submitted}. We&apos;ll review it and let you know.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <TextField label="Full Name" value={fullName} onChange={setFullName} required />
      <TextField label="Email" type="email" value={email} onChange={setEmail} required />
      <TextField label="Phone" value={phone} onChange={setPhone} required />

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-muted">Partner Type</span>
        <select
          value={partnerType}
          onChange={(e) => setPartnerType(e.target.value as PartnerApplicationType)}
          className="rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-brand"
        >
          {TYPE_OPTIONS.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>

      {showOrganization && (
        <TextField label="Organization Name" value={organizationName} onChange={setOrganizationName} />
      )}

      <div className="grid grid-cols-2 gap-3">
        <TextField label="City" value={city} onChange={setCity} />
        <TextField label="State" value={state} onChange={setState} />
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-muted">How do you plan to promote Street Smart?</span>
        <textarea
          value={promotionPlan}
          onChange={(e) => setPromotionPlan(e.target.value)}
          required
          minLength={10}
          rows={4}
          className="rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-brand"
        />
      </label>

      <TextField label="Estimated Audience Size (optional)" value={audienceSize} onChange={setAudienceSize} />
      <TextField label="Website / Social Media (optional)" value={website} onChange={setWebsite} />

      <label className="flex items-start gap-2.5 text-sm text-foreground">
        <input
          type="checkbox"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
          required
          className="mt-0.5 h-4 w-4 accent-[var(--brand)]"
        />
        <span>
          I agree to the{" "}
          <a href="/partner/terms" target="_blank" className="font-semibold text-brand underline">
            Partner Program Terms
          </a>
          .
        </span>
      </label>

      {error && <p className="text-sm text-danger">{error}</p>}

      <button
        type="submit"
        disabled={submitting || !agreedToTerms}
        className="mt-2 w-full rounded-full bg-brand px-8 py-4 text-center font-display text-lg font-bold text-white transition-transform active:scale-95 disabled:opacity-60"
      >
        {submitting ? "SUBMITTING…" : "APPLY TO PARTNER"}
      </button>
    </form>
  );
}

function TextField({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-muted">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-brand"
      />
    </label>
  );
}
