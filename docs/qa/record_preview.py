"""Record a manually exercised local app on a host that permits Chromium."""
import argparse
from pathlib import Path
from playwright.sync_api import sync_playwright


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--url', required=True)
    parser.add_argument('--output', type=Path, default=Path('/tmp/project-recording'))
    parser.add_argument('--seconds', type=int, default=12)
    args = parser.parse_args()
    if not 1 <= args.seconds <= 60:
        parser.error('--seconds must be between 1 and 60')
    args.output.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        context = browser.new_context(viewport={'width': 1200, 'height': 780}, record_video_dir=str(args.output), record_video_size={'width': 1200, 'height': 780})
        page = context.new_page()
        page.goto(args.url, wait_until='networkidle')
        print(f'Recording for {args.seconds}s. Exercise the interface using synthetic data.', flush=True)
        page.wait_for_timeout(args.seconds * 1000)
        page.screenshot(path=str(args.output / 'poster.png'))
        context.close()
        browser.close()
    print(f'WebM and poster saved to {args.output}')


if __name__ == '__main__':
    main()
