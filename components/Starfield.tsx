'use client';

import { useState, type CSSProperties } from 'react';
import { MotionControl } from './MotionControl';

// A few glints sit in open parts of the sky; most stars remain stationary.
const glintPositions = [[90, 120], [330, 165], [620, 115], [860, 285], [145, 320], [515, 300], [960, 440], [60, 560], [900, 650], [330, 730]];
const stars = Array.from({ length: 130 }, (_, index) => {
  const [x, y] = index % 13 === 0
    ? glintPositions[index / 13]
    : [(index * 73.37 + index * index * 3.19 + 17) % 1000, (index * 41.71 + index * index * 7.13 + 7) % 800];
  return { x, y, opacity: 0.3 + (index % 5) * 0.1 };
});

export function Starfield() {
  const [paused, setPaused] = useState(false);

  return (
    <>
      <div className="night-sky" data-paused={paused} aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        <svg viewBox="0 0 1000 800" preserveAspectRatio="none" width="100%" height="100%">
          <g fill="#c7d8f3" stroke="#c7d8f3">
            {stars.map((star, index) => (
              <g key={index} className={index % 13 === 0 ? 'twinkle-star' : undefined} opacity={star.opacity} style={{ '--star-opacity': star.opacity, animationDelay: `${-7 - index * 0.73}s`, animationDuration: `${12 + index % 7}s` } as CSSProperties}>
                <circle cx={star.x} cy={star.y} r={index % 13 === 0 ? 0.35 : 0.2} strokeWidth={index % 13 === 0 ? 1.2 : index % 5 === 0 ? 1 : 0.6} vectorEffect="non-scaling-stroke" />
                {index % 13 === 0 && <path className="twinkle-glint" d={`M${star.x - 3} ${star.y}h6M${star.x} ${star.y - 3}v6`} fill="none" stroke="#f2f7ff" strokeWidth="0.8" strokeLinecap="round" vectorEffect="non-scaling-stroke" />}
              </g>
            ))}
          </g>
        </svg>
        <span className="shooting-star shooting-star-near" />
        <span className="shooting-star shooting-star-far" />
        <div className="moon" />
        <svg className="cloud cloud-near" viewBox="0 0 1200 240" preserveAspectRatio="none">
          <path d="M-100 160C0 95 70 145 160 110S280 55 370 105S510 150 600 110S740 55 830 100S1010 145 1120 85L1300 110V220C1140 180 1040 220 920 185S710 175 600 195S410 165 300 195S70 195-100 220Z" />
        </svg>
        <svg className="cloud cloud-far" viewBox="0 0 1200 240" preserveAspectRatio="none">
          <path d="M-100 110C40 155 90 60 230 95S390 155 500 100S650 75 760 125S980 85 1100 110L1300 70V200C1140 170 1040 230 900 190S690 210 550 180S320 215 180 180S0 205-100 185Z" />
        </svg>
      </div>
      <MotionControl paused={paused} subject="night sky" onToggle={() => setPaused((value) => !value)} />
      <style jsx>{`
        .night-sky { background: #030611; }
        .moon { position: absolute; top: 78px; right: 36px; width: 88px; height: 88px; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #fff 0%, #dbeafe 35%, rgba(96, 165, 250, .45) 70%, transparent 84%); box-shadow: 0 0 18px rgba(147, 197, 253, .55), 0 0 42px rgba(96, 165, 250, .28); }
        .cloud { position: absolute; width: 150%; height: clamp(160px, 32vh, 340px); left: -25%; pointer-events: none; filter: blur(14px); }
        .cloud-near { top: 7%; fill: #8d9fbc; opacity: .26; }
        .cloud-far { bottom: 4%; fill: #7184a5; opacity: .22; }
        .twinkle-glint { opacity: 0; }
        .shooting-star { position: absolute; width: 90px; height: 1.5px; opacity: 0; background: linear-gradient(90deg, transparent, #a3bcdf 65%, #f2f7ff); border-radius: 50%; }
        .shooting-star-near { top: 10%; left: 12%; }
        .shooting-star-far { top: 24%; left: 40%; }
        @media (prefers-reduced-motion: no-preference) {
          .twinkle-star { animation-name: star-twinkle; animation-timing-function: ease-in-out; animation-iteration-count: infinite; }
          .twinkle-glint { animation-name: star-glint; animation-duration: inherit; animation-delay: inherit; animation-timing-function: ease-in-out; animation-iteration-count: infinite; }
          .shooting-star-near { animation: star-shoot 29s linear -24s infinite; }
          .shooting-star-far { animation: star-shoot 43s linear -17s infinite; }
          .cloud-near { animation: cloud-drift 38s ease-in-out infinite alternate; }
          .cloud-far { animation: cloud-drift 55s ease-in-out -20s infinite alternate-reverse; }
          .night-sky[data-paused="true"] .cloud,
          .night-sky[data-paused="true"] .twinkle-star,
          .night-sky[data-paused="true"] .twinkle-glint,
          .night-sky[data-paused="true"] .shooting-star { animation-play-state: paused; }
        }
        @keyframes star-twinkle { 0%, 62%, 84%, 100% { opacity: var(--star-opacity); } 73% { opacity: 1; } }
        @keyframes star-glint { 0%, 65%, 82%, 100% { opacity: 0; } 73% { opacity: .9; } }
        @keyframes star-shoot {
          0%, 88% { opacity: 0; transform: translate3d(-120px, -75px, 0) rotate(32deg); }
          90% { opacity: .9; }
          94%, 100% { opacity: 0; transform: translate3d(420px, 260px, 0) rotate(32deg); }
        }
        @keyframes cloud-drift { from { transform: translate3d(-8%, 0, 0); } to { transform: translate3d(12%, -4%, 0); } }
        @media print { .night-sky { display: none !important; } }
      `}</style>
    </>
  );
}
