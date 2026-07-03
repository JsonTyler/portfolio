import { Metadata } from 'next';
import { ButtonLink } from '@/components/ui/Button';
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
      <section className="section-padding bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="container-max text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Jason Tyler Rodriguez
          </h1>
          <p className="text-xl md:text-2xl text-slate-100 mb-8 max-w-2xl mx-auto">
            Full-stack engineer with product thinking and design sensibility. Building software that solves real problems.
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

      {/* Featured Projects */}
      <section className="section-padding">
        <div className="container-max">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Featured Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <div
                key={project.slug}
                className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-2">{project.title}</h3>
                <p className="text-slate-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="inline-block px-2 py-1 bg-cyan-100 text-cyan-900 text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <ButtonLink href={`/projects/${project.slug}`} variant="primary" size="sm">
                  Learn More
                </ButtonLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-slate-50 border-t border-slate-200">
        <div className="container-max text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Let&apos;s Work Together</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            I&apos;m always interested in hearing about new projects and opportunities.
          </p>
          <ButtonLink href="/contact" variant="primary" size="lg">
            Get In Touch
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
