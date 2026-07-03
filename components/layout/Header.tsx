import Link from 'next/link';
import { SITE_METADATA, NAVIGATION } from '@/lib/constants';

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
      <div className="container-max flex items-center justify-between py-4">
        <Link href="/" className="font-bold text-xl text-slate-900 hover:text-cyan-600 transition-colors">
          {SITE_METADATA.siteName}
        </Link>
        <nav className="hidden md:flex gap-8">
          {NAVIGATION.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
