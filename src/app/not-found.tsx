import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="font-display text-2xl font-extrabold text-foreground">
        You&apos;ve wandered off the map.
      </span>
      <p className="max-w-xs text-sm text-muted">
        That page doesn&apos;t exist. Even the streets have their limits.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-full bg-brand px-6 py-3 font-display font-bold text-white transition-transform active:scale-95"
      >
        Back home
      </Link>
    </div>
  );
}
