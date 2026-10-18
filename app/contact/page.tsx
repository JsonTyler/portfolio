import type { Metadata } from 'next';
import { SITE_METADATA } from '@/lib/constants';
import styles from './page.module.css';
export const metadata: Metadata = { title: 'Contact', description: 'Get in touch with Jason Tyler Rodriguez.' };
export default function ContactPage() {
  return <section className={`container-max ${styles.contact}`}>
    <header className={styles.heading}><p className="eyebrow">Contact</p><h1>Get in touch.</h1><p>Open to full-time frontend engineering and technical leadership roles.</p></header>
    <div className={styles.links}>
      <a className="focus-ring" href={`mailto:${SITE_METADATA.email}`}><span>Email</span><strong>{SITE_METADATA.email}</strong><span aria-hidden="true">↗</span></a>
      <a className="focus-ring" href={SITE_METADATA.linkedin} target="_blank" rel="noopener noreferrer"><span>LinkedIn</span><strong>Connect with Jason</strong><span aria-hidden="true">↗</span><span className="sr-only"> (new tab)</span></a>
      <a className="focus-ring" href={SITE_METADATA.github} target="_blank" rel="noopener noreferrer"><span>GitHub</span><strong>JsonTyler</strong><span aria-hidden="true">↗</span><span className="sr-only"> (new tab)</span></a>
    </div>
  </section>;
}
