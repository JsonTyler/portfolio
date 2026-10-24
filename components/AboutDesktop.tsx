import { AboutStory } from './AboutStory';
import styles from './AboutDesktop.module.css';

export function AboutDesktop() {
  return <div className={styles.about}>
    <div className={styles.introduction}>
      <p className="eyebrow">About</p>
      <h1>An engineer with a designer’s eye.</h1>
      <p>I’m a frontend engineer, UX designer, and team lead with eight years of professional experience.</p>
      <p>Curiosity got me into computers. Today it shapes how I build interfaces and care for the details.</p>
    </div>
    <div className={styles.illustration}><AboutStory /></div>
  </div>;
}
