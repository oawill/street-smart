import { Scenario } from "@/types/game";

export const everydayScenarios: Scenario[] = [
  {
    id: "everyday-01",
    title: "The Electrician's Estimate",
    category: "everyday",
    difficulty: "easy",
    city: "Lagos",
    situation:
      "Your home's wiring needs repair after a minor fault. An electrician arrives, looks around, and starts working immediately without giving you a price, saying \"we'll settle after.\"",
    decisions: [
      {
        id: "let-him-work-no-price",
        label: "Let him continue without agreeing on a price first.",
        consequenceHeadline:
          "Open-ended pricing rarely favors you. -6 Street Smart",
        consequenceBody:
          "When the work is done, he quotes an amount well above what similar repairs typically cost, and without an agreed price, you're stuck negotiating from a weak position.",
        whyItMatters:
          "Agreeing on a price before work begins is one of the simplest ways to avoid a dispute afterward, when the leverage has already shifted to whoever did the work.",
        scoreEffect: -6,
        attributeEffects: {
          negotiation: -6,
          financialSense: -4,
          riskAwareness: 1,
        },
        stateEffects: { cash: -25000 },
      },
      {
        id: "agree-price-first",
        label: "Stop him and agree on a clear price before he continues.",
        consequenceHeadline: "Simple and effective. +7 Street Smart",
        consequenceBody:
          "You settle on ₦12,000 upfront. The work finishes with no dispute, since both of you knew exactly what to expect.",
        whyItMatters:
          "A clear price agreed before work starts protects both you and the service provider from misunderstandings once the job is done.",
        scoreEffect: 7,
        attributeEffects: {
          negotiation: 8,
          financialSense: 5,
          peopleSense: -4,
        },
        stateEffects: { cash: -12000 },
      },
      {
        id: "send-him-away",
        label: "Send him away entirely for not quoting a price upfront.",
        consequenceHeadline:
          "A steep response to a fixable issue. -2 Street Smart",
        consequenceBody:
          "The fault remains unrepaired, and you have to start the search for another electrician from scratch, delaying a fix your home actually needs.",
        whyItMatters:
          "Not quoting a price upfront is a fair thing to flag, but simply asking him to quote one first would likely have solved the same problem without starting over.",
        scoreEffect: -2,
        attributeEffects: { negotiation: -2, riskAwareness: 3 },
      },
      {
        id: "get-second-electrician-quote",
        label:
          "Pause the work and get a second electrician's quote before proceeding.",
        consequenceHeadline: "Thorough, though it adds delay. +5 Street Smart",
        consequenceBody:
          "The second quote confirms a fair price range, and you proceed with the first electrician at an agreed amount, though the fault stays unrepaired a bit longer.",
        whyItMatters:
          "Comparing quotes is a sound habit for larger jobs, though for smaller repairs, simply agreeing on a price upfront is usually enough.",
        scoreEffect: 5,
        attributeEffects: {
          negotiation: 6,
          financialSense: 4,
          peopleSense: -3,
        },
        stateEffects: { cash: -13000 },
      },
    ],
    tags: ["artisan", "home-repair", "pricing"],
  },
  {
    id: "everyday-02",
    title: "Buying a Used Car, In Person",
    category: "everyday",
    difficulty: "medium",
    city: "Ibadan",
    situation:
      "You're buying a used car privately for ₦2.8 million. The seller is friendly and the car looks clean, but you have no real mechanical expertise yourself.",
    decisions: [
      {
        id: "buy-on-appearance",
        label:
          "Buy it based on how it looks and drives during a short test drive.",
        consequenceHeadline: "Looks can hide real problems. -8 Street Smart",
        consequenceBody:
          "Within a month, a costly engine issue surfaces that a proper inspection would likely have caught before the purchase.",
        whyItMatters:
          "A short test drive and a clean appearance can hide mechanical issues that only a trained inspection would reveal — for a purchase this size, that gap matters.",
        scoreEffect: -8,
        attributeEffects: {
          riskAwareness: -8,
          financialSense: -6,
          peopleSense: 1,
        },
        stateEffects: { cash: -2800000, debt: 300000 },
      },
      {
        id: "hire-independent-mechanic",
        label:
          "Pay an independent mechanic to inspect the car before finalizing the purchase.",
        consequenceHeadline: "A small cost, real protection. +9 Street Smart",
        consequenceBody:
          "The mechanic finds a minor issue you use to negotiate a fair price reduction, and you buy with real confidence in the car's condition.",
        whyItMatters:
          "An independent mechanical inspection is standard practice for used car purchases and is a small cost relative to the risk it protects against.",
        scoreEffect: 9,
        attributeEffects: {
          riskAwareness: 9,
          negotiation: 6,
          financialSense: 4,
          peopleSense: -4,
        },
        stateEffects: { cash: -2750000 },
      },
      {
        id: "trust-seller-word",
        label: "Trust the seller's word that the car has no issues.",
        consequenceHeadline: "His word wasn't verification. -7 Street Smart",
        consequenceBody:
          "The seller may not even have known about a developing issue himself, but either way, taking his word wasn't a substitute for actually checking.",
        whyItMatters:
          "Even a well-meaning seller's word isn't the same as an independent check — sellers often aren't aware of every issue themselves.",
        scoreEffect: -7,
        attributeEffects: {
          riskAwareness: -7,
          financialSense: -4,
          peopleSense: 2,
        },
        stateEffects: { cash: -2800000, debt: 200000 },
      },
      {
        id: "ask-for-service-history",
        label:
          "Ask to see the car's service history and documentation before deciding.",
        consequenceHeadline: "A reasonable, if partial, check. +5 Street Smart",
        consequenceBody:
          "The service history looks reasonably consistent, giving you more confidence, though it's still not as thorough as a hands-on mechanical inspection.",
        whyItMatters:
          "Service history is useful evidence, but it's a good complement to, not a replacement for, an independent physical inspection.",
        scoreEffect: 5,
        attributeEffects: {
          riskAwareness: 5,
          financialSense: 3,
          peopleSense: -2,
        },
        stateEffects: { cash: -2800000 },
      },
    ],
    tags: ["car-purchase", "inspection", "used-goods"],
  },
  {
    id: "everyday-03",
    title: "The Relative Who Always Needs Help",
    category: "everyday",
    difficulty: "medium",
    city: "Enugu",
    situation:
      "A distant relative calls asking for ₦30,000, the third such request this year. Each time the reason is different and plausible, and each time you've given without discussing a pattern.",
    decisions: [
      {
        id: "give-again-no-discussion",
        label: "Send the money again without addressing the pattern.",
        consequenceHeadline: "The pattern continues unchecked. -3 Street Smart",
        consequenceBody:
          "You help this time too, but with no conversation about the frequency, the requests continue to arrive every few months, always with a new reason.",
        whyItMatters:
          "Repeatedly giving without ever discussing a growing pattern tends to reinforce that pattern rather than resolve it.",
        scoreEffect: -3,
        attributeEffects: { peopleSense: 3, financialSense: -6 },
        stateEffects: { cash: -30000 },
        setFlags: { relativeRepeatedRequests: true, relativeRequestCount: 3 },
      },
      {
        id: "give-with-honest-conversation",
        label:
          "Send the money, but have an honest conversation about how often this has been happening.",
        consequenceHeadline: "Generous and clear. +9 Street Smart",
        consequenceBody:
          "The conversation is a little uncomfortable, but your relative understands, and future requests become noticeably less frequent and more genuinely urgent.",
        whyItMatters:
          "Combining generosity with an honest conversation about a pattern tends to preserve both the relationship and your own financial boundaries.",
        scoreEffect: 9,
        attributeEffects: {
          peopleSense: 8,
          negotiation: 6,
          financialSense: 4,
          businessInstinct: -4,
        },
        stateEffects: { cash: -30000 },
        setFlags: { relativeBoundarySet: true },
      },
      {
        id: "decline-this-time",
        label:
          "Decline this time, explaining you need to prioritize your own finances.",
        consequenceHeadline:
          "A fair boundary, some initial friction. +4 Street Smart",
        consequenceBody:
          "Your relative is disappointed, but the boundary is respected, and future requests come less frequently and only for genuine needs.",
        whyItMatters:
          "Setting a boundary, even an uncomfortable one, is a legitimate response to a pattern that's grown beyond what's sustainable for you.",
        scoreEffect: 4,
        attributeEffects: { financialSense: 6, peopleSense: -3 },
        isCautious: true,
      },
      {
        id: "give-but-resent-silently",
        label:
          "Send the money, but feel increasingly resentful without ever saying anything.",
        consequenceHeadline:
          "Unspoken resentment helps no one. -5 Street Smart",
        consequenceBody:
          "You help again, but the silent frustration builds, eventually spilling out in an unrelated argument months later that damages the relationship anyway.",
        whyItMatters:
          "Suppressing frustration instead of addressing it directly tends to create bigger relational damage later than an honest conversation would have.",
        scoreEffect: -5,
        attributeEffects: {
          peopleSense: -5,
          financialSense: -3,
          riskAwareness: 2,
        },
        stateEffects: { cash: -30000 },
        setFlags: { relativeRepeatedRequests: true, relativeRequestCount: 3 },
      },
    ],
    tags: ["family", "boundaries", "lending"],
  },
  {
    id: "everyday-03b",
    title: "The Requests Keep Coming",
    category: "everyday",
    difficulty: "medium",
    city: "Enugu",
    situation:
      "Months later, the same relative calls again, this time asking for ₦60,000, twice the usual amount, still with no acknowledgment that this has become a frequent pattern.",
    decisions: [
      {
        id: "finally-address-pattern",
        label:
          "Address the pattern directly this time, and offer a smaller, final amount as a one-time close.",
        consequenceHeadline: "Overdue, but well handled. +9 Street Smart",
        consequenceBody:
          "The conversation is difficult but honest. Your relative is surprised but ultimately respects the clarity, and the frequent requests stop.",
        whyItMatters:
          "It's never too late to address a pattern directly — a clear, honest conversation, even a delayed one, can still reset an unsustainable dynamic.",
        scoreEffect: 9,
        attributeEffects: {
          peopleSense: 8,
          negotiation: 7,
          financialSense: 5,
          businessInstinct: -2,
        },
        stateEffects: { cash: -15000 },
      },
      {
        id: "send-full-amount-again",
        label: "Send the full ₦60,000 again without comment.",
        consequenceHeadline: "The pattern deepens further. -8 Street Smart",
        consequenceBody:
          "The amounts requested keep growing each time, and your finances are increasingly shaped around a dynamic you've never actually addressed.",
        whyItMatters:
          "A pattern of increasing requests, left unaddressed for long enough, tends to keep escalating rather than resolving on its own.",
        scoreEffect: -8,
        attributeEffects: {
          financialSense: -9,
          negotiation: -5,
          riskAwareness: 3,
        },
        stateEffects: { cash: -60000 },
      },
      {
        id: "decline-completely",
        label: "Decline entirely this time, with no further explanation.",
        consequenceHeadline:
          "Understandable, delivered abruptly. -1 Street Smart",
        consequenceBody:
          "The relationship becomes noticeably strained, since the sudden hard stop, after months of unaddressed requests, feels jarring rather than principled.",
        whyItMatters:
          "A boundary is more likely to be understood and respected when it's explained, rather than delivered as a sudden, unexplained refusal after months of compliance.",
        scoreEffect: -1,
        attributeEffects: { financialSense: 4, peopleSense: -6 },
        isCautious: true,
      },
      {
        id: "involve-family-elder",
        label:
          "Ask a respected family elder to help mediate a conversation about the pattern.",
        consequenceHeadline: "A culturally sound approach. +6 Street Smart",
        consequenceBody:
          "The elder's involvement helps the conversation land more gently, and the relative agrees to stop treating you as a default source of emergency funds.",
        whyItMatters:
          "In many family contexts, involving a trusted, respected mediator can make a difficult financial conversation land better than having it alone.",
        scoreEffect: 6,
        attributeEffects: {
          peopleSense: 7,
          negotiation: 4,
          businessInstinct: -3,
        },
        stateEffects: { cash: -20000 },
      },
    ],
    tags: ["family", "boundaries", "consequence"],
    requiresFlags: ["relativeRepeatedRequests"],
    isDelayedConsequence: true,
  },
  {
    id: "everyday-04",
    title: "The Overnight Bus",
    category: "everyday",
    difficulty: "easy",
    city: "Kano",
    situation:
      "You need to travel overnight to another city. A licensed transport company charges ₦18,000, while an unmarked vehicle offers the same trip for ₦8,000, leaving immediately.",
    decisions: [
      {
        id: "take-cheap-unmarked",
        label: "Take the cheaper, unmarked vehicle to save money.",
        consequenceHeadline: "The savings came with real risk. -7 Street Smart",
        consequenceBody:
          "The vehicle is poorly maintained and overloaded, and the trip is stressful and unsafe, though you do arrive without major incident this time.",
        whyItMatters:
          "Unlicensed transport often cuts corners on vehicle maintenance, driver vetting, and insurance — the savings frequently come from reduced safety, not efficiency.",
        scoreEffect: -7,
        attributeEffects: { riskAwareness: -8, financialSense: 2 },
        stateEffects: { cash: -8000 },
      },
      {
        id: "take-licensed-company",
        label:
          "Pay the higher price for the licensed, regulated transport company.",
        consequenceHeadline: "Worth the extra cost. +7 Street Smart",
        consequenceBody:
          "The trip is safe, comfortable, and on schedule, with proper insurance and a well-maintained vehicle.",
        whyItMatters:
          "For overnight travel especially, the price difference between licensed and unlicensed transport is often a reasonable premium for real safety.",
        scoreEffect: 7,
        attributeEffects: {
          riskAwareness: 8,
          financialSense: 2,
          peopleSense: -2,
        },
        stateEffects: { cash: -18000 },
        isCautious: true,
      },
      {
        id: "travel-during-day-instead",
        label:
          "Delay the trip by a day to travel during daylight with the cheaper option.",
        consequenceHeadline: "A reasonable compromise. +5 Street Smart",
        consequenceBody:
          "Daytime travel with the cheaper operator is noticeably safer than the overnight equivalent would have been, at a lower cost than the licensed company.",
        whyItMatters:
          "When cost is a real constraint, shifting travel to safer conditions, like daylight hours, can reduce risk without paying the full premium price.",
        scoreEffect: 5,
        attributeEffects: {
          riskAwareness: 5,
          financialSense: 4,
          peopleSense: -4,
        },
        stateEffects: { cash: -8000 },
      },
      {
        id: "ask-around-for-recommendations",
        label:
          "Ask others for recommendations on a reliable mid-priced operator before deciding.",
        consequenceHeadline: "Good use of local knowledge. +6 Street Smart",
        consequenceBody:
          "A recommended operator offers a fair balance of safety and price, at ₦13,000, and the trip goes smoothly.",
        whyItMatters:
          "Local recommendations can reveal safe, reasonably priced options that aren't obvious from price alone.",
        scoreEffect: 6,
        attributeEffects: {
          riskAwareness: 6,
          financialSense: 4,
          peopleSense: -3,
        },
        stateEffects: { cash: -13000 },
      },
    ],
    tags: ["travel", "safety", "transport"],
  },
  {
    id: "everyday-05",
    title: "The Flooded Shop",
    category: "everyday",
    difficulty: "medium",
    city: "Port Harcourt",
    situation:
      "Heavy rains flood your small shop overnight, damaging roughly ₦400,000 worth of stock. You have a basic insurance policy, but you're not sure flood damage is covered, and filing a claim takes time you don't have if sales don't resume soon.",
    decisions: [
      {
        id: "absorb-loss-restart",
        label:
          "Skip the insurance claim entirely and use savings to restock quickly.",
        consequenceHeadline:
          "Fast, but you may have left money unclaimed. -3 Street Smart",
        consequenceBody:
          "The shop reopens quickly, but you later learn flood damage was actually covered under your policy, and you never tried to claim it.",
        whyItMatters:
          "Assuming a claim won't be covered, without actually checking, can mean leaving money you're entitled to completely unclaimed.",
        scoreEffect: -3,
        attributeEffects: { financialSense: -5, businessInstinct: 3 },
        stateEffects: { cash: -400000 },
      },
      {
        id: "file-claim-and-partial-restock",
        label:
          "File the insurance claim immediately, and use limited savings to restock the most essential items while it processes.",
        consequenceHeadline: "A balanced, informed response. +9 Street Smart",
        consequenceBody:
          "The claim is accepted, covering most of the loss over the following weeks, while a partial restock keeps the shop generating some income in the meantime.",
        whyItMatters:
          "Filing a claim right away while taking practical steps to keep operating captures both the insurance benefit and the urgency of staying in business.",
        scoreEffect: 9,
        attributeEffects: {
          businessInstinct: 9,
          financialSense: 7,
          riskAwareness: 4,
          peopleSense: -2,
        },
        stateEffects: { cash: -150000 },
      },
      {
        id: "wait-for-claim-fully",
        label:
          "Wait fully for the claim to process before restocking anything.",
        consequenceHeadline:
          "Financially cautious, costly delay. -5 Street Smart",
        consequenceBody:
          "The claim eventually pays out, but weeks of closure mean lost sales and some regular customers who found alternatives in the meantime.",
        whyItMatters:
          "Waiting entirely for a claim to resolve protects cash in the short term, but a shop that stays closed too long can lose more in ongoing revenue than the delay saves.",
        scoreEffect: -5,
        attributeEffects: { businessInstinct: -7, riskAwareness: 4 },
        isCautious: true,
      },
      {
        id: "borrow-to-restock-fully",
        label:
          "Take a loan to fully restock immediately, without waiting on the insurance claim.",
        consequenceHeadline: "Fast recovery, added cost. +1 Street Smart",
        consequenceBody:
          "The shop reopens at full capacity quickly, though the loan's interest adds an avoidable cost on top of a claim that would likely have covered much of it.",
        whyItMatters:
          "Borrowing to move fast can make sense, but it's worth checking what your insurance actually covers first, since it may make some of that borrowing unnecessary.",
        scoreEffect: 1,
        attributeEffects: { businessInstinct: 4, financialSense: -4 },
        stateEffects: { debt: 250000 },
      },
    ],
    tags: ["emergency", "insurance", "small-business", "flood"],
  },
  {
    id: "everyday-06",
    title: "The Checkpoint Request",
    category: "everyday",
    difficulty: "hard",
    city: "Onitsha",
    situation:
      'At a routine checkpoint, an official hints that a small "gift" would help your documents get checked "quickly," even though your papers are fully in order and there\'s no actual issue.',
    decisions: [
      {
        id: "pay-the-gift",
        label: "Pay the small amount to move along quickly.",
        consequenceHeadline: "It reinforces the practice. -4 Street Smart",
        consequenceBody:
          "You're on your way faster, but the exchange reinforces the expectation for the next traveler, who may be pressured even when their papers aren't in order at all.",
        whyItMatters:
          'Paying an unofficial "gift" for something you\'re already entitled to, even a small one, quietly reinforces a practice with real costs for others.',
        scoreEffect: -4,
        attributeEffects: { riskAwareness: 2, financialSense: -2 },
        stateEffects: { cash: -2000 },
      },
      {
        id: "politely-insist-on-process",
        label:
          "Politely but firmly insist on the standard process, since your documents are already in order.",
        consequenceHeadline: "Calm and within your rights. +8 Street Smart",
        consequenceBody:
          "It takes a few extra minutes of patience, but your documents are checked properly with no payment made, and you continue on your way.",
        whyItMatters:
          "Since your documents were genuinely valid, calmly insisting on the standard process, without paying anything extra, is both your right and the more sustainable long-term response.",
        scoreEffect: 8,
        attributeEffects: { riskAwareness: 7, negotiation: 5, peopleSense: -4 },
      },
      {
        id: "argue-aggressively",
        label:
          "Argue loudly and accuse the official of corruption on the spot.",
        consequenceHeadline: "Right instinct, risky delivery. -5 Street Smart",
        consequenceBody:
          "The confrontation escalates unnecessarily and delays you far longer than a calmer approach would have, with some real personal risk in the moment.",
        whyItMatters:
          "Standing firm on a legitimate point doesn't require confrontation — a calm, respectful approach usually achieves the same result with far less personal risk.",
        scoreEffect: -5,
        attributeEffects: {
          riskAwareness: -6,
          negotiation: -3,
          peopleSense: 2,
        },
      },
      {
        id: "document-and-report-later",
        label:
          "Pay the small amount to avoid delay, but note the details to report to the relevant oversight body later.",
        consequenceHeadline:
          "Pragmatic in the moment, follow-through matters. +3 Street Smart",
        consequenceBody:
          "You're on your way quickly, and the follow-up report you file afterward contributes to a documented pattern that oversight bodies do track.",
        whyItMatters:
          "When walking away isn't practical in the moment, documenting the incident and reporting it afterward channels the frustration into something that can actually create accountability.",
        scoreEffect: 3,
        attributeEffects: { riskAwareness: 3, negotiation: 2, peopleSense: -2 },
        stateEffects: { cash: -2000 },
      },
    ],
    tags: ["corruption", "civic-life", "checkpoint"],
  },
  {
    id: "everyday-07",
    title: "The Asoebi Pressure",
    category: "everyday",
    difficulty: "easy",
    city: "Abeokuta",
    situation:
      "A cousin's wedding requires buying an asoebi (matching outfit fabric) for ₦45,000, more than you'd budgeted for, with clear social expectation that all close family will participate.",
    decisions: [
      {
        id: "buy-full-price-anyway",
        label: "Buy it at full price despite the budget strain.",
        consequenceHeadline:
          "Social harmony, real financial strain. -3 Street Smart",
        consequenceBody:
          "You fit in seamlessly at the event, but the unplanned expense means cutting into money set aside for something else that month.",
        whyItMatters:
          "Social obligations are real, but consistently letting them override your own budget without any adjustment can quietly derail your finances.",
        scoreEffect: -3,
        attributeEffects: { peopleSense: 4, financialSense: -6 },
        stateEffects: { cash: -45000 },
      },
      {
        id: "talk-to-family-about-cost",
        label:
          "Talk honestly with close family about the cost and see if a lower-cost option is possible.",
        consequenceHeadline: "Honest and resourceful. +7 Street Smart",
        consequenceBody:
          "You learn a simpler, cheaper version of the outfit is genuinely acceptable, and you attend fully included at a fraction of the original cost.",
        whyItMatters:
          "Social expectations around cost are often more flexible than they first appear — an honest conversation can reveal options you didn't know existed.",
        scoreEffect: 7,
        attributeEffects: {
          peopleSense: 6,
          financialSense: 6,
          negotiation: 4,
          businessInstinct: -4,
        },
        stateEffects: { cash: -18000 },
      },
      {
        id: "skip-asoebi-entirely",
        label: "Skip buying it entirely and attend in your own clothing.",
        consequenceHeadline:
          "Financially sound, socially noticeable. +2 Street Smart",
        consequenceBody:
          "You save the money, but stand out visibly at the event, and a few relatives make pointed comments about it.",
        whyItMatters:
          "Protecting your budget is a fair priority, though it's worth weighing the real social cost in contexts where participation carries genuine weight.",
        scoreEffect: 2,
        attributeEffects: { financialSense: 5, peopleSense: -5 },
        isCautious: true,
      },
      {
        id: "buy-cheaper-alternative-fabric",
        label:
          "Buy a similar-looking but more affordable fabric on your own, without discussing it with the family group.",
        consequenceHeadline: "A workable middle ground. +4 Street Smart",
        consequenceBody:
          "The lower-cost version looks close enough that it goes largely unnoticed, and you save a meaningful amount without any awkward conversation.",
        whyItMatters:
          "Finding your own reasonable middle ground can satisfy both the social expectation and your budget, without needing anyone's permission to do so.",
        scoreEffect: 4,
        attributeEffects: { financialSense: 5, peopleSense: 1 },
        stateEffects: { cash: -20000 },
      },
    ],
    tags: ["social-obligation", "wedding", "budgeting"],
  },
  {
    id: "everyday-08",
    title: "The Noisy New Neighbor",
    category: "everyday",
    difficulty: "medium",
    city: "Jos",
    situation:
      "A new neighbor moved in and regularly plays loud music late into the night. You have work early each morning and it's affecting your sleep.",
    decisions: [
      {
        id: "confront-angrily",
        label: "Bang on their door late at night and confront them angrily.",
        consequenceHeadline:
          "It escalates rather than resolves. -5 Street Smart",
        consequenceBody:
          "The confrontation turns into a shouting match, and the neighbor, now defensive, plays music even louder out of spite the following nights.",
        whyItMatters:
          "An angry, late-night confrontation tends to put people on the defensive rather than inviting cooperation, often making the underlying problem worse.",
        scoreEffect: -5,
        attributeEffects: { peopleSense: -7, negotiation: -3 },
      },
      {
        id: "friendly-conversation-daytime",
        label:
          "Approach them during the day for a calm, friendly conversation about it.",
        consequenceHeadline: "Simple and it worked. +8 Street Smart",
        consequenceBody:
          "The neighbor apologizes, unaware it had been an issue, and agrees to keep the volume down after a certain hour going forward.",
        whyItMatters:
          "Most neighbor conflicts resolve more easily through a calm, direct conversation at a reasonable time than through confrontation or silent frustration.",
        scoreEffect: 8,
        attributeEffects: { peopleSense: 9, negotiation: 5 },
      },
      {
        id: "suffer-silently",
        label: "Say nothing and just try to cope with the noise.",
        consequenceHeadline:
          "The problem persists, unaddressed. -4 Street Smart",
        consequenceBody:
          "Sleep continues to suffer for weeks, affecting your work performance, since the neighbor has no idea it's even an issue.",
        whyItMatters:
          "A fixable problem left unaddressed simply continues — most people can't resolve a conflict they don't know exists.",
        scoreEffect: -4,
        attributeEffects: { peopleSense: -3, riskAwareness: -2 },
        isCautious: true,
      },
      {
        id: "involve-landlord-first",
        label:
          "Skip talking to the neighbor directly and go straight to the landlord to complain.",
        consequenceHeadline:
          "Escalated before trying the simple route. -1 Street Smart",
        consequenceBody:
          "The landlord's involvement resolves the noise, but the neighbor feels blindsided by not being approached directly first, creating some lingering tension.",
        whyItMatters:
          "Going over someone's head before giving them a chance to fix a simple, unintentional issue directly often creates unnecessary friction.",
        scoreEffect: -1,
        attributeEffects: { peopleSense: -3, negotiation: 2 },
      },
    ],
    tags: ["neighbors", "conflict-resolution", "communication"],
  },
  {
    id: "everyday-09",
    title: "Hiring House Help",
    category: "everyday",
    difficulty: "medium",
    city: "Lagos",
    situation:
      "You need to hire a live-in house help. An agency offers a candidate quickly for a fee, but skipping a background or reference check would speed things up further.",
    decisions: [
      {
        id: "skip-checks-hire-fast",
        label: "Hire quickly without any background or reference checks.",
        consequenceHeadline: "Speed over safety. -8 Street Smart",
        consequenceBody:
          "Weeks later, small items go missing from the house, and only then do you learn the agency's own vetting for this candidate had been minimal.",
        whyItMatters:
          "Someone living in your home with access to your family and belongings deserves the same diligence as any other high-trust decision — skipping it for speed carries real risk.",
        scoreEffect: -8,
        attributeEffects: { riskAwareness: -9, peopleSense: -3 },
        stateEffects: { cash: -30000 },
      },
      {
        id: "verify-references-and-id",
        label:
          "Take the extra time to verify references and formal identification before hiring.",
        consequenceHeadline: "Thorough and appropriate. +9 Street Smart",
        consequenceBody:
          "The references check out well, and you hire with real confidence, building a trusted, long-term working relationship.",
        whyItMatters:
          "For someone who will live in your home and have access to your family, verifying references and identity is a reasonable, standard precaution, not an insult.",
        scoreEffect: 9,
        attributeEffects: { riskAwareness: 9, peopleSense: 5 },
      },
      {
        id: "hire-through-known-recommendation",
        label:
          "Ask trusted friends or family for a personal recommendation instead of using the agency.",
        consequenceHeadline: "A strong alternative approach. +7 Street Smart",
        consequenceBody:
          "A friend's long-time house help recommends a relative, vetted by that existing trust, and the hire works out very well.",
        whyItMatters:
          "Personal recommendations from people who've had a good long-term experience often carry more real signal than a quick agency placement.",
        scoreEffect: 7,
        attributeEffects: { riskAwareness: 6, peopleSense: 6 },
      },
      {
        id: "hire-with-trial-period",
        label:
          "Hire through the agency, but set a short paid trial period before committing long-term.",
        consequenceHeadline: "A sensible middle ground. +6 Street Smart",
        consequenceBody:
          "The trial period goes smoothly, and you extend the arrangement with growing confidence based on direct experience rather than paperwork alone.",
        whyItMatters:
          "A trial period lets you build real evidence about fit and trustworthiness before making a longer commitment, without needing to fully vet everything upfront.",
        scoreEffect: 6,
        attributeEffects: { riskAwareness: 6, peopleSense: 4 },
      },
    ],
    tags: ["hiring", "household", "trust", "vetting"],
  },
  {
    id: "everyday-10",
    title: "The Stranded Stranger",
    category: "everyday",
    difficulty: "medium",
    city: "Kaduna",
    situation:
      "Late in the evening, a stranger flags you down on a quiet road, saying their car broke down and asking for a ride to the next town, or for cash for a taxi.",
    decisions: [
      {
        id: "give-ride-immediately",
        label: "Let them into your car and drive them yourself.",
        consequenceHeadline:
          "It works out, but the risk was real. +1 Street Smart",
        consequenceBody:
          "The stranger turns out to be genuinely stranded and grateful, but picking up an unknown person alone at night carries risk regardless of how this particular instance turned out.",
        whyItMatters:
          "A good outcome doesn't mean a decision was low-risk — picking up strangers alone, especially at night, carries real uncertainty about who you're actually helping.",
        scoreEffect: 1,
        attributeEffects: { peopleSense: 4, riskAwareness: -6 },
      },
      {
        id: "offer-cash-not-ride",
        label:
          "Offer a reasonable amount of cash for a taxi, without offering a ride yourself.",
        consequenceHeadline:
          "Generous, without the physical risk. +8 Street Smart",
        consequenceBody:
          "The stranger accepts gratefully, and you've helped meaningfully while keeping a reasonable boundary around your own safety.",
        whyItMatters:
          "Helping someone doesn't require accepting the specific risk they suggest — offering an alternative form of help can meet the same need more safely.",
        scoreEffect: 8,
        attributeEffects: { peopleSense: 7, riskAwareness: 6 },
        stateEffects: { cash: -3000 },
      },
      {
        id: "drive-past-no-help",
        label: "Drive past without stopping at all.",
        consequenceHeadline:
          "Safe, and a genuine need went unmet. -1 Street Smart",
        consequenceBody:
          "You stay completely safe, but you also never find out whether it was a genuine emergency you could have helped with at low personal risk.",
        whyItMatters:
          "Caution about strangers at night is reasonable, but a complete refusal to help in any form, even a lower-risk one, has its own quiet cost.",
        scoreEffect: -1,
        attributeEffects: { riskAwareness: 4, peopleSense: -4 },
        isCautious: true,
      },
      {
        id: "call-help-on-their-behalf",
        label:
          "Stop at a safe distance and call local emergency or roadside assistance on their behalf.",
        consequenceHeadline: "A thoughtful, low-risk response. +6 Street Smart",
        consequenceBody:
          "Help arrives for the stranger within the hour, and you've contributed meaningfully without taking on direct personal risk.",
        whyItMatters:
          "Connecting someone in need to appropriate help, rather than personally taking on the risk yourself, is often the most balanced way to respond.",
        scoreEffect: 6,
        attributeEffects: { peopleSense: 6, riskAwareness: 5 },
      },
    ],
    tags: ["strangers", "safety", "helping-others"],
  },
  {
    id: "everyday-11",
    title: "The Roofing Repair Quote",
    category: "everyday",
    difficulty: "easy",
    city: "Benin City",
    situation:
      "After a storm damages part of your roof, a roofer you've never used before quotes ₦180,000 for a full replacement, insisting the entire roof needs to be redone rather than a patch repair.",
    decisions: [
      {
        id: "accept-full-replacement",
        label: "Accept the full replacement quote without question.",
        consequenceHeadline:
          "You may have paid for more than you needed. -5 Street Smart",
        consequenceBody:
          "The new roof looks fine, but a second opinion later suggests a patch repair for a fraction of the cost would likely have solved the actual damage.",
        whyItMatters:
          "A single contractor recommending the most expensive fix, without much explanation, is worth a second opinion before committing to a major expense.",
        scoreEffect: -5,
        attributeEffects: { financialSense: -6, riskAwareness: -3 },
        stateEffects: { cash: -180000 },
      },
      {
        id: "get-second-opinion",
        label:
          "Get a second roofer's opinion before deciding between a patch and a full replacement.",
        consequenceHeadline: "Sensible verification. +8 Street Smart",
        consequenceBody:
          "The second roofer confirms a targeted patch repair is sufficient for the actual damage, saving you a substantial amount over the full replacement.",
        whyItMatters:
          "For a significant home repair recommendation, a second professional opinion is a reasonable step that can reveal whether the first quote was proportionate to the actual problem.",
        scoreEffect: 8,
        attributeEffects: { financialSense: 8, riskAwareness: 5 },
        stateEffects: { cash: -45000 },
      },
      {
        id: "attempt-diy-repair",
        label:
          "Attempt to patch the roof yourself to avoid any professional cost.",
        consequenceHeadline: "Saved money, added risk. -4 Street Smart",
        consequenceBody:
          "The DIY patch doesn't fully seal the damage, and a smaller leak develops that eventually requires a proper professional repair anyway.",
        whyItMatters:
          "Some repairs genuinely benefit from professional skill — an imperfect DIY attempt can end up costing more than the original quote once it's fixed properly.",
        scoreEffect: -4,
        attributeEffects: { financialSense: -3, riskAwareness: -3 },
        stateEffects: { cash: -20000 },
      },
      {
        id: "ask-roofer-to-explain",
        label:
          "Ask the roofer to explain specifically why a full replacement is needed rather than a patch.",
        consequenceHeadline: "A reasonable first step. +5 Street Smart",
        consequenceBody:
          "The explanation is vague and unconvincing, prompting you to seek a second opinion anyway, though you've lost a little time in the process.",
        whyItMatters:
          "Asking for a clear justification before agreeing to the more expensive option is a good instinct, even if it doesn't fully resolve the question on its own.",
        scoreEffect: 5,
        attributeEffects: { financialSense: 4, negotiation: 4 },
      },
    ],
    tags: ["home-repair", "artisan", "quotes"],
  },
  {
    id: "everyday-12",
    title: "Choosing a School",
    category: "everyday",
    difficulty: "medium",
    city: "Ibadan",
    situation:
      "For your child's upcoming school year, you're deciding between a well-regarded private school at ₦450,000/year, and a decent public school that's essentially free but with larger class sizes.",
    decisions: [
      {
        id: "choose-private-strain-budget",
        label:
          "Choose the private school, even though it will significantly strain your budget.",
        consequenceHeadline:
          "A real bet on their future, at real cost. +3 Street Smart",
        consequenceBody:
          "Your child thrives in the smaller classes, but the tuition means cutting back noticeably on other parts of your household budget for the year.",
        whyItMatters:
          "Investing heavily in education is a legitimate priority, but it's worth entering with clear eyes about what else it means giving up, not treating it as a free upgrade.",
        scoreEffect: 3,
        attributeEffects: { financialSense: -6, peopleSense: 5 },
        stateEffects: { cash: -450000 },
      },
      {
        id: "choose-public-save-difference",
        label:
          "Choose the public school and save the difference toward other family priorities.",
        consequenceHeadline:
          "A reasonable, budget-conscious choice. +5 Street Smart",
        consequenceBody:
          "Your finances stay comfortable, and your child does reasonably well, though the larger class sizes mean somewhat less individual attention.",
        whyItMatters:
          "A public school isn't automatically the wrong choice — for many families, it's a genuinely sound way to balance education with overall financial stability.",
        scoreEffect: 5,
        attributeEffects: { financialSense: 6, peopleSense: 1 },
      },
      {
        id: "negotiate-scholarship-payment-plan",
        label:
          "Apply for a scholarship or negotiate a payment plan with the private school before deciding.",
        consequenceHeadline:
          "Explored the full range of options first. +9 Street Smart",
        consequenceBody:
          "The school offers a partial merit-based reduction plus a manageable installment plan, letting you access the private school without the same budget strain.",
        whyItMatters:
          "Before assuming a costly option is entirely out of reach, or fully committing to it at full price, it's worth exploring whether better terms are available.",
        scoreEffect: 9,
        attributeEffects: { financialSense: 8, negotiation: 8 },
        stateEffects: { cash: -280000 },
      },
      {
        id: "choose-mid-tier-alternative",
        label:
          "Research a mid-tier private school with a more moderate fee as a middle ground.",
        consequenceHeadline: "A balanced choice. +6 Street Smart",
        consequenceBody:
          "The mid-tier school offers smaller classes than the public option at a more manageable cost, striking a reasonable balance for your budget.",
        whyItMatters:
          "The choice isn't always binary — researching a wider range of options can reveal a middle ground that fits both educational goals and financial reality.",
        scoreEffect: 6,
        attributeEffects: { financialSense: 6, peopleSense: 3 },
        stateEffects: { cash: -180000 },
      },
    ],
    tags: ["education", "family", "budgeting"],
  },
  {
    id: "everyday-13",
    title: "The Age-Grade Levy",
    category: "everyday",
    difficulty: "easy",
    city: "Owerri",
    situation:
      "Your community age-grade association announces a ₦15,000 levy for a community development project. Participation isn't legally required, but it carries real social weight in your hometown.",
    decisions: [
      {
        id: "pay-levy-promptly",
        label:
          "Pay the levy promptly, valuing the community standing it maintains.",
        consequenceHeadline:
          "A reasonable investment in belonging. +6 Street Smart",
        consequenceBody:
          "You remain in good standing with the association, which continues to be a valuable source of community support and connection over the years.",
        whyItMatters:
          "Community associations often provide real long-term value, from mutual support to social capital — a reasonable levy is often a fair trade for staying meaningfully connected.",
        scoreEffect: 6,
        attributeEffects: { peopleSense: 6, financialSense: 2 },
        stateEffects: { cash: -15000 },
      },
      {
        id: "ignore-levy",
        label: "Ignore the request entirely, since it isn't mandatory.",
        consequenceHeadline:
          "Technically fine, socially costly. -4 Street Smart",
        consequenceBody:
          "Nothing formally happens, but your standing within the association quietly diminishes, and you're left out of some community decisions and support later.",
        whyItMatters:
          "Something not being legally required doesn't mean it carries no real consequence — social and community standing often depend on this kind of participation.",
        scoreEffect: -4,
        attributeEffects: { peopleSense: -6 },
        isCautious: true,
      },
      {
        id: "ask-what-project-funds",
        label:
          "Ask for details on exactly what the levy will fund before paying.",
        consequenceHeadline: "Reasonable due diligence. +7 Street Smart",
        consequenceBody:
          "The association shares a clear breakdown of the community project, and you pay with confidence in exactly where the money is going.",
        whyItMatters:
          "Asking what a community levy actually funds is a reasonable, low-effort step that builds accountability without questioning the association's legitimacy.",
        scoreEffect: 7,
        attributeEffects: { peopleSense: 5, financialSense: 5 },
        stateEffects: { cash: -15000 },
      },
      {
        id: "negotiate-partial-payment",
        label:
          "Explain your current budget constraints and ask to pay in two installments.",
        consequenceHeadline: "Honest and workable. +5 Street Smart",
        consequenceBody:
          "The association accommodates the request without issue, and you remain in good standing while easing the immediate cash impact.",
        whyItMatters:
          "Being honest about a budget constraint, rather than avoiding the topic entirely, often produces a flexible solution that works for everyone.",
        scoreEffect: 5,
        attributeEffects: { peopleSense: 5, financialSense: 4, negotiation: 3 },
        stateEffects: { cash: -7500 },
      },
    ],
    tags: ["community", "social-obligation", "hometown"],
  },
];
