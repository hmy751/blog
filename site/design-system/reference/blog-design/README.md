# Blog Design Reference Archive

이 폴더는 Claude Design으로 만든 `blog-design` 산출물을 이 repo 안에 보존한 reference archive다. 다음 세션에서는 외부 `../blog-design` 폴더를 다시 열기보다 이 폴더를 먼저 읽는다.

## What Is Preserved

| Path | Role |
| --- | --- |
| [source/Blog v2.html](<source/Blog v2.html>) | live blog prototype의 canonical source. 화면, CSS, React component, sample data, tweak defaults가 함께 들어 있다. |
| [source/System.html](source/System.html) | token, typography, prose primitive, component specimen을 확인하는 design-system page. |
| [source/Blog.html](source/Blog.html) | v1 prototype archive. v2 판단의 비교/이력으로만 쓴다. |
| [source/tweaks-panel.jsx](source/tweaks-panel.jsx) | Claude Design tweak UI helper. production runtime으로 가져오지 않고, prototype parameter를 복원할 때만 읽는다. |
| [uploads/draw-068da35b-8755-4088-9589-07f279249cae.png](uploads/draw-068da35b-8755-4088-9589-07f279249cae.png) | Claude Design 작업 중 남은 주석 이미지. production asset이 아니다. |
| [manifest.json](manifest.json) | 원본 파일, SHA-256, 역할, 구현 우선순위를 기록한다. |
| [notes/source-map.md](notes/source-map.md) | 다음 세션이 빠르게 원본을 읽기 위한 line-level map. |

## Reading Order

1. `manifest.json`으로 어떤 파일이 canonical인지 확인한다.
2. `notes/source-map.md`에서 필요한 영역의 line range를 찾는다.
3. 실제 판단은 반드시 `source/*.html` 원본을 열어 확인한다.
4. 구현 계약은 `site/docs/DESIGN_CONTRACT.md`와 `site/docs/MARKDOWN_CONTRACT.md`에 반영한다.

## Boundaries

- 이 폴더는 source preservation layer다. 여기 있는 HTML/JSX를 직접 production 코드로 import하지 않는다.
- `screenshots/` snapshot은 의도적으로 가져오지 않았다. 이전 `home.png/home2.png`는 상단부만 남은 stale image라 디자인 기준으로 쓰면 오해를 만든다.
- `uploads/`는 작업 주석 보존용이다. 실제 사이트 image asset이 아니다.
- `Blog v2.html`과 `System.html`이 충돌하면 `Blog v2.html`의 live UI를 우선하고, `System.html`은 primitive QA로 쓴다.
