'use client';

import { useEffect, useState } from 'react';

export function ReadingProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[300] h-[3px] bg-transparent">
      <div
        className="h-full bg-brand transition-[width] duration-75 ease-linear"
        style={{ width: `${pct}%`, boxShadow: '0 0 12px var(--brand-40)' }}
      />
    </div>
  );
}
