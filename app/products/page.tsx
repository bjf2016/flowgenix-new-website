import Link from 'next/link';
import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import CountUp from '@/components/CountUp';
import ProductLeadForm from '@/components/ProductLeadForm';

export const metadata: Metadata = {
  title: 'FGX Dash & FGX Assist - FlowGenixAI Products',
  description:
    'Two FlowGenixAI products that run the busywork. FGX Dash puts your whole operating day on one private screen, live today. FGX Assist is a voice-first AI Chief of Staff, in early access.',
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
    title: 'Every account, any provider',
    body: 'Custom connectors tie six inboxes and calendars across four providers into one screen, past the limits of the native integrations.',
  },
  {
    n: '02',
    title: 'Birds-eye view, real drilldown',
    body: 'The whole day at a glance, and every tile opens up. Read the full thread, expand the reasoning, edit a line in place. Nothing is a dead end.',
  },
  {
    n: '03',
    title: 'Voice to action',
    body: 'Speak a note and it becomes to-dos, captured and routed across your work and personal world, without opening another app.',
  },
  {
    n: '04',
    title: 'AI inbox triage and drafts',
    body: 'Watchlists surface the people and threads that matter, pull out the action items, and pre-draft replies ready to send or edit.',
  },
  {
    n: '05',
    title: 'Newsletter and research triage',
    body: 'It reads the newsletters and links you would never get through, keeps what is worth your time, and drops it in as clickable highlights.',
  },
  {
    n: '06',
    title: 'Private by design',
    body: 'Self-hosted on infrastructure you control, locked down so no login or key reaches the browser, with a demo mode on fake data.',
  },
];

const ASSIST_FEATURES = [
  {
    title: 'Say it once',
    body: 'Voice or text in, real actions out, captured and routed across your whole world, work and personal.',
  },
  {
    title: 'You set the autonomy',
    body: 'A dial per task: ask first, notify after, or full auto. Ships all-ask, with a global pause and a full audit log.',
  },
  {
    title: 'Works with Dash',
    body: 'Assist and Dash share the same data, so what you say shows up where you already look.',
  },
];

const ASSIST_LIVE = [
  'Voice-first capture: say it once, it turns into action',
  'Inbox triage, with replies drafted in your voice',
  'Agentic scheduling: proposes the times, drafts the invite, closes the loop',
  'Approval controls: you set what runs on its own, and what waits for you',
  'A full audit trail of every action, with undo',
  'Time saved, tallied from what it actually did, in hours and dollars',
  'Across every inbox, calendar, and business you run',
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
    a: 'Yes. It is live and deployed privately for owners today. Request a walkthrough to see it on your own accounts.',
  },
  {
    q: 'When does FGX Assist launch?',
    a: 'It is in active development. Join the early-access list and we will tell you first.',
  },
  {
    q: 'Is my data safe?',
    a: 'Dash is self-hosted on infrastructure you control. No login or key touches the browser, and the AI never acts on its own.',
  },
  {
    q: 'Can I get both?',
    a: 'Yes. They are built to work together, one studio and one standard.',
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
              One studio, two products that talk to each other. FGX Dash gives you your whole
              operating day on one private screen. FGX Assist turns your voice into work that gets
              done.
            </p>
            <div className="mt-1.5 flex flex-wrap gap-[14px]">
              <Link
                href="#dash"
                className="inline-flex items-center justify-center rounded-[14px] bg-brand px-[30px] py-[17px] text-[17px] font-semibold tracking-[-0.01em] text-[#06141D] transition-all duration-150 hover:bg-brand-hover hover:shadow-fgx-brand active:translate-y-px"
              >
                See FGX Dash
              </Link>
              <Link
                href="#assist"
                className="inline-flex items-center justify-center rounded-[14px] border border-hairline bg-transparent px-[30px] py-[17px] text-[17px] font-semibold tracking-[-0.01em] text-text-strong transition-all duration-150 hover:border-hairline-strong hover:bg-white/[0.06]"
              >
                Explore FGX Assist
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
              Your inboxes and calendars pull together, no matter how many or which providers, with
              the news that matters, your priorities, and anything quietly slipping, all sorted by
              what needs you first. It is self-hosted on infrastructure you control, so no login or
              key ever reaches the browser. The AI reads, sorts, and drafts, but nothing acts on its
              own.
            </p>
          </Reveal>

          {/* feature grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

          {/* dash CTA */}
          <Reveal className="mt-[clamp(40px,5vw,64px)] flex flex-col items-start gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-[14px] bg-brand px-[30px] py-[17px] text-[17px] font-semibold tracking-[-0.01em] text-[#06141D] transition-all duration-150 hover:bg-brand-hover hover:shadow-fgx-brand active:translate-y-px"
            >
              Request a Dash walkthrough
            </Link>
            <p className="m-0 font-mono text-[13px] text-text-faint">
              A private, branded deployment on infrastructure you control.
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
                  set. We build it around your business: your inboxes, your calendars, your
                  workflows, with the capabilities that matter most to you. It never crosses into
                  money, contracts, or anything irreversible without your say-so.
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

            {/* early access panel */}
            <Reveal className="lg:sticky lg:top-24 flex h-fit flex-col gap-5 rounded-[var(--radius-xl)] border border-hairline bg-surface-card p-[clamp(28px,3vw,40px)] shadow-fgx-lg">
              <div className="flex flex-col gap-2">
                <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand">
                  Get started
                </span>
                <h3 className="m-0 font-display text-[1.6rem] font-bold tracking-[-0.02em] text-text-strong">
                  Bring FGX Assist to your business.
                </h3>
                <p className="m-0 text-[1rem] leading-[1.55] text-text-muted">
                  Tell us how you work and we'll set up a walkthrough tailored to your inboxes,
                  calendars, and priorities.
                </p>
              </div>
              <ProductLeadForm
                leadLabel="FGX Assist demo request (from /products)"
                intent="assist-demo"
                source="products-page-assist"
                cta="Request a demo"
                note="We'll reply within one business day."
              />
            </Reveal>
          </div>

          {/* what works today */}
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
                Tailored and branded to your business on delivery.
              </p>
            </Reveal>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
              {ASSIST_SHOTS.map((shot, i) => (
                <Reveal
                  key={shot.src}
                  delay={i * 70}
                  className="overflow-hidden rounded-[var(--radius-lg)] border border-hairline bg-bg-base shadow-fgx-md transition-all duration-300 hover:-translate-y-[3px] hover:border-hairline-strong"
                >
                  <img
                    src={`/products/assist/${shot.src}.png`}
                    alt={shot.alt}
                    className="block h-auto w-full"
                  />
                  <p className="m-0 px-3 py-[10px] text-center font-mono text-[12px] text-text-muted">
                    {shot.cap}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
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
              FGX Assist is what is next. One studio, one standard: tools you would actually trust
              with your morning.
            </p>
            <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[13px] text-text-faint">
              <span>Self-hosted</span>
              <span aria-hidden>·</span>
              <span>Nothing acts on its own</span>
              <span aria-hidden>·</span>
              <span>Your keys never leave your infrastructure</span>
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
              Have something like this in mind?
            </h2>
            <p className="m-0 max-w-[52ch] text-[1.1875rem] leading-[1.6] text-text-muted">
              A 30 minute strategy call, no pitch deck. You will leave knowing exactly what is worth
              automating first.
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
