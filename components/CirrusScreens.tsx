'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './CirrusScreens.module.css';
const deductions = [
  ['Direct deposit', 'Every payroll', 'Checking account', '$2,480.00'],
  ['Federal income tax', 'Every payroll', 'Federal withholding', '$412.60'],
  ['Social Security', 'Every payroll', 'Employee contribution', '$205.84'],
  ['Medicare', 'Every payroll', 'Employee contribution', '$48.14'],
  ['Medical insurance', 'Monthly', 'Health plan', '$126.00'],
  ['Dental insurance', 'Monthly', 'Dental plan', '$18.50'],
  ['Vision insurance', 'Monthly', 'Vision plan', '$8.25'],
  ['Retirement', 'Every payroll', 'Employee contribution', '$198.00'],
  ['Employer retirement', 'Every payroll', 'Employer contribution', '$99.00'],
  ['Health savings', 'Every payroll', 'HSA contribution', '$50.00'],
  ['Life insurance', 'Monthly', 'Supplemental coverage', '$12.00'],
  ['Transit benefit', 'Monthly', 'Commuter benefit', '$35.00'],
  ['Union dues', 'Monthly', 'Member contribution', '$24.00'],
  ['Savings', 'Every payroll', 'Savings account', '$100.00'],
  ['Additional withholding', 'Every payroll', 'Voluntary withholding', '$25.00'],
];
function Icon({ kind, size = 18 }: { kind: 'person' | 'wallet' | 'clock' | 'shield' | 'home' | 'density'; size?: number }) {
  const paths = {
    person: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M20 8v6m-3-3h6',
    wallet: 'M3 5h16v15H3V5Zm0 0V3h13v2m0 7h6v4h-6v-4',
    clock: 'M12 8v5l3 2M22 12a10 10 0 1 0-20 0 10 10 0 0 0 20 0',
    shield: 'm12 2 8 4v6c0 5-8 10-8 10S4 17 4 12V6l8-4Zm-4 10 3 3 5-6',
    home: 'm3 11 9-8 9 8M5 9v12h14V9m-10 12v-7h6v7',
    density: 'M3 3h6M3 3v6m18-6h-6m6-0v6M3 21h6m-6 0v-6m18 6h-6m6 0v-6M3 3l6 6m12-6-6 6M3 21l6-6m12 6-6-6',
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[kind]}/></svg>;
}
export function CirrusScreens({ priority = false }: { priority?: boolean }) {
  const [compact, setCompact] = useState(false);
  const [capacity, setCapacity] = useState<{ visible: number; spacious: number | null; width: number }>({ visible: 0, spacious: null, width: 0 });
  const viewport = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    let timer: ReturnType<typeof globalThis.setTimeout>;
    const measure = () => {
      const bounds = element.getBoundingClientRect();
      const rows = [...element.querySelectorAll('tbody tr')];
      const visible = rows.filter(row => {
        const rect = row.getBoundingClientRect();
        return rect.top >= bounds.top && rect.bottom <= bounds.bottom + 1;
      }).length;
      const width = element.clientWidth;
      setCapacity(previous => {
        const spacious = compact ? (previous.width === width ? previous.spacious : null) : visible;
        return previous.visible === visible && previous.spacious === spacious && previous.width === width
          ? previous : { visible, spacious, width };
      });
    };
    // Announce the settled result, rather than every frame of the density transition.
    const observer = new globalThis.ResizeObserver(() => {
      globalThis.clearTimeout(timer);
      timer = globalThis.setTimeout(measure, 100);
    });
    observer.observe(element);
    const firstRow = element.querySelector('tbody tr');
    if (firstRow) observer.observe(firstRow);
    measure();
    return () => { observer.disconnect(); globalThis.clearTimeout(timer); };
  }, [compact]);
  const extraRows = compact && capacity.spacious !== null ? capacity.visible - capacity.spacious : 0;
  return <figure className={`project-visual ${styles.preview}`} data-compact={compact} data-priority={priority || undefined}>
    <div className={styles.comparison}>
      <div className={styles.challenge}><strong>Fit more records.</strong><span>Switch density. Keep the same workspace.</span></div>
      <div role="group" aria-label="Compare interface density" className={styles.controls}><button type="button" aria-pressed={!compact} onClick={() => setCompact(false)}>Spacious</button><button type="button" aria-pressed={compact} onClick={() => setCompact(true)}>Compact</button></div>
      <div className={styles.result} role="status" aria-atomic="true"><strong>{capacity.width ? `${capacity.visible} of ${deductions.length}` : '…'}</strong><span>rows fully visible{extraRows > 0 ? ` · +${extraRows} in compact` : ''}</span></div>
    </div>
    <div className={styles.mock} aria-label="Interactive compact-mode concept with sample employee data">
      <div className={styles.toolbar}><span className={styles.brand}>Springbrook <span> / Human Resources</span></span>
        <button type="button" aria-label={compact ? 'Use spacious density' : 'Use compact density'} aria-pressed={compact} onClick={() => setCompact(value => !value)} title="Toggle compact mode"><Icon kind="density"/><span>{compact ? 'Compact mode on' : 'Try compact mode'}</span><span className={styles.switch} aria-hidden="true"/></button>
      </div>
      <div className={styles.workspace}>
        <div className={styles.rail} aria-hidden="true">{(['home', 'person', 'wallet', 'clock', 'shield'] as const).map((kind, index) => <span key={kind} className={index === 1 ? styles.selected : ''}><Icon kind={kind}/><span>{['Home', 'General', 'Financial', 'Timecards', 'Benefits'][index]}</span></span>)}</div>
        <div className={styles.main}>
          <div className={styles.pageTitle}><div><span className={styles.breadcrumb}>EMPLOYEE MAINTENANCE / GENERAL</span><h3>Jason Rodriguez <span>Active</span></h3></div><span className={styles.employeeId}>Employee #1042</span></div>
          <div className={styles.overview}>
            <div className={styles.info}><div className={styles.panelTitle}><Icon kind="person" size={16}/>Employee information</div><dl><div><dt>Email</dt><dd>jason@example.test</dd></div><div><dt>Department</dt><dd>Public Works</dd></div><div><dt>Position</dt><dd>Operations specialist</dd></div><div><dt>Supervisor</dt><dd>Alex Taylor</dd></div></dl></div>
            <div className={styles.accruals}><div className={styles.panelTitle}><Icon kind="clock" size={16}/>Accrual balances</div><div className={styles.balance}><span>Vacation</span><strong>72.00 <small>hours</small></strong></div><div className={styles.balance}><span>Sick leave</span><strong>48.00 <small>hours</small></strong></div></div>
          </div>
          <div className={styles.tableHeading}><strong>Deductions &amp; benefits</strong><span>{capacity.width ? `${capacity.visible} of ${deductions.length} rows in view` : `${deductions.length} sample records`}</span></div>
          <div className={styles.tableViewport} ref={viewport}><table><thead><tr><th>Type</th><th>Cycle</th><th>Description</th><th>Amount</th></tr></thead><tbody>{deductions.map(([type, cycle, description, amount]) => <tr key={type}><td>{type}</td><td>{cycle}</td><td>{description}</td><td>{amount}</td></tr>)}</tbody></table></div>
          <div className={styles.tableFooter}><span>‹ &nbsp; <b>1</b> &nbsp; ›</span><span>15 records · sample data</span></div>
        </div>
      </div>
    </div>
    <figcaption className={styles.caption}><span className={styles.note}>Interactive interpretation · sample data · counts measured in this demo</span></figcaption>
  </figure>;
}
