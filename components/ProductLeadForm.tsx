'use client';

import { useState } from 'react';

/**
 * Posts directly to the FlowGenixAI n8n intake webhook (same pipeline the
 * contact form uses), which logs the lead to Google Sheets. No Supabase.
 */
const LEAD_WEBHOOK_URL = 'https://n8n.flowgenixai.com/webhook/fgx-intake';

type Props = {
  /** Human-readable tag written into the sheet's aiHelp column, e.g. "FGX Assist early access". */
  leadLabel: string;
  /** Machine tag for filtering, passed through as `intent`. */
  intent: string;
  /** Attribution, passed through as `source`. */
  source?: string;
  /** Button label. */
  cta?: string;
  /** Small reassurance line under the form. */
  note?: string;
  /** Override the webhook if these leads should land in a different workflow/sheet. */
  webhookUrl?: string;
};

export default function ProductLeadForm({
  leadLabel,
  intent,
  source = 'products-page',
  cta = 'Join the early-access list',
  note,
  webhookUrl = LEAD_WEBHOOK_URL,
}: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState(''); // honeypot, must stay empty
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (company.trim()) return; // bot filled the honeypot, silently stop
    if (!name.trim() || !email.trim()) return;
    setState('sending');

    // Match the contact form's payload so the existing n8n workflow maps it
    // into the same Google Sheet columns.
    const payload = {
      name,
      email,
      phone: '',
      business: '',
      website: '',
      businessType: '',
      aiHelp: leadLabel,
      contactPreference: 'email',
      source,
      intent,
      company_url: company, // honeypot passthrough for the n8n spam gate
    };

    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Non-2xx response');
      setState('done');
    } catch (err) {
      console.error('Failed to submit early-access lead', err);
      setState('error');
    }
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

      {/* Honeypot: hidden from people, bots fill it. Keep it non-focusable and off-screen. */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        name="company_url"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

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
