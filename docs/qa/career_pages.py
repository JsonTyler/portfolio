from playwright.sync_api import sync_playwright, expect
from pathlib import Path
import json,re
out=Path('/tmp/portfolio-career-after');out.mkdir(exist_ok=True)
results=[]
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 page=b.new_page(reduced_motion='reduce');errors=[]
 page.on('pageerror',lambda e:errors.append(str(e)))
 for w,h in [(1366,768),(900,768),(390,844)]:
  page.set_viewport_size({'width':w,'height':h})
  for route in ['experience','resume','projects']:
   page.goto('http://localhost:3000/'+route,wait_until='networkidle')
   assert page.locator('main h1').count()==1
   assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),(w,route)
   results.append({'width':w,'route':route,'height':page.evaluate('document.documentElement.scrollHeight')})
   if route=='experience':
    assert page.get_by_role('region',name='Career history').locator('article').count()==5
    assert page.get_by_role('heading',name='Senior Front-End Software Engineer / Lead UX Designer').is_visible()
   elif route=='resume':
    assert page.locator('main section h2').count()==6
    assert page.get_by_role('heading',name='Skills',exact=True).is_visible()
    assert page.get_by_role('heading',name='Key Qualifications').is_visible()
    assert page.get_by_role('link',name='Download résumé · PDF').get_attribute('href')=='/resume/download'
    page.evaluate('window.__printCalled=false;window.print=()=>{window.__printCalled=true}')
    page.get_by_role('button',name='Print / save as PDF').click()
    assert page.evaluate('window.__printCalled')
   else:
    demo=page.locator('figure[data-compact]')
    expect(demo.get_by_role('status')).to_have_text(re.compile(r'\d+ of 15'), timeout=15000)
    roomy=int(re.search(r'(\d+) of 15',demo.get_by_role('status').inner_text()).group(1))
    if w==1366:demo.screenshot(path=str(out/'cirrus-spacious.png'))
    demo.get_by_role('button',name='Compact',exact=True).click();page.wait_for_timeout(500)
    compact=int(re.search(r'(\d+) of 15',demo.get_by_role('status').inner_text()).group(1))
    assert compact>roomy,(w,roomy,compact)
    if w==1366:
     assert roomy>=3 and compact>=8,(roomy,compact)
     assert demo.locator('thead th:visible').count()==4
     assert demo.get_by_text('Alex Taylor',exact=True).is_visible()
     demo.screenshot(path=str(out/'cirrus-compact.png'))
    print(f'{w}px Work: {roomy} → {compact} rows')
    demo.get_by_role('button',name='Spacious',exact=True).click()
   page.evaluate('scrollTo(0,0)')
   page.screenshot(path=str(out/f'{w}-{route}.png'),full_page=True)
  print(f'{w}px: Experience/Resume content, print control, Work density, overflow checks passed')
 page.set_viewport_size({'width':1366,'height':768})
 page.goto('http://localhost:3000/resume',wait_until='networkidle')
 response=page.request.get('http://localhost:3000/resume/download')
 assert response.status==200 and response.body().startswith(b'%PDF')
 page.emulate_media(media='print')
 assert not page.locator('.site-shell > header').is_visible()
 assert not page.get_by_role('button',name='Print / save as PDF').is_visible()
 assert page.locator('main section h2:visible').count()==6
 page.pdf(path=str(out/'resume-print.pdf'),format='A4',print_background=False)
 assert not errors,errors
 (out/'measurements.json').write_text(json.dumps(results))
 print(json.dumps(results));print('PASS: print layout, download and no page exceptions')
 b.close()
