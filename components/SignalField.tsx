'use client';

import { useEffect, useRef, useState, type ComponentRef } from 'react';
import { MotionControl } from './MotionControl';

const routes = [
  [[40, 0], [40, 145], [125, 230], [125, 420], [45, 500], [45, 800]],
  [[0, 300], [75, 300], [155, 380], [155, 600], [230, 675], [230, 800]],
  [[1200, 90], [1090, 90], [1010, 170], [1010, 365], [1130, 485], [1130, 800]],
  [[1200, 640], [1080, 640], [960, 520], [960, 300], [875, 215], [875, 0]],
];

export function SignalField() {
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [hidden, setHidden] = useState(false);
  const pulses = useRef<HTMLDivElement>(null);
  const circuit = useRef<ComponentRef<'svg'>>(null);
  const animations = useRef<ReturnType<HTMLDivElement['animate']>[]>([]);
  const shouldPause = useRef(true);

  useEffect(() => {
    const preference = globalThis.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(preference.matches);
    sync();
    preference.addEventListener('change', sync);
    return () => preference.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const syncVisibility = () => setHidden(globalThis.document.hidden);
    syncVisibility();
    globalThis.document.addEventListener('visibilitychange', syncVisibility);
    return () => globalThis.document.removeEventListener('visibilitychange', syncVisibility);
  }, []);

  useEffect(() => {
    shouldPause.current = paused || reducedMotion || hidden;
    for (const animation of animations.current) {
      if (shouldPause.current) animation.pause();
      else animation.play();
    }
  }, [paused, reducedMotion, hidden]);

  useEffect(() => {
    if (reducedMotion) return;
    // Animate small HTML lights with transforms. The static circuit drawing
    // doesn't need to be repainted for every frame of an SVG motion animation.
    const build = () => {
      const drawing = circuit.current?.getBoundingClientRect();
      const overlay = pulses.current?.getBoundingClientRect();
      if (!drawing || !overlay) return;
      const times = animations.current.map(animation => Number(animation.currentTime ?? 0));
      animations.current.forEach(animation => animation.cancel());
      animations.current = Array.from(pulses.current?.children ?? []).map((element, index) => {
        // Use the drawing's actual bounds: innerWidth includes the scrollbar,
        // which shifts the lights away from the SVG on longer project pages.
        const points = routes[index].map(([x, y]) => [
          drawing.left - overlay.left + x / 1200 * drawing.width,
          drawing.top - overlay.top + y / 800 * drawing.height,
        ]);
        let length = 0;
        const distances = points.map(([x, y], pointIndex) => {
          if (pointIndex) length += Math.hypot(x - points[pointIndex - 1][0], y - points[pointIndex - 1][1]);
          return length;
        });
        const animation = element.animate(points.map(([x, y], pointIndex) => ({
          transform: `translate3d(${x}px, ${y}px, 0)`, offset: distances[pointIndex] / length,
        })), { duration: 16000, iterations: Infinity, easing: 'linear' });
        animation.currentTime = times[index] ?? index * 3500;
        if (shouldPause.current) animation.pause();
        return animation;
      });
    };
    build();
    const observer = new globalThis.ResizeObserver(build);
    if (circuit.current) observer.observe(circuit.current);
    if (pulses.current) observer.observe(pulses.current);
    return () => {
      observer.disconnect();
      animations.current.forEach(animation => animation.cancel());
      animations.current = [];
    };
  }, [reducedMotion]);

  return (
    <>
      <div className="signal-field" data-paused={paused} aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div className="signal-grid" />
        <svg ref={circuit} viewBox="0 0 1200 800" preserveAspectRatio="none" width="100%" height="100%">
          {routes.map((points, index) => <path key={index} className="signal-route" d={points.map(([x, y], pointIndex) => `${pointIndex ? 'L' : 'M'}${x} ${y}`).join('')} />)}
          <g className="signal-nodes">
            <circle cx="125" cy="230" r="3" /><circle cx="155" cy="600" r="3" />
            <circle cx="1010" cy="365" r="3" /><circle cx="960" cy="300" r="3" />
          </g>
        </svg>
        {!reducedMotion && <div ref={pulses} className="signal-pulses">{routes.map((_, index) => <span key={index} className="signal-light" />)}</div>}
      </div>
      <MotionControl paused={paused} subject="signals" onToggle={() => setPaused(value => !value)} />
    </>
  );
}
