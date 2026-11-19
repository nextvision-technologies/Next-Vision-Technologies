# Next Vision Technologies website: project overview for AI assistants

> **Read this first.** It explains what every file does, where new code belongs and the traps that have already cost time.
> Keep it accurate: after every task, update the sections your change affects and add an entry to [CHANGELOG.md](CHANGELOG.md).
> Last updated: 2026-11-19

---

## 1. What this project is

The marketing website of **Next Vision Technologies (Pvt.) Ltd.**, a software house in Lahore (Pakistan) with a UK presence.
It sells AI automation, AI chatbots, SaaS/custom software, websites, e-commerce and digital marketing (SEO, Meta/Google ads).

- Live domain: `https://www.nextvision-technologies.com` (set in `src/content/site.ts`)
- Audience: business owners in Pakistan and the UK. English site; the chatbot also replies in Roman Urdu.
- The site owner usually writes instructions in Roman Urdu/English. Reply in the same style.

## 2. Tech stack

| Area | Choice |
|---|---|
| Framework | **Next.js 16.4** (App Router, Turbopack, **Cache Components**, Partial Prefetching) |
| UI | React 19, TypeScript (strict), Tailwind CSS 4 (`@theme` tokens in `globals.css`) |
| Font | **Plus Jakarta Sans** via `next/font/google` (`--font-jakarta`) for headings and body |
| Icons | `lucide-react`; brand logos from `simple-icons` |
| Smooth scroll | `lenis` (desktop only) |
| Email | Resend REST API from `src/app/api/contact/route.ts` (env vars below) |
| Images | WebP in `/public`, served through `next/image` |
| Analytics | **Google Tag Manager** `GTM-PM9BTDMZ` via `@next/third-parties/google` (`GoogleTagManager` in `layout.tsx`, ID in `site.ts`). Add GA4, Meta Pixel etc. inside GTM, not in code |

Commands: `npm run dev` (localhost:3000) · `npm run build` · `npm run start` · `npm run lint`.

Environment variables (`.env.example` → `.env.local`, and in Vercel): `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM`.

## 3. Folder architecture and rules

```
/
├── AI_working/            Docs for AI assistants (this file, changelog, design previews)
│   └── design-previews/   Standalone HTML mock-ups shown to the owner for approval
├── Logo/00-Final/webp/    Master brand logo (source file, not served)
├── public/                Static files served at the site root
│   ├── brand/             Logos used by the site (header, OG image, app icons)
│   ├── blog/              Blog cover images (16:9, 3840x2160 WebP)
│   ├── projects/          Projects Gallery screenshots (1440x900 WebP)
│   └── team/              Team photos
├── src/
│   ├── app/               ROUTES ONLY: pages, layouts, metadata, sitemap, robots, API
│   ├── components/        Shared building blocks used by several pages or features
│   │   ├── article/       Long-form text rendering (blog posts + legal pages)
│   │   ├── cards/         Cards reused across areas (ServiceCard)
│   │   ├── layout/        Header, Footer, MegaMenu, theme, smooth scroll, WhatsApp button
│   │   ├── sections/      Page-level sections (PageHero, CtaBand, Faq, PageSkeleton...)
│   │   ├── seo/           JSON-LD structured data
│   │   └── ui/            Small primitives (Button, SectionHeading, icons, RichText)
│   ├── features/          Code that belongs to ONE area of the site
│   ├── content/           ALL website text and data. Edit these to change the site
│   ├── hooks/             Reusable React hooks
│   ├── lib/               Plain helper functions (no React)
│   └── types/             TypeScript types for the content data
├── CLAUDE.md              Working rules for AI assistants
├── AGENTS.md              Next.js agent rules (auto-written by `next dev`, do not edit)
└── README.md              Human-facing setup guide
```

**Where does new code go?**
- Used by one area only → `src/features/<area>/`
- Used by two or more areas/pages → `src/components/<group>/`
- **A feature never imports from another feature.** If two features need it, move it to `components/`.
- No React, just a function → `src/lib/`
- Text, lists, prices, people, SEO copy → `src/content/` (one file per topic)
- A data shape → `src/types/content.ts`
- `node_modules/` and `.next/` must stay in the project root (Node/Next require it). They are hidden in VS Code via `.vscode/settings.json`.

