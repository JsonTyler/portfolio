from playwright.sync_api import sync_playwright
from pathlib import Path
out=Path('/tmp/portfolio-oct18');out.mkdir(exist_ok=True)
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
 context=b.new_context(viewport={'width':1440,'height':1000},reduced_motion='reduce')
 page=context.new_page();errors=[]
 page.on('pageerror',lambda err:errors.append(str(err)))
 context.add_init_script("localStorage.setItem('portfolio-theme','winter')")
 page.goto('http://127.0.0.1:3000/',wait_until='networkidle')
 assert page.locator('html').get_attribute('data-theme')=='hacker'
 assert page.locator('body').evaluate('(el)=>getComputedStyle(el).backgroundColor')=='rgb(8, 13, 16)'
 assert page.get_by_role('button',name='Switch to hacker theme').get_attribute('aria-pressed')=='true'
 assert page.locator('.home-project-link').count()==4
 assert page.locator('.project-preview').count()==0
 page.screenshot(path=str(out/'home-desktop.png'),full_page=True)
 page.get_by_role('button',name='Switch to winter theme').click();page.reload(wait_until='networkidle')
 assert page.locator('html').get_attribute('data-theme')=='winter'
 page.get_by_role('button',name='Switch to hacker theme').click()
 page.goto('http://127.0.0.1:3000/projects',wait_until='networkidle')
 assert page.locator('.project-preview').count()==4
 assert page.get_by_role('heading',name='Jason Rodriguez Active').count()==1
 page.get_by_role('button',name='Use compact density').click()
 assert page.get_by_role('button',name='Use spacious density').get_attribute('aria-pressed')=='true'
 demo=page.get_by_role('figure',name='Interactive Inbox Dustr demonstration')
 demo.get_by_role('button',name='Newsletters',exact=True).click()
 assert demo.get_by_role('button',name='♢ Safe Mass Delete (3)').is_enabled()
 demo.get_by_role('button',name='♢ Safe Mass Delete (3)').click()
 assert '3 sample messages moved to trash' in demo.get_by_role('status').inner_text()
 demo.get_by_role('button',name='All',exact=True).click()
 assert demo.get_by_text('Protected',exact=True).count()==3
 demo.get_by_role('button',name='Undo',exact=True).click()
 assert 'Cleanup undone' in demo.get_by_role('status').inner_text()
 demo.get_by_role('button',name='Overview',exact=True).click()
 assert demo.get_by_text('Total Emails',exact=True).count()==1
 demo.get_by_role('button',name='Start with bulk cleanup →').click()
 demo.get_by_role('button',name='♢ Safe Mass Delete (5)').click()
 assert demo.get_by_role('button',name='♢ Safe Mass Delete (0)').is_disabled()
 assert demo.get_by_text('Protected',exact=True).count()==3
 demo.get_by_role('button',name='Undo',exact=True).click()
 demo.screenshot(path=str(out/'inbox-desktop.png'))
 page.goto('http://127.0.0.1:3000/projects/datadustr-tools',wait_until='networkidle')
 assert page.locator('.app-captures img').count()==4
 for img in page.locator('.app-captures img').all():
  img.scroll_into_view_if_needed()
  img.evaluate('(img)=>img.decode()')
 assert page.locator('.app-captures img').evaluate_all('(images)=>images.every(i=>i.complete && i.naturalWidth>0)')
 page.screenshot(path=str(out/'datadustr-case.png'),full_page=True)
 for route in ['/', '/projects', '/projects/datadustr-tools']:
  page.set_viewport_size({'width':390,'height':844})
  page.goto('http://127.0.0.1:3000'+route,wait_until='networkidle')
  assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'),route
  page.screenshot(path=str(out/('mobile-'+(route.strip('/').replace('/','-') or 'home')+'.png')),full_page=True)
 # Native keyboard operation on the demo controls.
 demo=page.get_by_role('figure',name='Interactive Inbox Dustr demonstration')
 button=demo.get_by_role('button',name='Newsletters',exact=True)
 button.focus();page.keyboard.press('Enter')
 assert button.get_attribute('aria-pressed')=='true'
 assert page.evaluate('document.activeElement.matches(":focus-visible")')
 assert not errors,errors
 print('PASS: default/saved themes, home/work hierarchy, Cirrus toggle/name, cleanup/filter/protection/undo, captures, keyboard, 390px overflow, no page errors.')
 b.close()
