# Design Inventory

작성일: 2026-05-05

이 문서는 Next static migration 동안 디자인 source와 CSS ownership을 헷갈리지 않기 위해 만든 이관 기록이다. 현재 운영 기준은 `DESIGN_CONTRACT.md`와 `decisions/2026-05-05-design-system-legacy-boundary.md`를 따른다.

요약: `src/styles/`, component CSS Modules, `.storybook/`, `src/stories/`, `system-preview/`가 현재 기준이다. `design-system/`은 삭제하지 않는 legacy/reference bucket이다.

## Ownership Table

| Current source | Classification | Next target | Notes |
| --- | --- | --- | --- |
| `design-system/styles/tokens.css` | legacy token/foundation snapshot | `src/styles/tokens.css` | Current global source is in `src/styles`. |
| `design-system/styles/base.css` | legacy base + shell global snapshot | `src/styles/base.css`, `components/shell` | Current reset/body source is global; Shell selectors live with components. |
| `design-system/styles/prose.css` | legacy Markdown/prose primitive snapshot | `src/styles/prose.css` | Current prose source is `src/styles/prose.css`. |
| `design-system/styles/blog-components.css` | legacy mixed production pages/components snapshot | CSS Modules under `components/**` and route modules | Current component source is CSS Modules and route modules. |
| `design-system/styles/system-page.css` | archived system-preview source | `system-preview/app/system/system.module.css` | Keep as reference-derived source; production routes do not import it. |
| `src/render.mjs` shell helpers | production shell | `components/shell/Shell.tsx` | Keep `.shell`, `.top`, `.brand`, `.dot`, `.nav`, `.foot`. |
| `src/render.mjs` page helpers | production routes | `src/app/**/page.tsx` | Route ownership becomes file-system visible. |
| `system-preview/app/**` | system-preview only | local-only Next app | Imports production components/lib/styles without registering production `/system`. |
| `.storybook/**`, `src/stories/**` | Storybook only | design system catalog | Uses production CSS/components with browser-safe fixtures. Does not read or rewrite `content/posts`. |
| `src/render.mjs` `articleRow()` | production component | `components/article-row/ArticleRow.tsx` | Ship only live `aside` variant. |
| `src/content.mjs` | content adapter | `src/lib/posts.ts` | Reads `../content/posts`, never rewrites. |
| `src/markdown.mjs` | Markdown renderer | `src/lib/markdown.ts` | Replace with unified pipeline and custom transforms. |
| `design-system/reference/blog-design/source/Blog v2.html` | live UI reference | read-only | Canonical visual reference. |
| `design-system/reference/blog-design/source/System.html` | system/prose reference | read-only | Token/prose/component primitive reference. |
| `design-system/reference/blog-design/source/Blog.html` | prototype archive | read-only | Historical reference only. |

## Production Component Buckets

- Shell: `.shell`, `.top`, `.brand`, `.dot`, `nav.nav`, `footer.foot`.
- Home: `.home-intro`, `.featured`, `.section-label`, `.more-link`.
- Article list: `.article-list`, `a.row`, `.article-title`, `.article-desc`, `.meta`, `.cv`, `.cv-spacer`.
- Post: `.post-meta`, `.post-hero`, `.post-title`, `.post-sub`, `.post-footer`.
- Note: `.notes`, `.note`, `.when`, `.body`.
- Dormant About: `.about-grid`.
- Motion: `.view`, row/note stagger animation, reduced motion guard.

## Storybook Catalog Buckets

- Foundations: color tokens, dark token state, typography, spacing.
- Prose: inline elements, callout states, Markdown fixture through `markdownToHtml`.
- Components: Shell, article rows, post parts, note rows, about grid.
- Screens: Home, mobile Home, Articles, Post detail, Note empty, dormant About.
- System Page: parity story that imports `system-preview/app/system/system.module.css` directly.
- CSS parity: `.storybook/main.ts` exposes production global-selector CSS Modules through `virtual:production-contract.css`.

## Prototype Or Archive Only

These selectors should not move into production CSS Modules unless a later decision revives them:

- `data-thumb="leading"`
- `data-thumb="inline"`
- `data-thumb="magazine"`
- `data-thumb="peek"`
- `tweaks-panel.jsx` runtime controls

## Local System Preview Only

The following are system preview surface and should stay out of production App Router routes:

- `.shell-system`
- `.sys-page`
- `.sys-hero`
- `.sys-toc`
- `.sys-sec`
- `.sys-grid-*`
- `.sys-spec*`
- `.sys-principles`
- `data-thumb="system-demo"`

## Migration Rule

Keep class names stable until screenshot QA exists, but move selector ownership closer to the component or route that owns the DOM. The first migration goal is clarity and parity, not visual redesign.
