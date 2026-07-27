---
작성일: 2026-07-23
갱신일: 2026-07-27
성격: AI-native 상위 후보 shaping 과정 / 내부 index
공개상태: 내부 작업 문서
현재상태: 상위 후보 5개 public-reshape-v1·독립 review·main 판정 완료 / 사용자 검토 대기
---

# Shaping — 후보를 글의 단위로 펼쳐 보는 과정

이 디렉토리는 상위 후보를 곧바로 공개 원고로 만들기 전에, 실제로 한 편의 글이 될 수 있는지 같은 형식으로 펼쳐 보는 작업 과정이다.

## 왜 별도 디렉토리인가

이 조사 묶음에는 서로 다른 역할의 문서가 있다.

- [active-state/criteria.md](../../active-state/criteria.md)는 지금 적용할 후보 판단 기준을 소유한다.
- [active-state/topic-candidates.md](../../active-state/topic-candidates.md)는 현재 후보 이름·위상·주장 상한·다음 행동을 소유한다.
- [process/candidates/](../candidates/README.md)는 후보를 발견하고 재검토한 과정을 보여 준다.
- `process/shaping/`은 후보를 글의 단위로 시험한 과정을 보여 준다.
- 비교용 산문 초안은 다섯 후보 모두 버전별로 `content/drafts/ai-native-topic-research-2026-07-20/`에 둔다.

1차 shaping과 이후 draft loop는 작업 과정을 보존하지만, 최신이라는 이유로 active-state가 되지는 않는다. 후보 위상이나 적용 기준이 active-state와 충돌하면 active-state를 따른다. shaping 결과로 후보 상태나 다음 cursor가 달라질 때만 active-state에도 그 결과를 반영한다.

## 공통 형식

상위 후보 다섯 개를 다음 일곱 항목으로 펼친다.

1. 첫 장면
2. 중심 질문
3. 판단이 바뀐 시간순 사건
4. 독자가 볼 공개 가능한 자료
5. 사용자의 판단이 바뀐 지점
6. 다른 개발자가 가져갈 기준
7. 이번 자료가 말하지 못하는 한계

이 형식은 후보를 점수화하기 위한 표가 아니다. 어떤 후보는 기술 사건이 먼저 보이고, 어떤 후보는 개인적 판단 변화가 먼저 보일 수 있다. 항목을 같은 순서로 둔 이유는 차이를 숨기지 않고 비교하기 위해서다.

## 현재 shaping 묶음

### `2026-07-23-first-pass/`

상위 후보 다섯 개를 처음 같은 형식으로 펼친 작업 묶음이다. 아래 순서는 순위나 발행 순서가 아니다.

- [Current와 history의 권위 분리](./2026-07-23-first-pass/current-active-state-operation.md)
- [독립 판별의 판단 상태와 회수 구조](./2026-07-23-first-pass/independent-review-and-recovery.md)
- [제품 흐름을 보존하는 scope control](./2026-07-23-first-pass/product-flow-scope-control.md)
- [생성·주장 판정·후보 수렴의 판단 순서](./2026-07-23-first-pass/judgment-order.md)
- [AI self-check의 효용과 행동 변화](./2026-07-23-first-pass/ai-self-check.md)

### [`2026-07-27-v1-v3-draft-loop/`](./2026-07-27-v1-v3-draft-loop/README.md)

다섯 후보를 모두 v1~v3 산문으로 만들고, v1과 v2 뒤의 독립 review 및 main 반영 판단을 보존한 완료 작업 묶음이다. v3 뒤에는 전체 자료를 다시 대조하고 사용자와 중심을 맞춘 [post-v3 재검토](./2026-07-27-v1-v3-draft-loop/05-post-v3-reassessment-and-user-sync.md)까지 같은 묶음에 보존한다.

### [`2026-07-27-post-sync-v1/`](./2026-07-27-post-sync-v1/README.md)

