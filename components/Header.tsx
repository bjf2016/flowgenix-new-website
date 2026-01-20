'use client';

import Link from 'next/link';
import { Logo } from './Logo';
import { openChat } from '@/lib/handoff';



export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1F2528] bg-[#1F2528]">
      <div className="container mx-auto flex h-26 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center">
          <Logo variant="light" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-white hover:text-[#009CE3] transition-colors">
            Home
          </Link>
          <Link href="/services" className="text-sm font-medium text-white hover:text-[#009CE3] transition-colors">
            Solutions
          </Link>
          <Link href="/demo" className="text-sm font-medium text-white hover:text-[#009CE3] transition-colors">
            Demo
          </Link>
          <Link href="/blog" className="text-sm font-medium text-white hover:text-[#009CE3] transition-colors">
            Blog
          </Link>
          <Link href="/about" className="text-sm font-medium text-white hover:text-[#009CE3] transition-colors">
            About
          </Link>
        </nav>

        <Link
          href="/contact"
          className="rounded-full bg-[#009CE3] px-6 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-[#0088cc] transition-colors"
        >
          Book a strategy call
        </Link>


      </div>
    </header>
  );
}
