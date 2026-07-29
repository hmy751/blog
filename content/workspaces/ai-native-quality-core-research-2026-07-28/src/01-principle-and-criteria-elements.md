---
작성일: 2026-07-29
성격: 원칙·criteria 하네스 요소 후보
현재상태: 미채택
---

# Principle and Criteria Elements

이 문서의 후보는 반복해서 물을 판단축이다. 모든 후보를 하나의 `criteria.md`에 넣을 필요는 없다. 일부는 core principle, 일부는 특정 workflow의 판단 질문, 일부는 calibration example이 될 수 있다.

## P01. 결과와 판단 체계의 이중 평가축

**가능한 형태**

- `core/criteria.md`의 상위 원칙
- 품질 정체 시 사용하는 diagnostic 질문
- evaluation report의 두 개 독립 섹션

**계약**

결과를 평가할 때 다음을 분리한다.

1. 결과 자체: 사실, 구조, 기능, 흐름, 사용자에게 보이는 행동
2. 결과를 만든 판단 체계: 목적, 작업 가설, context와 source 선택, constraints, evaluation, 역할과 권한

결과 결함이 있다는 사실만으로 판단 체계 전체를 폐기하지 않는다. 반대로 결과가 매끄럽다는 이유로 판단 체계를 통과시키지 않는다.

**발동**

- 결과는 정교하지만 사용자가 하려던 일과 다르다고 느낀다.
- 여러 수정 뒤 같은 상위 불만이 반복된다.
- review와 test가 통과했지만 실제 사용 계약이 맞지 않는다.

**반환**

- 결과 수준의 간극
- 상위 판단 수준의 원인 후보
- 어떤 수준을 먼저 다시 볼지

**오용 경계**

- 오탈자와 단순 bug에도 전체 goal과 harness를 다시 설계하지 않는다.
- `system 문제`라는 추상어만 남기지 않고 실제 의심 요소를 밝힌다.

## P02. Completion·acceptance·verification 상태 분리

**가능한 형태**

- `src` 생애주기 상태
- active-state field
- review result의 상태 vocabulary

**계약**

다음 상태를 서로 대신하지 않는다.

- `integrated`: 판단할 만큼 결과가 통합됨
- `complete`: 요청 범위의 결과가 읽히거나 실행됨
- `accepted`: 사용자 또는 owner가 중심과 방향을 수용함
- `verified`: 지정된 사실·실행·contract가 검증됨
- `publishable/deployable`: 외부 경계와 최종 guard를 통과함

한 결과는 `complete + unaccepted`, `accepted + unverified`일 수 있다.

**발동**

- reviewer의 `PASS`가 전체 완료처럼 사용된다.
- 완결 v1이 현재 권위를 자동 획득한다.
- test 통과가 사용자 가치 통과로 확대된다.

**반환**

- 현재 결과가 실제로 획득한 상태
- 아직 획득하지 않은 상태와 owner

**오용 경계**

- 상태 수를 모든 작은 파일에 강제하지 않는다.
- 현재 판단을 바꾸는 artifact에만 필요한 상태를 쓴다.

## P03. 서로 대신하지 않는 품질축

**가능한 형태**

- core criteria
- evaluation rubric의 비합산 축
- reviewer 반환 계약

**계약**

다음 축을 한 점수로 합치지 않는다.

- 사실·근거 정확성
- 문제·중심 적합성
- 사용자 목적과의 정합성
- 결과의 통합도
- 실제 행동 또는 상태 변화
- public·safety·compatibility guard
- 탐색 가치와 학습 가치

한 축의 실패가 다른 축의 실패를 자동 판정하지 않는다.

**발동**

- 근거가 약하다는 이유로 후보 가치까지 낮아진다.
- 사실 오류 하나가 전체 경험의 의미를 폐기한다.
- 매력적인 output이 문제 evidence를 대신한다.

**반환**

- 어떤 축에서 통과·미통과했는지
- 한 축의 결함이 실제로 영향을 주는 범위

**오용 경계**

- 축을 많이 만든 뒤 아무 선택도 하지 않는 면피 수단으로 쓰지 않는다.
- 최종 선택에서는 충돌을 드러내고 owner가 판단한다.

## P04. 사용자 목적·작업 goal·가설·성공 조건 분리

**가능한 형태**

- task brief의 네 필드
- active-state의 현재 frame
- workflow 시작 시 확인 질문

**계약**

- 사용자 목적: 왜 이 일을 하는가
- 작업 goal: 이번 cycle에서 도달할 상태
- 작업 가설: goal에 도달하기 위해 현재 시험하는 설명·중심·방법
- 성공 조건: 결과에서 무엇을 보면 이번 goal이 통과하는가

작업 가설은 현재 행동을 이끌 수 있지만 사용자 목적을 대신하지 않는다.

**발동**

- 하나의 대표 장면이 글이나 제품의 존재 이유가 된다.
- current의 cursor가 top-level purpose처럼 사용된다.
- 결과가 약할 때 무엇을 바꿔야 할지 모른다.

