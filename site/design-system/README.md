# Site Design System

이 폴더는 `../../../blog-design/Blog v2.html`과 `../../../blog-design/System.html`에서 추출한 실제 구현용 디자인 시스템이다.

## Source

- `Blog v2.html`: live blog UI 기준.
- `System.html`: token, typography, prose, component QA 기준.
- `Blog.html`: v1 prototype. 여기에 반영하지 않는다.
- `tweaks-panel.jsx`: prototype control surface. production runtime에 포함하지 않는다.

## Files

| Path | Role |
| --- | --- |
| `styles/index.css` | 앱에서 import할 entrypoint |
| `styles/tokens.css` | color, type, spacing, radius, semantic CSS variables |
| `styles/base.css` | reset, body, shell, top nav, footer |
| `styles/prose.css` | post detail Markdown/prose rendering |
| `styles/blog-components.css` | home/articles/post/note/about components |
| `styles/system-page.css` | 디자인 시스템 문서/preview page 전용 styles |
| `fixtures/post-markdown-fixture.md` | Markdown renderer QA fixture |

## Adoption Rule

첫 site scaffold에서는 `styles/index.css`를 전역 stylesheet로 가져온다. framework font loader를 쓰는 경우 `index.css`의 font imports는 앱 레이아웃으로 옮겨도 된다.

CSS class names는 prototype의 이름을 유지한다. 구현 중 컴포넌트 이름은 자유롭게 바꿀 수 있지만 DOM class contract는 screenshot regression이 생길 때까지 유지한다.

## Non Goals

- 디자인 fixture의 sample content를 실제 블로그 content로 쓰지 않는다.
- 원고를 디자인에 맞추기 위해 rewrite하지 않는다.
- `tweaks-panel.jsx`를 앱 runtime에 넣지 않는다.
