---
작성일: 2026-07-27
갱신일: 2026-07-27
성격: v2 독립 review 반영 판단 / 내부 process 문서
공개상태: 내부 작업 문서
현재상태: 판단·v3 반영 완료 / 사용자 검토 대기
---

# v2에서 v3로 갈 때 무엇을 반영할 것인가

이 문서는 [v2 독립 review 원문](./03-v2-independent-review.md)을 원자료와 다시 대조해 v3 반영 범위를 정한 기록이다. 첫 review, v1→v2 반영 판단, 기준 변화 문서를 보지 않은 새 reviewer의 결과를 사용했다.

reviewer가 제안한 기준을 자동으로 적용하지 않는다. 이 문서의 `채택`, `조정 채택`, `기각`, `보류`는 [v1→v2 판단](./02-v1-to-v2-adjudication.md)과 같은 뜻이다.

## 두 번째 review의 독립성

reviewer에게는 원래 blog repo를 주지 않았다. draft-loop 폴더를 제외해 별도로 복사한 backlog snapshot, v2 다섯 편 snapshot, 그 문서가 직접 가리키는 원자료만 제공했다.

v1, 첫 review 원문, v1→v2 반영 판단, 기준 변화, Git history는 입력에서 제외했다. snapshot 문서에 남은 draft-loop 링크는 실제 대상 파일이 없는 끊어진 링크였고, reviewer에게 따라가지 말라는 경계를 함께 줬다. reviewer는 금지된 자료를 보지 않았다고 보고했다.

## 공통 기준에 대한 판단

### 1. 주된 사건과 보강 사건의 무게 분리 — 조정 채택

각 글의 첫 장면을 주된 시간축으로 유지한다. 다른 프로젝트 사례는 중심 결론의 mechanism, 반례, 적용 경계 중 하나만 맡고 분량을 줄인다.

다만 사건 수를 기계적으로 `1+1`로 제한하지 않는다. current의 terminal gap은 첫 사건이 만든 구조를 시험하는 stress test이고, scope의 deterministic 제안은 같은 mechanism의 경계를 보여 준다. 삭제보다 역할과 무게를 조정한다.

### 2. 판단 주체 복구 — 채택

v2 `judgment-order.md`의 두 1인칭 문장은 사실 귀속이 잘못됐다.

- main AI가 shaping cursor와 주장 상한을 후보 가치 판단으로 바꿨다.
- 사용자가 그 적용을 정정하고 후보 가치, shaping 상태, 근거 준비도, 주장 상한을 다시 분리했다.

따라서 `내가 하나의 rubric을 세 단계에 쓰려 했다`거나 `내가 rubric을 더 정교하게 만들려 했다`고 쓰지 않는다. AI가 무엇을 했고 사용자가 무엇을 받아들이지 않았는지 복구한다.

다른 네 글에서 사용자 정정, 판별 결과, 실제 artifact 변화의 주체를 분리한 문장은 보존한다.

### 3. 글마다 핵심 artifact 하나가 논증을 맡게 하기 — 조정 채택

reviewer는 artifact를 추가하자고 제안했지만, v2에는 이미 여러 표와 흐름이 있다. v3에서 새 artifact를 모두 더하면 글이 다시 process 문서처럼 커질 수 있다.

각 글에서 다음을 중심 artifact로 고른다.

- current: Q1~Q5 시간축 재배치
- 독립 판별: 9·15와 별도 검증의 역할 표
- scope: 제안된 `facts[]` 경로와 실제 답변 경로의 대비
- 판단 순서: A1·A2가 별도 비교 단위가 된 변화
- self-check: 설명을 고치는 동작과 자료 범위를 다시 확인하는 동작의 차이

current 구조 예시, 독립 판별 fixture, `ChatAnswer` schema를 추가로 모두 넣지는 않는다. 기존 artifact가 설명을 실제로 대신하도록 주변 산문을 줄인다.

