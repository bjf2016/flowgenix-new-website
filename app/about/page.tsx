import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'About - FlowGenixAI',
  description:
    'FlowGenixAI is led by Ben Foroodian, twenty years of turning messy operations into systems that actually work.',
};

const EXPERIENCE = ['Align Technology', 'Henry Schein', 'Straumann', 'Carl Zeiss'];

const RULES = [
  {
    n: '01',
    title: 'Start with the real workflow, not the tech.',
    body: 'The tool only matters once the problem is clear.',
  },
  {
    n: '02',
    title: 'Build fast, then iterate.',
    body: 'Something working in days beats something perfect in months.',
  },
  {
    n: '03',
    title: 'Measure the impact, hours saved, leads captured.',
    body: 'If it does not move a number that matters, it does not ship.',
  },
  {
    n: '04',
    title: 'Keep it secure and private by design.',
    body: 'Your data stays yours, on infrastructure you control.',
  },
];

const RECENT = [
  { n: '01', title: 'AI Operations Dashboard', sub: 'The dashboard we run FlowGenixAI on, and deploy for clients', slug: 'ai-operations-dashboard' },
  { n: '02', title: 'Almanac Leaf', sub: 'Governed-AI family journaling platform, web and mobile', slug: 'almanac-leaf' },
  { n: '03', title: 'EverSage', sub: 'Voice-first AI assistant for iPhone', slug: 'eversage' },
  { n: '04', title: 'Restate', sub: 'Personal AI study companion, built in days', slug: 'restate' },
];

export default function AboutPage() {
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
          <Reveal className="flex max-w-[900px] flex-col gap-[22px]">
            <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-brand">
              About
            </span>
            <h1 className="m-0 font-display text-[clamp(2.8rem,6vw,5rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-text-strong [text-wrap:balance]">
              Built by an operator, not an agency.
            </h1>
            <p className="m-0 max-w-[62ch] text-[clamp(1.1rem,1.5vw,1.3rem)] leading-[1.6] text-text-body">
              FlowGenixAI is led by Ben Foroodian, twenty years of turning messy operations into
              systems that actually work.
            </p>
          </Reveal>
        </div>
      </section>

      {/* founder block */}
      <section className="pb-[clamp(72px,9vw,140px)] pt-[clamp(40px,5vw,72px)]">
        <div className="mx-auto grid max-w-container items-center gap-[clamp(32px,6vw,80px)] px-[var(--gutter)] md:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="relative">
            <div className="absolute inset-x-[6%] bottom-0 top-[6%] rounded-[var(--radius-xl)] bg-glow-soft" />
            <div className="relative flex aspect-square items-end justify-center overflow-hidden rounded-[var(--radius-xl)] border border-hairline bg-surface-card shadow-fgx-md">
              <Image
                src="/brand/fgx-ben.png"
                alt="Ben Foroodian, founder of FlowGenixAI"
                width={620}
                height={620}
                className="block w-[96%] saturate-[0.95]"
              />
            </div>
          </Reveal>
          <Reveal delay={120} className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="font-display text-[clamp(1.5rem,2.4vw,2rem)] font-bold tracking-[-0.02em] text-text-strong">
                Ben Foroodian
              </span>
              <span className="font-mono text-[13px] tracking-[0.06em] text-brand">
                Founder, FlowGenixAI
              </span>
            </div>
            <p className="m-0 max-w-[52ch] text-[1.1875rem] leading-[1.65] text-text-body">
              I&apos;ve led product, operations, and data teams at companies like Align Technology,
              Henry Schein, Straumann, and Carl Zeiss, always with the same focus: take the manual,
              frustrating parts of a business and make them run quietly in the background.
            </p>
            <p className="m-0 max-w-[52ch] text-[1.1875rem] leading-[1.65] text-text-body">
              For the last two years I&apos;ve built that future hands-on, AI assistants, operations
              dashboards, automations, and apps. FlowGenixAI brings all of it to your business.
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

      {/* how I work */}
      <section className="border-t border-hairline bg-bg-deep py-[clamp(72px,10vw,150px)]">
        <div className="mx-auto max-w-container px-[var(--gutter)]">
          <Reveal className="mb-[clamp(40px,5vw,64px)] flex flex-col gap-[14px]">
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand">
              How I work
            </span>
            <h2 className="m-0 max-w-[20ch] font-display text-[clamp(2rem,3.4vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-text-strong [text-wrap:balance]">
              Four rules I build by.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {RULES.map((r, i) => (
              <Reveal
                key={r.n}
                delay={i * 80}
                className="flex flex-col gap-[13px] rounded-[var(--radius-xl)] border border-hairline bg-surface-card p-[clamp(26px,3vw,34px)] shadow-fgx-md"
              >
                <span className="font-mono text-[13px] text-brand">{r.n}</span>
                <h3 className="m-0 font-display text-[1.3rem] font-bold leading-[1.2] tracking-[-0.02em] text-text-strong">
                  {r.title}
                </h3>
                <p className="m-0 text-[1rem] leading-[1.6] text-text-muted">{r.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* built lately */}
      <section className="py-[clamp(72px,9vw,140px)]">
        <div className="mx-auto max-w-container px-[var(--gutter)]">
          <Reveal className="mb-[clamp(32px,4vw,48px)] flex flex-wrap items-end justify-between gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand">
                Recent work
              </span>
              <h2 className="m-0 font-display text-[clamp(1.9rem,3.2vw,2.6rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-text-strong">
                A few things I&apos;ve built lately.
              </h2>
            </div>
            <Link
              href="/work"
              className="whitespace-nowrap text-[16px] font-semibold text-brand transition-colors hover:text-brand-hover"
            >
              See all work &rarr;
            </Link>
          </Reveal>
          <div className="flex flex-col border-t border-hairline">
            {RECENT.map((item, i) => (
              <Reveal key={item.n} delay={i * 80}>
              <Link
                href={`/work/${item.slug}`}
                className="flex items-baseline gap-[18px] border-b border-hairline px-1 py-[22px] transition-colors hover:bg-white/[0.03]"
              >
                <span className="w-[34px] flex-none font-mono text-[13px] text-brand">{item.n}</span>
                <div className="flex-1">
                  <span className="font-display text-[clamp(1.3rem,2vw,1.6rem)] font-bold tracking-[-0.02em] text-text-strong">
                    {item.title}
                  </span>
                  <span className="ml-[14px] text-[1rem] text-text-muted">{item.sub}</span>
                </div>
                <span className="flex-none text-[18px] text-text-faint">&rarr;</span>
              </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-hairline bg-bg-deep py-[clamp(80px,11vw,160px)]">
        <div className="pointer-events-none absolute inset-0 bg-glow-brand" />
        <img
          src="/brand/fgx-head.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute bottom-[-34%] left-[-8%] w-[min(520px,44vw)] opacity-[0.06]"
        />
        <div className="relative mx-auto flex max-w-[820px] flex-col items-center gap-[26px] px-[var(--gutter)] text-center">
          <h2 className="m-0 font-display text-[clamp(2.2rem,4.6vw,3.6rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-text-strong [text-wrap:balance]">
            Let&apos;s build something that runs itself.
          </h2>
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
