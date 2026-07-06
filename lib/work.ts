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
    category: 'Client build · Operations',
    title: 'AI Operations Dashboard',
    summary:
      "A secure, private operations cockpit that put a multi-venture founder's entire business on one quiet screen.",
    problem:
      'A founder running multiple ventures was drowning in email, calls, and proposals spread across disconnected tools, with no single place to see what actually needed her attention.',
    whatWeBuilt:
      'A secure, private operations cockpit on her own infrastructure: a morning briefing dashboard, AI email triage, voice-to-action capture, and proposal insight scoring, one quiet screen for the whole operation.',
    stack: ['Supabase', 'n8n', 'Google Cloud', 'AI agents'],
    caseStudy: {
      tags: ['Operations', 'Dashboard', 'AI Agents'],
      meta: [
        { label: 'Role', value: 'Design & build, end to end' },
        { label: 'Timeline', value: '8 weeks' },
        { label: 'Platform', value: 'Private web app' },
        { label: 'Stack', value: 'Supabase, n8n' },
      ],
      challenge: {
        heading: 'Too many tools, no single source of truth.',
        body: 'A founder running several ventures was managing email, calls, proposals, and tasks across a dozen disconnected tools. Nothing talked to anything else, and the most important work was buried under the noise. There was no single place to see what actually needed her attention, and the cost of context switching was eating her best hours.',
      },
      built: {
        heading: 'One cockpit, running on her own infrastructure.',
        intro: [
          'We designed and built a private command center that pulls every signal into a single view. It opens to a morning briefing, surfaces what changed overnight, and lets her act without leaving the screen. Everything runs on infrastructure she controls, so her data never leaves her hands.',
          'Under the hood, a set of AI agents and automations handle the heavy lifting, triaging email, capturing spoken tasks, and scoring proposals, while the interface stays calm and uncluttered.',
        ],
        features: [
          { title: 'Morning dashboard', body: 'Your day, your numbers, and what needs attention, first thing.' },
          { title: 'Email triage', body: 'AI sorts, summarizes, and drafts so the inbox stays clear.' },
          { title: 'Voice-to-action', body: 'Speak a task and it gets captured, routed, and done.' },
          { title: 'Proposal insights', body: 'See which proposals are moving and which need a nudge.' },
        ],
      },
      gallery: ['// dashboard view', '// email triage', '// proposal insights'],
      outcome: {
        heading: 'Less noise, more signal, hours back.',
        metrics: [
          { value: '9.5', unit: 'hrs/wk', label: 'Hours saved every week on admin and triage.', accent: true },
          { value: '1', label: 'One screen replaced a dozen disconnected tools.' },
          { value: '100%', label: 'Of her data stays on infrastructure she controls.' },
        ],
        note: 'Replace with real metrics or qualitative wins per project.',
      },
      stackTools: ['Next.js', 'Supabase', 'n8n', 'Retell', 'Google Cloud', 'OpenAI'],
    },
  },
  {
    slug: 'eversage',
    index: '02',
    category: 'iOS app · Voice AI',
    title: 'EverSage',
    summary: 'A voice-first personal assistant for iPhone that runs your day by voice.',
    problem:
      'Managing a calendar, inbox, and task list by hand eats the hours that should go to real work, and tapping through apps to do it is slower than just saying what you need.',
    whatWeBuilt:
      'A voice-first iPhone assistant you talk to like a chief of staff. It reads your day, drafts replies, and books the admin, hands-free, with real-time voice and persistent memory of context.',
    stack: ['React Native', 'WebRTC', 'Supabase', 'OpenAI'],
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
