export function ThreadkeepCaseStudy({ embedded = false }: { embedded?: boolean }) {
  const Heading = embedded ? 'h1' : 'h2';
  return <div className="container-max case-story">
    <section className="story-summary">
      <p className="eyebrow">Threadkeep · Independent application</p>
      <Heading>A useful place to return to.</Heading>
      <p className="lead">When an AI-assisted project spans several sessions, the code survives but the reasoning can get scattered. I built Threadkeep to keep the stopping point, next move, decisions, and unanswered questions together.</p>
      <dl className="story-facts">
        <div><dt>My role</dt><dd>Product design and end-to-end implementation</dd></div>
        <div><dt>Stack</dt><dd>Python, SQLite, JavaScript, HTML, and CSS; no runtime packages</dd></div>
        <div><dt>Scope</dt><dd>Working local app with a Codex integration</dd></div>
      </dl>
    </section>
    <section><h2>One source of context</h2><p>The browser workspace and Codex adapter read and write the same revisioned SQLite store. Load and save are explicit. If another session saves first, a stale write is rejected so the newer direction can be reviewed before merging.</p></section>
    <section><h2>Designing for interrupted work</h2><p>The return view pairs where work stopped with the next move. Resume opens a durable session; captures build a working notebook. Wrap-up assembles an editable handoff with source references. Browser drafts survive reloads, while original handoffs remain in history.</p></section>
    <section><h2>Engineering the boundaries</h2><p>The app runs on loopback with local authentication, short-lived single-use launch links, and revocable sessions. Revision checks and idempotent retries protect saves. Automated tests cover storage, CLI/browser round trips, conflict recovery, and the work-session lifecycle.</p></section>
    <section className="story-limits"><h2>What is shown here</h2><p>These are screenshots of the working application using isolated fictional projects. They are not an interactive hosted instance. Source and personal working records remain private. Threadkeep shares context through explicit reads and writes; it does not inject updates into an active Codex conversation.</p></section>
  </div>;
}
