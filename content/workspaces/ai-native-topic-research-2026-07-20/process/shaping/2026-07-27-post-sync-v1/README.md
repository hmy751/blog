---
작성일: 2026-07-27
갱신일: 2026-07-27
성격: post-v3 사용자 sync 뒤 새 v1 cycle / 내부 process index
공개상태: 내부 작업 문서
현재상태: 새 v1·독립 review·main 판정 완료 / 사용자 검토 대기
---

# Post-sync v1 cycle

이 묶음은 기존 v1~v3를 다시 고치는 작업이 아니다. backlog, 1차 shaping, 기존 초안과 review, 직접 원천, post-v3 사용자 sync를 함께 읽고 보정된 중심으로 새 v1 다섯 편을 만드는 과정이다.

기존 자료는 원래 위치에서 실제 입력으로 사용한다. 이 폴더로 복사하거나 옮기지 않으며, 기존 v1~v3와 이전 process 원문은 수정하지 않는다. 이 묶음에는 이번 cycle에서 새로 생긴 종합, 사용자 답, v1 작성 판단, 독립 review, main 판정만 남긴다.

## 이번 cycle의 단위

- current / active-state operation
- 독립 판별 / 제3판별자
- 제품 흐름을 보존하는 scope control
- 생성·주장 판정·후보 수렴의 판단 순서
- AI self-check

다섯 편은 순위가 아니다. 모두 사용자가 방향을 직관적으로 판단할 수 있는 완결된 새 v1로 만든다.

`Material → Shaping → Texture`는 한 v1 안에서 맡는 서로 다른 책임이다. 각 단계를 별도 draft 버전으로 세지 않는다. 새 v1과 독립 review, main 판정까지 만든 뒤 사용자 검토 전에 v2로 넘어가지 않는다.

## 입력 권위

1. [active-state 기준](../../../core/criteria.md), [현재 후보 중심](../../context-structure/legacy-active-state/topic-candidates.md), [post-v3 사용자 sync](../2026-07-27-v1-v3-draft-loop/05-post-v3-reassessment-and-user-sync.md)
   - 현재 글의 중심과 사용자 합의를 소유한다.
2. 직접 원천과 v2·v3의 사실 교정
   - actor, 수치, 제안·구현 여부, 인과, 주장 상한을 소유한다.
3. [후보 형성 과정](../../candidates/README.md), [1차 shaping](../2026-07-23-first-pass/), 기존 v1
   - 살아 있는 장면, 질문, 판단 변화, 목소리와 가능한 spine을 보존한다.
4. 기존 독립 review와 main 반영 판단
   - 중요한 판단 재료지만 사용자 합의와 같지 않다.
5. 기존 v1·v2·v3
   - 중심과 형식을 시험한 snapshot이며 버전 번호만으로 현재 권위를 얻지 않는다.

## 산출물

- [01-material-synthesis-and-user-sync.md](./01-material-synthesis-and-user-sync.md)
  - 다섯 후보의 재료·사실 교정·중심 가설을 한 문서에 종합하고, 필요한 사용자 질문과 답을 함께 남긴다.
- [02-v1-build-record.md](./02-v1-build-record.md)
  - 새 v1을 쓰며 Material·Shaping·Texture에서 채택·조정·기각한 판단을 후보별로 남긴다.
- [03-independent-review.md](./03-independent-review.md)
  - main의 종합과 예상 문제를 받지 않은 독립 reviewer의 입력 manifest와 report 원문을 남긴다.
- [04-main-adjudication.md](./04-main-adjudication.md)
  - review 항목을 채택·조정 채택·기각·보류로 판정한다.
- `05-user-review-and-next-decision.md`
  - 사용자가 새 v1을 실제로 검토한 뒤에만 만든다.

새 원고 다섯 편은 [draft 폴더](./drafts/2026-07-27-post-sync-v1/README.md)에 보존한다.

## 현재 cursor

다섯 후보의 직접 원천, 기존 v1~v3, review·main 판단, backlog의 살아 있는 재료를 [한 문서에 종합했다](./01-material-synthesis-and-user-sync.md). 최초 종합에서 material partner의 글감 질문 일부가 이미 닫힌 중심을 다시 여는 사용자 질문으로 바뀐 누수를 발견했고, 질문 원문을 보존한 채 사용자 답변과 판정 회수까지 같은 문서에 남겼다.

회수한 중심으로 새 v1 다섯 편을 쓰고, 후보별 Material·Shaping·Texture 판단과 독립 review 입력·원문·main 판정을 모두 남겼다. review가 시작된 뒤 원고 본문은 수정하지 않았다.

현재 cursor는 사용자가 다섯 v1과 review·main 판정을 함께 검토하고 다음 수정 범위, 후보 사이의 재료 소유권, v2 진행 여부를 결정하는 일이다. 사용자 검토 전에는 `05-user-review-and-next-decision.md`를 만들거나 v2를 시작하지 않는다.
