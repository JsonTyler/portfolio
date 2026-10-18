 'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { SITE_METADATA, NAVIGATION } from '@/lib/constants';

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [themeReady, setThemeReady] = useState(false);
  const [theme, setTheme] = useState<'winter' | 'midnight' | 'hacker'>('hacker');

  const isActive = (href: string) =>
    href === '/'
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    try {
      const saved = globalThis.localStorage.getItem('portfolio-theme');
      if (saved === 'winter' || saved === 'midnight' || saved === 'hacker') setTheme(saved);
    } catch { /* Storage may be unavailable; keep the default theme. */ }
    setThemeReady(true);
  }, []);

  useEffect(() => {
    if (!themeReady) return;
    globalThis.document.documentElement.setAttribute('data-theme', theme);
    try { globalThis.localStorage.setItem('portfolio-theme', theme); } catch { /* Theme still works without persistence. */ }
  }, [theme, themeReady]);



  return (
    <header onKeyDown={(event) => { if (event.key === 'Escape' && isMobileMenuOpen) { setIsMobileMenuOpen(false); menuButtonRef.current?.focus(); } }} className="border-b border-slate-200 bg-white sticky top-0 z-40 transition-standard">
      <div className="container-max site-header-row py-3">
        <Link
          href="/"
          className="site-name font-bold text-xl text-slate-900 transition-standard focus-ring hover:text-amber-700 hover:underline hover:decoration-2 hover:underline-offset-4"
          aria-label="Jason Tyler Rodriguez - Home"
        >
          {SITE_METADATA.siteName}
        </Link>
        <nav className="hidden lg:flex gap-5" aria-label="Main navigation">
          {NAVIGATION.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={`transition-standard font-medium focus-ring hover:underline hover:decoration-2 hover:underline-offset-4 ${
                isActive(item.href)
                  ? 'text-slate-900 hover:text-slate-900'
                  : 'text-slate-600 hover:text-amber-700'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="theme-controls flex items-center bg-zinc-800/60 border border-zinc-700/50 rounded-full p-1 shrink-0 mr-2">
          <button
            type="button"
            onClick={() => setTheme('winter')}
            aria-pressed={theme === 'winter'}
            aria-label="Switch to winter theme"
            className={`theme-toggle-btn p-2 rounded-full border transition-all duration-150 focus-ring hover:underline hover:decoration-2 hover:underline-offset-4 ${
              theme === 'winter'
                ? 'bg-zinc-200/10 text-zinc-300 border-zinc-400/45'
                : 'text-zinc-500 border-transparent hover:text-amber-700 hover:border-zinc-600/50'
            }`}
            title="Winter"
          >
            <svg aria-hidden viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M12 2v20M4.9 6l14.2 12M19.1 6L4.9 18M3 12h18" strokeLinecap="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setTheme('midnight')}
            aria-pressed={theme === 'midnight'}
            aria-label="Switch to midnight theme"
            className={`theme-toggle-btn p-2 rounded-full border transition-all duration-150 focus-ring hover:underline hover:decoration-2 hover:underline-offset-4 ${
              theme === 'midnight'
                ? 'bg-zinc-200/10 text-zinc-300 border-zinc-400/45'
                : 'text-zinc-500 border-transparent hover:text-amber-700 hover:border-zinc-600/50'
            }`}
            title="Midnight"
          >
            <svg aria-hidden viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M21 12.8A8.8 8.8 0 1 1 11.2 3a7 7 0 1 0 9.8 9.8Z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setTheme('hacker')}
            aria-pressed={theme === 'hacker'}
            aria-label="Switch to hacker theme"
            className={`theme-toggle-btn p-2 rounded-full border transition-all duration-150 focus-ring hover:underline hover:decoration-2 hover:underline-offset-4 ${
              theme === 'hacker'
                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-400/55'
                : 'text-zinc-500 border-transparent hover:text-amber-700 hover:border-zinc-600/50'
            }`}
            title="Hacker"
          >
            <svg aria-hidden viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.75">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="m7 9 3 3-3 3M13 15h4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <button
          type="button"
          ref={menuButtonRef}
          className="lg:hidden p-2 text-slate-600 focus-ring"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls={isMobileMenuOpen ? "mobile-navigation" : undefined}
          onClick={() => setIsMobileMenuOpen((open) => !open)}
        >
          <svg aria-hidden="true" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {isMobileMenuOpen && (
        <nav id="mobile-navigation" className="lg:hidden border-t border-slate-200 px-4 pb-4" aria-label="Mobile navigation">
          <ul className="space-y-1 pt-3">
            {NAVIGATION.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`block rounded-lg px-3 py-2 text-sm font-medium transition-standard focus-ring focus-visible:no-underline focus-visible:outline-2 focus-visible:outline-amber-700 focus-visible:outline-offset-2 hover:underline hover:decoration-2 hover:underline-offset-4 ${
                    isActive(item.href)
                      ? 'bg-slate-800 text-slate-100 hover:text-slate-100'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-amber-700'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
