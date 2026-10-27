import ExperiencePage from './experience/page';
import ResumePage from './resume/page';
import AboutPage from './about/page';
import { DesignLibraryCaseStudy } from '@/content/case-studies/design-library';
import { DataDustrDesktopStory } from '@/content/case-studies/datadustr-tools';
import { CirrusCaseStudy } from '@/content/case-studies/cirrus';
import { FramedCaseStudy } from '@/content/case-studies/framed';
import { TimelyCaseStudy } from '@/content/case-studies/timely';
import type { Metadata } from 'next';
import { PortfolioDesktop } from '@/components/PortfolioDesktop';
import { getCollegeProjects, getSelectedProjects } from '@/content/projects';
import { DesktopEnterprise, DesktopExperience, DesktopResume } from '@/components/DesktopDocuments';
import { AboutDesktop } from '@/components/AboutDesktop';
import ContactPage from './contact/page';

export const metadata: Metadata = {
  title: 'Senior front-end engineer & UX lead',
  description: 'Jason Tyler Rodriguez — senior front-end engineer and UX lead. Enterprise workflows, reusable components, interactive product demos, and published digital-forensics research.',
  alternates: { canonical: '/' },
};
export default function Home() {
  return <PortfolioDesktop
    projects={[...getSelectedProjects(), ...getCollegeProjects()]}
    pages={{ 'design-library': <DesktopEnterprise />, experience: <DesktopExperience />, about: <AboutDesktop />, resume: <DesktopResume />, contact: <ContactPage /> }}
    details={{ experience: <ExperiencePage />, resume: <ResumePage />, about: <AboutPage />, 'design-library': <DesignLibraryCaseStudy />, 'datadustr-tools': <DataDustrDesktopStory />, cirrus: <CirrusCaseStudy />, framed: <FramedCaseStudy />, timely: <TimelyCaseStudy /> }}
  />;
}
