# 디자인 시스템 구현 레이어 반입

작성일: 2026-05-04
관련 커밋: 89f9d3d
상태: accepted

## 배경

`../blog-design`에는 `Blog v2.html`과 `System.html` 형태로 커스텀 블로그의 디자인 시안과 상세 글 Markdown/prose 요소가 이미 들어 있었다. 사이트 앱을 만들기 전에 이 기준을 단순 참고 문서가 아니라 `site/` 안의 구현 가능한 design system layer로 가져올 필요가 있었다.

2026-05-05에 원본 Claude Design 산출물은 `site/design-system/reference/blog-design/`에도 보존했다. 이 decision은 구현 CSS layer 반입 결정이고, 원본 보존 결정은 `2026-05-05-blog-design-reference-import.md`가 소유한다.

## 문제

HTML 시안을 그대로 보며 구현하면 아래 문제가 생길 수 있다.

- prototype의 sample data를 실제 content처럼 착각할 수 있다.
- `System.html`의 component demo 값과 `Blog v2.html`의 live 화면 값이 충돌할 수 있다.
- 상세 글의 Markdown 요소를 구현 중 누락할 수 있다.
- `tweaks-panel.jsx` 같은 prototype control surface가 production runtime에 들어갈 수 있다.
- renderer가 해야 할 일을 원고 HTML 증가로 해결할 수 있다.

## 결정

`site/design-system/`을 추가한다.

- `styles/index.css`: 앱에서 import할 design system entrypoint.
- `styles/tokens.css`: color/type/spacing/radius token.
- `styles/base.css`: shell, top nav, footer, base reset.
- `styles/prose.css`: 상세 글 Markdown/prose rendering.
- `styles/blog-components.css`: home/articles/post/note/about component styles.
- `styles/system-page.css`: 추후 `/system` preview page styles.
- `fixtures/post-markdown-fixture.md`: Markdown renderer QA fixture.

또한 `site/docs/MARKDOWN_CONTRACT.md`와 `site/docs/BLOG_IMPLEMENTATION_PLAN.md`를 추가해 실제 build path와 Markdown transform 규칙을 분리했다.

## 범위

적용 범위:

- 커스텀 블로그 site scaffold 전 준비.
- 디자인 시스템 CSS import.
- Markdown renderer 구현.
- home/articles/post/note/about route 구현.
- visual regression 기준 정리.

영향받은 파일:

- `site/design-system/`
- `site/docs/DESIGN_CONTRACT.md`
- `site/docs/CONTENT_CONTRACT.md`
- `site/docs/MARKDOWN_CONTRACT.md`
- `site/docs/BLOG_IMPLEMENTATION_PLAN.md`
- `site/docs/platform-boundary.md`
- `site/README.md`
- `site/CLAUDE.md`

## 비목표

- 이 결정 자체에서는 framework를 확정하거나 scaffold하지 않는다.
- 원본 reference archive의 HTML/JSX를 수정하지 않는다.
- prototype sample `SITE`, `ARTICLES`, `NOTES`를 실제 content로 쓰지 않는다.
- `tweaks-panel.jsx`를 production runtime에 넣지 않는다.
- 원고를 디자인에 맞추기 위해 rewrite하지 않는다.

## 근거

- `Blog v2.html`은 live 화면 구조와 default tweak 값, post/detail page, article row variants를 포함한다.
- `System.html`은 color, typography, prose, component examples를 문서화한다.
- 현재 `content/posts`는 `description`, `cover`, `featured`가 거의 없으므로 adapter fallback이 필요하다.
- 상세 글 시안에는 table, code filename, callout, task list, figure, footnote 등 Markdown renderer가 책임져야 할 요소가 포함되어 있다.

## 후속 점검

- 실제 scaffold가 `design-system/styles/index.css`를 import하는가.
- Markdown fixture가 실제 renderer로 깨지지 않고 렌더링되는가.
- no-cover/no-description 실제 글이 home/articles/post에서 자연스럽게 보이는가.
- `/system` preview page가 live CSS와 같은 source를 쓰는가.
- screenshot QA가 desktop/mobile post detail overflow를 잡는가.
