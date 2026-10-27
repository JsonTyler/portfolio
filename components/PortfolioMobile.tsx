'use client';

import { useRef } from 'react';
import type { Project } from '@/lib/types';
import { ThemeSwitcher } from './ThemeSwitcher';
import styles from './PortfolioMobile.module.css';

type IconName = 'home' | 'work' | 'library' | 'experience' | 'resume' | 'about' | 'contact' | 'cirrus' | 'timely' | 'framed';
const paths: Record<IconName, string> = {
  home: 'm3 11 9-8 9 8M5 10v11h14V10M9 21v-7h6v7',
  work: 'M8 7V4h8v3M3 8h18v12H3V8Zm0 5 9 3 9-3M10 13h4',
  library: 'M3 3h7v7H3V3Zm11 0h7v7h-7V3ZM3 14h7v7H3v-7Zm11 0h7v7h-7v-7Z',
  experience: 'M5 4h14v17H5V4ZM9 2v4m6-4v4M9 10h6m-6 4h6m-6 4h4',
  resume: 'M5 2h9l5 5v15H5V2Zm9 0v6h5M8 12h8m-8 4h8m-8 3h5',
  about: 'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 22v-3a8 8 0 0 1 16 0v3',
  contact: 'M2 5h20v15H2V5Zm0 0 10 8L22 5',
  timely: 'M4 3v18m0-5h16M8 5v6m5-3v9m5-12v7M6 8h4m1 6h4m1-6h4',
  framed: 'M3 3h18v18H3V3Zm3 3h12v12H6V6Zm0 10 4-5 3 3 2-2 3 4',
  cirrus: 'M3 4h18v16H3V4Zm0 5h18M8 9v11m4-7h6m-6 4h6',
};
function Icon({ name }: { name: IconName }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}

export function MobileHeader({ title, backLabel, onBack }: { title: string; backLabel?: string; onBack: () => void }) {
  const appearance = useRef<globalThis.HTMLDialogElement>(null);
  return <>
    <div className={styles.header}>
      {backLabel ? <button type="button" className={styles.back} onClick={onBack}><span aria-hidden="true">‹</span>{backLabel}</button> : <span />}
      <span className={styles.title}>{title}</span>
      <button type="button" className={styles.appearanceButton} aria-label="Choose appearance" aria-haspopup="dialog" onClick={() => appearance.current?.showModal()}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2" /></svg></button>
    </div>
    <dialog ref={appearance} className={styles.appearanceDialog} aria-labelledby="mobile-appearance-title" onClick={event => {
      if (event.target !== event.currentTarget) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) appearance.current?.close();
    }}>
      <h2 id="mobile-appearance-title">Appearance</h2><p>Choose a wallpaper and control background motion.</p>
      <ThemeSwitcher previews />
      <div id="mobile-motion-control-slot" className={styles.motionSlot} />
      <button type="button" className={styles.done} onClick={() => appearance.current?.close()}>Done</button>
    </dialog>
  </>;
}

export function MobileHome({ onOpen, onWork }: { onOpen: (slug: string) => void; onWork: () => void }) {
  const apps: { slug: string; label: string; icon: IconName }[] = [
    { slug: 'work', label: 'Work', icon: 'work' },
    { slug: 'design-library', label: 'Enterprise UX', icon: 'library' },
    { slug: 'experience', label: 'Experience', icon: 'experience' },
    { slug: 'about', label: 'About me', icon: 'about' },
    { slug: 'datadustr-tools', label: 'Inbox & File Dustr', icon: 'contact' },
    { slug: 'cirrus', label: 'Cirrus', icon: 'cirrus' },
    { slug: 'timely', label: 'Timely', icon: 'timely' },
    { slug: 'framed', label: 'Framed', icon: 'framed' },
  ];
  return <section className={styles.home} aria-label="Portfolio home">
    <div className={styles.widgets}>
      <div className={styles.introduction}><p>Front-end & UX</p><h1>Jason<br />Rodriguez</h1><span className={styles.widgetMonogram} aria-hidden="true">JR</span></div>
      <button type="button" className={styles.featuredWidget} onClick={() => onOpen('design-library')}><span>Featured work</span><strong>Enterprise<br />interfaces.</strong><span>Springbrook Software</span><span className={styles.widgetLink}>Explore the work <b aria-hidden="true">↗</b></span></button>
    </div>
    <nav className={styles.apps} aria-label="Explore portfolio">{apps.map(app => <button type="button" key={app.slug} onClick={() => app.slug === 'work' ? onWork() : onOpen(app.slug)}><span className={styles.appIcon} data-icon={app.icon}><Icon name={app.icon} /></span><span>{app.label}</span></button>)}</nav>
    <p className={styles.homeNote}>Complex software, made easier to use.</p>
  </section>;
}

export function MobileWorkList({ projects, onOpen }: { projects: Project[]; onOpen: (slug: string) => void }) {
  return <section className={styles.workList} aria-label="Work and projects"><h1>Explore the work</h1><p>Professional experience and interactive projects.</p>
    <div className={styles.listGroup}><button type="button" onClick={() => onOpen('design-library')}><span className={styles.listIcon} data-icon="library"><Icon name="library" /></span><span><strong>Enterprise UX</strong><small>Springbrook · Shared components & workflows</small></span><span aria-hidden="true">›</span></button></div>
    <div className={styles.listGroup}>{projects.map(project => <button type="button" key={project.slug} onClick={() => onOpen(project.slug)}><span className={styles.listIcon} data-icon={project.slug === 'cirrus' ? 'cirrus' : 'work'}><Icon name={project.slug === 'cirrus' ? 'cirrus' : 'work'} /></span><span><strong>{project.slug === 'datadustr-tools' ? 'Inbox & File Dustr' : project.title}</strong><small>{project.comingSoon ? 'Coming soon' : project.slug === 'timely' ? 'Published research · IEEE' : project.collection === 'college' ? 'College project' : 'Interactive preview'}</small></span><span aria-hidden="true">›</span></button>)}</div>
  </section>;
}

export function MobileDock({ selected, workOpen, isProject, onOpen, onWork }: { selected: string; workOpen: boolean; isProject: boolean; onOpen: (slug: string) => void; onWork: () => void }) {
  const items: { slug: string; label: string; icon: IconName; active: boolean }[] = [
    { slug: 'overview', label: 'Home', icon: 'home', active: selected === 'overview' && !workOpen },
    { slug: 'work', label: 'Work', icon: 'work', active: workOpen || isProject || selected === 'design-library' },
    { slug: 'resume', label: 'Résumé', icon: 'resume', active: selected === 'resume' && !workOpen },
    { slug: 'contact', label: 'Contact', icon: 'contact', active: selected === 'contact' && !workOpen },
  ];
  return <nav className={styles.dock} aria-label="Main navigation">{items.map(item => <button key={item.slug} type="button" aria-current={item.active ? 'page' : undefined} onClick={() => item.slug === 'work' ? onWork() : onOpen(item.slug)}><span className={styles.dockIcon} data-icon={item.icon}><Icon name={item.icon} /></span><span>{item.label}</span></button>)}</nav>;
}
