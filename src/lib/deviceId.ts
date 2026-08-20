const STORAGE_KEY = "ss_device_id";

/**
 * Stable anonymous identifier for this browser, used only to prevent a
 * guest from voting twice on the Daily Challenge. Not used for tracking,
 * not sent anywhere else, never merged with an account server-side.
 */
export function getDeviceId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(STORAGE_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, id);
  }
  return id;
}
