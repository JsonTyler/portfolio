import { experience } from '@/content/experience';
import styles from '@/app/experience/page.module.css';

export function ExperienceContent({ embedded = false }: { embedded?: boolean }) {
  return <div className={`${styles.page} ${embedded ? styles.embedded : ''}`}>
    <section className={embedded ? styles.heading : "gradient-bg hero-padding border-b"}>
      <div className="container-max">
        <h1 className="hero-title">Experience</h1>
        <p className="hero-subtitle">Professional front-end development, UX, and earlier software engineering work.</p>
      </div>
    </section>
    <section className={`container-max ${styles.experience}`} aria-label="Career history">
      <ol className={styles.list}>{experience.map(item => <li key={item.id} className={styles.entry}>
        <p className={styles.dates}><time dateTime={item.period.start}>{item.period.start.slice(0, 7)}</time><span> – </span>{item.period.end === 'present' ? 'Present' : <time dateTime={item.period.end}>{item.period.end.slice(0, 7)}</time>}</p>
        <article>
          <h2>{item.title}</h2>
          <p className={styles.company}>{item.company}</p>
          <p className={styles.description}>{item.description}</p>
          {item.id === 'springbrook-2022' && <p className={styles.description}><a className="focus-ring" href="https://design.sprbrk.com/" target="_blank" rel="noopener noreferrer">Explore the public Design Library playground <span aria-hidden="true">↗</span></a></p>}
          {item.highlights && item.highlights.length > 0 && <ul className={styles.highlights}>{item.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul>}
          {item.technologies && item.technologies.length > 0 && <p className={styles.stack}><span>Stack: </span>{item.technologies.join(' · ')}</p>}
        </article>
      </li>)}</ol>
    </section>
  </div>;
}
