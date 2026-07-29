---
작성일: 2026-07-29
성격: review·agent·role 하네스 요소 후보
현재상태: 미채택
---

# Review, Agent, and Role Elements

이 문서의 역할은 reviewer 수를 늘리는 것이 아니다. 같은 결과를 서로 다른 판단 위치에서 보게 만들고, 각 report가 무엇을 바꿀 권한이 있는지 제한하는 후보다.

## R01. Artifact improvement reviewer

**책임**

현재 목적과 frame을 유지한 채 artifact를 더 강하게 만들 build·move·cut·rewrite 제안을 낸다.

**입력**

- artifact
- 현재 목적과 article/task type
- 적용할 두세 개의 명시 기준

**반환**

- 가장 큰 간극
- 보존할 강점
- 구체적 개선 제안
- 현재 frame 안에서 해결되지 않는 문제

**권한 경계**

목적과 frame을 자동 변경하지 않는다. source 사실 판정은 별도 verifier에게 넘긴다.

## R02. Source+result reviewer

**책임**

결과가 source의 사실뿐 아니라 중요한 motive, scene, decision change, causal path를 실제로 살렸는지 본다.

**입력**

- source packet manifest
- source 원문
- 결과
- source별 기대 역할

**반환**

- 작동한 source
- 중요하지만 사라진 source 역할
- 의도적 제외와 오독
- 결과를 바꿀 가능성이 높은 누락

**권한 경계**

source coverage를 최대화하지 않는다. source가 결과에 들어갈 가치 판단은 main이 회수한다.

## R03. Frame-challenge reviewer

**책임**

현재 결과를 고치는 대신, 결과가 당연시한 대표 문제·중심·성공 조건을 공격한다.

**입력**

- 사용자 목적
- source universe
- current frame
- 결과

**반환**

- 숨은 전제
- 다른 설명이 가능한 source
- alternate frame 2~4개
- frame을 유지해도 되는 반대 근거

**권한 경계**

낯선 대안을 내는 것이 목적이 아니다. 사용자 목적에 대한 더 나은 설명 가능성을 보여야 한다.

## R04. Fact and evidence verifier

**책임**

수치, 용어, chronology, attribution, claim ceiling, public boundary를 원자료와 대조한다.

**입력**

- claim-bearing artifact
- source
- 확인 대상 범위

**반환**

- supported
- unsupported
- contradicted
- ambiguous
- correction proposal

**권한 경계**

사실 오류 판정으로 글의 중심·경험 의미·후보 매력을 자동 폐기하지 않는다.

## R05. First-reader observer

**책임**

process와 의도를 미리 알지 못하는 독자가 처음 읽었을 때 어디서 무엇을 기대하고, 언제 혼란을 겪는지 보고한다.

**입력**

- 결과만 또는 공개 독자가 받을 최소 context

**반환**

- 첫 기대
- 이해가 바뀐 지점
- 질문이 생긴 지점
- 기억에 남는 것
- 배경을 알아야만 이해되는 부분

**권한 경계**

모든 복잡성을 쉽게 만들거나 독자 취향을 일반화하지 않는다.

## R06. Self-check auditor

**책임**

main의 판단이 반복해서 어긋났을 때 직전 행동만 변명하지 않고, 이전 user signal과 자신의 선택을 역추적해 최초 오독을 찾는다.

**입력**

- 사용자 correction chronology
- main의 이전 판단과 행동
- current artifact

**반환**

- 표면 실수
- 더 상위의 판단 패턴
- 놓친 신호
- 다음 행동에서 실제로 바꿀 점

**권한 경계**

`내가 놓쳤다`는 반성문으로 끝내지 않는다. 원인 단정도 하지 않고 경쟁 설명을 유지한다.

## R07. Advisor

**책임**

큰 전환점에서 main이 놓친 관점, trade-off, 판별 질문, 위험한 확신을 제시한다.

**입력**

- 확인 사실
- 현재 선택지
- main이 막힌 판단

**반환**

- 빠진 관점
- 지금 확인할 질문
- 결정별 위험
- advisor의 권고와 불확실성

**권한 경계**

실행자나 최종 결정자가 아니다. artifact를 대신 만들거나 current를 변경하지 않는다.

## R08. Evaluation-system auditor

**책임**

여러 결과가 criteria를 통과했는데 실제 품질이 정체될 때 evaluator 자체의 blind spot과 correlation을 본다.

**입력**

- criteria와 reviewer prompt
- 여러 결과와 review report
- 사용자 품질 신호

**반환**

- 과대표현된 축
- 누락된 축
- correlated assumption
- 평가 기준 수정 후보와 regression case

**권한 경계**

사용자 불만 하나를 새 universal criterion으로 만들지 않는다.

## R09. Review-packet auditor

**책임**

reviewer가 필요한 source, 목적, 상태, claim ceiling을 실제로 받았는지 점검한다.

**입력**

- 전체 source universe
- reviewer 역할
- 전달 packet
- report

**반환**

- 누락된 필수 입력
- 불필요하게 유도한 입력
- inherited assumption
- report 신뢰 범위

**권한 경계**

reviewer의 판단 내용 자체를 재검토하는 역할과 구분한다.

## R10. Main adjudicator

**책임**

서로 다른 report를 단순 합산하지 않고 원자료, 사용자 목적, 역할 권한을 대조해 다음 current를 정한다.

**입력**

- 원자료
- artifact
- 역할별 report
- 사용자 signal

**반환**

- 채택
- 기각
- 보류
- 추가 판별
- 사용자 결정 필요

각 항목에는 이유와 영향 범위를 붙인다.

**권한 경계**

report를 전달만 하고 판단을 회피하지 않는다. 사용자만 판단할 영역은 명확한 차이와 권고를 만들어 올린다.

## R11. Human taste gate

**책임**

사실·구조를 넘어 제목의 생생함, 글의 중심, 공개할 경험, 포트폴리오 신호처럼 사용자 정체성과 취향이 답을 바꾸는 지점을 결정한다.

**입력**

- 비교 가능한 artifact
- 각 선택의 보존·손실
- main의 권고

**반환**

- 사용자 선택
- 선택에서 드러난 품질 신호
- 일반화하면 안 되는 개인 판단

**권한 경계**

사용자가 문장 단위 편집자가 되도록 모든 선택을 올리지 않는다.

## R12. Harness observer

**책임**

새 기준·agent·skill·단계가 기존 owner와 충돌하거나, 이번 한 사례를 위해 구조가 비대해지는지 report-only로 본다.

**입력**

- 변경 전후 하네스 지도
- decision record
- 실제 실패 근거

**반환**

- 중복 owner
- layer confusion
- agent/skill bloat
- Claude/Codex parity 위험
- 더 작은 변경 가능성

**권한 경계**

하네스 내용을 자기 안에 축적하거나 normal workflow의 상시 단계가 되지 않는다.
