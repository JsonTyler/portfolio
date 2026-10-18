from playwright.sync_api import sync_playwright, expect
from pathlib import Path
out=Path('/tmp/portfolio-density-check');out.mkdir(exist_ok=True)
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
 page=b.new_page(reduced_motion='reduce');errors=[]
 page.on('pageerror',lambda e: errors.append(str(e)))
 for width in [320,390,767,768,900,1024,1366]:
  page.set_viewport_size({'width':width,'height':844})
  page.goto('http://localhost:3000/projects',wait_until='networkidle')
  assert page.locator('.site-shell').evaluate('(el)=>getComputedStyle(el).fontSize')=='15px'
  header=page.locator('.site-shell > header')
  assert header.bounding_box()['height']<=70,(width,header.bounding_box())
  if width<768:
   assert not page.get_by_role('button',name='Switch to winter theme').is_visible()
   menu=page.get_by_role('button',name='Toggle menu')
   menu.focus();page.keyboard.press('Enter')
   expect(menu).to_have_attribute('aria-expanded','true')
   theme=page.get_by_role('button',name='Switch to winter theme')
   theme.click()
   expect(page.locator('html')).to_have_attribute('data-theme','winter')
   page.get_by_role('button',name='Switch to hacker theme').click()
   page.keyboard.press('Escape')
   expect(menu).to_be_focused()
   expect(menu).to_have_attribute('aria-expanded','false')
   assert not theme.is_visible()
  if width>=768:
   assert page.get_by_role('navigation',name='Main navigation').is_visible()
   assert not page.get_by_role('button',name='Toggle menu').is_visible()
   assert page.get_by_role('navigation',name='Main navigation').get_by_role('link').count()==5
  demo=page.get_by_role('figure',name='Interactive Inbox Dustr demonstration')
  assert demo.get_by_text('✧ SUGGESTED LABELS',exact=True).is_visible()
  assert demo.get_by_role('button',name='♢ Safe Mass Delete (5)').is_enabled()
  demo.get_by_role('button',name='♢ Safe Mass Delete (5)').click()
  assert demo.get_by_text('Protected',exact=True).count()==3
  demo.get_by_role('button',name='Undo',exact=True).click()
  assert demo.get_by_role('button',name='♢ Safe Mass Delete (5)').is_enabled()
  assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),width
  page.evaluate('scrollTo(0,0)')
  page.screenshot(path=str(out/f'work-{width}.png'),full_page=True)
  print(f'{width}px: compact header, body type, themes/menu, labels, delete/protect/undo, no overflow passed')
 assert not errors,errors
 b.close()
