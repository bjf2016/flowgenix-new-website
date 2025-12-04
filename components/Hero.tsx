'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { openChat } from '@/lib/handoff';

interface HeroProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  primaryCta?: { label: string; href?: string; onClick?: string | (() => void) };
  secondaryCta?: { label: string; href?: string; onClick?: string | (() => void) };
  badges?: Array<{ src: string; alt: string }>;
  portraitSrc?: string;
  trustLogos?: string[];
  dark?: boolean;
}

// Simple workflow definitions for the right-hand card
const WORKFLOWS = [
  {
    id: 'ai-receptionist',
    label: 'AI Receptionist & Call Capture',
    description:
      'Every inbound call is answered, qualified, and pushed into your calendar automatically.',
    steps: [
      'Caller phones your main business number',
      'AI receptionist greets, understands intent, and captures details',
      'Qualifier checks fit, urgency, and preferred time',
      'Appointment is booked & confirmation is sent to caller and team',
    ],
    outcome: 'New lead booked — zero missed calls.',
  },
  {
    id: 'lead-followup',
    label: 'Lead Follow-Up & Nurture Flows',
    description:
      'AI follows up with new and stale leads via SMS and email so your pipeline never goes cold.',
    steps: [
      'New lead hits your CRM or web form',
      'AI sends personalized follow-up within minutes',
      'Conversation continues over SMS/email based on responses',
      'Qualified leads are nudged to book directly into your calendar',
    ],
    outcome: 'More conversions from the same lead volume.',
  },
  {
    id: 'reminders-noshow',
    label: 'Reminders & No-Show Recovery',
    description:
      'Keep your schedule full with automated reminders and smart rescheduling flows.',
    steps: [
      'Upcoming appointments are detected automatically',
      'AI sends timely SMS/email reminders with confirmations',
      'If someone cancels or doesn’t respond, AI offers new slots',
      'Your calendar is refilled without manual back-and-forth',
    ],
    outcome: 'Fewer no-shows and recovered revenue.',
  },
];

