// Static work / case-study data for the redesign.
// Sourced from the Claude Design export (Work.dc.html + CaseStudy.dc.html).
// Real screenshots and per-project metrics get wired in later; placeholders for now.

export interface CaseFeature {
  title: string;
  body: string;
}

export interface CaseMetric {
  value: string;
  unit?: string;
  label: string;
  accent?: boolean;
}

export interface CaseStudy {
  tags: string[];
  meta: { label: string; value: string }[];
  challenge: { heading: string; body: string };
  built: { heading: string; intro: string[]; features: CaseFeature[] };
  gallery: string[];
  /** Real gallery screenshots (public paths). When set, these render instead of the striped placeholders. */
  galleryImages?: string[];
  /** Real hero screenshot (public path). When set, it renders instead of the striped placeholder. */
  heroImage?: string;
  /** Full-length screenshot (public path) for the interactive scrolling hero frame. Takes priority over heroImage. */
  heroScrollImage?: string;
  outcome: { heading: string; metrics: CaseMetric[]; note: string };
  stackTools: string[];
}

export interface WorkProject {
  slug: string;
  index: string;
  category: string;
  title: string;
  titleNote?: string;
  summary: string;
  problem: string;
  whatWeBuilt: string;
  stack: string[];
  /** Real card image (public path) for the Work index and next-project thumbnail. */
  cardImage?: string;
  caseStudy?: CaseStudy;
}

