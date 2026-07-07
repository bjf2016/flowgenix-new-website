import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { caseStudies, getProject, getNextProject } from '@/lib/work';
import ScrollingShot from '@/components/ScrollingShot';

interface Params {
  params: { slug: string };
}

export function generateStaticParams() {
  return caseStudies().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const project = getProject(params.slug);
  if (!project) return { title: 'Work - FlowGenixAI' };
  return {
    title: `${project.title} - FlowGenixAI`,
    description: project.summary,
  };
}

const STRIPED_DEEP =
  'repeating-linear-gradient(135deg,rgba(255,255,255,0.035) 0 11px,transparent 11px 22px),var(--bg-deep)';

const sectionLabel =
  'text-[12px] font-semibold uppercase tracking-[0.18em] text-brand';

export default function CaseStudyPage({ params }: Params) {
  const project = getProject(params.slug);
  if (!project || !project.caseStudy) notFound();

  const cs = project.caseStudy;
  const next = getNextProject(project.slug);
  const tags = cs?.tags ?? project.category.split('·').map((t) => t.trim());
  const metaStrip =
    cs?.meta ?? [
      { label: 'Role', value: 'Design & build, end to end' },
      { label: 'Category', value: project.category },
      { label: 'Stack', value: project.stack.join(', ') },
    ];
  const gallery = cs?.gallery ?? ['// screen one', '// screen two', '// screen three'];
  const stackTools = cs?.stackTools ?? project.stack;

  return (
    <div className="relative overflow-x-hidden bg-bg-base font-body text-text-body">
      <article>
        {/* hero */}
        <section className="relative overflow-hidden pt-[clamp(40px,5vw,72px)]">
          <div className="pointer-events-none absolute inset-0 bg-glow-brand" />
          <div className="relative mx-auto max-w-container px-[var(--gutter)]">
            <div className="flex max-w-[880px] flex-col gap-[22px]">
              <Link
                href="/work"
                className="self-start font-mono text-[12px] tracking-[0.06em] text-text-muted transition-colors hover:text-brand"
              >
                &larr; Back to work
              </Link>
              <div className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[var(--brand-40)] bg-[var(--brand-12)] px-3 py-[5px] text-[11px] font-semibold tracking-[0.04em] text-brand"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <h1 className="m-0 font-display text-[clamp(2.6rem,5.5vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-text-strong [text-wrap:balance]">
                {project.title}
              </h1>
              <p className="m-0 max-w-[60ch] text-[clamp(1.15rem,1.6vw,1.4rem)] leading-[1.55] text-text-body">
                {project.summary}
              </p>
            </div>
          </div>
        </section>

        {/* hero screenshot */}
        <section className="mx-auto mt-[clamp(32px,4vw,52px)] max-w-[1120px] px-[var(--gutter)]">
          {cs?.heroScrollImage ? (
            <ScrollingShot
              src={cs.heroScrollImage}
              alt={`${project.title}, full dashboard`}
              frameLabel="dashboard.flowgenixai.com"
            />
          ) : (
            <div
              className="relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded-[var(--radius-xl)] border border-hairline shadow-fgx-lg"
              style={{
                background:
                  'repeating-linear-gradient(135deg,rgba(255,255,255,0.035) 0 12px,transparent 12px 24px),var(--bg-deep)',
              }}
            >
              {cs?.heroImage ? (
                <img
                  src={cs.heroImage}
                  alt={`${project.title} screenshot`}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-glow-soft" />
                  <span className="relative font-mono text-[13px] text-text-faint">
                    // hero screenshot 1760×990
                  </span>
                </>
              )}
            </div>
          )}
        </section>

        {/* meta strip */}
        <section className="mx-auto max-w-[1120px] px-[var(--gutter)] pt-[clamp(32px,4vw,52px)]">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline md:grid-cols-4">
            {metaStrip.map((m) => (
              <div key={m.label} className="flex flex-col gap-[7px] bg-bg-deep px-6 py-[22px]">
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-faint">
                  {m.label}
                </span>
                <span className="text-[1.05rem] font-semibold text-text-strong">{m.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* the challenge */}
        <section className="mx-auto max-w-[760px] px-[var(--gutter)] pt-[clamp(64px,8vw,120px)]">
          <div className="flex flex-col gap-[18px]">
            <span className={sectionLabel}>The challenge</span>
            <h2 className="m-0 font-display text-[clamp(1.7rem,3vw,2.4rem)] font-bold leading-[1.12] tracking-[-0.025em] text-text-strong [text-wrap:balance]">
              {cs?.challenge.heading ?? 'The problem we set out to solve.'}
            </h2>
            <p className="m-0 text-[1.1875rem] leading-[1.7] text-text-body">
              {cs?.challenge.body ?? project.problem}
            </p>
          </div>
        </section>

        {/* what we built */}
        <section className="mx-auto max-w-[760px] px-[var(--gutter)] pt-[clamp(56px,7vw,96px)]">
          <div className="flex flex-col gap-[18px]">
            <span className={sectionLabel}>What we built</span>
            <h2 className="m-0 font-display text-[clamp(1.7rem,3vw,2.4rem)] font-bold leading-[1.12] tracking-[-0.025em] text-text-strong [text-wrap:balance]">
              {cs?.built.heading ?? 'What we designed and shipped.'}
            </h2>
            {(cs?.built.intro ?? [project.whatWeBuilt]).map((para, i) => (
              <p key={i} className="m-0 text-[1.1875rem] leading-[1.7] text-text-body">
                {para}
              </p>
            ))}
          </div>

          {cs?.built.features && (
            <div className="mt-[30px] flex flex-col gap-[14px]">
              {cs.built.features.map((f, i) => (
                <div
                  key={f.title}
                  className={`flex items-start gap-[14px] border-t border-hairline py-[18px] ${
                    i === cs.built.features.length - 1 ? 'border-b' : ''
                  }`}
                >
                  <span className="w-7 flex-none font-mono text-[12px] text-brand">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex flex-col gap-[3px]">
                    <span className="text-[1.1rem] font-semibold text-text-strong">{f.title}</span>
                    <span className="text-[1rem] leading-[1.55] text-text-muted">{f.body}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* gallery */}
        <section className="mx-auto mt-[clamp(40px,5vw,64px)] max-w-[1120px] px-[var(--gutter)]">
          <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((cap, i) => {
              const img = cs?.galleryImages?.[i];
              return (
                <div
                  key={i}
                  className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[var(--radius-lg)] border border-hairline shadow-fgx-md"
                  style={{ background: STRIPED_DEEP }}
                >
                  {img ? (
                    <img
                      src={img}
                      alt={`${project.title} screen ${i + 1}`}
                      className="absolute inset-0 h-full w-full object-cover object-top"
                    />
                  ) : (
                    <span className="font-mono text-[12px] text-text-faint">{cap}</span>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* the outcome (only when we have real numbers) */}
        {cs?.outcome && (
          <section className="mt-[clamp(64px,8vw,120px)] border-t border-hairline bg-bg-deep py-[clamp(64px,8vw,120px)]">
            <div className="mx-auto max-w-container px-[var(--gutter)]">
              <div className="mb-[clamp(32px,4vw,48px)] flex flex-col gap-[14px]">
                <span className={sectionLabel}>The outcome</span>
                <h2 className="m-0 max-w-[20ch] font-display text-[clamp(1.9rem,3.2vw,2.6rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-text-strong [text-wrap:balance]">
                  {cs.outcome.heading}
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {cs.outcome.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="flex flex-col gap-[10px] rounded-[var(--radius-xl)] border border-hairline bg-surface-card p-[clamp(28px,3vw,36px)] shadow-fgx-md"
                  >
                    <span
                      className={`font-display text-[clamp(2.6rem,4.5vw,3.6rem)] font-extrabold leading-none tracking-[-0.03em] ${
                        m.accent ? 'text-brand' : 'text-text-strong'
                      }`}
                    >
                      {m.value}
                      {m.unit && (
                        <span className="ml-[5px] text-[0.4em] font-semibold text-text-muted">
                          {m.unit}
                        </span>
                      )}
                    </span>
                    <span className="text-[1.0625rem] leading-[1.5] text-text-muted">{m.label}</span>
                  </div>
                ))}
              </div>
              <p className="m-0 mt-[18px] font-mono text-[0.95rem] text-text-faint">
                {cs.outcome.note}
              </p>
            </div>
          </section>
        )}

        {/* stack & tools */}
        <section className="mx-auto max-w-container px-[var(--gutter)] pt-[clamp(56px,7vw,96px)]">
          <div className="flex flex-col gap-[18px]">
            <span className={sectionLabel}>Stack &amp; tools</span>
            <div className="flex flex-wrap gap-[10px]">
              {stackTools.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-hairline-strong px-4 py-2 text-[14px] font-medium text-text-body"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* next project */}
        <section className="mx-auto max-w-container px-[var(--gutter)] pt-[clamp(56px,7vw,96px)]">
          <Link
            href={`/work/${next.slug}`}
            className="group block overflow-hidden rounded-[var(--radius-xl)] border border-hairline bg-surface-card shadow-fgx-md transition-all duration-300 hover:-translate-y-[3px] hover:border-hairline-strong hover:shadow-fgx-lg"
          >
            <div className="grid md:grid-cols-[1fr_1.1fr]">
              <div className="flex flex-col justify-center gap-[14px] p-[clamp(28px,3.5vw,48px)]">
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-faint">
                  Next project
                </span>
                <span className="self-start rounded-full border border-[var(--brand-40)] bg-[var(--brand-12)] px-3 py-[5px] text-[11px] font-semibold tracking-[0.04em] text-brand">
                  {next.category}
                </span>
                <h3 className="m-0 font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-bold tracking-[-0.025em] text-text-strong">
                  {next.title}
                </h3>
                <p className="m-0 max-w-[40ch] text-[1.05rem] leading-[1.55] text-text-muted">
                  {next.summary}
                </p>
                <span className="mt-1 text-[16px] font-semibold text-brand">View project &rarr;</span>
              </div>
              <div
                className="relative flex min-h-[260px] items-center justify-center overflow-hidden border-t border-hairline md:border-l md:border-t-0"
                style={{ background: STRIPED_DEEP }}
              >
                {next.cardImage ?? next.caseStudy?.heroImage ? (
                  <img
                    src={next.cardImage ?? next.caseStudy?.heroImage}
                    alt={`${next.title} screenshot`}
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-glow-soft" />
                    <span className="relative font-mono text-[12px] text-text-faint">
                      // {next.title} screenshot
                    </span>
                  </>
                )}
              </div>
            </div>
          </Link>
        </section>
      </article>

      {/* CTA */}
      <section className="relative mt-[clamp(64px,8vw,120px)] overflow-hidden border-t border-hairline py-[clamp(80px,11vw,160px)]">
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
