import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug, projects } from '@/content/projects';
import { ButtonLink } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} Case Study`,
    description: project.tagline,
  };
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Import the case study component based on slug
  let caseStudyComponent = null;
  switch (slug) {
    case 'datadustr':
      const { DataDustrCaseStudy } = await import('@/content/case-studies/datadustr');
      caseStudyComponent = <DataDustrCaseStudy />;
      break;
    case 'datadustr-tools':
      const { DataDustrToolsCaseStudy } = await import('@/content/case-studies/datadustr-tools');
      caseStudyComponent = <DataDustrToolsCaseStudy />;
      break;
    case 'timely':
      const { TimelyCaseStudy } = await import('@/content/case-studies/timely');
      caseStudyComponent = <TimelyCaseStudy />;
      break;
    case 'design-library':
      const { DesignLibraryCaseStudy } = await import('@/content/case-studies/design-library');
      caseStudyComponent = <DesignLibraryCaseStudy />;
      break;
  }

  return (
    <>
      {/* Hero Section */}
      <section className="gradient-bg text-white section-padding-lg border-b">
        <div className="container-max max-w-4xl">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-1">
              <h1 className="text-5xl md:text-6xl font-bold mb-2">{project.title}</h1>
              <p className="text-lg md:text-xl text-slate-100">{project.tagline}</p>
            </div>
            <Badge
              variant={project.status === 'active' ? 'primary' : 'secondary'}
              size="sm"
              className="mt-2 flex-shrink-0"
            >
              {project.status === 'active' ? 'Active' : 'Archived'}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="accent" size="sm">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Content */}
      {caseStudyComponent}

      {/* Navigation */}
      <section className="section-padding-lg bg-slate-50 border-t">
        <div className="container-max max-w-4xl">
          <div className="flex justify-between items-center">
            <ButtonLink href="/projects" variant="secondary" size="md">
              ← Back to Projects
            </ButtonLink>
            <div className="flex gap-3">
              {project.slug === 'datadustr' && (
                <>
                  <ButtonLink href="/projects/datadustr-tools" variant="tertiary" size="sm">
                    Next: DataDustrTools →
                  </ButtonLink>
                </>
              )}
              {project.slug === 'datadustr-tools' && (
                <>
                  <ButtonLink href="/projects/timely" variant="tertiary" size="sm">
                    Next: Timely →
                  </ButtonLink>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
