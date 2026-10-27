const { chromium, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const output = path.resolve(process.env.REVIEW_OUTPUT || '/tmp/portfolio-recruiter-review', new Date().toISOString().replace(/[:.]/g, '-'));
fs.mkdirSync(output, { recursive: true });
const base = process.env.PORTFOLIO_URL || 'http://127.0.0.1:3017';
const results = [], errors = [], shots = [];
let browser;
(async () => {
 browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
 const page = await browser.newPage({ reducedMotion: 'reduce' });
 page.on('pageerror', e => errors.push(String(e)));
 async function check(name, fn) { try { await fn(); results.push({name, pass:true}); } catch(e) { results.push({name, pass:false, error:e.message}); } }
 async function capture(name) { const file = name + '.png'; await page.screenshot({path:path.join(output,file),fullPage:true}); shots.push(file); }
 async function fit() { expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy(); }
 for (const [width,height] of [[1440,900],[390,844]]) {
  await page.setViewportSize({width,height});
  await page.goto(base, {waitUntil:'networkidle'});
  for (const theme of ['hacker','midnight','winter']) {
   await check(`${width}: ${theme} theme`, async()=>{
    if(width<768) {
     const opener=page.getByRole('button',{name:'Choose appearance',exact:true});
     await opener.click();
     await page.getByRole('dialog').getByRole('button',{name:`Switch to ${theme} theme`,exact:true}).click();
     await page.getByRole('button',{name:'Done',exact:true}).click();
     await opener.click(); await page.keyboard.press('Escape');
     await expect(opener).toBeFocused();
    } else await page.getByRole('button',{name:`Switch to ${theme} theme`,exact:true}).filter({visible:true}).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme',theme);
    await fit(); await capture(`${width}-${theme}-home`);
   });
  }
  for (const slug of ['datadustr-tools','resume','contact']) {
   await check(`${width}: navigate to ${slug}`,async()=>{
    if(width>=768) await page.locator(`#desktop-tab-${slug}`).click();
    else { await page.evaluate(s=>{location.hash=s},slug); }
    await expect(page.locator('#desktop-panel')).toBeVisible();
    await page.waitForTimeout(300); await fit();
    await capture(`${width}-${slug}`);
    if(slug==='datadustr-tools') {
     await page.getByRole('button',{name:'Read details',exact:true}).click();
     await expect(page).toHaveURL(/#datadustr-tools\/details$/);
     await capture(`${width}-${slug}-details`);
     await page.goBack();
     await expect(page).toHaveURL(/#datadustr-tools$/);
     if(width>=768) {
      await page.getByRole('button',{name:'Zoom in',exact:true}).click();
      await expect(page.locator('[data-embedded]')).toHaveAttribute('data-fitted','false');
      await page.getByRole('button',{name:'Fit',exact:true}).click();
      await expect(page.locator('[data-embedded]')).toHaveAttribute('data-fitted','true');
     }
    }
    if(slug==='resume') {
     const link=page.locator('a[href="/resume/download"]').first();
     await expect(link).toBeVisible();
     const response=await page.request.get(base+'/resume/download');
     expect(response.ok()).toBeTruthy();
     expect((await response.body()).subarray(0,5).toString()).toBe('%PDF-');
    }
    if(slug==='contact') expect(await page.locator('#desktop-panel a[href^="mailto:"]').count()).toBeGreaterThan(0);
   });
  }
 }
 await page.setViewportSize({width:1440,height:900});
 await page.goto(base,{waitUntil:'networkidle'});
 await check('Desktop keyboard tab navigation',async()=>{
  const overview=page.locator('#desktop-tab-overview'); await overview.focus(); await overview.press('ArrowDown');
  await expect(page.locator('#desktop-tab-design-library')).toBeFocused();
 });
 results.push({name:'Browser runtime errors',pass:errors.length===0,error:errors.join('\n')});
})().catch(e=>results.push({name:'Review launch',pass:false,error:e.message})).finally(async()=>{
 if(browser) await browser.close();
 fs.writeFileSync(path.join(output,'report.json'),JSON.stringify({base,results,errors},null,2));
 const escape=s=>s.replace(/[&<>"']/g,c=>`&#${c.charCodeAt(0)};`);
 fs.writeFileSync(path.join(output,'index.html'),`<!doctype html><meta charset="utf-8"><title>Recruiter journey review</title><style>body{font:16px system-ui;max-width:1100px;margin:40px auto}img{max-width:100%;border:1px solid #bbb}pre{white-space:pre-wrap}</style><h1>Portfolio recruiter review</h1><p>Check visual hierarchy, readable text, navigation clarity, and the route to contact. Screenshots support human review; they do not establish accessibility conformance. Mobile route checks use URL hashes; mobile navigation controls and browser zoom still need manual review. Appearance dialog and Escape focus return are checked.</p><pre>${escape(JSON.stringify(results,null,2))}</pre>${shots.map(s=>`<h2>${s}</h2><a href="${s}"><img src="${s}" loading="lazy"></a>`).join('')}`);
 console.log('Review saved to '+output); console.log(JSON.stringify(results,null,2));
 process.exitCode=results.some(r=>!r.pass)?1:0;
});