## 4. File-by-file map

### 4.1 Routes: `src/app/`
| File | Purpose |
|---|---|
| `layout.tsx` | Root layout: Plus Jakarta Sans font, global metadata (incl. Google Search Console verification), theme-init script, Google Tag Manager (+ `<noscript>` iframe), Header, Footer, WhatsApp button, ChatBot, SmoothScroll, site JSON-LD |
| `globals.css` | Tailwind 4 `@theme` design tokens (colours, fonts, radius, shadows), dark mode overrides, utilities (`text-gradient`, `bg-logo-gradient`, `section-dark`), pinned-hero and hacker-terminal CSS, `prose-nv` article styles |
| `page.tsx` | Home: pinned hero, stats, services tabs, why-us bento, process, pricing, reviews (hidden until real), quote form, FAQ |
| `about/page.tsx` | About page |
| `services/page.tsx` | All services grouped by category |
| `services/[slug]/page.tsx` | One service (16 slugs). Reads `params` inside `<Suspense>` |
| `projects/page.tsx` | **Projects Gallery** (was `/portfolio`, 308 redirect in `next.config.ts`). Stats strip + `ProjectsGallery` + CollectionPage/ItemList JSON-LD |
| `blog/page.tsx` | Blog index: latest post as a wide card, then a 1/2/3-column grid |
| `blog/[slug]/page.tsx` | Blog post: hero with writer + reviewer, cover image, takeaways, body blocks, service CTA, FAQ, author/reviewer cards, BlogPosting + FAQPage JSON-LD. Reads `params` inside `<Suspense>` |
| `pricing/page.tsx` | Growth packages |
| `team/page.tsx` | Leadership team |
| `courses/page.tsx` | Training courses |
| `jobs/page.tsx`, `jobs/[slug]/page.tsx` | Careers list and job detail (`[slug]` reads `params` inside `<Suspense>`) |
| `contact/page.tsx`, `book-demo/page.tsx` | Contact form and demo booking |
| `(legal)/*/page.tsx` | Terms, privacy, refund, GDPR, security, cookies (all render `LegalView`) |
| `(locations)/*/page.tsx` | Local SEO pages: software-house-lahore, web-development-company-uk |
| `site-map/page.tsx` | Human-readable sitemap built from `content/seo.ts` |
| `sitemap.ts`, `robots.ts`, `manifest.ts` | sitemap.xml, robots.txt, web manifest |
| `opengraph-image.tsx` | Default social share image |
| `not-found.tsx` | 404 page |
| `api/contact/route.ts` | Receives contact, demo and chatbot lead submissions and emails them via Resend |
| `icon.png`, `apple-icon.png` | Favicons |

### 4.2 Shared components: `src/components/`
| File | Purpose |
|---|---|
| `layout/Header.tsx` | Top bar (email, phones, socials) + sticky nav: **Home** link, mega-menu groups, theme toggle, Book a Demo, mobile drawer. Logo: `/brand/logo-header.webp` (light) and `logo-header-white.webp` (dark) |
| `layout/MegaMenu.tsx` | Dropdown panel content + promo illustrations |
| `layout/Footer.tsx` | Footer (still uses `/brand/logo-tagline-white.svg`) |
| `layout/ThemeToggle.tsx` | Light/dark toggle + `themeInitScript` (runs before paint) |
| `layout/SmoothScroll.tsx` | Lenis smooth scrolling for desktop |
| `layout/WhatsAppButton.tsx` | Floating WhatsApp button |
| `sections/PageHero.tsx` | Dark page header with breadcrumb (+ `PixelCluster` motif) |
| `sections/Blocks.tsx` | CtaBand, Faq, process steps, stats, testimonials |
| `sections/PageSkeleton.tsx` | Suspense fallback for `[slug]` pages |
| `article/ArticleBlocks.tsx` | Renders content `Block`s (h2, h3, p, ul, ol, tip, quote, table) for blog and legal pages |
| `article/ArticleChrome.tsx` | Reading progress bar, table of contents, share buttons |
| `cards/ServiceCard.tsx` | Service card with per-category tint (services pages + location pages) |
| `seo/SiteJsonLd.tsx` | Organization/WebSite JSON-LD + `BreadcrumbJsonLd` |
| `ui/Button.tsx` | `Button` + `buttonClass()` variants |
| `ui/RichText.tsx` | Renders `[text](href)` links and `**bold**` inside content strings |
| `ui/ScrollReveal.tsx` | Animates `data-reveal` elements on scroll |
| `ui/SectionHeading.tsx`, `ui/ServiceIcon.tsx`, `ui/SocialIcons.tsx` | Heading block, icon tiles, brand social icons |

