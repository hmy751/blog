# blog-write dispatcher 책임 재정렬

작성일: 2026-07-28
관련 커밋: harness: blog-write dispatcher 책임 재정렬
상태: accepted
부분 대체: [Article type material signature 추가](2026-05-04-article-type-material-signature.md)의 작업 초기에 type을 항상 정하고 agent가 type을 추정하던 routing

## 배경

`editorial/`은 글쓰기 단계, 작업 결과, 글 유형, lens, guard의 소유 위치를 나눠 두고 `blog-write`는 dispatcher로 유지하기로 했다. 이후 실제 skill과 root guide에는 작업 모드, article type, agent 순서, Reader Flow와 Reference Use의 상세 규칙이 다시 함께 남았다.

사용자는 합의한 lens와 판단 기준이 실제 글 작업에 활용되는 것은 원하지만, `blog-write`의 틀이 요청보다 먼저 작업 전체를 감싸는 현상은 원하지 않았다.

## 문제

- `blog-write`가 dispatcher라고 선언하면서도 `editorial/core`, `editorial/lenses`, `editorial/guards`의 기준 본문을 반복했다.
- root guide와 skill이 모두 agent의 순차 실행을 설명해, 필요한 역할 선택보다 전체 lifecycle 재생이 기본처럼 보였다.
- 발동 설명에 사용자가 원하는 결과와 주제명, source 이름, 프로젝트 경로 사례가 함께 들어가 있었다.
- 모든 글에서 여러 기준 문서를 먼저 읽는 방식은 필요한 lens만 선택하는 dispatcher 역할과 맞지 않았다.
- 일부 writing agent가 선행 단계와 article type을 스스로 결정해 dispatcher의 routing 책임을 다시 가져갔다.
- 직전 실패 사례를 하나씩 제외하는 방식은 관심사 분리가 아니라 예외 목록을 늘리는 방식이었다.

## 결정

관심사별 소유자를 다음처럼 유지한다.

- `editorial/core/workflow.md`: 글쓰기 단계, 현재 산출물에 맞는 시작점과 단계 전환.
- `editorial/core/output-contracts.md`: 작업 모드별 결과물.
- `editorial/core/article-types.md`: 글 유형과 material signature.
- `editorial/core/reference-use.md`: 레퍼런스 사용 원칙.
- `editorial/lenses/`: 판단 lens.
- `editorial/guards/`: 공개 경계와 발행 hard guard.
- `editorial/README.md`: 실제 요청에서 필요한 소유 문서를 찾는 단일 색인.
- `CLAUDE.md`: 프로젝트 영역과 소유권 안내.
- `blog-write`: 원고 관련 결과를 `editorial/README.md`와 필요한 agent로 연결하는 dispatcher.
- writing agents: 선택된 역할의 report-only 실행.

`blog-write`의 발동 기준은 주제나 source가 아니라 사용자가 원하는 결과다. 새 원고, 기존 원고의 수정본, 원고 검토 결과, 발행 준비 결과 중 하나를 만들 때만 사용한다.

skill은 `editorial/README.md`에서 필요한 소유 문서를 찾고, `core/output-contracts.md`에서 결과 형식, `core/workflow.md`에서 시작 단계와 전환을 고른다. 글 유형은 material signature나 voice 차이가 현재 판단에 필요할 때만 dispatcher가 정한다.

writing agent는 dispatcher가 선택한 한 역할과 범위만 수행한다. 다른 stage나 agent를 선행 조건으로 만들지 않고, article type을 제공받지 않았으면 스스로 추정하지 않는다.

프로젝트 영역과 source별 공개 경계는 root guide, 가장 가까운 로컬 guide, `guards/source-policy.md`가 소유한다. `blog-write`는 그 세부 사례를 발동 조건으로 복사하지 않는다.