### 4. 제안·구현·실행 결과·장기 효과 분리 — 채택

v2에서 바로잡은 사실 상태를 유지한다. 이 기준은 두 reviewer가 모두 독립적으로 유효하다고 봤고 직접 원자료도 지지한다.

다만 같은 상한을 글의 중간과 결말에서 반복하지 않는다. 사실을 다르게 읽게 만드는 상한은 해당 주장 옆에 두고, 이미 닫힌 방어 문장은 결말에서 다시 나열하지 않는다.

### 5. AI-native 고유성을 달라진 판단 조건으로 보여 주기 — 채택

AI라는 단어를 더 넣지 않는다. 각 글의 첫 사건에서 다음 조건이 보이게 한다.

- 전체 context를 읽고도 최근의 구체성이 전체 질문을 대신했다.
- 구현, fixture, 기대 결과, 완료 설명이 같은 생성 문맥의 세계를 공유했다.
- 작고 빨리 보이는 중간 산출물이 product slice로 제안됐다.
- 생성과 평가를 한 문맥에서 오가며 rubric의 종료 권한이 넓어졌다.
- 오류 설명 뒤 바로 다음 행동에서 같은 습관이 재현됐다.

보편 법칙이 아니라 해당 작업의 관찰 범위로 쓴다.

### 6. 발견을 지우는 방어 문장 줄이기 — 채택

다음 한계는 반드시 남긴다.

- 인과를 바꾸는 confound
- test 수와 반복 수의 의미를 바꾸는 상한
- 성공담으로 읽히는 것을 막는 미확인
- 실제 적용 범위를 가르는 반례
- 사용자 정정이 만든 변화를 AI 장치의 효과로 세지 않는 경계

같은 한계를 다른 말로 반복하거나, 이미 좁힌 주장을 결말에서 다시 철회하는 문장은 줄인다.

### 7. article type과 목소리 분화 — 채택

- current는 권위와 갱신 책임을 다루는 product-architecture 글로 둔다.
- 독립 판별은 실패 재현과 계약 교정을 중심으로 한 technical case study로 둔다.
- scope는 producer·consumer라는 말보다 중간 산출물과 실제 호출자 계약을 먼저 보여 주는 product-architecture 글로 둔다.
- 판단 순서는 우월성을 증명하지 않은 learning experiment로 둔다.
- self-check는 `했다`체와 자기 관찰을 보호하는 retrospective로 둔다.

### 8. 독립 판별과 self-check의 독자 질문 분리 — 채택

독립 판별 글은 결과물·source·실행면을 어떤 입력과 권한으로 판정할지에 머문다. self-check 글은 main AI의 framing과 반복 행동을 언제 되돌아보고, 다음 행동 변화로 언제 본 작업에 복귀할지에 머문다.

self-check의 fresh audit는 반복 오독 뒤 escalation으로만 남기고 독립 판별 계약을 반복하지 않는다.

## 표적 원자료 재검증 결과

### current terminal event — 기존 v2 사실 유지

마지막 current가 고정될 때 설문 작업은 이미 병렬로 진행 중이었다. final tree에서 빠진 범위는 설문 완료, ZIP 검증, 업로드 실패, 호환 ZIP 재생성과 후속 문의였다.

current에는 방향 변경 때 AI가 갱신을 제안하고 사용자가 확정한다는 규칙은 있었지만, 병렬 작업과 외부 terminal event를 어느 writer가 반영할지는 정해져 있지 않았다. 누락의 실제 원인은 기록으로 단정하지 않는다.

### scope 구현 시간축 — 사실은 확인됐지만 공개 산문에서는 날짜를 낮춤

직접 원자료는 raw `facts[]` 화면이 구현 전 제안이었고, 같은 날 후속 실제 구현은 `/api/questions → ChatAnswer → 상태·inline evidence` 경로를 연결했다고 지지한다. 다음 날에는 metamorphic·grounding·routing test와 호출자 없는 경로 제거가 실제 코드에 반영됐다.

