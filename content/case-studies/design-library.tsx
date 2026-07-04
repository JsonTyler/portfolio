'use client';

import { Card } from '@/components/ui/Card';

export function DesignLibraryCaseStudy() {
  return (
    <>
      {/* Overview Section */}
      <section className="section-padding">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Overview</h2>
          <p className="text-lg text-slate-700 leading-relaxed mb-8">
            As a frontend engineer at Springbrook Software, I inherited and then maintained the design library powering Cirrus, an ERP product used by 1000+ organizations. I did not originate the system; my role was long-term stewardship of its components and core concepts, with ongoing improvements to architecture, accessibility defaults, and adoption patterns across teams.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="outlined">
              <h3 className="font-bold text-slate-900 mb-1">What was built</h3>
              <p className="text-slate-600">An enterprise design library with reusable components, tokens, and adoption guidelines.</p>
            </Card>
            <Card variant="outlined">
              <h3 className="font-bold text-slate-900 mb-1">Key constraints</h3>
              <p className="text-slate-600">Large legacy surface area, cross-team adoption friction, and accessibility requirements.</p>
            </Card>
            <Card variant="outlined">
              <h3 className="font-bold text-slate-900 mb-1">Outcome signal</h3>
              <p className="text-slate-600">Improved consistency and delivery velocity through component-first product development.</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="section-padding-sm border-y border-slate-200 bg-white">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mt-0 mb-5">Technical artifacts and implementation status</h2>
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-slate-900 mt-0 mb-3">Technical artifacts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
              <Card variant="outlined">
                <h4 className="text-base font-bold mt-0 mb-2">Publicly shareable artifacts</h4>
                <ul className="space-y-1 text-sm text-slate-700">
                  <li><a href="https://design.sprbrk.com/playground" target="_blank" rel="noopener noreferrer">Current design playground site</a></li>
                  <li><a href="https://test-design.sprbrk.com/" target="_blank" rel="noopener noreferrer">Archived design library demo site</a></li>
                  <li><a href="https://github.com/JsonTyler/Staticerson/blob/main/content/case-studies/design-library.tsx" target="_blank" rel="noopener noreferrer">Case study source and decision rationale</a></li>
                  <li><a href="https://github.com/JsonTyler/Staticerson/blob/main/app/projects/%5Bslug%5D/page.tsx" target="_blank" rel="noopener noreferrer">Portfolio case-study template implementation</a></li>
                </ul>
              </Card>
              <Card variant="outlined">
                <h4 className="text-base font-bold mt-0 mb-2">Private enterprise artifacts</h4>
                <ul className="space-y-1 text-sm text-slate-700">
                  <li>Component-library repository and production modules are proprietary to Springbrook.</li>
                  <li>Normally shared artifacts would include component contracts, migration plans, accessibility test reports, and adoption dashboards.</li>
                </ul>
              </Card>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card variant="outlined">
              <h3 className="text-base font-bold mt-0 mb-2">Implemented</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>Shared component system and usage guidelines</li>
                <li>Design tokens for type, color, and spacing</li>
                <li>Accessibility defaults in common components</li>
              </ul>
            </Card>
            <Card variant="outlined">
              <h3 className="text-base font-bold mt-0 mb-2">In development</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>Incremental migration of legacy views</li>
                <li>Ongoing component coverage expansion</li>
                <li>Team adoption feedback loops</li>
              </ul>
            </Card>
            <Card variant="outlined">
              <h3 className="text-base font-bold mt-0 mb-2">Planned</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>Deeper pattern library documentation</li>
                <li>More automation around visual regressions</li>
                <li>Additional layout and data-density patterns</li>
              </ul>
            </Card>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mt-0 mb-3">Component hierarchy diagram</h3>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center text-sm">
              <div className="bg-white border border-slate-300 rounded p-3">
                <p className="font-semibold text-slate-900 mb-1">Design tokens</p>
                <p className="text-slate-700">Type, color, spacing, elevation</p>
              </div>
              <div className="text-center text-slate-500 font-semibold">→</div>
              <div className="bg-white border border-slate-300 rounded p-3">
                <p className="font-semibold text-slate-900 mb-1">Primitive components</p>
                <p className="text-slate-700">Buttons, inputs, modals, tables</p>
              </div>
              <div className="text-center text-slate-500 font-semibold">→</div>
              <div className="bg-white border border-slate-300 rounded p-3">
                <p className="font-semibold text-slate-900 mb-1">Product modules</p>
                <p className="text-slate-700">Cirrus features with shared UX patterns</p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mt-0 mb-3">Decision log</h3>
          <div className="overflow-x-auto">
            <table aria-label="Design Library architectural decision log">
              <thead>
                <tr>
                  <th>Problem</th>
                  <th>Options considered</th>
                  <th>Chosen solution</th>
                  <th>Rejected alternatives</th>
                  <th>Why this won</th>
                  <th>Accepted tradeoffs</th>
                  <th>Result after implementation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>UI inconsistency across multiple ERP modules and teams.</td>
                  <td>Team-by-team conventions or centralized component library.</td>
                  <td>Component-first design system with shared tokens.</td>
                  <td>Uncoordinated local component implementations.</td>
                  <td>Scaled consistency and reduced repeated UI decision cost.</td>
                  <td>Initial migration cost and longer component design cycles.</td>
                  <td>Higher consistency, faster implementation, lower review friction.</td>
                </tr>
                <tr>
                  <td>Accessibility regressions appeared when implemented ad-hoc per screen.</td>
                  <td>Late QA checks or accessibility in base components.</td>
                  <td>Accessibility defaults embedded into base components.</td>
                  <td>Optional accessibility reviews after feature completion.</td>
                  <td>Moved compliance from optional step to default behavior.</td>
                  <td>More complexity in foundational components.</td>
                  <td>Stronger WCAG baseline across newly delivered features.</td>
                </tr>
                <tr>
                  <td>Legacy UI surface was too large for a big-bang migration.</td>
                  <td>Full rewrite or incremental rollout.</td>
                  <td>Incremental migration by feature and module.</td>
                  <td>Single release cutover of all legacy screens.</td>
                  <td>Reduced delivery risk and protected roadmap throughput.</td>
                  <td>Temporary coexistence of old and new patterns.</td>
                  <td>Steady adoption without blocking ongoing product delivery.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Context Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">The Context</h2>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">What is Cirrus?</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            Cirrus is Springbrook Software's enterprise ERP platform for municipalities, school districts, and other organizations running mission-critical workflows across finance, HR, procurement, and operations.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">The Challenge: Consistency at Scale</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            Before the formal library, modules evolved independently and UI drift accumulated. Inconsistent patterns increased user cognitive load and reduced confidence in product reliability.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">The Opportunity</h3>
          <p className="text-slate-700 leading-relaxed">A formal system needed to deliver five outcomes:</p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 mt-3">
            <li>Improve user experience through consistency</li>
            <li>Accelerate development by providing reusable components</li>
            <li>Reduce technical debt and maintenance burden</li>
            <li>Enable scalability, with new features built on solid foundations</li>
            <li>Improve product quality and user confidence</li>
          </ul>
        </div>
      </section>

      {/* Approach Section */}
      <section className="section-padding">
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
                Defined font scales, line heights, letter spacing, and weight usage. Clear rules for headlines, body text, and labels improved readability and reduced style drift across modules.
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
      <section className="section-padding bg-slate-50">
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
              <strong>Benefit:</strong> Developers do not have to make styling decisions for every button, the library makes those decisions. They can focus on functionality and behavior.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Accessibility as Foundation</h3>
          <div className="bg-white border border-slate-300 rounded-lg p-6 mb-6">
            <p className="text-slate-700 leading-relaxed mb-3">
              <strong>Decision:</strong> Every component includes accessibility features by default, including proper ARIA labels, keyboard navigation, and focus management.
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
              <strong>Outcome:</strong> Cirrus works on mobile and desktop with shared component behavior, reducing separate UI implementation paths.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="section-padding">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Impact & Outcomes</h2>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Development Velocity</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            With the design library, new features could be built faster. Developers did not need to design buttons or form inputs, they used library components. This freed time to focus on business logic and user workflows rather than low-level UI decisions.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Product Consistency</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            The product looked cohesive. Users navigating different modules recognized consistent patterns. This reduced cognitive load and increased confidence in the product. Enterprise customers appreciate this consistency, it signals professional quality.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Scalability</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            As new developers joined the team, they had clear guidance on how to build UI components. The design library ensured that new code followed the same patterns as existing code. This reduced code review friction and onboarding time.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Accessibility Compliance</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            By building accessibility into components, the entire product became accessible by default. This was foundational. Enterprise customers, especially government and education institutions, have accessibility requirements. This improved Cirrus's product quality and reliability.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Brand & Visual Identity</h3>
          <p className="text-slate-700 leading-relaxed">
            The design system created a cohesive visual identity for Cirrus. Users recognized the product's aesthetic across all interfaces. This contributed to brand strength and professional perception.
          </p>
        </div>
      </section>

      {/* Challenges & Solutions Section */}
      <section className="section-padding bg-slate-50">
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
              <li>Led design system workshops to explain adoption rationale and migration path</li>
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
      <section className="section-padding">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Key Lessons & Engineering Insights</h2>

          <div className="space-y-4">
            <Card variant="outlined">
              <h4 className="font-bold text-slate-900 mb-2">1. Design Systems Are Organizational, Not Just Technical</h4>
              <p className="text-slate-700 text-sm">
                Building a design system is not just about creating components, it is about establishing shared conventions that help teams work together more effectively. This requires change management, communication, and alignment.
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
                A design system with poor documentation is ineffective. Comprehensive and clear documentation, with examples and usage guidelines, determines whether developers actually use the system.
              </p>
            </Card>

            <Card variant="outlined">
              <h4 className="font-bold text-slate-900 mb-2">5. Design Systems Enable Team Scaling</h4>
              <p className="text-slate-700 text-sm">
                As teams grow, coordinating on UI/UX consistency becomes harder. A good design system scales, new developers can join and immediately understand "how we do UI." This is critical for scaling teams efficiently.
              </p>
            </Card>

            <Card variant="outlined">
              <h4 className="font-bold text-slate-900 mb-2">6. Enterprise Products Benefit Most From Systems</h4>
              <p className="text-slate-700 text-sm">
                Enterprise products with broad module surfaces accumulate inconsistency quickly. A design system is the mechanism that keeps behavior and UI predictable as teams and features scale.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* What This Demonstrates Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">What This Project Demonstrates</h2>

          <p className="text-slate-700 leading-relaxed mb-6">
            My maintenance ownership of the Springbrook Design Library shows:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            <Card variant="outlined">
              <h4 className="font-bold text-slate-900 mt-0 mb-2">Leadership Without Title</h4>
              <p className="text-slate-700 text-sm">Led a system-wide initiative that changed team execution patterns without requiring formal authority.</p>
            </Card>
            <Card variant="outlined">
              <h4 className="font-bold text-slate-900 mt-0 mb-2">Systems Thinking</h4>
              <p className="text-slate-700 text-sm">Prioritized interoperable patterns and consistency rules across modules, not isolated component wins.</p>
            </Card>
            <Card variant="outlined">
              <h4 className="font-bold text-slate-900 mt-0 mb-2">Change Management</h4>
              <p className="text-slate-700 text-sm">Drove adoption with documentation, workshops, and migration patterns instead of top-down mandates.</p>
            </Card>
            <Card variant="outlined">
              <h4 className="font-bold text-slate-900 mt-0 mb-2">Enterprise Product Thinking</h4>
              <p className="text-slate-700 text-sm">Applied accessibility and consistency as hard product requirements for enterprise workflows.</p>
            </Card>
            <Card variant="outlined">
              <h4 className="font-bold text-slate-900 mt-0 mb-2">Team Productivity Multiplier</h4>
              <p className="text-slate-700 text-sm">Reduced UI rework and increased delivery speed by standardizing high-frequency interface patterns.</p>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
