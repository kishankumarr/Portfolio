# Kishan Kumar A — Portfolio

Personal portfolio for **Kishan Kumar A**, Senior Frontend Developer (Mangaluru, India).
It presents selected work as engineering case studies, each with an interactive architecture
diagram, and is built from a single structured data layer sourced from the résumé.

- **Home:** hero, snapshot, case studies, about, capabilities, experience, skills, contact
- **Case studies:** `/projects/[slug]`, statically generated for each featured project
- **Light and dark themes**, persisted per visitor and following the system setting by default
- **SEO:** metadata, Open Graph and Twitter cards, a generated OG image, `sitemap.xml`,
  `robots.txt` and JSON-LD (`ProfilePage` / `Person`, `CreativeWork`, `BreadcrumbList`)

## Tech stack

| Concern    | Choice                                                          |
| ---------- | --------------------------------------------------------------- |
| Framework  | Next.js 16 (App Router, Server Components, static generation)   |
| Language   | TypeScript                                                      |
| Styling    | Tailwind CSS v4 with CSS-variable design tokens                 |
| Motion     | `motion` (`LazyMotion` + `domAnimation`), with CSS for the hero |
| Icons      | `lucide-react` (brand marks inlined as SVG)                     |
| Fonts      | Geist and Geist Mono via `next/font`                            |

Runtime dependencies are limited to `next`, `react`, `react-dom`, `motion` and `lucide-react`.

## Project structure

```
public/
  resume/Kishan-Kumar-A-Resume.pdf   # the downloadable résumé
src/
  app/
    layout.tsx                # fonts, global metadata, header, footer, theme script
    page.tsx                  # home page composition + Person JSON-LD
    projects/[slug]/page.tsx  # case study pages (static params from data)
    opengraph-image.tsx       # generated 1200×630 social card
    sitemap.ts, robots.ts, not-found.tsx, icon.svg, globals.css
  data/                       # ← all personal content lives here
    profile.ts                # name, headline, positioning, email, links, résumé path
    experience.ts             # roles, career path, education, certifications
    projects.ts               # projects, case-study content, architecture diagrams
    skills.ts                 # grouped skills + engineering capabilities
  components/
    layout/      theme script/toggle, motion provider, scroll progress, footer
    navigation/  sticky header with active-section tracking and mobile menu
    hero/        hero, profile card, snapshot stats
    about/  experience/  projects/  skills/  contact/
    ui/          Section, Reveal, ButtonLink, Tag, brand icons
  lib/
    site.ts               # site URL resolution, nav items
    structured-data.ts    # JSON-LD builders
```

Only components that need interactivity are client components: the header, theme toggle,
scroll progress, `Reveal`, the architecture diagram and the copy-email button. Everything
else renders on the server.

## Development

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npx tsc --noEmit
```

## Build

```bash
npm run build
npm start
```

Every route is prerendered as static HTML at build time.

## Deployment (Vercel)

1. Push the repository to GitHub, GitLab or Bitbucket and import it in Vercel. No extra
   configuration is needed; the framework preset is detected automatically.
2. Set `NEXT_PUBLIC_SITE_URL` to the production URL (e.g. `https://kishankumar.dev`,
   no trailing slash). It's used for canonical URLs, Open Graph, the sitemap, robots and
   JSON-LD. If it's unset on Vercel, the project's production domain
   (`VERCEL_PROJECT_PRODUCTION_URL`) is used. Locally it falls back to `http://localhost:3000`.

See `.env.example`. Any Node host that runs `next start` works the same way.

## Deployment (GitHub Pages)

The site is published at **https://kishankumarr.github.io/Portfolio/** by
`.github/workflows/deploy-pages.yml` on every push to `main`. The workflow builds a static
export (`STATIC_EXPORT=true`) served from the `/Portfolio` sub-path (`NEXT_PUBLIC_BASE_PATH`),
then runs `scripts/flatten-rsc-payloads.mjs` so in-app navigation works on a plain static host.

One-time setup: in the repository go to **Settings → Pages → Build and deployment → Source**
and choose **GitHub Actions**.

To preview the Pages build locally:

```bash
STATIC_EXPORT=true NEXT_PUBLIC_BASE_PATH=/Portfolio \
NEXT_PUBLIC_SITE_URL=https://kishankumarr.github.io/Portfolio npm run build
node scripts/flatten-rsc-payloads.mjs out
# serve ./out under /Portfolio with any static file server
```

Links to files in `public/` must go through `withBasePath()` (`src/lib/base-path.ts`).
`next/link` and metadata files add the base path automatically. If you rename the repository
or switch to a custom domain, the workflow picks up the new name automatically; for a custom
domain, set `NEXT_PUBLIC_BASE_PATH` to empty and `NEXT_PUBLIC_SITE_URL` to the domain.

## Updating content

All content lives in `src/data/`. Components never hard-code personal details.

### Personal information: `src/data/profile.ts`

- `headline`, `positioning`, `intro`: the hero and about copy
- `seoDescription`: meta description and social cards
- `careerStart`: drives the computed "years of experience"
- `social.github` / `social.linkedin`: **currently empty because the résumé doesn't list
  them.** Paste a full URL and the link appears in the hero, contact section, footer and
  JSON-LD `sameAs`. Empty values are hidden everywhere.

### Experience: `src/data/experience.ts`

Add a `Role` to `experience`. `highlights` are always visible; `more` sits behind the
"Show all responsibilities" disclosure. `projectSlugs` links the role to case studies.
`journey` is the compact career path next to the role card.

### Adding a project: `src/data/projects.ts`

1. Add an entry to `projects` with a unique `slug`.
2. Set `featured: true` for a full case study on the home page plus a detail page at
   `/projects/<slug>`. You need `problem`, `modules`, `decisions`, `outcomes` and, ideally,
   `architecture`. Use `featured: false` for a compact card under "Also built".
3. `architecture` is a list of layers, top to bottom, each with nodes. Each node's
   `detail` appears when it's hovered or focused. The detail page, sitemap and metadata are
   generated automatically.

### Skills: `src/data/skills.ts`

Edit `skillGroups`. Mark the most-used skills with `core: true` to highlight them.
`capabilities` powers the Capabilities section. Keep each one backed by `evidence`.

## Replacing the résumé

Overwrite `public/resume/Kishan-Kumar-A-Resume.pdf` with the new PDF. If you change the file
name, update `profile.resume.href` and `profile.resume.fileName` in `src/data/profile.ts`.
Every download button uses those values.

## Customising the theme

Design tokens are CSS variables at the top of `src/app/globals.css`:

- `:root` is the light theme, `.dark` is the dark theme
- `--accent` / `--accent-soft` / `--accent-fg` form the single accent colour (a signal orange
  by default). Change these to rebrand the site. Keep `--accent` at 4.5:1 contrast or better
  against `--bg`.
- Neutrals: `--bg`, `--surface`, `--surface-2`, `--fg`, `--fg-muted`, `--fg-subtle`,
  `--line`, `--line-strong`

The tokens map to Tailwind utilities (`bg-bg`, `text-muted`, `border-line`, `text-accent`…)
through the `@theme inline` block. Also update `themeColor` in `src/app/layout.tsx` and the
hard-coded colours in `src/app/opengraph-image.tsx` / `src/app/icon.svg`, which can't read
CSS variables.

## Accessibility and motion

- Semantic landmarks, one `h1` per page, sequential headings and a skip link
- Visible focus rings; the mobile menu closes on Escape, keeps focus inside and restores it
- The architecture diagram is fully keyboard-operable, with a live caption
- `prefers-reduced-motion` disables the entrance animations, pulse, caret and smooth scrolling
