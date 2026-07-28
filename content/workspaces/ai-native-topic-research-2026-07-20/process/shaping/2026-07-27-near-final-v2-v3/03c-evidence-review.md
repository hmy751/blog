---
작성일: 2026-07-27
성격: near-final v2 독립 evidence·공개 경계 review 보존본
공개상태: 내부 작업 문서
---

# 독립 evidence review

## 전체 판정

다섯 원고에서 삭제가 필요한 명백한 무근거 수치, 잘못된 시간순서, actor 오류, 기술 mechanism 오류는 찾지 못했다.

다만 몇 문장은 직접 증거의 단위를 더 정확하게 보이도록 교정해야 한다. 아래 교정은 스타일 제안이 아니라 v3에 반영할 근거 수정 후보다.

## Current

### Supported

- 현재 contract를 process에서 active 영역으로 옮긴 사건과 사용자 actor
- history / active contract / current / source의 역할
- 전체 지도와 단일 cursor 구조
- 21개 commit, current 변경 18개, actual active cursor 하나, 고유 문장 14개, 연속 version 간 변경 13회
- 설문 최근성 편향, 사용자 정정, 병렬 E2E 최신 결과 반영
- 마지막 세 commit의 terminal event 누락
- 현재 blog에서 process 결과가 닫힌 중심을 다시 연 사건

### 교정

`각 committed version에는 active marker가 하나씩`은 사용법 설명에 있는 literal marker와 혼동될 수 있다.

권장 문장:

> 18개 committed version마다 사용법 설명과 별개로 실제 활성 cursor가 하나씩 놓여 있었습니다.

## 독립 판별

### Supported

- 9·15는 같은 Python runner의 test method 수다.
- validator, CLI, source 대조, 설치형 자연어 E2E는 숫자 밖이다.
- `"false"`는 `bool("false")` 변환이 아니라 type guard 없는 값이 `is False` 분기를 비껴간 문제다.
- participant scope, 배열 순서 의존, revision lineage 결함
- read-only 판별자의 입력 범위
- 티켓 fixture와 공개 source의 모순 및 교정
- 설치형 자연어 E2E와 `추가 확인 → 결제 검토`
- 회귀 판별이 ZIP-only clean-room은 아니라는 상한
- 닫힌 입력의 판별자가 앞 단계 누락을 자동 복구하지 못한 후속 반례

### 교정

seller 답변은 실제 판매자 발화가 아니라 검증 fixture다.

권장 문장:

> 검증용 fixture 답변을 적용한 뒤에도 원안의 다른 충돌, 기본 비용, 별도 티켓 준비 부담은 그대로 남았습니다.

reviewer가 직접 수정하면 자기인증으로 돌아간다는 문장은 실측 결과보다 설계 위험이다.

권장 문장:

> reviewer가 직접 수정하고 자기 수정까지 통과시키면 구현자의 자기인증과 비슷한 구조가 될 위험이 있다고 봤습니다.

## Scope control

### Supported

- raw 검색 결과 경로와 deterministic adapter는 구현 전 제안이었다.
- 이후 retrieval → grounding → 상태·값·근거 → chat 경로가 구현됐다.
- `15:00 → 16:00`은 실제 metamorphic test다.
- `missing`은 같은 test의 세 번째 arm이 아니라 별도 계약과 behavior를 합친 공개 설명이다.
- 실제 route가 answer composer를 소비했고 unused fact path가 제거됐다.
- 세 제품행동 test의 범위는 source 변화, evidence substring, route 호출이다.

### 교정

세 조건이 쉬운 경로를 직접 유발했다는 인과를 낮춘다.

> `작게`, `안전하게`, `빨리 보이게`라는 조건 아래에서, 화면에 바로 붙일 수 있고 성공 여부가 명확한 경로가 더 작은 완결처럼 제안됐습니다.

metamorphic test의 일반화 범위를 두 fixture에 맞춘다.

> 적어도 이 두 입력에 같은 시각을 고정해 반환하는 응답은 통과할 수 없습니다.

표의 다음 행동까지 같은 test가 자동 검증한 것처럼 읽히지 않게 한다.

> 앞의 두 변화는 source·grounding test로 확인했고, 상태에 따른 다음 행동은 이 slice가 지키려 한 제품 계약으로 남겼습니다.

## 판단 순서

### Supported

- 현재 blog cursor 오독의 actor와 교정
- sequential gate, 사용자 정정, first board 보존, second pass
- A1/A2가 first board에도 있었고 second pass가 독립 비교 단위로 올린 사실
- 3 problems × 3 solutions, 같은 9개 재검토, 3 directions, 3 outputs, 마지막 선택
- 정적 목업의 후보별 세 상태와 총 9 snapshot
- controlled quality proof가 아니라는 상한

### 교정

작업 기록의 `8회 전환`은 후보 내부 상태 변화가 아니라 9개 화면을 순서대로 따라갈 때 생기는 화면 이동 수로 읽어야 한다. 후보 내부 상태 변화는 후보당 2번, 총 6번이다.

권장 문장:

> 각 후보에 세 상태가 있어 총 9개의 snapshot이 있었습니다. 작업 기록에는 이 9개 화면을 한 번씩 따라가며 8번 이동했다고 남아 있습니다. 후보 내부의 상태 변화만 세면 후보당 두 번, 총 여섯 번입니다.

## AI self-check

### Supported

- `첫 종합 → 회사 방향 우선 과교정 → 관계 복구`의 시간순서와 actor
- 첫 종합과 복구 상태의 증명 범위
- assignment의 한 건과 추가 세 곳 수정, “더 근본적으로” 요청 두 번
- 중간 AI 답변 전문이 없다는 상한
- forward-bias의 보존된 사용자 제동 세 개와 지침 before/after
- 장기 재발 감소를 주장하지 않은 상한

### 교정

완전한 turn log가 아니라 보존된 사용자 발화 세 개라는 증거 단위를 직접 쓴다.

> 보존된 기록에는 사용자가 같은 전진 방향을 멈춘 발화가 세 개 남아 있습니다.

## 공개 경계

- 다섯 원고에는 로컬 절대 경로, 내부 source/code 경로, session/task ID, JSONL 이름, 상품 URL, 생성 흔적, private memo 직접 인용이 없다.
- 독립 판별의 Python 코드는 공개용 최소 재현이라 안전하다.
- Self-check는 회사·프로젝트·agent 이름을 제거했고 직접 인용으로 위장한 문장이 없다.
- `current.md`, `active-state`, `process`는 실제 개인 운영 명칭이다. `current.md`를 공개 개념명으로 의도적으로 유지한다면 절대 경로와 프로젝트 식별자는 계속 숨긴다. 현재 blog 재현에서는 `현재 상태 영역`, `과정 기록`처럼 역할어로 바꿀 수 있다.
- Scope의 `supported`, `missing`은 공개 기술 설명에 필요한 범위만 남긴다.
