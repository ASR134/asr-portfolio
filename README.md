# ASR Portfolio

A terminal-inspired dark developer portfolio built with Next.js 16, Tailwind CSS 4, and shadcn/ui.

## Sections

- **Hero** -- Animated boot sequence, name, role, CTAs
- **Projects** -- 3-column card grid with accent-colored headers
- **Tech Stack** -- Categorized skill badges with Simple Icons
- **LeetCode** -- Static stats dashboard with live heatmap image fallback
- **Contact** -- Interactive command cards linking to socials

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customization

All personal data lives in `data/portfolio.ts` -- update your name, projects, skills, LeetCode username, and social links there.

## Tech

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4, shadcn/ui
- **Icons:** Simple Icons CDN, Lucide React
- **Deployment:** Vercel

## License

MIT

```
asr-portfolio
├─ app
│  ├─ globals.css
│  ├─ layout.tsx
│  ├─ opengraph-image.tsx
│  └─ page.tsx
├─ components
│  ├─ sections
│  │  ├─ contact-section.tsx
│  │  ├─ hero-section.tsx
│  │  ├─ leetcode-section.tsx
│  │  ├─ nav-header.tsx
│  │  ├─ project-card.tsx
│  │  ├─ projects-section.tsx
│  │  ├─ section-divider.tsx
│  │  └─ skills-section.tsx
│  ├─ theme-provider.tsx
│  └─ ui
│     ├─ accordion.tsx
│     ├─ alert-dialog.tsx
│     ├─ alert.tsx
│     ├─ aspect-ratio.tsx
│     ├─ avatar.tsx
│     ├─ badge.tsx
│     ├─ breadcrumb.tsx
│     ├─ button-group.tsx
│     ├─ button.tsx
│     ├─ calendar.tsx
│     ├─ card.tsx
│     ├─ carousel.tsx
│     ├─ chart.tsx
│     ├─ checkbox.tsx
│     ├─ collapsible.tsx
│     ├─ command.tsx
│     ├─ context-menu.tsx
│     ├─ dialog.tsx
│     ├─ drawer.tsx
│     ├─ dropdown-menu.tsx
│     ├─ empty.tsx
│     ├─ field.tsx
│     ├─ form.tsx
│     ├─ hover-card.tsx
│     ├─ input-group.tsx
│     ├─ input-otp.tsx
│     ├─ input.tsx
│     ├─ item.tsx
│     ├─ kbd.tsx
│     ├─ label.tsx
│     ├─ menubar.tsx
│     ├─ navigation-menu.tsx
│     ├─ pagination.tsx
│     ├─ popover.tsx
│     ├─ progress.tsx
│     ├─ radio-group.tsx
│     ├─ resizable.tsx
│     ├─ scroll-area.tsx
│     ├─ select.tsx
│     ├─ separator.tsx
│     ├─ sheet.tsx
│     ├─ sidebar.tsx
│     ├─ skeleton.tsx
│     ├─ slider.tsx
│     ├─ sonner.tsx
│     ├─ spinner.tsx
│     ├─ switch.tsx
│     ├─ table.tsx
│     ├─ tabs.tsx
│     ├─ textarea.tsx
│     ├─ toast.tsx
│     ├─ toaster.tsx
│     ├─ toggle-group.tsx
│     ├─ toggle.tsx
│     ├─ tooltip.tsx
│     ├─ use-mobile.tsx
│     └─ use-toast.ts
├─ components.json
├─ data
│  └─ portfolio.ts
├─ hooks
│  ├─ use-mobile.ts
│  └─ use-toast.ts
├─ lib
│  └─ utils.ts
├─ next-env.d.ts
├─ next.config.mjs
├─ package.json
├─ pnpm-lock.yaml
├─ postcss.config.mjs
├─ public
│  ├─ apple-icon.png
│  ├─ icon-dark-32x32.png
│  ├─ icon-light-32x32.png
│  ├─ icon.svg
│  ├─ leetcode-heatmap-fallback.png
│  ├─ leetcode-heatmap-fallback1.png
│  ├─ placeholder-logo.png
│  ├─ placeholder-logo.svg
│  ├─ placeholder-user.jpg
│  ├─ placeholder.jpg
│  ├─ placeholder.svg
│  └─ profile_pic.png
├─ README.md
├─ styles
│  └─ globals.css
└─ tsconfig.json

```