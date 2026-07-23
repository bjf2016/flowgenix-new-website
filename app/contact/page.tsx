'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Check, ChevronDown } from 'lucide-react';
import Cal, { getCalApi } from '@calcom/embed-react';
import Reveal from '@/components/Reveal';

// The unified intake workflow: logs the lead, spam-gates, and (for "call me now")
// triggers the Retell outbound call itself.
const LEAD_WEBHOOK_URL = 'https://n8n.flowgenixai.com/webhook/fgx-intake';

const CAL_LINK_PATH = 'b.foroodian/30min';

const BUSINESS_TYPES = [
  'Home & field services',
  'Professional services',
  'Health & wellness',
  'Real estate & property',
  'Busy owner / operator',
  'Other',
];

const EXPECT = [
  'Call me now, or pick a time. Your choice.',
  '30 minutes on Zoom or phone, whatever suits you.',
  '1 to 3 specific automations you could turn on first.',
  "Honest answers, and if we're not a fit, we'll say so.",
];

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  website: string;
  businessType: string;
  needs: string;
  contactPreference: string; // 'call_now' | 'book_time'
  company_code: string; // honeypot
};

const initialState: FormState = {
  fullName: '',
  email: '',
  phone: '',
  businessName: '',
  website: '',
  businessType: BUSINESS_TYPES[0],
  needs: '',
  contactPreference: 'call_now',
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
  const [booked, setBooked] = useState<{
    name: string;
    email: string;
    phone: string;
    callingNow: boolean;
  } | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calBooked, setCalBooked] = useState(false);

  // Listen for a successful Cal.com booking and swap to our own confirmation.
  useEffect(() => {
    (async () => {
      const cal = await getCalApi();
      cal('on', {
        action: 'bookingSuccessful',
        callback: () => {
          setCalBooked(true);
          setTimeout(() => {
            calendarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        },
      });
    })();
  }, []);

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
    if (formData.contactPreference === 'call_now') {
      if (!formData.phone.trim()) next.phone = 'Phone is required for an instant call.';
      else if (formData.phone.replace(/\D/g, '').length < 10)
        next.phone = 'Enter a valid phone number.';
    }
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

    const callingNow = formData.contactPreference === 'call_now';
    const payload = {
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      business: formData.businessName,
      website: formData.website,
      businessType: formData.businessType,
      aiHelp: formData.needs,
      contactPreference: formData.contactPreference,
      company_url: formData.company_code, // honeypot passthrough for the n8n spam gate
    };

    try {
      // Log the lead to the intake workflow. For "call me now" the workflow itself
      // triggers the Retell outbound call, so no separate callback request is needed.
      const res = await fetch(LEAD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Non-2xx response');

      setBooked({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        callingNow,
      });
      // Self-serve path shows the calendar right away; callback path hides it
      // behind a "prefer to pick a time yourself?" link so it doesn't compete
      // with the incoming call.
      setShowCalendar(!callingNow);
      setStatus('success');
      if (!callingNow) {
        setTimeout(() => {
          calendarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
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
    setShowCalendar(false);
    setCalBooked(false);
  };

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
                  {booked?.callingNow ? "We're calling you now." : 'Request received.'}
                </h2>
                <p className="m-0 max-w-[42ch] text-[1.0625rem] leading-[1.6] text-text-muted">
                  {booked?.callingNow
                    ? `Our AI assistant is calling you at ${booked.phone} in about a minute to answer your questions and get you booked.`
                    : "You're all set. Pick a time below and it's booked, instantly, on our calendar. You'll get a confirmation right away."}
                </p>
                <div className="mt-1.5 flex flex-col items-center gap-2">
                  {booked?.callingNow && !showCalendar && (
                    <button
                      type="button"
                      onClick={() => {
                        setShowCalendar(true);
                        setTimeout(() => {
                          calendarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 100);
                      }}
                      className="font-body text-[15px] font-semibold text-brand transition-colors hover:text-brand-hover"
                    >
                      Prefer to pick a time yourself?
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={resetForm}
                    className="font-body text-[15px] font-semibold text-text-muted transition-colors hover:text-text-strong"
                  >
                    Send another request
                  </button>
                </div>
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
                  <span className={labelText}>
                    Phone{' '}
                    {formData.contactPreference === 'call_now' ? (
                      <span className="text-brand">*</span>
                    ) : (
                      <span className="font-normal text-text-faint">optional</span>
                    )}
                  </span>
                  <input
                    type="tel"
                    autoComplete="tel"
                    placeholder="(555) 123-4567"
                    className={fieldClass}
                    value={formData.phone}
                    onChange={(e) => setField('phone')(e.target.value)}
                    aria-invalid={Boolean(errors.phone)}
                  />
                  {errors.phone && (
                    <span className="text-[12px] text-[var(--danger)]">{errors.phone}</span>
                  )}
                </label>

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

                <div className="flex flex-col gap-[10px]">
                  <span className={labelText}>How would you like to connect?</span>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {(
                      [
                        {
                          key: 'call_now',
                          title: 'Call me now',
                          sub: 'Our AI assistant calls you in about a minute to answer questions and book you in.',
                        },
                        {
                          key: 'book_time',
                          title: 'Pick a time',
                          sub: 'Choose a slot from the calendar and we will meet then.',
                        },
                      ] as const
                    ).map((opt) => {
                      const active = formData.contactPreference === opt.key;
                      return (
                        <button
                          type="button"
                          key={opt.key}
                          onClick={() => setField('contactPreference')(opt.key)}
                          aria-pressed={active}
                          className={`flex flex-col gap-1 rounded-[12px] border p-[15px] text-left transition-colors ${
                            active
                              ? 'border-[var(--brand-40)] bg-[var(--brand-12)]'
                              : 'border-hairline-strong bg-bg-deep hover:border-hairline'
                          }`}
                        >
                          <span className="flex items-center gap-2 text-[15px] font-semibold text-text-strong">
                            <span
                              className={`flex h-[16px] w-[16px] flex-none items-center justify-center rounded-full border ${
                                active ? 'border-brand bg-brand' : 'border-hairline-strong'
                              }`}
                            >
                              {active && <Check size={10} className="text-[#06141D]" strokeWidth={3} />}
                            </span>
                            {opt.title}
                          </span>
                          <span className="text-[13px] leading-[1.45] text-text-muted">{opt.sub}</span>
                        </button>
                      );
                    })}
                  </div>
                  {formData.contactPreference === 'call_now' && (
                    <span className="text-[12px] leading-[1.45] text-text-faint">
                      By choosing this, you agree to receive an automated call from our AI assistant at
                      the number above.
                    </span>
                  )}
                </div>

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
                  {isSubmitting
                    ? 'Sending...'
                    : formData.contactPreference === 'call_now'
                      ? 'Call me now'
                      : 'Get my times'}
                </button>
              </form>
            )}
          </div>
          </Reveal>
        </div>
      </section>

      {/* choose a time (gated calendar) — hidden on the callback path until requested */}
      {(!isSuccess || showCalendar) && (
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
              Or pick a time.
            </h2>
          </Reveal>

          {calBooked ? (
            <div className="relative flex flex-col items-center gap-4 rounded-[var(--radius-xl)] border border-hairline bg-surface-card p-[clamp(32px,5vw,56px)] text-center shadow-fgx-md">
              <span className="flex h-[60px] w-[60px] items-center justify-center rounded-full border border-[var(--brand-40)] bg-[var(--brand-12)]">
                <Check size={26} className="text-brand" strokeWidth={3} />
              </span>
              <h3 className="m-0 font-display text-[clamp(1.5rem,2.4vw,2rem)] font-bold tracking-[-0.02em] text-text-strong">
                You&apos;re booked.
              </h3>
              <p className="m-0 max-w-[44ch] text-[1.0625rem] leading-[1.6] text-text-muted">
                Check your email for the calendar invite and your Jitsi video link. See you then.
              </p>
              <button
                type="button"
                onClick={resetForm}
                className="mt-1 inline-flex items-center justify-center rounded-[13px] border border-transparent bg-brand px-8 py-[14px] text-[16px] font-semibold text-[#06141D] transition-all duration-150 hover:bg-brand-hover hover:shadow-fgx-brand active:translate-y-px"
              >
                Done
              </button>
            </div>
          ) : isSuccess ? (
            <div className="h-[clamp(560px,80vh,760px)] overflow-hidden rounded-[var(--radius-xl)] border border-hairline bg-surface-card shadow-fgx-md">
              <Cal
                calLink={CAL_LINK_PATH}
                style={{ width: '100%', height: '100%', overflow: 'scroll' }}
                config={{ name: booked?.name ?? '', email: booked?.email ?? '' }}
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
      )}
    </div>
  );
}
