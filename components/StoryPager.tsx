'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './StoryPager.module.css';

export function StoryPager({ children }: { children: ReactNode }) {
  const body = useRef<HTMLDivElement>(null);
  const chapters = useRef<HTMLElement[]>([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const story = body.current?.querySelector('.case-story');
    if (!story) return;
    chapters.current = Array.from(story.children).filter((element): element is HTMLElement => element instanceof globalThis.HTMLElement && !element.matches('#trailers, .inline-concept-demo'));
    Array.from(story.children).filter(element => element.matches('#trailers, .inline-concept-demo')).forEach(element => { (element as HTMLElement).hidden = true; });
    setCount(chapters.current.length);
    chapters.current.forEach((element, index) => { element.hidden = index !== 0; });
    return () => chapters.current.forEach(element => { element.hidden = false; });
  }, []);

  function turn(next: number) {
    chapters.current.forEach((element, index) => { element.hidden = index !== next; });
    setPage(next);
    body.current?.scrollTo({ top: 0 });
    body.current?.focus({ preventScroll: true });
  }

  return <div className={styles.pager}>
    <div className={styles.controls} role="group" aria-label="Story pages">
      <button type="button" disabled={page === 0} onClick={() => turn(page - 1)}>‹ Previous</button>
      <span aria-live="polite">{count ? `${page + 1} of ${count}` : 'Story'}</span>
      <button type="button" disabled={!count || page === count - 1} onClick={() => turn(page + 1)}>Next ›</button>
    </div>
    <div ref={body} className={styles.body} tabIndex={0} aria-label="Current story section" data-ready={count > 0}>{children}</div>
  </div>;
}
