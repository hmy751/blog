# Blog Design Reference Import

## Background

`../blog-design`는 Claude Design으로 만든 블로그 prototype과 design-system page를 담고 있다. 이전 방식은 매 세션마다 외부 폴더의 HTML 일부를 다시 열고 필요한 부분만 요약하는 흐름이라, 원본의 장점이 누락되거나 screenshots 같은 낮은 우선순위 자료가 기준처럼 오해될 수 있었다.

## Decision

`site/design-system/reference/blog-design/`에 Claude Design 원본 산출물을 repo 내부 reference archive로 보존한다.

- `source/Blog v2.html`: canonical live prototype.
- `source/System.html`: token/prose/component primitive QA.
- `source/Blog.html`: v1 archive.
- `source/tweaks-panel.jsx`: design parameter helper.
- `uploads/`: 작업 주석 보존. production asset이 아니다.
- `screenshots/`: 가져오지 않는다. 기존 `home.png/home2.png`는 stale top-only snapshot이라 비교 기준으로 쓰지 않는다.

## Scope

이 archive는 source evidence layer다. 실제 구현 계약은 `site/docs/DESIGN_CONTRACT.md`, `site/docs/MARKDOWN_CONTRACT.md`, `site/design-system/styles/`가 소유한다.

## Non Goals

- 원본 HTML/JSX를 production runtime에 import하지 않는다.
- prototype sample content를 production content로 쓰지 않는다.
- annotation image를 사이트 이미지 asset으로 쓰지 않는다.

## Follow-Up

다음 비교 작업은 `manifest.json`과 `notes/source-map.md`를 먼저 읽고, 필요한 판단은 `source/*.html` 원본 line을 직접 확인한다.
