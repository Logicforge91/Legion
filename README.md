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

## Technology

- React 19
- Tailwind CSS 4 with the first-party Vite plugin
- Vite 6
- Modern JavaScript and JSX
- CSS custom properties, Grid, Flexbox, and media queries
- Bootstrap Icons

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

The optimized site is generated in `dist/`. Source maps are enabled in `vite.config.js` to make production debugging easier.

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
- `AmbientCanvas` uses Tailwind arbitrary properties and theme animations for the grid and ambient lighting.
- `TechMarquee` renders the core stack as reusable Tailwind component utilities.

## Tailwind design system

The project uses Tailwind CSS 4 through `@tailwindcss/vite`. Custom colors, fonts, animations, and keyframes are declared with `@theme` in `src/styles.css`. Repeated compositions such as technology chips, ambient orbs, and the scroll-progress bar live in `@layer components`.

The prior semantic stylesheet is imported into Tailwind's component layer. This preserves the detailed responsive portfolio layout while allowing Tailwind utilities to override or extend it predictably. New interface work should prefer utility classes in JSX; extract a class into `@layer components` when the same composition is repeated.

Users who request reduced motion receive immediate text and metrics without animated transitions.

## Deployment

Deploy the generated `dist/` directory to any static host, including Netlify, Vercel, Cloudflare Pages, or GitHub Pages. Configure the build command as `npm run build` and the output directory as `dist`.
