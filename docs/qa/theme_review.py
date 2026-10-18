"""Run against a locally served portfolio; screenshots and report stay local."""
import argparse
import json
import re
from urllib.parse import urljoin
from pathlib import Path

from playwright.sync_api import expect, sync_playwright

SAMPLE_SIGNALS = """() => [...document.querySelectorAll('.signal-head')].map(marker => {
  const center = new DOMPoint(0, 0).matrixTransform(marker.getScreenCTM());
  const route = document.getElementById(marker.dataset.route);
  const length = route.getTotalLength();
  const matrix = route.getScreenCTM();
  let error = Infinity;
  for (let step = 0; step <= 1200; step++) {
    const point = route.getPointAtLength(length * step / 1200).matrixTransform(matrix);
    error = Math.min(error, Math.hypot(point.x - center.x, point.y - center.y));
  }
  return { x: center.x, y: center.y, error };
})"""


def review(page, url, output, width, height):
    page.set_viewport_size({"width": width, "height": height})
    page.emulate_media(reduced_motion="no-preference")
    page.goto(url, wait_until="networkidle")
    page.get_by_role("button", name="Switch to midnight theme").click()
    expect(page.locator(".night-sky")).to_be_visible()
    expect(page.locator(".twinkle-star")).to_have_count(10)
    expect(page.locator(".shooting-star")).to_have_count(2)
    before = page.locator(".cloud-near").evaluate("el => getComputedStyle(el).transform")
    page.wait_for_timeout(800)
    after = page.locator(".cloud-near").evaluate("el => getComputedStyle(el).transform")
    assert before != after, "Cloud is not moving"
    page.get_by_role("button", name="Pause night sky", exact=True).click()
    expect(page.locator(".motion-control")).to_have_count(1)
    assert page.locator(".twinkle-star").first.evaluate("el => getComputedStyle(el).animationPlayState") == "paused"
    # Freeze a shooting star mid-flight for visual review; its natural schedule
    # otherwise leaves the sky empty for most of each 29/43-second cycle.
    page.locator(".shooting-star-near").evaluate("""el => {
      const animation = el.getAnimations()[0];
      const timing = animation.effect.getTiming();
      animation.currentTime = timing.delay + timing.duration * .915;
    }""")
    page.locator(".twinkle-star").nth(2).evaluate("""el => {
      for (const node of [el, el.querySelector('.twinkle-glint')]) {
        const animation = node.getAnimations()[0];
        const timing = animation.effect.getTiming();
        animation.currentTime = timing.delay + timing.duration * .73;
      }
    }""")
    page.evaluate("scrollTo(0, 0)")
    page.screenshot(path=str(output / f"midnight-{width}.png"))

    page.get_by_role("button", name="Switch to hacker theme").click()
    expect(page.locator(".signal-head")).to_have_count(4)
    first = page.evaluate(SAMPLE_SIGNALS)
    page.wait_for_timeout(800)
    second = page.evaluate(SAMPLE_SIGNALS)
    assert all(point["error"] < 3 for point in first + second), ("Marker left its circuit", first, second)
    assert any(abs(a["x"] - b["x"]) + abs(a["y"] - b["y"]) > 5 for a, b in zip(first, second)), "Signals are stationary"
    page.screenshot(path=str(output / f"hacker-{width}.png"))
    page.get_by_role("button", name="Pause signals", exact=True).click()
    page.wait_for_timeout(100)
    svg = page.locator(".signal-field > svg")
    paused_at = svg.evaluate("el => el.getCurrentTime()")
    page.wait_for_timeout(350)
    assert abs(svg.evaluate("el => el.getCurrentTime()") - paused_at) < .05, "SVG timeline did not pause"
    page.screenshot(path=str(output / f"footer-{width}.png"))
    page.get_by_role("button", name="Resume signals", exact=True).click()
    page.wait_for_timeout(350)
    assert svg.evaluate("el => el.getCurrentTime()") > paused_at + .1, "SVG timeline did not resume"
    page.emulate_media(reduced_motion="reduce")
    expect(page.locator(".signal-head")).to_have_count(0)
    expect(page.locator(".motion-control")).to_be_hidden()
    page.get_by_role("button", name="Switch to midnight theme").click()
    expect(page.locator(".night-sky")).to_be_visible()
    assert page.locator(".shooting-star-near").evaluate("el => getComputedStyle(el).animationName") == "none"
    assert page.locator(".twinkle-star").first.evaluate("el => getComputedStyle(el).animationName") == "none"
    expect(page.locator(".motion-control")).to_be_hidden()
    page.emulate_media(reduced_motion="no-preference")
    page.get_by_role("button", name="Switch to winter theme").click()
    expect(page.locator(".snowfall")).to_be_visible()
    expect(page.locator(".winter-frost")).to_have_count(0)
    assert page.evaluate("document.documentElement.scrollWidth <= innerWidth"), "Horizontal overflow"
    page.evaluate("scrollTo(0, 0)")
    page.screenshot(path=str(output / f"winter-{width}.png"))
    page.emulate_media(reduced_motion="reduce")
    page.goto(urljoin(url.rstrip('/') + '/', 'projects'), wait_until="networkidle")
    expect(page.locator('figure.project-visual')).to_have_count(4)
    assert page.locator('figure.project-visual').first.evaluate("""figure => {
      figure.scrollIntoView({block: 'center'});
      const snow = document.querySelector('.snowfall');
      const previous = snow.style.pointerEvents;
      snow.style.pointerEvents = 'auto';
      try {
        const bounds = figure.getBoundingClientRect();
        return figure.contains(document.elementFromPoint(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2));
      } finally { snow.style.pointerEvents = previous; }
    }"""), 'Snow is stacked above the interactive preview'
    assert page.evaluate("document.documentElement.scrollWidth <= innerWidth"), "Project-list horizontal overflow"
    page.screenshot(path=str(output / f"projects-{width}.png"), full_page=True)
    for slug in ['datadustr-tools', 'timely', 'framed', 'cirrus']:
        page.goto(urljoin(url.rstrip('/') + '/', f'projects/{slug}'), wait_until="networkidle")
        expected_images = 0
        expect(page.locator(".case-visual img")).to_have_count(expected_images)
        assert page.locator(".case-visual img").evaluate_all("images => images.every(image => image.complete && image.naturalWidth > 0)"), f"Missing {slug} visual"
        expect(page.get_by_role('link', name=re.compile('View full size'))).to_have_count(0)
        preview = page.locator('.case-visual figure')
        expect(preview.get_by_text('Try this demo', exact=True)).to_be_visible()
        if slug == 'framed':
            handle = page.get_by_role('button', name=re.compile('Move selected frame'))
            handle.focus()
            page.keyboard.press('ArrowRight')
            expect(preview.locator('output').nth(0)).to_have_text('32.5')
            expect(preview.locator('output').nth(1)).to_have_text('39.5')
            page.get_by_label('From top', exact=True).focus()
            page.keyboard.press('Home')
            page.keyboard.press('ArrowRight')
            expect(preview.locator('output').nth(2)).to_have_text('1.1')
            page.get_by_role('button', name='Reset', exact=True).click()
            expect(preview.locator('output').nth(0)).to_have_text('32')
            handle.scroll_into_view_if_needed()
            bounds = handle.bounding_box()
            page.mouse.move(bounds['x'] + bounds['width']/2, bounds['y'] + bounds['height']/2)
            page.mouse.down()
            page.mouse.move(bounds['x'] + bounds['width']/2 + 20, bounds['y'] + bounds['height']/2 + 10, steps=4)
            page.mouse.up()
            assert preview.locator('output').nth(0).inner_text() != '32', 'Frame drag did not update measurements'
        elif slug == 'datadustr-tools':
            apply = page.get_by_role('button', name='Apply cleanup', exact=True)
            expect(apply).to_be_disabled()
            expect(page.get_by_role('button', name=re.compile('Preview'))).to_have_count(0)
            page.get_by_role('button', name=re.compile('Old newsletters')).click()
            expect(apply).to_be_enabled()
            expect(preview.locator('[data-selected="true"]')).to_have_count(3)
            apply.click()
            expect(preview.locator('[data-protected="true"]')).to_have_count(2)
            expect(preview.get_by_text('Design Dispatch', exact=True)).to_have_count(0)
            page.get_by_role('button', name='Undo', exact=True).click()
            expect(preview.get_by_text('Design Dispatch', exact=True)).to_be_visible()
            page.get_by_role('button', name=re.compile('Expired promotions')).click()

            expect(preview.locator('[data-selected="true"]')).to_have_count(2)
        elif slug == 'timely':
            page.get_by_role('button', name='Inspect CASE-002', exact=True).click()
            expect(preview.get_by_text('Apr 13, 2026', exact=True)).to_be_visible()
            expect(preview.get_by_text('Apr 21, 2026', exact=True)).to_be_visible()
            expect(page.get_by_role('button', name='Inspect CASE-002', exact=True)).to_have_attribute('aria-pressed', 'true')
        if slug == 'cirrus':
            expect(page.get_by_label('Product view')).to_have_count(0)
            expect(preview).to_have_attribute('data-compact', 'false')
            page.wait_for_timeout(400)
            def rows_in_view():
                return preview.locator('tbody tr').evaluate_all("rows => { const bottom = rows[0].closest('table').parentElement.getBoundingClientRect().bottom; return rows.filter(row => row.getBoundingClientRect().bottom <= bottom + 1).length; }")
            spacious_rows = rows_in_view()
            toolbar = page.get_by_role('button', name='Use compact density', exact=True)
            spacious_bar = toolbar.evaluate('button => button.parentElement.getBoundingClientRect().height')
            spacious_tab = toolbar.evaluate('button => button.parentElement.nextElementSibling.firstElementChild.firstElementChild.getBoundingClientRect().height')
            page.get_by_role('button', name='Use compact density', exact=True).click()
            expect(preview).to_have_attribute('data-compact', 'true')
            page.wait_for_timeout(400)
            compact_rows = rows_in_view()
            compact_bar = page.get_by_role('button', name='Use spacious density', exact=True).evaluate('button => button.parentElement.getBoundingClientRect().height')
            compact_tab = page.get_by_role('button', name='Use spacious density', exact=True).evaluate('button => button.parentElement.nextElementSibling.firstElementChild.firstElementChild.getBoundingClientRect().height')
            assert compact_bar < spacious_bar and compact_tab < spacious_tab, 'Application chrome did not compact'
            assert compact_rows >= spacious_rows + 3, f'Insufficient density impact: {spacious_rows} vs {compact_rows}'
            expect(preview.locator('tbody td').first).to_have_css('color', 'rgb(37, 53, 75)')
            expect(preview.locator('tbody tr')).to_have_count(15)
            page.get_by_role('button', name='Spacious', exact=True).click()
            expect(preview).to_have_attribute('data-compact', 'false')
        assert page.evaluate("document.documentElement.scrollWidth <= innerWidth"), f"{slug} horizontal overflow"
        page.screenshot(path=str(output / f"{slug}-{width}.png"))
    for route in ['about', 'contact']:
        page.goto(urljoin(url.rstrip('/') + '/', route), wait_until='networkidle')
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), f'{route} horizontal overflow'
        if route == 'about':
            scene = page.get_by_role('region', name='An illustrated profile of Jason')
            expect(page.get_by_role('button', name='Build', exact=True)).to_have_count(0)
            page.get_by_role('button', name='Meet the striped tabby', exact=True).focus()
            expect(scene).to_have_attribute('data-active', 'tabby')
            page.keyboard.press('Escape')
            expect(scene).to_have_attribute('data-active', 'idle')
            page.get_by_role('button', name='Explore travel and the truck camper', exact=True).hover()
            expect(scene).to_have_attribute('data-active', 'travel')
            page.get_by_role('button', name='Meet the small Siamese', exact=True).click()
            expect(scene).to_have_attribute('data-active', 'siamese')
            for name, active in [('Explore the plant on the shelf', 'plant'), ('Explore the cup on the desk', 'cup'), ('Explore the mountain view', 'mountains'), ('Meet Jason', 'portrait')]:
                page.get_by_role('button', name=name, exact=True).focus()
                expect(scene).to_have_attribute('data-active', active)
            page.keyboard.press('Escape')
            expect(scene).to_have_attribute('data-active', 'idle')
        if route == 'contact' or (route == 'about' and width >= 1000 and height >= 600):
            assert page.evaluate('document.documentElement.scrollHeight <= innerHeight + 2'), f'{route} unnecessary vertical overflow'
        page.screenshot(path=str(output / f'{route}-{width}.png'), full_page=True)
    page.goto(urljoin(url.rstrip('/') + '/', 'resume'), wait_until='networkidle')
    page.get_by_role('button', name='Switch to hacker theme').click()
    link = page.locator('.resume-download')
    link.hover()
    expect(link).to_have_css('color', 'rgb(16, 24, 25)')
    expect(link).to_have_css('background-color', 'rgb(225, 241, 198)')
    with page.expect_download() as pending:
        link.click()
    download = pending.value
    assert download.suggested_filename == 'Jason-Tyler-Rodriguez-Resume.pdf'
    saved = output / f'resume-{width}.pdf'
    download.save_as(str(saved))
    assert saved.read_bytes().startswith(b'%PDF-'), 'Resume download is not a PDF'
    return {"viewport": [width, height], "maximum_route_error_px": max(point["error"] for point in first + second), "checks": "passed"}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--url", default="http://127.0.0.1:3000")
    parser.add_argument("--output", type=Path, default=Path("/tmp/portfolio-theme-review"))
    parser.add_argument("--headed", action="store_true")
    args = parser.parse_args()
    args.output.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=not args.headed)
        page = browser.new_page()
        errors = []
        page.on("pageerror", lambda error: errors.append(str(error)))
        results = [review(page, args.url, args.output, width, height) for width, height in [(1440, 1000), (375, 812)]]
        assert not errors, errors
        browser.close()
    report = {"viewports": results, "page_errors": errors, "note": "Screenshots still require human review; these checks are not an accessibility audit."}
    (args.output / "report.json").write_text(json.dumps(report, indent=2) + "\n")
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
