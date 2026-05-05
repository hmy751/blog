# Site Next Static Migration Plan

Date: 2026-05-05

## Re-entry Summary

- scope: site implementation plan
- touched: `site/src/render.mjs`, `site/src/markdown.mjs`, `site/src/content.mjs`, `site/design-system/styles/*`, `content/posts`
- why-now: custom blog site is close to deployment, but the current zero-dependency renderer makes routes, components, Markdown rendering, and global CSS ownership hard to scan and maintain.
- crossed-contexts: root `content/posts` should remain the public writing source, while `site/` should own routing, rendering, Markdown conversion, styles, images, and deployment.
- new-understanding: Astro is a strong Markdown-first option, but the user wants an explicit app-router style route map. Next.js App Router with static generation fits that preference if kept build-time/static.
- re-entry: migrate `site/` to Next.js App Router + TypeScript, read existing `../content/posts/*.md` at build time, keep Markdown source unchanged, and preserve the current design class contract.
- insight: candidate

## 2026-05-05 Update: System Preview Is Local-Only

- Do not register `/system` or `/system/example-article` under Next App Router.
- Production routes are `/`, `/articles/`, `/articles/{slug}/`, `/note/`, and `/about/`.
- Keep the design/prose QA surface as a separate Next app under `site/system-preview`, run through `npm run dev:system` and `npm run build:system`.
- Do not copy system fixture assets into production `public/` or the default static export.

## Current State

The current site is a zero-dependency Node ESM static renderer.

- `site/src/content.mjs`: reads `../content/posts/*.md`, parses frontmatter, derives slug/date/tag/description.
- `site/src/markdown.mjs`: hand-written Markdown renderer supporting code fences, tables, task lists, footnotes, callouts, figures, and inline transforms.
- `site/src/render.mjs`: originally owned URL routing, HTML shell, page rendering, component-like HTML helpers, system preview, and fixture rendering in one large file.
- `site/design-system/styles/index.css`: imports `tokens.css`, `base.css`, `prose.css`, `blog-components.css`, `system-page.css`.
- `site/scripts/build.mjs`: emits static HTML to `site/dist`.

Main maintainability issue:

- route ownership is implicit inside `renderUrl()`.
- component ownership is hidden inside string-rendering helper functions.
- Markdown parsing is custom code that will keep growing as posts gain richer syntax.
- CSS class contract is useful, but style ownership is currently broad/global rather than component-local.

## Chosen Direction

Use Next.js App Router as a static site generator.

Recommended stack:

- `Next.js` App Router
- `TypeScript`
- static generation at build time
- `gray-matter` for frontmatter
- `unified` / `remark` / `rehype` pipeline for Markdown
- `remark-gfm` for tables, task lists, footnotes
- `rehype-slug` for heading anchors
- `Shiki` or `rehype-pretty-code` for code highlighting and code fence titles
- CSS Modules or component-scoped CSS for components
- global CSS only for tokens, reset/base, and `.prose`
- Playwright screenshot checks later
- Cloudflare Pages free tier as the likely deployment target

Important constraint:

- Do not move or rewrite public posts into `site/`.
- `content/posts/*.md` remains the source of truth.
- The site reads posts from `../content/posts` at build time.
- The site may derive metadata and routes, but it must not silently edit post files.

## Target Directory Shape

```text
site/
  package.json
  next.config.mjs
  tsconfig.json
  src/
    app/
      layout.tsx
      page.tsx
      articles/
        page.tsx
        [slug]/
          page.tsx
      note/
        page.tsx
      about/
        page.tsx
    components/
      shell/
        Shell.tsx
        Shell.module.css
        TopNav.tsx
        Footer.tsx
      article-row/
        ArticleRow.tsx
        ArticleRow.module.css
        ArticleList.tsx
      post/
        PostMeta.tsx
        PostHero.tsx
        PostFooter.tsx
        Post.module.css
      prose/
        Prose.tsx
      system/
        SystemSpec.tsx
    lib/
      posts.ts
      markdown.ts
      site-config.ts
      images.ts
    system-preview/
      app/
        system/
          page.tsx
          example-article/
            page.tsx
    scripts/
      dev-system.mjs
      build-system.mjs
      copy-content-assets.mjs
    styles/
      globals.css
      tokens.css
      base.css
      prose.css
  public/
    images/
```

CSS ownership convention:

