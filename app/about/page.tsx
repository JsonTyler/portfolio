import { Metadata } from 'next';
import { ButtonLink } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about me and my approach to engineering and product.',
};

export default function AboutPage() {
  return (
    <>
      <section className="gradient-bg text-white section-padding-lg border-b">
        <div className="container-max max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About Me</h1>
          <p className="text-lg md:text-xl text-slate-100 leading-relaxed max-w-3xl">
            I'm a full-stack engineer passionate about building products that solve real problems. With experience spanning frontend, backend, and product design, I bring a holistic perspective to software development.
          </p>
        </div>
      </section>

      <section className="section-padding-lg">
        <div className="container-max max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">The Story</h2>
          <div className="space-y-6 text-slate-700 leading-relaxed">
            <p>
              I started my career at Lockheed Martin, working on aeronautics research and F-22 flight systems. This experience taught me the importance of precision, reliability, and clear communication in software. I learned to think about systems at scale and the human cost of bugs in critical software.
            </p>
            <p>
              Later, I shifted focus to product-focused companies and design systems, working with Springbrook Software where I led the design library and user experience for their Cirrus ERP platform serving 1000+ users. I discovered a passion for bridging the gap between engineering excellence and user satisfaction.
            </p>
            <p>
              More recently, I founded DataDustr—a digital organization platform helping professionals reclaim digital space. This venture encompasses everything from product ideation and brand development to architecture design and full-stack implementation. It's taught me what it means to own a product end-to-end.
            </p>
            <p>
              My unique strength is combining software engineering excellence with product thinking and design sensibility. I believe the best software comes from understanding user problems deeply and solving them with elegant technical solutions.
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mt-16 mb-8">What Drives Me</h2>
          <ul className="space-y-4 text-slate-700">
            <li className="flex gap-4 items-start">
              <span className="text-cyan-600 font-bold text-xl flex-shrink-0">→</span>
              <span>Building products that solve real problems for real users</span>
            </li>
            <li className="flex gap-4 items-start">
              <span className="text-cyan-600 font-bold text-xl flex-shrink-0">→</span>
              <span>Thoughtful architecture that scales without unnecessary complexity</span>
            </li>
            <li className="flex gap-4 items-start">
              <span className="text-cyan-600 font-bold text-xl flex-shrink-0">→</span>
              <span>User experience that delights without being flashy</span>
            </li>
            <li className="flex gap-4 items-start">
              <span className="text-cyan-600 font-bold text-xl flex-shrink-0">→</span>
              <span>Teams that move fast and maintain high standards</span>
            </li>
          </ul>

          <Card className="mt-12 bg-cyan-50 border-cyan-200" variant="outlined">
            <p className="text-slate-900 mb-4 leading-relaxed">
              Ready to collaborate? I'm interested in roles where I can own products end-to-end and make a meaningful impact on passionate teams.
            </p>
            <ButtonLink href="/contact" variant="primary" size="md">
              Let&apos;s Talk
            </ButtonLink>
          </Card>
        </div>
      </section>
    </>
  );
}
