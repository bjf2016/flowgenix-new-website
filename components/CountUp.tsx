'use client';
import { useEffect, useRef, useState } from 'react';
export default function CountUp({ to, decimals = 0, prefix = '', suffix = '', duration = 1400 }:
  { to: number; decimals?: number; prefix?: string; suffix?: string; duration?: number; }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setVal(to); return; }
    let raf = 0, started = false;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started) {
          started = true; const start = performance.now();
          const tick = (now: number) => { const p = Math.min((now - start) / duration, 1);
            setVal(to * (1 - Math.pow(1 - p, 3))); if (p < 1) raf = requestAnimationFrame(tick); };
          raf = requestAnimationFrame(tick); io.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    io.observe(el); return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, duration]);
  return <span ref={ref}>{prefix}{val.toFixed(decimals)}{suffix}</span>;
}
