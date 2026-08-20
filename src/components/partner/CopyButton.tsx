"use client";

import { useState } from "react";

export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable, ignore silently
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-bold text-foreground transition-transform active:scale-95"
    >
      {copied ? "Copied!" : label}
    </button>
  );
}
