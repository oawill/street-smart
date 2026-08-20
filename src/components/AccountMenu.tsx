"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface MeUser {
  username: string;
  role: "PLAYER" | "ADMIN";
}

export function AccountMenu() {
  const router = useRouter();
  const [me, setMe] = useState<MeUser | null | "loading">("loading");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data: { user: MeUser | null }) => {
        if (!cancelled) setMe(data.user);
      })
      .catch(() => {
        if (!cancelled) setMe(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (me === "loading") {
    return <div className="h-7 w-16" aria-hidden />;
  }

  if (!me) {
    return (
      <Link
        href="/login"
        className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-brand hover:text-brand"
      >
        Log in
      </Link>
    );
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setMe(null);
    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex items-center gap-2.5 text-xs font-semibold">
      {me.role === "ADMIN" && (
        <Link href="/admin/partners" className="text-muted transition-colors hover:text-brand">
          Admin
        </Link>
      )}
      <Link href="/partner" className="text-muted transition-colors hover:text-brand">
        Partner
      </Link>
      <span className="rounded-full bg-surface-2 px-3 py-1.5 text-foreground">{me.username}</span>
      <button onClick={handleLogout} className="text-muted transition-colors hover:text-danger">
        Log out
      </button>
    </div>
  );
}
