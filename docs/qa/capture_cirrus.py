"""Capture the actual POC's compact toggle as a GIF on a browser-capable host.

Run: python3 docs/qa/capture_cirrus.py
Requires Playwright Chromium and Pillow. No server or FFmpeg is required.
Output is a review draft; this script never publishes or wires it into the site.
"""
import argparse
from io import BytesIO
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, default=Path('/tmp/cirrus-compact-review.gif'))
    args = parser.parse_args()
    frames = []
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={'width': 1600, 'height': 1040}, reduced_motion='reduce')
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.goto((ROOT / 'public/demos/cirrus/index.html').as_uri())
        page.locator('[data-compact-toggle]').wait_for()
        page.evaluate('document.fonts.ready')
        for nav in ['PR Home', 'Recent', 'Employee Search']:
            page.locator(f'#sideNav [data-nav="{nav}"]').click()
            for compact in [False, True]:
                desired = 'true' if compact else 'false'
                toggle = page.locator('[data-compact-toggle]')
                if toggle.get_attribute('aria-pressed') != desired:
                    toggle.click()
                page.wait_for_function('(value) => document.documentElement.dataset.compactEnabled === value', arg=desired)
                page.wait_for_timeout(300)
                image = Image.open(BytesIO(page.screenshot())).convert('RGB').resize((1200, 780), Image.Resampling.LANCZOS)
                draw = ImageDraw.Draw(image)
                draw.rectangle((0, 735, 1200, 780), fill='#19375b')
                font = ImageFont.load_default(size=20)
                draw.text((22, 747), f'{nav.replace("PR Home", "Home")}  /  {"Compact mode" if compact else "Standard density"}  /  Actual POC · mock data', font=font, fill='white')
                frames.append(image)
        browser.close()
        if errors:
            raise RuntimeError('POC emitted errors; review before using capture: ' + '; '.join(errors))
    contact = Image.new('RGB', (1200, 780 * len(frames)))
    for index, frame in enumerate(frames):
        contact.paste(frame, (0, index * 780))
    palette = contact.quantize(colors=256)
    indexed = [frame.quantize(palette=palette, dither=Image.Dither.NONE) for frame in frames]
    args.output.parent.mkdir(parents=True, exist_ok=True)
    indexed[0].save(args.output, save_all=True, append_images=indexed[1:], duration=[1600, 2200] * 3, disposal=1)
    print(f'Saved actual compact-mode comparison draft: {args.output}')


if __name__ == '__main__':
    main()
