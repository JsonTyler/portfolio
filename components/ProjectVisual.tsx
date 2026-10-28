import Image from 'next/image';
import { CirrusScreens } from './CirrusScreens';
import { FramedDemo } from './FramedDemo';
import { InboxDemo } from './InboxDemo';
import { TimelyDemo } from './TimelyDemo';
import { ThreadkeepPreview } from './ThreadkeepPreview';
import { ProjectViewport } from './ProjectViewport';

const visuals: Record<string, { src: string; alt: string; caption?: string }> = {
  'as-i-left-it': {
    src: '/projects/as-i-left-it.svg',
    alt: 'An illustrated handoff note connects to a return-to-work card with a saved next move and a Resume work action.',
    caption: 'Concept illustration · fictional work, not an application screenshot',
  },
  'datadustr-website': {
    src: '/projects/datadustr-website.svg',
    alt: 'DataDustr service site with its dark background, red accents, service proposition, and consultation call to action.',
    caption: 'Source-based service-site illustration',
  },

};

export function ProjectVisual({ slug, title, priority = false, embedded = false }: { slug: string; title: string; priority?: boolean; embedded?: boolean }) {
  return <ProjectViewport embedded={embedded}><ProjectContent slug={slug} title={title} priority={priority} embedded={embedded} /></ProjectViewport>;
}

function ProjectContent({ slug, title, priority = false, embedded = false }: { slug: string; title: string; priority?: boolean; embedded?: boolean }) {
  if (slug === 'threadkeep') return <ThreadkeepPreview priority={priority} />;
  if (slug === 'framed') return <FramedDemo />;
  if (slug === 'datadustr-tools') return <InboxDemo />;
  if (slug === 'timely') return <TimelyDemo />;
  if (slug === 'cirrus') return <CirrusScreens priority={priority} embedded={embedded} />;
  const visual = visuals[slug];
  if (!visual) return null;
  return <figure className="project-visual" aria-label={`${title} preview`} style={{ position: 'relative', zIndex: 3 }}>
    <div className="project-visual-frame" style={{ backgroundColor: '#0f172a' }}>
      <Image src={visual.src} alt={visual.alt} width={1200} height={780} sizes="(min-width: 900px) 760px, 100vw" unoptimized priority={priority} />
    </div>
    <figcaption><span>{visual.caption ?? 'Source-based illustration · sample data'}</span></figcaption>
  </figure>;
}
