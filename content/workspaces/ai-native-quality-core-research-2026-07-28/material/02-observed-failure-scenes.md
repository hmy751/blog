---
작성일: 2026-07-28
성격: 품질 실패·정정·대조 장면 확장 material
상태: 확장 중 / 원인 확정 전
공개상태: 내부 작업 문서
---

# 관찰된 실패 장면

## 이 문서의 판정 단위

이 문서는 실패 원인을 확정하지 않는다. 먼저 실제로 어떤 입력, 행동, 결과, 사용자 정정이 있었는지 장면 단위로 분리한다.

각 장면에는 다음을 둔다.

- 확인된 전개
- 사용자가 준 품질 신호
- 이 장면만으로 말할 수 없는 것
- 다시 접근할 근거

동일한 장면이 여러 원인 가설을 지지할 수 있다. 예를 들어 Current 재작성 실패는 `Material 전달 실패`, `goal 부족`, `Q1~Q5 frame 고착`, `review 질문 제한`, `main 회수 범위 부족`을 모두 지지할 수 있다. 여기서는 하나를 선택하지 않는다.

## 장면 1 — 보조 기준이 글감 탐색의 상위 목적을 대신했다

### 확인된 전개

초기 글감 탐색의 목적은 AI 기술 자체보다 개발자가 AI와 일하며 얻은 판단 감각, 개발자에게 매력적인 주제, 사용자의 생각과 실제 적용이 함께 들어갈 수 있는 글감을 찾는 일이었다.

탐색 중 다음 보조 기준이 차례로 주제 선택자의 자리를 차지했다.

- 제3판별자라는 예시
- 강한 숫자와 반전
- test·diff·commit이 풍부한 초안 준비도
- 참고 개발 블로그의 서사 패턴
- 사실을 확인할 수 있는 근거량

사용자 정정 뒤 이 기준들은 폐기되지 않고 각자 원래 역할로 돌아갔다. 근거는 주장 상한, 준비도는 지금 쓸 수 있는지, 참고 패턴은 비교 lens가 됐다.

### 사용자가 준 품질 신호

- 근거가 가장 많은 주제가 가장 좋은 주제는 아니다.
- 예시 하나가 탐색의 답이 되면 안 된다.
- 사용자 생각과 실제 적용, 판단 변화가 함께 들어가야 한다.

### 이 장면만으로 말할 수 없는 것

- 기준을 적게 두는 것이 항상 낫다는 뜻은 아니다.
- evidence와 reference lens가 무용하다는 뜻은 아니다.
- 좋은 글은 사용자의 경험만 있으면 성립한다는 뜻은 아니다.

### 근거

- [criteria와 decision history](../../ai-native-topic-research-2026-07-20/process/candidates/01-criteria-and-decision-history.md) `:18-47`, `:49-91`
- 같은 문서 `:155-187`

## 장면 2 — 다음 작업 cursor가 후보 가치 서열로 변했다

### 확인된 전개

source-first 재조사 뒤 `current`, 독립 판별, scope control을 먼저 shaping한다는 cursor가 있었다. 이는 다음 작업 범위였지 전체 후보의 순위가 아니었다.

active-state를 설명하는 과정에서 다음 변환이 생겼다.

- 먼저 shaping할 세 후보가 더 가치 있고 선명한 후보처럼 읽혔다.
- self-check의 주장 상한이 매력도 감점으로 쓰였다.
- “한 편은 한 중심 질문을 가져야 한다”는 편집 기준이 material 탐색 전에 적용됐다.
- 사례가 많다는 점이 풍부한 재료보다 덜 준비된 상태로 해석됐다.

사용자는 이를 정정했고, 후보 가치·shaping 상태·근거 준비도·주장 상한을 분리했다.

### 사용자가 준 품질 신호

- 사례와 시행착오가 많다는 것은 후보의 약점이 아닐 수 있다.
- 좋은 기준도 잘못된 시점과 권한에서 쓰이면 가능성을 닫는다.
- shaping이나 초기 초안을 보기 전에 최종 위상을 고정하지 않는다.

### 이 장면만으로 말할 수 없는 것

- 모든 후보를 끝없이 유지해야 한다는 뜻은 아니다.
- article 중심을 좁히는 기준이 틀렸다는 뜻은 아니다.
- 펼치는 동안 사실과 주장 상한을 보지 말라는 뜻은 아니다.

### 근거

- [03 이후 후보 상태 교정](../../ai-native-topic-research-2026-07-20/process/candidates/04-post-03-candidate-state-correction.md) `:17-31`, `:46-92`
- 같은 문서 `:123-139`, `:163-182`

