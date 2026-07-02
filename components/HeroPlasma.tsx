'use client';

import { useEffect, useState } from 'react';
import Plasma from './Plasma';

// Desktop-only, motion-safe wrapper for the WebGL Plasma background.
// Renders null on the server and on first client render, then decides on mount
// (no hydration mismatch). Hidden when the user prefers reduced motion or the
// viewport is narrower than 768px.
export default function HeroPlasma() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const wide = window.matchMedia('(min-width: 768px)');
    const update = () => setEnabled(!reduce.matches && wide.matches);
    update();
    reduce.addEventListener('change', update);
    wide.addEventListener('change', update);
    return () => {
      reduce.removeEventListener('change', update);
      wide.removeEventListener('change', update);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <Plasma
        color="#1AA0E2"
        speed={0.7}
        scale={1.4}
        opacity={0.45}
        direction="forward"
        mouseInteractive={false}
      />
    </div>
  );
}
