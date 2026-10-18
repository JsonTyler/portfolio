import { ProjectVisual } from '@/components/ProjectVisual';

export function DataDustrToolsCaseStudy() {
  return (
    <div className="container-max case-story">
      <section className="story-summary">
        <p className="eyebrow">Independent product initiative</p>
        <h2>From digital clutter to a reviewable decision.</h2>
        <p className="lead">An independent file and inbox organization product, built around reviewing suggestions before changing data. The business has not launched.</p>
        <dl className="story-facts">
          <div>
            <dt>My role</dt>
            <dd>Independent product design and engineering</dd>
          </div>
          <div>
            <dt>Scope</dt>
            <dd>File Dustr, Inbox Dustr, and a supporting service website</dd>
          </div>
          <div>
            <dt>Runtime</dt>
            <dd>Web demonstration; desktop integration through Tauri</dd>
          </div>
        </dl>
      </section>
      <section>
        <h2>The interaction comes before the operation</h2>
        <p>The review queue groups suggestions and explains rule matches, keeping the decision separate from the operation that changes data.</p>
        <figure className="implementation-flow">
          <ol>
            <li>
              <strong>Scan</strong>
              <span>Load files or demonstration data</span>
            </li>
            <li>
              <strong>Suggest</strong>
              <span>Classify and explain a rule match</span>
            </li>
            <li>
              <strong>Review</strong>
              <span>Let the person inspect an action</span>
            </li>
            <li>
              <strong>Execute</strong>
              <span>Pass the request to a runtime adapter</span>
            </li>
          </ol>
          <figcaption>Implementation map, not an application screenshot. Based on the file workflow and runtime boundaries.</figcaption>
        </figure>
      </section>
      <section className="decision-grid">
        <div>
          <p className="eyebrow">Decision 01</p>
          <h2>Keep the domain separate from the runtime</h2>
          <p>Shared file types and workflow helpers feed the React interface. A platform adapter separates web demonstration behavior from native filesystem and email operations.</p>
          <p>The web demo can run without filesystem access; the desktop boundary needs its own integration tests.</p>
        </div>
        <div>
          <p className="eyebrow">Decision 02</p>
          <h2>Make policy explicit</h2>
          <p>One policy module controls edition and feature availability. Unit tests cover policy, cleanup heuristics, and workflow state.</p>
          <p>The current entitlement is local state. It is not verified payment or a production licensing service.</p>
        </div>
      </section>
      <section className="story-limits">
        <h2>What still needs work</h2>
        <p>End-to-end behavior needs hardening: size and extension do not prove duplicate content; success must follow execution results; undo must restore real data before promising recovery.</p>
        <p>The web edition uses demonstration data. Native cleanup, account access, and cross-platform releases are not presented as production-ready.</p>
      </section>
      <section>
        <h2>A single product story</h2>
        <p>The service website supports this same initiative. Business validation, commercial licensing, and broader integrations remain future work.</p>
        <ProjectVisual slug="datadustr-website" title="DataDustr service website" />
        <p>A separate service site explains the offer and provides contact and consultation paths. It adapts an existing starter; the business has not launched.</p>
        <p className="text-sm text-slate-600">Application source is private. The illustration uses invented sample data; no account data is included.</p>
      </section>
    </div>
);
}
