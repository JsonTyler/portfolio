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
      <section className="gradient-bg text-white section-padding-lg border-b">
        <div className="container-max max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Get In Touch</h1>
          <p className="text-lg md:text-xl text-slate-100 max-w-3xl">
            I'm interested in hearing about new opportunities and projects.
          </p>
        </div>
      </section>

      <section className="section-padding-lg">
        <div className="container-max max-w-2xl">
          <Card variant="default" className="p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Let's Connect</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Direct Communication</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  The best way to reach me is via email. I try to respond within 24 hours.
                </p>
                <ButtonLink
                  href={`mailto:${SITE_METADATA.email}`}
                  variant="primary"
                  size="md"
                >
                  {SITE_METADATA.email}
                </ButtonLink>
              </div>

              <div className="border-t border-slate-200 pt-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Social & Web</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  You can also find me on these platforms:
                </p>
                <ul className="space-y-3">
                  {SOCIAL_LINKS.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-standard focus-ring"
                      >
                        <span className="text-cyan-600">→</span>
                        <span>{link.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-slate-200 pt-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4">What I'm Looking For</h3>
                <ul className="space-y-3 text-slate-700">
                  {[
                    'Full-time roles with product-focused companies',
                    'Technical leadership and architecture opportunities',
                    'Meaningful problems with passionate teams',
                    'Opportunities to own products end-to-end',
                  ].map((item, index) => (
                    <li key={index} className="flex gap-3 items-start">
                      <span className="text-cyan-600 font-bold flex-shrink-0">✓</span>
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
