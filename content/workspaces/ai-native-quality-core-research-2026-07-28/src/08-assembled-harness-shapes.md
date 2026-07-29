---
작성일: 2026-07-29
성격: 이번 실패에서 추론한 요소의 조립 구조 후보
현재상태: 경쟁 후보 / 미채택
---

# Assembled Harness Shapes

앞의 84개 요소를 모두 설치하는 구조는 없다. 이 문서는 서로 다른 문제 가정에 따라 일부 요소를 조립해 본 경쟁 후보들이다. 같은 요소도 다른 조립에서 역할과 비용이 달라진다.

## Shape 01. 얇은 지속 원칙 + 상황별 route

**문제 가정**

핵심 실패는 기준 부재보다, 어떤 상황에서 어느 판단을 다시 열지 몰랐던 데 있다.

**조립**

- 지속 원칙: P01, P02, P04, P07, P10
- 발동: S01
- route: W02, W03, W12
- 기록: C03, C09

**작동**

평소에는 다섯 판단축만 유지한다. 품질 정체 신호가 있을 때 dispatcher가 local repair, source recovery, frame challenge, evaluation audit 중 하나를 연다.

**장점**

- 상시 context가 작다.
- 모든 작업을 무거운 loop로 만들지 않는다.
- 이번 사례의 핵심 구분을 잃지 않는다.

**위험**

- dispatcher가 잘못 분기하면 기존 frame을 계속 보호한다.
- route 근거가 약하면 이름만 많아진다.

## Shape 02. Artifact-led learning loop

**문제 가정**

추상 논의만으로는 무엇이 잘못됐는지 판단하기 어렵고, 통합 결과가 goal·context·evaluation을 시험하는 관찰물이 되어야 한다.

**조립**

- artifact 선택: W01
- 관찰물: A01, A02, A03, A04 중 하나
- 이중 평가: P01, W11
- state: C09
- write-back: L01, L09

**작동**

한 cycle마다 현재 불확실성을 가장 잘 드러내는 artifact를 만든다. 결과 자체와 생성 조건을 분리해 평가하고, 반복 가치가 있는 판단만 candidate로 돌려보낸다.

**장점**

- 결과를 먼저 만들어야 한다는 감각과 단계별 판단 분리를 함께 보존한다.
- `완성`이 최종 승인으로 오인되는 것을 막는다.

**위험**

- artifact를 고르는 판단이 틀리면 비싼 결과를 반복한다.
- 매 cycle 문서가 늘 수 있다.

## Shape 03. Source recovery 중심 구조

**문제 가정**

source와 Material은 있었지만 summary·criteria·최근 frame을 거치며 결과에서 작동하지 않았다.

**조립**

- source map: C04, C05
- route: S04, W09
- reviewer: R02, R09
- trace: A07, A11
- learning: L07

**작동**

중요 source의 기대 역할과 실제 결과를 대조한다. 누락이 packet 문제인지, reading 문제인지, main의 frame 문제인지 분리하고 source-first pass를 수행한다.

**장점**

- `자료가 부족했다`와 `자료가 작동하지 않았다`를 구분한다.
- 외부 reference 과장도 함께 통제한다.

**위험**

- source coverage 작업으로 변질될 수 있다.
- 더 근본적인 goal·evaluation 문제를 source 문제로 축소할 수 있다.

## Shape 04. Alternate-frame studio

**문제 가정**

같은 기준과 최근 장면을 공유한 후보가 표현만 다르게 반복됐다.

**조립**

- 목적 유지: C02
- 경쟁 설명: P14, C10
- frame 생성: S05, W08
- 비교 artifact: A03
- reviewer: R03, R05
- human gate: R11

**작동**

대표 문제, causal path, 사용자 변화, 성공 조건이 다른 frame을 만든다. 각 frame에서 비교 가능한 결과를 내고 first-reader와 사용자가 차이를 판단한다.

**장점**

- A/B가 같은 frame에 갇히는 문제를 직접 다룬다.
- 사용자 취향과 사실 판단을 분리한다.

**위험**

- 후보 다양성 자체가 목적이 될 수 있다.
- source가 약한 frame도 그럴듯하게 완성될 수 있다.

## Shape 05. Evaluator replay 구조

**문제 가정**

완성 결과만 보는 review로는 최초 frame 오류와 criteria timing을 찾기 어렵다.

**조립**

- 독립 재수행: W10
- reviewer: R08, R09
- trace: A06, A09
- 원칙: P08, P10
- adjudication: R10

**작동**

evaluator가 source와 목적에서 출발해 자신이라면 어떤 material·frame·criteria를 만들었을지 재현한다. 실제 process와 최초 divergence를 비교한다.

**장점**

- 결과 polish에 갇히지 않는다.
- review packet과 evaluation system의 결함을 찾을 수 있다.

**위험**

- evaluator의 대안 process를 또 다른 정답으로 숭배할 수 있다.
- 비용이 높고 입력 독립성을 설계해야 한다.

## Shape 06. 두 종류 correction 비교

**문제 가정**

국소 수정으로 충분한지, system condition을 바꿔야 하는지 말로는 판정하기 어렵다.

