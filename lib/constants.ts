import type { SiteMetadata } from './types';

export const SITE_METADATA: SiteMetadata = {
  title: 'Jason Tyler Rodriguez',
  description:
    'Front-end engineer with eight years of professional experience and a strong UX focus.',
  author: 'Jason Tyler Rodriguez',
  email: 'jasontylerrodriguez@gmail.com',
  github: 'https://github.com/JsonTyler',
  linkedin: 'https://www.linkedin.com/in/jason-tyler-rodriguez/',
  siteName: 'Jason Tyler Rodriguez',
  siteUrl: 'https://www.jasontylerrodriguez.com',
};

export const NAVIGATION = [
  { label: 'Work', href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'About', href: '/about' },
  { label: 'Résumé', href: '/resume' },
  { label: 'Contact', href: '/contact' },
];

export const SOCIAL_LINKS = [
  { label: 'GitHub', href: SITE_METADATA.github },
  { label: 'LinkedIn', href: SITE_METADATA.linkedin },
];
