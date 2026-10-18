'use client';

import { useEffect, useId, useRef, useState, type ComponentRef } from 'react';
import { MotionControl } from './MotionControl';

const routes = [
  'M40 0V145L125 230V420L45 500V800',
  'M0 300H75L155 380V600L230 675V800',
  'M1200 90H1090L1010 170V365L1130 485V800',
  'M1200 640H1080L960 520V300L875 215V0',
];

export function SignalField() {
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const svgRef = useRef<ComponentRef<'svg'>>(null);
  const routeId = useId().replace(/:/g, '');

  useEffect(() => {
    const preference = globalThis.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(preference.matches);
    sync();
    preference.addEventListener('change', sync);
    return () => preference.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    if (paused || reducedMotion) svg.pauseAnimations();
    else svg.unpauseAnimations();
  }, [paused, reducedMotion]);

  return (
    <>
      <div className="signal-field" data-paused={paused} aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div className="signal-grid" />
        <svg ref={svgRef} viewBox="0 0 1200 800" preserveAspectRatio="none" width="100%" height="100%">
          {routes.map((d, index) => <path key={d} id={`${routeId}-${index}`} className="signal-route" d={d} />)}
          {!reducedMotion && routes.map((_, index) => (
            <g key={index}>
              {[0, 1, 2].map((tail) => (
                <circle key={tail} className={tail === 0 ? 'signal-head' : 'signal-tail'} data-route={`${routeId}-${index}`} r={3 - tail * 0.7} fill={tail === 0 ? '#e4f7c2' : '#a5dfdb'} opacity={1 - tail * 0.3}>
                  <animateMotion dur="12s" begin={`${-index * 2.7 + tail * 0.12}s`} repeatCount="indefinite">
                    <mpath href={`#${routeId}-${index}`} />
                  </animateMotion>
                </circle>
              ))}
            </g>
          ))}
          <g className="signal-nodes">
            <circle cx="125" cy="230" r="3" /><circle cx="155" cy="600" r="3" />
            <circle cx="1010" cy="365" r="3" /><circle cx="960" cy="300" r="3" />
          </g>
        </svg>
      </div>
      <MotionControl paused={paused} subject="signals" onToggle={() => setPaused((value) => !value)} />

    </>
  );
}
