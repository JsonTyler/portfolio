import Link from 'next/link';
import type { Project } from '@/lib/types';
import { projectStatusLabels } from '@/content/projects';
import { ProjectVisual } from './ProjectVisual';

export function ProjectPreview({ project, index }: { project: Project; index: number }) {
  return (
    <article className={`project-preview${project.comingSoon || project.slug === 'design-library' ? ' project-preview-text' : ''}`}>
      {!project.comingSoon && <ProjectVisual slug={project.slug} title={project.title} priority={index === 0} />}
      <div className="project-preview-copy">
        <p className="eyebrow"><span className="project-number" aria-hidden="true">0{index + 1} / </span>{project.statusLabel ?? projectStatusLabels[project.status]}</p>
        <h3 className="project-preview-title">{project.title}</h3>
        <p className="text-slate-700 reading-measure">{project.description}</p>
        {project.contribution && <p className="text-sm text-slate-700"><strong>My contribution:</strong> {project.contribution}</p>}
        {!project.comingSoon && <p className="project-stack text-sm text-slate-600">{project.engineeringNote ?? project.technologies.join(' / ')}</p>}
        {project.slug === 'datadustr-tools' && <div className="concept-actions"><a className="story-link focus-ring" href="https://tools.datadustr.com/" target="_blank" rel="noopener noreferrer">Try the interactive demos ↗</a><Link className="story-link focus-ring" href="/projects/datadustr-tools#trailers">Watch the short tours →</Link><p className="text-sm text-slate-600">Mock data · no account connection · portfolio concepts, not a commercial release</p></div>}
        <Link className="story-link focus-ring" href={`/projects/${project.slug}`}>
          {project.comingSoon ? `View ${project.title}` : `Explore ${project.title}`}{' '}<span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
