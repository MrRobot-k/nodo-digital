# Landing Page - Xolventa

## Project Overview
- **Framework**: Astro 6.4.6 + React 19 (islands)
- **Styling**: Tailwind CSS 4.3 + shadcn/ui components
- **Fonts**: Geist (via @fontsource-variable/geist)
- **Deployment**: Vercel (analytics + speed insights)
- **Node**: >=22.12.0

## Commands
```bash
pnpm dev      # Development server
pnpm build    # Production build
pnpm preview  # Preview production build
```

## Structure
```
src/
├── components/
│   ├── Hero.astro / HeroSection.tsx      # Hero section (React island)
│   ├── Services.astro                    # Services section
│   ├── About.astro                       # About section
│   ├── ContactForm.tsx                   # Contact form (React island)
│   ├── Footer.astro                      # Footer
│   └── ui/                               # shadcn/ui components (button, input, label, textarea, card)
├── layouts/Layout.astro                  # Main layout
├── pages/index.astro                     # Home page
├── styles/global.css                     # Global styles + Tailwind
└── lib/utils.ts                          # Utility functions (cn, etc.)
```

## Key Decisions (memories in .mind/)
- **Astro + React islands**: Interactive components (Hero, ContactForm) use React; static sections use Astro
- **Tailwind 4 + Vite plugin**: Modern Tailwind with @tailwindcss/vite
- **shadcn/ui**: Component library for consistent UI
- **Geist font**: Variable font for performance
- **Vercel analytics**: Built-in analytics + speed insights

## Current State
- Project initialized with Astro + React + Tailwind + shadcn/ui
- Basic landing page structure exists (Hero, Services, About, Contact, Footer)
- Build output in `dist/`

## Memory System
Local mind system in `.mind/`:
- `space.json` - Project metadata
- `memories/` - Individual memories (JSON)
- `checkpoints/` - Session checkpoints
- `links.json` - Memory relationships

Use `memory_add`, `checkpoint_save`, `checkpoint_load` patterns manually via file operations.