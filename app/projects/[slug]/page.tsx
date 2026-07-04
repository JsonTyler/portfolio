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

  const projectExternalLinks: Record<string, Array<{ label: string; href: string }>> = {
    datadustr: [
      { label: 'Live site', href: 'https://datadustr.com/' },
      { label: 'Repository', href: 'https://github.com/JsonTyler/data-dustr' },
    ],
    'datadustr-tools': [
      { label: 'Live site', href: 'https://tools.datadustr.com/' },
      { label: 'Repository', href: 'https://github.com/JsonTyler/data-dustr-tools' },
    ],
    timely: [
      { label: 'Repository', href: 'https://github.com/JsonTyler/Timely' },
      { label: 'Former subdomain (archived)', href: 'https://timeliny.jasontylerrodriguez.com/' },
      { label: 'Case study source', href: 'https://github.com/JsonTyler/Staticerson/blob/main/content/case-studies/timely.tsx' },
    ],
    'design-library': [
      { label: 'Playground site', href: 'https://design.sprbrk.com/playground' },
      { label: 'Archived demo site', href: 'https://test-design.sprbrk.com/' },
      { label: 'Case study source', href: 'https://github.com/JsonTyler/Staticerson/blob/main/content/case-studies/design-library.tsx' },
    ],
  };

  const relatedProjects = projects
    .filter((p) => p.slug !== project.slug)
    .slice(0, 2);

  // Import the case study component based on slug
  let caseStudyComponent = null;
  switch (slug) {
    case 'datadustr': {
      const { DataDustrCaseStudy } = await import('@/content/case-studies/datadustr');
      caseStudyComponent = <DataDustrCaseStudy />;
      break;
    }
    case 'datadustr-tools': {
      const { DataDustrToolsCaseStudy } = await import('@/content/case-studies/datadustr-tools');
      caseStudyComponent = <DataDustrToolsCaseStudy />;
      break;
    }
    case 'timely': {
      const { TimelyCaseStudy } = await import('@/content/case-studies/timely');
      caseStudyComponent = <TimelyCaseStudy />;
      break;
    }
    case 'design-library': {
      const { DesignLibraryCaseStudy } = await import('@/content/case-studies/design-library');
      caseStudyComponent = <DesignLibraryCaseStudy />;
      break;
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="gradient-bg text-white hero-padding border-b">
        <div className="container-max max-w-4xl">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-1">
              <h1 className="hero-title text-5xl md:text-6xl font-bold mb-2">{project.title}</h1>
              <p className="hero-subtitle text-lg md:text-xl">{project.tagline}</p>
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
      <div className="case-study-content">
        {caseStudyComponent}
      </div>

      {/* Navigation */}
      <section className="section-padding-sm bg-slate-50 border-t">
        <div className="container-max max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <div className="rounded-lg border border-slate-200 p-3">
              <h2 className="text-base font-bold mt-0 mb-2">Navigation</h2>
              <ButtonLink href="/projects" variant="secondary" size="sm">
                ← Back to Projects
              </ButtonLink>
            </div>

            <div className="rounded-lg border border-slate-200 p-3">
              <h2 className="text-base font-bold mt-0 mb-2">Related case studies</h2>
              <div className="flex flex-wrap gap-2">
                {relatedProjects.map((relatedProject) => (
                  <ButtonLink key={relatedProject.slug} href={`/projects/${relatedProject.slug}`} variant="tertiary" size="sm">
                    {relatedProject.title} →
                  </ButtonLink>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 p-3">
              <h2 className="text-base font-bold mt-0 mb-2">Project links</h2>
              <div className="flex flex-wrap gap-2">
                {(projectExternalLinks[project.slug] ?? []).map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-amber-700 underline decoration-2 underline-offset-4 decoration-amber-500/70 transition-standard focus-ring hover:bg-amber-50 hover:text-amber-800"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