v3에서는 독자에게 날짜가 필요하지 않으므로 `6월 9일`, `6월 10일`을 반복하지 않는다. `구현 준비 중 제안`, `후속 실제 구현`, `다음 교정에서 test와 dead path 제거`로 역할을 남긴다. 이는 불확실해서 낮추는 것이 아니라 내부 작업 시간축보다 판단 변화를 앞세우기 위한 편집이다.

### Cofathon 후보 수 — 서로 다른 artifact 계보를 분리

표적 재검증에서 다음이 확인됐다.

- 첫 발산은 A계열 12개와 B계열 10개, 합계 22개 원형이었다.
- 첫 정규화의 14개는 같은 문서 안의 중간 상태였다.
- fresh 감사 뒤 업무·문제 후보 15개 계열과 별도의 사용자·문제 확보 방식·증명 패턴으로 다시 나뉘었다.
- 이 15개 계열은 제작 후보가 아니라 rubric 대응층으로 내려갔다.
- 별도의 scene-first 재시작에서 actor, workflow, 입력·결과, 확인 수준을 적은 후보 6개가 1차 연구 초안으로 만들어졌다.
- 이 6개는 선택되지 않은 연구 산출물이었고, 이후 새 후보 생성의 씨앗에서도 제외됐다.
- 사흘 뒤의 5개 직접 발산과 네 비교 후보+한 확장 가설은 다른 MyRealTrip 계보의 artifact다. `6→5→4+1` 수렴이 아니다.

v3 공개 글에는 22·14·6·5·4+1을 모두 설명하지 않는다. 중심에 필요한 사실은 `15개 업무·문제 계열은 제작 후보가 아니었고, 별도 scene-first 연구 산출물은 actor·workflow·입력·결과를 명시했지만 채택되지 않았다`는 데까지다.

같은 오독이 다시 들어오지 않도록 candidate snapshot, active-state 후보 카드, first-pass shaping의 `15개 추상 후보` 표현도 함께 바로잡는다.

## 글별 반영 판단

### `current-active-state-operation.md`

#### 채택

- 첫 문단에서 current를 전체 단계와 현재 판단점을 함께 가리키는 상태 문서라고 바로 풀어 쓴다.
- Q1~Q5 배치표를 중심 artifact로 유지한다.
- `cursor`, `router`, `active contract`, `history`를 새 용어 목록처럼 쌓지 않는다. 필요한 곳에서 현재 판단점, 원천 연결, 현재 효력, 과거 이유로 풀어 쓴다.
- terminal gap은 별도 두 번째 본편이 아니라 갱신 책임이 없는 active state의 stress test로 압축한다.

#### 조정 채택

reviewer가 제안한 두 번째 sanitized current 구조는 추가하지 않는다. Q1~Q5 배치표와 이후 설명이 이미 지도·현재 판단점·원천 연결의 차이를 증명한다.

#### 보존

- 문제를 발견한 주체가 사용자였다는 사실
- current 단독 효과로 복구를 설명하지 않은 인과
- 병렬 작업과 terminal event의 갱신 책임
- 생산성·연속성 효과를 주장하지 않는 결말

### `independent-review-and-recovery.md`

#### 채택

- 제품 소개 첫 문단은 test 실패를 이해하는 데 필요한 최소 계약만 남긴다.
- 검증 역할 표를 중심 artifact로 유지하고, 표 직후 판별자 수보다 입력 경계가 중요하다는 중심을 회수한다.
- Tripproof A/B는 값 미추출, retrieval 빈손, 조건 문장을 값으로 선택한 세 실패를 짧은 흐름으로 압축한다.
- `claim`, `plan scope`, `grounding`, `entailment`는 처음 등장할 때 실제 뜻을 풀고, 중심에 필요하지 않은 용어는 줄인다.

