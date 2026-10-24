import Image from 'next/image';
import { TrailerPlayer } from './TrailerPlayer';
const tours = [
  { id:'inbox',title:'Inbox Dustr',description:'A little story about finding what matters in an overflowing inbox.',steps:['Messages pile up around the brain.','Messages find their way into Keep, Review and Later.','You choose what to keep.','Undo brings a message back.','The brain has room for the next thing.'] },
  { id:'file',title:'File Dustr',description:'From a pile of downloads to a few clear, reversible decisions.',steps:['Files pile up around the brain.','Photos, documents and review candidates get their own places.','Preview a suggested move before choosing it.','Undo brings the sample file back.','There is room for the next thing.'] },
];
export function DataDustrTrailers() {
  return <section id="trailers" aria-labelledby="trailers-heading">
    <div className="trailer-intro"><Image src="/brand/as-i-left-it/mascot/brain-happy-v2.png" alt="The peach plush brain mascot, your guide through the concepts" width={136} height={114} /><div><p className="eyebrow">A little help from the brain</p><h2 id="trailers-heading">Two little stories.</h2></div></div>
    <p>Animated concept films with an original instrumental score. Play with sound, or watch muted. Captions and transcripts are available. These are illustrations of the ideas; the interactive demo shows the application itself.</p>
    <div className="trailer-grid">{tours.map(tour=><article key={tour.id}><h3>{tour.title}</h3><TrailerPlayer id={tour.id} title={tour.title}/><p className="text-sm text-slate-600">{tour.description} Fictional examples · portfolio concept.</p><details className="trailer-transcript"><summary>{tour.title} story transcript</summary><ol>{tour.steps.map(step=><li key={step}>{step}</li>)}</ol><p>Original electronic instrumental music and transition sounds; no narration. All actions shown are illustrative.</p></details></article>)}</div>
  </section>;
}
