"use client";

import Link from "next/link";
import { openChat } from "@/lib/handoff";

interface SectionHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primaryCta?: { label: string; href?: string; onClick?: string | (() => void) };
  secondaryCta?: { label: string; href?: string; onClick?: string | (() => void) };
}

export default function SectionHero({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
}: SectionHeroProps) {
  const handleClick = (onClick?: string | (() => void)) => {
    if (typeof onClick === "function") {
      onClick();
    } else if (onClick === "openChat") {
      openChat();
    }
  };

  const renderButton = (
    cta: { label: string; href?: string; onClick?: string | (() => void) },
    isPrimary: boolean = true
  ) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8";
    const variantClasses = isPrimary
      ? "bg-primary text-primary-foreground hover:bg-primary/90"
      : "border border-input bg-background hover:bg-accent hover:text-accent-foreground";
    const className = `${baseClasses} ${variantClasses}`;

    if (cta.onClick) {
      return (
        <button onClick={() => handleClick(cta.onClick)} className={className}>
          {cta.label}
        </button>
      );
    }

    if (cta.href) {
      return (
        <Link href={cta.href} className={className}>
          {cta.label}
        </Link>
      );
    }

    return (
      <button className={className}>
        {cta.label}
      </button>
    );
  };

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl border shadow-sm p-8 md:p-12">
          {eyebrow && (
            <div className="text-sm font-medium tracking-wider uppercase text-[#009CE3] mb-4">
              {eyebrow}
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-neutral-600 mt-4 max-w-3xl">
              {subtitle}
            </p>
          )}
          {(primaryCta || secondaryCta) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {primaryCta && renderButton(primaryCta, true)}
              {secondaryCta && renderButton(secondaryCta, false)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