#### 기각

새 fixture 예시를 추가하지 않는다. public source와 fixture의 모순은 이미 티켓 사례와 검증 역할 표로 충분히 보인다.

#### 보존

- 9·15의 test method 단위와 별도 validator·CLI·E2E
- AX 교정과 제한된 fresh regression 범위
- Tripproof를 입력 경계 반례로 쓰는 역할
- “제3판별자는 세 번째 AI가 아니다”라는 마지막 판단

### `product-flow-scope-control.md`

#### 채택

- raw `facts[]` 제안을 중심 사건으로 유지한다.
- deterministic product-proof 제안은 같은 mechanism을 확인하는 짧은 보강으로 줄인다.
- 흐름 대비와 세 제품행동 test는 서로 다른 역할이 있으므로 둘 다 유지한다. 중간의 별도 인과 도식은 산문으로 흡수한다.
- `surrogate`, `grounding`, `producer`, `consumer`보다 중간 산출물, 원문 근거, 실제 호출자라는 풀어쓴 말을 먼저 쓴다.
- 날짜는 줄이고 제안·후속 구현·교정의 상태 차이만 남긴다.

#### 보존

- deterministic 구현 자체가 항상 가짜는 아니라는 반대 경계
- test가 의미 품질과 사용자 가치를 증명하지 않는다는 상한
- slice의 끝은 UI가 아니라 실제 소비자 계약이라는 결말

### `judgment-order.md`

#### 채택

- 두 잘못된 1인칭 actor 귀속을 AI의 적용 오류와 사용자의 정정으로 고친다.
- 첫 recursive 장면과 AX A1·A2 경계 변화를 주된 시간축으로 둔다.
- 생성·주장 판정·후보 수렴은 첫 사건을 해석하는 이름으로 유지하되 정의를 압축한다.
- Cofathon은 15개 업무·문제 계열이 rubric 대응층으로 내려가고, 별도 scene-first 연구 산출물의 문서 해상도가 달라졌지만 채택되지 않았다는 보강 사례로 압축한다.
- 후보 수를 결과 품질이나 수렴 순서로 사용하지 않는다.

#### 보존

- 현재 글감 조사에서 오류가 재현된 첫 장면
- A1·A2가 별도 비교 단위가 된 artifact
- 확인됨·불충분·모름·확인 필요의 주장 상태
- 발산 종료는 객관적 측정치가 아니라 현재 목적과 비용 아래의 운영 신호라는 한계
- “엄격함이 무엇을 겨누는가”라는 마지막 판단

### `ai-self-check.md`

#### 채택

- `자신의 개입을 원인에 넣으면 행동도 자연스럽게 바뀔 것이라고 생각했다`는 개인 과거 신념을 사실처럼 쓰지 않는다. self-check를 만들 때 그렇게 기대하기 쉽다는 후대 해석으로 낮춘다.
- 해커톤 과교정은 `원래 두 범위를 함께 보되 섞지 않음 → 첫 감사 → main의 반대 방향 과적용 → 사용자 검출 → 넓은 입력의 두 번째 감사`라는 짧은 시간선으로 압축한다.
- fresh audit는 반복 오독 뒤의 escalation으로만 남긴다.
- 같은 한계를 반복하는 결말 문장을 줄인다.

#### 보존

- 전진 편향 첫 장면과 세 차례 사용자 제동
- 찾을 수 없는 AI 설명 전문과 정확한 반복 횟수를 복원하지 않은 정직함
- assignment 재검색을 self-check 효과로 세지 않는 경계
- 진단 정확도, 다음 행동 변화, 재발 방지의 구분
- `했다`체와 마지막 개인적 판단

## backlog에 함께 반영할 것

### 채택

