# Blog Implementation Plan

이 문서는 디자인 시안을 실제 블로그 앱으로 옮기는 구현 계획이다. 현재 결정은 앱 코드를 `site/` 아래에만 둔다는 것이다.

## Recommended Shape

정적 생성 중심 블로그로 만든다.

- content source: `../content/posts/*.md`
- style source: `design-system/styles/index.css`
- routes: home, articles, post detail, note, about, design-system preview
- generated outputs: static HTML, RSS, sitemap, metadata

Astro 같은 Markdown-first static framework가 가장 자연스럽다. Next 기반으로 가도 되지만, 첫 구현에서는 client state가 거의 없으므로 React SPA처럼 만들 필요가 없다. `Blog v2.html`은 React prototype일 뿐, production architecture는 content build pipeline이 중심이다.

## Proposed App Structure

```text
site/
  package.json
  src/
    app.css
    config/site.ts
    content/posts.ts
    lib/posts.ts
    lib/markdown.ts
    components/
      ArticleRow.*
      Footer.*
      PostMeta.*
      Prose.*
      Shell.*
      TopNav.*
    pages/
      index.*
      articles/index.*
      articles/[slug].*
      note/index.*
      about.*
      system.*
  design-system/
    styles/
    fixtures/
  docs/
```

`src/app.css` should import:

```css
@import "../design-system/styles/index.css";
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

- optional internal preview page.
- imports `design-system/styles/system-page.css`.
- renders swatches, type samples, article row variants, post meta, note, DL grid, and Markdown fixture output.

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

Minimum plugins or transforms:

- frontmatter parser
- GFM: tables, task lists, strikethrough if needed
- footnotes
- code highlighting
- code meta parser for filename
- callout blockquote transform
- mark transform for `==text==`
- table wrapper transform
- first H1 removal
- excerpt extraction

## Visual QA

Use the design fixture as acceptance criteria, not as runtime code.

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

1. Scaffold static site under `site/`.
2. Import `design-system/styles/index.css`.
3. Build post adapter and schema validation.
4. Build home/articles/post with real content.
5. Implement Markdown renderer transforms.
6. Add note/about from config.
7. Add RSS/sitemap/metadata.
8. Add screenshot QA and Markdown fixture route.

## Open Decisions

- exact framework and package manager
- final site name/domain/contact values
- whether `/system` ships publicly or stays local-only
- whether cover images are author-provided only or generated by site tooling
