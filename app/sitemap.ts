import type { MetadataRoute } from 'next';
import { SITE_METADATA } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    '',
    '/about',
    '/projects',
    '/projects/datadustr-tools',
    '/projects/as-i-left-it',
    '/projects/framed',
    '/projects/timely',
    '/projects/cirrus',
    '/work/enterprise',
    '/experience',
    '/resume',
    '/contact',
  ];

  return routes.map((route) => ({
    url: `${SITE_METADATA.siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/projects' ? 0.9 : 0.8,
  }));
}