- colocate component CSS as `Component.module.css` beside the component when the selector targets known component DOM.
- keep `src/styles/globals.css` as the root import for true global CSS only.
- keep `src/styles/prose.css` global because Markdown output is generated HTML and not component-scoped.
- keep system preview styles in the local-only system preview layer, not in the production global bundle.

Keep current production URL contract:

- `/`
- `/articles`
- `/articles/[slug]`
- `/note`
- `/about`

Local-only preview URLs, served only by `dev:system`/`build:system`:

- `/system`
- `/system/example-article`

If trailing slash is desired, configure it in `next.config.mjs`.

## Static Generation Model

`site/src/lib/posts.ts` should read Markdown from the repo root:

```ts
const postsDir = path.resolve(process.cwd(), "../content/posts");
```

The post adapter should preserve the existing rules from `site/src/content.mjs`:

- `slug`: filename without `YYYY-MM-DD-`
- `date`: frontmatter date or filename date
- `dateText`: `YYYY.MM.DD`
- `dateShort`: `MM.DD`
- `primaryTag`: `tags[0]`, fallback `project`, fallback `category`, fallback `Blog`
- `description`: frontmatter `description`, fallback first normal paragraph excerpt
- `descriptionSource`: `frontmatter` or `excerpt`
- `featured`: frontmatter `featured === true`
- `cover`: frontmatter `cover`
- ignore `TBD` posts for public build

`site/src/app/articles/[slug]/page.tsx` should use:

```ts
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
```

The article page should render the Markdown body through `renderMarkdown()` and place it inside:

```tsx
<div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
```

This is acceptable because Markdown comes from local trusted source files, but the Markdown pipeline should still escape raw HTML unless we explicitly decide to allow it.

## Markdown Contract To Preserve

The new Markdown pipeline must preserve the useful behavior currently implemented in `site/src/markdown.mjs`.

Must support:

- paragraphs and lead first paragraph
- `h1` through `h4`
- duplicate first H1 removal when it matches frontmatter title
- unordered and ordered lists
- nested lists
- task lists
- blockquotes
- callouts from `> [!NOTE]`, `> [!INFO]`, `> [!TIP]`, `> [!WARNING]`, `> [!WARN]`
- inline code
- fenced code blocks
- code fence title or filename metadata
- syntax highlighting
- tables with horizontal scroll wrapper
- footnotes
- links
- images
- figures with captions
- `==mark==`
- safe `<kbd>` support, or a Markdown-native replacement if preferred

Recommended packages:

```text
gray-matter
unified
remark-parse
remark-gfm
remark-rehype
rehype-slug
rehype-stringify
rehype-pretty-code or shiki
unist-util-visit
```

Potential custom transforms:

- code fence meta `title="components/Button.tsx"` or `filename="components/Button.tsx"` -> existing `.code-block .filename` DOM.
- Markdown image followed by a caption line starting with `그림 1.`, `Figure 1.`, `Fig. 1.`, or `Caption:` -> `<figure><img ...><figcaption>...</figcaption></figure>`.
- GFM table -> wrap in `<div class="table-scroll">...</div>`.
- callout blockquote -> `<div class="callout">` or `<div class="callout warn">`.
- `==text==` -> `<mark>text</mark>`.

Existing code block filename DOM to preserve:

```html
<div class="code-block">
  <div class="filename"><span class="lang">tsx</span><span>components/Button.tsx</span></div>
  <pre><code>...</code></pre>
</div>
```

## Image Plan

The user wants Markdown images and image boxes to work naturally from posts.

Use two image paths:

1. Post cover image from frontmatter:

```md
---
cover: /images/posts/example/cover.webp
---
```

Render it through the existing design intent:

```html
<div class="post-hero" style="background-image:url('/images/posts/example/cover.webp')" aria-hidden="true"></div>
```

Later, this can become a normal `<img>` if image accessibility or LCP optimization becomes more important.

2. Body image from Markdown:

```md
![구조 다이어그램](/images/posts/example/diagram-01.webp)

그림 1. 빌드 타임 Markdown 처리 흐름.
```

Render as:

```html
<figure>
  <img src="/images/posts/example/diagram-01.webp" alt="구조 다이어그램">
  <figcaption>그림 1. 빌드 타임 Markdown 처리 흐름.</figcaption>
</figure>
```

Recommended asset source:

```text
content/
  posts/
  assets/
    posts/
      example/
        cover.webp
        diagram-01.webp
```

