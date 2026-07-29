---
작성일: 2026-07-28
성격: 필터링 전 전체 확장 지도
현재상태: 후보를 합치거나 탈락시키지 않음
---

# Expanded Landscape

이 문서는 최종 core 원칙을 고르는 문서가 아니다. 지금까지 펼친 재료가 어디에 있고, 서로 어떤 판단 경계를 공유하거나 다르게 보는지를 한눈에 찾게 한다.

숫자는 중요도나 점수가 아니다. 현재 문서에서 구분해 둔 항목 수다.

## 현재 펼쳐진 재료

### 사용자 의도와 실제 품질 신호

[사용자 의도와 품질 신호](../material/01-user-intent-and-quality-signals.md)

- 시간순 의도와 정정 16개
- 반복해서 나타난 품질 신호
- 함께 유지해야 하는 긴장
- 아직 사용자 의도로 확정하면 안 되는 해석

이 문서는 `사용자가 무엇을 원했다`를 한 문장으로 압축하지 않는다. 충분한 결과와 판단 분리, 자율 실행과 사용자 sync, 사실 엄격함과 가능성 확장, 규칙과 학습처럼 동시에 유지해야 하는 요구를 보존한다.

### 관찰된 실패 장면

[관찰된 실패 장면](../material/02-observed-failure-scenes.md)

- 기준 형성과 후보 탐색
- v1~v3와 post-sync
- near-final과 public reshape
- Current scaffolding rewrite
- A/B dual review
- Alex 재조사
- 이번 core 논의와 main의 재압축
  을 17개 장면으로 나눈다.

각 장면은 `관찰된 것`과 `그 장면이 아직 증명하지 않는 것`을 함께 둔다. 실패 장면을 곧바로 하나의 원인으로 쓰지 않게 한다.

### 경쟁 원인 가설

[경쟁 원인 가설](../material/03-competing-causal-hypotheses.md)

52개 가설을 다음 영역에 나눠 보존한다.

- Material과 source
- goal과 frame
- criteria와 evaluation
- reviewer, main, worker 역할
- 완결 결과와 workflow
- 압축, 설명, 학습
- Current와 Alex에 특화된 설명

각 가설에는 지지 근거, 반대 근거 또는 대안 설명, 확인 질문, 다른 AI-native 작업으로의 전이 가능성이 있다.

이 문서가 중요한 이유는 `근본 원인`을 하나 고르기 전에 다음처럼 비슷하지만 다른 설명을 동시에 살리기 때문이다.

- Material이 없었다.
- Material은 있었지만 계보가 불완전했다.
- Material은 있었지만 실제 입력에 없었다.
- 입력됐지만 중심을 바꿀 권위가 없었다.
- source packet 선택 자체가 기존 frame을 반영했다.
- source는 충분했지만 criteria와 main 회수가 다른 부분을 최적화했다.

### 사례 교차 비교

[Current·AX·Alex 교차 비교](../material/04-cross-case-comparison.md)

- Current 품질 실패
- AX 프로젝트의 실제 current와 implementation loop
- Alex 원본의 human-led concept 개선
  을 같은 사례로 합치지 않고 병렬 대조한다.

공통으로 보이는 메커니즘과 사례별 차이, 아직 필요한 반례를 함께 남긴다.

### 열린 질문

[열린 질문과 미정의 개념](../material/05-open-questions-and-undefined-concepts.md)

다음 14개 묶음에 걸쳐 답을 닫지 않은 질문을 보존한다.

- 품질
- goal
- context와 source
- constraints
- criteria
- 결과와 probe
- 판단 분리
- frame
- 합의 상태와 권한
- loop
- scaffolding
- 문제 해결과 학습
- 글쓰기 밖 전이
- 이 workspace 자체의 수거 방법

### 분석 차원

[분석 차원](../material/06-analysis-dimensions.md)

같은 실패를 `goal 문제`, `review 문제`, `Material 문제` 중 하나로만 설명하지 않도록 여러 관찰 좌표를 둔다.