**반환**

- 네 층위의 현재 문장
- 각 층위의 owner와 변경 가능성

**오용 경계**

- 모든 task에 네 문장을 길게 작성하지 않는다.
- 층위가 실제로 섞이거나 장기 작업에서 유실될 위험이 있을 때 구체화한다.

## P05. 목적 복구·goal 수정·goalpost 이동 구분

**가능한 형태**

- quality-loop triage criterion
- main adjudication 질문
- human gate 조건

**계약**

약한 결과 뒤 다음을 구분한다.

- 목적 복구: 원래 사용자 목적이 전달 과정에서 사라짐
- 작업 goal 수정: 목적은 유지되지만 이번 목표가 부적절함
- 작업 가설 수정: 목표는 유지하고 현재 설명·중심·방법을 바꿈
- 성공 조건 수정: 평가가 실제 가치를 못 보고 있음
- goalpost 이동: 실패한 결과를 통과시키려고 기준을 낮추거나 목적을 바꿈

**발동**

- `goal을 다시 써야 하나`가 떠오르지만 원래 목적이 이미 존재했다.
- criteria 갱신이 결과 정당화처럼 보인다.

**반환**

- 무엇을 복구·수정하려는지
- 그 변경이 필요한 결과 근거
- 변경 권한

**오용 경계**

- 결과가 마음에 들지 않는다는 신호만으로 top-level goal을 바꾸지 않는다.

## P06. Constraint의 보호 효과와 축소 효과 동시 평가

**가능한 형태**

- scope criterion
- loop evaluation section
- goal brief의 provisional constraint marker

**계약**

Constraint마다 두 질문을 함께 본다.

- 무엇을 막기 위해 필요한가
- 어떤 가치 있는 가능성을 함께 줄일 수 있는가

시간, 리소스, 사실 상한, 공개 경계, 구현 가능성은 hard guard와 provisional assumption을 구분한다.

**발동**

- 여러 agent가 모두 작고 무난한 결과를 만든다.
- 가드레일을 잘 지켰지만 핵심 가치가 사라진다.
- scope를 키우자는 제안이 나오지만 feasibility 근거가 없다.

**반환**

- constraint의 보호 대상
- 결과에서 관찰된 축소 효과
- 유지·완화·반대 압력·검증 필요 중 하나

**Alex 경계**

Alex가 직접 보인 것은 시간·리소스 constraint가 solution ambition을 줄였다는 자기 진단과 재위임이다. 더 큰 concept의 실제 사용자 가치는 확인되지 않았다.

## P07. Source 보유와 source 작동 분리

**가능한 형태**

- source role map
- source+result review criterion
- output trace

**계약**

Source는 다음 상태를 구분한다.

- 접근 가능
- 실제 입력됨
- 결과의 사실을 지지함
- 동기·중심·장면·평가 기준에 작동함
- 현재 결과에서 의도적으로 제외됨

`AI가 읽었다`와 `결과의 판단에 작동했다`를 같은 상태로 쓰지 않는다.

**발동**

- source에는 중요한 motive가 있지만 결과에서 반복해서 사라진다.
- 자료를 더 주자는 말과 모든 자료를 넣자는 말이 섞인다.

**반환**

- 중요한 source의 기대 역할
- 현재 결과에서 실제 역할
- 누락·배제·위계 변경의 원인 후보

**오용 경계**

- 모든 source가 결과에 보여야 한다는 coverage 목표로 만들지 않는다.

## P08. Criteria의 seed·filter·guard 역할 분리

**가능한 형태**

- criteria metadata
- generation brief
- candidate evaluation rubric

**계약**

- seed: 후보를 다른 방향으로 생성시키는 압력
- filter: 생성된 후보를 비교하는 기준
- guard: 탐색 중에도 넘지 않을 경계

같은 criteria를 세 역할로 사용할 수 있지만 역할과 시점을 밝힌다.

**발동**

- 평가 기준을 먼저 줬더니 후보가 모두 같은 모양이 된다.
- hard guard를 후보 매력도 점수로 사용한다.
- impact criteria가 evidence 부족을 덮는다.

**반환**

- 이번 criteria의 역할
- 적용 시점
- 어떤 결정을 닫을 수 있는지

**오용 경계**

- role label만 붙이고 실제 생성·평가 prompt가 같게 작동하지 않게 한다.

## P09. 탐색·claim 판정·수렴의 판단 순서

**가능한 형태**

- workflow principle
- candidate research contract
- prioritization gate

**계약**

- 탐색: 가능한 가치·관점·output을 펼친다.
- claim 판정: 개별 주장과 사실 경계를 동시에 엄격히 본다.
- 수렴: 충분히 본 후보를 비교해 현재 선택을 만든다.

탐색 중 사실 엄격함을 늦추지 않지만, 개별 claim의 한계로 전체 후보 가치를 자동 폐기하지 않는다.

**발동**

