import type { Metadata } from 'next';
import Link from 'next/link';
import { getResearchProjects, getSelectedProjects } from '@/content/projects';
import { ProjectPreview } from '@/components/ProjectPreview';
export const metadata: Metadata = { title: 'Selected work', description: 'Enterprise engineering and UX, Threadkeep context memory, DataDustr product concepts, and published research.', alternates: { canonical: '/projects' } };
export default function ProjectsPage() {
  return <div className="work-page">
    <section className="gradient-bg hero-padding border-b"><div className="container-max">
      <p className="eyebrow">Portfolio</p><h1 className="hero-title">Selected work</h1>
      <p className="hero-subtitle reading-measure">Enterprise engineering and UX, a working context-memory app, and interactive product concepts.</p>
      <Link className="story-link focus-ring" href="/work/enterprise">Explore enterprise UX & shared components →</Link>
    </div></section>
    <section className="section-padding" aria-labelledby="selected-projects-heading"><div className="container-max">
      <h2 id="selected-projects-heading" className="sr-only">Selected projects</h2>
      {getSelectedProjects().map((project, index) => <ProjectPreview key={project.slug} project={project} index={index} />)}
    </div></section>
    <section id="research" className="college-archive section-padding border-t" aria-labelledby="research-heading"><div className="container-max">
      <p className="eyebrow">Supporting work</p><h2 id="research-heading">Published research</h2>
      <div className="archive-grid">{getResearchProjects().map(project => <article className="archive-project" key={project.slug}>
        <p className="eyebrow">{project.statusLabel}</p><h3>{project.title}</h3><p>{project.description}</p>
        <Link className="story-link focus-ring" href={`/projects/${project.slug}`}>Explore {project.title} ↗</Link>
      </article>)}</div>
    </div></section>
  </div>;
}