export default function Hero({
  eyebrow,
  title,
  highlight,
  subtitle,
  primaryCta,
  secondaryCta,
  badges,
  portraitSrc = '/brand/ben v4.png',
  dark = false,
}: HeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const handleCtaClick = (onClick?: string | (() => void)) => {
    if (typeof onClick === 'function') {
      onClick();
    } else if (onClick === 'openChat') {
      openChat();
    }
  };

  const renderTitle = () => {
    if (!highlight) {
      return title;
    }

    const parts = title.split(highlight);
    return (
      <>
        {parts[0]}
        <span className="relative inline-block">
          <span className="text-[#009CE3]">{highlight}</span>
          <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#009CE3] opacity-30"></span>
        </span>
        {parts[1]}
      </>
    );
  };

  // Auto-rotate workflows every 8 seconds with a small fade transition
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % WORKFLOWS.length);
        setIsFading(false);
      }, 200); // fade duration
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const activeWorkflow = WORKFLOWS[activeIndex];

  return (
    <section className="relative isolate overflow-hidden bg-[#CDE4F3] text-gray-900">
      {/* Background video */}
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop={false} // manual looping so we can pause between loops
        playsInline
        aria-hidden="true"
        onLoadedMetadata={(e) => {
          e.currentTarget.playbackRate = 0.50; // slower playback
        }}
        onEnded={(e) => {
          const video = e.currentTarget;
          setTimeout(() => {
            video.currentTime = 0;
            void video.play();
          }, 6000); // 2-second pause between loops
        }}
      >
        <source src="/brand/Full_Flowgenixai_hero.webm" type="video/webm" />
        <source src="/brand/Full_Flowgenixai_hero.mp4" type="video/mp4" />
        {/* If video can't play, the solid bg color remains */}
      </video>

      {/* Overlay to keep text readable */}
      <div className="absolute inset-0 bg-[#CDE4F3]/80" aria-hidden="true" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6 pt-12 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT: text + CTAs (unchanged) */}
          <div className="order-2 lg:order-1 max-w-xl">
            {eyebrow && (
              <p
                role="doc-subtitle"
                className="text-sm font-semibold tracking-wider uppercase text-[#009CE3] mb-4"
              >
                {eyebrow}
              </p>
            )}

            <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-6 leading-tight">
              {renderTitle()}
            </h1>

            {subtitle && (
              <p
                className={`text-lg sm:text-xl mb-8 leading-relaxed ${
                  dark ? 'text-neutral-300' : 'text-gray-600'
                }`}
              >
                {subtitle}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {primaryCta &&
                (primaryCta.onClick ? (
                  <button
                    onClick={() => handleCtaClick(primaryCta.onClick)}
                    aria-label={primaryCta.label}
                    className="rounded-full bg-[#009CE3] px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-[#0088cc] hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                  >
                    {primaryCta.label}
                  </button>
                ) : primaryCta.href ? (
                  <Link
                    href={primaryCta.href}
                    className="rounded-full bg-[#009CE3] px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-[#0088cc] hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 text-center"
                  >
                    {primaryCta.label}
                  </Link>
                ) : null)}

              {secondaryCta &&
                (secondaryCta.onClick ? (
                  <button
                    onClick={() => handleCtaClick(secondaryCta.onClick)}
                    aria-label={secondaryCta.label}
                    className={`rounded-full px-8 py-4 text-base font-semibold transition-all duration-200 hover:-translate-y-0.5 ${
                      dark
                        ? 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20'
                        : 'bg-gray-100 border border-gray-300 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {secondaryCta.label}
                  </button>
                ) : secondaryCta.href ? (
                  <Link
                    href={secondaryCta.href}
                    className={`rounded-full px-8 py-4 text-base font-semibold transition-all duration-200 hover:-translate-y-0.5 text-center ${
                      dark
                        ? 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20'
                        : 'bg-gray-100 border border-gray-300 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {secondaryCta.label}
                  </Link>
                ) : null)}
            </div>

            {badges && badges.length > 0 && (
              <div className="flex flex-wrap gap-4 items-center">
                {badges.map((badge, index) => (
                  <Image
                    key={index}
                    src={badge.src}
                    alt={badge.alt}
                    width={60}
                    height={75}
                    className="h-16 w-auto opacity-80 hover:opacity-100 transition-opacity"
                  />
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: auto-rotating workflow card */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end items-end">
            <div
              className={
                'relative w-full max-w-md rounded-3xl border border-white/25 ' +
                'bg-white/5 bg-gradient-to-br from-white/40 via-white/10 to-white/0 ' +
                'shadow-xl shadow-slate-900/40 backdrop-blur-3xl transition-all duration-300 ' +
                (isFading ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0')
              }
            >
              {/* highlight / glare layer */}
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/70 via-white/10 to-transparent opacity-70"
                aria-hidden="true"
              />

              {/* actual content */}
              <div className="relative p-6">
                <p className="text-sm sm:text-base font-semibold uppercase tracking-wide text-[#009CE3]">
                  {activeWorkflow.label}
                </p>

                <p className="mt-2 text-sm text-gray-800">
                  {activeWorkflow.description}
                </p>

                <div className="mt-5 space-y-3">
                  {activeWorkflow.steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="mt-1 h-6 w-6 flex items-center justify-center rounded-full bg-[#009CE3]/10 ring-1 ring-[#009CE3]/40">
                        <span className="text-[11px] font-semibold text-[#009CE3]">
                          {index + 1}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-900">{step}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between rounded-2xl bg-white/75 px-4 py-2 text-xs text-gray-800">
                  <span className="font-semibold">Outcome:</span>
                  <span className="font-medium">{activeWorkflow.outcome}</span>
                </div>

                {/* dots / pills */}
                <div className="mt-4 flex justify-center gap-2">
                  {WORKFLOWS.map((wf, index) => (
                    <button
                      key={wf.id}
                      type="button"
                      aria-label={`Show workflow: ${wf.label}`}
                      onClick={() => {
                        setIsFading(true);
                        setTimeout(() => {
                          setActiveIndex(index);
                          setIsFading(false);
                        }, 150);
                      }}
                      className={`h-1.5 w-5 rounded-full transition ${
                        index === activeIndex
                          ? 'bg-[#009CE3]'
                          : 'bg-white/50 hover:bg-white/90'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div> {/* closes grid */}
      </div>   {/* closes container */}
    </section>
  );
}

