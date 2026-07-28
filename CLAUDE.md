# Blog Project Guide

이 repo는 직접 운영하는 공개 블로그의 콘텐츠 원고, 글쓰기 운영 기준, 격리된 커스텀 사이트 구현 루트의 본거지다. 외부 발행 플랫폼명을 frontmatter에 남기지 않고, 공개 원고의 기본 발행면은 `Blog`로 둔다.

## 역할 경계

| 영역 | 역할 |
| --- | --- |
| `content/posts/` | 직접 블로그에 올릴 공개 원고의 source. frontmatter `platform`은 `Blog`로 둔다. |
| `content/notes/` | 공개할 짧은 노트 source. 없으면 사이트 Note 화면은 빈 상태로 둔다. |
| `content/drafts/` | 공개 전 초안. 원천 자료에서 가져온 글도 먼저 여기에 둔다. |
| `content/backlog/` | 발행 계획, 시리즈 후보, 글감 목록. |
| `content/workspaces/` | 장기간 이어지는 한 작업 단위의 현재 그림, 반복 기준, 직접 원천, 과정, 최신 작업 원본을 분리해 둔다. 각 workspace의 로컬 `AGENTS.md`/`CLAUDE.md`를 먼저 따른다. `src/`는 자동 발행면이 아니며 선택한 원고를 `content/drafts/`로 승격한다. |
| `editorial/` | 글쓰기 판단 기준. `core/`, `lenses/`, `guards/`, `reference-profiles/`, `context/`, `decisions/`, `audits/`로 책임을 나눈다. |
| `site/` | 커스텀 블로그 사이트 앱의 격리된 구현 루트. 앱 코드, 라우팅, Markdown renderer, RSS/sitemap, 사이트 검증을 둔다. |
| `site/docs/` | 사이트 구현 경계, content/design contract. |
| `site/decisions/` | 사이트 구현과 사이트 전용 하네스 변경의 decision record. |
| `.claude/skills/` | Claude Code용 writing skill 원천. |
| `.agents/skills/` | Codex가 읽을 수 있는 writing skill 브릿지. 원천은 `.claude/skills/`. |
| `.claude/agents/` | Claude Code용 writing report-only agents. Material/shaping/texture 파트너와 발행 전 checker를 분리한다. |
| `.codex/agents/` | Codex용 writing report-only agents. Claude agent와 의미를 맞추되 포맷은 따로 둔다. |
| `editorial/decisions/` | 글쓰기 하네스 변경의 배경, 문제, 결정, 비목표를 남기는 decision record. |

같은 관심사를 전역 문서와 대상 경로의 로컬 `AGENTS.md`/`CLAUDE.md`가 모두 정의하고 충돌하면 대상 경로에 가장 가까운 로컬 guide를 우선한다. 로컬 guide가 다루지 않은 관심사는 전역 owner 문서를 따른다.

## 사이트 구현 경계

커스텀 블로그 사이트는 이 repo 안의 `site/`에 둔다. 같은 repo에 있어도 root `content/`/`editorial/`과 `site/`는 다른 레이어다.

- `site/`는 앱 코드, UI 컴포넌트, Markdown renderer, RSS/sitemap, metadata, 배포/검증 스크립트를 소유한다.
- `editorial/`은 글쓰기 판단 기준에 집중하고, 사이트 디자인 토큰이나 구현 계약을 소유하지 않는다.
- 사이트 구현 문서는 [site/docs/platform-boundary.md](site/docs/platform-boundary.md), [site/docs/CONTENT_CONTRACT.md](site/docs/CONTENT_CONTRACT.md), [site/docs/DESIGN_CONTRACT.md](site/docs/DESIGN_CONTRACT.md)를 따른다.
- root `.claude/`, `.codex/`, `.agents/`는 writing/publishing 하네스 전용이다.
- 사이트 전용 agent/skill이 필요하면 `site/.claude/`, `site/.codex/`, `site/.agents/` 아래에 둔다.
- 사이트는 `content/posts`를 source로 읽을 수 있지만 원고를 직접 rewrite하지 않는다. 원고 수정은 root `content/`와 editorial guard 기준으로 처리한다.

## 원천 자료 정책

프로젝트 코드, 작업 기록, 기존 글, 공식 문서, 외부 프로젝트 자료는 글쓰기의 source/evidence로 읽을 수 있다. 단, 공개 글에는 해석된 문장만 남긴다.

- 내부 경로, 미션 코드 원문, 면접 피드백 원문, 개인 메모 문장을 그대로 옮기지 않는다.
- sprint 자료, 회고 메모, 작업 로그는 재료다. 문장을 그대로 붙이지 않고 블로그 문맥으로 다시 쓴다.
- 원천으로 읽은 다른 프로젝트의 파일은 사용자가 요청하지 않는 한 수정하지 않는다.

자세한 기준은 [source-policy.md](editorial/guards/source-policy.md)를 따른다.

## 글쓰기 운영

