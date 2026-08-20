"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }
      router.push(next);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-muted">Email</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-brand"
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-muted">Password</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-brand"
        />
      </label>

      {error && <p className="text-sm text-danger">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 w-full rounded-full bg-brand px-8 py-4 text-center font-display text-lg font-bold text-white transition-transform active:scale-95 disabled:opacity-60"
      >
        {submitting ? "LOGGING IN…" : "LOG IN"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 py-8">
      <Link href="/" className="text-sm font-medium text-muted hover:text-brand">
        ← Back
      </Link>

      <h1 className="mt-6 font-display text-3xl font-extrabold text-foreground">Welcome back</h1>
      <p className="mt-2 text-sm text-muted">Log in to access the Partner Program.</p>

      <div className="mt-8">
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>

      <p className="mt-6 text-center text-sm text-muted">
        No account yet?{" "}
        <Link href="/register" className="font-semibold text-brand">
          Create one
        </Link>
      </p>
    </div>
  );
}
