# Article type material signature 추가

작성일: 2026-05-04
관련 커밋: harness: 글 유형별 글감 기준 분리
상태: accepted

## 배경

`learning-experiment`와 `글감`을 검색하면 root guide, skill, voice, developer lens, workflow, agents에 비슷한 표현이 흩어져 보였다. 최근 하네스 재정리로 단계와 렌즈의 소유권은 좋아졌지만, 글 유형별로 "좋은 글감이 어떤 형태인지"를 한 번에 복원하기는 어려웠다.

## 문제

기존 하네스는 글 유형을 먼저 정하라고 말했지만, 각 유형에서 어떤 재료를 찾아야 하는지는 여러 문서에 나뉘어 있었다.

- `voice.md`는 톤과 허용 범위를 맡는다.
- `developer.md`는 기술 글의 문제 정의와 판단 기준을 맡는다.
- `workflow.md`는 Material/Shaping/Texture/Prepublish 단계를 맡는다.
- agents는 각자 출력 카드 안에서 article type과 글감 질문을 반복했다.

이 상태에서는 `learning-experiment`를 찾는 순간 PI Lab, 실험 조건, 오독, 재해석, 다음 질문, texture 보호, artifact gap이 같은 층위처럼 보일 수 있었다.

## 결정

`editorial/core/article-types.md`를 추가한다.

이 문서는 글 유형별 material signature만 소유한다.

- `technical-case-study`
- `company-project`
- `product-architecture`
- `retrospective`
- `learning-experiment`

`voice.md`는 계속 톤을 맡고, `workflow.md`는 단계를 맡고, `developer.md`는 기술 판단 렌즈를 맡는다. `article-types.md`는 "이 유형의 글이 좋은 글이 되려면 어떤 글감이 살아 있어야 하는가"만 본다.

또 `content/drafts/README.md`의 오래된 `description` 승격 기준을 제거하고, Draft -> Post 승격 기준은 `editorial/guards/prepublish-check.md`가 소유하도록 정리했다.

## 범위

- `editorial/core/article-types.md`
- `editorial/core/workflow.md`
- `editorial/README.md`
- `CLAUDE.md` / `AGENTS.md`
- `.claude/skills/blog-write/SKILL.md`
- `.agents/skills/blog-write/SKILL.md`
- `.claude/agents/blog-material-partner.md`
- `.claude/agents/blog-source-collector.md`
- `.claude/agents/blog-shaping-editor.md`
- `.claude/agents/blog-texture-keeper.md`
- `.claude/agents/blog-structure-critic.md`
- `.claude/agents/blog-tone-critic.md`
- `.codex/agents/blog-material-partner.toml`
- `.codex/agents/blog-source-collector.toml`
- `.codex/agents/blog-shaping-editor.toml`
- `.codex/agents/blog-texture-keeper.toml`
- `.codex/agents/blog-structure-critic.toml`
- `.codex/agents/blog-tone-critic.toml`
- `editorial/guards/prepublish-check.md`
- `content/drafts/README.md`
- `README.md`

## 비목표

- 새 writing stage를 만들지 않는다.
- 새 agent를 만들지 않는다.
- article type을 템플릿이나 체크리스트로 강제하지 않는다.
- `learning-experiment`를 PI Lab 전용 구조로 만들지 않는다.
- 회고 글에 기술 글의 증명 방식을 강제하지 않는다.
- agent 출력 계약까지 이번에 중앙화하지 않는다.

## 근거

- 2026-05-01 하네스 감사는 글 유형을 먼저 고르는 단계와 `description` drift를 이미 문제로 기록했다.
- 2026-05-04 하네스 층위 재정리는 기준의 부재보다 소유권과 산출물 계약의 흐림을 문제로 봤다.
- 최근 PI Lab 글 작업에서는 `learning-experiment`의 좋은 재료가 실험 조건, 측정, 오독, 재해석, 다음 질문, artifact 후보로 반복해서 등장했다.

## 후속 점검

- 다음 새 글 작업에서 `article-types.md`가 material partner 전에 실제로 읽히는지 확인한다.
- `voice.md`가 다시 글감 정의까지 떠안지 않는지 확인한다.
- agents가 article type별 기준 본문을 자기 안에 누적하지 않고 `article-types.md`를 참조하는 방향으로 유지되는지 확인한다.
- agent 안의 article type 목록은 중복 정의하지 않고, 추정 기준은 `article-types.md`를 보게 한다.
- Draft -> Post 승격 기준이 `content/drafts/README.md`, `prepublish-check.md`, script 사이에서 다시 어긋나지 않는지 확인한다.
