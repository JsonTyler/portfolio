"""Browser acceptance checks for the desktop portfolio; use the Mac browser runner."""
import json
import os
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

base = os.environ.get('PORTFOLIO_URL', 'http://localhost:3000')
output = Path('/tmp/portfolio-desktop-review')
output.mkdir(exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(reduced_motion='reduce')
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))

    def fits():
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
        if page.viewport_size['width'] >= 768:
            assert page.evaluate('document.documentElement.scrollHeight <= innerHeight')

    page.set_viewport_size({'width': 900, 'height': 650})
    page.goto(base, wait_until='networkidle')
    assert page.locator('.site-shell > header, .site-shell > footer').count() == 0
    assert page.locator('[data-portfolio-desktop] footer').count() == 1
    assert page.get_by_role('navigation', name='Main navigation').count() == 0
    for name in ['Inbox & File Dustr', 'Cirrus', 'Timely', 'Framed']:
        page.get_by_role('tab', name=name, exact=True).click()
        expect(page.get_by_role('group', name='Preview zoom')).to_be_visible()
        page.wait_for_function('document.querySelector("[data-embedded]")?.dataset.ready === "true"')
        page.wait_for_timeout(250)
        assert page.locator('[data-embedded] figure').evaluate('''e => {
          const r = e.getBoundingClientRect(), p = e.closest('[data-embedded]').getBoundingClientRect();
          return r.top >= p.top - 1 && r.bottom <= p.bottom - 30;
        }'''), name
        page.get_by_role('button', name='Zoom in', exact=True).click()
        expect(page.locator('[data-embedded]')).to_have_attribute('data-fitted', 'false')
        page.get_by_role('button', name='100%', exact=True).click()
        expect(page.get_by_label('Zoom level')).to_have_text('100%')
        fits()
        page.get_by_role('button', name='Fit', exact=True).click()
        expect(page.locator('[data-embedded]')).to_have_attribute('data-fitted', 'true')
        if name == 'Cirrus':
            count = page.locator('[data-embedded] tbody tr').evaluate_all('rs => {const v=rs[0].closest("table").parentElement.getBoundingClientRect();return rs.filter(e=>{const r=e.getBoundingClientRect();return r.top>=v.top&&r.bottom<=v.bottom+1}).length}')
            assert count >= 5, count
            page.get_by_role('button', name='Use compact density', exact=True).click()
            page.wait_for_timeout(400)
            compact = page.locator('[data-embedded] tbody tr').evaluate_all('rs => {const v=rs[0].closest("table").parentElement.getBoundingClientRect();return rs.filter(e=>{const r=e.getBoundingClientRect();return r.top>=v.top&&r.bottom<=v.bottom+1}).length}')
            assert compact > count, (count, compact)
        page.get_by_role('button', name='Story', exact=True).click()
        if name == 'Inbox & File Dustr':
            expect(page.get_by_role('group', name='Story pages')).to_have_count(0)
            expect(page.get_by_role('heading', name='Cleanup starts with a decision you can review.')).to_be_visible()
        else:
            expect(page.get_by_role('group', name='Story pages')).to_be_visible()
            if name == 'Timely':
                expect(page.get_by_role('link', name='Read the IEEE publication', exact=False)).to_have_attribute('href', 'https://ieeexplore.ieee.org/document/9020497')
                expect(page.get_by_role('link', name='View Timely on GitHub', exact=False)).to_have_attribute('href', 'https://github.com/JsonTyler/Timely')
            page.get_by_role('button', name='Next ›', exact=True).click()
            expect(page.get_by_role('group', name='Story pages')).to_contain_text('2 of')
            page.get_by_role('button', name='‹ Previous', exact=True).click()
            expect(page.get_by_role('group', name='Story pages')).to_contain_text('1 of')
        fits()

    page.get_by_role('tab', name='Inbox & File Dustr', exact=True).click()
    page.get_by_role('button', name='Safe Mass Delete', exact=False).click()
    expect(page.locator('p[role=status]')).to_contain_text('protected messages stayed')
    page.get_by_role('button', name='Undo', exact=True).click()
    expect(page.locator('p[role=status]')).to_contain_text('Cleanup undone')
    page.get_by_role('button', name='Films', exact=True).click()
    expect(page.locator('video')).to_have_count(2)
    for video in page.locator('video').all():
        bounds = video.bounding_box()
        assert bounds['height'] <= 220 and bounds['width'] <= 400
    fits()
    page.get_by_role('tab', name='Experience', exact=True).click()
    expect(page.get_by_role('heading', name='Experience', exact=True)).to_be_visible()
    page.go_back()
    expect(page.get_by_role('button', name='Films', exact=True)).to_have_attribute('aria-pressed', 'true')

    for tab, heading in [('Experience', 'Experience'), ('About me', 'An engineer with a designer’s eye.'), ('Résumé', 'Resume'), ('Contact', 'Get in touch.')]:
        page.get_by_role('tab', name=tab, exact=True).click()
        expect(page.get_by_role('heading', name=heading, exact=True)).to_be_visible()
        assert page.url.startswith(base.rstrip('/') + '/#')
        fits()
    page.get_by_role('tab', name='As I Left It', exact=True).click()
    expect(page.get_by_role('heading', name='As I Left It', exact=True)).to_be_attached()
    expect(page.get_by_role('tabpanel')).to_contain_text('Coming soon.')

    for theme in ['hacker', 'midnight', 'winter']:
        for width, height in [(1440, 900), (900, 650), (390, 844), (320, 740)]:
            page.set_viewport_size({'width': width, 'height': height})
            page.get_by_role('tab', name='Overview', exact=True).click()
            page.get_by_role('button', name=f'Switch to {theme} theme', exact=True).click()
            expect(page.locator('html')).to_have_attribute('data-theme', theme)
            fits()
            page.screenshot(path=str(output / f'{theme}-{width}-overview.png'), full_page=True)
            page.get_by_role('tab', name='Cirrus', exact=True).click()
            page.wait_for_timeout(400)
            fits()
            page.screenshot(path=str(output / f'{theme}-{width}-preview.png'), full_page=True)
    page.set_viewport_size({'width': 900, 'height': 650})
    page.get_by_role('tab', name='Overview', exact=True).click()
    page.get_by_role('tab', name='Overview', exact=True).press('ArrowDown')
    expect(page.get_by_role('tab', name='Inbox & File Dustr', exact=True)).to_be_focused()
    page.get_by_role('button', name='Enlarge workspace', exact=True).click()
    fits()
    page.get_by_role('button', name='Restore window size', exact=True).click()
    page.emulate_media(reduced_motion='no-preference')
    page.get_by_role('button', name='Switch to hacker theme', exact=True).click()
    page.get_by_role('button', name='Pause signals', exact=True).click()
    expect(page.get_by_role('button', name='Resume signals', exact=True)).to_be_visible()
    assert not errors, errors
    browser.close()
    print('PASS: desktop/mobile/themes, internal navigation/history, app interactions, zoom/pan/fit, story paging, films, keyboard and motion controls; no runtime errors.')
