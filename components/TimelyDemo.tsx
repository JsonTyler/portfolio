'use client';

import { useRef, useState, type FormEvent, type ComponentRef } from 'react';
import { timelyPublication } from '@/content/timely';
import styles from './TimelyDemo.module.css';

type RecordItem = { id: string; caseNumber: string; collector: string; description: string; location: string; contact: string; removed: string; returned: string };
const samples: RecordItem[] = [
  { id: 'sample-1', caseNumber: 'CASE-001', collector: 'Alex Morgan', description: 'USB storage device', location: 'Sample workstation A', contact: '555-0101', removed: '2019-04-11', returned: '2019-04-17' },
  { id: 'sample-2', caseNumber: 'CASE-002', collector: 'Sam Rivera', description: 'Laptop disk image', location: 'Sample workstation B', contact: '555-0102', removed: '2019-04-13', returned: '2019-04-21' },
  { id: 'sample-3', caseNumber: 'CASE-003', collector: 'Jordan Lee', description: 'Mobile device', location: 'Sample intake desk', contact: '555-0103', removed: '2019-04-19', returned: '2019-04-26' },
];
const empty = { caseNumber: '', collector: '', description: '', location: '', contact: '', removed: '2019-04-12', returned: '2019-04-18' };
const day = (date: string) => Date.parse(`${date}T00:00:00Z`) / 86400000;
const format = (value: number) => new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' }).format(value * 86400000);
function fitted(records: RecordItem[]) {
  const start = Math.min(...records.map(record => day(record.removed))) - 1;
  return { start, span: Math.max(4, Math.max(...records.map(record => day(record.returned))) - start + 1) };
}

