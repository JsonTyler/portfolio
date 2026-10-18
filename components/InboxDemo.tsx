'use client';
import { useState } from 'react';
import { cleanupCandidates, sampleMail } from '@/lib/project-demos';
import { DemoPrompt } from './DemoPrompt';
import styles from './ProjectDemos.module.css';
export function InboxDemo() {
  const [group, setGroup] = useState<string | null>(null);
  const [removed, setRemoved] = useState<string[]>([]);
  const [lastBatch, setLastBatch] = useState<string[]>([]);
  const [status, setStatus] = useState('Choose a suggestion to see what it would clean up.');
  const candidates = cleanupCandidates(group ?? '', removed);
  const visible = sampleMail.filter(mail => !removed.includes(mail.id));
  function choose(next: string) { setGroup(next); const count = cleanupCandidates(next, removed).length; setStatus(count ? `${count} sample messages selected. Both protected messages will stay.` : 'No messages remain in this suggestion. Choose another or undo your cleanup.'); }
  return <figure className={`project-visual ${styles.demo} ${styles.inbox}`} aria-label="Interactive Inbox Dustr sample inbox"><DemoPrompt instruction="Choose a cleanup suggestion below to select its messages."/><div className={styles.surface}>
    <div className={styles.appBar}><strong>Inbox Dustr</strong><span>Organize / Quick Clean</span><span className={styles.sample}>Sample inbox</span></div>
    <div className={styles.inboxBody}>
      <div className={styles.keepBanner}><span className={styles.shield} aria-hidden="true">✓</span><div><strong>Keep the important things.</strong><span>Keep tags protect invoices and contracts.</span></div><span className={styles.protectedCount}>2 protected</span></div>
      <div className={styles.suggestionHeading}><strong>Quick Clean</strong><span>Select a suggestion to highlight its messages.</span></div>
      <div className={styles.suggestions} role="group" aria-label="Choose a cleanup suggestion">{[['newsletters', 'Old newsletters'], ['promotions', 'Expired promotions']].map(([key, label]) => <button type="button" key={key} aria-pressed={group === key} onClick={() => choose(key)}><span className={styles.suggestionCopy}><span>{group === key ? '✓' : '→'} {label}</span><small>{group === key ? 'Selected' : 'Select messages'}</small></span><b>{cleanupCandidates(key, removed).length}</b></button>)}</div>
      <div className={styles.mailList}>{visible.map(mail => { const selected = candidates.includes(mail.id); return <div key={mail.id} className={styles.mail} data-selected={selected} data-protected={mail.keep}><span className={styles.mailMark} aria-hidden="true">{mail.keep ? '✓' : selected ? '✓' : '·'}</span><div><strong>{mail.sender}</strong><span>{mail.subject}</span></div><span className={mail.keep ? styles.keepTag : styles.autoTag}>{mail.keep ? `Keep · ${mail.tag}` : mail.tag}</span></div>; })}</div>
      <div className={styles.inboxActions}><button type="button" className={styles.primary} disabled={!candidates.length} onClick={() => { setRemoved([...removed, ...candidates]); setLastBatch(candidates); setGroup(null); setStatus(`${candidates.length} sample messages moved to trash. Protected messages stayed. You can undo this.`); }}>Apply cleanup</button><button type="button" disabled={!lastBatch.length} onClick={() => { setRemoved(removed.filter(id => !lastBatch.includes(id))); setLastBatch([]); setGroup(null); setStatus('Cleanup undone. The sample messages are back.'); }}>Undo</button></div>
      <p className={styles.status} role="status">{status}</p>
    </div></div><figcaption>Select a suggestion to highlight messages, then apply or undo.<span>Interactive concept · synthetic messages</span></figcaption></figure>;
}
