---
작성일: 2026-07-28
성격: 후보를 한 프레임으로만 보지 않기 위한 분석 차원 모음
---

# Analysis Dimensions

이 문서는 후보를 분류하는 최종 schema가 아니다. 같은 실패를 한 가지 언어로만 설명하지 않도록 여러 관찰 차원을 펼쳐 둔다.

## 무엇이 어긋났는가

- 결과물 자체
- 결과물의 일부 주장이나 기능
- 문제 정의
- 사용자의 원래 목적
- 이번 cycle의 작업 목표
- 대표 장면 또는 대표 test case
- 선택한 source와 context
- source의 역할과 위계
- 시간·비용·공개 경계 같은 constraint
- 성공 조건과 평가 기준
- reviewer에게 준 질문과 packet
- 생성자, reviewer, main, 사용자의 결정 권한
- 현재 상태와 과거 결정의 보존 방식
- loop의 반복·중단·갱신 방식
- scaffolding 자체

한 결과가 여러 항목을 동시에 드러낼 수 있다. 지금은 하나로만 귀속하지 않는다.

## 어긋남은 어떤 형태로 보였는가

- 필요한 내용이 아예 없었다.
- 내용은 있었지만 결과로 전달되지 않았다.
- 결과에는 있었지만 중심과 위계가 달랐다.
- 검증 기준은 통과했지만 사용자가 원한 가치가 없었다.
- 서로 다른 reviewer가 같은 전제를 반복했다.
- 임시 가설이 합의된 결정처럼 사용됐다.
- hard guard가 후보 생성의 seed가 됐다.
- 최신 사건이 전체 목적을 대신했다.
- 쉬운 대체 행동이 핵심 행동을 대신했다.
- 완결도가 높아질수록 잘못된 frame이 더 자연스러워졌다.
- self-check가 원인을 밝혔지만 다음 행동은 바뀌지 않았다.
- 기록은 많아졌지만 다음 AI가 판단 권위를 복원하지 못했다.
- loop가 반복됐지만 각 반복이 같은 local optimum을 다듬었다.

## 언제 생겼는가

- 작업을 시작하기 전 목적과 context를 세울 때
- material과 후보를 펼칠 때
- 중심이나 대표 사례를 고를 때
- 결과물을 만들 때
- 결과물을 reviewer에게 넘길 packet을 만들 때
- reviewer가 평가할 때
- main이 여러 review를 회수할 때
- 사용자 피드백을 분류할 때
- active-state와 core에 write-back할 때
- 다음 session이나 agent가 재진입할 때

같은 현상도 발생 시점이 다르면 필요한 대응이 달라질 수 있다.

## 누가 어떤 권한으로 판단했는가

- 사용자가 자신의 목적과 경험을 말함
- 사용자가 결과를 보고 직관적으로 거부함
- main이 작업 가설을 세움
- worker가 그 가설 안에서 결과를 만듦
- reviewer가 입력 경계 안에서 간극을 발견함
- verifier가 사실·claim만 판정함
- advisor가 빠진 관점을 제안함
- active-state가 현재 판단을 요약함
- core가 반복 기준을 보존함

내용이 같아도 출처와 권한이 다르면 상태가 다르다.

## 어떤 품질 신호가 들어왔는가

- source와 결과의 직접 충돌
- source에는 있으나 결과에서 사라진 material
- 사용자의 `이게 하려던 것이 아니다`
- 독자가 시작 이유를 이해하지 못함
- 여러 reviewer의 일치
- 여러 reviewer의 불일치
- automated test 또는 hard guard 통과
- 결과의 실제 사용 실패
- 결과를 만드는 비용이 예상보다 큼
- 결과가 지나치게 작거나 안전함
- 결과가 화려하지만 causal path가 없음
- 다음 AI가 현재 판단을 잘못 이어받음
- 같은 종류의 정정이 반복됨

어떤 신호도 그 자체로 원인 전체를 확정하지 않는다.

## 무엇을 다시 열 수 있는가

