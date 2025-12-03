'use client';

import Link from 'next/link';
import Image from 'next/image';
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
  const handleCtaClick = (onClick?: string | (() => void)) => {
    if (typeof onClick === "function") {
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

  return (
    <section className="relative isolate overflow-hidden bg-[#CDE4F3] text-gray-900">
      {/* Background video */}
    <video
      className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop={false}  // disable built-in loop
      playsInline
      aria-hidden="true"
      onEnded={(e) => {
        const video = e.currentTarget;
        setTimeout(() => {
          video.currentTime = 0;
          video.play();
        }, 2000); // pause for 2 seconds
      }}
    >
      <source src="/brand/flowgenixai-hero.webm" type="video/webm" />
      <source src="/brand/flowgenixai-hero.mp4" type="video/mp4" />
    </video>


      {/* Overlay to keep text readable */}
      <div
        className="absolute inset-0 bg-[#CDE4F3]/80"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto max-w-7xl px-6 pt-12 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1 max-w-xl">
            {eyebrow && (
              <p role="doc-subtitle" className="text-sm font-semibold tracking-wider uppercase text-[#009CE3] mb-4">
                {eyebrow}
              </p>
            )}

            <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-6 leading-tight">
              {renderTitle()}
            </h1>

            {subtitle && (
              <p className={`text-lg sm:text-xl mb-8 leading-relaxed ${dark ? 'text-neutral-300' : 'text-gray-600'}`}>
                {subtitle}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {primaryCta && (
                primaryCta.onClick ? (
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
                ) : null
              )}

              {secondaryCta && (
                secondaryCta.onClick ? (
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
                ) : null
              )}
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

          {/* Right column intentionally left empty to preserve layout spacing */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end items-end" />
        </div>
      </div>
    </section>
  );
}
