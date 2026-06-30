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
];

export function getProject(slug: string): WorkProject | undefined {
  return WORK.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): WorkProject {
  const i = WORK.findIndex((p) => p.slug === slug);
  return WORK[(i + 1) % WORK.length];
}
