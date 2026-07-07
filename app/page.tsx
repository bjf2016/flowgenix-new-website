import Link from 'next/link';
import Image from 'next/image';
import { fetchLatestPosts } from '@/lib/sanity';
import Reveal from '@/components/Reveal';
import CountUp from '@/components/CountUp';
import HeroPlasma from '@/components/HeroPlasma';

export const revalidate = 60;

const BUILT_WITH = [
  'Answers every call',
  'Captures every lead',
  'Books jobs 24/7',
  'Drafts your replies',
  'Runs the busywork',
  'Reports back daily',
];

const WORK_GRID = [
  {
    tag: 'Voice AI',
    title: 'AI Voice Agents',
    blurb: 'Receptionists and intake agents that answer, qualify, and book around the clock.',
    img: '/work/ai-voice-agents/card.png',
    href: '/work',
  },
  {
    tag: 'Automation',
    title: 'Workflow Automation',
    blurb: 'Connected pipelines that move work between your tools, with clean reporting.',
    img: '/work/n8n-workflow-automation/card.png',
    href: '/work',
  },
  {
    tag: 'Consumer SaaS',
    title: 'Almanac Leaf',
    blurb: 'A governed-AI family journaling platform, on web and mobile.',
    img: '/work/almanac-leaf/card.png',
    href: '/work/almanac-leaf',
  },
  {
    tag: 'Voice AI · iOS',
    title: 'EverSage',
    blurb: 'A voice-first iPhone assistant that runs the day, and you control every send.',
    img: '/work/eversage/card.png',
    href: '/work/eversage',
  },
];

// Add real client quotes here and the "In their words" section appears automatically.
// Leave empty and it renders nothing (no placeholder text ships).
const TESTIMONIALS: { quote: string; who: string }[] = [
  // { quote: 'Since we turned it on, we stopped missing after-hours calls.', who: 'First name, trade, city' },
];

const WHO_WE_HELP = [
  { n: '01', title: 'Home & field services', sub: 'Plumbers, HVAC, electrical, landscaping.' },
  { n: '02', title: 'Professional services', sub: "Firms billing time they can't afford to lose." },
  { n: '03', title: 'Health & wellness', sub: 'Clinics and practices with full front desks.' },
  { n: '04', title: 'Real estate', sub: "Agents who can't let a lead go cold." },
  { n: '05', title: 'Busy owners & founders', sub: 'Wearing every hat, across one business or several.' },
  { n: '06', title: 'Other businesses', sub: "If it's repetitive, we can probably automate it." },
];

type CockpitMetric = {
  value: string;
  label: string;
  accent: boolean;
  unit?: string;
  count?: { to: number; decimals?: number; prefix?: string };
};

const COCKPIT: CockpitMetric[] = [
  { value: '24/7', label: 'Calls answered', accent: false },
  { value: '0', label: 'Calls missed', accent: false },
  { value: '+14', label: 'Leads captured today', accent: true, count: { to: 14, prefix: '+' } },
  { value: '9.5', unit: 'hrs', label: 'Hours saved', accent: false, count: { to: 9.5, decimals: 1 } },
];

const EXPERIENCE = ['Align Technology', 'Henry Schein', 'Straumann', 'Carl Zeiss'];

const STRIPED =
  'repeating-linear-gradient(135deg,rgba(255,255,255,0.035) 0 10px,transparent 10px 20px),var(--bg-deep)';

