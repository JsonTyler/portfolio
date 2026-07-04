'use client';

import { Card } from '@/components/ui/Card';

export function DataDustrToolsCaseStudy() {
  return (
    <>
      {/* Overview Section */}
      <section className="section-padding">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Overview</h2>
          <p className="text-lg text-slate-700 leading-relaxed mb-8">
            DataDustrTools is the product application under the DataDustr brand. It packages the architecture explored in DataDustr into a working tool for email and file cleanup. This case study focuses on technical decisions, tradeoffs, and how the code evolved through real usage.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            <Card variant="outlined" className="border-amber-300">
              <h3 className="text-base font-bold text-slate-900 mt-0 mb-1">Live project</h3>
              <a href="https://tools.datadustr.com/" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold">
                tools.datadustr.com
              </a>
            </Card>
            <Card variant="outlined" className="border-amber-300">
              <h3 className="text-base font-bold text-slate-900 mt-0 mb-1">Source repository</h3>
              <a href="https://github.com/JsonTyler/data-dustr-tools" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold">
                github.com/JsonTyler/data-dustr-tools
              </a>
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="outlined">
              <h3 className="font-bold text-slate-900 mb-1">What was built</h3>
              <p className="text-slate-600">Dual-module cleanup product: File Dustr + Inbox Dustr on web and desktop.</p>
            </Card>
            <Card variant="outlined">
              <h3 className="font-bold text-slate-900 mb-1">Key constraints</h3>
              <p className="text-slate-600">Large datasets, destructive operations, provider API limits, and cross-platform parity.</p>
            </Card>
            <Card variant="outlined">
              <h3 className="font-bold text-slate-900 mb-1">Outcome signal</h3>
              <p className="text-slate-600">Validated with a successful 30,000+ email cleanup in personal real-world usage.</p>
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
                <h4 className="text-base font-bold mt-0 mb-2">Repository and architecture docs</h4>
                <ul className="space-y-1 text-sm text-slate-700">
                  <li><a href="https://tools.datadustr.com/" target="_blank" rel="noopener noreferrer">Live product site (tools.datadustr.com)</a></li>
                  <li><a href="https://github.com/JsonTyler/data-dustr-tools" target="_blank" rel="noopener noreferrer">data-dustr-tools repository</a></li>
                  <li><a href="https://github.com/JsonTyler/data-dustr-tools/blob/main/docs/architecture.md" target="_blank" rel="noopener noreferrer">System architecture documentation</a></li>
                  <li><a href="https://github.com/JsonTyler/data-dustr-tools/blob/main/docs/product-editions-and-policy.md" target="_blank" rel="noopener noreferrer">Edition and policy model</a></li>
                  <li><a href="https://github.com/JsonTyler/data-dustr-tools/blob/main/docs/adr/0001-layered-boundaries.md" target="_blank" rel="noopener noreferrer">ADR, layered boundaries</a></li>
                </ul>
              </Card>
              <Card variant="outlined">
                <h4 className="text-base font-bold mt-0 mb-2">Implementation surfaces</h4>
                <ul className="space-y-1 text-sm text-slate-700">
                  <li><a href="https://github.com/JsonTyler/data-dustr-tools/blob/main/lib/product/policy.ts" target="_blank" rel="noopener noreferrer">Central policy engine</a></li>
                  <li><a href="https://github.com/JsonTyler/data-dustr-tools/blob/main/lib/inbox-dustr/cleanupHeuristics.ts" target="_blank" rel="noopener noreferrer">Inbox cleanup heuristics</a></li>
                  <li><a href="https://github.com/JsonTyler/data-dustr-tools/blob/main/lib/file-dustr/workflows.ts" target="_blank" rel="noopener noreferrer">File workflow orchestration</a></li>
                  <li><a href="https://github.com/JsonTyler/data-dustr-tools/tree/main/src-tauri" target="_blank" rel="noopener noreferrer">Desktop runtime (Tauri)</a></li>
                </ul>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card variant="outlined">
              <h3 className="text-base font-bold mt-0 mb-2">Implemented</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>File Dustr with local filesystem workflows</li>
                <li>Inbox Dustr with Gmail integration</li>
                <li>Web demo and desktop runtime parity</li>
              </ul>
            </Card>
            <Card variant="outlined">
              <h3 className="text-base font-bold mt-0 mb-2">In development</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>Usability refinements from real personal usage</li>
                <li>Performance tuning for larger inboxes</li>
                <li>Cleanup rule quality improvements</li>
              </ul>
            </Card>
            <Card variant="outlined">
              <h3 className="text-base font-bold mt-0 mb-2">Planned</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>Outlook provider adapter</li>
                <li>Licensing and entitlement infrastructure</li>
                <li>Additional storage provider adapters</li>
              </ul>
            </Card>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mt-0 mb-3">Architecture diagram</h3>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center text-sm">
              <div className="bg-white border border-slate-300 rounded p-3">
                <p className="font-semibold text-slate-900 mb-1">Clients</p>
                <p className="text-slate-700">Web demo, desktop app</p>
              </div>
              <div className="text-center text-slate-500 font-semibold">→</div>
              <div className="bg-white border border-slate-300 rounded p-3">
                <p className="font-semibold text-slate-900 mb-1">App core</p>
                <p className="text-slate-700">Shared UI, state, module routing</p>
              </div>
              <div className="text-center text-slate-500 font-semibold">→</div>
              <div className="bg-white border border-slate-300 rounded p-3">
                <p className="font-semibold text-slate-900 mb-1">Policy + adapters</p>
                <p className="text-slate-700">Entitlements, Gmail API, filesystem access</p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mt-0 mb-3">Decision log</h3>
          <div className="overflow-x-auto">
            <table aria-label="DataDustrTools architectural decision log">
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
                  <td>Need both web demos and desktop real-data workflows without drift.</td>
                  <td>Separate clients or shared UI with adapters.</td>
                  <td>Shared UI/state layer with platform adapters.</td>
                  <td>Independent web and desktop UI stacks.</td>
                  <td>Reduced duplicated engineering work while preserving parity.</td>
                  <td>Adapter complexity and runtime branching.</td>
                  <td>90% shared React surface and faster cross-platform release cadence.</td>
                </tr>
                <tr>
                  <td>Edition/tier rules risk becoming scattered and inconsistent.</td>
                  <td>Inline entitlement checks or centralized policy service.</td>
                  <td>Centralized policy layer.</td>
                  <td>Ad-hoc feature checks per component and module.</td>
                  <td>Improved testability and consistent behavior across modules.</td>
                  <td>Extra abstraction and policy maintenance overhead.</td>
                  <td>Single source of truth for feature access and licensing boundaries.</td>
                </tr>
                <tr>
                  <td>Need actionable cleanup recommendations while protecting user trust.</td>
                  <td>Full-content scanning, metadata heuristics, or mixed strategy.</td>
                  <td>Metadata-first heuristic analysis.</td>
                  <td>Deep content inspection as default path.</td>
                  <td>Balanced speed, privacy, and recommendation quality for real usage.</td>
                  <td>Lower semantic precision for niche edge cases.</td>
                  <td>Stable scanning pipelines and safe recommendation behavior at 30,000+ email validation scale.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Product Architecture</h2>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Modular Feature Structure</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            The product is organized into two primary modules, each addressing a distinct user workflow:
          </p>
          <div className="space-y-4 mb-8">
            <div className="bg-white border-l-4 border-amber-600 p-6 rounded">
              <h4 className="font-bold text-slate-900 mb-2">File Dustr</h4>
              <p className="text-slate-700 leading-relaxed mb-2">
                Analyzes local file systems for duplicates, old files, and large files that consume space. Provides recommendations for cleanup with safe defaults: confirmation before deletion, undo capability, and preview of what will be removed.
              </p>
              <p className="text-sm text-slate-600">Current implementation: Local filesystem access</p>
            </div>
            <div className="bg-white border-l-4 border-amber-600 p-6 rounded">
              <h4 className="font-bold text-slate-900 mb-2">Inbox Dustr</h4>
              <p className="text-slate-700 leading-relaxed mb-2">
                Analyzes email accounts (currently Gmail) for old messages, large emails, newsletters, and duplicates. Provides intelligent recommendations rather than simple rules. Built-in safety: multiple confirmation steps before any action.
              </p>
              <p className="text-sm text-slate-600">Current implementation: Gmail integration</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">The Policy Layer: Centralized Business Logic</h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            The key architectural decision was a centralized policy engine for feature availability and licensing behavior.
          </p>
          <div className="bg-white border border-slate-300 rounded-lg p-8 mb-6">
            <ul className="list-disc list-inside space-y-1 text-slate-700 mb-4">
              <li>Avoids scattered checks like tier/platform conditionals across UI modules</li>
              <li>Keeps entitlement logic testable and auditable in one location</li>
              <li>Lets UI ask policy questions instead of encoding business rules directly</li>
            </ul>
            <div className="bg-slate-50 border border-slate-200 rounded p-4 my-4 font-mono text-sm">
              <p className="text-slate-700 mb-2">// Example query pattern</p>
              <p className="text-slate-700">const canBulkDelete = policy.canPerformAction(</p>
              <p className="text-slate-700 ml-4">&#39;bulk-delete&#39;,</p>
              <p className="text-slate-700 ml-4">user.tier,  // 'free' | 'pro' | 'enterprise'</p>
              <p className="text-slate-700 ml-4">platform    // 'web' | 'desktop'</p>
              <p className="text-slate-700">)</p>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Pricing changes and feature expansions now update one policy surface instead of multiple UI branches.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Platform Adapters: Shared Code, Platform-Specific Behavior</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            The web and desktop applications share 90% of React code. Platform-specific capabilities are abstracted through adapters:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6">
            <li><strong>File system adapter:</strong> Desktop uses native Tauri bindings; web uses a demo mode with synthetic data</li>
            <li><strong>Email adapters:</strong> Gmail adapter for API integration; additional adapters for future providers</li>
            <li><strong>Storage adapter:</strong> Desktop uses SQLite for local data; web uses browser storage or backend</li>
            <li><strong>Authentication adapter:</strong> Desktop uses OAuth directly; web uses backend proxy for security</li>
          </ul>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Search & Analysis: Intelligent Over Simplistic</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            The core challenge: provide meaningful cleanup recommendations, not just literal matching. Real-world analysis revealed the need for intelligent approaches:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700">
            <li><strong>Fuzzy matching:</strong> Find similar files based on patterns, not exact names</li>
            <li><strong>Temporal analysis:</strong> Identify emails older than threshold, with reduced relevance over time</li>
            <li><strong>Metadata patterns:</strong> Newsletter detection, marketing email classification without reading content</li>
            <li><strong>Size analysis:</strong> Find unusually large files and emails relative to user's typical data</li>
            <li><strong>Frequency patterns:</strong> Identify rarely-accessed files and read-once emails</li>
          </ul>
        </div>
      </section>

      {/* Technical Implementation Section */}
      <section className="section-padding">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Technical Implementation</h2>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Technology Stack Rationale</h3>
          <ul className="list-disc list-inside space-y-2 text-slate-700 mb-8">
            <li><strong>Next.js 16 + React 19 + TypeScript:</strong> typed full-stack surface and consistent delivery path for web + desktop shell.</li>
            <li><strong>Tailwind CSS:</strong> enforce design-system consistency without bespoke CSS drift.</li>
            <li><strong>Tauri:</strong> desktop runtime with smaller footprint than Electron for local-workflow use cases.</li>
            <li><strong>SQLite:</strong> embedded local persistence for desktop sessions and high-volume item workflows.</li>
            <li><strong>Gmail API + OAuth:</strong> secure provider integration with explicit permission boundaries.</li>
          </ul>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Performance Optimization Approach</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            Performance became critical during real-world testing. Processing 30,000 emails revealed that naive approaches (load all data, analyze synchronously, render everything) would fail. Solutions implemented:
          </p>
          <div className="bg-white border border-slate-300 rounded-lg p-6">
            <p className="text-slate-700 mb-4"><strong>Pagination & Lazy Loading:</strong> Data loads in chunks (typically 50-100 items). Analysis happens incrementally. UI is responsive while background processing continues.</p>
            <p className="text-slate-700 mb-4"><strong>Virtual Scrolling:</strong> Only viewport-visible items render. This allows displaying lists of 100,000 items without memory bloat. Implementation uses React windowing libraries for efficiency.</p>
            <p className="text-slate-700 mb-4"><strong>Web Workers:</strong> Heavy analysis (duplicate detection, pattern matching, statistical analysis) runs on background threads. Main thread stays responsive for UI interactions.</p>
            <p className="text-slate-700 mb-4"><strong>Batch Operations:</strong> Instead of deleting items one-by-one through API calls, batch operations group changes. Reduces API overhead and improves user perception of responsiveness.</p>
            <p className="text-slate-700"><strong>Caching & Memoization:</strong> Analysis results are cached. Re-running the same analysis multiple times uses cached results. This is critical for exploratory workflows where users might adjust filters multiple times.</p>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Safety & Confidence Features</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            Deletion is irreversible in most systems. This creates user hesitation. The product builds confidence through:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700">
            <li><strong>Preview before action:</strong> Users see exactly what will be deleted before confirming</li>
            <li><strong>Confirmation dialogs:</strong> For destructive operations, require explicit user confirmation</li>
            <li><strong>Undo capability:</strong> Desktop version supports local undo (revert deletions from current session)</li>
            <li><strong>Safe defaults:</strong> Conservative suggestions by default; aggressive options available for power users</li>
            <li><strong>Dry-run mode:</strong> Users can simulate cleanup without making changes</li>
          </ul>
        </div>
      </section>

      {/* Real-World Validation Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Real-World Validation & Learning</h2>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Processing 30,000 Emails: What I Learned</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            I used DataDustrTools to clean one of my personal Gmail accounts. This was not a theoretical exercise, it was real usage of the product at meaningful scale. Key discoveries:
          </p>

          <div className="space-y-4 mb-8">
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h4 className="font-bold text-slate-900 mb-2">1. Performance Optimization Was Non-Negotiable</h4>
              <p className="text-slate-700 leading-relaxed">
                The initial implementation would have taken 5+ minutes to load a 30,000-email account. After optimization (pagination, virtual scrolling, Web Workers), the same analysis completes in seconds. This was not a "nice-to-have", it was fundamental to usability.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h4 className="font-bold text-slate-900 mb-2">2. Analysis Accuracy Matters Enormously</h4>
              <p className="text-slate-700 leading-relaxed">
                Bad recommendations destroy trust. If the system suggests deleting important emails, users abandon it. This forced improvements to the analysis algorithm to reduce false positives. Better to suggest fewer deletions (with high confidence) than many deletions (with low confidence).
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h4 className="font-bold text-slate-900 mb-2">3. Users Need Confidence in Destructive Operations</h4>
              <p className="text-slate-700 leading-relaxed">
                Deletions feel permanent (even when they are reversible). This led to preview, multiple confirmations, and undo support. These features added implementation complexity but were required for safe day-to-day use.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h4 className="font-bold text-slate-900 mb-2">4. The Workflow Needs to Be Interruptible</h4>
              <p className="text-slate-700 leading-relaxed">
                Users don't want to sit through a 5-minute analysis without being able to do other things. The product now supports pausing analysis, switching between modules, and resuming later. This required state management changes but significantly improved usability.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h4 className="font-bold text-slate-900 mb-2">5. Different Users Need Different Approaches</h4>
              <p className="text-slate-700 leading-relaxed">
                Some users want aggressive cleanup (delete anything old). Others want conservative suggestions (only obvious duplicates). Rather than building separate workflows, the product evolved to support different sensitivity levels and provides explanations for each suggestion.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">What's Next: Scaling Beyond 30,000</h3>
          <p className="text-slate-700 leading-relaxed">
            I have another personal email account with 100,000+ emails that I plan to clean using this tool. This will stress-test the system at legitimate scale and likely reveal additional edge cases, performance bottlenecks, and usability improvements. Rather than guessing about scale, I'm validating through real usage.
          </p>
        </div>
      </section>

      {/* Challenges & Solutions Section */}
      <section className="section-padding">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Specific Technical Challenges</h2>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Challenge: Maintaining Feature Parity Across Platforms</h3>
          <div className="bg-white border border-slate-300 rounded-lg p-6 mb-6">
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>Problem:</strong> Desktop and web have different capabilities. Desktop has direct file system access; web doesn't. How do we maintain feature parity without either crippling the web version or over-complicating the desktop version?
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>Solution:</strong> Tiered capabilities based on platform. Web offers File Dustr in demo mode with synthetic data. Desktop offers full functionality. Both offer Inbox Dustr identically. This allows users to explore and understand the product on web, then use the full power on desktop.
            </p>
            <p className="text-slate-700 leading-relaxed">
              <strong>Lesson:</strong> Perfect feature parity is neither necessary nor desirable. Let each platform shine with its unique strengths while maintaining core functionality everywhere.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Challenge: Email Provider Integration Complexity</h3>
          <div className="bg-white border border-slate-300 rounded-lg p-6">
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>Problem:</strong> Gmail API is powerful but has quirks: rate limits, pagination tokens, metadata retrieval limits, and authentication complexity. Getting this right is critical, bugs here can corrupt user data or lose analysis results.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>Solution:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-700 mb-4">
              <li>Adapter pattern abstracts provider-specific logic</li>
              <li>Comprehensive error handling for API failures</li>
              <li>Rate limit awareness with exponential backoff</li>
              <li>Pagination support for large result sets</li>
              <li>Tests with real Gmail API (not mocks)</li>
            </ul>
            <p className="text-slate-700 leading-relaxed">
              <strong>Future:</strong> Outlook support is planned. The adapter architecture keeps adding new providers straightforward: implement the interface, handle provider-specific behavior, and validate.
            </p>
          </div>
        </div>
      </section>

      {/* Engineering Qualities Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">What This Project Demonstrates</h2>

          <p className="text-slate-700 leading-relaxed mb-8">
            DataDustrTools showcases my engineering approach:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            <Card variant="outlined">
              <h4 className="font-bold text-slate-900 mb-2">Architectural Thinking</h4>
              <p className="text-slate-700 text-sm">
                Recognizing the need for a policy layer, platform adapters, and modular structure. These aren't necessary for a simple product but are essential for one that will scale and evolve.
              </p>
            </Card>
            <Card variant="outlined">
              <h4 className="font-bold text-slate-900 mb-2">Performance Discipline</h4>
              <p className="text-slate-700 text-sm">
                Understanding that "it works on my test data" is not sufficient. Real datasets (30,000 emails) require real optimization thinking from day one, not bolted on later.
              </p>
            </Card>
            <Card variant="outlined">
              <h4 className="font-bold text-slate-900 mb-2">User-Centric Engineering</h4>
              <p className="text-slate-700 text-sm">
                Features like preview, confirmation, and undo aren't technically required but are absolutely necessary for a product that modifies user data. Engineering includes thinking about user psychology and trust.
              </p>
            </Card>
            <Card variant="outlined">
              <h4 className="font-bold text-slate-900 mb-2">Cross-Platform Complexity</h4>
              <p className="text-slate-700 text-sm">
                Managing shared code across web and desktop platforms requires careful abstraction. This is genuinely complex engineering, not simple UI work.
              </p>
            </Card>
            <Card variant="outlined">
              <h4 className="font-bold text-slate-900 mb-2">Real-World Validation</h4>
              <p className="text-slate-700 text-sm">
                Using the product myself to clean 30,000 emails revealed far more about its strengths and weaknesses than theoretical testing could. This is mature engineering, validation through real usage.
              </p>
            </Card>
            <Card variant="outlined">
              <h4 className="font-bold text-slate-900 mb-2">Continuous Refinement</h4>
              <p className="text-slate-700 text-sm">
                The codebase evolves based on real usage. I keep architecture boundaries explicit while adding features so iteration does not erode maintainability.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Current Implementation Section */}
      <section className="section-padding">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Current Implementation Status</h2>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">What's Live Today</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            <div className="flex gap-4 items-start">
              <span className="text-green-600 font-bold text-2xl flex-shrink-0">✓</span>
              <div>
                <h4 className="font-bold text-slate-900">File Dustr (Desktop)</h4>
                <p className="text-slate-700 text-sm">Fully functional for local file system analysis and cleanup</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <span className="text-green-600 font-bold text-2xl flex-shrink-0">✓</span>
              <div>
                <h4 className="font-bold text-slate-900">Inbox Dustr (Web + Desktop)</h4>
                <p className="text-slate-700 text-sm">Gmail integration complete, ready for real-world usage</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <span className="text-green-600 font-bold text-2xl flex-shrink-0">✓</span>
              <div>
                <h4 className="font-bold text-slate-900">Web Demo Mode</h4>
                <p className="text-slate-700 text-sm">Demonstration experience with synthetic data</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <span className="text-green-600 font-bold text-2xl flex-shrink-0">✓</span>
              <div>
                <h4 className="font-bold text-slate-900">Multi-Platform Desktop (Windows/macOS)</h4>
                <p className="text-slate-700 text-sm">Tauri-based desktop application builds and runs on both platforms</p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">In Development or Planned</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            <div className="flex gap-4 items-start">
              <span className="text-slate-400 font-bold text-2xl flex-shrink-0">◯</span>
              <div>
                <h4 className="font-bold text-slate-900">Outlook Integration</h4>
                <p className="text-slate-700 text-sm">Planned next integration after Gmail validation</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <span className="text-slate-400 font-bold text-2xl flex-shrink-0">◯</span>
              <div>
                <h4 className="font-bold text-slate-900">Commercial Licensing</h4>
                <p className="text-slate-700 text-sm">Free, Pro, and Enterprise tiers (infrastructure planned, not yet implemented)</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <span className="text-slate-400 font-bold text-2xl flex-shrink-0">◯</span>
              <div>
                <h4 className="font-bold text-slate-900">Additional Storage Integrations</h4>
                <p className="text-slate-700 text-sm">Google Drive, OneDrive, Dropbox support (future roadmap)</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
