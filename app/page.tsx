import type { Metadata } from 'next';
import Link from 'next/link';
import { projects } from '@/content/projects';

export const metadata: Metadata = {
  title: 'Front-end engineering & UX',
  description: 'Jason Tyler Rodriguez — eight years of professional front-end experience, with a strong UX focus.',
  alternates: { canonical: '/' },
};
export default function Home() {
  return (
    <>
      <section className="gradient-bg hero-padding border-b">
        <div className="container-max home-intro home-intro-compact">
          <div>
            <p className="eyebrow text-amber-200">Front-end engineering / UX</p>
            <h1 className="hero-title">Jason Tyler Rodriguez</h1>
            <p className="intro-statement">Eight years building interfaces.<br />A strong focus on how people use them.</p>
            <p className="hero-subtitle reading-measure">I turn complex workflows into clear interfaces, from enterprise applications to independent products.</p>

          </div>

        </div>
      </section>
      <section id="selected-work" className="section-padding">
        <div className="container-max">
          <div className="section-heading"><div><p className="eyebrow">Project index</p><h2>What I build.</h2></div><Link className="story-link focus-ring" href="/projects">Explore all work &amp; interactive demos ↗</Link></div>
          <div className="home-project-index">{projects.map(project => <Link className="home-project-link focus-ring" key={project.slug} href={`/projects/${project.slug}`}><strong>{project.title}<span aria-hidden="true"> ↗</span></strong><span>{project.tagline}</span></Link>)}</div>
        </div>
      </section>
      <section className="section-padding border-t border-slate-200">
        <div className="container-max experience-intro">
          <div><p className="eyebrow">Professional experience</p><h2>Engineering with a UX perspective.</h2></div>
          <div className="reading-measure"><p>Enterprise front ends, reusable components, and close collaboration across design and engineering. The experience page covers component-library stewardship and collaboration across product teams.</p><a className="story-link focus-ring" href="/experience">View experience ↗</a></div>
        </div>
      </section>
    </>
  );
}
