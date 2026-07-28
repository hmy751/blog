---
작성일: 2026-07-28
성격: Blog editorial 기준 source+result 개선 review 회수본
공개상태: 내부 작업 문서
---

# B — editorial 기준 개선 review

## 입력 경계

B는 A와 같은 Current 원고와 직접 원천을 읽고 다음 기준 가운데 현재 쟁점과 관련된 항목만 사용했다.

- Core Shaping과 review-only output contract
- `product-architecture` material signature
- voice, developer, reader-flow, portfolio signal, edit patterns
- source policy는 공개 경계 제약으로만 사용

새 supporting material은 발동하지 않았다. 현재 원고의 Q4 전후 비교, Q1~Q5 시간축 표, map/cursor 도식, 네 상태 표가 이미 서로 다른 판단 역할을 맡고 있다고 보았다.

## 판정

B의 판정은 `local edit / partial edit`다.

현재 원고는 이미 `문제 장면 → 범위 재배정 → map/cursor 설계 → 상태별 갱신 규칙 → terminal gap → 재진입 규칙`의 흐름을 갖고 있으므로 중심이나 구조를 다시 열 필요가 없다고 보았다.

가장 큰 간극은 구조를 선택하며 바뀐 저자의 판단이 여러 문단에 흩어져 독자가 직접 조립해야 한다는 점이다.

## 채택한 move

- 첫 문단의 여행 plugin 배경을 의미가 사라지지 않는 범위로 압축하고 긴 AI 작업의 상태 문제로 빠르게 전환한다.
- 첫 3문단에서 문제를 `최근 사실의 오류`가 아니라 `질문 범위와 시간축의 오류`로 명확히 한다.
- 저자의 판단 변화를 두 단계로 명시한다.
  1. `current`는 최신 답 저장소가 아니라 질문 범위에 맞는 원천으로 내려가는 router였다.
  2. 읽기 경로만으로 부족하고 병렬·외부 사건 뒤 write-back 책임이 필요했다.
- `current`가 판단을 대신하지 않는다는 점과 복구 경로였다는 점을 분리해 읽히게 한다.
- 사람/AI 역할 회수와 후속 병렬 검증 갱신을 서로 다른 문단 역할로 나눈다.
- 네 상태 절의 제목을 실제 state ownership과 갱신 방식에 맞춘다.
- terminal gap 절의 중복 판정문을 줄이고 갱신 책임 문장을 보호한다.
- `fresh`, `active contract`, `router`는 첫 등장에 역할을 풀어 쓴다.

## Main 회수에서 조정한 점

B는 처음에 공통 packet에서 빠졌던 `process/30`을 보지 못해 설문 재작성 중 Q5 갱신 chronology를 좁히자고 제안했다. `process/30`을 추가로 제공하자 기존 문장이 직접 원천의 순서와 맞는다며 제안을 철회했다.

B가 사용자 선택으로 남긴 Git audit 수치 추가와 해커톤·plugin 익명화 변경은 이번 후보에 적용하지 않는다. 현재 중심과 공개 수준을 그대로 보존하면 사용자 판단 없이 진행할 수 있기 때문이다.

## Writer brief

현재 구조와 Q1~Q5 주 장면, map/cursor tradeoff, 네 상태 표, terminal gap, 마지막 두 질문을 보호한다. 오프닝에서는 여행 plugin보다 `최근 사실은 맞지만 질문의 시간축을 잘못 잡은 AI`를 먼저 세운다. 저자의 판단 변화 두 단계를 명시하고, 새 artifact 없이 문단 역할과 내부 용어의 첫 진입만 고친다.
