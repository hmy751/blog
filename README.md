# Blog

공개 블로그 글쓰기와 발행 준비를 위한 작업 공간이다. 플랫폼 구현은 아직 두지 않는다.

## Structure

| Path | Role |
| --- | --- |
| `content/posts/` | 실제 발행 중인 글 소스와 앞으로 공개할 글 원고 |
| `content/drafts/` | 공개 전 초안 |
| `content/backlog/` | 발행 계획, 시리즈 후보, 글감 |
| `editorial/` | 글쓰기 판단 기준과 발행 전 검사 기준 |
| `.claude/` | Claude Code용 로컬 skill/agent |
| `.codex/` | Codex용 로컬 agent |
| `.agents/` | Codex skill bridge |
| `scripts/` | 글쓰기 운영 보조 스크립트 |

기존 Gatsby 프로젝트와 그 안의 과거 글은 `../blog-archive-2026-05-01-gatsby/`에 보존했다. Gatsby 프로젝트의 글은 새 blog로 가져오지 않고, 실제 발행 중인 글 소스만 `content/posts/`로 가져왔다.

## Naming

발행 글은 `content/posts/YYYY-MM-DD-slug.md` 형식으로 둔다. 디렉토리 기본 정렬이 곧 발행일 순서가 되도록 파일명 날짜와 frontmatter `date`를 맞춘다.

## Current Boundary

- 이 repo는 지금 플랫폼이 아니라 콘텐츠와 글쓰기 운영 기준의 본거지다.
- `editorial/`은 공식 Claude/Codex 폴더가 아니라, skill과 agents가 참조하는 편집 기준 자료실이다.
- `dev-hub`와 `pilab` 자료는 read-only source로 참조한다.
- 공개 글에는 내부 경로, 코드 원문, 면접 피드백 원문을 옮기지 않는다.
- 플랫폼을 만들 때는 이 구조 위에 별도 앱을 얹는다.
