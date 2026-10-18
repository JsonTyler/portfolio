import type { Metadata, Viewport } from 'next';
import { URL } from 'node:url';
import { ThemeEffects } from '@/components/ThemeEffects';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SITE_METADATA } from '@/lib/constants';
import '@/styles/globals.css';
import densityStyles from '@/styles/density.module.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_METADATA.siteUrl),
  title: {
    default: SITE_METADATA.title,
    template: `%s | ${SITE_METADATA.title}`,
  },
  description: SITE_METADATA.description,
  authors: [{ name: SITE_METADATA.author }],
  creator: SITE_METADATA.author,
  keywords: [
    'software engineer',
    'front-end engineer',
    'product design',
    'frontend',
    'backend',
    'TypeScript',
    'React',
    'Next.js',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_METADATA.siteUrl,
    siteName: SITE_METADATA.siteName,
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
  },
  twitter: {
    card: 'summary',
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'dark light',
  themeColor: '#080d10',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="hacker" suppressHydrationWarning>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <ThemeEffects />
        <div className={`site-shell flex flex-col min-h-screen bg-slate-50 ${densityStyles.shell}`} style={{ zIndex: 'auto' }}>
          <Header />
          <main id="main-content" tabIndex={-1} className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
