import assert from 'node:assert/strict';
import test from 'node:test';
import { previewGeometry } from '../lib/preview-geometry.ts';

test('65% zoom expands the application viewport while keeping its on-screen width', () => {
  const normal = previewGeometry(1000, 600, 600, 1, true);
  const zoomed = previewGeometry(1000, 600, 600 / .65, .65, true);
  assert.ok(zoomed.layoutWidth > normal.layoutWidth);
  assert.ok(zoomed.layoutHeight > normal.layoutHeight);
  assert.ok(Math.abs(zoomed.surfaceWidth - 1000) < .001);
  assert.ok(Math.abs(zoomed.surfaceHeight - 600) < .001);
  // A table with unchanged 30px logical rows gains actual row capacity.
  assert.ok(Math.floor(zoomed.layoutHeight / 30) > Math.floor(normal.layoutHeight / 30));
});

test('zooming in makes controls larger and exposes less layout space', () => {
  const enlarged = previewGeometry(1000, 600, 400, 1.5, true);
  assert.ok(enlarged.layoutWidth < 1000);
  assert.equal(enlarged.layoutHeight, 400);
  assert.equal(enlarged.surfaceWidth, 1000);
});

test('Fit retains intrinsic layout dimensions for artwork and scales it into view', () => {
  const fitted = previewGeometry(1000, 600, 1000, .6, false);
  assert.equal(fitted.layoutWidth, 1000);
  assert.equal(fitted.layoutHeight, 600);
  assert.equal(fitted.surfaceWidth, 600);
  assert.equal(fitted.surfaceHeight, 600);
});
