# Site Design System Engineer Agent

작성일: 2026-05-05
상태: accepted

## 배경

site 디자인 정합성 작업은 단순 token 정리가 아니라 production UI, Storybook, system-preview, Markdown/prose, CSS Modules, App Router route가 함께 움직이는 문제다. 특히 `prose.css`나 article row처럼 한 파일을 고쳐도 실제 글 상세, Storybook fixture, local-only preview, mobile overflow, static export 검증으로 파생 영향이 번질 수 있다.

기존 site 하네스는 agent 자리를 마련해 두었지만 활성 agent는 없었다. 디자인 정합성을 맞추기 전에, 디자인 시스템과 프론트엔드 구현 양쪽을 읽는 전문가 역할을 site agent로 둘 필요가 생겼다.

## 문제

- 디자인 reference, legacy CSS, current production CSS, Storybook catalog, system-preview가 같은 repo 안에 있어 source of truth가 흔들릴 수 있다.
- Storybook에서 좋아 보이는 수정이 실제 App Router 화면, Markdown renderer, mobile post detail, static export에서 깨질 수 있다.
- 반대로 production CSS만 고치면 Storybook virtual CSS contract나 system-preview parity가 뒤처질 수 있다.
- 디자인 시스템 전문가가 token만 보는 역할로 좁아지면 React component boundary, CSS ownership, renderer DOM, fixture data의 파생 영향을 놓칠 수 있다.
- 이 역할을 root writing agents에 두면 글쓰기 하네스와 site implementation 하네스의 경계가 흐려진다.

## 결정

`site-design-system-engineer` agent를 추가한다.

- Claude 원천: `site/.claude/agents/site-design-system-engineer.md`
- Codex 대응 정의: `site/.codex/agents/site-design-system-engineer.toml`
- discoverability: `site/.claude/agents/README.md`, `site/.codex/agents/README.md`

역할은 report-only 디자인 시스템/프론트엔드 전문가다. 소스 파일을 직접 수정하지 않고, 메인 세션이 UI/스타일 작업을 하기 전후에 아래를 반환한다.

- current source hierarchy
- frontend ripple map
- drift risks
- implementation plan
- verification plan
- keep/adjust/split/defer recommendation

이 agent는 `src/styles`, component CSS Modules, `src/app`, `src/components`, `src/lib/markdown.ts`, Storybook, `system-preview`를 함께 본다. 원형 판단 복원이 필요할 때만 `archive/design-system/reference/blog-design`를 evidence로 읽고, `archive/design-system/styles`는 legacy snapshot으로만 취급한다.

## 적용 범위

적용 범위:

- site 디자인 정합성 작업 전 분석
- UI/style 변경 뒤 파생 영향 점검
- Storybook과 production route parity 점검
- prose/Markdown rendering 변경의 화면 영향 점검
- 필요한 npm/build/browser 검증 계획 정리

영향받은 파일:

- `site/.claude/agents/site-design-system-engineer.md`
- `site/.codex/agents/site-design-system-engineer.toml`
- `site/.claude/agents/README.md`
- `site/.codex/agents/README.md`

## 비목표

- agent가 source file을 직접 수정하지 않는다.
- Storybook이나 system-preview를 대체하지 않는다.
- 디자인 계약 본문을 agent 안에 누적하지 않는다.
- root `editorial/`, writing agents, source policy, prepublish 기준을 site agent로 복사하지 않는다.
- `archive/design-system/styles`나 prototype HTML을 production source로 되살리지 않는다.
- 디자인을 맞추기 위해 `content/posts`를 rewrite하지 않는다.

## 근거

- `site/docs/platform-boundary.md`는 site agent/skill을 `site/.claude`, `site/.codex`, `site/.agents` 아래에 두라고 정의한다.
- `site/docs/DESIGN_CONTRACT.md`는 current production CSS/component/Storybook을 현재 디자인 판단 기준으로 둔다.
- `site/docs/DESIGN_INVENTORY.md`는 CSS ownership과 Storybook/system-preview 역할을 분리한다.
- `site/decisions/2026-05-05-design-system-legacy-boundary.md`는 `archive/design-system/`을 legacy/reference bucket으로 고정한다.
- `site/decisions/2026-05-05-storybook-design-system.md`는 Storybook을 디자인 시스템 catalog로 추가하고, system-preview를 route-level integration QA로 유지한다.

## 후속 점검

- 실제 디자인 정합성 작업 때 이 agent가 `Frontend ripple map`과 `Verification plan`을 충분히 구체적으로 반환하는지 본다.
- visual regression이나 screenshot QA가 추가되면 agent의 verification 후보에 반영한다.
- 사이트 전용 skill이 생기면 agent와 skill의 책임이 중복되지 않는지 확인한다.
