---
작성일: 2026-08-03
성격: AI self-check 개발 글 정합 실행 cycle / 내부 기록
공개상태: 내부 작업 문서
현재상태: 결말 두 문단 종결 반영, texture 2차 fresh 회수 완료 / 사용자 통독·수용 대기
---

# 2026-08-03 AI self-check 개발 글 정합 cycle

[개발 글 정합 계획](../../2026-08-03-ai-self-check-dev-article-refinement-plan.md)의 실행 기록이다. 준비(톤 전환 → 사용자 재독 → 확정분 반영)와 최대 3회 개선 loop의 회차별 산출물을 보존한다.

## 파일

- [00-pre-conversion-src-baseline.md](./00-pre-conversion-src-baseline.md) — 전환 전 했다체 판. 2026-08-02 통합 cycle의 최종본이자 [standalone improvement review](../2026-08-03-ai-self-check-standalone-improvement-review/review.md)가 읽은 판이다. src에서 byte 그대로 복사했고 복사 시점 SHA-256은 `d75eb89e0e5a…3c8873`으로 당시 src와 일치를 확인했다.
- [01-prep-user-recheck-and-recovery.md](./01-prep-user-recheck-and-recovery.md) — 준비 2 사용자 재독 원문과 결정(구체화 최소 변경, 역할 구분 시점 완화), 준비 3 반영·회수 기록.
- [round-01-draft.md](./round-01-draft.md) — 준비 3 확정분을 반영한 loop 첫 완결본. round 1 reviewer가 읽은 판이다.
- [round-01-review.md](./round-01-review.md) — round 1 fresh reviewer report 원문과 실행 계약.
- [round-01-recovery.md](./round-01-recovery.md) — round 1 Main 회수, 사용자 결정, source 쟁점 해소.
- [round-02-draft.md](./round-02-draft.md) — round 1 회수를 반영한 round 2 완결본.
- [round-02-review.md](./round-02-review.md) — round 2 fresh reviewer report 원문. 해커톤 문단의 사실 충돌 blocker를 찾았다.
- [round-02-recovery.md](./round-02-recovery.md) — round 2 Main 회수. blocker 검증·해소, 표현 정리 8건, 결말 리스트화 사용자 수용.
- [round-03-draft.md](./round-03-draft.md) — round 2 회수와 결말 리스트화를 반영한 round 3 완결본.
- [round-03-review.md](./round-03-review.md) — round 3 fresh reviewer report 원문. 첫 시도 agent의 stall 실패와 교체 이력 포함.
- [round-03-recovery.md](./round-03-recovery.md) — round 3 Main 회수(위임 하 선별 판단)와 loop 종료 판정.
- [04-hackathon-scene-fact-fix.md](./04-hackathon-scene-fact-fix.md) — loop 종료 뒤 사용자 재독이 잡은 해커톤 관계 정정(‘AX 인재전쟁’ 실명, 출제 기업)과 조사 순서 시제 정비.
- [05-texture-elevation-draft.md](./05-texture-elevation-draft.md) — texture 상향 리뷰어가 읽은 판. src byte 복사, SHA-256 `3a52d2c6…d84a`.
- [05-texture-elevation-review.md](./05-texture-elevation-review.md) — goal을 `기준 글`로 올린 texture 전용 fresh review의 계약, 계약 보강 전달 이력, 문장 축·보존 축 report 원문.
- [05-texture-elevation-recovery.md](./05-texture-elevation-recovery.md) — 문장 축 10건과 보존 축 2건 회수, 저자 선택 2건 이월, 원천 확인.
- [06-ending-informed-consultation.md](./06-ending-informed-consultation.md) — 결말 불만 반복에 대해 인터뷰·저자 우려·main 진단까지 준 informed 자문. 두 문단 종결 처방.
- [07-texture-round2-draft.md](./07-texture-round2-draft.md) — 결말 재작업 반영판. texture 2차 fresh 리뷰어가 읽은 판, SHA `15869c86…7559`.
- [07-texture-round2-review.md](./07-texture-round2-review.md) — 격리 복원한 새 fresh 리뷰어의 두 축 texture report 원문. 새 결말 문장이 보호 목록에 오름.
- [07-texture-round2-recovery.md](./07-texture-round2-recovery.md) — 2차 회수 10곳, 진단 귀속 쟁점의 기존 raw 확인 대조, 도식 QA 이월.

