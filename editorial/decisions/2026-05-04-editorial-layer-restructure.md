# Editorial 하네스 층위 재정리

작성일: 2026-05-04
관련 커밋: TBD
상태: accepted

## 배경

Reader Flow, artifact gap, visual candidate, micro-break, 문장 끝 리듬 기준이 최근 여러 차례 보강됐다. 각 결정의 문제의식은 유효했지만, active guide에서는 같은 책임이 `reader-flow`, `supporting-materials`, `workflow`, `blog-write`, shaping/texture agents에 동시에 퍼지기 시작했다.

또 사용자가 제공한 레퍼런스를 하네스에 반영할 때, 레퍼런스의 효과를 패턴으로 추출하기보다 파일명, 플랫폼, 구체 사례를 active rule에 심는 경향도 드러났다.

## 문제

기존 하네스가 놓친 것은 새 기준의 부재가 아니라 소유권과 산출물 계약의 흐림이었다.

- 렌즈가 판단 기준, 실행 프로토콜, 하지 말 것, 레퍼런스 패턴을 함께 소유했다.
- 같은 기준이 root guide, skill, editorial 문서, agent 정의에 반복됐다.
- agent가 얇은 실행자가 아니라 기준 저장소처럼 커질 위험이 있었다.
- reference-independent 원칙은 필요하지만, 레퍼런스에서 얻은 페이지 리듬 자체가 active guide에서 사라질 위험이 있었다.
- Reader Flow가 발동해도 결과가 진단 카드로만 끝나는 문제가 반복됐다.

## 결정

`editorial/`을 책임 층위별로 재정리한다.

- `core/workflow.md`: `Material -> Shaping -> Texture -> Prepublish` 단계와 책임.
- `core/output-contracts.md`: review-only, edit, reader-flow, artifact gap, reference-guided 작업의 산출물 계약.
- `core/reference-use.md`: 레퍼런스를 표면 규칙으로 하드코딩하지 않고 패턴으로 번역하는 원칙.
- `lenses/`: `voice`, `developer`, `portfolio-signal`, `reader-flow`, `supporting-materials`, `edit-patterns` 같은 판단 렌즈.
- `guards/`: `source-policy`, `prepublish-check` 같은 공개/발행 hard guard.
- `reference-profiles/technical-blog-page-cadence.md`: 좋은 기술 글의 페이지 리듬 패턴을 특정 파일에 의존하지 않는 형태로 보존.
- `context/series-pilab.md`: 시리즈 배경 메모. 편집 렌즈나 구조 템플릿이 아니다.

`blog-write` skill은 dispatcher로 줄이고, shaping/texture agents는 어떤 문서를 읽고 어떤 형식으로 보고할지만 남기는 방향으로 얇게 정리한다.

발행 원고에 `supporting-material candidate` 슬롯이 남지 않도록 prepublish script에도 guard를 추가한다.

## 범위

- `CLAUDE.md`
- `AGENTS.md`
- `README.md`
- `.claude/skills/blog-write/SKILL.md`
- `.claude/agents/blog-material-partner.md`
- `.claude/agents/blog-shaping-editor.md`
- `.claude/agents/blog-texture-keeper.md`
- `.claude/agents/blog-structure-critic.md`
- `.claude/agents/blog-tone-critic.md`
- `.claude/agents/blog-harness-observer.md`
- `.codex/agents/blog-material-partner.toml`
- `.codex/agents/blog-shaping-editor.toml`
- `.codex/agents/blog-texture-keeper.toml`
- `.codex/agents/blog-structure-critic.toml`
- `.codex/agents/blog-tone-critic.toml`
- `.codex/agents/blog-harness-observer.toml`
- `editorial/README.md`
- `editorial/core/`
- `editorial/lenses/`
- `editorial/guards/`
- `editorial/reference-profiles/`
- `editorial/context/`
- `scripts/blog-prepublish-check.mjs`

## 비목표

- `Material -> Shaping -> Texture -> Prepublish` 중심축을 바꾸지 않는다.
- 새 writing agent나 새 writing stage를 만들지 않는다.
- 모든 reader-flow 작업에 page cadence map이나 3개 이상의 move를 강제하지 않는다.
- 모든 글에 표, 스크린샷, 도식, 콜아웃을 강제하지 않는다.
- 레퍼런스 글의 디자인, 플랫폼, 파일명을 active rule로 복제하지 않는다.
- observer를 새 기준 저장소로 키우지 않는다.

## 근거

- 최근 decision들은 같은 현상을 다른 각도에서 다뤘다: reader-flow 비대화, supporting-materials 분리, artifact gap, visual candidate, activation contract, reference-independent reader flow.
- LangSmith 초안 작업에서는 기준을 이미 읽었는데도 실제 스크린샷 후보나 후보 슬롯이 원고에 남지 않는 문제가 있었다.
- 사용자 피드백은 기준을 더 세게 만들기보다, 레퍼런스에서 얻은 작동 원리를 현재 글의 산출물로 번역하는 중간 단계가 약하다는 쪽이었다.

## 후속 점검

- 다음 reader-flow 편집에서 진단 카드만 남지 않고 `output-contracts.md`의 결과물이 실제로 남는가.
- reference-guided 작업에서 `reference-use.md`의 hardcoding test가 적용되는가.
- `reader-flow.md`와 `supporting-materials.md`가 다시 실행 프로토콜처럼 비대해지지 않는가.
- shaping/texture agents가 기준 본문을 다시 누적하지 않는가.
- Claude/Codex agent 정의가 의미상 맞는가.
- `content/posts/`에 후보 슬롯이 남으면 prepublish script가 실패하는가.
