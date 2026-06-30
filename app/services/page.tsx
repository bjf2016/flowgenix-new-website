import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services - FlowGenixAI',
  description:
    'Three core systems plus a flagship operations cockpit. We design them to your workflow, implement fast, and tune them as you grow.',
};

const FEATURE_DOT = 'flex items-center gap-[9px] text-[15px] text-text-body';

function Dot() {
  return <span className="h-1.5 w-1.5 flex-none rounded-full bg-brand" />;
}

function VoiceViz() {
  const bars = [40, 70, 30, 90, 55, 100, 45, 75, 35, 65, 25, 50, 80, 38];
  return (
    <div className="rounded-2xl border border-hairline bg-bg-deep p-[22px]">
      <div className="mb-[18px] flex items-center gap-2">
        <span
          className="h-2 w-2 rounded-full bg-[var(--success)]"
          style={{ boxShadow: '0 0 10px var(--success)' }}
        />
        <span className="font-mono text-[12px] text-text-muted">Live · answered in 0.8s</span>
      </div>
      <div className="flex h-14 items-end gap-1">
        {bars.map((h, i) => (
          <span key={i} className="flex-1 rounded-[2px] bg-brand" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

function IntakeViz() {
  const rows = [
    { w1: '60%', w2: '38%', tag: 'Sales', tagColor: 'var(--brand)', active: true },
    { w1: '52%', w2: '30%', tag: 'Support', tagColor: 'var(--text-muted)', active: false },
    { w1: '64%', w2: '42%', tag: 'Booked', tagColor: 'var(--success)', active: false },
  ];
  return (
    <div className="flex flex-col gap-[14px] rounded-2xl border border-hairline bg-bg-deep p-[18px]">
      {rows.map((row, i) => (
        <div key={i} className="flex items-center gap-[10px]">
          <span
            className="h-7 w-7 rounded-full border"
            style={{
              background: row.active ? 'var(--brand-12)' : 'rgba(201,210,216,0.08)',
              borderColor: row.active ? 'var(--brand-40)' : 'var(--hairline-strong)',
            }}
          />
          <div className="flex flex-1 flex-col gap-1">
            <span className="h-[7px] rounded-[3px] bg-hairline-strong" style={{ width: row.w1 }} />
            <span className="h-[6px] rounded-[3px] bg-hairline" style={{ width: row.w2 }} />
          </div>
          <span className="font-mono text-[10px]" style={{ color: row.tagColor }}>
            {row.tag}
          </span>
        </div>
      ))}
    </div>
  );
}

function WorkflowViz() {
  const bars = [45, 70, 100, 60, 85, 52, 72];
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-hairline bg-bg-deep p-[22px]">
      <div className="flex items-center gap-1.5">
        <span className="h-3 w-3 rounded-full border-2 border-brand" />
        <span className="h-[2px] flex-1 bg-hairline-strong" />
        <span className="h-3 w-3 rounded-full border-2 border-brand" />
        <span className="h-[2px] flex-1 bg-hairline-strong" />
        <span className="h-3 w-3 rounded-full bg-brand" />
      </div>
      <div className="flex h-[52px] items-end gap-[7px]">
        {bars.map((h, i) => (
          <span
            key={i}
            className="flex-1 rounded-[3px]"
            style={{ height: `${h}%`, background: h === 100 ? 'var(--brand)' : 'var(--hairline-strong)' }}
          />
        ))}
      </div>
    </div>
  );
}

const SYSTEMS = [
  {
    n: '01',
    pill: 'Voice',
    title: 'AI Voice Receptionist',
    body: 'Answers, qualifies, and books every call 24/7 in your voice. It greets callers, asks the right questions, and gets the job on the calendar without anyone lifting a phone.',
    outcome: 'Zero missed opportunities.',
    features: ['Natural conversation', 'Call routing', 'Instant booking'],
    viz: <VoiceViz />,
    vizFirst: true,
  },
  {
    n: '02',
    pill: 'Capture',
    title: 'Lead Intake & Routing',
    body: 'Guides callers and web visitors through the right questions, then routes clean, structured data straight into your CRM. The right lead reaches the right person while it is still warm.',
    outcome: 'Every lead captured and followed up.',
    features: ['Smart intake', 'Instant alerts', 'CRM sync'],
    viz: <IntakeViz />,
    vizFirst: false,
  },
  {
    n: '03',
    pill: 'Automate',
    title: 'Workflow Automation & Reporting',
    body: 'Connects the tools you already use and removes the manual handoffs between them. The busywork runs on rails, and you get one clear view of what happened.',
    outcome: 'Hours back every week.',
    features: ['App integrations', 'Automated reminders', 'One clear dashboard'],
    viz: <WorkflowViz />,
    vizFirst: true,
  },
];

const COCKPIT_FEATURES = [
  { title: 'Morning dashboard', body: 'Your day, your numbers, and what needs attention, first thing.' },
  { title: 'Email triage', body: 'AI sorts, summarizes, and drafts so the inbox stays clear.' },
  { title: 'Voice-to-action', body: 'Speak a task and it gets captured, routed, and done.' },
  { title: 'Proposal insights', body: 'See which proposals are moving and which need a nudge.' },
];

const STEPS = [
  { n: '01', title: 'Audit', body: 'We map your real workflows and find the highest-ROI automations, the ones worth doing first.' },
  { n: '02', title: 'Build', body: 'We implement fast and iterate, getting a working system in front of you in days, not months.' },
  { n: '03', title: 'Optimize', body: 'We measure impact and keep improving, tuning the system as your business grows.' },
];

export default function ServicesPage() {
  return (
    <div className="relative overflow-x-hidden bg-bg-base font-body text-text-body">
      {/* page header */}
      <section className="relative overflow-hidden pb-[clamp(40px,5vw,64px)] pt-[clamp(56px,7vw,104px)]">
        <div className="pointer-events-none absolute inset-0 bg-glow-brand" />
        <img
          src="/brand/fgx-head.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute right-[-7%] top-[-12%] w-[min(560px,46vw)] opacity-[0.06] saturate-[0.9]"
        />
        <div className="relative mx-auto max-w-container px-[var(--gutter)]">
          <div className="flex max-w-[900px] flex-col gap-[22px]">
            <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-brand">
              Services
            </span>
            <h1 className="m-0 font-display text-[clamp(2.8rem,6vw,5rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-text-strong [text-wrap:balance]">
              The systems that run your business.
            </h1>
            <p className="m-0 max-w-[62ch] text-[clamp(1.1rem,1.5vw,1.3rem)] leading-[1.6] text-text-body">
              Three core systems, plus a flagship operations cockpit. We design them to your
              workflow, implement fast, and tune them as you grow.
            </p>
          </div>
        </div>
      </section>

      {/* three systems */}
      <section className="mx-auto max-w-container px-[var(--gutter)]">
        <div className="flex flex-col gap-[14px] pt-[clamp(40px,5vw,64px)]">
          <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand">
            The three systems
          </span>
          <h2 className="m-0 max-w-[22ch] font-display text-[clamp(2rem,3.4vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-text-strong [text-wrap:balance]">
            Each one quietly carries part of the load.
          </h2>
        </div>

        {SYSTEMS.map((s, idx) => (
          <div
            key={s.n}
            className={`grid items-center gap-[clamp(32px,5vw,72px)] border-t border-hairline py-[clamp(48px,6vw,88px)] md:grid-cols-2 ${
              idx === 0 ? 'mt-[clamp(36px,5vw,56px)]' : ''
            } ${idx === SYSTEMS.length - 1 ? 'border-b' : ''}`}
          >
            <div
              className={`rounded-[var(--radius-xl)] border border-hairline bg-surface-card p-[clamp(22px,3vw,32px)] shadow-fgx-md ${
                s.vizFirst ? 'md:order-1' : 'md:order-2'
              }`}
            >
              {s.viz}
            </div>
            <div className={`flex flex-col gap-[18px] ${s.vizFirst ? 'md:order-2' : 'md:order-1'}`}>
              <div className="flex items-center gap-[14px]">
                <span className="fgx-index text-[30px]">{s.n}</span>
                <span className="rounded-full border border-[var(--brand-40)] bg-[var(--brand-12)] px-3 py-[5px] text-[12px] font-semibold tracking-[0.04em] text-brand">
                  {s.pill}
                </span>
              </div>
              <h3 className="m-0 font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-bold tracking-[-0.025em] text-text-strong">
                {s.title}
              </h3>
              <p className="m-0 max-w-[46ch] text-[1.0625rem] leading-[1.6] text-text-muted">
                {s.body}
              </p>
              <div className="flex items-baseline gap-[10px]">
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-faint">
                  Outcome
                </span>
                <span className="text-[1.05rem] font-semibold tracking-[-0.01em] text-brand">
                  {s.outcome}
                </span>
              </div>
              <div className="mt-0.5 flex flex-wrap gap-x-[22px] gap-y-[10px]">
                {s.features.map((f) => (
                  <span key={f} className={FEATURE_DOT}>
                    <Dot />
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* flagship cockpit */}
      <section className="py-[clamp(72px,9vw,140px)]">
        <div className="mx-auto max-w-container px-[var(--gutter)]">
          <div
            className="relative overflow-hidden rounded-[var(--radius-xl)] border border-hairline-strong p-[clamp(32px,5vw,64px)] shadow-fgx-lg"
            style={{ background: 'linear-gradient(180deg,var(--surface-card),var(--bg-deep))' }}
          >
            <div className="pointer-events-none absolute inset-0 bg-glow-brand" />
            <img
              src="/brand/fgx-head.png"
              alt=""
              aria-hidden
              className="pointer-events-none absolute bottom-[-28%] right-[-4%] w-[min(400px,36vw)] opacity-[0.06]"
            />
            <div className="relative grid items-center gap-[clamp(32px,5vw,72px)] md:grid-cols-2">
              <div className="flex flex-col gap-5">
                <span className="self-start rounded-full border border-[var(--brand-40)] bg-[var(--brand-12)] px-3 py-[5px] text-[12px] font-semibold tracking-[0.04em] text-brand">
                  Flagship
                </span>
                <h2 className="m-0 max-w-[18ch] font-display text-[clamp(1.9rem,3.2vw,2.7rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-text-strong [text-wrap:balance]">
                  The AI Operations Cockpit
                </h2>
                <p className="m-0 max-w-[48ch] text-[1.0625rem] leading-[1.6] text-text-body">
                  A secure, private command center for busy owners and founders. Your whole operation
                  on one quiet screen, running on your own infrastructure.
                </p>
                <div className="mt-1 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2">
                  {COCKPIT_FEATURES.map((f) => (
                    <div key={f.title} className="flex flex-col gap-1.5 bg-bg-deep p-5">
                      <span className="font-display text-[1.05rem] font-bold tracking-[-0.01em] text-text-strong">
                        {f.title}
                      </span>
                      <span className="text-[14px] leading-[1.5] text-text-muted">{f.body}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-1 flex items-center gap-[11px]">
                  <span
                    className="h-2 w-2 flex-none rounded-full bg-[var(--success)]"
                    style={{ boxShadow: '0 0 10px var(--success)' }}
                  />
                  <span className="text-[15px] text-text-body">
                    Built for founders running more than one thing.
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-[14px]">
                <div
                  className="flex aspect-[4/3] items-center justify-center rounded-[var(--radius-lg)] border border-dashed border-hairline-strong shadow-fgx-md"
                  style={{
                    background:
                      'repeating-linear-gradient(135deg,rgba(255,255,255,0.04) 0 11px,transparent 11px 22px),rgba(16,23,29,0.7)',
                  }}
                >
                  <span className="font-mono text-[13px] text-text-faint">
                    // Cockpit dashboard — 1280×960
                  </span>
                </div>
                <div
                  className="flex items-center gap-[10px] rounded-[12px] border border-hairline px-4 py-[13px]"
                  style={{ background: 'rgba(16,23,29,0.5)' }}
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-brand">
                    Private
                  </span>
                  <span className="text-[14px] text-text-muted">
                    Runs on your own infrastructure. Your data stays yours.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* how it works */}
      <section className="border-t border-hairline bg-bg-deep py-[clamp(72px,10vw,150px)]">
        <div className="mx-auto max-w-container px-[var(--gutter)]">
          <div className="mb-[clamp(40px,5vw,64px)] flex flex-col gap-[14px]">
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand">
              How it works
            </span>
            <h2 className="m-0 max-w-[20ch] font-display text-[clamp(2rem,3.4vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-text-strong [text-wrap:balance]">
              A short path from messy to running.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {STEPS.map((step) => (
              <div
                key={step.n}
                className="flex flex-col gap-[14px] rounded-[var(--radius-xl)] border border-hairline bg-surface-card p-[clamp(28px,3vw,36px)] shadow-fgx-md"
              >
                <span className="fgx-index text-[clamp(44px,5vw,64px)]">{step.n}</span>
                <h3 className="m-0 font-display text-[1.5rem] font-bold tracking-[-0.02em] text-text-strong">
                  {step.title}
                </h3>
                <p className="m-0 text-[1rem] leading-[1.6] text-text-muted">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-hairline py-[clamp(80px,11vw,160px)]">
        <div className="pointer-events-none absolute inset-0 bg-glow-brand" />
        <img
          src="/brand/fgx-head.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute bottom-[-34%] left-[-8%] w-[min(520px,44vw)] opacity-[0.06]"
        />
        <div className="relative mx-auto flex max-w-[820px] flex-col items-center gap-[26px] px-[var(--gutter)] text-center">
          <h2 className="m-0 font-display text-[clamp(2.2rem,4.6vw,3.6rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-text-strong [text-wrap:balance]">
            Not sure where to start?
          </h2>
          <p className="m-0 max-w-[46ch] text-[clamp(1.1rem,1.5vw,1.3rem)] leading-[1.6] text-text-body">
            A 30 minute strategy call, no pitch deck. You will leave knowing exactly what is worth
            automating first.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-[14px] border border-transparent bg-brand px-9 py-[19px] text-[18px] font-semibold tracking-[-0.01em] text-[#06141D] transition-all duration-150 hover:bg-brand-hover hover:shadow-fgx-brand active:translate-y-px"
          >
            Book a strategy call
          </Link>
        </div>
      </section>
    </div>
  );
}
