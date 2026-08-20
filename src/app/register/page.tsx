"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password, firstName: firstName || undefined }),
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
      <Field label="First name (optional)" value={firstName} onChange={setFirstName} />
      <Field label="Username" value={username} onChange={setUsername} required minLength={3} />
      <Field label="Email" type="email" value={email} onChange={setEmail} required />
      <Field label="Password" type="password" value={password} onChange={setPassword} required minLength={8} />

      {error && <p className="text-sm text-danger">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 w-full rounded-full bg-brand px-8 py-4 text-center font-display text-lg font-bold text-white transition-transform active:scale-95 disabled:opacity-60"
      >
        {submitting ? "CREATING ACCOUNT…" : "CREATE ACCOUNT"}
      </button>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  minLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  minLength?: number;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-muted">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        minLength={minLength}
        className="rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-brand"
      />
    </label>
  );
}

export default function RegisterPage() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 py-8">
      <Link href="/" className="text-sm font-medium text-muted hover:text-brand">
        ← Back
      </Link>

      <h1 className="mt-6 font-display text-3xl font-extrabold text-foreground">Create your account</h1>
      <p className="mt-2 text-sm text-muted">
        You don&apos;t need an account to play — this just lets you access the Partner Program and
        keep the same login across devices.
      </p>

      <div className="mt-8">
        <Suspense fallback={null}>
          <RegisterForm />
        </Suspense>
      </div>

      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-brand">
          Log in
        </Link>
      </p>
    </div>
  );
}
