import { Scenario } from "@/types/game";

export const businessScenarios: Scenario[] = [
  {
    id: "business-01",
    title: "The Refund Demand",
    category: "business",
    difficulty: "medium",
    city: "Lagos",
    situation:
      'A customer returns a dress two weeks after buying it, visibly worn, demanding a full refund and claiming it was "faulty from the start." Your shop\'s posted policy is exchange-only within 3 days.',
    decisions: [
      {
        id: "refund-full-anyway",
        label: "Give the full refund to avoid a scene.",
        consequenceHeadline: "It sets a costly precedent. -6 Street Smart",
        consequenceBody:
          "The customer leaves satisfied, but word gets around, and you start seeing more customers try similar claims outside your stated policy.",
        whyItMatters:
          "Bending a clear policy under pressure, without any real evidence, tends to invite more of the same rather than resolve the situation.",
        scoreEffect: -6,
        attributeEffects: {
          businessInstinct: -8,
          negotiation: -4,
          riskAwareness: 1,
        },
        stateEffects: { cash: -12000 },
      },
      {
        id: "hold-firm-with-explanation",
        label:
          "Politely explain the policy and offer store credit instead of cash.",
        consequenceHeadline:
          "Fair, and it protects the business. +8 Street Smart",
        consequenceBody:
          "The customer is initially unhappy but accepts the store credit, and your written policy protects you from a wave of similar requests.",
        whyItMatters:
          "A clearly communicated policy applied consistently protects a small business from being quietly worn down request by request.",
        scoreEffect: 8,
        attributeEffects: {
          businessInstinct: 8,
          negotiation: 6,
          peopleSense: -4,
        },
      },
      {
        id: "refuse-flatly",
        label: "Refuse outright and ask the customer to leave.",
        consequenceHeadline: "Firm, but it escalates. -4 Street Smart",
        consequenceBody:
          "The customer leaves angry and posts a harsh review, without the situation ever being calmly explained or resolved.",
        whyItMatters:
          "Being firm on policy doesn't have to mean being cold — how a boundary is delivered often determines whether a customer leaves upset or merely disappointed.",
        scoreEffect: -4,
        attributeEffects: { businessInstinct: 2, peopleSense: -8 },
      },
      {
        id: "inspect-and-decide-case",
        label:
          "Inspect the item closely to judge if there's a genuine manufacturing fault before deciding.",
        consequenceHeadline: "Fair process. +6 Street Smart",
        consequenceBody:
          "The wear is clearly from use, not a fault, so you politely decline the refund but offer a small discount on a future purchase.",
        whyItMatters:
          "Actually examining the claim before deciding, rather than assuming either way, leads to a fairer and more defensible outcome for both sides.",
        scoreEffect: 6,
        attributeEffects: {
          businessInstinct: 6,
          negotiation: 4,
          peopleSense: -3,
        },
      },
    ],
    tags: ["customer-service", "refund", "retail", "policy"],
  },
  {
    id: "business-02",
    title: "Credit for a Regular",
    category: "business",
    difficulty: "medium",
    city: "Ibadan",
    situation:
      'A regular customer at your provisions store, who usually pays cash, asks to buy ₦25,000 worth of goods "on credit" until the end of the month, promising to pay then.',
    decisions: [
      {
        id: "extend-credit-no-record",
        label:
          "Agree verbally with no written record, trusting the relationship.",
        consequenceHeadline: "Trust alone isn't a system. -5 Street Smart",
        consequenceBody:
          "Month-end arrives, and the customer genuinely forgets the exact amount, leading to an awkward disagreement neither of you can fully resolve.",
        whyItMatters:
          "Even trusted regulars benefit from a simple written record — memory is an unreliable basis for tracking money owed, for both sides.",
        scoreEffect: -5,
        attributeEffects: {
          businessInstinct: -6,
          financialSense: -4,
          riskAwareness: 1,
        },
        stateEffects: { cash: -25000 },
      },
      {
        id: "extend-credit-with-ledger",
        label:
          "Agree, and note the amount and date clearly in a credit ledger both of you can see.",
        consequenceHeadline: "Good small-business practice. +9 Street Smart",
        consequenceBody:
          "The customer pays in full at month-end, and the clear record made the whole exchange smooth and dispute-free.",
        whyItMatters:
          "A simple, visible ledger turns informal credit into a manageable system — it costs nothing and prevents most disputes before they start.",
        scoreEffect: 9,
        attributeEffects: {
          businessInstinct: 10,
          financialSense: 7,
          peopleSense: -4,
        },
        stateEffects: { cash: -25000 },
      },
      {
        id: "decline-credit",
        label: "Decline politely, explaining the shop doesn't extend credit.",
        consequenceHeadline: "Safe, with a relationship cost. -1 Street Smart",
        consequenceBody:
          "You avoid any risk, but the regular customer is a little put off and starts splitting purchases between your shop and a competitor.",
        whyItMatters:
          "A blanket no-credit policy protects cash flow, but for a genuinely reliable regular, it can also quietly push business toward more flexible competitors.",
        scoreEffect: -1,
        attributeEffects: {
          financialSense: 4,
          businessInstinct: -3,
          peopleSense: -3,
        },
        isCautious: true,
      },
      {
        id: "partial-credit",
        label:
          "Offer half on credit with a ledger entry, and ask for cash on the rest.",
        consequenceHeadline: "Balanced risk management. +6 Street Smart",
        consequenceBody:
          "The customer appreciates the flexibility, pays the cash portion immediately, and settles the credit on schedule.",
        whyItMatters:
          "Limiting how much credit you extend to any one customer, even a trusted one, keeps your exposure manageable while still being accommodating.",
        scoreEffect: 6,
        attributeEffects: {
          businessInstinct: 7,
          financialSense: 5,
          peopleSense: -3,
        },
        stateEffects: { cash: -12500 },
      },
    ],
    tags: ["credit", "small-business", "retail", "cash-flow"],
  },
  {
    id: "business-03",
    title: "The Supplier's New Price",
    category: "business",
    difficulty: "medium",
    city: "Kano",
    situation:
      "Your main fabric supplier of three years suddenly raises prices by 20%, citing rising costs, with no negotiation offered upfront. Switching suppliers would mean rebuilding trust and possibly inconsistent quality.",
    decisions: [
      {
        id: "accept-silently",
        label: "Accept the new price without pushing back.",
        consequenceHeadline:
          "An easy target for future increases too. -5 Street Smart",
        consequenceBody:
          "Your margins shrink immediately, and the supplier, having faced no resistance, raises prices again just a few months later.",
        whyItMatters:
          "Accepting a price increase without any negotiation signals that further increases will also go unchallenged.",
        scoreEffect: -5,
        attributeEffects: {
          businessInstinct: -6,
          negotiation: -6,
          riskAwareness: 1,
        },
        stateEffects: { income: -30000 },
      },
      {
        id: "negotiate-with-loyalty",
        label:
          "Push back, citing your three-year relationship and volume, and ask for a smaller increase.",
        consequenceHeadline: "Loyalty as real leverage. +9 Street Smart",
        consequenceBody:
          "The supplier agrees to an 8% increase instead of 20%, valuing the long-term relationship over a larger short-term gain.",
        whyItMatters:
          "A long, reliable business relationship is genuine leverage — using it directly in a negotiation often produces meaningfully better terms.",
        scoreEffect: 9,
        attributeEffects: {
          negotiation: 10,
          businessInstinct: 7,
          peopleSense: -4,
        },
        stateEffects: { income: -10000 },
      },
      {
        id: "switch-suppliers-immediately",
        label: "Switch to a new, cheaper supplier right away.",
        consequenceHeadline: "Cost saved, quality risk taken. -3 Street Smart",
        consequenceBody:
          "The new supplier's fabric quality is inconsistent, leading to a few unhappy customers before you find a reliable replacement.",
        whyItMatters:
          "Switching suppliers purely on price without vetting quality can trade a known cost increase for an unpredictable quality problem.",
        scoreEffect: -3,
        attributeEffects: {
          businessInstinct: -3,
          riskAwareness: -4,
          financialSense: 3,
        },
      },
      {
        id: "diversify-suppliers",
        label:
          "Keep the current supplier but start sourcing a portion from a second supplier too.",
        consequenceHeadline: "Reduces future risk. +7 Street Smart",
        consequenceBody:
          "You absorb the price increase for now, but having a second reliable source gives you real leverage and backup for the next negotiation.",
        whyItMatters:
          "Diversifying suppliers, even gradually, reduces dependence on any single one and strengthens your negotiating position over time.",
        scoreEffect: 7,
        attributeEffects: {
          businessInstinct: 8,
          riskAwareness: 6,
          peopleSense: -3,
        },
        stateEffects: { income: -15000 },
      },
    ],
    tags: ["suppliers", "negotiation", "pricing", "small-business"],
  },
  {
    id: "business-04",
    title: "Undercut by a New Competitor",
    category: "business",
    difficulty: "medium",
    city: "Port Harcourt",
    situation:
      "A new food vendor opens near your shop, selling similar meals at nearly 30% below your prices. Regular customers are starting to ask if you'll match it.",
    decisions: [
      {
        id: "match-price-immediately",
        label: "Cut your prices to match the competitor right away.",
        consequenceHeadline: "A race to the bottom. -7 Street Smart",
        consequenceBody:
          "Your margins shrink sharply, and within weeks you can't cover costs at the new price, while the competitor, likely using cheaper ingredients, still undercuts you further.",
        whyItMatters:
          "Matching a competitor's price without understanding their cost structure often leads a business into an unsustainable spiral.",
        scoreEffect: -7,
        attributeEffects: {
          businessInstinct: -8,
          financialSense: -6,
          riskAwareness: 1,
        },
        stateEffects: { income: -50000 },
      },
      {
        id: "differentiate-on-value",
        label:
          "Keep your price, but improve visible value: better portions, faster service, small loyalty perks.",
        consequenceHeadline: "Smart competitive response. +10 Street Smart",
        consequenceBody:
          "Most regulars stay, appreciating the improvements, and a few new customers even switch over from the cheaper competitor for the better experience.",
        whyItMatters:
          "Competing on price alone favors whoever can cut costs the most — competing on visible value protects margins while still responding to real competition.",
        scoreEffect: 10,
        attributeEffects: {
          businessInstinct: 11,
          negotiation: 5,
          peopleSense: -4,
        },
        stateEffects: { income: 20000 },
      },
      {
        id: "ignore-competitor",
        label: "Ignore the new competitor entirely and change nothing.",
        consequenceHeadline:
          "Passive, and it costs you customers. -5 Street Smart",
        consequenceBody:
          "A noticeable portion of your regulars quietly drift to the cheaper option over the following weeks, since nothing gave them a reason to stay.",
        whyItMatters:
          "Ignoring a real competitive threat doesn't make it disappear — customers respond to what's actually offered, not to how long you've been around.",
        scoreEffect: -5,
        attributeEffects: { businessInstinct: -7, riskAwareness: 2 },
        isCautious: true,
      },
      {
        id: "investigate-costs-then-decide",
        label:
          "Quietly investigate how the competitor sustains such low prices before reacting.",
        consequenceHeadline: "Informed decision-making. +7 Street Smart",
        consequenceBody:
          "You learn the competitor is using smaller portions and lower-quality ingredients — information that lets you confidently hold your price and market the difference.",
        whyItMatters:
          "Understanding why a competitor can charge less, before reacting, often reveals that matching them isn't actually necessary or wise.",
        scoreEffect: 7,
        attributeEffects: {
          businessInstinct: 9,
          riskAwareness: 4,
          peopleSense: -2,
        },
      },
    ],
    tags: ["competition", "pricing", "strategy"],
  },
  {
    id: "business-05",
    title: "How Much Stock to Buy",
    category: "business",
    difficulty: "medium",
    city: "Onitsha",
    situation:
      "Ahead of a major holiday, you need to decide how much extra stock to buy for your shop. Buying too little risks missing sales; buying too much risks unsold, tied-up inventory afterward.",
    decisions: [
      {
        id: "buy-heavily",
        label: "Buy heavily, betting on a strong holiday season.",
        consequenceHeadline: "It didn't fully pay off. -4 Street Smart",
        consequenceBody:
          "Sales are good but not as high as hoped, leaving you with a meaningful amount of unsold stock and cash tied up for weeks afterward.",
        whyItMatters:
          "Large inventory bets can pay off, but without any data to anchor the size of the bet, they carry real downside if demand doesn't fully materialize.",
        scoreEffect: -4,
        attributeEffects: {
          businessInstinct: -3,
          riskAwareness: -5,
          financialSense: -3,
          scamRadar: 3,
        },
        stateEffects: { cash: -400000 },
      },
      {
        id: "buy-based-on-history",
        label:
          "Use last year's sales data to estimate a moderate, data-informed increase in stock.",
        consequenceHeadline: "Grounded decision-making. +9 Street Smart",
        consequenceBody:
          "Stock levels closely match actual demand, with only minor leftovers, and you capture nearly all the holiday sales opportunity.",
        whyItMatters:
          "Using historical sales data to size an inventory decision turns a guess into an informed bet, significantly reducing both understock and overstock risk.",
        scoreEffect: 9,
        attributeEffects: {
          businessInstinct: 10,
          financialSense: 6,
          peopleSense: -3,
        },
        stateEffects: { cash: -200000, income: 150000 },
      },
      {
        id: "buy-minimal",
        label: "Buy only slightly more than a normal month, to stay cautious.",
        consequenceHeadline:
          "Too cautious for the opportunity. -3 Street Smart",
        consequenceBody:
          "You sell out of popular items within the first two days of the holiday rush, turning away customers you could have easily served.",
        whyItMatters:
          "Excessive caution during a predictable high-demand period has a real cost too — it isn't automatically the safe choice when the opportunity is well understood.",
        scoreEffect: -3,
        attributeEffects: { businessInstinct: -6, riskAwareness: 3 },
        isCautious: true,
      },
      {
        id: "negotiate-consignment",
        label:
          "Negotiate a consignment arrangement with your supplier: extra stock now, pay only for what sells.",
        consequenceHeadline: "The best of both worlds. +11 Street Smart",
        consequenceBody:
          "Your supplier agrees, since they trust the relationship. You stock generously for the holiday with almost none of the usual inventory risk.",
        whyItMatters:
          "Creative arrangements like consignment can let you capture upside from a seasonal opportunity without carrying the full financial risk yourself.",
        scoreEffect: 11,
        attributeEffects: {
          businessInstinct: 11,
          negotiation: 9,
          peopleSense: -2,
        },
        stateEffects: { income: 180000 },
      },
    ],
    tags: ["inventory", "seasonal", "planning"],
  },
  {
    id: "business-06",
    title: "Hiring Your First Employee",
    category: "business",
    difficulty: "medium",
    city: "Abuja",
    situation:
      "Your business has grown enough that you need help. Two candidates apply: one is a relative with limited experience but eager to learn; the other is a stranger with strong relevant experience and a higher salary expectation.",
    decisions: [
      {
        id: "hire-relative",
        label: "Hire your relative, prioritizing trust and family ties.",
        consequenceHeadline: "Familiar, with real limits. -2 Street Smart",
        consequenceBody:
          "The relative is loyal and easy to work with, but the learning curve slows down parts of the business that needed experienced hands immediately.",
        whyItMatters:
          "Hiring family brings trust, but skipping a genuine skills assessment for that trust can leave real gaps in a growing business.",
        scoreEffect: -2,
        attributeEffects: { businessInstinct: -4, peopleSense: 4 },
      },
      {
        id: "hire-experienced-stranger",
        label: "Hire the more experienced stranger, despite the higher cost.",
        consequenceHeadline: "A solid investment. +8 Street Smart",
        consequenceBody:
          "The new hire ramps up quickly and takes real ownership of a part of the business you didn't have time to manage well yourself.",
        whyItMatters:
          "For a role your business genuinely needs to perform well immediately, hiring for demonstrated skill usually pays for itself faster than the salary gap suggests.",
        scoreEffect: 8,
        attributeEffects: {
          businessInstinct: 9,
          financialSense: 3,
          peopleSense: -4,
        },
        stateEffects: { income: -80000 },
      },
      {
        id: "hire-relative-with-clear-terms",
        label:
          "Hire your relative, but set clear performance expectations and a trial period in writing.",
        consequenceHeadline: "The best of both considerations. +7 Street Smart",
        consequenceBody:
          "The clear terms help your relative take the role seriously, and the trial period gives you an honest way to assess fit without straining the family relationship.",
        whyItMatters:
          "Hiring family doesn't have to mean skipping structure — clear expectations protect both the business and the relationship.",
        scoreEffect: 7,
        attributeEffects: {
          businessInstinct: 8,
          peopleSense: 5,
          riskAwareness: -3,
        },
        stateEffects: { income: -50000 },
      },
      {
        id: "delay-hiring",
        label:
          "Delay hiring either candidate and keep managing everything yourself for now.",
        consequenceHeadline: "Caution has a growth cost. -5 Street Smart",
        consequenceBody:
          "You stay stretched thin, and the business misses opportunities it could have captured with an extra pair of capable hands.",
        whyItMatters:
          "At some point, refusing to delegate becomes the actual constraint on a growing business, not a safe default.",
        scoreEffect: -5,
        attributeEffects: { businessInstinct: -7, riskAwareness: 3 },
        isCautious: true,
      },
    ],
    tags: ["hiring", "employees", "growth"],
  },
  {
    id: "business-07",
    title: "The Partnership Offer",
    category: "business",
    difficulty: "hard",
    city: "Lagos",
    situation:
      "An investor offers ₦3 million to help scale your business, in exchange for a 40% equity stake. Your business is currently self-funded and growing steadily but slowly.",
    decisions: [
      {
        id: "accept-immediately",
        label: "Accept the offer as presented.",
        consequenceHeadline: "You gave up a lot for the cash. -5 Street Smart",
        consequenceBody:
          "The capital helps you grow faster, but you later realize 40% was a steep price for your business's actual valuation and growth trajectory.",
        whyItMatters:
          "Equity given away early is gone permanently — accepting the first number offered, without a valuation discussion, often means giving up more than necessary.",
        scoreEffect: -5,
        attributeEffects: {
          businessInstinct: -6,
          negotiation: -6,
          financialSense: -2,
          riskAwareness: 1,
        },
        stateEffects: { cash: 3000000 },
      },
      {
        id: "negotiate-terms",
        label:
          "Counter with a lower equity stake, backed by your own growth numbers and projections.",
        consequenceHeadline:
          "Confident, well-supported negotiation. +11 Street Smart",
        consequenceBody:
          "The investor respects the pushback and settles on 25% equity for the same investment, reflecting a fairer valuation of your existing traction.",
        whyItMatters:
          "Coming to an equity negotiation with your own numbers, rather than accepting the investor's framing, is how founders protect their long-term ownership.",
        scoreEffect: 11,
        attributeEffects: {
          negotiation: 11,
          businessInstinct: 8,
          financialSense: 5,
          peopleSense: -4,
        },
        stateEffects: { cash: 3000000 },
      },
      {
        id: "decline-stay-independent",
        label:
          "Decline the offer and continue growing organically without outside investment.",
        consequenceHeadline: "Safe, and slower. +1 Street Smart",
        consequenceBody:
          "You keep full ownership, but growth continues at the same steady, slower pace, and a competitor with fresh capital starts to pull ahead.",
        whyItMatters:
          "Staying independent protects full ownership, but it's worth weighing against the real cost of growing more slowly in a competitive market.",
        scoreEffect: 1,
        attributeEffects: { businessInstinct: -3, riskAwareness: 6 },
        isCautious: true,
      },
      {
        id: "seek-second-opinion-first",
        label:
          "Get a lawyer or accountant to review the deal and estimate a fair valuation before responding.",
        consequenceHeadline: "Diligence that pays for itself. +10 Street Smart",
        consequenceBody:
          "The review confirms the offer undervalues your business, giving you concrete numbers to negotiate a substantially better deal.",
        whyItMatters:
          "For a decision this consequential, professional input on valuation before negotiating is a small cost that usually improves the final terms significantly.",
        scoreEffect: 10,
        attributeEffects: {
          businessInstinct: 9,
          riskAwareness: 6,
          negotiation: 5,
        },
        stateEffects: { cash: -50000 },
      },
    ],
    tags: ["investment", "equity", "partnership", "negotiation"],
  },
  {
    id: "business-08",
    title: "Not Enough to Go Around",
    category: "business",
    difficulty: "hard",
    city: "Enugu",
    situation:
      "Cash is tight this month. You have just enough to either pay your two employees' full salaries on time, or pay your key supplier what's owed to keep future stock flowing, but not both in full.",
    decisions: [
      {
        id: "pay-supplier-delay-staff",
        label: "Pay the supplier in full, and delay staff salaries by a week.",
        consequenceHeadline:
          "Keeps the business running, strains trust. -3 Street Smart",
        consequenceBody:
          "Stock keeps flowing, but your employees are upset and one starts quietly job-hunting, since this isn't the first delay.",
        whyItMatters:
          "Protecting supply matters, but consistently delaying staff pay erodes trust and retention in ways that hurt the business just as much as a supply gap.",
        scoreEffect: -3,
        attributeEffects: { businessInstinct: 3, peopleSense: -8 },
      },
      {
        id: "pay-staff-negotiate-supplier",
        label:
          "Pay staff in full, and call the supplier to negotiate a short payment extension.",
        consequenceHeadline: "A balanced, honest approach. +9 Street Smart",
        consequenceBody:
          "Your staff stay motivated and loyal, and the supplier, informed early rather than left waiting, agrees to a one-week extension without penalty.",
        whyItMatters:
          "Proactively communicating a cash shortfall to a supplier, rather than simply going quiet, usually preserves the relationship far better than paying late without warning.",
        scoreEffect: 9,
        attributeEffects: {
          peopleSense: 8,
          negotiation: 7,
          businessInstinct: 6,
        },
      },
      {
        id: "split-both-partial",
        label: "Split what you have, paying both partially.",
        consequenceHeadline: "Nobody is fully satisfied. -4 Street Smart",
        consequenceBody:
          "Both your staff and your supplier are left uneasy by a partial payment with no clear explanation, and trust erodes with each side a little.",
        whyItMatters:
          "Splitting a shortfall without communicating the reasoning to either party often creates two smaller problems instead of solving one.",
        scoreEffect: -4,
        attributeEffects: { peopleSense: -4, businessInstinct: -3 },
      },
      {
        id: "short-term-loan",
        label:
          "Take a short-term loan to cover both obligations in full this month.",
        consequenceHeadline:
          "Solves the immediate gap, adds a new cost. +2 Street Smart",
        consequenceBody:
          "Everyone is paid on time, but the loan's interest becomes a new, smaller obligation to manage on top of everything else next month.",
        whyItMatters:
          "Borrowing to bridge a genuine short-term cash gap can be reasonable, but it should be a deliberate choice weighed against its cost, not just the easiest way to avoid a hard conversation.",
        scoreEffect: 2,
        attributeEffects: {
          businessInstinct: 3,
          financialSense: -3,
          riskAwareness: -2,
        },
        stateEffects: { debt: 150000 },
      },
    ],
    tags: ["cash-flow", "employees", "suppliers", "tradeoff"],
  },
  {
    id: "business-09",
    title: "Opening a Second Location",
    category: "business",
    difficulty: "hard",
    city: "Ibadan",
    situation:
      "Your first shop has been profitable for two years. A prime spot has opened up across town for a second location, but it would require most of your savings and a loan to set up properly.",
    decisions: [
      {
        id: "expand-immediately",
        label:
          "Commit to the second location right away, using savings and a loan.",
        consequenceHeadline: "An ambitious bet, unvetted. -6 Street Smart",
        consequenceBody:
          "The new location struggles more than expected — you hadn't verified there was enough demand in that specific area, and both locations feel the strain.",
        whyItMatters:
          "Expansion decisions this large deserve real market validation, not just enthusiasm about a good location — the first shop's success doesn't automatically transfer.",
        scoreEffect: -6,
        attributeEffects: {
          businessInstinct: -6,
          riskAwareness: -6,
          financialSense: -4,
        },
        stateEffects: { debt: 1200000, cash: -400000 },
      },
      {
        id: "validate-then-expand",
        label:
          "Spend a few weeks researching foot traffic and local demand in the new area before deciding.",
        consequenceHeadline: "Disciplined growth. +10 Street Smart",
        consequenceBody:
          "The research confirms strong demand, giving you the confidence to move forward, and the new location performs well from the start.",
        whyItMatters:
          "Validating demand before a major expansion turns an exciting opportunity into an informed bet, meaningfully improving its odds of success.",
        scoreEffect: 10,
        attributeEffects: {
          businessInstinct: 10,
          riskAwareness: 6,
          financialSense: 4,
        },
        stateEffects: { debt: 800000, cash: -300000 },
      },
      {
        id: "decline-stay-single-location",
        label:
          "Pass on the opportunity and keep focused on the single, profitable shop.",
        consequenceHeadline: "Safe, and possibly too safe. -2 Street Smart",
        consequenceBody:
          "The business stays stable, but a competitor takes the prime spot instead and captures a market you might have served.",
        whyItMatters:
          "Staying focused is a reasonable strategy, but consistently declining well-vetted growth opportunities has its own quiet cost over time.",
        scoreEffect: -2,
        attributeEffects: { riskAwareness: 5, businessInstinct: -6 },
        isCautious: true,
      },
      {
        id: "test-with-pop-up",
        label:
          "Test the new area first with a smaller pop-up or weekend stall before committing fully.",
        consequenceHeadline: "A smart, low-cost test. +9 Street Smart",
        consequenceBody:
          "The pop-up performs well enough to justify the full location, and you commit with real evidence instead of a guess.",
        whyItMatters:
          "Testing a big expansion decision on a small scale first is often the cheapest way to gather real evidence before a large financial commitment.",
        scoreEffect: 9,
        attributeEffects: { businessInstinct: 10, riskAwareness: 7 },
        stateEffects: { cash: -80000 },
      },
    ],
    tags: ["expansion", "growth", "risk-management"],
  },
  {
    id: "business-10",
    title: "The One-Star Review",
    category: "business",
    difficulty: "easy",
    city: "Kaduna",
    situation:
      "Your business gets a harsh one-star review online, accusing you of poor service in a situation you remember quite differently. Other customers can see the review and your response.",
    decisions: [
      {
        id: "respond-defensively",
        label:
          "Respond publicly, defending yourself and pointing out the customer's own mistakes.",
        consequenceHeadline: "It looks worse to onlookers. -6 Street Smart",
        consequenceBody:
          "Other potential customers reading the exchange see a business owner arguing publicly with a customer, regardless of who was actually right.",
        whyItMatters:
          "Public reviews are read by future customers as much as by the original reviewer — a defensive, argumentative response often does more damage than the original complaint.",
        scoreEffect: -6,
        attributeEffects: { businessInstinct: -6, peopleSense: -6 },
      },
      {
        id: "respond-professionally",
        label:
          "Respond calmly and professionally, acknowledging their experience and offering to resolve it privately.",
        consequenceHeadline: "This builds trust, not damage. +9 Street Smart",
        consequenceBody:
          "The tone of your response reassures other readers, and several customers later mention it was part of why they chose to trust your business.",
        whyItMatters:
          "A calm, solution-focused public response to criticism often builds more trust with future customers than the negative review costs.",
        scoreEffect: 9,
        attributeEffects: { businessInstinct: 8, peopleSense: 8 },
      },
      {
        id: "ignore-review",
        label: "Ignore the review and don't respond at all.",
        consequenceHeadline:
          "A missed chance to shape the story. -2 Street Smart",
        consequenceBody:
          "The one-sided review stays visible with no context or response, and a few potential customers mention it as a reason they went elsewhere.",
        whyItMatters:
          "Leaving a negative review completely unanswered forfeits an easy opportunity to show future customers how you handle problems.",
        scoreEffect: -2,
        attributeEffects: { businessInstinct: -3 },
        isCautious: true,
      },
      {
        id: "offer-refund-privately",
        label:
          "Message the customer privately to understand what happened and offer a fair resolution.",
        consequenceHeadline: "Direct and constructive. +7 Street Smart",
        consequenceBody:
          "The private conversation clears up a misunderstanding, and the customer updates the review to reflect the resolution.",
        whyItMatters:
          "Taking a dispute to a private conversation, rather than a public back-and-forth, often resolves the underlying issue while limiting public damage.",
        scoreEffect: 7,
        attributeEffects: { peopleSense: 8, businessInstinct: 5 },
      },
    ],
    tags: ["reputation", "customer-service", "online-reviews"],
  },
  {
    id: "business-11",
    title: "Money Missing From the Till",
    category: "business",
    difficulty: "hard",
    city: "Owerri",
    situation:
      "Over the past month, your till has been consistently short by small amounts. You strongly suspect it's one particular employee, but you don't have solid proof, only a pattern.",
    decisions: [
      {
        id: "accuse-directly",
        label: "Confront the employee directly and accuse them of stealing.",
        consequenceHeadline: "Risky without proof. -7 Street Smart",
        consequenceBody:
          "The employee denies it and is deeply offended. It later turns out the real cause was a mispriced item, and the accusation permanently damages the working relationship.",
        whyItMatters:
          "Accusing someone of theft based on a pattern rather than evidence risks real harm if you're wrong, and legal or relational consequences even if you're right.",
        scoreEffect: -7,
        attributeEffects: {
          businessInstinct: -6,
          peopleSense: -8,
          riskAwareness: -3,
        },
      },
      {
        id: "install-checks",
        label:
          "Quietly implement better tracking, like daily reconciliation and receipt checks, without accusing anyone.",
        consequenceHeadline: "Smart, low-risk investigation. +10 Street Smart",
        consequenceBody:
          "The improved tracking reveals the shortages were actually due to a pricing error at checkout, not theft at all — a much better outcome than a wrongful accusation.",
        whyItMatters:
          "Improving your own systems to gather real evidence protects you from accusing someone wrongly while still solving the underlying problem either way.",
        scoreEffect: 10,
        attributeEffects: { businessInstinct: 10, riskAwareness: 6 },
      },
      {
        id: "ignore-pattern",
        label: "Let it go, assuming it's probably nothing significant.",
        consequenceHeadline: "The gap keeps growing. -5 Street Smart",
        consequenceBody:
          "Without any investigation, the shortages continue and slowly add up to a meaningful loss over the following months.",
        whyItMatters:
          "A consistent, unexplained pattern in your finances is worth investigating regardless of the amount — small unexplained losses tend to compound.",
        scoreEffect: -5,
        attributeEffects: { businessInstinct: -6, financialSense: -4 },
        isCautious: true,
      },
      {
        id: "fire-suspected-employee",
        label:
          "Let the suspected employee go without a formal process, to be safe.",
        consequenceHeadline: "A harsh move without evidence. -9 Street Smart",
        consequenceBody:
          "Word spreads among your other staff that people can be dismissed without cause, and morale and trust take a visible hit.",
        whyItMatters:
          "Dismissing someone without evidence or a fair process, even from legitimate suspicion, can damage trust with your entire team, not just the person let go.",
        scoreEffect: -9,
        attributeEffects: { businessInstinct: -8, peopleSense: -9 },
      },
    ],
    tags: ["employees", "theft", "trust", "investigation"],
  },
  {
    id: "business-12",
    title: "The Exclusive Deal",
    category: "business",
    difficulty: "medium",
    city: "Benin City",
    situation:
      "A large retailer offers to buy your entire monthly production if you agree to sell exclusively to them, at a price slightly below what you currently earn selling to multiple smaller buyers.",
    decisions: [
      {
        id: "accept-exclusive",
        label: "Accept the exclusive deal for the guaranteed volume.",
        consequenceHeadline:
          "Stability, with a new dependency. +1 Street Smart",
        consequenceBody:
          "Income becomes more predictable, but you're now fully reliant on one buyer, who could change terms or walk away at any point in the future.",
        whyItMatters:
          "Guaranteed volume is valuable, but exclusivity concentrates your business risk into a single relationship — a real tradeoff, not a pure upgrade.",
        scoreEffect: 1,
        attributeEffects: { businessInstinct: 4, riskAwareness: -8 },
        stateEffects: { income: 40000 },
      },
      {
        id: "negotiate-partial-exclusivity",
        label:
          "Counter-offer with partial exclusivity, keeping a portion of production for existing buyers.",
        consequenceHeadline: "A well-balanced structure. +10 Street Smart",
        consequenceBody:
          "The retailer agrees to take 70% of production, leaving you both the guaranteed volume and a diversified customer base.",
        whyItMatters:
          "Negotiating partial rather than full exclusivity captures much of the stability benefit while keeping meaningful protection against over-reliance on one buyer.",
        scoreEffect: 10,
        attributeEffects: {
          negotiation: 10,
          businessInstinct: 8,
          riskAwareness: 4,
        },
        stateEffects: { income: 60000 },
      },
      {
        id: "decline-keep-diversified",
        label: "Decline and continue selling to multiple smaller buyers.",
        consequenceHeadline:
          "Safe, and you leave stability on the table. +3 Street Smart",
        consequenceBody:
          "Your risk stays low, but you miss the predictability and slightly higher guaranteed volume the deal would have offered.",
        whyItMatters:
          "Staying diversified protects you from over-reliance on one buyer, though it's worth weighing against the real value of a guaranteed volume deal.",
        scoreEffect: 3,
        attributeEffects: { riskAwareness: 6, businessInstinct: -3 },
        isCautious: true,
      },
      {
        id: "accept-with-exit-clause",
        label:
          "Accept the exclusive deal, but negotiate a clear exit clause in case terms change.",
        consequenceHeadline: "Stability with a safety net. +8 Street Smart",
        consequenceBody:
          "The retailer agrees to a 60-day exit clause, giving you the predictable income while protecting you from being locked in indefinitely.",
        whyItMatters:
          "An exit clause lets you capture the benefit of an exclusive arrangement while retaining the ability to leave if the relationship changes.",
        scoreEffect: 8,
        attributeEffects: {
          negotiation: 9,
          riskAwareness: 5,
          businessInstinct: 5,
        },
        stateEffects: { income: 40000 },
      },
    ],
    tags: ["contracts", "exclusivity", "negotiation", "risk-management"],
  },
  {
    id: "business-13",
    title: "A Family Member Wants In",
    category: "business",
    difficulty: "medium",
    city: "Jos",
    situation:
      "Your uncle asks to join your growing business as a partner, offering some capital but little relevant experience. Turning him down risks family tension; agreeing without structure risks the business.",
    decisions: [
      {
        id: "agree-no-structure",
        label: "Agree informally, without a written partnership agreement.",
        consequenceHeadline:
          "Family and business without boundaries. -8 Street Smart",
        consequenceBody:
          "Disagreements over decisions and profit-sharing emerge within months, with no agreement to fall back on, straining both the business and the family relationship.",
        whyItMatters:
          "Bringing in a partner, family or not, without clear written terms on roles, capital, and profit-sharing is one of the most common ways small businesses run into serious internal conflict.",
        scoreEffect: -8,
        attributeEffects: { businessInstinct: -9, peopleSense: -4 },
      },
      {
        id: "formal-agreement",
        label:
          "Welcome the capital, but insist on a clear written partnership agreement first.",
        consequenceHeadline:
          "Protects both business and family. +10 Street Smart",
        consequenceBody:
          "The agreement takes a little longer to draft, but it clearly defines roles and expectations, and the partnership starts on solid footing.",
        whyItMatters:
          "A written agreement isn't a sign of distrust — it's what allows a family business relationship to survive disagreements that would otherwise become personal.",
        scoreEffect: 10,
        attributeEffects: {
          businessInstinct: 10,
          negotiation: 6,
          peopleSense: 4,
        },
        stateEffects: { cash: 500000 },
      },
      {
        id: "decline-outright",
        label:
          "Decline the offer entirely to keep the business fully independent.",
        consequenceHeadline: "Safe, with some family strain. -1 Street Smart",
        consequenceBody:
          "You avoid partnership complications, but your uncle is hurt by the outright refusal, and family gatherings feel tense for a while afterward.",
        whyItMatters:
          "Declining to bring in a family partner is a legitimate choice, though delivering it thoughtfully matters as much as the decision itself.",
        scoreEffect: -1,
        attributeEffects: { riskAwareness: 4, peopleSense: -4 },
        isCautious: true,
      },
      {
        id: "offer-loan-instead",
        label:
          "Decline partnership, but offer to accept his capital as a structured loan with interest instead.",
        consequenceHeadline: "A thoughtful alternative. +7 Street Smart",
        consequenceBody:
          "Your uncle appreciates being included in the business's success without the complications of shared ownership, and the arrangement works smoothly.",
        whyItMatters:
          "Offering an alternative structure, like a loan instead of equity, can meet someone's underlying interest in being involved without the long-term risks of a poorly structured partnership.",
        scoreEffect: 7,
        attributeEffects: {
          businessInstinct: 8,
          negotiation: 6,
          peopleSense: 5,
        },
        stateEffects: { cash: 400000, debt: 400000 },
      },
    ],
    tags: ["family-business", "partnership", "agreements"],
  },
  {
    id: "business-14",
    title: "Stick to What Works",
    category: "business",
    difficulty: "medium",
    city: "Abeokuta",
    situation:
      "Your catering business is doing well with a focused menu. A client asks if you can also handle full event decoration for their upcoming wedding, an entirely different skill set, for significantly more money.",
    decisions: [
      {
        id: "take-it-on-unprepared",
        label: "Accept and figure out the decoration side as you go.",
        consequenceHeadline: "Stretched too thin. -8 Street Smart",
        consequenceBody:
          "The decoration falls short of the client's expectations, and while the catering itself was excellent, the overall impression, and your reputation, takes a hit.",
        whyItMatters:
          "Taking on unfamiliar work purely for the money, without the skill or capacity to deliver it well, can damage the reputation of the business you've already built.",
        scoreEffect: -8,
        attributeEffects: { businessInstinct: -8, riskAwareness: -5 },
        stateEffects: { reputation: -10, cash: 200000 },
      },
      {
        id: "decline-and-refer",
        label:
          "Decline the decoration work, but refer the client to a trusted decorator you know.",
        consequenceHeadline: "Focus with a thoughtful gesture. +9 Street Smart",
        consequenceBody:
          "The client appreciates the referral and books both your catering and the decorator, and the decorator later refers clients back to you too.",
        whyItMatters:
          "Staying focused on what you do well, while still helping the client find a solution, protects your reputation and can build a valuable referral relationship.",
        scoreEffect: 9,
        attributeEffects: { businessInstinct: 9, peopleSense: 6 },
        stateEffects: { cash: 250000 },
      },
      {
        id: "partner-with-decorator",
        label:
          "Partner with an established decorator for this event, splitting the added revenue.",
        consequenceHeadline:
          "Expanded capability without overreaching. +10 Street Smart",
        consequenceBody:
          "The event goes smoothly, with each of you handling what you do best, and the client is thoroughly impressed with the combined result.",
        whyItMatters:
          "Partnering with a specialist lets you say yes to a bigger opportunity without pretending to have skills you don't actually have.",
        scoreEffect: 10,
        attributeEffects: { businessInstinct: 11, negotiation: 6 },
        stateEffects: { cash: 300000 },
      },
      {
        id: "decline-no-referral",
        label: "Simply decline, without offering any alternative.",
        consequenceHeadline:
          "Safe, but a missed relationship builder. +2 Street Smart",
        consequenceBody:
          "You avoid the risk of overreaching, but the client is left to figure out decoration on their own, missing a chance to strengthen the relationship further.",
        whyItMatters:
          "Declining unfamiliar work is sound, but a small extra effort to help the client solve the rest of their problem often pays off later.",
        scoreEffect: 2,
        attributeEffects: { riskAwareness: 4, businessInstinct: 1 },
        isCautious: true,
      },
    ],
    tags: ["scope", "focus", "growth", "reputation"],
  },
];
