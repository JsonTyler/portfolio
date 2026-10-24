'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';

export function SiteHeader() {
  return usePathname() === '/' ? null : <Header />;
}

export function SiteFooter() {
  return usePathname() === '/' ? null : <Footer />;
}
