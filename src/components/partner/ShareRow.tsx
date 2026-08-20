"use client";

import { useMounted } from "@/hooks/useMounted";
import { CopyButton } from "./CopyButton";

export function ShareRow({ link, code }: { link: string; code: string }) {
  const mounted = useMounted();
  const canShare = mounted && typeof navigator !== "undefined" && typeof navigator.share === "function";

  const shareText = `Think you're street smart? Try Street Smart and see your Street Smart IQ.\n${link}`;
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  async function handleShare() {
    try {
      await navigator.share({ title: "Street Smart", text: shareText, url: link });
    } catch {
      // user cancelled or Web Share unavailable — no-op
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-[#25D366] px-4 py-2 text-sm font-bold text-white transition-transform active:scale-95"
      >
        Share on WhatsApp
      </a>
      <CopyButton value={link} label="Copy Link" />
      <CopyButton value={code} label="Copy Code" />
      {canShare && (
        <button
          onClick={handleShare}
          className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-bold text-foreground transition-transform active:scale-95"
        >
          Share…
        </button>
      )}
    </div>
  );
}
