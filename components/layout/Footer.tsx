import { SITE_METADATA, SOCIAL_LINKS } from '@/lib/constants';

export function Footer({ embedded = false }: { embedded?: boolean }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white" style={{ padding: 0 }}>
      <div className="container-max py-2.5 md:py-3">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center">
          <p className="footer-copy flex-1 min-w-0 text-xs md:text-sm text-slate-600">
            © {currentYear} {SITE_METADATA.author}{!embedded && '. Building practical software with thoughtful UX.'}
          </p>
          <div className="flex flex-wrap items-center gap-1 sm:justify-end">
            <div id="motion-control-slot" />
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                title={link.label}
                className="footer-social text-xs md:text-sm text-slate-600 transition-standard focus-ring hover:text-amber-700 hover:underline hover:decoration-2 hover:underline-offset-4"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" width="21" height="21">
                  {link.label === 'GitHub' ? (
                    <path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.68.08-.68 1.13.08 1.73 1.16 1.73 1.16 1 1.72 2.64 1.22 3.28.93.1-.73.39-1.22.71-1.5-2.5-.29-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.16-3.02-.12-.29-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.15A10.8 10.8 0 0 1 12 6.17c.96 0 1.92.13 2.82.38 2.15-1.45 3.09-1.15 3.09-1.15.62 1.55.23 2.69.12 2.98.72.79 1.16 1.79 1.16 3.02 0 4.32-2.63 5.27-5.14 5.55.4.35.76 1.03.76 2.08v3.1c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z" />
                  ) : (
                    <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.3 10.85H15.8v-4.64c0-1.1-.02-2.52-1.54-2.52-1.54 0-1.78 1.2-1.78 2.44v4.72H9.53V9.2h2.83v1.3h.04c.39-.74 1.36-1.53 2.79-1.53 2.98 0 3.56 1.96 3.56 4.5v5.28Z" />
                  )}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
