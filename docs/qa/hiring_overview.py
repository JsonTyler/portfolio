"""Overview evidence, navigation and responsive fit; run with the Mac browser runner."""
import os
from playwright.sync_api import sync_playwright, expect
base = os.environ.get("PORTFOLIO_URL", "http://localhost:3000").rstrip("/")
with sync_playwright() as p:
 b=p.chromium.launch()
 page=b.new_page(reduced_motion='reduce')
 errors=[]
 page.on('pageerror',lambda e: errors.append(str(e)))
 page.goto(base,wait_until='networkidle')
 for w,h in [(1440,900),(1366,768),(1280,720),(1024,650),(900,650),(390,844),(320,640)]:
  page.set_viewport_size({'width':w,'height':h})
  for theme in ['hacker','midnight','winter']:
   page.get_by_role('button',name=f'Switch to {theme} theme').click()
   expect(page.get_by_role('link',name='Public playground')).to_have_attribute('href','https://design.sprbrk.com/')
   assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'),(w,theme)
   if w>=768:
    assert page.locator('#desktop-panel').evaluate('e => e.scrollHeight <= e.clientHeight + 1'),(w,h,theme,'inner overflow')
    assert page.evaluate('document.documentElement.scrollHeight <= innerHeight'),(w,h,theme)
  page.screenshot(path=f'/tmp/portfolio-hiring-{w}.png',full_page=True)
 for slug in ['datadustr-tools','cirrus','timely']:
  page.locator(f'a[href="#{slug}/story"]').first.click()
  expect(page).to_have_url(f'{base}/#{slug}/story')
  expect(page.get_by_role('button',name='Story',exact=True)).to_have_attribute('aria-pressed','true')
  page.get_by_role('navigation',name='Breadcrumb').get_by_role('link',name='Portfolio',exact=True).click()
 page.get_by_role('link',name='View experience',exact=True).click()
 expect(page.get_by_role('link',name='Explore the public Design Library playground')).to_have_attribute('href','https://design.sprbrk.com/')
 assert not errors,errors
 print('PASS: evidence links, story shortcuts, 7 sizes, 3 themes, no page/panel overflow or runtime errors')
 b.close()
