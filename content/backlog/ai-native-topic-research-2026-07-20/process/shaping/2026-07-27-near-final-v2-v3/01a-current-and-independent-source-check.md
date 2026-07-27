---
작성일: 2026-07-27
성격: Current·독립 판별 직접 원천 대조 요약
공개상태: 내부 작업 문서
---

# Current와 독립 판별 원천 대조

## Current

### 확인한 사건

- 한 구현 loop에서 현재 goal·acceptance·evidence와 선택 이유가 같은 process 문서에 있었다.
- 사용자 정정 뒤 현재 계약은 engineering 문서가, 선택과 실행 이력은 process가 소유하도록 분리됐다.
- 첫 구현 checkpoint의 fresh 판별 미통과와 후속 correction 통과는 current cursor의 실제 상태 전환으로 남았다.
- 프로젝트 전체를 묻는 제출 문항은 current를 읽고도 직전 구현에 끌렸다. 사용자가 어긋남을 발견했고, 질문별 시간축을 다시 나눠 전면 재작성했다.
- 병렬 작업에서 최신 E2E 결과가 바뀌자 current만 믿지 않고 직접 실행 원천을 다시 확인해 사실을 갱신했다.
- 마지막 세 commit 동안 current가 바뀌지 않아 설문 완료, 제출 검증, 외부 업로드 실패와 후속 대응이 빠졌다. 누락 원인은 단정할 수 없다.
- 다른 프로젝트에서는 current를 지도 우선과 단일 cursor 구조로 두 차례 다시 정리했다. 각 숫자는 서로 다른 snapshot의 구조 변경량이지 하나의 품질 추세가 아니다.

### 공개용 artifact

```md
| 정보의 역할 | 분리 전 | 분리 후 |
| --- | --- | --- |
| 지금 실행할 완료 조건 | 선택 이유와 함께 과정 기록 안에 놓임 | active contract가 현재판을 소유하고 방향이 바뀌면 갱신 |
| 왜 이 조건을 택했는가 | 현재 조건과 같은 위치에서 함께 갱신 | history가 당시 선택·기각·실행 결과를 보존 |
| 확인된 사실과 산출물 | 요약문 안에 다시 적힐 수 있음 | 사실과 산출물의 원천이 직접 소유 |
| 지금 어디를 봐야 하는가 | 여러 시점의 문장에서 다시 추론 | current가 전체 지도·현재 cursor·권위 원천 경로를 연결 |
```

```text
프로젝트 전체의 역할을 묻는 질문
→ current의 상위 지도
→ 조사·문제 정의·출력 비교·선택 기록

최신 구현의 입력·결과·한계를 묻는 질문
→ current의 현재 cursor
→ active contract·test·실행 기록
```

### source anchor

- AX `context/process/25-loop-01-goal.md`, `context/engineering/01-loop-01-goal.md`, commit `052831b`
- AX current audit `08-current-and-gate-audit.md`, commits `61981aa`, `0bdb843`
- AX `context/process/29-questionnaire-rebuild-from-current.md`, `30-questionnaire-final-verification.md`, commit `7c1fa47`
- AX `context/process/31-submission-form-correction-and-upload-failure.md`
- Cofathon `context/process/02-current-map-first-correction.md`, commit `541096b`
- Cofathon `context/process/34-refine-session-reentry-and-instruction-ownership.md`, commit `d911169`

## 독립 판별

### 확인한 사건

- 첫 checkpoint에서 실제 Python runner의 test method 9개와 별도 validator·CLI가 통과했다.
- read-only 판별자는 설치형 자연어 E2E 부재, source와 fixture 모순, type·participant scope·order·lineage 문제를 찾았다.
- 문자열 `"false"` 문제는 `bool("false")` 변환이 아니라 type 검증 없는 값이 `is False` 분기를 비껴간 것이었다.
- 사용자와 main은 티켓 한 항목만 고치지 않고 설치, 자연어 E2E, 상태 안전성, README, 짧은 회귀까지 교정 범위를 고정했다.
- 교정 뒤 같은 runner의 test method는 15개가 됐고 validator·CLI와 설치형 자연어 E2E는 숫자 밖에서 따로 확인했다.
- 모호한 답변은 거부됐고 충분한 fixture 답변은 관련 상태만 바꿨다. 다음 행동은 `추가 확인`에서 `결제 검토`로 이동했다.
- 짧은 회귀 판별자는 설치 상태와 E2E 기록을 입력으로 받았으므로 ZIP-only clean-room 재현이 아니다.
- 후속 별도 판정 실험은 판별 역할을 분리해도 앞 단계가 값을 누락하거나 잘못 고르면 닫힌 입력 밖을 자동 복구하지 못한다는 반례를 남겼다.

### 공개용 `"false"` 최소 재현

```python
class ContractError(ValueError):
    pass


def validate_boolean(value):
    if type(value) is not bool:
        raise ContractError("boolean value required")
    return value


def test_string_false_is_not_boolean_false():
    try:
        validate_boolean("false")
    except ContractError:
        pass
    else:
        raise AssertionError('문자열 "false"를 boolean으로 받아들였습니다.')
```

### source anchor

- AX `context/engineering/01-loop-01-goal.md`, commit `052831b`
- AX `context/process/26-loop-01-first-implementation-and-operations-retro.md`, commit `61981aa`
- AX `context/process/27-loop-01-correction-cycle.md`, commit `0bdb843`
- `61981aa:src/tests/test_tripproof.py` — 9 methods
- `0bdb843:src/tests/test_tripproof.py` — 15 methods
- Tripproof `03-conditional-value-entailment-judgment.md`, commit `a8ca41c`

## 공개 경계

- 내부 경로, task/session ID, cache, 상품 URL, private fixture 전문을 공개 원고에 쓰지 않는다.
- seller fixture를 실제 판매자 답변으로 표현하지 않는다.
- `15개 E2E`, `15개 자연어 test`, `15개 독립 test`라고 쓰지 않는다.
- Current의 활동 수치와 축약 수치를 품질·생산성 근거로 쓰지 않는다.
