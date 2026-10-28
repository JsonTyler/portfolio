import type { Metadata } from 'next';
import { AboutStory } from '@/components/AboutStory';
import styles from './page.module.css';
export const metadata: Metadata = { title: 'About', description: 'Meet Jason: senior frontend engineer, UX designer, and team lead.', alternates: { canonical: '/about' } };
export default function AboutPage() {
  return <div className={styles.page}><section className={`container-max ${styles.about}`}>
    <div className={styles.introduction}>
      <p className="eyebrow">About</p><h1>An engineer with a designer’s eye.</h1>
      <p>I’m a senior frontend engineer, UX designer, and team lead with eight years of professional experience.</p>
      <p>Computers first caught my attention because I wanted to understand how they worked. Coding clicked in college. Today, that curiosity shapes how I build interfaces and care for the details.</p>
    </div>
    <AboutStory />
  </section></div>;
}
