# Design System Legacy Boundary

작성일: 2026-05-05
상태: accepted

## 배경

`site/design-system/`은 처음에는 Claude Design 산출물을 실제 구현용 CSS와 Markdown fixture로 옮기기 위해 만들었다. 이후 사이트는 Next.js App Router로 이관되었고, production 스타일은 `src/styles/`와 component CSS Modules로 이동했다. 같은 날 Storybook도 추가되어 토큰, prose, component state, screen composition을 확인하는 현재 디자인 시스템 카탈로그가 되었다.

이 과정 뒤에도 `site/design-system/`이라는 이름과 일부 문서 문구가 남아 있어, legacy reference와 현재 구현 기준이 섞여 해석될 위험이 생겼다.

## 결정

`site/design-system/`은 삭제하지 않고 보존한다. 단, 현재 디자인 판단의 source of truth로 쓰지 않는다.

- 현재 production 구현 기준은 `src/`, `src/styles/`, `src/components/`, `src/app/`, `src/lib/`가 소유한다.
- 현재 디자인 시스템 카탈로그는 `.storybook/`과 `src/stories/`가 소유한다.
- route-level Markdown/rendering 결합 QA는 `system-preview/`가 소유한다.
- `design-system/reference/blog-design/`는 Claude Design 원본 evidence archive다.
- `design-system/styles/`는 legacy Node renderer와 과거 이관 과정을 보존하는 reference-derived CSS snapshot이다.
- `design-system/fixtures/`는 Storybook과 system-preview가 아직 공유하는 local-only fixture asset bucket이다. 여기 있는 Markdown과 asset은 QA fixture이며 production content나 current design source가 아니다.

## 적용 규칙

- 새 UI/스타일 작업은 Storybook story와 production CSS/component를 먼저 본다.
- `design-system/reference/blog-design`는 원형 판단을 복원해야 할 때만 evidence로 읽는다.
- `design-system/styles`를 production CSS로 다시 복사하지 않는다. 필요한 경우 현재 `src/styles`와 Storybook에서 재검토한 뒤 고친다.
- `design-system/fixtures`는 local-only QA 자산으로만 쓴다. fixture 문장을 실제 원고나 public route data로 승격하지 않는다.
- legacy Node renderer 파일은 보존하되 package scripts에는 노출하지 않는다. 새로운 구현 판단의 기준으로 삼지 않는다.

## 비목표

- 이번 결정에서 legacy 파일을 삭제하지 않는다.
- fixture asset 경로를 즉시 이동하지 않는다.
- `system-preview`를 Storybook으로 대체하지 않는다.
- Claude Design prototype variant를 production 요구사항으로 되살리지 않는다.

## 후속 점검

- site 진입 문서가 `design-system`을 active source로 설명하지 않는지 확인한다.
- `MARKDOWN_CONTRACT.md`와 `DESIGN_CONTRACT.md`가 Storybook/production source를 현재 기준으로 설명하는지 확인한다.
- `npm run build`, `npm run build:storybook`, `npm run build:system`을 변경 후 확인한다.
