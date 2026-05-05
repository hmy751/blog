# 사이트 구현 격리 경계

작성일: 2026-05-04
관련 커밋: 7e82d65
상태: accepted

## 배경

커스텀 블로그 사이트 구현을 같은 `blog` repo 안에 함께 둘 예정이 되었다. 기존에는 콘텐츠/편집 하네스, sibling 디자인 fixture, repo 밖 별도 앱 후보 사이의 경계를 잡고 있었지만, 실제 운용 방향은 root repo 안에 사이트 앱을 함께 두는 쪽으로 바뀌었다.

## 문제

기존 경계는 사이트 앱을 repo 밖으로 분리한다는 전제가 강했다. 같은 repo 안에 앱을 두면 아래 혼동이 생길 수 있다.

- `editorial/`이 글쓰기 기준이 아니라 플랫폼 구현 기준까지 소유하게 된다.
- root `.claude/`, `.codex/`, `.agents/`의 writing agent/skill이 사이트 개발 dispatcher처럼 커진다.
- 사이트 Markdown renderer 문제를 원고 HTML 증가로 해결할 수 있다.
- 디자인 fixture의 임시 선택지가 editorial hard guard처럼 승격될 수 있다.
- 사이트 앱이 `content/posts`를 source로 읽다가 원고를 직접 rewrite할 수 있다.

## 결정

사이트 구현 루트를 `site/`로 둔다.

- root `content/`는 공개 원고와 초안 source를 소유한다.
- root `editorial/`은 글쓰기 판단 기준에만 집중한다.
- root `.claude/`, `.codex/`, `.agents/`는 writing/publishing 하네스 전용으로 유지한다.
- `site/`는 앱 코드, 라우팅, UI, Markdown renderer, RSS/sitemap, metadata, 사이트 검증 스크립트를 소유한다.
- 사이트 전용 agent/skill 자리는 `site/.claude/`, `site/.codex/`, `site/.agents/` 아래에 둔다.
- 사이트 구현 계약은 `site/docs/CONTENT_CONTRACT.md`, `site/docs/DESIGN_CONTRACT.md`, `site/docs/platform-boundary.md`가 소유한다.

## 범위

적용 범위:

- 커스텀 블로그 사이트 구축.
- 디자인 reference archive와 구현 CSS 반영.
- Markdown renderer와 content ingestion 설계.
- 사이트 전용 agent/skill 추가.
- root 글쓰기 하네스와 site 개발 하네스 사이의 경계 판단.

영향받은 파일:

- `site/README.md`
- `site/CLAUDE.md`
- `site/AGENTS.md`
- `site/docs/platform-boundary.md`
- `site/docs/CONTENT_CONTRACT.md`
- `site/docs/DESIGN_CONTRACT.md`
- `site/.claude/`, `site/.codex/`, `site/.agents/`
- `README.md`
- `CLAUDE.md`
- `.gitignore`
- `editorial/README.md`
- `.claude/skills/blog-write/SKILL.md`

## 비목표

- 이 결정 자체에서는 framework를 Astro/Next 등으로 고정하지 않는다.
- 이 결정 자체에서는 사이트 앱을 즉시 scaffold하지 않는다.
- root writing agent/skill을 사이트 구현 agent/skill로 확장하지 않는다.
- 디자인 토큰 상세값을 root `editorial/`에 두지 않는다.
- 기존 글의 frontmatter를 즉시 대량 수정하지 않는다.
- `site/design-system/reference/blog-design`의 모든 prototype variant를 구현 요구사항으로 승격하지 않는다.

## 근거

- 사용자는 `editorial`을 글쓰기 포커스로 유지하고, 개발 블로그 자체에 대한 기준을 분리하고 싶다고 요청했다.
- root repo는 이미 공개 원고와 writing/publishing 하네스를 갖고 있어 사이트 구현이 섞이면 기준 저장소가 흐려질 수 있다.
- 같은 repo 안에 사이트 앱을 두면 콘텐츠 source와 앱 구현의 물리적 접근은 쉬워지지만, 하네스와 문서의 소유권을 더 명확히 해야 한다.

## 후속 점검

- 실제 scaffold가 `site/` 안에만 생겼는가.
- 사이트 앱이 `content/posts`를 읽되 원고를 직접 rewrite하지 않는가.
- `DESIGN_CONTRACT.md`가 `source/Blog v2.html`과 `source/System.html`의 충돌을 구현 전에 정리했는가.
- Markdown renderer가 첫 H1 중복 제거, lead paragraph, table/code horizontal scroll을 처리하는가.
- 사이트 agent/skill이 root writing harness 기준을 복사해 자기 파일 안에 누적하지 않는가.