- 무엇이 어긋났는가
- 어떤 형태로 보였는가
- 언제 생겼는가
- 누가 어떤 권한으로 판단했는가
- 어떤 신호가 들어왔는가
- 무엇을 다시 열 수 있는가
- 결과가 어떤 역할을 했는가
- 어떤 종류의 분리가 필요한가
- 개선이 무엇을 바꿨는가
- 어디까지 일반화할 수 있는가
- 적용으로 어떤 새 실패가 생길 수 있는가

## 현재 패턴 후보 공간

[AI-native 패턴 bank](../candidates/01-ai-native-pattern-bank.md)는 50개 후보를 보존한다.

### A. 결과와 품질

현재 따로 남긴 후보:

- 결과와 그 결과를 만든 판단 체계를 별도 대상으로 본다.
- 완결된 결과를 현재 판단 체계의 관찰물로 사용한다.
- 판단하려는 관계가 보일 만큼만 통합한다.
- completion과 acceptance를 분리한다.
- 검증 통과의 범위를 결과 전체로 확대하지 않는다.
- 품질의 서로 다른 축을 한 등급으로 합산하지 않는다.
- 같은 품질 불만의 반복을 상위 판단 재검사 신호로 본다.
- 품질 개선은 결과뿐 아니라 평가 체계의 학습을 포함할 수 있다.

아직 합치지 않는 이유:

- `결과와 판단 체계 분리`는 판별 대상의 문제다.
- `통합 수준`은 어떤 artifact를 만들지의 문제다.
- `completion과 acceptance`는 상태 권한의 문제다.
- `PASS 범위`는 evaluator claim의 문제다.
- `평가 체계 학습`은 다음 cycle write-back의 문제다.

서로 관련돼도 같은 행동을 요구하지 않는다.

### B. 사용자 목적, 작업 goal, 가설, 성공 조건

현재 따로 남긴 후보:

- 사용자 목적, 현재 작업 goal, 작업 가설, 성공 조건을 구분한다.
- 작업 가설은 행동을 이끌 수 있지만 사용자 목적을 대신하지 않는다.
- 제안, 적용, 사용자 합의, 현재 권위를 구분한다.
- 결과를 통해 goal을 개선하되 실패를 정당화하는 방향으로 이동하지 않는다.
- 약한 결과를 만든 constraint도 원인 후보에 포함한다.
- 사용자의 불편함과 직관을 품질 신호로 보되 원인 판정으로 곧바로 올리지 않는다.
- 문제가 생긴 책임 위치만 다시 연다.
- 무거운 loop는 상시 절차가 아니라 발동 조건이 있는 대응이다.

열린 긴장:

- `goal이 없었다`와 `goal은 있었지만 전달 중 사라졌다`를 어떻게 구분할 것인가
- 사용자 목적은 안정된 값인가, 결과를 보며 진화하는가
- goal을 바꾸는 권한과 작업 가설을 바꾸는 권한은 어떻게 다른가
- top-level purpose를 복구하는 것과 goalpost를 이동하는 것을 어떻게 판정하는가

### C. Material, source, context

현재 따로 남긴 후보:

- source가 존재하는 것과 판단에 작동하는 것을 구분한다.
- 중요한 Material의 발생 이유와 계보를 보존한다.
- source packet을 고르는 행위 자체를 판단으로 본다.
- 기존 결과를 가린 source-first second pass를 별도 도구로 쓸 수 있다.
- 최소 context보다 목적에 맞는 충분한 context를 본다.
- 전체 지도와 현재 cursor를 함께 유지한다.
- 좋은 rule이 필요한 결정 순간에 도달하는지 본다.
- 판단이 가리키는 시간축을 명시한다.
- history, active contract, source, current result의 권위를 분리한다.

서로 반대처럼 보이는 실패:

- context가 너무 많아 anchoring됨
- context가 너무 적어 motive와 합의가 사라짐
- current가 너무 낮은 해상도라 전체 의미를 복구하지 못함
- current가 너무 상세해 tentative frame을 강한 권위로 만듦

따라서 `context를 더 준다` 또는 `context를 줄인다`만으로 일반화하지 않는다.

### D. 판단 순서와 criteria

현재 따로 남긴 후보:

- 생성·관찰, 개별 주장 판정, 후보 수렴을 다른 판단으로 둔다.
- criteria의 seed, filter, guard 역할을 구분한다.
- 좋은 기준도 현재 무엇을 닫을 권한이 있는지 묻는다.
- evaluation이 실제로 무엇을 평가하는지 먼저 선언한다.
- 완결 결과와 분리된 판단 위치는 양립한다.
- 같은 결과를 다른 frame으로 재생성해 비교할 수 있다.

열린 긴장:

- criteria를 생성 전에 주면 ambition을 높이는가, 후보를 비슷하게 만드는가
- 개별 claim의 hard guard와 후보 전체의 가치 수렴은 동시에 어떻게 작동하는가
- 기준 내용이 부족한 문제와 기준 시점이 틀린 문제를 어떻게 구분하는가
- criteria update가 반복 학습인지 한 결과에 대한 overfit인지 어떻게 판정하는가

### E. Reviewer와 main 회수

현재 따로 남긴 후보:

- reviewer의 독립성을 여러 조건으로 본다.
- 여러 reviewer의 유사 결론을 독립 합의로 자동 해석하지 않는다.
- reviewer가 질문과 source frame을 다시 열 수 있어야 하는 경우가 있다.
- main의 회수도 별도 판별 대상이다.

독립성에 관여할 수 있는 축:

- 원자료 접근
- 기존 결과와 current의 가시성
- 주어진 질문을 기각하거나 바꿀 권한
- source packet 밖을 탐색할 권한
- write 권한
- 완료 선언 권한
- main과 결과가 합쳐지기 전 독립 상태 보존

아직 고정 계약으로 만들지 않는 이유:

- 모든 review에서 모든 축을 분리하면 비교 가능성과 domain context를 잃을 수 있다.
- 어떤 오류 상관을 끊으려는지에 따라 필요한 독립성이 다르다.

### F. Scope와 핵심 작용

현재 따로 남긴 후보:

- 작은 scope에서도 가치가 생기는 책임 경로를 보존한다.
- 눈에 보이는 쉬운 완료가 핵심 작용을 대체하는지 본다.
- 약한 결과를 만든 constraint도 원인에 포함한다.
- 결과 뒤 constraint를 완화하거나 반대 압력을 줄 수 있다.

서로 다른 scope 문제:

- agent가 전체 사업이나 앱으로 drift함
- 시간 제약이 solution ambition까지 줄임
- 공개 글을 한 장면으로 좁히며 존재 이유가 사라짐
- 기술 spike에 불필요하게 전체 product flow를 요구함

`scope를 키운다`와 `scope를 줄인다`가 아니라, 현재 artifact가 보존해야 할 causal path가 무엇인지가 열린 중심 후보다.

### G. Self-check

현재 따로 남긴 후보:

- AI 자신의 판단과 행동을 원인 모델에 넣는다.
- 정확한 자기진단, 실제 다음 행동 변화, 재발 방지를 다른 결과로 본다.
- 품질 신호의 provenance도 보존한다.
- 하나의 근본 원인 대신 경쟁 설명을 유지한다.

Self-check가 필요한 경우 후보:

- 한 번 고친 뒤 같은 판단 행동이 반복됨
- 설명은 바뀌었지만 파일 위치, 입력, 도구, 다음 행동이 같음
- main의 분류가 사용자 신호를 익숙한 workflow 언어로 반복 번역함

Self-check가 과한 경우:

- 첫 정정
- 명백한 사실 오류
- syntax error나 typo
- 외부 actor가 명확한 failure

