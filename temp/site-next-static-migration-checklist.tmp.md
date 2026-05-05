# Site Next Static Migration Checklist

Date: 2026-05-05

Primary plan: [site-next-static-migration-plan.tmp.md](site-next-static-migration-plan.tmp.md)

Core references:

- [site/docs/platform-boundary.md](../site/docs/platform-boundary.md)
- [site/docs/BLOG_IMPLEMENTATION_PLAN.md](../site/docs/BLOG_IMPLEMENTATION_PLAN.md)
- [site/docs/CONTENT_CONTRACT.md](../site/docs/CONTENT_CONTRACT.md)
- [site/docs/DESIGN_CONTRACT.md](../site/docs/DESIGN_CONTRACT.md)
- [site/docs/MARKDOWN_CONTRACT.md](../site/docs/MARKDOWN_CONTRACT.md)
- [site/design-system/reference/blog-design/notes/source-map.md](../site/design-system/reference/blog-design/notes/source-map.md)
- [site/design-system/reference/blog-design/source/Blog v2.html](../site/design-system/reference/blog-design/source/Blog%20v2.html)
- [site/design-system/reference/blog-design/source/System.html](../site/design-system/reference/blog-design/source/System.html)
- [site/design-system/reference/blog-design/source/Blog.html](../site/design-system/reference/blog-design/source/Blog.html)

## 0. Guardrails

- [ ] Keep `content/posts/*.md` as the source of truth.
- [ ] Do not silently rewrite posts or frontmatter.
- [ ] Preserve current public route contract, excluding local-only system preview from deployment.
- [ ] Preserve design class contract until screenshot QA exists.
- [ ] Do not adopt Tailwind in phase 1.
- [x] Do not let system-preview CSS leak into production routes.
- [ ] Treat `Blog v2.html` as live UI reference, `System.html` as system/prose reference, `Blog.html` as archive only.

## 1. Planning And Docs

- [x] Add a `site/decisions/` record for Next static migration and style ownership split.
- [x] Draft or add `site/docs/DESIGN_INVENTORY.md`.
- [x] Update `site/docs/BLOG_IMPLEMENTATION_PLAN.md` once Next migration starts.
- [x] Update `site/README.md` after build scripts and stack are changed.
- [ ] Revisit `CONTENT_CONTRACT.md` if `content/assets` is introduced.
- [ ] Revisit `MARKDOWN_CONTRACT.md` if Markdown conventions change.
- [ ] Revisit `DESIGN_CONTRACT.md` for intentional reference differences.

## 2. Next Static Scaffold

- [x] Create Next App Router scaffold inside `site/`.
- [x] Add `next.config.mjs` with static export settings.
- [x] Add TypeScript config.
- [x] Replace old build script only when Next route parity is ready.
- [x] Keep old Node renderer files until Next output is verified.

## 3. Content Adapter

- [x] Port `site/src/content.mjs` behavior to `src/lib/posts.ts`.
- [x] Read from `../content/posts`.
- [x] Derive slug from `YYYY-MM-DD-slug.md`.
- [x] Exclude `date: TBD` from public routes.
- [x] Preserve `primaryTag`, `description`, `featured`, `cover`, `readTime` fallback rules.
- [x] Add or plan filename date vs frontmatter date validation.

## 4. Markdown Pipeline

- [x] Replace hand-written parser with `gray-matter` + `unified`/`remark`/`rehype`.
- [x] Support GFM tables, task lists, and footnotes.
- [x] Support callouts from `> [!NOTE]` and `> [!WARNING]`.
- [x] Support code fence language.
- [x] Support code fence title/filename DOM.
- [x] Support image + caption figure convention.
- [x] Support `==mark==`.
- [x] Escape or reject raw HTML by default, except explicit safe transforms.
- [x] Compare fixture rendering with current system/example article.

## 5. Routes

- [x] `src/app/layout.tsx`
- [x] `src/app/page.tsx`
- [x] `src/app/articles/page.tsx`
- [x] `src/app/articles/[slug]/page.tsx`
- [x] `src/app/note/page.tsx`
- [x] `src/app/about/page.tsx`
- [x] Production App Router excludes `/system` and `/system/example-article`.
- [x] Local-only system preview runs through `npm run dev:system`.
- [x] Local-only system static preview builds through `npm run build:system`.
- [x] `generateStaticParams()` covers all public posts.

## 6. Components And CSS Ownership

- [x] Move shell/nav/footer to `components/shell`.
- [x] Move article list/row to `components/article-row`.
- [x] Move post meta/hero/footer to `components/post`.
- [x] Keep `tokens.css`, `base.css`, `prose.css` global.
- [x] Move production component styles into CSS Modules.
- [x] Keep `system-page.css` in the system-only preview layer, outside production App Router imports.
- [x] Keep only `aside` in production `ArticleRow`.
- [x] Archive or quarantine `leading`, `inline`, `magazine`, `peek`.

## 7. Images And Assets

- [ ] Decide whether to introduce `content/assets`.
- [ ] If yes, add prebuild copy to `site/public/images`.
- [x] Render Markdown images as plain `<img>` initially.
- [x] Render cover images through the current post hero design.
- [ ] Keep image filenames ASCII.
- [ ] Keep image files compressed for Cloudflare Pages.

## 8. Reference Reconciliation

- [ ] Compare production shell/top/nav/footer with `Blog v2.html`.
- [ ] Compare home sequence with `Blog v2.html`.
- [ ] Compare article row `aside` with `Blog v2.html`.
- [ ] Compare articles year grouping with `Blog v2.html`.
- [ ] Compare post sequence with `Blog v2.html`.
- [ ] Compare note/about layouts with `Blog v2.html`.
- [ ] Compare tokens with `System.html`.
- [ ] Compare prose primitives with `System.html`.
- [ ] Compare code filename DOM order with `System.html`.
- [ ] Compare callout/table/figure/footnote specimens with `System.html`.
- [ ] Check `Blog.html` only for unclear historical regressions.
- [ ] Document intentional differences.

## 9. Build And Visual QA

- [x] `npm run build` creates static output.
- [x] Home desktop/mobile checked.
- [x] Articles desktop/mobile checked.
- [ ] Article row with cover checked.
- [x] Article row without cover checked.
- [x] Post without cover checked.
- [x] Post with cover checked.
- [x] Code block with filename checked.
- [x] Table overflow checked.
- [x] Image + caption checked.
- [x] Callout info/warn checked.
- [x] Footnotes checked.
- [x] Local-only system preview checked.
- [x] No obvious overlap, viewport overflow, or broken nav/footer layout.

## 10. Cutover

- [ ] Old `site/src/*.mjs` no longer needed.
- [ ] Old `site/scripts/*.mjs` no longer needed.
- [x] `npm run build` points to the Next build/export path.
- [x] Deployment output directory is updated from `dist` to `out` if needed.
- [ ] `site/dist` is removed or ignored after Next export is adopted.
- [ ] Cloudflare Pages build settings are documented.
