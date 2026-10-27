import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const css = readFileSync(new URL('../styles/portfolio-themes.css', import.meta.url), 'utf8');
const palettes = Object.fromEntries(['winter', 'midnight', 'hacker'].map(name => {
  const block = css.match(new RegExp(`:root\\[data-theme="${name}"\\]\\s*\\{([^}]+)\\}`));
  assert.ok(block, `${name} palette exists`);
  return [name, Object.fromEntries([...block[1].matchAll(/(--phone-[\w-]+):\s*([^;]+);/g)].map(match => [match[1], match[2]]))];
}));
function luminance(hex) {
  const channels = hex.slice(1).match(/../g).map(value => parseInt(value, 16) / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
  return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
}
function contrast(first, second) {
  const values = [luminance(first), luminance(second)].sort((a, b) => b - a);
  return (values[0] + .05) / (values[1] + .05);
}
for (const [name, palette] of Object.entries(palettes)) {
  test(`${name} defines a complete interface palette`, () => {
    assert.deepEqual(Object.keys(palette).sort(), Object.keys(palettes.winter).sort());
    for (const token of ['--phone-bg', '--phone-card', '--phone-glass', '--phone-wallpaper', '--phone-icon-paper']) assert.ok(palette[token]);
  });
  test(`${name} text, secondary labels and primary buttons retain readable contrast`, () => {
    for (const [foreground, background] of [['--phone-ink','--phone-card'], ['--phone-muted','--phone-card'], ['--phone-accent','--phone-card'], ['--phone-on-accent','--phone-accent']]) {
      assert.ok(contrast(palette[foreground], palette[background]) >= 4.5, `${foreground} on ${background}`);
    }
  });
}
test('Winter is light while Midnight and Hacker keep dark app surfaces', () => {
  assert.ok(luminance(palettes.winter['--phone-card']) > .8);
  assert.ok(luminance(palettes.midnight['--phone-card']) < .05);
  assert.ok(luminance(palettes.hacker['--phone-card']) < .05);
});