### H. Scaffolding, current, quality loop

현재 따로 남긴 후보:

- scaffolding과 quality loop를 구분한다.
- output이 scaffolding의 결함을 드러내면 scaffolding도 수정 후보가 된다.
- loop를 계속 돌릴지 멈추고 frame을 바꿀지 구분한다.
- current의 보존, 현재 권위, 실행, 교체 범위를 분리한다.

관계 후보:

- scaffolding은 산출물 전에 목적, context, 역할, 공통 절차를 만든다.
- quality loop는 결과를 보고 그 초기 조건이 만든 문제를 다시 연다.
- scaffolding 없는 loop는 각 반복의 상태를 잃을 수 있다.
- loop 없는 scaffolding은 최초 가정을 빠르게 복제할 수 있다.

아직 열린 질문:

- quality loop가 scaffolding 전체를 갱신할 수 있는 조건은 무엇인가
- current를 sync scaffolding, core를 operation scaffolding으로 나눌 수 있는가
- scaffolding 자체의 stale 상태를 누가 판별하는가

### I. 학습과 core

현재 따로 남긴 후보:

- 사례를 표면 workflow가 아니라 판단 변화와 적용 경계로 전이한다.
- 학습 기록은 규칙뿐 아니라 판단을 다시 만드는 재료를 남긴다.
- 보존, 현재 권위, 실행, 교체 범위를 분리한다.
- 압축이 정확성을 높이면서 의미 Material을 줄일 수 있다.
- 명료한 artifact가 모호하지만 중요한 사용자 기억을 이길 수 있다.

이 workspace에서 구분할 성과:

- 다음 작업 결과가 실제로 좋아지는 것
- 사용자가 자신의 사고를 더 구체적으로 이해하는 것
- 다음 AI가 판단 권위와 적용 한계를 복원하는 것

이 셋은 연결될 수 있지만 같은 성과라고 증명되지는 않았다.

### J. 외부 사례 전이

현재 따로 남긴 후보:

- Alex의 scaffolding을 surface workflow로 복사하지 않는다.
- human-led concept 개선과 미확인 autonomous loop를 구분한다.
- output-first의 효용과 visual appeal 과대평가 위험을 함께 본다.
- human taste를 방향 신호로 보되 fact와 user value의 증거로 쓰지 않는다.

[Alex 근거 경계](../sources/alex-evidence-boundary.md)와 [전이 위험·반례](../candidates/04-transfer-risks-and-counterexamples.md)가 이 영역을 보존한다.

## 개념 대비 공간

[개념 대비와 경계](../candidates/02-concept-contrasts-and-boundaries.md)는 65개의 대비를 둔다.

### 결과와 작업 단위

- 산출물을 조각내기 / 판단을 분리하기
- 완결 / 수용
- 완결 / final polish
- 결과 / probe
- output-first / solution 조기 고정
- version 증가 / 품질 학습

### 목적과 기준

- 사용자 목적 / 현재 작업 goal
- 현재 작업 goal / 작업 가설
- 작업 가설 / 성공 조건
- goal 개선 / goalpost 이동
- result correction / criteria update
- constraint / success condition
- 기준 내용 / 기준 시점과 권한
- criteria seed / filter / guard
- 탐색 / 느슨함
- 수렴 / 압축
- 종합 / 압축

### Source와 context

- source 보유 / source 작동
- source coverage / 결과에 모두 포함
- source / source에 대한 해석
- source packet / source universe
- 최소 context / 적합한 context
- blind / independent
- fresh / source-free
- 현재 그림 / 과정 기록
- current / 요약문
- 최신 / 현재 권위
- 최근 사실 / 전체 시간축에 맞는 답
- rule 품질 / activation channel
- 보존 / 현재 권위 / 매회 실행 / 함께 교체

### Review와 판정

