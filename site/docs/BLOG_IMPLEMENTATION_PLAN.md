# Blog Implementation Plan

이 문서는 `site/design-system/reference/blog-design/source`의 Claude Design 원본을 실제 블로그 앱으로 옮기는 구현 계획이다. 현재 결정은 앱 코드를 `site/` 아래에만 두고, 원본 reference archive와 구현 CSS/renderer를 분리한다는 것이다.

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
- style source: `design-system/styles/index.css`
- routes: home, articles, post detail, note, about, design-system preview
- fixture routes: `/system/example-article/` for post-detail QA without touching real posts
- generated outputs: static HTML, RSS, sitemap, metadata

현재 첫 구현은 zero-dependency Node ESM static renderer다.

| File | Role |
| --- | --- |
| `src/content.mjs` | `content/posts` adapter, frontmatter parse, slug/date/tag/description fallback |
| `src/markdown.mjs` | Markdown -> prose HTML transform |
| `src/render.mjs` | route renderer for home/articles/post/note/about/system |
| `scripts/dev.mjs` | local HTTP dev server |
| `scripts/build.mjs` | static route generation to `dist/` |

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

The HTML shell imports:

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

### `/about`

- `prose` page using `about-grid`.
- profile/contact values live in `src/config/site.ts`.

### `/system`

- internal preview page.
- imports `design-system/styles/system-page.css`.
- renders `System.html`-level specimens: swatches, type samples, spacing/radius, prose primitives, article row, live aside row, post hero/meta, note, DL grid, principles.
- renders the Markdown fixture output through the same prose CSS under `Markdown QA`.
- uses `shell-system` width so the preview can follow `System.html`'s wider measure without changing live blog pages.
- links to `/system/example-article/` for full post-detail flow QA.

### `/system/example-article`

- site-only example article route.
- reads `design-system/fixtures/example-article.md`.
- uses the same post detail DOM, cover image, Markdown renderer, and prose CSS as production posts.
- does not read from or write to `content/posts`.

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
- system preview page

Mobile checks:

- 390px width home
- article rows with no-cover fallback
- post detail code/table horizontal scroll
- note/about grid collapse

Regression must check that:

- no text overlaps controls
- code and table do not overflow viewport
- post title wraps cleanly
- top nav remains readable
- reduced motion disables row/view animations

## Implementation Phases

1. Preserve reference archive under `design-system/reference/blog-design`. Done.
2. Import `design-system/styles/index.css`. Done.
3. Build post adapter and route renderer. Done.
4. Build home/articles/post with real content. Done.
5. Implement Markdown renderer transforms for the current fixture surface. Done.
6. Grow `/system` until it covers `System.html` specimens. Done for first pass.
7. Add post-detail fixture route for Markdown/visual QA. Done for first pass.
8. Add RSS/sitemap/metadata.
9. Add screenshot QA automation.

## Open Decisions

- final site name/domain/contact values
- whether `/system` ships publicly or stays local-only
- whether cover images are author-provided only or generated by site tooling
- whether to keep zero-dependency renderer or move to a Markdown-first framework after contracts stabilize
