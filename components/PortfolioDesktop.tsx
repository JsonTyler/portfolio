'use client';

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import type { Project } from '@/lib/types';
import { ProjectVisual } from './ProjectVisual';
import { AsILeftItComingSoon } from './AsILeftItComingSoon';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Footer } from './layout/Footer';
import { MobileDock, MobileHeader, MobileHome, MobileWorkList } from './PortfolioMobile';
import { TrailerPlayer } from './TrailerPlayer';
import styles from './PortfolioDesktop.module.css';

function Folder({ className = '' }: { className?: string }) {
  return <svg className={`${styles.folder} ${className}`} viewBox="0 0 48 40" fill="none" aria-hidden="true"><path d="M3 8a3 3 0 0 1 3-3h12l5 5h19a3 3 0 0 1 3 3v20a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8Z" fill="var(--folder-back)" stroke="var(--folder-edge)"/><path d="M3 16a3 3 0 0 1 3-3h36a3 3 0 0 1 3 3v17a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V16Z" fill="var(--folder-front)" stroke="var(--folder-edge)"/><path d="M6 15h36" stroke="#fff" strokeOpacity=".45"/></svg>;
}

const documents = [{ slug: 'design-library', title: 'Enterprise UX' }, { slug: 'experience', title: 'Experience' }, { slug: 'about', title: 'About me' }, { slug: 'resume', title: 'Résumé' }, { slug: 'contact', title: 'Contact' }];

