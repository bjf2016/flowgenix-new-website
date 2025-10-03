'use client';

import Link from 'next/link';
import { openChat } from '@/lib/handoff';

interface PromoBandProps {
  message?: string;
  primary?: { label: string; href?: string; onClick?: string };
  bgColor?: string;
  textColor?: string;
}

export default function PromoBand({
  message = "Get in touch to discuss your project.",
  primary = { label: "Talk to our AI", onClick: "openChat" },
  bgColor = "#FFD84D",
  textColor = "#000000"
}: PromoBandProps) {
  const handleClick = () => {
    if (primary?.onClick === 'openChat') {
      openChat();
    }
  };

  return (
    <section className="py-6" style={{ backgroundColor: bgColor, color: textColor }}>
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 lg:rounded-xl">
          <p className="text-base sm:text-lg font-semibold text-center sm:text-left">
            {message}
          </p>

          <div className="flex-shrink-0">
            {primary && (
              primary.onClick ? (
                <button
                  onClick={handleClick}
                  aria-label={primary.label}
                  className="rounded-full bg-black text-white px-6 py-3 text-sm font-semibold hover:bg-gray-900 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                >
                  {primary.label}
                </button>
              ) : primary.href ? (
                <Link
                  href={primary.href}
                  className="rounded-full bg-black text-white px-6 py-3 text-sm font-semibold hover:bg-gray-900 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 inline-block"
                >
                  {primary.label}
                </Link>
              ) : null
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
