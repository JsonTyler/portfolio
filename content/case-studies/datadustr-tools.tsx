import { InboxDemo } from '@/components/InboxDemo';
import { DataDustrTrailers } from '@/components/DataDustrTrailers';

export function DataDustrToolsCaseStudy() {
  return (
    <div className="container-max case-story">
      <section className="story-summary">
        <p className="eyebrow">Independent product concepts</p>
        <h2>From digital clutter to a reviewable decision.</h2>
        <p className="lead">Inbox Dustr and File Dustr explore how people could organize email and files without losing sight of what changes. These are portfolio prototypes, with interactive demonstrations using fictional data. They are not products for sale.</p>
        <dl className="story-facts">
          <div><dt>My role</dt><dd>Independent product design and engineering</dd></div>
          <div><dt>Exploration</dt><dd>Inbox organization, file review and clear action feedback</dd></div>
          <div><dt>Built with</dt><dd>React, TypeScript, Next.js, Tauri and Rust</dd></div>
        </dl>
        <p><a className="story-link focus-ring" href="https://tools.datadustr.com/" target="_blank" rel="noopener noreferrer">Open the interactive web preview ↗</a></p>
        <p className="text-sm text-slate-600">Choose “Demo with Gmail mock data” or “Demo with Outlook mock data” to explore the inbox. No account connection is needed. File Dustr’s public entry currently shows a desktop notice; its sample-file browser mode is prepared locally and is not published yet.</p>
      </section>
      <DataDustrTrailers />
      <details className="inline-concept-demo"><summary>Try a small inbox sample on this page</summary><InboxDemo /></details>
      <section className="decision-grid">
        <div><p className="eyebrow">Inbox Dustr</p><h2>See the pattern before clearing the inbox.</h2><p>Overview and Insights surface categories and recurring senders. Organize explores grouping, protected messages and a review step before cleanup. Try filtering and undo in the smaller interactive sample on this page, or explore the full mock inbox on the demo site.</p></div>
        <div><p className="eyebrow">File Dustr</p><h2>Turn a messy folder into a queue of decisions.</h2><p>A dashboard summarizes the sample files. The review queue exposes suggested moves and cleanup candidates; organization rules explore where different file types belong. The browser prototype uses fictional files and never scans the visitor’s computer.</p></div>
      </section>
      <section><h2>What I wanted to explore</h2><p>Cleanup tools ask people to trust changes to things they care about. I focused on making suggestions visible, keeping the explanation beside the action and showing the difference between a suggestion and a completed operation.</p>
        <figure className="implementation-flow"><ol><li><strong>Explore</strong><span>Start with fictional files or messages</span></li><li><strong>Suggest</strong><span>Group clutter and explain a rule match</span></li><li><strong>Review</strong><span>Inspect the proposed action</span></li><li><strong>Try</strong><span>Change the sample and see feedback</span></li></ol><figcaption>Concept workflow · all portfolio interactions use mock data</figcaption></figure>
      </section>
      <section className="decision-grid">
        <div><h2>Shared interface, explicit boundaries</h2><p>React components and workflow helpers sit above separate web and native adapters. The browser demonstrates the interaction with sample data. Native filesystem and email integrations remain separate engineering work, not a promise made by this portfolio.</p></div>
        <div><h2>What this project taught me</h2><p>A convincing interface is only part of a dependable cleanup tool. Actual execution results, recovery, credential handling and provider permissions need their own validation. I am preserving this as a product exploration rather than presenting an unfinished commercial service.</p></div>
      </section>
      <section className="story-limits"><h2>Where the prototype stops</h2><p>The demonstrations show interaction design and implementation, not proven cleanup accuracy, guaranteed safety or measured customer outcomes. Counts and savings belong to fictional datasets. No purchase, real inbox connection or desktop download is offered through this portfolio.</p><p className="text-sm text-slate-600">Application source remains private. The animated films illustrate the concepts with fictional messages and files; no personal account data is included.</p></section>
    </div>
  );
}
