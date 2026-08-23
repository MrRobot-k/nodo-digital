# Landing Page - Nodo Digital | Project Structure Reference

> **Purpose**: This document provides a complete map of the codebase so AI agents can navigate and edit without wasting tokens on `ls`, `grep`, `find`, etc.

---

## Root Directory

```
landing-page/
├── .opencode/                    # OpenCode config & local MCP skills
│   ├── node_modules/             # OpenCode internal deps (ignore)
│   ├── package.json
│   └── package-lock.json
├── .vercel/                      # Vercel deployment config
│   ├── project.json
│   └── repo.json
├── .agents/                      # Agent skills (local)
│   └── skills/
├── node_modules/                 # Project dependencies (ignore)
├── dist/                         # Build output (ignore)
├── public/                       # Static assets (empty currently)
├── src/                          # MAIN SOURCE CODE
├── .env.local                    # Local environment variables
├── .gitignore
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── tsconfig.json
├── vercel.json
├── README.md
├── skills-lock.json
├── CLAUDE.md                     # Project instructions for AI
├── PROJECT_STRUCTURE.md          # THIS FILE
└── .playwright-cli/              # Playwright test artifacts
```

---

## Source Code (`src/`)

```
src/
├── components/
│   ├── ui/                       # shadcn/ui components (React)
│   │   ├── accordion.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   └── separator.tsx
│   ├── About.astro               # About section (Astro)
│   ├── Analytics.astro           # Vercel Analytics + Speed Insights
│   ├── ContactForm.tsx           # Contact form (React island)
│   ├── Enterprise.astro          # Enterprise section
│   ├── Faq.astro                 # FAQ section (Astro)
│   ├── FaqAccordion.tsx          # FAQ accordion (React island)
│   ├── Footer.astro              # Footer (Astro)
│   ├── HeroSection.tsx           # Hero section (React island)
│   ├── Impact.astro              # Impact/metrics section
│   └── Services.astro            # Services section (Astro)
├── layouts/
│   └── Layout.astro              # Main layout with SEO, fonts, meta
├── lib/
│   └── utils.ts                  # Utility functions (cn, etc.)
├── pages/
│   ├── 404.astro                 # 404 page
│   ├── index.astro               # Home page (main entry)
│   └── privacidad.astro          # Privacy policy page
└── styles/
    └── global.css                # Global styles + Tailwind v4 imports
```

---

## Key Files & Their Purpose

### Configuration
| File | Purpose |
|------|---------|
| `package.json` | Scripts: `dev`, `build`, `preview`; deps: Astro, React, Tailwind, shadcn/ui |
| `tsconfig.json` | TypeScript config with path aliases (`@/*` → `src/*`) |
| `vercel.json` | Vercel deployment config |
| `pnpm-lock.yaml` | Lockfile for pnpm |
| `astro.config.mjs` | **MISSING** - Astro config inline in `package.json` or not present |

### Layout & Pages
| File | Description |
|------|-------------|
| `src/layouts/Layout.astro` | Root layout: HTML shell, `<head>`, fonts (Geist), Vercel scripts, `<slot />` |
| `src/pages/index.astro` | Home page: composes Hero, Services, About, Enterprise, Impact, FAQ, Contact, Footer |
| `src/pages/404.astro` | 404 page with link back to home |
| `src/pages/privacidad.astro` | Privacy policy page |

### Components (Astro - Static)
| Component | Purpose |
|-----------|---------|
| `About.astro` | About section content |
| `Analytics.astro` | Injects Vercel Analytics + Speed Insights scripts |
| `Enterprise.astro` | Enterprise/pricing section |
| `Faq.astro` | FAQ section wrapper |
| `Footer.astro` | Footer with links, social, copyright |
| `Impact.astro` | Metrics/impact numbers section |
| `Services.astro` | Services grid/cards |

### Components (React Islands - Interactive)
| Component | Purpose |
|-----------|---------|
| `HeroSection.tsx` | Hero with animations, CTA, interactive elements |
| `ContactForm.tsx` | Form with validation, toast notifications |
| `FaqAccordion.tsx` | Expandable FAQ items (client-side state) |

### UI Primitives (shadcn/ui)
| Component | Description |
|-----------|-------------|
| `ui/accordion.tsx` | Accordion primitive (Radix + Tailwind) |
| `ui/badge.tsx` | Badge/tag component |
| `ui/button.tsx` | Button variants (default, outline, ghost, etc.) |
| `ui/separator.tsx` | Horizontal/vertical divider |

### Utilities
| File | Exports |
|------|---------|
| `src/lib/utils.ts` | `cn()` - clsx + tailwind-merge helper |

### Styles
| File | Purpose |
|------|---------|
| `src/styles/global.css` | `@import "tailwindcss"`, `@plugin "@tailwindcss/vite"`, CSS variables, base styles, Geist font |

---

## Import Aliases (from tsconfig.json)

```typescript
"@/*": ["src/*"]
"@/components/*": ["src/components/*"]
"@/components/ui/*": ["src/components/ui/*"]
"@/lib/*": ["src/lib/*"]
"@/layouts/*": ["src/layouts/*"]
"@/pages/*": ["src/pages/*"]
"@/styles/*": ["src/styles/*"]
```

---

## Component Dependency Graph

```
index.astro (page)
├── Layout.astro (layout)
│   ├── Analytics.astro
│   └── <slot />
├── HeroSection.tsx (React island: client:load)
├── Services.astro
├── About.astro
├── Enterprise.astro
├── Impact.astro
├── Faq.astro
│   └── FaqAccordion.tsx (React island)
├── ContactForm.tsx (React island: client:load)
└── Footer.astro
```

**React Islands** (use `client:load` or `client:visible`):
- `HeroSection.tsx`
- `ContactForm.tsx`
- `FaqAccordion.tsx`

---

## Styling Stack

- **Tailwind CSS v4** via `@tailwindcss/vite` plugin
- **shadcn/ui** components (Radix UI + Tailwind)
- **Geist Variable Font** via `@fontsource-variable/geist`
- **CSS Variables** for theming in `global.css`

---

## Scripts (package.json)

```bash
pnpm dev      # Start dev server (astro dev)
pnpm build    # Production build (astro build)
pnpm preview  # Preview build (astro preview)
```

---

## Deployment

- **Platform**: Vercel
- **Analytics**: `@vercel/analytics` + `@vercel/speed-insights`
- **Output**: Static (SSG) → `dist/`

---

## Common Patterns

### Adding a New Section
1. Create `src/components/NewSection.astro` (or `.tsx` if interactive)
2. Import in `src/pages/index.astro`
3. Add to page composition

### Adding a New shadcn/ui Component
```bash
pnpm dlx shadcn@latest add <component-name>
```
Files go to `src/components/ui/`

### Using the `cn` Utility
```typescript
import { cn } from '@/lib/utils'
className={cn('base-classes', conditional && 'conditional-classes')}
```

---

## What NOT to Touch

- `node_modules/` - dependencies
- `dist/` - build output
- `.opencode/node_modules/` - OpenCode internals
- `.vercel/` - Vercel config
- `pnpm-lock.yaml` - lockfile (managed by pnpm)

---

## Quick Reference: File Extensions

| Ext | Usage |
|-----|-------|
| `.astro` | Static components, pages, layouts (Astro) |
| `.tsx` | React components (islands) |
| `.ts` | Utilities, types |
| `.css` | Global styles |

---

*Generated for token-efficient AI navigation. Update when structure changes.*