import { Scenario } from "@/types/game";

export const workScenarios: Scenario[] = [
  {
    id: "work-01",
    title: "The First Offer",
    category: "work",
    difficulty: "easy",
    city: "Lagos",
    situation:
      'You\'ve just been offered a junior analyst role at ₦280,000/month, your first real corporate job. The recruiter says this is their "standard offer" and asks if you accept.',
    decisions: [
      {
        id: "accept-immediately",
        label: "Accept immediately, grateful for the offer.",
        consequenceHeadline: "You left something on the table. -3 Street Smart",
        consequenceBody:
          "You start the job happily, but later learn from a colleague that most new hires negotiate and typically land 10-15% above the initial offer.",
        whyItMatters:
          "Most companies expect some negotiation and build room into their first offer — accepting instantly, even gratefully, usually means leaving real money unclaimed.",
        scoreEffect: -3,
        attributeEffects: {
          negotiation: -6,
          careerJudgment: -2,
          riskAwareness: 2,
        },
      },
      {
        id: "negotiate-respectfully",
        label: "Thank them, then ask if there's flexibility on the number.",
        consequenceHeadline: "Reasonable ask, real result. +8 Street Smart",
        consequenceBody:
          "The recruiter comes back with ₦310,000, since the original offer did have room to move.",
        whyItMatters:
          "A polite, low-pressure ask for flexibility costs nothing and is expected in most professional hiring processes — silence is far more likely to cost you than asking.",
        scoreEffect: 8,
        attributeEffects: {
          negotiation: 9,
          careerJudgment: 4,
          peopleSense: -2,
        },
        stateEffects: { income: 30000 },
      },
      {
        id: "demand-large-increase",
        label: "Push hard for a 40% increase, citing your potential.",
        consequenceHeadline: "Overplayed a weak hand. -5 Street Smart",
        consequenceBody:
          "With no track record yet to justify such a jump, the recruiter withdraws slightly, offended, and the final offer ends up lower than the original.",
        whyItMatters:
          "Negotiation works best when the ask is grounded in market data or demonstrated value — an aggressive ask with no leverage can backfire.",
        scoreEffect: -5,
        attributeEffects: {
          negotiation: -4,
          careerJudgment: -3,
          riskAwareness: 3,
        },
        stateEffects: { income: -20000 },
      },
      {
        id: "decline-for-more-research",
        label: "Ask for a few days to research market rates before responding.",
        consequenceHeadline: "Measured and informed. +6 Street Smart",
        consequenceBody:
          "Armed with real salary data for the role, you come back with a specific, justified counter that the recruiter respects and largely accepts.",
        whyItMatters:
          "Taking a short pause to gather real information before negotiating usually produces a stronger, more credible counteroffer than negotiating on instinct alone.",
        scoreEffect: 6,
        attributeEffects: {
          negotiation: 7,
          careerJudgment: 5,
          peopleSense: -3,
        },
        stateEffects: { income: 20000 },
      },
    ],
    tags: ["salary-negotiation", "first-job", "offer"],
  },
  {
    id: "work-02",
    title: "Called Out in the Meeting",
    category: "work",
    difficulty: "medium",
    city: "Abuja",
    situation:
      "In a team meeting, your manager criticizes a report you submitted in front of everyone, in a sharper tone than the mistake warrants, and it isn't the first time this has happened publicly.",
    decisions: [
      {
        id: "argue-back-publicly",
        label: "Push back on the criticism right there in the meeting.",
        consequenceHeadline:
          "Understandable, but costly timing. -6 Street Smart",
        consequenceBody:
          "You make a fair point, but doing it publicly embarrasses your manager in front of the team, and the relationship gets noticeably colder afterward.",
        whyItMatters:
          "Even valid pushback can backfire if it happens in a way that publicly embarrasses someone with authority over you — the venue matters as much as the content.",
        scoreEffect: -6,
        attributeEffects: {
          careerJudgment: -6,
          peopleSense: -5,
          negotiation: 2,
        },
      },
      {
        id: "stay-quiet-forever",
        label: "Say nothing in the meeting or afterward, and let it go.",
        consequenceHeadline: "It keeps happening. -4 Street Smart",
        consequenceBody:
          "Without any feedback, the manager assumes the behavior is fine, and the public criticism becomes a recurring pattern.",
        whyItMatters:
          "Absorbing repeated public criticism without ever addressing it tends to reinforce the behavior rather than end it.",
        scoreEffect: -4,
        attributeEffects: { careerJudgment: -3, riskAwareness: 3 },
        isCautious: true,
      },
      {
        id: "request-private-conversation",
        label:
          "Ask for a private conversation afterward to address the pattern calmly.",
        consequenceHeadline: "Professional and effective. +9 Street Smart",
        consequenceBody:
          "Your manager is somewhat defensive at first but agrees to give feedback privately going forward, and the public criticism largely stops.",
        whyItMatters:
          "Addressing a pattern of behavior privately, rather than in the moment publicly, gives the other person room to hear it without feeling cornered — and it tends to actually work.",
        scoreEffect: 9,
        attributeEffects: {
          careerJudgment: 8,
          negotiation: 6,
          peopleSense: 5,
          riskAwareness: -2,
        },
      },
      {
        id: "start-job-search",
        label:
          "Say nothing to your manager, but quietly start looking for a new job.",
        consequenceHeadline:
          "A fair backup plan, addresses nothing now. +2 Street Smart",
        consequenceBody:
          "You feel some relief having options open, but the immediate work environment doesn't improve while you search.",
        whyItMatters:
          "Building an exit option is reasonable, but it's a parallel track, not a substitute for addressing a fixable problem in your current role.",
        scoreEffect: 2,
        attributeEffects: {
          riskAwareness: 4,
          careerJudgment: 2,
          peopleSense: -4,
        },
        isCautious: true,
      },
    ],
    tags: ["management", "conflict", "public-criticism"],
  },
  {
    id: "work-03",
    title: "Who Gets the Credit",
    category: "work",
    difficulty: "medium",
    city: "Port Harcourt",
    situation:
      'You built a proposal that landed a major client. In the celebratory email to leadership, your colleague, who only reviewed it briefly, is described as having "led" the effort. Your name isn\'t mentioned.',
    decisions: [
      {
        id: "say-nothing",
        label: "Say nothing and let it go, to avoid seeming petty.",
        consequenceHeadline: "The pattern will likely repeat. -6 Street Smart",
        consequenceBody:
          "Leadership continues to associate the win with your colleague, who gets a lightweight assignment as a reward while your workload stays the same.",
        whyItMatters:
          "Staying silent about credit theft doesn't come across as humility to the people making decisions — it just means the record stands uncorrected.",
        scoreEffect: -6,
        attributeEffects: {
          careerJudgment: -6,
          peopleSense: -3,
          riskAwareness: 2,
        },
        isCautious: true,
      },
      {
        id: "email-leadership-directly",
        label: "Reply-all to correct the record and clarify your role.",
        consequenceHeadline:
          "Technically accurate, socially costly. -4 Street Smart",
        consequenceBody:
          "The correction is noted, but publicly contradicting the email in front of everyone makes you look combative rather than simply accurate.",
        whyItMatters:
          "Correcting the record matters, but doing it in the most public, confrontational way available usually costs more socially than it needs to.",
        scoreEffect: -4,
        attributeEffects: {
          careerJudgment: -3,
          peopleSense: -5,
          negotiation: -2,
          riskAwareness: 1,
        },
      },
      {
        id: "talk-to-manager-privately",
        label:
          "Speak privately with your manager to clarify your contribution and ask for it to be recognized going forward.",
        consequenceHeadline: "Assertive and well-placed. +9 Street Smart",
        consequenceBody:
          "Your manager wasn't aware of the details, thanks you for clarifying, and makes a point of crediting you directly in the next update.",
        whyItMatters:
          "Advocating for your own credit through the right channel, privately with the person who actually makes decisions about you, tends to work far better than a public correction.",
        scoreEffect: 9,
        attributeEffects: {
          careerJudgment: 8,
          negotiation: 6,
          peopleSense: 4,
          riskAwareness: -4,
        },
      },
      {
        id: "confront-colleague",
        label:
          "Confront your colleague directly and accuse them of stealing credit.",
        consequenceHeadline:
          "Escalated before you had the full picture. -5 Street Smart",
        consequenceBody:
          "Your colleague claims it wasn't intentional and the conversation turns tense, straining a working relationship you still need day-to-day.",
        whyItMatters:
          "Direct confrontation assumes the worst intent before understanding what happened — even when you're right about the outcome, that assumption can cost you the relationship.",
        scoreEffect: -5,
        attributeEffects: {
          peopleSense: -6,
          careerJudgment: -3,
          riskAwareness: 2,
        },
      },
    ],
    tags: ["credit", "office-politics", "recognition"],
  },
  {
    id: "work-04",
    title: "Passed Over",
    category: "work",
    difficulty: "medium",
    city: "Ibadan",
    situation:
      "A promotion you expected, and were told you were a strong candidate for, goes to a colleague with less tenure but a closer relationship with the department head.",
    decisions: [
      {
        id: "resign-in-frustration",
        label: "Resign immediately out of frustration.",
        consequenceHeadline: "A reaction, not a plan. -8 Street Smart",
        consequenceBody:
          "You leave without another offer lined up, and the financial gap of unemployment turns out to be harder than staying and addressing it would have been.",
        whyItMatters:
          "Quitting in the heat of frustration, without a next step secured, converts a career setback into an immediate financial one too.",
        scoreEffect: -8,
        attributeEffects: {
          careerJudgment: -8,
          riskAwareness: -6,
          financialSense: -4,
          scamRadar: 1,
        },
        stateEffects: { income: -280000 },
      },
      {
        id: "request-feedback",
        label:
          "Request honest feedback from your manager about the decision and what to work on.",
        consequenceHeadline: "A career-building move. +9 Street Smart",
        consequenceBody:
          "The feedback reveals a real, fixable gap: you'd delivered great individual work but hadn't visibly built relationships across departments. You start addressing it directly.",
        whyItMatters:
          "Asking for specific, honest feedback after a setback turns a frustrating moment into concrete information you can actually act on.",
        scoreEffect: 9,
        attributeEffects: {
          careerJudgment: 9,
          peopleSense: 5,
          negotiation: 3,
          riskAwareness: -4,
        },
      },
      {
        id: "quiet-disengage",
        label: "Stay in the role, but quietly do the minimum from now on.",
        consequenceHeadline: "A slow-motion setback. -6 Street Smart",
        consequenceBody:
          "Reduced effort is noticed within a few months, further limiting your standing for the next opportunity that comes up.",
        whyItMatters:
          "Disengaging in response to a setback tends to reinforce the exact perception, being seen as less invested, that may have contributed to being passed over.",
        scoreEffect: -6,
        attributeEffects: {
          careerJudgment: -6,
          businessInstinct: -3,
          riskAwareness: 2,
        },
      },
      {
        id: "explore-external-options",
        label:
          "Start quietly exploring opportunities at other companies while performing well where you are.",
        consequenceHeadline: "A sound parallel strategy. +6 Street Smart",
        consequenceBody:
          "Within a couple of months, a stronger offer elsewhere gives you real leverage, and you make your decision from a position of strength rather than frustration.",
        whyItMatters:
          "Building outside options while continuing to perform well protects you from being stuck, without requiring a reactive resignation.",
        scoreEffect: 6,
        attributeEffects: {
          careerJudgment: 6,
          riskAwareness: 5,
          peopleSense: -2,
        },
      },
    ],
    tags: ["promotion", "setback", "career-growth"],
  },
  {
    id: "work-05",
    title: "The Side Hustle Question",
    category: "work",
    difficulty: "medium",
    city: "Lagos",
    situation:
      "You've started a small graphic design side hustle in the evenings. A client contract for your day job lands on your desk that's remarkably similar to a project you could take on independently, for far more money, on the side.",
    decisions: [
      {
        id: "quietly-redirect",
        label:
          "Quietly steer the client toward your side hustle instead of your employer.",
        consequenceHeadline: "This crosses a real line. -12 Street Smart",
        consequenceBody:
          "Your employer eventually discovers the redirected client relationship. It's treated as a serious breach of trust, and your job is now at risk.",
        whyItMatters:
          "Diverting a client from your employer to your own business, without disclosure, is a conflict of interest that can end a career, not just a single relationship.",
        scoreEffect: -12,
        attributeEffects: {
          careerJudgment: -12,
          peopleSense: -6,
          businessInstinct: -4,
          riskAwareness: 3,
        },
        stateEffects: { reputation: -15 },
        isTrap: true,
      },
      {
        id: "disclose-and-ask",
        label:
          "Disclose the side hustle to your manager and ask how to handle the potential conflict.",
        consequenceHeadline: "Transparent and professional. +10 Street Smart",
        consequenceBody:
          "Your manager appreciates the honesty, and you agree on a clear boundary: you'll handle the work project fully at your job, keeping the side hustle for unrelated clients.",
        whyItMatters:
          "Disclosing a potential conflict of interest before it becomes a problem protects both your job and your side business, and builds real trust with your employer.",
        scoreEffect: 10,
        attributeEffects: {
          careerJudgment: 10,
          businessInstinct: 5,
          peopleSense: 5,
          riskAwareness: -3,
        },
      },
      {
        id: "do-both-secretly",
        label:
          "Take the work project as normal, but don't mention the side hustle at all.",
        consequenceHeadline:
          "No violation yet, but a growing risk. -1 Street Smart",
        consequenceBody:
          "Nothing goes wrong this time, but the side hustle stays a secret your employer could stumble onto at any point, especially as it grows.",
        whyItMatters:
          "Not disclosing a side business isn't automatically a problem, but keeping it invisible means any future overlap with your job carries more risk than it needs to.",
        scoreEffect: -1,
        attributeEffects: { riskAwareness: -3, businessInstinct: 2 },
      },
      {
        id: "drop-side-hustle",
        label:
          "Pause the side hustle entirely to avoid any appearance of conflict.",
        consequenceHeadline:
          "Safe, but a real opportunity cost. -2 Street Smart",
        consequenceBody:
          "There's no risk to your job, but the side hustle loses momentum and a couple of clients move on to other designers during the pause.",
        whyItMatters:
          "Avoiding all risk by shutting down a legitimate side business is safe, but it isn't free — sometimes a clear boundary works just as well as stopping entirely.",
        scoreEffect: -2,
        attributeEffects: { riskAwareness: 5, businessInstinct: -8 },
        isCautious: true,
      },
    ],
    tags: ["side-hustle", "conflict-of-interest", "ethics"],
  },
  {
    id: "work-06",
    title: "Handing In Your Notice",
    category: "work",
    difficulty: "easy",
    city: "Enugu",
    situation:
      "You've accepted a new job and need to resign from your current one. You've been unhappy here for a while and are tempted to be blunt about why in your resignation conversation.",
    decisions: [
      {
        id: "vent-honestly",
        label: "Be fully candid about everything that frustrated you.",
        consequenceHeadline:
          "Satisfying in the moment, costly later. -6 Street Smart",
        consequenceBody:
          "It feels good to finally say it, but your manager remembers the tone, and a reference check a year later is noticeably lukewarm.",
        whyItMatters:
          "How you leave a job tends to be remembered longer than how you performed in it — venting on the way out rarely helps and can quietly follow you.",
        scoreEffect: -6,
        attributeEffects: {
          careerJudgment: -8,
          peopleSense: -6,
          riskAwareness: 1,
        },
      },
      {
        id: "professional-resignation",
        label:
          "Resign professionally, giving proper notice and constructive, measured feedback if asked.",
        consequenceHeadline: "Clean exit. +9 Street Smart",
        consequenceBody:
          "Your manager appreciates the notice and the respectful tone. A year later, a strong reference from this job helps you land an even better opportunity.",
        whyItMatters:
          "A professional exit protects your reputation and keeps a door open you may not realize you'll need again — the industry is smaller than it looks.",
        scoreEffect: 9,
        attributeEffects: {
          careerJudgment: 9,
          peopleSense: 6,
          negotiation: 3,
          riskAwareness: -4,
        },
      },
      {
        id: "no-notice-leave-immediately",
        label: "Leave immediately without serving any notice period.",
        consequenceHeadline: "It burns a bridge you may need. -8 Street Smart",
        consequenceBody:
          "The abrupt departure leaves your team scrambling and your former employer unwilling to serve as a reference going forward.",
        whyItMatters:
          "Skipping a notice period, even when you're eager to leave, can damage a professional relationship in a way that outlasts the discomfort of a few more weeks.",
        scoreEffect: -8,
        attributeEffects: {
          careerJudgment: -9,
          peopleSense: -6,
          riskAwareness: 2,
        },
      },
      {
        id: "resign-in-writing-only",
        label:
          "Send a brief resignation email and avoid any in-person conversation.",
        consequenceHeadline: "Functional, but impersonal. -1 Street Smart",
        consequenceBody:
          "The resignation is processed fine, but the lack of a direct conversation leaves your manager with a slightly worse impression than the work itself earned.",
        whyItMatters:
          "A written resignation gets the job done, but an in-person or call-based conversation usually leaves a stronger, more professional final impression.",
        scoreEffect: -1,
        attributeEffects: {
          peopleSense: -3,
          careerJudgment: -1,
          riskAwareness: 1,
        },
      },
    ],
    tags: ["resignation", "professionalism", "references"],
  },
  {
    id: "work-07",
    title: "Something Doesn't Add Up",
    category: "work",
    difficulty: "hard",
    city: "Kaduna",
    situation:
      "While reviewing expense records for your department, you notice a pattern suggesting your direct manager has been submitting inflated reimbursement claims for months. No one else seems to have noticed.",
    decisions: [
      {
        id: "ignore-it",
        label: "Say nothing, since it isn't your responsibility.",
        consequenceHeadline: "Silence has its own risk. -5 Street Smart",
        consequenceBody:
          "Months later, an internal audit uncovers the pattern anyway, and anyone who had visibility into the records without reporting it faces uncomfortable questions.",
        whyItMatters:
          "Staying silent about clear financial irregularity you've directly observed can still implicate you later, even if you weren't the one committing it.",
        scoreEffect: -5,
        attributeEffects: { careerJudgment: -5, riskAwareness: -4 },
        isCautious: true,
      },
      {
        id: "report-through-channels",
        label:
          "Report your concern through the proper internal channel, such as HR or an ethics line.",
        consequenceHeadline: "Handled the right way. +11 Street Smart",
        consequenceBody:
          "An investigation confirms the issue and is handled appropriately at a senior level. Your report was documented and kept confidential.",
        whyItMatters:
          "Formal reporting channels exist specifically to let people raise serious concerns without having to confront the situation personally or informally.",
        scoreEffect: 11,
        attributeEffects: { careerJudgment: 10, riskAwareness: 6 },
      },
      {
        id: "confront-manager-directly",
        label: "Raise it directly with your manager one-on-one first.",
        consequenceHeadline:
          "Well-intentioned, but risky positioning. -4 Street Smart",
        consequenceBody:
          "Your manager becomes defensive and the working relationship deteriorates sharply, while the underlying issue still isn't formally addressed.",
        whyItMatters:
          "Confronting a superior directly about a serious integrity issue, without involving a formal process, leaves you personally exposed with no protection if it goes badly.",
        scoreEffect: -4,
        attributeEffects: {
          careerJudgment: -3,
          peopleSense: -4,
          riskAwareness: -3,
        },
      },
      {
        id: "gossip-with-colleagues",
        label:
          "Mention your suspicion informally to a few trusted colleagues to see what they think.",
        consequenceHeadline:
          "This spreads risk without solving anything. -7 Street Smart",
        consequenceBody:
          "The rumor spreads faster than expected, reaching your manager in a distorted form before any formal process begins, and you're identified as the source.",
        whyItMatters:
          "Informal discussion of a serious allegation tends to spread unpredictably and can expose you to backlash without ever triggering a proper investigation.",
        scoreEffect: -7,
        attributeEffects: { careerJudgment: -6, peopleSense: -5 },
      },
    ],
    tags: ["ethics", "whistleblowing", "workplace-fraud"],
  },
  {
    id: "work-08",
    title: 'The Unpaid "Small Addition"',
    category: "work",
    difficulty: "medium",
    city: "Abeokuta",
    situation:
      "You're a freelance web developer finishing a project on schedule. The client messages: \"Since we're already working together, can you also add a small booking system? Shouldn't take long.\" It's actually a significant feature outside the original agreement.",
    decisions: [
      {
        id: "add-for-free",
        label: "Add it for free to keep the client happy.",
        consequenceHeadline:
          "Generous, and it sets a precedent. -6 Street Smart",
        consequenceBody:
          'The client is pleased, and starts treating "small additions" as a normal, unpaid part of every future project with you.',
        whyItMatters:
          "Doing significant unpaid work to please a client often teaches them that your scope is negotiable for free, rather than earning lasting goodwill.",
        scoreEffect: -6,
        attributeEffects: { businessInstinct: -8, negotiation: -5 },
      },
      {
        id: "quote-separately",
        label:
          "Explain it's outside the original scope and send a separate quote for it.",
        consequenceHeadline: "Clear and professional. +9 Street Smart",
        consequenceBody:
          "The client accepts the quote without pushback, and respects you more, not less, for handling it professionally.",
        whyItMatters:
          "Treating scope changes as new, billable work, calmly and without apology, is standard practice and usually earns respect rather than losing the client.",
        scoreEffect: 9,
        attributeEffects: { businessInstinct: 9, negotiation: 8 },
        stateEffects: { income: 60000 },
      },
      {
        id: "refuse-outright",
        label: "Refuse the request entirely and end the conversation there.",
        consequenceHeadline: "A missed opportunity. -2 Street Smart",
        consequenceBody:
          "The client is a little put off by the flat refusal and takes the additional work to another developer instead, along with future projects.",
        whyItMatters:
          "A flat no without offering an alternative can needlessly close the door on paid work you'd actually have wanted, just quoted properly.",
        scoreEffect: -2,
        attributeEffects: { negotiation: -3, businessInstinct: -2 },
        isCautious: true,
      },
      {
        id: "add-partial-free-rest-paid",
        label:
          "Add a small piece for free as goodwill, and quote the rest as additional scope.",
        consequenceHeadline: "A balanced middle ground. +5 Street Smart",
        consequenceBody:
          "The client appreciates the gesture and accepts the quote for the larger piece without objection.",
        whyItMatters:
          "A small goodwill gesture combined with a clear boundary on the bulk of new work can build the relationship without giving away your time entirely.",
        scoreEffect: 5,
        attributeEffects: {
          businessInstinct: 6,
          negotiation: 5,
          peopleSense: 3,
        },
        stateEffects: { income: 40000 },
      },
    ],
    tags: ["freelance", "scope-creep", "contract-work"],
  },
  {
    id: "work-09",
    title: "Salary History Question",
    category: "work",
    difficulty: "medium",
    city: "Jos",
    situation:
      'In an interview for a role with a wider salary band than your current job, the interviewer asks directly: "What\'s your current salary?" You know your honest answer is below what the role could pay.',
    decisions: [
      {
        id: "answer-exact-figure",
        label: "State your exact current salary honestly.",
        consequenceHeadline: "Honest, but it anchors you low. -4 Street Smart",
        consequenceBody:
          "The final offer comes in only slightly above your current salary, anchored by the number you gave rather than the role's actual value.",
        whyItMatters:
          "Sharing your current salary directly often anchors the new offer close to it, even when the role's actual market value is significantly higher.",
        scoreEffect: -4,
        attributeEffects: { negotiation: -6, careerJudgment: -2 },
      },
      {
        id: "redirect-to-range",
        label:
          "Redirect to the expected range for the new role instead of your current pay.",
        consequenceHeadline: "A strong negotiating move. +9 Street Smart",
        consequenceBody:
          "The interviewer respects the redirection and shares the role's actual band, letting you negotiate based on the job's value rather than your history.",
        whyItMatters:
          "Focusing the conversation on the new role's value, rather than your current pay, keeps the negotiation anchored to what the position is actually worth.",
        scoreEffect: 9,
        attributeEffects: { negotiation: 10, careerJudgment: 5 },
        stateEffects: { income: 90000 },
      },
      {
        id: "inflate-figure",
        label: "State a higher figure than your actual current salary.",
        consequenceHeadline: "A risky misrepresentation. -8 Street Smart",
        consequenceBody:
          "A background or reference check later reveals the discrepancy, raising doubts about your honesty just as an offer was being finalized.",
        whyItMatters:
          "Misrepresenting your salary history can be checked and, if discovered, damages trust far more than simply declining to answer would have.",
        scoreEffect: -8,
        attributeEffects: { careerJudgment: -9, negotiation: -3 },
        isTrap: true,
      },
      {
        id: "decline-to-answer",
        label: "Politely decline to share the figure, citing it as personal.",
        consequenceHeadline:
          "A fair boundary, some awkwardness. +4 Street Smart",
        consequenceBody:
          "The interviewer moves on without pressing further, and the conversation continues, though the moment felt slightly tense.",
        whyItMatters:
          "You're generally not obligated to share salary history, and declining respectfully protects your negotiating position, even if it feels uncomfortable in the moment.",
        scoreEffect: 4,
        attributeEffects: { negotiation: 5, careerJudgment: 3 },
      },
    ],
    tags: ["interview", "salary-negotiation", "job-search"],
  },
  {
    id: "work-10",
    title: 'Always "Just This Once"',
    category: "work",
    difficulty: "medium",
    city: "Kano",
    situation:
      "For the third weekend in a row, your manager asks you to work unpaid overtime, framing it each time as a one-off emergency. Your contract doesn't include weekend work.",
    decisions: [
      {
        id: "keep-complying",
        label: "Agree again, not wanting to seem uncooperative.",
        consequenceHeadline:
          "The pattern is now the expectation. -7 Street Smart",
        consequenceBody:
          "Weekend work quietly becomes assumed as part of your role, without any adjustment to pay or formal recognition.",
        whyItMatters:
          'Repeated "one-off" requests that keep happening are, functionally, a new expectation — treating each one as isolated lets the pattern set in without ever being addressed.',
        scoreEffect: -7,
        attributeEffects: { careerJudgment: -6, negotiation: -5 },
      },
      {
        id: "raise-pattern-with-manager",
        label:
          "Point out the pattern to your manager and ask to discuss fair compensation or boundaries.",
        consequenceHeadline: "Assertive and reasonable. +9 Street Smart",
        consequenceBody:
          "Your manager hadn't tracked how often it had happened, and agrees to either compensate weekend work going forward or genuinely limit it to real emergencies.",
        whyItMatters:
          "Naming a pattern directly, calmly and with a proposed solution, tends to get a better response than either silent compliance or refusal.",
        scoreEffect: 9,
        attributeEffects: { negotiation: 9, careerJudgment: 6 },
        stateEffects: { income: 20000 },
      },
      {
        id: "refuse-this-time",
        label: "Refuse this time without any explanation.",
        consequenceHeadline:
          "Understandable, handled abruptly. -1 Street Smart",
        consequenceBody:
          "The immediate weekend is yours, but your manager is caught off guard and slightly resentful, since the underlying pattern was never discussed.",
        whyItMatters:
          "Refusing a specific instance is fair, but without explaining the pattern behind it, the decision can read as random rather than principled.",
        scoreEffect: -1,
        attributeEffects: { negotiation: 2, peopleSense: -4 },
      },
      {
        id: "document-and-escalate",
        label: "Document the pattern and raise it formally with HR.",
        consequenceHeadline:
          "Thorough, if a bit heavy for a first step. +3 Street Smart",
        consequenceBody:
          "HR addresses it, but the formal escalation, skipping a direct conversation first, creates some unnecessary tension with your manager.",
        whyItMatters:
          "Formal escalation is a legitimate tool, but for a fixable pattern, it's often worth trying a direct conversation first before going over someone's head.",
        scoreEffect: 3,
        attributeEffects: {
          careerJudgment: 3,
          peopleSense: -3,
          riskAwareness: 4,
        },
      },
    ],
    tags: ["overtime", "boundaries", "workplace"],
  },
  {
    id: "work-11",
    title: "The Awkward Networking Event",
    category: "work",
    difficulty: "easy",
    city: "Lagos",
    situation:
      "You're invited to an industry networking event where you know almost no one. You're tired after a long week and considering skipping it entirely.",
    decisions: [
      {
        id: "skip-event",
        label: "Skip it and rest instead.",
        consequenceHeadline:
          "Restful, but a missed connection. -2 Street Smart",
        consequenceBody:
          "You feel better rested, but later hear that a hiring manager for a role you'd have wanted was actively looking for candidates at that event.",
        whyItMatters:
          "Rest matters, but consistently skipping opportunities to build a professional network has a real, if invisible, long-term cost.",
        scoreEffect: -2,
        attributeEffects: { careerJudgment: -4, peopleSense: -2 },
        isCautious: true,
      },
      {
        id: "attend-and-engage",
        label:
          "Attend, and make a point of introducing yourself to a few new people.",
        consequenceHeadline: "Small effort, real payoff. +7 Street Smart",
        consequenceBody:
          "You have a genuinely useful conversation with someone in your field who later refers you to an open role at their company.",
        whyItMatters:
          "Consistent, low-key networking, even when it's inconvenient, quietly compounds into opportunities that rarely show up any other way.",
        scoreEffect: 7,
        attributeEffects: { peopleSense: 8, careerJudgment: 6 },
      },
      {
        id: "attend-but-stay-quiet",
        label: "Attend, but mostly stay near people you already know.",
        consequenceHeadline:
          "Present, but not really participating. +1 Street Smart",
        consequenceBody:
          "You show up, but the evening doesn't produce any new connections, since you stayed in your comfort zone the whole time.",
        whyItMatters:
          "Simply attending an event without engaging captures little of its value — the benefit of networking comes from the conversations, not the attendance.",
        scoreEffect: 1,
        attributeEffects: { peopleSense: 2 },
      },
      {
        id: "send-apology-connect-later",
        label:
          "Skip the event, but message the organizer to connect with a few attendees afterward.",
        consequenceHeadline: "A reasonable compromise. +4 Street Smart",
        consequenceBody:
          "You get some rest and still manage to build one or two useful connections asynchronously, though it's less effective than being there in person.",
        whyItMatters:
          "When you can't attend in person, following up directly afterward can recover some, though not all, of the networking value.",
        scoreEffect: 4,
        attributeEffects: { peopleSense: 4, careerJudgment: 2 },
      },
    ],
    tags: ["networking", "career-growth"],
  },
  {
    id: "work-12",
    title: "Taking on a Mentee",
    category: "work",
    difficulty: "easy",
    city: "Enugu",
    situation:
      "A junior colleague asks if you'd informally mentor them. You're genuinely busy with your own deadlines, but you remember how much a mentor helped you early in your career.",
    decisions: [
      {
        id: "decline-too-busy",
        label: "Decline, citing your workload.",
        consequenceHeadline:
          "Understandable, but a quiet cost. -1 Street Smart",
        consequenceBody:
          "Your deadlines stay protected, but you miss a chance to build a relationship that often pays off in reputation and network over time.",
        whyItMatters:
          "Protecting your time is legitimate, but mentoring, even in small doses, tends to build a form of professional reputation that's easy to underestimate.",
        scoreEffect: -1,
        attributeEffects: { peopleSense: -3, careerJudgment: -1 },
        isCautious: true,
      },
      {
        id: "set-limited-scope",
        label:
          "Agree, but set clear limits, like one short check-in every two weeks.",
        consequenceHeadline: "Sustainable and generous. +8 Street Smart",
        consequenceBody:
          "The bounded arrangement works well for both of you. Your mentee grows quickly, and your own deadlines stay on track.",
        whyItMatters:
          "Mentoring doesn't have to be unlimited to be valuable — a small, well-defined commitment can deliver most of the benefit without derailing your own priorities.",
        scoreEffect: 8,
        attributeEffects: { peopleSense: 8, careerJudgment: 6 },
      },
      {
        id: "agree-unlimited",
        label: "Agree to be available whenever they need help.",
        consequenceHeadline: "Generous, but it strains you. -3 Street Smart",
        consequenceBody:
          "The open-ended commitment starts eating into your own deadlines, and after a few weeks you're behind on your own work.",
        whyItMatters:
          "An unbounded commitment, even a well-meaning one, can quietly become unsustainable and end up hurting both your own performance and the mentoring relationship.",
        scoreEffect: -3,
        attributeEffects: { peopleSense: 4, careerJudgment: -6 },
      },
      {
        id: "connect-with-someone-else",
        label:
          "Decline yourself, but connect them with a colleague who has more bandwidth.",
        consequenceHeadline: "A thoughtful redirect. +5 Street Smart",
        consequenceBody:
          "Your junior colleague gets a mentor after all, and appreciates that you took the time to make a useful connection instead of just saying no.",
        whyItMatters:
          "When you genuinely can't take something on, actively connecting someone to another resource is often just as valuable as doing it yourself.",
        scoreEffect: 5,
        attributeEffects: { peopleSense: 6, careerJudgment: 3 },
      },
    ],
    tags: ["mentorship", "workplace-relationships"],
  },
  {
    id: "work-13",
    title: "The Whispered Rumor",
    category: "work",
    difficulty: "easy",
    city: "Benin City",
    situation:
      "A colleague pulls you aside and shares an unverified rumor about another coworker's personal life, clearly expecting you to be interested and to pass it along.",
    decisions: [
      {
        id: "spread-it-further",
        label: "Share the rumor with a couple of other coworkers.",
        consequenceHeadline: "This costs more than it seems. -7 Street Smart",
        consequenceBody:
          "The rumor circulates and eventually reaches the person it's about, along with your name as one of the people spreading it.",
        whyItMatters:
          "Passing along unverified personal rumors tends to trace back to its sources eventually, and it damages trust with far more people than just the subject of the gossip.",
        scoreEffect: -7,
        attributeEffects: { peopleSense: -9, careerJudgment: -3 },
      },
      {
        id: "shut-it-down",
        label:
          "Say you'd rather not discuss unverified personal matters and change the subject.",
        consequenceHeadline: "A quiet, solid boundary. +7 Street Smart",
        consequenceBody:
          "The colleague drops the topic, and you're seen over time as someone who doesn't engage in office gossip, which builds trust.",
        whyItMatters:
          "Declining to participate in gossip, without being preachy about it, is a small habit that steadily builds a reputation for discretion.",
        scoreEffect: 7,
        attributeEffects: { peopleSense: 8, careerJudgment: 4 },
      },
      {
        id: "listen-but-dont-spread",
        label:
          "Listen politely without commenting, but don't share it further.",
        consequenceHeadline: "A neutral middle ground. +2 Street Smart",
        consequenceBody:
          "Nothing bad happens, though quietly listening without setting any boundary means the colleague is likely to bring you the next rumor too.",
        whyItMatters:
          "Not spreading gossip is good, but staying entirely passive doesn't discourage the behavior either — a small boundary tends to work better long-term.",
        scoreEffect: 2,
        attributeEffects: { peopleSense: 2 },
        isCautious: true,
      },
      {
        id: "warn-the-subject",
        label:
          "Quietly let the coworker being talked about know what's circulating.",
        consequenceHeadline: "Well-meaning, but complicated. -2 Street Smart",
        consequenceBody:
          "The coworker appreciates the heads-up but is now upset and confronts the original source, and you're drawn into the conflict as the messenger.",
        whyItMatters:
          "Warning someone about gossip can feel like the right thing to do, but it often pulls you deeper into a conflict that wasn't yours to begin with.",
        scoreEffect: -2,
        attributeEffects: { peopleSense: -2, careerJudgment: -2 },
      },
    ],
    tags: ["office-politics", "gossip", "professionalism"],
  },
  {
    id: "work-14",
    title: "The Contract Renewal Gap",
    category: "work",
    difficulty: "hard",
    city: "Abuja",
    situation:
      "You're on a one-year renewable contract. It's a month before renewal, and your manager, usually reliable, has gone quiet on the topic despite your good performance reviews. A recruiter has also just reached out about a permanent role elsewhere.",
    decisions: [
      {
        id: "wait-for-manager",
        label:
          "Wait for your manager to bring up renewal on their own timeline.",
        consequenceHeadline:
          "Passive, and time is running out. -6 Street Smart",
        consequenceBody:
          "The contract lapses without a clear renewal in place, and by the time your manager circles back, the recruiter's role has already been filled by someone else.",
        whyItMatters:
          "With a firm deadline like a contract end date, waiting passively for someone else to initiate the conversation can cost you options you didn't need to lose.",
        scoreEffect: -6,
        attributeEffects: { careerJudgment: -7, riskAwareness: -5 },
        isCautious: true,
      },
      {
        id: "ask-directly-pursue-both",
        label:
          "Directly ask your manager about renewal timing, while also seriously exploring the recruiter's role.",
        consequenceHeadline: "Smart parallel tracking. +11 Street Smart",
        consequenceBody:
          "Your manager confirms renewal is coming, just delayed by budget approval. With that clarity, you compare it fairly against the external offer and make a confident, informed choice.",
        whyItMatters:
          "Pursuing clarity on your current situation while genuinely exploring an external option at the same time gives you the most complete picture to decide from.",
        scoreEffect: 11,
        attributeEffects: {
          careerJudgment: 10,
          negotiation: 7,
          riskAwareness: 5,
        },
      },
      {
        id: "accept-external-immediately",
        label:
          "Accept the external role right away without finding out about your current renewal.",
        consequenceHeadline: "A leap without looking. -3 Street Smart",
        consequenceBody:
          "The new role turns out fine, but you later learn your renewal would have come with a meaningful raise you never got to compare against.",
        whyItMatters:
          "Jumping to a new opportunity without first understanding what you might be leaving on the table means deciding with incomplete information.",
        scoreEffect: -3,
        attributeEffects: { careerJudgment: -4, riskAwareness: 2 },
      },
      {
        id: "use-recruiter-as-leverage",
        label:
          "Mention the recruiter's interest to your manager as leverage for a faster renewal decision.",
        consequenceHeadline: "Effective, if handled carefully. +6 Street Smart",
        consequenceBody:
          "Your manager, aware you have real options, expedites the renewal conversation and comes back with an improved offer within the week.",
        whyItMatters:
          "Mentioning a genuine external option, honestly and without bluffing, can be an effective way to prompt a faster, better response from your current employer.",
        scoreEffect: 6,
        attributeEffects: { negotiation: 8, careerJudgment: 4 },
        stateEffects: { income: 40000 },
      },
    ],
    tags: ["contract", "job-offer", "career-decision"],
  },
];
