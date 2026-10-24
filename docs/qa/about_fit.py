import os
from playwright.sync_api import sync_playwright,expect
with sync_playwright() as p:
 b=p.chromium.launch();page=b.new_page(reduced_motion='reduce');errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 for width,height in [(1366,768),(900,650),(390,844),(320,740)]:
  page.set_viewport_size({'width':width,'height':height});page.goto(os.environ.get('PORTFOLIO_URL', 'http://localhost:3000').rstrip('/')+'/#about',wait_until='networkidle')
  expect(page.get_by_role('heading',name='An engineer with a designer’s eye.',exact=True)).to_be_visible()
  size=page.locator('[data-desktop-document=about]').evaluate('e=>({h:e.clientHeight,scroll:e.scrollHeight,w:e.clientWidth,sw:e.scrollWidth})')
  assert size['scroll']<=size['h'],(width,size)
  assert size['sw']<=size['w'],(width,size)
  page.get_by_role('button',name='Meet the striped tabby',exact=True).click();expect(page.locator('#about-scene-detail')).to_have_text('The striped tabby.')
  if width>=768:assert page.evaluate('document.documentElement.scrollHeight<=innerHeight')
  page.screenshot(path=f'/tmp/about-fit-{width}.png',full_page=True);print('PASS about',width,size,flush=True)
 page.set_viewport_size({'width':1366,'height':768})
 for theme in ['hacker','midnight','winter']:
  page.get_by_role('button',name=f'Switch to {theme} theme',exact=True).click();expect(page.locator('html')).to_have_attribute('data-theme',theme)
  page.screenshot(path=f'/tmp/theme-restored-{theme}.png')
 left=page.locator('.snowfall > span').evaluate_all('es=>es.map(e=>parseFloat(e.style.left))')
 assert min(left)<1 and max(left)>99 and sum(x<10 for x in left)>=6,left
 assert not errors,errors
 print('PASS restored themes, snow at both edges, profile interactions and no page errors.');b.close()
