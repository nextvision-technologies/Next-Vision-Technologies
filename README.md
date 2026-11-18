# Next Vision Technologies website

Next.js 16 (App Router, Cache Components) + TypeScript + Tailwind CSS 4.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all pages prerendered)
```

## Where things live

| What | File |
|---|---|
| Company details (email, phones, WhatsApp, offices, socials, stats) | `src/content/site.ts` |
| 16 services (page content, FAQs, related) | `src/content/services.ts` |
| Blog posts (11) | `src/content/blog.ts` |
| Pricing, jobs, courses, portfolio, team, testimonials, location pages | `src/content/misc.ts` |
| Legal pages (6) | `src/content/legal.ts` |
| Header / footer menus | `src/content/navigation.ts` |
| Brand colours and fonts | `src/app/globals.css` (`@theme`) |
| Logo files | `public/brand/` (from `Logo/00-Final`) |
| Contact / demo form handler | `src/app/api/contact/route.ts` |

To add a service, blog post or job, add an entry to its content file. The page, menus and sitemap update automatically.

## Before launch (search for `TODO`)

- Real email, phone, WhatsApp number, office addresses, social links, domain (`site.ts`)
- Real testimonials, team names and photos, portfolio projects and screenshots (`misc.ts`)
- Expand the blog drafts (`blog.ts`)
- Have the legal pages reviewed (`legal.ts`)
- Connect the contact form to email or a CRM (`api/contact/route.ts`)
