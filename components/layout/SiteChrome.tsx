'use client';
import { LocalizedContent } from '@/components/LanguageProvider';


import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';

export function SiteHeader() {
  return <LocalizedContent>{usePathname() === '/' ? null : <Header />}</LocalizedContent>;
}

export function SiteFooter() {
  return <LocalizedContent>{usePathname() === '/' ? null : <Footer />}</LocalizedContent>;
}