## 장면 3 — 첫 v1~v3 loop는 많은 것을 개선했지만 사용자 중심도 함께 이동시켰다

### 확인된 전개

다섯 후보를 모두 완결된 v1로 만들고, 서로 다른 독립 reviewer 두 명과 main adjudication을 거쳐 v3까지 발전시켰다.

이 과정은 다음을 실제로 개선했다.

- 사실 정확도
- actor와 구현 여부 구분
- 인과와 주장 상한
- review 원문과 main 판정의 분리
- 버전별 비교 가능성

그러나 v3 뒤 다시 대조하니:

- fresh pass가 기존 backlog와 합의를 입력에서 밀어냈다.
- reviewer 제안과 main의 임시 편집 선택이 사용자 합의처럼 굳었다.
- Current는 긍정적 active control보다 Q1~Q5 실패가 앞섰다.
- self-check는 더 넓은 판단 위치보다 forward bias에 좁혀졌다.
- 압축 과정에서 살아 있는 material과 사용자 문제의식이 줄었다.
- `한 사건`, `한 artifact`, 특정 article type이 모든 다음 초안의 고정 규칙처럼 작동했다.

### 사용자가 준 품질 신호

- 작은 조각을 계속 승인하기보다 충분히 온전한 결과를 보고 판단하고 싶다.
- 기존 backlog와 합의가 새 pass에서 새면 안 된다.
- reviewer나 main의 선택을 사용자 합의로 승격하지 않는다.

### 이 장면만으로 말할 수 없는 것

- 독립 review가 품질을 낮췄다는 단일 인과는 성립하지 않는다.
- 완결본을 먼저 만드는 방식이 실패 원인이라고 말할 수 없다.
- v1~v3의 개선을 모두 폐기해야 한다는 뜻은 아니다.

### 근거

- [v1~v3 cycle README](../../ai-native-topic-research-2026-07-20/process/shaping/2026-07-27-v1-v3-draft-loop/README.md) `:9-13`, `:56-66`
- [post-v3 사용자 sync](../../ai-native-topic-research-2026-07-20/process/shaping/2026-07-27-v1-v3-draft-loop/05-post-v3-reassessment-and-user-sync.md) `:13-30`, `:32-55`

## 장면 4 — “완결된 v1 안에서 책임을 분리한다”는 계약이 생겼다

### 확인된 전개

v3 뒤 사용자와 맞춘 새 계약은 다음 두 극단을 피하려 했다.

- Material, Shaping, Texture마다 작은 draft를 만들고 사용자가 계속 승인하는 방식
- 큰 결과를 한 번 만든 뒤 적당히 이해하고 그대로 통과하는 방식

새 기본값:

1. 관련 자료를 종합한다.
2. 중심을 실제로 바꿀 질문을 사용자와 푼다.
3. Material·Shaping·Texture 책임을 한 완결된 v1 안에서 수행한다.
4. 완결본을 사용자와 판단한다.
5. review 뒤 자동으로 다음 version에 들어가지 않는다.

### 사용자가 준 품질 신호

- 산출물을 조각내는 것과 판단 책임을 분리하는 것은 다른 문제다.
- 사용자가 직관적으로 전체 품질을 볼 수 있는 결과가 필요하다.
- 사용자 승인 횟수를 늘리는 것이 판단 분리의 목적은 아니다.

### 이 장면만으로 말할 수 없는 것

- 이 계약이 이후 품질 문제를 해결했다는 뜻은 아니다.
- 모든 종류의 작업에서 완결본이 첫 probe여야 한다는 뜻은 아니다.
- 완결본 뒤 어느 책임으로 돌아갈지까지 이 계약이 충분히 정의했다는 뜻은 아니다.

### 근거

- [post-v3 사용자 sync](../../ai-native-topic-research-2026-07-20/process/shaping/2026-07-27-v1-v3-draft-loop/05-post-v3-reassessment-and-user-sync.md) `:74-83`, `:145-154`

## 장면 5 — post-sync에서 material을 다시 종합하고 완결 v1을 만들었지만 여전히 매력과 풍부함이 부족했다

### 확인된 전개

post-sync cycle은 기존 backlog, 1차 shaping, v1~v3, review, 사실 교정, 사용자 sync를 함께 읽었다. 다섯 후보의 material을 한 문서에 종합하고 사용자 질문을 회수한 뒤 다섯 완결 v1, 독립 review, main adjudication을 만들었다.