- 문장이나 작은 기능만 수정
- 대표 장면 또는 test case 교체
- 구조 또는 product flow 재구성
- source 역할과 packet 재구성
- 현재 중심 또는 작업 가설 수정
- constraint 완화·강화·재정의
- criteria의 시점·역할·가중치 변경
- reviewer의 질문·원자료 접근·독립성 변경
- main 회수 기준 변경
- 사용자 목적 복구
- 사용자와 함께 상위 목적 변경
- scaffolding 또는 loop contract 변경
- 해당 후보를 보류하고 다른 후보 탐색

다시 연다는 것은 항상 처음부터 다시 한다는 뜻이 아니다.

## 결과가 어떤 역할을 했는가

- 최종 제출 후보
- 전체 인상을 볼 완결 초안
- solution ambition을 볼 concept report
- feasibility를 볼 vertical slice
- 예외를 볼 test와 fixture
- 사용자 행동 변화를 볼 simulation
- reviewer가 빠르게 읽을 evidence packet
- 현재 goal과 criteria를 시험하는 probe
- 다음 판단을 위한 실패 사례

`결과`라는 한 단어로 이 역할들을 합치면 적절한 통합 수준을 판단하기 어렵다.

## 어떤 종류의 분리가 필요한가

- 탐색과 수렴
- 생성과 평가
- 사실 검증과 가치 판단
- artifact 수정과 상위 판단 수정
- 사용자 목적과 작업 가설
- 현재 상태와 결정 history
- source 존재와 source 작동
- completion과 acceptance
- scaffolding과 quality loop
- reviewer의 관찰과 main의 채택
- AI가 처리할 판단과 human gate
- 현재 사례와 반복 core 원리
- 확인 사실과 우리의 해석

이 분리들은 하나의 `판단 분리` 문장으로 합쳐지기 전에 각각의 필요성과 상호 관계를 봐야 한다.

## 개선은 무엇을 바꿨는가

- 결과물만 좋아짐
- 다음 생성 prompt 또는 context가 바뀜
- 다음 후보 공간이 넓어짐
- 현재 goal 또는 작업 가설이 바뀜
- criteria가 추가·삭제·재배치됨
- reviewer 계약이 바뀜
- human gate 위치가 바뀜
- active-state의 권한 표기가 바뀜
- 다음 session의 재진입 방식이 바뀜
- 사용자가 자신의 판단을 더 구체적으로 이해함

마지막 항목은 작업 결과의 품질과 다른 학습 성과일 수 있다.

## 일반화 수준

- Current 글에만 해당
- 공개 기술 블로그의 shaping에 해당
- 장기 조사와 글감 선택에 해당
- AI-assisted coding과 구현에 해당
- multi-agent orchestration에 해당
- product discovery와 solution selection에 해당
- source-based analysis 전반에 해당
- 사람과 AI가 장기적으로 판단을 공유하는 작업 전반에 해당

후보마다 어디까지 지원되는지 별도로 본다. 한 사례가 여러 수준에 그럴듯하게 맞는다는 이유만으로 가장 넓은 수준까지 올리지 않는다.

## 적용으로 생길 수 있는 새 실패

- goal을 자주 다시 열어 수렴하지 못함
- context를 너무 많이 줘 새로운 reviewer도 anchoring됨
- 모든 결정의 provenance를 남기느라 작업이 무거워짐
- 완결 결과를 매번 만들어 비용이 커짐
- 독립 review가 사용자 목적을 조용히 다시 씀
- criteria를 늘려 기존 frame을 더 강하게 보호함
- 후보를 펼친다는 이유로 evidence와 public boundary를 늦춤
- human gate가 모든 작은 판단의 승인 병목이 됨
- loop가 품질 개선이 아니라 끝없는 goal 이동이 됨
- 학습 설명이 또 다른 고정 template가 됨
- core가 풍부해지지만 현재 행동을 찾기 어려워짐

이 위험들은 후보를 버리기 위한 이유가 아니라 적용 한계를 구체화하는 재료다.
