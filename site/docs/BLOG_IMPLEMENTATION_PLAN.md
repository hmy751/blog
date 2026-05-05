# Blog Implementation Plan

이 문서는 `site/design-system/reference/blog-design/source`의 Claude Design 원본을 실제 블로그 앱으로 옮기기 위해 작성한 구현 계획이다. 현재는 Next App Router와 Storybook 이관이 끝났으므로, 운영 기준은 `DESIGN_CONTRACT.md`와 `decisions/2026-05-05-design-system-legacy-boundary.md`를 따른다.

요약: production source는 `src/`와 `src/styles/`, 현재 디자인 시스템 카탈로그는 Storybook, route-level QA는 `system-preview/`다. `design-system/`은 삭제하지 않는 legacy/reference bucket이다.

## Source Hierarchy

구현 판단은 아래 순서로 확인한다.

1. `design-system/reference/blog-design/manifest.json`
2. `design-system/reference/blog-design/notes/source-map.md`
3. `design-system/reference/blog-design/source/Blog v2.html`
4. `design-system/reference/blog-design/source/System.html`
5. `docs/DESIGN_CONTRACT.md`, `docs/MARKDOWN_CONTRACT.md`

`Blog v2.html`은 live UI source이고, `System.html`은 token/prose/component primitive QA source다. `Blog.html`은 v1 archive로만 본다.

## Current Shape

정적 생성 중심 블로그로 만든다.

- content source: `../content/posts/*.md`
- production style source: `src/styles/globals.css`, `src/styles/tokens.css`, `src/styles/base.css`, `src/styles/prose.css`, plus component CSS Modules
- production routes: home, articles, post detail, note
- dormant route component: About is preserved under `src/components/about/AboutPage.tsx` but not registered in App Router yet
- local-only Next system preview: `/system/`, `/system/example-article/` through `npm run dev:system` or `npm run build:system`
- Storybook design system catalog: tokens, typography, prose, components, and screen compositions through `npm run storybook`
- generated outputs: static HTML, RSS, sitemap, metadata

현재 첫 구현은 zero-dependency Node ESM static renderer였고, 2026-05-05부터 Next.js App Router + static export로 전환했다. 기존 renderer 파일은 legacy 이력으로 보존하되 package scripts에는 노출하지 않는다. system preview는 별도 Next app인 `system-preview/`에서 production components/lib/styles를 import한다.

| File | Role |
| --- | --- |
| `src/content.mjs` | `content/posts` adapter, frontmatter parse, slug/date/tag/description fallback |
| `src/markdown.mjs` | Markdown -> prose HTML transform |
| `src/render.mjs` | legacy renderer for home/articles/post/note comparison |
| `scripts/dev.mjs` | local HTTP dev server |
| `scripts/build.mjs` | static route generation to `dist/` |
| `system-preview/` | local-only Next system preview app |
| `scripts/dev-system.mjs` | starts `system-preview/` with Next dev |
| `scripts/build-system.mjs` | builds `system-preview/` to `system-dist/` |
| `.storybook/` | Storybook config for design-system catalog |
| `src/stories/` | Storybook fixture data and stories |

Migration target:

| File | Role |
| --- | --- |
| `next.config.mjs` | Next static export config, `out/` output |
| `src/app/**` | file-system route ownership |
| `src/components/**` | shell/article/post components |
| `src/lib/posts.ts` | `content/posts` adapter |
| `src/lib/markdown.ts` | unified/remark/rehype Markdown pipeline |
| `src/styles/**` | global token/base/prose CSS only |

Astro 같은 Markdown-first static framework로 갈 수는 있지만, 지금 기준선은 이미 들어온 Node renderer다. 프레임워크를 바꾸더라도 아래 contracts와 class names를 먼저 유지한다.

## Current App Structure

```text
site/
  package.json
  scripts/
    dev.mjs
    build.mjs
  src/
    content.mjs
    markdown.mjs
    render.mjs
  design-system/
    reference/blog-design/
    styles/
    fixtures/
  docs/
```

The legacy HTML shell imports:

```html
<link rel="stylesheet" href="/design-system/styles/index.css">
```

If the chosen framework has a font loader, move the font loading from `design-system/styles/index.css` into the framework layout and keep the CSS variables unchanged.

## Data Flow

1. Read `../content/posts/*.md`.
2. Validate required frontmatter from `CONTENT_CONTRACT.md`.
3. Derive `slug`, `year`, `primaryTag`, `description`, `hasCover`, `isFeatured`.
4. Sort posts by date desc.
5. Build route data:
   - home featured/recent
   - articles grouped by year
   - post detail prev/next
   - RSS/sitemap

Adapter rules:

- `primaryTag`: first `tags[]`, fallback `project`, fallback `category`, fallback `Blog`.
- `description`: frontmatter `description`, fallback first normal paragraph excerpt.
- `featured`: frontmatter `featured`; if no featured posts exist, home uses latest 3 as display fallback without mutating metadata.
- `cover`: frontmatter `cover`; no-cover state is valid.
- `readTime`: use existing frontmatter string first. Later, a check can compare computed reading time.

## Route Plan

### `/`

- shell + top nav
- `home-intro` from `src/config/site.ts`
- `Featured`: 3 posts
- `Recent`: 6 posts excluding display featured where possible
- link to `/articles`