export function PortfolioDesktop({ projects, pages, details }: { projects: Project[]; pages: Record<string, ReactNode>; details: Record<string, ReactNode> }) {
  const [selected, setSelected] = useState('overview');
  const [view, setView] = useState<'preview' | 'films' | 'details'>('preview');
  const [expanded, setExpanded] = useState(false);
  const [mobileWorkOpen, setMobileWorkOpen] = useState(false);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const project = projects.find(item => item.slug === selected);
  const document = documents.find(item => item.slug === selected);
  const selectedProjects = projects.filter(item => item.collection !== 'college');
  const overviewProjects = projects.filter(item => !item.comingSoon && item.featured);
  const select = useCallback((slug: string, nextView: 'preview' | 'films' | 'details' = 'preview', history = true, moveFocus = true) => {
    setMobileWorkOpen(false);
    setSelected(slug);
    setView(nextView);
    const index = ['overview', 'design-library', ...projects.map(item => item.slug), ...documents.filter(item => item.slug !== 'design-library').map(item => item.slug)].indexOf(slug);
    if (moveFocus && globalThis.innerWidth < 768) {
      globalThis.requestAnimationFrame(() => {
        const panel = globalThis.document.getElementById('desktop-panel');
        const target = nextView === 'details' ? panel?.querySelector<HTMLElement>('article') ?? panel : panel;
        target?.focus({ preventScroll: true });
      });
    } else if (moveFocus) tabs.current[index]?.focus({ preventScroll: true });
    if (history) globalThis.history.pushState(null, '', `#${slug}${nextView === 'preview' ? '' : `/${nextView}`}`);
  }, [projects]);

  useEffect(() => {
    const sync = (event?: globalThis.Event) => {
      const [slug, mode] = globalThis.location.hash.slice(1).split('/');
      if (slug === 'work') { setMobileWorkOpen(true); return; }
      if (slug === 'overview' || projects.some(item => item.slug === slug) || documents.some(item => item.slug === slug)) {
        select(slug, mode === 'films' ? 'films' : mode === 'details' || mode === 'story' ? 'details' : 'preview', false, !!event);
      } else if (!slug) select('overview', 'preview', false, !!event);
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
      if (path === '/' && url.hash) return;
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

  const openMobileWork = () => {
    setMobileWorkOpen(true);
    globalThis.requestAnimationFrame(() => globalThis.document.getElementById('desktop-panel')?.focus({ preventScroll: true }));
    if (globalThis.location.hash !== '#work') globalThis.history.pushState(null, '', '#work');
  };
  const mobileTitle = mobileWorkOpen ? 'Work' : selected === 'overview' ? 'Jason’s Portfolio' : project?.slug === 'datadustr-tools' ? 'Inbox & File Dustr' : project?.title ?? document?.title ?? 'Portfolio';
  const mobileBack = () => {
    if (mobileWorkOpen) select('overview');
    else if (view !== 'preview') select(selected);
    else if (project) openMobileWork();
    else select('overview');
  };

  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const navigation = ['overview', 'design-library', ...projects.map(item => item.slug), ...documents.filter(item => item.slug !== 'design-library').map(item => item.slug)];
    const count = navigation.length;
    const next = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? (index + 1) % count
      : event.key === 'ArrowUp' || event.key === 'ArrowLeft' ? (index + count - 1) % count
      : event.key === 'Home' ? 0 : event.key === 'End' ? count - 1 : null;
    if (next === null) return;
    event.preventDefault();
    select(navigation[next]);
    tabs.current[next]?.focus();
  };
  const tab = (slug: string, label: string, index: number) => <button
    type="button" role="tab" id={`desktop-tab-${slug}`} aria-selected={selected === slug}
    aria-controls="desktop-panel" tabIndex={selected === slug ? 0 : -1}
    ref={element => { tabs.current[index] = element; }}
    className={styles.sidebarItem} onClick={() => select(slug)} onKeyDown={event => onTabKey(event, index)}
  >{slug === 'overview' ? <span className={styles.homeIcon} aria-hidden="true">⌂</span> : <Folder />}<span>{label}</span>{slug === 'timely' && <small aria-hidden="true" className={styles.researchBadge}>IEEE</small>}</button>;

  return <div data-portfolio-desktop className={`${styles.desktop} ${expanded ? styles.expanded : ''} ${mobileWorkOpen ? styles.mobileWorkActive : ''} ${selected === 'overview' && !mobileWorkOpen ? styles.mobileOnHome : ''}`}>
    <section className={styles.window} aria-label="Portfolio workspace">
      <MobileHeader title={mobileTitle} backLabel={mobileWorkOpen ? 'Home' : selected === 'overview' ? undefined : view !== 'preview' ? 'Back' : project ? 'Work' : 'Home'} onBack={mobileBack} />
      <div className={styles.titlebar}>
        <div className={styles.windowControls}><span className={styles.close} aria-hidden="true"/><span className={styles.minimize} aria-hidden="true"/><button type="button" className={styles.resize} onClick={() => setExpanded(value => !value)} aria-label={expanded ? 'Restore window size' : 'Enlarge workspace'} aria-pressed={expanded}><span aria-hidden="true">{expanded ? '−' : '+'}</span></button></div>
        <span className={styles.windowTitle}><Folder />Jason Tyler Rodriguez</span>
        <div className={styles.windowTheme}><ThemeSwitcher /></div>
      </div>
      <div className={`${styles.toolbar} ${project && !project.comingSoon && !mobileWorkOpen ? styles.mobileProjectToolbar : ''}`}>
        <button type="button" className={styles.back} onClick={() => select('overview')} disabled={selected === 'overview'} aria-label="Back to overview">‹</button>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <a href="#overview" aria-current={selected === 'overview' ? 'page' : undefined}>Portfolio</a>
          {selected !== 'overview' && <><span aria-hidden="true">›</span><a href={`#${selected}`} aria-current={view === 'preview' ? 'page' : undefined}>{project?.title ?? document?.title}</a></>}
          {(project || document) && view !== 'preview' && <><span aria-hidden="true">›</span><a href={`#${selected}/${view}`} aria-current="page">{view === 'details' ? 'Details' : 'Films'}</a></>}
        </nav>
        {project?.slug === 'datadustr-tools' && <a className={styles.fullDemoLink} href="https://tools.datadustr.com/" target="_blank" rel="noopener noreferrer">Open full demo <span aria-hidden="true">↗</span></a>}
        {project && !project.comingSoon ? <div className={styles.viewControls} role="group" aria-label="Project view">
          <button type="button" aria-pressed={view === 'preview'} onClick={() => select(selected)}>Preview</button>
          {project.slug === 'datadustr-tools' && <button type="button" aria-pressed={view === 'films'} onClick={() => select(selected, 'films')}>Films</button>}
          <button type="button" aria-pressed={view === 'details'} onClick={() => select(selected, 'details')}>Read details</button>
        </div> : view === 'details' ? <button type="button" className={styles.returnPreview} onClick={() => select(selected)}>Back to summary</button> : <span className={styles.toolbarLink}>{document ? 'Document' : 'Personal workspace'}</span>}
      </div>
      <div className={styles.workspace}>
        <aside className={styles.sidebar}>
          <label className={styles.mobileNavigation}>Navigate
            <select value={selected} onChange={event => select(event.target.value)}>
              <option value="overview">Overview</option>
              <option value="design-library">Enterprise UX</option>
              <optgroup label="Projects">{projects.map(item => <option key={item.slug} value={item.slug}>{item.title}</option>)}</optgroup>
              <optgroup label="More">{documents.filter(item => item.slug !== 'design-library').map(item => <option key={item.slug} value={item.slug}>{item.title}</option>)}</optgroup>
            </select>
          </label>
          <div role="tablist" aria-label="Portfolio views" aria-orientation="vertical" className={styles.tabs}>
            <p className={styles.sidebarLabel}>Portfolio</p>
            {tab('overview', 'Overview', 0)}
            {tab('design-library', 'Enterprise UX', 1)}
            <p className={styles.sidebarLabel}>Selected work</p>
            {projects.map((item, index) => <div key={item.slug}>{tab(item.slug, item.slug === 'datadustr-tools' ? 'Inbox & File Dustr' : item.slug === 'cirrus' ? 'Cirrus' : item.title, index + 2)}</div>)}
            <p className={styles.sidebarLabel}>More</p>
            {documents.map((item, index) => item.slug === 'design-library' ? null : <div key={item.slug}>{tab(item.slug, item.title, projects.length + index + 1)}</div>)}
          </div>
          <div className={styles.owner}><span className={styles.avatar} aria-hidden="true">JR</span><div><strong>Jason Rodriguez</strong><span>Front-end / UX</span></div></div>
        </aside>
        <div role="tabpanel" id="desktop-panel" aria-labelledby={mobileWorkOpen ? undefined : `desktop-tab-${selected}`} aria-label={mobileWorkOpen ? 'Work' : undefined} tabIndex={0} className={`${styles.panel} ${view === 'details' && details[selected] ? styles.documentPanel : document ? styles.documentPanel : project ? styles.projectPanel : styles.overview}`}>
          {mobileWorkOpen && <div className={styles.mobileWork}><MobileWorkList projects={projects} onOpen={select} /></div>}
          {view === 'details' && details[selected] ? <article key={selected} tabIndex={0} className={`${styles.document} ${styles.detailDocument}`} aria-label={`${project?.title ?? document?.title} details`}>{details[selected]}</article> : document ? <div key={selected} data-desktop-document={selected} className={styles.document}>{pages[selected]}</div> : !project ? <>
            <div className={styles.mobileHome}><MobileHome onOpen={select} onWork={openMobileWork} /></div>
            <header className={styles.introduction}>
              <p className={styles.kicker}>Senior front-end engineer · UX lead</p>
              <h1>Jason Tyler Rodriguez</h1>
              <p className={styles.introText}>I make complex software easier to use.</p>
              <nav className={styles.overviewActions} aria-label="Introduction links"><a href="#experience">View experience →</a><a href="#contact">Get in touch →</a></nav>
            </header>
            <section className={styles.featuredWork} aria-labelledby="enterprise-heading">
              <div><p className={styles.kicker}>Enterprise work · Springbrook Software</p><h2 id="enterprise-heading">Shared components. Consistent workflows.</h2><p>Component-library ownership, UX standards, and front-end leadership for an ERP platform.</p></div>
              <a className={styles.caseLink} href="#design-library">Explore enterprise work →</a>
            </section>
            <section className={styles.projectShelf} aria-labelledby="desktop-projects-heading">
              <h2 id="desktop-projects-heading">Selected explorations</h2>
              <div className={styles.projectFiles}>{overviewProjects.map(item => <button key={item.slug} type="button" onClick={() => select(item.slug)} className={styles.projectFile}><Folder /><span><strong>{item.slug === 'cirrus' ? 'Cirrus compact mode' : 'Inbox & File Dustr'}</strong><span>{item.slug === 'cirrus' ? 'One density setting across a workspace.' : 'Reviewable inbox and file cleanup.'}</span></span><span className={styles.openProject} aria-hidden="true">↗</span></button>)}</div>
            </section>
          </> : <>
            <div className={styles.projectHeading}><p className={styles.kicker}>{project.comingSoon ? 'In progress' : project.slug === 'timely' ? 'Published research · IEEE SoutheastCon 2019' : project.collection === 'college' ? 'College project · archived' : project.slug === 'cirrus' ? 'Independent recreation' : 'Independent concepts'}</p><h1>{project.title}</h1><p>{project.tagline}</p></div>
            {project.comingSoon ? <div className={styles.comingSoon}><AsILeftItComingSoon /></div>
              : view === 'films' && project.slug === 'datadustr-tools' ? <div className={styles.films}>
                <section className={styles.filmIntroduction}><h2>Two ways to make cleanup easier to review.</h2><p>These short animated films introduce the product ideas. The full demo lets you explore the interfaces yourself.</p></section>
                <section><h3>Inbox Dustr</h3><TrailerPlayer id="inbox" title="Inbox Dustr" /><p>Messages become groups you can review. The story follows keeping what matters, choosing a cleanup action, and undoing a change.</p></section>
                <section><h3>File Dustr</h3><TrailerPlayer id="file" title="File Dustr" /><p>A crowded folder becomes a queue of decisions: sort by type, inspect a suggested move, and see how undo fits into the workflow.</p></section>
                <section><p className={styles.filmFootnote}>Concept illustrations with fictional messages and files, original music, and optional captions. Play starts sound; nothing autoplays.</p></section>
              </div>
              : <div className={styles.preview} key={project.slug}><ProjectVisual slug={project.slug} title={project.title} embedded /></div>}
          </>}
        </div>
      </div>
      <MobileDock selected={selected} workOpen={mobileWorkOpen} isProject={!!project} onOpen={select} onWork={openMobileWork} />
      <div className={styles.statusbar}><span>{document ? document.title : project ? project.comingSoon ? 'Coming soon' : view === 'details' ? 'Project details' : view === 'films' ? 'Concept films' : 'Interactive preview · sample data' : `${selectedProjects.length} projects · enterprise experience`}</span><Footer embedded /></div>
    </section>
  </div>;
}
