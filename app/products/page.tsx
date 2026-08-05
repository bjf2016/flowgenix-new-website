import Link from 'next/link';
import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import CountUp from '@/components/CountUp';
import ProductLeadForm from '@/components/ProductLeadForm';
import AssistGallery from '@/components/AssistGallery';

export const metadata: Metadata = {
  title: 'FGX Dash & FGX Assist - FlowGenixAI Products',
  description:
    'Two FlowGenixAI products that run the busywork. FGX Dash puts your whole operating day on one private screen, live today. FGX Assist is a voice-first AI Chief of Staff for iPhone, tailored to your business.',
  keywords: [
    'FGX Dash',
    'FGX Assist',
    'AI operations dashboard',
    'AI chief of staff',
    'voice AI assistant',
    'business automation',
  ],
};

const STRIPED =
  'repeating-linear-gradient(135deg,rgba(255,255,255,0.035) 0 10px,transparent 10px 20px),var(--bg-deep)';

const DASH_FEATURES = [
  {
    n: '01',
    title: 'Every account in one place',
    body: "Every inbox and calendar you've got, work and personal, on one screen. No more tab-hopping to see your day.",
  },
  {
    n: '02',
    title: 'See your whole day, open any piece',
    body: 'The day at a glance, and every tile opens up. Read the full thread, expand the reasoning, edit a line in place. Nothing is a dead end.',
  },
  {
    n: '03',
    title: 'AI inbox triage and drafts',
    body: 'Watchlists surface the people and threads that matter, pull out the action items, and pre-draft replies ready to send or edit.',
  },
  {
    n: '04',
    title: 'Newsletter and research triage',
    body: "It reads the newsletters and links you'd never get through, keeps what's worth your time, and drops it in as clickable highlights.",
  },
];

const ASSIST_FEATURES = [
  {
    title: 'Say it once',
    body: 'Voice or text in, real actions out, captured and routed across your whole world, work and personal.',
  },
  {
    title: 'You stay in control',
    body: 'A simple choice per task: ask me first, tell me after, or just handle it. It starts by asking for everything, and you can pause it all with one tap.',
  },
  {
    title: 'Works with Dash',
    body: 'Assist and Dash share the same data, so what you say shows up where you already look.',
  },
];

const ASSIST_LIVE = [
  'Voice-first capture: say it once, it turns into action',
  'Inbox triage, with replies drafted in your voice',
  'Scheduling that finds the time, drafts the invite, and closes the loop',
  'You decide what it does on its own, and what waits for your yes',
  'A running record of everything it did, with undo',
  'Time saved, tallied from what it actually did, in hours and dollars',
  'Across every inbox and calendar, work and personal',
];

const ASSIST_SHOTS = [
  { src: 'talk', alt: 'Voice capture, tap to talk and say what needs doing', cap: 'Say it once' },
  { src: 'draft-approve', alt: 'An AI-drafted reply waiting on your approval before anything sends', cap: 'Approve before it sends' },
  { src: 'connected-redacted', alt: 'Connected accounts: mail, calendar, and Google Workspace', cap: 'Every account connected' },
  { src: 'ledger', alt: 'Ledger, every action on the record', cap: 'Every action logged' },
  { src: 'today-brief', alt: 'Morning briefing with the items that need you', cap: 'Morning brief' },
  { src: 'routine', alt: 'Calm mode, a quiet morning routine', cap: 'Calm mode' },
];

const FAQ = [
  {
    q: 'Is FGX Dash available now?',
    a: "Yes. It's live, deployed privately for owners right now. Request a walkthrough to see it on your own accounts.",
  },
  {
    q: 'Is FGX Assist available?',
    a: 'Yes. It runs on iPhone today, and we set it up tailored to your business. Request a demo to see it on your world.',
  },
  {
    q: 'What does it cost?',
    a: 'FGX Assist starts at $5,000 setup + $500/month, which includes 25 hours of voice. Heavier voice use is billed by the minute or moves to a higher plan, and you can set a monthly cap so there are no surprise bills. FGX Dash and custom builds are scoped by quote.',
  },
  {
    q: 'Is my data safe?',
    a: "Yes, and it's built for it. Everything runs on your own server, and you grant Google access yourself during setup, so we never hold your password. The assistant reads and drafts, it never sends or changes anything without you, and you can revoke access any time. See the Security section for detail.",
  },
  {
    q: 'Can I get both?',
    a: "Yes. They're built to work together.",
  },
];

