# Next Vision Technologies website

Company website for Next Vision Technologies, a software house in Lahore and the UK offering AI automation, SaaS, websites and digital marketing.

Built with **Next.js 16** (App Router, Cache Components), **React 19**, **TypeScript** and **Tailwind CSS 4**. Every page is prerendered at build time.

## Getting started

Requires Node.js 20 or newer.

```bash
npm ci           # install exact versions from package-lock.json (faster than npm install)
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

Copy `.env.example` to `.env.local` and fill in the values before testing the contact form.

## Project structure

```
src/
├── app/                  Routes only: pages, layouts, metadata, sitemap, API
│   ├── (legal)/          Terms, privacy, refund, GDPR, security, cookies
│   ├── (locations)/      Local SEO landing pages
│   ├── api/contact/      Contact, quote and demo form handler
│   └── globals.css       Design tokens (colours, fonts) and global styles
│
├── components/           Shared building blocks used across many pages
│   ├── layout/           Header, Footer, MegaMenu, ThemeToggle, SmoothScroll, WhatsAppButton
│   ├── sections/         Page-level sections: PageHero, CtaBand, Faq, StatsStrip, Testimonials
│   └── ui/               Small primitives: Button, SectionHeading, icons, RichText, ScrollReveal
│
├── features/             Code that belongs to one area of the site
│   ├── home/             Pinned hero, hero animation, service tabs, tech marquee
│   ├── chat/             Chat launcher, lazily loaded chat panel, reply engine
│   ├── blog/             Post card, article blocks, reading progress, table of contents
│   ├── services/         Service card and category themes
│   ├── pricing/          Pricing cards
│   ├── contact/          Contact form, demo booking
│   ├── legal/            Legal page layout
│   ├── locations/        Location page layout
│   └── team/             Team grid
│
├── content/              All website text and data (edit these to change the site)
├── hooks/                Reusable React hooks (shared scroll listener)
├── lib/                  Plain helper functions (date formatting, heading ids, file checks)
└── types/                TypeScript types for the content data
```

**Where does new code go?**

- Used by one area of the site only → `features/<area>/`
- Used on several pages → `components/`
- No React, just a function → `lib/`
- A data shape → `types/content.ts`

## Editing content

| What | File |
|---|---|
| Company details (email, phones, WhatsApp, offices, socials, stats) | `src/content/site.ts` |
| Services (page content, FAQs, related services) | `src/content/services.ts` |
| Blog posts | `src/content/blog.ts` (cover images in `public/blog/<slug>.webp`) |
| Pricing, jobs, courses, portfolio, team, testimonials, locations | `src/content/misc.ts` |
| Legal pages | `src/content/legal.ts` |
| Header and footer menus | `src/content/navigation.ts` |
| Chatbot replies (English and Roman Urdu) | `src/content/chatbot.ts` |
| Logo files | `public/brand/` |

To add a service, blog post or job, add an entry to its content file. Pages, menus and the sitemap update automatically.

To use a video in the home page hero, add `public/video/hero.mp4` (and optionally `public/video/hero-poster.webp`). It replaces the animated scene on the next build.

## Design system

Colours and fonts are defined once as tokens in `src/app/globals.css` and used through Tailwind classes such as `bg-page`, `text-heading` and `text-brand-600`. Change a token there and the whole site follows. Every text and background pair meets WCAG AA contrast in light and dark mode.

**Colour scheme: Charcoal & Oxblood**

| Token | Light | Dark | Used for |
|---|---|---|---|
| `page` | `#F5F0E8` sand | `#121214` | Page background |
| `card` | `#FFFFFF` | `#1D1D20` | Cards, header |
| `heading` | `#1C1C1E` charcoal | `#F3EEE6` | Headings |
| `ink` / `body` | `#3B3B3F` | `#CFCAC2` | Body text |
| `muted` | `#5F5E63` | `#A29E96` | Secondary text |
| `brand-600` | `#9E3B2B` oxblood | `#E0907E` | Links, icons, accent words |
| `primary` | `#9E3B2B` | `#D9826F` | Buttons |
| `glow-400` | `#8C5A1A` ochre | `#E0B070` | Secondary accent |
| `line` | `#E2DBD0` | `#2E2E33` | Borders |

Useful classes defined in `globals.css`:

- `section-dark`: a solid charcoal section. It re-scopes the colour tokens so everything inside stays readable.
- `solid-primary`: the primary button fill, with matching text colour.
- `container-page`: the standard page width and side padding.

**Font:** Cormorant Garamond (Google Fonts, loaded through `next/font` in `src/app/layout.tsx`) for the whole site. Body text uses `font-size-adjust` so the small x-height still reads comfortably.

## Performance notes

- **Chatbot:** only the floating button loads with the page. The chat window, replies and matching engine download when a visitor hovers over or clicks the button.
- **Smooth scrolling (Lenis):** runs only on desktop mouse and trackpad. Phones keep native scrolling and never download it.
- **Scroll work:** the header, reading progress bar and pinned hero share one passive, frame-throttled scroll listener (`src/hooks/useScroll.ts`).
- **Blur effects:** `backdrop-blur` is only used from the `md` breakpoint up, because it makes scrolling stutter on low-end phones.
- **Images:** WebP, served through `next/image` with `sizes` so phones download small versions.
- **Motion:** every animation respects `prefers-reduced-motion`.

## Before launch (search the code for `TODO`)

- Real email, phone, WhatsApp number, office addresses, social links and domain (`site.ts`)
- Real testimonials, portfolio projects and screenshots (`misc.ts`)
- Expand the blog drafts (`blog.ts`)
- Have the legal pages reviewed (`legal.ts`)
- Connect the contact form to email or a CRM (`api/contact/route.ts`)

## Credits

Developed by **Ehtisham Malik** (AI Engineer) and **Ali Raza** (Software Engineer).