**조립**

- triage: W02
- 병렬 correction: W07
- result comparison: A03
- criteria: P05, P06
- decision diff: A10

**작동**

현재 frame을 유지한 최선의 수정과, 의심되는 상위 조건 하나를 바꾼 수정을 비교한다. 결과 차이가 없으면 system change 가설을 약화하고, 큰 차이가 있으면 변경 근거로 삼는다.

**장점**

- 하네스 변경을 결과 evidence와 연결한다.
- 과도한 system redesign을 줄인다.

**위험**

- 두 결과를 공정하게 만들기 어렵다.
- 여러 상위 조건을 동시에 바꾸면 무엇이 효과를 냈는지 모른다.

## Shape 07. Main adjudication 강화 구조

**문제 가정**

reviewer 수가 부족한 것이 아니라 main이 report의 권한과 상충을 회수하지 못했다.

**조립**

- provenance: C03
- role contracts: R01~R09 중 필요한 역할
- authority: P10
- correlation: A09
- adjudicator: R10
- human gate: W13

**작동**

각 report는 판정 대상과 변경 권한을 명시한다. main은 원자료와 사용자 목적을 기준으로 채택·기각·보류를 정하고, 사용자만 판단할 차이만 올린다.

**장점**

- review가 자동 workflow 단계나 투표가 되는 것을 막는다.
- report의 독립성과 한계를 함께 본다.

**위험**

- main 역량에 병목이 생긴다.
- adjudication 문서가 길어질 수 있다.

## Shape 08. Cross-session continuity 구조

**문제 가정**

장기 작업에서 목적·현재 frame·source 역할·합의 상태가 session 이동 때 섞이거나 유실된다.

**조립**

- map과 cursor: C01
- purpose/frame: C02
- current/history: C06, C07
- freshness: C08
- sync: C11, S10
- decision write-back: L03, L10

**작동**

현재 실행에 필요한 authoritative state와 판단 history를 분리한다. handoff는 current를 중심으로 원문 접근점과 금지 영역을 전달하고, 새 session에서 stale dependency를 확인한다.

**장점**

- 매번 전체 대화를 읽지 않아도 재진입할 수 있다.
- recent frame이 top-level purpose를 덮는 문제를 줄인다.

**위험**

- current 유지가 별도 일이 된다.
- stale detector 없이 문서만 늘면 더 혼란스럽다.

## Shape 09. Human calibration 구조

**문제 가정**

판단의 일부는 사실·규칙으로 닫히지 않고 사용자 취향과 경험 의미를 통해서만 보정된다.

**조립**

- quality signal: P12, A12
- comparison artifact: A03
- first-reader: R05
- human taste gate: R11
- contrast learning: L04, L06

**작동**

사용자가 결과를 비교하고 구체적 긍정·부정 신호를 준다. main은 그 신호를 전체 verdict로 평평하게 만들지 않고 다음에 재사용할 판단 대비와 발동 상황으로 정리한다.

**장점**

- 사용자가 결과 편집만 하는 사람이 아니라 판단 체계를 함께 학습한다.
- `A 제목은 좋다, frame은 아니다` 같은 복합 신호를 보존한다.

**위험**

- 개인 취향을 universal criteria로 승격할 수 있다.
- 비교 artifact가 부실하면 사용자 판단 비용만 늘어난다.

## Shape 10. Harness product loop

**문제 가정**

하네스 자체도 결과를 만들고 실패하는 제품이므로 생성·평가·승격·폐기가 필요하다.

**조립**

- feedback: C12
- usage: L09
- decision: L10
- lifecycle: L02, L08
- audit: R12
- regression evidence: A06, L05

**작동**

새 요소는 candidate로 시작한다. 실제 사례에서 발동·효과·마찰을 기록하고, 기존 owner 중복과 반례를 본 뒤 승격한다. 오래되거나 효과가 없는 요소는 통합·폐기한다.

**장점**

- 문제를 만날 때마다 core·skill·agent가 늘어나는 것을 막는다.
- 하네스 변경도 evidence와 user learning에 연결한다.

**위험**

- 하네스 관리가 실제 작업보다 커질 수 있다.
- 사용 횟수만으로 질적 가치를 판정할 수 없다.

## Shape 간 관계

이 열 구조는 하나를 고르는 제품 옵션이 아니다.

- Shape 01은 평소 기본층이 될 수 있다.
- Shape 02는 대부분의 복잡한 작업에서 관찰물을 만드는 방법이다.
- Shape 03~06은 서로 다른 failure diagnosis에 대한 선택 route다.
- Shape 07은 multi-review를 쓸 때 main의 책임을 정의한다.
- Shape 08은 장기 작업에서만 필요하다.
- Shape 09는 사용자 고유 판단이 필요한 지점에서 작동한다.
- Shape 10은 이 요소들을 실제 하네스로 승격한 뒤에만 필요하다.

아직 정하지 않은 것은 어떤 shape가 기본이고 어떤 shape가 예외 route인지, 그리고 실제 owner가 core·skill·agent·state·artifact 중 어디인지다.