Build/prebuild step:

- copy `content/assets/posts/**` to `site/public/images/posts/**`.
- Next then serves images as static assets under `/images/posts/...`.

Initial image rendering recommendation:

- use plain `<img>` for Markdown body images.
- avoid `next/image` at first because static export requires extra image loader/unoptimized handling.
- keep images compressed before commit.

Image conventions:

- prefer `.webp` for photos/screenshots and `.svg` for diagrams when appropriate.
- keep cover images around 1600px wide or smaller.
- keep diagrams/screenshots around 1200-1600px wide unless detail requires more.
- avoid single files over Cloudflare Pages' static asset limit.
- use ASCII filenames such as `diagram-01.webp`.

## Styling Plan

Preserve current design class contract first, then improve ownership.

Keep global:

- `tokens.css`
- `base.css`
- `prose.css`

Split component styles after the first migration works:

- article row/list styles -> `ArticleRow.module.css` or `styles/components/article-row.css`
- post meta/hero/footer/title -> post component CSS
- note/about styles -> their page/component CSS
- system preview styles -> `system-preview/app/system/system.module.css`, with production tokens/base/prose imported from `src/styles`

Do not redesign during migration.

Classes that should remain stable until screenshot regression exists:

- `.shell`
- `.top`
- `.brand`
- `.dot`
- `.nav`
- `.home-intro`
- `.section-label`
- `.article-list`
- `.row`
- `.article-title`
- `.article-desc`
- `.meta`
- `.cv`
- `.post-meta`
- `.post-hero`
- `.post-title`
- `.post-sub`
- `.prose`
- `.post-footer`
- `.note`
- `.about-grid`

## Design Structure Audit Add-on

This should be added to the migration work, but not mixed with visual redesign.

Why it exists:

- The user is actively refining the design and is worried that current CSS/component ownership is too hard to understand.
- Current CSS imports every layer through `site/design-system/styles/index.css`.
- `blog-components.css` contains live production styles plus prototype thumbnail variants (`leading`, `inline`, `magazine`, `peek`) that are not part of the adopted first live UI.
- `system-page.css` is system preview documentation, but it is globally imported with production styles.
- `render.mjs` mixes live routes, page composition, reusable components, system specimens, demo covers, and inline demo styles.

Recommended timing:

1. Do a design inventory before or during the Next scaffold.
2. Do ownership separation during the Next migration.
3. Do visual polish only after the route/component/style ownership is visible.

Do not do a broad visual redesign in the same step as the framework migration.

Design inventory deliverable:

```text
site/docs/DESIGN_INVENTORY.md
```

Suggested inventory columns:

- token/foundation
- production shell
- production page
- production component
- Markdown/prose primitive
- system-preview only
- prototype/archive only
- unresolved/open decision

Initial classification from current files:

- `tokens.css`: foundation, global
- `base.css`: production shell/global reset
- `prose.css`: Markdown/prose primitive, global by necessity
- `blog-components.css`: mixed production pages/components, motion, note/about, plus prototype article row variants
- `system-page.css`: system-preview only
- `reference/blog-design/source/*.html`: read-only design source/archive
- `render.mjs` system sections: system-preview only
- `render.mjs` `homePage`, `articlesPage`, `postPage`, `notePage`, `aboutPage`: production pages
- `render.mjs` `articleRow`, `navLink`, shell helpers: production components

Refactor target:

```text
src/styles/
  globals.css           # imports tokens/base/prose only
  tokens.css
  base.css
  prose.css

src/components/
  shell/Shell.tsx
  shell/Shell.module.css
  article-row/ArticleRow.tsx
  article-row/ArticleRow.module.css
  post/PostMeta.tsx
  post/PostHero.tsx
  post/Post.module.css

system-preview/app/system/
  system.module.css     # system preview only; not production App Router
```

Important rule:

- Keep global CSS only where selectors must target unknown Markdown output or true document shell.
- Component CSS should move beside the component that owns the DOM.
- System preview CSS should live only under `system-preview/`, not under production App Router.
- Prototype variants can stay in a `reference` or `experimental` stylesheet, but they should not be loaded by production routes unless intentionally revived.

Tailwind decision:

