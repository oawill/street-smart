import { Scenario } from "@/types/game";

export const scamScenarios: Scenario[] = [
  {
    id: "scam-01",
    title: "The OTP Call",
    category: "scam",
    difficulty: "easy",
    city: "Lagos",
    situation:
      'Your phone rings. The caller claims to be from your bank\'s fraud department, says suspicious activity was detected on your account, and asks you to read out the one-time PIN (OTP) that just arrived by SMS to "verify your identity" and stop the transaction.',
    decisions: [
      {
        id: "read-otp",
        label: "Read out the OTP to stop the supposed fraud.",
        consequenceHeadline: "That was the fraud. -14 Street Smart",
        consequenceBody:
          "Within minutes, your account is debited. The OTP you read out was the exact code needed to authorize the transaction the caller was making.",
        whyItMatters:
          "No genuine bank employee will ever ask you to read out an OTP over the phone — the OTP itself is the only thing standing between a caller and your money.",
        scoreEffect: -14,
        attributeEffects: {
          scamRadar: -12,
          digitalSafety: -12,
          financialSense: -6,
          riskAwareness: 3,
        },
        stateEffects: { cash: -180000 },
        isTrap: true,
      },
      {
        id: "hang-up-call-bank",
        label:
          "Hang up immediately and call your bank's official number yourself.",
        consequenceHeadline: "Exactly right. +10 Street Smart",
        consequenceBody:
          "Your bank confirms there was no fraud alert on your account at all — the call was an attempt to trick you into handing over the OTP.",
        whyItMatters:
          "Ending the call and independently contacting the institution through a number you already trust removes the attacker's control over the conversation entirely.",
        scoreEffect: 10,
        attributeEffects: { scamRadar: 12, digitalSafety: 10, peopleSense: -3 },
        isCautious: true,
      },
      {
        id: "give-partial-info",
        label:
          'Refuse the OTP but confirm your account number and BVN to "prove" who you are.',
        consequenceHeadline: "Still too much information. -7 Street Smart",
        consequenceBody:
          "You avoid the immediate theft, but the caller now has enough personal information to attempt further fraud or convince the next victim they're legitimate.",
        whyItMatters:
          "Even information that feels harmless, like an account number or BVN, adds to what a scammer can use — legitimate institutions already have your details and don't need you to confirm them by phone.",
        scoreEffect: -7,
        attributeEffects: {
          scamRadar: -6,
          digitalSafety: -6,
          riskAwareness: 1,
        },
        isTrap: true,
      },
      {
        id: "argue-with-caller",
        label: "Stay on the line and argue that you know it's a scam.",
        consequenceHeadline:
          "Better than complying, still risky. +1 Street Smart",
        consequenceBody:
          "You don't lose money, but staying engaged confirms your number is active and reachable, which can lead to more scam attempts later.",
        whyItMatters:
          "Simply hanging up is safer than engaging at all — confirming a scammer has reached a real, responsive person makes your number more valuable to target again.",
        scoreEffect: 1,
        attributeEffects: { scamRadar: 4, digitalSafety: 2, peopleSense: -4 },
      },
    ],
    tags: ["otp", "phone-scam", "bank-fraud", "phishing"],
  },
  {
    id: "scam-02",
    title: "The Mistaken Credit",
    category: "scam",
    difficulty: "medium",
    city: "Abuja",
    situation:
      'You get an SMS that looks like it\'s from your bank: ₦500,000 has been credited to your account "in error" and you\'re asked to send it back to a different account number immediately to avoid "legal action." Checking your banking app, you do see an unusual balance.',
    decisions: [
      {
        id: "send-back-immediately",
        label:
          "Transfer the money back to the account given, to avoid trouble.",
        consequenceHeadline: "The balance was fake. -13 Street Smart",
        consequenceBody:
          'Your real balance never changed — the "credit" was a manipulated screen from a spoofed link or fake alert. The money you sent was entirely your own.',
        whyItMatters:
          "Fake credit alerts rely on panic and urgency; legitimate banks reverse erroneous credits themselves and never ask you to send money to a random third-party account to fix it.",
        scoreEffect: -13,
        attributeEffects: {
          scamRadar: -12,
          financialSense: -8,
          digitalSafety: -6,
          riskAwareness: 2,
        },
        stateEffects: { cash: -500000 },
        isTrap: true,
      },
      {
        id: "verify-with-bank",
        label:
          "Log in to your official banking app directly and call your bank's verified line to confirm.",
        consequenceHeadline: "Correctly verified. +10 Street Smart",
        consequenceBody:
          "Your bank confirms no such credit exists, and the SMS was a spoofed message, not a real alert. You report the number and move on.",
        whyItMatters:
          "Verifying account activity through the bank's own official app or number, rather than trusting a text message, is the safest way to confirm what's real.",
        scoreEffect: 10,
        attributeEffects: {
          scamRadar: 11,
          digitalSafety: 9,
          financialSense: 4,
          peopleSense: -2,
        },
        isCautious: true,
      },
      {
        id: "spend-the-credit",
        label:
          "Assume the credit is real and start spending it before anyone asks questions.",
        consequenceHeadline: "This can go very wrong. -10 Street Smart",
        consequenceBody:
          "You spend some of the appeared balance. Days later, your account is flagged and frozen pending investigation into where the phantom credit came from.",
        whyItMatters:
          "Money that appears unexpectedly, especially through a channel you didn't verify, should never be treated as safe to spend before its source is confirmed.",
        scoreEffect: -10,
        attributeEffects: {
          financialSense: -10,
          scamRadar: -6,
          riskAwareness: -6,
          negotiation: 3,
        },
        isTrap: true,
      },
      {
        id: "ignore-message",
        label: "Ignore the message entirely and don't check anything.",
        consequenceHeadline: "Lucky, but not a real strategy. +2 Street Smart",
        consequenceBody:
          "Nothing bad happens this time since you took no action either way, but you also never actually confirmed what was going on with your account.",
        whyItMatters:
          "Ignoring a suspicious message avoids acting on it, but verifying what's actually happening on your account is a more reliable habit than hoping it resolves itself.",
        scoreEffect: 2,
        attributeEffects: { scamRadar: 3, digitalSafety: 1, peopleSense: -3 },
        isCautious: true,
      },
    ],
    tags: ["bank-fraud", "fake-alert", "sms-scam", "urgency"],
  },
  {
    id: "scam-03",
    title: "Too Good a Price",
    category: "scam",
    difficulty: "medium",
    city: "Ibadan",
    situation:
      'An online marketplace listing shows a brand-new iPhone for ₦280,000, roughly half the normal price. The seller has a profile with a handful of positive reviews and insists on payment via bank transfer before shipping, since "the price is too good to hold stock."',
    decisions: [
      {
        id: "pay-full-upfront",
        label: "Transfer the full amount upfront to secure the deal.",
        consequenceHeadline:
          "The deal disappears with your money. -12 Street Smart",
        consequenceBody:
          "After payment, the seller stops responding. The account and its reviews turn out to have been recently created and padded to look established.",
        whyItMatters:
          "A price far below market value is the clearest signal of a scam listing — legitimate sellers rarely need to sell at a steep, unexplained loss.",
        scoreEffect: -12,
        attributeEffects: {
          scamRadar: -10,
          financialSense: -8,
          riskAwareness: 1,
        },
        stateEffects: { cash: -280000 },
        isTrap: true,
      },
      {
        id: "insist-on-escrow",
        label:
          "Insist on using the marketplace's built-in escrow or meet-in-person option instead.",
        consequenceHeadline: "Good protective instinct. +9 Street Smart",
        consequenceBody:
          "The seller refuses escrow and stops responding once you decline direct transfer, confirming your suspicion before any money changed hands.",
        whyItMatters:
          "A legitimate seller has no reason to avoid a platform's built-in payment protection — reluctance to use it is itself a strong warning sign.",
        scoreEffect: 9,
        attributeEffects: {
          scamRadar: 11,
          financialSense: 5,
          riskAwareness: 4,
          peopleSense: -4,
        },
        isCautious: true,
      },
      {
        id: "negotiate-lower-still-transfer",
        label: "Negotiate an even lower price, then transfer once they agree.",
        consequenceHeadline:
          "Negotiating with a scam doesn't change the outcome. -11 Street Smart",
        consequenceBody:
          "The seller happily agrees to your lower price, takes the transfer, and disappears — the willingness to drop price further should have been a bigger red flag.",
        whyItMatters:
          "A scammer will agree to almost any price since they never intend to deliver — eagerness to negotiate down doesn't make a deal more legitimate.",
        scoreEffect: -11,
        attributeEffects: {
          scamRadar: -9,
          negotiation: -3,
          financialSense: -6,
          riskAwareness: 2,
        },
        stateEffects: { cash: -220000 },
        isTrap: true,
      },
      {
        id: "check-reviews-history",
        label:
          "Check the seller's full review history and account age before deciding anything.",
        consequenceHeadline: "Diligence catches it. +8 Street Smart",
        consequenceBody:
          'The account was created two weeks ago, and the "reviews" all come from accounts created around the same time. You avoid the deal entirely.',
        whyItMatters:
          "A seller's history and account age are quick, free checks that often reveal manufactured trust before you ever risk a payment.",
        scoreEffect: 8,
        attributeEffects: { scamRadar: 10, digitalSafety: 4, peopleSense: -2 },
        isCautious: true,
      },
    ],
    tags: ["online-shopping", "marketplace", "too-good-to-be-true"],
  },
  {
    id: "scam-04",
    title: "The Job Offer That Wants Money",
    category: "scam",
    difficulty: "easy",
    city: "Enugu",
    situation:
      'You applied for a remote data-entry job online. Within a day, you get an offer letter and a message: to receive your "starter kit" and login credentials, you need to pay a ₦25,000 refundable "registration fee."',
    decisions: [
      {
        id: "pay-registration-fee",
        label: "Pay the fee to secure the job.",
        consequenceHeadline: "There was never a job. -11 Street Smart",
        consequenceBody:
          'After payment, the recruiter asks for another "training fee," then goes silent entirely. No actual job or company existed.',
        whyItMatters:
          "Legitimate employers pay you to work for them — they never require payment from a candidate to begin or continue an application process.",
        scoreEffect: -11,
        attributeEffects: {
          scamRadar: -10,
          careerJudgment: -6,
          financialSense: -6,
          riskAwareness: 3,
        },
        stateEffects: { cash: -25000 },
        isTrap: true,
      },
      {
        id: "research-company",
        label:
          "Research the company's registration and look for a verifiable office or website before responding.",
        consequenceHeadline: "Smart verification. +9 Street Smart",
        consequenceBody:
          'The company has no verifiable registration or physical presence, and other job seekers online report the same "offer" and fee request. You decline.',
        whyItMatters:
          "A legitimate company can always be verified through public registration records or a real digital footprint — one that can't be found is a serious warning sign.",
        scoreEffect: 9,
        attributeEffects: { scamRadar: 10, careerJudgment: 6, peopleSense: -3 },
        isCautious: true,
      },
      {
        id: "ask-to-waive-fee",
        label:
          "Ask if the fee can be waived or deducted from your first paycheck instead.",
        consequenceHeadline:
          "A reasonable ask, with a telling response. +4 Street Smart",
        consequenceBody:
          'The "recruiter" refuses any flexibility at all and pressures you to pay immediately, which only strengthens the case that it isn\'t a genuine job.',
        whyItMatters:
          "Testing an offer's flexibility is a useful way to surface how genuine it is — a real employer would have no issue accommodating a reasonable request.",
        scoreEffect: 4,
        attributeEffects: { scamRadar: 5, negotiation: 4, peopleSense: -2 },
      },
      {
        id: "ignore-offer",
        label: "Ignore the offer and move on without investigating further.",
        consequenceHeadline: "Safe, but you learn nothing. +2 Street Smart",
        consequenceBody:
          "You avoid the loss, but you also don't learn to recognize the specific pattern for next time, since you never looked closer at what made it fake.",
        whyItMatters:
          "Walking away avoids the immediate risk, but taking a moment to understand why an offer was fake helps you spot the same pattern faster next time.",
        scoreEffect: 2,
        attributeEffects: { scamRadar: 3, careerJudgment: 1, peopleSense: -4 },
        isCautious: true,
      },
    ],
    tags: ["job-scam", "fake-recruiter", "advance-fee"],
  },
  {
    id: "scam-05",
    title: "Mum's New Number",
    category: "scam",
    difficulty: "easy",
    city: "Kaduna",
    situation:
      "You get a WhatsApp message from an unfamiliar number: \"Hi, it's me, I lost my phone and this is my new number. I need you to send ₦45,000 urgently, I'll explain later.\" The profile picture and writing style resemble your mother.",
    decisions: [
      {
        id: "send-immediately",
        label: "Send the money right away since it seems urgent.",
        consequenceHeadline: "It wasn't her. -13 Street Smart",
        consequenceBody:
          "You reach your mother later on her real number — she never sent any such message. The account impersonated her using details scraped from social media.",
        whyItMatters:
          "This exact impersonation pattern is extremely common precisely because urgency stops people from doing the one thing that would expose it: calling the person directly.",
        scoreEffect: -13,
        attributeEffects: {
          scamRadar: -10,
          digitalSafety: -8,
          peopleSense: -3,
          riskAwareness: 2,
        },
        stateEffects: { cash: -45000 },
        isTrap: true,
      },
      {
        id: "call-known-number",
        label:
          "Call your mother's known number directly to confirm before doing anything.",
        consequenceHeadline: "Exactly the right move. +10 Street Smart",
        consequenceBody:
          "Your mother answers on her usual number, confused — she never lost her phone. You block the impersonating account and warn family members.",
        whyItMatters:
          "A quick call through a channel you already trust is the fastest way to confirm or deny an urgent request that arrives through a new or unfamiliar one.",
        scoreEffect: 10,
        attributeEffects: {
          scamRadar: 12,
          digitalSafety: 8,
          peopleSense: 4,
          businessInstinct: -2,
        },
        isCautious: true,
      },
      {
        id: "ask-personal-question",
        label:
          "Reply asking a personal question only your real mother would know before sending anything.",
        consequenceHeadline:
          "A decent test, though not foolproof. +5 Street Smart",
        consequenceBody:
          "The account fails to answer convincingly and goes quiet, confirming it wasn't really her — though a well-prepared scammer might have guessed correctly.",
        whyItMatters:
          "Testing with a personal question can work, but it's a weaker check than simply calling the person's known number, since some answers can be guessed or found online.",
        scoreEffect: 5,
        attributeEffects: { scamRadar: 6, digitalSafety: 3, peopleSense: -4 },
      },
      {
        id: "send-partial-amount",
        label: "Send a smaller amount first, just in case it really is her.",
        consequenceHeadline:
          "Still a loss, just a smaller one. -6 Street Smart",
        consequenceBody:
          "The smaller amount disappears just as fast, and the account immediately asks for more, using the same urgency.",
        whyItMatters:
          "If a request can't be verified, sending any amount at all carries the same fundamental risk, regardless of size.",
        scoreEffect: -6,
        attributeEffects: {
          scamRadar: -5,
          digitalSafety: -4,
          riskAwareness: 2,
        },
        stateEffects: { cash: -15000 },
        isTrap: true,
      },
    ],
    tags: ["impersonation", "whatsapp", "family", "urgency"],
  },
  {
    id: "scam-06",
    title: "Package Held at Customs",
    category: "scam",
    difficulty: "easy",
    city: "Lagos",
    situation:
      'You get a text claiming a package addressed to you is "held at customs" and needs a ₦12,000 clearance fee paid via a link to be released. You weren\'t expecting any package.',
    decisions: [
      {
        id: "pay-clearance-fee",
        label:
          "Pay the small fee through the link, since it's not a lot of money.",
        consequenceHeadline: "Small amount, same trap. -8 Street Smart",
        consequenceBody:
          "The link captures your card details along with the payment, and further unauthorized charges appear on your card over the following days.",
        whyItMatters:
          "Fake customs and delivery fee scams rely on the amount feeling too small to question — but the real damage often comes from the payment page itself, not just the fee.",
        scoreEffect: -8,
        attributeEffects: {
          scamRadar: -8,
          digitalSafety: -8,
          financialSense: -3,
        },
        stateEffects: { cash: -12000 },
        isTrap: true,
      },
      {
        id: "ignore-unexpected-package",
        label: "Ignore the message, since you weren't expecting any package.",
        consequenceHeadline: "Simple and correct. +8 Street Smart",
        consequenceBody:
          "Nothing happens — there was no real package. The message was a mass-sent attempt hoping someone would click without thinking.",
        whyItMatters:
          "An unexpected fee request for something you never ordered has no legitimate basis to begin with — there's nothing to verify because there was never a real transaction.",
        scoreEffect: 8,
        attributeEffects: { scamRadar: 9, digitalSafety: 6 },
        isCautious: true,
      },
      {
        id: "click-link-check",
        label:
          "Click the link just to see what it says, without entering any details.",
        consequenceHeadline: "Riskier than it seems. -5 Street Smart",
        consequenceBody:
          "The link leads to a page that silently attempts to install tracking software on your phone, even without you entering any information.",
        whyItMatters:
          "Suspicious links can carry risk just from being opened, not only from what you type into them — the safest response to an unsolicited link is not clicking it at all.",
        scoreEffect: -5,
        attributeEffects: { digitalSafety: -8, scamRadar: -3 },
        isTrap: true,
      },
      {
        id: "verify-with-courier",
        label:
          "Check directly with the actual courier company's official app or website.",
        consequenceHeadline: "Thorough verification. +7 Street Smart",
        consequenceBody:
          "The courier's official system shows no package under your name at all, confirming the text was fabricated.",
        whyItMatters:
          "Verifying a claim through the company's own official channel, rather than a link sent to you, sidesteps the entire scam mechanism.",
        scoreEffect: 7,
        attributeEffects: { scamRadar: 8, digitalSafety: 6 },
        isCautious: true,
      },
    ],
    tags: ["phishing", "delivery-scam", "sms-scam"],
  },
  {
    id: "scam-07",
    title: "The Landlord Who Isn't",
    category: "scam",
    difficulty: "medium",
    city: "Ibadan",
    situation:
      "You find a self-contained apartment listed online for a good price. The man who shows you around introduces himself as the landlord and asks for a full year's rent, ₦900,000, in cash before he'll hand over the keys, saying he's traveling the next day.",
    decisions: [
      {
        id: "pay-cash-no-check",
        label: "Pay the full amount in cash before he travels.",
        consequenceHeadline: "He wasn't the landlord. -13 Street Smart",
        consequenceBody:
          "Weeks later, the real property owner shows up. The man who took your money had simply rented the empty apartment short-term and posed as its owner.",
        whyItMatters:
          "Anyone can show you around a property — verifying legal ownership through documents like a Certificate of Occupancy is the only real protection against this exact scam.",
        scoreEffect: -13,
        attributeEffects: {
          scamRadar: -11,
          financialSense: -8,
          riskAwareness: -6,
        },
        stateEffects: { cash: -900000 },
        isTrap: true,
      },
      {
        id: "verify-ownership-docs",
        label:
          "Ask to see the title documents and verify with the local government or a lawyer before paying.",
        consequenceHeadline: "Careful and correct. +10 Street Smart",
        consequenceBody:
          "The documents don't match the man's name, exposing the scheme before any money changes hands. You keep looking for a legitimate apartment.",
        whyItMatters:
          "Ownership documents can be verified independently of whatever a person tells you in person — that verification step is what actually protects a large payment.",
        scoreEffect: 10,
        attributeEffects: {
          scamRadar: 12,
          riskAwareness: 6,
          financialSense: 4,
        },
        isCautious: true,
      },
      {
        id: "pay-half-now",
        label: "Pay half now and the rest once he returns from traveling.",
        consequenceHeadline: "Still a real loss. -9 Street Smart",
        consequenceBody:
          "He never returns your calls after collecting the first half, and the apartment turns out not to be his to rent at all.",
        whyItMatters:
          "Splitting a payment doesn't add protection if the underlying claim of ownership was never verified in the first place.",
        scoreEffect: -9,
        attributeEffects: { scamRadar: -7, financialSense: -6 },
        stateEffects: { cash: -450000 },
        isTrap: true,
      },
      {
        id: "involve-agent",
        label:
          "Insist on going through a licensed real estate agent to handle the transaction instead.",
        consequenceHeadline:
          "A solid extra layer of protection. +7 Street Smart",
        consequenceBody:
          'The "landlord" refuses to work with an agent and stops responding, which tells you everything you need to know before any money is at risk.',
        whyItMatters:
          "A legitimate landlord generally has no strong objection to a licensed third party verifying the transaction — refusal to involve one is itself informative.",
        scoreEffect: 7,
        attributeEffects: { scamRadar: 8, riskAwareness: 5 },
        isCautious: true,
      },
    ],
    tags: ["rental-scam", "landlord", "verification", "real-estate"],
  },
  {
    id: "scam-08",
    title: "Guaranteed Monthly Returns",
    category: "scam",
    difficulty: "medium",
    city: "Port Harcourt",
    situation:
      'A well-dressed man at a business event hands you a flyer for an investment club promising a guaranteed 30% return every month, no matter what happens in the markets, with testimonials from "members" printed alongside.',
    decisions: [
      {
        id: "invest-based-on-flyer",
        label: "Invest based on the flyer and the confident pitch.",
        consequenceHeadline:
          "Guarantees like that don't exist. -12 Street Smart",
        consequenceBody:
          "Payouts arrive for the first two months, funded by new members' deposits rather than any real investment, before the whole scheme collapses.",
        whyItMatters:
          "No legitimate investment can guarantee a fixed high return regardless of market conditions — that promise alone is close to a guarantee that it's a scheme, not an investment.",
        scoreEffect: -12,
        attributeEffects: { financialSense: -11, scamRadar: -10 },
        stateEffects: { cash: -300000 },
        isTrap: true,
      },
      {
        id: "ask-for-regulation",
        label:
          "Ask whether the club is registered with the relevant securities regulator.",
        consequenceHeadline: "The right question. +10 Street Smart",
        consequenceBody:
          "The man becomes evasive and can't name any regulatory registration, which is enough for you to walk away entirely.",
        whyItMatters:
          "Legitimate investment vehicles are registered and regulated — asking directly about regulation is a fast way to filter out most schemes before investing anything.",
        scoreEffect: 10,
        attributeEffects: { scamRadar: 12, financialSense: 7 },
        isCautious: true,
      },
      {
        id: "invest-small-test",
        label: 'Put in a small amount to "test" whether the payouts are real.',
        consequenceHeadline: "The test is designed to pass. -6 Street Smart",
        consequenceBody:
          "The small payout arrives right on schedule, which is precisely how these schemes build enough trust to attract larger deposits later.",
        whyItMatters:
          "Early payouts in these schemes are typically funded by new investors' money, not genuine returns — an initial success proves nothing about long-term legitimacy.",
        scoreEffect: -6,
        attributeEffects: { scamRadar: -6, financialSense: -3 },
        stateEffects: { cash: -30000 },
        isTrap: true,
      },
      {
        id: "decline-and-report",
        label:
          "Decline politely and mention it to others who might be approached.",
        consequenceHeadline: "Sensible, and helpful to others. +6 Street Smart",
        consequenceBody:
          "You lose nothing, and a colleague you warned avoids the same pitch a week later.",
        whyItMatters:
          "Declining a scheme with an unrealistic guarantee is the safe default, and sharing the warning helps protect people around you too.",
        scoreEffect: 6,
        attributeEffects: { scamRadar: 8, peopleSense: 4 },
        isCautious: true,
      },
    ],
    tags: ["investment-scam", "ponzi", "guaranteed-returns"],
  },
  {
    id: "scam-09",
    title: "Verify Your Account",
    category: "scam",
    difficulty: "easy",
    city: "Benin City",
    situation:
      'An email claiming to be from your bank says your online banking access will be suspended in 24 hours unless you click a link and "re-verify" your login details and card information.',
    decisions: [
      {
        id: "click-and-enter-details",
        label:
          "Click the link and enter your login and card details to avoid suspension.",
        consequenceHeadline: "A classic phishing page. -13 Street Smart",
        consequenceBody:
          "The page was a fake replica of your bank's login screen. Within the hour, your real account is accessed and funds are moved out.",
        whyItMatters:
          "Phishing pages are built to look identical to real banking sites — the safest rule is to never enter banking credentials through a link from an email or text.",
        scoreEffect: -13,
        attributeEffects: {
          digitalSafety: -12,
          scamRadar: -10,
          financialSense: -6,
        },
        stateEffects: { cash: -220000 },
        isTrap: true,
      },
      {
        id: "go-to-app-directly",
        label:
          "Ignore the link and open your bank's official app directly instead.",
        consequenceHeadline: "Correct and safe. +10 Street Smart",
        consequenceBody:
          "Your account shows no suspension notice at all. You report the email as phishing and delete it.",
        whyItMatters:
          "Navigating to a service directly through its official app or a URL you typed yourself, rather than a link someone sent you, avoids phishing entirely.",
        scoreEffect: 10,
        attributeEffects: { digitalSafety: 11, scamRadar: 9 },
        isCautious: true,
      },
      {
        id: "check-sender-address-only",
        label:
          "Check that the sender's email address looks official before clicking the link.",
        consequenceHeadline: "A partial check. -3 Street Smart",
        consequenceBody:
          "The sender address looks plausible at a glance, so you click through anyway. Spoofed sender addresses are easy to fake and shouldn't be treated as proof of legitimacy.",
        whyItMatters:
          "Checking the sender's address is a reasonable habit, but it isn't a reliable test on its own since addresses can be spoofed convincingly.",
        scoreEffect: -3,
        attributeEffects: { digitalSafety: -4, scamRadar: -2 },
        isTrap: true,
      },
      {
        id: "forward-to-bank-security",
        label:
          "Forward the email to your bank's official fraud-reporting address and wait for their reply.",
        consequenceHeadline: "A thorough response. +8 Street Smart",
        consequenceBody:
          "The bank confirms it's a phishing attempt unrelated to them and thanks you for the report, helping them warn other customers.",
        whyItMatters:
          "Reporting phishing attempts to the institution being impersonated helps protect not just you but other potential targets too.",
        scoreEffect: 8,
        attributeEffects: { digitalSafety: 9, scamRadar: 6 },
        isCautious: true,
      },
    ],
    tags: ["phishing", "email-scam", "bank-fraud"],
  },
  {
    id: "scam-10",
    title: "You've Won!",
    category: "scam",
    difficulty: "easy",
    city: "Kano",
    situation:
      "A text message says you've won ₦2,000,000 in a promotional giveaway you don't remember entering. To claim it, you need to pay a ₦15,000 \"processing and tax clearance fee.\"",
    decisions: [
      {
        id: "pay-processing-fee",
        label: "Pay the fee to claim the prize.",
        consequenceHeadline: "There was no prize. -10 Street Smart",
        consequenceBody:
          'After paying, you\'re asked for another fee for "bank transfer charges," and the requests keep coming until you stop responding.',
        whyItMatters:
          "Legitimate prizes and giveaways never require the winner to pay money upfront to receive them — any request to do so is the scam itself.",
        scoreEffect: -10,
        attributeEffects: { scamRadar: -9, financialSense: -6 },
        stateEffects: { cash: -15000 },
        isTrap: true,
      },
      {
        id: "delete-and-block",
        label: "Delete the message and block the number.",
        consequenceHeadline: "Simple and effective. +8 Street Smart",
        consequenceBody:
          "Nothing further happens. You never entered any such giveaway, so there was nothing real to claim.",
        whyItMatters:
          "An unsolicited prize notification for a contest you don't remember entering has no legitimate basis to begin with.",
        scoreEffect: 8,
        attributeEffects: { scamRadar: 9, digitalSafety: 4 },
        isCautious: true,
      },
      {
        id: "ask-for-company-details",
        label:
          "Reply asking for the company's registration details and official website.",
        consequenceHeadline:
          "Reasonable, though unnecessary here. +3 Street Smart",
        consequenceBody:
          "The sender either goes silent or provides a fake-looking website, confirming your suspicion without costing you anything.",
        whyItMatters:
          "Asking for verifiable details is a fine habit, though for an unsolicited prize with an upfront fee, that request alone is usually a strong enough signal to just walk away.",
        scoreEffect: 3,
        attributeEffects: { scamRadar: 5 },
      },
      {
        id: "share-with-friends",
        label: 'Forward the message to friends so they can "claim" too.',
        consequenceHeadline: "You've spread the scam further. -6 Street Smart",
        consequenceBody:
          "One friend, trusting your forward, ends up paying the processing fee and losing money — because it came from you, it felt more credible.",
        whyItMatters:
          "Forwarding unverified claims, even with good intentions, can lend them false credibility and put people who trust you at risk.",
        scoreEffect: -6,
        attributeEffects: { scamRadar: -6, peopleSense: -6 },
        isTrap: true,
      },
    ],
    tags: ["prize-scam", "advance-fee", "sms-scam"],
  },
  {
    id: "scam-11",
    title: "The Online Relationship",
    category: "scam",
    difficulty: "hard",
    city: "Lagos",
    situation:
      "You've been chatting for three months with someone you met online who says they're an engineer working on an offshore oil rig. The relationship feels genuine and caring. They've never asked for money before, but now say they're stranded with a medical emergency abroad and need ₦280,000 urgently, promising to repay and finally meet you once they're back.",
    decisions: [
      {
        id: "send-money-trust",
        label: "Send the money, trusting the relationship you've built.",
        consequenceHeadline: "The pattern was the warning. -13 Street Smart",
        consequenceBody:
          'The money is sent, and afterward, further "emergencies" keep appearing, each needing more money before the relationship can supposedly continue.',
        whyItMatters:
          "Long-distance relationships that never progress to a video call or in-person meeting, followed eventually by a money request, follow a well-documented pattern regardless of how genuine the connection feels.",
        scoreEffect: -13,
        attributeEffects: {
          scamRadar: -10,
          financialSense: -8,
          peopleSense: -4,
        },
        stateEffects: { cash: -280000 },
        isTrap: true,
      },
      {
        id: "request-video-call",
        label: "Ask for a live video call before considering sending anything.",
        consequenceHeadline: "This exposes it. +10 Street Smart",
        consequenceBody:
          "The person makes excuse after excuse to avoid a call — poor connection, camera broken, work restrictions — and eventually stops responding altogether.",
        whyItMatters:
          "A consistent refusal or inability to do a live video call, especially alongside a sudden money request, is one of the most reliable signs of a romance-based scam.",
        scoreEffect: 10,
        attributeEffects: { scamRadar: 12, peopleSense: 5, riskAwareness: 4 },
        isCautious: true,
      },
      {
        id: "send-smaller-amount",
        label:
          "Send a smaller amount to help, while still expressing some doubt.",
        consequenceHeadline:
          "Doubt without action doesn't protect you. -7 Street Smart",
        consequenceBody:
          "The smaller amount is accepted gratefully, and a new, larger emergency appears within days, following the same pattern.",
        whyItMatters:
          'Having doubts is a good sign, but doubts only protect you if they change your actions — sending money "just in case" still funds the same pattern.',
        scoreEffect: -7,
        attributeEffects: { scamRadar: -5, financialSense: -5 },
        stateEffects: { cash: -60000 },
        isTrap: true,
      },
      {
        id: "decline-and-distance",
        label:
          "Decline to send money and gently pull back from the relationship to observe how they react.",
        consequenceHeadline: "A clear-headed test. +8 Street Smart",
        consequenceBody:
          "The person becomes pushy and guilt-tripping about the refusal, a reaction that tells you far more about their intentions than any of their earlier messages did.",
        whyItMatters:
          "How someone reacts to a boundary, especially around money, reveals more than how they behave when things are going smoothly.",
        scoreEffect: 8,
        attributeEffects: { scamRadar: 9, peopleSense: 6, riskAwareness: 3 },
        isCautious: true,
      },
    ],
    tags: ["romance-scam", "online-relationship", "emotional-manipulation"],
  },
  {
    id: "scam-12",
    title: "The Fake Officer Call",
    category: "scam",
    difficulty: "medium",
    city: "Abuja",
    situation:
      'A man calls claiming to be an officer investigating your BVN in connection with a fraud case, and says you must transfer ₦150,000 to a "safe holding account" to prove your innocence, or an arrest warrant will be issued today.',
    decisions: [
      {
        id: "pay-to-avoid-arrest",
        label: "Transfer the money immediately to avoid arrest.",
        consequenceHeadline: "There was no investigation. -13 Street Smart",
        consequenceBody:
          "The money vanishes into an account that closes shortly after. No government agency ever operates by demanding money over the phone to avoid arrest.",
        whyItMatters:
          "Real law enforcement and regulatory agencies do not resolve investigations through phone calls demanding money transferred to a personal account — this is a fear-based extortion script.",
        scoreEffect: -13,
        attributeEffects: {
          scamRadar: -11,
          riskAwareness: -6,
          financialSense: -6,
        },
        stateEffects: { cash: -150000 },
        isTrap: true,
      },
      {
        id: "hang-up-verify-agency",
        label:
          "Hang up and contact the actual agency through its official public number.",
        consequenceHeadline: "Sharp and calm response. +10 Street Smart",
        consequenceBody:
          "The agency confirms no such investigation exists and that this is a known scam tactic circulating at the moment.",
        whyItMatters:
          "Verifying any official-sounding claim directly with the institution, through a number you find independently, is the reliable way to separate real notices from intimidation scripts.",
        scoreEffect: 10,
        attributeEffects: { scamRadar: 12, riskAwareness: 6 },
        isCautious: true,
      },
      {
        id: "negotiate-lower-amount",
        label: "Try to negotiate the amount down before paying.",
        consequenceHeadline:
          "Negotiating legitimizes a fake threat. -9 Street Smart",
        consequenceBody:
          'The caller happily agrees to a lower figure and collects it — willingness to "negotiate" a legal penalty was itself a sign nothing about the call was real.',
        whyItMatters:
          "Real legal processes are not negotiable over a phone call — any willingness to haggle on the spot is a strong sign the whole premise is fabricated.",
        scoreEffect: -9,
        attributeEffects: { scamRadar: -8, riskAwareness: -4 },
        stateEffects: { cash: -80000 },
        isTrap: true,
      },
      {
        id: "ask-for-written-notice",
        label:
          "Ask for official written documentation of the investigation before discussing anything further.",
        consequenceHeadline: "A strong test. +7 Street Smart",
        consequenceBody:
          "The caller becomes aggressive and hangs up rather than provide any documentation, which tells you everything you need to know.",
        whyItMatters:
          "Legitimate legal or investigative matters come with formal documentation — an inability or refusal to provide any is a reliable red flag.",
        scoreEffect: 7,
        attributeEffects: { scamRadar: 9, riskAwareness: 4 },
        isCautious: true,
      },
    ],
    tags: ["impersonation", "extortion", "phone-scam", "intimidation"],
  },
  {
    id: "scam-13",
    title: "The Land Deal",
    category: "scam",
    difficulty: "hard",
    city: "Lagos",
    situation:
      "A plot of land in a fast-developing part of the city is offered to you at a fair market price, ₦4.5 million, by a man who presents a Certificate of Occupancy and a survey plan. Everything looks legitimate, but a quick search shows the same plot listed for sale by a different person on another site last year.",
    decisions: [
      {
        id: "proceed-documents-look-fine",
        label: "Proceed with the purchase since the documents look genuine.",
        consequenceHeadline:
          "One document isn't the whole picture. -12 Street Smart",
        consequenceBody:
          "The land turns out to have been sold to someone else previously using forged duplicate documents — a well-known pattern for high-value land fraud.",
        whyItMatters:
          "Land documents can be genuinely forged or duplicated — the same plot being listed by different sellers over time is a strong signal that deserves investigation before any commitment.",
        scoreEffect: -12,
        attributeEffects: {
          scamRadar: -10,
          financialSense: -10,
          riskAwareness: -6,
        },
        stateEffects: { cash: -4500000 },
        isTrap: true,
      },
      {
        id: "investigate-prior-listing",
        label:
          "Investigate the earlier listing and verify the title directly at the land registry before proceeding.",
        consequenceHeadline: "Thorough, and it paid off. +12 Street Smart",
        consequenceBody:
          "The registry search reveals the seller's documents don't match their actual ownership record. You walk away from a fraudulent deal entirely intact.",
        whyItMatters:
          "For high-value purchases like land, independently verifying title at the official registry, not just trusting the documents shown to you, is the only reliable safeguard.",
        scoreEffect: 12,
        attributeEffects: {
          scamRadar: 12,
          riskAwareness: 8,
          financialSense: 6,
        },
        isCautious: true,
      },
      {
        id: "ask-seller-about-old-listing",
        label:
          "Simply ask the seller about the older listing and accept his explanation.",
        consequenceHeadline: "Taking his word wasn't enough. -8 Street Smart",
        consequenceBody:
          "He offers a plausible-sounding explanation that turns out to be false once you eventually check the registry, but by then you've already paid a deposit.",
        whyItMatters:
          "A confident explanation from the person with the most to gain isn't verification — for something this valuable, an independent check matters more than a good answer.",
        scoreEffect: -8,
        attributeEffects: { scamRadar: -6, financialSense: -5 },
        stateEffects: { cash: -900000 },
        isTrap: true,
      },
      {
        id: "hire-lawyer",
        label:
          "Hire a property lawyer to conduct full due diligence before committing any money.",
        consequenceHeadline:
          "The safest path for a big purchase. +10 Street Smart",
        consequenceBody:
          "The lawyer's search uncovers the same discrepancy and advises against the purchase, saving you from a costly mistake for a modest professional fee.",
        whyItMatters:
          "For transactions this large, professional due diligence is a small cost relative to the risk it protects against.",
        scoreEffect: 10,
        attributeEffects: { scamRadar: 9, riskAwareness: 8, financialSense: 5 },
        stateEffects: { cash: -80000 },
        isCautious: true,
      },
    ],
    tags: ["land-scam", "real-estate", "documentation", "due-diligence"],
  },
  {
    id: "scam-14",
    title: "The Recruitment Agency Abroad",
    category: "scam",
    difficulty: "hard",
    city: "Abuja",
    situation:
      "A recruitment agency with a professional-looking office and website offers to place you in a nursing job in Europe, with visa sponsorship, for a ₦600,000 processing and documentation fee. They show you contracts from other successful placements and a registered business name.",
    decisions: [
      {
        id: "pay-full-fee",
        label: "Pay the full fee, trusting the professional setup.",
        consequenceHeadline: "The polish hid the problem. -12 Street Smart",
        consequenceBody:
          "Months pass with shifting excuses about visa delays, and eventually the agency stops responding. The registered business name existed, but the placements did not.",
        whyItMatters:
          "A real office, a website, and even a registered business name are all things a well-funded scam operation can afford — they establish presence, not proof of legitimate placements.",
        scoreEffect: -12,
        attributeEffects: {
          scamRadar: -10,
          careerJudgment: -8,
          financialSense: -6,
        },
        stateEffects: { cash: -600000 },
        isTrap: true,
      },
      {
        id: "verify-employer-directly",
        label:
          "Contact the named overseas employer directly to confirm the job offer is real.",
        consequenceHeadline: "This is the check that matters. +11 Street Smart",
        consequenceBody:
          "The named hospital has no record of any partnership with the agency or any pending offer for you, exposing the scheme clearly before any money is paid.",
        whyItMatters:
          "Verifying directly with the actual named employer, independent of the agency's own claims, is the one check that a fraudulent recruiter can't fake.",
        scoreEffect: 11,
        attributeEffects: {
          scamRadar: 11,
          careerJudgment: 8,
          riskAwareness: 5,
        },
        isCautious: true,
      },
      {
        id: "pay-in-installments",
        label:
          "Negotiate to pay the fee in installments tied to visa milestones.",
        consequenceHeadline: "Better structure, still exposed. -3 Street Smart",
        consequenceBody:
          'The staged payments limit your losses somewhat, but the agency still collects a first installment for a "visa application" that was never real.',
        whyItMatters:
          "Structuring payments in stages reduces the size of the loss, but it doesn't replace verifying that the underlying opportunity is genuine in the first place.",
        scoreEffect: -3,
        attributeEffects: {
          careerJudgment: -3,
          financialSense: -2,
          scamRadar: 2,
        },
        stateEffects: { cash: -150000 },
      },
      {
        id: "check-ngo-license",
        label:
          "Check whether the agency is licensed with the relevant labor/migration regulatory body.",
        consequenceHeadline: "A strong, appropriate check. +9 Street Smart",
        consequenceBody:
          "The agency has no license on file with the regulator, despite claiming full accreditation. You decline and report the discrepancy.",
        whyItMatters:
          "Recruitment agencies handling overseas job placement are typically required to be licensed — checking the regulator's public list is a direct way to confirm legitimacy.",
        scoreEffect: 9,
        attributeEffects: { scamRadar: 10, careerJudgment: 6 },
        isCautious: true,
      },
    ],
    tags: ["recruitment-scam", "japa", "visa", "employment"],
  },
  {
    id: "scam-15",
    title: "An Urgent Message From the Boss",
    category: "scam",
    difficulty: "hard",
    city: "Lagos",
    situation:
      "You get a WhatsApp message from a number claiming to be your company's CEO, whose display name and photo match. He says he's in an urgent meeting and needs you to buy ₦100,000 in gift cards for a client and send the codes right away, promising to reimburse you.",
    decisions: [
      {
        id: "buy-gift-cards",
        label: "Buy the gift cards immediately and send the codes as asked.",
        consequenceHeadline:
          "The codes are gone the moment you send them. -12 Street Smart",
        consequenceBody:
          "Gift card codes are as good as cash and untraceable once sent. The real CEO never sent any such message — the account was impersonating him.",
        whyItMatters:
          "Urgent, secretive requests for gift cards are a well-known impersonation tactic precisely because the codes can't be recovered once shared, unlike a bank transfer.",
        scoreEffect: -12,
        attributeEffects: {
          scamRadar: -10,
          digitalSafety: -8,
          careerJudgment: -4,
        },
        stateEffects: { cash: -100000 },
        isTrap: true,
      },
      {
        id: "verify-through-other-channel",
        label:
          "Message or call the CEO through a separate, known channel to confirm before doing anything.",
        consequenceHeadline: "Exactly right. +11 Street Smart",
        consequenceBody:
          "The real CEO has no idea what you're talking about — his name and photo were copied to create a convincing but fake account.",
        whyItMatters:
          "Verifying an unusual request through a completely separate channel from the one it arrived on defeats impersonation almost every time, since the attacker doesn't control that second channel.",
        scoreEffect: 11,
        attributeEffects: {
          digitalSafety: 10,
          scamRadar: 10,
          careerJudgment: 5,
        },
        isCautious: true,
      },
      {
        id: "ask-colleague-first",
        label:
          "Ask a colleague if they've received a similar message before acting.",
        consequenceHeadline:
          "A helpful step, not quite complete. +4 Street Smart",
        consequenceBody:
          "A colleague says they haven't heard anything, which raises your suspicion, though you still haven't directly confirmed with the real CEO.",
        whyItMatters:
          "Checking with a colleague is a reasonable instinct, but the most reliable confirmation still comes from directly verifying with the person being impersonated.",
        scoreEffect: 4,
        attributeEffects: { scamRadar: 4, peopleSense: 3 },
      },
      {
        id: "comply-partially",
        label:
          'Buy a smaller amount of gift cards first to "test" the request.',
        consequenceHeadline: "There's no safe version of this. -8 Street Smart",
        consequenceBody:
          "The smaller amount is just as unrecoverable as a larger one would have been, and the account immediately asks for more.",
        whyItMatters:
          'Gift card codes are irreversible the moment they\'re shared — there is no low-risk way to "test" a request like this before verifying it independently.',
        scoreEffect: -8,
        attributeEffects: { scamRadar: -6, digitalSafety: -6 },
        stateEffects: { cash: -30000 },
        isTrap: true,
      },
    ],
    tags: ["impersonation", "workplace", "gift-card-scam", "whatsapp"],
  },
  {
    id: "scam-16",
    title: "A Stranger's Emergency",
    category: "scam",
    difficulty: "hard",
    city: "Enugu",
    situation:
      "A post is circulating on social media about a young accident victim needing urgent surgery, with photos, a hospital name, and an account number for donations. A mutual friend has already shared it, adding credibility. You're moved and considering contributing ₦20,000.",
    decisions: [
      {
        id: "donate-immediately",
        label: "Send the donation right away, trusting the shared post.",
        consequenceHeadline:
          "Emotional appeals aren't always what they claim. -7 Street Smart",
        consequenceBody:
          "It later emerges the photos were taken from an unrelated old news story and reused, and the account number belonged to neither the hospital nor any real patient.",
        whyItMatters:
          "Emotionally urgent appeals, especially ones already shared widely, can spread faster than anyone verifies them — virality is not the same as legitimacy.",
        scoreEffect: -7,
        attributeEffects: {
          scamRadar: -7,
          financialSense: -3,
          peopleSense: -2,
        },
        stateEffects: { cash: -20000 },
        isTrap: true,
      },
      {
        id: "call-hospital-verify",
        label:
          "Call the named hospital directly to confirm the patient and the fundraising account.",
        consequenceHeadline:
          "Good instinct, real generosity protected. +9 Street Smart",
        consequenceBody:
          "The hospital has no record of the patient or any authorized donation account under that name, saving you from an emotionally manipulative fake appeal.",
        whyItMatters:
          "For a request naming a specific institution, calling that institution directly is a fast, reliable way to confirm whether a fundraiser is genuine.",
        scoreEffect: 9,
        attributeEffects: { scamRadar: 10, riskAwareness: 5, peopleSense: 3 },
        isCautious: true,
      },
      {
        id: "donate-via-known-charity",
        label:
          "Decline this specific request but donate the same amount through a known, verified charity instead.",
        consequenceHeadline: "Generosity, redirected safely. +8 Street Smart",
        consequenceBody:
          "Your money reaches people who genuinely need it through an organization with an established, verifiable track record.",
        whyItMatters:
          "Wanting to help is a good instinct — channeling it through verified organizations lets you act on generosity without exposure to fabricated appeals.",
        scoreEffect: 8,
        attributeEffects: { scamRadar: 7, peopleSense: 6, financialSense: 3 },
        isCautious: true,
      },
      {
        id: "ignore-entirely",
        label:
          "Ignore the post entirely, assuming most online fundraisers are fake.",
        consequenceHeadline: "Overly cynical. -1 Street Smart",
        consequenceBody:
          "In this case it was indeed fake, but treating every appeal as automatically fraudulent means you'd also ignore genuine ones that could really use help.",
        whyItMatters:
          "Blanket cynicism protects your wallet but isn't the same as good judgment — verifying costs little and lets you tell genuine appeals from fake ones.",
        scoreEffect: -1,
        attributeEffects: { scamRadar: 2, peopleSense: -4 },
        isCautious: true,
      },
    ],
    tags: [
      "fundraising-scam",
      "social-media",
      "emotional-appeal",
      "verification",
    ],
  },
  {
    id: "scam-17",
    title: "The SIM Swap Attempt",
    category: "scam",
    difficulty: "medium",
    city: "Jos",
    situation:
      "Your phone suddenly loses network signal for no clear reason. Around the same time, you get an email saying your email password was just changed, though you didn't change it.",
    decisions: [
      {
        id: "wait-and-see",
        label: "Assume it's a temporary network glitch and wait it out.",
        consequenceHeadline: "This was an active attack. -12 Street Smart",
        consequenceBody:
          "By the time your signal returns, your accounts protected by SMS codes, including your bank app, have already been accessed using a fraudulently issued SIM.",
        whyItMatters:
          "A sudden loss of signal combined with unexpected account changes is a classic sign of a SIM swap in progress — the delay in acting gives an attacker exactly the window they need.",
        scoreEffect: -12,
        attributeEffects: {
          digitalSafety: -12,
          scamRadar: -8,
          riskAwareness: -6,
        },
        stateEffects: { cash: -350000 },
        isTrap: true,
      },
      {
        id: "contact-telco-and-bank",
        label:
          "Immediately contact your telecom provider and bank to report a suspected SIM swap.",
        attributeEffects: { digitalSafety: 12, scamRadar: 9, riskAwareness: 6 },
        consequenceHeadline: "Fast action limited the damage. +11 Street Smart",
        consequenceBody:
          "Your telecom provider confirms an unauthorized SIM swap request was submitted and blocks it in time, before any funds move.",
        whyItMatters:
          "Reacting immediately to the combination of lost signal and unexpected account activity, rather than assuming a glitch, is what actually stops a SIM swap attack in progress.",
        scoreEffect: 11,
        isCautious: true,
      },
      {
        id: "reset-email-password-only",
        label: "Just reset your email password and move on.",
        consequenceHeadline:
          "Addressed one symptom, missed the cause. -6 Street Smart",
        consequenceBody:
          "The email is secured, but the underlying SIM swap attempt on your phone number continues, since it was never reported to your telecom provider.",
        whyItMatters:
          "Fixing one visible symptom without addressing the root cause, the SIM itself, leaves the door open for the attacker to continue elsewhere.",
        scoreEffect: -6,
        attributeEffects: { digitalSafety: -5, riskAwareness: -3 },
      },
      {
        id: "visit-telco-store",
        label: "Go in person to your telecom provider's store to sort it out.",
        consequenceHeadline: "Effective, if slightly slower. +7 Street Smart",
        consequenceBody:
          "The store confirms and reverses a fraudulent SIM swap request, though the in-person trip takes longer than a phone report would have.",
        whyItMatters:
          "Resolving the issue in person is a solid way to confirm identity and fix the problem, though a phone hotline can often act faster in the critical early minutes.",
        scoreEffect: 7,
        attributeEffects: { digitalSafety: 8, riskAwareness: 4 },
      },
    ],
    tags: ["sim-swap", "account-takeover", "digital-safety"],
  },
  {
    id: "scam-18",
    title: "The Second-Hand Generator",
    category: "scam",
    difficulty: "medium",
    city: "Kano",
    situation:
      "A seller on a classifieds app has a barely-used generator listed for ₦180,000, well below new price. He says he's relocating urgently and can only accept payment via a \"buyer protection\" link he'll send you, rather than the app's normal checkout.",
    decisions: [
      {
        id: "pay-via-his-link",
        label:
          'Pay through the link he sends, trusting the "buyer protection" name.',
        consequenceHeadline: "There was no protection at all. -11 Street Smart",
        consequenceBody:
          "The link was a fake payment page that captured your card details. The generator, and the seller, were never real to begin with.",
        whyItMatters:
          "A payment link sent privately by a seller, outside the platform's own checkout, offers no real protection no matter what it's named — genuine buyer protection is built into the platform itself.",
        scoreEffect: -11,
        attributeEffects: {
          scamRadar: -10,
          digitalSafety: -8,
          financialSense: -5,
        },
        stateEffects: { cash: -180000 },
        isTrap: true,
      },
      {
        id: "insist-on-app-checkout",
        label:
          "Insist on using the marketplace app's own checkout and buyer protection instead.",
        consequenceHeadline: "Good boundary. +9 Street Smart",
        consequenceBody:
          "The seller refuses and disappears from the app shortly after, confirming the listing was never legitimate.",
        whyItMatters:
          "A platform's built-in checkout exists specifically to protect buyers — a seller steering you away from it toward a private link is a strong warning sign.",
        scoreEffect: 9,
        attributeEffects: {
          scamRadar: 10,
          digitalSafety: 6,
          financialSense: 4,
        },
        isCautious: true,
      },
      {
        id: "request-in-person-inspection",
        label:
          "Insist on inspecting the generator in person before any payment changes hands.",
        consequenceHeadline: "A solid physical-world check. +8 Street Smart",
        consequenceBody:
          "The seller keeps making excuses to avoid an in-person meeting, which confirms there was likely never a real generator to sell.",
        whyItMatters:
          "For physical goods, an unwillingness to meet or let you inspect the item before payment is one of the clearest signs a listing isn't genuine.",
        scoreEffect: 8,
        attributeEffects: { scamRadar: 9, riskAwareness: 4 },
        isCautious: true,
      },
      {
        id: "pay-small-deposit-via-link",
        label:
          "Send a smaller deposit through his link to hold the item, planning to inspect before paying the rest.",
        consequenceHeadline: "The deposit alone was the goal. -6 Street Smart",
        consequenceBody:
          "The link still captures your card details from the smaller payment, and the seller stops responding once it's processed.",
        whyItMatters:
          "An unofficial payment link carries the same risk regardless of the amount sent through it — the danger is in the link itself, not the size of the transaction.",
        scoreEffect: -6,
        attributeEffects: { scamRadar: -5, digitalSafety: -5 },
        stateEffects: { cash: -40000 },
        isTrap: true,
      },
    ],
    tags: ["marketplace", "payment-link", "online-shopping"],
  },
];
