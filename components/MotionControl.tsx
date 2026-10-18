'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export function MotionControl({ paused, subject, onToggle }: { paused: boolean; subject: string; onToggle: () => void }) {
  const [slot, setSlot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setSlot(globalThis.document.getElementById('motion-control-slot'));
  }, []);

  return (
    <>
      {slot && createPortal(
        <button className="motion-control focus-ring" type="button" aria-pressed={paused} onClick={onToggle}>
          {paused ? 'Resume' : 'Pause'} {subject}
        </button>,
        slot,
      )}
      <style jsx global>{`
        .motion-control { display: inline-flex; align-items: center; justify-content: center; min-height: 44px; padding: .4rem .75rem; border: 1px solid var(--color-border); border-radius: .3rem; background: transparent; color: var(--color-text-secondary); font: inherit; font-size: .75rem; cursor: pointer; white-space: nowrap; }
        .motion-control:hover { background: rgba(148, 163, 184, .1); }
        @media (prefers-reduced-motion: reduce) { .motion-control { display: none; } }
        @media print { .motion-control { display: none !important; } }
      `}</style>
    </>
  );
}