### 4.3 Features: `src/features/`
| Folder | Files |
|---|---|
| `home/` | `PinnedHero` (scroll-driven hero), `CodeTerminal` (**hacker SSH terminal**: boot sequence, decrypt bar, typed "Welcome to Next Vision Technologies", matrix rain canvas, pauses off-screen), `HeroAnimation` (CSS backdrop), `Typewriter` (hero words), `ServiceTabs`, `TechMarquee` |
| `projects/` | `ProjectsGallery` (client): filter chips (All / Websites / Software & Portals / AI) and project cards with browser-frame screenshots |
| `blog/` | `PostCard` |
| `chat/` | `ChatBot` (launcher), `ChatPanel` (lazy chat window), `engine.ts` (rule-based matching; no AI API is called) |
| `contact/` | `ContactForm`, `DemoBooking` |
| `legal/` | `LegalView` |
| `locations/` | `LocationView` |
| `pricing/` | `PricingCards` |
| `team/` | `TeamGrid` |

### 4.4 Content: `src/content/` (one topic per file)
| File | Holds |
|---|---|
| `site.ts` | Company name, URL, GTM container ID (`gtmId`), email, phones, offices, socials, stats, `whatsappLink()` |
| `navigation.ts` | `mainNav` (mega menu groups) and `footerNav` |
| `services.ts` | 16 services, `getService()`, `serviceCategories` |
| `projects.ts` | 19 Projects Gallery entries (`type`: Website / Software / AI, `publicSite: false` hides the live link for login-only software) |
| `blog.ts` | Blog posts (published + drafts), `postImage()`, `postAuthor()`, `postReviewer()`, `draftSlugs` |
| `people.ts` | Blog writer/reviewers and `reviewerByCategory` |
| `seo.ts` | Title + meta description + sitemap settings for EVERY page. A page without an entry throws at build |
| `pricing.ts` | Silver/Gold/Platinum packages |
| `team.ts` | Leadership team (with specialty, education, experience, bio) |
| `jobs.ts` | Open roles + `getJob()` |
| `courses.ts` | Courses |
| `testimonials.ts` | Client reviews (placeholders, hidden until real) |
| `locations.ts` | Location landing page copy |
| `legal.ts` | Legal pages content + `legalUpdated` date |
| `chatbot.ts` | Chatbot intents and replies (EN + Roman Urdu) |

### 4.5 Other source
| File | Purpose |
|---|---|
| `types/content.ts` | All content types: Service, Block, **Post** (with `focusKeyword`, `seoTitle`, `metaDescription`, `cover`, `coverAlt`, `author`, `reviewer`), Person, LegalPage, NavGroup, Package, Job, TeamMember, chatbot types |
| `lib/seo.ts` | `pageMetadata(path)`: title, description, canonical, Open Graph, Twitter from `content/seo.ts` |
| `lib/format.ts` | `formatDate()`, `headingId()` |
| `lib/files.ts` | `publicFile()` (server only) |
| `hooks/useScroll.ts` | One shared rAF-throttled scroll listener |

### 4.6 Root config
| File | Purpose |
|---|---|
| `next.config.ts` | `cacheComponents`, `partialPrefetching`, redirects (`/portfolio` → `/projects` permanent; draft posts → `/blog` temporary), Turbopack CSS rule |
| `eslint.config.mjs`, `tsconfig.json` | Lint and TypeScript (`@/*` → `src/*`) |
| `.vscode/settings.json` | Hides `node_modules`, `.next` and generated files in the Explorer |

