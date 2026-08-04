'use client';

import { useState } from 'react';
import { submitLead } from '@/lib/handoff';

type Props = {
  /** Tags the lead so you know which product they want (e.g. "assist-waitlist", "dash-demo"). */
  intent: string;
  /** Where the lead came from, for attribution. */
  source?: string;
  /** Button label. */
  cta?: string;
  /** Small reassurance line under the form. */
  note?: string;
};

export default function ProductLeadForm({
  intent,
  source = 'products-page',
  cta = 'Join the early-access list',
  note,
}: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setState('sending');
    const res = await submitLead({ name, email, intent, source });
    setState(res.ok ? 'done' : 'error');
  }

  if (state === 'done') {
    return (
      <div className="rounded-[var(--radius-lg)] border border-[var(--brand-40)] bg-[var(--brand-12)] p-6">
        <p className="m-0 font-display text-[1.25rem] font-bold text-text-strong">You&apos;re on the list.</p>
        <p className="m-0 mt-2 text-[1rem] leading-[1.55] text-text-muted">
          We&apos;ll be in touch. No spam, just one note when it&apos;s ready.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          aria-label="Your name"
          className="w-full rounded-[12px] border border-hairline bg-surface-card px-4 py-[14px] text-[1rem] text-text-strong placeholder:text-text-faint focus:border-[var(--brand-40)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-40)]"
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Work email"
          aria-label="Work email"
          className="w-full rounded-[12px] border border-hairline bg-surface-card px-4 py-[14px] text-[1rem] text-text-strong placeholder:text-text-faint focus:border-[var(--brand-40)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-40)]"
        />
      </div>
      <button
        type="submit"
        disabled={state === 'sending'}
        className="inline-flex items-center justify-center rounded-[14px] bg-brand px-[30px] py-[16px] text-[16px] font-semibold tracking-[-0.01em] text-[#06141D] transition-all duration-150 hover:bg-brand-hover hover:shadow-fgx-brand active:translate-y-px disabled:opacity-60"
      >
        {state === 'sending' ? 'Adding you…' : cta}
      </button>
      {state === 'error' && (
        <p className="m-0 text-[0.9rem] text-[var(--danger)]">
          Something went wrong. Please try again, or email info@flowgenixai.com.
        </p>
      )}
      {note && state !== 'error' && (
        <p className="m-0 font-mono text-[13px] text-text-faint">{note}</p>
      )}
    </form>
  );
}
