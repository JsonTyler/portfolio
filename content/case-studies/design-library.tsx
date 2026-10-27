export function DesignLibraryCaseStudy() {
  return <div className="container-max case-story">
    <section className="story-summary">
      <p className="eyebrow">Springbrook Software · 2022–present</p>
      <h1>Consistency through shared components.</h1>
      <p className="lead">As a senior front-end engineer and lead UX designer, I owned and maintained the existing Design Library and worked on interface patterns for an ERP platform.</p>
      <dl className="story-facts">
        <div><dt>My role</dt><dd>Component-library ownership, front-end team leadership, and UX design</dd></div>
        <div><dt>Environment</dt><dd>Blazor, C#, SASS, TypeScript, and Azure DevOps</dd></div>
        <div><dt>Work delivered</dt><dd>Maintained shared components, documented standards, and coordinated front-end implementation</dd></div>
      </dl>
    </section>
    <section>
      <h2>The challenge: consistency across workflows</h2>
      <p>Enterprise software brings many controls and workflows into the same product. My work focused on UX consistency: connecting the component library with documented standards and the interfaces teams were building.</p>
    </section>
    <section>
      <h2>My contribution</h2>
      <p>I maintained the existing library rather than starting a new system. Alongside component ownership, I led UX design efforts and guided front-end implementation, working with product and engineering teams to coordinate delivery.</p>
      <p>The work covered both reusable interface patterns and their use in the product. The public Design Library playground provides a way to explore the controls and patterns.</p>
      <p><a className="story-link focus-ring" href="https://sprbrk.design.com/" target="_blank" rel="noopener noreferrer">Explore the public component playground ↗<span className="sr-only"> (new tab)</span></a></p>
    </section>
    <section>
      <h2>A concrete example: compact mode</h2>
      <p>Compact mode shipped in production. The independent recreation in this portfolio demonstrates the interaction: one density setting adjusts navigation, toolbars, panels, and table spacing while keeping the body text size and records unchanged.</p>
      <p>The demo makes the tradeoff visible. Visitors can compare how many complete rows fit in the same viewport and see how a shared setting affects the whole workspace.</p>
      <p><a className="story-link focus-ring" href="/#cirrus">Try the compact-mode recreation →</a></p>
    </section>
    <section>
      <h2>What the work demonstrates</h2>
      <p>Ownership of a shared component package, coordination across design and engineering, and delivery within an existing enterprise platform. The production compact-mode feature is one concrete example; the public playground is another way to inspect the component work.</p>
      <p>This account describes my responsibilities and delivered work. The compact-mode demo uses fictional data and does not imply sole authorship of the production feature.</p>
    </section>
  </div>;
}
