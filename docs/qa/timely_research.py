from playwright.sync_api import sync_playwright,expect
from pathlib import Path
import os
base = os.environ.get("PORTFOLIO_URL", "http://localhost:3000").rstrip("/")
with sync_playwright() as p:
 b=p.chromium.launch();page=b.new_page(viewport={'width':900,'height':650},reduced_motion='reduce');errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto(base + '/#timely',wait_until='networkidle')
 expect(page.get_by_role('link',name='IEEE SoutheastCon 2019',exact=False)).to_have_attribute('href','https://ieeexplore.ieee.org/document/9020497')
 expect(page.get_by_role('button',name='Inspect CASE-001',exact=True)).to_be_visible()
 page.get_by_role('button',name='Inspect CASE-002',exact=True).click();expect(page.locator('[data-embedded] figure')).to_contain_text('Sam Rivera')
 page.get_by_role('button',name='Zoom timeline in',exact=True).click();page.get_by_role('button',name='Pan timeline later',exact=True).click();page.get_by_role('button',name='Fit dates',exact=True).click()
 page.get_by_role('button',name='Questions',exact=True).click()
 for label,value in [('Case number','CASE-004'),('Collected by','Sample Collector'),('Item description','Test USB'),('Location found','Demo desk'),('Phone number','555-0104')]:page.get_by_label(label,exact=True).fill(value)
 page.get_by_role('button',name='Add sample record',exact=True).click();expect(page.get_by_role('button',name='Inspect CASE-004',exact=True)).to_be_visible()
 page.get_by_role('button',name='Table',exact=True).click();expect(page.get_by_role('table')).to_contain_text('Test USB')
 with page.expect_download() as pending:page.get_by_role('button',name='Export CSV',exact=True).click()
 download=pending.value;assert download.suggested_filename=='Timely-sample-records.csv';assert 'Test USB' in Path(download.path()).read_text()
 page.get_by_role('button',name='Story',exact=True).click();expect(page.get_by_role('link',name='Read the IEEE publication',exact=False)).to_be_visible();expect(page.get_by_role('tabpanel')).to_contain_text('Timely: A Chain of Custody Data Visualizer')
 assert page.evaluate('document.documentElement.scrollHeight<=innerHeight')
 page.screenshot(path='/tmp/timely-publication-final.png')
 for width,height in [(1366,768),(900,650),(390,844),(320,740)]:
  page.set_viewport_size({'width':width,'height':height});page.get_by_role('tab',name='Timely',exact=True).click();page.wait_for_timeout(400)
  assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),width
  if width>=768:assert page.evaluate('document.documentElement.scrollHeight<=innerHeight'),width
  page.screenshot(path=f'/tmp/timely-new-{width}.png',full_page=True)
 page.set_viewport_size({'width':900,'height':650});page.get_by_role('tab',name='Inbox & File Dustr',exact=True).click()
 for view in ['Preview','Story','Films']:
  page.get_by_role('button',name=view,exact=True).click();expect(page.get_by_role('link',name='Open full demo',exact=False)).to_be_visible();assert page.evaluate('document.documentElement.scrollHeight<=innerHeight'),view
 page.screenshot(path='/tmp/datadustr-films-final.png')
 assert not errors,errors
 print('PASS: IEEE publication, original workflow tabs, record selection/addition, CSV export, timeline navigation, responsive viewport fit, DataDustr demo links in every view and films context.')
 b.close()
