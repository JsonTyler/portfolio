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
      <section className="gradient-bg text-white hero-padding border-b">
        <div className="container-max max-w-4xl">
          <h1 className="hero-title text-5xl md:text-6xl font-bold mb-6">About Jason Rodriguez</h1>
          <p className="hero-subtitle text-lg md:text-xl leading-relaxed max-w-3xl">
            I&apos;m a full-stack software engineer who connects technical decisions to user needs and business goals.
          </p>
        </div>
      </section>

      <section className="section-padding-lg">
        <div className="container-max max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">How I Work</h2>
          <div className="space-y-8 text-slate-700 leading-relaxed mb-12">
            <p>
              I believe good software starts with understanding the real problem before writing code. I ask simple questions first: who are the users, what is slowing them down, and what result matters most?
            </p>
            <p>
              Then I focus on the simplest solution that works well. I weigh tradeoffs, plan for growth, and make clear decisions even when not every detail is known yet.
            </p>
            <p>
              I bring three perspectives together:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              <Card variant="outlined">
                <h3 className="font-bold text-slate-900 mb-2">Technical Depth</h3>
                <p className="text-slate-700 text-sm">
                  Strong technical foundations, reliable systems, and code that teams can maintain long-term.
                </p>
              </Card>
              <Card variant="outlined">
                <h3 className="font-bold text-slate-900 mb-2">Product Thinking</h3>
                <p className="text-slate-700 text-sm">
                  Focus on customer value, clear priorities, and business outcomes, not just technical output.
                </p>
              </Card>
              <Card variant="outlined">
                <h3 className="font-bold text-slate-900 mb-2">Design Sensibility</h3>
                <p className="text-slate-700 text-sm">
                  Clean, consistent user experiences that are easy to navigate and accessible by default.
                </p>
              </Card>
            </div>
            <p>
              Many engineers specialize in one area. I&apos;ve built depth across all three to help teams move faster with better results.
            </p>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-8">My Journey</h2>
          <div className="space-y-8 text-slate-700 leading-relaxed">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Act 1: Foundation (2015–2017)</h3>
              <p>
                I started as a CS student at Jackson State University on a full scholarship. Rather than just completing coursework, I got involved in academic research. I worked on a project called Timely, a data visualization tool for digital forensic investigators managing chain of custody information. That work was published at IEEE SoutheastCon 2019.
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
                I moved to Moses Lake Industries to focus on frontend and UX. I designed internal UIs for complex software. Learned Blazor and C# while watching the ecosystem evolve. This was my first time thinking deeply about user experience, and how engineering decisions impact users directly.
              </p>
              <p className="text-sm text-slate-600 mt-2">
                <strong>What I learned:</strong> Good engineering is not measured in compile time, it is measured in user satisfaction and business results. UX considerations should shape architectural decisions from the start, not be applied afterwards.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Act 4: Design Systems & Scale (2022–Present)</h3>
              <p>
                I joined Springbrook Software as a frontend engineer. Quickly moved into UX design and took ownership of the design library powering Cirrus, their ERP platform serving 1000+ enterprise customers. I led the design system effort that unified visual design, components, and patterns across the entire product.
              </p>
              <p className="text-sm text-slate-600 mt-2">
                <strong>What I learned:</strong> How to scale design thinking across a product and team. How to make decisions that benefit thousands of customers. Design systems are as much organizational as technical, they enable teams to move faster while maintaining quality.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Act 5: Product Ownership (2022–Present, Parallel)</h3>
              <p>
                In parallel with Springbrook, I founded DataDustr, a company concept focused on helping professionals reclaim digital space through intelligent cleanup of email and files. This taught me product strategy, business planning, technical architecture choices, design system thinking, hiring decisions, prioritization, and shipping discipline.
              </p>
              <p className="text-sm text-slate-600 mt-2">
                <strong>What I learned:</strong> I can own the complete value chain, from identifying a market problem through building the solution and bringing it to market. You learn more from building than from planning alone. Mistakes are tuition in product development.
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
                <span className="text-amber-600 font-bold text-2xl flex-shrink-0">→</span>
                <div>
                  <p>
                    <strong>Solving real problems for real users.</strong> I am energized when I can identify a genuine problem and build a solution that helps. Not abstract engineering problems, actual user problems that affect people's work and lives.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="text-amber-600 font-bold text-2xl flex-shrink-0">→</span>
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
              <span className="font-bold text-amber-600 flex-shrink-0">✓</span>
              <span><strong>But rather</strong> integrators who bridge engineering, design, and product</span>
            </li>
            <li className="flex gap-4 items-start">
              <span className="font-bold text-slate-900 flex-shrink-0">❌</span>
              <span><strong>Not</strong> pure engineering divorced from user needs</span>
            </li>
            <li className="flex gap-4 items-start">
              <span className="font-bold text-amber-600 flex-shrink-0">✓</span>
              <span><strong>But rather</strong> engineers who understand user psychology and product strategy</span>
            </li>
            <li className="flex gap-4 items-start">
              <span className="font-bold text-slate-900 flex-shrink-0">❌</span>
              <span><strong>Not</strong> pure product thinking without technical rigor</span>
            </li>
            <li className="flex gap-4 items-start">
              <span className="font-bold text-amber-600 flex-shrink-0">✓</span>
              <span><strong>But rather</strong> product leaders who understand architectural tradeoffs</span>
            </li>
          </ul>

          <p className="text-slate-700 leading-relaxed mb-12">
            Great software comes from connecting engineering, product, and design. That cross-functional approach is what I bring to teams.
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mb-8">Outside of Work</h2>
          <p className="text-slate-700 leading-relaxed mb-12">
            I live in the Pacific Northwest with three cats. I travel frequently (18 states and counting). I code for fun, there is something deeply satisfying about building something just because it is interesting, without the pressure of commercial success.
          </p>

          <Card className="bg-amber-50 border-amber-200" variant="outlined">
            <p className="text-slate-900 mb-4 leading-relaxed">
              I do my best work where technical quality, user experience, and business impact are all treated as important.
            </p>
            <p className="text-slate-900 mb-6">
              If that&apos;s what your team cares about, I&apos;d be glad to connect.
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