export const WORK: WorkProject[] = [
  {
    slug: 'ai-operations-dashboard',
    index: '01',
    category: 'Flagship build · Operations',
    title: 'AI Operations Dashboard',
    titleNote: 'the dashboard we run FlowGenixAI on, and deploy for clients',
    summary:
      'One private screen that gives a busy owner a birds-eye view of the entire operating day, every inbox and calendar across every provider, plus news, priorities, and research, with the ability to drill into anything and let AI handle the busywork.',
    problem:
      "CEOs and owners of small and mid-sized businesses don't run on one inbox and one calendar. They run on several: multiple email accounts, a stack of calendars, news they can't afford to fall behind on, deadlines, decisions, and a dozen other things scattered across tools that were never built to talk to each other. There's no single place to stand and see it all, so the important work hides behind the noise and the best hours of the day go to hunting for it.",
    whatWeBuilt:
      "A private operations dashboard that puts the whole operating day on one screen: every inbox and calendar across every provider, the news that matters, priorities, decisions, and anything slipping, all sorted by what needs the owner first. Custom connectors tie it together past the limits of the native integrations, and the AI triages, drafts, captures voice notes into to-dos, reviews newsletters, and sorts research. It's the same build FlowGenixAI runs internally and deploys, private and branded, for clients.",
    stack: ['Custom connectors', 'FastAPI', 'Claude', 'Self-hosted'],
    cardImage: '/work/ai-operations-dashboard/card.png',
    caseStudy: {
      heroScrollImage: '/work/ai-operations-dashboard/dashboard-full.png',
      galleryImages: [
        '/work/ai-operations-dashboard/gallery-1.png',
        '/work/ai-operations-dashboard/gallery-2.png',
        '/work/ai-operations-dashboard/gallery-3.png',
      ],
      tags: ['Operations dashboard', 'Multi-account triage', 'AI actions', 'Self-hosted'],
      meta: [
        { label: 'Role', value: 'Design & build, end to end' },
        { label: 'Platform', value: 'Self-hosted web app' },
        { label: 'Stack', value: 'FastAPI, Claude, self-hosted' },
        { label: 'Use', value: 'Daily, internal and client' },
      ],
      challenge: {
        heading: 'Multiple inboxes, calendars, and tools, no single place to see it all.',
        body: "CEOs and owners of small and mid-sized businesses don't run on one inbox and one calendar. They run on several: multiple email accounts, a stack of calendars, news they can't afford to fall behind on, deadlines, decisions, and a dozen other things scattered across tools that were never built to talk to each other. There's no single place to stand and see it all, so the important work hides behind the noise and the best hours of the day go to hunting for it. What they need is simple to say and hard to build: a birds-eye view of everything the moment they sit down, with any detail one click away, and the routine work already handled.",
      },
      built: {
        heading: 'One screen for the whole operating day.',
        intro: [
          "We built it, and we run our own business on it. The dashboard pulls every inbox and calendar together, no matter how many or which providers, with the news that matters, the priorities, the decisions, and anything quietly slipping, then sorts it all by what genuinely needs the owner first. Custom connectors tie it together past the limits of the platforms' native integrations, so accounts that normally can't live together sit side by side and stay in sync, flawlessly. It's the same build FlowGenixAI runs internally and deploys, private and branded, for the CEOs and owners we work with.",
          "Here's the part that separates a slick-looking dashboard from one you'd trust with your morning. It's self-hosted on infrastructure the owner controls, with the app services locked to the machine and a reverse proxy handling security, so no secret ever reaches the browser. The AI reads, sorts, and drafts, but nothing acts on its own. New capabilities go in as isolated modules that roll back in a single step, and a demo mode with entirely fake data lets the same screens be shown safely.",
        ],
        features: [
          {
            title: 'Every account, no matter the provider',
            body: 'Custom connectors tie it all into one screen, past the limits of the native integrations. A real setup we run: a personal Yahoo account, two Google Workspace business accounts, two private company accounts, and a personal Apple iCloud account, six inboxes and calendars across four providers, unified and in sync.',
          },
          {
            title: 'Birds-eye view, real drilldown',
            body: 'The whole day at a glance, and every tile opens up: read the full thread, expand the reasoning behind a decision, edit a line in place. Nothing is a dead end.',
          },
          {
            title: 'Voice to action',
            body: 'Speak a note and it becomes to-dos, captured and routed across every part of your world, work and personal, without opening another app.',
          },
          {
            title: 'AI inbox triage and drafts',
            body: 'Watchlists sort your inboxes so the people and threads that matter rise to the top, action items get pulled out, and replies come pre-drafted, ready to send or edit.',
          },
          {
            title: 'Newsletter review and article extraction',
            body: "It reads the newsletters you'd never get through, pulls out the pieces worth your time, and drops them into the dashboard as highlighted, clickable links.",
          },
          {
            title: 'Research triage',
            body: 'Paste a link or a batch and each one gets read, filtered for hype, and sorted into worth-pursuing or junk, with a takeaway and the reasoning on tap. Investment reads are decision-support, grounded and never autonomous.',
          },
        ],
      },
      gallery: ['// inbox triage + draft', '// newsletter extraction', '// voice to action'],
      outcome: {
        heading: 'Two hours a day back, and nothing slips.',
        metrics: [
          { value: '2+', unit: 'hrs/day', label: 'Time the owner gets back every day, off admin and triage.', accent: true },
          { value: '12→1', label: 'A dozen disconnected tools replaced by one screen.' },
          { value: '6', unit: 'accounts', label: 'Personal and business inboxes and calendars across four providers, unified.' },
        ],
        note: "This is the dashboard FlowGenixAI runs its own operation on, and the same build we deploy for clients. The time-saved figure is the owner's own estimate from daily use.",
      },
      stackTools: ['Python', 'FastAPI', 'Anthropic Claude', 'Gmail & Calendar API', 'IMAP + CalDAV', 'Caddy', 'Docker', 'Self-hosted Linux'],
    },
  },
  {
    slug: 'eversage',
    index: '02',
    category: 'Flagship build · Voice AI',
    title: 'EverSage',
    titleNote: 'a voice-first iOS assistant for busy owners',
    summary:
      'A voice-first assistant for iPhone that you talk to like a chief of staff, it captures tasks, sets native alarms and reminders, triages and drafts your email, sends confirm-first texts, reads your day, and moves your meetings, all by voice.',
    problem:
      "Running your day by hand, tapping through a calendar, three inboxes, a task list, and your messages, eats the exact hours that should go to real work. And the voice assistants that come on your phone are shallow: they'll set a timer, but they can't triage your inbox, draft a reply that sounds like you, or move a meeting and tell the other person.",
    whatWeBuilt:
      "A native iOS assistant you hold a real conversation with. Tap the orb, speak, and it acts: it turns a spoken note into tasks, sets true native alarms and reminders, pulls your inboxes into one triaged list and drafts the replies, opens a text prefilled and waits for your tap, reads your day, and proposes new meeting times. Every action is a typed tool, so what the voice does today a background assistant can do later. Multi-user from day one, and built so your logins and data never sit on the phone.",
    stack: ['React Native', 'Supabase', 'OpenAI Realtime', 'Claude'],
    cardImage: '/work/eversage/card.png',
    caseStudy: {
      heroImage: '/work/eversage/hero.png',
      galleryImages: [
        '/work/eversage/gallery-1.png',
        '/work/eversage/gallery-2.png',
        '/work/eversage/gallery-3.png',
      ],
      tags: ['Voice-first', 'iOS', 'Realtime voice', 'Multi-user'],
      meta: [
        { label: 'Role', value: 'Design & build, end to end' },
        { label: 'Platform', value: 'Native iOS (Expo)' },
        { label: 'Stack', value: 'React Native, Supabase' },
        { label: 'Voice', value: 'Realtime, on-device' },
      ],
      challenge: {
        heading: "Phone assistants set timers. They don't run your day.",
        body: "Running your day by hand, tapping through a calendar, three inboxes, a task list, and your messages, eats the exact hours that should go to real work. And the voice assistants that come on your phone are shallow: they'll set a timer, but they can't triage your inbox, draft a reply that sounds like you, or move a meeting and tell the other person. What's missing is an assistant you actually talk to, that takes real actions across the apps that run your life, and never sends anything in your name without you seeing it first.",
      },
      built: {
        heading: 'An assistant you talk to, that actually does things.',
        intro: [
          "EverSage is a native iOS assistant you hold a real conversation with. Tap the orb, speak, and it acts: it turns a spoken note into tasks, sets native alarms and reminders, pulls your inboxes into one triaged list and drafts the replies, opens a text prefilled and waits for your tap, lays out today's agenda, and proposes new meeting times. Every single action is a typed tool with a strict contract, so the same thing the voice does today, a background assistant can do for you later without a rewrite.",
          "The difference between a demo and something you'd run your day on is all in the parts you don't see. It's local-first, and every provider key and login token stays server-side and encrypted, so the phone never holds a secret. A spend cap runs on the server before any paid AI call. And the guardrails are enforced in code, not a doc: freeform email is drafts-only, texts wait for your tap, and there are hard lines it will never cross, money, contracts, deletes, messaging strangers, anything bulk or irreversible.",
        ],
        features: [
          {
            title: 'A real conversation, on your phone',
            body: 'A live voice loop: speak, watch the transcript, see each action confirm, running on an actual iPhone, multilingual, not a scripted list of commands.',
          },
          {
            title: 'Voice to tasks, alarms, and reminders',
            body: 'Speak a note and it becomes tasks plus true native alarms and reminders, the OS-level kind that actually go off.',
          },
          {
            title: 'Inbox triage and drafting',
            body: 'Your inboxes pulled into one sorted list, with replies drafted for you. Freeform email is drafts-only, so nothing sends itself.',
          },
          {
            title: 'Confirm-first texting',
            body: 'Say who and what, and it opens Messages prefilled and waits for you to hit send. It never texts a stranger or fires on its own.',
          },
          {
            title: 'Reads your day, moves your meetings',
            body: "A one-payload morning brief (agenda, inbox, what's slipping) plus calendar agenda and propose-slots, with reschedule wired behind the same typed-tool seam.",
          },
        ],
      },
      gallery: ['// unified inbox', '// calendar', '// spend cap'],
      outcome: {
        heading: 'Real actions, and you control every send.',
        metrics: [
          {
            value: '$0.06',
            unit: '/session',
            label: 'What a full voice session costs on the cheap realtime tier, with a hard spend cap server-side.',
            accent: true,
          },
          {
            value: '0',
            unit: 'on device',
            label: 'Provider keys and login tokens live only in server functions, never on the phone.',
          },
          {
            value: 'Confirm-first',
            label: 'Freeform email is drafts-only and texts wait for your tap. Enforced in code, not policy.',
          },
        ],
        note: "A voice-first iOS assistant built for owners and operators, multi-user and private by design. Adoption and App Store status are left off until there's something real to point to.",
      },
      stackTools: ['Expo', 'React Native', 'TypeScript', 'Supabase', 'OpenAI Realtime', 'WebRTC', 'Anthropic Claude', 'AlarmKit + EventKit', 'openWakeWord'],
    },
  },
  {
    slug: 'almanac-leaf',
    index: '03',
    category: 'iOS app · Consumer',
    title: 'Almanac Leaf',
    titleNote: 'formerly Legacy Loop',
    summary: 'A warm, calm consumer iOS app for capturing and preserving family stories.',
    problem:
      'Family stories live scattered across photos, voicemails, and memory, and quietly disappear with each generation. The original Legacy Loop had the idea but not the feel.',
    whatWeBuilt:
      'A warm, calm iOS app for capturing and preserving family stories and memories, rebuilt and rebranded from Legacy Loop into something people genuinely want to come back to.',
    stack: ['React Native', 'Supabase'],
  },
  {
    slug: 'n8n-workflow-automation',
    index: '04',
    category: 'Automation',
    title: 'n8n Workflow Automation',
    summary: 'Custom multi-step workflows that move work automatically between your tools.',
    problem:
      "Teams lose hours every week to manual handoffs, copying data between CRMs, sheets, and inboxes, and the work that falls through the cracks is invisible until it's too late.",
    whatWeBuilt:
      'Custom multi-step workflows that connect CRMs, sheets, voice agents, and AI to move work automatically between tools, with clean reporting on every run, so nothing is invisible.',
    stack: ['n8n', 'APIs', 'Supabase'],
  },
  {
    slug: 'ai-voice-agents',
    index: '05',
    category: 'Voice AI',
    title: 'AI Voice Agents',
    summary: 'Receptionists and intake agents that answer, qualify, and book around the clock.',
    problem:
      "Every missed call is a missed job, but staffing a front desk that answers around the clock isn't realistic for most businesses.",
    whatWeBuilt:
      'Retell-powered receptionists and intake agents that answer, qualify, and book across phone and web, day or night, never a ring-out, handing every booking straight to the calendar.',
    stack: ['Retell', 'n8n'],
  },
  {
    slug: 'web-app-development',
    index: '06',
    category: 'Build',
    title: 'Web & app development',
    summary: 'Fast Next.js websites and web apps, designed and shipped end to end.',
    problem:
      "A great product still needs a fast, credible site and app to turn interest into customers, and most teams don't have the time to design and ship one end to end.",
    whatWeBuilt:
      'Full Next.js websites and web apps, designed and shipped end to end on a Vercel and Supabase stack, fast, clean, and built to convert.',
    stack: ['Next.js', 'Vercel', 'Supabase'],
  },
  {
    slug: 'restate',
    index: '07',
    category: 'Personal build · AI study platform',
    title: 'Restate',
    titleNote: 'built for a returning student',
    summary:
      'A personal AI study companion that takes someone from "I haven\'t studied in years" to ready for the first day of law school, then quietly runs their whole study system all semester.',
    problem:
      "A career changer heading back for an intense graduate program, seven weeks out, with cold study habits and no tool that fit. Generic study apps don't know the calendar, don't teach the workflow, and their AI invents facts, which is a dealbreaker when one made-up citation can sink you.",
    whatWeBuilt:
      "A complete, installable study platform, live before prep even started: a dated 7-week ramp, flashcards, quizzes, case briefs, cold-call drills, outlines, a planner, and a deadline tracker on the school's real calendar. The AI is genuinely useful and deliberately fenced in, it works only from the student's own notes, so it can't invent law.",
    stack: ['Next.js', 'Supabase', 'OpenAI', 'PWA'],
    cardImage: '/work/restate/hero.png',
    caseStudy: {
      heroImage: '/work/restate/hero.png',
      galleryImages: [
        '/work/restate/gallery-1.png',
        '/work/restate/gallery-2.png',
        '/work/restate/gallery-3.png',
      ],
      tags: ['AI study platform', 'PWA', 'Spaced repetition', 'Education'],
      meta: [
        { label: 'Role', value: 'Design & build, end to end' },
        { label: 'Platform', value: 'Installable web app (PWA)' },
        { label: 'Stack', value: 'Next.js, Supabase' },
        { label: 'Timeline', value: 'Spec to live in about 2 days' },
      ],
      challenge: {
        heading: "Generic study apps don't know your deadline, and their AI makes things up.",
        body: "The person behind this is a career changer, a few good years into full-time work and now heading back for an intense graduate program with a hard start date about seven weeks out. The study muscles had gone soft, and the program expects skills nobody hands you in advance: reading dense cases, briefing them, holding your own in a cold call, turning notes into an outline you can pass an exam with. Off-the-shelf apps are generic flashcard tools. They don't know your calendar, they don't teach the workflow, and their AI will cheerfully make things up, which is a dealbreaker in a field where one invented citation can sink you.",
      },
      built: {
        heading: 'A real platform, fenced in on purpose.',
        intro: [
          "So we built the thing that should have existed: a complete, installable study platform, live before the prep window even opened. It opens with a dated 7-week ramp that rebuilds study stamina one honest step at a time, then hands the student off to the semester with flashcards, quizzes, case briefs, cold-call drills, outlines, a planner, and a deadline tracker already loaded with the school's real academic calendar.",
          "The part that separates a weekend prototype from something you'd trust with your career sits under the hood. Every AI call runs server-side behind auth, so the key never reaches the browser, and every prompt is grounded in the student's own notes, so the AI can help but it can't invent law. Each user's data is walled off at the database itself. None of that shows on screen, and all of it is why the thing holds up.",
        ],
        features: [
          {
            title: 'A 7-week ramp that meets you where you are',
            body: 'A dated, day-by-day plan that rebuilds study stamina, from short reading blocks in week one to full mock class days by week six, then a deliberate taper.',
          },
          {
            title: 'AI that helps without making things up',
            body: 'Flashcards, quizzes, and briefs built only from your own notes, with a hard rule against invented citations. The most important guardrail in the product, baked into the prompt layer.',
          },
          {
            title: 'Spaced repetition done properly',
            body: 'A real SM-2 scheduler with four-grade review, ease factors, and lapse tracking, not a remind-me-tomorrow timer dressed up to look smart.',
          },
          {
            title: 'Cold-call drills on demand',
            body: 'Professor-style questions fired straight from your own briefs, so the tensest moment of a first-year classroom is something you can rehearse.',
          },
          {
            title: 'A dashboard that runs the day',
            body: "Countdowns, cards due, a streak worth protecting, this week's tasks, and deadlines on one screen you can install to your phone.",
          },
        ],
      },
      gallery: ['// 7-week ramp', '// case briefs', '// cold-call drill'],
      outcome: {
        heading: 'Built to be trusted, and live in days.',
        metrics: [
          {
            value: '11',
            unit: 'tables',
            label: 'Each isolated per user with database-level security, not just hidden in the UI.',
            accent: true,
          },
          {
            value: '10',
            unit: 'modules',
            label: 'A full study system shipped in v1, from the ramp to the dashboard.',
          },
          {
            value: '~2',
            unit: 'days',
            label: 'From written spec to a live, installable app. Fast because it is built on proven ground.',
          },
        ],
        note: 'Live in production as of July 2026. Adoption and usage numbers are left off on purpose until there is real data to stand behind.',
      },
      stackTools: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Supabase', 'OpenAI', 'Vercel', 'PWA'],
    },
  },
];

export function getProject(slug: string): WorkProject | undefined {
  return WORK.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): WorkProject {
  const i = WORK.findIndex((p) => p.slug === slug);
  return WORK[(i + 1) % WORK.length];
}