- 모든 후보가 `근거 부족`으로 조기 탈락한다.
- `한 질문` 기준이 Material 탐색보다 먼저 중심을 닫는다.

**반환**

- 현재 어떤 판단 위치인지
- 지금 닫아도 되는 것과 열어둘 것

**오용 경계**

- 충분히 펼친다는 이유로 hard guard와 시간 경계를 무시하지 않는다.

## P10. 기준마다 닫을 수 있는 범위 제한

**가능한 형태**

- criteria의 authority field
- reviewer report contract
- main adjudication rule

**계약**

- 사실 오류 판정은 사실을 고친다.
- claim ceiling은 표현 강도를 제한한다.
- 장면 약점은 장면과 구조를 다시 연다.
- 사용자 목적과 경험 변경은 사용자에게 돌아간다.
- reviewer 제안은 자동 current가 아니다.

**발동**

- 한 판정이 전체 후보와 사용자 해석까지 확대된다.
- reviewer의 좋은 제안이 곧바로 core rule이 된다.

**반환**

- 판정 대상
- 허용된 변경
- 추가 권한이 필요한 변경

**오용 경계**

- 권한 분리를 이유로 main이 판단해야 할 국소 결정을 모두 사용자에게 넘기지 않는다.

## P11. Scope보다 핵심 causal path 보존

**가능한 형태**

- product-flow criterion
- artifact contract
- prioritization 질문

**계약**

제품 효과를 주장하는 결과는 가능한 범위 안에서 다음 연결을 보존한다.

- 사용자 또는 시스템 입력
- 핵심 변환·판단
- 읽거나 사용하는 결과
- 다음 행동 또는 상태 변화

기술 feasibility probe는 이 전체 경로를 요구하지 않아도 되지만 역할을 명시한다.

**발동**

- 파일·test·dashboard는 늘지만 사용자가 얻는 변화가 없다.
- scope를 줄이며 핵심 변환을 후속 작업으로 미룬다.

**반환**

- 이번 artifact의 역할
- 보존한 causal path
- 의도적으로 자른 부분과 주장 상한

**오용 경계**

- 모든 component test에 full user journey를 강제하지 않는다.

## P12. 품질 신호의 출처와 판정 범위 보존

**가능한 형태**

- quality signal log
- active-state의 사용자 feedback field
- review adjudication record

**계약**

`좋다`, `나쁘다`, `생생하다`, `공감되지 않는다`를 전체 verdict로 평평하게 합치지 않는다.

함께 남길 것:

- 누가
- 어떤 결과를 보고
- 무엇과 비교해
- 어느 품질축에서
- 어떤 다음 판단을 열었는가

**발동**

- A의 제목은 좋지만 frame은 거부되는 복합 신호가 들어온다.
- 사용자 반응 하나로 결과 전체가 채택·폐기된다.

**반환**

- 보존할 긍정 신호
- 교정할 부정 신호
- 아직 원인을 모르는 신호

**오용 경계**

- 모든 감상을 상태표로 기록하지 않는다. 이후 판단을 바꾸는 신호만 남긴다.

## P13. Reference의 확인 사실·해석·적용·미확인 분리

**가능한 형태**

- reference profile
- source evidence boundary
- harness decision record

**계약**

외부 사례를 가져올 때 네 층을 둔다.

- 원본에서 확인된 행동
- 사용자가 그 행동에서 얻은 해석
- 현재 작업에 맞게 변형한 적용
- 원본이 지원하지 않는 미확인

**발동**

- Alex의 surface workflow가 좋은 것이므로 복사하려 한다.
- 반대로 `본질` 한 문장으로 압축해 유용한 구체성을 지운다.

**반환**

- 가져올 판단 변화
- 가져오지 않을 상황별 세부 기준
- claim ceiling

**오용 경계**

- 표준 protocol과 호환성 규격처럼 정확한 복제가 필요한 reference에는 적용 방식이 다르다.

## P14. 단일 근본 원인 대신 경쟁 설명 유지

**가능한 형태**

- diagnostic hypothesis register
- self-check report
- quality-stall investigation

**계약**

근거가 부족한 단계에서는 서로 구별 가능한 원인 후보를 유지한다.

- Material 부재
- 전달 실패
- 판단 권위 실패
- goal 계층 혼동
- criteria 시점 오류
- correlated review
- main 회수 오류
- constraint 축소

각 가설에는 지지 근거, 반대 근거, 판별 관찰, 가능한 대응을 둔다.

**발동**

- `Material을 안 했다`처럼 한 원인이 너무 빨리 선택된다.
- `goal이 없었다`는 설명이 기존 목적을 지운다.

**반환**

- 현재 살아 있는 가설
- 먼저 판별할 수 있는 차이
- 결과에 따라 달라질 다음 행동

**오용 경계**

- 경쟁 설명을 끝없이 늘려 실제 조치를 회피하지 않는다.
- 한 행동으로 여러 가설을 싸게 판별할 수 있으면 먼저 시험한다.
