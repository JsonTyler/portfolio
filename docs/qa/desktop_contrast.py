from playwright.sync_api import sync_playwright
import json
import os
with sync_playwright() as p:
 b=p.chromium.launch();page=b.new_page(reduced_motion='reduce');page.goto(os.environ.get('PORTFOLIO_URL', 'http://localhost:3000'),wait_until='networkidle')
 result={}
 for theme in ['hacker','midnight','winter']:
  page.evaluate('(t)=>document.documentElement.dataset.theme=t',theme)
  ratios=page.locator('[data-portfolio-desktop]').evaluate('''el=>{const s=getComputedStyle(el);function color(n){let h=s.getPropertyValue('--desk-'+n).trim().slice(1);if(h.length===3)h=h.split('').map(c=>c+c).join('');return [0,2,4].map(i=>parseInt(h.slice(i,i+2),16))}function lum(c){let a=c.map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4});return a[0]*.2126+a[1]*.7152+a[2]*.0722}function ratio(a,b){a=lum(color(a));b=lum(color(b));return (Math.max(a,b)+.05)/(Math.min(a,b)+.05)}return {text:ratio('text','surface'),muted:ratio('muted','surface'),sidebar:ratio('muted','sidebar'),titlebar:Math.min(ratio('muted','top'),ratio('muted','bottom')),selected:ratio('selection-text','selected')}}''')
  assert min(ratios.values())>=4.5,(theme,ratios)
  result[theme]=ratios
 print(json.dumps(result));b.close()