## 준비 1 — 톤 전환 (2026-08-03)

[src/ai-self-check.md](../../../src/ai-self-check.md) 전체를 했다체→합니다체, `나`→`저`(`내`→`제`)로 전환했다. register baseline은 [Current 발행글](../../../../../posts/2026-07-29-current-active-state-operation.md)이다.

- 제목과 소제목은 발행글 관례대로 했다체를 유지했다.
- 본문 인용은 원문 그대로 뒀다: “AI는 보통 이렇다”, “이번 작업에서 내가 무엇을 했는가”, “맞다”, `원본 자료가 없다`, `일단 전진`. 인용 속 `내가`는 AI 자신을 가리키는 self-check 질문이므로 전환 대상이 아니다.
- 중심 질문 bold는 의문 종결만 `있을까?`→`있을까요?`로 옮겼다. 결말의 작동형 지시문은 Current의 규칙 서술과 같은 합니다체 평서(`봅니다/확인합니다/지정합니다`)로 옮겼다.
- 구조, 재료, 사실, 주장 상한, 텍스트 도식, frontmatter는 바꾸지 않았다. standalone review 회수분(22행 주어, B1 분할 등)은 계획대로 준비 3에서 반영하며 이번 전환에 섞지 않았다.

### 사실 표현 강도 국소 확인 (전환 직후)

`git diff --word-diff`로 전환 전 판과 대조했다.

- 모든 변경은 문장 종결어미와 1인칭 대명사에 한정된다. 어휘·수식·문장 순서 변경 없음.
- hedge와 주장 상한 문장은 강도 그대로 유지: `가능성이 높았습니다`, `장면이 확인됩니다`, `최초 전환이었는지는 확인되지 않습니다`, `만든 것은 아닙니다`, `말할 근거도 없습니다`, `말하고 싶지는 않습니다`, `돌아갈 수 있었습니다`.
- 기계 검사: 잔여 평서 종결(`[^니]다.`) 0건, 잔여 1인칭은 위 인용문 1건뿐.

## 준비 2·3 — 사용자 재독과 확정분 반영 (2026-08-03)

재독에서 아쉬움이 장치 나열, 도입 진입성, 상황 설명 이해도, skill 명칭으로 언어화됐다. 장면 구체화는 익명 수준 유지(최소 변경)로, 역할 구분 시점은 기록 정합 완화로 확정했다. 반영 상세와 원천 확인은 [01-prep-user-recheck-and-recovery.md](./01-prep-user-recheck-and-recovery.md)가 소유한다.

## 다음

- loop는 상한 3회로 닫혔고, 이후 사용자 지시로 goal을 `발행 가능`에서 `기준 글`로 올린 texture 상향 회차를 실행했다. 문장 축 10건과 보존 축 2건은 src에 반영됐고, 리스트 3곳·도식은 보존 양호 판정을 받았다.
- 저자 선택 2건이 열려 있다: 109행 비호출 장면의 직접 발화 한 줄 인용(원고 유일의 사람 발화 후보), 129행 결말 선택지의 세 장면 대응 표면화.
- 재독에서 유보·기각 항목(문턱 기준 리스트화, 70~72행 위치, 82·97행 `다시 열었습니다` 반복)이 아쉬움으로 돌아오면 그 지점만 다시 연다.
- 발행 승격·date·readTime·tags 정리·prepublish 검사는 별도 단계.
