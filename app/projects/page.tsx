import { Metadata } from 'next';
import { projects } from '@/content/projects';
import { ButtonLink } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'My portfolio of software projects and case studies.',
};

export default function ProjectsPage() {
  return (
    <>
      <section className="section-padding bg-slate-50 border-b border-slate-200">
        <div className="container-max">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My Work</h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            A collection of projects that demonstrate my engineering, design, and product thinking abilities.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div
                key={project.slug}
                className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">
                        {project.title}
                      </h2>
                      <p className="text-slate-600">{project.tagline}</p>
                    </div>
                    <Badge
                      variant={project.status === 'active' ? 'primary' : 'secondary'}
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <p className="text-slate-700 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="accent">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <ButtonLink href={`/projects/${project.slug}`} variant="primary" size="sm">
                    View Case Study
                  </ButtonLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
