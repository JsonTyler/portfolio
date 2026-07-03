import { Metadata } from 'next';
import { ButtonLink } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about me and my approach to engineering and product.',
};

export default function AboutPage() {
  return (
    <>
      <section className="section-padding bg-slate-50 border-b border-slate-200">
        <div className="container-max">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Me</h1>
          <p className="text-lg text-slate-600 max-w-3xl">
            I&apos;m a full-stack engineer passionate about building products that solve real problems. 
            With experience spanning frontend, backend, and product design, I bring a holistic perspective 
            to software development.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">The Story</h2>
          <div className="space-y-6 text-slate-700 leading-relaxed">
            <p>
              I started my career at Lockheed Martin, working on aeronautics research and F-22 flight systems. 
              This experience taught me the importance of precision, reliability, and clear communication in software.
            </p>
            <p>
              Later, I shifted focus to product-focused companies and design systems, working with Springbrook Software 
              where I led the design library and user experience for their Cirrus ERP platform serving 1000+ users.
            </p>
            <p>
              More recently, I founded DataDustr—a digital organization platform helping professionals reclaim digital space. 
              This venture encompasses everything from product ideation and brand development to architecture design and full-stack implementation.
            </p>
            <p>
              My unique strength is combining software engineering excellence with product thinking and design sensibility. 
              I believe the best software comes from understanding user problems deeply and solving them with elegant technical solutions.
            </p>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6">What Drives Me</h2>
          <ul className="space-y-4 text-slate-700">
            <li className="flex gap-4">
              <span className="text-cyan-600 font-bold">→</span>
              <span>Building products that solve real problems for real users</span>
            </li>
            <li className="flex gap-4">
              <span className="text-cyan-600 font-bold">→</span>
              <span>Thoughtful architecture that scales without unnecessary complexity</span>
            </li>
            <li className="flex gap-4">
              <span className="text-cyan-600 font-bold">→</span>
              <span>User experience that delights without being flashy</span>
            </li>
            <li className="flex gap-4">
              <span className="text-cyan-600 font-bold">→</span>
              <span>Teams that move fast and maintain high standards</span>
            </li>
          </ul>

          <div className="mt-12 p-8 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-slate-700 mb-4">
              Ready to collaborate? I&apos;m interested in roles where I can own products end-to-end 
              and make a meaningful impact.
            </p>
            <ButtonLink href="/contact" variant="primary" size="md">
              Let&apos;s Talk
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
