'use client';

import { FormEvent, useRef, useState } from 'react';
import Link from 'next/link';
import { Check, ChevronDown } from 'lucide-react';
import Reveal from '@/components/Reveal';

// Reuse the existing strategy-call lead endpoint so submissions land where they
// do today. Prefer the env override (used by the old contact form); fall back to
// the hardcoded strategy-call webhook (used by the old strategy-call page).
const LEAD_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_N8N_STRATEGY_CALL_WEBHOOK_URL ||
  'https://n8n.flowgenixai.com/webhook/fgx-strategy-call';

const CAL_LINK = 'https://cal.com/b.foroodian/30-min-ai-strategy-call';

const BUSINESS_TYPES = [
  'Home & field services',
  'Professional services',
  'Health & wellness',
  'Real estate & property',
  'Busy owner / operator',
  'Other',
];

const EXPECT = [
  'Book instantly, no waiting on a callback.',
  '30 minutes on Zoom or phone, whatever suits you.',
  '1 to 3 specific automations you could turn on first.',
  "Honest answers, and if we're not a fit, we'll say so.",
];

type FormState = {
  fullName: string;
  email: string;
  businessName: string;
  website: string;
  businessType: string;
  needs: string;
  company_code: string; // honeypot
};

const initialState: FormState = {
  fullName: '',
  email: '',
  businessName: '',
  website: '',
  businessType: BUSINESS_TYPES[0],
  needs: '',
  company_code: '',
};

const fieldClass =
  'w-full rounded-[11px] border border-hairline-strong bg-bg-deep px-[15px] py-[13px] font-body text-[15px] text-text-strong outline-none transition-[border-color,box-shadow] placeholder:text-text-faint focus:border-[var(--brand-40)] focus:shadow-[var(--focus-ring)]';
