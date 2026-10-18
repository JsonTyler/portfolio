import styles from './DemoPrompt.module.css';
export function DemoPrompt({ instruction }: { instruction: string }) {
  return <div className={styles.prompt}>
    <svg aria-hidden="true" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="m5 3 4 16 3-6 6-3L5 3Zm9 12 5 5M19 3v4m-2-2h4"/></svg>
    <div><strong>Try this demo</strong><span>{instruction}</span></div>
    <span className={styles.arrow} aria-hidden="true">↓</span>
  </div>;
}
