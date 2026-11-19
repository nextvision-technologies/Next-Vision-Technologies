# Working rules for AI assistants

@AGENTS.md

## Before you start
1. Read [AI_working/PROJECT_OVERVIEW.md](AI_working/PROJECT_OVERVIEW.md). It maps every file, the folder rules, how to do common tasks and the known gotchas.
2. Skim the newest entries in [AI_working/CHANGELOG.md](AI_working/CHANGELOG.md) to see recent work and open decisions.

## After every task (required)
Every change to this project must be recorded in `AI_working/` before you finish:
1. **Update `AI_working/PROJECT_OVERVIEW.md`** wherever your change makes it out of date: the file-by-file map (new, moved, renamed or deleted files), folder rules, how-to steps, design system, gotchas and open items. Update its "Last updated" date.
2. **Add an entry at the top of `AI_working/CHANGELOG.md`**: date, short title, what changed (with file paths) and anything the owner still has to decide.
3. If you learned something that will trip up the next session, add it to the Gotchas section.

## Folder architecture (keep it organised)
- `src/app/` holds routes only. Page sections and logic go in `components/` or `features/`.
- One area only → `src/features/<area>/`. Used by two or more areas → `src/components/<group>/`. **A feature never imports from another feature.**
- All text and data live in `src/content/`, one file per topic. Types live in `src/types/content.ts`. Plain functions live in `src/lib/`.
- Static files go in `public/` in the matching folder (`brand/`, `blog/`, `projects/`, `team/`).
- Design proposals are built as standalone HTML in `AI_working/design-previews/` and shown to the owner **before** they are implemented.
- Do not move `node_modules/` or `.next/`; they must stay in the root.

## Quality bar
- Run `npm run lint` and `npm run build` before reporting a task as done, and say plainly if anything fails.
- Every page needs an entry in `src/content/seo.ts`. Blog posts need a focus keyword in the slug, H1, SEO title, meta description and cover alt text.
- Never publish logins, passwords or client data that the owner has not approved.
- Images: WebP, licensed for commercial use, and a **new file name** whenever an image is replaced.
- Do not commit unless the owner asks.