export function TimelyDemo() {
  const [records, setRecords] = useState(samples);
  const [selected, setSelected] = useState('sample-1');
  const [view, setView] = useState('Timeline');
  const [range, setRange] = useState(() => fitted(samples));
  const [draft, setDraft] = useState(empty);
  const [message, setMessage] = useState('Select a case to inspect its record.');
  const nextId = useRef(4);
  const item = records.find(record => record.id === selected) ?? records[0];
  const select = (id: string) => { setSelected(id); setMessage('The selected record is shown below.'); };
  function addRecord(event: FormEvent<ComponentRef<'form'>>) {
    event.preventDefault();
    if (day(draft.returned) < day(draft.removed)) { setMessage('The return date must be on or after the removal date.'); return; }
    const record = { ...draft, id: `sample-${nextId.current++}` };
    const next = [...records, record];
    setRecords(next); setSelected(record.id); setRange(fitted(next)); setView('Timeline'); setDraft(empty);
    setMessage(`${record.caseNumber} added to the timeline and table.`);
  }
  function exportCsv() {
    const fields: (keyof RecordItem)[] = ['caseNumber', 'collector', 'description', 'location', 'contact', 'removed', 'returned'];
    const quote = (value: string) => `"${(/^[=+\-@\t\r]/.test(value) ? "'" + value : value).replace(/"/g, '""')}"`;
    const rows = [['Case Number', 'Collected By', 'Description', 'Location Found', 'Contact', 'Removed', 'Returned'].map(quote).join(','), ...records.map(record => fields.map(field => quote(record[field])).join(','))];
    const url = globalThis.URL.createObjectURL(new globalThis.Blob([rows.join('\r\n')], { type: 'text/csv;charset=utf-8' }));
    const link = globalThis.document.createElement('a'); link.href = url; link.download = 'Timely-sample-records.csv'; globalThis.document.body.appendChild(link); link.click(); link.remove();
    globalThis.setTimeout(() => globalThis.URL.revokeObjectURL(url), 1000);
    setMessage(`${records.length} sample records exported as CSV.`);
  }
  function zoom(factor: number) {
    const span = Math.max(3, Math.min(90, range.span * factor));
    setRange({ start: range.start + (range.span - span) / 2, span });
  }
  return <figure className={`project-visual ${styles.demo}`} aria-label="Interactive Timely chain-of-custody research preview">
    <div className={styles.surface}>
      <div className={styles.brand}><strong>Timely</strong><span>Chain of custody</span><a href={timelyPublication.url} target="_blank" rel="noopener noreferrer">IEEE SoutheastCon 2019 ↗</a></div>
      <div className={styles.navigation} role="group" aria-label="Timely views">{['Questions', 'Timeline', 'Table'].map(name => <button key={name} type="button" aria-pressed={view === name} onClick={() => setView(name)}>{name}</button>)}<button type="button" className={styles.export} onClick={exportCsv}>Export CSV</button></div>
      <div className={styles.body}>
        {view === 'Timeline' ? <>
          <div className={styles.timelineTools}><span>{records.length} fictional records · {format(range.start)}–{format(range.start + range.span)}, {new Date(range.start * 86400000).getUTCFullYear()}</span><div role="group" aria-label="Timeline navigation"><button type="button" aria-label="Pan timeline earlier" onClick={() => setRange({ ...range, start: range.start - range.span / 4 })}>‹</button><button type="button" aria-label="Pan timeline later" onClick={() => setRange({ ...range, start: range.start + range.span / 4 })}>›</button><button type="button" aria-label="Zoom timeline in" onClick={() => zoom(.7)}>+</button><button type="button" aria-label="Zoom timeline out" onClick={() => zoom(1.4)}>−</button><button type="button" onClick={() => setRange(fitted(records))}>Fit dates</button></div></div>
          <div className={styles.plot}>
            <div className={styles.grid} aria-hidden="true">{[0, 1, 2, 3, 4, 5, 6].map(tick => <span key={tick} style={{ left: `${tick / 6 * 100}%` }}/>)}</div>
            <div className={styles.lanes}>{records.map(record => {
              const start = (day(record.removed) - range.start) / range.span * 100;
              const end = (day(record.returned) - range.start) / range.span * 100;
              const visible = end >= 0 && start <= 100;
              return <div className={styles.lane} key={record.id}>{visible && <button type="button" aria-label={`Inspect ${record.caseNumber}`} aria-pressed={selected === record.id} title={`${record.caseNumber} · ${record.description} · ${record.collector}`} style={{ left: `${Math.max(0, start)}%`, width: `${Math.max(2, Math.min(100, end) - Math.max(0, start))}%` }} onClick={() => select(record.id)}><strong>{record.caseNumber}</strong><span>{record.description}</span></button>}</div>;
            })}</div>
            <div className={styles.axis} aria-hidden="true">{[0, 1, 2, 3, 4, 5, 6].map(tick => <span key={tick}>{format(range.start + tick / 6 * range.span)}</span>)}</div>
          </div>
          <div className={styles.detail} aria-live="polite"><div><strong>{item.caseNumber} · {item.description}</strong><span>Collected by {item.collector} · {item.location}</span></div><dl><div><dt>Removed</dt><dd>{format(day(item.removed))}</dd></div><div><dt>Returned</dt><dd>{format(day(item.returned))}</dd></div><div><dt>Elapsed</dt><dd>{day(item.returned) - day(item.removed)} days</dd></div></dl></div>
        </> : view === 'Table' ? <div className={styles.tableViewport}><table><caption>Case records behind the timeline</caption><thead><tr><th>Case</th><th>Collected by / item</th><th>Location / contact</th><th>Removed</th><th>Returned</th></tr></thead><tbody>{records.map(record => <tr key={record.id} data-selected={record.id === selected}><td><button type="button" onClick={() => { select(record.id); setView('Timeline'); }}>{record.caseNumber}</button></td><td>{record.collector}<small>{record.description}</small></td><td>{record.location}<small>{record.contact}</small></td><td>{record.removed}</td><td>{record.returned}</td></tr>)}</tbody></table></div>
        : <form className={styles.form} onSubmit={addRecord}><p>Add a fictional case to see the same record appear in both views.</p>{([['caseNumber', 'Case number', 'text'], ['collector', 'Collected by', 'text'], ['description', 'Item description', 'text'], ['location', 'Location found', 'text'], ['contact', 'Phone number', 'tel'], ['removed', 'Date removed', 'date'], ['returned', 'Date returned', 'date']] as const).map(([key, label, type]) => <label key={key}>{label}<input type={type} value={draft[key]} required onChange={event => setDraft({ ...draft, [key]: event.target.value })}/></label>)}<div className={styles.formActions}><button type="submit">Add sample record</button><button type="button" onClick={() => { setRecords(samples); setSelected(samples[0].id); setRange(fitted(samples)); setDraft(empty); setMessage('Sample records restored.'); }}>Reset sample</button></div></form>}
      </div>
      <p className={styles.status} role="status">{message}</p>
    </div>
    <figcaption>Recreated from the original Questions → Timeline → Table workflow.<span>Fictional sample records · edits stay in this preview session</span></figcaption>
  </figure>;
}
