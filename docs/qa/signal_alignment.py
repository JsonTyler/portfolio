from playwright.sync_api import sync_playwright,expect
import json
import os
with sync_playwright() as p:
 b=p.chromium.launch();page=b.new_page(reduced_motion='no-preference',viewport={'width':1366,'height':768})
 errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto(os.environ.get('PORTFOLIO_URL', 'http://localhost:3000'),wait_until='networkidle')
 expect(page.locator('.signal-light')).to_have_count(4)
 page.wait_for_function('document.querySelector(".signal-light")?.getAnimations().length === 1')
 results=[]
 for width,height,gutter in [(1366,768,False),(1366,768,True),(900,650,True),(390,844,True),(1366,768,False)]:
  page.set_viewport_size({'width':width,'height':height})
  page.evaluate('(gutter) => {document.documentElement.style.scrollbarGutter = gutter ? "stable" : "auto";document.documentElement.style.overflowY = gutter ? "scroll" : "";}',gutter)
  page.wait_for_timeout(250)
  error=page.evaluate('''async () => {
    const svg=document.querySelector('.signal-field svg');const paths=[...svg.querySelectorAll('.signal-route')];const dots=[...document.querySelectorAll('.signal-light')];let worst=0;
    for(const t of [0,1000,3500,7000,11000,15999]){
      dots.forEach(dot=>{let a=dot.getAnimations()[0];a.pause();a.currentTime=t;});
      await new Promise(requestAnimationFrame);
      dots.forEach((dot,i)=>{
        const rect=dot.getBoundingClientRect(),x=rect.x+rect.width/2,y=rect.y+rect.height/2,m=svg.getScreenCTM();
        const points=[...paths[i].getAttribute('d').matchAll(/[ML]([\\d.]+) ([\\d.]+)/g)].map(v=>({x:m.a*Number(v[1])+m.c*Number(v[2])+m.e,y:m.b*Number(v[1])+m.d*Number(v[2])+m.f}));
        let distance=Infinity;
        for(let j=1;j<points.length;j++){const a=points[j-1],b=points[j],dx=b.x-a.x,dy=b.y-a.y,k=Math.max(0,Math.min(1,((x-a.x)*dx+(y-a.y)*dy)/(dx*dx+dy*dy)));distance=Math.min(distance,Math.hypot(x-a.x-k*dx,y-a.y-k*dy));}
        worst=Math.max(worst,distance);
      });
    }return worst;
  }''')
  assert error<.75,(width,height,gutter,error)
  results.append({'width':width,'gutter':gutter,'maxErrorPx':round(error,3)})
 assert not errors,errors
 print(json.dumps(results));print('PASS: all four lights stay on their own circuit at six animation positions, with scrollbars and resizing.');b.close()
