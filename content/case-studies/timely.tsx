'use client';

import { Card } from '@/components/ui/Card';

export function TimelyCaseStudy() {
  return (
    <>
      {/* Overview Section */}
      <section className="section-padding-lg">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Overview</h2>
          <p className="text-lg text-slate-700 leading-relaxed mb-8">
            Timely is a research project from my undergraduate years—a chain of custody data visualizer for digital forensic investigators. The project demonstrates my ability to conduct rigorous academic research, understand complex problem domains, implement sophisticated solutions, and communicate findings to technical audiences.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="outlined">
              <h3 className="font-bold text-slate-900 mb-1">Timeline</h3>
              <p className="text-slate-600">2015–2017</p>
            </Card>
            <Card variant="outlined">
              <h3 className="font-bold text-slate-900 mb-1">Publication</h3>
              <p className="text-slate-600">IEEE Southeast Con 2019</p>
            </Card>
            <Card variant="outlined">
              <h3 className="font-bold text-slate-900 mb-1">Role</h3>
              <p className="text-slate-600">Lead researcher & developer</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Problem & Research Section */}
      <section className="section-padding-lg bg-slate-50">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">The Research Problem</h2>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Context: Digital Forensics</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            Digital forensics is the discipline of extracting and analyzing digital evidence from computer systems. A critical component is chain of custody—maintaining a documented history of how evidence was collected, transferred, analyzed, and preserved. This history is essential for legal proceedings; any break in the chain undermines the evidence.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">The Problem</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            Chain of custody information is complex and highly interconnected. Investigators need to understand:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6">
            <li>Which evidence items were collected when and where</li>
            <li>Who handled each item (and when)</li>
            <li>What analyses were performed</li>
            <li>How results from different analyses relate to each other</li>
            <li>The complete lineage of derivative artifacts</li>
          </ul>
          <p className="text-slate-700 leading-relaxed">
            Representing this information in traditional formats (tables, spreadsheets, sequential lists) quickly becomes confusing. The relationships between entities are critical to understanding the chain of custody, but linear representations obscure these relationships.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Research Question</h3>
          <p className="text-slate-700 leading-relaxed">
            <strong>How can we effectively visualize chain of custody data to help forensic investigators quickly understand the relationships, history, and integrity of digital evidence?</strong>
          </p>
        </div>
      </section>

      {/* Solution Section */}
      <section className="section-padding-lg">
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
      <section className="section-padding-lg bg-slate-50">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Research Methodology</h2>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Literature Review</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            We conducted a comprehensive review of existing visualization techniques for complex systems, graph visualization approaches, and forensic methodology literature. This groundwork ensured our approach was novel and built on established principles.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Design & Development Cycles</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            The project followed iterative design: initial prototype → evaluation with domain experts → refinement → next iteration. Each cycle incorporated feedback from forensic professionals who understood the actual use cases and constraints.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Key Research Contributions</h3>
          <div className="space-y-4">
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
      <section className="section-padding-lg">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Publication & Impact</h2>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">Peer-Reviewed Publication</h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            The research was published at IEEE Southeast Con 2019 under the title "Timely: A Chain of Custody Data Visualizer." This was a selective conference requiring peer review and rigorous evaluation.
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
            Publishing research as an undergraduate shows the ability to conduct rigorous, original work that contributes to a field. It's different from industry projects—it requires deep thinking about problems, literature knowledge, and the discipline to document and communicate findings formally.
          </p>
        </div>
      </section>

      {/* Technical Skills Section */}
      <section className="section-padding-lg bg-slate-50">
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
      <section className="section-padding-lg">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">What This Project Taught Me</h2>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">1. Understanding Domain Before Building</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            Building for a specific domain requires deep understanding of how users work, what matters to them, and what constraints they face. Reading papers isn't enough—talking to domain experts and understanding workflows is essential.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">2. The Power of Visualization</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            Well-designed visualization can make complex information understandable. The difference between a table of chain of custody data and an interactive graph visualization is enormous. This lesson carried forward into all subsequent design work—visual hierarchy, effective representation, and user interaction are fundamental to good software.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">3. Research Communication Skills</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            Writing and publishing research taught me to think clearly, structure complex ideas logically, and communicate findings to skeptical audiences. These skills are valuable far beyond academia—they're essential for technical leadership, architecture documentation, and knowledge sharing.
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">4. Building for Real Use Cases</h3>
          <p className="text-slate-700 leading-relaxed">
            The best validation for research work is actual use by domain experts. Iterating based on feedback from forensic professionals revealed issues that theoretical analysis would have missed.
          </p>
        </div>
      </section>

      {/* Positioning Section */}
      <section className="section-padding-lg bg-slate-50">
        <div className="container-max max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Why This Matters on a Portfolio</h2>

          <p className="text-slate-700 leading-relaxed mb-6">
            Timely represents different aspects of engineering maturity than typical software projects:
          </p>

          <div className="space-y-4">
            <Card variant="outlined">
              <p className="text-slate-700">
                <strong>Research Thinking:</strong> Shows the ability to identify novel problems, conduct literature review, and contribute original solutions. Not all engineering is about shipping products—sometimes it's about understanding problem domains deeply.
              </p>
            </Card>
            <Card variant="outlined">
              <p className="text-slate-700">
                <strong>Rigor:</strong> Academic publication requires a level of rigor—peer review, reproducibility, formal documentation—that demonstrates commitment to quality.
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
