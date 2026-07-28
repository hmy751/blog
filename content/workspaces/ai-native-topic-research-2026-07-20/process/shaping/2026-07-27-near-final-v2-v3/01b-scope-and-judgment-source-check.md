---
작성일: 2026-07-27
성격: Scope control·판단 순서 직접 원천 대조 요약
공개상태: 내부 작업 문서
---

# Scope control과 판단 순서 원천 대조

## Scope control

### 확인한 시간순서

1. 2026-06-05에 실제 자료의 grounded answer를 만드는 첫 product proof 대신 `sanitized seed + deterministic adapter` 중심 경로가 제안됐다.
2. 사용자는 얇게 만든 결과가 실제 근거 기능인지, 왜 다시 데모 쪽으로 가는지 물었다.
3. deterministic baseline은 재현 가능한 개발 기준선으로 내리고, product proof는 자료에서 사용자 결과까지 이어지는 인과를 가져야 한다고 재정의했다.
4. 2026-06-09에는 client가 raw `facts[]`를 렌더링하는 경로가 더 작은 구현으로 제안됐다. 이것은 배포 실패가 아니라 구현 전 제안이다.
5. 이후 실제 질문 경로에 retrieval 후보, answer composer, 원문 grounding, 상태·값·근거가 붙은 답변, chat을 연결했다.
6. 2026-06-10에는 prose guard를 더 쓰는 대신 source 변화, grounding, 실제 route를 보는 세 제품행동 test와 호출자 없는 fact path 삭제를 남겼다.

### 공개용 상태 표

| 입력 자료 | 사용자가 받는 답 | 상태 | 다음 행동 |
| --- | --- | --- | --- |
| “체크인은 15:00부터” | 15:00 + 실제 근거 구절 | 확인됨 | 현재 자료를 근거로 판단 |
| “체크인은 16:00부터” | 16:00 + 바뀐 실제 근거 구절 | 확인됨 | 바뀐 시각으로 판단 |
| 체크인 시각 문장 없음 | 확정 시각 없음 | 자료에서 확인 못함 | 숙소나 판매자에게 추가 확인 |

첫 두 행은 하나의 metamorphic test다. 마지막 행은 같은 test의 세 번째 arm이 아니라 별도 missing-state 계약과 behavior를 합친 공개 설명이다.

### source anchor

- ai-note `2026-06-05-llm-grounding-demo-drift/raw.md`
- Tripproof `docs/implementation-notes/2026-06-09-spec-driven-product-flow-drift/index.md`, commit `6adc709`
- Tripproof `docs/specs/2026-06-06-accommodation-checkin-agoda-fukuoka/03-evidence-backed-facts.md`, commits `02bc3d7`, `54f5924`
- Tripproof `docs/decisions/2026-06-10-spec-driven-judgment-and-test-enforcement/index.md`, commits `50ad14f`, `4ec59dd`, `2eaefc9`

## 판단 순서

### 확인한 시간순서

1. 한 제품 조사에서 AI는 문제 존재·구체성·크기·과제 적합성을 순차 gate로 제안했다.
2. 사용자는 현재 근거가 잘 보이고 구현하기 쉬운 문제를 너무 일찍 높일 수 있다고 정정했다.
3. 첫 후보판을 고치지 않고 별도 second pass를 만들었다. 첫 후보판의 A1과 A2는 이미 존재했고, second pass는 두 차이를 처음 발견한 것이 아니라 독립 비교 단위로 올렸다.
4. 문제 후보 3개에서 solution을 세 개씩, 총 9개 만들었다.
5. 같은 9개를 문제 근거·행동 변화·입력·불확실성으로 다시 본 뒤 결합 방향 3개를 남겼다.
6. 세 방향을 같은 형식의 Markdown output과 정적 대화 목업으로 만들었다.
7. HTML에는 후보마다 세 상태, 총 9개 snapshot이 있고, 작업 기록에는 세 출력에 걸쳐 총 여덟 번의 상태 전환을 확인했다고 남아 있다.
8. 이후 별도 수렴 단계에서 한 후보를 선택했다.
9. 현재 블로그 조사에서는 main AI가 먼저 shaping할 세 편이라는 cursor를 가치 순위로, claim ceiling을 후보 감점으로 바꾸는 같은 오류를 다시 만들었다. 사용자가 shaping 전에 후보 가치를 닫지 말라고 정정했다.

### 공개용 비교 trace

```text
문제 후보 3개
→ 각 문제에서 solution 3개씩, 총 9개
→ 같은 9개를 근거·행동 변화·입력·불확실성으로 다시 검토
→ 결합 방향 3개
→ 같은 형식의 출력 3개
→ 각 출력의 초기 상태·사용자 수정·가정 답변 뒤 상태 비교
→ 마지막에 선택
```

### source anchor

- AX `context/process/14-integrated-criteria-and-independent-second-pass.md`, commit `1743e0c`
- AX `context/problem/01-candidates.md`
- AX `context/process/17-performance-led-solution-passes.md`, commit `012b21e`
- AX `context/solution/02-grounded-concretization.md`
- AX `context/process/19-output-first-comparison.md`
- AX `context/process/20-output-first-interactive-demo.md`
- AX `context/solution/05-output-first-interactive-demo.html`
- AX `context/process/21-prioritization-and-final-choice.md`, commit `e848dd3`
- blog `process/candidates/04-post-03-candidate-state-correction.md`

## 공개 경계

- raw 화면과 deterministic adapter를 배포된 실패라고 쓰지 않는다.
- 세 제품행동 test를 semantic quality나 실제 사용자 가치 증명으로 확대하지 않는다.
- second pass를 완전 blind 실험이나 A1/A2의 최초 발견으로 쓰지 않는다.
- 세 output과 상태 목업을 실제 plugin 동작으로 표현하지 않는다.
- 서로 다른 숫자를 하나의 품질 향상 계보로 연결하지 않는다.