- 글쓰기 단계, 현재 산출물에 맞는 시작점, 단계 전환은 [core/workflow.md](editorial/core/workflow.md)가 소유한다.
- 작업 결과 형식은 [core/output-contracts.md](editorial/core/output-contracts.md), 글 유형별 material signature는 [core/article-types.md](editorial/core/article-types.md)가 소유한다.
- `blog-write` skill은 위 소유 문서와 필요한 lens·agent를 연결하는 dispatcher다. 발동 계약은 skill description이 소유하고, root guide는 단계·article type·lens 기준을 다시 정의하지 않는다.
- [editorial/README.md](editorial/README.md)에서 현재 요청의 소유 위치를 찾고 필요한 문서만 읽는다. 모든 lens와 writing agent를 한 번에 적용하지 않는다.
- writing agent는 현재 판단에 독립 report가 필요할 때 해당 역할만 선택한다. agent 호출은 단계 자체가 아니며 자동 순차 호출하지 않는다.
- 발행 직전에는 `blog-evidence-checker`, 필요한 source 확인, `node scripts/blog-prepublish-check.mjs`, [prepublish-check.md](editorial/guards/prepublish-check.md)를 기준으로 확인한다.

## 편집 기준 소유권

- [editorial/README.md](editorial/README.md)는 현재 요청에 필요한 기준 문서를 찾는 단일 색인이다.
- `editorial/core/`는 단계, 작업 결과, 글 유형, reference use를 소유한다.
- `editorial/lenses/`는 voice, developer, portfolio signal, reader flow, supporting materials, edit pattern의 판단 기준을 소유한다. lens는 단계가 아니다.
- `editorial/guards/`는 원천 공개 경계와 발행 전 hard guard를 소유한다.
- `editorial/reference-profiles/`는 레퍼런스에서 추출한 재사용 가능한 패턴을 소유한다.
- `editorial/context/`는 특정 시리즈나 프로젝트의 배경만 소유하며 일반 편집 규칙이 아니다.
- 각 기준의 상세 내용은 해당 소유 문서에서 읽고 root guide, skill, agent에 반복하지 않는다.
- 참고 기준은 글을 템플릿에 끼우는 규칙이 아니라 현재 원고를 판단하는 점검 기준으로 사용한다.

## 공개 원고 기준

`content/posts/`에 들어가는 글은 다음을 만족해야 한다.

- `title`, `date`, `author`, `readTime`, `platform`, `tags` frontmatter가 있고, `platform` 값은 `Blog`다.
- 발행 예정 글의 `date`는 `TBD`가 아니라 실제 날짜다.
- 파일명은 `YYYY-MM-DD-slug.md` 형식이고, 앞의 날짜가 frontmatter `date`와 일치한다.
- 내부 로컬 경로와 private source 문장이 없다.
- Claude/Codex 생성 흔적이 없다.
- 편집 중 남긴 `supporting-material candidate` 주석이 없다.
- 글 안의 수치, 시점, 사람, 기술 용어가 원천 자료와 충돌하지 않는다.

발행 결정, 매체 선택, 최종 톤은 사용자 결정 영역이다.

## 커밋 메시지 규칙

- 이 repo의 커밋 메시지는 `prefix: 한글 요약` 형식으로 쓴다.
- 권장 prefix는 `post:`, `draft:`, `harness:`, `script:`, `meta:`다.
- 커밋 제목은 한 줄로, `무엇을 어떤 상태로 만들었는지`가 보이게 쓴다.
- 기술명, 제품명, 파일 포맷, 하이퍼파라미터 이름은 원문 표기를 유지한다. 예: `DistilBERT`, `frontmatter`, `lr`.
- 글 발행, 날짜 보정, 하네스 보강, 스크립트 수정처럼 한 커밋에는 한 주제만 담는다.
- 단순 발행일 보정처럼 맥락이 자명한 작업은 제목만으로 충분하다.
- `harness:`와 `meta:`처럼 이후 작업 방식에 영향을 주는 커밋은 본문에 배경과 의도를 1~3줄로 남긴다.
- 예: `post: DistilBERT 파인튜닝 실험 글 발행`, `harness: 포트폴리오 신호 글쓰기 하네스 보강`.

## 하네스 변경 기록

- 새 렌즈, 새 축, 새 단계, writing agent/skill 역할 변경처럼 이후 글쓰기 방식에 영향을 주는 하네스 변경은 [editorial/decisions](editorial/decisions)에 decision record를 남긴다.
- 사이트 구현과 사이트 전용 agent/skill 변경은 [site/decisions](site/decisions)에 decision record를 남긴다.
- 기록에는 배경, 기존 하네스가 놓친 문제, 결정, 적용 범위, 비목표, 근거, 후속 점검을 담는다.
- writing 하네스 관련 수정 뒤 구조 드리프트가 의심되면 `blog-harness-observer`를 report-only로 호출해 제3자 관찰을 받는다. 이 agent는 normal writing flow에 끼지 않고, 하네스 내용을 자기 안에 누적하지 않는다.
- 커밋 메시지는 변경 요약과 짧은 의도를 남기고, decision record는 나중에 왜 그 기준이 생겼는지 복원하는 자료로 쓴다.
- 오타, 링크, 이미 합의된 기준의 작은 polish는 decision record를 생략할 수 있다.
