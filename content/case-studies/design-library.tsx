'use client';

import { Card } from '@/components/ui/Card';

export function DesignLibraryCaseStudy() {
  return (
    <>
      {/* Overview Section */}
      <section className="section-padding-lg">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Overview</h2>
          <p className="text-lg text-slate-700 leading-relaxed mb-8">
            As a frontend engineer at Springbrook Software, I took ownership of the design library—a comprehensive component system powering Cirrus, an enterprise ERP application serving 1000+ customers. This project demonstrates how design systems thinking and engineering discipline scale to enterprise products.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="outlined">
              <h3 className="font-bold text-slate-900 mb-1">Timeline</h3>
              <p className="text-slate-600">2022–present</p>
            </Card>
            <Card variant="outlined">
              <h3 className="font-bold text-slate-900 mb-1">Impact Scale</h3>
              <p className="text-slate-600">1000+ enterprise users</p>
            </Card>
            <Card variant="outlined">
              <h3 className="font-bold text-slate-900 mb-1">Role</h3>
              <p className="text-slate-600">Design Library owner & lead</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Context Section */}
      <section className="section-padding-lg bg-slate-50">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">The Context</h2>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">What is Cirrus?</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            Cirrus is Springbrook Software's flagship enterprise ERP (Enterprise Resource Planning) application. It serves school districts, municipalities, and other large organizations—customers who depend on reliable, scalable software for mission-critical operations. The application is complex: financial systems, human resources, procurement, inventory, and more.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">The Challenge: Consistency at Scale</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            Before the formal design library, Cirrus was built organically by multiple teams over years. Different modules looked slightly different. Components weren't always reused. Visual inconsistencies accumulated. For enterprise customers managing critical operations, this inconsistency created confusion and reduced confidence in the product.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">The Opportunity</h3>
          <p className="text-slate-700 leading-relaxed">
            I recognized that formalizing a design system could simultaneously:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 mt-3">
            <li>Improve user experience through consistency</li>
            <li>Accelerate development by providing reusable components</li>
            <li>Reduce technical debt and maintenance burden</li>
            <li>Enable scalability—new features built on solid foundations</li>
            <li>Improve product quality and user confidence</li>
          </ul>
        </div>
      </section>

      {/* Approach Section */}
      <section className="section-padding-lg">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Design System Approach</h2>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Auditing the Existing Product</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            Before building the design library, I conducted a comprehensive audit of the existing Cirrus codebase. The goal: understand what components existed, how they were implemented, and where inconsistencies had accumulated. This audit revealed:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6">
            <li>Buttons implemented in 5+ slightly different ways across the app</li>
            <li>Form components with varying patterns and behaviors</li>
            <li>Inconsistent color usage and typography</li>
            <li>Missing accessibility features in many components</li>
            <li>Duplicate code that could be consolidated</li>
          </ul>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Designing the System</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            Based on the audit, I designed a comprehensive design system that included:
          </p>

          <div className="space-y-4 mb-8">
            <div className="bg-white border border-slate-300 rounded-lg p-6">
              <h4 className="font-bold text-slate-900 mb-2">Typography System</h4>
              <p className="text-slate-700 leading-relaxed">
                Defined font scales, line heights, letter spacing, and weight usage. Clear rules for headlines, body text, and labels. Consistency in typography dramatically improves readability and professionalism.
              </p>
            </div>

            <div className="bg-white border border-slate-300 rounded-lg p-6">
              <h4 className="font-bold text-slate-900 mb-2">Color Palette</h4>
              <p className="text-slate-700 leading-relaxed">
                Established a primary color system, secondary colors, and semantic colors (success, warning, error). Every use of color across the application was standardized. This improved consistency and made it easier to update the entire product's aesthetic through centralized changes.
              </p>
            </div>

            <div className="bg-white border border-slate-300 rounded-lg p-6">
              <h4 className="font-bold text-slate-900 mb-2">Component Library</h4>
              <p className="text-slate-700 leading-relaxed">
                Built reusable components: buttons (with all variants), form inputs, cards, modals, navigation, tables, and more. Each component was designed with accessibility built-in, not bolted on.
              </p>
            </div>

            <div className="bg-white border border-slate-300 rounded-lg p-6">
              <h4 className="font-bold text-slate-900 mb-2">Spacing System</h4>
              <p className="text-slate-700 leading-relaxed">
                Defined spacing increments (8px base unit) used throughout. This created rhythm and visual harmony. New developers could build layouts that felt cohesive without designer oversight.
              </p>
            </div>

            <div className="bg-white border border-slate-300 rounded-lg p-6">
              <h4 className="font-bold text-slate-900 mb-2">Documentation & Guidelines</h4>
              <p className="text-slate-700 leading-relaxed">
                Wrote comprehensive documentation: when to use each component, how to use them, accessibility considerations, and code examples. Good systems are useless if nobody knows how to use them.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Implementation Strategy</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            Rather than requiring a complete rewrite of Cirrus, I took a pragmatic approach:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700">
            <li><strong>New Development:</strong> All new features built using design library components from day one</li>
            <li><strong>Incremental Migration:</strong> Existing components gradually refactored to use the library</li>
            <li><strong>Backwards Compatibility:</strong> New component system can coexist with older implementations during transition</li>
            <li><strong>Team Training:</strong> Documented how to use the library and why consistency matters</li>
          </ul>
        </div>
      </section>

      {/* Key Decisions Section */}
      <section className="section-padding-lg bg-slate-50">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Technical Architecture Decisions</h2>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Component Structure & Reusability</h3>
          <div className="bg-white border border-slate-300 rounded-lg p-6 mb-6">
            <p className="text-slate-700 leading-relaxed mb-3">
              <strong>Decision:</strong> Build each component with clear input/output contracts, making them reusable across different contexts.
            </p>
            <p className="text-slate-700 leading-relaxed mb-3">
              <strong>Example:</strong> The Button component accepts size, variant (primary/secondary/danger), disabled state, and icon props. By being specific about what can be customized, we prevent the proliferation of button variants while remaining flexible.
            </p>
            <p className="text-slate-700 leading-relaxed">
              <strong>Benefit:</strong> Developers don't have to make styling decisions for every button—the library makes those decisions. They focus on functionality and behavior.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Accessibility as Foundation</h3>
          <div className="bg-white border border-slate-300 rounded-lg p-6 mb-6">
            <p className="text-slate-700 leading-relaxed mb-3">
              <strong>Decision:</strong> Every component includes accessibility features by default—proper ARIA labels, keyboard navigation, focus management.
            </p>
            <p className="text-slate-700 leading-relaxed mb-3">
              <strong>Why It Matters:</strong> For an enterprise product, users include people with disabilities. Making accessibility optional means it gets neglected. Building it into every component means the entire product is accessible.
            </p>
            <p className="text-slate-700 leading-relaxed">
              <strong>Implementation:</strong> Components tested with screen readers, keyboard navigation tested, color contrast verified against WCAG standards.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Responsive Design</h3>
          <div className="bg-white border border-slate-300 rounded-lg p-6">
            <p className="text-slate-700 leading-relaxed mb-3">
              <strong>Decision:</strong> Design all components mobile-first, ensuring they work on all screen sizes.
            </p>
            <p className="text-slate-700 leading-relaxed mb-3">
              <strong>Reality Check:</strong> Enterprise applications are traditionally desktop-focused. However, end users increasingly access systems on tablets and mobile devices. Building responsive from the start prevents problems later.
            </p>
            <p className="text-slate-700 leading-relaxed">
              <strong>Outcome:</strong> Cirrus works effectively on mobile devices without sacrificing desktop experience. This became a competitive advantage.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="section-padding-lg">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Impact & Outcomes</h2>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Development Velocity</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            With the design library, new features could be built faster. Developers didn't need to design buttons or form inputs—they used library components. This freed time to focus on business logic and user workflows rather than low-level UI decisions.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Product Consistency</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            The product looked cohesive. Users navigating different modules recognized consistent patterns. This reduced cognitive load and increased confidence in the product. Enterprise customers appreciate this consistency—it signals professional quality.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Scalability</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            As new developers joined the team, they had clear guidance on how to build UI components. The design library ensured that new code followed the same patterns as existing code. This reduced code review friction and onboarding time.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Accessibility Compliance</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            By building accessibility into components, the entire product became accessible by default. This wasn't an afterthought—it was foundational. Enterprise customers, especially government and education institutions, have accessibility requirements. This improved Cirrus's competitive position.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Brand & Visual Identity</h3>
          <p className="text-slate-700 leading-relaxed">
            The design system created a cohesive visual identity for Cirrus. Users recognized the product's aesthetic across all interfaces. This contributed to brand strength and professional perception.
          </p>
        </div>
      </section>

      {/* Challenges & Solutions Section */}
      <section className="section-padding-lg bg-slate-50">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Challenges in Driving Change</h2>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Challenge: Adoption & Buy-In</h3>
          <div className="bg-white border border-slate-300 rounded-lg p-6 mb-6">
            <p className="text-slate-700 leading-relaxed mb-3">
              <strong>Problem:</strong> Existing code didn't use the design library. Different developers had different preferences for how to build components. Getting everyone to adopt the system required coordination.
            </p>
            <p className="text-slate-700 leading-relaxed mb-3">
              <strong>Solution:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-700">
              <li>Led design system workshops to explain the value proposition</li>
              <li>Made adoption practical: clear documentation, good examples, quick onboarding</li>
              <li>Started with new features (no migration burden, just new patterns)</li>
              <li>Gradually encouraged migration of existing code</li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Challenge: Balancing Flexibility and Consistency</h3>
          <div className="bg-white border border-slate-300 rounded-lg p-6">
            <p className="text-slate-700 leading-relaxed mb-3">
              <strong>Problem:</strong> Design systems can be too rigid. Developers sometimes need components that don't fit the standard patterns. Overly restrictive systems breed workarounds.
            </p>
            <p className="text-slate-700 leading-relaxed mb-3">
              <strong>Solution:</strong> Built components with appropriate customization points. Buttons can take various sizes and variants, but not arbitrary styling. Form inputs can be customized, but within the design system constraints. This gives flexibility while maintaining consistency.
            </p>
            <p className="text-slate-700 leading-relaxed">
              <strong>Lesson:</strong> Good systems provide guidelines, not barriers. They enable developers to work efficiently while maintaining quality.
            </p>
          </div>
        </div>
      </section>

      {/* Lessons Section */}
      <section className="section-padding-lg">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Key Lessons & Engineering Insights</h2>

          <div className="space-y-4">
            <Card variant="outlined">
              <h4 className="font-bold text-slate-900 mb-2">1. Design Systems Are Organizational, Not Just Technical</h4>
              <p className="text-slate-700 text-sm">
                Building a design system isn't just about creating components—it's about establishing shared conventions that help teams work together more effectively. This requires change management, communication, and alignment.
              </p>
            </Card>

            <Card variant="outlined">
              <h4 className="font-bold text-slate-900 mb-2">2. Consistency at Scale Requires Structure</h4>
              <p className="text-slate-700 text-sm">
                As products grow and teams expand, maintaining consistency becomes increasingly difficult without explicit structure. Design systems provide that structure. They prevent the slow accumulation of inconsistencies that make products feel unpolished.
              </p>
            </Card>

            <Card variant="outlined">
              <h4 className="font-bold text-slate-900 mb-2">3. Accessibility Should Be Foundational, Not Afterthought</h4>
              <p className="text-slate-700 text-sm">
                Building accessibility into every component, from the start, is easier and more effective than retrofitting it later. When accessibility is a core principle of the design system, it becomes mandatory by default.
              </p>
            </Card>

            <Card variant="outlined">
              <h4 className="font-bold text-slate-900 mb-2">4. Documentation Determines Success</h4>
              <p className="text-slate-700 text-sm">
                A beautiful design system with poor documentation is useless. Comprehensive, clear documentation—with examples and usage guidelines—determines whether developers will actually use the system.
              </p>
            </Card>

            <Card variant="outlined">
              <h4 className="font-bold text-slate-900 mb-2">5. Design Systems Enable Team Scaling</h4>
              <p className="text-slate-700 text-sm">
                As teams grow, coordinating on UI/UX consistency becomes harder. A good design system scales—new developers can join and immediately understand "how we do UI." This is critical for scaling teams efficiently.
              </p>
            </Card>

            <Card variant="outlined">
              <h4 className="font-bold text-slate-900 mb-2">6. Enterprise Products Benefit Most From Systems</h4>
              <p className="text-slate-700 text-sm">
                For consumer products, a certain amount of inconsistency might be tolerable or even charming. For enterprise software serving 1000+ customers with mission-critical needs, consistency and polish are essential. Design systems are table stakes for enterprise product quality.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* What This Demonstrates Section */}
      <section className="section-padding-lg bg-slate-50">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">What This Project Demonstrates</h2>

          <p className="text-slate-700 leading-relaxed mb-6">
            My ownership of the Springbrook Design Library shows:
          </p>

          <div className="space-y-3">
            <div className="flex gap-4 items-start">
              <span className="text-cyan-600 font-bold text-2xl flex-shrink-0">→</span>
              <div>
                <h4 className="font-bold text-slate-900">Leadership Without Title</h4>
                <p className="text-slate-700 text-sm">Leading a system-wide initiative that affects how the entire team works, without necessarily having formal authority. This is how actual influence works at scale.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="text-cyan-600 font-bold text-2xl flex-shrink-0">→</span>
              <div>
                <h4 className="font-bold text-slate-900">Systems Thinking</h4>
                <p className="text-slate-700 text-sm">Understanding that individual components are less important than the system they're part of. How design systems scale to large teams and products.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="text-cyan-600 font-bold text-2xl flex-shrink-0">→</span>
              <div>
                <h4 className="font-bold text-slate-900">Change Management</h4>
                <p className="text-slate-700 text-sm">Not just building something good, but getting people to adopt it. Understanding organizational dynamics and how to drive change effectively.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="text-cyan-600 font-bold text-2xl flex-shrink-0">→</span>
              <div>
                <h4 className="font-bold text-slate-900">Enterprise Product Thinking</h4>
                <p className="text-slate-700 text-sm">Understanding the specific challenges of large-scale enterprise software. Accessibility isn't nice-to-have. Consistency isn't optional. Polish matters.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="text-cyan-600 font-bold text-2xl flex-shrink-0">→</span>
              <div>
                <h4 className="font-bold text-slate-900">Enabling Team Productivity</h4>
                <p className="text-slate-700 text-sm">Good architecture isn't just about making good products—it's about enabling teams to move faster and with better outcomes. This is a multiplier effect.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
