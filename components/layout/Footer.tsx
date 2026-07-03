import Link from 'next/link';
import { SITE_METADATA, SOCIAL_LINKS } from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-slate-900 mb-2">{SITE_METADATA.siteName}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{SITE_METADATA.description}</p>
          </div>
          <nav aria-label="Footer navigation">
            <h4 className="font-bold text-slate-900 mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-slate-600 hover:text-slate-900 text-sm block transition-standard focus-ring">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-600 hover:text-slate-900 text-sm block transition-standard focus-ring">
                  About
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-slate-600 hover:text-slate-900 text-sm block transition-standard focus-ring">
                  Work
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 hover:text-slate-900 text-sm block transition-standard focus-ring">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Connect</h4>
            <ul className="space-y-2">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-slate-900 text-sm block transition-standard focus-ring"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-200 pt-8">
          <p className="text-slate-600 text-sm text-center">
            © {currentYear} {SITE_METADATA.author}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