같은 관심사를 전역 문서와 대상 경로의 로컬 guide가 모두 정의하고 충돌하면 대상에 가장 가까운 로컬 guide를 우선한다. 로컬 guide가 다루지 않은 관심사는 전역 owner 문서를 따르며, agent는 workspace 경로의 의미를 자체 정의하지 않는다.

## 범위

- `CLAUDE.md`
- `.claude/skills/blog-write/SKILL.md`
- `content/drafts/README.md`
- `editorial/README.md`
- `editorial/core/workflow.md`
- `editorial/core/output-contracts.md`의 `new-draft` 계약
- `editorial/core/article-types.md`의 사용 시점
- `.claude/agents/`의 material, shaping, texture, structure, tone, source, evidence 역할
- `.codex/agents/`의 대응하는 일곱 역할
- 이 decision record

## 비목표

- `Material -> Shaping -> Texture -> Prepublish` 중심축을 바꾸지 않는다.
- 기존 lens, guard, output contract mode, article type 정의와 material signature를 바꾸지 않는다.
- 새 writing stage나 새 writing agent를 만들지 않는다.
- writing agent의 고유한 판단 기준을 다른 역할로 옮기거나 새 기준을 추가하지 않는다. 선행 단계 강제, 범위 확장, article type 강제처럼 routing에 속하는 문구만 걷어낸다.
- 기존 workspace 구조, 로컬 guide, 최근 content 작업 기록을 수정하거나 대체하지 않는다.
- 사이트 구현 하네스의 책임을 바꾸지 않는다.

## 근거

- [2026-05-04 Editorial 하네스 층위 재정리](2026-05-04-editorial-layer-restructure.md)는 같은 기준이 root guide, skill, editorial 문서, agent에 반복되는 문제를 확인하고 `blog-write`를 dispatcher로 줄이기로 했다.
- [2026-05-04 Article type material signature 추가](2026-05-04-article-type-material-signature.md)는 type 정의와 material signature의 단일 소유자를 만들었지만, 당시의 필수 조기 선택과 agent 추정 routing은 이번 결정이 부분 대체한다.
- [2026-05-08 series-pilab context 삭제](2026-05-08-remove-series-pilab-context.md)는 특정 사례의 이름과 문서가 존재한다는 이유만으로 일반 글 작업의 우선 경로가 되는 문제를 이미 확인했다.
- [Core Workflow](../core/workflow.md)는 Lens가 단계가 아니고 Agent가 얇은 실행자라고 명시한다.
- [Editorial README](../README.md)는 참고 기준을 글의 틀이 아니라 점검 거울로 정의한다.
- 2026-07-28 사용자 피드백은 "`blog-write`가 막 발동"하고 "그 스킬 틀로 작업하려는 게 보여서 어색"하다는 것이었다. 이어 "`active-state`도 너무 지엽적"이므로 "관심사 분리 측면"에서 보고, 최근 작업이 아니라 기존 하네스와 skill의 정합을 다루라고 범위를 고정했다.
- self-check는 기존 `PI Lab/dev-hub` 문구를 dispatcher 발동 설명에 다시 채택하고 직전 대화의 사례들을 예외 목록으로 만든 것이 같은 하드코딩 판단의 반복이라고 확인했다.

## 후속 점검

- 같은 결과를 요청하면 주제와 source가 달라도 같은 책임 경로를 복원하는가.
- 같은 주제라도 원하는 결과가 원고가 아니면 `blog-write`를 선택하지 않는가.
- 현재 결과에 필요한 core, lens, guard만 선택하는가.
- 새 원고 요청이 `new-draft` 결과 계약을 남기는가.
- article type은 dispatcher가 필요성을 판단하고, agent는 제공받은 type만 사용하는가.
- writing agent가 다른 역할을 선행 조건으로 만들거나 자동 순차 호출되는가.
- draft 승격에서 선택하지 않은 critic을 일괄 선행 조건으로 요구하지 않는가.
- 수정 뒤 `blog-harness-observer`가 skill, root guide, editorial 소유권의 중복이 줄었다고 판단하는가.
