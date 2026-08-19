import Link from "next/link";

export function ComingSoon({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-6 py-8">
      <Link href="/" className="text-sm font-medium text-muted hover:text-brand">
        ← Back
      </Link>

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <span className="rounded-full bg-accent-soft px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent">
          {eyebrow}
        </span>
        <h1 className="mt-5 font-display text-3xl font-extrabold text-foreground">{title}</h1>
        <p className="mt-3 max-w-sm text-sm text-muted">{body}</p>

        <Link
          href="/"
          className="mt-8 w-full max-w-xs rounded-full bg-brand px-8 py-4 text-center font-display text-lg font-bold text-white transition-transform active:scale-95"
        >
          TEST ME INSTEAD
        </Link>
      </div>
    </div>
  );
}
