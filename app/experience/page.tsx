import { Metadata } from 'next';
import { experience } from '@/content/experience';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'My professional background and career progression.',
};

export default function ExperiencePage() {
  return (
    <>
      <section className="section-padding bg-slate-50 border-b border-slate-200">
        <div className="container-max">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Experience</h1>
          <p className="text-lg text-slate-600">
            A timeline of my professional journey and career growth.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max max-w-3xl">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-slate-200 transform md:-translate-x-1/2" />

            {/* Timeline items */}
            <div className="space-y-12">
              {experience.map((item, index) => (
                <div key={item.id} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 top-2 w-4 h-4 bg-cyan-600 rounded-full border-4 border-white transform -translate-x-1.5 md:-translate-x-2.5 md:translate-x-0" />

                  {/* Content */}
                  <div className={`ml-8 md:ml-0 ${index % 2 === 0 ? 'md:mr-1/2 md:pr-12' : 'md:ml-1/2 md:pl-12'}`}>
                    <div className="bg-white border border-slate-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                        <Badge variant="secondary">
                          {item.period.start.slice(0, 7)} – {item.period.end === 'present' ? 'Present' : item.period.end.slice(0, 7)}
                        </Badge>
                      </div>
                      <p className="text-slate-600 font-medium mb-3">{item.company}</p>
                      <p className="text-slate-700 mb-4">{item.description}</p>

                      {item.technologies && item.technologies.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-slate-600 mb-2">Technologies</p>
                          <div className="flex flex-wrap gap-2">
                            {item.technologies.map((tech) => (
                              <Badge key={tech} variant="accent">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {item.highlights && item.highlights.length > 0 && (
                        <ul className="space-y-2">
                          {item.highlights.map((highlight, i) => (
                            <li key={i} className="flex gap-2 text-sm text-slate-700">
                              <span className="text-cyan-600 font-bold">✓</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
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
