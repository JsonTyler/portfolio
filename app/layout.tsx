import type { Metadata, Viewport } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SITE_METADATA } from '@/lib/constants';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: SITE_METADATA.title,
    template: `%s | ${SITE_METADATA.title}`,
  },
  description: SITE_METADATA.description,
  authors: [{ name: SITE_METADATA.author }],
  creator: SITE_METADATA.author,
  keywords: [
    'software engineer',
    'full-stack developer',
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
    card: 'summary_large_image',
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
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'light',
  themeColor: '#1e293b',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#1e293b" />
        <meta name="description" content={SITE_METADATA.description} />
      </head>
      <body>
        <div className="flex flex-col min-h-screen bg-slate-50">
          <Header />
          <main className="flex-1" role="main">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
