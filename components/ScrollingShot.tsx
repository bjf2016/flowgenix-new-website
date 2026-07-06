'use client';

import { useEffect, useRef } from 'react';

/**
 * Interactive scrolling screenshot frame.
 * Shows a tall, full-length screenshot inside a fixed-height browser frame that
 * slowly auto-scrolls top-to-bottom and back. Hovering pauses the motion and lets
 * the visitor scroll the frame themselves. Respects prefers-reduced-motion.
 */
export default function ScrollingShot({
  src,
  alt,
  frameLabel = '',
  heightClass = 'h-[clamp(360px,56vw,600px)]',
}: {
  src: string;
  alt: string;
  frameLabel?: string;
  heightClass?: string;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const dir = useRef(1);

  useEffect(() => {
    const el = viewport.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    let last = performance.now();
    const speed = 24; // px per second

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!paused.current) {
        const max = el.scrollHeight - el.clientHeight;
        if (max > 4) {
          el.scrollTop += dir.current * speed * dt;
          if (el.scrollTop >= max) {
            el.scrollTop = max;
            dir.current = -1;
            paused.current = true;
            window.setTimeout(() => (paused.current = false), 1000);
          } else if (el.scrollTop <= 0) {
            el.scrollTop = 0;
            dir.current = 1;
            paused.current = true;
            window.setTimeout(() => (paused.current = false), 1000);
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <figure className="m-0 overflow-hidden rounded-[var(--radius-xl)] border border-hairline shadow-fgx-lg">
      {/* browser chrome */}
      <div className="flex items-center gap-2 border-b border-hairline bg-bg-deep px-4 py-3">
        <span className="h-[11px] w-[11px] rounded-full" style={{ background: '#E2553F' }} />
        <span className="h-[11px] w-[11px] rounded-full" style={{ background: '#E2A93F' }} />
        <span className="h-[11px] w-[11px] rounded-full" style={{ background: '#3FBF87' }} />
        {frameLabel && (
          <span className="ml-3 truncate font-mono text-[11px] text-text-faint">{frameLabel}</span>
        )}
        <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.12em] text-text-faint">
          hover to explore
        </span>
      </div>
      <div
        ref={viewport}
        className={`${heightClass} overflow-y-auto overscroll-contain bg-bg-deep`}
        onPointerEnter={() => (paused.current = true)}
        onPointerLeave={() => (paused.current = false)}
        onFocus={() => (paused.current = true)}
        onBlur={() => (paused.current = false)}
        tabIndex={0}
        aria-label={alt}
      >
        <img src={src} alt={alt} className="block w-full select-none" draggable={false} />
      </div>
    </figure>
  );
}
