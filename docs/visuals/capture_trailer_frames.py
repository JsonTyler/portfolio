"""Capture only the fictional local web prototype for the portfolio tours.
Run through the installed Chrome browser-check wrapper with tools dev on port 3006.
"""
import re
from playwright.sync_api import sync_playwright, expect
from pathlib import Path
out=Path('/tmp/datadustr-concept-captures');out.mkdir(exist_ok=True)
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,args=['--disable-gpu','--renderer-process-limit=1']);page=b.new_page(viewport={'width':1280,'height':800},reduced_motion='reduce')
 page.goto('http://127.0.0.1:3006/',wait_until='networkidle');page.wait_for_timeout(1000);page.get_by_role('button',name='Demo with Gmail mock data',exact=True).click();expect(page.get_by_role('button',name='Overview',exact=True)).to_be_visible(timeout=60000);page.wait_for_timeout(700)
 for view in ['Overview','Insights','Organize','Unsubscribe']:
  page.get_by_role('button',name=re.compile('^'+view)).click();page.wait_for_timeout(600);page.screenshot(path=str(out/f'inbox-{view.lower()}.png'))
 page.get_by_role('button',name='File Dustr',exact=True).click();page.get_by_role('button',name='Load sample files',exact=True).click();expect(page.get_by_role('heading',name='Your Dashboard')).to_be_visible(timeout=15000);page.wait_for_timeout(600)
 for view in ['Dashboard','Review Queue','Organize']:
  page.get_by_role('button',name=re.compile('^'+view)).click();page.wait_for_timeout(600);page.screenshot(path=str(out/f'file-{view.lower().replace(" ","-")}.png'))
 assert not page.locator('option[value="/"]').count()
 print('PASS captures:',out);b.close()