- reviewer 수 / 독립된 판단 위치
- 다른 editorial 기준 / 다른 problem frame
- reviewer 동의 / 상관된 결과
- reviewer / verifier / contextual editor / advisor
- review / adjudication
- 판정 완료 / 작업 완료
- local PASS / 전체 품질 PASS
- 사실 교정 / 장면·중심 변경
- 문제를 다시 열 권한 / 사용자 목적을 바꿀 권한

### 합의와 권한

- 관찰 / 제안
- 제안 / 적용
- 적용 / 사용자 합의
- 사용자 합의 / core rule
- main의 위임된 국소 판단 / 사용자 결정
- human gate / manual micromanagement

### Scope와 진행

- scope 축소 / 가치 경로 절단
- 빠른 결과 / 쉬운 대체 결과
- artifact 증가 / 작업 진전
- rollback / 전체 restart
- 관련 책임 재개방 / 모든 단계 재실행
- 한 번의 오류 / 반복 판단 pattern
- iteration / automatic loop

### Self-check와 학습

- 자기 설명 / 자기 판단 검사
- 진단 정확성 / 행동 변화
- 행동 변화 / 재발 방지
- 학습 기록 / prescriptive checklist
- 사례 전이 / workflow 복사
- 일반화 / 구체성 제거
- core / process

### Scaffolding과 loop

- scaffolding / plan
- scaffolding / quality loop
- scaffolding 변경 / 새 layer 추가
- current 갱신 / history 보존

이 대비들은 용어 사전을 만들기 위한 것이 아니다. 비슷한 외형 때문에 서로 다른 판단 권한을 합치지 않게 하는 calibration material이다.

## 상황별 발동 공간

[발동 상황과 대응 선택지](../candidates/03-trigger-situations-and-response-options.md)는 30개 상황을 둔다.

### 결과와 사용자 신호

- 결과는 세련됐는데 사용자가 하려던 일이 아니라고 함
- 여러 수정 뒤 같은 불만이 반복됨
- review와 검증을 통과했는데 품질이 전진하지 않음
- 사용자는 이상함을 느끼지만 아직 원인을 설명하지 못함
- 결과에 명백한 사실 오류 하나가 있음

### Reviewer와 evaluation

- 여러 reviewer가 비슷한 결론을 냄
- reviewer 둘이 다른 방향을 권함
- 기존 criteria가 너무 낮거나 좁았음
- criteria를 먼저 줬더니 후보가 비슷해짐
- 자동 loop가 같은 frame 안에서만 polish함

### Material, source, context

- 중요한 Material이 source에 있지만 결과에서 사라짐
- source packet을 줄였더니 원인이 사라짐
- context가 많아 anchoring됨
- context를 줄였더니 전체 의미가 사라짐
- source-first pass가 기존 합의까지 지움
- current를 읽었는데도 recent work에 과적합함
- context가 커서 현재 권위를 알 수 없음

### Goal, scope, 권한

- reviewer나 main 제안이 사용자 합의처럼 굳음
- goal을 다시 세워야 할 것 같지만 무엇을 바꿀지 모름
- 여러 agent가 모두 작고 무난한 solution을 냄
- scope를 줄였더니 핵심 가치가 사라짐
- 문제를 고치다 반대 방향으로 과교정함
- 무엇을 사용자에게 물어야 할지 판단하기 어려움

### 작업 체계와 학습

- 좋은 rule이 있는데 같은 오판이 반복됨
- AI가 오류를 정확히 설명하고 같은 행동을 반복함
- 문서, test, review, harness는 늘지만 본 작업이 보이지 않음
- 완결 결과를 만들었지만 무엇을 다시 할지 모름
- 외부 사례에서 좋은 감각을 가져오고 싶음
- 한 사례에서 core 후보를 만들려 함

각 상황은 하나의 정답 대신 다음을 둔다.

- 관찰할 것
- 가능한 대응 선택지
- 피할 과교정
- 필요한 경우 Current 또는 Alex 적용
- 대응 강도를 낮추거나 높일 조건

