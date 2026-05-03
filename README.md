# Blog

공개 블로그 글쓰기와 발행 준비를 위한 작업 공간이다. 플랫폼 구현은 아직 두지 않는다.

## Structure

| Path | Role |
| --- | --- |
| `content/posts/` | 실제 발행 중인 글 소스와 앞으로 공개할 글 원고 |
| `content/drafts/` | 공개 전 초안 |
| `content/backlog/` | 발행 계획, 시리즈 후보, 글감 |
| `editorial/` | 글쓰기 판단 기준과 발행 전 검사 기준 |
| `editorial/decisions/` | 하네스 변경 이유와 적용 범위 기록 |
| `.claude/` | Claude Code용 로컬 skill/agent |
| `.codex/` | Codex용 로컬 agent |
| `.agents/` | Codex skill bridge |
| `scripts/` | 글쓰기 운영 보조 스크립트 |

기존 Gatsby 프로젝트와 그 안의 과거 글은 `../blog-archive-2026-05-01-gatsby/`에 보존했다. Gatsby 프로젝트의 글은 새 blog로 가져오지 않고, 실제 발행 중인 글 소스만 `content/posts/`로 가져왔다.

## Naming

발행 글은 `content/posts/YYYY-MM-DD-slug.md` 형식으로 둔다. 디렉토리 기본 정렬이 곧 발행일 순서가 되도록 파일명 날짜와 frontmatter `date`를 맞춘다.

## Commit Messages

이 repo의 커밋 메시지는 `prefix: 한글 요약` 형식으로 쓴다. 공개 글, draft, editorial 하네스처럼 글쓰기 맥락이 중요한 저장소이므로 커밋 기록도 같은 언어로 남긴다.

권장 prefix:

- `post:` — 발행 글 추가, 발행일/메타데이터 보정
- `draft:` — 공개 전 초안 작성과 수정
- `harness:` — editorial 기준, skill/agent, 글쓰기 운영 흐름 보강
- `script:` — 글쓰기 운영 스크립트 수정
- `meta:` — README, CLAUDE/AGENTS, repo 운영 규칙 수정

규칙:

- 제목은 한 줄로, `무엇을 어떤 상태로 만들었는지`가 보이게 쓴다.
- `DistilBERT`, `PI Lab`, `frontmatter`처럼 기술명과 고유명사는 원문 표기를 유지한다.
- 커밋 하나는 한 주제만 담는다: 글 발행, 발행일 보정, 하네스 보강, 스크립트 수정처럼 분리한다.
- 단순 발행일 보정처럼 맥락이 자명한 작업은 제목만으로 충분하다.
- `harness:`와 `meta:`처럼 이후 작업 방식에 영향을 주는 커밋은 본문에 배경과 의도를 1~3줄로 남긴다.
- 하네스 변경이 새 렌즈, 새 축, agent/skill 역할 변경처럼 이후 글쓰기 방식에 영향을 주면 `editorial/decisions/`에 별도 기록을 남긴다.
- 예: `post: DistilBERT 파인튜닝 실험 글 발행`, `harness: 포트폴리오 신호 글쓰기 하네스 보강`.

## Current Boundary

- 이 repo는 지금 플랫폼이 아니라 콘텐츠와 글쓰기 운영 기준의 본거지다.
- `editorial/`은 공식 Claude/Codex 폴더가 아니라, skill과 agents가 참조하는 편집 기준 자료실이다.
- `dev-hub`와 `pilab` 자료는 read-only source로 참조한다.
- 공개 글에는 내부 경로, 코드 원문, 면접 피드백 원문을 옮기지 않는다.
- 플랫폼을 만들 때는 이 구조 위에 별도 앱을 얹는다.
