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
