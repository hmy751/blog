# Custom Blog Site Guide

이 폴더는 커스텀 블로그 사이트 앱의 구현 루트다. root repo의 `content/`와 `editorial/`을 같은 저장소에서 볼 수 있지만, 사이트 구현 책임은 이 폴더 안에 격리한다.

## 먼저 읽을 문서

- `README.md`
- `docs/platform-boundary.md`
- `docs/CONTENT_CONTRACT.md`
- `docs/DESIGN_CONTRACT.md`
- `docs/MARKDOWN_CONTRACT.md`
- `docs/READER_BEHAVIOR_CONTRACT.md`
- `docs/SEO_CONTRACT.md`
- `decisions/2026-05-05-design-system-legacy-boundary.md`
- `docs/BLOG_IMPLEMENTATION_PLAN.md`
- `archive/README.md`
- `archive/design-system/README.md`

## 책임 경계

- `site/`는 앱 코드, 라우팅, UI 컴포넌트, Markdown renderer, RSS/sitemap, metadata, 배포/검증 스크립트를 소유한다.
- reader behavior analytics, heatmap hook, privacy page, SEO metadata, sitemap/robots, article structured data는 `site/`가 소유한다.
- `content/` 원고를 직접 rewrite하지 않는다. 글 수정은 root의 글쓰기 하네스를 통해 처리한다.
- `editorial/`은 글쓰기 판단 기준이며, 사이트 디자인 토큰이나 구현 계약을 저장하지 않는다.
- 현재 UI/스타일 구현 기준은 `src/`, `src/styles/`, component CSS Modules, `src/stories/`, `.storybook/`이 소유한다.
- `system-preview/`는 production components/styles/Markdown renderer를 묶어 보는 local-only 결합 QA surface다.
- `archive/design-system/`은 삭제하지 않는 legacy/reference bucket이다. `reference/blog-design`는 Claude Design 원본 archive, `styles/`는 legacy renderer CSS snapshot, `fixtures/`는 local-only QA asset bucket으로만 본다.

## 하네스 경계

- root `.claude/`, `.codex/`, `.agents/`는 글쓰기/발행 하네스 전용이다.
- 사이트 전용 skill/agent가 필요하면 `site/.claude/`, `site/.codex/`, `site/.agents/` 아래에 둔다.
- 사이트 agent/skill은 디자인 토큰, 콘텐츠 schema, 빌드 검증처럼 앱 구현을 돕는 역할만 맡는다.
- 공개 원고의 목소리, 구조, source policy, prepublish 판단은 site agent/skill에 복사하지 말고 root `editorial/`을 참조한다.

## 멈춤 신호

- 사이트 코드가 root `editorial/` 안에 들어간다.
- 사이트 구현 문제를 원고 HTML 증가로 해결한다.
- `archive/design-system/styles`나 prototype HTML을 current production source처럼 복사한다.
- 사이트 하네스가 글쓰기 workflow나 voice 기준을 자기 파일에 누적한다.
- 앱이 `content/posts`를 자동 수정한다.
