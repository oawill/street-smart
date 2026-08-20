"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function BecomeAffiliateButton() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleClick() {
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/partner/become-affiliate", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }
      router.push("/partner");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={submitting}
        className="w-full rounded-full bg-brand px-6 py-3.5 text-center font-display font-bold text-white transition-transform active:scale-95 disabled:opacity-60"
      >
        {submitting ? "SETTING UP…" : "BECOME AN AFFILIATE"}
      </button>
      {error && <p className="mt-2 text-center text-xs text-danger">{error}</p>}
    </div>
  );
}
