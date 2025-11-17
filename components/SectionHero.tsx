"use client";

import Link from "next/link";
import { openChat } from "@/lib/handoff";
import { Button } from "@/components/ui/button";

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
    variant: "default" | "outline" = "default"
  ) => {
    if (cta.onClick) {
      return (
        <Button variant={variant} size="lg" onClick={() => handleClick(cta.onClick)}>
          {cta.label}
        </Button>
      );
    }

    if (cta.href) {
      return (
        <Button variant={variant} size="lg" asChild>
          <Link href={cta.href}>{cta.label}</Link>
        </Button>
      );
    }

    return (
      <Button variant={variant} size="lg">
        {cta.label}
      </Button>
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
              {primaryCta && renderButton(primaryCta, "default")}
              {secondaryCta && renderButton(secondaryCta, "outline")}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