- Do not use Tailwind as the main migration tool for the first pass.
- Tailwind could be useful later for small layout utilities, but adopting it now would mix three changes at once: framework migration, Markdown pipeline replacement, and visual/style language rewrite.
- The current design relies on a small handcrafted token system, prose selectors, hairline rules, carefully tuned article rows, and source-map traceability to `Blog v2.html`/`System.html`.
- Next.js officially supports CSS Modules and recommends global CSS only for truly global styles; this matches the needed ownership split.
- Tailwind v4's CSS-first theme variables are compatible with this direction later, but they do not solve the current problem by themselves. The current problem is ownership and source-of-truth clarity.

Suggested Tailwind posture:

```text
Phase 1: Next + CSS Modules + global tokens/prose. No Tailwind.
Phase 2: After visual QA, decide whether Tailwind utilities would reduce repeated layout CSS.
Phase 3: If adopted, map only stable tokens to Tailwind theme variables and keep prose/system-specific CSS as CSS.
```

Old-to-new ownership map:

| Current owner | Next owner | Notes |
| --- | --- | --- |
| `site/src/render.mjs` `htmlShell()` | `src/components/shell/Shell.tsx` + `src/app/layout.tsx` | Shell, metadata defaults, nav/footer composition should be explicit. |
| `site/src/render.mjs` `homePage()` | `src/app/page.tsx` | Uses `getPosts()` display lists only. |
| `site/src/render.mjs` `articlesPage()` | `src/app/articles/page.tsx` | Group by year in page or small route helper. |
| `site/src/render.mjs` `postPage()` | `src/app/articles/[slug]/page.tsx` + post components | Keep post sequence from `DESIGN_CONTRACT.md`. |
| `site/src/render.mjs` `articleRow()` | `src/components/article-row/ArticleRow.tsx` | Live default is `aside`; prototype variants should not ship in the production module. |
| `site/src/render.mjs` system sections | `system-preview/app/system/page.tsx` | System preview is local-only, Next-based, and not a production route. |
| `site/src/content.mjs` | `src/lib/posts.ts` | Keep adapter rules; add schema/build checks later. |
| `site/src/markdown.mjs` | `src/lib/markdown.ts` | Replace hand-written parser with remark/rehype transforms. |
| `site/design-system/styles/tokens.css` | `src/styles/tokens.css` | Foundation token source. |
| `site/design-system/styles/base.css` | `src/styles/base.css` + shell module CSS | Reset/global remains global; shell-specific selectors can move with shell. |
| `site/design-system/styles/prose.css` | `src/styles/prose.css` | Global because it targets generated Markdown HTML. |
| `site/design-system/styles/blog-components.css` | component/page CSS modules | Split production components from prototype variants. |
| `site/design-system/styles/system-page.css` | `system-preview/app/system/system.module.css` reference source | System preview only. |
| `site/design-system/fixtures/*` | keep under `site/design-system/fixtures` | Synced into local-only `system-preview/public` before dev/build. |

Prototype variant handling:

- `aside`: live production default.
- `leading`, `inline`, `magazine`, `peek`: archive/experiment only unless explicitly revived.
- If kept, move them to a clearly named reference file such as `site/design-system/styles/article-row-variants.reference.css`.
- Do not keep unused variants inside `ArticleRow.module.css`.

Reference reconciliation timing:

- Do not wait until every migration task is finished before opening the references.
- Use references lightly during migration to preserve DOM/class contracts.
- Do the full comparison after route/component/style ownership is separated and before visual polish/deployment decisions.
- `Blog v2.html` is the canonical live UI reference.
- `System.html` is the canonical token/prose/component specimen reference.
- `Blog.html` is v1 archive only; use it to understand history, not as a source to reintroduce old decisions.
- `tweaks-panel.jsx` is useful only to recover the prototype parameter space; do not port it to runtime.

Reference comparison pass:

1. Compare production routes against `Blog v2.html`:
   - shell/top/nav/footer
   - home sequence
   - article row `aside` layout
   - articles year grouping
   - post meta/hero/title/subtitle/body/footer sequence
   - note/about layouts
   - motion/reduced-motion behavior
2. Compare Markdown/local system preview surfaces against `System.html`:
   - token names and values
   - typography samples
   - prose primitives
   - code filename DOM order
   - callout/table/figure/footnote specimens
   - local system preview spacing and specimen layout
3. Check `Blog.html` only if something looks like a regression with unclear origin.
4. Record any intentional differences in `site/docs/DESIGN_CONTRACT.md` or a `site/decisions/` record.

Design QA checklist:

