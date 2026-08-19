import { Scenario } from "@/types/game";

export const digitalScenarios: Scenario[] = [
  {
    id: "digital-01",
    title: "One Password for Everything",
    category: "digital",
    difficulty: "easy",
    city: "Lagos",
    situation:
      "You realize you've been using the exact same password for your email, banking app, and several shopping sites for years, since it's easy to remember.",
    decisions: [
      {
        id: "keep-same-password",
        label: "Keep using the same password everywhere since it's convenient.",
        consequenceHeadline: "One breach becomes many. -8 Street Smart",
        consequenceBody:
          "Months later, one of the smaller shopping sites is breached, and the leaked password is used to access your email and banking app too.",
        whyItMatters:
          "Reusing one password across accounts means a breach at the weakest, least secure site can expose all your other accounts, including your bank.",
        scoreEffect: -8,
        attributeEffects: {
          digitalSafety: -10,
          riskAwareness: -4,
          financialSense: 2,
        },
        stateEffects: { cash: -60000 },
        isTrap: true,
      },
      {
        id: "unique-passwords-manager",
        label:
          "Set unique passwords for important accounts, using a password manager to keep track.",
        consequenceHeadline: "Strong digital hygiene. +9 Street Smart",
        consequenceBody:
          "A breach at an unrelated site months later has zero effect on your email or banking, since each account uses a different password.",
        whyItMatters:
          "Unique passwords per account, managed through a password manager rather than memory, contain the damage of any single breach.",
        scoreEffect: 9,
        attributeEffects: {
          digitalSafety: 11,
          riskAwareness: 5,
          peopleSense: -2,
        },
      },
      {
        id: "change-only-bank-password",
        label:
          "Change only your banking password, and leave the rest as they are.",
        consequenceHeadline: "A partial fix. +2 Street Smart",
        consequenceBody:
          "Your banking is somewhat safer, but your email, often the key to resetting everything else, still shares a password with less secure sites.",
        whyItMatters:
          "Protecting your most sensitive account is a good start, but your email account is often the master key to everything else and deserves the same care.",
        scoreEffect: 2,
        attributeEffects: { digitalSafety: 4, peopleSense: -4 },
      },
      {
        id: "add-numbers-same-base",
        label:
          "Add different numbers to the end of the same base password for each site.",
        consequenceHeadline: "A weaker fix than it seems. -3 Street Smart",
        consequenceBody:
          "Attackers commonly test predictable variations of a leaked password, so the pattern doesn't actually offer meaningful extra protection.",
        whyItMatters:
          "Slightly modifying one base password is a common habit, but it's a well-known pattern that automated attacks specifically account for.",
        scoreEffect: -3,
        attributeEffects: {
          digitalSafety: -4,
          riskAwareness: -2,
          financialSense: 2,
        },
      },
    ],
    tags: ["passwords", "digital-hygiene", "account-security"],
  },
  {
    id: "digital-02",
    title: "Banking on Public WiFi",
    category: "digital",
    difficulty: "easy",
    city: "Abuja",
    situation:
      "Your phone data is low, and you're at a cafe with free public WiFi. You need to quickly check your bank balance and make a transfer.",
    decisions: [
      {
        id: "use-public-wifi",
        label:
          "Connect to the public WiFi and complete the banking transaction.",
        consequenceHeadline: "An avoidable exposure. -6 Street Smart",
        consequenceBody:
          "Nothing goes wrong this particular time, but unsecured public networks can allow others on the same network to intercept unencrypted traffic.",
        whyItMatters:
          "Open public WiFi networks are a known weak point for intercepting sensitive data — banking apps are exactly the kind of activity to avoid on them.",
        scoreEffect: -6,
        attributeEffects: {
          digitalSafety: -8,
          riskAwareness: -4,
          financialSense: 1,
        },
      },
      {
        id: "use-mobile-data-instead",
        label:
          "Use your mobile data instead, even if it means buying a small extra bundle.",
        consequenceHeadline:
          "A small cost for real protection. +7 Street Smart",
        attributeEffects: {
          digitalSafety: 8,
          financialSense: 2,
          peopleSense: -4,
        },
        consequenceBody:
          "The transaction goes through safely over your own encrypted mobile connection, at the cost of a small data bundle.",
        whyItMatters:
          "Using your own mobile data for sensitive tasks avoids the specific risks of shared, unsecured public networks, for a very small cost.",
        scoreEffect: 7,
        stateEffects: { cash: -500 },
      },
      {
        id: "wait-until-home",
        label: "Wait until you're back on a trusted network at home.",
        consequenceHeadline:
          "Safe, and only mildly inconvenient. +6 Street Smart",
        consequenceBody:
          "The transaction is delayed by a couple of hours, but completes safely once you're on a trusted connection.",
        whyItMatters:
          "Delaying a non-urgent sensitive transaction until you're on a trusted network is a simple, low-cost way to avoid unnecessary exposure.",
        scoreEffect: 6,
        attributeEffects: {
          digitalSafety: 6,
          riskAwareness: 4,
          peopleSense: -3,
        },
        isCautious: true,
      },
      {
        id: "use-vpn-on-public-wifi",
        label:
          "Connect to the public WiFi, but only after turning on a reputable VPN app.",
        consequenceHeadline:
          "A reasonable technical safeguard. +5 Street Smart",
        consequenceBody:
          "The VPN encrypts your traffic even over the public network, meaningfully reducing, though not eliminating, the risk.",
        whyItMatters:
          "A trustworthy VPN significantly reduces the risk of using public WiFi for sensitive tasks, though avoiding it entirely remains the safest option.",
        scoreEffect: 5,
        attributeEffects: { digitalSafety: 6, peopleSense: -2 },
      },
    ],
    tags: ["public-wifi", "banking", "digital-safety"],
  },
  {
    id: "digital-03",
    title: "The Fake Account Using Your Photos",
    category: "digital",
    difficulty: "medium",
    city: "Ibadan",
    situation:
      "A friend messages you, confused: an account using your name and profile photos, but not actually run by you, has been messaging her asking for money.",
    decisions: [
      {
        id: "ignore-it",
        label: "Ignore it, assuming it will resolve itself.",
        consequenceHeadline: "It doesn't resolve itself. -7 Street Smart",
        consequenceBody:
          "The fake account continues messaging more of your contacts over the following weeks, and one acquaintance actually sends money before realizing it wasn't you.",
        whyItMatters:
          "Impersonation accounts actively target your existing contacts and rely on your name's credibility — leaving it unaddressed lets the damage spread.",
        scoreEffect: -7,
        attributeEffects: {
          digitalSafety: -7,
          peopleSense: -4,
          riskAwareness: 3,
        },
      },
      {
        id: "report-and-warn",
        label:
          "Report the fake account to the platform and post a public warning to your contacts.",
        consequenceHeadline: "Fast, effective response. +10 Street Smart",
        consequenceBody:
          "The platform takes the account down within a couple of days, and your warning stops at least two other contacts from being fooled.",
        whyItMatters:
          "Reporting impersonation directly to the platform, combined with a clear public warning, is the most effective way to limit the damage to your name and your network.",
        scoreEffect: 10,
        attributeEffects: {
          digitalSafety: 10,
          peopleSense: 6,
          businessInstinct: -3,
        },
      },
      {
        id: "message-fake-account-directly",
        label:
          "Message the fake account yourself to confront whoever is behind it.",
        consequenceHeadline:
          "Unlikely to help, and it wastes time. -2 Street Smart",
        consequenceBody:
          "Confronting the account directly gets no useful response, and it delays the more effective steps of reporting and warning your actual contacts.",
        whyItMatters:
          "Engaging directly with an impersonation account rarely achieves anything — the more effective response is reporting it and alerting the people it's targeting.",
        scoreEffect: -2,
        attributeEffects: {
          digitalSafety: -2,
          riskAwareness: -2,
          financialSense: 1,
        },
      },
      {
        id: "delete-own-account",
        label:
          "Delete your real account entirely to distance yourself from the confusion.",
        consequenceHeadline: "An overcorrection. -4 Street Smart",
        consequenceBody:
          "The fake account remains active and unaffected, since deleting your real profile does nothing to stop it, while you lose your genuine presence and contacts.",
        whyItMatters:
          "Deleting your own account doesn't address an impersonator at all — the fix lies in reporting the fake account, not removing the real one.",
        scoreEffect: -4,
        attributeEffects: {
          digitalSafety: -3,
          peopleSense: -3,
          riskAwareness: 3,
        },
      },
    ],
    tags: ["impersonation", "social-media", "identity"],
  },
  {
    id: "digital-04",
    title: "Selling Your Old Phone",
    category: "digital",
    difficulty: "easy",
    city: "Enugu",
    situation:
      "You're selling your old phone online. It still has your banking apps, photos, and saved passwords on it, and a buyer is ready to pay and collect it today.",
    decisions: [
      {
        id: "sell-without-wiping",
        label:
          "Hand over the phone as-is, just logged out of the apps you remember.",
        consequenceHeadline: "You missed real risk. -8 Street Smart",
        consequenceBody:
          "The buyer later recovers some cached data and saved information from apps you forgot were still logged in, including a payment app.",
        whyItMatters:
          "Logging out of a few apps isn't the same as removing your data — cached files, saved passwords, and backups can remain accessible even after logout.",
        scoreEffect: -8,
        attributeEffects: {
          digitalSafety: -10,
          riskAwareness: -4,
          financialSense: 2,
        },
        isTrap: true,
      },
      {
        id: "factory-reset",
        label:
          "Perform a full factory reset and confirm all accounts are removed before handing it over.",
        consequenceHeadline: "Thorough and correct. +8 Street Smart",
        consequenceBody:
          "The phone is completely clean before sale, with no risk of leftover personal or financial data reaching the buyer.",
        whyItMatters:
          "A full factory reset is the standard, reliable way to ensure no personal data remains accessible on a device before it changes hands.",
        scoreEffect: 8,
        attributeEffects: {
          digitalSafety: 9,
          riskAwareness: 5,
          peopleSense: -2,
        },
      },
      {
        id: "remove-only-banking-app",
        label:
          "Just delete the banking app and figure the rest doesn't matter much.",
        consequenceHeadline: "A partial, risky fix. -3 Street Smart",
        consequenceBody:
          "The banking app is gone, but photos, saved messages, and other logged-in accounts remain fully accessible to the buyer.",
        whyItMatters:
          "Removing one sensitive app while leaving everything else intact still exposes a significant amount of personal information.",
        scoreEffect: -3,
        attributeEffects: { digitalSafety: -4, riskAwareness: 3 },
      },
      {
        id: "keep-phone-instead",
        label:
          "Decide not to sell it after all, keeping it as a backup device.",
        consequenceHeadline:
          "Safe, but you lose the sale value. +2 Street Smart",
        consequenceBody:
          "There's no data risk at all, but you also miss out on the cash the sale would have brought in.",
        whyItMatters:
          "Not selling avoids the risk entirely, though a proper factory reset would have let you get the sale value just as safely.",
        scoreEffect: 2,
        attributeEffects: { digitalSafety: 4, financialSense: -2 },
        isCautious: true,
      },
    ],
    tags: ["device-security", "data-privacy", "selling"],
  },
  {
    id: "digital-05",
    title: "Posting the Travel Itinerary",
    category: "digital",
    difficulty: "medium",
    city: "Lagos",
    situation:
      "You're excited about an upcoming two-week international trip and want to post your flight details and dates publicly on social media to share the news.",
    decisions: [
      {
        id: "post-full-details-public",
        label:
          "Post the full itinerary publicly, including exact dates you'll be away.",
        consequenceHeadline: "You advertised an empty house. -6 Street Smart",
        consequenceBody:
          "While you're away, your house is broken into — the public post made it easy for anyone to know exactly when it would be empty.",
        whyItMatters:
          "Publicly announcing exactly when you'll be away from home is information that can be misused by people well beyond your intended audience.",
        scoreEffect: -6,
        attributeEffects: {
          digitalSafety: -8,
          riskAwareness: -5,
          financialSense: 2,
        },
        stateEffects: { cash: -150000 },
        isTrap: true,
      },
      {
        id: "post-after-returning",
        label: "Wait and share photos and highlights after you're back home.",
        consequenceHeadline: "Enjoy the trip, share it safely. +8 Street Smart",
        consequenceBody:
          "You post a great recap after returning, sharing the excitement without ever broadcasting when your home was empty.",
        whyItMatters:
          "Sharing travel experiences after the fact captures the same social enjoyment without exposing exactly when your home is unattended.",
        scoreEffect: 8,
        attributeEffects: {
          digitalSafety: 9,
          riskAwareness: 5,
          peopleSense: -2,
        },
        isCautious: true,
      },
      {
        id: "post-to-close-friends-only",
        label:
          "Share the details, but limit the post to a private, close-friends list.",
        consequenceHeadline: "A reasonable middle ground. +5 Street Smart",
        consequenceBody:
          "The restricted audience significantly limits exposure, though it still relies on every person in that list keeping the information private too.",
        whyItMatters:
          "Limiting sensitive posts to a trusted, smaller audience meaningfully reduces risk, even though it isn't as airtight as waiting until after the trip.",
        scoreEffect: 5,
        attributeEffects: {
          digitalSafety: 5,
          riskAwareness: 3,
          peopleSense: -4,
        },
      },
      {
        id: "arrange-house-sitter-then-post",
        label:
          "Arrange for someone to stay at your house while away, then post the trip publicly.",
        consequenceHeadline: "A solid mitigation. +7 Street Smart",
        consequenceBody:
          "With someone present at home, the public post carries far less risk, and the trip goes smoothly with no incidents.",
        whyItMatters:
          "If you do want to share travel details publicly, addressing the underlying risk directly, like having someone home, is a practical way to do it more safely.",
        scoreEffect: 7,
        attributeEffects: {
          riskAwareness: 6,
          digitalSafety: 2,
          peopleSense: -3,
        },
        stateEffects: { cash: -20000 },
      },
    ],
    tags: ["oversharing", "social-media", "physical-safety"],
  },
  {
    id: "digital-06",
    title: "Tag Five Friends to Win",
    category: "digital",
    difficulty: "easy",
    city: "Kano",
    situation:
      'A post claims a well-known brand is giving away free smartphones. To enter, you need to tag five friends, share the post, and pay a small ₦2,000 "logistics fee" to claim your prize if selected.',
    decisions: [
      {
        id: "participate-and-pay",
        label:
          'Tag your friends, share the post, and pay the fee when "selected."',
        consequenceHeadline: "You paid to spread a scam. -7 Street Smart",
        consequenceBody:
          'You\'re told you "won" almost immediately, a common tactic, and after paying the fee, no phone ever arrives, while your tagged friends see the same fake post.',
        whyItMatters:
          "Giveaways requiring payment to claim a prize are a scam pattern designed to spread virally through your own social circle, using your trust to reach more people.",
        scoreEffect: -7,
        attributeEffects: {
          scamRadar: -7,
          digitalSafety: -5,
          riskAwareness: 1,
        },
        stateEffects: { cash: -2000 },
        isTrap: true,
      },
      {
        id: "check-official-brand-page",
        label:
          "Check the brand's actual official page to see if the giveaway is real before engaging.",
        consequenceHeadline: "Verification worked. +7 Street Smart",
        consequenceBody:
          "The brand's real official page has no mention of any such giveaway, confirming the post is fake before you tag anyone or pay anything.",
        whyItMatters:
          "Checking a company's own verified page is a quick way to confirm whether a viral giveaway is genuine before engaging with it at all.",
        scoreEffect: 7,
        attributeEffects: { scamRadar: 8, digitalSafety: 5 },
        isCautious: true,
      },
      {
        id: "ignore-scroll-past",
        label: "Ignore the post and scroll past without engaging.",
        consequenceHeadline: "Safe and simple. +5 Street Smart",
        consequenceBody:
          "You avoid any risk, and the post doesn't spread any further through your own tags and shares.",
        whyItMatters:
          "Not engaging at all with an unverified giveaway avoids both the financial risk and the risk of spreading it to your own contacts.",
        scoreEffect: 5,
        attributeEffects: { scamRadar: 5, digitalSafety: 3 },
        isCautious: true,
      },
      {
        id: "tag-friends-no-payment",
        label:
          "Tag your friends for a chance to win, but plan to refuse if a payment is ever requested.",
        consequenceHeadline: "Still spreads the trap. -4 Street Smart",
        consequenceBody:
          "Tagging friends still exposes them to the fake post directly, even though you personally avoid paying anything when the fee request comes.",
        whyItMatters:
          "Even without paying yourself, tagging friends in an unverified giveaway still spreads it to people who trust your judgment.",
        scoreEffect: -4,
        attributeEffects: { scamRadar: -3, peopleSense: -3 },
      },
    ],
    tags: ["giveaway-scam", "social-media", "viral-scam"],
  },
  {
    id: "digital-07",
    title: "Why Does a Flashlight App Need This?",
    category: "digital",
    difficulty: "medium",
    city: "Port Harcourt",
    situation:
      "You're installing a simple flashlight app, and it requests permission to access your contacts, SMS messages, and location before it will let you use it.",
    decisions: [
      {
        id: "grant-all-permissions",
        label:
          "Grant all the requested permissions to get the app working quickly.",
        consequenceHeadline: "Way more access than needed. -6 Street Smart",
        consequenceBody:
          "The app quietly begins harvesting your contact list and reading SMS messages, including one-time codes, in the background.",
        whyItMatters:
          "An app's permission requests should reasonably match its function — a flashlight app has no legitimate need for your contacts, messages, or location.",
        scoreEffect: -6,
        attributeEffects: { digitalSafety: -9, riskAwareness: -4 },
        isTrap: true,
      },
      {
        id: "deny-and-find-alternative",
        label:
          "Deny the unnecessary permissions and look for a more reputable alternative app.",
        consequenceHeadline: "A sharp instinct. +8 Street Smart",
        consequenceBody:
          "You find a well-reviewed flashlight app from your phone's built-in system tools that requires no unusual permissions at all.",
        whyItMatters:
          "Questioning why a simple app needs invasive permissions, and choosing an alternative when it doesn't add up, is a strong basic digital safety habit.",
        scoreEffect: 8,
        attributeEffects: { digitalSafety: 9, riskAwareness: 5 },
        isCautious: true,
      },
      {
        id: "grant-location-only",
        label: "Grant location access but deny contacts and SMS.",
        consequenceHeadline: "Still more than needed. -2 Street Smart",
        consequenceBody:
          "The app runs fine, but even location access has no real purpose for a flashlight tool, and it's tracked more than necessary as a result.",
        whyItMatters:
          "Even a single unnecessary permission is worth questioning — a flashlight app has no legitimate need for your location either.",
        scoreEffect: -2,
        attributeEffects: { digitalSafety: -3 },
      },
      {
        id: "check-reviews-first",
        label:
          "Check the app's reviews and permissions explanation before deciding.",
        consequenceHeadline: "A reasonable diligence step. +5 Street Smart",
        consequenceBody:
          "Other reviews flag the same excessive permissions as suspicious, confirming your instinct to avoid the app.",
        whyItMatters:
          "Checking reviews specifically for permission complaints can confirm a suspicion before you grant access to anything.",
        scoreEffect: 5,
        attributeEffects: { digitalSafety: 6, riskAwareness: 3 },
      },
    ],
    tags: ["app-permissions", "privacy", "mobile-security"],
  },
  {
    id: "digital-08",
    title: "Setting Up Two-Factor Authentication",
    category: "digital",
    difficulty: "easy",
    city: "Jos",
    situation:
      "Your banking app suggests turning on two-factor authentication (an extra code required at login, beyond just your password). It takes a few extra minutes to set up.",
    decisions: [
      {
        id: "skip-setup",
        label:
          "Skip it for now, since your password already feels secure enough.",
        consequenceHeadline: "A missed layer of protection. -4 Street Smart",
        consequenceBody:
          "Months later, your password is exposed in an unrelated data breach, and without a second layer of protection, your account is accessed directly.",
        whyItMatters:
          "A strong password alone can still be exposed through breaches or phishing — a second authentication factor protects you even when the password itself fails.",
        scoreEffect: -4,
        attributeEffects: { digitalSafety: -7, riskAwareness: -3 },
      },
      {
        id: "enable-2fa",
        label: "Take a few minutes to enable it properly.",
        consequenceHeadline:
          "A small effort, strong protection. +7 Street Smart",
        consequenceBody:
          "Months later, when your password is exposed in an unrelated breach, the second factor stops the attempted login cold.",
        whyItMatters:
          "Two-factor authentication is one of the highest-value, lowest-effort security steps available — it protects you even after a password is compromised.",
        scoreEffect: 7,
        attributeEffects: { digitalSafety: 9, riskAwareness: 4 },
        isCautious: true,
      },
      {
        id: "enable-then-share-codes",
        label:
          "Enable it, but you sometimes share the codes with a trusted family member for convenience.",
        consequenceHeadline: "Undermines its own purpose. -5 Street Smart",
        consequenceBody:
          'The habit of sharing codes "just this once" eventually leads to a code being shared during a moment of confusion, and unauthorized access follows.',
        whyItMatters:
          "A second authentication factor only works if it stays truly separate from anyone else — sharing codes, even with someone trusted, defeats its purpose.",
        scoreEffect: -5,
        attributeEffects: { digitalSafety: -6, riskAwareness: -3 },
      },
      {
        id: "enable-on-email-only",
        label: "Enable it on your email, but not on the banking app itself.",
        consequenceHeadline: "A partial, meaningful step. +3 Street Smart",
        consequenceBody:
          "Your email is well protected, which helps overall, but the banking app itself, the more directly financial account, remains only single-factor.",
        whyItMatters:
          "Protecting your email is valuable since it often controls password resets elsewhere, but your most financially sensitive accounts deserve the same protection directly.",
        scoreEffect: 3,
        attributeEffects: { digitalSafety: 4 },
      },
    ],
    tags: ["two-factor-authentication", "account-security", "banking"],
  },
  {
    id: "digital-09",
    title: "The Voice That Sounded Just Like Him",
    category: "digital",
    difficulty: "hard",
    city: "Abuja",
    situation:
      "You get a call, and the voice sounds exactly like your brother, panicked, saying he's been in an accident and needs ₦200,000 sent immediately to a hospital account before they'll treat him, begging you not to call anyone else first.",
    decisions: [
      {
        id: "send-immediately-trusting-voice",
        label:
          "Send the money immediately, trusting that it's really his voice.",
        consequenceHeadline:
          "Voices can now be convincingly faked. -13 Street Smart",
        consequenceBody:
          "Your actual brother is fine and never made the call. Increasingly accessible voice-cloning tools can now convincingly imitate a specific person's voice from short audio samples.",
        whyItMatters:
          "As voice-cloning technology becomes more accessible, a familiar-sounding voice alone is no longer reliable proof of who's actually speaking, especially in an urgent, high-pressure call.",
        scoreEffect: -13,
        attributeEffects: {
          digitalSafety: -10,
          scamRadar: -9,
          riskAwareness: -6,
        },
        stateEffects: { cash: -200000 },
        isTrap: true,
      },
      {
        id: "call-brother-separately",
        label:
          "Hang up and immediately call your brother's known number directly, despite the plea not to.",
        consequenceHeadline: "The one check that matters. +11 Street Smart",
        consequenceBody:
          "Your brother answers, confused and completely fine, confirming the call was fabricated. The specific request not to verify was itself the biggest warning sign.",
        whyItMatters:
          "A request that explicitly discourages you from verifying through another channel is one of the strongest signs something is wrong — that instruction is worth ignoring every time.",
        scoreEffect: 11,
        attributeEffects: {
          digitalSafety: 11,
          scamRadar: 10,
          riskAwareness: 5,
        },
        isCautious: true,
      },
      {
        id: "ask-verification-question",
        label:
          "Stay on the line and ask a specific personal question only your real brother would know.",
        consequenceHeadline:
          "A reasonable test, though calling separately is stronger. +6 Street Smart",
        consequenceBody:
          "The caller fumbles the answer and the call disconnects abruptly, confirming it wasn't genuine, though a well-prepared attacker with research could have answered correctly.",
        whyItMatters:
          "A verification question can work, but it's a weaker check than independently contacting the person through a channel the caller doesn't control.",
        scoreEffect: 6,
        attributeEffects: { scamRadar: 6, digitalSafety: 4 },
      },
      {
        id: "send-partial-first",
        label:
          "Send a smaller amount first while trying to reach your brother separately.",
        consequenceHeadline: "Still a real loss. -7 Street Smart",
        consequenceBody:
          "The smaller amount disappears just as completely, and by the time you actually reach your brother, the money is already gone.",
        whyItMatters:
          "If a request explicitly discourages verification, that verification should happen before any money moves, not alongside a partial payment.",
        scoreEffect: -7,
        attributeEffects: { scamRadar: -5, digitalSafety: -5 },
        stateEffects: { cash: -50000 },
        isTrap: true,
      },
    ],
    tags: ["voice-cloning", "impersonation", "family", "emerging-scams"],
  },
  {
    id: "digital-10",
    title: "The Breach Notification",
    category: "digital",
    difficulty: "medium",
    city: "Ibadan",
    situation:
      "You get an email from a shopping site you used two years ago, notifying you that its user database, including passwords, was breached. You haven't used that site or thought about its password since.",
    decisions: [
      {
        id: "ignore-old-account",
        label: "Ignore it, since you don't use that account anymore anyway.",
        consequenceHeadline:
          "The password's reach outlives the account. -6 Street Smart",
        consequenceBody:
          "It turns out that old password was reused on your email account too, and the leaked credentials are used to access it weeks later.",
        whyItMatters:
          "A breached password can still be dangerous long after you've abandoned the original account, if that same password was ever reused anywhere else.",
        scoreEffect: -6,
        attributeEffects: { digitalSafety: -8, riskAwareness: -4 },
      },
      {
        id: "change-reused-passwords",
        label:
          "Check where else that password might have been reused, and change it everywhere it appears.",
        consequenceHeadline: "Thorough and effective. +9 Street Smart",
        consequenceBody:
          "You find and update the same password on two other accounts, closing the exposure completely before it can be exploited.",
        whyItMatters:
          "A breach notification is worth acting on for any account where that same password might have been reused, not just the account named in the notice.",
        scoreEffect: 9,
        attributeEffects: { digitalSafety: 10, riskAwareness: 6 },
        isCautious: true,
      },
      {
        id: "delete-old-account-only",
        label: "Just delete the old shopping account and consider it handled.",
        consequenceHeadline: "Addresses the wrong thing. -3 Street Smart",
        consequenceBody:
          "Deleting the account doesn't undo the fact that the password was already leaked and may still be active elsewhere.",
        whyItMatters:
          "Deleting a breached account doesn't retroactively protect other accounts that shared the same now-exposed password.",
        scoreEffect: -3,
        attributeEffects: { digitalSafety: -3 },
      },
      {
        id: "forward-to-others",
        label:
          "Forward the notification to friends who might have also used that site.",
        consequenceHeadline: "A helpful extra step. +5 Street Smart",
        consequenceBody:
          "One friend, prompted by your message, realizes she'd reused the same password on her own email and changes it just in time.",
        whyItMatters:
          "Sharing a breach notification with people who might be affected extends the protective value of the warning beyond just yourself.",
        scoreEffect: 5,
        attributeEffects: { digitalSafety: 5, peopleSense: 4 },
      },
    ],
    tags: ["data-breach", "passwords", "account-security"],
  },
  {
    id: "digital-11",
    title: "A Stranger Messaging Your Sibling",
    category: "digital",
    difficulty: "medium",
    city: "Kaduna",
    situation:
      "You notice your 14-year-old sibling has been messaging with an adult stranger online for weeks, who's been asking increasingly personal questions and suggesting they keep the chats private from family.",
    decisions: [
      {
        id: "ignore-not-your-business",
        label: "Say nothing, assuming it's not really your place to intervene.",
        consequenceHeadline: "Silence leaves them exposed. -9 Street Smart",
        attributeEffects: { peopleSense: -8, riskAwareness: -6 },
        consequenceBody:
          "The messages continue, escalating over the following weeks, and by the time a parent finally notices, real harm has already been done.",
        whyItMatters:
          'An adult stranger pushing for secrecy with a minor is a well-documented grooming pattern — treating it as "not your business" leaves a vulnerable person unprotected.',
        scoreEffect: -9,
      },
      {
        id: "tell-parent-immediately",
        label: "Tell a parent or guardian immediately about what you noticed.",
        consequenceHeadline: "The right call, quickly made. +11 Street Smart",
        consequenceBody:
          "Your parents intervene right away, block the contact, and have an honest conversation with your sibling about the pattern you noticed.",
        whyItMatters:
          "A request for secrecy from an adult stranger toward a minor is one of the clearest warning signs there is — escalating it immediately to a responsible adult is the right response.",
        scoreEffect: 11,
        attributeEffects: {
          peopleSense: 9,
          riskAwareness: 6,
          digitalSafety: 4,
        },
      },
      {
        id: "confront-sibling-directly",
        label:
          "Confront your sibling directly and demand they stop talking to the stranger.",
        consequenceHeadline:
          "Well-intentioned, but it can backfire. -3 Street Smart",
        consequenceBody:
          "Your sibling feels caught out and simply moves the conversation to a different app you can't see, rather than actually stopping.",
        whyItMatters:
          "Confronting a young person directly, without involving a parent who can help set real boundaries, can just push a risky situation further out of view.",
        scoreEffect: -3,
        attributeEffects: { peopleSense: -3, riskAwareness: 2 },
      },
      {
        id: "monitor-quietly-first",
        label:
          "Keep an eye on the messages quietly for now, before deciding what to do.",
        consequenceHeadline: "Delay carries real risk here. -5 Street Smart",
        consequenceBody:
          "Watching without acting doesn't stop the pattern from continuing, and by the time you decide to say something, more damage has already occurred.",
        whyItMatters:
          "With a clear grooming pattern already visible, waiting to gather more evidence delays the protective step that actually matters — telling a responsible adult.",
        scoreEffect: -5,
        attributeEffects: { peopleSense: -4, riskAwareness: -3 },
      },
    ],
    tags: ["child-safety", "online-predators", "family"],
  },
  {
    id: "digital-12",
    title: "The Discount That Wants Your BVN",
    category: "digital",
    difficulty: "medium",
    city: "Benin City",
    situation:
      "A shopping app offers you a generous 30% discount if you \"verify your identity\" by submitting your BVN and a photo of your ID card directly through their in-app form, which isn't standard for the type of purchase you're making.",
    decisions: [
      {
        id: "submit-for-discount",
        label: "Submit your BVN and ID photo to get the discount.",
        consequenceHeadline: "Too much for too little. -9 Street Smart",
        consequenceBody:
          "Weeks later, you notice unfamiliar loan applications appear against your BVN, apparently opened using the identity information you submitted.",
        whyItMatters:
          "Your BVN and ID are sensitive identity documents that legitimate discount offers have no real reason to require — the request itself is disproportionate to a shopping discount.",
        scoreEffect: -9,
        attributeEffects: {
          digitalSafety: -10,
          scamRadar: -7,
          financialSense: -4,
        },
        isTrap: true,
      },
      {
        id: "decline-discount",
        label:
          "Decline the discount rather than share sensitive identity documents for it.",
        consequenceHeadline:
          "The discount wasn't worth the exposure. +8 Street Smart",
        consequenceBody:
          "You pay full price this time, but your identity information stays fully protected and unexposed.",
        whyItMatters:
          "A discount is never worth more than the risk of your BVN or ID being misused — the value on offer should match the sensitivity of what's requested.",
        scoreEffect: 8,
        attributeEffects: { digitalSafety: 9, scamRadar: 6 },
        isCautious: true,
      },
      {
        id: "check-if-required-by-law",
        label:
          "Research whether this type of purchase actually requires BVN verification before deciding.",
        consequenceHeadline: "Informed and careful. +9 Street Smart",
        consequenceBody:
          "You confirm that legitimate transactions of this kind never require BVN submission through a third-party shopping app, and decline with confidence.",
        whyItMatters:
          "Understanding when identity verification is genuinely required, versus when it's being requested unnecessarily, helps you tell a reasonable request from an exploitative one.",
        scoreEffect: 9,
        attributeEffects: { digitalSafety: 9, scamRadar: 7, financialSense: 3 },
        isCautious: true,
      },
      {
        id: "submit-id-only-not-bvn",
        label: "Submit the ID photo but refuse to share your BVN.",
        consequenceHeadline: "Still more exposure than needed. -3 Street Smart",
        consequenceBody:
          "Your ID photo alone is still valuable personal data, and providing it to an unnecessary request adds real risk for a modest discount.",
        whyItMatters:
          "Partially complying with an unjustified request for sensitive documents still exposes real risk — the core question is whether the request is necessary at all.",
        scoreEffect: -3,
        attributeEffects: { digitalSafety: -4 },
      },
    ],
    tags: ["identity-theft", "bvn", "data-privacy"],
  },
];