export default async function Home() {
  const posts = await fetchLatestPosts(3);

  return (
    <div className="relative overflow-x-hidden bg-bg-base font-body text-text-body">
      {/* ===== 1 · HERO ===== */}
      <section className="relative overflow-hidden pb-[clamp(60px,7vw,96px)] pt-[clamp(70px,9vw,130px)]">
        <HeroPlasma />
        <div className="fgx-glow-pulse pointer-events-none absolute inset-0 z-[1] bg-glow-brand opacity-70" />
        <img
          src="/brand/fgx-head.png"
          alt=""
          aria-hidden
          className="fgx-head-drift pointer-events-none absolute right-[-7%] top-[-6%] z-[1] w-[min(680px,54vw)] opacity-[0.07] saturate-[0.9]"
        />
        {/* scrim: keep the headline readable and blend the plasma into the section */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              'linear-gradient(to right, rgba(30,40,50,0.85), transparent 12%, transparent 88%, rgba(30,40,50,0.85)), linear-gradient(to bottom, transparent 45%, var(--bg-base))',
          }}
        />
        <div className="relative z-10 mx-auto max-w-container px-[var(--gutter)]">
          <div className="flex max-w-[940px] flex-col gap-7">
            <span
              className="fgx-hero-item text-[13px] font-semibold uppercase tracking-[0.18em] text-brand"
              style={{ animationDelay: '0.05s' }}
            >
              AI systems, apps &amp; automation
            </span>
            <h1
              className="fgx-hero-item fgx-headline-mask m-0 font-display text-[clamp(3rem,6.6vw,5.75rem)] font-extrabold leading-[1.0] tracking-[-0.035em] text-text-strong [text-wrap:balance]"
              style={{ animationDelay: '0.15s' }}
            >
              <span>
                Run your business like it <span className="text-brand">runs itself.</span>
              </span>
            </h1>
            <p
              className="fgx-hero-item m-0 max-w-[60ch] text-[clamp(1.1rem,1.5vw,1.35rem)] leading-[1.6] text-text-body"
              style={{ animationDelay: '0.30s' }}
            >
              You wear every hat, maybe across more than one business. We build the AI that answers
              your calls and makes the outbound ones, books the jobs, automates the manual work, and
              puts the whole operation on one screen you can actually act on.
            </p>
            <div className="fgx-hero-item mt-1.5 flex flex-wrap gap-[14px]" style={{ animationDelay: '0.42s' }}>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-[14px] border border-transparent bg-brand px-[30px] py-[17px] text-[17px] font-semibold tracking-[-0.01em] text-[#06141D] transition-all duration-150 hover:bg-brand-hover hover:shadow-fgx-brand active:translate-y-px"
              >
                Book a free strategy call
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center justify-center rounded-[14px] border border-hairline bg-transparent px-[30px] py-[17px] text-[17px] font-semibold tracking-[-0.01em] text-text-strong transition-all duration-150 hover:border-hairline-strong hover:bg-white/[0.06]"
              >
                See the work
              </Link>
            </div>
            <p
              className="fgx-hero-item m-0 mt-1 font-mono text-[13px] text-text-faint"
              style={{ animationDelay: '0.5s' }}
            >
              30 minutes, no pitch. You&apos;ll leave with a clear read on where AI can win back your
              time, whether or not you hire us.
            </p>
          </div>

          {/* built with strip */}
          <div
            className="fgx-hero-item mt-[clamp(48px,6vw,84px)] border-t border-hairline pt-[26px]"
            style={{ animationDelay: '0.55s' }}
          >
            <div className="mb-[18px] font-mono text-[12px] uppercase tracking-[0.1em] text-text-faint">
              What it does for you
            </div>
            <div
              className="relative overflow-hidden"
              style={{
                maskImage:
                  'linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)',
                WebkitMaskImage:
                  'linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)',
              }}
            >
              <div className="flex w-max gap-16 animate-[fgx-marquee_26s_linear_infinite]">
                {[...BUILT_WITH, ...BUILT_WITH].map((name, i) => (
                  <span
                    key={`${name}-${i}`}
                    className="whitespace-nowrap text-[20px] font-semibold text-text-muted"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2 · STATEMENT BAND ===== */}
      <section className="border-y border-hairline bg-bg-deep py-[clamp(72px,10vw,140px)]">
        <div className="mx-auto max-w-[1000px] px-[var(--gutter)]">
          <Reveal>
            <p className="m-0 font-display text-[clamp(1.9rem,3.6vw,3rem)] font-bold leading-[1.18] tracking-[-0.025em] text-text-muted [text-wrap:balance]">
              You didn&apos;t start your business to chase missed calls and dead-end emails.{' '}
              <span className="text-brand">We build the system that catches them all.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== 2b · WHY US ===== */}
      <section className="py-[clamp(72px,10vw,150px)]">
        <div className="mx-auto max-w-container px-[var(--gutter)]">
          <Reveal className="mb-[clamp(40px,5vw,64px)] flex max-w-[820px] flex-col gap-[14px]">
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand">
              Why us
            </span>
            <h2 className="m-0 font-display text-[clamp(2rem,3.4vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-text-strong [text-wrap:balance]">
              You&apos;re hiring an operator, not an agency.
            </h2>
            <p className="m-0 mt-1.5 text-[1.1875rem] leading-[1.65] text-text-body">
              Most AI help falls into two buckets: agencies that hand you a slide deck, or freelancers
              who ship a slick demo that breaks the first real week and then go quiet. We&apos;re
              neither. Twenty years running real operations at companies that live and die on process,
              now building AI systems the same way, to actually hold up.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                title: 'Real engineering, not a weekend demo',
                body:
                  "The parts you don't see are the parts that matter: your logins and data stay locked down, nothing acts on its own, and every piece can be rolled back in one step. Built to run every day, not just to look good in a call.",
              },
              {
                title: 'We run this ourselves',
                body:
                  "Our own operations dashboard is a system we use to run FlowGenixAI, every day. We don't ship you anything we wouldn't stake our own week on.",
              },
              {
                title: 'One person who owns it end to end',
                body:
                  'You talk to the person who designs, builds, and stands behind the work. No account manager, no handoff, no vanishing act.',
              },
            ].map((c, i) => (
              <Reveal
                key={c.title}
                delay={i * 80}
                className="flex flex-col gap-3 rounded-[var(--radius-xl)] border border-hairline bg-surface-card p-[26px] shadow-fgx-md"
              >
                <h3 className="m-0 font-display text-[1.35rem] font-bold tracking-[-0.02em] text-text-strong">
                  {c.title}
                </h3>
                <p className="m-0 text-[1rem] leading-[1.55] text-text-muted">{c.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3 · SELECTED WORK ===== */}
      <section id="work" className="py-[clamp(72px,10vw,150px)]">
        <div className="mx-auto max-w-container px-[var(--gutter)]">
          <Reveal className="mb-[clamp(40px,5vw,64px)] flex flex-col gap-[14px]">
            <div className="fgx-index text-[clamp(56px,8vw,88px)]">01</div>
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand">
              Selected work
            </span>
            <h2 className="m-0 max-w-[20ch] font-display text-[clamp(2rem,3.4vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-text-strong [text-wrap:balance]">
              Systems we&apos;ve shipped, running in the real world.
            </h2>
          </Reveal>

          {/* featured */}
          <Reveal className="group block overflow-hidden rounded-[var(--radius-xl)] border border-hairline bg-surface-card shadow-fgx-md transition-all duration-300 hover:-translate-y-[3px] hover:border-hairline-strong hover:shadow-fgx-lg">
            <div className="grid md:grid-cols-[1.15fr_1fr]">
              <div
                className="relative min-h-[340px] overflow-hidden border-b border-hairline md:border-b-0 md:border-r"
                style={{ background: STRIPED }}
              >
                <img
                  src="/work/ai-operations-dashboard/card.png"
                  alt="AI Operations Dashboard"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              </div>
              <div className="flex flex-col justify-center gap-[18px] p-[clamp(28px,3.5vw,48px)]">
                <span className="self-start rounded-full border border-[var(--brand-40)] bg-[var(--brand-12)] px-3 py-[5px] text-[12px] font-semibold tracking-[0.04em] text-brand">
                  Dashboard
                </span>
                <h3 className="m-0 font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-bold tracking-[-0.025em] text-text-strong">
                  AI Operations Dashboard
                </h3>
                <p className="m-0 max-w-[42ch] text-[1.1875rem] leading-[1.6] text-text-muted">
                  The command center we run FlowGenixAI on, and deploy, private and branded, for
                  owners who are done juggling tabs. Every call, lead, and job on one screen.
                </p>
                <Link
                  href="/work/ai-operations-dashboard"
                  className="mt-1.5 self-start text-[16px] font-semibold text-brand transition-colors hover:text-brand-hover"
                >
                  View case study &rarr;
                </Link>
              </div>
            </div>
          </Reveal>

          {/* grid of four */}
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WORK_GRID.map((item, i) => (
              <Reveal key={item.title} delay={i * 80} className="h-full">
                <Link
                  href={item.href}
                  className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-xl)] border border-hairline bg-surface-card shadow-fgx-md transition-all duration-300 hover:-translate-y-[3px] hover:border-hairline-strong"
                >
                  <div
                    className="relative aspect-[4/3] overflow-hidden border-b border-hairline"
                    style={{ background: STRIPED }}
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      className="absolute inset-0 h-full w-full object-cover object-top"
                    />
                  </div>
                  <div className="flex flex-col gap-3 p-[26px]">
                    <span className="self-start rounded-full border border-hairline-strong px-[11px] py-1 text-[11px] font-semibold tracking-[0.04em] text-silver">
                      {item.tag}
                    </span>
                    <h3 className="m-0 font-display text-[1.4rem] font-bold tracking-[-0.02em] text-text-strong">
                      {item.title}
                    </h3>
                    <p className="m-0 text-[1rem] leading-[1.55] text-text-muted">{item.blurb}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3b · PROOF (renders only when TESTIMONIALS has entries) ===== */}
      {TESTIMONIALS.length > 0 && (
        <section className="border-t border-hairline bg-bg-deep py-[clamp(72px,10vw,150px)]">
          <div className="mx-auto max-w-container px-[var(--gutter)]">
            <Reveal className="mb-[clamp(40px,5vw,64px)] flex flex-col gap-[14px]">
              <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand">
                In their words
              </span>
              <h2 className="m-0 max-w-[20ch] font-display text-[clamp(2rem,3.4vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-text-strong [text-wrap:balance]">
                What owners say after the busywork stops.
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {TESTIMONIALS.map((t, i) => (
                <Reveal
                  key={i}
                  delay={i * 80}
                  className="flex flex-col gap-5 rounded-[var(--radius-xl)] border border-hairline bg-surface-card p-[clamp(28px,3vw,40px)] shadow-fgx-md"
                >
                  <p className="m-0 font-display text-[clamp(1.2rem,1.8vw,1.5rem)] font-medium leading-[1.5] text-text-strong">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <span className="font-mono text-[13px] text-text-muted">{t.who}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== 4 · WHAT WE BUILD ===== */}
      <section className="border-t border-hairline bg-bg-deep py-[clamp(72px,10vw,150px)]">
        <div className="mx-auto max-w-container px-[var(--gutter)]">
          <Reveal className="mb-[clamp(40px,5vw,64px)] flex flex-col gap-[14px]">
            <div className="fgx-index text-[clamp(56px,8vw,88px)]">02</div>
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand">
              What we build
            </span>
            <h2 className="m-0 max-w-[20ch] font-display text-[clamp(2rem,3.4vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-text-strong [text-wrap:balance]">
              The systems that quietly carry the load.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {/* voice receptionist */}
            <Reveal delay={0} className="flex flex-col gap-5 rounded-[var(--radius-xl)] border border-hairline bg-surface-card p-6 shadow-fgx-md">
              <div className="flex flex-col gap-[14px] rounded-[14px] border border-hairline bg-bg-deep p-[18px]">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full bg-[var(--success)]"
                    style={{ boxShadow: '0 0 10px var(--success)' }}
                  />
                  <span className="font-mono text-[12px] text-text-muted">Live · answered in 0.8s</span>
                </div>
                <div className="flex h-10 items-end gap-1">
                  {[40, 70, 30, 90, 55, 100, 45, 75, 35, 65, 25, 50].map((h, i) => (
                    <span
                      key={i}
                      className="flex-1 rounded-[2px] bg-brand"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="m-0 font-display text-[1.35rem] font-bold tracking-[-0.02em] text-text-strong">
                  Inbound and outbound voice agents
                </h3>
                <p className="m-0 text-[1rem] leading-[1.55] text-text-muted">
                  Answers every call, and makes the outbound ones too: reminders, follow-ups, and
                  rebookings. Books the job while the caller&apos;s still on the line.
                </p>
              </div>
            </Reveal>

            {/* lead intake */}
            <Reveal delay={80} className="flex flex-col gap-5 rounded-[var(--radius-xl)] border border-hairline bg-surface-card p-6 shadow-fgx-md">
              <div className="flex flex-col gap-[10px] rounded-[14px] border border-hairline bg-bg-deep p-[14px]">
                {[
                  { w1: '60%', w2: '38%', tag: 'Sales', active: true },
                  { w1: '52%', w2: '30%', tag: 'Support', active: false },
                  { w1: '64%', w2: '42%', tag: 'Booked', active: false },
                ].map((row, i) => (
                  <div key={i} className="flex items-center gap-[10px]">
                    <span
                      className="h-[26px] w-[26px] rounded-full border"
                      style={{
                        background: row.active ? 'var(--brand-12)' : 'rgba(201,210,216,0.08)',
                        borderColor: row.active ? 'var(--brand-40)' : 'var(--hairline-strong)',
                      }}
                    />
                    <div className="flex flex-1 flex-col gap-[3px]">
                      <span
                        className="h-[7px] rounded-[3px] bg-hairline-strong"
                        style={{ width: row.w1 }}
                      />
                      <span className="h-[6px] rounded-[3px] bg-hairline" style={{ width: row.w2 }} />
                    </div>
                    <span
                      className="font-mono text-[10px]"
                      style={{ color: row.active ? 'var(--brand)' : 'var(--text-muted)' }}
                    >
                      {row.tag}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="m-0 font-display text-[1.35rem] font-bold tracking-[-0.02em] text-text-strong">
                  Booking and lead capture
                </h3>
                <p className="m-0 text-[1rem] leading-[1.55] text-text-muted">
                  Every enquiry captured, qualified, and booked straight onto your calendar. No lead
                  goes cold in an inbox.
                </p>
              </div>
            </Reveal>

            {/* workflow automation */}
            <Reveal delay={160} className="flex flex-col gap-5 rounded-[var(--radius-xl)] border border-hairline bg-surface-card p-6 shadow-fgx-md">
              <div className="flex flex-col gap-4 rounded-[14px] border border-hairline bg-bg-deep p-[18px]">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full border-2 border-brand" />
                  <span className="h-[2px] flex-1 bg-hairline-strong" />
                  <span className="h-3 w-3 rounded-full border-2 border-brand" />
                  <span className="h-[2px] flex-1 bg-hairline-strong" />
                  <span className="h-3 w-3 rounded-full bg-brand" />
                </div>
                <div className="flex h-[42px] items-end gap-1.5">
                  {[45, 70, 100, 60, 85].map((h, i) => (
                    <span
                      key={i}
                      className="flex-1 rounded-[3px]"
                      style={{
                        height: `${h}%`,
                        background: h === 100 ? 'var(--brand)' : 'var(--hairline-strong)',
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="m-0 font-display text-[1.35rem] font-bold tracking-[-0.02em] text-text-strong">
                  Automation and customer support
                </h3>
                <p className="m-0 text-[1rem] leading-[1.55] text-text-muted">
                  The repetitive work and the routine customer questions run in the background, and
                  you get one clear report on what got done.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== 5 · WHO WE HELP ===== */}
      <section className="py-[clamp(72px,10vw,150px)]">
        <div className="mx-auto grid max-w-container items-start gap-[clamp(32px,6vw,72px)] px-[var(--gutter)] lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal className="flex flex-col gap-[14px]">
            <div className="fgx-index text-[clamp(56px,8vw,88px)]">03</div>
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand">
              Who we help
            </span>
            <h2 className="m-0 max-w-[16ch] font-display text-[clamp(2rem,3.4vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-text-strong [text-wrap:balance]">
              Built for businesses that run on response time.
            </h2>
            <p className="m-0 mt-1.5 max-w-[38ch] text-[1.0625rem] leading-[1.6] text-text-muted">
              If a missed call is a missed job, we&apos;re built for you. Industry neutral, outcome
              obsessed.
            </p>
          </Reveal>
          <div className="flex flex-col">
            {WHO_WE_HELP.map((item, i) => (
              <Reveal
                key={item.n}
                delay={i * 80}
                className={`flex items-baseline gap-[18px] border-t border-hairline py-6 ${
                  i === WHO_WE_HELP.length - 1 ? 'border-b' : ''
                }`}
              >
                <span className="w-[34px] flex-none font-mono text-[13px] text-brand">{item.n}</span>
                <div>
                  <div className="font-display text-[clamp(1.4rem,2.2vw,1.85rem)] font-bold tracking-[-0.02em] text-text-strong">
                    {item.title}
                  </div>
                  <div className="mt-1 text-[1rem] text-text-muted">{item.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6 · AI OPERATIONS COCKPIT ===== */}
      <section className="pb-[clamp(72px,10vw,150px)]">
        <div className="mx-auto max-w-container px-[var(--gutter)]">
          <div
            className="relative overflow-hidden rounded-[var(--radius-xl)] border border-hairline-strong p-[clamp(36px,5vw,64px)] shadow-fgx-lg"
            style={{ background: 'linear-gradient(180deg,var(--surface-card),var(--bg-deep))' }}
          >
            <div className="pointer-events-none absolute inset-0 bg-glow-brand" />
            <img
              src="/brand/fgx-head.png"
              alt=""
              aria-hidden
              className="pointer-events-none absolute bottom-[-30%] right-[-4%] w-[min(420px,38vw)] opacity-[0.06]"
            />
            <Reveal className="relative mb-[clamp(28px,4vw,48px)] flex flex-col gap-2">
              <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand">
                AI operations dashboard
              </span>
              <h2 className="m-0 max-w-[22ch] font-display text-[clamp(1.8rem,3vw,2.5rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-text-strong [text-wrap:balance]">
                The whole operation, on one quiet screen.
              </h2>
            </Reveal>
            <div className="relative grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline md:grid-cols-4">
              {COCKPIT.map((m, i) => (
                <Reveal key={m.label} delay={i * 80} className="flex flex-col gap-2 bg-bg-deep p-7">
                  <div
                    className={`font-display text-[clamp(2.4rem,4vw,3.4rem)] font-extrabold leading-none tracking-[-0.03em] ${
                      m.accent ? 'text-brand' : 'text-text-strong'
                    }`}
                  >
                    {m.count ? (
                      <CountUp
                        to={m.count.to}
                        decimals={m.count.decimals ?? 0}
                        prefix={m.count.prefix ?? ''}
                      />
                    ) : (
                      m.value
                    )}
                    {m.unit && (
                      <span className="ml-1 text-[0.42em] font-semibold text-text-muted">
                        {m.unit}
                      </span>
                    )}
                  </div>
                  <div className="text-[14px] text-text-muted">{m.label}</div>
                </Reveal>
              ))}
            </div>
            <p className="relative mt-5 font-mono text-[12px] text-text-faint">
              Illustrative view. What a live dashboard surfaces on a typical day.
            </p>
          </div>
        </div>
      </section>

      {/* ===== 7 · ABOUT TEASER ===== */}
      <section
        id="about"
        className="border-y border-hairline bg-bg-deep py-[clamp(72px,10vw,150px)]"
      >
        <div className="mx-auto grid max-w-container items-center gap-[clamp(32px,6vw,80px)] px-[var(--gutter)] md:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="relative">
            <div className="absolute inset-x-[6%] bottom-0 top-[6%] rounded-[var(--radius-xl)] bg-glow-soft" />
            <div className="relative flex aspect-square items-end justify-center overflow-hidden rounded-[var(--radius-xl)] border border-hairline bg-surface-card">
              <Image
                src="/brand/fgx-ben.png"
                alt="Founder portrait"
                width={620}
                height={620}
                className="block w-[96%] saturate-[0.95]"
              />
            </div>
          </Reveal>
          <Reveal delay={120} className="flex flex-col gap-[22px]">
            <div className="fgx-index text-[clamp(56px,8vw,88px)]">04</div>
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand">
              About
            </span>
            <h2 className="m-0 max-w-[20ch] font-display text-[clamp(2rem,3.4vw,2.85rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-text-strong [text-wrap:balance]">
              Twenty years turning messy operations into systems that work.
            </h2>
            <p className="m-0 max-w-[50ch] text-[1.1875rem] leading-[1.65] text-text-body">
              We&apos;ve sat in the operator&apos;s seat at companies that live and die on process.
              Now we build that same discipline into AI systems for businesses that can&apos;t afford
              to drop the ball.
            </p>
            <div className="mt-2 flex flex-col gap-[14px]">
              <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-text-faint">
                Experience across
              </span>
              <div className="flex flex-wrap items-center gap-x-9 gap-y-[14px]">
                {EXPERIENCE.map((name) => (
                  <span
                    key={name}
                    className="font-display text-[1.15rem] font-bold tracking-[-0.01em] text-text-muted"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 8 · FROM THE BLOG ===== */}
      <section id="blog" className="border-t border-hairline bg-bg-deep py-[clamp(72px,10vw,150px)]">
        <div className="mx-auto max-w-container px-[var(--gutter)]">
          <Reveal className="mb-[clamp(36px,5vw,56px)] flex flex-wrap items-end justify-between gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand">
                From the blog
              </span>
              <h2 className="m-0 font-display text-[clamp(2rem,3.4vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-text-strong">
                Notes from the build.
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-[16px] font-semibold text-brand transition-colors hover:text-brand-hover"
            >
              All posts &rarr;
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 80} className="h-full">
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex h-full flex-col overflow-hidden rounded-[var(--radius-xl)] border border-hairline bg-surface-card shadow-fgx-md transition-all duration-300 hover:-translate-y-[3px] hover:border-hairline-strong"
                >
                <div
                  className="relative flex aspect-[16/10] items-center justify-center overflow-hidden border-b border-hairline"
                  style={{
                    background:
                      'repeating-linear-gradient(135deg,rgba(255,255,255,0.035) 0 10px,transparent 10px 20px),var(--bg-base)',
                  }}
                >
                  {post.imageUrl ? (
                    <Image
                      src={post.imageUrl}
                      alt={post.imageAlt || post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <span className="font-mono text-[12px] text-text-faint">// post image</span>
                  )}
                </div>
                <div className="flex flex-col gap-3 p-6">
                  <div className="flex items-center gap-3">
                    {post.categories && post.categories.length > 0 && (
                      <span className="rounded-full border border-[var(--brand-40)] bg-[var(--brand-12)] px-[11px] py-1 text-[11px] font-semibold tracking-[0.04em] text-brand">
                        {post.categories[0].title}
                      </span>
                    )}
                    {post.publishedAt && (
                      <span className="font-mono text-[12px] text-text-faint">
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    )}
                  </div>
                  <h3 className="m-0 font-display text-[1.3rem] font-bold leading-[1.2] tracking-[-0.02em] text-text-strong">
                    {post.title}
                  </h3>
                </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 9 · FINAL CTA ===== */}
      <section
        id="cta"
        className="relative overflow-hidden border-t border-hairline py-[clamp(90px,12vw,180px)]"
      >
        <div className="pointer-events-none absolute inset-0 bg-glow-brand" />
        <img
          src="/brand/fgx-head.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute bottom-[-34%] left-[-8%] w-[min(560px,46vw)] opacity-[0.06]"
        />
        <Reveal className="relative mx-auto flex max-w-[860px] flex-col items-center gap-7 px-[var(--gutter)] text-center">
          <h2 className="m-0 font-display text-[clamp(2.4rem,5vw,4rem)] font-extrabold leading-[1.04] tracking-[-0.035em] text-text-strong [text-wrap:balance]">
            Let&apos;s build the system your business runs on.
          </h2>
          <p className="m-0 max-w-[46ch] text-[clamp(1.1rem,1.5vw,1.3rem)] leading-[1.6] text-text-body">
            A 30 minute call, no pitch. You&apos;ll leave with a clear read on where AI can win back
            your time, across one business or several, whether or not you hire us.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-[14px] border border-transparent bg-brand px-9 py-[19px] text-[18px] font-semibold tracking-[-0.01em] text-[#06141D] transition-all duration-150 hover:bg-brand-hover hover:shadow-fgx-brand active:translate-y-px"
          >
            Book a strategy call
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