const ASSIST_PRICE_INCLUDES = [
  'A tailored build and full setup, done for you',
  'Ongoing support and updates, we keep it running',
  'Unlimited typed requests, email triage, and scheduling',
  '25 hours of voice a month, about 50 minutes a day',
  'Private and self-hostable, your data stays yours',
];

const COST_COMPARE = [
  { label: 'FGX Assist', cost: '$11,000 year one, then $6,000/yr', highlight: true },
  { label: 'Full-time executive assistant', cost: '~$88,000/yr', highlight: false },
  { label: 'Chief of staff', cost: '~$234,000/yr', highlight: false },
];

const SECURITY = [
  {
    title: 'Runs on your own server',
    body: 'Your dashboard and the connectors that reach your email and calendar live on infrastructure you control, not ours. Every client is fully separate.',
  },
  {
    title: 'You grant access, not us',
    body: "During setup you approve access on Google's own sign-in screen. We never see or hold your password, and you can revoke it yourself any time from your Google account.",
  },
  {
    title: 'Read and draft, nothing more',
    body: 'It reads your mail and calendar and prepares drafts. Any access it has, you grant, and it never sends, deletes, or changes anything without your yes.',
  },
];

export default function ProductsPage() {
  return (
    <div className="relative overflow-x-hidden bg-bg-base font-body text-text-body">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden pb-[clamp(56px,7vw,88px)] pt-[clamp(64px,9vw,120px)]">
        <div className="pointer-events-none absolute inset-0 z-[1] bg-glow-brand opacity-70" />
        <img
          src="/brand/fgx-head.png"
          alt=""
          aria-hidden
          className="fgx-head-drift pointer-events-none absolute right-[-7%] top-[-6%] z-[1] w-[min(640px,52vw)] opacity-[0.07] saturate-[0.9]"
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{ background: 'linear-gradient(to bottom, transparent 45%, var(--bg-base))' }}
        />
        <div className="relative z-10 mx-auto max-w-container px-[var(--gutter)]">
          <div className="flex max-w-[940px] flex-col gap-7">
            <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-brand">
              FlowGenixAI Products
            </span>
            <h1 className="m-0 font-display text-[clamp(2.7rem,6vw,5rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-text-strong [text-wrap:balance]">
              Two tools that run the busywork, so{' '}
              <span className="text-brand">you don&apos;t.</span>
            </h1>
            <p className="m-0 max-w-[62ch] text-[clamp(1.1rem,1.5vw,1.35rem)] leading-[1.6] text-text-body">
              It reads your inbox, sorts your day, drafts your replies, and books your meetings. You
              approve, it does the work. We build it around your business and set it up for you.
            </p>
            <p className="m-0 font-mono text-[0.95rem] text-text-muted">
              From <span className="font-semibold text-text-strong">$5,000 setup + $500/month</span>,
              about <span className="text-brand">$77,000 a year less</span> than a full-time EA.
            </p>
            <div className="mt-1.5 flex flex-wrap gap-[14px]">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-[14px] bg-brand px-[30px] py-[17px] text-[17px] font-semibold tracking-[-0.01em] text-[#06141D] transition-all duration-150 hover:bg-brand-hover hover:shadow-fgx-brand active:translate-y-px"
              >
                Book a strategy call
              </Link>
              <Link
                href="#assist"
                className="inline-flex items-center justify-center rounded-[14px] border border-hairline bg-transparent px-[30px] py-[17px] text-[17px] font-semibold tracking-[-0.01em] text-text-strong transition-all duration-150 hover:border-hairline-strong hover:bg-white/[0.06]"
              >
                See it in action
              </Link>
            </div>
          </div>

          {/* hero product image */}
          <Reveal className="mt-[clamp(40px,5vw,72px)] overflow-hidden rounded-[var(--radius-xl)] border border-hairline bg-surface-card shadow-fgx-lg">
            <div className="relative" style={{ background: STRIPED }}>
              <img
                src="/work/ai-operations-dashboard/dashboard-full.png"
                alt="FGX Dash, the full AI operations dashboard"
                className="block h-full w-full object-cover object-top"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== FGX DASH ===== */}
      <section id="dash" className="scroll-mt-24 border-t border-hairline py-[clamp(72px,10vw,150px)]">
        <div className="mx-auto max-w-container px-[var(--gutter)]">
          <Reveal className="mb-[clamp(36px,5vw,60px)] flex flex-col gap-[14px]">
            <div className="fgx-index text-[clamp(56px,8vw,88px)]">01</div>
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand">
              FGX Dash · Live now
            </span>
            <h2 className="m-0 max-w-[22ch] font-display text-[clamp(2rem,3.4vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-text-strong [text-wrap:balance]">
              One screen for the whole operating day.
            </h2>
            <p className="m-0 max-w-[64ch] text-[1.1875rem] leading-[1.6] text-text-muted">
              Your inboxes and calendars pull together, no matter how many or which providers. Add
              the news that matters, your priorities, and anything quietly slipping, all sorted by
              what needs you first. It&apos;s self-hosted on infrastructure you control, so no login
              or key ever reaches the browser. The AI reads, sorts, and drafts, but nothing acts on
              its own.
            </p>
          </Reveal>

          {/* feature grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {DASH_FEATURES.map((f, i) => (
              <Reveal
                key={f.n}
                delay={i * 70}
                className="flex h-full flex-col gap-3 rounded-[var(--radius-xl)] border border-hairline bg-surface-card p-[26px] shadow-fgx-md transition-all duration-300 hover:-translate-y-[3px] hover:border-hairline-strong"
              >
                <span className="font-mono text-[13px] font-semibold text-brand">{f.n}</span>
                <h3 className="m-0 font-display text-[1.3rem] font-bold tracking-[-0.02em] text-text-strong">
                  {f.title}
                </h3>
                <p className="m-0 text-[1rem] leading-[1.55] text-text-muted">{f.body}</p>
              </Reveal>
            ))}
          </div>

          {/* gallery */}
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
            {['gallery-1.png', 'gallery-2.png', 'gallery-3.png'].map((img, i) => (
              <Reveal
                key={img}
                delay={i * 80}
                className="overflow-hidden rounded-[var(--radius-xl)] border border-hairline bg-surface-card shadow-fgx-md"
              >
                <div className="relative aspect-[16/10]" style={{ background: STRIPED }}>
                  <img
                    src={`/work/ai-operations-dashboard/${img}`}
                    alt={`FGX Dash screen ${i + 1}`}
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                </div>
              </Reveal>
            ))}
          </div>

          {/* metric callouts */}
          <div className="mt-[clamp(40px,5vw,64px)] grid grid-cols-1 gap-5 sm:grid-cols-3">
            <Reveal className="rounded-[var(--radius-xl)] border border-hairline bg-bg-deep p-[clamp(24px,3vw,36px)] text-center">
              <div className="font-display text-[clamp(2.4rem,4vw,3.2rem)] font-extrabold tracking-[-0.03em] text-brand">
                <CountUp to={2} suffix="+" />
              </div>
              <p className="m-0 mt-2 text-[1rem] text-text-muted">hours a day back, off admin and triage</p>
            </Reveal>
            <Reveal delay={80} className="rounded-[var(--radius-xl)] border border-hairline bg-bg-deep p-[clamp(24px,3vw,36px)] text-center">
              <div className="font-display text-[clamp(2.4rem,4vw,3.2rem)] font-extrabold tracking-[-0.03em] text-text-strong">
                12 <span className="text-brand">&rarr;</span> 1
              </div>
              <p className="m-0 mt-2 text-[1rem] text-text-muted">disconnected tools replaced by one screen</p>
            </Reveal>
            <Reveal delay={160} className="rounded-[var(--radius-xl)] border border-hairline bg-bg-deep p-[clamp(24px,3vw,36px)] text-center">
              <div className="font-display text-[clamp(2.4rem,4vw,3.2rem)] font-extrabold tracking-[-0.03em] text-text-strong">
                <CountUp to={6} />
              </div>
              <p className="m-0 mt-2 text-[1rem] text-text-muted">accounts unified across four providers</p>
            </Reveal>
          </div>
          <p className="m-0 mt-4 text-center font-mono text-[12px] text-text-faint">
            The 2+ hours is the owner&apos;s own estimate from daily use.
          </p>

          {/* dash CTA */}
          <Reveal className="mt-[clamp(40px,5vw,64px)] flex flex-col items-start gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-[14px] bg-brand px-[30px] py-[17px] text-[17px] font-semibold tracking-[-0.01em] text-[#06141D] transition-all duration-150 hover:bg-brand-hover hover:shadow-fgx-brand active:translate-y-px"
            >
              Book a strategy call
            </Link>
            <p className="m-0 font-mono text-[13px] text-text-faint">
              A private, branded deployment on infrastructure you control. Priced by quote.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== FGX ASSIST ===== */}
      <section id="assist" className="scroll-mt-24 border-t border-hairline bg-bg-deep py-[clamp(72px,10vw,150px)]">
        <div className="mx-auto max-w-container px-[var(--gutter)]">
          <div className="grid grid-cols-1 gap-[clamp(40px,5vw,72px)] lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <Reveal className="flex flex-col gap-[14px]">
                <div className="fgx-index text-[clamp(56px,8vw,88px)]">02</div>
                <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand">
                  FGX Assist · Tailored to your business
                </span>
                <h2 className="m-0 max-w-[20ch] font-display text-[clamp(2rem,3.4vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-text-strong [text-wrap:balance]">
                  Your voice-first AI Chief of Staff.
                </h2>
                <p className="m-0 max-w-[58ch] text-[1.1875rem] leading-[1.6] text-text-muted">
                  Speak or type what needs doing and FGX Assist does the legwork, up to a line you
                  set. We build it around your world: your inboxes and calendars, work and personal,
                  your mornings, your priorities, and the sources you actually read. It never crosses
                  into money, contracts, or anything irreversible without your say-so. It drafts in
                  your voice and shows you everything before it acts, so you fix a word, not clean up
                  a mess.
                </p>
              </Reveal>

              <div className="mt-8 flex flex-col gap-4">
                {ASSIST_FEATURES.map((f, i) => (
                  <Reveal
                    key={f.title}
                    delay={i * 70}
                    className="flex gap-4 rounded-[var(--radius-lg)] border border-hairline bg-surface-card p-5"
                  >
                    <span
                      className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand"
                      style={{ boxShadow: '0 0 10px var(--brand)' }}
                      aria-hidden
                    />
                    <div className="flex flex-col gap-1">
                      <h3 className="m-0 font-display text-[1.2rem] font-bold tracking-[-0.02em] text-text-strong">
                        {f.title}
                      </h3>
                      <p className="m-0 text-[1rem] leading-[1.55] text-text-muted">{f.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* demo request panel */}
            <Reveal className="lg:sticky lg:top-24 flex h-fit flex-col gap-5 rounded-[var(--radius-xl)] border border-hairline bg-surface-card p-[clamp(28px,3vw,40px)] shadow-fgx-lg">
              <div className="flex flex-col gap-2">
                <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand">
                  Get started
                </span>
                <h3 className="m-0 font-display text-[1.6rem] font-bold tracking-[-0.02em] text-text-strong">
                  Bring FGX Assist to your business.
                </h3>
                <p className="m-0 text-[1rem] leading-[1.55] text-text-muted">
                  Tell us how you work and we&apos;ll set up a walkthrough tailored to your inboxes,
                  calendars, and priorities. Priced by quote.
                </p>
              </div>
              <ProductLeadForm
                leadLabel="FGX Assist demo request (from /products)"
                intent="assist-demo"
                source="products-page-assist"
                cta="Get my walkthrough"
                note="We'll reply within one business day."
              />
            </Reveal>
          </div>

          {/* what it does */}
          <Reveal className="mt-[clamp(48px,6vw,80px)] rounded-[var(--radius-xl)] border border-hairline bg-surface-card p-[clamp(28px,3.5vw,48px)] shadow-fgx-md">
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand">
              What FGX Assist does
            </span>
            <ul className="mt-5 grid list-none grid-cols-1 gap-x-8 gap-y-3 p-0 sm:grid-cols-2">
              {ASSIST_LIVE.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[1.0625rem] leading-[1.5] text-text-body">
                  <span
                    className="mt-[9px] h-[7px] w-[7px] shrink-0 rounded-full bg-brand"
                    style={{ boxShadow: '0 0 8px var(--brand)' }}
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p className="m-0 mt-6 text-[0.95rem] leading-[1.55] text-text-muted">
              Built around your business. We tailor the capabilities and the connections to the way
              you actually work, and nothing acts on its own unless you allow it.
            </p>
            <p className="m-0 mt-4 flex items-center gap-2 font-mono text-[13px] text-text-faint">
              <span
                className="inline-block h-[6px] w-[6px] rounded-full bg-brand"
                aria-hidden
              />
              Currently available on iPhone (iOS).
            </p>
          </Reveal>

          {/* current build gallery */}
          <div className="mt-[clamp(44px,5vw,72px)]">
            <Reveal className="mb-7 flex flex-col gap-[10px]">
              <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand">
                A look inside FGX Assist
              </span>
              <h3 className="m-0 font-display text-[clamp(1.5rem,2.4vw,2rem)] font-bold tracking-[-0.02em] text-text-strong">
                Real screens, real work.
              </h3>
              <p className="m-0 font-mono text-[13px] text-text-faint">
                Tailored and branded to your business on delivery. Tap any screen to enlarge.
              </p>
            </Reveal>
            <AssistGallery shots={ASSIST_SHOTS} />
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section id="pricing" className="scroll-mt-24 border-t border-hairline py-[clamp(72px,10vw,150px)]">
        <div className="mx-auto max-w-container px-[var(--gutter)]">
          <Reveal className="mb-[clamp(36px,5vw,60px)] flex flex-col gap-[14px]">
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand">
              Pricing
            </span>
            <h2 className="m-0 max-w-[24ch] font-display text-[clamp(2rem,3.4vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-text-strong [text-wrap:balance]">
              Priced to replace a hire, not add a subscription.
            </h2>
            <p className="m-0 max-w-[62ch] text-[1.1875rem] leading-[1.6] text-text-muted">
              FGX Assist is tailored to your business, so we scope it to your setup. Most owners
              start here.
            </p>
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-2">
            {/* offer card */}
            <Reveal className="flex flex-col gap-6 rounded-[var(--radius-xl)] border border-hairline bg-surface-card p-[clamp(28px,3.5vw,44px)] shadow-fgx-md">
              <div className="flex flex-col gap-3">
                <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand">
                  FGX Assist
                </span>
                <div className="font-display text-text-strong">
                  <span className="text-[clamp(2.2rem,4vw,3rem)] font-extrabold tracking-[-0.03em]">
                    From $5,000
                  </span>
                  <span className="text-[1.1rem] text-text-muted"> setup</span>
                  <span className="mx-2 text-[1.4rem] text-text-faint">+</span>
                  <span className="text-[clamp(2.2rem,4vw,3rem)] font-extrabold tracking-[-0.03em]">
                    $500
                  </span>
                  <span className="text-[1.1rem] text-text-muted"> / month</span>
                </div>
              </div>
              <ul className="flex list-none flex-col gap-3 p-0">
                {ASSIST_PRICE_INCLUDES.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[1.0625rem] leading-[1.5] text-text-body">
                    <span
                      className="mt-[9px] h-[7px] w-[7px] shrink-0 rounded-full bg-brand"
                      style={{ boxShadow: '0 0 8px var(--brand)' }}
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col items-start gap-3">
                <Link
                  href="#assist"
                  className="inline-flex items-center justify-center rounded-[14px] bg-brand px-[30px] py-[16px] text-[16px] font-semibold tracking-[-0.01em] text-[#06141D] transition-all duration-150 hover:bg-brand-hover hover:shadow-fgx-brand active:translate-y-px"
                >
                  Get my walkthrough
                </Link>
                <p className="m-0 font-mono text-[13px] text-text-faint">
                  Custom scope and higher-volume plans priced by quote.
                </p>
              </div>
            </Reveal>

            {/* comparison card */}
            <Reveal delay={80} className="flex flex-col gap-5 rounded-[var(--radius-xl)] border border-hairline bg-bg-deep p-[clamp(28px,3.5vw,44px)] shadow-fgx-md">
              <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand">
                Compared to hiring
              </span>
              <p className="m-0 font-display text-[clamp(1.5rem,2.4vw,2rem)] font-bold leading-[1.2] tracking-[-0.02em] text-text-strong [text-wrap:balance]">
                About <span className="text-brand">$77,000 less</span> than a full-time EA in year
                one.
              </p>
              <div className="flex flex-col divide-y divide-hairline border-y border-hairline">
                {COST_COMPARE.map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-4 py-4">
                    <span
                      className={`text-[1rem] ${row.highlight ? 'font-semibold text-text-strong' : 'text-text-muted'}`}
                    >
                      {row.label}
                    </span>
                    <span
                      className={`text-right font-mono text-[0.95rem] ${row.highlight ? 'text-brand' : 'text-text-muted'}`}
                    >
                      {row.cost}
                    </span>
                  </div>
                ))}
              </div>
              <p className="m-0 font-mono text-[12px] text-text-faint">
                FGX Assist shown at the starting price. Salary figures are US benchmark estimates,
                fully loaded.
              </p>
            </Reveal>
          </div>

          {/* voice metering */}
          <Reveal className="mt-5 flex flex-col gap-4 rounded-[var(--radius-xl)] border border-hairline bg-surface-card p-[clamp(28px,3.5vw,44px)] shadow-fgx-md">
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand">
              Voice, metered like a phone plan
            </span>
            <h3 className="m-0 font-display text-[clamp(1.4rem,2.2vw,1.9rem)] font-bold tracking-[-0.02em] text-text-strong">
              Typing is unlimited. Voice has a per-minute cost.
            </h3>
            <p className="m-0 max-w-[80ch] text-[1.0625rem] leading-[1.6] text-text-muted">
              Every minute of talking runs live AI behind the scenes, so voice is metered the way
              phone minutes are. Your plan includes 25 hours of voice a month, about 50 minutes a
              day. Beyond that it&apos;s 25 cents a minute, or you can move up a plan. Set a monthly
              cap and voice simply pauses at your limit, so there are no surprise bills, and you can
              see your usage any time in the app. Higher-volume plans are available.
            </p>
          </Reveal>

          <p className="m-0 mt-6 text-center font-mono text-[13px] text-text-faint">
            FGX Dash and custom builds are scoped by quote.
          </p>
        </div>
      </section>

      {/* ===== SECURITY ===== */}
      <section id="security" className="scroll-mt-24 border-t border-hairline bg-bg-deep py-[clamp(72px,10vw,150px)]">
        <div className="mx-auto max-w-container px-[var(--gutter)]">
          <Reveal className="mb-[clamp(36px,5vw,60px)] flex flex-col gap-[14px]">
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand">
              Security
            </span>
            <h2 className="m-0 max-w-[24ch] font-display text-[clamp(2rem,3.4vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-text-strong [text-wrap:balance]">
              Your data, on your server, with access you grant yourself.
            </h2>
            <p className="m-0 max-w-[62ch] text-[1.1875rem] leading-[1.6] text-text-muted">
              This is built for owners handing an AI their inbox. Here is exactly how it stays
              yours.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {SECURITY.map((s, i) => (
              <Reveal
                key={s.title}
                delay={i * 70}
                className="flex h-full flex-col gap-3 rounded-[var(--radius-xl)] border border-hairline bg-surface-card p-[26px] shadow-fgx-md"
              >
                <h3 className="m-0 font-display text-[1.3rem] font-bold tracking-[-0.02em] text-text-strong">
                  {s.title}
                </h3>
                <p className="m-0 text-[1rem] leading-[1.55] text-text-muted">{s.body}</p>
              </Reveal>
            ))}
          </div>

          <p className="m-0 mt-8 max-w-[80ch] text-[1rem] leading-[1.6] text-text-muted">
            Stored credentials are encrypted at rest, and your email and calendar data stay on your
            own server. AI processing runs through our providers, Anthropic and OpenAI. Support
            happens on your server, with your permission, and you can revoke access or delete your
            data any time. We'll sign a data-processing agreement on request.
          </p>
          <p className="m-0 mt-4 font-mono text-[13px] text-text-faint">
            Connectors are private and token-protected, not open to the internet. Every action is
            logged and reversible where possible.
          </p>
        </div>
      </section>

      {/* ===== WHY FLOWGENIXAI ===== */}
      <section className="border-t border-hairline py-[clamp(72px,10vw,140px)]">
        <div className="mx-auto max-w-[1000px] px-[var(--gutter)]">
          <Reveal className="flex flex-col gap-6">
            <p className="m-0 font-display text-[clamp(1.9rem,3.6vw,3rem)] font-bold leading-[1.18] tracking-[-0.025em] text-text-muted [text-wrap:balance]">
              We build these products, and we run our own business on them.{' '}
              <span className="text-brand">Built, not templated.</span>
            </p>
            <p className="m-0 max-w-[68ch] text-[1.1875rem] leading-[1.6] text-text-muted">
              FGX Dash is the same build we deploy, private and branded, for the owners we work with.
              FGX Assist is what&apos;s next, tools you&apos;d actually trust with your morning.
            </p>
            <p className="m-0 max-w-[68ch] text-[1.0625rem] leading-[1.6] text-text-muted">
              Your accounts, your rules. Credentials are held server-side and never touch the
              browser, the AI never acts on its own, and every action is logged and reversible where
              possible. Dash runs self-hosted on infrastructure you control, and your data stays
              yours.
            </p>
            <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[13px] text-text-faint">
              <span>Self-hosted</span>
              <span aria-hidden>·</span>
              <span>Nothing acts on its own</span>
              <span aria-hidden>·</span>
              <span>Keys never touch the browser</span>
              <span aria-hidden>·</span>
              <span>Yours to export or delete</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="border-t border-hairline bg-bg-deep py-[clamp(72px,10vw,140px)]">
        <div className="mx-auto max-w-[900px] px-[var(--gutter)]">
          <Reveal className="mb-[clamp(32px,4vw,48px)] flex flex-col gap-[14px]">
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand">
              Questions
            </span>
            <h2 className="m-0 font-display text-[clamp(1.9rem,3vw,2.5rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-text-strong">
              The short version.
            </h2>
          </Reveal>
          <div className="flex flex-col divide-y divide-hairline border-y border-hairline">
            {FAQ.map((item, i) => (
              <Reveal key={item.q} delay={i * 60} className="flex flex-col gap-2 py-6">
                <h3 className="m-0 font-display text-[1.2rem] font-bold tracking-[-0.02em] text-text-strong">
                  {item.q}
                </h3>
                <p className="m-0 text-[1rem] leading-[1.6] text-text-muted">{item.a}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="border-t border-hairline py-[clamp(72px,10vw,150px)]">
        <div className="mx-auto max-w-container px-[var(--gutter)]">
          <Reveal className="flex flex-col items-center gap-7 text-center">
            <h2 className="m-0 max-w-[18ch] font-display text-[clamp(2.2rem,4vw,3.5rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-text-strong [text-wrap:balance]">
              Ready to get your two hours a day back?
            </h2>
            <p className="m-0 max-w-[52ch] text-[1.1875rem] leading-[1.6] text-text-muted">
              A 30 minute strategy call, no pitch deck. You&apos;ll leave knowing exactly what&apos;s
              worth automating first.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-[14px] bg-brand px-[34px] py-[18px] text-[17px] font-semibold tracking-[-0.01em] text-[#06141D] transition-all duration-150 hover:bg-brand-hover hover:shadow-fgx-brand active:translate-y-px"
            >
              Book a strategy call
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