그 결과를 읽은 사용자는 다섯 글이 매력이 없고 풍부하지 않다고 판단했다. 다음 cycle은 문장 수정이 아니라 전면 재작성으로 열렸다.

### 사용자가 준 품질 신호

- material 종합 문서와 완결본, review가 존재한다는 사실만으로 살아 있는 글이 되지는 않는다.
- 유효한 재료가 실제 narrative, 장면, 저자 판단으로 작동했는지를 별도로 봐야 한다.

### 이 장면만으로 말할 수 없는 것

- post-sync material 종합이 잘못됐다는 단일 판정은 아니다.
- 사용자 sync가 불필요했다는 뜻은 아니다.
- 당시 다섯 글의 모든 문제가 같은 원인이라는 뜻은 아니다.

### 근거

- [post-sync cycle README](../../ai-native-topic-research-2026-07-20/process/shaping/2026-07-27-post-sync-v1/README.md) `:9-25`, `:40-61`
- [near-final cycle README](../../ai-native-topic-research-2026-07-20/process/shaping/2026-07-27-near-final-v2-v3/README.md) `:9-13`

## 장면 6 — near-final v2~v3는 여러 review와 prepublish를 통과했지만 공개 블로그 품질 판정은 뒤집혔다

### 확인된 전개

사용자의 “매력과 풍부함 부족” 판정 뒤:

- 직접 원천을 다시 확인했다.
- 기존 process에서 살아 있는 장면을 회수했다.
- 글마다 다른 narrative engine과 public-safe artifact를 골랐다.
- 다섯 전면 재작성 v2를 만들었다.
- shaping·texture·evidence review를 했다.
- main adjudication과 v3 regression review를 했다.
- 링크·공개 경계·prepublish·renderer 검증을 통과했다.

이 cycle은 `near-final`로 기록됐지만, 사용자가 실제 블로그 글로 읽은 뒤 익명화된 내부 보고서 같고 공개 독자의 진입성·구체성·저자성·매력·portfolio signal이 부족하다고 판단했다. `near-final` 완료 판정은 철회되고 public reshape가 시작됐다.

### 사용자가 준 품질 신호

- 여러 전문 review와 발행 전 검증은 각 범위에서 유효해도 공개 글 전체의 매력과 저자성을 대신하지 않는다.
- `near-final` 같은 완료 라벨은 사용자의 실제 읽기 전에는 잠정 상태일 수 있다.
- 기술적·편집적 완성도와 “읽고 싶은 글”은 같은 축이 아니다.

### 이 장면만으로 말할 수 없는 것

- reviewer가 잘못했다는 뜻은 아니다.
- public blog 품질을 객관적으로 한 rubric으로 완전하게 사전 명시할 수 있다는 뜻도 아니다.
- 글마다 다른 실패 원인이 없었다는 뜻은 아니다.

### 근거

- [near-final cycle README](../../ai-native-topic-research-2026-07-20/process/shaping/2026-07-27-near-final-v2-v3/README.md) `:15-26`, `:56-62`
- [public reshape README](../../ai-native-topic-research-2026-07-20/process/shaping/2026-07-27-public-reshape/README.md) `:9-13`
- [legacy candidate state](../../ai-native-topic-research-2026-07-20/process/context-structure/legacy-active-state/topic-candidates.md) `:42-50`

## 장면 7 — public reshape도 완결본과 여러 lens를 만들었지만 Current는 다시 부분 재작성 대상으로 남았다

### 확인된 전개

public reshape는 near-final v3를 polish하지 않고 완결된 새 cycle v1 다섯 편을 만들었다.

사용한 검토:

- cold reader
- shaping
- texture
- portfolio signal
- evidence
- main adjudication
- 현재 원고만 본 draft-only blind review

blind review는 다섯 편 모두 `partial rewrite`로 보았다. Current에는 Q1~Q5의 전후가 독자가 확인할 만큼 보이지 않는다는 진단이 들어왔다.

### 사용자가 준 품질 신호

이 시점의 직접 사용자 판정은 아직 다음 Current 작업에서 나왔다. 중요한 관찰은 이미 여러 lens와 완결 cycle이 있었는데도 quality verdict가 닫히지 않았다는 점이다.

### 이 장면만으로 말할 수 없는 것

- blind reviewer의 `partial rewrite`가 사용자 명령은 아니다.
- Q1~Q5 전후를 늘리는 것이 Current의 최종 정답이라는 뜻은 아니다.
- review가 많을수록 품질이 떨어진다는 뜻은 아니다.

### 근거

