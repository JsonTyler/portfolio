
import { LocalizedContent } from '@/components/LanguageProvider';
export function DesignLibraryCaseStudy() {
  return <LocalizedContent>{<div className="container-max case-story">
    <section className="story-summary">
      <p className="eyebrow">Springbrook Software · 2022–present</p>
      <h1>Consistency through shared components.</h1>
      <p className="lead">As a senior front-end engineer and lead UX designer, I owned and maintained Springbrook’s existing design system, called the Design Library, and worked on interface patterns for an ERP platform.</p>
      <dl className="story-facts">
        <div><dt>My role</dt><dd>Component-library ownership, front-end team leadership, and UX design</dd></div>
        <div><dt>Work delivered</dt><dd>Maintained shared components, documented standards, and coordinated front-end implementation</dd></div>
        <div><dt>Production result</dt><dd>Reusable controls and interface patterns, with a public playground for exploring the system.</dd></div>
      </dl>
      <p><a className="story-link focus-ring" href="https://design.sprbrk.com/" target="_blank" rel="noopener noreferrer">Explore the design system ↗<span className="sr-only"> (new tab)</span></a></p>
    </section>
    <section>
      <h2>The challenge: consistency across workflows</h2>
      <p>Enterprise software brings many controls and workflows into the same product. My work focused on UX consistency: connecting the component library with documented standards and the interfaces teams were building.</p>
    </section>
    <section>
      <h2>My contribution</h2>
      <p>I maintained the existing library rather than starting a new system. Alongside component ownership, I led UX design efforts and guided front-end implementation, working with product and engineering teams to coordinate delivery.</p>
      <p>The implementation used Blazor, C#, SASS, TypeScript, and Azure DevOps.</p>
      <p>I connected reusable controls with documented UX standards and the workflows teams were building, so design and implementation could follow the same patterns.</p>
    </section>
    <section>
      <h2>What the work demonstrates</h2>
      <p>Ownership of an existing design system, coordination across design and engineering, and delivery within an enterprise platform. The public playground makes the component patterns available to inspect.</p>
    </section>
    <section>
      <h2>Related work</h2>
      <p><a className="story-link focus-ring" href="/#cirrus/details">Read the compact-mode case study →</a></p>
    </section>
  </div>}</LocalizedContent>;
}
