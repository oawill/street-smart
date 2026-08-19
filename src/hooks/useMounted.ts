"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * Returns false on the server and during hydration, true once mounted on
 * the client. Uses useSyncExternalStore (not an effect + setState) so it
 * never trips the "no setState in effect" lint rule and never causes a
 * hydration mismatch.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
}
