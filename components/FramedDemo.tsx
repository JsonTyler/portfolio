'use client';
import { useRef, useState } from 'react';
import { framePosition, wallDistances } from '@/lib/project-demos';
import { DemoPrompt } from './DemoPrompt';
import styles from './ProjectDemos.module.css';
export function FramedDemo() {
  const [position, setPosition] = useState({ x: 32, y: 10 });
  const wall = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: number; clientX: number; clientY: number; x: number; y: number } | null>(null);
  const distances = wallDistances(position.x, position.y);
  const px = position.x * 10, py = position.y * 10;
  const dimensionX = px > 580 ? px - 80 : px + 80;
  return <figure className={`project-visual ${styles.demo} ${styles.framed}`} aria-label="Interactive Framed wall planner">
    <DemoPrompt instruction="Drag the outlined frame. Watch all four measurements change."/>
    <div className={styles.surface}>
      <div className={styles.appBar}><strong>Framed</strong><span>Plan a gallery wall</span><button type="button" onClick={() => setPosition({ x: 32, y: 10 })}>Reset</button></div>
      <div className={styles.frameTools}><span>72 × 48 in wall</span><span>11 × 14 in selected frame</span></div>
      <div className={styles.wall} ref={wall}>
        <div className={`${styles.artFrame} ${styles.fixedFrame}`} style={{ left: '10%', top: '44%', width: '15.28%', height: '29.17%' }}><span/></div>
        <div className={`${styles.artFrame} ${styles.fixedFrame}`} style={{ left: '72%', top: '40%', width: '19.44%', height: '37.5%' }}><span/></div>
        <svg viewBox="0 0 720 480" className={styles.measurements} aria-hidden="true">
          <g stroke="#267176" strokeWidth="1.5" strokeDasharray="5 4"><path d={`M0 ${py}H720M${dimensionX} 0V480M${px} ${py}H${dimensionX}`}/></g>
          <g fill="#f7f3e9" stroke="#78918c"><rect x={Math.max(5, px / 2 - 25)} y={py - 13} width="50" height="26" rx="4"/><rect x={(px + 720) / 2 - 25} y={py - 13} width="50" height="26" rx="4"/><rect x={dimensionX - 25} y={Math.max(5, py / 2 - 13)} width="50" height="26" rx="4"/><rect x={dimensionX - 25} y={(py + 480) / 2 - 13} width="50" height="26" rx="4"/></g>
          <g fill="#174b50" fontSize="14" fontWeight="700" textAnchor="middle"><text x={Math.max(30, px / 2)} y={py + 5}>{distances.left}″</text><text x={(px + 720) / 2} y={py + 5}>{distances.right}″</text><text x={dimensionX} y={Math.max(23, py / 2 + 5)}>{distances.top}″</text><text x={dimensionX} y={(py + 480) / 2 + 5}>{distances.bottom}″</text></g>
        </svg>
        <button type="button" className={`${styles.artFrame} ${styles.movable}`} aria-label="Move selected frame with arrow keys; hold Shift for finer adjustment" style={{ left: `${(position.x - 5.5) / 72 * 100}%`, top: `${(position.y + .8) / 48 * 100}%`, width: '15.28%', height: '29.17%' }}
          onPointerDown={event => { event.currentTarget.focus(); event.currentTarget.setPointerCapture(event.pointerId); drag.current = { id: event.pointerId, clientX: event.clientX, clientY: event.clientY, ...position }; }}
          onPointerMove={event => { const start = drag.current, bounds = wall.current?.getBoundingClientRect(); if (!start || !bounds || start.id !== event.pointerId) return; setPosition(framePosition(start.x + (event.clientX - start.clientX) / bounds.width * 72, start.y + (event.clientY - start.clientY) / bounds.height * 48)); }}
          onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }} onLostPointerCapture={() => { drag.current = null; }}
          onKeyDown={event => { const delta = event.shiftKey ? .1 : .5; const move = { ArrowLeft: [-delta, 0], ArrowRight: [delta, 0], ArrowUp: [0, -delta], ArrowDown: [0, delta] }[event.key]; if (move) { event.preventDefault(); setPosition(framePosition(position.x + move[0], position.y + move[1])); } }}><span/><b className={styles.dragCue} aria-hidden="true">↔ Drag</b></button>
        <i className={styles.nail} style={{ left: `${position.x / 72 * 100}%`, top: `${position.y / 48 * 100}%` }} aria-hidden="true"/>
      </div>
      <dl className={styles.distanceGrid}>{Object.entries(distances).map(([side, value]) => <div key={side}><dt>{side}</dt><dd><output>{value}</output> <small>in</small></dd></div>)}</dl>
      <div className={styles.positionControls}><label>From left <input type="range" min="5.5" max="66.5" step="0.1" value={position.x} onChange={event => setPosition(framePosition(Number(event.target.value), position.y))}/></label><label>From top <input type="range" min="1" max="33.2" step="0.1" value={position.y} onChange={event => setPosition(framePosition(position.x, Number(event.target.value)))}/></label></div>
    </div><figcaption>Move the frame · drag, use the sliders, or focus it and use arrow keys.<span>Hanging-point distances · interactive concept</span></figcaption>
  </figure>;
}
