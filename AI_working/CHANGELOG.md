# AI work log

Newest first. One entry per task: what changed, which files, and anything the owner still needs to decide.
Format: `## YYYY-MM-DD: short title`, then bullets.

---

## 2026-11-20: More prominent pricing
- `features/pricing/PricingCards.tsx`: the price now sits in its own panel with a soft gradient, shadow and glow. Regular price is larger with a thick red strike-through and a "Regular" label; "SAVE X%" is a solid green badge (dark-green text on dark surfaces for contrast); the offer price is bigger (up to 7xl) with gradient text (light cards) or a pink glow (Gold card); new "You save $X every month" line. Screen readers hear "Regular price" / "Offer price".

## 2026-11-20: About stats with counters + SEO for Search Console queries
- `StatsStrip` (`components/sections/Blocks.tsx`) redesigned: icon, number counting up (`CountUp`), label and a short detail line per stat (`detail` added to `site.stats` in `content/site.ts`). Used on /about (new "By the numbers" heading) and location pages.
- `content/seo.ts`: new `serviceSeo` map with keyword-targeted titles and descriptions for 10 service pages, based on the Search Console queries of the old selectionstechnologies.com site (bespoke CRM development UK, Shopify developers UK, custom WordPress UK, WhatsApp/AI chatbot development, chatbot automation, PPC, digital marketing for startups). Global `keywords` extended.
- Open: the old site ranked for Croydon searches (SEO/Google Ads/IT company Croydon). Add a UK office address only if the company really has one there; a UK location page could then target Croydon. Blog ideas from the queries: digital marketing for startups in Pakistan, off-page SEO / guest posting (draft exists), marketing growth OKRs.

## 2026-11-20: Responsive hero code terminal
- The terminal had a fixed 14-line height and was clipped at the top on laptops and short screens. `globals.css` (Pinned expanding hero): `.pinned-hero__terminal` is now a size container; the code font scales with the card width (`clamp(9px, (100cqi - 2.5rem)/29, 12.5px)`), the welcome text too (`/15`), and the screen height is capped by `--term-max` so it always fits inside the card.
- Hero mobile layout (terminal on top, text below) now applies below **1024px** instead of 820px (`PinnedHero.tsx` uses `lg:`), so tablets get a full-width terminal. Phones under 860px tall show 5 lines; under 700px tall the terminal is hidden.
- "Pakistan · United Kingdom" badge hidden below 1024px (it overlapped the terminal on phones).
- `Header.tsx`: nav item padding `px-2.5 xl:px-3.5`, so "Book a Demo" is no longer cut off at 1024px.
- Checked at 1920×900, 1366×650, 1280×720, 1024×600, 820×1100, 412×915, 390×750 and 360×640.

## 2026-11-20: Favicon for Google search results
- Google showed a grey globe instead of the logo: `/favicon.ico` returned 404 and `icon.png` was 512x512 (Google needs a square multiple of 48px).
- Added `src/app/favicon.ico` (16/32/48 PNG entries) and resized `src/app/icon.png` to 192x192. Next.js now outputs both `<link rel="icon">` tags.
- Owner: after deploy, request indexing of the home page in Search Console. Google can take days to a few weeks to refresh the favicon.

## 2026-11-20: Ali Raza LinkedIn + YouTube
- `team.ts`: Ali Raza's LinkedIn added, plus the company YouTube channel (`site.socials.youtube`). `TeamMember.socials` now supports `youtube` (`types/content.ts`, red style in `MemberSocials.tsx`).

## 2026-11-20: Team social links
- `src/content/team.ts`: Facebook/Instagram/LinkedIn for Muhammad Ahsan Khan, Babar Ali and Ehtisham (Instagram = company account, `site.socials.instagram`); Facebook + Instagram for Ali Raza. Shown on /team cards and profile pages (11 icons).
- Open: Ali Raza's LinkedIn URL; confirm Ehtisham's Facebook link (missing numeric ID).

