 'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { SITE_METADATA, NAVIGATION } from '@/lib/constants';

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const currentPath = pathname;
  const isActive = (href: string) =>
    href === '/'
      ? currentPath === href
      : currentPath === href || currentPath.startsWith(`${href}/`);


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
        <nav className="desktop-navigation" aria-label="Main navigation">
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

        <div className="desktop-theme-controls"><ThemeSwitcher /></div>

        <button
          type="button"
          ref={menuButtonRef}
          className="mobile-menu-toggle p-2 text-slate-600 focus-ring"
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
        <nav id="mobile-navigation" className="mobile-navigation border-t border-slate-200 px-4 pb-4" aria-label="Mobile navigation">
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
          <div className="mobile-theme-controls"><span>Theme</span><ThemeSwitcher /></div>
        </nav>
      )}
    </header>
  );
}