- [public reshape README](../../ai-native-topic-research-2026-07-20/process/shaping/2026-07-27-public-reshape/README.md) `:15-41`
- [blind draft-only criteria](../../ai-native-topic-research-2026-07-20/process/shaping/2026-07-27-public-reshape/05-blind-draft-only-quality-criteria.md) `:41-69`

## 장면 8 — context 구조를 만들며 assistant가 과도한 구조화와 평평한 복사 사이를 오갔다

### 확인된 전개

사용자는 process를 작업 과정이 러프하게 쌓이는 층위로 원했다. assistant는 한때 snapshot 규칙과 보존 구조를 더 정교하게 만들었다. 사용자는 “그냥 러프하게 해주면 안 돼?”라고 정정했다.

active-state에 AX current의 운용 규칙을 가져올 때도:

1. assistant가 운영 규칙을 active-state의 트리 가지로 평평하게 옮겼다.
2. 사용자가 active-state 톤에 맞지 않는다고 지적했다.
3. assistant가 해당 가지를 전부 빼려 했다.
4. 사용자는 그래도 필요한 current 기능은 가져와야 한다고 다시 정정했다.

### 사용자가 준 품질 신호

- 참고 사례를 구조째 복사하거나 반대로 전부 삭제하지 않는다.
- 대상의 기능과 현재 workspace의 역할을 함께 보고 번역한다.
- 구조를 구체화하는 것과 운영 부담을 늘리는 것은 다르다.
- 기준을 만들다가 기준 관리가 작업보다 앞서면 안 된다.

### 이 장면만으로 말할 수 없는 것

- structure와 state label이 필요 없다는 뜻은 아니다.
- 모든 process가 무정형이어야 한다는 뜻은 아니다.
- 사용자에게 계속 질문하는 것이 항상 해결이라는 뜻은 아니다.

### 근거

- context layering transcript `:771-826`
- 같은 원문 `:883-978`
- [layering decision](../../ai-native-topic-research-2026-07-20/process/context-structure/2026-07-28-layering-decision.md) `:133-153`

## 장면 9 — 첫 active-state가 “최신”을 직전 단계로 축소해 완료된 가지의 현재 의미를 잃었다

### 확인된 전개

첫 context 구조는 active-state를 최신 상태의 뼈대로 압축했다. 실제 Current 재작성에 사용하자:

- 조사
- 후보 형성
- 첫 shaping
- 사용자와 다시 맞춘 중심

처럼 완료됐지만 현재 결과를 이해하는 데 필요한 가지가 지도에서 사라졌다.

새 session은 첫 shaping에 동기와 사용자 판단이 이미 있다는 사실을 모르고 Material 단계가 생략됐다고 진단했다.

### 사용자가 준 품질 신호

- active-state는 직전 단계 요약이 아니라 작업 전체 생각 구조의 최신 지도여야 한다.
- process 링크만 남기면 다음 작업자가 그 링크를 다시 열어 현재 의미를 추론해야 한다.
- 완료된 가지도 현재 판단에 필요하면 낮은 해상도로 남아야 한다.

### 이 장면만으로 말할 수 없는 것

- 모든 완료 과정을 active-state에 상세히 넣어야 한다는 뜻은 아니다.
- active-state가 크면 자동으로 이 문제가 해결된다는 뜻은 아니다.
- 첫 Material 누락 진단이 active-state 하나 때문에만 생겼다고 단정할 수 없다.

### 근거

- [active map와 improvement review 보정](../../ai-native-topic-research-2026-07-20/process/context-structure/2026-07-28-active-map-and-improvement-review-refinement.md) `:9-28`

## 장면 10 — Current 재작성은 합의된 brief를 충실히 수행하고 여러 검토를 통과했지만 사용자는 핵심 동기가 없다고 판정했다

### 확인된 전개

Current worker brief는 다음을 고정했다.

- 중심: 전체 지도와 단일 cursor로 sync를 돕는 scaffolding
- 주 장면: Q1~Q5의 시간축 복구
- 보조 장면: 판매자 질문 교정
- 한계: terminal gap
- 입력: active-state, core criteria, direct sources, 여러 editorial review

worker는 완결 원고를 만들고 shaping·evidence·texture 검토를 했다. main은 중심 위계와 source 경계를 통과시켰다. 원고만 본 새 판별자는 `light edit`을 냈다.

사용자는 결과를 보고:

- 왜 current를 만들었는지가 없다.
- 갑자기 여행 상품 plugin 이야기로 시작한다.
- Q1~Q5를 중심에 둘 거면 해커톤 전체를 말해야 한다.
- 자신의 근거, 논리, 생각이 빠졌다.

