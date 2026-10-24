export function AsILeftItCaseStudy() {
  return (
    <div className="container-max case-story">
      <section className="story-summary">
        <p className="eyebrow">Local-first application prototype</p>
        <h2>A place to leave your work ready to resume.</h2>
        <p className="lead">As I Left It keeps your stopping point, next move, decisions, and unanswered questions together, so returning to a project starts with useful context.</p>
        <dl className="story-facts">
          <div><dt>My role</dt><dd>Independent product design and engineering</dd></div>
          <div><dt>Scope</dt><dd>Local workspace with optional Codex integration</dd></div>
          <div><dt>Stack</dt><dd>Python, SQLite, and buildless HTML, CSS, and JavaScript</dd></div>
        </dl>
      </section>
      <section>
        <h2>Pause, return, continue.</h2>
        <p>Leave a handoff while the work is fresh. When you return, review where you stopped and what comes next, with decisions, references, and open questions nearby.</p>
        <p>The app and optional Codex integration share revisioned working context. Loading and saving are explicit, with revision checks to catch outdated writes.</p>
      </section>
      <section className="story-limits">
        <h2>Portfolio scope.</h2>
        <p>This case study presents a working local prototype and its pause → return → continue workflow. The project is being preserved as portfolio work; a commercial release is not currently planned.</p>
      </section>
    </div>
  );
}
