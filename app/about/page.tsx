import { Metadata } from 'next';
import { ButtonLink } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about me, my engineering philosophy, and my approach to building products.',
};

export default function AboutPage() {
  return (
    <>
      <section className="gradient-bg text-white section-padding-lg border-b">
        <div className="container-max max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Building Products That Matter</h1>
          <p className="text-lg md:text-xl text-slate-100 leading-relaxed max-w-3xl">
            I'm a full-stack software engineer with product thinking and design sensibility. I don't specialize in one area—I integrate across technical architecture, product vision, UX, and business strategy.
          </p>
        </div>
      </section>

      <section className="section-padding-lg">
        <div className="container-max max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">How I Work</h2>
          <div className="space-y-8 text-slate-700 leading-relaxed mb-12">
            <p>
              I believe the best software comes from understanding problems deeply before building solutions. My approach starts with curiosity: Who are the users? What's the real problem, not the stated problem? Why hasn't someone solved this already?
            </p>
            <p>
              Once I understand the problem, I design from first principles. What's the simplest solution that works? What are the non-obvious tradeoffs? How do we build this to scale? I'm comfortable making architectural decisions with incomplete information—that's the nature of building products. What matters is thinking through the implications carefully.
            </p>
            <p>
              I combine three perspectives that rarely exist together:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              <Card variant="outlined">
                <h3 className="font-bold text-slate-900 mb-2">Technical Depth</h3>
                <p className="text-slate-700 text-sm">
                  Systems architecture, performance optimization, scalability thinking. Code that's maintainable, testable, and production-ready.
                </p>
              </Card>
              <Card variant="outlined">
                <h3 className="font-bold text-slate-900 mb-2">Product Thinking</h3>
                <p className="text-slate-700 text-sm">
                  Identifying market opportunities, understanding user problems, making strategic tradeoffs. Engineering for business outcomes, not just elegant code.
                </p>
              </Card>
              <Card variant="outlined">
                <h3 className="font-bold text-slate-900 mb-2">Design Sensibility</h3>
                <p className="text-slate-700 text-sm">
                  UX that delights without being flashy. Visual hierarchy and consistency. Systems thinking applied to design. Accessibility by default.
                </p>
              </Card>
            </div>
            <p>
              Most engineers pick one path. I've chosen to develop depth in all three. It's made me more effective than any single specialization could.
            </p>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-8">My Journey</h2>
          <div className="space-y-8 text-slate-700 leading-relaxed">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Act 1: Foundation (2015–2017)</h3>
              <p>
                I started as a CS student at Jackson State University on a full scholarship. Rather than just completing coursework, I got involved in academic research. I worked on a project called Timely—a data visualization tool for digital forensic investigators managing chain of custody information. That work was published at IEEE Southeast Con 2019.
              </p>
              <p className="text-sm text-slate-600 mt-2">
                <strong>What I learned:</strong> How to approach problems rigorously. How to go deep into a domain. How to communicate findings formally. That quality work gets recognized.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Act 2: Complex Systems (2018–2020)</h3>
              <p>
                I joined Lockheed Martin, working on aeronautics research and F-22 flight systems simulation. I worked with Python, C++, and real-time systems. Got an excellence rating on my 2018 performance review. This was high-stakes work where bugs had consequences.
              </p>
              <p className="text-sm text-slate-600 mt-2">
                <strong>What I learned:</strong> How to think about complex systems at scale. How to handle real-time performance constraints. How to work on problems where reliability isn't negotiable. That precision and clear thinking matter enormously.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Act 3: User-Centered Engineering (2020–2022)</h3>
              <p>
                I moved to Moses Lake Industries to focus on frontend and UX. I designed internal UIs for complex software. Learned Blazor and C# while watching the ecosystem evolve. This was my first time thinking deeply about user experience—how engineering decisions impact users directly.
              </p>
              <p className="text-sm text-slate-600 mt-2">
                <strong>What I learned:</strong> That good engineering isn't measured in compile time—it's measured in user satisfaction and business results. That UX considerations should shape architectural decisions from the start, not be applied afterwards.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Act 4: Design Systems & Scale (2022–Present)</h3>
              <p>
                I joined Springbrook Software as a frontend engineer. Quickly moved into UX design and took ownership of the design library powering Cirrus, their ERP platform serving 1000+ enterprise customers. I led the design system effort that unified visual design, components, and patterns across the entire product.
              </p>
              <p className="text-sm text-slate-600 mt-2">
                <strong>What I learned:</strong> How to scale design thinking across a product and team. How to make decisions that benefit thousands of customers. That design systems are as much organizational as technical—they're about enabling teams to move faster while maintaining quality.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Act 5: Product Ownership (2022–Present, Parallel)</h3>
              <p>
                In parallel with Springbrook, I founded DataDustr—a company focused on helping professionals reclaim digital space through intelligent cleanup of email and files. This taught me everything: product strategy, business planning, technical architecture choices, design system thinking, hiring decisions, how to prioritize ruthlessly, how to ship something real.
              </p>
              <p className="text-sm text-slate-600 mt-2">
                <strong>What I learned:</strong> That I can own the complete value chain—from identifying a market problem through building the solution through bringing it to market. That you learn more from actually building things than from any amount of planning. That mistakes are tuition in the school of product development.
              </p>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-8 mt-12">What Motivates Me</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed mb-12">
            <p>
              I'm motivated by two things:
            </p>
            <div className="space-y-3">
              <div className="flex gap-4 items-start">
                <span className="text-cyan-600 font-bold text-2xl flex-shrink-0">→</span>
                <div>
                  <p>
                    <strong>Solving real problems for real users.</strong> I'm energized when I can identify a genuine problem and build a solution that genuinely helps. Not abstract engineering problems—actual user problems that affect people's work and lives.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="text-cyan-600 font-bold text-2xl flex-shrink-0">→</span>
                <div>
                  <p>
                    <strong>Building systems and teams to scale.</strong> Small, scrappy solutions are fun. But I'm most energized when I can architect solutions that work for thousands of users, maintain design consistency across products, and enable teams to move quickly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-8">Why I Approach Engineering This Way</h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            I've observed that the best software comes from integration, not specialization. Companies need:
          </p>
          <ul className="space-y-3 text-slate-700 mb-12">
            <li className="flex gap-4 items-start">
              <span className="font-bold text-slate-900 flex-shrink-0">❌</span>
              <span><strong>Not</strong> just narrow specialists who optimize for one dimension</span>
            </li>
            <li className="flex gap-4 items-start">
              <span className="font-bold text-cyan-600 flex-shrink-0">✓</span>
              <span><strong>But rather</strong> integrators who bridge engineering, design, and product</span>
            </li>
            <li className="flex gap-4 items-start">
              <span className="font-bold text-slate-900 flex-shrink-0">❌</span>
              <span><strong>Not</strong> pure engineering divorced from user needs</span>
            </li>
            <li className="flex gap-4 items-start">
              <span className="font-bold text-cyan-600 flex-shrink-0">✓</span>
              <span><strong>But rather</strong> engineers who understand user psychology and product strategy</span>
            </li>
            <li className="flex gap-4 items-start">
              <span className="font-bold text-slate-900 flex-shrink-0">❌</span>
              <span><strong>Not</strong> pure product thinking without technical rigor</span>
            </li>
            <li className="flex gap-4 items-start">
              <span className="font-bold text-cyan-600 flex-shrink-0">✓</span>
              <span><strong>But rather</strong> product leaders who understand architectural tradeoffs</span>
            </li>
          </ul>

          <p className="text-slate-700 leading-relaxed mb-12">
            Great software happens at the intersection. Most people pick one lane. I've chosen to develop genuine depth in all three—that's my differentiation.
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mb-8">Outside of Work</h2>
          <p className="text-slate-700 leading-relaxed mb-12">
            I live in the Pacific Northwest with three cats. I travel frequently (18 states and counting). I code for fun—there's something deeply satisfying about building something just because it's interesting, without the pressure of commercial success.
          </p>

          <Card className="bg-cyan-50 border-cyan-200" variant="outlined">
            <p className="text-slate-900 mb-4 leading-relaxed">
              I'm looking for a role where I can leverage all of these perspectives—technical depth, product thinking, design sensibility, and leadership capability. I want to work on problems that matter, with people who care about quality, in teams that value both craftsmanship and business results.
            </p>
            <p className="text-slate-900 mb-6">
              If you're building something interesting and need someone who can think across the full stack of software development—let's talk.
            </p>
            <ButtonLink href="/contact" variant="primary" size="md">
              Get In Touch
            </ButtonLink>
          </Card>
        </div>
      </section>
    </>
  );
}
