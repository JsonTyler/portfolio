'use client';

import { Card } from '@/components/ui/Card';

export function DataDustrCaseStudy() {
  return (
    <>
      {/* Overview Section */}
      <section className="section-padding">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Overview</h2>
          <p className="text-lg text-slate-700 leading-relaxed mb-8">
            DataDustr is an actively developed private prototype and long-term company concept focused on digital organization. I created the concept, brand, design language, website, product direction, and technical architecture. I use it here as an engineering case study in end-to-end product ownership.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            <Card variant="outlined" className="border-amber-300">
              <h3 className="text-base font-bold text-slate-900 mt-0 mb-1">Live project</h3>
              <a href="https://datadustr.com/" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold">
                datadustr.com
              </a>
            </Card>
            <Card variant="outlined" className="border-amber-300">
              <h3 className="text-base font-bold text-slate-900 mt-0 mb-1">Source repository</h3>
              <a href="https://github.com/JsonTyler/data-dustr" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold">
                github.com/JsonTyler/data-dustr
              </a>
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="outlined">
              <h3 className="font-bold text-slate-900 mb-1">What was built</h3>
              <p className="text-slate-600">A product foundation spanning brand, web presence, module strategy, and shared platform direction.</p>
            </Card>
            <Card variant="outlined">
              <h3 className="font-bold text-slate-900 mb-1">Key constraints</h3>
              <p className="text-slate-600">Trust-sensitive cleanup domain, privacy boundaries, and phased rollout without separate platform codebases.</p>
            </Card>
            <Card variant="outlined">
              <h3 className="font-bold text-slate-900 mb-1">Outcome signal</h3>
              <p className="text-slate-600">Working architecture used to drive DataDustrTools with real-world validation and iterative refinement.</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="section-padding-sm border-y border-slate-200 bg-white">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mt-0 mb-5">Technical artifacts and implementation snapshot</h2>
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-slate-900 mt-0 mb-3">Technical artifacts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
              <Card variant="outlined">
                <h4 className="text-base font-bold mt-0 mb-2">Public repository and implementation surfaces</h4>
                <ul className="space-y-1 text-sm text-slate-700">
                  <li><a href="https://datadustr.com/" target="_blank" rel="noopener noreferrer">Live business site (datadustr.com)</a></li>
                  <li><a href="https://github.com/JsonTyler/data-dustr" target="_blank" rel="noopener noreferrer">data-dustr repository</a></li>
                  <li><a href="https://github.com/JsonTyler/data-dustr/blob/main/pages/index.js" target="_blank" rel="noopener noreferrer">Landing page implementation</a></li>
                  <li><a href="https://github.com/JsonTyler/data-dustr/blob/main/components/Header.js" target="_blank" rel="noopener noreferrer">Navigation and top-level UX structure</a></li>
                  <li><a href="https://github.com/JsonTyler/data-dustr/blob/main/lib/siteConfig.js" target="_blank" rel="noopener noreferrer">Product-level site configuration</a></li>
                </ul>
              </Card>
              <Card variant="outlined">
                <h4 className="text-base font-bold mt-0 mb-2">Private artifacts not publicly shareable</h4>
                <ul className="space-y-1 text-sm text-slate-700">
                  <li>Desktop runtime internals and provider adapters are maintained privately during active development.</li>
                  <li>Normally shared artifacts would include adapter implementations, module-level architecture diagrams, and validation screenshots from real cleanup sessions.</li>
                </ul>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card variant="outlined">
              <h3 className="text-base font-bold text-slate-900 mt-0 mb-2">Implemented</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>Brand system and visual language</li>
                <li>Web presence and product structure</li>
                <li>Shared web and desktop direction</li>
              </ul>
            </Card>
            <Card variant="outlined">
              <h3 className="text-base font-bold text-slate-900 mt-0 mb-2">In development</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>Workflow refinement from personal usage</li>
                <li>Architecture hardening for scale</li>
                <li>Module-level UX improvements</li>
              </ul>
            </Card>
            <Card variant="outlined">
              <h3 className="text-base font-bold text-slate-900 mt-0 mb-2">Planned</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>Commercial licensing infrastructure</li>
                <li>Additional provider integrations</li>
                <li>Expanded module set</li>
              </ul>
            </Card>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mt-0 mb-3">Architecture diagram</h3>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center text-sm">
              <div className="bg-white border border-slate-300 rounded p-3">
                <p className="font-semibold text-slate-900 mb-1">UI surfaces</p>
                <p className="text-slate-700">Web demo, Desktop app</p>
              </div>
              <div className="text-center text-slate-500 font-semibold">→</div>
              <div className="bg-white border border-slate-300 rounded p-3">
                <p className="font-semibold text-slate-900 mb-1">Application layer</p>
                <p className="text-slate-700">Shared React components, policy layer, module routing</p>
              </div>
              <div className="bg-white border border-slate-300 rounded p-3 md:col-start-1">
                <p className="font-semibold text-slate-900 mb-1">Modules</p>
                <p className="text-slate-700">File Dustr, Inbox Dustr</p>
              </div>
              <div className="text-center text-slate-500 font-semibold">→</div>
              <div className="bg-white border border-slate-300 rounded p-3">
                <p className="font-semibold text-slate-900 mb-1">Adapters and data</p>
                <p className="text-slate-700">Gmail adapter, local file adapter, metadata analysis</p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mt-0 mb-3">Decision log</h3>
          <div className="overflow-x-auto">
            <table aria-label="DataDustr architectural decisions">
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
                  <td>Need web discovery and desktop execution without duplicating product logic.</td>
                  <td>Web-only app, desktop-only app, or shared cross-platform architecture.</td>
                  <td>Shared React architecture with runtime adapters.</td>
                  <td>Separate web and desktop codebases.</td>
                  <td>Kept product behavior aligned while reducing duplicated feature work.</td>
                  <td>Runtime branching and adapter-layer maintenance.</td>
                  <td>Consistent UX across surfaces with faster iteration on shared modules.</td>
                </tr>
                <tr>
                  <td>Product scope includes distinct cleanup workflows with different constraints.</td>
                  <td>Single monolithic workflow or module boundaries.</td>
                  <td>Module split: File Dustr and Inbox Dustr.</td>
                  <td>One large unified workflow with conditional feature toggles.</td>
                  <td>Improved testability and release control by workflow boundary.</td>
                  <td>More routing and cross-module state interfaces.</td>
                  <td>Incremental delivery became safer and easier to validate.</td>
                </tr>
                <tr>
                  <td>Users need useful cleanup recommendations while preserving privacy trust.</td>
                  <td>Content-level analysis, metadata-only analysis, or hybrid strategy.</td>
                  <td>Metadata-only analysis pipeline.</td>
                  <td>Deep content scanning of file and email bodies.</td>
                  <td>Reduced privacy exposure while still supporting high-value cleanup heuristics.</td>
                  <td>Less semantic depth for edge-case recommendations.</td>
                  <td>Lower risk posture and clearer user trust story.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">The Problem</h2>
          <ul className="list-disc list-inside space-y-2 text-slate-700">
            <li>Digital clutter compounds quickly in inboxes and local file systems.</li>
            <li>Existing tools treat email and files as separate problems.</li>
            <li>Cleanup actions are risky, users need confidence before deletion.</li>
            <li>Large datasets make naive approaches too slow for real use.</li>
          </ul>
        </div>
      </section>

      {/* Vision & Strategy Section */}
      <section className="section-padding">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Product Direction & Strategy</h2>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Brand & Positioning</h3>
          <p className="text-slate-700 leading-relaxed mb-3">
            I started with product positioning before implementation. "DataDustr" communicates practical cleanup, not abstract storage optimization.
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 mb-6">
            <li>Name and message tuned for clarity, not technical jargon</li>
            <li>Visual language designed for trust during destructive workflows</li>
            <li>Tone calibrated for practical guidance over marketing claims</li>
          </ul>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Design System Approach</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            I committed to reusable components and documented patterns early so web and desktop workflows stayed consistent while the product evolved.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Scope & Target Users</h3>
          <p className="text-slate-700 leading-relaxed">
            The target users are professionals and small teams managing high-volume inboxes and files. Product scope is practical cleanup workflows that reduce retrieval friction and make maintenance repeatable.
          </p>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Architecture & Key Decisions</h2>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Dual Platform Strategy: Web + Desktop</h3>
          <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>Decision:</strong> Build both web and desktop applications sharing a common React codebase.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>Rationale:</strong> Initial impulse was web-only for simplicity. However, the product requires access to local file systems and real email accounts, which is critical for legitimate cleanup operations. While web can provide a demonstration mode with synthetic data, professionals need desktop access to actual data. Using Tauri as the desktop runtime allowed me to wrap the React application for multiple platforms (Windows, macOS) while sharing 90% of the codebase.
            </p>
            <p className="text-slate-700 leading-relaxed">
              <strong>Tradeoff:</strong> Platform abstraction added complexity, but it avoided building and maintaining separate apps for web and desktop. I accepted that complexity to keep behavior and UI consistent across both surfaces.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Modular Feature Architecture</h3>
          <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>Decision:</strong> Organize the product into independent modules: File Dustr and Inbox Dustr, with room for future additions.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>Rationale:</strong> Each module solves a distinct problem and can be developed, tested, and iterated independently. This allows incremental product launches, so we can ship File Dustr, get feedback, then enhance Inbox Dustr based on what we learned. It also allows users to focus on one workflow at a time rather than overwhelming them with everything.
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
              <strong>Technical Impact:</strong> Analysis runs on metadata (file size, dates, sender, subject, filename patterns) rather than message/file contents. This is enough for most cleanup decisions while reducing privacy risk and storage overhead.
            </p>
          </div>
        </div>
      </section>

      {/* Technical Challenges Section */}
      <section className="section-padding">
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
              <strong>Lesson:</strong> Performance is not a nice-to-have, it is foundational to user experience. Users will not wait 30 seconds for the app to suggest what to delete. They need instant feedback. This required architectural thinking from the beginning, not bolted on after performance problems appeared.
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
              <strong>Outcome:</strong> Currently supporting Gmail. Outlook is planned as the next integration. The adapter architecture keeps adding new providers straightforward: implement the interface, handle provider-specific quirks, and validate.
            </p>
          </div>
        </div>
      </section>

      {/* Development Approach Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Development & Validation Approach</h2>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Real-World Usage Testing</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            Rather than building features in theory and hoping users like them, I've been using DataDustrTools to clean my own digital life. I successfully processed approximately 30,000 emails from one personal Gmail account, removing duplicate messages, old newsletters, and marketing emails. This real-world usage revealed actual pain points:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6">
            <li>Search was too literal, users needed fuzzy matching and pattern recognition</li>
            <li>Analysis took longer than expected for large accounts, optimization was critical</li>
            <li>Users needed confidence that deletions were safe, undo and preview features became essential</li>
            <li>The workflow needed to be interruptible, users might close the app mid-process</li>
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
      <section className="section-padding">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Lessons Learned & Future Direction</h2>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Key Lessons</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            <Card variant="outlined">
              <h3 className="font-bold text-slate-900 mb-2">1. Product Development Requires Multiple Perspectives</h3>
              <p className="text-slate-700 text-sm">
                Building this product required three perspectives at once: engineering (architecture and reliability), design (workflow clarity), and product (scope and prioritization).
              </p>
            </Card>
            <Card variant="outlined">
              <h3 className="font-bold text-slate-900 mb-2">2. Design Systems Enable Velocity</h3>
              <p className="text-slate-700 text-sm">
                Starting with reusable components slowed early delivery but reduced rework. As the product grew, consistent components made iteration faster and easier to maintain.
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
                Privacy constraints improved design quality. Restricting analysis to metadata forced clearer workflows and safer defaults.
              </p>
            </Card>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Engineering Signals from This Work</h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            This work highlights:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6">
            <li><strong>Problem framing</strong> from day-to-day user friction</li>
            <li><strong>Cross-discipline decisions</strong> across architecture, UX, and product scope</li>
            <li><strong>Make architectural decisions</strong> with clear tradeoffs</li>
            <li><strong>Design systems</strong> for consistency and scalability</li>
            <li><strong>End-to-end execution</strong> from concept and design system to working software</li>
            <li><strong>Iterate based on reality</strong> rather than assumptions</li>
            <li><strong>Own complete responsibility</strong> for product outcomes</li>
          </ul>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">What's Next</h3>
          <p className="text-slate-700 leading-relaxed">
            DataDustr is still in private prototype stage. Current focus is product refinement based on personal real-world usage, architecture hardening, and preparing licensing/commercial infrastructure. Long term, I plan to grow this into a remote-first software company focused on digital organization tools and education.
          </p>
        </div>
      </section>
    </>
  );
}
