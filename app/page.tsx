import { Metadata } from 'next';
import { ButtonLink } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { getFeaturedProjects } from '@/content/projects';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Full-stack engineer building products that matter.',
};

export default function Home() {
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      {/* Hero Section */}
      <section className="gradient-bg text-white section-padding-lg">
        <div className="container-max max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Jason Tyler Rodriguez
          </h1>
          <p className="text-lg md:text-xl text-slate-100 mb-8 leading-relaxed max-w-2xl mx-auto">
            Full-stack engineer with product thinking and design sensibility. I build software that solves real problems with elegant technical solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ButtonLink href="/projects" variant="secondary" size="lg">
              View My Work
            </ButtonLink>
            <ButtonLink href="/contact" variant="tertiary" size="lg">
              Get In Touch
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="section-padding-lg">
        <div className="container-max">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Work</h2>
            <p className="text-lg text-slate-600">
              Projects that demonstrate engineering, design, and product thinking.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
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
                    <Badge variant={project.featured ? 'primary' : 'secondary'} size="sm">
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-slate-700 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="accent" size="sm">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="secondary" size="sm">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <ButtonLink
                    href={`/projects/${project.slug}`}
                    variant="primary"
                    size="sm"
                  >
                    Learn More →
                  </ButtonLink>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Strengths Section */}
      <section className="section-padding-lg bg-slate-50">
        <div className="container-max">
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What I Do</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              I combine software engineering, user experience, and product thinking.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {[
              {
                title: 'Software Engineering',
                description: 'Systems architecture, code quality, scalability, and performance optimization.',
              },
              {
                title: 'Product Thinking',
                description: 'Understanding user problems, market opportunities, and building solutions.',
              },
              {
                title: 'UX & Design',
                description: 'Design systems, accessibility, responsive interfaces, and visual clarity.',
              },
              {
                title: 'Full-Stack Development',
                description: 'From frontend interfaces to backend services, API design to databases.',
              },
            ].map((item, index) => (
              <Card key={index} variant="outlined">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding-lg">
        <div className="container-max max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Build Together?</h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            I'm interested in opportunities where I can own products end-to-end and make a meaningful impact with passionate teams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ButtonLink href="/contact" variant="primary" size="lg">
              Get In Touch
            </ButtonLink>
            <ButtonLink href="/about" variant="secondary" size="lg">
              Learn About Me
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
