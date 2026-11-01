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
- On-demand JavaScript for the command palette and page sections
- System-font rendering with no blocking Google Fonts request
- Tree-shaken inline SVG icon masks and automatic stale-chunk recovery after deployments
- Native profile sharing with clipboard fallback
- Offline repeat-visit support through a lightweight service worker
- Nine project cards spanning health, fintech, education ERP, custom websites, ecommerce, integrations, game applications, and two Java/Spring Boot systems
- Branded large-format social preview for LinkedIn, WhatsApp, and other link unfurls
- Automated validation for project data, unique slugs, required assets, icon coverage, and Playwright test compilation
- Playwright desktop and mobile smoke tests for layout, filters, keyboard navigation, and contact validation

## Technology

- React 19
- Tailwind CSS 4 with the first-party Vite plugin
- Vite 6
- Modern JavaScript and JSX
- CSS custom properties, Grid, Flexbox, and media queries
- Self-hosted Bootstrap Icons bundled by Vite
- Generated inline SVG icon masks containing only selectors used by the portfolio, with no icon-font request

## Project structure

```text
Legion/
├── public/                       # Static assets and service worker
├── scripts/                      # Content validation and icon generation
├── src/
│   ├── components/
│   │   ├── feedback/              # Error recovery UI
│   │   ├── forms/                 # Contact form
│   │   ├── layout/                # Header, footer, and scroll controls
│   │   ├── overlays/              # Command palette
│   │   ├── projects/               # Project cards, filters, and grid
│   │   └── shared/                # UI primitives, sharing, and technology rail
│   ├── config/
│   │   ├── navigation.js          # Section navigation and observed IDs
│   │   └── projectFilters.js      # Project category filter options
│   ├── data/
│   │   ├── portfolio/             # Journey, integrations, skills, projects, and proof data
│   │   └── portfolio.js           # Stable exports for portfolio datasets
│   ├── hooks/                     # Reusable state and browser hooks
│   ├── sections/                  # Page section components
│   ├── styles/
│   │   ├── sections/              # Styles scoped to page sections
│   │   ├── base.css               # Shared responsive layout styles
│   │   ├── icons.css              # Generated, tree-shaken icon masks
│   │   ├── index.css              # Global layout and component styles
│   │   └── tokens.css             # Design tokens
│   ├── App.jsx                    # Page composition and lazy-loaded sections
│   ├── main.jsx                   # React application entry point
├── index.html                     # Vite host document and metadata
├── vite.config.js                 # React plugin and production build settings
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

When adding or removing an icon, regenerate the optimized SVG-mask stylesheet:

```bash
npm run icons:generate
```

The optimized site is generated in `dist/`. Production source maps are disabled to keep deployment output smaller and avoid publishing application source unnecessarily.

## Editing portfolio content

Portfolio content is grouped by domain in `src/data/portfolio/` and re-exported from `src/data/portfolio.js`:

- `journey` controls experience timeline entries.
- `integrations` controls integration cards.
- `skills` controls technology cards.
- `projects` controls project cards, filters, and icons.
- `proof` controls animated achievement metrics.

Section copy and markup live in `src/sections/`; their styles live in `src/styles/sections/`. Reusable interface elements live under `src/components/`, grouped by purpose. Project category labels and filter keys are defined in `src/config/projectFilters.js`.

Every project has a `filters` array. Its values must match the category filters rendered by `ProjectsSection` (`java`, `health`, `fintech`, `education`, `websites`, `ecommerce`, `integrations`, or `gaming`).

## Component design

- `useInView` provides a reusable Intersection Observer hook.
- `Reveal` applies one-time entrance animation as content enters the viewport.
- `Spotlight` calculates pointer position and updates CSS variables for interactive lighting.
- `Counter` animates metrics using `requestAnimationFrame` and an ease-out curve.
- `Header` owns mobile-menu state and keyboard behavior.
- `ProjectsSection` composes dedicated filter, grid, and card components.
- `usePageState` composes `useScrollState` and `useActiveSection` so scroll effects and section observation stay independent.
- `useReducedMotion` reacts to operating-system preference changes and is shared by motion-heavy components.
- `AppErrorBoundary` provides a resilient recovery screen if an unexpected render error reaches the application root.

Reveal and counter components share pooled Intersection Observers. Reduced-motion consumers share one media-query listener, while scroll progress is written through a CSS custom property so scrolling does not re-render the application tree.

The command palette and page sections are lazy-loaded with `React.lazy` and `Suspense`. Shared UI primitives are in `src/components/shared/`; project-specific UI is in `src/components/projects/`.

## Styling

Design tokens live in `src/styles/tokens.css`, global presentation rules in `src/styles/index.css`, and foundational responsive rules in `src/styles/base.css`. Section-specific styles live in `src/styles/sections/`, separate from the JSX. Tailwind CSS 4 is available for small JSX utilities; use the shared CSS variables for colors, typography, borders, and surfaces so the design remains consistent.

Users who request reduced motion receive immediate text and metrics without animated transitions.

## Deployment

Deploy the generated `dist/` directory to any static host, including Netlify, Vercel, Cloudflare Pages, or GitHub Pages. Configure the build command as `npm run build` and the output directory as `dist`.

### Netlify

The included `netlify.toml` configures Netlify to run `npm run build` and publish only `dist/`. Do not set the publish directory to the repository root: the source `index.html` references JSX that must be transformed by Vite.

The contact form sends mail through the `netlify/functions/contact.mjs` serverless function and Resend. Configure these environment variables in Netlify before deploying:

- `RESEND_API_KEY`: a Resend API key with permission to send email
- `CONTACT_FROM_EMAIL`: a sender on a domain verified in Resend (for example, `Portfolio <contact@example.com>`)
- `CONTACT_TO_EMAIL`: the inbox that receives enquiries (defaults to `sumanks1307@gmail.com`)

The visitor's address is assigned as the reply-to address, so replying from the receiving inbox responds directly to them. API credentials remain server-side.
The `/api/contact` route is rate-limited by Netlify to five requests per IP per minute; deploy logs should confirm the rule was accepted.

If the Netlify dashboard contains older manual build settings, use:

- Build command: `npm run build`
- Publish directory: `dist`
- Node version: `22`
