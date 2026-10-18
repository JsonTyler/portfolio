import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug, projects, projectStatusLabels } from '@/content/projects';
import { ProjectVisual } from '@/components/ProjectVisual';
import { ButtonLink } from '@/components/ui/Button';
import { DataDustrToolsCaseStudy } from '@/content/case-studies/datadustr-tools';
import { TimelyCaseStudy } from '@/content/case-studies/timely';
import { FramedCaseStudy } from '@/content/case-studies/framed';
import { CirrusCaseStudy } from '@/content/case-studies/cirrus';
interface Props { params: Promise<{ slug: string }> }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return project ? { title: project.title, description: project.tagline, alternates: { canonical: `/projects/${project.slug}` } } : { title: 'Project not found' };
}
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  const links = slug === 'timely' ? [{ label: 'Timely source', href: 'https://github.com/JsonTyler/Timely' }] : slug === 'framed' ? [{ label: 'Framed source', href: 'https://github.com/JsonTyler/Framed' }] : [];
  return (
    <>
      <section className="gradient-bg hero-padding border-b">
        <div className="container-max">
          <p className="eyebrow">{project.statusLabel ?? projectStatusLabels[project.status]}</p>
          <h1 className="hero-title">{project.title}</h1>
          <p className="hero-subtitle reading-measure">{project.tagline}</p>
          <p className="text-sm text-slate-200">{project.technologies.join(' / ')}</p>
        </div>
      </section>
      <div className="container-max case-visual"><ProjectVisual slug={project.slug} title={project.title} priority /></div>
      <div className="case-study-content">{slug === 'datadustr-tools' ? <DataDustrToolsCaseStudy /> : slug === 'timely' ? <TimelyCaseStudy /> : slug === 'cirrus' ? <CirrusCaseStudy /> : <FramedCaseStudy />}</div>
      <nav className="container-max story-navigation" aria-label="Project navigation">
        <ButtonLink href="/projects" variant="secondary">← All work</ButtonLink>
        {links.map((link) => <ButtonLink key={link.href} href={link.href} variant="tertiary" external>{link.label}</ButtonLink>)}
      </nav>
    </>
  );
}
