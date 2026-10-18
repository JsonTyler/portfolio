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
      <style jsx global>{`
        @media screen {
        html:root[data-theme="hacker"] {
          color-scheme: dark;
          --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          --color-primary-dark: #edf0e8;
          --color-primary: #edf0e8;
          --color-text: #dce2db;
          --color-text-secondary: #a7b5b0;
          --color-background: #080d10;
          --color-accent: #ceeaa0;
          --color-accent-dark: #e4f7c2;
          --color-accent-light: #1c2c23;
          --color-code: #a5dfdb;
          --color-border: #354a46;
        }
        html:root[data-theme="hacker"] body { background: #080d10; color: #dce2db; }
        html:root[data-theme="hacker"] body::before { content: none; }
        html:root[data-theme="hacker"] .site-shell.bg-slate-50,
        html:root[data-theme="hacker"] .gradient-bg { background: transparent !important; }
        html:root[data-theme="hacker"] header,
        html:root[data-theme="hacker"] .bg-white,
        html:root[data-theme="hacker"] .bg-slate-50 { background-color: #0c1417 !important; }
        html:root[data-theme="hacker"] header { backdrop-filter: none !important; }
        html:root[data-theme="hacker"] .text-slate-900,
        html:root[data-theme="hacker"] h1,
        html:root[data-theme="hacker"] h2,
        html:root[data-theme="hacker"] h3,
        html:root[data-theme="hacker"] h4,
        html:root[data-theme="hacker"] h5 { color: #edf0e8 !important; }
        html:root[data-theme="hacker"] .text-slate-700,
        html:root[data-theme="hacker"] th,
        html:root[data-theme="hacker"] td { color: #dce2db !important; }
        html:root[data-theme="hacker"] .text-slate-500,
        html:root[data-theme="hacker"] .text-slate-600,
        html:root[data-theme="hacker"] .hero-subtitle { color: #a7b5b0 !important; }
        html:root[data-theme="hacker"] .text-slate-100,
        html:root[data-theme="hacker"] .text-slate-200 { color: #dce2db !important; }
        html:root[data-theme="hacker"] .text-amber-200,
        html:root[data-theme="hacker"] .text-amber-600,
        html:root[data-theme="hacker"] .text-amber-700,
        html:root[data-theme="hacker"] .text-amber-800 { color: #ceeaa0 !important; }
        html:root[data-theme="hacker"] .border,
        html:root[data-theme="hacker"] .border-slate-200,
        html:root[data-theme="hacker"] .border-slate-300,
        html:root[data-theme="hacker"] .border-slate-700,
        html:root[data-theme="hacker"] .project-preview,
        html:root[data-theme="hacker"] .project-note,
        html:root[data-theme="hacker"] .story-facts,
        html:root[data-theme="hacker"] .implementation-flow,
        html:root[data-theme="hacker"] .story-navigation { border-color: #354a46 !important; }
        html:root[data-theme="hacker"] .bg-amber-50,
        html:root[data-theme="hacker"] .bg-amber-100 { background-color: #1c2c23 !important; }
        html:root[data-theme="hacker"] .border-amber-200,
        html:root[data-theme="hacker"] .border-amber-600 { border-color: #66805d !important; }
        html:root[data-theme="hacker"] a { color: #dce2db; text-decoration-color: #86bab5; }
        html:root[data-theme="hacker"] a.resume-download,
        html:root[data-theme="hacker"] a.resume-download:hover,
        html:root[data-theme="hacker"] a.resume-download:visited,
        html:root[data-theme="hacker"] a.resume-download:focus-visible,
        html:root[data-theme="hacker"] a.resume-download:active { color: #101819 !important; background-color: #ceeaa0 !important; }
        html:root[data-theme="hacker"] a.resume-download:hover { background-color: #e1f1c6 !important; }
        html:root[data-theme="hacker"] a:hover,
        html:root[data-theme="hacker"] [class~="hover:text-amber-700"]:hover { color: #ceeaa0 !important; }
        html:root[data-theme="hacker"] .focus-ring,
        html:root[data-theme="hacker"] .focus-ring:focus-visible,
        html:root[data-theme="hacker"] .theme-toggle-btn:focus-visible { outline-color: #a5dfdb; text-decoration-color: #a5dfdb; }
        html:root[data-theme="hacker"] .theme-controls { background: #101d20; border-color: #354a46 !important; }
        html:root[data-theme="hacker"] .theme-toggle-btn { color: #a7b5b0; }
        html:root[data-theme="hacker"] .theme-toggle-btn[aria-pressed="true"] { background: #ceeaa0; color: #142017; border-color: #ceeaa0 !important; }
        html:root[data-theme="hacker"] nav [aria-current="page"] { text-decoration: underline; text-underline-offset: .45em; text-decoration-color: #ceeaa0; }
        html:root[data-theme="hacker"] .hero-title { font-weight: 600; letter-spacing: -.055em; text-shadow: none; }
        html:root[data-theme="hacker"] .eyebrow,
        html:root[data-theme="hacker"] .project-number,
        html:root[data-theme="hacker"] header nav { font-family: var(--font-mono); }
        html:root[data-theme="hacker"] .eyebrow { color: #a5dfdb; letter-spacing: .13em; }
        html:root[data-theme="hacker"] .intro-aside { border-left-color: #ceeaa0; }
        html:root[data-theme="hacker"] .project-number { color: #ceeaa0; }
        html:root[data-theme="hacker"] .project-note { border-left-style: dashed; }
        html:root[data-theme="hacker"] .story-link { color: #ceeaa0; }
        html:root[data-theme="hacker"] .story-link:hover { color: #a5dfdb !important; }
        }
        .signal-field { background: radial-gradient(ellipse at 95% 30%, #16302e 0%, transparent 50%), #080d10; }
        .signal-grid { position: absolute; inset: 0; background-image: radial-gradient(#658a7b 0.6px, transparent 0.6px); background-size: 28px 28px; opacity: .1; mask-image: linear-gradient(90deg, #000, transparent 30%, transparent 70%, #000); }
        .signal-field svg { position: absolute; inset: 0; }
        .signal-route { fill: none; vector-effect: non-scaling-stroke; stroke-width: 1; }
        .signal-route { stroke: #86bab5; opacity: .3; }
        .signal-nodes { fill: #080d10; stroke: #86bab5; stroke-width: 1; opacity: .5; }
        @media print { .signal-field { display: none !important; } }
      `}</style>
    </>
  );
}
