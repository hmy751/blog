---
작성일: 2026-07-27
성격: AI-native 다섯 글 public-reshape-v1 build record
공개상태: 내부 작업 문서
현재상태: 다섯 완결본 작성 완료 / 독립 review 전
---

# Public reshape v1 build record

## 결과 위치

`content/drafts/ai-native-topic-research-2026-07-20/2026-07-27-public-reshape-v1/`

- `current-active-state-operation.md`
- `independent-review-and-recovery.md`
- `product-flow-scope-control.md`
- `judgment-order.md`
- `ai-self-check.md`
- `README.md`

기존 `2026-07-27-near-final-v3/`는 수정하지 않았다. 이번 v1은 v3의 문장 polish가 아니라 public opening, scene, agency, artifact, ending을 다시 구성한 완결 원고다.

## 공통 build

- generic한 `한 구현 loop`, `한 회사`, `다른 작업` 대신 기능적 맥락을 복구했다.
- 네 기술 글에서는 합니다체를 유지하되, 저자가 멈추고 선택하고 범위를 다시 정한 곳에서 `저/제가`를 사용했다.
- Self-check는 했다체와 1인칭을 유지했다.
- AI는 의도나 성격으로 설명하지 않고 `제안했다`, `점검했다`, `적용하며 구조를 바꿨다`처럼 관찰 가능한 행동으로 썼다.
- 각 글의 첫 화면에 대상, 이상한 결과, stakes, author action을 배치했다.
- 각 글에 primary artifact를 하나 정하고, 보조 표·code·trace는 그 artifact가 보여 주지 못하는 기술 범위만 맡겼다.
- caveat를 글 끝의 방어 목록으로 모으지 않고 해당 수치와 주장 가까이에 붙였다.

## 1. Current

### Source selection

- active contract와 process history가 처음 분리된 여행 상품 조건 검토 plugin의 첫 제품 경로
- 현재 계약이 실제 source 대조와 설치형 자연어 E2E 요구로 바뀐 교정
- 외부 제출용 다섯 문항이 최근 구현에 과적합한 stress test
- 마지막 외부 사건이 current에 반영되지 않은 한계

### Build

- `current.md` 개념 설명보다 살아 있는 완료 조건과 선택 이유가 한 기록에 섞인 장면을 먼저 놓았다.
- primary artifact는 문서 목록이 아니라 상태별 수명·갱신 주체·읽는 질문을 보여 주는 표로 바꿨다.
- 권위 이동 뒤 바로 다섯 문항 stress test로 들어가고, 그 다음에 전체 지도와 단일 cursor가 함께 필요한 이유를 회수했다.

### Move / cut

- commit 수, current version 수, 축약 line·byte 수는 public discovery에 기여하지 않아 뺐다.
- current를 읽은 사실만으로 통제가 생긴다는 설명을 뺐다.
- Q1~Q5와 최근성 편향을 글의 중심 실패로 두지 않고 실제 효용을 시험한 두 번째 장면으로 내렸다.

### Protected

- 최근 구현 정보가 틀린 것이 아니라 전체 질문에 같은 해상도로 사용된 것이 문제였다는 판단
- current는 판단을 대신하지 않지만 프로젝트 계보와 직접 source로 돌아갈 경로를 남긴다는 결말

## 2. Independent review

### Source selection

- 첫 checkpoint의 같은 Python runner test method 9개
- 별도 validator·CLI, 공개 source 대조, 설치형 자연어 E2E의 서로 다른 검증 역할
- 문자열 `"false"`의 type contract bug
- 교정 뒤 같은 runner test method 15개와 숫자 밖의 재실행
- 닫힌 입력 밖을 보지 못한 별도 판정 반례

### Build

- `"false"`를 첫 발견 artifact로 확대해 test가 어떤 입력 세계를 보지 못했는지 먼저 보여 줬다.
- 9와 15의 단위를 같은 runner의 test method로 명시했다.
- 저자가 판별자의 결론을 받아 적은 것이 아니라 source·실제 입력·참여자 scope·설치 경로에서 checkpoint를 다시 연 행동을 보강했다.
- 교정 범위와 자연어 E2E를 한 제품 경로의 recovery로 묶었다.

### Move / cut

- reviewer governance를 두 절에서 반복하지 않고 `판정 / 수정 / 완료 선언` 한 절로 합쳤다.
- 다른 답변 시스템의 반례는 입력 경계의 한계 한 번만 맡겼다.
- fixture 답변을 실제 판매자 발화처럼 읽을 수 있는 표현을 제거했다.

### Protected

- test가 거짓말한 것이 아니라 초록이 답한 질문보다 닫으려던 세계가 더 컸다는 문장
- 제3판별자는 세 번째 AI가 아니라 다른 검증 세계와 회수 위치라는 결말

## 3. Scope control

### Source selection

