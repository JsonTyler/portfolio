from playwright.sync_api import sync_playwright, expect
from pathlib import Path
import json
import os
out=Path('/tmp/portfolio-home-fit-after');out.mkdir(exist_ok=True)
results=[]
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 page=b.new_page(reduced_motion='reduce');errors=[]
 page.on('pageerror',lambda e:errors.append(str(e)))
 for w,h in [(1366,768),(1440,900),(1280,720),(1024,650),(900,650),(390,844)]:
  page.set_viewport_size({'width':w,'height':h});page.goto(os.environ.get('PORTFOLIO_URL', 'http://localhost:3000'),wait_until='networkidle')
  expect(page.locator('h1')).to_be_visible()
  size=page.evaluate('({height:document.documentElement.scrollHeight,width:document.documentElement.scrollWidth})')
  if w>=900:assert size['height']<=h,(w,h,size)
  assert size['width']<=w
  for title in ['Inbox & File Dustr', 'Cirrus', 'As I Left It']:
   expect(page.get_by_role('tab', name=title, exact=True)).to_be_visible()
  assert page.get_by_role('link',name='View experience',exact=True).is_visible()
  footer=page.locator('[data-portfolio-desktop] footer')
  footer.scroll_into_view_if_needed()
  expect(footer).to_be_in_viewport()
  results.append({'width':w,'height':h,'pageHeight':size['height']})
  page.screenshot(path=str(out/f'{w}-{h}.png'),full_page=True)
  print(w,h,size,flush=True)
 # Theme changes and normal animation preserve responsive layouts.
 page.set_viewport_size({'width':900,'height':650})
 page.goto(os.environ.get('PORTFOLIO_URL', 'http://localhost:3000'),wait_until='networkidle')
 page.emulate_media(reduced_motion='no-preference')
 for theme in ['winter','midnight','hacker']:
  page.get_by_role('button',name=f'Switch to {theme} theme').click()
  expect(page.locator('html')).to_have_attribute('data-theme',theme)
  page.wait_for_timeout(300)
  assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),theme
  assert page.evaluate('document.documentElement.scrollHeight<=innerHeight'),theme
 # Narrow reflow remains reachable, including the footer.
 page.set_viewport_size({'width':640,'height':360})
 assert page.evaluate('document.documentElement.scrollHeight>innerHeight')
 page.get_by_role('link',name='View experience',exact=True).focus()
 assert page.get_by_role('link',name='View experience',exact=True).evaluate('(el)=>el===document.activeElement')
 assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
 assert not errors,errors
 (out/'measurements.json').write_text(json.dumps(results))
 print('PASS: responsive layouts, all themes/normal motion, mobile/reflow scrolling, content and footer reachable; no page exceptions')
 b.close()
