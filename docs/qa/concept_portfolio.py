"""Portfolio concepts, scored tours and college archive. All state is isolated/fictional."""
import os
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

BASE=os.environ.get('PORTFOLIO_URL','http://127.0.0.1:3000')
OUT=Path('/tmp/portfolio-concept-review');OUT.mkdir(exist_ok=True)
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,args=['--disable-gpu','--renderer-process-limit=1'])
 context=browser.new_context(viewport={'width':1440,'height':1000},reduced_motion='reduce')
 context.route('https://**/*',lambda route:route.abort())
 page=context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto(BASE+'/',wait_until='networkidle')
 assert page.locator('.home-project-link').count()==3
 assert 'Dustr' in page.locator('.home-project-link').first.inner_text()
 assert not page.locator('.home-project-link').filter(has_text='Timely').count()
 assert not page.locator('.home-project-link').filter(has_text='Framed').count()
 page.goto(BASE+'/projects',wait_until='networkidle')
 assert page.locator('.project-preview').count()==3
 archive=page.locator('#college-projects');expect(archive.get_by_role('heading',name='College projects',exact=True)).to_be_visible()
 assert archive.locator('.archive-project').count()==2
 for title in ['Framed','Timely']:
  link=archive.get_by_role('link',name=f'Explore {title} ↗');assert link.get_attribute('href')==f'/projects/{title.lower()}'
 expect(page.locator('.project-preview').first).to_contain_text('Product concepts')
 link=page.get_by_role('link',name='Try the interactive demos ↗');assert link.get_attribute('href')=='https://tools.datadustr.com/';assert link.get_attribute('rel')=='noopener noreferrer'
 demo=page.get_by_role('figure',name='Interactive Inbox Dustr demonstration')
 demo.get_by_role('button',name='Newsletters',exact=True).click();demo.get_by_role('button',name='♢ Safe Mass Delete (3)').click();expect(demo.get_by_role('status')).to_contain_text('3 sample messages')
 demo.get_by_role('button',name='Undo',exact=True).click();expect(demo.get_by_role('status')).to_contain_text('Cleanup undone')
 page.screenshot(path=str(OUT/'work-desktop.png'),full_page=True)
 for slug in ['framed','timely']:
  page.goto(BASE+'/projects/'+slug,wait_until='networkidle');expect(page.locator('.hero-padding .eyebrow')).to_have_text('College project · archived');assert page.get_by_role('link',name='← College archive').get_attribute('href')=='/projects#college-projects';assert page.locator('figure').count()>0
 page.goto(BASE+'/projects/datadustr-tools',wait_until='networkidle')
 expect(page.locator('.story-summary')).to_contain_text('They are not products for sale')
 assert page.locator('#trailers video').count()==2
 expect(page.get_by_alt_text('The peach plush brain mascot, your guide through the concepts')).to_be_visible()
 for i,product in enumerate(['inbox','file']):
  video=page.locator('#trailers video').nth(i)
  assert video.get_attribute('autoplay') is None and video.get_attribute('loop') is None
  assert video.get_attribute('preload')=='none'
  assert video.evaluate('(v)=>v.paused && v.currentTime===0')
  video.evaluate('''async v => { v.muted=true; v.load(); if(v.readyState<2) await new Promise((resolve,reject)=>{v.onloadeddata=resolve;v.onerror=()=>reject(new Error('Video load failed'));}); }''')
  duration=video.evaluate('(v)=>v.duration');assert 20<duration<24,(product,duration)
  raw=context.request.get(BASE+f'/projects/{product}-dustr-trailer.webm').body();assert b'OpusHead' in raw
  video.scroll_into_view_if_needed();play=page.get_by_role('button',name=f'Play {product.title()} Dustr trailer with sound');assert play.evaluate('(b)=>getComputedStyle(b).position')=='absolute';play.click();assert not video.evaluate('(v)=>v.muted');page.wait_for_function('(v)=>v.currentTime>0 && !v.paused',arg=video.element_handle(),timeout=10000);page.wait_for_timeout(400)
  assert video.evaluate('(v)=>v.webkitAudioDecodedByteCount>0'),product
  video.evaluate('async v=>{v.pause();const done=new Promise(resolve=>v.addEventListener("seeked",resolve,{once:true}));v.currentTime=8;await done;}')
  video.screenshot(path=str(OUT/f'{product}-playing.png'))
  track=video.locator('track[kind="captions"]');assert track.get_attribute('srclang')=='en'
  vtt=context.request.get(BASE+track.get_attribute('src')).text();assert vtt.startswith('WEBVTT') and 'Original instrumental' in vtt
  details=page.locator('.trailer-transcript').nth(i);details.locator('summary').click();expect(details).to_contain_text('no narration')
 page.screenshot(path=str(OUT/'concept-desktop.png'),full_page=True)
 for width in [900,390,320]:
  page.set_viewport_size({'width':width,'height':844})
  for route in ['/','/projects','/projects/datadustr-tools','/projects/framed','/projects/timely']:
   page.goto(BASE+route,wait_until='networkidle');assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),(width,route)
  if width!=900:
   page.goto(BASE+'/projects/datadustr-tools#trailers',wait_until='networkidle');page.screenshot(path=str(OUT/f'tours-{width}.png'))
 page.set_viewport_size({'width':1440,'height':1000})
 for theme in ['winter','midnight','hacker']:
  page.get_by_role('button',name=f'Switch to {theme} theme').click();expect(page.locator('html')).to_have_attribute('data-theme',theme);assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
 for w,h in [(1280,720),(900,650)]:
  page.set_viewport_size({'width':w,'height':h});page.goto(BASE+'/',wait_until='networkidle');assert page.evaluate('document.documentElement.scrollHeight<=innerHeight'),(w,h)
 desktop=Path.home()/'Desktop'/'As I Left It — Creative Kit'
 page.goto((desktop/'START HERE.html').as_uri());expect(page.get_by_role('heading',name='A little context.')).to_be_visible();assert page.locator('video').count()==2
 page.get_by_role('link',name='Open social images & banners →').click();assert page.locator('article').count()==5
 page.set_viewport_size({'width':390,'height':844});assert page.evaluate('document.documentElement.scrollWidth<=innerWidth');page.screenshot(path=str(OUT/'social-kit-mobile.png'),full_page=True)
 assert not errors,errors
 browser.close();print('PASS: selected/college hierarchy, preserved archive demos, mock cleanup/undo, live links, both scored videos/playback/seek/captions, brain mascot, three themes and responsive widths. No external submissions or real account actions.')
