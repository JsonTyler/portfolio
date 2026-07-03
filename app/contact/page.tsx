import { Metadata } from 'next';
import { SITE_METADATA, SOCIAL_LINKS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with me.',
};

export default function ContactPage() {
  return (
    <>
      <section className="section-padding bg-slate-50 border-b border-slate-200">
        <div className="container-max">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-lg text-slate-600">
            I&apos;m interested in hearing about new opportunities and projects.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max max-w-2xl">
          <div className="bg-white border border-slate-200 rounded-lg p-8 md:p-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Let&apos;s Connect</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Direct Communication</h3>
                <p className="text-slate-600 mb-4">
                  The best way to reach me is via email. I try to respond within 24 hours.
                </p>
                <a
                  href={`mailto:${SITE_METADATA.email}`}
                  className="inline-block px-6 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors"
                >
                  {SITE_METADATA.email}
                </a>
              </div>

              <div className="border-t border-slate-200 pt-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Social & Web</h3>
                <p className="text-slate-600 mb-4">
                  You can also find me on these platforms:
                </p>
                <div className="space-y-3">
                  {SOCIAL_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      <span>→</span>
                      <span>{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-200 pt-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4">What I&apos;m Looking For</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex gap-3">
                    <span className="text-cyan-600 font-bold">✓</span>
                    <span>Full-time roles with product-focused companies</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-cyan-600 font-bold">✓</span>
                    <span>Technical leadership and architecture opportunities</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-cyan-600 font-bold">✓</span>
                    <span>Meaningful problems with passionate teams</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-cyan-600 font-bold">✓</span>
                    <span>Opportunities to own products end-to-end</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
