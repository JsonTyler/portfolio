import type { Metadata } from 'next';
import { projects } from '@/content/projects';
import { ProjectPreview } from '@/components/ProjectPreview';
export const metadata: Metadata = { title: 'Selected work', description: 'Professional UX and component-library work, independent products, and interaction experiments.', alternates: { canonical: '/projects' } };
export default function ProjectsPage() {
  return (
    <div className="work-page">
      <section className="gradient-bg hero-padding border-b">
        <div className="container-max">
          <p className="eyebrow">Portfolio</p>
          <h1 className="hero-title">Selected work</h1>
          <p className="hero-subtitle reading-measure">Professional UX and component work, independent products, and interaction experiments.</p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-max"><h2 className="sr-only">Projects</h2>{projects.map((project, index) => <ProjectPreview key={project.slug} project={project} index={index} />)}</div>
      </section>
    </div>
  );
}
