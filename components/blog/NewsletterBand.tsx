'use client';

import { useState } from 'react';

// Presentational newsletter band. No newsletter backend is wired yet, so on
// submit we open a pre-addressed email to the studio rather than fake a success.
// Swap this for a real provider (n8n / Mailchimp) when one is chosen.
export function NewsletterBand() {
  const [email, setEmail] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const to = 'info@flowgenixai.com';
    const subject = encodeURIComponent('Newsletter signup');
    const body = encodeURIComponent(`Please add me to the newsletter: ${email}`);
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="py-[clamp(72px,9vw,140px)]">
      <div className="mx-auto max-w-container px-[var(--gutter)]">
        <div
          className="relative overflow-hidden rounded-[var(--radius-xl)] border border-hairline-strong p-[clamp(32px,4.5vw,56px)] shadow-fgx-lg"
          style={{ background: 'linear-gradient(180deg,var(--surface-card),var(--bg-deep))' }}
        >
          <div className="pointer-events-none absolute inset-0 bg-glow-brand" />
          <div className="relative flex flex-wrap items-center justify-between gap-[clamp(24px,4vw,56px)]">
            <div className="flex max-w-[42ch] flex-col gap-[10px]">
              <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand">
                Newsletter
              </span>
              <h2 className="m-0 font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-extrabold leading-[1.1] tracking-[-0.025em] text-text-strong">
                Get the occasional, useful note.
              </h2>
            </div>
            <form
              onSubmit={onSubmit}
              className="flex min-w-[300px] max-w-[480px] flex-1 flex-wrap gap-[10px]"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                aria-label="Email address"
                className="min-w-[200px] flex-1 rounded-[12px] border border-hairline-strong bg-bg-deep px-4 py-[15px] font-body text-[15px] text-text-strong outline-none transition-[border-color,box-shadow] placeholder:text-text-faint focus:border-[var(--brand-40)] focus:shadow-[var(--focus-ring)]"
              />
              <button
                type="submit"
                className="whitespace-nowrap rounded-[12px] border border-transparent bg-brand px-[26px] py-[15px] font-body text-[16px] font-semibold text-[#06141D] transition-all hover:bg-brand-hover hover:shadow-fgx-brand"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
