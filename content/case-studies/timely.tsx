export function TimelyCaseStudy() {
  return (
    <div className="container-max case-story">
      <section className="story-summary">
        <p className="eyebrow">Undergraduate research prototype</p>
        <h2>Details in a table. Duration on a timeline.</h2>
        <p className="lead">Timely explores how forensic custody records can be represented over time. A form collects case and item details; a table exposes the record and a Vis.js timeline represents its time interval.</p>
        <dl className="story-facts">
          <div>
            <dt>Context</dt>
            <dd>Undergraduate digital-forensics research</dd>
          </div>
          <div>
            <dt>Implementation</dt>
            <dd>JavaScript, Vis.js, browser local storage</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>Historical prototype, preserved for reference</dd>
          </div>
        </dl>
      </section>
      <section>
        <h2>One record, two representations</h2>
        <p>The same locally stored record supplies table fields and a Vis.js date interval. CSV export takes the demonstration data out of the browser.</p>
        <a className="story-link" href="https://github.com/JsonTyler/Timely/blob/master/assets/js/script.js">Inspect the record-to-timeline mapping ↗</a>
      </section>
      <section>
        <h2>What the representation makes explicit</h2>
        <p>The table exposes individual fields; the timeline exposes the interval between removal and return. Each view answers a different question.</p>
      </section>
      <section className="story-limits">
        <h2>Research prototype, not an evidence system</h2>
        <p>A historical research prototype, not an audited evidence system. Input handling, storage recovery, timeline updates, and repeated export need further verification. Explore it with synthetic data.</p>
      </section>
    </div>
  );
}
