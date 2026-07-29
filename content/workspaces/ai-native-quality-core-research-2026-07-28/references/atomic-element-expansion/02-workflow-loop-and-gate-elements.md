---
작성일: 2026-07-29
성격: workflow·loop·gate 하네스 요소 후보
현재상태: 미채택
---

# Workflow, Loop, and Gate Elements

이 문서의 후보는 모든 작업을 한 절차로 묶는 단계표가 아니다. 어떤 품질 신호가 들어왔을 때 무엇을 다시 열고, 무엇은 유지하며, 누가 다음 결정을 내릴지 정하는 route 후보들이다.

## W01. 판단할 관계가 보이는 artifact를 먼저 만드는 workflow

**형태**

- `Material report`, concept report, integrated v1, vertical slice 중 현재 불확실성을 가장 잘 드러내는 하나를 선택하는 route

**계약**

추상 토론만 반복하지 않고 판단 대상이 되는 관계를 실제 artifact로 만든다. 완성도가 목적이 아니라 `어디가 맞고 어디가 어긋나는지 관찰할 수 있음`이 목적이다.

**발동과 반환**

- 발동: 의견은 많지만 서로 같은 대상을 보고 있는지 불분명함
- 반환: artifact, artifact가 시험한 관계, 의도적으로 남긴 미완성

**경계**

통합 결과가 필요한 문제를 작은 조각만으로 판정하지 않는다. 반대로 핵심 가설만 보면 되는 단계에 전체 완성품을 강제하지 않는다.

## W02. 결과 결함과 생성 조건 결함을 분리하는 triage

**형태**

- quality-stall 진단의 첫 분기

**계약**

관찰된 간극마다 먼저 세 범주를 열어 둔다.

- 결과 자체의 국소 결함
- 결과를 만든 입력·goal·constraint·criteria의 결함
- 둘의 상호작용

**발동과 반환**

- 발동: 한 번 고친 뒤에도 같은 상위 불만이 반복됨
- 반환: 범주별 근거, 싸게 판별할 수 있는 다음 행동

**경계**

모든 실패를 `system 문제`로 확대하지 않는다. 한 문장 수정으로 닫히는 결함은 국소 수정으로 끝낼 수 있다.

## W03. 어긋남을 만든 책임만 다시 여는 targeted reopen

**형태**

- reopen matrix
- main의 수정 범위 결정

**계약**

결함의 위치에 따라 material, structure, wording, goal, constraint, evaluation, role packet 중 필요한 책임만 다시 연다. 이전 단계 전체를 관성적으로 재실행하지 않는다.

**발동과 반환**

- 발동: `처음부터 다시`와 `그냥 고쳐` 사이에서 선택이 막힘
- 반환: 유지할 것, 다시 열 것, 다시 열지 않을 근거

**경계**

targeted reopen이 초기 frame을 보호하는 핑계가 되면 W08 또는 W10으로 전환한다.

## W04. 사용자 목적 복구 route

**형태**

- transcript·직접 발화·이전 결정으로 돌아가는 purpose recovery

**계약**

현재 summary나 current state가 아니라 사용자가 처음 무엇을 바꾸려 했는지, 무엇을 아쉽다고 했는지, 어떤 결과를 원했는지 원문으로 복구한다.

**발동과 반환**

- 발동: 현재 goal이 매끄럽지만 사용자가 `내가 왜 이걸 시작했는지 빠졌다`고 느낌
- 반환: 확인된 목적 문장, 이후 추가된 해석, 아직 사용자 확인이 필요한 부분

**경계**

초기 발화를 영구 불변 goal로 만들지 않는다. 사용자가 이후 명시적으로 바꾼 판단도 함께 보존한다.

## W05. 작업 가설·scope·constraint 수정 route

**형태**

- current frame revision

**계약**

top-level purpose는 유지한 채, 이번 cycle이 시험하는 중심·범위·제약을 수정한다. 각 변경은 약한 결과에서 관찰된 증거와 연결한다.

**발동과 반환**

- 발동: 목적은 맞지만 결과가 작고 평평하거나 잘못된 대표 문제를 중심으로 삼음
- 반환: 유지한 목적, 폐기한 가설, 새 가설, constraint diff

**경계**

실패한 결과를 정당화하기 위해 success condition을 낮추는 변경과 구분한다.

## W06. Criteria와 evaluation 갱신 route

**형태**

- evaluator contract revision
- criteria version diff

**계약**

결과가 criteria를 통과했지만 실제 가치가 부족하거나, 가치 있는 후보가 criteria 때문에 조기 탈락한 증거가 있을 때 평가 체계를 수정한다.

**발동과 반환**

- 발동: 여러 reviewer가 일관되게 통과시켰는데 사용자 판단과 큰 간극이 남음
- 반환: 놓친 품질축, 과도한 기준, 새 판별 예시, 기존 결과 재평가

**경계**

현재 결과 하나를 통과시키기 위한 사후 기준 변경은 금지한다. 변경된 criteria로 기존 후보와 반례를 다시 본다.

## W07. 결과 correction과 system correction의 병렬 비교

**형태**

- 두 개의 수정안 또는 두 개의 diagnosis report

**계약**

한 경로는 현재 frame을 유지하고 결과를 최선으로 고친다. 다른 경로는 goal·context·constraint·evaluation 중 의심되는 상위 조건을 바꾼다. 두 결과가 실제로 어떤 차이를 만드는지 비교한다.

