import { Scenario } from "@/types/game";

export const negotiationScenarios: Scenario[] = [
  {
    id: "negotiation-01",
    title: "The Rent Renewal",
    category: "negotiation",
    difficulty: "medium",
    city: "Lagos",
    situation:
      'Your landlord informs you that rent is increasing by 25% at renewal, citing "market rates." You\'ve been a reliable tenant for two years and have never been late on payment.',
    decisions: [
      {
        id: "accept-increase",
        label: "Accept the increase to avoid any conflict.",
        consequenceHeadline:
          "An expensive way to avoid discomfort. -6 Street Smart",
        consequenceBody:
          "You pay the full increase, and your landlord, seeing no resistance, applies an even steeper increase the following year.",
        whyItMatters:
          "Landlords often expect some negotiation on renewal — accepting the first number without any pushback can set an expensive precedent.",
        scoreEffect: -6,
        attributeEffects: {
          negotiation: -7,
          financialSense: -4,
          riskAwareness: 3,
        },
        stateEffects: { cash: -50000 },
      },
      {
        id: "negotiate-with-track-record",
        label:
          "Push back, citing your reliable payment history and offer to renew for two years at a smaller increase.",
        consequenceHeadline: "Leverage well used. +9 Street Smart",
        consequenceBody:
          "Your landlord agrees to a 10% increase in exchange for the two-year commitment, valuing the certainty of a reliable long-term tenant.",
        whyItMatters:
          "A genuinely good payment history is real leverage — offering something the landlord values too, like a longer commitment, often produces a better outcome than pushback alone.",
        scoreEffect: 9,
        attributeEffects: {
          negotiation: 10,
          financialSense: 6,
          peopleSense: -3,
        },
        stateEffects: { cash: -20000 },
      },
      {
        id: "threaten-to-leave-bluff",
        label:
          "Threaten to move out immediately, without actually having another place lined up.",
        consequenceHeadline: "A bluff that could easily fail. -3 Street Smart",
        consequenceBody:
          "The landlord calls your bluff and holds firm on the increase, leaving you to either accept it anyway or scramble for a new place you hadn't actually found.",
        whyItMatters:
          "Threatening to leave only works as leverage if you're genuinely prepared to — an empty threat can leave you worse off than a straightforward negotiation would have.",
        scoreEffect: -3,
        attributeEffects: {
          negotiation: -4,
          riskAwareness: -3,
          financialSense: 1,
        },
      },
      {
        id: "research-market-rates",
        label:
          "Research actual comparable rents in the area before responding with a counter-offer.",
        consequenceHeadline: "Data-backed negotiation. +8 Street Smart",
        consequenceBody:
          "Armed with real comparable prices showing the increase is above market, you negotiate it down to a more reasonable 12%.",
        whyItMatters:
          "Bringing actual market data to a rent negotiation, rather than just an opinion, gives your counter-offer real credibility.",
        scoreEffect: 8,
        attributeEffects: {
          negotiation: 9,
          financialSense: 5,
          peopleSense: -4,
        },
        stateEffects: { cash: -24000 },
      },
    ],
    tags: ["rent", "landlord", "renewal"],
  },
  {
    id: "negotiation-02",
    title: "Haggling for the Used Car",
    category: "negotiation",
    difficulty: "medium",
    city: "Kaduna",
    situation:
      "You find a used sedan listed at ₦3.8 million. Your research shows similar cars typically sell for around ₦3.3 million. The seller seems eager but not desperate.",
    decisions: [
      {
        id: "pay-asking-price",
        label: "Pay the asking price to avoid a drawn-out negotiation.",
        consequenceHeadline: "Convenience cost you real money. -6 Street Smart",
        consequenceBody:
          "You get the car quickly, but ₦500,000 above a fair market price, money that a short conversation could likely have saved.",
        whyItMatters:
          "For large purchases, skipping negotiation entirely to avoid mild discomfort is one of the most expensive shortcuts a buyer can take.",
        scoreEffect: -6,
        attributeEffects: {
          negotiation: -8,
          financialSense: -5,
          riskAwareness: 2,
        },
        stateEffects: { cash: -3800000 },
      },
      {
        id: "counter-with-data",
        label:
          "Counter with a specific offer based on your market research, and explain your reasoning.",
        consequenceHeadline: "Confident and grounded. +9 Street Smart",
        consequenceBody:
          "The seller respects the researched counter-offer and settles at ₦3.4 million, close to fair market value.",
        whyItMatters:
          "Presenting a counter-offer backed by specific comparable prices is far more persuasive than simply asking for a lower number.",
        scoreEffect: 9,
        attributeEffects: {
          negotiation: 10,
          financialSense: 6,
          peopleSense: -2,
        },
        stateEffects: { cash: -3400000 },
      },
      {
        id: "lowball-aggressively",
        label:
          "Offer an aggressively low price, well below even the fair market estimate.",
        consequenceHeadline: "It backfired. -4 Street Smart",
        consequenceBody:
          "The seller is offended by the lowball and disengages entirely, and you lose the chance to negotiate toward a fair price at all.",
        whyItMatters:
          "Negotiating too aggressively, without grounding in realistic numbers, can shut down a deal rather than improve it.",
        scoreEffect: -4,
        attributeEffects: {
          negotiation: -3,
          peopleSense: -4,
          riskAwareness: 3,
        },
      },
      {
        id: "walk-away-test",
        label:
          "Make a fair counter-offer, and be genuinely willing to walk away if it's rejected.",
        consequenceHeadline:
          "Strong position, patient execution. +10 Street Smart",
        consequenceBody:
          "You walk away calmly after the seller hesitates, and he calls you back the next day to accept your offer.",
        whyItMatters:
          "Being genuinely willing to walk away from a negotiation, rather than just implying it, is one of the strongest positions a buyer can hold.",
        scoreEffect: 10,
        attributeEffects: {
          negotiation: 11,
          riskAwareness: 4,
          peopleSense: -3,
        },
        stateEffects: { cash: -3400000 },
      },
    ],
    tags: ["car-purchase", "haggling", "market-research"],
  },
  {
    id: "negotiation-03",
    title: "The Market Bargain",
    category: "negotiation",
    difficulty: "easy",
    city: "Ibadan",
    situation:
      "At a local market, a trader quotes ₦15,000 for a set of pots you know regularly sells for around ₦10,000 elsewhere in the same market.",
    decisions: [
      {
        id: "pay-quoted-price",
        label: "Pay the quoted price without haggling.",
        consequenceHeadline: "You paid the visitor's price. -4 Street Smart",
        consequenceBody:
          "You get the pots, but noticeably overpay compared to what other shoppers routinely negotiate down to at the same stall.",
        whyItMatters:
          "In markets where haggling is the norm, the first quoted price is rarely the real price — not countering usually means paying more than necessary.",
        scoreEffect: -4,
        attributeEffects: {
          negotiation: -5,
          financialSense: -3,
          riskAwareness: 1,
        },
        stateEffects: { cash: -15000 },
      },
      {
        id: "counter-reasonably",
        label:
          "Counter with a reasonable price closer to what you know it's worth.",
        consequenceHeadline: "Fair and effective. +7 Street Smart",
        consequenceBody:
          "After some friendly back-and-forth, you settle around ₦10,500, close to the fair market price.",
        whyItMatters:
          "A grounded, respectful counter-offer, rather than either accepting or lowballing, tends to produce the best outcome in markets built around haggling.",
        scoreEffect: 7,
        attributeEffects: {
          negotiation: 8,
          financialSense: 4,
          peopleSense: -4,
        },
        stateEffects: { cash: -10500 },
      },
      {
        id: "lowball-harshly",
        label: "Offer an insultingly low price to try to shock a big discount.",
        consequenceHeadline: "It soured the exchange. -2 Street Smart",
        consequenceBody:
          "The trader is offended and holds firm out of principle, and you end up paying more than a reasonable counter-offer would have gotten you.",
        whyItMatters:
          "Extremely low opening offers can come across as disrespectful in a haggling culture built on mutual give-and-take, often producing a worse outcome than a fair counter.",
        scoreEffect: -2,
        attributeEffects: {
          negotiation: -3,
          peopleSense: -4,
          riskAwareness: 2,
        },
        stateEffects: { cash: -13000 },
      },
      {
        id: "walk-toward-other-stall",
        label:
          "Politely start to walk toward a competing stall, without directly countering.",
        consequenceHeadline: "A classic, effective tactic. +6 Street Smart",
        consequenceBody:
          "The trader calls you back with a much better offer rather than lose the sale entirely.",
        whyItMatters:
          "Showing you have other options, calmly and without confrontation, is often enough to shift a price without needing a single word of direct haggling.",
        scoreEffect: 6,
        attributeEffects: { negotiation: 7, peopleSense: -2 },
        stateEffects: { cash: -11000 },
      },
    ],
    tags: ["market", "haggling", "everyday"],
  },
  {
    id: "negotiation-04",
    title: "Asking for a Raise",
    category: "negotiation",
    difficulty: "medium",
    city: "Abuja",
    situation:
      "You've taken on significantly more responsibility over the past year without a corresponding pay increase. You're preparing to ask your manager for a raise.",
    decisions: [
      {
        id: "ask-vaguely",
        label: "Bring it up casually, hoping your manager takes the hint.",
        consequenceHeadline: "Hints rarely become raises. -5 Street Smart",
        consequenceBody:
          "Your manager acknowledges the comment sympathetically, but nothing concrete follows, since no specific ask was actually made.",
        whyItMatters:
          "A raise conversation needs a specific, clear ask — vague hints are easy for even a well-meaning manager to let slide without acting.",
        scoreEffect: -5,
        attributeEffects: {
          negotiation: -6,
          careerJudgment: -3,
          riskAwareness: 3,
        },
      },
      {
        id: "prepare-case-with-numbers",
        label:
          "Prepare a clear case with specific examples of added responsibility and a target number, then ask directly.",
        consequenceHeadline: "A well-built case. +10 Street Smart",
        consequenceBody:
          "Your manager is impressed by the preparation and secures a meaningful raise, close to your target, within a few weeks.",
        whyItMatters:
          "A raise request backed by specific, concrete evidence of added value is far more persuasive than a general appeal to effort or tenure.",
        scoreEffect: 10,
        attributeEffects: {
          negotiation: 11,
          careerJudgment: 7,
          peopleSense: -3,
        },
        stateEffects: { income: 60000 },
      },
      {
        id: "threaten-to-quit",
        label:
          "Threaten to resign if the raise isn't granted, without another offer in hand.",
        consequenceHeadline: "A risky move without backup. -6 Street Smart",
        consequenceBody:
          "Your manager, uncertain whether the threat is genuine, offers only a token increase, and the relationship feels tenser afterward.",
        whyItMatters:
          "Threatening to leave without a real alternative lined up puts you in a weak position if the threat isn't taken seriously, or has to be followed through unprepared.",
        scoreEffect: -6,
        attributeEffects: {
          negotiation: -5,
          careerJudgment: -4,
          riskAwareness: 1,
        },
        stateEffects: { income: 10000 },
      },
      {
        id: "ask-for-nonsalary-benefits",
        label:
          "Ask for a mix of a smaller raise plus other benefits, like flexible hours or a training budget.",
        consequenceHeadline: "Creative and effective. +8 Street Smart",
        consequenceBody:
          "Your manager, working within a limited salary budget, is glad to agree to the added flexibility and training support alongside a modest raise.",
        whyItMatters:
          "When salary budgets are tight, negotiating for a broader mix of value, not just cash, can get you a better overall outcome.",
        scoreEffect: 8,
        attributeEffects: {
          negotiation: 9,
          careerJudgment: 5,
          peopleSense: -4,
        },
        stateEffects: { income: 25000 },
      },
    ],
    tags: ["salary", "raise", "workplace"],
  },
  {
    id: "negotiation-05",
    title: "The Freelance Contract Terms",
    category: "negotiation",
    difficulty: "medium",
    city: "Port Harcourt",
    situation:
      "A client sends you a contract for a logo design project. It includes a clause requiring unlimited revisions with no additional charge and full payment only after 60 days.",
    decisions: [
      {
        id: "sign-as-is",
        label: "Sign the contract as it is to secure the client.",
        consequenceHeadline: "This clause will cost you. -7 Street Smart",
        consequenceBody:
          "The client requests over a dozen rounds of revisions, none of them additionally paid, and your effective hourly rate on the project collapses.",
        whyItMatters:
          "Unlimited revision clauses and long payment terms look like small details but can quietly consume far more time and cash flow than expected.",
        scoreEffect: -7,
        attributeEffects: {
          negotiation: -8,
          businessInstinct: -6,
          riskAwareness: 2,
        },
        stateEffects: { income: -30000 },
      },
      {
        id: "negotiate-key-terms",
        label:
          "Propose a cap on free revisions and a deposit with faster final payment.",
        consequenceHeadline:
          "Protected your time and cash flow. +10 Street Smart",
        consequenceBody:
          "The client agrees to three included revisions plus a 50% deposit upfront, with the balance due at delivery instead of 60 days later.",
        whyItMatters:
          "Contract terms are almost always negotiable before signing — pushing back on the specific clauses that create real risk protects both your time and your income.",
        scoreEffect: 10,
        attributeEffects: {
          negotiation: 11,
          businessInstinct: 7,
          peopleSense: -2,
        },
        stateEffects: { cash: 40000 },
      },
      {
        id: "decline-contract-entirely",
        label: "Decline the project entirely rather than negotiate.",
        consequenceHeadline: "Safe, but a missed opportunity. -1 Street Smart",
        consequenceBody:
          "You avoid the bad terms, but also the entire project and the relationship, when a short negotiation might well have fixed it.",
        whyItMatters:
          "Walking away entirely from unfavorable terms is reasonable, but it skips the option of simply proposing better ones first.",
        scoreEffect: -1,
        attributeEffects: { riskAwareness: 4, businessInstinct: -3 },
        isCautious: true,
      },
      {
        id: "add-verbal-caveat",
        label:
          "Sign the contract, but verbally tell the client you'll charge extra for excessive revisions.",
        consequenceHeadline: "Unenforceable good intentions. -4 Street Smart",
        consequenceBody:
          "When you try to invoice for extra revisions later, the client points to the signed contract's unlimited-revisions clause, and your verbal note carries no weight.",
        whyItMatters:
          "A verbal understanding that contradicts a signed written contract generally won't hold up — if a term matters, it needs to be in the document itself.",
        scoreEffect: -4,
        attributeEffects: {
          negotiation: -5,
          businessInstinct: -4,
          riskAwareness: 3,
        },
      },
    ],
    tags: ["freelance", "contracts", "terms"],
  },
  {
    id: "negotiation-06",
    title: "The Generator Repair Quote",
    category: "negotiation",
    difficulty: "easy",
    city: "Enugu",
    situation:
      "A technician quotes ₦35,000 to repair your generator, without a clear breakdown of parts versus labor. A neighbor mentions a similar repair recently cost them ₦20,000.",
    decisions: [
      {
        id: "pay-quote-directly",
        label: "Pay the quoted amount without questions.",
        consequenceHeadline: "Possibly overpaid. -3 Street Smart",
        consequenceBody:
          "The generator gets fixed, but you never find out whether ₦35,000 was a fair price for the actual parts and work involved.",
        whyItMatters:
          "Vague quotes without an itemized breakdown make it hard to know whether you're paying a fair price — asking for detail is a simple, low-effort check.",
        scoreEffect: -3,
        attributeEffects: {
          negotiation: -4,
          financialSense: -2,
          riskAwareness: 2,
        },
        stateEffects: { cash: -35000 },
      },
      {
        id: "ask-for-breakdown",
        label:
          "Ask for an itemized breakdown of parts and labor before agreeing.",
        consequenceHeadline: "A simple, effective check. +7 Street Smart",
        consequenceBody:
          "The breakdown reveals a padded labor charge, and after a short discussion, the technician agrees to ₦24,000.",
        whyItMatters:
          "Requesting an itemized quote is a low-effort habit that often reveals padding or errors before you agree to pay for them.",
        scoreEffect: 7,
        attributeEffects: { negotiation: 8, financialSense: 5 },
        stateEffects: { cash: -24000 },
      },
      {
        id: "get-second-quote",
        label: "Get a second technician's quote before deciding who to hire.",
        consequenceHeadline: "Thorough comparison. +8 Street Smart",
        consequenceBody:
          "The second quote comes in at ₦19,000 for the same repair, and you go with the more reasonably priced technician.",
        whyItMatters:
          "Comparing quotes from more than one provider, especially for unfamiliar repairs, is one of the most reliable ways to avoid overpaying.",
        scoreEffect: 8,
        attributeEffects: { negotiation: 8, financialSense: 6 },
        stateEffects: { cash: -19000 },
      },
      {
        id: "aggressively-distrust",
        label:
          "Accuse the technician of trying to overcharge you before hearing him out.",
        consequenceHeadline: "Unnecessary conflict. -3 Street Smart",
        consequenceBody:
          "The technician, offended, walks off the job entirely, leaving your generator unrepaired and the relationship soured for future need.",
        whyItMatters:
          "Assuming bad faith before even asking for clarification can turn a simple pricing question into an unnecessary confrontation.",
        scoreEffect: -3,
        attributeEffects: { negotiation: -3, peopleSense: -5 },
      },
    ],
    tags: ["service-provider", "quotes", "everyday"],
  },
  {
    id: "negotiation-07",
    title: "The Wedding Vendor",
    category: "negotiation",
    difficulty: "medium",
    city: "Abeokuta",
    situation:
      "You're booking a photographer for your sister's wedding. The vendor's standard package is ₦450,000, but you notice their calendar shows the date is currently open with no other bookings.",
    decisions: [
      {
        id: "pay-standard-package",
        label: "Book the standard package at full price.",
        consequenceHeadline:
          "Fine, but you left room on the table. -1 Street Smart",
        consequenceBody:
          "The photographer does a great job, though you later learn from a friend that vendors with open dates often have flexibility you didn't ask about.",
        whyItMatters:
          "An open calendar date is a small but real signal of flexibility — it's worth at least asking before paying full listed price.",
        scoreEffect: -1,
        attributeEffects: { negotiation: -3 },
        stateEffects: { cash: -450000 },
      },
      {
        id: "ask-for-discount-open-date",
        label:
          "Point out the open date and ask if there's flexibility on price or added extras.",
        consequenceHeadline: "A reasonable, effective ask. +8 Street Smart",
        consequenceBody:
          "The photographer, glad to fill the date, adds a complimentary album at no extra cost rather than lowering the base price.",
        whyItMatters:
          "Vendors with open availability often have room to add value, even if not always through a straight discount — asking is a low-risk way to find out.",
        scoreEffect: 8,
        attributeEffects: { negotiation: 9, financialSense: 4 },
        stateEffects: { cash: -450000 },
      },
      {
        id: "demand-large-discount",
        label: "Demand a 40% discount, citing the open date as leverage.",
        consequenceHeadline: "Overreached the leverage. -4 Street Smart",
        consequenceBody:
          "The vendor, unwilling to devalue their work that steeply, declines and you have to search for another photographer closer to the date.",
        whyItMatters:
          "An open date is mild leverage, not major leverage — pushing for too large a discount can be seen as disrespectful of the vendor's actual value.",
        scoreEffect: -4,
        attributeEffects: { negotiation: -4, peopleSense: -3 },
      },
      {
        id: "book-cheaper-alternative",
        label:
          "Skip this vendor and book a less experienced, cheaper photographer instead.",
        consequenceHeadline: "Cost saved, quality risk taken. -3 Street Smart",
        consequenceBody:
          "You save money upfront, but the photos from the less experienced photographer are noticeably less polished than the family had hoped for.",
        whyItMatters:
          "For a one-time event like a wedding, chasing the lowest price alone can trade away a quality that can't be redone later.",
        scoreEffect: -3,
        attributeEffects: {
          negotiation: 1,
          financialSense: 3,
          riskAwareness: -3,
        },
        stateEffects: { cash: -180000 },
      },
    ],
    tags: ["events", "vendors", "wedding"],
  },
  {
    id: "negotiation-08",
    title: "Payment Terms With a Big Client",
    category: "negotiation",
    difficulty: "hard",
    city: "Lagos",
    situation:
      "A large corporate client wants to hire your small consulting firm for a ₦6 million project, but their standard terms require 90-day payment after delivery, far longer than your business can comfortably absorb.",
    decisions: [
      {
        id: "accept-90-day-terms",
        label: "Accept the 90-day terms to land the prestigious client.",
        consequenceHeadline:
          "Prestige at a real cash-flow cost. -5 Street Smart",
        consequenceBody:
          "The client relationship is valuable, but the 90-day gap creates a genuine cash crunch that forces you to delay other obligations.",
        whyItMatters:
          "A prestigious client is worth having, but payment terms that outstrip your business's cash-flow capacity can create real damage even on a profitable project.",
        scoreEffect: -5,
        attributeEffects: { businessInstinct: -6, financialSense: -6 },
        stateEffects: { debt: 300000 },
      },
      {
        id: "negotiate-milestone-payments",
        label:
          "Propose milestone-based payments instead of a single lump sum after 90 days.",
        consequenceHeadline: "A strong structural fix. +11 Street Smart",
        consequenceBody:
          "The client agrees to three milestone payments spread across the project, resolving your cash-flow concern while keeping the relationship intact.",
        whyItMatters:
          "Restructuring payment timing around project milestones, rather than accepting or rejecting the whole term, often solves the underlying cash-flow problem directly.",
        scoreEffect: 11,
        attributeEffects: {
          negotiation: 11,
          businessInstinct: 9,
          financialSense: 6,
        },
      },
      {
        id: "decline-project",
        label: "Decline the project entirely due to the payment terms.",
        consequenceHeadline:
          "Protects cash flow, loses the opportunity. +1 Street Smart",
        consequenceBody:
          "Your finances stay stable, but you miss out on a project that could have significantly grown your firm's reputation and revenue.",
        whyItMatters:
          "Protecting cash flow is a valid priority, but declining outright without attempting to renegotiate the specific problematic term leaves value on the table.",
        scoreEffect: 1,
        attributeEffects: { riskAwareness: 5, businessInstinct: -4 },
        isCautious: true,
      },
      {
        id: "factor-invoice",
        label:
          "Accept the terms, but arrange invoice factoring to get most of the payment sooner at a discount.",
        consequenceHeadline: "A workable, if costly, solution. +5 Street Smart",
        consequenceBody:
          "You get most of the cash within days rather than 90, at the cost of a factoring fee, which keeps operations running smoothly.",
        whyItMatters:
          "Financial tools like invoice factoring can bridge a genuine timing gap, though it's worth weighing the fee against simply negotiating better terms directly.",
        scoreEffect: 5,
        attributeEffects: { financialSense: 6, businessInstinct: 5 },
        stateEffects: { cash: 5400000 },
      },
    ],
    tags: ["contracts", "payment-terms", "cash-flow", "b2b"],
  },
  {
    id: "negotiation-09",
    title: "The Agent's Fee",
    category: "negotiation",
    difficulty: "easy",
    city: "Port Harcourt",
    situation:
      'A real estate agent helping you find an apartment quotes a fee of 15% of the annual rent, on top of the rent itself, calling it "standard."',
    decisions: [
      {
        id: "pay-fee-as-quoted",
        label: "Pay the quoted 15% without discussion.",
        consequenceHeadline: "Above the usual range. -3 Street Smart",
        consequenceBody:
          "You later learn that agent fees in the area typically run 5-10%, meaning you paid noticeably more than necessary.",
        whyItMatters:
          'Agent fees, despite being called "standard," often have real room for negotiation, especially when they\'re above the typical local range.',
        scoreEffect: -3,
        attributeEffects: { negotiation: -4, financialSense: -3 },
      },
      {
        id: "negotiate-fee-down",
        label:
          "Ask what the typical range is locally, and negotiate the fee down accordingly.",
        consequenceHeadline: "A quick win. +7 Street Smart",
        consequenceBody:
          "The agent agrees to bring the fee down to 8%, closer to the usual local rate, without any real pushback.",
        whyItMatters:
          "A simple, informed question about typical rates is often enough to bring an inflated fee back in line, with minimal effort.",
        scoreEffect: 7,
        attributeEffects: { negotiation: 8, financialSense: 5 },
      },
      {
        id: "skip-agent-entirely",
        label:
          "Skip the agent and search for apartments directly through personal contacts.",
        consequenceHeadline: "Saved the fee, took longer. +3 Street Smart",
        consequenceBody:
          "You avoid the fee entirely, though the search takes considerably longer and you see fewer available options than the agent would have shown you.",
        whyItMatters:
          "Avoiding agent fees is possible, but it trades away access and speed — worth it in some cases, less so when time matters.",
        scoreEffect: 3,
        attributeEffects: { financialSense: 4, negotiation: 1 },
        isCautious: true,
      },
      {
        id: "accuse-agent-of-scamming",
        label: "Accuse the agent of trying to scam you and walk away entirely.",
        consequenceHeadline:
          "Overreaction to a normal, if high, fee. -4 Street Smart",
        consequenceBody:
          "The fee, while above average, was a legitimate business practice, not a scam — the confrontation burns a relationship that could have helped your search.",
        whyItMatters:
          "A high price isn't automatically fraud — treating a negotiable fee as an accusation-worthy scam can needlessly damage a useful relationship.",
        scoreEffect: -4,
        attributeEffects: { negotiation: -3, peopleSense: -4 },
      },
    ],
    tags: ["real-estate", "agent-fees", "rent"],
  },
  {
    id: "negotiation-10",
    title: "Getting the Deposit Back",
    category: "negotiation",
    difficulty: "medium",
    city: "Kano",
    situation:
      "You canceled an event booking with a hall provider two weeks in advance, well within their stated cancellation window. They're now claiming the ₦100,000 deposit is non-refundable regardless, contradicting their own written policy.",
    decisions: [
      {
        id: "accept-loss",
        label: "Accept the loss rather than deal with the hassle.",
        consequenceHeadline: "You gave up money you were owed. -6 Street Smart",
        consequenceBody:
          "The ₦100,000 is gone, even though the hall's own written policy clearly entitled you to a refund.",
        whyItMatters:
          "Giving up on a dispute simply to avoid friction, even when the written policy is clearly on your side, means losing money you were entitled to.",
        scoreEffect: -6,
        attributeEffects: { negotiation: -7, financialSense: -4 },
      },
      {
        id: "cite-written-policy",
        label:
          "Calmly reference their own written cancellation policy and request the refund in writing.",
        consequenceHeadline: "Firm, documented, effective. +10 Street Smart",
        consequenceBody:
          "Faced with their own clear written policy, the provider processes the refund within a few days.",
        whyItMatters:
          "Citing a provider's own written terms, calmly and in writing, is one of the strongest and most effective ways to resolve a legitimate dispute.",
        scoreEffect: 10,
        attributeEffects: { negotiation: 10, financialSense: 6 },
        stateEffects: { cash: 100000 },
      },
      {
        id: "escalate-angrily",
        label: "Call and angrily demand the refund immediately.",
        consequenceHeadline: "Right position, poor delivery. -1 Street Smart",
        consequenceBody:
          "The provider becomes defensive and drags out the process out of irritation, even though your underlying claim was entirely valid.",
        whyItMatters:
          "Being in the right doesn't mean tone doesn't matter — an angry approach can slow down a resolution that a calmer, documented request would have gotten faster.",
        scoreEffect: -1,
        attributeEffects: { negotiation: -2, peopleSense: -4 },
        stateEffects: { cash: 60000 },
      },
      {
        id: "threaten-public-review",
        label:
          "Mention you'll leave a detailed public review if the refund isn't processed per their own policy.",
        consequenceHeadline:
          "Effective, if a somewhat blunt lever. +5 Street Smart",
        consequenceBody:
          "The provider processes the refund quickly to avoid the review, though the relationship feels a little strained afterward.",
        whyItMatters:
          "Mentioning a public review can be an effective lever for a legitimate grievance, though citing the actual written policy directly usually works just as well without the edge.",
        scoreEffect: 5,
        attributeEffects: { negotiation: 6, peopleSense: -2 },
        stateEffects: { cash: 100000 },
      },
    ],
    tags: ["deposit", "dispute", "consumer-rights", "events"],
  },
];
