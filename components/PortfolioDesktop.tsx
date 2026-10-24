'use client';

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import Link from 'next/link';
import type { Project } from '@/lib/types';
import { ProjectVisual } from './ProjectVisual';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Footer } from './layout/Footer';
import { StoryPager } from './StoryPager';
import { TrailerPlayer } from './TrailerPlayer';
import styles from './PortfolioDesktop.module.css';

function Folder({ className = '' }: { className?: string }) {
  return <svg className={`${styles.folder} ${className}`} viewBox="0 0 48 40" fill="none" aria-hidden="true"><path d="M3 8a3 3 0 0 1 3-3h12l5 5h19a3 3 0 0 1 3 3v20a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8Z" fill="var(--folder-back)" stroke="var(--folder-edge)"/><path d="M3 16a3 3 0 0 1 3-3h36a3 3 0 0 1 3 3v17a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V16Z" fill="var(--folder-front)" stroke="var(--folder-edge)"/><path d="M6 15h36" stroke="#fff" strokeOpacity=".45"/></svg>;
}

const documents = [{ slug: 'experience', title: 'Experience' }, { slug: 'about', title: 'About me' }, { slug: 'resume', title: 'Résumé' }, { slug: 'contact', title: 'Contact' }];

export function PortfolioDesktop({ projects, pages, stories }: { projects: Project[]; pages: Record<string, ReactNode>; stories: Record<string, ReactNode> }) {
  const [selected, setSelected] = useState('overview');
  const [view, setView] = useState<'preview' | 'story' | 'films'>('preview');
  const [expanded, setExpanded] = useState(false);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const project = projects.find(item => item.slug === selected);
  const document = documents.find(item => item.slug === selected);
  const selectedProjects = projects.filter(item => item.collection !== 'college');
  const select = useCallback((slug: string, nextView: 'preview' | 'story' | 'films' = 'preview', history = true) => {
    setSelected(slug);
    setView(nextView);
    const index = slug === 'overview' ? 0 : projects.some(item => item.slug === slug) ? projects.findIndex(item => item.slug === slug) + 1 : projects.length + 1 + documents.findIndex(item => item.slug === slug);
    tabs.current[index]?.focus({ preventScroll: true });
    if (history) globalThis.history.pushState(null, '', `#${slug}${nextView === 'preview' ? '' : `/${nextView}`}`);
  }, [projects]);

  useEffect(() => {
    const sync = () => {
      const [slug, mode] = globalThis.location.hash.slice(1).split('/');
      if (slug === 'overview' || projects.some(item => item.slug === slug) || documents.some(item => item.slug === slug)) {
        select(slug, mode === 'story' || mode === 'films' ? mode : 'preview', false);
      } else if (!slug) select('overview', 'preview', false);
    };
    const navigate = (event: globalThis.MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as HTMLElement).closest('a');
      if (!anchor || anchor.hasAttribute('download') || (anchor.target && anchor.target !== '_self')) return;
      const url = new globalThis.URL(anchor.href);
      if (url.origin !== globalThis.location.origin) return;
      const path = url.pathname.replace(/\/$/, '') || '/';
      const slug = path === '/' || path === '/projects' ? 'overview' : path.startsWith('/projects/') ? path.slice(10) : path.slice(1);
      if (slug !== 'overview' && !projects.some(item => item.slug === slug) && !documents.some(item => item.slug === slug)) return;
      // Leave in-document anchors and file downloads to the browser.
      if (path === '/' && url.hash && !documents.some(item => `#${item.slug}` === url.hash) && !projects.some(item => `#${item.slug}` === url.hash)) return;
      event.preventDefault();
      select(slug, url.hash === '#trailers' ? 'films' : 'preview');
    };
    sync();
    globalThis.addEventListener('popstate', sync);
    globalThis.addEventListener('hashchange', sync);
    globalThis.document.addEventListener('click', navigate, true);
    return () => {
      globalThis.removeEventListener('popstate', sync);
      globalThis.removeEventListener('hashchange', sync);
      globalThis.document.removeEventListener('click', navigate, true);
    };
  }, [projects, select]);

  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const count = projects.length + documents.length + 1;
    const next = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? (index + 1) % count
      : event.key === 'ArrowUp' || event.key === 'ArrowLeft' ? (index + count - 1) % count
      : event.key === 'Home' ? 0 : event.key === 'End' ? count - 1 : null;
    if (next === null) return;
    event.preventDefault();
    select(next === 0 ? 'overview' : next <= projects.length ? projects[next - 1].slug : documents[next - projects.length - 1].slug);
    tabs.current[next]?.focus();
  };
  const tab = (slug: string, label: string, index: number) => <button
    type="button" role="tab" id={`desktop-tab-${slug}`} aria-selected={selected === slug}
    aria-controls="desktop-panel" tabIndex={selected === slug ? 0 : -1}
    ref={element => { tabs.current[index] = element; }}
    className={styles.sidebarItem} onClick={() => select(slug)} onKeyDown={event => onTabKey(event, index)}
  >{slug === 'overview' ? <span className={styles.homeIcon} aria-hidden="true">⌂</span> : <Folder />}<span>{label}</span>{slug === 'timely' && <small aria-hidden="true" className={styles.researchBadge}>IEEE</small>}</button>;

  return <div data-portfolio-desktop className={`${styles.desktop} ${expanded ? styles.expanded : ''}`}>
    <section className={styles.window} aria-label="Portfolio workspace">
      <div className={styles.titlebar}>
        <div className={styles.windowControls}><span className={styles.close} aria-hidden="true"/><span className={styles.minimize} aria-hidden="true"/><button type="button" className={styles.resize} onClick={() => setExpanded(value => !value)} aria-label={expanded ? 'Restore window size' : 'Enlarge workspace'} aria-pressed={expanded}><span aria-hidden="true">{expanded ? '−' : '+'}</span></button></div>
        <span className={styles.windowTitle}><Folder />Jason Tyler Rodriguez</span>
        <div className={styles.windowTheme}><ThemeSwitcher /></div>
      </div>
      <div className={styles.toolbar}>
        <button type="button" className={styles.back} onClick={() => select('overview')} disabled={selected === 'overview'} aria-label="Back to overview">‹</button>
        <div className={styles.breadcrumb}><span>Portfolio</span><span aria-hidden="true">›</span><strong>{project?.title ?? document?.title ?? 'Overview'}</strong></div>
        {project?.slug === 'datadustr-tools' && <a className={styles.fullDemoLink} href="https://tools.datadustr.com/" target="_blank" rel="noopener noreferrer">Open full demo <span aria-hidden="true">↗</span></a>}
        {project && !project.comingSoon ? <div className={styles.viewControls} role="group" aria-label="Project view">
          <button type="button" aria-pressed={view === 'preview'} onClick={() => select(selected)}>Preview</button>
          {project.slug === 'datadustr-tools' && <button type="button" aria-pressed={view === 'films'} onClick={() => select(selected, 'films')}>Films</button>}
          <button type="button" aria-pressed={view === 'story'} onClick={() => select(selected, 'story')}>Story</button>
        </div> : <span className={styles.toolbarLink}>{document ? 'Document' : 'Personal workspace'}</span>}
      </div>
      <div className={styles.workspace}>
        <aside className={styles.sidebar}>
          <div role="tablist" aria-label="Portfolio views" aria-orientation="vertical" className={styles.tabs}>
            <p className={styles.sidebarLabel}>Portfolio</p>
            {tab('overview', 'Overview', 0)}
            <p className={styles.sidebarLabel}>Projects</p>
            {projects.map((item, index) => <div key={item.slug}>{tab(item.slug, item.slug === 'datadustr-tools' ? 'Inbox & File Dustr' : item.slug === 'cirrus' ? 'Cirrus' : item.title, index + 1)}</div>)}
            <p className={styles.sidebarLabel}>More</p>
            {documents.map((item, index) => <div key={item.slug}>{tab(item.slug, item.title, projects.length + index + 1)}</div>)}
          </div>
          <div className={styles.owner}><span className={styles.avatar} aria-hidden="true">JR</span><div><strong>Jason Rodriguez</strong><span>Front-end / UX</span></div></div>
        </aside>
        <div role="tabpanel" id="desktop-panel" aria-labelledby={`desktop-tab-${selected}`} tabIndex={0} className={`${styles.panel} ${document ? styles.documentPanel : project ? styles.projectPanel : styles.overview}`}>
          {document ? <div key={selected} data-desktop-document={selected} className={`${styles.document} ${selected === 'about' ? styles.aboutDocument : ''}`}>{pages[selected]}</div> : !project ? <>
            <div className={styles.introduction}>
              <p className={styles.kicker}>Front-end engineering &amp; UX</p>
              <h1>Jason Tyler Rodriguez</h1>
              <p className={styles.introText}>Eight years building interfaces.<br />A strong focus on how people use them.</p>
              <p className={styles.bio}>Enterprise applications, reusable components, and independent projects. Take a look around.</p>
              <Link className={styles.experienceLink} href="/experience">View experience <span aria-hidden="true">↗</span></Link>
            </div>
            <section className={styles.projectShelf} aria-labelledby="desktop-projects-heading">
              <h2 id="desktop-projects-heading">Selected projects</h2>
              <div className={styles.projectFiles}>{selectedProjects.map(item => <button key={item.slug} type="button" onClick={() => select(item.slug)} className={styles.projectFile}><Folder /><strong>{item.title}</strong><span>{item.comingSoon ? 'Coming soon' : item.slug === 'cirrus' ? 'Independent recreation' : 'Independent concepts'}</span></button>)}</div>
            </section>
          </> : <>
            <div className={`${styles.projectHeading} ${styles.previewHeading}`}><p className={styles.kicker}>{project.comingSoon ? 'In progress' : project.slug === 'timely' ? 'Published research · IEEE SoutheastCon 2019' : project.collection === 'college' ? 'College project · archived' : project.slug === 'cirrus' ? 'Independent recreation' : 'Independent concepts'}</p><h1>{project.title}</h1><p>{project.comingSoon ? 'Coming soon.' : project.tagline}</p></div>
            {project.comingSoon ? <div className={styles.comingSoon}><Folder /><p>Coming soon.</p></div>
              : view === 'story' ? <div key={project.slug} className={`${styles.document} ${styles.story} ${project.slug === 'datadustr-tools' ? styles.singleStory : ''}`}>{project.slug === 'datadustr-tools' ? stories[project.slug] : <StoryPager key={project.slug}>{stories[project.slug]}</StoryPager>}</div>
              : view === 'films' && project.slug === 'datadustr-tools' ? <div className={styles.films}>
                <div className={styles.filmIntroduction}><h2>Two ways to make cleanup easier to review.</h2><p>These short animated films introduce the product ideas. The full demo lets you explore the interfaces yourself.</p></div>
                <div><h3>Inbox Dustr</h3><TrailerPlayer id="inbox" title="Inbox Dustr" /><p>Messages become groups you can review. The story follows keeping what matters, choosing a cleanup action, and undoing a change.</p></div>
                <div><h3>File Dustr</h3><TrailerPlayer id="file" title="File Dustr" /><p>A crowded folder becomes a queue of decisions: sort by type, inspect a suggested move, and see how undo fits into the workflow.</p></div>
                <p className={styles.filmFootnote}>Concept illustrations with fictional messages and files, original music, and optional captions. Play starts sound; nothing autoplays.</p>
              </div>
              : <div className={styles.preview} key={project.slug}><ProjectVisual slug={project.slug} title={project.title} embedded /></div>}
          </>}
        </div>
      </div>
      <div className={styles.statusbar}><span>{document ? document.title : project ? project.comingSoon ? 'Coming soon' : view === 'story' ? 'Project story' : view === 'films' ? 'Concept films' : 'Interactive preview · sample data' : `${selectedProjects.length} selected projects`}</span><Footer embedded /></div>
    </section>
  </div>;
}
