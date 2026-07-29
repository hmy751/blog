---
작성일: 2026-07-28
성격: Current, 기존 다섯 후보, AX 실제 작업, Alex 원본의 병렬 대조
---

# Cross-case Comparison

이 문서는 여러 사례를 하나의 workflow로 합치기 전에 공통점과 차이를 함께 보존한다.

## 먼저 구분할 대상

### Current 품질 실패

관찰:

- Current를 만든 이유와 전체 해커톤 맥락, 사용자의 판단 material은 이미 존재했다.
- Q1~Q5와 최근 구현 장면이 작업 가설에서 대표 중심으로 상승했다.
- 생성자, source packet, A/B reviewer, main 회수가 이 사건 universe를 공유했다.
- 완결된 글과 여러 review가 있었지만 원래 motive는 복구되지 않았다.
- review가 통과한 것은 주어진 frame 안의 완성도와 근거 경계였다. frame의 적절성이 통과한 것은 아니었다.

아직 경쟁 중인 설명:

- 사용자 목적과 작업 가설의 권한이 섞였다.
- source의 존재와 source가 실제 중심에 작동하는 것이 섞였다.
- reviewer의 입력 독립성은 일부 있었지만 문제 정의 독립성은 없었다.
- main 회수가 기존 active-state를 기준으로 하면서 새 관찰을 이전 frame에 다시 흡수했다.
- 조기 수렴 기준이 candidate와 material 탐색보다 먼저 작동했다.
- 완결 결과가 probe 역할은 했지만 probe에서 배운 것을 상위 판단에 write-back하는 연결이 없었다.

### AX 프로젝트의 실제 `current`와 loop

Alex 원본과 별개의 사용자 작업 사례다.

`context/current.md`가 한 역할:

- 과제 전체 생애주기와 현재 cursor 하나를 낮은 해상도로 외부화한다.
- 단계별 current contract, 직접 원천, 과거 process를 연결한다.
- 문제, solution, engineering, 제출까지 전체 지도를 보존한다.

`context/core/loop.md`가 한 역할:

- top-level goal과 한 바퀴의 loop goal을 구분한다.
- 실제 입력 검증과 reviewer 판별을 포함한다.
- 결과물 보정과 기준 갱신을 구분한다.
- human gate와 다음 loop 조건을 둔다.
- current, engineering contract, process 기록의 권위를 나눈다.

Loop 01에서 실제로 관찰된 것:

- 첫 구현은 9개 fixture test를 통과했다.
- fresh 판별은 설치된 새 Codex session의 자연어 end-to-end 증거 부재와 계약 결함을 발견해 미통과시켰다.
- 공개 사실과 겹치는 질문, type, claim 범위, 상반 claim 처리를 고쳤다.
- 15개 test, 설치 형태의 자연어 E2E, fresh regression을 통과했다.

이 사례가 지원하는 것:

- 내부 fixture 세계의 통과와 외부 제품 계약의 통과는 다르다.
- 결과물 결함을 고치는 것과 평가 계약을 고치는 것을 함께 수행할 수 있다.
- 무엇이 통과 상태인지 실제 실행 artifact로 구체화할 수 있다.

이 사례의 반례:

- `current`를 읽고도 최근 Loop 01 중심으로 설문 답을 만든 실패가 있었다.
- terminal event가 문서에 반영되지 않은 상태도 있었다.
- current가 존재한다는 사실은 이해, 최신성, 올바른 중심을 보장하지 않는다.

### Alex 원본의 concept 개선

관찰:

- 최종 구현보다 앞선 problem·solution concept 단계다.
- 사람이 problem은 괜찮지만 solution이 약하다고 판단했다.
- 자신의 시간·리소스 constraint가 solution ambition까지 줄였다고 진단했다.
- scope, output 조건, 평가 기준을 바꾸어 재위임했다.
- 더 강하다고 느낀 concept 방향을 사람이 골랐다.

지원하지 않는 것:

- 최종 구현 품질
- autonomous final loop
- fresh reviewer 실행 결과
- Evaluation Foundation 실제 작동

이 사례의 반례:

- 더 큰 concept이 더 흥미롭다는 것은 확인되지만 실제 사용자 가치나 구현 가능성이 더 높다는 증거는 아니다.
- 이름과 즉시 떠오르는 시각적 이미지에 강하게 끌린 선택도 있다.
- 초기 constraint가 작았다는 교정이 반대 방향의 scope 과교정이 아니었는지는 확인되지 않았다.

## 세 사례를 함께 볼 때 생기는 패턴 후보

### 1. 결과는 현재 frame을 관찰하게 한다

Current:

- 완결 글이 motive 유실과 frame 고착을 드러냈다.

AX Loop 01:

