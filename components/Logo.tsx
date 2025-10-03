'use client';

import Image from 'next/image';

interface LogoProps {
  variant?: 'auto' | 'light' | 'dark';
  className?: string;
}

export function Logo({ variant = 'auto', className = '' }: LogoProps) {
  return (
    <Image
      src="/brand/flowgenix-ai-logo-sm.png"
      alt="FlowGenixAI logo"
      width={200}
      height={50}
      className={className}
      priority
    />
  );
}
