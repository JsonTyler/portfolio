export const WALL = { width: 72, height: 48 };
export function framePosition(x: number, y: number) {
  return { x: Math.round(Math.min(66.5, Math.max(5.5, x)) * 10) / 10, y: Math.round(Math.min(33.2, Math.max(1, y)) * 10) / 10 };
}
export function wallDistances(x: number, y: number) {
  return { left: x, right: Math.round((WALL.width - x) * 10) / 10, top: y, bottom: Math.round((WALL.height - y) * 10) / 10 };
}
export const sampleMail = [
  { id: 'receipt', sender: 'Studio Billing', subject: 'Your annual subscription receipt', group: 'receipts', tag: 'invoice', keep: true },
  { id: 'contract', sender: 'Workshop Team', subject: 'Your signed workshop agreement', group: 'receipts', tag: 'contract', keep: true },
  { id: 'news-1', sender: 'Design Dispatch', subject: 'Last season’s design roundup', group: 'newsletters', tag: 'newsletter', keep: false },
  { id: 'news-2', sender: 'Product Weekly', subject: 'Your weekly reading list', group: 'newsletters', tag: 'newsletter', keep: false },
  { id: 'news-3', sender: 'Frontend Notes', subject: 'An older issue from your reading pile', group: 'newsletters', tag: 'newsletter', keep: false },
  { id: 'promo-1', sender: 'Market Updates', subject: 'A sale that ended last month', group: 'promotions', tag: 'promotion', keep: false },
  { id: 'promo-2', sender: 'Everyday Goods', subject: 'Your expired weekend offer', group: 'promotions', tag: 'promotion', keep: false },
];
export function cleanupCandidates(group: string, removed: readonly string[]) {
  return sampleMail.filter(mail => mail.group === group && !mail.keep && !removed.includes(mail.id)).map(mail => mail.id);
}
export const sampleIntervals = [
  { id: 'CASE-001', start: 11, end: 17 },
  { id: 'CASE-002', start: 13, end: 21 },
  { id: 'CASE-003', start: 19, end: 26 },
];
