'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-[60] transition-[background,border-color] duration-300"
      style={{
        background: scrolled ? 'rgba(16,23,29,0.72)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'var(--hairline)' : 'transparent'}`,
      }}
    >
      <div className="mx-auto flex max-w-container items-center justify-between px-[var(--gutter)] py-4">
        <Link href="/" aria-label="FlowGenixAI home" className="flex items-center">
          <Image
            src="/brand/fgx-logo.png"
            alt="FlowGenixAI"
            width={200}
            height={50}
            priority
            className="h-11 w-auto md:h-[52px]"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-[34px] md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[15px] font-medium text-text-muted transition-colors duration-150 hover:text-text-strong"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="inline-flex items-center rounded-[10px] bg-brand px-[18px] py-[10px] text-[14px] font-semibold text-[#06141D] transition-colors duration-150 hover:bg-brand-hover"
          >
            Book a call
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-md p-2 text-text-strong md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden"
          style={{
            background: 'rgba(16,23,29,0.96)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            borderBottom: '1px solid var(--hairline)',
          }}
        >
          <nav className="mx-auto flex max-w-container flex-col gap-1 px-[var(--gutter)] py-4">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md py-3 text-[17px] font-medium text-text-body transition-colors hover:text-text-strong"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-[10px] bg-brand px-[18px] py-3 text-[15px] font-semibold text-[#06141D] transition-colors hover:bg-brand-hover"
            >
              Book a call
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
