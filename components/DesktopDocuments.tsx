import styles from './PortfolioDesktop.module.css';

export function DesktopEnterprise() {
  return <section className={styles.summaryScreen}>
    <header><p className={styles.kicker}>Springbrook Software · 2022–present</p><h1>Enterprise UX & shared components.</h1><p>Team lead & UX designer for an ERP platform.</p></header>
    <dl className={styles.summaryFacts}>
      <div><dt>Shared components</dt><dd>Maintained the shared Design Library.</dd></div>
      <div><dt>Design & delivery</dt><dd>Documented standards and guided front-end delivery.</dd></div>
      <div><dt>Production example</dt><dd>Compact mode shipped; try the independent recreation.</dd></div>
    </dl>
    <nav className={styles.summaryActions} aria-label="Enterprise work links"><a href="#design-library/details">Read details →</a><a href="#cirrus">Try compact mode →</a><a href="https://design.sprbrk.com/" target="_blank" rel="noopener noreferrer">Design Library ↗</a></nav>
  </section>;
}
