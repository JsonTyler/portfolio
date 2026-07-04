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
      <section className="gradient-bg text-white hero-padding border-b border-slate-700">
        <div className="container-max max-w-5xl">
          <p className="text-amber-200 text-sm md:text-base font-semibold tracking-wide uppercase mb-3">
            Senior Full-Stack Engineer, Product and UX Focus
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight text-white">
            Jason Tyler Rodriguez
          </h1>
          <p className="text-base md:text-lg text-slate-100 mb-7 leading-relaxed max-w-3xl">
            I build production software from concept to delivery, combining architecture, UX, and product execution.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-7">
            <Card variant="ghost" className="border border-slate-600/70 bg-slate-900/30 p-4">
              <p className="text-xs uppercase tracking-wide text-amber-200 mb-1">What I Build</p>
              <p className="text-sm text-white">Full-stack products with real workflows, not demo-only interfaces.</p>
            </Card>
            <Card variant="ghost" className="border border-slate-600/70 bg-slate-900/30 p-4">
              <p className="text-xs uppercase tracking-wide text-amber-200 mb-1">Operating Level</p>
              <p className="text-sm text-white">Senior owner of architecture, implementation, UX, and iteration.</p>
            </Card>
            <Card variant="ghost" className="border border-slate-600/70 bg-slate-900/30 p-4">
              <p className="text-xs uppercase tracking-wide text-amber-200 mb-1">Why Interview</p>
              <p className="text-sm text-white">I can take ambiguous ideas and turn them into maintainable software.</p>
            </Card>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <ButtonLink href="/projects" variant="secondary" size="lg">
              Review Case Studies
            </ButtonLink>
            <ButtonLink href="/contact" variant="tertiary" size="lg">
              Contact Me
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Interview Signal Section */}
      <section className="section-padding-sm border-b border-slate-200 bg-white">
        <div className="container-max">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 mt-0">Why teams interview me</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Card variant="outlined">
              <h3 className="text-lg font-bold text-slate-900 mt-0 mb-2">Architecture ownership</h3>
              <p className="text-slate-700 text-sm">
                I design systems for delivery and maintenance. Current examples include policy layers, adapter boundaries, and multi-platform architecture.
              </p>
            </Card>
            <Card variant="outlined">
              <h3 className="text-lg font-bold text-slate-900 mt-0 mb-2">Product judgment</h3>
              <p className="text-slate-700 text-sm">
                I prioritize user value, avoid feature bloat, and validate with real usage before scaling implementation.
              </p>
            </Card>
            <Card variant="outlined">
              <h3 className="text-lg font-bold text-slate-900 mt-0 mb-2">Execution speed with rigor</h3>
              <p className="text-slate-700 text-sm">
                I use AI as a productivity tool for planning and implementation, while owning architecture, quality gates, and final decisions.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-3 mt-0">Featured engineering work</h2>
            <p className="text-base md:text-lg text-slate-600">
              Evidence-first case studies showing decisions, tradeoffs, and implementation details.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      <section className="section-padding bg-slate-50">
        <div className="container-max">
          <div className="mb-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-3 mt-0">How I work</h2>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
              Engineering decisions aligned with user workflow and product scope.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {[
              {
                title: 'Architecture',
                description: 'Bounded modules, explicit tradeoffs, reliable interfaces, and maintainable codebases.',
              },
              {
                title: 'Product execution',
                description: 'Scope control, prioritization, and iterative delivery based on real usage.',
              },
              {
                title: 'UX and design systems',
                description: 'Consistent components, accessible defaults, and predictable workflows.',
              },
              {
                title: 'Full-stack delivery',
                description: 'Frontend, backend, data, and deployment through one coherent implementation plan.',
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
      <section className="section-padding">
        <div className="container-max max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-5 mt-0">Open to senior and staff opportunities</h2>
          <p className="text-base md:text-lg text-slate-600 mb-6 leading-relaxed">
            I am looking for roles where I can own architecture and delivery, partner closely with product and design, and build software that has clear user impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ButtonLink href="/contact" variant="primary" size="lg">
              Start a conversation
            </ButtonLink>
            <ButtonLink href="/resume" variant="secondary" size="lg">
              View resume
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
