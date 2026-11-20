# AI work log

Newest first. One entry per task: what changed, which files, and anything the owner still needs to decide.
Format: `## YYYY-MM-DD: short title`, then bullets.

---

## 2026-11-20: Menu closes on click + page loading bar
- `src/components/layout/Header.tsx`: the mega menu panel and the mobile drawer now close the moment a link inside them is clicked (before, they stayed open until the next page finished loading because the pointer was still over the panel).
- New `src/components/layout/NavigationProgress.tsx` (rendered in `src/app/layout.tsx`): thin logo-gradient bar at the top of the window during page loads.
- Verified in a headless browser: menu closed 30 ms after clicking a service link; bar completed and reset after the new page rendered.

## 2026-11-20: Document popup fits the screen
- `src/features/legal/DocumentGallery.tsx`: the popup now shows the whole document at once (no scrolling) on desktop and mobile: image uses `fill` + `object-contain`, popup height 94dvh and width derived from the A4 ratio. Subtitle wraps to two lines instead of being cut off.

## 2026-11-20: Company Registration page tweaks
- Removed the Download links; "View document" (and clicking a thumbnail) now opens the document in a popup on the same page: `src/features/legal/DocumentGallery.tsx` (native `<dialog>`, Esc/backdrop closes, Previous/Next + arrow keys).
- Removed the "Date of incorporation" card; "Registered office" now spans two columns.
- Official documents section moved directly below Registration details.
- Note: the incorporation date still appears inside the documents, on each document card and in the SECP record table.

## 2026-11-20: Company Registration page
- New page `/company-registration` (`src/app/(legal)/company-registration/page.tsx`, `src/features/legal/CompanyRegistrationView.tsx`, data in `src/content/company.ts`).
- Shows SECP incorporation (CUIN 0366776) and FBR registration (K680541) details, steps to verify, SECP online record, the three official documents (view full size / download), what registration means for clients, a fraud notice and FAQs.
- Renamed the owner's documents in `public/company-docs/` to URL-safe names (`secp-certificate-of-incorporation.webp`, `secp-acknowledgement-of-filing.webp`, `fbr-taxpayer-registration-certificate.webp`).
- Added the page to the Legal mega menu (first item, `badgecheck` icon in `MegaMenu.tsx`), the footer support links and `content/seo.ts`.
- `site.ts`: Pakistan office address set to the registered office. `SiteJsonLd.tsx`: `legalName`, `taxID`, SECP identifier and street address.
- The SECP record's Applicant ID (a CNIC) is intentionally not shown.
- Open: owner said "principle page"; implemented as "Company Registration". Rename if a different title was meant. The "5+ years" stat vs. 2026 incorporation.

## 2026-11-19: Google Tag Manager
- Installed `@next/third-parties@16.4.6` (exact, matches Next 16.4.6) and added `<GoogleTagManager gtmId={site.gtmId} />` plus the `<noscript>` iframe to `src/app/layout.tsx`.
- Container ID `GTM-PM9BTDMZ` stored in `src/content/site.ts` (`gtmId`).
- Used the official component instead of the pasted snippet, which was missing GTM's `gtm.start` event.
- Open: cookie consent banner for UK/EU visitors.

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