- 숙소 체크인 시각을 답하고 원문 근거를 보여 주는 기능
- raw `facts[]`를 화면에 붙이는 더 작은 구현 제안
- source의 `15:00 → 16:00` 변화에 answer가 따라가는 test
- 별도 `missing` 상태 계약
- grounding·routing test와 호출자 없는 fact path 제거

### Build

- AI의 제안과 저자의 거부·재정의를 첫 화면에서 actor별로 드러냈다.
- raw result가 retrieval debugger에는 맞지만 product proof에는 끝나지 않은 역할 대비를 살렸다.
- `15:00 / 16:00 / missing` 표를 primary artifact로 삼아 값, 근거, 상태, 다음 행동을 함께 보여 줬다.
- thought-to-action bridge를 `source → answer → evidence/state → actual route → next action`과 세 제품행동 test, dead path 삭제로 닫았다.

### Move / cut

- vertical slice 일반론을 중심에서 내렸다.
- deterministic baseline은 grounding이 중심인 이번 기능에서 맡은 반대 경계를 보여 주는 짧은 절로 줄였다.
- 같은 결론을 artifact 뒤에 다시 설명하던 문단을 줄였다.

### Protected

- 검색 결과는 아직 사용자의 답이 아니라는 문제의식
- slice의 끝은 화면이 아니라 실제 소비자가 정한다는 결말

## 4. Judgment order

### Source selection

- 문제 후보 3개, 각 문제의 solution 3개씩 총 9개
- 결합 방향과 같은 형식의 output 3개
- 각 output의 초기·사용자 수정·가정 답변 뒤 상태, 총 9개 snapshot
- 발산 중 `확인됨 / 불충분 / 모름 / 확인 필요`의 claim 상태
- 현재 글감 조사에서 cursor가 가치 순위로 바뀐 mirror

### Build

- 블로그 process meta가 아니라 실제 product discovery output 비교로 시작했다.
- 세 output에서 사용자가 바꿀 수 있는 것, 판단이 멈추는 조건, 답변 뒤 보존되는 상태를 primary artifact로 만들었다.
- 조기 수렴을 멈춘 저자의 행동, 별도 pass, 같은 해상도의 output 비교, 마지막 실제 선택을 시간순으로 복구했다.
- 발산과 주장 엄격함이 공존하도록 기준의 판정 대상과 종료 권한을 분리했다.

### Move / cut

- 단위가 섞일 수 있는 `8회 전환`을 다시 넣지 않았다.
- `3 → 9 → 3`을 품질 개선 수치나 방법론 성공담으로 사용하지 않았다.
- 현재 글감 조사의 meta 장면은 마지막 mirror로 이동했다.

### Protected

- 엄격함을 늦춘 것이 아니라 겨누는 대상과 권한을 바꿨다는 판단
- 수렴을 늦춰 얻은 것은 우월성 증명이 아니라 비교 가능한 차이라는 상한
- 좋은 기준은 그 자체로 좋은 판단 순서를 만들지 않는다는 결말

## 5. Self-check

### Source selection

- 여행 플랫폼의 미해결 사용자 문제를 찾던 넓은 조사와 다음 조사 질문 결정
- 회사 직접 자료와 사용자·독립 자료의 서로 다른 증명 역할
- 회사 자료의 높은 가중치는 유효하다는 첫 점검
- 그 판정을 적용하며 `회사 방향 먼저 → 주변 마찰 나중 확인`으로 과교정된 조사 구조
- 더 넓은 입력과 두 번째 점검을 통한 역할 관계 복구
- assignment와 forward-bias의 짧은 stress test

### Build

- service, task, decision, stakes를 첫 화면에 공개 가능한 해상도로 복구했다.
- 저자를 `사용자`라고 부르지 않고 `나`로 돌렸다.
- 회사 대 사용자라는 결론 대결보다 각 source가 어떤 주장을 끝낼 권한이 있는지로 중심을 옮겼다.
- 세 상태 도식을 primary artifact로 두고, assignment와 forward-bias는 판단축과 행동 변화 기준을 보강하는 만큼만 남겼다.

### Move / cut

- 회사 조사, assignment, forward-bias를 같은 무게로 다루지 않았다.
- 내부 agent 이름과 raw 발화, 회사명, 대회명, 프로젝트명은 제거했다.
- self-check가 장기 재발을 막았다는 성공담을 만들지 않았다.

### Protected

- `결론은 달라졌지만 판단축은 그대로일 수 있었다.`
- `더 근본적으로를 더 추상적으로 읽었다.`
- 문제 설명과 다음 행동 변화가 같은 결과가 아니라는 구분
- AI의 설명과 행동을 같은 결과로 보지 않게 됐다는 결말

## v1 단계에서 아직 닫지 않은 것

- 최종 제목
- 첫 발행 글과 발행 순서
- 독립 글, 연결 글, 시리즈 여부
- `current.md`를 최종 공개 제목과 대표 개념으로 유지할지
- Judgment order와 Output-informed problem selection의 장기 material 소유권

이 판단은 완결된 v1과 독립 review를 본 뒤 사용자가 다음 수정 범위와 함께 정한다.
