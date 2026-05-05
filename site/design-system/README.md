# Legacy Design System Archive

이 폴더는 삭제하지 않는 legacy/reference bucket이다. 현재 production UI/스타일 판단의 source of truth는 `../src/`, `../src/styles/`, component CSS Modules, `../src/stories/`, `../.storybook/`에 있다.

`reference/blog-design/`는 Claude Design 원본 archive다. 원형 판단을 복원해야 할 때는 외부 `../blog-design` 폴더보다 이 archive의 `manifest.json`, `notes/source-map.md`, `source/*.html`을 먼저 읽는다. 단, archive는 evidence layer이고 현재 구현 계약 자체가 아니다.

## Source Areas

- `reference/blog-design/source/Blog v2.html`: live prototype evidence.
- `reference/blog-design/source/System.html`: token, typography, prose, component primitive evidence.
- `reference/blog-design/source/Blog.html`: v1 prototype archive. 새 구현 기준으로 쓰지 않는다.
- `reference/blog-design/source/tweaks-panel.jsx`: prototype control surface. production runtime에 포함하지 않는다.
- `styles/`: legacy Node renderer CSS snapshot.
- `fixtures/`: Storybook과 system-preview가 아직 공유하는 local-only QA asset bucket.

## Files

| Path | Role |
| --- | --- |
| `styles/index.css` | legacy renderer entrypoint |
| `styles/*.css` | legacy renderer와 과거 이관 과정을 보존하는 CSS snapshot |
| `fixtures/post-markdown-fixture.md` | local-only Markdown QA fixture |
| `fixtures/component-anatomy-placeholder.svg` | local-only fixture figure asset |
| `fixtures/example-article.md` | 실제 원고와 분리된 local-only 글 상세 QA fixture |
| `fixtures/example-article-cover.svg` | local-only cover image fixture |
| `fixtures/example-article-diagram.svg` | local-only figure image fixture |

## Current Adoption Rule

Next production 앱은 `../src/styles/`와 CSS Modules를 쓴다. `styles/index.css`는 legacy renderer에서만 사용한다. local-only system preview는 `../system-preview/`에서 production `src/styles`와 `src/components`를 다시 import한다. Storybook은 `../.storybook/`과 `../src/stories/`에서 production CSS/component contract를 확인한다.

새 UI/스타일 작업에서는 이 폴더의 CSS를 production으로 복사하지 않는다. 필요한 판단은 현재 `src/styles`, component CSS Modules, Storybook story에서 먼저 확인하고, 원형 의도를 복원해야 할 때만 `reference/blog-design`를 evidence로 읽는다.

fixture Markdown과 fixture asset은 QA 자산이다. 실제 `content/posts` 원고, public route data, current design source로 승격하지 않는다.

## Non Goals

- legacy 파일을 현재 단계에서 삭제하지 않는다.
- 디자인 fixture의 sample content를 실제 블로그 content로 쓰지 않는다.
- `fixtures/example-article.md`는 local-only `/system/example-article/` 확인용이며 production App Router나 `/articles` archive에 넣지 않는다.
- 원고를 디자인에 맞추기 위해 rewrite하지 않는다.
- `tweaks-panel.jsx`를 앱 runtime에 넣지 않는다.
