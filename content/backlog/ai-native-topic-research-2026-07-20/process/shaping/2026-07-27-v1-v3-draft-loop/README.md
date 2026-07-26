---
작성일: 2026-07-27
갱신일: 2026-07-27
성격: 상위 후보 5개 v1~v3 초안 반복 / 내부 process index
공개상태: 내부 작업 문서
현재상태: v1 작성 완료 / 첫 독립 review 전
---

# v1~v3 draft loop

이 묶음은 상위 후보 다섯 개를 모두 실제 산문으로 만든 뒤, 두 번의 독립 review와 main의 반영 판단을 거쳐 v3까지 발전시키는 과정을 보존한다.

목적은 reviewer 기준에 맞춰 글을 자동 수렴시키는 것이 아니다. 초안에서 드러난 문제를 원자료와 함께 다시 보고, 어떤 기준을 왜 적용하거나 적용하지 않았는지 사용자가 나중에 복원할 수 있게 하는 것이다.

## 입력

- [현재 기준과 후보 상태](../../../active-state/README.md)
- [후보 형성 과정](../../../process/candidates/README.md)
- [1차 shaping snapshot](../README.md#2026-07-23-first-pass)
- 각 문서가 직접 가리키는 원자료

기존 자료를 미리 `재료`, `제한`, `보류`, `폐기`로 고정하지 않는다. 각 초안을 쓰면서 어떤 맥락이 장면·근거·주장 상한·반례로 작동하는지 다시 판단한다.

## 산출물

초안:

- [v1](../../../../../drafts/ai-native-topic-research-2026-07-20/v1/)
  - [current를 active state로 운영하기](../../../../../drafts/ai-native-topic-research-2026-07-20/v1/current-active-state-operation.md)
  - [독립 판별자를 판단 과정에 넣기](../../../../../drafts/ai-native-topic-research-2026-07-20/v1/independent-review-and-recovery.md)
  - [AI와 일할 때 제품 흐름과 scope 통제](../../../../../drafts/ai-native-topic-research-2026-07-20/v1/product-flow-scope-control.md)
  - [생성과 판단의 순서를 분리하기](../../../../../drafts/ai-native-topic-research-2026-07-20/v1/judgment-order.md)
  - [AI가 자기 작업 방식을 원인에 넣어 점검하기](../../../../../drafts/ai-native-topic-research-2026-07-20/v1/ai-self-check.md)
- [v2](../../../../../drafts/ai-native-topic-research-2026-07-20/v2/)
- [v3](../../../../../drafts/ai-native-topic-research-2026-07-20/v3/)

과정 기록:

- `01-v1-independent-review.md` — 첫 독립 reviewer의 원문
- `02-v1-to-v2-adjudication.md` — main의 채택·조정·기각·보류와 v2 반영
- `03-v2-independent-review.md` — 새 독립 reviewer의 원문
- `04-v2-to-v3-adjudication.md` — main의 두 번째 판단과 v3 반영
- [criteria-evolution.md](./criteria-evolution.md) — 버전 사이 기준 변화와 아직 열린 판단

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
- 첫 독립 review: v1 checkpoint 뒤 진행
- v2: 대기
- 두 번째 독립 review: 대기
- v3: 대기
- 사용자 검토: v3 뒤