## 2026-11-20: Team profile pages
- `/team` cards now show only photo, name, title, social links and "View profile" (`src/features/team/TeamGrid.tsx`, links in `MemberSocials.tsx`).
- New profile pages `/team/[slug]` (`src/app/team/[slug]/page.tsx`, `src/features/team/MemberProfile.tsx`): about, background (role, expertise, education, experience), "Book a meeting" and "Send an email" (subject with the member's name), rest of the team, ProfilePage/Person JSON-LD. SEO entries generated in `content/seo.ts`; `lib/seo.ts` accepts `type: "profile"`.
- Open: owner to provide each member's LinkedIn/Facebook/Instagram URLs; blog author cards could link to these profiles.

## 2026-11-20: Projects stats counter + email links with subject
- `/projects`: stats are now company totals from `projectStats` in `src/content/projects.ts` (100+ projects delivered, 50+ business websites, 30+ software & AI systems, 20+ industries), shown as cards that count up from 0 (`src/components/ui/CountUp.tsx`). "Live projects" was renamed "Projects delivered" because the gallery lists 19 live projects.
- New `emailLink()` + `emailBodies` in `src/content/site.ts`: every email link (header, footer, home, contact, legal pages, Company Registration, jobs, chatbot) opens the visitor's mail app with our address, a context-specific subject and a short template (name, company, phone, details).
- Verified: counter goes 0 → 100 in about 1.6 s; decoded mailto links show the right subject and full body.

## 2026-11-20: Gmail address + LinkedIn
- `src/content/site.ts`: email → `nextvisiontechnologies.pvt.ltd@gmail.com` (temporary, until the business email is ready); LinkedIn → https://www.linkedin.com/company/next-vision-technologies-pvt-ltd/ (icon now shows in the header top bar and footer; also added to the mobile menu).
- `src/content/legal.ts` now reads the contact email from `site.email` instead of a hard-coded address. `.env.example` and the API route comment updated.
- `Header.tsx` top bar: no wrapping; the UK WhatsApp number hides below 1024 px to keep one line with the longer email.
- Open: if `CONTACT_TO` is set in Vercel, update it; switch to the business email later (one line in `site.ts`).

## 2026-11-20: Google Business Profile map in the footer
- `src/components/layout/Footer.tsx`: new full-width "Find us on Google" band with the registered address, "View on Google" (share link) and "Get directions" buttons, and a lazy-loaded Google Maps iframe (no API key).
- `src/content/site.ts`: `google` block (profile share link https://share.google/EVQmjR9jFzx2MvSQc, listing name, kgmid `/g/11_1lpfmmp`, directions query). `SiteJsonLd.tsx`: profile added to `sameAs` + `hasMap`.
- Owner first sent a link to the "NEXTECH VISION (PRIVATE) LIMITED" listing, then the correct "Next Vision Technologies Pvt. Ltd." one. The map uses `kgmid` so only the correct listing is pinned.
- Open (owner, in Google Business Profile): listing shows "Own this business?" (claim/verify it), no website, no reviews, and the address reads "A, Next Vision Technologies, 28 Davis Road, A". The Google Maps iframe sets Google cookies (consent banner still open).

## 2026-11-20: PageSpeed improvements
- Header logo now requests a 256/640 px image instead of 1920 px (`width={211} height={44}` in `Header.tsx`): about 2-7 KB instead of 48 KB.
- `next.config.ts`: security headers on every response (HSTS, X-Frame-Options SAMEORIGIN, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) and `poweredByHeader: false`.
- Tested and rejected `experimental.inlineCss` (HTML 58 KB → 110 KB gzipped). Reason kept as a comment in `next.config.ts`.
- Not changed (explained to owner): GTM unused JS (77 KB, third party), Next's polyfills, Speed Index from the hero animation, COOP/CSP.
- Open: owner may choose to delay GTM until first interaction; a CSP with GTM nonces.

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
