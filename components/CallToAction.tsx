'use client';

import Link from 'next/link';
import { openChat } from '@/lib/handoff';

interface CallToActionProps {
  title: string;
  primary: {
    label: string;
    onClick: string;
  };
  secondary: {
    label: string;
    href: string;
  };
}

export function CallToAction({ title, primary, secondary }: CallToActionProps) {
  return (
    <section className="container mx-auto max-w-7xl px-6">
      <div className="rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-12 md:p-16 text-center shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />

        <div className="relative">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 max-w-3xl mx-auto">
            {title}
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
            <button
              onClick={openChat}
              className="rounded-full bg-[#009CE3] px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-[#0088cc] hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
            >
              {primary.label}
            </button>
            <Link
              href={secondary.href}
              className="rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-8 py-4 text-base font-semibold text-white hover:bg-white/20 transition-all duration-200 hover:-translate-y-1"
            >
              {secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
