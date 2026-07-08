# Landing Page Refactor — Nodo Digital

## Overview
Refactor the Nodo Digital landing page to match premium design quality (Ronas IT reference) with a numbered service narrative, real images, visual process timeline, FAQ, and dark/light mode — without requiring client testimonials or social proof stats.

## Sections

### 1. Global Design System (`global.css`)
- CSS custom properties for all colors → replace every hardcoded `#5ed29c`, `#070b0a`, etc.
- Light color scheme (`.light` class on `<html>`) with `color-scheme: light`
- Toggle `dark` class on `<html>` via a small JS toggle in the nav
- `:root` defaults to dark; `.light` overrides with lighter palette
- No changes to animation / scroll-reveal / grain classes

### 2. Hero Section (`HeroSection.tsx`)
- Keep the video background + ambient glow
- Replace hardcoded `#5ed29c` and `#070b0a` with CSS variables (`var(--color-accent)`, `var(--color-canvas)`)
- Replace hardcoded `#5ed29c` in hover shadows and MagneticButton with `var(--color-accent)`
- Add `<html>` dark/light toggle button in nav (small icon button)

### 3. Services (`Services.astro`)
- Change from bento grid to numbered narrative layout (01–04)
- Each service card displays:
  - Number badge (`01`, `02`, `03`, `04`) in mono font
  - Image from `public/images/` (right-aligned or as background)
  - Title, description, tags
  - Hover effects
- Layout: vertical stack with alternating image-left / image-right on desktop
- Replace `#5ed29c` and `#070b0a` with CSS variables
- Image mapping:
  - 01 Software → `software-dev.jpg`
  - 02 Web → `web-presence.jpg`
  - 03 IA → `ai-automation.jpg`
  - 04 Consultoría → `consulting.jpg`

### 4. Process Timeline (`About.astro`)
- Convert accordion to a vertical timeline
- Left: sticky intro (keep as-is, update colors to variables)
- Right: 4 steps in a visual timeline with:
  - Vertical line connecting dots
  - Numbered circles (`01`–`04`)
  - Step title + description
- Replace hardcoded colors with CSS variables
- Remove "stats" section (no client data)
- Keep "Garantía de calidad" blurb but repurpose

### 5. FAQ (new component `Faq.astro`)
- 4–6 common questions about software development for local businesses
- Simple accordion-style (use `<details>`)
- Questions:
  - ¿Cuánto cuesta desarrollar un sistema a la medida?
  - ¿Cuánto tiempo toma hacer una página web?
  - ¿Necesito conocimientos técnicos para trabajar contigo?
  - ¿Dan mantenimiento después de entregar el proyecto?
  - ¿Trabajas solo con negocios locales o también remoto?
  - ¿Qué tecnologías utilizan?
- Link from nav

### 6. Contact (`ContactForm.tsx`)
- Replace hardcoded accent colors with CSS variables
- Keep existing structure

### 7. Footer (`Footer.astro`)
- Replace hardcoded colors with CSS variables
- Keep existing structure

### 8. Nav (`Layout.astro`)
- Keep skip-to-content, analytics, speed insights
- Add link to FAQ in nav items

## Design Tokens (CSS Variables)

### Dark (default)
```
--color-canvas: #070b0a
--color-ink: #fafafa
--color-ink-2: #a1a1aa
--color-ink-3: #71717a
--color-accent: #5ed29c
--color-accent-h: #4cbf87
--color-accent-subtle: rgba(94, 210, 156, 0.08)
--color-border: rgba(255, 255, 255, 0.06)
--color-surface: rgba(255, 255, 255, 0.03)
--color-surface-hover: rgba(255, 255, 255, 0.05)
```

### Light (`.light` override)
```
--color-canvas: #f5f5f0
--color-ink: #0a0a0a
--color-ink-2: #525252
--color-ink-3: #737373
--color-accent: #059669
--color-accent-h: #047857
--color-accent-subtle: rgba(5, 150, 105, 0.08)
--color-border: rgba(0, 0, 0, 0.08)
--color-surface: rgba(0, 0, 0, 0.02)
--color-surface-hover: rgba(0, 0, 0, 0.04)
```

## File Changes
| File | Action |
|------|--------|
| `src/styles/global.css` | Add light mode vars, replace hardcoded `#5ed29c`/`#070b0a` with var() |
| `src/components/HeroSection.tsx` | Replace colors with vars, add theme toggle button |
| `src/components/Services.astro` | Rewrite to numbered narrative + images |
| `src/components/About.astro` | Rewrite accordion to timeline, remove stats |
| `src/components/Faq.astro` | **NEW** — FAQ accordion component |
| `src/components/ContactForm.tsx` | Replace colors with vars |
| `src/components/Footer.astro` | Replace colors with vars |
| `src/pages/index.astro` | Add Faq import + section |
| `src/layouts/Layout.astro` | Add FAQ link to nav items, light-mode JS |

## Non-goals
- No testimonials section
- No portfolio/case studies
- No stats/metrics
- No changes to animation system or scroll-reveals
- No changes to contact form logic
