import Link from 'next/link';
import { SITE_METADATA, NAVIGATION } from '@/lib/constants';

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-40 transition-standard">
      <div className="container-max flex items-center justify-between py-4">
        <Link
          href="/"
          className="font-bold text-xl text-slate-900 hover:text-cyan-600 transition-standard focus-ring"
          aria-label="Jason Tyler Rodriguez - Home"
        >
          {SITE_METADATA.siteName}
        </Link>
        <nav className="hidden md:flex gap-8" aria-label="Main navigation">
          {NAVIGATION.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-slate-600 hover:text-slate-900 transition-standard font-medium focus-ring"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        {/* Mobile menu button (placeholder for Phase 4) */}
        <button
          className="md:hidden p-2 text-slate-600 hover:text-slate-900 focus-ring"
          aria-label="Toggle menu"
          aria-expanded="false"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}
