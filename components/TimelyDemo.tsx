'use client';
import { useState } from 'react';
import { sampleIntervals } from '@/lib/project-demos';
import { DemoPrompt } from './DemoPrompt';
import styles from './ProjectDemos.module.css';
export function TimelyDemo() {
  const [selected, setSelected] = useState(0);
  const item = sampleIntervals[selected];
  return <figure className={`project-visual ${styles.demo} ${styles.timely}`} aria-label="Interactive Timely sample timeline"><DemoPrompt instruction="Click a case bar below to reveal its dates and duration."/><div className={styles.surface}>
    <div className={styles.appBar}><strong>Timely</strong><span>Timeline</span><span className={styles.sample}>Sample records</span></div>
    <div className={styles.timelineBody}><div className={styles.timelineTitle}><h3>Time between events.</h3><p>Choose a case bar below to inspect its dates and duration.</p></div>
      <div className={styles.timelinePlot}><div className={styles.gridLines} aria-hidden="true">{[0, 1, 2, 3, 4, 5, 6].map(tick => <span key={tick} style={{ left: `${tick / 6 * 100}%` }}/>)}</div>
        {sampleIntervals.map((record, index) => <div className={styles.intervalRow} key={record.id}><button type="button" aria-pressed={selected === index} aria-label={`Inspect ${record.id}`} onClick={() => setSelected(index)} style={{ marginLeft: `${(record.start - 10) / 18 * 100}%`, width: `${(record.end - record.start) / 18 * 100}%` }}>{record.id}<span className={styles.inspectCue}>View details ↗</span></button></div>)}
        <div className={styles.axis} aria-hidden="true">{[10, 13, 16, 19, 22, 25, 28].map(day => <span key={day}>{day}</span>)}</div>
      </div><span className={styles.month}>APRIL 2026</span>
      <div className={styles.intervalDetail} aria-live="polite"><strong>{item.id}</strong><div className={styles.eventPair}><span><small>Removal</small><b>Apr {item.start}, 2026</b></span><span className={styles.duration}>{item.end - item.start}<small>elapsed days</small></span><span><small>Return</small><b>Apr {item.end}, 2026</b></span></div></div>
    </div></div><figcaption>Select a case interval to reveal its start, end, and elapsed time.<span>Interactive concept · synthetic records</span></figcaption></figure>;
}
