from playwright.sync_api import sync_playwright, expect
from pathlib import Path
import re
out=Path('/tmp/portfolio-cirrus-proof');out.mkdir(exist_ok=True)
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
 page=b.new_page(viewport={'width':1440,'height':1000},reduced_motion='reduce')
 errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 def row_count(demo):
  expect(demo.get_by_role('status')).to_have_text(re.compile(r'\d+ of 15'), timeout=15000)
  page.wait_for_timeout(600)
  return int(re.search(r'(\d+) of 15',demo.get_by_role('status').inner_text()).group(1))
 for width in [1440,390]:
  page.set_viewport_size({'width':width,'height':1000})
  page.goto('http://127.0.0.1:3000/projects',wait_until='networkidle')
  demo=page.locator('figure[data-compact]')
  roomy=row_count(demo)
  height=demo.locator('[class*="mock"]').bounding_box()['height']
  font=demo.locator('tbody td').first.evaluate('(el)=>getComputedStyle(el).fontSize')
  demo.screenshot(path=str(out/f'{width}-spacious.png'))
  control=demo.get_by_role('button',name='Compact',exact=True)
  control.focus();page.keyboard.press('Enter')
  compact=row_count(demo)
  assert compact>roomy,(width,roomy,compact)
  assert f'+{compact-roomy} in compact' in demo.get_by_role('status').inner_text()
  assert height==demo.locator('[class*="mock"]').bounding_box()['height']
  assert font==demo.locator('tbody td').first.evaluate('(el)=>getComputedStyle(el).fontSize')
  assert demo.locator('tbody tr').count()==15
  assert demo.locator('[class*="tableViewport"]').bounding_box()['y'] + demo.locator('[class*="tableViewport"]').bounding_box()['height'] <= demo.locator('[class*="mock"]').bounding_box()['y'] + height
  assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
  demo.screenshot(path=str(out/f'{width}-compact.png'))
  demo.get_by_role('button',name='Spacious',exact=True).click()
  assert row_count(demo)==roomy
  print(f'{width}px: {roomy} spacious → {compact} compact, same height/text/15 records')
 # Resize while compact: discard a baseline from a different viewport.
 page.set_viewport_size({'width':1440,'height':1000})
 page.wait_for_timeout(400)
 demo.get_by_role('button',name='Compact',exact=True).click();row_count(demo)
 page.set_viewport_size({'width':390,'height':1000});page.wait_for_timeout(400)
 assert '+' not in demo.get_by_role('status').inner_text()
 page.goto('http://127.0.0.1:3000/projects/cirrus',wait_until='networkidle')
 details=page.locator('details')
 assert not details.get_attribute('open')
 page.get_by_text('Implementation details',exact=True).focus();page.keyboard.press('Enter')
 assert details.get_attribute('open') is not None
 assert page.get_by_text('ResizeObserver measures',exact=False).is_visible()
 assert not errors,errors
 print('PASS: resize baseline, keyboard controls, collapsed details, no page exceptions.')
 b.close()
