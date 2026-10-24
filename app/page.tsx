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
  title: 'Front-end engineering & UX',
  description: 'Jason Tyler Rodriguez — eight years of professional front-end experience, with a strong UX focus.',
  alternates: { canonical: '/' },
};
export default function Home() {
  return <PortfolioDesktop
    projects={[...getSelectedProjects(), ...getCollegeProjects()]}
    pages={{ experience: <ExperiencePage />, about: <AboutDesktop />, resume: <ResumePage />, contact: <ContactPage /> }}
    stories={{ 'datadustr-tools': <DataDustrDesktopStory />, cirrus: <CirrusCaseStudy />, framed: <FramedCaseStudy />, timely: <TimelyCaseStudy /> }}
  />;
}
