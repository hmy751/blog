# AI self-check Round 03 Main recovery

## 회수 범위

- Reviewer: 이전 회차·수정 이력·Main 판정·통과 이력을 보지 않은 fresh reviewer
- Reviewer 입력: Round 03 당시 최신 `src/ai-self-check.md`, 생성 계보 source packet, source index, Goal·대상·최소 목표
- 직접 원천 spot-check: AX 회사 자료 가중치와 두 경로 복구 장면, opening의 `세 곳` 좁은 검색
- Reviewer가 보지 못한 층위: active-state, process, criteria ledger, 이전 review와 회수, 사용자와 Main의 현재 판단
- 판정: Material `Pass`, Shaping `Pass`, Overall `Pass`, Goal 네 항목 모두 `Pass`

## Material 회수

고우선 Material blocker는 없었다. Reviewer는 생성 발단, 최초 inline 계약, demo 실패, fresh와 회수의 분리, AX 과교정, 입력 pull, 호출 문턱 축소가 서로 다른 역할을 맡고 주장 상한을 지킨다고 판정했다.

### `세 곳` 재확인

Reviewer의 좁은 검색에서는 opening의 `세 곳`을 직접 회수하지 못해 저우선 확인 항목으로 남겼다. Main이 2026-05-21 원본 rollout의 message stream을 다시 확인했다.

- 사용자가 전체 과제에서 다른 후보도 다시 찾도록 요청했다.
- AI는 실제 추가 후보를 `secure-keypad`, `Specter`, `Gangnam Unni` 세 곳으로 좁혔다.
- 이어 `전체 다시 뒤졌고 3군데 더 고쳤습니다`라고 보고하고 세 항목을 각각 열거했다.

따라서 `전체 과제를 같은 방식으로 다시 보니 세 곳의 분류도 더 고쳐졌다`는 공개 원고 문장을 유지한다. 내부 과제명과 경로는 본문에 넣지 않는다.

## Material 확인 뒤 Shaping 회수

Material 수정이 없으므로 Shaping 판정도 그대로 유지한다.

### 보류한 선택적 전환문

Reviewer는 6월 17일 사례 뒤에 `그 판정을 현재 작업에 옮기는 순간 원래 함께 보던 판단 하나를 지울 수 있었다`는 AX 예고 문장을 제안했다. 현재 원고는 이미 다음 두 역할을 수행한다.

- `더 나은 판별과 현재 작업에 대한 적용은 다른 일이었다.`
- 역할 diagram 뒤 `판별자를 분리해도 회수 과정에서 다시 과교정할 수 있었다.`

제안 문장을 더하면 AX 장면의 발견을 미리 설명하고 같은 전환을 반복하므로 반영하지 않았다.

## 기준 ledger 반영

새 기준은 추가하지 않는다. Round 01에서 채택하고 Round 02에서 확인한 기준이 Round 03에서도 독립적으로 유지됐다.

- 발단은 `AI가 자기 개입을 원인에서 제외한 문제`로 읽힌다.
- `진단 / 직후 행동 / 재발 감소`는 분리된다.
- fresh 판별은 판단 위치·입력·회수 권한의 분리로 읽힌다.
- AX 장면은 판별자의 오답이 아니라 맞는 판정의 회수 과교정을 보여 준다.
- 입력 pull과 호출 축소는 앞선 실패와 비용에서 나온다.
- 마지막은 독자가 다음 검색·비교·수정 하나를 확인하게 한다.

## 회차 종료 판정

Round 02와 Round 03이 서로 다른 fresh reviewer에서 연속으로 전체 `Pass`를 냈고, 두 회차 모두 Goal 네 항목을 모두 통과했다. 종료 조건을 충족했으므로 최대 5회를 채우지 않고 Round 03에서 loop를 닫는다. Round 04와 Round 05는 실행하지 않는다.

이번 종료는 Material·Shaping loop의 완료다. Texture, tone, evidence, 발행 준비와 하네스 변경은 이 cycle의 범위가 아니며 자동으로 이어서 실행하지 않는다.
