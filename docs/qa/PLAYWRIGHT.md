# Portfolio browser and visual regression checks

## Current verification status

The focus fix removes propagated underlines from focusable content containers and
avoids moving focus on initial page load. Navigation still moves focus, and
keyboard users retain outlines.

Browser startup is working after the app-server daemon restart on October 27,
2026. A direct Playwright launch opened installed Chrome and read a test page.
The production Webpack build passed. The recruiter journey script passed all 14
checks after correcting its import to use this project's `@playwright/test`.

The config now selects installed Chrome automatically on macOS and bundled
Chromium on Linux. `PLAYWRIGHT_EXECUTABLE_PATH` remains an explicit override.
This avoids downloading a browser that requires a newer macOS than this Mac.
The earlier Mach service registration failure no longer reproduces in this session.
The regression review found clipped document headings and unreachable final Work
items at 320×568. Documents now grow from the top and scroll when needed; shorter
summaries remain centered. The phone Work list has a user-scrollable container.
Contact labels stack above their values on narrow phones, keeping the email
readable. The mailto address is unchanged.

Two new regression checks reproduced the original failures before the fix. After
the fix, all 18 applicable behavior checks passed across the four viewport
projects; 2 desktop/tablet phone-list cases were intentionally skipped. The
production Webpack build (including TypeScript) and application lint passed.

The 62 applicable visual cases captured 73 initial macOS reference images using
Chrome 138.0.7204.184. All images were visually reviewed, including the initial
and scrolled ends of small-phone documents and Work lists. The clipped headings
and unreachable final actions are fixed. These baselines are new references,
not comparisons against an earlier approved design. Appearance screenshots use
explicit keyboard selection and keyboard dialog dismissal so focus outlines are
deterministic. All 24 cases in two repeated theme runs passed with screenshot
updates disabled and the original comparison tolerance. Linux references are still
pending; macOS references do not satisfy Linux CI comparisons.

Final normal run with snapshot updates disabled: **80 passed, 4 intentionally
skipped, 0 failures** in 2.6 minutes. All 73 macOS screenshot references matched.
The skipped cases are desktop/tablet checks for the phone-only Work list.

The full suite report is in `playwright-report/index.html`; traces and failure
screenshots are in `test-results/`. The before-fix reproductions are in
`/tmp/portfolio-clipping-before/`. Local review sheets are
`/tmp/portfolio-fixed-{mobile,tablet,desktop,small-mobile}-*.png`.
Temporary reports and generated HTML reports are ignored artifacts.

## Run locally

```sh
source ../.local-tools/activate.sh
npm ci
npx playwright install chromium
npm run build -- --webpack
npm run test:e2e
npm run test:report
```

On macOS, installed Chrome is selected automatically, so skip the Chromium
download above. To override the browser explicitly, set this environment variable:

```sh
export PLAYWRIGHT_EXECUTABLE_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
```

Tests start the production server on port 3017. Locally an already running server
can be reused; ensure it serves the latest changes. CI always starts a fresh
production server.

For behavioral tests before screenshot baselines exist:

```sh
npm run test:e2e -- --grep-invert @visual
```

## Review and accept screenshot baselines

```sh
npm run test:visual:update
npm run test:visual
```

Review the generated images in `tests/browser/portfolio.spec.ts-snapshots/` before
committing them. Normal test runs explicitly prohibit updating snapshots, so
missing or changed baselines fail. Never update baselines just to hide a failure.
Screenshots use reduced motion, disabled animations, loaded fonts and images,
fresh browser storage, and a pinned Playwright version.

The suite covers 390×844 and 320×568 touch phones, an 820×1180 touch tablet, and a
1440×900 desktop. It captures all home themes, mobile appearance sheets and work
lists, documents, every project preview, project details, and keyboard focus.
Behavioral checks cover content underlines, initial focus, navigation, history,
contact links, résumé PDF delivery, keyboard tab navigation, dialog dismissal,
runtime errors, workspace bounds, fully visible document headings, and final
actions reachable through scrollable content.

## CI

`.github/workflows/visual-review.yml` runs behavior and screenshot comparisons on
pushes and pull requests on Ubuntu 24.04. When no Linux references exist, it
runs behavioral checks and captures candidate screenshots, with an explicit
review warning and an uploaded `portfolio-candidate-baselines` artifact. After
reviewed Linux references are committed, normal runs compare them with snapshot
updates disabled. Missing or changed individual references then fail. To request
a fresh candidate set deliberately, manually run the workflow with
`capture_baselines` enabled, review the artifact, and commit accepted images.
The workflow only uploads artifacts; it does not push changes or deploy.

Playwright separates baselines by operating system and project. macOS baselines
do not substitute for Linux CI baselines. Failures upload an HTML report, actual
screenshots, expected/actual image diffs when a baseline exists, and traces.

Browser checks run in GitHub Actions, alongside the existing type-check/lint/build
workflow. Netlify retains its existing build and deployment integration. These
checks do not hold a direct push from deploying; require passing PR checks before
merging if deployment must be gated. Local checks remain useful during editing.
