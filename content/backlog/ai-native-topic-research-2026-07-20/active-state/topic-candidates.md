---
작성일: 2026-07-23
갱신일: 2026-07-27
성격: AI-native 역량 기술 블로그 주제 후보 / 현재 상태
공개상태: 내부 작업 문서
현재상태: active 후보 8개 / 상위 후보 5개 post-v3 중심 보정 / 유지 후보 3개 / 다음 초안 준비
주요 원천:
  - ../process/candidates/02-topic-candidates.md
  - ../process/candidates/03-source-first-reanalysis.md
---

# AI-native 글감 후보 — 최신 상태와 다음 판단

이 문서는 지금 살아 있는 후보와 각 후보의 현재 위상을 소유한다. 후보가 어떻게 생기고 평가가 어떻게 바뀌었는지는 [process](../process/README.md)에 남기고, 여기에는 최신 중심 질문·근거·주장 상한·다음 shaping만 유지한다.

후보를 평가하는 현재 기준은 [criteria.md](./criteria.md)를 따른다. v1~v3와 review·main 판단을 대조해 아래 중심을 다시 맞춘 과정은 [post-v3 사용자 sync](../process/shaping/2026-07-27-v1-v3-draft-loop/05-post-v3-reassessment-and-user-sync.md)가 보존한다.

## 현재 후보 지형

현재 독립 글로 살아 있는 후보는 여덟 개다.

상위 후보:

- **current / active-state operation** — history와 현재 권위, 전체 지도와 단일 cursor를 분리해 운영하는 문제
- **독립 판별 / 제3판별자** — 문제 정의와 판별 결과를 main의 기존 언어로 합치기 전 별도 판단 상태로 유지하는 문제
- **제품 흐름을 자르지 않는 scope control** — 구현을 줄이면서도 사용자의 최소 end-to-end 흐름은 보존하는 문제
- **생성·주장 판정·후보 수렴의 판단 순서** — 후보를 넓히는 시점, 엄격히 검증하는 시점, 닫는 시점의 권한을 분리하는 문제
- **AI self-check** — main의 문제 정의와 과교정을 감사하고 실제 다음 행동의 변화를 확인하는 문제

유지 후보:

- **결과물 폐기와 기능 core 보존** — 잘못된 결과물은 버리되 다음 방향에도 유효한 기능 core는 분리해 보존하는 문제
- **기존 산출물을 가린 source-first second pass** — 앞선 분류와 문장을 가리고 원자료에서 후보를 다시 추출하는 문제
- **Output-informed problem selection** — 문제를 닫기 전에 비교 가능한 결과물을 먼저 만들어 선택 근거를 얻는 문제

후보가 여덟 개라는 말이 여덟 편의 시리즈를 확정했다는 뜻은 아니다. 각 후보는 독립 글로 성립할 가능성을 유지하며, shaping 뒤 병합·보류·분리를 다시 판단할 수 있다.

상위 후보와 유지 후보 안에는 순위가 없다. 이름 옆 문장은 현재 각 후보가 다루는 문제를 찾기 위한 설명이지, 그 위상을 정한 강점·평가 점수·고정된 가치 제안이 아니다. 목록을 이 특징에 따라 재배열하거나 다음 후보를 거르는 선행 기준으로 사용하지 않는다. 특징 자체도 상세 카드와 실제 shaping·초안에 따라 바뀔 수 있다.

## 현재 cursor — post-v3 중심 보정 뒤 새 초안 준비

