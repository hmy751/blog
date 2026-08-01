---
작성일: 2026-08-01
성격: AI self-check source 기반 원고 개선과 fresh review 회수 기록
공개상태: 내부 작업 문서
현재상태: 완료 — Round 02·03 연속 fresh 통과로 조기 종료
---

# AI self-check Material·Shaping 개선 loop

## Goal

> AI self-check의 생성 배경과 실제 사용·변화·한계를 source에서 복구해, 현재 원고가 사건 몇 개를 설명하는 글을 넘어 하나의 탐구와 판단 변화로 읽히게 한다. 처음 읽는 개발자가 왜 이 문제가 생겼고 무엇을 다르게 보게 되었는지 따라간 뒤, 자기 AI 협업의 판단 위치와 다음 행동을 한 번 다시 보게 하는 글로 끌어올린다.

대상은 AI와 일하며 판단과 통제 방식을 고민하는 개발자다. 처음 읽는 독자가 끝까지 읽고, 같은 문제를 겪는 동료에게 보내거나 다시 꺼내 보며, 다음 AI 작업의 판단이나 행동 하나를 다시 보는 것을 최소 목표로 둔다.

## 입력과 역할 경계

- v0 writer는 당시 최신 원고, `sources/ai-self-check-origin-and-operation.md`, `sources/index.md`, 필요한 직접 원천과 Goal만 받는다.
- v0 writer에게 이전 improvement review, 후보 카드, active-state, process 논의, Main의 예상 중심과 절 순서는 주지 않는다.
- 각 회차 reviewer는 이전 회차를 보지 않은 fresh 주체다. 최신 `src/ai-self-check.md`, 생성 계보 source packet, source index, 필요한 직접 원천, Goal, 대상, 최소 목표만 본다.
- Reviewer는 Material과 Shaping을 하나의 총평으로 합치지 않고 기준·판정·move·통과 조건을 단계별로 반환한다.
- Main은 Material을 source와 먼저 대조해 반영한 뒤, 달라진 원고에서 Shaping 제안이 여전히 유효한지 다시 판단한다.
- 중심, 대표 장면, 사용자 경험의 의미가 갈리는 경우에만 사용자 판단으로 올린다.

## 종료 조건

- 최대 5회의 `fresh review → Main recovery`를 실행한다. source 기반 v0 작성은 준비 단계라 회차에 포함하지 않는다.
- 서로 다른 fresh reviewer가 2회 연속 다음을 만족하면 조기 종료한다.
  - 중요한 생성 배경·실패·판단 변화가 빠지거나 과장되지 않았다.
  - Material과 Shaping에 고우선 blocker가 없다.
  - 독자가 문제 정의·전제·입력 범위·작업 순서·다음 행동 중 실제로 달라진 위치를 판별할 수 있다.
  - 독자가 자기 AI 대화에서 확인할 다음 행동 하나를 얻는다.
- 5회차만 단독 통과하면 `잠정 통과`로 남기며 완료로 닫지 않는다.

## 산출물

- `00-source-based-v0.md`: 이전 review를 보지 않은 writer의 source 기반 준비 원고
- `round-NN-review.md`: 해당 회차 fresh reviewer의 단계별 report
- `round-NN-recovery.md`: Main의 기준 채택·조정·기각, Material 선반영, Shaping 재판정, 회차 종료 판정
- `round-NN-draft.md`: 회수 뒤 원고 snapshot
- 최신 원고: `../../../src/ai-self-check.md`

## 기준 ledger

| 상태 | 기준 | 근거와 적용 |
| --- | --- | --- |
| 유지 | 생성 배경·실제 사용·계약 변화·한계가 연표가 아니라 앞선 기대를 깨고 다음 기준을 낳는 탐구로 작동하는가 | Round 01 Shaping `Pass`. opening → demo → fresh·회수 → 호출 축소의 큰 구조를 보호한다. |
| 유지 | 독자가 답의 정오보다 답을 만든 판단 위치와 다음 행동의 변화를 판별할 수 있는가 | Goal과 Round 01 종료 항목 모두 `Pass`. 마지막 세 기준을 보호한다. |
| 채택 | 과거의 1인칭 동기·기대·깨달음은 직접 기억이 없으면 artifact에서 역산하지 않는다. | Round 01의 유일한 고우선 blocker. 현재 source 해석으로 문장 역할을 바꿨다. |
| 채택 | 진단 정확도, 직후 행동 변화, 장기 재발 감소는 서로 다른 결과다. | demo 사례와 글의 중심 질문을 연결하는 기준이다. |
| 채택 | fresh 판별의 가치는 다른 AI의 우월성이 아니라 판단 위치·입력 선택·회수 권한의 분리로 본다. | 6월 fresh 사용, 6월 설명 실패, AX 회수 과교정을 함께 제한한다. |
| 채택 | 운영 변화는 `inline → fresh → 원문 pull → 호출 문턱 축소`의 비용과 되돌림까지 포함한다. | 강화 일변도의 성공담으로 만들지 않는다. |

## 종료 결과

- v0는 기존 회사 조사 중심 원고를 생성 발단, 최초 inline 규칙, 실제 사용 실패, fresh와 회수, 입력·호출 경계가 이어지는 탐구로 다시 썼다.
- Round 01은 source가 비어 있다고 명시한 과거의 1인칭 기대·깨달음을 원고가 채운 문제로 Material `Fail`을 냈다. Main은 현재 source 해석으로 문장 역할을 바꾸고 운영 변화 구간을 국소 재배열했다.
- Round 02는 Material·Shaping·Goal 네 항목 모두 `Pass`였고 문서 사례 한 문단만 압축했다.
- Round 03도 이전 통과 이력을 모르는 fresh reviewer가 같은 네 항목을 모두 `Pass`로 판정했다.
- Opening의 `세 곳`은 Main이 2026-05-21 원본 rollout에서 세 후보의 열거와 `3군데 더 고쳤습니다`라는 보고를 다시 확인했다.
- 연속 fresh 통과 2회를 충족해 Round 03에서 종료했다. Round 04·05는 실행하지 않았다.
- 이번 완료 범위는 Material·Shaping이다. Texture, tone, evidence, 발행 준비는 별도 판단으로 남는다.

## 회차 상태

| 단계 | 상태 | 판정 |
| --- | --- | --- |
| source 기반 v0 | 완료 | 생성 계보와 실제 운영을 복구한 준비 원고를 최신 `src`에 반영했다. |
| round 1 | 완료 | Material `Fail`, Shaping `Pass`, Overall `Fail`. 과거 내면 추정 blocker를 회수했다. 연속 통과 0회. |
| round 2 | 완료 | Material·Shaping·Overall `Pass`. 선택적 압축만 반영했다. 연속 통과 1회. |
| round 3 | 완료 | Material·Shaping·Overall `Pass`. 연속 통과 2회로 종료 조건 충족. |
| round 4 | 미실행 | 조기 종료 조건 충족 |
| round 5 | 미실행 | 조기 종료 조건 충족 |