기존 loop를 고치는 대신, post-v3 사용자 sync에서 되찾은 중심으로 새 v1 다섯 편을 만든 완료 작업 묶음이다. backlog, 직접 원천, 기존 초안과 review를 다시 대조한 [material 종합](./2026-07-27-post-sync-v1/01-material-synthesis-and-user-sync.md), Material → Shaping → Texture를 거친 [작성 기록](./2026-07-27-post-sync-v1/02-v1-build-record.md), 독립 review와 main 판정을 모두 별도로 남겼다.

### [`2026-07-27-near-final-v2-v3/`](./2026-07-27-near-final-v2-v3/README.md)

post-sync v1을 사용자가 검토한 뒤, 매력과 풍부함을 판단할 수 있는 거의 최종본을 먼저 만든 작업 묶음이다. 직접 원천과 backlog, 기존 draft·review를 다시 입력으로 사용한 전면 재작성 v2, 독립 shaping·texture·evidence review, main 판정, near-final v3, regression review와 production renderer 검증을 보존한다. v3에서 거꾸로 어떤 재료와 판단이 실제 글을 살렸는지도 [역추적](./2026-07-27-near-final-v2-v3/05-v3-build-and-reverse-trace.md)했다.

### [`2026-07-27-public-reshape/`](./2026-07-27-public-reshape/README.md)

사용자가 near-final v3를 실제 블로그 글로 읽은 뒤 완료 판정을 되돌리고, 공개 독자 기준으로 구조를 다시 잡은 작업 묶음이다. 기존 v3의 유효한 사실과 material은 입력으로 쓰되 파일은 수정하지 않았다. [상세 handoff](./2026-07-27-public-reshape/00-session-handoff.md)의 자료 권위와 순서에 따라 [public-reshape-v1 다섯 편](../../../drafts/ai-native-topic-research-2026-07-20/2026-07-27-public-reshape-v1/README.md), 독립 review와 [main 판정](./2026-07-27-public-reshape/04-main-adjudication.md)을 완결했다.

## 이번 1차 shaping의 범위

- 기존 backlog에 정리된 사건과 주장 상한을 글의 시간축으로 다시 배열한다.
- 아직 연결된 raw·code·test·diff를 전수 재검증하지 않는다.
- 공개 원고에 들어갈 실제 문장을 확정하지 않는다.
- article type, 첫 글, 발행 순서, 후보 병합을 확정하지 않는다.
- 공개 가능한 자료가 필요한 위치와 추가 확인 사항을 드러낸다.

## 1차 shaping 뒤의 판단

1차 shaping 직후에는 다음을 결정하려 했다.

- 첫 문단에서 문제가 실제로 보이는 후보는 무엇인가.
- 사용자의 판단 변화가 사건 안에서 가장 자연스럽게 드러나는 후보는 무엇인가.
- 공개 가능한 자료를 준비했을 때 글의 중심이 더 선명해지는 후보는 무엇인가.
- 한 장만으로 article type과 중심이 드러나지 않아 실제 산문을 써 봐야 하는 후보는 무엇인가.
- 어떤 후보를 `content/drafts/`의 실제 초안으로 먼저 옮길 것인가.

이 cursor는 이후 논의에서 다섯 후보 모두를 v1~v3까지 써 보고 사용자가 판단하는 방식으로 확장됐다. v3 뒤에는 결과만 고르는 대신 backlog·초안·review·main 판단을 종합 대조하고 사용자와 후보 중심을 다시 맞췄다. 당시 질문은 이력으로 보존하며, 완성된 과정은 [draft loop](./2026-07-27-v1-v3-draft-loop/README.md)를 따른다.

보정된 중심으로 새 v1을 만든 뒤, 별도 [near-final cycle](./2026-07-27-near-final-v2-v3/README.md)에서 다섯 편 모두 v3와 독립 review·검증까지 완료했다. 그러나 공개 독자 재평가에서 `near-final` 판정을 철회했고, [public reshape cycle](./2026-07-27-public-reshape/README.md)에서 기존 중심을 유지한 새 완결 원고와 검토 기록을 만들었다. 현재는 사용자 검토를 기다리며 독립 판별과 AI self-check를 연결된 두 편으로 두는 방향 외에 첫 글, 최종 article type, 발행 순서와 시리즈 여부를 확정하지 않는다.
