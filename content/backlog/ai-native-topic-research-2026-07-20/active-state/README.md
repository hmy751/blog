---
작성일: 2026-07-23
갱신일: 2026-07-27
성격: AI-native 역량 글감 active state / 내부 index
공개상태: 내부 작업 문서
현재상태: post-sync 새 v1·독립 review·main 판정 완료 / 사용자 검토 대기
---

# Active state — 지금 무엇이 유효한가

이 디렉토리는 AI-native 역량 글감 조사의 현재 실행 상태다. 전체 작업 과정을 담지 않고, 지금 적용할 기준·살아 있는 후보·현재 cursor와 다음 판단만 유지한다.

## 현재 권위

1. [criteria.md](./criteria.md)
   - 새 후보를 어떤 순서와 기준으로 판단할지 소유한다.
2. [topic-candidates.md](./topic-candidates.md)
   - 현재 후보의 위상, 근거, 주장 상한, shaping 상태를 소유한다.

후보를 만들고 글의 단위로 펼치는 작업은 [process](../process/README.md)에 둔다. process에는 완료된 과정과 현재 진행 중인 과정이 모두 들어갈 수 있다. active-state에는 그 과정 전체를 복사하지 않고, 현재 유효한 결과와 다음 cursor만 반영한다.

## 현재 cursor

첫 글은 아직 확정하지 않았다. 다음 상위 후보 다섯 개의 [1차 shaping](../process/shaping/README.md#2026-07-23-first-pass)과 v1~v3 [draft loop](../process/shaping/2026-07-27-v1-v3-draft-loop/README.md)를 완료한 뒤, 전체 버전·review·main 판단을 대조하고 사용자와 중심을 다시 맞췄다. 그 분석과 보정 이유는 [post-v3 사용자 sync](../process/shaping/2026-07-27-v1-v3-draft-loop/05-post-v3-reassessment-and-user-sync.md)에 보존한다.

보정된 중심으로 [새 cycle의 완결된 v1 다섯 편](../../../drafts/ai-native-topic-research-2026-07-20/2026-07-27-post-sync-v1/README.md)을 만들고 Material → Shaping → Texture를 마쳤다. 이어 서로의 결론을 받지 않은 두 독립 reviewer와 evidence checker의 [review](../process/shaping/2026-07-27-post-sync-v1/03-independent-review.md), main의 [반영 판정](../process/shaping/2026-07-27-post-sync-v1/04-main-adjudication.md)까지 별도 기록으로 남겼다. review가 시작된 뒤 v1 본문은 수정하지 않았다.

현재 cursor는 사용자가 다섯 v1과 review·main 판정을 함께 보고 다음 수정 범위와 버전 진행을 결정하는 일이다. v2는 아직 만들지 않는다. `current.md`의 공개 이름, 판단 순서 글과 `Output-informed problem selection`의 재료 소유권, self-check의 retrospective 목소리, 첫 공개 후보의 우선순위가 사용자 검토 항목으로 열려 있다.

- current / active-state operation
- 독립 판별 / 제3판별자
- 제품 흐름을 자르지 않는 scope control
- 생성·주장 판정·후보 수렴의 판단 순서
- AI self-check

목록 안에는 순위가 없다. 후보를 찾기 위한 현재 특징은 설명할 수 있지만, 그 특징을 위상의 근거·고정된 대표 강점·정렬 기준으로 사용하지 않는다. 이번 cycle에서는 다섯 후보 모두 완결된 새 v1로 만들며, 한 후보의 초안 결과를 다른 후보의 조기 탈락 기준으로 사용하지 않는다. 독립 review와 main 판정 뒤에도 자동으로 v2를 만들지 않고 사용자가 새 v1을 함께 본 뒤 다음 버전 진행을 결정한다.

새 초안의 상세 계약은 [post-v3 사용자 sync의 다음 초안 계약](../process/shaping/2026-07-27-v1-v3-draft-loop/05-post-v3-reassessment-and-user-sync.md#다음-초안-계약)에 남긴다. 이 index에서는 다시 어긋나지 않게 할 세 경계만 유지한다.

- backlog와 초기 재료를 실제 입력으로 사용하고 v2·v3의 사실 교정과 함께 본다.
- 작은 조각이 아니라 완결된 v1을 만든다. `blog-write`의 Material → Shaping → Texture는 그 안의 책임이지 각각의 draft 버전이 아니다.
- 독립 review와 main의 반영 선택은 판단 재료이며 사용자 합의로 자동 승격하지 않는다.

독립 판별과 AI self-check는 서로 연결된 두 편으로 두는 방향을 정했다. 새 cycle의 단위는 다섯 편의 완결된 v1이다. 첫 글, 최종 article type, 발행 순서와 시리즈 여부는 아직 열려 있다.

## 작업이 어긋났을 때 복구하는 순서

1. 이 README에서 현재 cursor를 확인한다.
2. [criteria.md](./criteria.md)에서 지금 적용할 판단 순서를 확인한다.
3. [topic-candidates.md](./topic-candidates.md)에서 후보별 합의된 중심과 다음 초안 경계를 확인한다.
4. 왜 그 중심으로 돌아왔는지는 [post-v3 사용자 sync](../process/shaping/2026-07-27-v1-v3-draft-loop/05-post-v3-reassessment-and-user-sync.md)에서 확인한다.
5. actor·수치·구현 여부·인과가 충돌하면 process 요약이나 최신 draft가 아니라 연결된 직접 원천을 다시 확인한다.

버전이 최신이거나 main이 review 제안을 `채택`했다는 사실만으로 active-state를 바꾸지 않는다. 사용자와 다시 맞춘 의미가 바뀔 때 active-state를 갱신한다.

## 갱신 계약

- 후보의 상태가 바뀌면 `topic-candidates.md`의 위상과 다음 행동을 함께 갱신한다.
- 기준이 바뀌면 `criteria.md`에서 적용 순서와 오용 방지까지 함께 갱신한다.
- 첫 장면·중심 질문·사건 배열을 시험하는 작업은 `process/shaping/`에 남긴다.
- shaping 결과로 후보 위상이나 다음 cursor가 달라질 때만 active-state를 갱신한다.
- shaping 순서와 후보 가치 서열을 같은 것으로 취급하지 않는다.
- 수치나 사건은 process 요약만 믿지 않고 직접 원천에서 다시 확인한다.
- private raw는 내부 판단 복구에만 사용하고 공개 원고에는 재서술한 최소 장면만 옮긴다.
- 미확인과 반례를 지우지 않는다. 준비도가 낮은 후보는 폐기 대신 보류 상태로 남긴다.
