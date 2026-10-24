'use client';

import { useState, type CSSProperties } from 'react';
import { MotionControl } from './MotionControl';

const flakes = Array.from({ length: 64 }, (_, index) => ({
  left: `${(index + .5) / 64 * 100}%`,
  '--snow-top': `${(index * 43 + 19) % 100}%`,
  width: index % 8 === 0 ? 14 : 3 + index % 3,
  height: index % 8 === 0 ? 14 : 3 + index % 3,
  opacity: index % 8 === 0 ? 0.7 : 0.4 + (index % 4) * 0.12,
  animationDuration: `${16 + index % 13}s`,
  animationDelay: `${-index * 3.7}s`,
}));

export function Snowfall() {
  const [paused, setPaused] = useState(false);

  return (
    <>
      <div className="snowfall" data-paused={paused} aria-hidden="true">
        {flakes.map((style, index) => (
          <span key={index} style={style as CSSProperties} data-crystal={index % 8 === 0}>
            {index % 8 === 0 && (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
                <path d="M12 2v20M3.34 7l17.32 10M3.34 17 20.66 7M9 4l3 3 3-3M9 20l3-3 3 3M4 10l4-1-1-4M20 14l-4 1 1 4M7 19l1-4-4-1M17 5l-1 4 4 1" />
              </svg>
            )}
          </span>
        ))}
      </div>
      <MotionControl paused={paused} subject="snow" onToggle={() => setPaused((value) => !value)} />
      <style jsx global>{`
        @media screen {
          html:root[data-theme="winter"] .project-preview,
          html:root[data-theme="winter"] .story-navigation { position: relative; }
          html:root[data-theme="winter"] .project-preview::before,
          html:root[data-theme="winter"] .story-navigation::before { content: ''; position: absolute; top: -1px; left: 0; width: min(10rem, 40%); height: 1px; pointer-events: none; background: linear-gradient(90deg, #d8edf8, #81b4cd 45%, transparent); }
        }
      `}</style>
    </>
  );
}
