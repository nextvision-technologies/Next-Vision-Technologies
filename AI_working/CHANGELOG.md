# AI work log

Newest first. One entry per task: what changed, which files, and anything the owner still needs to decide.
Format: `## YYYY-MM-DD: short title`, then bullets.

---

## 2026-11-19: Project architecture cleanup and AI docs
- Split `src/content/misc.ts` into `pricing.ts`, `jobs.ts`, `courses.ts`, `team.ts`, `testimonials.ts`, `locations.ts` (content copied verbatim) and updated all imports.
- Moved shared code out of features so no feature imports another feature:
  `features/blog/ArticleBlocks.tsx` + `ArticleChrome.tsx` → `components/article/`, `features/services/ServiceCard.tsx` → `components/cards/`.
- Removed unused `features/home/HeroVisual.tsx`.
- Moved `docs/*.html` design previews → `AI_working/design-previews/`.
- Added `.vscode/settings.json` hiding `node_modules`, `.next` and generated files (they cannot be moved: Node and Next require them in the root).
- Added `AI_working/PROJECT_OVERVIEW.md`, this changelog, and `CLAUDE.md`.

## 2026-11-19: Hacker terminal in the hero + logo master file
- Rewrote `features/home/CodeTerminal.tsx`: SSH-style boot, decrypt progress bar, typed "Welcome to Next Vision Technologies", matrix rain, CRT scanlines, loop. CSS in `globals.css` (`nv-terminal--hack`, `nv-scanlines`, `nv-hack-welcome`, `nv-hack-grad`).
- Moved the root `logo.webp` to `Logo/00-Final/webp/horizontal-tagline-full.webp`.

## 2026-11-19: Home link, dev error fixes
- Added a **Home** link to the desktop navbar (`components/layout/Header.tsx`).
- Fixed "encountered URL data during prerendering": blog, services and jobs `[slug]` pages read `params` inside `<Suspense>` with `components/sections/PageSkeleton.tsx`.
- Hydration mismatch on the Home link was a stale dev cache: deleted `.next/dev`; restart the dev server after such changes.

## 2026-11-19: Blog upgrades
- HR blog `hr-automation-software` (focus keyword "HR automation software") with an AI CV screening pipeline section, tables, FAQs.
- Writer/reviewer system: `content/people.ts`, `Post.author`/`reviewer`, byline + author cards + Person JSON-LD (`reviewedBy`).
- SEO fields on posts: `focusKeyword`, `seoTitle`, `metaDescription`, `cover`, `coverAlt`.
- New HD covers from Unsplash/Pexels saved under new file names (cache busting).
- Blog index grid: 3 columns on desktop.

## 2026-11-19: Projects Gallery, font and header logo
- `/portfolio` → `/projects` (308 redirect) with 19 real projects and live screenshots (`content/projects.ts`, `features/projects/ProjectsGallery.tsx`). Software credentials are never shown.
- Font changed from Cormorant Garamond to Plus Jakarta Sans (approved via `AI_working/design-previews/font-options.html`).
- Header logo: transparent light/dark WebP versions of the new logo in `public/brand/`.