**발동과 반환**

- 발동: 국소 수정을 계속할지 frame을 바꿀지 근거가 부족함
- 반환: 두 변경의 결과 차이, 비용, 남은 불확실성

**경계**

두 경로가 이름만 다르고 같은 전제를 공유하지 않도록 입력 packet의 차이를 명시한다.

## W08. 서로 다른 frame의 결과를 비교하는 alternate-frame pass

**형태**

- frame A/B/C별 artifact 생성

**계약**

문장·구조 변형이 아니라 대표 문제, causal path, 사용자 변화, 성공 조건 중 적어도 하나가 다른 frame을 만든다.

**발동과 반환**

- 발동: A/B가 모두 그럴듯하지만 같은 답처럼 느껴짐
- 반환: frame 차이, 각 frame이 살리는 source, 잃는 가치, 비교 결과

**경계**

다양성 자체를 목표로 하지 않는다. 사용자의 실제 목적에 대해 경쟁하는 설명이어야 한다.

## W09. Source-first second pass

**형태**

- 현재 결과를 가리고 source에서 다시 중심과 장면을 뽑는 재탐색

**계약**

기존 결과를 고치는 대신 직접 원천을 다시 읽고, 빠진 동기·사건·판단 변화·강한 문장을 먼저 수집한다. 그 뒤 기존 결과와 대조한다.

**발동과 반환**

- 발동: source는 풍부한데 결과가 최근 summary와 criteria 언어만 반복함
- 반환: 새로 회수한 material, 기존 결과의 누락, 재작성 필요 범위

**경계**

source coverage를 높이는 작업이 아니다. 결과의 핵심을 바꿀 수 있는 재료를 찾는다.

## W10. 첫 단계부터 다시 수행하는 evaluator replay

**형태**

- evaluator가 동일 source와 task를 받아 독립적으로 시작점을 재구성

**계약**

완성 결과만 채점하지 않고 evaluator가 `어떤 목적·material·frame·success condition을 먼저 세웠어야 하는가`를 재현한다. 실제 결과와 비교해 최초 divergence를 찾는다.

**발동과 반환**

- 발동: 결과 리뷰로는 왜 같은 frame이 반복됐는지 설명되지 않음
- 반환: evaluator의 독립 출발점, 실제 process와 처음 갈라진 지점, 근거

**경계**

evaluator의 대체 process가 정답은 아니다. main이 원자료와 사용자 의도로 adjudicate한다.

## W11. 한 바퀴의 loop goal과 top-level purpose 대조

**형태**

- iteration close 질문

**계약**

각 loop가 끝날 때 `이번 cycle의 goal을 달성했는가`와 `이 cycle이 상위 목적을 실제로 전진시켰는가`를 별도로 본다.

**발동과 반환**

- 발동: 작은 task는 계속 완료되지만 전체 작업이 제자리임
- 반환: cycle success, purpose progress, 다음 cycle에서 바꿀 관계

**경계**

모든 작은 작업마다 장문의 목적 회고를 만들지 않는다. 장기 작업의 방향이 누적될 때 사용한다.

## W12. Continue·pause·reframe 판단

**형태**

- cycle exit gate

**계약**

- continue: 현재 frame에서 다음 행동의 정보 가치가 높음
- pause: 사용자 판단·외부 근거·권한이 없으면 의미 있는 전진이 불가능함
- reframe: 현재 frame을 더 정교하게 해도 상위 간극이 줄지 않을 근거가 있음

**발동과 반환**

- 발동: 다음 행동이 관성적으로 정해지거나 매번 사용자에게 넘겨짐
- 반환: 선택, 근거, 다음 행동 또는 필요한 질문

**경계**

`pause`를 main의 국소 판단 회피에 쓰지 않는다.

## W13. Human gate

**형태**

- taste, purpose, risk, irreversible choice별 사용자 결정 지점

**계약**

사실 확인이나 낮은 위험의 implementation decision은 main이 처리한다. 사용자 경험의 의미, 공개할 중심, 상충하는 가치, 되돌리기 어려운 외부 행동은 human gate로 남긴다.

**발동과 반환**

- 발동: 여러 타당한 선택 중 사용자의 취향·정체성·위험 감수에 따라 답이 달라짐
- 반환: 결정해야 할 차이, 각 선택의 영향, main의 권고와 불확실성

**경계**

질문을 많이 만드는 장치가 아니다. 사용자만 가질 수 있는 정보와 권한이 있을 때 쓴다.

## W14. Stop condition과 미완료 상태 기록

**형태**

- loop contract의 stop field
- active-state의 blocked·deferred record

**계약**

반복은 다음 중 하나에서 멈춘다.

- success condition 충족
- 추가 loop의 정보 가치가 비용보다 낮음
- 필요한 source나 권한 부재
- hard guard 충돌
- 사용자가 현재 수준을 수용

멈출 때 미확정 claim, 남은 risk, 재개 신호를 기록한다.

**발동과 반환**

- 발동: `더 좋아질 때까지`가 무한 loop가 됨
- 반환: stop 이유, 얻은 상태, 미완료, 재개 조건

**경계**

시간이 들었다는 사실만으로 품질 미달을 완료로 바꾸지 않는다.