첫 글과 후보의 최종 위상은 아직 확정하지 않는다. 상위 후보 다섯 개의 [1차 shaping](../process/shaping/README.md#2026-07-23-first-pass)과 v1~v3 [draft loop](../process/shaping/2026-07-27-v1-v3-draft-loop/README.md)를 완료한 뒤, 다섯 v3와 두 독립 review, main의 반영 판단, 기존 backlog와 후보 형성 기록을 종합 대조하고 사용자와 중심을 다시 맞췄다.

1차 shaping의 각 장에는 같은 항목을 뒀다.

1. 첫 장면
2. 중심 질문
3. 판단이 바뀐 시간순 사건
4. 독자가 볼 공개 가능한 artifact
5. 사용자의 판단이 바뀐 지점
6. 다른 개발자가 가져갈 기준
7. 이번 자료가 말하지 못하는 한계

비교할 때는 하나의 종합 점수를 만들지 않는다.

- 첫 문단만으로 문제가 보이는가
- AI-native 고유성이 일반 문서 관리·code review·vertical slicing과 구분되는가
- 사용자의 판단 변화가 한 문장으로 닫히는가
- 독자가 직접 볼 기술 artifact가 있는가
- 상한을 지켜도 글의 중심 효용이 남는가
- 공개 가능한 재현 자료를 준비할 수 있는가
- 지금 첫 글로 무엇을 대표하고 싶은가

후보마다 수정 내용은 다르지만 그 차이는 가치 서열이 아니다. 각 버전은 다섯 편을 모두 보존했고, 이전 버전을 덮어쓰지 않았다. v1과 v2 뒤의 독립 review와 main의 반영 판단도 별도 process 문서로 남겼다.

현재 다음 행동은 기존 v1~v3를 고치는 것이 아니라 보정된 중심으로 새 cycle의 완결된 v1 다섯 편을 쓰는 일이다. 전체 자료 종합과 사용자 sync, material 질문이 닫힌 중심을 다시 연 누수의 판정 회수까지 마쳤다. 새 v1 뒤에는 자동으로 v2나 v3까지 진행하지 않고 사용자와 다음 수정 범위와 버전 진행을 결정한다.

## 작업 주제 — Current와 history의 권위 분리

부제 후보: **AI와 긴 작업을 하며 history와 current를 분리하게 된 이유**

### 현재 상태

**상위 후보.** 1차 shaping과 v1~v3 draft loop 뒤 사용자 sync로 중심을 보정했다. 첫 글·발행 순서·최종 article type은 확정하지 않았다.

원천 우선 재조사 뒤 중심은 “문서를 잘 나누는 법”보다 더 구체적으로 바뀌었다.

> current는 긴 context의 요약문이 아니라, 이번 판단의 시간축·현재 효력·단일 cursor·권위 원천을 연결하는 active control surface다.

post-v3 sync에서는 current가 완벽하지 않아도 실제 작업에 도움이 됐고 지금도 active-state 구조를 계속 사용한다는 점을 다시 우선했다. 최근성 편향과 누락은 이 통제력이 없었다는 결론이 아니라, current 하나로 자동 해결되지 않는 한계다.

### 중심 질문

- 작업 log와 decision을 충분히 남겼는데도 왜 다음 AI는 지금 무엇이 유효한지 다시 추론해야 했는가?
- 전체 프로젝트 계보와 단 하나의 현재 판단점을 어떻게 함께 유지할 수 있는가?
- current가 존재해도 최근 작업에 과적합하는 이유는 무엇인가?

### 대표 사건

- AX에서 active Loop 계약이 process history에 있으면 현재 실행 권위를 갖기 어렵다는 문제가 드러났다. 현재 contract를 engineering 문서로 옮기고 process는 판단 이력을 소유하게 했다.
- 제출 설문 session은 current를 읽었지만 최신 Loop 01 장면을 프로젝트 전체처럼 서술했다. current의 전체 지도와 research·problem·solution 원천으로 다시 내려가 설문을 전면 재작성했다.
- final current는 package·설문·upload 실패 같은 terminal event 일부를 놓쳤다. current가 있다고 해서 자동으로 최신·완전해지는 것은 아니었다.
- Cofathon에서는 current가 상태 보고서처럼 커져, 전체 지도와 현재 cursor만 남기고 완료 이력은 원천 링크로 접었다.

### 새로 생긴 통제력

- active state와 append-only history를 분리한다.
- 지금 실행할 contract와 과거에 그렇게 판단한 이유를 다른 문서가 소유하게 한다.
- current에는 전체 생애주기 지도와 현재 cursor 하나를 둔다.
- 세부 사실은 current에 복제하지 않고 권위 있는 research·decision·engineering·Git으로 연결한다.
- 방향이 바뀌면 current를 덮어쓰고 history는 보존한다.
- 문서를 읽었다는 사실보다 이번 평가가 어느 시간축을 대상으로 하는지 다시 지정한다.

### 보이는 artifact

- AX current와 21개 commit 시간축
- process Loop goal에서 engineering active contract로 이동한 diff
- 첫 설문과 current 기반 재작성본
- Cofathon current의 지도 중심 축약 전후

### 다른 개발자가 가져갈 기준

- 이 문서는 현재 효력을 소유하는가, 과거 이유를 보존하는가?
- 현재 cursor가 여러 개인가?
- current 안의 문장은 직접 진실인가, 권위 원천으로 가는 router인가?
- 누가 언제 current를 갱신할 권한과 책임을 갖는가?
- 이번 평가 대상은 최근 구현인가, 프로젝트 전체인가?

### 주장 상한

- current 하나가 compaction·재진입·생산성 향상을 만들었다는 대조군은 없다.
- 연속성은 current, goal, Git, compaction summary, 사용자 정정이 결합한 결과다.
- current를 읽었다고 최근성 편향이 자동으로 사라지지 않는다.
- 줄 수와 byte 감소는 특정 snapshot의 정리 결과이지 품질 지표가 아니다.

### post-v3 합의와 다음 초안

- 중심은 current의 실패보다 active state와 history, 전체 지도와 단일 cursor, 현재 효력과 권위 원천을 나눠 얻은 통제력이다.
- [v3](../../../drafts/ai-native-topic-research-2026-07-20/v3/current-active-state-operation.md)의 Q1~Q5는 최근성 편향을 복구한 보강·한계 장면으로 사용하며 글 전체의 유일한 중심으로 고정하지 않는다.
- 다음 초안의 잠정 source 후보로 AX와 Cofathon의 기존 원천을 먼저 다시 본다. 어떤 장면을 주된 근거로 쓸지는 종합 뒤 정한다.
- 현재 블로그의 active-state 운영은 공개 가능한 좋은 보강 사례가 될 때만 추가한다.
- update ownership과 terminal event 누락은 통제력의 효용을 지우지 않는 한계로 둔다.

### 제목 후보

- `기록을 남겨도 프로젝트는 제어되지 않았다`
- `AI와 긴 작업을 하며 history와 current를 분리하게 된 이유`
- `current.md는 작업 로그가 아니다`
- `긴 AI 작업에서 필요한 것은 더 많은 기록이 아니었다`

### 주요 원천

- [재조사 전 상세 후보 snapshot](../process/candidates/02-topic-candidates.md#후보-1-기록을-남겨도-프로젝트는-제어되지-않았다)
- [source-first 이후 중심과 상한](../process/candidates/03-source-first-reanalysis.md#후보-1-current--active-state-operation)
- [AX Loop 01 active contract](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/engineering/01-loop-01-goal.md)
- [AX current 기반 설문 재작성](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/29-questionnaire-rebuild-from-current.md)
- [AX current·gate 전수 감사](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/20-작업과정-하네스-분석/02-독립조사/git/08-current-and-gate-audit.md)
- [Cofathon 현재 current 계약](/Users/hammyeong-yeon/Desktop/10_work/cofathon/context/current.md)

## 작업 주제 — 독립 판별의 판단 상태와 회수 구조

부제 후보: **제3판별자는 세 번째 AI가 아니다**

### 현재 상태

**상위 후보.** 1차 shaping과 v1~v3 draft loop 뒤 사용자 sync에서 AI self-check와 연결된 별도 글로 두는 방향을 정했다. 첫 글·발행 순서·최종 article type은 확정하지 않았다.

재조사 뒤 독립 판별의 범위는 reviewer 호출에서 다음 계약 전체로 넓어졌다.

> 독립성은 모델 수가 아니라 입력, 원자료 접근, 질문 수정, write·완료 권한, main의 회수 기준으로 만들어진다.

03 이후 원대화를 다시 확인하면서 출력 쪽의 독립성도 추가됐다.

> 판별 결과를 main의 기존 언어로 즉시 합치지 않고, 사용자가 차이와 충돌을 볼 때까지 별도의 판단 상태로 노출한다.

### 중심 질문

- test와 validator가 모두 통과했는데 왜 구현자가 만든 세계 밖의 결함은 남았는가?
- 별도 AI를 부르는 것과 구현자의 오류 상관을 끊는 판별 구조는 무엇이 다른가?
- 독립 reviewer의 결과가 새 정답이 되지 않게 누가 무엇으로 회수하는가?

### 대표 사건

- AX 첫 구현은 9개 fixture test와 정적 validator를 통과했다.
- 별도 판별은 설치된 자연어 E2E 부재, 공개 사실과 fixture의 모순, 문자열 `"false"` 수용, child scope 누출, 상반 claim 순서 의존을 찾았다.
- 교정 뒤 해당 checkpoint의 test는 15개로 늘었고, 새 Codex task에서 자연어 요청→MCP→구조화→수정 발화→seller 답변 흐름을 실행했다.
- Cofathon의 두 fresh review는 같은 후보에 서로 다른 통과·조건부 판정을 냈다.
- Tripproof에서는 생성기와 judge를 나눴지만 앞단 추출이 오염된 입력을 넘겨 AC2가 성립하지 않았다. judge도 입력과 실패 귀속을 포함해 다시 평가해야 했다.

### 새로 생긴 통제력

- 결과물뿐 아니라 raw·canonical source와 실제 실행면을 판별 입력에 넣는다.
- 구현자의 예상 결론과 설명을 evaluator의 정답으로 주지 않는다.
- reviewer가 질문을 기각하거나 평가 범위를 다시 잡을 수 있게 한다.
- 판정은 read-only로 두고 구현 write와 완료 선언을 분리한다.
- 사용자가 독립 결과의 차이와 충돌을 본 뒤 무엇을 취합할지 결정한다.
- main은 그 결정과 사용자 의도, 현재 contract, 실제 artifact를 기준으로 reviewer 결과를 채택·수정·기각한다.
- reviewer 자체의 오류 상관과 성능도 eval·revert 대상에 둔다.

### 보이는 artifact

- AX 9→15 test diff
- 설치형 자연어 E2E와 새 task 실행 기록
- Cofathon의 서로 다른 두 판별 결과
- Tripproof judge·relation pass·구조 proxy의 A/B, revert, canonical spec 정정

### 다른 개발자가 가져갈 기준

- 이 reviewer는 구현자와 다른 무엇을 보는가?
- raw source와 외부 contract에 직접 접근하는가?
- fixture 일관성과 실제 실행을 다른 gate로 보는가?
- 판별자는 write하거나 완료를 선언할 수 있는가?
- 판별 결과가 사용자에게 보이기 전에 main의 언어로 다시 요약·취합되는가?
- main은 어떤 최소 증거로 reviewer 결과를 기각할 수 있는가?

### 주장 상한

- 9→15 test는 AX Loop 01 한 checkpoint이지 전체 프로젝트 품질 지표가 아니다.
- fresh·blind라는 이름만으로 독립성이 증명되지 않는다.
- 같은 모델이면 비독립, 다른 모델이면 독립이라는 단순 규칙은 성립하지 않는다.
- fresh AI가 항상 더 옳거나 reviewer 수가 늘수록 품질이 오른다고 말할 수 없다.
- Tripproof의 judge 실험은 작은 local dataset과 추가 호출이 있는 제한된 사례다.

### post-v3 합의와 다음 초안

- [v3](../../../drafts/ai-native-topic-research-2026-07-20/v3/independent-review-and-recovery.md)의 9·15 검증 역할 표와 설치형 E2E가 기술적 중심을 충분히 닫는지 본다.
- 구현자와 다른 입력·권한을 연 판별자의 역할이 추상적인 review 원칙이 아니라 실제 실패 복구로 읽히는지 확인한다.
- 별도 판정이 닫힌 입력 밖을 복구하지 못한 반례의 분량이 중심 사건을 흐리지 않는지 본다.
- [AI self-check](#작업-주제--ai-self-check의-효용과-행동-변화)와 합치지 않고 연결된 두 편으로 둔다.
- 이 글은 별도 판단 위치의 입력·질문·권한·노출·회수 계약을 맡고, self-check 글은 main 자신의 판단을 그 위치에 올려보내는 조건을 맡는다.
- 두 글의 발행 순서와 실제 연결 방식은 새 초안 뒤 결정한다.

### 제목 후보

- `테스트 9개가 모두 초록인데 제품은 아직 틀렸다`
- `제3판별자는 세 번째 AI가 아니다`
- `AI에게 리뷰를 한 번 더 시켰는데 왜 같은 실수를 반복할까`
- `fixture test가 만든 세계 밖으로 나가는 법`

### 주요 원천

- [재조사 전 상세 후보 snapshot](../process/candidates/02-topic-candidates.md#후보-2-테스트-9개가-모두-초록인데-제품은-아직-틀렸다)
- [source-first 이후 확장된 판별 계약](../process/candidates/03-source-first-reanalysis.md#후보-2-독립-판별--제3판별자)
- [AX 첫 구현과 fresh 미통과](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/26-loop-01-first-implementation-and-operations-retro.md)
- [AX 교정 cycle과 설치 자연어 E2E](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/27-loop-01-correction-cycle.md)
- [Tripproof self-certification decision](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/decisions/2026-06-25-llm-answer-self-certification-reframe/index.md)
- [Tripproof entailment judge canonical spec](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/specs/2026-07-01-answer-pipeline-substrate-redesign/03-conditional-value-entailment-judgment.md)

## 작업 주제 — 제품 흐름을 보존하는 scope control

부제 후보: **얇은 slice와 가장 빨리 보이는 결과는 다르다**

### 현재 상태

**상위 후보.** 1차 shaping과 v1~v3 draft loop 뒤 사용자 sync로 AI-native 중심을 보정했다. 첫 글·발행 순서·최종 article type은 확정하지 않았다.

기존 artifact/core 후보와 다루는 시점이 다르다.

- artifact/core: 만든 뒤 무엇을 버리고 무엇을 살릴지
- scope control: 만들기 전에 무엇을 줄여도 되고 무엇은 끝까지 살아야 하는지

### 중심 질문

- AI에게 scope를 줄이라고 할 때 무엇을 줄이고 무엇은 끝까지 관통시켜야 하는가?
- 얇은 vertical slice와 가장 빨리 보이는 surrogate output은 어떻게 다른가?
- 어떤 조건에서 AI가 불확실하지만 가치 있는 중심 작용보다 완료로 세기 쉬운 확실한 대체 결과를 먼저 내는 경향이 나타났는가?
- 작은 구현이 실제 product proof가 되려면 어느 소비자 contract까지 닫혀야 하는가?

`AI 회피성`은 이 경향을 찾을 때의 내부 감각이지 AI의 보편적 성격이나 의도를 단정하는 공개 주장이 아니다.

### 대표 사건

- Tripproof에서 `facts[]`를 화면에 바로 표시하는 경로가 작은 구현으로 제안됐다. 하지만 사용자가 묻고 AI가 자료를 해석해 답을 만드는 product flow가 raw fact 표시로 줄었다.
- deterministic adapter와 sanitized seed가 실제 LLM product proof처럼 설명됐다. 불확실성을 통제한 것이 아니라 제품 밖으로 밀어낸 demo가 됐다.
- 교정 뒤 prose guard를 더 쓰는 대신 실제 causal actor를 묻는 decision-time question과 metamorphic·grounding·routing test로 강제 위치를 바꿨다.
- AX에서는 MCP와 상세 정보 수집이 제품 중심처럼 올라왔지만, 실제 제품은 사용자의 조건 변경과 seller 답변 뒤 판단 상태가 어떻게 달라지는지를 보여 줘야 했다.

### 새로 생긴 통제력

- scope를 파일 수·구현 난이도·보이는 화면 수로 재지 않는다.
- 무엇을 가장 확실하게 끝낼 수 있는지보다 이번 slice에서 어떤 가치와 사용자 상태 변화가 생겨야 하는지를 먼저 쓴다.
- `사용자 입력 → 핵심 변환 → 사용자가 읽는 출력 → 다음 행동`에서 이번 slice가 책임질 한 경로를 끝까지 살린다.
- 필드 수, provider 품질, 데이터 다양성, UI polish는 줄일 수 있다.
- 핵심 변환을 다음 spec으로 미루거나 fixture·raw response·test double로 대체하지 않는다.
- “작게”라고 말하기 전에 이번 slice가 바꿔야 할 사용자 상태를 한 줄로 쓴다.

### 보이는 artifact

- Tripproof 6월 9일 product-flow drift implementation note
- 6월 10일 판단·test 강제 decision
- 제품행동 불변식 test와 미사용 dead path 제거 diff
- AX selected solution, top-level engineering goal, Loop 01 acceptance before/after

### 다른 개발자가 가져갈 기준

- 이번 slice의 실제 소비자는 누구인가?
- 그 소비자가 받는 입력과 출력 사이의 핵심 변환은 무엇인가?
- 어떤 부분을 줄여도 그 인과는 유지되는가?
- 지금 보이는 결과는 product output인가, test double·fixture·provider response인가?
- 다음 spec으로 미룬 것이 polish인가, 이번 기능의 중심 작용인가?

### 반례와 주장 상한

- 모든 작은 기술 slice가 UI까지 가야 한다는 뜻은 아니다. 실제 소비자가 쓰는 contract까지 닫히면 된다.
- 제품 본질이 deterministic contract인 기능에서는 deterministic 구현 자체가 product proof일 수 있다.
- decision-time question과 test도 고정 gate로 굳으면 다른 형태의 제품 흐름을 막을 수 있다.
- 이 contract가 모든 프로젝트의 최적 slicing 방법이라고 말하지 않는다.

### post-v3 합의와 다음 초안

- 중심은 vertical slice 원칙 자체보다, 작고 빠르고 눈에 보이는 결과를 요구받을 때 AI가 가치 있는 핵심 변환을 확실한 대체 결과로 바꾸는 판단 경향이다.
- [v3](../../../drafts/ai-native-topic-research-2026-07-20/v3/product-flow-scope-control.md)의 raw `facts[]` 제안과 후속 실제 답변 경로는 이 경향을 보여 주는 중심 사건 후보로 유지한다.
- 현재 흐름 대비와 세 test 설명만으로 중심 작용이 보이는지, 공개 가능한 작은 code 예제가 더 필요한지 판단한다.
- deterministic 사례가 반대 경계로만 남아 중심 사건을 흐리지 않는지 본다.
- `AI 회피성`이라는 내부 감각은 관찰 가능한 선택 조건과 artifact 변화로 번역하고 성격 일반화로 쓰지 않는다.

### 제목 후보

- `AI에게 작게 만들라고 했더니 제품 흐름이 사라졌다`
- `얇은 slice와 가장 빨리 보이는 결과는 다르다`
- `AI가 scope를 줄일 때 무엇을 끝까지 남겨야 할까`

### 주요 원천

- [source-first 통합 후보 카드](../process/candidates/03-source-first-reanalysis.md#fresh-1-ai에게-작게-만들라고-했더니-제품-흐름이-사라졌다)
- [Tripproof product-flow drift](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/implementation-notes/2026-06-09-spec-driven-product-flow-drift/index.md)
- [Tripproof 판단·test 강제 decision](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/decisions/2026-06-10-spec-driven-judgment-and-test-enforcement/index.md)
- [Tripproof LLM grounding demo drift](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-05-llm-grounding-demo-drift/raw.md)
- [AX 제품 중심 복원](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/23-selected-solution-reframing.md)

## 작업 주제 — 생성·주장 판정·후보 수렴의 판단 순서

부제 후보: **생성·주장 판정·후보 수렴을 분리하기**

### 현재 상태

**상위 후보.** 1차 shaping과 v1~v3 draft loop 뒤 사용자 sync에서 `발산`의 의미와 판단 순서를 보정했다. 첫 글·발행 순서·최종 article type은 확정하지 않았다.

### 중심 질문

- 좋은 기준이 있는가보다, 지금 그 기준이 무엇을 판단하고 무엇을 닫을 권한을 갖는가?
- 후보와 가능한 가치·성과를 먼저 펼치는 일과 개별 주장을 엄격히 검증하는 일을 어떻게 함께 할 수 있는가?
- 같은 rubric도 생성 전, 주장 검증 중, 후보 수렴 때 왜 다른 결과를 만드는가?

### 대표 사건

- AX에서 검색 전의 중립적 분류도 관찰을 그 칸 안으로 좁힐 수 있다는 정정이 있었다.
- 기존 3후보판에 새 기준을 붙이지 않고 기존 판을 가린 second pass를 별도로 만들었다.
- 문제를 먼저 닫고 솔루션을 비교하는 순서를 멈추고 문제–솔루션 조합의 출력까지 펼쳤다.
- Cofathon에서는 평가 rubric과 조직 가치 언어를 발산 재료로 만든 22개 원형을 감사해 업무·문제 후보 15개 계열과 별도 방식·패턴으로 다시 나눴다. 이 15개 계열은 검증된 제품 후보가 아니라 rubric 대응층으로 내려갔다.
- 별도의 scene-first 재시작에서 actor·workflow·입력·결과·확인 수준을 적은 후보 6개가 1차 연구 초안으로 만들어졌지만 선택·최종 수렴된 후보군은 아니었다.
- ai-note에서는 생성보다 ROI 심사를 먼저 한 AI가 가능성보다 탈락 사유를 계속 찾았다.
- 03 이후에는 `첫 shaping 3개`라는 작업 cursor를 가치 서열로 읽고, 주장 상한과 한 편의 중심 질문 기준으로 self-check를 조기 수렴시켰다가 사용자 정정으로 되돌렸다.

### 새로 생긴 통제력

1. 생성·관찰에서는 문제 경계, 후보, 가능한 가치·성과·새 통제력을 먼저 충분히 펼친다.
2. 후보 안에서는 사실·모름·위험을 주장 단위로 엄격히 판정한다.
3. 후보 전체의 선택·미선택·종료는 충분히 펼친 뒤 마지막 수렴에서 판단한다.

발산은 느슨함이 아니다. 엄격함을 없애는 것이 아니라 엄격함이 판단하는 대상과 후보를 닫는 시점을 바꾼다.

### 보이는 artifact

- AX 첫·두 번째 후보판
- research·problem·solution의 순서 변경 process
- Cofathon의 15개 업무·문제 계열과 선택되지 않은 scene-first 1차 연구 초안, 판단 순서 core
- ai-note의 두 prompt pass와 pilot 계약

### 다른 개발자가 가져갈 기준

- 이 rubric은 후보를 생성하는가, 후보 안의 주장을 검증하는가, 후보 전체를 닫는가?
- 지금 기준이 죽일 수 있는 대상은 주장인가, 후보인가?
- 명백한 사실 모순과 가능성이 덜 펼쳐진 상태를 같은 실패로 보는가?

### 반례와 주장 상한

- 사실과 명백히 모순하거나 안전·비용·공식 경계를 위반하는 후보는 중간에도 종료할 수 있다.
- 순서를 바꾼 뒤 최종 제품 품질이 높아졌다는 통제 비교는 없다.
- 확인된 것은 후보 공간을 너무 일찍 없애지 않고 서로 다른 문제 경계를 다시 볼 수 있었다는 점이다.

### post-v3 합의와 다음 초안

- 중심은 `먼저 펼치고 나중에 거른다`는 구호보다 가치 발견, 주장 판정, 후보 수렴이 서로 다른 시점과 권한을 갖는다는 데 있다.
- 발산 중에도 사실 모순, 안전·비용·공식 경계, 개별 주장 상한은 엄격하게 본다.
- [v3](../../../drafts/ai-native-topic-research-2026-07-20/v3/judgment-order.md)에서 AI의 기준 오적용과 사용자의 정정이 직접 원천과 맞는지 계속 확인한다.
- A1·A2가 별도 비교 단위가 된 artifact가 세 판단 단계의 권한 분리를 충분히 보여 주는지 확인한다.
- Cofathon이 결과 우월성의 근거가 아니라 rubric-first와 scene-first 산출물의 해상도 차이를 보여 주는 보강 사례로만 읽히는지 본다.
- 통제 실험이 아니었던 한계를 지키면서 learning experiment 형식이 이 글에 맞는지 판단한다.
- 사용자가 당시 이미 이 기준을 같은 말로 의식했다는 기억은 불확실하다. 확인되지 않은 과거 1인칭 신념은 만들지 않는다.

### 제목 후보

- `좋은 평가 기준을 먼저 줬더니 AI의 후보가 전부 비슷해졌다`
- `좋은 기준보다 먼저 정해야 했던 것은 판단 순서였다`
- `rubric은 씨앗이 아니라 필터였다`
- `AI 아이디어를 엄격하게 보면서 너무 일찍 죽이지 않는 법`

### 주요 원천

- [재조사 전 상세 후보 snapshot](../process/candidates/02-topic-candidates.md#후보-3-좋은-평가-기준을-먼저-줬더니-ai의-후보가-전부-비슷해졌다)
- [source-first 이후 중심 변경](../process/candidates/03-source-first-reanalysis.md#후보-3-평가-기준을-적용하는-시점)
- [AX 독립 second pass](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/14-integrated-criteria-and-independent-second-pass.md)
- [Cofathon 판단 순서 core](/Users/hammyeong-yeon/Desktop/10_work/cofathon/context/core/candidate-exploration-judgment-order.md)
- [ai-note 분석 value discovery stance](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-07-01-analysis-value-discovery-stance/raw.md)
- [03 이후 후보 상태 교정](../process/candidates/04-post-03-candidate-state-correction.md)

## 작업 주제 — AI self-check의 효용과 행동 변화

부제 후보: **AI가 자기 오류를 설명하고도 같은 방향으로 다시 틀렸을 때**

### 현재 상태

**상위 후보.** 1차 shaping과 v1~v3 draft loop 뒤 사용자 sync에서 AI 자신의 판단을 객관화하는 중심을 복원했다. 독립 판별과 연결된 별도 글로 두며 첫 글·발행 순서·최종 article type은 확정하지 않았다.

### 중심 질문

- AI가 자신의 문제 정의·추상화·도구 선택을 실패 원인 안에 넣는다는 것은 무엇인가?
- main의 전제·scope·판단 위치 자체를 어떻게 별도의 검사 대상으로 만들 수 있는가?
- 왜 자기 오류를 정확히 설명하고도 다음 행동에서 같은 방향을 반복하는가?
- self-check는 언제 발동하고 어디에서 끝나야 하는가?

### 대표 사건

- 안전한 demo를 만들며 실제 자료의 불확실성을 제품 밖으로 밀어내고 그 장치를 product proof처럼 말한 사건
- 회사 기준을 더 보라는 정정 뒤 회사 관점으로 과교정하고, 다시 객관성을 보라는 정정 뒤 반대 방향으로 과교정한 AX 사건
- forward bias를 고치는 대화에서 AI가 여러 번 바로 초안 작성으로 앞질러 가, 고치려던 행동을 같은 대화에서 재현한 사건
- 단순한 설명 요청을 판단 오류로 읽으면 self-check가 불필요한 meta 절차가 되는 경계
- main 단독 판단이 꼬이거나 반대 방향으로 과교정될 때 fresh auditor의 별도 판단을 사용자가 먼저 보고, 무엇을 취할지 함께 판단한 운영 경험

### 새로 생긴 통제력

- 외부 대상만 탓하지 않고 방금 결과를 만든 AI의 문제 정의·전제·scope·도구 선택·다음 행동을 검사 대상으로 만든다.
- 같은 판단 위치에서 설명만 반복하거나 반대 방향으로 과교정하면 별도의 독립 판단 위치에 main의 판단을 올린다.
- 진단 정확도, 다음 행동 변화, 재발 방지를 서로 다른 결과로 본다.
- 첫 정정은 바로 반영하고 같은 축의 오독이 반복될 때만 fresh audit로 올린다.
- self-check의 결과는 설명문이 아니라 다음 행동 차이를 최소 artifact로 확인한다.
- fresh auditor가 무엇을 문제로 볼지 직접 정하고, 그 결과를 main이 취합하기 전에 사용자에게 별도의 판단 상태로 노출한다.

### 보이는 artifact

- AI self-check와 principle-calibration이 생긴 원대화
- AX process 07~09의 두 방향 과교정
- 전역 기본 태도 before/after

### 다른 개발자가 가져갈 기준

- AI는 무엇을 문제로 정의했고 무엇을 위험으로 보았는가?
- 위험을 줄였는가, 제품 밖으로 옮겼는가?
- 자기진단 뒤 다음 tool call·수정·중단 행동이 실제로 달라졌는가?
- 이 상황은 첫 정정인가, 반복 오독인가, 단순 설명 문제인가?

### 주장 상한

- self-check가 재발을 막거나 행동을 안정적으로 바꾼다는 증거는 없다.
- 같은 오염된 frame 안의 자기해명은 기존 방향을 더 정교하게 변호할 수 있다.
- 모든 오해를 self-check·fresh audit로 올리면 meta 작업이 본 작업을 가린다.
- skill의 존재와 실제 판단 변화는 같은 결과가 아니다.

### post-v3 합의와 다음 초안

- 중심은 답을 다시 설명하는 절차보다 AI 자신의 framing과 판단 위치를 객관화해 별도 판별 대상으로 만드는 일이다.
- [v3](../../../drafts/ai-native-topic-research-2026-07-20/v3/ai-self-check.md)의 전진 편향과 세 차례 사용자 제동은 발동·실패 장면으로 유지하되 글 전체의 유일한 중심으로 고정하지 않는다.
- assignment, AX의 양방향 과교정, fresh auditor 운영은 다음 초안에서 다시 대조할 잠정 material 후보다. 종합 뒤 각 장면의 역할과 포함 여부를 정한다.
- `ai-self-check-fundamental.md`를 찾지 못한 상태에서 복원하지 않은 장면과, 현재 자료로 쓸 수 있었던 assignment·해커톤 장면의 경계가 정직한지 확인한다.
- 다음 행동 차이는 설명으로 끝나지 않았는지 보는 최소 결과 기준이지 self-check의 개념 전체는 아니다.
- [독립 판별](#작업-주제--독립-판별의-판단-상태와-회수-구조)과 연결된 별도 글로 둔다. 이 글은 main 자신의 판단을 검사 대상으로 넘기는 조건과 과교정 복구를 맡는다.
- 사용자는 결과를 조율하는 최종 판단자지만 그 사실 자체를 글의 개념적 중심으로 삼지 않는다.

### 제목 후보

- `AI self-check는 답을 다시 쓰는 일이 아니다`
- `AI가 자기 개입을 원인에 넣기 시작했을 때`
- `AI는 자기 오류를 설명하고도 같은 방향으로 다시 틀렸다`
- `더 근본적으로 보라는 말은 더 추상적으로 보라는 뜻이 아니었다`

### 주요 원천

- [재조사 전 상세 후보 snapshot](../process/candidates/02-topic-candidates.md#후보-4-ai-self-check는-답을-다시-쓰는-일이-아니다)
- [source-first 이후 강화된 한계](../process/candidates/03-source-first-reanalysis.md#후보-4-ai-self-check)
- 기존 draft로 기록된 경로 `content/drafts/ai-self-check-fundamental.md` — 현재 workspace와 Git history에서 파일 미확인
- [self-check와 principle calibration 발단](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-21-ai-self-check-principle-calibration/raw.md)
- [forward bias 교정 중 반복 행동](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-07-09-harness-forward-bias-impact-axis/raw.md)
- [03 이후 후보 상태 교정](../process/candidates/04-post-03-candidate-state-correction.md)

## 작업 주제 — 결과물 폐기와 기능 core 보존

부제 후보: **AI가 만든 artifact와 제품 core를 다른 교체 단위로 보기**

### 현재 상태

**유지 후보.** shaping과 추가 원천 확인 가능성을 보존한다. Cofathon 원본은 이번 source-first 조사 범위 밖이었으므로 최신 재판정은 부분적이다.

### 중심 질문

- AI가 만든 결과물이 사용자 장면과 어긋났을 때 왜 전체를 지키거나 전체를 버리는 두 선택만 남는가?
- 잘못된 evidence·presentation artifact를 버리면서 검증된 기능 core와 user workflow를 어떻게 다른 교체 단위로 다룰 수 있는가?

### 대표 사건

- Cofathon의 정적 reviewer artifact는 상품 ID·option ID·revision·scope 같은 내부 상태를 전면에 보여 줬지만 실제 여행자가 상품을 검토하는 장면과 맞지 않았다.
- 사용자는 reviewer artifact와 evidence cycle을 제거하면서 plugin 기능 code, fixture, product test는 보존했다.
- 보존한 core는 조건 승인·질문·답변 적용·상태 전이·저장 기능으로 한정하고 사용자 진입은 다시 설계했다.
- 이후 상품 URL과 자연어 여행 조건을 경쟁시키지 않고, 사용자가 이미 상품을 골랐는지에 따라 진입을 나눈 뒤 live data는 MCP로 회수하도록 재구성했다.

### 새로 생긴 통제력

- evidence·presentation artifact, validated function core, user workflow를 같은 성과로 취급하지 않는다.
- 삭제할 것, 보존할 것, 현재 권위를 가질 것, 매번 실행할 것을 서로 다른 질문으로 판단한다.
- test 결합과 상태 contract 수준에서 core가 무엇인지 지정한다.
- core를 보존했다는 사실을 사용자 가치 증명으로 올리지 않는다.

### 보이는 artifact

- Cofathon process 36~38의 삭제·보존 diff
- evidence JSON과 product test의 결합 해제
- 보존된 조건·상태 전이·저장 test
- 후속 live 상품 진입과 URL·MCP 역할 재설계

### 다른 개발자가 가져갈 기준

- 지금 방어하는 것은 표현 artifact인가, 검증된 기능인가, 사용자 workflow인가?
- 무엇이 test와 contract로 실제 검증됐는가?
- 어떤 artifact가 사라져도 core가 독립적으로 서는가?
- 보존한 기능은 현재 사용자 진입과 실제로 이어지는가?

### 주장 상한

- core 보존은 사용자 가치와 구매 결과를 증명하지 않는다.
- 폐기 시점에는 실제 사용자 E2E가 완성되지 않았다.
- “artifact를 버리면 제품이 산다”는 보편 법칙으로 쓰지 않는다.
- 현재는 “제품을 살렸다”보다 “제품 질문으로 선택적으로 돌아갔다”가 정확하다.
- Cofathon 원본 재조사 뒤 중심이 scope control과 합쳐질 가능성은 열려 있다.

### 다음 shaping

- Cofathon 원본 process·Git·raw를 source-first 방식으로 다시 조사한다.
- 삭제한 것과 보존한 것을 code/test 수준에서 공개 가능한 before/after로 만든다.
- 초기 meta-stage 수치는 재계산 전 hook으로 사용하지 않는다.

### 제목 후보

- `결과물을 뒤엎고도 기능은 살리는 법`
- `AI가 만든 결과물 전체를 하나의 성과로 취급하지 않기`
- `심사자 페이지는 버리고 product core는 남겼다`
- `잘못 만든 결과물에서 무엇을 살릴 것인가`

### 주요 원천

- [재조사 전 상세 후보 snapshot](../process/candidates/02-topic-candidates.md#후보-5-결과물을-뒤엎고도-기능은-살리는-법)
- [source-first 재조사의 부분 판정](../process/candidates/03-source-first-reanalysis.md#후보-5-결과물-폐기와-기능-core-보존)
- [Cofathon evidence cycle 폐기와 core 보존](/Users/hammyeong-yeon/Desktop/10_work/cofathon/context/process/36-discard-evidence-cycle-and-preserve-feature-core.md)
- [Cofathon live 상품 후보 진입](/Users/hammyeong-yeon/Desktop/10_work/cofathon/context/process/37-upgrade-solution-to-live-purchase-entry.md)
- [Cofathon 사용자 장면별 URL·MCP 진입](/Users/hammyeong-yeon/Desktop/10_work/cofathon/context/process/38-choose-entry-by-user-scene-and-use-mcp-fully.md)

## 작업 주제 — 기존 산출물을 가린 source-first 재추출

부제 후보: **기존 artifact가 문제 frame을 소유할 때**

### 현재 상태

**유지 후보.** shaping과 추가 원천 확인 가능성을 보존한다.

### 중심 질문

- 기존 문서의 결론이 틀렸다고 의심될 때 왜 그 문서를 더 잘 고치는 것만으로 부족한가?
- 기존 artifact를 수정하는 일과 raw에서 문제 경계를 다시 생성하는 일은 어떻게 다른가?

### 대표 사건

- AX에서 첫 3후보판과 process 13을 직접 입력에서 제외한 별도 5후보판을 만들고 마지막에 대조했다.
- 작업자는 project current에는 노출돼 있었으므로 완전한 blind pass는 아니었다.
- ai-note에서는 기존 문서를 수정할수록 그 frame에 묶여 fresh doc을 요청한 사건과, 병렬 조사 전에 원문을 먼저 보라고 turn을 중단한 사건이 반복됐다.
- 이번 조사도 01·02의 hash를 고정하고 기존 후보를 첫 입력에서 뺀 재조사를 03에 별도로 남겼다.

### 새로 생긴 통제력

- 기존 산출물을 정답 후보로 둔 채 수정하는 일과 raw에서 문제 경계를 다시 생성하는 일을 분리한다.
- 첫 판을 실패작으로 지우지 않고 snapshot과 비교 기준으로 보존한다.
- fresh pass에는 범위와 raw source만 주고 기존 후보판은 마지막 reconciliation 때 공개한다.
- fresh 결과도 자동 정답으로 올리지 않고 유지·신규·충돌을 직접 원천으로 다시 판단한다.

### 보이는 artifact

- AX `problem/01`과 `problem/02`
- process 14와 commit `1743e0c`
- 첫 후보판 SHA 보존
- 현재 조사 폴더의 process 01·02·03과 active-state 분리

### 다른 개발자가 가져갈 기준

- 버그가 문장·수치에 있는가, 문제를 묶은 frame에 있는가?
- 기존 문서는 다음 pass의 source인가, 가려 둘 비교 기준인가?
- fresh pass가 반드시 알아야 할 제약과 기존 결론을 어떻게 분리할 것인가?
- 마지막 reconciliation에서 무엇으로 새 결과를 기각할 것인가?

### 반례와 주장 상한

- current·같은 모델·같은 source에 노출되면 완전 blind가 아니다.
- 기존 문서를 숨기면 이미 검증한 제약과 실패를 반복할 수 있다.
- fresh pass가 더 좋은 정답을 만든다고 일반화할 수 없다.
- 이번 active-state 구조 자체의 효용은 아직 이후 작업으로 확인되지 않았다.

### 다음 shaping

- 이번 문서 정리 자체보다 AX의 두 후보판과 실제 선택 차이를 본 사건으로 글을 시작한다.
- 언제 fresh pass가 필요하고 언제 기존 문서를 계속 고치면 되는지 판단 조건을 만든다.
- private raw 없이도 이해되는 작은 reproduction을 준비한다.

### 제목 후보

- `기존 문서를 고치지 않고 원자료에서 다시 뽑은 이유`
- `기존 후보판을 직접 입력에서 빼고 다시 조사시켰다`
- `문서를 수정할수록 기존 프레임이 더 단단해질 때`

### 주요 원천

- [source-first 통합 후보 카드](../process/candidates/03-source-first-reanalysis.md#fresh-2-기존-문서를-고치지-않고-원자료에서-다시-뽑은-이유)
- [AX 독립 second pass process](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/14-integrated-criteria-and-independent-second-pass.md)
- [AX 첫 후보판](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/problem/01-candidates.md)
- [AX 원자료 기반 두 번째 후보판](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/problem/02-candidates-second-pass.md)
- [ai-note source-first orchestration](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-12-source-first-orchestration/raw.md)

## 작업 주제 — Output-informed problem selection

부제 후보: **설명보다 observable output으로 문제–솔루션 조합 비교하기**

### 현재 상태

**유지 후보.** shaping과 추가 원천 확인 가능성을 보존한다.

### 중심 질문

- 근거가 성립하는 문제가 여러 개일 때 문제를 먼저 닫는 것이 언제 더 좋은 제품 가능성을 없애는가?
- AI가 여러 결과를 비교적 싸게 만들 수 있을 때 무엇을 같은 해상도로 실행해 봐야 하는가?

### 대표 사건

- AX에서 세 문제 중 하나를 바로 고르지 않고 각 문제에 세 솔루션을 펼쳤다.
- 세 문제–솔루션 조합의 Markdown 결과를 같은 해상도로 만들었다.
- 대화형 HTML에서 입력, 첫 판정, 사용자 수정, seller 답변 뒤 재판정까지 여덟 번의 상태 전환을 구현했다.
- 기능 목록이 아니라 사용자가 받는 출력과 상태 변화가 어떻게 다른지 본 뒤 최종 조합을 골랐다.

### 새로 생긴 통제력

- 문제의 근거와 솔루션의 매력을 한 점수로 합치지 않는다.
- 문제를 닫기 전에 각 조합이 만드는 observable output과 사용자 상태 변화를 같은 해상도로 실행한다.
- API·component 목록보다 사용자가 읽는 결과와 다음 행동을 비교한다.
- 화려한 output이 근거가 약한 문제를 구제하지 못하게 두 축을 마지막까지 분리한다.

### 보이는 artifact

- `solution/04-output-first-comparison.md`
- 대화형 `solution/05-output-first-interactive-demo.html`
- process 19~21과 최종 선택 commit `e848dd3`
- Markdown 결과와 여덟 상태 전환의 비교

### 다른 개발자가 가져갈 기준

- 후보마다 같은 해상도로 만들 observable은 무엇인가?
- output에 사용자의 상태와 다음 행동이 보이는가?
- static mock이 숨기는 실제 data·운영 비용·구현 난이도는 무엇인가?
- output 비교와 문제 근거 검증을 별도 축으로 유지하는가?

### 반례와 주장 상한

- static mock은 실제 data와 운영 비용을 숨겨 선택을 왜곡할 수 있다.
- Output-first는 문제 근거 검증을 대체하지 않는다.
- 최종 제품 품질이나 사용자 가치가 상승했다는 증거는 없다.
- AI를 썼다는 사실만으로 일반 prototyping과 달라지지 않는다.

### 다음 shaping

- AI가 output 공간을 싸게 펼친다는 점보다 그 결과 문제 정의 단계의 판단 순서가 어떻게 달라졌는지를 중심에 둔다.
- Markdown 3종과 HTML 상태 전환을 공개 가능한 artifact로 정리한다.
- 일반 prototype 비교 글과 다른 중심 질문이 제목 첫 문단에서 보이는지 검토한다.

### 제목 후보

- `문제를 고르기 전에 결과를 먼저 만들어 봤다`
- `AI와 설계안을 비교할 때 설명보다 출력을 먼저 본 이유`
- `문제 정의를 닫기 전에 세 개의 결과를 실행했다`

### 주요 원천

- [source-first 통합 후보 카드](../process/candidates/03-source-first-reanalysis.md#fresh-3-문제를-고르기-전에-결과를-먼저-만들어-봤다)
- [문제를 닫기 전 솔루션 비교 진입](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/16-solution-comparison-entry.md)
- [Output-first 비교](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/19-output-first-comparison.md)
- [대화형 상태 변화 demo](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/20-output-first-interactive-demo.md)
- [비교용 HTML artifact](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/solution/05-output-first-interactive-demo.html)

## 독립 후보로 올리지 않고 병합한 것

- **규칙 품질과 activation channel의 분리**
  - current의 targeted read와 권위 원천 router mechanism으로 넣는다.
- **main의 회수 권한**
  - 독립 판별 계약의 마지막 조건으로 넣는다.
- **보존 범위와 비싼 실행 범위의 분리**
  - artifact/core의 mechanism 또는 판단 순서 글의 운영 반례로 쓴다.
- **제품 입력 도구가 제품을 삼키는 문제**
  - scope control의 AX 보강 장면으로 넣는다.
- **모델·code·judge의 의미 판정 권한**
  - 독립 판별의 반례로 제한하거나 별도 AI engineering 글로 분리한다.
- **문서층위 전반**
  - current가 작동하는 mechanism으로 제한한다.
- **MCP 수동 전사 누락**
  - artifact/core와 사용자 진입 재설계의 후속 실패 지점으로 넣는다.

## 현재 보류한 소재

### 통제 문장이 산출물로 복제되는 문제

장면은 매력적이지만 한 번의 before/after이고 protocol block의 어떤 요소가 효과를 냈는지 분리되지 않았다. 독립 글보다 문서·harness 후보의 반례로 보존한다.

### AI harness가 본 작업을 가린 수치

`본 컨셉 515줄 대 meta 약 13,000줄·85파일·제품 code 0줄`은 강한 hook이지만 원 repo 재계산과 이후 효과 확인 전에는 active 주장으로 쓰지 않는다.

### config no-op와 async 측정축

구현·설정 완료와 효과를 분리하는 좋은 기술 사례다. 다만 현재 AI-native 글군의 독립 중심보다 독립 판별·주장 통제의 보강 사례에 가깝다.

### eval 보존 범위와 실행 범위

diagnostic fixture를 모두 보존하는 일과 비싼 live judge를 매번 실행하는 일을 분리한 좋은 운영 감각이다. 장기 결과가 없고 단독 한 편보다 artifact/core 또는 판단 순서 글의 사례가 맞다.

## 공개 전 공통 경계

- conversation raw와 ai-note raw는 내부 판단 복구용이다.
- 공개 글에는 로컬 경로, session ID, 개인 발화를 그대로 옮기지 않는다.
- 가능한 경우 sanitized fixture, 재현 code, 일반화한 before/after artifact를 새로 만든다.
- test 수, 문서 줄 수, fixture 수는 해당 checkpoint의 artifact 지표이지 품질·생산성·사용자 가치 지표가 아니다.
- 외부 공개 자료는 초안 인용 전에 최신성을 다시 확인한다.
- current, fresh, independent, blind 같은 이름만으로 효과를 주장하지 않는다.

## 다음 행동

- [post-v3 사용자 sync](../process/shaping/2026-07-27-v1-v3-draft-loop/05-post-v3-reassessment-and-user-sync.md)와 이 문서의 후보별 중심을 다음 초안의 복구 기준으로 사용한다.
- backlog·1차 shaping·v1의 재료와 v2·v3의 사실 교정을 함께 종합한다.
- 종합 결과에서 필요한 사실·자료 의미·권위·해석 질문을 사용자와 맞춘다.
- 기존 v1~v3를 덮어쓰지 않는 새 cycle의 완결된 v1을 만든다.
- 독립 review를 유지하고 결과와 main 판단을 별도로 남긴 뒤, 사용자와 다음 수정 범위와 버전 진행을 결정한다.
- 이전 버전과 review 원문은 그대로 보존한다.

독립 판별과 AI self-check는 연결된 두 편으로 두되, 새 cycle의 정확한 초안 단위와 첫 글, article type, 발행 순서, 전체 시리즈 구성은 사용자 판단 전까지 확정하지 않는다.