const labelText = 'text-[13px] font-semibold text-text-muted';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactPage() {
  const [formData, setFormData] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [submitError, setSubmitError] = useState('');
  const [booked, setBooked] = useState<{ name: string; email: string } | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const isSubmitting = status === 'submitting';
  const isSuccess = status === 'success';

  const setField = (field: keyof FormState) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    if (submitError) setSubmitError('');
  };

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!formData.fullName.trim()) next.fullName = 'Full name is required.';
    if (!formData.email.trim()) next.email = 'Email is required.';
    else if (!emailRegex.test(formData.email.trim())) next.email = 'Enter a valid email address.';
    if (!formData.businessName.trim()) next.businessName = 'Business name is required.';
    if (!formData.needs.trim()) next.needs = 'Please tell us what you need help with.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Honeypot: bots fill this hidden field. Silently stop, never reveal the calendar.
    if (formData.company_code.trim()) return;

    if (!validate()) return;

    setSubmitError('');
    setStatus('submitting');

    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      businessName: formData.businessName,
      website: formData.website,
      businessType: formData.businessType,
      aiHelp: formData.needs,
      source: 'contact_form',
    };

    try {
      const res = await fetch(LEAD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Non-2xx response');

      setBooked({ name: formData.fullName, email: formData.email });
      setStatus('success');
      setTimeout(() => {
        calendarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (error) {
      console.error('Failed to submit contact form', error);
      setStatus('idle');
      setSubmitError('Something went wrong. Please try again or email info@flowgenixai.com.');
    }
  };

  const resetForm = () => {
    setFormData(initialState);
    setErrors({});
    setBooked(null);
    setStatus('idle');
    setSubmitError('');
  };

  const calSrc = booked
    ? `${CAL_LINK}?name=${encodeURIComponent(booked.name)}&email=${encodeURIComponent(booked.email)}`
    : '';

  return (
    <div className="relative overflow-x-hidden bg-bg-base font-body text-text-body">
      {/* page header */}
      <section className="relative overflow-hidden pb-[clamp(40px,5vw,56px)] pt-[clamp(56px,7vw,104px)]">
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
              Book a call
            </span>
            <h1 className="m-0 font-display text-[clamp(2.8rem,6vw,5rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-text-strong [text-wrap:balance]">
              Let&apos;s map where AI can carry the load.
            </h1>
            <p className="m-0 max-w-[62ch] text-[clamp(1.1rem,1.5vw,1.3rem)] leading-[1.6] text-text-body">
              A focused 30-minute call to find the highest-ROI automations in your business. No hard
              pitch, just practical next steps.
            </p>
          </Reveal>
        </div>
      </section>

      {/* two-column: what to expect + form */}
      <section className="mx-auto max-w-container px-[var(--gutter)] pb-[clamp(48px,6vw,72px)] pt-[clamp(8px,2vw,24px)]">
        <div className="grid items-start gap-[clamp(32px,5vw,72px)] lg:grid-cols-[0.85fr_1.15fr]">
          {/* LEFT */}
          <Reveal className="flex flex-col gap-[clamp(28px,3vw,40px)]">
            <div className="flex flex-col gap-[18px]">
              <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand">
                What to expect
              </span>
              <div className="flex flex-col gap-4">
                {EXPECT.map((item) => (
                  <div key={item} className="flex items-start gap-[13px]">
                    <span className="mt-0.5 flex h-[22px] w-[22px] flex-none items-center justify-center rounded-full border border-[var(--brand-40)] bg-[var(--brand-12)]">
                      <Check size={12} className="text-brand" strokeWidth={3} />
                    </span>
                    <span className="text-[1.0625rem] leading-[1.5] text-text-body">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-[18px] rounded-[var(--radius-xl)] border border-hairline bg-surface-card p-[clamp(24px,3vw,30px)] shadow-fgx-md">
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-faint">
                Reach us directly
              </span>
              <div className="flex flex-col gap-[14px]">
                <div className="flex flex-col gap-[3px]">
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-faint">
                    Email
                  </span>
                  <a
                    href="mailto:info@flowgenixai.com"
                    className="text-[1.05rem] font-semibold text-text-strong transition-colors hover:text-brand"
                  >
                    info@flowgenixai.com
                  </a>
                </div>
                <div className="flex flex-col gap-[3px]">
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-faint">
                    Phone
                  </span>
                  <a
                    href="tel:+19259663520"
                    className="text-[1.05rem] font-semibold text-text-strong transition-colors hover:text-brand"
                  >
                    (925) 966-3520
                  </a>
                </div>
                <div className="flex flex-col gap-[3px]">
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-faint">
                    Location
                  </span>
                  <span className="text-[1.05rem] font-semibold text-text-strong">Folsom, CA</span>
                  <span className="text-[14px] text-text-muted">
                    Serving Sacramento and nationwide.
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* RIGHT: form card */}
          <Reveal delay={120} className="block">
          <div
            id="book-form"
            className="relative overflow-hidden rounded-[var(--radius-xl)] border border-hairline-strong bg-surface-card p-[clamp(28px,3.5vw,44px)] shadow-fgx-lg"
          >
            <div className="pointer-events-none absolute inset-0 bg-glow-soft" />

            {isSuccess ? (
              <div className="relative flex flex-col items-center gap-4 py-[clamp(20px,4vw,48px)] text-center">
                <span className="flex h-[60px] w-[60px] items-center justify-center rounded-full border border-[var(--brand-40)] bg-[var(--brand-12)]">
                  <Check size={26} className="text-brand" strokeWidth={3} />
                </span>
                <h2 className="m-0 font-display text-[clamp(1.5rem,2.4vw,2rem)] font-bold tracking-[-0.02em] text-text-strong">
                  Request received.
                </h2>
                <p className="m-0 max-w-[38ch] text-[1.0625rem] leading-[1.6] text-text-muted">
                  You&apos;re all set. Pick a time below and it&apos;s booked, instantly, on our
                  calendar. You&apos;ll get a confirmation right away.
                </p>
                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-1.5 font-body text-[15px] font-semibold text-brand transition-colors hover:text-brand-hover"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="relative flex flex-col gap-5">
                <h2 className="m-0 font-display text-[clamp(1.5rem,2.4vw,1.95rem)] font-bold tracking-[-0.025em] text-text-strong">
                  Tell us about your business
                </h2>

                {/* honeypot */}
                <input
                  type="text"
                  name="company_code"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.company_code}
                  onChange={(e) => setField('company_code')(e.target.value)}
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-[7px]">
                    <span className={labelText}>
                      Full name <span className="text-brand">*</span>
                    </span>
                    <input
                      type="text"
                      autoComplete="name"
                      placeholder="Jane Smith"
                      className={fieldClass}
                      value={formData.fullName}
                      onChange={(e) => setField('fullName')(e.target.value)}
                      aria-invalid={Boolean(errors.fullName)}
                    />
                    {errors.fullName && (
                      <span className="text-[12px] text-[var(--danger)]">{errors.fullName}</span>
                    )}
                  </label>
                  <label className="flex flex-col gap-[7px]">
                    <span className={labelText}>
                      Email <span className="text-brand">*</span>
                    </span>
                    <input
                      type="email"
                      autoComplete="email"
                      placeholder="jane@company.com"
                      className={fieldClass}
                      value={formData.email}
                      onChange={(e) => setField('email')(e.target.value)}
                      aria-invalid={Boolean(errors.email)}
                    />
                    {errors.email && (
                      <span className="text-[12px] text-[var(--danger)]">{errors.email}</span>
                    )}
                  </label>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-[7px]">
                    <span className={labelText}>
                      Business name <span className="text-brand">*</span>
                    </span>
                    <input
                      type="text"
                      placeholder="Acme Services"
                      className={fieldClass}
                      value={formData.businessName}
                      onChange={(e) => setField('businessName')(e.target.value)}
                      aria-invalid={Boolean(errors.businessName)}
                    />
                    {errors.businessName && (
                      <span className="text-[12px] text-[var(--danger)]">{errors.businessName}</span>
                    )}
                  </label>
                  <label className="flex flex-col gap-[7px]">
                    <span className={labelText}>
                      Website <span className="font-normal text-text-faint">optional</span>
                    </span>
                    <input
                      type="url"
                      placeholder="acme.com"
                      className={fieldClass}
                      value={formData.website}
                      onChange={(e) => setField('website')(e.target.value)}
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-[7px]">
                  <span className={labelText}>Business type</span>
                  <div className="relative flex items-center">
                    <select
                      className={`${fieldClass} cursor-pointer appearance-none pr-10`}
                      value={formData.businessType}
                      onChange={(e) => setField('businessType')(e.target.value)}
                    >
                      {BUSINESS_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-[15px] text-text-muted"
                    />
                  </div>
                </label>

                <label className="flex flex-col gap-[7px]">
                  <span className={labelText}>
                    What are you hoping AI can help with? <span className="text-brand">*</span>
                  </span>
                  <textarea
                    rows={4}
                    placeholder="The repetitive work you wish ran itself, the calls you miss, the follow-ups that slip..."
                    className={`${fieldClass} resize-y leading-[1.55]`}
                    value={formData.needs}
                    onChange={(e) => setField('needs')(e.target.value)}
                    aria-invalid={Boolean(errors.needs)}
                  />
                  {errors.needs && (
                    <span className="text-[12px] text-[var(--danger)]">{errors.needs}</span>
                  )}
                </label>

                <div className="flex items-center gap-[9px]">
                  <span className="h-1.5 w-1.5 flex-none rounded-full bg-text-faint" />
                  <span className="text-[13px] text-text-muted">
                    We use this only to prepare for your call. No spam, ever.
                  </span>
                </div>

                {submitError && <p className="m-0 text-[13px] text-[var(--danger)]">{submitError}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-1 inline-flex items-center justify-center rounded-[13px] border border-transparent bg-brand px-[30px] py-4 text-[17px] font-semibold tracking-[-0.01em] text-[#06141D] transition-all duration-150 hover:bg-brand-hover hover:shadow-fgx-brand active:translate-y-px disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? 'Sending...' : 'Request my call'}
                </button>
              </form>
            )}
          </div>
          </Reveal>
        </div>
      </section>

      {/* choose a time (gated calendar) */}
      <section
        ref={calendarRef}
        className="mx-auto max-w-container px-[var(--gutter)] pb-[clamp(72px,9vw,140px)]"
      >
        <div className="flex flex-col gap-[18px]">
          <Reveal className="flex flex-col gap-2">
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand">
              Choose a time
            </span>
            <h2 className="m-0 font-display text-[clamp(1.7rem,3vw,2.4rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-text-strong">
              Then pick a time.
            </h2>
          </Reveal>

          {isSuccess && calSrc ? (
            <div className="overflow-hidden rounded-[var(--radius-xl)] border border-hairline bg-surface-card shadow-fgx-md">
              <iframe
                src={calSrc}
                title="Book a strategy call with FlowGenixAI"
                className="h-[clamp(560px,80vh,760px)] w-full border-0"
                allow="clipboard-write; fullscreen"
              />
            </div>
          ) : (
            <div
              className="relative flex min-h-[clamp(320px,38vw,440px)] items-center justify-center overflow-hidden rounded-[var(--radius-xl)] border border-dashed border-hairline-strong"
              style={{
                background:
                  'repeating-linear-gradient(135deg,rgba(255,255,255,0.03) 0 12px,transparent 12px 24px),var(--bg-deep)',
              }}
            >
              <div className="pointer-events-none absolute inset-0 bg-glow-soft" />
              <div className="relative flex flex-col items-center gap-3 p-8 text-center">
                <span className="flex h-[52px] w-[52px] items-center justify-center rounded-[14px] border border-hairline-strong bg-surface-card">
                  <span className="relative block h-5 w-[22px] rounded-[4px] border-2 border-brand">
                    <span className="absolute -top-[5px] left-[3px] h-[6px] w-[3px] rounded-[2px] bg-brand" />
                    <span className="absolute -top-[5px] right-[3px] h-[6px] w-[3px] rounded-[2px] bg-brand" />
                  </span>
                </span>
                <span className="font-display text-[1.25rem] font-bold tracking-[-0.02em] text-text-strong">
                  Pick a time that works
                </span>
                <span className="font-mono text-[13px] text-text-faint">
                  Once you submit the form above, available times will appear here.
                </span>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
