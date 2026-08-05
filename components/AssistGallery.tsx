'use client';

import { useCallback, useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Reveal from '@/components/Reveal';

type Shot = { src: string; alt: string; cap: string };

/**
 * Assist screenshot gallery. Swipeable carousel on phones, 3-up grid on larger
 * screens, with a tap-to-enlarge lightbox (Esc/arrow-key/backdrop to close).
 */
export default function AssistGallery({ shots }: { shots: Shot[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(
    () => setOpen((i) => (i === null ? i : (i + shots.length - 1) % shots.length)),
    [shots.length],
  );
  const next = useCallback(
    () => setOpen((i) => (i === null ? i : (i + 1) % shots.length)),
    [shots.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, prev, next]);

  const navBtn =
    'absolute top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-surface-card/90 text-text-strong transition-colors hover:border-hairline-strong hover:bg-surface-raised';

  return (
    <>
      <div className="-mx-[var(--gutter)] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-3 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0">
        {shots.map((shot, i) => (
          <Reveal key={shot.src} delay={i * 70} className="min-w-[70%] shrink-0 snap-start sm:min-w-0">
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Enlarge screenshot: ${shot.cap}`}
              className="group block w-full overflow-hidden rounded-[var(--radius-lg)] border border-hairline bg-bg-base text-left shadow-fgx-md transition-all duration-300 hover:-translate-y-[3px] hover:border-hairline-strong"
            >
              <img src={`/products/assist/${shot.src}.png`} alt={shot.alt} className="block h-auto w-full" />
              <span className="block px-3 py-[10px] text-center font-mono text-[12px] text-text-muted">
                {shot.cap}
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={shots[open].alt}
          onClick={close}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <button type="button" onClick={close} aria-label="Close" className={`${navBtn} right-4 top-4 translate-y-0`}>
            <X size={20} />
          </button>

          {shots.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous screenshot"
              className={`${navBtn} left-3 sm:left-6`}
            >
              <ChevronLeft size={22} />
            </button>
          )}

          <figure onClick={(e) => e.stopPropagation()} className="m-0 flex max-h-[92vh] flex-col items-center gap-3">
            <img
              src={`/products/assist/${shots[open].src}.png`}
              alt={shots[open].alt}
              className="max-h-[82vh] w-auto rounded-[var(--radius-lg)] border border-hairline shadow-fgx-lg"
            />
            <figcaption className="font-mono text-[13px] text-text-muted">{shots[open].cap}</figcaption>
          </figure>

          {shots.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next screenshot"
              className={`${navBtn} right-3 sm:right-6`}
            >
              <ChevronRight size={22} />
            </button>
          )}
        </div>
      )}
    </>
  );
}