### `/articles`

- page title
- total post count
- posts grouped by year
- row date format `MM.DD`

### `/articles/[slug]`

- `article.view.prose`
- `PostMeta`
- optional `PostHero`
- `h1.post-title`
- optional `p.post-sub`
- rendered Markdown body
- post footer with back link and next/previous link

### `/note`

- keep the route, but do not fake content from prototype.
- render configured notes if a source exists.
- otherwise show a quiet empty state using the same `note` layout.

### Dormant About

- preserved component using `about-grid`.
- not registered as a production route yet.
- profile/contact values live in `src/config/site.ts`.

### System Preview (local-only separate Next app)

- not registered under production `src/app`; not included in production static export.
- lives under `system-preview/app/system`.
- served with `npm run dev:system` and built with `npm run build:system`.
- imports production `src/styles/globals.css`, `src/components/**`, and `src/lib/markdown.ts`.
- uses preview-only CSS Modules under `system-preview/app/system`.
- renders `System.html`-level specimens: swatches, type samples, spacing/radius, prose primitives, article row, live aside row, post hero/meta, note, DL grid, principles.
- renders the Markdown fixture output through the same prose CSS under `Markdown QA`.
- uses `shell-system` width so the preview can follow `System.html`'s wider measure without changing live blog pages.
- links to `/system/example-article/` for full post-detail flow QA.

### System Example Article (local-only separate Next app)

- site-only example article route.
- reads `design-system/fixtures/example-article.md`.
- uses the same post detail DOM, cover image, Markdown renderer, and prose CSS as production posts.
- does not read from or write to `content/posts`.

### Storybook (design system catalog)

- not registered under production `src/app`; not a deployed blog route.
- imports production `src/styles/globals.css`.
- reads production global-selector CSS Modules through `.storybook/main.ts` virtual CSS contract so Shell, rows, post parts, page headers, Note, and dormant About match the app.
- serves `design-system/fixtures` as static Storybook assets.
- uses browser-safe fixture `Post` data instead of reading `content/posts`.
- covers foundations, prose primitives, component states, and full screen compositions.
- keeps `system-preview` responsible for route-level integration and static export QA.

## Component Contract

| Component | Design class contract |
| --- | --- |
| `Shell` | `.shell` |
| `TopNav` | `.top`, `.brand`, `.dot`, `nav.nav` |
| `Footer` | `footer.foot`, `.links` |
| `ArticleRow` | `.article-list`, `a.row`, `.article-title`, `.article-desc`, `.meta`, `.cv` |
| `PostMeta` | `.post-meta`, `.tag`, `.sep` |
| `PostHero` | `.post-hero` |
| `Prose` | `.prose` |
| `NoteItem` | `.note`, `.when`, `.body` |
| `AboutGrid` | `.about-grid` |

Keep DOM class names stable until screenshot regression exists.

## Markdown Work

The Markdown renderer must follow `MARKDOWN_CONTRACT.md`.

Minimum transforms:

- frontmatter parser
- tables
- task lists
- footnotes
- code meta parser for filename
- callout blockquote transform
- mark transform for `==text==`
- safe `<kbd>` inline preservation
- image + caption figure transform
- nested unordered list rendering
- table wrapper transform
- first H1 removal
- excerpt extraction

The code filename DOM must preserve the original order from `Blog v2.html` and `System.html`:

```html
<div class="filename"><span class="lang">tsx</span><span>components/Button.tsx</span></div>
```

## Visual QA

Use `design-system/reference/blog-design/source` as acceptance criteria, not as runtime code.

Desktop checks:

- home at 924px and wider desktop
- articles with grouped years
- post detail with full Markdown fixture
- post detail without cover/description
- local-only system preview page

Mobile checks:

- 390px width home
- article rows with no-cover fallback
- post detail code/table horizontal scroll
- note grid collapse and dormant about grid collapse before About is exposed

Regression must check that:

- no text overlaps controls
- code and table do not overflow viewport
- post title wraps cleanly
- top nav remains readable
- reduced motion disables row/view animations

## Implementation Phases

1. Preserve reference archive under `design-system/reference/blog-design`. Done.
2. Import reference-derived CSS for the first renderer, then split production CSS into `src/styles` and component modules. Done.
3. Build post adapter and route renderer. Done.
4. Build home/articles/post with real content. Done.
5. Implement Markdown renderer transforms for the current fixture surface. Done.
6. Grow the local-only system preview until it covers `System.html` specimens. Done for first pass.
7. Add local-only post-detail fixture preview for Markdown/visual QA. Done for first pass.
8. Start Next App Router static migration. Done.
9. Port content adapter and Markdown renderer to TypeScript/unified. Done for first pass.
10. Split production component CSS into route/component ownership. Done for first pass.
11. Add Storybook design system catalog. Done for first pass.
12. Add production export preflight verification for type/build and local-only route leak checks. Done.
13. Add RSS/sitemap/metadata.
14. Add screenshot QA automation.

## Open Decisions

- final site name/domain/contact values
- system preview is local-only and must not be registered in App Router or deployed
- whether cover images are author-provided only or generated by site tooling
- whether to keep zero-dependency renderer or move to a Markdown-first framework after contracts stabilize
