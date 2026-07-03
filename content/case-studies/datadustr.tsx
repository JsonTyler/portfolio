'use client';

import { Card } from '@/components/ui/Card';

export function DataDustrCaseStudy() {
  return (
    <>
      {/* Overview Section */}
      <section className="section-padding-lg">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Overview</h2>
          <p className="text-lg text-slate-700 leading-relaxed mb-8">
            DataDustr is both a company vision and a commercial product I founded to help professionals reclaim digital space through intelligent cleanup and organization of email and files. This project demonstrates complete product ownership—from identifying a market problem through brand development, design systems, software architecture, and market launch planning.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="outlined">
              <h3 className="font-bold text-slate-900 mb-1">Timeline</h3>
              <p className="text-slate-600">2022–present</p>
            </Card>
            <Card variant="outlined">
              <h3 className="font-bold text-slate-900 mb-1">Status</h3>
              <p className="text-slate-600">Feature complete, actively developed</p>
            </Card>
            <Card variant="outlined">
              <h3 className="font-bold text-slate-900 mb-1">Scope</h3>
              <p className="text-slate-600">Solo founder, 100% my work</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="section-padding-lg bg-slate-50">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">The Problem</h2>
          <div className="space-y-6 text-slate-700 leading-relaxed">
            <p>
              I observed a widespread but underaddressed problem: professionals accumulate massive amounts of digital clutter—thousands of files they don't need, overflowing inboxes, duplicate data scattered across cloud services, and years of accumulated email they'll never read.
            </p>
            <p>
              Current solutions treat these problems in isolation. Email managers focus only on email. File managers focus only on files. Cloud storage services have cleanup features, but they're fragmented across different platforms. There was no unified system for digital organization.
            </p>
            <p>
              This accumulation has real costs: wasted storage, compliance issues for businesses, lost productivity from search and disorganization, and mental overhead. More importantly, it prevents people from working effectively and confidently with their digital assets.
            </p>
            <p>
              I decided to build a solution that unified these workflows—a platform that helps users analyze, understand, and clean up both their email and files through intelligent analysis and actionable recommendations.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Strategy Section */}
      <section className="section-padding-lg">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Product Vision & Strategy</h2>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Brand & Positioning</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            I started with brand strategy. "DataDustr" — clean the dust off your data. The name needed to be memorable, communicate the core value proposition, and feel approachable rather than technical. I developed the brand identity from first principles: color palette (calming blues, actionable greens, warning reds), typography (clean and professional but not corporate), visual language, and tone of voice.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Design System Approach</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            Rather than building UI ad-hoc, I committed to a design system from day one. This decision paid off significantly. By establishing reusable components, consistent patterns, and documented design principles early, I enabled rapid iteration while maintaining visual and behavioral consistency across the product. This approach also made it easier to coordinate between the web interface and desktop application.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Market & Target Users</h3>
          <p className="text-slate-700 leading-relaxed">
            I identified the target market as professionals and small businesses dealing with significant digital clutter. Primary users: knowledge workers, remote professionals, business owners managing multiple email accounts, and IT administrators. The value proposition is clear: reclaim time, reduce cognitive load, and gain confidence in digital asset management.
          </p>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="section-padding-lg bg-slate-50">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Architecture & Key Decisions</h2>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Dual Platform Strategy: Web + Desktop</h3>
          <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>Decision:</strong> Build both web and desktop applications sharing a common React codebase.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>Rationale:</strong> Initial impulse was web-only for simplicity. However, the product requires access to local file systems and real email accounts—critical for legitimate cleanup operations. While web can provide a demonstration mode with synthetic data, professionals need desktop access to actual data. Using Tauri as the desktop runtime allowed me to wrap the React application for multiple platforms (Windows, macOS) while sharing 90% of the codebase.
            </p>
            <p className="text-slate-700 leading-relaxed">
              <strong>Tradeoff:</strong> Added complexity in platform abstraction versus the benefit of massive code reuse and consistent UX across platforms. Decision: worth the complexity. Building completely separate desktop and web apps would have multiplied development time and maintenance burden.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Modular Feature Architecture</h3>
          <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>Decision:</strong> Organize the product into independent modules: File Dustr and Inbox Dustr, with room for future additions.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>Rationale:</strong> Each module solves a distinct problem and can be developed, tested, and iterated independently. This allows incremental product launches—we can ship File Dustr, get feedback, then enhance Inbox Dustr based on what we learned. It also allows users to focus on one workflow at a time rather than overwhelming them with everything.
            </p>
            <p className="text-slate-700 leading-relaxed">
              <strong>Benefit:</strong> Cleaner mental model for users, easier to test, simpler to maintain, enables future modular features (Photo Dustr, Project Dustr) without major architectural changes.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Centralized Policy Layer</h3>
          <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>Decision:</strong> Create a centralized policy engine that manages feature entitlements and licensing across all platforms.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>Why This Matters:</strong> Different editions (Free web demo, Pro desktop, Enterprise) have different feature sets. Rather than duplicating feature logic in multiple places, I built a single policy layer that determines what features are available for each edition. The UI queries this policy layer to enable/disable features, and business logic respects policy decisions.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>Benefit:</strong> Single source of truth for licensing decisions, easier to add new editions or features, prevents logic drift between platforms, and makes it trivial to test different pricing models.
            </p>
            <p className="text-slate-700 leading-relaxed">
              <strong>Example:</strong> "Can user perform bulk delete?" Query the policy layer once. It knows: free users on web = no, pro users anywhere = yes, enterprise = yes. UI and backend both query the same logic.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Privacy-First Architecture</h3>
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>Decision:</strong> Never store actual email or file content. Only store metadata for analysis.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>Rationale:</strong> Users are hesitant to grant data access to new applications. Privacy concerns are well-founded. By committing to a privacy-first approach from day one, the product becomes more defensible and trustworthy. Users control what gets analyzed and what gets deleted.
            </p>
            <p className="text-slate-700 leading-relaxed">
              <strong>Technical Impact:</strong> Design all analysis on metadata (file size, date, name patterns, sender, subject) rather than content. This is actually sufficient for most cleanup decisions. It also dramatically reduces storage requirements and simplifies compliance considerations.
            </p>
          </div>
        </div>
      </section>

      {/* Technical Challenges Section */}
      <section className="section-padding-lg">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Technical Challenges & Solutions</h2>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Challenge 1: Performance with Large Datasets</h3>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-6">
            <p className="text-slate-700 leading-relaxed mb-3">
              <strong>Problem:</strong> Users might have 100,000+ emails or files to analyze and display. Loading and rendering millions of items would crash the browser.
            </p>
            <p className="text-slate-700 leading-relaxed mb-3">
              <strong>Solution:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-3">
              <li>Pagination: Load data in chunks (typically 50-100 items per page)</li>
              <li>Virtual scrolling: Only render visible items in the viewport</li>
              <li>Web Workers: Offload heavy analysis to background threads</li>
              <li>Lazy loading: Analyze metadata incrementally rather than all at once</li>
              <li>Batch operations: Group deletion/movement operations for efficiency</li>
            </ul>
            <p className="text-slate-700 leading-relaxed">
              <strong>Lesson:</strong> Performance is not a nice-to-have—it's foundational to user experience. Users won't wait 30 seconds for the app to suggest what to delete. They need instant feedback. This required architectural thinking from the beginning, not bolted on after performance problems appeared.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Challenge 2: Cross-Platform Consistency</h3>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-6">
            <p className="text-slate-700 leading-relaxed mb-3">
              <strong>Problem:</strong> Desktop and web platforms have different capabilities and constraints. Maintaining identical UX while adapting to platform differences is complex.
            </p>
            <p className="text-slate-700 leading-relaxed mb-3">
              <strong>Solution:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-3">
              <li>Shared React components for 90% of UI</li>
              <li>Platform adapters for platform-specific integrations</li>
              <li>Conditional rendering based on runtime (web vs. desktop)</li>
              <li>TypeScript interfaces enforce consistent behavior across platforms</li>
              <li>Comprehensive testing for both platforms</li>
            </ul>
            <p className="text-slate-700 leading-relaxed">
              <strong>Key Learning:</strong> Design for multi-platform from day one. Retrofitting platform support is exponentially harder. Every architectural decision needs to consider: "How will this work on desktop? On web? In a browser?" Building it both ways simultaneously forces better architecture.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Challenge 3: Email Provider Integration</h3>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
            <p className="text-slate-700 leading-relaxed mb-3">
              <strong>Problem:</strong> Each email provider (Gmail, Outlook, etc.) has different APIs, authentication mechanisms, and rate limits. Building adapters for each is complex and error-prone.
            </p>
            <p className="text-slate-700 leading-relaxed mb-3">
              <strong>Solution:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 mb-3">
              <li>Adapter pattern: Each provider gets its own adapter implementing a common interface</li>
              <li>Started with Gmail (largest user base, clearest API documentation)</li>
              <li>OAuth for authentication (never handle passwords directly)</li>
              <li>Comprehensive error handling and retry logic</li>
              <li>Rate limit awareness in API calls</li>
            </ul>
            <p className="text-slate-700 leading-relaxed">
              <strong>Outcome:</strong> Currently supporting Gmail. Outlook planned as next integration. The adapter architecture makes adding new providers straightforward—implement the interface, handle provider-specific quirks, done.
            </p>
          </div>
        </div>
      </section>

      {/* Development Approach Section */}
      <section className="section-padding-lg bg-slate-50">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Development & Validation Approach</h2>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Real-World Usage Testing</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            Rather than building features in theory and hoping users like them, I've been using DataDustrTools to clean my own digital life. I successfully processed approximately 30,000 emails from one personal Gmail account, removing duplicate messages, old newsletters, and marketing emails. This real-world usage revealed actual pain points:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6">
            <li>Search was too literal—users needed fuzzy matching and pattern recognition</li>
            <li>Analysis took longer than expected for large accounts—optimization was critical</li>
            <li>Users needed confidence that deletions were safe—undo and preview features became essential</li>
            <li>The workflow needed to be interruptible—users might close the app mid-process</li>
          </ul>
          <p className="text-slate-700 leading-relaxed">
            I'm planning to clean another personal account with 100,000+ emails, which will stress-test the system at real scale and likely reveal more edge cases.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Iterative Architecture Refinement</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            The codebase has been continuously refactored based on real usage. I'm committed to maintaining a clean, maintainable architecture that evolves over time without accumulating technical debt. This means:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700">
            <li>Regular refactoring and code review (even as the solo developer)</li>
            <li>Clear separation of concerns between business logic, UI, and integrations</li>
            <li>Comprehensive testing to catch regressions</li>
            <li>Documentation of architecture decisions and rationale</li>
          </ul>
        </div>
      </section>

      {/* Lessons & Future Section */}
      <section className="section-padding-lg">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Lessons Learned & Future Direction</h2>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Key Lessons</h3>
          <div className="space-y-4">
            <Card variant="outlined">
              <h3 className="font-bold text-slate-900 mb-2">1. Product Development Requires Multiple Perspectives</h3>
              <p className="text-slate-700 text-sm">
                Building a product demands simultaneously thinking like an engineer (architecture, scalability), designer (UX, visual consistency), and business person (market fit, pricing, go-to-market). No single perspective is sufficient.
              </p>
            </Card>
            <Card variant="outlined">
              <h3 className="font-bold text-slate-900 mb-2">2. Design Systems Enable Velocity</h3>
              <p className="text-slate-700 text-sm">
                Investing in design systems and component libraries from day one feels slow initially but pays enormous dividends. Building with consistent components is dramatically faster than one-off UI work, and the product feels more polished.
              </p>
            </Card>
            <Card variant="outlined">
              <h3 className="font-bold text-slate-900 mb-2">3. Real Usage Data Beats Theory</h3>
              <p className="text-slate-700 text-sm">
                Using your own product in real-world scenarios reveals problems that theoretical analysis misses. Processing 30,000 emails taught me more than months of design discussions could have.
              </p>
            </Card>
            <Card variant="outlined">
              <h3 className="font-bold text-slate-900 mb-2">4. Scalability Thinking Matters Early</h3>
              <p className="text-slate-700 text-sm">
                Architecture decisions made for 100 items behave very differently at 100,000 items. Planning for scale from the beginning is cheaper than retrofitting later.
              </p>
            </Card>
            <Card variant="outlined">
              <h3 className="font-bold text-slate-900 mb-2">5. Privacy-First is a Strategic Advantage</h3>
              <p className="text-slate-700 text-sm">
                In a world of data breaches and privacy concerns, committing to privacy-first design isn't just ethical—it's a competitive advantage. Users remember products they trust with their data.
              </p>
            </Card>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">What This Project Demonstrates</h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            DataDustr shows my ability to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6">
            <li><strong>Identify real problems</strong> and understand market opportunity</li>
            <li><strong>Think holistically</strong> about products—not just code</li>
            <li><strong>Make architectural decisions</strong> with clear tradeoffs</li>
            <li><strong>Design systems</strong> for consistency and scalability</li>
            <li><strong>Execute end-to-end</strong>—from brand through product through market planning</li>
            <li><strong>Iterate based on reality</strong> rather than assumptions</li>
            <li><strong>Own complete responsibility</strong> for product outcomes</li>
          </ul>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">What's Next</h3>
          <p className="text-slate-700 leading-relaxed">
            DataDustr is moving toward commercial launch. Current focus: refining the product based on real-world usage, expanding integrations, and building the commercial infrastructure (licensing, payment, support). The long-term vision is to build a remote-first software company focused on digital organization and productivity—not just a single product, but a category of thoughtfully-designed solutions that help people work more effectively.
          </p>
        </div>
      </section>
    </>
  );
}
