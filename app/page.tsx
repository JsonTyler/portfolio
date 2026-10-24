import type { Metadata } from 'next';
import { PortfolioDesktop } from '@/components/PortfolioDesktop';
import { getCollegeProjects, getSelectedProjects } from '@/content/projects';
import ExperiencePage from './experience/page';
import { AboutDesktop } from '@/components/AboutDesktop';
import ResumePage from './resume/page';
import ContactPage from './contact/page';
import { DataDustrDesktopStory } from '@/content/case-studies/datadustr-tools';
import { CirrusCaseStudy } from '@/content/case-studies/cirrus';
import { FramedCaseStudy } from '@/content/case-studies/framed';
import { TimelyCaseStudy } from '@/content/case-studies/timely';

export const metadata: Metadata = {
  title: 'Senior front-end engineer & UX lead',
  description: 'Jason Tyler Rodriguez — senior front-end engineer and UX lead. Enterprise workflows, reusable components, interactive product demos, and published digital-forensics research.',
  alternates: { canonical: '/' },
};
export default function Home() {
  return <PortfolioDesktop
    projects={[...getSelectedProjects(), ...getCollegeProjects()]}
    pages={{ experience: <ExperiencePage />, about: <AboutDesktop />, resume: <ResumePage />, contact: <ContactPage /> }}
    stories={{ 'datadustr-tools': <DataDustrDesktopStory />, cirrus: <CirrusCaseStudy />, framed: <FramedCaseStudy />, timely: <TimelyCaseStudy /> }}
  />;
}
