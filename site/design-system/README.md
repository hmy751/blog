# Site Design System

이 폴더는 `reference/blog-design/source/Blog v2.html`과 `reference/blog-design/source/System.html`에서 추출한 실제 구현용 디자인 시스템이다.

`reference/blog-design/`는 Claude Design 원본 archive다. 다음 세션에서 디자인 판단을 다시 확인할 때는 외부 `../blog-design` 폴더보다 이 archive의 `manifest.json`, `notes/source-map.md`, `source/*.html`을 먼저 읽는다.

## Source

- `reference/blog-design/source/Blog v2.html`: live blog UI 기준.
- `reference/blog-design/source/System.html`: token, typography, prose, component QA 기준.
- `reference/blog-design/source/Blog.html`: v1 prototype. 여기에 반영하지 않는다.
- `reference/blog-design/source/tweaks-panel.jsx`: prototype control surface. production runtime에 포함하지 않는다.

## Files

| Path | Role |
| --- | --- |
| `styles/index.css` | legacy/system preview entrypoint |
| `styles/tokens.css` | color, type, spacing, radius, semantic CSS variables |
| `styles/base.css` | reset, body, shell, top nav, footer |
| `styles/prose.css` | post detail Markdown/prose rendering |
| `styles/blog-components.css` | home/articles/post/note/about components |
| `styles/system-page.css` | 디자인 시스템 문서/preview page 전용 styles |
| `fixtures/post-markdown-fixture.md` | Markdown renderer QA fixture |
| `fixtures/component-anatomy-placeholder.svg` | fixture figure가 dev/build에서 깨지지 않도록 쓰는 placeholder asset |
| `fixtures/example-article.md` | 실제 원고와 분리된 글 상세 페이지 QA fixture |
| `fixtures/example-article-cover.svg` | 예시 글 cover image fixture |
| `fixtures/example-article-diagram.svg` | 예시 글 figure image fixture |

## Adoption Rule

Next production 앱은 `src/styles/`와 CSS Modules를 쓴다. `styles/index.css`는 legacy renderer와 local-only system preview에서만 사용한다. framework font loader를 쓰는 경우 `index.css`의 font imports는 앱 레이아웃으로 옮겨도 된다.

CSS class names는 prototype의 이름을 유지한다. 구현 중 컴포넌트 이름은 자유롭게 바꿀 수 있지만 DOM class contract는 screenshot regression이 생길 때까지 유지한다.

원본과 CSS가 충돌하면 `reference/blog-design/notes/source-map.md`로 line range를 찾고, `source/*.html` 원본을 다시 확인한 뒤 `docs/DESIGN_CONTRACT.md`에 결정 이유를 남긴다.

## Non Goals

- 디자인 fixture의 sample content를 실제 블로그 content로 쓰지 않는다.
- `fixtures/example-article.md`는 local-only `/system/example-article/` 확인용이며 production App Router나 `/articles` archive에 넣지 않는다.
- 원고를 디자인에 맞추기 위해 rewrite하지 않는다.
- `tweaks-panel.jsx`를 앱 runtime에 넣지 않는다.
