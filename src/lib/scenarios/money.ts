import { Scenario } from "@/types/game";

export const moneyScenarios: Scenario[] = [
  {
    id: "money-01",
    title: "Salary Day",
    category: "money",
    difficulty: "easy",
    city: "Lagos",
    situation:
      "Your salary of ₦180,000 just landed. You have been eyeing a new pair of sneakers for ₦45,000, but you also know next month has a few bills coming.",
    decisions: [
      {
        id: "buy-sneakers",
        label: "Buy the sneakers immediately, worry about bills later.",
        consequenceHeadline: "Fun now, tight later. -6 Street Smart",
        consequenceBody:
          "The sneakers feel great for about a week, until a bill reminder shows up and your account is thinner than you expected.",
        whyItMatters:
          "Spending as soon as money arrives, before accounting for known upcoming costs, is one of the most common ways people end up short.",
        scoreEffect: -6,
        attributeEffects: {
          financialSense: -8,
          riskAwareness: -3,
          scamRadar: 1,
        },
        stateEffects: { cash: -45000 },
      },
      {
        id: "save-portion",
        label: "Set aside 20% into savings first, then decide on the sneakers.",
        consequenceHeadline: "Balanced approach. +8 Street Smart",
        consequenceBody:
          "You move ₦36,000 into savings before spending anything else. You still have room for small purchases without stress.",
        whyItMatters:
          "Paying yourself first, before discretionary spending, is a simple habit that quietly prevents most cash-flow emergencies.",
        scoreEffect: 8,
        attributeEffects: {
          financialSense: 10,
          riskAwareness: 4,
          peopleSense: -4,
        },
        stateEffects: { cash: -36000 },
      },
      {
        id: "skip-entirely",
        label: "Skip the sneakers and save everything you can.",
        consequenceHeadline: "Very safe, maybe too rigid. +2 Street Smart",
        consequenceBody:
          "Your savings grow, but you also deny yourself any small reward for a full month of work, and the motivation to keep budgeting starts to fade.",
        whyItMatters:
          "Extreme frugality without any breathing room is hard to sustain — budgets that allow for small joys tend to last longer than ones that don't.",
        scoreEffect: 2,
        attributeEffects: {
          financialSense: 6,
          riskAwareness: 4,
          peopleSense: -2,
        },
        isCautious: true,
      },
      {
        id: "buy-on-credit",
        label: "Buy the sneakers on a buy-now-pay-later app instead.",
        consequenceHeadline: "Debt for a want, not a need. -8 Street Smart",
        consequenceBody:
          "The sneakers are yours, but now a repayment is added to next month's bills, on top of the ones you already knew about.",
        whyItMatters:
          "Financing a non-essential purchase stacks new debt on top of known upcoming expenses, which is exactly how small gaps become real problems.",
        scoreEffect: -8,
        attributeEffects: {
          financialSense: -10,
          riskAwareness: -4,
          scamRadar: 2,
        },
        stateEffects: { debt: 45000 },
      },
    ],
    tags: ["budgeting", "salary", "impulse-spending"],
  },
  {
    id: "money-02",
    title: "The Emergency Call",
    category: "money",
    difficulty: "easy",
    city: "Ibadan",
    situation:
      "Your younger cousin calls, panicked. Their school has sent them home for unpaid fees of ₦60,000, due first thing tomorrow morning. You have that much in savings, set aside for your own rent.",
    decisions: [
      {
        id: "pay-fees",
        label: "Pay the fees in full from your rent savings.",
        consequenceHeadline:
          "Generous, but now you're exposed. -4 Street Smart",
        consequenceBody:
          "Your cousin is back in school, but you now have to find ₦60,000 before your own rent is due, with no clear plan for it yet.",
        whyItMatters:
          "Helping family matters, but giving away money earmarked for a fixed obligation just moves the emergency onto you instead of solving it.",
        scoreEffect: -4,
        attributeEffects: {
          peopleSense: 8,
          financialSense: -8,
          riskAwareness: -5,
        },
        stateEffects: { cash: -60000 },
      },
      {
        id: "partial-plan",
        label:
          "Send half now, and help arrange a payment plan with the school for the rest.",
        consequenceHeadline: "Smart middle ground. +8 Street Smart",
        consequenceBody:
          "The school agrees to a two-week extension on the balance. Your cousin stays in school and your rent savings are still mostly intact.",
        whyItMatters:
          "Full-blown emergencies often have more flexibility than they first appear — asking for a plan can solve a problem without draining you completely.",
        scoreEffect: 8,
        attributeEffects: {
          peopleSense: 6,
          negotiation: 8,
          financialSense: 4,
          businessInstinct: -2,
        },
        stateEffects: { cash: -30000 },
      },
      {
        id: "refuse",
        label: "Explain you can't help this time, since it's your rent money.",
        consequenceHeadline:
          "Protects you, strains the relationship. -2 Street Smart",
        consequenceBody:
          "Your rent stays safe, but your cousin is hurt, and misses an extra week of school while the family scrambles for another solution.",
        whyItMatters:
          "Protecting your own obligations is reasonable, but a flat refusal with no attempt to help at all can cost you real goodwill.",
        scoreEffect: -2,
        attributeEffects: {
          financialSense: 5,
          riskAwareness: 5,
          peopleSense: -8,
        },
        isCautious: true,
      },
      {
        id: "borrow-to-cover",
        label:
          "Pay the fees, then take a quick loan-app loan to replace your rent money.",
        consequenceHeadline:
          "You solved one problem by creating another. -9 Street Smart",
        consequenceBody:
          "The fees are paid and rent is covered on time, but the loan carries steep interest, and you're now paying more than the ₦60,000 back.",
        whyItMatters:
          "Using high-interest short-term credit to patch a gap you created yourself usually costs far more than the original problem.",
        scoreEffect: -9,
        attributeEffects: {
          peopleSense: 5,
          financialSense: -10,
          riskAwareness: -6,
        },
        stateEffects: { cash: -60000, debt: 75000 },
      },
    ],
    tags: ["family", "emergency", "school-fees"],
  },
  {
    id: "money-03",
    title: "A Friend in Need",
    category: "money",
    difficulty: "easy",
    city: "Enugu",
    situation:
      "Your close friend calls, stressed. He needs ₦100,000 urgently for a family emergency and asks you to lend it, promising to repay within a month.",
    decisions: [
      {
        id: "lend-full-unwritten",
        label:
          "Lend the full ₦100,000 with no formal agreement, just his word.",
        consequenceHeadline: "Generous. +1 Street Smart",
        consequenceBody:
          "Your friend is relieved and grateful. Nothing is written down, and the date of repayment is only ever spoken.",
        whyItMatters:
          "Helping people you trust is part of life, but informal lending among friends is one of the most common sources of both financial and relationship strain.",
        scoreEffect: 1,
        attributeEffects: {
          peopleSense: 6,
          financialSense: -4,
          riskAwareness: -4,
        },
        stateEffects: { cash: -100000 },
        setFlags: { lentToFriendUnwritten: true, friendDebtAmount: 100000 },
      },
      {
        id: "lend-written",
        label:
          "Lend the money, but text him the amount and repayment date so it's in writing.",
        consequenceHeadline: "Generous and careful. +8 Street Smart",
        consequenceBody:
          "Your friend agrees without any awkwardness. You now have a clear record of what was lent and when it's due.",
        whyItMatters:
          "A simple written record does not make you distrustful of a friend — it protects the friendship by removing any future confusion about what was agreed.",
        scoreEffect: 8,
        attributeEffects: {
          peopleSense: 6,
          financialSense: 8,
          negotiation: 4,
          businessInstinct: -4,
        },
        stateEffects: { cash: -100000 },
        setFlags: { lentToFriendWritten: true, friendDebtAmount: 100000 },
      },
      {
        id: "lend-partial",
        label: "Offer ₦40,000, explaining it's what you can safely spare.",
        consequenceHeadline: "Reasonable compromise. +4 Street Smart",
        consequenceBody:
          "Your friend is a little disappointed but understands. He finds the rest elsewhere and stays in touch.",
        whyItMatters:
          "You are allowed to set a limit on what you lend based on what you can actually afford to lose — a partial yes is still a real yes.",
        scoreEffect: 4,
        attributeEffects: {
          peopleSense: 3,
          financialSense: 6,
          riskAwareness: 4,
          businessInstinct: -3,
        },
        stateEffects: { cash: -40000 },
        setFlags: { lentToFriendUnwritten: true, friendDebtAmount: 40000 },
      },
      {
        id: "decline",
        label: "Say no, and suggest he talk to a family member instead.",
        consequenceHeadline: "Safe, but distant. -1 Street Smart",
        consequenceBody:
          "Your finances are untouched, but your friend feels you weren't there when it mattered, and the friendship cools slightly.",
        whyItMatters:
          "Declining to lend is a fair choice, but redirecting someone in genuine distress with zero effort to help can quietly cost you social capital.",
        scoreEffect: -1,
        attributeEffects: {
          financialSense: 5,
          riskAwareness: 5,
          peopleSense: -6,
        },
        isCautious: true,
      },
    ],
    tags: ["lending", "friends"],
  },
  {
    id: "money-03b",
    title: "The Debt Comes Due",
    category: "money",
    difficulty: "medium",
    city: "Enugu",
    situation:
      "It has been weeks since you lent money to your friend. He still has not repaid you. Now you have an unexpected ₦80,000 expense and could really use that money back.",
    decisions: [
      {
        id: "ask-directly",
        label:
          "Message him directly and ask for the money back, referencing what was agreed.",
        consequenceHeadline: "Direct and fair. +7 Street Smart",
        consequenceBody:
          "It's an awkward conversation, but he apologizes and sends half immediately, promising the rest within a week.",
        whyItMatters:
          "Asking clearly and early for money that is genuinely owed is not rude — it is the single most effective way to actually get repaid.",
        scoreEffect: 7,
        attributeEffects: {
          negotiation: 8,
          peopleSense: 2,
          financialSense: 4,
          businessInstinct: -2,
        },
        stateEffects: { cash: 50000 },
      },
      {
        id: "avoid-topic",
        label: "Avoid bringing it up, hoping he remembers on his own.",
        consequenceHeadline: "The debt quietly dies. -8 Street Smart",
        consequenceBody:
          "Weeks pass. Your friend never brings it up either, and eventually the debt becomes something you both silently pretend didn't happen.",
        whyItMatters:
          "Unspoken debts rarely resolve themselves — avoiding an uncomfortable conversation usually just guarantees the money never comes back.",
        scoreEffect: -8,
        attributeEffects: {
          financialSense: -8,
          negotiation: -6,
          riskAwareness: 3,
        },
        isCautious: true,
      },
      {
        id: "mutual-friend",
        label: "Ask a mutual friend to gently remind him.",
        consequenceHeadline: "It works, but it's messier. +2 Street Smart",
        consequenceBody:
          "Your friend pays you back after hearing it from someone else, but he's a little embarrassed that you involved a third party.",
        whyItMatters:
          "Indirect pressure can get results, but it risks more relationship damage than simply asking directly would have.",
        scoreEffect: 2,
        attributeEffects: {
          negotiation: 3,
          peopleSense: -3,
          financialSense: 3,
        },
        stateEffects: { cash: 100000 },
      },
      {
        id: "write-off",
        label: "Write it off completely and never mention it again.",
        consequenceHeadline: "Peaceful, but costly. -3 Street Smart",
        consequenceBody:
          "The friendship stays smooth, but you're still short ₦80,000 for your own expense, and you quietly resolve never to lend that way again.",
        whyItMatters:
          "Sometimes preserving a relationship is worth more than the money, but it is a choice, not a default — and it has a real cost.",
        scoreEffect: -3,
        attributeEffects: { peopleSense: 6, financialSense: -6 },
        isCautious: true,
      },
    ],
    tags: ["lending", "friends", "consequence"],
    requiresFlags: ["lentToFriendUnwritten"],
    isDelayedConsequence: true,
  },
  {
    id: "money-04",
    title: "The Trading Group",
    category: "money",
    difficulty: "hard",
    city: "Abuja",
    situation:
      'A former classmate, now doing well for himself, invites you to a forex trading group. He shows screenshots of consistent monthly returns and says the group\'s "strategy lead" only takes a limited number of new members, with a ₦150,000 minimum to join this week.',
    decisions: [
      {
        id: "join-immediately",
        label: "Join immediately with ₦150,000 before the slots close.",
        consequenceHeadline: "You bought into the pressure. -12 Street Smart",
        consequenceBody:
          'The first "payout" arrives on schedule, encouraging you to add more. Two months later, withdrawals stop working and the group chat goes silent.',
        whyItMatters:
          "Consistent, guaranteed-looking returns and a closing deadline are two of the strongest warning signs of a scheme designed to separate people from their money.",
        scoreEffect: -12,
        attributeEffects: {
          financialSense: -12,
          scamRadar: -10,
          riskAwareness: -6,
          negotiation: 2,
        },
        stateEffects: { cash: -150000 },
        isTrap: true,
      },
      {
        id: "ask-questions",
        label:
          "Ask to see the actual trading account history and how the strategy lead is regulated.",
        consequenceHeadline: "Good instinct. +10 Street Smart",
        consequenceBody:
          "Your classmate can't produce verifiable account history, only screenshots. You decline, and a few months later you hear the group collapsed.",
        whyItMatters:
          "Real investment returns can be verified through actual account statements and regulatory registration — anyone unwilling or unable to show them is a red flag.",
        scoreEffect: 10,
        attributeEffects: {
          scamRadar: 12,
          financialSense: 6,
          riskAwareness: 4,
          peopleSense: -2,
        },
        isCautious: true,
      },
      {
        id: "small-test-amount",
        label: "Put in a small amount as a test, planning to withdraw quickly.",
        consequenceHeadline: "A smaller trap is still a trap. -6 Street Smart",
        consequenceBody:
          "The small withdrawal works fine, which convinces you to add more later. It's a common setup — the early payout exists to earn trust for a bigger deposit.",
        whyItMatters:
          "Schemes often let early, small withdrawals succeed specifically so victims relax their guard before the amounts get larger.",
        scoreEffect: -6,
        attributeEffects: {
          scamRadar: -6,
          financialSense: -3,
          riskAwareness: -3,
          negotiation: 3,
        },
        stateEffects: { cash: -20000 },
        isTrap: true,
      },
      {
        id: "decline-flat",
        label:
          "Decline entirely and tell your classmate you're not interested in trading groups.",
        consequenceHeadline: "Safe, and you keep your money. +5 Street Smart",
        consequenceBody:
          "Nothing is lost, but you also never independently verify whether any part of it was legitimate, and the friendship feels a little awkward afterward.",
        whyItMatters:
          "Walking away from anything that smells risky is a safe default, though asking a few sharp questions first can teach you more without costing you anything.",
        scoreEffect: 5,
        attributeEffects: { scamRadar: 6, riskAwareness: 6, peopleSense: -3 },
        isCautious: true,
      },
    ],
    tags: ["investment", "forex", "pressure", "red-flags"],
  },
  {
    id: "money-05",
    title: "Joining the Ajo",
    category: "money",
    difficulty: "easy",
    city: "Ibadan",
    situation:
      "Your workplace runs an informal savings contribution (ajo/esusu) — each of the 10 members contributes ₦20,000 monthly, and one person collects the full ₦200,000 pot each month in rotation. A colleague you don't know well is organizing it.",
    decisions: [
      {
        id: "join-blindly",
        label:
          "Join immediately since everyone else at work seems to be in it.",
        consequenceHeadline: "It works out, this time. +1 Street Smart",
        consequenceBody:
          "The contribution runs smoothly and you get your payout on schedule, but you never actually checked who was keeping track of the records.",
        whyItMatters:
          "Group savings schemes work well among trusted people with clear record-keeping, but joining purely on social pressure, without checking how it's run, is still a gap in judgment even when it happens to work out.",
        scoreEffect: 1,
        attributeEffects: {
          financialSense: 2,
          riskAwareness: -3,
          peopleSense: 4,
        },
        stateEffects: { cash: -20000 },
      },
      {
        id: "ask-about-records",
        label:
          "Ask how records are kept and what happens if the organizer leaves the company.",
        consequenceHeadline: "Sensible diligence. +7 Street Smart",
        consequenceBody:
          "The organizer shows a shared spreadsheet everyone can see, and a written rotation order. You join with confidence.",
        whyItMatters:
          "Group savings schemes rely entirely on trust and transparency — asking how money is tracked before joining protects everyone, not just you.",
        scoreEffect: 7,
        attributeEffects: {
          financialSense: 8,
          riskAwareness: 6,
          scamRadar: 3,
          peopleSense: -3,
        },
        stateEffects: { cash: -20000 },
      },
      {
        id: "opt-out",
        label: "Politely opt out and keep saving on your own instead.",
        consequenceHeadline:
          "Safe, but you miss the group benefit. +2 Street Smart",
        consequenceBody:
          "You avoid any risk from the group, but also miss the forced-discipline and early lump-sum benefit that ajo schemes are known for.",
        whyItMatters:
          "Self-directed saving is safe, but structured group savings can genuinely outperform it for people who struggle with discipline alone.",
        scoreEffect: 2,
        attributeEffects: {
          financialSense: 3,
          riskAwareness: 4,
          peopleSense: -2,
        },
        isCautious: true,
      },
      {
        id: "request-late-slot",
        label:
          "Join, but negotiate to collect your payout in the last rotation for a discount.",
        consequenceHeadline: "Clever move. +6 Street Smart",
        consequenceBody:
          "The organizer agrees to a small reduction since you're taking on more risk by collecting last. You save a little and understand the mechanics better.",
        whyItMatters:
          "Understanding that collection order carries different risk levels — and negotiating accordingly — shows a sharper grasp of how these schemes actually work.",
        scoreEffect: 6,
        attributeEffects: {
          negotiation: 8,
          financialSense: 5,
          riskAwareness: 3,
          peopleSense: -4,
        },
        stateEffects: { cash: -18000 },
      },
    ],
    tags: ["savings", "ajo", "group-finance", "workplace"],
  },
  {
    id: "money-06",
    title: "The Hospital Bill",
    category: "money",
    difficulty: "medium",
    city: "Port Harcourt",
    situation:
      "Your father is admitted to hospital and needs a ₦250,000 deposit before treatment continues. You have ₦150,000 in savings and access to a high-interest loan app that can send the rest in minutes.",
    decisions: [
      {
        id: "loan-app-full-gap",
        label: "Take the full ₦100,000 shortfall from the loan app right away.",
        consequenceHeadline: "Fast, but expensive. -3 Street Smart",
        consequenceBody:
          "Your father gets treated without delay, but the loan's interest and fees mean you'll repay significantly more than ₦100,000 within weeks.",
        whyItMatters:
          "In genuine emergencies, speed matters — but it's still worth knowing the true cost of the fastest option before committing to it.",
        scoreEffect: -3,
        attributeEffects: {
          financialSense: -4,
          riskAwareness: -2,
          peopleSense: 5,
        },
        stateEffects: { cash: -150000, debt: 130000 },
      },
      {
        id: "call-family-first",
        label:
          "Quickly call two family members to split the shortfall before resorting to a loan.",
        consequenceHeadline: "Smart use of your network. +9 Street Smart",
        consequenceBody:
          "Two relatives send ₦50,000 each within the hour. Your father is treated on time and you avoid predatory interest entirely.",
        whyItMatters:
          "In a real emergency, a few honest phone calls to people who care about you often beat expensive credit — and most families want to be asked.",
        scoreEffect: 9,
        attributeEffects: {
          peopleSense: 8,
          financialSense: 8,
          riskAwareness: 4,
          businessInstinct: -3,
        },
        stateEffects: { cash: -150000 },
      },
      {
        id: "negotiate-hospital",
        label:
          "Pay the ₦150,000 you have and ask the hospital for a short payment plan on the rest.",
        consequenceHeadline: "Reasonable, with some delay. +4 Street Smart",
        consequenceBody:
          "The hospital agrees to begin treatment with a partial deposit and a week's grace period for the balance, though the admin process costs you some time.",
        whyItMatters:
          "Many institutions have more flexibility than their posted policies suggest — it rarely hurts to ask before assuming you must find the full amount immediately.",
        scoreEffect: 4,
        attributeEffects: {
          negotiation: 7,
          financialSense: 3,
          peopleSense: -2,
        },
        stateEffects: { cash: -150000 },
      },
      {
        id: "delay-for-savings",
        label:
          "Wait a day to see if you can raise the money without debt, delaying the deposit.",
        consequenceHeadline: "Caution has a real cost here. -7 Street Smart",
        consequenceBody:
          "The delay means your father's treatment is pushed back a day, adding avoidable stress during a medical emergency.",
        whyItMatters:
          "Not every situation rewards caution — in genuine time-sensitive emergencies, delaying to avoid a manageable cost can cause more harm than the cost itself.",
        scoreEffect: -7,
        attributeEffects: {
          riskAwareness: 3,
          peopleSense: -8,
          financialSense: 2,
        },
        isCautious: true,
      },
    ],
    tags: ["emergency", "medical", "family", "loans"],
  },
  {
    id: "money-07",
    title: "The Installment Phone",
    category: "money",
    difficulty: "easy",
    city: "Kano",
    situation:
      "A shop offers a new phone worth ₦280,000 on an installment plan: ₦50,000 down, then monthly payments. The salesperson is eager for you to sign quickly and glosses over the terms when you ask about total cost.",
    decisions: [
      {
        id: "sign-quickly",
        label: "Pay the deposit and sign without reading the full terms.",
        consequenceHeadline: "You'll find out the hard way. -5 Street Smart",
        consequenceBody:
          "You get the phone, but the paperwork you skimmed included a steep late-payment penalty and a processing fee you didn't notice.",
        whyItMatters:
          "Financing agreements are exactly where the real cost hides — skipping the fine print because a salesperson is in a hurry usually favors the seller, not you.",
        scoreEffect: -5,
        attributeEffects: {
          financialSense: -8,
          riskAwareness: -4,
          scamRadar: 3,
        },
        stateEffects: { cash: -50000, debt: 230000 },
        setFlags: { installmentHiddenTerms: true, installmentBalance: 230000 },
      },
      {
        id: "read-terms-first",
        label:
          "Insist on reading the full terms and ask for total repayment cost in writing before signing.",
        consequenceHeadline: "Careful and thorough. +8 Street Smart",
        consequenceBody:
          "The written terms reveal the total cost is ₦40,000 more than advertised. You negotiate the processing fee down before signing.",
        whyItMatters:
          "Asking for the total cost in writing, not just the monthly figure, is the single best defense against installment plans that look cheaper than they are.",
        scoreEffect: 8,
        attributeEffects: {
          financialSense: 9,
          negotiation: 6,
          riskAwareness: 5,
          peopleSense: -3,
        },
        stateEffects: { cash: -50000, debt: 210000 },
      },
      {
        id: "pay-cash-cheaper-phone",
        label: "Walk away and buy a cheaper phone outright with cash instead.",
        consequenceHeadline: "Debt-free, more modest choice. +5 Street Smart",
        consequenceBody:
          "You get a decent phone for ₦120,000 cash, with no installment terms to worry about at all.",
        whyItMatters:
          "Avoiding debt entirely for a want-not-need purchase is a solid default, even if it means settling for less than the newest model.",
        scoreEffect: 5,
        attributeEffects: {
          financialSense: 7,
          riskAwareness: 4,
          peopleSense: -2,
        },
        stateEffects: { cash: -120000 },
        isCautious: true,
      },
      {
        id: "negotiate-cash-discount",
        label:
          "Offer to pay a larger deposit in exchange for a shorter, clearer repayment term.",
        consequenceHeadline: "Sharp negotiation. +7 Street Smart",
        consequenceBody:
          "The shop agrees to a 3-month plan with clear terms instead of the vague 12-month default, reducing your total interest exposure.",
        whyItMatters:
          "Shorter, clearer financing terms usually cost less overall — pushing for one is a good instinct even when you can't pay everything upfront.",
        scoreEffect: 7,
        attributeEffects: {
          negotiation: 8,
          financialSense: 6,
          peopleSense: -4,
        },
        stateEffects: { cash: -100000, debt: 130000 },
      },
    ],
    tags: ["installment", "purchase", "hidden-fees", "electronics"],
  },
  {
    id: "money-07b",
    title: "The Fine Print Bill",
    category: "money",
    difficulty: "medium",
    city: "Kano",
    situation:
      'Two months into your phone installment plan, you get a message: a "processing fee" and a "late administration charge" have added ₦35,000 to your remaining balance, which you don\'t remember agreeing to clearly.',
    decisions: [
      {
        id: "pay-without-question",
        label: "Just pay the new amount to avoid further trouble.",
        consequenceHeadline:
          "The path of least resistance costs you. -6 Street Smart",
        consequenceBody:
          "You pay the extra ₦35,000 without pushback. The shop notes you as an easy customer, and a similar charge appears again next month.",
        whyItMatters:
          "Paying unexplained charges without question signals to a lender or seller that you won't push back, which often invites more of the same.",
        scoreEffect: -6,
        attributeEffects: {
          financialSense: -6,
          negotiation: -4,
          riskAwareness: 2,
        },
        stateEffects: { cash: -35000 },
      },
      {
        id: "request-breakdown",
        label:
          "Go back to the shop and formally request a written breakdown of every charge.",
        consequenceHeadline: "You caught it. +9 Street Smart",
        consequenceBody:
          "Faced with a direct request for documentation, the shop admits the late fee was applied in error and removes ₦20,000 of it.",
        whyItMatters:
          "Asking for an itemized breakdown of any unexpected charge is one of the most effective ways to catch errors or opportunistic fees before paying them.",
        scoreEffect: 9,
        attributeEffects: {
          financialSense: 8,
          negotiation: 9,
          riskAwareness: 3,
        },
        stateEffects: { cash: -15000 },
      },
      {
        id: "stop-paying",
        label:
          "Stop payments altogether in protest, without formally disputing the charge.",
        consequenceHeadline: "This backfires. -9 Street Smart",
        consequenceBody:
          "Missed payments trigger a genuine default flag on the agreement, adding real penalty fees on top of the disputed ones and hurting your standing with the shop.",
        whyItMatters:
          "Withholding payment without formally raising a dispute usually just adds a real problem on top of the original complaint.",
        scoreEffect: -9,
        attributeEffects: {
          financialSense: -8,
          riskAwareness: -6,
          negotiation: -3,
        },
        stateEffects: { debt: 20000 },
        isTrap: true,
      },
      {
        id: "pay-off-early",
        label:
          "Borrow from savings to pay off the remaining balance early and end the relationship with the shop.",
        consequenceHeadline: "Costly but clean. +2 Street Smart",
        consequenceBody:
          "You clear the debt and the surprise fees stop, but you've drained savings you had earmarked for something else.",
        whyItMatters:
          "Exiting a bad financing arrangement early can be worth the short-term cash hit, though it's rarely the cheapest option if you can negotiate instead.",
        scoreEffect: 2,
        attributeEffects: { riskAwareness: 5, financialSense: -3 },
        stateEffects: { cash: -195000, debt: -230000 },
      },
    ],
    tags: ["installment", "hidden-fees", "consequence", "dispute"],
    requiresFlags: ["installmentHiddenTerms"],
    isDelayedConsequence: true,
  },
  {
    id: "money-08",
    title: "The Year-End Bonus",
    category: "money",
    difficulty: "easy",
    city: "Lagos",
    situation:
      "Your company pays out a year-end bonus of ₦300,000, more than you expected. You have no urgent debts, but plenty of things you'd like to buy.",
    decisions: [
      {
        id: "spend-most",
        label: "Spend most of it on things you've wanted all year.",
        consequenceHeadline: "Enjoyable, but fleeting. -3 Street Smart",
        consequenceBody:
          "You feel great for a few weeks. By February, the bonus is gone and nothing about your financial position has changed.",
        whyItMatters:
          "Lump sums are easy to spend without noticing, since there's no single moment that feels irresponsible — just many small ones.",
        scoreEffect: -3,
        attributeEffects: { financialSense: -6 },
        stateEffects: { cash: -250000 },
      },
      {
        id: "split-three-ways",
        label:
          "Split it roughly three ways: save, invest, and spend on something you enjoy.",
        consequenceHeadline: "Balanced and sustainable. +9 Street Smart",
        consequenceBody:
          "You put ₦100,000 into savings, ₦100,000 into a low-risk fund, and enjoy the rest guilt-free.",
        whyItMatters:
          "Windfalls handled with a simple split — save, grow, enjoy — tend to build wealth without feeling like deprivation.",
        scoreEffect: 9,
        attributeEffects: { financialSense: 10, riskAwareness: 4 },
        stateEffects: { cash: -100000 },
      },
      {
        id: "save-all",
        label: "Put the entire bonus into savings.",
        consequenceHeadline:
          "Disciplined, if a little joyless. +4 Street Smart",
        consequenceBody:
          "Your savings grow nicely, though you feel like the year's hard work brought you no personal reward at all.",
        whyItMatters:
          "Maximizing savings is rarely wrong financially, but treating every windfall as purely for the future can wear down motivation over time.",
        scoreEffect: 4,
        attributeEffects: { financialSense: 6, peopleSense: -2 },
        isCautious: true,
      },
      {
        id: "invest-riskier",
        label:
          "Put a large portion into a promising but higher-risk venture a friend is starting.",
        consequenceHeadline: "A real bet, not a bad one. +2 Street Smart",
        consequenceBody:
          "It's a genuine business, not a scam, but higher risk investments don't always pay off on a set timeline, and your capital is now tied up.",
        whyItMatters:
          "Backing a real venture with money you can afford to lose is a legitimate financial move, but it's fundamentally different from saving, and the two shouldn't be confused.",
        scoreEffect: 2,
        attributeEffects: {
          businessInstinct: 8,
          riskAwareness: -6,
          financialSense: -2,
        },
        stateEffects: { cash: -200000 },
      },
    ],
    tags: ["bonus", "windfall", "saving", "budgeting"],
  },
  {
    id: "money-09",
    title: "The Loan App Spiral",
    category: "money",
    difficulty: "medium",
    city: "Benin City",
    situation:
      "You took a small ₦30,000 loan from a digital lending app last month for a short-term gap. It's now due, with interest bringing it to ₦39,000, and you're tempted to just take a second loan from a different app to cover it.",
    decisions: [
      {
        id: "take-second-loan",
        label: "Take a loan from a different app to repay the first one.",
        consequenceHeadline: "The spiral begins. -11 Street Smart",
        consequenceBody:
          "The first loan is cleared, but the second one carries its own interest and deadline. You've bought a few weeks at the cost of a growing cycle.",
        whyItMatters:
          "Using one loan to pay another is how short-term debt becomes long-term debt — the balance keeps growing faster than most people expect.",
        scoreEffect: -11,
        attributeEffects: { financialSense: -12, riskAwareness: -8 },
        stateEffects: { debt: 45000 },
        isTrap: true,
      },
      {
        id: "cut-spending-repay",
        label:
          "Cut spending hard this month and repay the ₦39,000 from your own income.",
        consequenceHeadline: "Uncomfortable but effective. +9 Street Smart",
        consequenceBody:
          "It's a tight month, but you clear the loan fully and avoid any further interest or a second debt.",
        whyItMatters:
          "A short, disciplined squeeze to clear debt is almost always cheaper in the long run than rolling it into new borrowing.",
        scoreEffect: 9,
        attributeEffects: { financialSense: 10, riskAwareness: 6 },
        stateEffects: { cash: -39000, debt: -39000 },
      },
      {
        id: "call-app-support",
        label:
          "Contact the lender to ask about a short extension before the due date.",
        consequenceHeadline: "Worth trying. +5 Street Smart",
        consequenceBody:
          "The app grants a 5-day extension with a small additional fee, giving you time to gather the full amount without a second loan.",
        whyItMatters:
          "Many lenders would rather extend a deadline slightly than risk non-payment — asking first is usually better than assuming there's no flexibility.",
        scoreEffect: 5,
        attributeEffects: { negotiation: 6, financialSense: 5 },
        stateEffects: { debt: 2000 },
      },
      {
        id: "ignore-it",
        label: "Ignore the due date and deal with it whenever you can.",
        consequenceHeadline: "It gets worse, not better. -8 Street Smart",
        consequenceBody:
          "Missed payment fees and rising interest push your balance higher, and the app begins contacting your listed references.",
        whyItMatters:
          "Digital loans typically compound quickly and aggressively — ignoring a due date almost never makes the problem smaller.",
        scoreEffect: -8,
        attributeEffects: {
          financialSense: -8,
          riskAwareness: -6,
          peopleSense: -4,
        },
        stateEffects: { debt: 15000 },
      },
    ],
    tags: ["loan-apps", "debt", "digital-lending"],
  },
  {
    id: "money-10",
    title: "Sending Money Home",
    category: "money",
    difficulty: "hard",
    city: "Jos",
    situation:
      "Your parents in the village expect a monthly ₦40,000 contribution from you, as your younger siblings do. This month you have a genuine ₦150,000 opportunity to join a small trading venture with a trusted cousin, but taking it means skipping this month's contribution.",
    decisions: [
      {
        id: "skip-and-invest",
        label:
          "Skip this month's contribution and invest in the trading venture.",
        consequenceHeadline: "A real bet on your future. +4 Street Smart",
        consequenceBody:
          "Your parents are disappointed and it causes some tension, but the venture is legitimate and has a real chance to increase your income going forward.",
        whyItMatters:
          "Investing in your own future earning power is a valid choice, but it has real social costs when it comes at the expense of expected family support — worth doing with eyes open, not by accident.",
        scoreEffect: 4,
        attributeEffects: {
          businessInstinct: 9,
          peopleSense: -8,
          riskAwareness: -3,
        },
        stateEffects: { cash: -150000, reputation: -5 },
      },
      {
        id: "send-and-skip-opportunity",
        label: "Send the contribution as always and let the venture pass by.",
        consequenceHeadline:
          "Family first, opportunity cost paid quietly. +1 Street Smart",
        consequenceBody:
          "Your parents are pleased and nothing changes at home. Your cousin finds another partner for the venture within the week.",
        whyItMatters:
          "Meeting a consistent family obligation is a legitimate priority, but it's worth recognizing that saying yes to it can mean quietly saying no to other things.",
        scoreEffect: 1,
        attributeEffects: {
          peopleSense: 6,
          businessInstinct: -5,
          financialSense: 2,
        },
        stateEffects: { cash: -40000 },
        isCautious: true,
      },
      {
        id: "explain-and-negotiate",
        label:
          "Call your parents, explain the opportunity honestly, and ask for one month's flexibility.",
        consequenceHeadline: "Honesty pays off. +9 Street Smart",
        consequenceBody:
          "Your parents are surprised but proud, and agree to the one-month pause once they understand the reasoning. You invest with their support.",
        whyItMatters:
          "Most family tension around money comes from silence, not disagreement — an honest conversation often gets you more flexibility than you assume.",
        scoreEffect: 9,
        attributeEffects: {
          peopleSense: 8,
          negotiation: 7,
          businessInstinct: 6,
        },
        stateEffects: { cash: -150000 },
      },
      {
        id: "split-both",
        label:
          "Send a reduced contribution and invest a smaller amount in the venture.",
        consequenceHeadline: "Half-measures on both sides. -2 Street Smart",
        consequenceBody:
          "Your parents notice the contribution is smaller than usual without explanation, and your reduced investment gives you only a minor stake in the venture.",
        whyItMatters:
          "Splitting resources without communicating the reasoning to either side can leave you with the downsides of both choices and the full benefit of neither.",
        scoreEffect: -2,
        attributeEffects: {
          peopleSense: -3,
          businessInstinct: 2,
          financialSense: -2,
        },
        stateEffects: { cash: -95000 },
      },
    ],
    tags: ["family", "obligation", "investment", "tradeoff"],
  },
  {
    id: "money-11",
    title: "Splitting the Rent",
    category: "money",
    difficulty: "easy",
    city: "Abeokuta",
    situation:
      "You share an apartment with a roommate, splitting rent 50/50. This month, your roommate says they're short and asks if you can cover their half, promising to pay you back next month.",
    decisions: [
      {
        id: "cover-fully-informal",
        label: "Cover their half fully, trusting them to repay next month.",
        consequenceHeadline: "Kind, but exposed. -2 Street Smart",
        consequenceBody:
          "The landlord is paid on time and your roommate is grateful, but next month arrives and they ask for another month's grace instead of repaying.",
        whyItMatters:
          "Covering someone else's fixed obligation without any agreement on repayment terms tends to quietly become the new normal rather than a one-time favor.",
        scoreEffect: -2,
        attributeEffects: {
          peopleSense: 4,
          financialSense: -6,
          riskAwareness: -4,
        },
        stateEffects: { cash: -75000 },
      },
      {
        id: "cover-with-terms",
        label:
          "Cover their half, but agree in writing on the exact repayment date.",
        consequenceHeadline: "Fair and clear. +8 Street Smart",
        consequenceBody:
          "Your roommate repays on the agreed date without any awkwardness, since the expectation was clear from the start.",
        whyItMatters:
          "Clear terms turn a favor into a manageable arrangement — the goodwill is the same, but the risk of resentment later is much lower.",
        scoreEffect: 8,
        attributeEffects: { financialSense: 7, negotiation: 6, peopleSense: 5 },
        stateEffects: { cash: -75000 },
      },
      {
        id: "split-the-gap",
        label:
          "Offer to cover half of what they're short, and suggest they find the rest elsewhere.",
        consequenceHeadline: "Reasonable boundary. +4 Street Smart",
        consequenceBody:
          "Your roommate appreciates the help and manages to find the remainder from a family member, and the rent is paid on time.",
        whyItMatters:
          "Offering partial help protects your own finances while still showing goodwill — you don't have to solve someone else's shortfall entirely alone.",
        scoreEffect: 4,
        attributeEffects: { peopleSense: 4, financialSense: 5 },
        stateEffects: { cash: -37500 },
      },
      {
        id: "decline-cover",
        label:
          "Decline, explaining you're not in a position to front the money.",
        consequenceHeadline: "Financially safe, socially cold. -3 Street Smart",
        consequenceBody:
          "Your money is untouched, but the rent is paid late, triggering a penalty from the landlord that affects you both.",
        whyItMatters:
          "Protecting your finances is reasonable, but when both of you share the consequence of a shortfall, refusing to even discuss options can backfire on you too.",
        scoreEffect: -3,
        attributeEffects: {
          financialSense: 4,
          peopleSense: -6,
          riskAwareness: 2,
        },
        isCautious: true,
      },
    ],
    tags: ["roommate", "rent", "lending"],
  },
  {
    id: "money-12",
    title: "Selling the Old Car",
    category: "money",
    difficulty: "medium",
    city: "Port Harcourt",
    situation:
      "You're selling your old car privately for ₦2.1 million. A buyer shows real interest but wants to pay in two installments — half now, half after he registers the vehicle in his name in two weeks.",
    decisions: [
      {
        id: "hand-over-immediately",
        label:
          "Accept half payment and hand over the car and documents immediately.",
        consequenceHeadline: "You've lost your leverage. -10 Street Smart",
        consequenceBody:
          "The buyer registers the car in his name, then stops responding to calls about the remaining ₦1.05 million.",
        whyItMatters:
          "Once you hand over both the vehicle and its documents, you lose almost all leverage to enforce the rest of a payment agreement.",
        scoreEffect: -10,
        attributeEffects: {
          negotiation: -8,
          financialSense: -8,
          riskAwareness: -6,
        },
        stateEffects: { cash: 1050000 },
        isTrap: true,
      },
      {
        id: "hold-documents",
        label:
          "Accept half payment, hand over the car, but hold the original documents until final payment.",
        consequenceHeadline: "Smart leverage. +9 Street Smart",
        consequenceBody:
          "Without the documents, the buyer can't complete registration, so he has a strong reason to pay the balance promptly — and does.",
        whyItMatters:
          "Keeping the one thing the other party genuinely needs is a simple, effective way to protect an installment sale without needing legal action.",
        scoreEffect: 9,
        attributeEffects: {
          negotiation: 10,
          riskAwareness: 6,
          financialSense: 5,
        },
        stateEffects: { cash: 2100000 },
      },
      {
        id: "require-full-payment",
        label: "Insist on full payment before handing over the car at all.",
        consequenceHeadline: "Firm, and it costs you the sale. -1 Street Smart",
        consequenceBody:
          "The buyer, who genuinely didn't have the full amount ready, walks away to find a more flexible seller instead.",
        whyItMatters:
          "Requiring full payment upfront is the safest option, but being completely inflexible can cost you a legitimate buyer who simply needed a fair structure.",
        scoreEffect: -1,
        attributeEffects: {
          riskAwareness: 6,
          negotiation: -4,
          businessInstinct: -3,
        },
        isCautious: true,
      },
      {
        id: "written-agreement-no-collateral",
        label:
          "Accept the installment plan with a written agreement, but no collateral held back.",
        consequenceHeadline:
          "Better than nothing, but thin protection. -4 Street Smart",
        consequenceBody:
          "The written agreement gives you legal standing, but pursuing an unpaid balance through the courts is slow and costly, and the buyer knows it.",
        whyItMatters:
          "A written agreement is useful, but without practical leverage like documents or collateral, enforcing it can be more trouble than it's worth.",
        scoreEffect: -4,
        attributeEffects: {
          negotiation: -2,
          financialSense: -4,
          riskAwareness: -2,
        },
        stateEffects: { cash: 1050000 },
      },
    ],
    tags: ["car", "sale", "installment", "leverage"],
  },
  {
    id: "money-13",
    title: "The Subscription Trap",
    category: "money",
    difficulty: "easy",
    city: "Lagos",
    situation:
      'Reviewing your bank statement, you notice three small recurring charges you don\'t remember signing up for — a streaming trial, a "premium SMS" service, and a fitness app — totaling ₦8,500 a month.',
    decisions: [
      {
        id: "ignore-small-amounts",
        label: "Ignore them since each one is small on its own.",
        consequenceHeadline: "Small leaks sink ships. -5 Street Smart",
        consequenceBody:
          'Over the year, these "small" charges quietly cost you over ₦100,000, money you never consciously chose to spend.',
        whyItMatters:
          "Small recurring charges are easy to dismiss individually, but they add up to real money precisely because no single instance feels worth the effort to stop.",
        scoreEffect: -5,
        attributeEffects: { financialSense: -6, digitalSafety: -3 },
        stateEffects: { cash: -8500 },
      },
      {
        id: "review-cancel-all",
        label:
          "Go through your statement line by line and cancel everything you don't actively use.",
        consequenceHeadline: "Good financial hygiene. +8 Street Smart",
        consequenceBody:
          "You cancel all three subscriptions and set a monthly reminder to review your statement, saving ₦8,500 every month going forward.",
        whyItMatters:
          "Regularly auditing recurring charges is one of the simplest habits for protecting your income, and it takes only a few minutes a month.",
        scoreEffect: 8,
        attributeEffects: { financialSense: 9, digitalSafety: 5 },
      },
      {
        id: "cancel-largest-only",
        label: "Cancel only the largest of the three charges.",
        consequenceHeadline: "Partial fix. +2 Street Smart",
        consequenceBody:
          "You save some money, but the two smaller charges keep quietly recurring since you never got around to reviewing them.",
        whyItMatters:
          "Fixing the most visible problem is better than nothing, but recurring charges tend to hide in the details, not just the biggest line item.",
        scoreEffect: 2,
        attributeEffects: { financialSense: 3, digitalSafety: 1 },
      },
      {
        id: "call-bank-block-all",
        label:
          "Call your bank to block all recurring debits from unfamiliar merchants entirely.",
        consequenceHeadline:
          "Effective, if a little heavy-handed. +5 Street Smart",
        consequenceBody:
          "The unwanted charges stop, but the block also catches a legitimate subscription you actually wanted, which you have to manually re-approve later.",
        whyItMatters:
          "Blocking unfamiliar debits is a strong protective step, though a more targeted cancellation avoids the extra cleanup afterward.",
        scoreEffect: 5,
        attributeEffects: { digitalSafety: 8, financialSense: 3 },
      },
    ],
    tags: ["subscriptions", "hidden-charges", "budgeting"],
  },
  {
    id: "money-14",
    title: "The Business Loan Rate",
    category: "money",
    difficulty: "hard",
    city: "Kaduna",
    situation:
      "Your small business needs ₦800,000 to restock ahead of the festive season, which historically doubles your monthly revenue. A microfinance bank offers the loan at a steep interest rate. Saving up the amount yourself would take 4 months, missing the festive season entirely.",
    decisions: [
      {
        id: "take-expensive-loan",
        label:
          "Take the loan despite the high rate, betting on the festive season demand.",
        consequenceHeadline: "A calculated bet that pays off. +7 Street Smart",
        consequenceBody:
          "The interest is real and painful, but festive sales come in strong enough to clear the loan with a solid profit margin left over.",
        whyItMatters:
          "Expensive credit can still be a good decision if the return it unlocks reliably exceeds its cost — the math matters more than the interest rate alone.",
        scoreEffect: 7,
        attributeEffects: {
          businessInstinct: 10,
          riskAwareness: -4,
          financialSense: 3,
        },
        stateEffects: { debt: 800000, cash: 400000 },
      },
      {
        id: "wait-and-save",
        label: "Skip the loan and wait until you've saved enough yourself.",
        consequenceHeadline:
          "Safe, and the season passes you by. -4 Street Smart",
        consequenceBody:
          "You avoid all interest, but by the time you've saved enough, festive demand has cooled and competitors captured the customers you'd normally serve.",
        whyItMatters:
          "Avoiding debt is generally wise, but in a seasonal business, missing the one predictable high-demand window can cost more than the interest would have.",
        scoreEffect: -4,
        attributeEffects: {
          riskAwareness: 5,
          businessInstinct: -8,
          financialSense: 2,
        },
        isCautious: true,
      },
      {
        id: "smaller-loan-partial-stock",
        label:
          "Take a smaller loan for partial restocking, matched to what you can comfortably repay.",
        consequenceHeadline: "Measured approach. +5 Street Smart",
        consequenceBody:
          "You capture some of the festive demand and keep the debt manageable, though you sell out of popular items faster than you'd like.",
        whyItMatters:
          "Scaling a risk to a size you can absorb, even if it means capturing less upside, is a reasonable way to balance ambition with safety.",
        scoreEffect: 5,
        attributeEffects: {
          businessInstinct: 6,
          riskAwareness: 4,
          financialSense: 3,
        },
        stateEffects: { debt: 400000, cash: 200000 },
      },
      {
        id: "seek-better-rate",
        label:
          "Shop around for a cooperative or supplier credit line with better terms before deciding.",
        consequenceHeadline: "Diligence pays off. +9 Street Smart",
        consequenceBody:
          "A supplier offers stock on 60-day credit at no interest, letting you restock fully without touching the expensive microfinance loan at all.",
        whyItMatters:
          "The first financing option offered is rarely the only one — comparing terms before committing can unlock a far cheaper path to the same goal.",
        scoreEffect: 9,
        attributeEffects: {
          businessInstinct: 9,
          negotiation: 8,
          financialSense: 6,
        },
        stateEffects: { debt: 200000 },
      },
    ],
    tags: ["business", "loan", "interest-rate", "seasonal"],
  },
  {
    id: "money-15",
    title: "A Tip From Your Cousin",
    category: "money",
    difficulty: "medium",
    city: "Owerri",
    situation:
      'Your cousin, excited, tells you he tripled his money on a new cryptocurrency token that a Telegram group is promoting as "about to explode." He urges you to put in money today before the price rises further.',
    decisions: [
      {
        id: "invest-immediately",
        label: "Send money in immediately based on his excitement.",
        consequenceHeadline: "Chasing hype rarely ends well. -10 Street Smart",
        consequenceBody:
          "The token's price crashes days later, a pattern common to tokens hyped hard in group chats with little real backing.",
        whyItMatters:
          "Investment decisions made purely on someone else's excitement, without independent research, are a common way people lose money quickly.",
        scoreEffect: -10,
        attributeEffects: {
          financialSense: -10,
          scamRadar: -6,
          riskAwareness: -6,
        },
        stateEffects: { cash: -100000 },
        isTrap: true,
      },
      {
        id: "research-first",
        label:
          "Research the token's history, team, and trading volume before deciding anything.",
        consequenceHeadline: "Due diligence wins. +9 Street Smart",
        consequenceBody:
          "The research reveals the token has no identifiable team and thin trading volume, both classic signs of a pump-and-dump pattern. You decide to skip it.",
        whyItMatters:
          "A few minutes of research into who is actually behind an investment, and how liquid it really is, can reveal risks that excitement alone will never show you.",
        scoreEffect: 9,
        attributeEffects: {
          financialSense: 10,
          scamRadar: 8,
          riskAwareness: 6,
        },
        isCautious: true,
      },
      {
        id: "small-amount-only",
        label:
          "Invest a small amount you're fully prepared to lose, purely as a speculative bet.",
        consequenceHeadline: "A reasonable way to speculate. +3 Street Smart",
        consequenceBody:
          "The token doesn't perform as hoped, but the amount was small enough that it doesn't meaningfully affect your finances either way.",
        whyItMatters:
          "Speculative bets aren't inherently irrational, as long as the size is genuinely limited to money you can afford to lose entirely.",
        scoreEffect: 3,
        attributeEffects: { financialSense: 4, riskAwareness: 3 },
        stateEffects: { cash: -15000 },
      },
      {
        id: "warn-cousin",
        label:
          "Decline for yourself, and gently warn your cousin about the risk too.",
        consequenceHeadline: "Looking out for family. +7 Street Smart",
        consequenceBody:
          "Your cousin brushes off the warning initially, but appreciates it later when the token's price collapses and he's glad he didn't add more.",
        whyItMatters:
          "Sharing a well-reasoned warning costs you nothing and can genuinely help someone close to you avoid a costly mistake, even if they don't listen right away.",
        scoreEffect: 7,
        attributeEffects: { peopleSense: 6, financialSense: 5, scamRadar: 4 },
        isCautious: true,
      },
    ],
    tags: ["cryptocurrency", "investment", "hype", "family"],
  },
  {
    id: "money-16",
    title: "Buying Insurance",
    category: "money",
    difficulty: "easy",
    city: "Lagos",
    situation:
      "You just bought a motorcycle for deliveries, worth ₦550,000. An insurance agent offers a comprehensive policy for ₦35,000/year covering theft and accident damage. You've never had an accident before and are tempted to skip it.",
    decisions: [
      {
        id: "skip-insurance",
        label: "Skip the insurance to save the ₦35,000.",
        consequenceHeadline:
          "A gamble that isn't guaranteed to pay off. -3 Street Smart",
        consequenceBody:
          "You save the premium for now, but the motorcycle, your main income tool, has no protection if it's stolen or damaged.",
        whyItMatters:
          "Insurance is essentially a small, predictable cost that protects against a large, unpredictable one — skipping it on an income-generating asset raises real exposure.",
        scoreEffect: -3,
        attributeEffects: { riskAwareness: -8, financialSense: -2 },
        stateEffects: { cash: 35000 },
      },
      {
        id: "buy-comprehensive",
        label:
          "Buy the comprehensive policy from a verified, licensed provider.",
        consequenceHeadline: "Sensible protection. +7 Street Smart",
        consequenceBody:
          "A few months later, the motorcycle is clipped by a car and needs repairs — the policy covers the bulk of the cost.",
        whyItMatters:
          "Insuring an asset that directly generates your income is one of the clearest cases where a small, known cost is worth paying to avoid a large, unknown one.",
        scoreEffect: 7,
        attributeEffects: { riskAwareness: 9, financialSense: 5 },
        stateEffects: { cash: -35000 },
      },
      {
        id: "buy-cheapest-unverified",
        label:
          "Buy a cheaper policy from an unverified agent who approached you on the street.",
        consequenceHeadline:
          "Cheap cover can be no cover at all. -8 Street Smart",
        consequenceBody:
          'When you try to file a claim later, the "insurer" turns out not to exist — the agent collected premiums for a policy that was never real.',
        whyItMatters:
          "Insurance is only worth what the underlying company can actually pay out — always verify a provider is licensed before trusting them with a premium.",
        scoreEffect: -8,
        attributeEffects: {
          scamRadar: -8,
          financialSense: -6,
          riskAwareness: -4,
        },
        stateEffects: { cash: -20000 },
        isTrap: true,
      },
      {
        id: "self-insure-savings",
        label:
          "Skip formal insurance but set aside ₦35,000 monthly into a dedicated repair fund instead.",
        consequenceHeadline: "A reasonable alternative. +3 Street Smart",
        consequenceBody:
          "It takes a while to build a meaningful cushion, and a major loss early on would still hurt, but you're building some protection on your own terms.",
        whyItMatters:
          "Self-insuring can work for smaller risks if you're disciplined about it, though it takes time to build a cushion large enough to matter.",
        scoreEffect: 3,
        attributeEffects: { financialSense: 6, riskAwareness: 2 },
        stateEffects: { cash: -35000 },
      },
    ],
    tags: ["insurance", "motorcycle", "risk-management"],
  },
];
