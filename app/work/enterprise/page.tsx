import type { Metadata } from 'next';
import { DesignLibraryCaseStudy } from '@/content/case-studies/design-library';

export const metadata: Metadata = {
  title: 'Enterprise UX & component-library work',
  description: 'Design Library ownership, UX leadership, and front-end delivery at Springbrook Software.',
  alternates: { canonical: '/work/enterprise' },
};

export default function EnterpriseWorkPage() {
  return <>
    <nav className="container-max story-navigation" aria-label="Return to portfolio"><a className="story-link focus-ring" href="/#design-library">← Back to portfolio</a></nav>
    <DesignLibraryCaseStudy />
  </>;
}
