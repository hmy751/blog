---
작성일: 2026-07-28
성격: 단계별 개선 review의 main 회수
공개상태: 내부 process
원고수정: 없음
---

# 단계별 source 개선 review 회수

## 확인한 입력 경계

- 첫 reviewer는 Shaping 역할 계약에 따라 원고, editorial core·lens, source map과 직접 원천을 보고 focused shaping을 제안했다.
- Material, Texture, Prepublish까지 요구한 후속 요청은 해당 agent의 역할 경계와 충돌해 확장하지 않았다.
- 별도의 범용 reviewer가 이전 review를 보지 않고 같은 원고·source를 독립적으로 읽어 네 단계를 구분했다.
- 두 reviewer 모두 대상 workspace의 `active-state`, 이전 원고, 이전 review, main의 과거 판정을 입력받지 않았고 파일을 수정하지 않았다.

## 채택

### 1. Material은 충분하다

새 조사가 필요한 문제가 아니다. AX `current` 비대화, verifier·E2E 역할 충돌, Cofathon 후속 축소와 역할별 계약 분리는 이미 source에 있다. 현재 작업은 source 수집보다 선별과 배치다.

### 2. 시작점은 focused shaping이다

현재 중심과 전체 순서는 유지한다. 다음 세 연결만 보강한다.

- Alex의 procedural scaffold와 사용자의 세션 간 상태 표면 사이 차이.
- research 숫자·산출물 계보를 판단 이동으로 읽히게 하는 trace.
- recency·freshness 한계가 비대화·역할 충돌을 거쳐 후속 계약 재설계로 이어진 장면.

### 3. 한계는 다음 설계 변경까지 이어져야 한다

현재 원고의 한계 절은 정확하지만 면책과 경계에 가깝다. 글의 goal을 끌어올리려면 반례가 무엇을 실제로 바꾸었는지 보여 줘야 한다. Cofathon은 Current의 효과 증거가 아니라 AX에서 놓친 길이·역할 조건을 다시 고친 후속 계보다.

### 4. 강한 문장과 사용자 경험은 보호한다

`뭔가 계속 유지되고 있었다`, `펼친 재료가 어디에 있고 지금 무엇을 좁히는 중인지`, 마지막 문장은 계측치나 더 generic한 표현으로 낮추지 않는다.

## 조정

### Research trace의 형식

reviewer는 text trace를 제안했고, 사용자는 단계별 흐름이 보이는 형식을 명시적으로 선택했다. 중요한 것은 숫자 자체보다 `과교정 → 앞선 합의로 복귀 → 보존·재추출 → 수렴`의 판단 이동이다.

### Alex 사례의 범위

기존 review 문장처럼 Alex의 문제를 `여러 회사에 같은 절차를 반복하는 일`로 좁히지 않는다. 원천의 scaffold는 요구사항과 출제 의도부터 research, 문제·해결안 비교, engineering, verification까지 전체 문제 해결 과정을 외부화하고 계속 고친 구조다. 회사별 병렬 운용은 그 구조가 만든 효과 중 하나다. 사용자의 변형은 이 넓은 scaffold에서 받은 영감을 기존 context 문제와 결합해 전체 지도와 현재 위치 하나로 옮긴 것으로 쓴다.

### Cofathon의 분량

후속 재설계는 한 문단 안에서 회수한다. 별도 대형 section이나 두 번째 프로젝트 복기로 커지면 중심이 `current` 사례에서 전체 harness 설계로 이동한다.

### 역할 충돌의 범위

verifier·E2E와 blind second pass 사건은 `같은 current를 모든 역할에 같은 방식으로 적용할 수 없다`는 기준까지만 사용한다. 독립 review 설계를 자세히 설명하는 별도 글의 범위를 가져오지 않는다.

## 보류

- 최종 문장 교체안과 research trace의 실제 형식은 focused shaping에서 원고 전체 리듬을 보며 정한다.
- Alex 라이브 원본 URL 복구는 현재 shaping의 blocker가 아니다. 발행 시 공개 출처 링크가 필요하면 다시 확인한다.
- `current`의 생산성·품질 효과는 새 근거 없이 주장하지 않는다.
- Article type 판정은 편집 우선순위를 잡는 데만 사용하며 원고에 유형 라벨을 붙이지 않는다.

## 다음 편집의 완료 조건

원고 본문만으로 다음 순서를 복구할 수 있어야 한다.

`기록량 문제로 다룸`
→ `현재 효력 제어 문제로 다시 봄`
→ `Alex의 전체 문제 해결 scaffolding에서 다른 가능성을 봄`
→ `전체 지도·단일 cursor·역할별 원천으로 변형`
→ `재진입과 수렴에 실제 사용`
→ `recency·freshness·비대화·역할 충돌 확인`
→ `길이와 역할별 재진입 계약을 다시 설계`
→ `사람과 AI가 판단을 다시 맞추는 운영면이라는 발견`

이 순서가 보이면 Texture로 넘어간다. 아직은 원고를 수정하지 않는다.