따라서 이 문서는 30단계 workflow가 아니다.

## 전이 위험과 반례

[전이 위험과 반례](../candidates/04-transfer-risks-and-counterexamples.md)는 현재 15개 후보의 양면을 펼친다.

- goal 명료화
- criteria 갱신
- complete artifact
- reviewer 증가
- current
- 충분한 확장
- causal path 보존
- self-check
- output-first
- human taste
- 반복 loop
- core learning capture
- scaffolding
- decision provenance
- 사용자 거부 신호

각 항목은 다음을 함께 본다.

- 가능한 효용
- 반대 실패
- 글쓰기 밖 반례
- 확인 질문

## 현재 보이는 교차선

아래는 후보를 합친 상위 원칙이 아니라 여러 문서에서 반복해서 교차하는 질문이다.

### 어떤 결과가 나왔는가보다 무엇을 최적화한 결과인가

연결되는 후보:

- 판단 체계 분리
- 작업 goal과 성공 조건
- criteria seed/filter/guard
- reviewer packet
- local PASS 범위
- 쉬운 대체 결과

### 중요한 내용이 있었는가보다 어떤 권위로 작동했는가

연결되는 후보:

- source 존재/작동
- Material 계보
- 사용자 합의/작업 가설
- active-state/current
- main 회수
- decision provenance

### 다른 agent인가보다 다른 오류를 볼 수 있는가

연결되는 후보:

- reviewer 독립성
- 상관된 review
- source universe
- 질문 재개방
- self-check
- advisor와 verifier의 역할

### 결과를 더 고칠 것인가 결과 생성 조건을 바꿀 것인가

연결되는 후보:

- result correction/criteria update
- working goal
- constraint
- scaffolding
- quality loop
- frame 전환

### 충분히 완결할 것인가 더 싼 probe로 먼저 볼 것인가

연결되는 후보:

- 완결/수용
- 결과/probe
- output-first
- vertical slice
- rollback rehearsal
- 독자 전체 경험

### 판단을 분리할 것인가 작업을 잘게 쪼갤 것인가

연결되는 후보:

- 완결 결과 선호
- Material/Shaping/Texture 책임
- builder/reviewer 위치
- human gate
- manual micromanagement

### 규칙을 남길 것인가 판단을 복원할 재료를 남길 것인가

연결되는 후보:

- core/process
- 학습 기록/checklist
- definition/contrast/example/question
- current/history
- 다음 AI의 activation channel

## 지금 합치지 않을 묶음

- Material 부재 / 전달 실패 / 권위 실패
- goal 부재 / working goal 오류 / 사용자 목적 진화
- context 과다 / context 부족 / context 권위 혼란
- criteria 부족 / 적용 시점 오류 / 생성 anchoring
- 다른 reviewer / 다른 판단 위치 / 다른 frame
- 완결 artifact / evaluation 완료 / 사용자 acceptance
- 판단 분리 / artifact fragmentation
- result correction / criteria update / goal 변경
- scaffolding / current / quality loop
- source-first / source-free / blind / independent
- human taste / factual verification / user evidence
- 규칙 보존 / 학습 설명 / 실제 품질 개선 효과

## 다음 수거 때 해야 할 일

다음 단계가 시작되면 후보 수를 바로 줄이는 대신 다음을 먼저 본다.

- 같은 이름 아래 실제로 다른 메커니즘이 있는가
- 다른 이름이지만 같은 판단 변화와 발동 신호를 가진 후보가 있는가
- Current에서만 지지되는가
- AX 구현 사례에서도 지지되는가
- Alex 원본은 확인 사실인가 비교를 위한 해석인가
- 반례가 후보를 기각하는가, 적용 조건을 좁히는가
- 사용자의 거의 합의된 방향인가, main과 reviewer의 일반화인가
- 실행 rule로 남길 것인가, 판단 감각을 위한 대비 사례로 남길 것인가

이 판단은 아직 하지 않았다.