- home desktop/mobile
- articles archive desktop/mobile
- article row with cover
- article row without cover
- post detail with no cover
- post detail with cover
- Markdown code block with filename
- Markdown table overflow
- Markdown image + caption
- callout info/warn
- footnotes
- local system preview specimens

Open design questions:

- Should prototype article row variants be deleted from live CSS, moved to `reference`, or kept as experimental specimens?
- Decided: `/system` CSS lives under the local-only Next `system-preview/` app.
- Should post cover stay as CSS background or become semantic image markup?
- Decided: the system page remains local-only.

## Deployment Plan

Target deployment:

- Cloudflare Pages free tier
- build command: `npm run build`
- output directory: likely `out` if using `output: "export"`

Expected `next.config.mjs` shape:

```js
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
```

Cloudflare Pages should be fine for a personal static blog with images, as long as:

- generated file count stays reasonable.
- individual static assets are compressed and not oversized.
- no server-only Next features are used.

Avoid in the first migration:

- dynamic server routes
- database/auth
- runtime image optimization
- edge/server functions
- MDX-only content conversion

## Migration Workstreams

Treat the migration as four coordinated workstreams, not one giant rewrite.

### 1. Route And App Shell

Goal:

- make URL ownership obvious through `src/app/**`.
- preserve current production route contract and keep system preview outside production routes.

Tasks:

- create `src/app/layout.tsx`.
- create `src/app/page.tsx`, `articles/page.tsx`, `articles/[slug]/page.tsx`, `note/page.tsx`, `about/page.tsx`.
- create `system-preview/app/**`, plus `scripts/dev-system.mjs` and `scripts/build-system.mjs`, for local-only Next system preview.
- move shell/nav/footer into components.
- keep `trailingSlash` behavior consistent with current generated `/route/index.html` shape.

### 2. Content And Markdown

Goal:

- keep root Markdown source unchanged while replacing custom parser with a maintainable pipeline.

Tasks:

- port `content.mjs` behavior into `src/lib/posts.ts`.
- add frontmatter/date/slug validation without rewriting posts.
- port Markdown behavior into `src/lib/markdown.ts`.
- compare fixture output against the local-only `/system/example-article/` preview.

### 3. Design Ownership

Goal:

- make each visual rule answerable by owner: token, shell, component, prose, page, or system preview.

Tasks:

- create `site/docs/DESIGN_INVENTORY.md` or keep an equivalent checklist in the migration PR/session.
- keep `tokens.css`, `base.css`, `prose.css` global.
- split `blog-components.css` into component/page modules.
- move `system-page.css` out of the production global bundle.
- quarantine prototype article row variants.

### 4. Assets And Deployment

Goal:

- make Markdown images and cover images stable in static export.

Tasks:

- decide whether `content/assets` starts now.
- if yes, add a prebuild copy script to `site/public/images`.
- use plain `<img>` for Markdown images initially.
- configure static export for Cloudflare Pages.

Dependency order:

1. route/app shell can start first.
2. content adapter must land before article routes can fully build.
3. Markdown pipeline must land before post detail visual QA is meaningful.
4. design ownership split should happen while components are created, not after every route is already built.
5. deployment config should come after static routes and assets are predictable.

## Migration Steps

1. Create a clean Next.js App Router scaffold inside `site/`.
2. Preserve existing docs, decisions, design-system reference archive, and fixtures.
3. Add a migration decision record under `site/decisions/` because this changes the site stack and long-term maintenance model.
4. Update `site/docs/BLOG_IMPLEMENTATION_PLAN.md` so it no longer presents the zero-dependency renderer as the active target once migration begins.
5. Add or draft `site/docs/DESIGN_INVENTORY.md` to classify production/system/prototype styles before moving CSS.
6. Move current CSS into `src/styles` or keep imports from `design-system/styles` temporarily while routes are being ported.
7. Implement `src/lib/site-config.ts` from current `siteConfig`.
8. Implement `src/lib/posts.ts` using current `content.mjs` behavior.
9. Implement `src/lib/markdown.ts` with remark/rehype pipeline.
10. Implement shared components:
   - `Shell`
   - `TopNav`
   - `Footer`
   - `ArticleRow`
   - `PostMeta`
   - `PostHero`
   - `Prose`
11. Implement production routes:
   - `/`
   - `/articles`
   - `/articles/[slug]`
   - `/note`
   - `/about`
