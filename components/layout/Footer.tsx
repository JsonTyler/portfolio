import Link from 'next/link';
import { SITE_METADATA, SOCIAL_LINKS } from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-max py-2.5 md:py-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:items-center">
          <p className="text-xs md:text-sm text-slate-600">
            © {currentYear} {SITE_METADATA.author}. Building practical software with thoughtful UX.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 md:justify-end">
            <Link href="/projects" className="text-xs md:text-sm text-slate-600 transition-standard focus-ring hover:text-amber-700 hover:underline hover:decoration-2 hover:underline-offset-4">Case studies</Link>
            <a href="/resume/Jason-Rodriguez-Resume.pdf" target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm text-slate-600 transition-standard focus-ring hover:text-amber-700 hover:underline hover:decoration-2 hover:underline-offset-4">Resume PDF</a>
            <a href="https://datadustr.com/" target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm text-slate-600 transition-standard focus-ring hover:text-amber-700 hover:underline hover:decoration-2 hover:underline-offset-4">DataDustr</a>
            <a href="https://tools.datadustr.com/" target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm text-slate-600 transition-standard focus-ring hover:text-amber-700 hover:underline hover:decoration-2 hover:underline-offset-4">DataDustrTools</a>
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs md:text-sm text-slate-600 transition-standard focus-ring hover:text-amber-700 hover:underline hover:decoration-2 hover:underline-offset-4"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
