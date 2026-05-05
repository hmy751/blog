# Blog Design Source Map

이 문서는 원본을 대체하지 않는다. 다음 세션이 `source/*.html`에서 필요한 부분을 빠르게 찾기 위한 지도다.

## `source/Blog v2.html`

Canonical live prototype. 구현 기준을 확인할 때 먼저 연다.

| Lines | Area | Notes |
| --- | --- | --- |
| 14-67 | foundation tokens | color, font, measure, radius, dark theme tokens. |
| 70-115 | shell/top/nav/footer | page shell, brand dot, nav current state, footer links. |
| 117-303 | prose | paragraph, lead, heading, blockquote, code, list, task, table, kbd, callout, figure, footnote, code filename, serif body variant. |
| 334-516 | article list variants | base row and `aside`, `leading`, `inline`, `magazine`, `peek`. Live default is `aside`. |
| 524-567 | post layout | post meta, hero, title, subtitle, footer/next link. |
| 570-620 | mark/about/note styles | mark, about grid, note list. |
| 622-667 | motion | view fade, row cascade, note cascade, reduced motion. |
| 682-718 | `SITE` | prototype site name, intro, links. Use as design signal only; production copy comes from site config. |
| 720-757 | `ARTICLES` | prototype article data and cover examples. Do not use as production content. |
| 759-766 | `NOTES` | prototype note examples. Do not use as production content. |
| 768-883 | `ArticleRow` | all thumbnail variants. `aside` is the adopted default. |
| 885-918 | `Home` | intro, Featured, Recent, all articles link. |
| 920-940 | `Articles` | year grouping, archive title/subtitle, `MM.DD` date format. |
| 942-1159 | `Post` | meta, hero, title/subtitle, prose examples, post footer. |
| 1161-1185 | `About` | about prose and `dl.about-grid`. |
| 1187-1205 | `Note` | note list view. |
| 1207-1216 | `TWEAK_DEFAULTS` | light, sans, measure 680, font 17, accent hue 140, regular, motion on, thumb aside. |
| 1218-1320 | `App` | route state, body dataset, CSS variable updates, top nav, footer, tweak controls. |

## `source/System.html`

Design-system/prose QA reference. Live UI conflicts defer to `Blog v2.html`.

| Lines | Area | Notes |
| --- | --- | --- |
| 14-111 | foundation and shell CSS | token baseline and system page layout. |
| 114-263 | prose primitive CSS | compact primitive variants for system specimens. |
| 275-321 | article-list specimen CSS | component demo row differs from live `aside` sizing. |
| 394-518 | system page CSS | system hero, TOC, swatches, type rows, specs, principles. |
| 546-549 | TOC | tokens, typography, spacing, prose, components. |
| 615-687 | typography | display/body/mono samples. |
| 689-797 | prose examples | inline elements, headings, quote, lists, task list, code block, callouts, table, figure, footnote. |
| 799-895 | component specimens | article row, post hero, post meta. |

## `source/Blog.html`

V1 prototype archive. Use only to understand what changed before v2.

- It has older shell/prose/list decisions.
- It is lower priority than `Blog v2.html`.
- Do not copy v1 decisions into implementation unless a later contract explicitly revives them.

## `source/tweaks-panel.jsx`

Claude Design helper for tweakable prototypes.

| Lines | Area | Notes |
| --- | --- | --- |
| 2-36 | usage comment | shows `EDITMODE` defaults and control usage. |
| 44-134 | panel CSS injection | floating tweak panel UI. |
| 137-150 | `useTweaks` | in-prototype state and host persistence bridge. |
| 153-248 | `TweaksPanel` | floating shell and dragging behavior. |
| 250-424 | controls | section, row, slider, toggle, radio, select, text, number, color, button. |

Production does not import this file. Use it only to recover the design parameter space.
