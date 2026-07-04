import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Jason Tyler Rodriguez Portfolio',
    short_name: 'JTR Portfolio',
    description: 'Senior full-stack software engineering portfolio for Jason Tyler Rodriguez.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8fafc',
    theme_color: '#1e293b',
    icons: [],
  };
}