## 5. How to do common tasks

**Add a blog post** (`src/content/blog.ts`)
1. Add an object to `allPosts`: `slug` (contains the focus keyword), `title` (the H1, contains the keyword), `excerpt`, `category`, `date`, `readMinutes`, `service`, `focusKeyword`, `seoTitle` (≤ 60 chars), `metaDescription` (140-160 chars), `cover`, `coverAlt`, `takeaways`, `body`, `faqs`.
2. Writer defaults to Babar Ali. Reviewer comes from `reviewerByCategory` in `people.ts` (AI → Ehtisham Iftikhar, Web → Ali Raza, SEO/Marketing → Muhammad Ahsan Khan) unless `reviewer` is set.
3. Put the cover at `/public/blog/<name>.webp`, 3840x2160, licensed for commercial use (Unsplash/Pexels).
4. SEO entry, sitemap and JSON-LD are generated automatically.

**Add a project**: add to `projects.ts` and save a 1440x900 WebP screenshot at `/public/projects/<slug>.webp`. Never show logins or passwords; blur them in screenshots.

**Add a page**: create `src/app/<route>/page.tsx`, export `metadata = pageMetadata("/<route>")`, and add a matching entry to `staticPages` in `content/seo.ts` (the build fails without it). Add it to `navigation.ts` if it belongs in the menu.

## 6. Design system
- Colours (from the logo): deep indigo `#1F0A4D` / `#2A0E6B`, violet `#5B21B6`, magenta `#A21CAF`, logo gradient `#8B2BE2 → #F0437A → #FF9A3C`. All tokens live in `globals.css` `@theme`; dark mode via the `.dark` class.
- Use tokens (`text-heading`, `bg-card`, `border-line`, `text-brand-600`, `bg-primary`...) instead of raw hex in components.
- Font: Plus Jakarta Sans everywhere; headings use `letter-spacing: -0.02em`.
- Gradient is an accent only, never a background behind body text.
- Design changes are shown to the owner first as a standalone HTML file in `AI_working/design-previews/`, then implemented after approval.

## 7. Gotchas (learned the hard way)
1. **This is Next.js 16.4, not the version in your training data.** Read `node_modules/next/dist/docs/` before using an API (see `AGENTS.md`).
2. **Cache Components:** reading `params`/`searchParams` outside `<Suspense>` triggers the dev error "Next.js encountered URL data during prerendering". Pattern: a sync page renders `<Suspense fallback={<PageSkeleton />}><Content params={params} /></Suspense>`.
3. **Replacing an image?** Save it under a **new file name**. `next/image` caches optimised images by URL (about 4 hours), so overwriting a file keeps showing the old picture.
4. **Stale dev server:** after changing shared components (Header) or `next.config.ts`, a hydration mismatch ("server rendered `<button>`, client `<a>`") usually means the dev cache is stale: stop the server, delete `.next/dev`, restart.
5. Many source files use **CRLF** line endings. When editing with scripts, normalise to `\n`, edit, then restore `\r\n`.
6. React lint forbids calling `setState` directly inside `useEffect`; derive values during render instead.
7. `Math.random()`/`Date` in render cause hydration mismatches; only use them inside effects/timers.

## 8. Open items and owner decisions
- Team page still lists **"Ehtisham Malik, CTO"**; on blogs the same person is credited as **"Ehtisham Iftikhar, AI Engineer"** (owner's instruction). Confirm whether the team page should change too.
- HR blog states the CV screening pipeline supports Rozee.pk, Indeed, LinkedIn, WhatsApp, OCR and keeps personal details out of scoring. **Owner must confirm these claims are true.**
- `testimonials.ts` holds placeholders; `site.ts` has TODO street addresses and an empty LinkedIn URL.
- The rank-on-Google cover source is 2566 px wide (upscaled to 4K).
- Footer still uses the older SVG logo (`logo-tagline-white.svg`).
- Suggested: a dedicated "AI CV Screening" service page to rank for that keyword.
- GTM loads on every visit. For UK/EU visitors a cookie consent banner (GTM Consent Mode) is still needed before analytics/marketing tags fire.
