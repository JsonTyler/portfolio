import { AboutStory } from './AboutStory';
import styles from './PortfolioDesktop.module.css';

export function AboutDesktop() {
  return <section className={styles.aboutScreen}>
    <div className={styles.summaryScreen}>
      <header><p className={styles.kicker}>About</p><h1>An engineer with a designer’s eye.</h1></header>
      <p>I’m a front-end engineer, UX designer, and team lead with eight years of professional experience.</p>
      <p>Curiosity got me into computers. Today it shapes how I build interfaces and care for the details.</p>
      <nav className={styles.summaryActions} aria-label="About links"><a href="#about/details">More about me →</a><a href="#contact">Get in touch →</a></nav>
    </div>
    <div className={styles.aboutIllustration}><AboutStory /></div>
  </section>;
}
