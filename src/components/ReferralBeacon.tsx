"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

/**
 * Fires a fire-and-forget click beacon when the page loads with ?ref=CODE.
 * Attribution itself is handled by the cookie the proxy sets on the same
 * request — this only records the click count shown on partner dashboards.
 */
export function ReferralBeacon() {
  const searchParams = useSearchParams();
  const firedRef = useRef(false);

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (!ref || firedRef.current) return;
    firedRef.current = true;

    fetch("/api/referrals/click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: ref }),
      keepalive: true,
    }).catch(() => {});
  }, [searchParams]);

  return null;
}
