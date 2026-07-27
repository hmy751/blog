---
작성일: 2026-07-27
갱신일: 2026-07-27
성격: post-sync v1 이후 near-final v2~v3 cycle / 내부 process index
공개상태: 내부 작업 문서
현재상태: near-final v3·regression review·검증 완료 / 사용자 검토 대기
---

# Near-final v2~v3 cycle

이 묶음은 post-sync v1을 문장 단위로 다듬는 작업이 아니다. 사용자가 다섯 v1을 읽고 “매력이 없고 풍부하지 않다”고 판단한 뒤, 실제로 읽을 만한 거의 최종본을 먼저 만든 다음 어떤 재료와 판단이 글을 살렸는지 역추적하기로 한 cycle이다.

기존 v1과 그 이전 v1~v3는 수정하지 않는다. 모두 실제 입력과 비교 snapshot으로 사용하되, 버전 번호가 높다는 이유로 현재 권위를 부여하지 않는다.

## 이번 cycle의 순서

1. 다섯 글의 중심은 [active-state](../../../active-state/topic-candidates.md)에서 가져온다.
2. 직접 원천으로 시간순 사건, actor, 수치, 제안과 구현의 구분을 다시 확인한다.
3. 기존 초안과 process에서 살아 있는 장면과 문장을 회수한다.
4. 글마다 다른 narrative engine과 public-safe artifact를 정해 전면 재작성 v2를 만든다.
5. v2를 shaping, texture, evidence 관점의 독립 reviewer에게 맡긴다.
6. main이 원자료와 현재 중심으로 review를 판정하고 near-final v3에 반영한다.
7. prepublish·공개 경계·링크·실제 페이지 읽힘을 확인한다.
8. v3에서 거꾸로 어떤 backlog 재료가 작동했고 무엇이 남았는지 기록한다.

독립 review는 새 기준을 쌓거나 중심을 다시 여는 단계가 아니다. 완성된 글에서 장면, 발견, 흐름, 사실 범위가 실제로 작동하는지 보고 v3 수정으로 회수하는 단계다.

## 산출물

- [01-context-and-material-ledger.md](./01-context-and-material-ledger.md)
  - 이번 cycle이 실제로 사용한 권위, 글별 주 장면, artifact, 주장 상한을 종합한다.
- [01a-current-and-independent-source-check.md](./01a-current-and-independent-source-check.md)
  - Current와 독립 판별 글의 직접 원천 대조 결과를 보존한다.
- [01b-scope-and-judgment-source-check.md](./01b-scope-and-judgment-source-check.md)
  - Scope control과 판단 순서 글의 직접 원천 대조 결과를 보존한다.
- [01c-self-check-source-check.md](./01c-self-check-source-check.md)
  - Self-check 글의 사건 순서 교정과 공개 범위를 보존한다.
- `02-v2-build-record.md`
  - 글별 구조, 선택한 장면과 기각한 설명, v1에서 달라진 점을 남긴다.
- `03-independent-review.md`와 reviewer별 원문
  - v2 동결본을 대상으로 한 shaping·texture·evidence report를 보존한다.
- `04-main-adjudication.md`
  - review 항목을 채택·조정 채택·기각·보류로 판정한다.
- [05-v3-build-and-reverse-trace.md](./05-v3-build-and-reverse-trace.md)
  - v3 반영 내용과 실제 글에서 역추적한 material·shaping 판단을 남긴다.
- [05a-v3-regression-review.md](./05a-v3-regression-review.md)
  - v3에서 장면·질감·사실 범위가 퇴행하지 않았는지 다시 확인하고 main의 최종 조율을 남긴다.
- [06-validation.md](./06-validation.md)
  - prepublish, 링크, 공개 경계, 페이지 읽힘 검증 결과를 남긴다.

원고는 다음 두 폴더에 분리한다.

- [전면 재작성 v2](../../../../../drafts/ai-native-topic-research-2026-07-20/2026-07-27-near-final-v2/README.md)
- [near-final v3](../../../../../drafts/ai-native-topic-research-2026-07-20/2026-07-27-near-final-v3/README.md)

## 현재 cursor

원천 재대조 뒤 다섯 중심은 유지했다. Self-check의 원천 불일치 장면을 교정하고, 각 글에 서로 다른 narrative engine과 public-safe artifact를 적용한 [전면 재작성 v2](../../../../../drafts/ai-native-topic-research-2026-07-20/2026-07-27-near-final-v2/README.md)를 동결했다.

이어 독립 shaping·texture·evidence review, main 판정, v3 regression pass를 거쳐 [near-final v3 다섯 편](../../../../../drafts/ai-native-topic-research-2026-07-20/2026-07-27-near-final-v3/README.md)을 완성했다. 링크·공개 경계·prepublish·production renderer 검증도 통과했다.

현재 cursor는 사용자가 criteria 문서를 먼저 해독하는 대신 v3 다섯 편을 실제 글로 읽고, 어떤 글이 가장 살아 있는지와 첫 글·제목·발행 관계를 판단하는 일이다. 그 뒤 수정할 때는 [역추적 기록](./05-v3-build-and-reverse-trace.md)으로 무엇이 글을 살렸고 어떤 상한이 남았는지 돌아간다.
