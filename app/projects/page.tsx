import type { Metadata } from 'next';
import Link from 'next/link';
import { getCollegeProjects, getSelectedProjects } from '@/content/projects';
import { ProjectPreview } from '@/components/ProjectPreview';
export const metadata: Metadata = { title: 'Selected work', description: 'Interactive product concepts, professional UX work, and an archive of college projects.', alternates: { canonical: '/projects' } };
export default function ProjectsPage() {
  return (
    <div className="work-page">
      <section className="gradient-bg hero-padding border-b">
        <div className="container-max">
          <p className="eyebrow">Portfolio</p>
          <h1 className="hero-title">Selected work</h1>
          <p className="hero-subtitle reading-measure">Product ideas you can try, alongside professional UX and component work.</p>
          <a className="story-link focus-ring" href="#college-projects">Browse the college archive ↓</a>
        </div>
      </section>
      <section className="section-padding" aria-labelledby="selected-projects-heading">
        <div className="container-max"><h2 id="selected-projects-heading" className="sr-only">Selected projects</h2>{getSelectedProjects().map((project, index) => <ProjectPreview key={project.slug} project={project} index={index} />)}</div>
      </section>
      <section id="college-projects" className="college-archive section-padding border-t" aria-labelledby="college-heading">
        <div className="container-max">
          <p className="eyebrow">Earlier explorations</p><h2 id="college-heading">College projects</h2>
          <p className="reading-measure">Framed and Timely are archived college projects. Their case studies, interactive examples and source links remain available here.</p>
          <div className="archive-grid">{getCollegeProjects().map(project => <article className="archive-project" key={project.slug}>
            <p className="eyebrow">College project · archived</p><h3>{project.title}</h3><p>{project.description}</p>
            <Link className="story-link focus-ring" href={`/projects/${project.slug}`}>Explore {project.title} ↗</Link>
          </article>)}</div>
        </div>
      </section>
    </div>
  );
}
