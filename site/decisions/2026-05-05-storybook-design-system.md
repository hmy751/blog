---
date: 2026-05-05
scope: site design system preview
---

# Storybook Design System Surface

2026-05-05 업데이트: 이 결정 이후 `design-system/`의 현재 역할은 `2026-05-05-design-system-legacy-boundary.md`에서 정리한다. Storybook과 production code가 현재 디자인 시스템 기준이고, `design-system/fixtures`는 아직 공유되는 local-only fixture asset bucket으로만 쓴다.

## Background

The site already has a local-only `system-preview` Next app for checking design tokens, prose primitives, article rows, and example post rendering. As the production site grows, the preview page is becoming a combined demo and route integration surface.

## Missed Problem

`system-preview` is useful for checking that production components, global styles, and the Markdown renderer work together, but it is less suited to cataloging isolated states:

- `ArticleRow` with cover, no cover, compact, long title, and mobile fallback.
- `PostMeta`, `PostHero`, and `PostFooter` with optional data missing.
- Token, type, spacing, prose, and screen compositions as separate review targets.
- Page-level compositions that should use fixtures instead of reading `content/posts` at browser runtime.

## Decision

Add Storybook as the design system catalog for the site.

- Use `@storybook/nextjs-vite`.
- Import production `src/styles/globals.css` in Storybook preview.
- Add a Storybook Vite virtual CSS contract that reads production global-selector CSS Modules and strips CSS Module `:global(...)` wrappers for Storybook preview.
- Serve `design-system/fixtures` as Storybook static assets.
- Keep stories under `src/stories`.
- Use fixture `Post` data instead of reading or rewriting `content/posts`.
- Keep `system-preview` as local-only route and Markdown integration QA.
- Add a Storybook parity story that imports `system-preview/app/system/system.module.css` directly so the design-system overview matches the existing `/system` page.

## Non-goals

- Do not expose `/system` in the production App Router.
- Do not replace `system-preview` with Storybook yet.
- Do not mutate root `content/posts` to satisfy design states.
- Do not revive prototype-only thumbnail variants in production.

## Follow-up Checks

- Run `npm run build:storybook`.
- Keep `npm run build`, `npm run build:system`, and `npm run check` green.
- Add visual regression after page screenshots and story coverage stabilize.
