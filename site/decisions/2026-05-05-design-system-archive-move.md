# Design System Archive Path

작성일: 2026-05-05
상태: accepted

## 배경

`site/design-system/`은 이미 current source of truth가 아니었고, 문서상으로도 legacy/reference bucket이라고 정리되어 있었다. 하지만 폴더 이름 자체가 `design-system`이라 다음 작업에서 현재 디자인 시스템 source로 오해할 여지가 남아 있었다.

현재 디자인 판단은 production code, Storybook, system-preview가 맡는다. 기존 bucket은 Claude Design 원본, legacy renderer CSS snapshot, Storybook/system-preview용 local-only fixture를 보존하는 자료다.

## 문제

- `site/design-system/`이라는 위치가 current design system처럼 보일 수 있다.
- reference archive, legacy CSS, local-only fixture가 같은 bucket 안에 있어 하네스 설명을 읽기 전에는 역할이 바로 드러나지 않는다.
- Storybook과 system-preview는 fixture asset을 계속 써야 하므로 단순 삭제는 맞지 않다.
- production export에는 archive asset이나 link가 새면 안 된다.

## 결정

`site/design-system/`을 `site/archive/design-system/`으로 이동한다.

- `archive/design-system/reference/blog-design/`: Claude Design 원본 evidence archive
- `archive/design-system/styles/`: legacy Node renderer CSS snapshot
- `archive/design-system/fixtures/`: Storybook/system-preview가 공유하는 local-only QA fixture

Storybook과 system-preview의 local-only asset URL도 `/archive/design-system/fixtures/...`로 맞춘다. legacy renderer wrapper는 `/archive/design-system/styles/index.css`를 보도록 바꾼다. production verify는 `/archive/` output/link가 새지 않는지 검사한다.

## 적용 범위

영향받는 영역:

- site archive directory map
- Storybook static asset mapping
- system-preview fixture read/sync path
- legacy renderer dev/build wrapper
- production verify leak guard
- site docs, decisions, site agents

## 비목표

- archived CSS를 current production CSS로 되살리지 않는다.
- fixture Markdown과 fixture asset을 실제 `content/posts`나 public route data로 승격하지 않는다.
- Storybook을 archive로 옮기지 않는다. Storybook은 current 디자인 시스템 카탈로그로 남긴다.
- `system-preview`를 production route로 등록하지 않는다.

## 후속 점검

- `rg`로 남은 `site/design-system`, `/design-system/`, `../design-system` 참조를 확인한다.
- `npm run check`로 TypeScript path 변경을 확인한다.
- `npm run build:storybook`으로 archive fixture staticDir를 확인한다.
- `npm run build:system`으로 system-preview fixture sync와 local-only route build를 확인한다.
- `npm run verify`로 production export에 `/archive/`, `/design-system/`, `/system`, `/about`이 새지 않는지 확인한다.
