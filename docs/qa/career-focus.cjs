const {chromium,expect}=require(process.cwd()+'/node_modules/@playwright/test');
const fs=require('fs');
const base=process.env.PORTFOLIO_URL || 'http://127.0.0.1:3017';
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.PLAYWRIGHT_EXECUTABLE_PATH || (process.platform==='darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined)});
 const page=await browser.newPage({reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));fs.mkdirSync('/tmp/career-focus',{recursive:true});
 async function contrast(locator){return locator.evaluate(el=>{const rgb=s=>{const c=document.createElement('canvas');c.width=c.height=1;const x=c.getContext('2d');x.fillStyle=s;x.fillRect(0,0,1,1);return [...x.getImageData(0,0,1,1).data].slice(0,3).map(v=>v/255)};const lum=s=>rgb(s).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4).reduce((s,x,i)=>s+x*[.2126,.7152,.0722][i],0);let node=el,bg;while(node){bg=getComputedStyle(node).backgroundColor;if(bg!=='rgba(0, 0, 0, 0)'&&bg!=='transparent')break;node=node.parentElement}const a=lum(getComputedStyle(el).color),b=lum(bg);return (Math.max(a,b)+.05)/(Math.min(a,b)+.05)});}
 let minimum=100;
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:900});
  for(const route of ['/#experience','/#resume','/#about',...(width===1440?['/experience','/resume']:[])]){
   await page.goto(base+route,{waitUntil:'domcontentloaded'});
   if(route.includes('experience'))await expect(page.getByRole('region',{name:'Career history'})).toBeVisible();
   else if(route.includes('resume'))await expect(page.getByRole('heading',{name:'Professional Summary',exact:true})).toBeVisible();
   else{await expect(page.getByRole('heading',{name:'An engineer with a designer’s eye.',exact:true}).filter({visible:true})).toBeVisible();await expect(page.getByRole('link',{name:/More about me/})).toHaveCount(0);}
   for(const theme of ['hacker','midnight','winter']){
    await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);
    if(route.includes('experience')){
     const history=page.getByRole('region',{name:'Career history'});await expect(history.locator('article')).toHaveCount(5);
     for(const el of [history.locator('article h2').first(),history.locator('article p').first(),history.locator('article a').first(),history.locator('time').first()]){const ratio=await contrast(el);minimum=Math.min(minimum,ratio);if(ratio<4.5)throw Error(`${width} ${route} ${theme} text contrast ${ratio}`);}
    }
    if(route.includes('resume')){
     const body=page.getByRole('heading',{name:'Professional Summary',exact:true}).locator('..').locator('p').first();const bodyRatio=await contrast(body);minimum=Math.min(minimum,bodyRatio);if(bodyRatio<4.5)throw Error(`${theme} resume body contrast ${bodyRatio}`);
     const link=page.locator('a[download]').filter({visible:true}).first();await expect(link).toBeVisible();
     for(const state of ['normal','hover','focus']){if(state==='hover')await link.hover();if(state==='focus'){await page.mouse.move(0,0);await page.keyboard.press('Tab');await link.focus();}const ratio=await contrast(link);minimum=Math.min(minimum,ratio);if(ratio<4.5)throw Error(`${theme} PDF ${state} contrast ${ratio}`);}
    }
    if(route.startsWith('/#'))await page.screenshot({path:`/tmp/career-focus/${width}-${route.slice(3)}-${theme}.png`});
   }
   if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Overflow '+route);
  }
 }
 for(const slug of ['experience','resume','about']){await page.goto(base+'/#'+slug+'/details');await expect(page).toHaveURL(new RegExp('#'+slug+'$'));}
 if(errors.length)throw Error(errors.join('\n'));console.log('PASS full Experience/Resume/About on entry; five career cards; all themes; PDF hover/focus; legacy links; desktop/mobile; no runtime errors. Minimum measured text contrast '+minimum.toFixed(2)+':1');await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
