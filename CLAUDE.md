# Blog Project Guide

이 repo는 공개 블로그의 콘텐츠 원고와 글쓰기 운영 기준의 본거지다. 블로그 플랫폼 구현은 아직 두지 않는다.

## 역할 경계

| 영역 | 역할 |
| --- | --- |
| `content/posts/` | 실제 발행 중인 글 소스와 앞으로 공개할 글 원고. 플랫폼이 생기면 여기서 읽게 한다. |
| `content/drafts/` | 공개 전 초안. 원천 자료에서 가져온 글도 먼저 여기에 둔다. |
| `content/backlog/` | 발행 계획, 시리즈 후보, 글감 목록. |
| `editorial/` | 글쓰기 판단 기준. 목소리, 편집 패턴, 출처 정책, 발행 전 검사. |
| `.claude/skills/` | Claude Code용 로컬 skill 원천. |
| `.agents/skills/` | Codex가 읽을 수 있는 skill 브릿지. 원천은 `.claude/skills/`. |
| `.claude/agents/` | Claude Code용 report-only agents. |
| `.codex/agents/` | Codex용 report-only agents. Claude agent와 의미를 맞추되 포맷은 따로 둔다. |

## 원천 자료 정책

프로젝트 코드, 작업 기록, 기존 글, 공식 문서, PI Lab/dev-hub 자료는 글쓰기의 source/evidence로 읽을 수 있다. 단, 공개 글에는 해석된 문장만 남긴다.

- 내부 경로, 미션 코드 원문, 면접 피드백 원문, 개인 메모 문장을 그대로 옮기지 않는다.
- PI Lab 코드나 파일명/라인 번호가 독자에게 내부 구현을 노출하는 형태로 들어가면 멈춘다.
- sprint 자료, 회고 메모, 작업 로그는 재료다. 문장을 그대로 붙이지 않고 블로그 문맥으로 다시 쓴다.
- `dev-hub` 쪽 파일은 사용자가 요청하지 않는 한 수정하지 않는다.

자세한 기준은 [source-policy.md](editorial/source-policy.md)를 따른다.

## 글쓰기 흐름

1. 작업 모드를 먼저 정한다: 새 글, 기존 글 편집, review-only, 발행 준비.
2. 글 유형을 정한다: technical-case-study, company-project, product-architecture, retrospective, learning-experiment.
3. [editorial/README.md](editorial/README.md)를 보고 작업에 맞는 editorial 문서를 먼저 읽는다.
4. 필요한 경우 `blog-source-collector`로 원천 자료를 카드 형태로 모은다.
5. 새 글은 바로 쓰지 않고, 먼저 글의 각도와 구조 후보를 2-3개로 좁힌다.
6. 사용자가 방향을 고른 뒤 v1을 작성한다.
7. v1 이후 `blog-tone-critic`, `blog-structure-critic`, `blog-evidence-checker`를 report-only로 돌린다.
8. 구조 문제가 크면 v2 전 재작성/부분수정 결정을 사용자에게 묻는다.
9. 발행 전에는 `node scripts/blog-prepublish-check.mjs`와 [prepublish-check.md](editorial/prepublish-check.md)를 기준으로 확인한다.

## 목소리와 구조

- [voice.md](editorial/voice.md)는 강제 틀이 아니라 점검 거울이다.
- [edit-patterns.md](editorial/edit-patterns.md)는 반복해서 거부된 수정 방향의 사례집이다.
- [series-pilab.md](editorial/series-pilab.md)는 PI Lab 학습/실험 글에만 우선 적용한다. 다른 글의 전역 구조 법칙으로 쓰지 않는다.
- 담백함은 압축이 아니다. 호흡, 구체 장면, 사실의 범위를 같이 본다.
- 회고 글은 했다체와 자기 관찰을 허용한다. 기술 글의 금기를 회고 글에 그대로 적용하지 않는다.

## 공개 원고 기준

`content/posts/`에 들어가는 글은 다음을 만족해야 한다.

- `title`, `date`, `author`, `readTime`, `platform`, `tags` frontmatter가 있다.
- 발행 예정 글의 `date`는 `TBD`가 아니라 실제 날짜다.
- 파일명은 `YYYY-MM-DD-slug.md` 형식이고, 앞의 날짜가 frontmatter `date`와 일치한다.
- 내부 로컬 경로와 private source 문장이 없다.
- Claude/Codex 생성 흔적이 없다.
- 글 안의 수치, 시점, 사람, 기술 용어가 원천 자료와 충돌하지 않는다.

발행 결정, 매체 선택, 최종 톤은 사용자 결정 영역이다.