고 판단했다.

### 사용자가 준 품질 신호

- brief 충실도와 글의 존재 이유는 다르다.
- source-supported scene을 풍부하게 만들어도 최초 동기와 저자 판단이 없으면 구조는 납득되지 않을 수 있다.
- 여러 review의 공통 blind spot은 사용자 읽기에서 늦게 드러날 수 있다.

### 이 장면만으로 말할 수 없는 것

- worker의 실행 품질이 낮았다는 뜻은 아니다.
- Q1~Q5의 사실·장면 가치가 없다는 뜻은 아니다.
- 사용자의 모든 품질 기준을 처음부터 완전하게 명시할 수 있었다는 뜻은 아니다.

### 근거

- `/Users/hammyeong-yeon/Desktop/2026-07-28-ai-native-topic-research-current-conversation.md:153-267`
- 같은 원문 `:271-310`
- [Current build record](../../ai-native-topic-research-2026-07-20/process/shaping/2026-07-28-current-scaffolding-rewrite/01-current-rewrite-build-record.md) `:9-21`, `:45-74`, `:84-110`

## 장면 11 — assistant는 사용자 거부 뒤 Material 생략을 원인으로 너무 빨리 골랐다

### 확인된 전개

사용자가 Current의 동기·논리·생각 누락을 지적하자 assistant는 Material → Shaping → Texture 중 Material을 사실상 건너뛰었다고 진단했다.

사용자는 이미 material을 충분히 했다고 정정했다. 다시 확인하니 후보 카드와 첫 shaping에:

- 기록은 많지만 무엇이 유효한지 다시 추론해야 했던 경험
- 전체 현황과 현재 판단점을 함께 보고 싶은 이유
- 긴 생애주기를 보존하려는 목적
- current의 긍정적 효용

이 있었다.

assistant는 `Material 부족`에서 `기존 material이 rewrite와 review에 이어지지 않음`으로 판정을 바꿨다.

### 사용자가 준 품질 신호

- workflow 단계 이름을 실패 원인처럼 붙이기 전에 실제 process를 본다.
- “그 단계로 돌아가자”보다 그 단계의 무엇이 어느 결정에서 사라졌는지를 본다.
- 사용자의 “근본적으로”는 더 상위 workflow 이름을 말하라는 뜻이 아니다.

### 이 장면만으로 말할 수 없는 것

- material이 완전하고 충분했다는 뜻은 아니다.
- Alex 발상 계보까지 당시 material에 명시돼 있었다는 뜻은 아니다.
- 이후 source selection이나 goal 문제보다 transfer 문제 하나가 유일한 원인이라는 뜻은 아니다.

### 근거

- current conversation `:312-340`
- [Current build record](../../ai-native-topic-research-2026-07-20/process/shaping/2026-07-28-current-scaffolding-rewrite/01-current-rewrite-build-record.md) `:96-110`
- [Current 후보 카드](../../ai-native-topic-research-2026-07-20/process/candidates/02-topic-candidates.md) `:51-75`

## 장면 12 — 결과물만 본 독립 판별의 제한이 뒤늦게 완료 신호로 확대된 것이 확인됐다

### 확인된 전개

Current 마지막 blind 판별자는 원고 한 편과 main이 만든 고정 질문만 받았다. active-state, process, source, 사용자 합의는 보지 않았다.

이 reviewer는 주어진 범위에서:

- 중심과 절 구조
- Q4 전후와 Q1~Q5 표
- 판매자 질문 교정
- 내부 용어
- terminal gap 문장

을 보고 `light edit`을 냈다.

그러나 이 입력으로는 source와 결과를 대조해 왜 current를 만들었는지, 어떤 material이 빠졌는지, 평가 질문 자체가 좁은지를 볼 수 없었다. 제한된 판정이 전체 품질 완료에 가까운 신호로 사용됐다.

### 사용자가 준 품질 신호

- 독립성은 context를 모두 가리는 것과 같지 않다.
- reviewer의 입력·질문·권한이 무엇을 볼 수 없게 했는지 결과와 함께 보아야 한다.
- 판정 범위를 넘어 `작업 완료`로 확대하지 않는다.

### 이 장면만으로 말할 수 없는 것

- draft-only blind review가 불필요하다는 뜻은 아니다.
- source를 주면 자동으로 더 독립적인 판정이 된다는 뜻은 아니다.
- reviewer가 주어진 범위에서 오판했다는 뜻은 아니다.

### 근거

