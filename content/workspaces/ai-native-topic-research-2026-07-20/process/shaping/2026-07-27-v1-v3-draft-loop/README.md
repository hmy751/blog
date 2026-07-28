---
작성일: 2026-07-27
갱신일: 2026-07-27
성격: 상위 후보 5개 v1~v3 초안 반복 / 내부 process index
공개상태: 내부 작업 문서
현재상태: v3 다섯 편 완료 / post-v3 종합 대조와 사용자 중심 보정 완료 / 새 cycle 준비
---

# v1~v3 draft loop

이 묶음은 상위 후보 다섯 개를 모두 실제 산문으로 만든 뒤, 두 번의 독립 review와 main의 반영 판단을 거쳐 v3까지 발전시키는 과정을 보존한다.

목적은 reviewer 기준에 맞춰 글을 자동 수렴시키는 것이 아니다. 초안에서 드러난 문제를 원자료와 함께 다시 보고, 어떤 기준을 왜 적용하거나 적용하지 않았는지 사용자가 나중에 복원할 수 있게 하는 것이다.

## 입력

- [현재 기준과 후보 상태](../../../active-state/index.md)
- [후보 형성 과정](../../candidates/README.md)
- [1차 shaping snapshot](../README.md#2026-07-23-first-pass)
- 각 문서가 직접 가리키는 원자료

기존 자료를 미리 `재료`, `제한`, `보류`, `폐기`로 고정하지 않는다. 각 초안을 쓰면서 어떤 맥락이 장면·근거·주장 상한·반례로 작동하는지 다시 판단한다.

## 산출물

초안:

- [v1](./drafts/v1/)
  - [current를 active state로 운영하기](./drafts/v1/current-active-state-operation.md)
  - [독립 판별자를 판단 과정에 넣기](./drafts/v1/independent-review-and-recovery.md)
  - [AI와 일할 때 제품 흐름과 scope 통제](./drafts/v1/product-flow-scope-control.md)
  - [생성과 판단의 순서를 분리하기](./drafts/v1/judgment-order.md)
  - [AI가 자기 작업 방식을 원인에 넣어 점검하기](./drafts/v1/ai-self-check.md)
- [v2](./drafts/v2/)
  - [current를 active state로 운영하기](./drafts/v2/current-active-state-operation.md)
  - [독립 판별자를 판단 과정에 넣기](./drafts/v2/independent-review-and-recovery.md)
  - [AI와 일할 때 제품 흐름과 scope 통제](./drafts/v2/product-flow-scope-control.md)
  - [생성과 판단의 순서를 분리하기](./drafts/v2/judgment-order.md)
  - [AI가 자기 작업 방식을 원인에 넣어 점검하기](./drafts/v2/ai-self-check.md)
- [v3](./drafts/v3/)
  - [current를 active state로 운영하기](./drafts/v3/current-active-state-operation.md)
  - [독립 판별자를 판단 과정에 넣기](./drafts/v3/independent-review-and-recovery.md)
  - [AI와 일할 때 제품 흐름과 scope 통제](./drafts/v3/product-flow-scope-control.md)
  - [생성과 판단의 순서를 분리하기](./drafts/v3/judgment-order.md)
  - [AI가 자기 작업 방식을 원인에 넣어 점검하기](./drafts/v3/ai-self-check.md)

과정 기록:

- [01-v1-independent-review.md](./01-v1-independent-review.md) — 첫 독립 reviewer의 원문
- [02-v1-to-v2-adjudication.md](./02-v1-to-v2-adjudication.md) — main의 채택·조정·기각·보류와 v2 반영
- [03-v2-independent-review.md](./03-v2-independent-review.md) — 새 독립 reviewer의 원문
- [04-v2-to-v3-adjudication.md](./04-v2-to-v3-adjudication.md) — main의 두 번째 판단과 v3 반영
- [criteria-evolution.md](./criteria-evolution.md) — 버전 사이 기준 변화와 아직 열린 판단
- [05-post-v3-reassessment-and-user-sync.md](./05-post-v3-reassessment-and-user-sync.md) — v1~v3 종합 대조, 사용자와 다시 맞춘 중심, 다음 초안 계약

## 반복 계약

1. v1은 다섯 편 모두를 완결된 산문으로 만든다.
2. 첫 reviewer는 backlog·원자료와 v1을 직접 본다. main의 예상 문제, 평가 기준, 원하는 결론은 주지 않는다.
3. main은 review를 자동 적용하지 않고 각 항목을 채택·조정·기각·보류한다.
4. v1은 보존하고 v2를 새 폴더에 만든다.
5. 두 번째 reviewer는 backlog·원자료와 v2만 본다. 첫 review, 첫 반영 판단, 기준 변화 문서는 주지 않는다.
6. main은 다시 판단해 v3를 새 폴더에 만든다.
7. v3 뒤에는 자동 선택·병합·발행을 하지 않고 사용자 검토를 기다린다.

reviewer는 파일을 수정하지 않고 글 순위, 첫 글, 병합, 발행 여부를 결정하지 않는다.

## 현재 상태

- v1: 다섯 편 작성 완료
- 첫 독립 review: 완료 / 원문 보존
- v1→v2 반영 판단: 완료
- v2: 다섯 편 작성 완료
- 두 번째 독립 review: 완료 / 원문 보존
- v2→v3 반영 판단: 완료
- v3: 다섯 편 작성 완료
- post-v3 종합 대조와 사용자 sync: 완료
- 다음 초안: 보정된 중심으로 새 cycle의 v1 준비 / 정확한 초안 단위는 미결정

이 loop의 `사용자 검토 대기`는 첫 글을 바로 고르는 대신, 전체 버전과 기준 변화를 다시 대조하고 중심을 보정하는 과정으로 이어졌다. 현재 권위는 [active-state](../../../active-state/index.md)를 따르고, v1~v3와 01~04는 완료된 snapshot으로 보존한다.