- green test가 fixture 안의 성공만 보여줬고 fresh E2E가 외부 계약 결함을 드러냈다.

Alex:

- solution report가 constraint가 만든 낮은 ambition을 사람이 감지하게 했다.

공통 후보:

> 결과는 답이면서 현재 목표·맥락·제약·평가 방식이 어떤 결과를 만들고 있는지 보여 주는 관찰물일 수 있다.

차이:

- Current는 전체 독자 경험을 보려 완결된 글이 필요했다.
- AX는 설치된 자연어 E2E가 필요했다.
- Alex는 concept report만으로 충분했다.

따라서 `항상 완결본`보다 `의심하는 품질 관계가 보일 만큼 통합된 결과`가 더 넓은 후보 표현이다.

### 2. 결과 보정과 생성 조건 보정은 다르다

Current:

- 문장과 구조를 반복 수정해도 사용자 목적 유실이 해결되지 않았다.

AX:

- 결과물 보정과 기준 갱신을 loop 안에서 구분한다.

Alex:

- 기존 concept을 직접 polish하기보다 constraint와 평가 압력을 바꿔 다시 생성했다.

여기서 아직 합치지 말아야 할 행동:

- 원래 목적 복구
- 작업 가설 수정
- scope와 resource constraint 변경
- source와 context 역할 변경
- 평가 기준 변경
- reviewer 계약 변경
- top-level goal 변경

모두 `goal update`라고 부르면 필요한 권한과 위험이 사라진다.

### 3. 같은 frame의 반복 판정은 오류를 더 자연스럽게 만들 수 있다

Current A/B:

- reviewer는 달랐지만 source packet과 대표 사건을 공유했다.

Self-check 후보:

- AI가 자기 framing을 원인에 포함해야 하지만 같은 frame을 더 정교하게 설명할 위험도 있다.

AX:

- fresh evaluator가 fixture test가 못 본 설치형 계약을 봤다.

Alex:

- fresh reviewer는 계획으로만 남았다.

공통 후보:

> 독립성은 agent 수보다 어떤 오류 상관을 끊는 입력, 질문, 원자료 접근, 권한, 회수 방식에서 생긴다.

### 4. 현재 상태 외부화와 현재 상태의 정당성은 다르다

Current와 AX current의 효용:

- 긴 작업에서 전체 계보와 현재 위치를 재추론하는 비용을 줄인다.
- source, contract, process 접근점을 제공한다.
- 여러 session과 사람·AI가 같은 현재를 보게 한다.

위험:

- 잘못된 작업 가설도 더 안정적으로 복제한다.
- tentative assumption이 합의된 current로 보일 수 있다.
- stale current가 최신 원천보다 높은 권위를 얻을 수 있다.

후보:

> Current는 정답 저장소가 아니라 현재 작업 가설과 원천 경로, 합의 상태를 보존하는 control surface다.

아직 열린 부분:

- 사용자 합의, 작업 가설, reviewer 제안, 미채택 후보를 어느 해상도로 표시할 것인가
- 너무 많은 provenance가 current를 다시 무겁게 만들지 않는가

### 5. 좋은 기준도 적용 시점과 권한이 틀리면 가능성을 자른다

Judgment order:

- 후보와 가치를 펼치는 판단
- 개별 claim과 위험을 판정하는 판단
- 후보를 선택하고 닫는 판단
  이 서로 다른 시점과 권한을 가진다.

Current:

- `한 질문`, Q1~Q5, claim ceiling 같은 유효한 기준이 전체 의미를 너무 일찍 닫았다.

Alex:

- resource guardrail은 agent의 scope drift를 막았지만 solution ambition도 줄였다.

AX:

- problem 근거를 유지하면서 solution 가능성과 실제 output을 보기 전 최종 문제를 닫지 않았다.

후보:

> 기준의 품질만큼 그 기준이 언제 어떤 판단을 닫을 권한을 얻는지가 중요하다.

### 6. Scope는 단순한 크기가 아니라 보존할 인과 경로와 관련된다

Product-flow scope control:

- 사용자 입력, 핵심 변환, 사용자가 읽는 출력, 다음 행동이 이어지는 causal path를 보존하려 한다.

Alex:

- 사업 전체를 만드는 drift를 막기 위해 scope를 줄였다.
- 너무 작은 solution이 나오자 ambition을 높였다.

Current:

- Q1~Q5로 좁히며 글의 존재 이유와 전체 맥락이 잘렸다.

공통 후보:

> Scope를 줄이거나 키울 때 이 작업이 실제로 바꾸려는 상태와 인과 경로가 쉬운 대체 결과로 바뀌지 않았는지 본다.

반례:

