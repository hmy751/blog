---
작성일: 2026-07-29
성격: artifact·evaluation·observability 하네스 요소 후보
현재상태: 미채택
---

# Artifact, Evaluation, and Observability Elements

이 문서의 후보는 결과물을 늘리기 위한 양식이 아니다. 어떤 관계를 실제로 관찰하고 어떤 판정이 어디까지 유효한지 보이게 만드는 산출물 후보다.

## A01. 충분히 통합된 v1

**관찰 대상**

부분별 정답이 합쳐졌을 때 전체 중심, 흐름, causal path, 사용자 경험이 살아나는가.

**최소 내용**

- 시작부터 끝까지 읽거나 실행 가능
- 핵심 source와 현재 frame이 실제 결과에 연결
- 의도적 미완성 표시

**판정**

통합 판단 가능 여부와 발견된 상위 간극.

**한계**

완결되었다고 acceptance나 verification을 획득하지 않는다.

## A02. Concept report

**관찰 대상**

아직 구현·원고 전체를 만들기 전에 문제 해석, 사용자 변화, 핵심 mechanism, 대표 장면의 관계가 설득력 있는가.

**최소 내용**

- 대상 사용자와 현재 문제
- 제안하는 변화
- causal path
- source 근거
- 가장 큰 불확실성

**판정**

다음 artifact를 만들 가치와 frame competition.

**한계**

실제 실행 가능성과 최종 경험을 증명하지 않는다.

## A03. Output-first comparison artifact

**관찰 대상**

설명 문서가 아니라 서로 다른 선택이 결과에 어떤 차이를 만드는가.

**최소 내용**

- 동일한 source와 목적
- 달라진 frame 또는 constraint
- 비교 가능한 결과
- 차이를 만든 입력

**판정**

어느 선택이 어떤 가치를 살리고 잃는지.

**한계**

두 output이 같은 frame이면 비교가 성립하지 않는다.

## A04. Vertical slice

**관찰 대상**

한 사용자 입력이 핵심 변환을 거쳐 실제 소비 가능한 output과 다음 행동으로 이어지는가.

**최소 내용**

- 대표 입력
- 핵심 logic
- 실제 output
- 최소 feedback

**판정**

causal path 작동과 가장 큰 blocker.

**한계**

전체 범위, scale, edge case를 검증하지 않는다.

## A05. External-contract E2E

**관찰 대상**

내부 component가 아니라 외부에서 보이는 계약이 실제 환경에서 유지되는가.

**최소 내용**

- 시작 조건
- 실제 interface
- 실행 evidence
- expected와 observed

**판정**

contract pass, failure, 환경 의존성.

**한계**

사용자 가치나 미학을 자동 검증하지 않는다.

## A06. Evaluation ledger

**관찰 대상**

어떤 기준이 어떤 결과에 어떻게 적용됐고, 판정이 이후 어떻게 바뀌었는가.

**최소 field**

- artifact/version
- criterion
- evaluator
- evidence
- result
- authority scope
- superseded by

**판정**

correlated pass, 빠진 기준, criteria drift.

**한계**

점수표가 판단을 대신하지 않는다.

## A07. Review packet manifest

**관찰 대상**

각 reviewer가 실제로 무엇을 받았고 무엇을 받지 않았는가.

**최소 field**

- role
- files
- excerpts
- current state
- excluded sources
- return contract

**판정**

report의 신뢰 범위와 packet-induced bias.

**한계**

파일 목록만으로 실제 reading이나 이해를 증명하지 않는다.

## A08. PASS scope record

**관찰 대상**

`PASS`가 무엇을 통과시켰고 무엇을 보지 않았는가.

**최소 field**

- target
- criteria
- evidence
- excluded dimensions
- validity conditions

**판정**

PASS가 허용하는 다음 행동.

**한계**

전체 품질·acceptance·publishability로 확대하지 않는다.

## A09. Reviewer correlation map

**관찰 대상**

여러 reviewer가 정말 독립된 판단을 했는지, 같은 prompt·source subset·criteria·frame을 공유했는지.

**최소 내용**

- inherited context
- shared assumptions
- unique lens
- report overlap
- disagreement

**판정**

독립 증거인지 correlated repetition인지.

**한계**

agreement가 많다는 이유로 무가치하다고 보지 않는다. shared evidence가 강할 수도 있다.

## A10. Decision diff

**관찰 대상**

한 quality signal 뒤 무엇이 실제로 바뀌었는가.

**최소 내용**

- before
- observation
- after
- affected artifacts
- unchanged decisions

**판정**

반영, 과교정, 미반영.

**한계**

문서 diff만 보고 판단 변화가 일어났다고 단정하지 않는다.

## A11. Source-to-result trace

**관찰 대상**

중요 source가 결과의 어느 사실·장면·중심·평가에 작동했는가.

**최소 field**

- source unit
- expected role
- result location
- transformation
- omitted or contradicted

**판정**

source possession, use, effect의 차이.

**한계**

모든 문장을 source에 일대일 연결하는 citation matrix가 아니다.

## A12. Quality signal log

**관찰 대상**

사용자·reviewer·test가 보낸 복합 신호가 이후 어떤 판단을 열었는가.

**최소 field**

- observer
- target
- positive signal
- negative signal
- comparison
- opened question
- action taken

**판정**

반복되는 신호, 서로 충돌하는 신호, 해석되지 않은 신호.

**한계**

감정과 취향을 숫자로 환원하지 않는다.