- `process/candidates/02-topic-candidates.md`에서 15개를 검증된 제품 후보가 아니라 업무·문제 후보 계열로 고친다.
- `active-state/topic-candidates.md`에서 같은 층위 오류를 고치고, scene-first 6개는 선택되지 않은 별도 연구 산출물이었다고 적는다.
- first-pass `judgment-order.md`의 `15개 추상 후보`와 `15개 후보가 비슷해졌다`를 업무·문제 계열, rubric 반향, 실제 장면 부재라는 확인 범위로 고친다.
- v1→v2 반영 판단에 scene-first 6개가 미선택 연구 산출물이었고 후기 5·4+1과 다른 계보라는 보충을 남긴다.

### 보류

두 reviewer가 반복해서 제시한 중심 사건, actor, 사실 상태, article type, 주장 상한은 이미 active-state 기준 안에 있다. 새 평가축은 만들지 않는다.

한계 문장의 위치와 artifact 개수는 원고 shaping 기준이지 새 후보를 선택하는 기준이 아니므로 active-state criteria에 올리지 않는다.

## v3 완료 조건

- v1과 v2를 덮어쓰지 않고 v3 다섯 파일을 새로 만든다.
- 잘못된 actor 귀속과 Cofathon artifact 계보의 층위 오류가 남지 않는다.
- 각 글의 주된 사건이 보강 사건보다 먼저 보이고 더 큰 무게를 갖는다.
- 중심 artifact가 주변 설명을 실제로 대신한다.
- 독자의 해석을 바꾸지 않는 반복 방어 문장을 줄인다.
- 다섯 article type과 self-check의 목소리를 평탄화하지 않는다.
- 독립 판별과 self-check의 독자 질문이 겹치지 않는다.
- 순위·병합·첫 발행 글·발행일은 정하지 않는다.

## v3 반영 결과

- [current](../../../../../drafts/ai-native-topic-research-2026-07-20/v3/current-active-state-operation.md)는 Q1~Q5 시간축을 중심에 두고 terminal gap을 갱신 책임의 반례로 압축했다.
- [독립 판별](../../../../../drafts/ai-native-topic-research-2026-07-20/v3/independent-review-and-recovery.md)은 9·15와 별도 검증의 역할 표를 중심에 두고, 별도 판정이 닫힌 입력 밖을 복구하지 못한 반례를 줄여 남겼다.
- [scope control](../../../../../drafts/ai-native-topic-research-2026-07-20/v3/product-flow-scope-control.md)은 제안된 raw `facts[]` 경로와 후속 실제 답변 경로를 중심 대비로 삼았다.
- [판단 순서](../../../../../drafts/ai-native-topic-research-2026-07-20/v3/judgment-order.md)는 AI의 기준 오적용과 사용자의 정정을 올바른 주체에 돌리고, A1·A2가 별도 비교 단위가 된 장면을 중심에 두었다.
- [AI self-check](../../../../../drafts/ai-native-topic-research-2026-07-20/v3/ai-self-check.md)는 전진 편향과 세 차례 사용자 제동을 중심에 두고, 해커톤 과교정의 시간축과 self-check 효과의 상한을 바로잡았다.

다섯 파일은 서로 다른 article type과 목소리를 유지했다. 독립 판별과 self-check도 각각 결과물의 입력·권한을 판정하는 문제와 main AI의 반복 행동을 되돌리는 문제로 분리했다. 순위·병합·첫 발행 글·발행일은 정하지 않았다.

## 완료 검증

- main이 v3 다섯 편 전체를 다시 읽고 두 번째 반영 판단과 대조했다.
- 공개 초안에서 로컬 경로, 내부 프로젝트명·식별자, 비공개 대화·메모 이름이 남지 않았는지 별도 검색했다.
- 상대 링크 존재 여부와 Markdown diff 공백 오류를 확인했다.
- `blog-prepublish-check.mjs`는 통과했다. 사용자 발행 결정 전이므로 v1~v3의 `date: TBD` 경고는 의도한 상태로 남겼다.