- 모든 기술 spike와 component test에 full user flow를 요구할 필요는 없다.
- artifact가 product slice인지 feasibility probe인지 먼저 구분해야 한다.

### 7. Self-check와 independent review는 다른 실패를 다룬다

Self-check:

- main의 framing, scope, tool, context 선택, 다음 행동을 실패 원인에 포함한다.
- 설명이 정확해도 행동 변화가 없을 수 있다.

Independent review:

- main과 다른 판단 위치를 만들기 위한 입력과 권한 계약이다.
- 같은 frame의 자기 합리화를 보완할 수 있다.
- 독립 reviewer 역시 자동 정답이 아니다.

Alex 비교:

- 자신의 constraint를 원인에 넣은 장면은 self-check 감각의 예다.
- fresh reviewer 실행은 확인되지 않았다.

### 8. Scaffolding과 quality loop는 다른 책임이다

Scaffolding:

- 산출물 전에 목적, context, 역할, 공통 절차, 권위 위치를 만든다.
- 병렬 작업의 재사용성과 범위 일관성을 높인다.

Quality loop:

- 나온 결과를 보고 scaffolding, constraint, working goal, evaluation이 만든 문제를 다시 연다.
- 필요한 판단을 바꾸고 새 결과로 시험한다.

서로 없을 때:

- scaffolding 없는 loop는 각 반복의 상태와 기준을 잃을 수 있다.
- loop 없는 scaffolding은 최초 가정을 빠르고 일관되게 복제할 수 있다.

Current 계보:

- Alex의 전체 scaffolding을 본 사용자가 전체 지도와 current sync 장치의 필요를 확장해 생각했다.

이번 core 논의:

- Alex의 concept loop는 결과 뒤 constraint와 criteria를 다시 보는 비교 사례다.

두 계보를 합쳐 `Alex가 Current quality loop를 만들었다`고 쓰면 안 된다.

### 9. Human gate와 taste는 방향 신호지만 정답 증거는 아니다

Current:

- 사용자는 완결된 글을 보고 motive와 공감의 부재를 판정했다.

Alex:

- 구현 비용이 커지기 전에 solution이 약한 지점에서 멈췄다.

AX:

- goal, cursor, prioritization, 다음 loop 선택을 사용자 권한으로 둔다.

후보:

> Human gate는 AI가 계속 실행할 수 있지만 가치 방향이나 비싼 다음 전환을 사람이 다시 봐야 하는 곳에 둘 수 있다.

한계:

- 사람의 taste는 사실, feasibility, user evidence를 대신하지 않는다.
- 모든 작은 단계의 승인으로 바꾸면 사용자가 원하지 않는 병목이 된다.

## 기존 다섯 후보는 한 workflow의 단계가 아니다

### Current

주로 다루는 실패:

- 긴 생애주기에서 전체 그림과 현재 위치가 사라짐
- recent context가 전체 목적을 대신함
- 다음 session이 오래된 결정을 다시 추론함

### Independent review

주로 다루는 실패:

- 같은 가정과 질문에서 오류가 상관됨
- main이 자기 frame을 스스로 평가함
- reviewer 제안과 최종 결정이 섞임

### Product-flow scope control

주로 다루는 실패:

- 쉽고 보이는 대체 결과가 핵심 causal path를 대신함
- 범위를 줄이며 사용자 상태 변화가 사라짐

### Judgment order

주로 다루는 실패:

- 좋은 기준이 너무 일찍 후보 공간을 닫음
- candidate value, evidence readiness, claim ceiling, shaping state가 서로 대신함

### Self-check

주로 다루는 실패:

- AI 자신의 framing, scope, context와 tool 선택이 원인 모델에서 빠짐
- 설명은 바뀌었지만 행동이 반복됨

이들을 순서화해 `Current → self-check → independent review → scope control → judgment order`로 매번 돌리면 각각의 발동 조건과 판단 대상이 사라진다.

## 아직 더 필요한 다른 사례

- 명확한 spec과 test가 있고 단순 구현 bug만 있었던 사례
- goal은 맞지만 source 자체가 부족했던 조사 사례
- constraint가 ambition을 줄인 것이 아니라 실제 위험을 막은 사례
- 여러 independent evaluator의 동의가 실제로 강한 증거가 된 사례
- complete artifact보다 작은 probe가 잘못된 방향을 조기에 막은 사례
- current 없이도 충분했던 짧은 one-shot 작업
- human taste가 틀렸고 외부 사용자 evidence가 방향을 바꾼 사례
- criteria update가 과적합을 만든 사례
- autonomous loop가 human gate 없이도 안전하게 닫힌 저위험 작업

이 대조가 있어야 Current와 AX에서 나온 감각을 모든 AI-native 작업의 법칙으로 확대하지 않을 수 있다.
