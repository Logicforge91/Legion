# Legion — React Portfolio

A responsive, single-page developer portfolio for Suman K S. The project is implemented entirely with React components and Vite; no HTML fragments, runtime HTML injection, or legacy DOM script is used.

## Features

- Semantic, accessible React sections for profile, journey, skills, projects, achievements, testimonials, and contact
- Data-driven timeline, skills, projects, and proof metrics
- Responsive navigation with outside-click and Escape-key handling
- Active-section scroll spy
- Declarative project filtering with an accessible live result count
- Reusable reveal, spotlight-card, and animated-counter components
- Reduced-motion support
- Responsive desktop, tablet, and mobile layouts
- Downloadable résumé served as a public asset
- Netlify-powered recruiter contact form with loading, success, error, and spam-protection states
- Contact payload limits and a submission-preserved honeypot for stronger abuse resistance
- Search-engine, Open Graph, Twitter, and canonical metadata
- Verified employer website links in the experience timeline
- Production integrations showcase covering payments, messaging, external APIs, queues, webhooks, retries, and observability
- Evidence-based working principles in place of unverifiable testimonial copy
- On-demand JavaScript chunks for the command palette and project case-study dialogs
- System-font rendering with no blocking Google Fonts request
- Deferred icon stylesheet and automatic stale-chunk recovery after deployments
- Native profile sharing with clipboard fallback
- Offline repeat-visit support through a lightweight service worker
- Six decision-focused case studies with deep-linkable, shareable URLs
- Branded large-format social preview for LinkedIn, WhatsApp, and other link unfurls
- Automated content validation for case-study completeness, unique slugs, and required assets
- Intent-preloaded case studies with Back-button support, dynamic metadata, and non-blocking project filtering
- Playwright desktop and mobile smoke tests for layout, filters, dialogs, keyboard navigation, and contact validation

## Technology

- React 19
- Tailwind CSS 4 with the first-party Vite plugin
- Vite 6
- Modern JavaScript and JSX
- CSS custom properties, Grid, Flexbox, and media queries
- Self-hosted Bootstrap Icons bundled by Vite
- A reduced icon stylesheet containing only selectors used by the portfolio, with WOFF2-only delivery

## Project structure

```text
Legion/
├── public/
│   └── assets/resume.pdf
├── src/
│   ├── components/
│   │   ├── layout/   # Header, footer, and scroll controls
│   │   ├── ui.jsx    # Reveal, spotlight, counter, and heading primitives
│   │   └── ...       # Ambient canvas and technology rail
│   ├── config/       # Navigation and observed section definitions
│   ├── hooks/        # Intersection observer and page-state hooks
│   ├── pages/        # One component per portfolio section
│   ├── App.jsx       # Lightweight page composition only
│   ├── data.js       # Shared portfolio content rendered by sections
│   ├── main.jsx      # React application entry point
│   └── styles.css    # Tailwind theme, layers, components, and custom utilities
├── css/home.css      # Existing semantic styles imported into Tailwind's component layer
├── index.html        # Minimal Vite host document
├── vite.config.js    # React plugin and production build settings
└── package.json
```

## Getting started

Requirements: Node.js 20 or newer and npm.

```bash
npm install
npm run dev
```

Vite prints the local development URL, normally `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

Run the complete content and production-build check before deployment:

```bash
npm run check
```

## Browser tests

Install the Chromium test browser once, then run the desktop and mobile suites:

```bash
npx playwright install chromium
npm run test:e2e
```

Use `npm run test:e2e:list` to verify test discovery without launching a browser.

The optimized site is generated in `dist/`. Production source maps are disabled to keep deployment output smaller and avoid publishing application source unnecessarily.

## Editing portfolio content

Most repeated content lives in `src/data.js`:

- `journey` controls experience timeline entries.
- `skills` controls technology cards.
- `projects` controls project details, tags, filters, icons, and card sizing.
- `proof` controls animated achievement metrics.

Page-specific copy and contact links live in their corresponding section components under `src/pages/`.

Every project has a `filters` array. Its values must match the filter names rendered by the `Projects` component (`backend`, `integration`, `product`, or `realtime`).

## Component design

- `useInView` provides a reusable Intersection Observer hook.
- `Reveal` applies one-time entrance animation as content enters the viewport.
- `Spotlight` calculates pointer position and updates CSS variables for interactive lighting.
- `Counter` animates metrics using `requestAnimationFrame` and an ease-out curve.
- `Header` owns mobile-menu state and keyboard behavior.
- `ProjectsSection` owns filter state and derives visible cards without direct DOM mutation.
- `usePageState` centralizes scroll progress, sticky-header state, scroll-to-top visibility, and section observation.
- `useReducedMotion` reacts to operating-system preference changes and is shared by motion-heavy components.
- `AppErrorBoundary` provides a resilient recovery screen if an unexpected render error reaches the application root.

Performance-sensitive pointer and scroll handlers are synchronized with `requestAnimationFrame`, derived project results are memoized, and observers disconnect as soon as their work is complete.

Reveal and counter components share pooled Intersection Observers, reduced-motion consumers share one media-query listener, counters update their isolated text nodes without React frame-by-frame rendering, and scroll progress is written through a CSS custom property so the application tree does not re-render on every scroll frame.

Secondary overlays use `React.lazy` and `Suspense`, so visitors do not download the command palette or project-dialog implementation until they use those features.
- `AmbientCanvas` uses Tailwind arbitrary properties and theme animations for the grid and ambient lighting.
- `TechMarquee` renders the core stack as reusable Tailwind component utilities.

## Tailwind design system

The project uses Tailwind CSS 4 through `@tailwindcss/vite`. Custom colors, fonts, animations, and keyframes are declared with `@theme` in `src/styles.css`. Repeated compositions such as technology chips, ambient orbs, and the scroll-progress bar live in `@layer components`.

The prior semantic stylesheet is imported into Tailwind's component layer. This preserves the detailed responsive portfolio layout while allowing Tailwind utilities to override or extend it predictably. New interface work should prefer utility classes in JSX; extract a class into `@layer components` when the same composition is repeated.

Users who request reduced motion receive immediate text and metrics without animated transitions.

## Deployment

Deploy the generated `dist/` directory to any static host, including Netlify, Vercel, Cloudflare Pages, or GitHub Pages. Configure the build command as `npm run build` and the output directory as `dist`.

### Netlify

The included `netlify.toml` configures Netlify to run `npm run build` and publish only `dist/`. Do not set the publish directory to the repository root: the source `index.html` references JSX that must be transformed by Vite.

The hidden static form in `index.html` allows Netlify to register the React contact form during deployment. Submissions appear under the site's **Forms** tab in the Netlify dashboard.

If the Netlify dashboard contains older manual build settings, use:

- Build command: `npm run build`
- Publish directory: `dist`
- Node version: `22`
