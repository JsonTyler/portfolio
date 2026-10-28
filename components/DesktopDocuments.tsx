import { experience } from '@/content/experience';
import styles from './PortfolioDesktop.module.css';

export function DesktopEnterprise() {
  return <section className={styles.summaryScreen}>
    <header><p className={styles.kicker}>Springbrook Software · 2022–present</p><h1>Enterprise UX & shared components.</h1><p>Team lead & UX designer for an ERP platform.</p></header>
    <dl className={styles.summaryFacts}>
      <div><dt>Shared components</dt><dd>Maintained the shared Design Library.</dd></div>
      <div><dt>Design & delivery</dt><dd>Documented standards and guided front-end delivery.</dd></div>
      <div><dt>Production example</dt><dd>Compact mode shipped; try the independent recreation.</dd></div>
    </dl>
    <nav className={styles.summaryActions} aria-label="Enterprise work links"><a href="#design-library/details">Read details →</a><a href="#cirrus">Try compact mode →</a><a href="https://sprbrk.design.com/" target="_blank" rel="noopener noreferrer">Design Library ↗</a></nav>
  </section>;
}

export function DesktopExperience() {
  return <section className={styles.summaryScreen}>
    <header><p className={styles.kicker}>Experience</p><h1>Experience at a glance.</h1></header>
    <ol className={styles.careerTimeline}>{experience.filter(item => item.id !== 'jsums-education').map(item => <li key={item.id}>
      <span className={styles.careerDates}>{item.period.start.slice(0, 4)}–{item.period.end === 'present' ? 'present' : item.period.end.slice(0, 4)}</span>
      <div><h2>{item.company}</h2><p>{item.id === 'springbrook-2022' ? 'Front-end lead · UX designer' : item.id === 'mli-2020' ? 'Front-end developer · UX designer' : item.id === 'jsums-2015' ? 'Undergraduate researcher' : item.title}</p><span className={styles.careerDetail}>{item.id === 'springbrook-2022' ? 'Component-library ownership and enterprise UX standards.' : item.id === 'mli-2020' ? 'Designed and built internal web applications.' : item.id === 'lockheed-2018' ? 'Flight subsystem simulation and internal automation.' : 'Timely · digital-forensics research published at IEEE SoutheastCon 2019.'}</span></div>
    </li>)}</ol>
    <nav className={styles.summaryActions} aria-label="Experience links"><a href="#design-library">Explore enterprise work →</a><a href="#experience/details">Full career history →</a></nav>
  </section>;
}

export function DesktopResume() {
  return <section className={styles.summaryScreen}>
    <header><p className={styles.kicker}>Résumé</p><h1>Jason Tyler Rodriguez</h1><p>Senior front-end engineer & UX lead</p></header>

    <ul className={styles.resumeHighlights}><li>Enterprise components & UX leadership.</li><li>Built AI-assisted PR review & workflow automation.</li><li>Aerospace software & published research.</li></ul>
    <div className={styles.resumeCredentials}><p><strong>Stack</strong> Blazor · C# · TypeScript · HTML / CSS · Python</p><p><strong>Education</strong> B.S. Computer Science · Jackson State · Honors</p></div>
    <nav className={styles.summaryActions} aria-label="Résumé links"><a className={styles.primaryAction} href="/resume/download" download="Jason-Tyler-Rodriguez-Resume.pdf">Download résumé · PDF ↓</a><a href="#resume/details">View full résumé →</a></nav>
  </section>;
}
