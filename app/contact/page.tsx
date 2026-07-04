import { Metadata } from 'next';
import { ButtonLink } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SITE_METADATA, SOCIAL_LINKS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with me.',
};

export default function ContactPage() {
  return (
    <>
      <section className="gradient-bg text-white hero-padding border-b">
        <div className="container-max max-w-4xl">
          <h1 className="hero-title text-5xl md:text-6xl font-bold mb-4">Get In Touch</h1>
          <p className="hero-subtitle text-lg md:text-xl max-w-3xl">
            I'm interested in hearing about new opportunities and projects.
          </p>
        </div>
      </section>

      <section className="section-padding-lg">
        <div className="container-max max-w-4xl">
          <Card variant="default" className="p-4 md:p-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Let's Connect</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 mt-0">Direct communication</h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  The fastest way to reach me is LinkedIn.
                </p>
                <ButtonLink href={SITE_METADATA.linkedin} variant="primary" size="md" external>
                  Message me on LinkedIn
                </ButtonLink>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 mt-0">Social and web</h3>
                <ul className="space-y-2">
                  {SOCIAL_LINKS.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-standard focus-ring"
                      >
                        <span className="text-amber-600">→</span>
                        <span>{link.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-2 border-t border-slate-200 pt-4">
                <h3 className="text-lg font-bold text-slate-900 mb-2 mt-0">What I'm looking for</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-slate-700">
                  {[
                    'Full-time roles with product-focused companies',
                    'Technical leadership and architecture opportunities',
                    'Meaningful problems with passionate teams',
                    'Opportunities to own products end-to-end',
                  ].map((item, index) => (
                    <li key={index} className="flex gap-2 items-start">
                      <span className="text-amber-600 font-bold flex-shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}
