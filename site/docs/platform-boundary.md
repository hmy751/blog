---
작성일: 2026-05-04
목적: 콘텐츠 원천, 글쓰기 하네스, current site implementation, Storybook/system-preview, legacy design archive 사이의 책임 경계를 정의한다.
사용 방식: 사이트 앱 구현, 디자인 시안 반영, Markdown 렌더링 계약, 사이트 전용 agent/skill 추가 전에 읽는다.
관련:
  - [CONTENT_CONTRACT.md](CONTENT_CONTRACT.md) — 사이트가 원고를 읽는 방식
  - [DESIGN_CONTRACT.md](DESIGN_CONTRACT.md) — current production CSS/component/Storybook 기준의 디자인 계약
  - [../decisions/2026-05-05-design-system-legacy-boundary.md](../decisions/2026-05-05-design-system-legacy-boundary.md) — archived design-system 보존/legacy 경계
  - [../../editorial/guards/source-policy.md](../../editorial/guards/source-policy.md) — 공개 원고 source guard
  - [../../editorial/guards/prepublish-check.md](../../editorial/guards/prepublish-check.md) — 발행 전 hard guard
---

# Platform Boundary

이 문서는 `blog` repo 안에 커스텀 블로그 사이트를 함께 둘 때 무엇을 어디에 격리하는지 정한다.

핵심 원칙:

```text
content source -> editorial writing harness
              -> current site implementation
              -> Storybook catalog / system-preview QA
              -> legacy design archive
```

같은 repo 안에 있어도 `content/`, `editorial/`, `site/`는 서로 다른 레이어다. 사이트 앱은 `site/` 아래에만 둔다.

## Layer Map

| 층위 | 기본 위치 | 소유하는 것 | 소유하지 않는 것 |
| --- | --- | --- | --- |
| Content source | `../../content/posts/`, `../../content/drafts/`, `../../content/backlog/` | 공개 원고, 초안, 글감, frontmatter의 발행 기준 | 라우팅, 빌드, UI 컴포넌트, RSS 생성 구현 |
| Editorial writing harness | `../../editorial/`, `../../.claude/`, `../../.codex/`, `../../.agents/` | 글쓰기 판단 기준, 공개 경계, 발행 준비, writing agent/skill dispatcher | 디자인 토큰 본문, 사이트 컴포넌트 구현, 프레임워크 설정 |
| Site implementation | `../src`, `../src/styles`, `../src/components`, `../src/app`, `../src/lib` | 앱 코드, 라우팅, production CSS/component, Markdown renderer, RSS/sitemap, metadata, 사이트 검증 스크립트 | 원고의 editorial 판단, private source 해석, 글쓰기 workflow |
| Storybook catalog | `../.storybook`, `../src/stories` | 현재 디자인 시스템 카탈로그, isolated component state, screen composition, production CSS contract 확인 | production route 등록, 실제 원고 수정 |
| System preview | `../system-preview` | local-only route-level Markdown/rendering 결합 QA | production App Router route, 디자인 source of truth 단독 소유 |
| Legacy design archive | `../archive/design-system/reference/blog-design`, `../archive/design-system/styles`, `../archive/design-system/fixtures` | Claude Design 원본 evidence, legacy renderer CSS snapshot, local-only QA fixture asset bucket | 현재 production CSS source, 실제 글 데이터 원천, 배포 앱, 글쓰기 하네스 |
| Site harness | `../.claude/`, `../.codex/`, `../.agents/` | 사이트 개발 보조 agent/skill, 구현 점검, 디자인/콘텐츠 계약 확인 | 글쓰기 기준 본문, source policy 재정의, prepublish 판단 |

## Design Source

현재 UI/스타일 판단은 production code와 Storybook에서 한다.

- production CSS source: `../src/styles/`와 component CSS Modules.
- design catalog: `../src/stories/`와 `../.storybook/`.
- route integration QA: `../system-preview/`.

`../archive/design-system/`은 삭제하지 않는 legacy/reference bucket으로 다룬다.

- `reference/blog-design/source/Blog v2.html`: live prototype evidence다. 홈, 글 목록, 글 상세, Note, About, footer, thumbnail variant를 포함한다.
- `reference/blog-design/source/System.html`: token, prose, component primitive evidence다. 다만 current production과 충돌하면 current code와 Storybook을 먼저 확인한다.
- `source/Blog.html`: v1/prototype로 본다. 새 구현 기준은 아니다.
- `source/tweaks-panel.jsx`: 디자인 조정용 프로토타입 도구다. 배포 앱의 런타임 계약으로 가져오지 않는다.
- `uploads/`: 피드백/주석 자료로 취급한다. production asset으로 쓰지 않는다.
- `screenshots/`: 가져오지 않는다. stale top-only snapshot이 기준처럼 오해되는 것을 막는다.
- `styles/`: legacy Node renderer CSS snapshot이다. production CSS로 다시 복사하지 않는다.
- `fixtures/`: Storybook과 system-preview가 아직 공유하는 local-only QA asset bucket이다. 실제 원고나 public route data가 아니다.

디자인 reference archive를 `editorial/`의 글쓰기 원칙으로 승격하지 않는다. Archive와 legacy CSS는 보존 자료이고, 현재 구현 판단은 production code와 Storybook을 통해 한다.

## Site Implementation Contract

사이트 앱에는 최소한 아래 계약을 둔다.

