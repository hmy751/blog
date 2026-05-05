---
작성일: 2026-05-04
목적: 콘텐츠 원천, 글쓰기 하네스, 디자인 fixture, 커스텀 블로그 사이트 구현 사이의 책임 경계를 정의한다.
사용 방식: 사이트 앱 구현, 디자인 시안 반영, Markdown 렌더링 계약, 사이트 전용 agent/skill 추가 전에 읽는다.
관련:
  - [CONTENT_CONTRACT.md](CONTENT_CONTRACT.md) — 사이트가 원고를 읽는 방식
  - [DESIGN_CONTRACT.md](DESIGN_CONTRACT.md) — 디자인 fixture를 구현 기준으로 번역한 계약
  - [../../editorial/guards/source-policy.md](../../editorial/guards/source-policy.md) — 공개 원고 source guard
  - [../../editorial/guards/prepublish-check.md](../../editorial/guards/prepublish-check.md) — 발행 전 hard guard
---

# Platform Boundary

이 문서는 `blog` repo 안에 커스텀 블로그 사이트를 함께 둘 때 무엇을 어디에 격리하는지 정한다.

핵심 원칙:

```text
content source -> editorial writing harness
              -> design fixture -> site implementation
```

같은 repo 안에 있어도 `content/`, `editorial/`, `site/`는 서로 다른 레이어다. 사이트 앱은 `site/` 아래에만 둔다.

## Layer Map

| 층위 | 기본 위치 | 소유하는 것 | 소유하지 않는 것 |
| --- | --- | --- | --- |
| Content source | `../../content/posts/`, `../../content/drafts/`, `../../content/backlog/` | 공개 원고, 초안, 글감, frontmatter의 발행 기준 | 라우팅, 빌드, UI 컴포넌트, RSS 생성 구현 |
| Editorial writing harness | `../../editorial/`, `../../.claude/`, `../../.codex/`, `../../.agents/` | 글쓰기 판단 기준, 공개 경계, 발행 준비, writing agent/skill dispatcher | 디자인 토큰 본문, 사이트 컴포넌트 구현, 프레임워크 설정 |
| Design fixture | `../../../blog-design` | 시각 기준, 화면 시안, 디자인 시스템 fixture | 실제 글 데이터 원천, 배포 앱, 글쓰기 하네스 |
| Site implementation | `../` | 앱 코드, 라우팅, Markdown renderer, RSS/sitemap, metadata, 사이트 검증 스크립트 | 원고의 editorial 판단, private source 해석, 글쓰기 workflow |
| Site design system | `../design-system` | 구현용 CSS token/prose/component styles, Markdown QA fixture | 원천 디자인 시안, 글쓰기 기준, 실제 원고 데이터 |
| Site harness | `../.claude/`, `../.codex/`, `../.agents/` | 사이트 개발 보조 agent/skill, 구현 점검, 디자인/콘텐츠 계약 확인 | 글쓰기 기준 본문, source policy 재정의, prepublish 판단 |

## Design Source

`../../../blog-design`는 read-only 디자인 fixture로 다룬다.

- `Blog v2.html`: 현재 블로그 화면 시안의 기준이다. 홈, 글 목록, 글 상세, Note, About, footer, thumbnail variant를 포함한다.
- `System.html`: 토큰, prose, 컴포넌트 표준을 문서화한 기준이다. 다만 `Blog v2.html`과 충돌하는 부분은 구현 전에 동기화한다.
- `Blog.html`: v1/prototype로 본다. 새 구현 기준은 아니다.
- `screenshots/`: 스냅샷 참고 자료다. 현재 HTML 렌더와 다르면 HTML을 우선한다.
- `tweaks-panel.jsx`: 디자인 조정용 프로토타입 도구다. 배포 앱의 런타임 계약으로 가져오지 않는다.

디자인 fixture를 `editorial/`의 글쓰기 원칙으로 승격하지 않는다. 색, spacing, thumbnail variant 같은 구현 기준은 `DESIGN_CONTRACT.md`가 소유한다.

## Site Implementation Contract

사이트 앱에는 최소한 아래 계약을 둔다.

- `DESIGN_CONTRACT.md`: `Blog v2.html`과 `System.html`에서 확정한 token, layout, prose, article row, post page, mobile exception.
- `CONTENT_CONTRACT.md`: `content/posts/*.md`를 어떻게 읽는지, slug/date/tag/readTime/description/cover/featured fallback.
- `MARKDOWN_CONTRACT.md`: 상세 글 Markdown AST를 prose DOM으로 변환하는 규칙.
- `design-system/styles/`: 구현용 CSS source.
- build/check scripts: Markdown 렌더링, frontmatter schema, route generation, RSS/sitemap, screenshot regression.

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
2. `../../../blog-design/Blog v2.html`과 `../../../blog-design/System.html`에서 실제로 채택할 디자인 기준을 고른다.
3. `DESIGN_CONTRACT.md`와 `CONTENT_CONTRACT.md`를 확정한다.
4. framework scaffold와 package scripts를 `site/` 안에만 만든다.
5. Markdown renderer와 post detail page를 먼저 구현한다.
6. home/articles/note/about을 실제 콘텐츠와 연결한다.
7. RSS, sitemap, metadata, responsive screenshot check를 붙인다.
8. 원고 수정이 필요하면 root repo로 돌아와 `content/`와 editorial guard를 기준으로 고친다.

## 멈춤 신호

- 사이트 코드가 root `editorial/`, root `.claude/`, root `.codex/`, root `.agents/` 안에 섞인다.
- 디자인 fixture의 임시 선택지가 editorial hard guard로 승격된다.
- 사이트 앱이 원고를 조용히 rewrite하거나 frontmatter 기준을 독자적으로 바꾼다.
- agent 파일이 자기 레이어 밖의 기준 본문을 소유하기 시작한다.
- Markdown renderer 문제를 원고 HTML 증가로 해결한다.
- `System.html`과 `Blog v2.html`의 충돌을 해결하지 않고 둘 다 기준처럼 적용한다.
