from playwright.sync_api import sync_playwright,expect
import json
import os

base_url = os.environ.get("PORTFOLIO_URL", "http://localhost:3000")
with sync_playwright() as p:
 b=p.chromium.launch();page=b.new_page(reduced_motion='reduce');errors=[]
 page.on('pageerror',lambda e:errors.append(str(e)))
 results=[]
 for width,height in [(1366,768),(900,650),(390,844)]:
  page.set_viewport_size({'width':width,'height':height})
  for slug in ['cirrus','framed','timely','datadustr-tools']:
   page.goto(f'{base_url}/projects/{slug}',wait_until='networkidle')
   preview=page.locator('.case-visual [data-project-viewport]');expect(preview).to_be_visible()
   page.wait_for_function('''() => {const e=document.querySelector('.case-visual [data-project-viewport]');return innerWidth<768 || e?.dataset.fitted==='true';}''')
   visual=preview.locator('figure').first.bounding_box()
   if width>=768:
    assert visual['y']>=50,(slug,width,visual)
    assert visual['y']+visual['height']<=height-40,(slug,width,visual)
    if preview.get_attribute('data-fitted')=='true':
     preview.get_by_role('button',name='Full size',exact=True).click()
     expect(preview.get_by_role('button',name='Fit to screen',exact=True)).to_have_attribute('aria-pressed','true')
     preview.get_by_role('button',name='Fit to screen',exact=True).click()
   if slug=='cirrus':
    page.get_by_role('button',name='Compact',exact=True).click();page.wait_for_timeout(500)
    expect(page.locator('figure[data-compact]')).to_have_attribute('data-compact','true')
   if slug=='framed':
    slider=page.get_by_role('slider',name='From left');slider.fill('40')
    expect(slider).to_have_value('40')
   if slug=='timely':
    page.get_by_role('button',name='Inspect').last.click()
    expect(page.get_by_role('button',name='Inspect').last).to_have_attribute('aria-pressed','true')
   assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),(slug,width)
   results.append({'slug':slug,'width':width,'previewHeight':round(visual['height'])})
   page.screenshot(path=f'/tmp/portfolio-preview-{slug}-{width}.png',full_page=False)
 page.set_viewport_size({'width':1366,'height':768});page.goto(f'{base_url}/projects',wait_until='networkidle')
 for preview in page.locator('[data-project-viewport]').all():
  preview.scroll_into_view_if_needed();page.wait_for_timeout(200)
  assert preview.locator('figure').first.bounding_box()['height']<=768-100
 assert not errors,errors
 print(json.dumps(results));print('PASS: viewport fit, full-size toggle, interactive demos, mobile reflow and project list; no page errors.')
 b.close()
