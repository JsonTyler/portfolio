import { Metadata } from 'next';
import { ExperienceContent } from '@/components/ExperienceContent';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'My professional background and career progression.',
};

export default function ExperiencePage() {
  return <ExperienceContent />;
}