12. Implement `system-preview/` as a local-only Next app and wrap it with `dev:system`/`build:system`.
13. Split component/page CSS ownership while porting each component.
14. Add `prebuild` image copy script if `content/assets` is adopted.
15. Run `npm run build`.
16. Start local preview and compare:
    - home desktop/mobile
    - articles archive
    - post detail with no cover
    - post detail with cover
    - post detail with code/table/image/callout/footnote
    - local-only system preview page
17. Run the reference reconciliation pass against `Blog v2.html` and `System.html`.
18. Add screenshot QA after first stable migration.
19. Remove or archive old production `src/*.mjs` and `scripts/*.mjs` only after the Next build reproduces the route contract; keep system preview scripts if they remain useful.

## Definition Of Done

The migration is not done just because Next builds.

Functional done:

- `npm run build` creates a static export.
- all existing production routes are generated.
- `content/posts/*.md` remains in root content and is not copied or rewritten as source.
- `date: TBD` posts are excluded from public article routes.
- filename date and frontmatter date mismatch fails a check or is clearly reported.
- post detail pages render title, meta, optional cover, optional frontmatter subtitle, body, and footer navigation.
- home and articles use the same sorting/fallback rules as the current site.

Markdown done:

- code fence with language renders.
- code fence with `title` or `filename` renders filename DOM.
- table gets horizontal overflow wrapper.
- task lists render checked/unchecked states.
- footnotes render refs and footnote list.
- callouts render info/warn styles.
- Markdown images render as figures when followed by caption convention.
- raw HTML is escaped or rejected by default, except explicitly supported safe transforms.

Design done:

- production routes do not import system-preview CSS.
- production `ArticleRow` module contains only the live `aside` behavior unless another variant is explicitly chosen.
- prototype variants are archived, not mixed into production component CSS.
- `.prose` remains globally styled and matches fixture needs.
- local-only system preview still shows token/prose/component specimens.
- reference reconciliation has been run against `Blog v2.html` and `System.html`.
- intentional differences from the references are documented.
- desktop/mobile checks have no obvious overlap, overflow, or broken nav/footer layout.

Docs done:

- `site/README.md` describes the Next static stack.
- `site/docs/BLOG_IMPLEMENTATION_PLAN.md` reflects the new active stack.
- `site/docs/DESIGN_CONTRACT.md` still matches the implemented class/DOM contract.
- `site/docs/MARKDOWN_CONTRACT.md` lists any changed Markdown conventions.
- `site/docs/CONTENT_CONTRACT.md` mentions `content/assets` if that asset source is adopted.
- `site/decisions/` has a decision record for the stack migration and style ownership split.

Cutover cleanup:

- delete or move old zero-dependency renderer files only after Next parity is confirmed.
- do not leave two competing build systems with the same `npm run build` name.
- remove generated `site/dist` from consideration if Next uses `out`.
- update deployment output directory from `dist` to `out` if using `output: "export"`.
- keep design reference archive read-only.

## Open Decisions

- Decided: `/system` is omitted from production export and kept as local-only preview scripts.
- Should `content/assets` be introduced now, or should images initially live directly under `site/public/images`?
- Should post cover use background image to preserve current design exactly, or semantic `<img>` for accessibility/LCP?
- Should Markdown allow raw HTML? Default recommendation: no, except explicit safe transforms like `kbd`.
- Should route groups such as `/pilab` or `/experiments` be introduced immediately, or only after the baseline migration?

## Do Not Miss

- Keep `content/posts` untouched during site migration.
- Preserve frontmatter expectations from root blog publishing rules.
- Preserve current visual class contract until screenshot regression exists.
- Preserve the design source hierarchy: `Blog v2.html` wins for live UI, `System.html` is system/prose QA, `Blog.html` is archive only.
- Preserve system preview as a diagnostic surface, but do not let system-preview CSS leak into production routes.
- Treat `aside` as the only chosen production article row variant for the first migration.
- Do not adopt Tailwind in phase 1 unless the migration plan is explicitly revised.
- Do not turn this into a full dynamic Next app.
- Do not import editorial writing workflow into site implementation files.
- Do not solve design gaps by requiring arbitrary HTML in posts.
- Keep image handling boring at first: static paths, copied assets, plain `<img>`, CSS-controlled figures.
- Keep generated output ownership clear: old `dist` belongs to the Node renderer, Next static export likely uses `out`.
