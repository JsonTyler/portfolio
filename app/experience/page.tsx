import { Metadata } from 'next';
import { experience } from '@/content/experience';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'My professional background and career progression.',
};

export default function ExperiencePage() {
  return (
    <>
      <section className="gradient-bg text-white hero-padding border-b">
        <div className="container-max max-w-4xl">
          <h1 className="hero-title text-5xl md:text-6xl font-bold mb-4">Experience</h1>
          <p className="hero-subtitle text-lg md:text-xl max-w-3xl">
            Professional front-end development, UX, and earlier software engineering work.
          </p>
        </div>
      </section>

      <section className="section-padding-lg">
        <div className="container-max max-w-3xl">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-200" />

            {/* Timeline items */}
            <div className="space-y-12 experience-list">
              {experience.map((item) => (
                <div key={item.id} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-2 w-4 h-4 bg-amber-600 rounded-full border-4 border-white -translate-x-1.5" />

                  {/* Content */}
                  <div className="ml-8">
                    <Card variant="default" className="hover:shadow-lg transition-standard">
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                        <h2 className="text-xl font-bold text-slate-900">{item.title}</h2>
                        <Badge variant="secondary" size="sm">
                          {item.period.start.slice(0, 7)} – {item.period.end === 'present' ? 'Present' : item.period.end.slice(0, 7)}
                        </Badge>
                      </div>
                      <p className="text-slate-600 font-medium mb-3">{item.company}</p>
                      <p className="text-slate-700 mb-4 leading-relaxed">{item.description}</p>

                      {item.technologies && item.technologies.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-slate-600 mb-2">Technologies</p>
                          <div className="flex flex-wrap gap-2">
                            {item.technologies.map((tech) => (
                              <Badge key={tech} variant="accent" size="sm">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {item.highlights && item.highlights.length > 0 && (
                        <ul className="space-y-2">
                          {item.highlights.map((highlight, i) => (
                            <li key={i} className="flex gap-3 text-sm text-slate-700">
                              <span className="text-amber-600 font-bold flex-shrink-0">✓</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
