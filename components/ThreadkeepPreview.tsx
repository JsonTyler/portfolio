'use client';

import Image from 'next/image';
import { useState } from 'react';
import styles from './ThreadkeepPreview.module.css';

const screens = [
  { id: 'return-to-work', label: 'Return to work', alt: 'Threadkeep with a fictional checkout-accessibility project: saved stopping point, next move, open questions, and a Resume this work action.' },
  { id: 'active-session', label: 'Active session', alt: 'The same fictional Threadkeep project after resuming, with its active session, capture action, and wrap-up control.' },
];

export function ThreadkeepPreview({ priority = false }: { priority?: boolean }) {
  const [selected, setSelected] = useState(0);
  const screen = screens[selected];
  return <figure className={styles.preview} aria-label="Threadkeep application screenshots">
    <div className={styles.controls} role="group" aria-label="Threadkeep screenshot">
      {screens.map((item, index) => <button key={item.id} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}>{item.label}</button>)}
    </div>
    <Image src={`/projects/threadkeep/${screen.id}.png`} alt={screen.alt} width={1280} height={820} sizes="(min-width: 900px) 1000px, 100vw" priority={priority} unoptimized />
    <figcaption>Working application · fictional demo records · screenshot</figcaption>
  </figure>;
}
