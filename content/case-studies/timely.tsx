'use client';

import { Card } from '@/components/ui/Card';

export function TimelyCaseStudy() {
  return (
    <>
      {/* Overview Section */}
      <section className="section-padding">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Overview</h2>
          <p className="text-lg text-slate-700 leading-relaxed mb-8">
            Timely is an undergraduate research project: a chain-of-custody visualizer for digital forensics workflows. The work combined domain research, data modeling, and implementation, and was later published at IEEE SoutheastCon 2019.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="outlined">
              <h3 className="font-bold text-slate-900 mb-1">What was built</h3>
              <p className="text-slate-600">A chain-of-custody visualization system for digital forensic workflows.</p>
            </Card>
            <Card variant="outlined">
              <h3 className="font-bold text-slate-900 mb-1">Key constraints</h3>
              <p className="text-slate-600">Complex relationship data, domain-specific correctness, and research-grade rigor.</p>
            </Card>
            <Card variant="outlined">
              <h3 className="font-bold text-slate-900 mb-1">Outcome signal</h3>
              <p className="text-slate-600">Published at IEEE SoutheastCon 2019 after peer-review and iterative validation.</p>
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
                  <li><a href="https://github.com/JsonTyler/Timely" target="_blank" rel="noopener noreferrer">Original Timely repository</a></li>
                  <li><a href="https://timeliny.jasontylerrodriguez.com/" target="_blank" rel="noopener noreferrer">Former project subdomain (archived)</a></li>
                  <li><a href="https://github.com/JsonTyler/Staticerson/blob/main/content/case-studies/timely.tsx" target="_blank" rel="noopener noreferrer">Case study source and decision rationale</a></li>
                  <li><a href="https://github.com/JsonTyler/Staticerson/blob/main/content/projects.ts" target="_blank" rel="noopener noreferrer">Project metadata and portfolio integration</a></li>
                </ul>
              </Card>
              <Card variant="outlined">
                <h4 className="text-base font-bold mt-0 mb-2">Research artifacts with limited public access</h4>
                <ul className="space-y-1 text-sm text-slate-700">
                  <li>The original undergraduate repository and datasets are archived and not fully public.</li>
                  <li>Normally shared artifacts would include dataset samples, graph interaction recordings, and benchmark runs used during publication prep.</li>
                </ul>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card variant="outlined">
              <h3 className="text-base font-bold mt-0 mb-2">Implemented</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>Graph-based chain-of-custody visualizer</li>
                <li>Interactive node and edge navigation</li>
                <li>Research write-up and publication support</li>
              </ul>
            </Card>
            <Card variant="outlined">
              <h3 className="text-base font-bold mt-0 mb-2">In development</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>Project is complete and archived</li>
                <li>No active feature development</li>
              </ul>
            </Card>
            <Card variant="outlined">
              <h3 className="text-base font-bold mt-0 mb-2">Planned</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>No current roadmap items</li>
                <li>Potential modernization only if reopened</li>
              </ul>
            </Card>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mt-0 mb-3">Model diagram</h3>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center text-sm">
              <div className="bg-white border border-slate-300 rounded p-3">
                <p className="font-semibold text-slate-900 mb-1">Evidence node</p>
                <p className="text-slate-700">Artifact, source, handler metadata</p>
              </div>
              <div className="text-center text-slate-500 font-semibold">→</div>
              <div className="bg-white border border-slate-300 rounded p-3">
                <p className="font-semibold text-slate-900 mb-1">Relationship edges</p>
                <p className="text-slate-700">Transfer, analysis, derivation links</p>
              </div>
              <div className="text-center text-slate-500 font-semibold">→</div>
              <div className="bg-white border border-slate-300 rounded p-3">
                <p className="font-semibold text-slate-900 mb-1">Investigator view</p>
                <p className="text-slate-700">Timeline and lineage exploration</p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mt-0 mb-3">Decision log</h3>
          <div className="overflow-x-auto">
            <table aria-label="Timely decision log">
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
                  <td>Linear tables obscured evidence lineage relationships.</td>
                  <td>Tabular views, timeline-only views, or graph model.</td>
                  <td>Interactive graph visualization.</td>
                  <td>Spreadsheet-style and static timeline-only interfaces.</td>
                  <td>Made dependency and transfer paths easier to inspect quickly.</td>
                  <td>Higher UI complexity and rendering constraints.</td>
                  <td>Investigators could inspect relationship context faster than with linear views.</td>
                </tr>
                <tr>
                  <td>Need broad accessibility for researchers and reviewers.</td>
                  <td>Desktop-only app or web-delivered prototype.</td>
                  <td>Web stack delivery.</td>
                  <td>Desktop-bound prototype requiring local installs.</td>
                  <td>Simplified distribution and evaluation in research settings.</td>
                  <td>Browser performance limits for dense graphs.</td>
                  <td>Lower friction for demonstration, collaboration, and publication review.</td>
                </tr>
                <tr>
                  <td>Forensic domain requirements were easy to misinterpret without expert input.</td>
                  <td>Build from assumptions or iterate with domain feedback.</td>
                  <td>Iterative cycles with forensic feedback.</td>
                  <td>One-pass implementation based only on literature.</td>
                  <td>Increased fidelity to real analyst workflows.</td>
                  <td>Longer early design and validation cycles.</td>
                  <td>More credible problem framing and stronger publication readiness.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Problem & Research Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">The Research Problem</h2>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Context: Digital Forensics</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            Digital forensics is the discipline of extracting and analyzing digital evidence from computer systems. A critical component is chain of custody, maintaining a documented history of how evidence was collected, transferred, analyzed, and preserved. This history is essential for legal proceedings; any break in the chain undermines the evidence.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">The Problem</h3>
          <p className="text-slate-700 leading-relaxed mb-6">Chain of custody data is highly interconnected. Investigators need to answer:</p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6">
            <li>Which evidence items were collected when and where</li>
            <li>Who handled each item (and when)</li>
            <li>What analyses were performed</li>
            <li>How results from different analyses relate to each other</li>
            <li>The complete lineage of derivative artifacts</li>
          </ul>
          <p className="text-slate-700 leading-relaxed">
            Traditional tables and sequential logs hide relationship context, which is often the core of forensic reasoning.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Research Question</h3>
          <p className="text-slate-700 leading-relaxed">
            <strong>How can we effectively visualize chain of custody data to help forensic investigators quickly understand the relationships, history, and integrity of digital evidence?</strong>
          </p>
        </div>
      </section>

      {/* Solution Section */}
      <section className="section-padding">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Solution: Interactive Graph Visualization</h2>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Design Approach</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            Rather than tables or timelines, we designed Timely as an interactive graph visualization. Chain of custody data naturally fits a graph model:
          </p>
          <div className="space-y-4 mb-8">
            <div className="bg-white border border-slate-300 rounded-lg p-6">
              <h4 className="font-bold text-slate-900 mb-2">Nodes: Evidence Entities</h4>
              <p className="text-slate-700">Each piece of evidence, analysis, or derivative artifact is a node. Properties include type, timestamp, handler, and other metadata.</p>
            </div>
            <div className="bg-white border border-slate-300 rounded-lg p-6">
              <h4 className="font-bold text-slate-900 mb-2">Edges: Relationships</h4>
              <p className="text-slate-700">Relationships between entities (evidence → analysis, analysis → derivative artifact, evidence → handler) become edges. Edges are typed and directed, showing causality and relationships.</p>
            </div>
            <div className="bg-white border border-slate-300 rounded-lg p-6">
              <h4 className="font-bold text-slate-900 mb-2">Visualization: Interactive Exploration</h4>
              <p className="text-slate-700">Users can navigate the graph, zoom, pan, and query relationships. Color coding shows entity types. Size and positioning represent temporal relationships.</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Technology Choices</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            The implementation used web technologies for accessibility and cross-platform compatibility:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700">
            <li><strong>Vis.js:</strong> Powerful JavaScript graph visualization library with interactive features</li>
            <li><strong>HTML5 & Canvas:</strong> Smooth rendering and performance for complex graphs</li>
            <li><strong>Bootstrap:</strong> UI framework for forms, controls, and responsive layout</li>
            <li><strong>Git:</strong> Version control for research collaboration and tracking iterations</li>
          </ul>
        </div>
      </section>

      {/* Research Methodology Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Research Methodology</h2>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Literature Review</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            We conducted a comprehensive review of existing visualization techniques for complex systems, graph visualization approaches, and forensic methodology literature. This groundwork ensured our approach was novel and built on established principles.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Design & Development Cycles</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            The project iterated through prototype, domain review, and refinement cycles, with each iteration validated by forensic professionals.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Key Research Contributions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Card variant="outlined">
              <h4 className="font-bold text-slate-900 mb-2">1. Novel Visualization Approach</h4>
              <p className="text-slate-700 text-sm">
                Demonstrated that graph visualization is more effective than traditional tabular or sequential representations for chain of custody data. Users could understand complex relationships faster.
              </p>
            </Card>
            <Card variant="outlined">
              <h4 className="font-bold text-slate-900 mb-2">2. Domain-Specific Design</h4>
              <p className="text-slate-700 text-sm">
                Showed how general visualization techniques can be adapted for specific domains by understanding user workflows, constraints, and information needs. Generic visualization ≠ effective domain visualization.
              </p>
            </Card>
            <Card variant="outlined">
              <h4 className="font-bold text-slate-900 mb-2">3. Practical Implementation</h4>
              <p className="text-slate-700 text-sm">
                Proved the concept works in practice with real forensic datasets. Showed that the approach scales reasonably well even with complex chains of custody involving hundreds of evidence items.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Publication Section */}
      <section className="section-padding">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Publication & Impact</h2>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Peer-Reviewed Publication</h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            The research was published at IEEE SoutheastCon 2019 under the title "Timely: A Chain of Custody Data Visualizer." This was a selective conference requiring peer review and rigorous evaluation.
          </p>
          <p className="text-slate-700 leading-relaxed mb-6">
            Publishing in a peer-reviewed venue meant:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 mb-8">
            <li>Subjecting the work to expert review and critique</li>
            <li>Responding to reviewers with rigorous counterarguments or improvements</li>
            <li>Demonstrating that the research contributes novel insights to the field</li>
            <li>Creating a permanent record of the work in academic literature</li>
          </ul>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">What This Demonstrates</h3>
          <p className="text-slate-700 leading-relaxed">
            Publishing research as an undergraduate shows the ability to conduct rigorous, original work that contributes to a field. It is different from industry projects, because it requires deep thinking about problems, literature knowledge, and the discipline to document and communicate findings formally.
          </p>
        </div>
      </section>

      {/* Technical Skills Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Technical & Research Skills Demonstrated</h2>

          <div className="space-y-4">
            <Card variant="outlined">
              <h4 className="font-bold text-slate-900 mb-2">Information Visualization</h4>
              <p className="text-slate-700 text-sm">
                Designing effective visual representations of complex data. Understanding how humans perceive and interpret visualizations. Choosing appropriate visualization techniques for specific data types and use cases.
              </p>
            </Card>
            <Card variant="outlined">
              <h4 className="font-bold text-slate-900 mb-2">Domain Understanding</h4>
              <p className="text-slate-700 text-sm">
                Learning a specialized domain (digital forensics) sufficiently to identify real problems and design solutions. This required reading forensic methodology papers, understanding investigator workflows, and consulting with experts.
              </p>
            </Card>
            <Card variant="outlined">
              <h4 className="font-bold text-slate-900 mb-2">System Design</h4>
              <p className="text-slate-700 text-sm">
                Designing a system that could represent and visualize complex chain of custody data. This included data model design, graph algorithms, and interaction design.
              </p>
            </Card>
            <Card variant="outlined">
              <h4 className="font-bold text-slate-900 mb-2">Research Discipline</h4>
              <p className="text-slate-700 text-sm">
                Conducting research systematically: literature review, problem definition, solution design, evaluation, and documentation. Publishing at a peer-reviewed venue requires rigor and communication skills.
              </p>
            </Card>
            <Card variant="outlined">
              <h4 className="font-bold text-slate-900 mb-2">Technical Implementation</h4>
              <p className="text-slate-700 text-sm">
                Building a working prototype that could handle real forensic datasets. Choosing appropriate tools and libraries. Understanding performance and scalability implications.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Lessons & Growth Section */}
      <section className="section-padding">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">What This Project Taught Me</h2>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">1. Understanding Domain Before Building</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            Building for a specific domain requires deep understanding of how users work, what matters to them, and what constraints they face. Reading papers is not enough, talking to domain experts and understanding workflows is essential.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">2. The Power of Visualization</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            Visualization decisions directly affect analysis quality. In this project, graph navigation exposed relationships that were difficult to track in tables. That lesson carried into later product work: representation choices are engineering choices.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">3. Research Communication Skills</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            Writing and publishing research taught me to think clearly, structure complex ideas logically, and communicate findings to skeptical audiences. These skills are valuable far beyond academia, they are essential for technical leadership, architecture documentation, and knowledge sharing.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">4. Building for Real Use Cases</h3>
          <p className="text-slate-700 leading-relaxed">
            The best validation for research work is actual use by domain experts. Iterating based on feedback from forensic professionals revealed issues that theoretical analysis would have missed.
          </p>
        </div>
      </section>

      {/* Positioning Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Why This Matters on a Portfolio</h2>

          <p className="text-slate-700 leading-relaxed mb-6">
            Timely represents different aspects of engineering maturity than typical software projects:
          </p>

          <div className="space-y-4">
            <Card variant="outlined">
              <p className="text-slate-700">
                <strong>Research Thinking:</strong> Shows the ability to identify novel problems, conduct literature review, and contribute original solutions. Not all engineering is about shipping products, sometimes it is about understanding problem domains deeply.
              </p>
            </Card>
            <Card variant="outlined">
              <p className="text-slate-700">
                <strong>Rigor:</strong> Academic publication requires a level of rigor, including peer review, reproducibility, and formal documentation.
              </p>
            </Card>
            <Card variant="outlined">
              <p className="text-slate-700">
                <strong>Communication:</strong> Publishing a paper means explaining complex ideas clearly to experts in the field. This is valuable for technical leadership roles.
              </p>
            </Card>
            <Card variant="outlined">
              <p className="text-slate-700">
                <strong>Technical Depth:</strong> While an undergraduate project, it demonstrates the ability to go deep into a specialized domain and build sophisticated solutions. This is rare for undergraduates.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
