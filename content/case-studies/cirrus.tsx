export function CirrusCaseStudy() {
  return <div className="container-max case-story">
    <section className="story-summary"><p className="eyebrow">Cirrus compact mode</p><h2>More records. Same workspace.</h2><p className="lead">One density setting adjusts spacing across the toolbar, navigation, panels, and table. The demo keeps the same 15 records and body text size.</p></section>
    <section className="story-limits"><h2>Production feature, recreated here</h2><p>Compact mode shipped in production. This portfolio interpretation uses synthetic data; the visible-row counts describe this demo.</p></section>
    <details className="implementation-details"><summary className="focus-ring">Implementation details</summary><div><p>A shared density state changes spacing across the interface. ResizeObserver measures fully visible rows after the layout settles, including when the viewport changes.</p><p>The viewport stays the same height in both modes. On small screens, the table prioritizes deduction type and amount. Controls support keyboard activation and respect reduced motion.</p></div></details>
  </div>;
}