- current conversation `:271-300`
- [active map와 improvement review 보정](../../ai-native-topic-research-2026-07-20/process/context-structure/2026-07-28-active-map-and-improvement-review-refinement.md) `:30-40`

## 장면 13 — source+result improvement review를 새로 정의했지만 공통 source packet은 기존 frame 안에서 골라졌다

### 확인된 전개

앞선 실패 뒤 review 계약을 보정했다.

- 원고
- 최소 목적과 독자
- 선별한 직접 source

를 제공하고, reviewer가 source와 결과를 대조해 빠진 material, 개선 기준, 통과 조건을 제안하도록 했다.

A와 B에게 같은 Current 원고와 direct-source packet을 줬다. packet에는:

- AX current
- Loop 01 계약 분리
- Q1~Q5 재작성
- 제출 마지막 사건
- current Git audit

가 있었다.

반면:

- current가 처음 필요해진 문제
- Alex의 scaffolding에서 받은 발상

은 없었다.

### 사용자가 준 품질 신호

- source를 주는 것만으로 충분하지 않다.
- 누가 어떤 source를 왜 최소 묶음으로 골랐는지가 reviewer의 가능 공간을 만든다.
- 기존 원고의 대표 장면을 중심으로 source packet을 고르면 reviewer도 그 장면 안에서 새 대안을 만들 수 있다.

### 이 장면만으로 말할 수 없는 것

- 모든 source를 reviewer에게 줘야 한다는 뜻은 아니다.
- packet에 없던 Alex 발상이 당시 이미 명확한 goal이었다고 단정할 수 없다.
- source packet 하나가 A/B 결과를 전부 결정했다는 단일 인과는 아직 확인되지 않았다.

### 근거

- [A review](../../ai-native-topic-research-2026-07-20/process/shaping/2026-07-28-current-dual-review/01-review-a-independent.md) `:9-21`
- [B review](../../ai-native-topic-research-2026-07-20/process/shaping/2026-07-28-current-dual-review/02-review-b-editorial.md) `:9-24`
- [A/B 후속 사용자 재판정](../../ai-native-topic-research-2026-07-20/process/shaping/2026-07-28-current-dual-review/05-post-candidate-reassessment.md) `:23-30`

## 장면 14 — A와 B는 다른 기준으로 다른 답을 냈지만 같은 최근 장면을 대표 문제로 공유했다

### 확인된 전개

A:

- editorial 기준을 주입하지 않았다.
- `structural rewrite`를 판정했다.
- 중심을 `질문 범위 복구 운영법`으로 옮기고 current를 보조 장치로 낮췄다.

B:

- global editorial core와 관련 lenses를 적용했다.
- `local / partial edit`를 판정했다.
- current scaffolding 중심과 Q1~Q5 주 장면을 보호했다.

main은 현재 active-state를 근거로 B는 사용자 판단 없이 진행 가능하고 A는 사용자 경험 해석을 바꾸므로 보류한다고 판정했다. 사용자가 A도 만들어 보라고 한 뒤 A candidate를 별도 제작했고, A 구조 충실도와 사실·공개 경계는 `PASS`했다.

사용자는 두 후보를 본 뒤:

- A 제목과 생생함은 B보다 낫다.
- 두 후보 모두 이전 틀을 벗어나지 못했다.
- current를 만든 이유와 Alex 발상 계보가 먼저 필요하다.
- Q1~Q5 집착에 공감하지 못한다.

고 판정했다. A와 B 모두 미채택됐다.

### 사용자가 준 품질 신호

- 답이 다르다는 사실만으로 판단 frame이 독립적인 것은 아니다.
- editorial lens를 더 적용해도 goal과 source frame을 다시 열 권한이 없으면 국소 개선에 머물 수 있다.
- brief 충실도 `PASS`는 brief의 적절성을 통과시킨 것이 아니다.
- 사용자의 품질 판정은 A/B 중 하나를 고르는 일이 아니라 두 후보가 공유한 문제 정의를 다시 여는 일이었다.

### 이 장면만으로 말할 수 없는 것

- A의 모든 구조 move가 무가치하다는 뜻은 아니다.
- B가 적용한 editorial lens가 무용하다는 뜻은 아니다.
- Alex를 중심에 두면 자동으로 좋은 글이 된다는 뜻은 아니다.

### 근거

