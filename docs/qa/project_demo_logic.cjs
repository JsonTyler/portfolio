// Run from the portfolio root: node docs/qa/project_demo_logic.cjs
const ts = require('typescript');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const js = ts.transpileModule(fs.readFileSync('lib/project-demos.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const compiled = { exports: {} };
new Function('exports', 'module', js)(compiled.exports, compiled);
const { framePosition, wallDistances, cleanupCandidates, sampleMail } = compiled.exports;
for (const x of [-100, 0, 5.5, 32, 66.5, 72, 200]) for (const y of [-100, 0, 1, 10, 33.2, 48, 200]) {
  const p = framePosition(x, y), d = wallDistances(p.x, p.y);
  assert(p.x >= 5.5 && p.x <= 66.5 && p.y >= 1 && p.y <= 33.2);
  assert(Math.abs(d.left + d.right - 72) < 1e-9);
  assert(Math.abs(d.top + d.bottom - 48) < 1e-9);
}
for (const group of ['newsletters', 'promotions', 'receipts']) {
  const ids = cleanupCandidates(group, []);
  assert(ids.every(id => !sampleMail.find(mail => mail.id === id).keep));
  assert.equal(cleanupCandidates(group, ids).length, 0);
}
assert.equal(cleanupCandidates('newsletters', []).length, 3);
assert.equal(cleanupCandidates('promotions', []).length, 2);
assert.equal(cleanupCandidates('receipts', []).length, 0);
console.log('Passed frame bounds/distances and protected-mail/reapply invariants.');
