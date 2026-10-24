import { timelyPublication } from '@/content/timely';

export function TimelyCaseStudy() {
  return <div className="container-max case-story">
    <section className="story-summary">
      <p className="eyebrow">Published research · {timelyPublication.venue}</p>
      <h2>{timelyPublication.title}</h2>
      <p className="lead">Timely grew out of my undergraduate digital-forensics research at Jackson State University. The related paper was published in the proceedings of IEEE SoutheastCon 2019.</p>
      <p>The project explores how investigators can understand evidence handling over time: who collected an item, where it came from, and the interval between its removal and return.</p>
      <dl className="story-facts"><div><dt>Publication</dt><dd>2019 SoutheastCon · IEEE</dd></div><div><dt>Research area</dt><dd>Digital forensics · chain of custody</dd></div><div><dt>Implementation</dt><dd>JavaScript, Vis.js, HTML and CSS</dd></div></dl>
      <p><a className="story-link focus-ring" href={timelyPublication.url} target="_blank" rel="noopener noreferrer">Read the IEEE publication ↗</a>{' · '}<a className="story-link focus-ring" href="https://github.com/JsonTyler/Timely" target="_blank" rel="noopener noreferrer">View Timely on GitHub ↗</a></p>
      <p className="text-sm text-slate-600">DOI: {timelyPublication.doi}</p>
    </section>
    <section>
      <h2>One record, three ways to work with it.</h2>
      <p>The original application connects a Questions form, a Timeline, and a Table. Case details and removal/return dates supply both the tabular record and the Vis.js interval. Timeline navigation helps inspect the dates, while CSV export makes the records portable.</p>
      <p>The portfolio recreation follows that workflow: select a sample case, inspect its fields, add a fictional record, compare the table and timeline, and export the sample as CSV.</p>
      <p className="text-sm text-slate-600">The original is preserved on GitHub. This recreation uses fictional records and keeps edits in the current preview session.</p>
    </section>
  </div>;
}
