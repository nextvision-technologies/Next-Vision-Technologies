# Next Vision Technologies website

Company website for Next Vision Technologies, a software house in Lahore and the UK offering AI automation, SaaS, websites and digital marketing.

Built with **Next.js 16** (App Router, Cache Components), **React 19**, **TypeScript** and **Tailwind CSS 4**. Every page is prerendered at build time.

> AI assistants: start with `CLAUDE.md` and `AI_working/PROJECT_OVERVIEW.md`.

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
│   ├── article/          Article blocks, reading progress, table of contents (blog + legal)
│   ├── cards/            Cards reused across areas (service card)
│   ├── layout/           Header, Footer, MegaMenu, ThemeToggle, SmoothScroll, WhatsAppButton
│   ├── sections/         Page-level sections: PageHero, CtaBand, Faq, StatsStrip, PageSkeleton
│   ├── seo/              JSON-LD structured data
│   └── ui/               Small primitives: Button, SectionHeading, icons, RichText, ScrollReveal
│
├── features/             Code that belongs to one area of the site (never imports another feature)
│   ├── home/             Pinned hero, hacker terminal, typewriter, service tabs, tech marquee
│   ├── projects/         Projects Gallery filters and cards
│   ├── chat/             Chat launcher, lazily loaded chat panel, reply engine
│   ├── blog/             Post card
│   ├── pricing/          Pricing cards
│   ├── contact/          Contact form, demo booking
│   ├── legal/            Legal page layout
│   ├── locations/        Location page layout
│   └── team/             Team grid
│
├── content/              All website text and data, one file per topic (edit these to change the site)
├── hooks/                Reusable React hooks (shared scroll listener)
├── lib/                  Plain helper functions (date formatting, heading ids, file checks)
└── types/                TypeScript types for the content data
```

**Where does new code go?**

- Used by one area of the site only → `features/<area>/`
- Used on several pages or by two features → `components/`
- No React, just a function → `lib/`
- A data shape → `types/content.ts`

## Editing content

| What | File |
|---|---|
| Company details (email, phones, WhatsApp, offices, socials, stats) | `src/content/site.ts` |
| Services (page content, FAQs, related services) | `src/content/services.ts` |
| Blog posts | `src/content/blog.ts` (cover images in `public/blog/`, writers and reviewers in `src/content/people.ts`) |
| Projects Gallery | `src/content/projects.ts` (screenshots in `public/projects/<slug>.webp`) |
| Pricing packages | `src/content/pricing.ts` |
| Jobs | `src/content/jobs.ts` |
| Courses | `src/content/courses.ts` |
| Team | `src/content/team.ts` |
| Testimonials | `src/content/testimonials.ts` |
| Location pages | `src/content/locations.ts` |
| Page titles, meta descriptions, sitemap | `src/content/seo.ts` |
| Legal pages | `src/content/legal.ts` |
| Header and footer menus | `src/content/navigation.ts` |
| Chatbot replies (English and Roman Urdu) | `src/content/chatbot.ts` |
| Logo files | `public/brand/` |

To add a service, blog post or job, add an entry to its content file. Pages, menus and the sitemap update automatically.

To use a video in the home page hero, add `public/video/hero.mp4` (and optionally `public/video/hero-poster.webp`). It replaces the animated scene on the next build.

## Design system

Colours and fonts are defined once as tokens in `src/app/globals.css` and used through Tailwind classes such as `bg-page`, `text-heading` and `text-brand-600`. Change a token there and the whole site follows. Every text and background pair meets WCAG AA contrast in light and dark mode.

**Colour scheme: taken from the logo**

The logo runs from deep indigo through violet and magenta to pink and orange. The UI uses those colours in fixed roles: indigo for structure, violet for buttons, magenta for accents. The full pink-to-orange gradient appears only as a highlight (key heading words, thin rules, the reading-progress bar), never as a background behind body text.

| Token | Light | Dark | Used for |
|---|---|---|---|
| `page` | `#FAF8FD` | `#0E0820` | Page background |
| `card` | `#FFFFFF` | `#1B1236` | Cards, header |
| `heading` | `#1F0A4D` deep indigo | `#F6F2FF` | Headings |
| `ink` / `body` | `#352B4D` | `#DCD4EC` | Body text |
| `muted` | `#5E5670` | `#ADA3C6` | Secondary text |
| `primary` | `#5B21B6` violet | `#7C3AED` | Buttons |
| `brand-600` | `#A21CAF` magenta | `#F0ABFC` | Links, icons, accents |
| `glow-400` | `#A3480A` orange | `#FFB26B` | Secondary accent |
| `panel` | `#170B33` | `#170B33` | Dark sections, hero, footer |
| `line` | `#E4DDF0` | `#33285A` | Borders |

Useful classes defined in `globals.css`:

- `section-dark`: a solid indigo section. It re-scopes the colour tokens so everything inside stays readable.
- `solid-primary`: the primary button fill, with matching text colour.
- `text-gradient`: highlight words in the logo gradient (headings and large text only).
- `bg-logo-gradient`: thin decorative strips in the logo gradient. Never put text on it.
- `container-page`: the standard page width and side padding.

**Home hero:** a pinned, scroll-driven hero (`features/home/PinnedHero.tsx`). On the left, a live coding terminal (`CodeTerminal.tsx`) types real code and "deploys" it. On the right, the heading types out what we build (`Typewriter.tsx`). Both pause when off screen and respect reduced motion.

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
- Real testimonials (`testimonials.ts`)
- Expand the blog drafts (`blog.ts`)
- Have the legal pages reviewed (`legal.ts`)
- Connect the contact form to email or a CRM (`api/contact/route.ts`)

## Credits

Developed by **Ehtisham Malik** (AI Engineer) and **Ali Raza** (Software Engineer).
