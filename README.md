# Jason Tyler Rodriguez — Portfolio

My personal website, presenting engineering experience, product work, UX and design-system work, and selected research projects.

[Visit the portfolio](https://www.jasontylerrodriguez.com)

## Technologies

Next.js App Router, React, TypeScript, and Tailwind CSS.

## Local development

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Checks and production build

```bash
npm run type-check
npm run lint
npm run build
```

`npm run ci` runs these checks together. `npm run start` serves a production build.

Browser and visual regression checks use Playwright: see
[the setup, baseline review, and CI instructions](docs/qa/PLAYWRIGHT.md).
Run `npm run test:e2e` after building; `npm run test:report` opens the HTML report.
Reviewed macOS and Linux screenshot baselines are included. GitHub Actions runs
behavior checks and Linux screenshot comparisons on pushes and pull requests.

## Content and structure

- `app/`: pages for projects, experience, resume, about, and contact.
- `content/projects.ts`: project summaries and featured-project selection.
- `content/experience.ts`: career history.
- `content/case-studies/`: detailed project narratives.
- `components/`: layout and reusable interface components.
- `styles/globals.css`: site styles.
- `public/resume/`: downloadable resume.
- `static/`: retained assets from earlier portfolio versions.
- `netlify.toml`: hosting configuration.

## Portfolio scope

Case studies distinguish personal products, professional experience, prototypes, and historical research. Some source repositories are private; access to this repository does not grant access to linked private projects.

## Feedback

This is a personal portfolio. Pull requests are not currently accepted; feedback is welcome.

## Local review of the hiring portfolio pass

Branch: `portfolio/hiring-first-pass`. Existing themes and stack are retained. DataDustr has one case study; `/projects/datadustr` redirects to `/projects/datadustr-tools`. Professional work detail is withheld pending sharing permission; see `docs/CONTENT_PENDING.md`.

With Node 20.9+ and npm available, from this directory:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For checks, run `npm run type-check`, `npm run lint`, and `npm run build`. These are local operations; do not trigger deployment.

Before release, inspect home, work, each project, resume, and contact at phone/tablet/desktop widths; all three themes; keyboard skip link, mobile menu, Escape and focus return; 200%/400% zoom; reduced motion; screen-reader headings/landmarks; source links and the résumé print/save action. No automated accessibility result establishes full conformance.

The current authoring sandbox can run typecheck and lint. The Webpack production build is available via `npm run build -- --webpack`; default Turbopack is blocked by the sandbox’s port-binding restriction. The dev server and Chromium also remain blocked, so no rendered-layout, keyboard, screen-reader, or screenshot pass is claimed. See `docs/VERIFICATION.md` for the checks actually performed.
