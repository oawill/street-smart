"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function PayoutProfileForm({
  initialBankName,
  initialAccountName,
}: {
  initialBankName: string;
  initialAccountName: string;
}) {
  const router = useRouter();
  const [bankName, setBankName] = useState(initialBankName);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState(initialAccountName);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaved(false);
    setSubmitting(true);
    try {
      const res = await fetch("/api/partner/payout-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bankName, accountNumber, accountName }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }
      setSaved(true);
      setAccountNumber("");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted">Bank Name</span>
        <input
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          required
          className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-brand"
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted">Account Number</span>
        <input
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          required
          inputMode="numeric"
          placeholder="Enter to update"
          className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-brand"
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted">Account Name</span>
        <input
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          required
          className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-brand"
        />
      </label>

      {error && <p className="text-xs text-danger">{error}</p>}
      {saved && <p className="text-xs text-brand-strong">Payout details saved.</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-1 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white transition-transform active:scale-95 disabled:opacity-60"
      >
        {submitting ? "Saving…" : "Save Payout Details"}
      </button>
    </form>
  );
}
