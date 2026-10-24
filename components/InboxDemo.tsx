'use client';
import { useState } from 'react';
import { cleanupCandidates, sampleMail } from '@/lib/project-demos';
import { DemoPrompt } from './DemoPrompt';
import styles from './InboxDemo.module.css';

export function InboxDemo() {
  const [view, setView] = useState('Organize');
  const [group, setGroup] = useState('all');
  const [removed, setRemoved] = useState<string[]>([]);
  const [lastBatch, setLastBatch] = useState<string[]>([]);
  const [status, setStatus] = useState('Review the sample messages, then try Safe Mass Delete.');
  const visible = sampleMail.filter(mail => !removed.includes(mail.id));
  const matches = group === 'all' ? visible.filter(mail => !mail.keep).map(mail => mail.id) : cleanupCandidates(group, removed);
  const shown = group === 'all' ? visible : visible.filter(mail => mail.group === group);

  function clean() {
    setRemoved([...removed, ...matches]);
    setLastBatch(matches);
    setStatus(`${matches.length} sample messages moved to trash. The 2 protected messages stayed. Undo is available.`);
  }

  return <figure className={`project-visual ${styles.demo}`} aria-label="Interactive Inbox Dustr demonstration">
    <DemoPrompt instruction="Filter the sample inbox, then try Safe Mass Delete. Protected messages stay." />
    <div className={styles.surface}>
      <div className={styles.brandBar}><strong><span aria-hidden="true">🧹</span> DataDustr <small>Concept</small></strong><span className={styles.product}>Inbox Dustr</span><span className={styles.edition}>Mock data</span></div>
      <div className={styles.accountBar}><div><strong>Inbox Dustr</strong><small>jason@example.com</small></div><span className={styles.loaded}>✓ {visible.length} emails loaded</span></div>
      <div className={styles.navigation} role="group" aria-label="Sample inbox views">{['Overview', 'Organize'].map(name => <button key={name} type="button" aria-pressed={view === name} onClick={() => setView(name)}>{name}</button>)}<span>Interactive sample</span></div>
      <div className={styles.body}>
        {view === 'Overview' ? <><div className={styles.metrics}><div><span>Total Emails</span><strong>{visible.length}</strong><small>in this sample inbox</small></div><div><span>Actionable</span><strong>{visible.filter(mail => !mail.keep).length}</strong><small>unprotected sample messages</small></div></div><div className={styles.breakdown}><strong>Email Categories Breakdown</strong>{[['Personal', 0, '#924fff'], ['Newsletters', visible.filter(mail => mail.group === 'newsletters').length, '#635bff'], ['Promotions', visible.filter(mail => mail.group === 'promotions').length, '#f5a000'], ['Receipts', 2, '#00bd8a']].map(([name, count, color]) => <div key={name}><span>{name}</span><span className={styles.track}><span style={{ width: `${Number(count) / sampleMail.length * 100}%`, background: String(color) }} /></span><b>{count}</b></div>)}<small>Message counts from this interactive sample.</small></div><button className={styles.next} type="button" onClick={() => setView('Organize')}>Start with bulk cleanup →</button></> : <>
          <div className={styles.labels}><strong>✧ SUGGESTED LABELS</strong><div>{['Work', 'Receipts', 'Newsletters'].map(label => <span key={label}>+ {label}</span>)}</div><small>Examples of labels suggested by the application.</small></div>
          <div className={styles.safeNotice}><strong>All Emails view</strong><span>Safe delete skips protected emails. This sample keeps 2 protected messages.</span></div>
          <div className={styles.actions}><span>{visible.length} messages</span><button type="button" className={styles.safeDelete} disabled={!matches.length} onClick={clean}>♢ Safe Mass Delete ({matches.length})</button><button type="button" disabled={!lastBatch.length} onClick={() => { setRemoved(removed.filter(id => !lastBatch.includes(id))); setLastBatch([]); setStatus('Cleanup undone. All sample messages in the last batch are back.'); }}>Undo</button></div>
          <div className={styles.filters} role="group" aria-label="Filter sample messages">{[['all', 'All'], ['newsletters', 'Newsletters'], ['promotions', 'Promotions'], ['receipts', 'Protected']].map(([key, label]) => <button type="button" key={key} aria-pressed={group === key} onClick={() => setGroup(key)}>{label}</button>)}</div>
          <div className={styles.mailList}>{shown.length ? shown.map(mail => <div className={styles.mail} key={mail.id}><span aria-hidden="true" className={styles.mailIcon}>{mail.keep ? '♢' : '✉'}</span><div><strong>{mail.subject}</strong><span>{mail.sender}</span></div><span className={mail.keep ? styles.keep : styles.tag}>{mail.keep ? 'Protected' : mail.tag}</span></div>) : <p className={styles.empty}>No messages left in this filter. Choose All or undo the last cleanup.</p>}</div>
          <p className={styles.status} role="status">{status}</p>
        </>}
      </div>
    </div>
    <figcaption>Interactive sample of the Inbox Dustr concept.<span>Reduced interactive demo · synthetic messages · local changes only</span></figcaption>
  </figure>;
}