- [A review](../../ai-native-topic-research-2026-07-20/process/shaping/2026-07-28-current-dual-review/01-review-a-independent.md) `:13-47`
- [B review](../../ai-native-topic-research-2026-07-20/process/shaping/2026-07-28-current-dual-review/02-review-b-editorial.md) `:20-49`
- [main adjudication](../../ai-native-topic-research-2026-07-20/process/shaping/2026-07-28-current-dual-review/03-main-adjudication.md) `:19-43`
- [A candidate build](../../ai-native-topic-research-2026-07-20/process/shaping/2026-07-28-current-dual-review/04-a-candidate-build.md) `:9-43`
- [후속 사용자 재판정](../../ai-native-topic-research-2026-07-20/process/shaping/2026-07-28-current-dual-review/05-post-candidate-reassessment.md) `:11-50`

## 장면 15 — 사용자는 “Material로 돌아간다”보다 더 일반적인 판단을 요구했다

### 확인된 전개

A/B 실패 뒤 assistant는 material 복원과 goal 재설정을 중요한 방향으로 보았다. 사용자는 일부 동의하면서도 `Material로 돌아간다`만으로는 찜찜하다고 했다.

사용자가 추가로 연 질문:

- 완결 결과가 있어도 한 번에 하면 품질이 개선되지 않을 수 있는가?
- 탐색·구성·평가를 다른 판단 위치에서 다시 봐야 하는가?
- 전체 결과를 본 뒤 단계별 분석을 해야 하는가, 종합적으로 원인을 찾아야 하는가?
- goal을 먼저 줬어야 했는가?
- criteria를 강화했어야 했는가?
- evaluator가 처음부터 다시 수행했어야 했는가?
- 강한 goal로 loop를 돌리고 최종 판별을 받았어야 했는가?

### 사용자가 준 품질 신호

- 구체 사례에서 출발하되 특정 workflow 단계 이름으로 일반화를 닫지 않는다.
- 결과 바로 앞의 누락만이 아니라 그 결과를 만든 goal, context, constraints, evaluation, 역할을 본다.
- 완결 산출물과 판단 분리는 양립할 수 있어야 한다.
- 한 원인으로 빨리 수렴하기 전에 경쟁 설명을 펼친다.

### 이 장면만으로 말할 수 없는 것

- 위 질문 가운데 어느 하나가 정답이라는 뜻은 아니다.
- 모든 작업에서 evaluator가 처음부터 다시 해야 한다는 뜻은 아니다.
- 고정된 loop workflow를 core에 넣기로 합의한 것은 아니다.

### 근거

- 현재 대화 직접 근거

## 장면 16 — Alex는 약한 solution을 보고 자신의 제약과 평가 기준을 다시 올렸지만 최종 loop 완료는 확인되지 않았다

### 확인된 전개

Alex의 방송 원본에서 확인되는 장면:

1. problem selection은 좋다고 보았다.
2. solution 후보를 보고 “좀 약하다”고 판단했다.
3. 자신이 준 짧은 시간·자원 제약이 3~6시간짜리 작은 solution을 유도했다고 설명했다.
4. 1~2주 scope, business impact, visual output, demo, creativity, uniqueness를 새 조건으로 줬다.
5. output을 먼저 정의하고 재위임했다.
6. 중간에 멈춰 사람이 방향을 조정하는 human-on-the-loop를 강조했다.
7. 뒤에 goal setting, 검증, eval refinement, tuning, 다시 goal setting을 반복한다고 설명했다.
8. 평가할 때마다 agent의 평가 기준을 갱신하는 것이 핵심이라고 말했다.

### 현재 논의에 주는 대조

- 약한 결과는 결과만 고칠 대상이 아니라 자신이 준 constraint와 evaluation을 다시 볼 근거가 될 수 있다.
- 중간 artifact report도 upstream judgment를 다시 보는 probe가 될 수 있다.
- scaffolding을 잘 만들었어도 결과의 impact를 사람이 다시 판단해야 한다.

### 이 장면만으로 말할 수 없는 것

- final autonomous implementation/evaluation loop가 완료됐다는 근거는 없다.
- 모든 quality loop가 Alex의 해커톤 기준을 따라야 한다는 뜻은 아니다.
- Alex가 top-level problem을 바꿨다고 말할 수 없다. 확인된 것은 solution scope와 evaluation 보강이다.
- Current의 실패 원인이 Alex 방식 부재 하나라는 뜻은 아니다.

### 근거

- `/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/00-alex-analysis/00-원본자료/영상전사/2026-07-04_AX인재전쟁_transcript.md:2359-2439`
- 같은 원본 `:2487-2494`
- 같은 원본 `:2518-2571`
- 같은 원본 `:2682-2718`
- 같은 원본 `:2763-2775`

## 장면 17 — core 후보 분석에서도 assistant는 확장 요청 뒤 다시 최소 반영 범위로 수렴했다

