import Link from "next/link";

const STEPS = [
  {
    title: "You'll face 10 real situations.",
    body: "Money, scams, work, business, negotiation, digital safety and everyday life in Nigeria. Every scenario is realistic — no trick questions, no trivia.",
  },
  {
    title: "You make a call.",
    body: "Each situation gives you 3-5 realistic options. There usually isn't one perfect answer — every choice trades something off against something else.",
  },
  {
    title: "You see what happens.",
    body: "No \"correct / incorrect\". You get a consequence, a short street lesson on why it matters, and your Street Smart IQ moves up or down.",
  },
  {
    title: "Some choices come back later.",
    body: "Lend a friend money in situation 2, and it might catch up with you in situation 7. Your decisions carry weight through the whole game.",
  },
  {
    title: "You get a Street Smart Profile.",
    body: "After 10 situations you get your Street Smart IQ, a classification from LEARNER to UNTOUCHABLE, and a breakdown across 8 attributes — Financial Sense, Scam Radar, Negotiation, Risk Awareness, People Sense, Business Instinct, Career Judgment and Digital Safety.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-6 py-8">
      <Link href="/" className="text-sm font-medium text-muted hover:text-brand">
        ← Back
      </Link>

      <h1 className="mt-6 font-display text-3xl font-extrabold text-foreground">
        How It Works
      </h1>
      <p className="mt-2 text-muted">
        Street Smart isn&apos;t trivia. It&apos;s a decision game — read the situation, weigh the
        risk, live with what happens.
      </p>

      <ol className="mt-8 flex flex-col gap-6">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex gap-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-soft font-display text-sm font-bold text-brand-strong">
              {i + 1}
            </span>
            <div>
              <h2 className="font-semibold text-foreground">{step.title}</h2>
              <p className="mt-1 text-sm text-muted">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10 rounded-2xl border border-border bg-surface p-5 text-sm text-muted">
        Street Smart IQ starts every player at 100 and moves between 40 and 160 based on
        your decisions. It&apos;s a game for entertainment and education — not financial,
        legal or investment advice.
      </div>

      <Link
        href="/"
        className="mt-8 w-full rounded-full bg-brand px-8 py-4 text-center font-display text-lg font-bold text-white transition-transform active:scale-95"
      >
        LET&apos;S GO
      </Link>
    </div>
  );
}