- `DESIGN_CONTRACT.md`: current production CSS/component/Storybook 기준으로 확정한 token, layout, prose, article row, post page, mobile exception.
- `CONTENT_CONTRACT.md`: `content/posts/*.md`를 어떻게 읽는지, slug/date/tag/readTime/description/cover/featured fallback.
- `MARKDOWN_CONTRACT.md`: 상세 글 Markdown AST를 prose DOM으로 변환하는 규칙.
- `src/styles/`와 component CSS Modules: production CSS source.
- `src/stories/`와 `.storybook/`: current design system catalog.
- `system-preview/`: local-only route-level integration QA.
- build/check scripts: Markdown 렌더링, frontmatter schema, route generation, RSS/sitemap, screenshot regression.
- legacy reference: `archive/design-system/`는 보존 자료로 읽고 runtime import 대상으로 쓰지 않는다. 예외적으로 Storybook/system-preview fixture asset은 local-only로 사용할 수 있다.

앱은 `../../content/posts`를 source로 읽을 수 있지만, 원고를 직접 고치지 않는다. 원고 수정은 root repo에서 한다.

## Markdown Boundary

글 상세 페이지의 본문은 Markdown 렌더링을 기본으로 한다.

앱이 처리할 것:

- frontmatter에서 `title`, `date`, `author`, `readTime`, `platform`, `tags`를 읽는다.
- `description`, `cover`, `featured` 같은 사이트 표시 필드는 optional로 시작하고 fallback을 둔다.
- frontmatter `title`로 post title을 만들 때, 본문 첫 `# 제목`이 같은 값이면 렌더링에서 제거한다.
- 첫 본문 paragraph를 lead로 처리할 수 있다. 원고에 별도 class를 강제하지 않는다.
- GitHub Flavored Markdown 수준의 table, code fence, list, blockquote, link를 안정적으로 렌더링한다.
- 넓은 table과 code block은 모바일에서 horizontal scroll을 제공한다.
- callout, figure caption, code filename 같은 확장은 앱의 Markdown convention으로 정의한다. 원고에 임의 HTML을 늘리는 방식으로 해결하지 않는다.

root repo가 처리할 것:

- 공개 원고 기준과 private source 경계.
- frontmatter의 필수 발행 필드.
- 글의 material, shaping, texture, prepublish 판단.
- Markdown이 표현하기 어려운 자료 장치가 필요할 때의 `supporting-material candidate` 슬롯.

## Agent / Skill Boundary

agent와 skill은 기준 저장소가 아니다.

- root `.claude/skills/blog-write/SKILL.md`는 글쓰기 작업 dispatcher다. 사이트 구현 dispatcher로 확장하지 않는다.
- root `.agents/skills/blog-write`는 Codex용 writing skill bridge다. 사이트 skill bridge가 필요하면 `site/.agents/skills/` 아래에 둔다.
- root `.claude/agents/*.md`와 `.codex/agents/*.toml`은 writing report-only agents다.
- 사이트 구현 agent나 디자인 agent가 필요하면 `site/.claude/agents/`, `site/.codex/agents/` 아래에 둔다.
- 사이트 agent/skill은 `CONTENT_CONTRACT.md`, `DESIGN_CONTRACT.md`, build/check script를 참조한다.
- 사이트 agent/skill에 `editorial/`의 voice, workflow, source policy 전문을 복사하지 않는다. 필요한 경우 링크로만 참조한다.

local agent/skill 역할을 바꾸면 Claude 정의와 Codex 정의의 의미를 같이 맞추고, 사이트 관련 결정은 `site/decisions/`에 배경을 남긴다.

## Build Flow

구현을 시작할 때의 권장 순서:

1. 이 문서로 경계를 확인한다.
2. current production code, Storybook story, system-preview 결합 상태를 먼저 확인한다.
3. 원형 판단 복원이 필요할 때만 `../archive/design-system/reference/blog-design/manifest.json`과 `notes/source-map.md`를 읽는다.
4. `DESIGN_CONTRACT.md`와 `CONTENT_CONTRACT.md`를 확정한다.
5. framework scaffold와 package scripts를 `site/` 안에만 만든다.
6. Markdown renderer와 post detail page를 먼저 구현한다.
7. home/articles를 실제 post 콘텐츠와 연결하고, note는 optional `content/notes` source에 연결한다. About은 site config의 공개 프로필 데이터로 `/about/` route에 등록한다.
8. RSS, sitemap, metadata, responsive screenshot check를 붙인다.
9. 원고 수정이 필요하면 root repo로 돌아와 `content/`와 editorial guard를 기준으로 고친다.

## 멈춤 신호

- 사이트 코드가 root `editorial/`, root `.claude/`, root `.codex/`, root `.agents/` 안에 섞인다.
- 디자인 fixture의 임시 선택지가 editorial hard guard로 승격된다.
- 사이트 앱이 원고를 조용히 rewrite하거나 frontmatter 기준을 독자적으로 바꾼다.
- agent 파일이 자기 레이어 밖의 기준 본문을 소유하기 시작한다.
- Markdown renderer 문제를 원고 HTML 증가로 해결한다.
- `archive/design-system/styles`나 prototype HTML을 current production source처럼 복사한다.
- `System.html`, `Blog v2.html`, Storybook, production CSS의 충돌을 해결하지 않고 모두 기준처럼 적용한다.
