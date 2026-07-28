---
작성일: 2026-07-28
갱신일: 2026-07-29
성격: Current 글의 현재 판단 확대판
공개상태: 내부 작업 문서
---

# Current / active-state operation

이 문서는 Current 글에 대해 현재도 유효한 판단과 열린 문제를 확대해서 본다. 판단이 만들어지고 달라진 과정은 `process`, 사실과 사건은 직접 원천, 최신 원고는 `src`가 소유한다. 진행 cursor는 [active-state index](./index.md)에만 둔다.

## 이 글을 쓰는 이유

출발점은 `current`라는 파일 형식 자체가 아니다.

- 작업 과정과 결정은 많이 남았지만, 다음 AI는 그 기록에서 지금 무엇이 유효한지 다시 추론해야 했다.
- 최근 대화나 직전 구현만 남기면 현재 작업에는 빨리 들어가도 그 일이 전체 프로젝트에서 어떤 의미인지 잃었다.
- 모든 세부를 한 문서에 넣으면 다시 긴 상태 보고서가 되어 전체 그림보다 정보량이 앞섰다.

그래서 전체 프로젝트의 생각 구조를 낮은 해상도의 지도에 두고, 그 안에 현재 판단점 하나를 표시했다. `current`는 답을 대신하는 문서보다 사람과 AI가 같은 전체 그림에서 다시 시작하게 하는 scaffolding에 가깝다.

이 판단과 시간순 사건, 사용자의 운영 감각은 [첫 shaping](../process/shaping/2026-07-23-first-pass/current-active-state-operation.md)에 이미 펼쳐져 있다. 이후 편집에서 이 material을 새로 찾아야 할 미수집 상태로 취급하지 않는다.

## 현재 중심과 장면의 위계

- 중심: 전체 생각지도와 현재 판단점 하나로 세션 사이의 sync를 돕는 scaffolding
- 생성 계보: 해커톤 전부터 있던 context 유실·제어 문제 → 유튜버 Alex가 AX 인재전쟁에서 전체 문제 해결 과정을 외부화한 scaffolding → 여러 세션이 이어 쓸 `전체 지도 + 현재 위치 하나`로의 변형
- 성공 장면: 새 세션이 요구사항 재확인이라는 위치를 복원한 재진입, 넓게 펼친 research가 과교정 뒤 앞선 합의로 돌아가 후보와 해결안으로 수렴한 과정
- 한계 장면: 최근 구현에 끌린 Q1~Q5 답변을 사람이 정정한 사건, 마지막 세 commit의 상태가 지도에 반영되지 않은 terminal gap
- 설계 원리: history, active contract, current, source의 수명·쓰기 권한·사실 권위를 나눈 것
- 후속 재설계: Cofathon에서 비대해진 `current`를 두 번 지도 중심으로 줄이고 main·compact·verifier의 재진입 계약을 나눈 것

Q1~Q5 사건은 `current`의 생성 이유나 글의 중심이 아니다. 이미 운영하던 구조가 어디까지 돕고 어디서 멈추는지를 보여 주는 한계 장면이다. 회수는 사용자 정정, current 지도, 과정 기록과 직접 원천이 함께 작동한 결과이며 current 단독 효과로 쓰지 않는다.

## 현재 작업본

[src/current-active-state-operation.md](../src/current-active-state-operation.md)는 생성 계보를 다시 조사해 2026-07-28에 전면 재구성하고, 2026-07-29 focused shaping을 적용한 최신 작업 시도다.

- 해커톤 전부터 있던 context 문제와 AX 인재전쟁 참여를 출발점에 복구했다.
- Alex 사례를 회사별 병렬 처리만을 위한 구조로 좁히지 않고 전체 문제 해결 과정을 외부화한 scaffolding으로 바로잡았다.
- `전체 지도 + 현재 위치 하나`로 변형한 이유와 최초 운영 구조를 연결했다.
- 첫 재진입과 research 수렴을 실제 사용 장면으로 올리고, research의 `과교정 → 앞선 합의 복귀 → 후보판 보존·재추출 → 수렴`을 단계별 trace로 만들었다.
- Q1~Q5와 terminal gap을 한계로 낮추고, Cofathon의 문서 축소와 역할별 재진입 분리를 후속 재설계로 연결했다.

이 파일은 최신 작업본이지만 사용자 수용이나 발행 검증이 끝난 원고는 아니다. 작성과 review 과정은 [current scaffolding rewrite](../process/shaping/2026-07-28-current-scaffolding-rewrite/README.md)에 보존한다.

## 다음 review

Material은 더 수집하지 않았다. 현재 수정본을 원고와 직접 원천만 보는 독립 reviewer에게 넘겨 Shaping, Texture, Prepublish를 함께 점검했다. Review는 shaping과 texture를 통과시키고 source 정확성을 겸한 light edit를 제안했다. Main은 사실 범위 여섯 곳, 반복, trace 뒤 해석, 후속 재설계 문단의 과밀, private 직접화법을 교정했다. 자세한 입력 경계와 회수는 [post-shaping review](../process/shaping/2026-07-28-current-scaffolding-rewrite/04-post-shaping-review-and-recovery.md)에 있다.

## 열린 판단

- `[열림]` 사용자가 현재 원고의 중심, 목소리, research trace, 후속 재설계를 수용하는지
- `[열림]` Alex 특정 영상의 공개 URL을 발행 전에 복구할지
- `[보류: 사용자 수용과 발행 선택 뒤]` 최종 `readTime`, tags, 발행일
