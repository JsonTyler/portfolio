export function FramedCaseStudy() {
  return (
    <div className="container-max case-story">
      <section className="story-summary">
        <p className="eyebrow">College project · archived</p>
        <h2>Arrange a wall before reaching for a hammer.</h2>
        <p className="lead">Framed is a college project exploring a canvas-based wall-layout planner. It combines wall dimensions, preset frame sizes, background textures, and draggable groups to explore a practical spatial task.</p>
      </section>
      <section className="decision-grid">
        <div>
          <h2>Direct manipulation</h2>
          <p>Konva groups a rectangle and marker into a draggable frame. Position feedback connects the arrangement to measurements.</p>
          <p>A separate panel supplies wall dimensions, backgrounds, and frame presets.</p>
        </div>
        <div className="story-limits">
          <h2>Where the prototype stops</h2>
          <p>The preserved source uses inconsistent unit conversions. Measurement accuracy is not established. The interactions are predominantly pointer-based, with no complete keyboard equivalent.</p>
          <p>It is an interaction sample, not a precision installation tool. A next pass would unify the geometry and add numeric position controls before adding more decorative options.</p>
        </div>
      </section>
      <section>
        <h2>Inspect the implementation</h2>
        <p>Frame factories, Konva grouping, and measurement tooltips are preserved in the original source.</p>
        <a className="story-link" href="https://github.com/JsonTyler/Framed/blob/master/assets/js/script.js">View the canvas interaction source ↗</a>
      </section>
    </div>
  );
}
