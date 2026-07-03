import { Metadata } from 'next';
import { projects } from '@/content/projects';
import { ButtonLink } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'My portfolio of software projects and case studies.',
};

export default function ProjectsPage() {
  return (
    <>
      <section className="gradient-bg text-white section-padding-lg border-b">
        <div className="container-max max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">My Work</h1>
          <p className="text-lg md:text-xl text-slate-100 max-w-3xl">
            A collection of projects that demonstrate my engineering, design, and product thinking abilities.
          </p>
        </div>
      </section>

      <section className="section-padding-lg">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <Card
                key={project.slug}
                as="article"
                variant="default"
                hover
                className="flex flex-col"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <CardTitle>{project.title}</CardTitle>
                      <CardDescription>{project.tagline}</CardDescription>
                    </div>
                    <Badge
                      variant={project.status === 'active' ? 'primary' : 'secondary'}
                      size="sm"
                    >
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-slate-700 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="accent" size="sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <ButtonLink
                    href={`/projects/${project.slug}`}
                    variant="primary"
                    size="sm"
                  >
                    View Case Study →
                  </ButtonLink>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
