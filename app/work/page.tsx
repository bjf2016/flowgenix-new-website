import Link from 'next/link';
import type { Metadata } from 'next';
import { WORK } from '@/lib/work';

export const metadata: Metadata = {
  title: 'Work - FlowGenixAI',
  description:
    "A look at what we've designed and built over the last two years. Apps, dashboards, automations, and sites, end to end.",
};

const STRIPED =
  'repeating-linear-gradient(135deg,rgba(255,255,255,0.035) 0 11px,transparent 11px 22px),var(--bg-deep)';

function Placeholder({ caption }: { caption: string }) {
  return (
    <div
      className="flex aspect-[16/10] items-center justify-center rounded-[var(--radius-xl)] border border-dashed border-hairline-strong shadow-fgx-md"
      style={{ background: STRIPED }}
    >
      <span className="font-mono text-[13px] text-text-faint">{caption}</span>
    </div>
  );
}

export default function WorkPage() {
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
          <div className="flex max-w-[880px] flex-col gap-[22px]">
            <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-brand">
              Selected work
            </span>
            <h1 className="m-0 font-display text-[clamp(2.8rem,6vw,5rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-text-strong [text-wrap:balance]">
              Systems we&apos;ve shipped.
            </h1>
            <p className="m-0 max-w-[62ch] text-[clamp(1.1rem,1.5vw,1.3rem)] leading-[1.6] text-text-body">
              A look at what we&apos;ve designed and built over the last two years. Apps, dashboards,
              automations, and sites, end to end.
            </p>
          </div>
        </div>
      </section>

      {/* case blocks */}
      <section className="mx-auto max-w-container px-[var(--gutter)]">
        {WORK.map((p, idx) => {
          const imageFirst = idx % 2 === 0;
          return (
            <div
              key={p.slug}
              className={`grid items-center gap-[clamp(32px,5vw,80px)] border-t border-hairline py-[clamp(56px,7vw,104px)] md:grid-cols-2 ${
                idx === WORK.length - 1 ? 'border-b' : ''
              }`}
            >
              <div className={imageFirst ? 'md:order-1' : 'md:order-2'}>
                <Placeholder caption={`${p.title} 1600×1000`} />
              </div>
              <div
                className={`flex flex-col gap-5 ${imageFirst ? 'md:order-2' : 'md:order-1'}`}
              >
                <div className="flex items-center gap-[14px]">
                  <span className="fgx-index text-[34px]">{p.index}</span>
                  <span className="rounded-full border border-[var(--brand-40)] bg-[var(--brand-12)] px-3 py-[5px] text-[12px] font-semibold tracking-[0.04em] text-brand">
                    {p.category}
                  </span>
                </div>
                <h2 className="m-0 font-display text-[clamp(1.7rem,2.8vw,2.4rem)] font-bold tracking-[-0.025em] text-text-strong">
                  {p.title}
                  {p.titleNote && (
                    <span className="ml-2 align-middle font-mono text-[0.5em] font-normal tracking-[0.02em] text-text-faint">
                      {p.titleNote}
                    </span>
                  )}
                </h2>
                <div className="flex flex-col gap-[5px]">
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-brand">
                    The problem
                  </span>
                  <p className="m-0 text-[1.0625rem] leading-[1.6] text-text-muted">{p.problem}</p>
                </div>
                <div className="flex flex-col gap-[5px]">
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-faint">
                    What we built
                  </span>
                  <p className="m-0 text-[1.0625rem] leading-[1.6] text-text-body">{p.whatWeBuilt}</p>
                </div>
                <div className="mt-0.5 flex flex-col gap-[9px]">
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-faint">
                    Stack
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-hairline-strong px-3 py-[5px] text-[13px] font-medium text-text-body"
                        style={{ background: 'rgba(255,255,255,0.03)' }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  href={`/work/${p.slug}`}
                  className="mt-1 self-start text-[16px] font-semibold text-brand transition-colors hover:text-brand-hover"
                >
                  View case study &rarr;
                </Link>
              </div>
            </div>
          );
        })}
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-bg-deep py-[clamp(80px,11vw,160px)]">
        <div className="pointer-events-none absolute inset-0 bg-glow-brand" />
        <img
          src="/brand/fgx-head.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute bottom-[-34%] left-[-8%] w-[min(520px,44vw)] opacity-[0.06]"
        />
        <div className="relative mx-auto flex max-w-[820px] flex-col items-center gap-[26px] px-[var(--gutter)] text-center">
          <h2 className="m-0 font-display text-[clamp(2.2rem,4.6vw,3.6rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-text-strong [text-wrap:balance]">
            Have something like this in mind?
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
