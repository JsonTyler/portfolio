import { ExperienceContent } from '@/components/ExperienceContent';
import { ResumeContent } from '@/components/ResumeContent';
import AboutPage from './about/page';
import { DesignLibraryCaseStudy } from '@/content/case-studies/design-library';
import { DataDustrDesktopStory } from '@/content/case-studies/datadustr-tools';
import { CirrusCaseStudy } from '@/content/case-studies/cirrus';
import { ThreadkeepCaseStudy } from '@/content/case-studies/threadkeep';
import { TimelyCaseStudy } from '@/content/case-studies/timely';
import type { Metadata } from 'next';
import { PortfolioDesktop } from '@/components/PortfolioDesktop';
import { getWorkspaceProjects } from '@/content/projects';
import { DesktopEnterprise } from '@/components/DesktopDocuments';
import ContactPage from './contact/page';

export const metadata: Metadata = {
  title: 'Senior front-end engineer & UX lead',
  description: 'Jason Tyler Rodriguez — senior front-end engineer and UX lead. Enterprise workflows, reusable components, interactive product demos, and published digital-forensics research.',
  alternates: { canonical: '/' },
};
export default function Home() {
  return <PortfolioDesktop
    projects={getWorkspaceProjects()}
    pages={{ 'design-library': <DesktopEnterprise />, experience: <ExperienceContent embedded />, about: <AboutPage />, resume: <ResumeContent embedded />, contact: <ContactPage /> }}
    details={{ 'design-library': <DesignLibraryCaseStudy />, 'datadustr-tools': <DataDustrDesktopStory />, cirrus: <CirrusCaseStudy />, threadkeep: <ThreadkeepCaseStudy embedded />, timely: <TimelyCaseStudy /> }}
  />;
}
