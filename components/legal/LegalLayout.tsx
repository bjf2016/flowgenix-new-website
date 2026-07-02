'use client';

import { useEffect, useState, type ReactNode } from 'react';

export interface LegalSection {
  id: string;
  heading: string;
  body: ReactNode;
}

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  intro?: ReactNode;
  sections: LegalSection[];
}

export function LegalLayout({ title, lastUpdated, intro, sections }: LegalLayoutProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '');

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: '-12% 0px -72% 0px', threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="relative overflow-x-hidden bg-bg-base font-body text-text-body">
      {/* page header */}
      <section className="relative overflow-hidden border-b border-hairline pb-[clamp(32px,4vw,48px)] pt-[clamp(48px,6vw,88px)]">
        <div className="pointer-events-none absolute inset-0 bg-glow-brand" />
        <div className="relative mx-auto flex max-w-container flex-col gap-[14px] px-[var(--gutter)]">
          <h1 className="m-0 font-display text-[clamp(2.4rem,5vw,4rem)] font-extrabold leading-[1.04] tracking-[-0.035em] text-text-strong">
            {title}
          </h1>
          <span className="font-mono text-[13px] tracking-[0.04em] text-text-muted">
            Last updated {lastUpdated}
          </span>
        </div>
      </section>

      {/* body */}
      <section className="mx-auto max-w-[1080px] px-[var(--gutter)] pb-[clamp(72px,9vw,130px)] pt-[clamp(40px,5vw,72px)]">
        <div className="legal-grid">
          <aside className="legal-index">
            <span className="mb-4 block font-mono text-[11px] uppercase tracking-[0.12em] text-text-faint">
              On this page
            </span>
            <nav className="flex flex-col gap-3">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`text-[14.5px] leading-[1.35] transition-colors ${
                    activeId === s.id ? 'text-brand' : 'text-text-muted hover:text-text-strong'
                  }`}
                >
                  {s.heading}
                </a>
              ))}
            </nav>
          </aside>

          <div className="legal-prose">
            {intro && <p className="legal-lead">{intro}</p>}
            {sections.map((s) => (
              <section key={s.id} id={s.id}>
                <h2>{s.heading}</h2>
                {s.body}
              </section>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