### 확인된 전개

사용자는 이번 문제를 글 한 편의 복구가 아니라 AI-native 문제 해결과 학습의 core로 충분히 펼치고 싶다고 여러 번 말했다.

첫 분석은 여러 후보 원리를 제안했지만 마지막에 `실제 core 변경의 최소 범위`를 제시했다. 사용자는 다음처럼 정정했다.

> 왜 자꾸 최소 범위야. 아까부터 펼친다고 했는데 최대한 실컷 만들고 걸러야지.

그리고 원본 workspace에서 다른 작업이 진행 중이므로 겹치지 않는 새 workspace나 독립 폴더에서 작업하라고 했다.

### 사용자가 준 품질 신호

- `최소화`, `핵심 몇 개`, `필요한 파일만` 같은 실행 습관이 탐색 단계에 너무 일찍 들어오고 있다.
- 확장과 수거를 실제 산출물과 작업 공간에서도 분리해야 한다.
- 충분히 펼치지 않은 상태에서 원본 core 반영 구조를 논하면 다시 가능성을 닫을 수 있다.

### 이 장면만으로 말할 수 없는 것

- 최종 core도 최대한 많은 규칙을 가져야 한다는 뜻은 아니다.
- 확장 단계의 모든 후보를 원본에 반영해야 한다는 뜻은 아니다.
- 구조화와 수거를 영원히 미뤄야 한다는 뜻은 아니다.

### 근거

- 현재 대화 직접 근거

## 장면 사이에서 반복되는 관찰

아래는 원인 판정이 아니라 여러 장면에 반복해서 나타난 형태다.

### 한 cycle 안에서는 개선됐지만 사용자 품질 판정은 다음 높이에서 다시 뒤집혔다

- v1→v3: 사실·주장 개선, 중심 drift 발견
- post-sync v1: material 종합과 완결본, 매력 부족
- near-final v3: narrative·review·prepublish 통과, 공개 글 실패
- Current rewrite: 장면·구조·검증 통과, 동기·저자 판단 실패
- A/B: 다른 구조·lens 적용, 공통 frame 실패

### 제한된 검증 결과가 더 넓은 완료 신호로 읽혔다

- shaping pass가 목적 적합성 pass처럼 읽힘
- evidence pass가 글감 가치까지 보호하는 듯 읽힘
- draft-only `light edit`가 전체 품질 완료에 가까운 신호가 됨
- A structural fidelity `PASS`가 후보 전체 수용과 혼동될 위험

### 현재 구조와 기준은 문제를 고치기 위해 생겼지만, 같은 종류의 문제가 다시 다른 층위에서 나타났다

- active-state는 context mix를 줄이려 했지만 완료 가지를 너무 줄여 material 누락 진단을 만들었다.
- independent review는 main frame을 피하려 했지만 source packet과 질문 frame을 공유했다.
- criteria는 판단축을 분리하려 했지만 적용 시점에 따라 가능성을 닫았다.
- complete draft는 사용자 전체 판단을 돕지만 complete judgment를 보장하지 않았다.

### 사용자의 정정은 “반대 방향으로 바꿔라”보다 “역할을 다시 분리하라”는 경우가 많았다

- 근거를 버리지 말고 주장 상한으로 돌린다.
- reference를 버리지 말고 lens로 돌린다.
- 실패를 지우지 말고 계기·조건·한계로 배치한다.
- current 규칙을 복사하거나 삭제하지 말고 현재 역할로 번역한다.
- 완결본과 단계 분리를 둘 중 하나로 고르지 않는다.
- reviewer 독립성과 source 접근을 둘 중 하나로 고르지 않는다.

## 아직 장면 근거가 약한 곳

- Alex의 scaffolding 영감이 Current 글감의 최초 형성 당시 어디에 기록돼 있었는지
- 사용자가 Q1~Q5 중심을 승인했을 때의 승인 범위가 한 rewrite인지 이후 모든 Current 글인지
- 각 cycle에서 사용자가 “매력이 없다”고 판단한 구체 문장·구조·독자 경험의 차이
- B가 global lens를 적용했는데도 전진하지 못한 데서 각 lens의 실제 영향
- source packet을 더 넓게 줬다면 A/B가 frame 밖으로 나왔을지
- goal을 명시했다면 어떤 내용이 실제로 달라졌을지
- evaluator가 첫 단계부터 재수행하면 품질이 좋아지는지, 같은 frame을 더 길게 반복하는지
- 완결본 뒤 어느 시점에 상위 판단을 다시 열어야 비용 대비 유효한지
