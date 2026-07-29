---
작성일: 2026-07-29
성격: learning·write-back·maintenance 하네스 요소 후보
현재상태: 미채택
---

# Learning, Write-back, and Maintenance Elements

이 문서의 후보는 실패를 모두 영구 규칙으로 저장하는 장치가 아니다. 다시 쓸 가치가 있는 판단을 사례·대비·발동 신호와 함께 보존하고, 쓸모가 없어진 요소를 제거하기 위한 후보다.

## L01. Core candidate card

**내용**

- 관찰된 문제
- 제안 원리
- AI-native인 이유
- 실제 사례와 반례
- 발동 신호
- 바꾸는 판단
- 적용 한계
- 합의 상태

**승격 조건**

한 사례 설명을 넘어 다른 작업에서 판별 가능하고, 기존 owner로 처리되지 않는다.

**폐기 조건**

원리 없이 사례 요약만 남거나 기존 기준과 중복된다.

## L02. Candidate promotion ledger

**내용**

- material
- candidate
- trial
- accepted
- rejected
- deferred
- retired

각 전환에는 evidence와 owner를 둔다.

**역할**

좋은 문장이 자동 rule이 되는 것을 막고, 보류 후보를 잃지 않는다.

**한계**

모든 메모에 lifecycle을 강제하지 않는다.

## L03. Process chronology

**내용**

결과를 바꾼 관찰, 판단, 시도, correction의 시간순 기록.

**역할**

나중에 current만으로 복원되지 않는 causal history를 남긴다.

**수거 규칙**

단순 실행 로그가 아니라 판단을 바꾼 사건만 남긴다.

**한계**

현재 실행 지침으로 사용하지 않는다.

## L04. Contrast library

**내용**

비슷하지만 다른 개념 쌍과 판별 질문.

예:

- 결과 correction / system correction
- purpose recovery / goal revision
- completion / acceptance
- advisory / enforced
- source read / source effect

**역할**

정의 암기보다 경계 사례에서 판단을 복원한다.

**한계**

새 이름을 많이 만드는 방식으로 확장하지 않는다.

## L05. Counterexample library

**내용**

원칙이 유효하지 않거나 과도해지는 사례.

**역할**

`좋은 원칙`을 모든 작업에 자동 적용하지 않게 한다.

**최소 field**

- 원칙
- 반례 상황
- 왜 적용하면 해로운지
- 대체 행동

**한계**

예외가 있다는 이유로 원칙을 무력화하지 않는다.

## L06. Trigger-situation library

**내용**

관찰 가능한 signal과 가능한 route의 연결.

**역할**

추상 원칙을 `언제 무엇을 떠올릴지`로 바꾼다.

**최소 field**

- signal
- competing explanation
- cheap check
- possible response
- escalation threshold

**한계**

signal 하나를 원인 하나와 고정 연결하지 않는다.

## L07. Case evidence boundary

**내용**

- 직접 확인
- 사용자 해석
- 현재 적용
- 확인하지 못함

**역할**

Alex 같은 외부 사례에서 유용한 감각을 가져오되 과장과 표면 복사를 막는다.

**한계**

공식 protocol이나 정확한 compatibility specification에는 별도 방식이 필요하다.

## L08. Stale and deprecation review

**내용**

- 마지막 실제 사용
- 현재 consumer
- 중복 owner
- 잘못된 activation
- 유지 비용
- 대체 자산

**역할**

하네스가 계속 추가만 되고 제거되지 않는 문제를 다룬다.

**결과**

유지, 수정, 통합, deprecated, retire.

**한계**

오래됐다는 이유만으로 없애지 않는다.

## L09. Usage feedback record

**내용**

- 어느 상황에서 발동했는가
- 실제로 load·invoke되었는가
- 어떤 결정을 바꿨는가
- false positive·false negative
- 비용과 마찰

**역할**

파일 존재를 효과로 착각하지 않고, 하네스 요소를 실제 사용 결과로 평가한다.

**한계**

정량 지표가 없다는 이유로 사용자 판단을 배제하지 않는다.

## L10. Harness change decision record

**내용**

- 배경과 실패 근거
- 기존 owner가 놓친 책임
- 변경 내용과 적용 범위
- 비목표
- 근거와 반례
- 후속 검증
- rollback 또는 retirement 조건

**역할**

왜 새 기준·역할·skill이 생겼는지 복원하고, 한 사례의 과교정을 식별한다.

**한계**

오타, 링크, 이미 합의된 작은 polish까지 decision record를 요구하지 않는다.
