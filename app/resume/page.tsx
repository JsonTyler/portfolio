import { Metadata } from 'next';
import { ResumeContent } from '@/components/ResumeContent';

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Resume and professional summary for Jason Tyler Rodriguez.',
};

export default function ResumePage() {
  return <ResumeContent />;
}
