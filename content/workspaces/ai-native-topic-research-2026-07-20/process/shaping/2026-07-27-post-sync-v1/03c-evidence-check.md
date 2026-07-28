---
작성일: 2026-07-27
성격: post-sync 새 v1 evidence check 원문 / 내부 process
공개상태: 내부 작업 문서
현재상태: 완료
---

# 새 v1 evidence check

아래는 독립 evidence checker가 새 v1 다섯 편의 수치, 용어, 시간순서, actor, 제안·구현 구분, 기술 주장, 공개 경계를 직접 원천과 대조한 report다. main의 판정과 다음 수정안은 이 원문을 바꾸지 않고 `04-main-adjudication.md`에 따로 둔다.

## Supported

다섯 초안은 전반적으로 actor, chronology, 제안과 구현의 구분, 숫자의 의미, 주장 상한을 잘 지켰다. 특히 아래 고위험 주장은 직접 원천과 일치했다.

### Current

- Q4는 프로젝트 전체 역할, Q5는 최신 구현의 입력·결과·한계를 맡도록 재작성했다.
  - verdict: supported
  - evidence: `.../context/process/29-questionnaire-rebuild-from-current.md:20-35`
- 마지막 `current`가 설문·패키지·업로드 실패 같은 terminal event를 반영하지 않았다.
  - verdict: supported
  - evidence: `.../20-작업과정-하네스-분석/02-독립조사/git/08-current-and-gate-audit.md:60-63`, `.../context/process/31-submission-form-correction-and-upload-failure.md:9-14`
  - ownership 하나를 누락의 직접 원인으로 단정하지 않은 점도 안전하다.
- Q1~Q5 복구는 사용자 정정, 전체 지도, 직접 원천, 병렬 작업의 최신 결과가 함께 만들었다.
  - verdict: supported
  - evidence: `.../context/process/29-questionnaire-rebuild-from-current.md:5-26`, `.../context/process/30-questionnaire-final-verification.md:27`

### 독립 판별

- 첫 checkpoint의 Python `unittest` test method는 9개였고, validator와 CLI는 별도 검증이었다.
  - verdict: supported
  - evidence: `.../context/process/26-loop-01-first-implementation-and-operations-retro.md:13-24`, `.../08-current-and-gate-audit.md:95-105`
- 판별자가 설치형 자연어 E2E 부재, 공개 source와 fixture의 모순, 문자열 `"false"`, participant scope 누수, 상반 claim의 순서 의존을 찾았다.
  - verdict: supported
  - evidence: `.../context/process/26-loop-01-first-implementation-and-operations-retro.md:35-60`
- 교정 뒤 같은 runner의 test method는 15개였고 validator·CLI·설치형 자연어 E2E는 별도였다.
  - verdict: supported
  - evidence: `.../context/process/27-loop-01-correction-cycle.md:49-88`
  - `9→15`를 품질 향상 수치로 사용하지 않은 점도 정확하다.
- 회귀 판별은 ZIP-only clean-room 재현이 아니라 설치 상태와 E2E artifact를 입력으로 받았다.
  - verdict: supported
  - evidence: `.../context/process/27-loop-01-correction-cycle.md:78-86`
- 별도 entailment 판별도 앞 단계에서 후보·맥락이 빠지거나 잘못 선택되면 닫힌 입력 밖을 자동 복구하지 못했다.
  - verdict: supported
  - evidence: `/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/specs/2026-07-01-answer-pipeline-substrate-redesign/03-conditional-value-entailment-judgment.md:76-103`
  - 서로 다른 실패 mechanism을 하나로 뭉치지 않았다.

### Scope control

- raw `facts[]` 화면 노출은 구현 전 제안이었고 배포된 실패 UI가 아니었다.
  - verdict: supported
  - evidence: `/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/implementation-notes/2026-06-09-spec-driven-product-flow-drift/index.md:10-20`
- 후속 실제 구현은 question → retrieval → grounding/status/evidence → answer → chat 흐름을 연결했다.
  - verdict: supported
  - evidence: Tripproof `docs/specs/2026-06-06-accommodation-checkin-agoda-fukuoka/03-evidence-backed-facts.md:20-45,59-88`
- `15:00→16:00` 자료 변화 test, source substring grounding test, 실제 질문 route의 composer 호출 test가 있었다.
  - verdict: supported
  - evidence: `/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/decisions/2026-06-10-spec-driven-judgment-and-test-enforcement/index.md:25-34`, `apps/server/tests/test_library_chat_answer.py:953-977`, `apps/server/tests/test_materials_api.py:1229-1269`
- 호출자가 없던 fact 추출 경로를 제거했다.
  - verdict: supported
  - evidence: 같은 decision `:32-34`
- test double을 사용했으므로 다양한 문서 표현의 semantic quality와 실제 사용자 가치까지 증명하지 않았다.
  - verdict: supported

### 판단 순서

- 문제 후보 3개에서 각 3개씩, 총 9개 solution을 펼쳤다.
  - verdict: supported
  - evidence: `.../context/process/17-performance-led-solution-passes.md:7-10`
- 같은 9개를 근거·행동 변화·입력·데이터 범위·불확실성으로 다시 보았고 세 결합 방향을 남겼다.
  - verdict: supported
  - evidence: 같은 파일 `:7-10`, `context/solution/02-grounded-concretization.md:3-9`
- 세 Markdown output과 대화형 정적 목업을 만들었으며 실제 제품이나 품질 우월성 실험은 아니었다.
  - verdict: supported
  - evidence: `.../context/process/19-output-first-comparison.md:5-20,31-38`, `.../context/process/20-output-first-interactive-demo.md:5-12,44-49`
- 첫 후보판에도 A1·A2가 있었고 second pass가 새로 발견한 문제가 아니라 비교 단위를 바꾼 것이었다.
  - verdict: supported
  - evidence: `.../context/process/14-integrated-criteria-and-independent-second-pass.md:40-52`
- 현재의 세 단계 순서는 여러 사례 뒤 정리한 운영 모델이며 품질 향상의 통제 비교는 없다.
  - verdict: supported
  - evidence: `01-material-synthesis-and-user-sync.md:176-205`, `02-v1-build-record.md:102-108`

### AI self-check

- AX에서 첫 판별 뒤 main이 회사/사용자 축의 반대편으로 과교정했고, 사용자 정정·넓어진 입력·두 번째 판별·main 재적용이 함께 복구했다.
  - verdict: supported
  - evidence: `.../context/process/09-discussion-and-ai-self-check.md` 8~10절, `01-material-synthesis-and-user-sync.md:226-237`
- assignment 원자료 누락은 formal self-check의 단독 효과가 아니라 사용자 정정과 전체 rescan으로 바뀌었다.
  - verdict: supported
  - evidence: `/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-21-ai-self-check-principle-calibration/raw.md:20-35`, `01-material-synthesis-and-user-sync.md:232-240`
- forward-bias 작업에서 사용자가 같은 전진 행동을 세 차례 멈췄다.
  - verdict: supported
  - evidence: `/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-07-09-harness-forward-bias-impact-axis/raw.md:71-80`
  - 총 AI 답변 수나 전체 반복 횟수로 확대하지 않았다.
- self-check가 장기 행동 안정이나 재발 감소를 만들었다는 근거는 없다.
  - verdict: supported
  - evidence: `01-material-synthesis-and-user-sync.md:232-240`, `active-state/topic-candidates.md:443-448`

## Needs correction

### AI self-check의 빈도 표현

- claim: `AI에게 잘못을 지적하면 대개 그럴듯한 원인 설명이 나옵니다.`
- verdict: needs qualification
- 근거: 선택된 원천은 AX, assignment, forward-bias의 소수 사례이며 `대개`라는 빈도 주장을 뒷받침하는 집계가 없다.
- smallest correction: `이 작업들에서는 AI에게 잘못을 지적했을 때 그럴듯한 원인 설명이 나왔습니다.`

### AI self-check의 보편 표현

- claim: `자기 frame 안에서는 자신의 판단도 객관적으로 보기 어렵다.`
- verdict: needs qualification
- 근거: 원천은 같은 frame의 자기해명이 기존 방향을 정교화할 수 있다고 제한적으로 말하며, 모든 AI의 보편적 인지 특성까지 증명하지 않는다.
- smallest correction: `self-check는 자기 frame 안의 판단을 곧바로 객관적이라고 가정하지 않는 방법입니다.`

### 판단 순서의 상태 전환 수

- claim: `세 출력에서 모두 여덟 번의 상태 전환을 펼쳤습니다.`
- verdict: needs qualification
- 근거: `.../context/process/20-output-first-interactive-demo.md:7-12`은 세 후보 전체를 합쳐 여덟 번의 상태 전환이라고 기록한다.
- smallest correction: `세 출력에 걸쳐 총 여덟 번의 상태 전환을 펼쳤습니다.`

## Unverifiable

### Assignment 중간 AI 답변의 정확한 내용

- claim: `AI는 provenance를 보존해야 한다거나 너무 빨리 확정하면 안 된다는 더 큰 일반론으로 올라갔습니다.`
- verdict: unverifiable
- 근거:
  - `/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-21-ai-self-check-principle-calibration/raw.md:42-61`에는 사용자 발화와 뒤의 `Provenance` 언급은 남아 있지만, 그 사이 AI 답변 원문은 없다.
  - `01-material-synthesis-and-user-sync.md:234-236`도 중간 AI 답변 전체가 남아 있지 않아 정확한 일반화 순서를 재구성하지 않는다고 정한다.
- smallest correction: 정확한 AI 발언처럼 쓰지 않고 후대 해석임을 표시한다. 예: `당시 중간 답변 원문은 남아 있지 않습니다. 뒤에 정리한 기록에서는, AI가 자신의 결정 위치보다 더 큰 일반론으로 올라간 장면으로 해석했습니다.`

그 외 actor·수치·시점·제안/구현 상태에서 직접 충돌하는 unsupported claim은 찾지 못했다.

## Public-boundary risks

### `facts[]`

- risk: 내부 구현 식별자를 그대로 공개한다.
- verdict: 공개에 식별자 자체가 필요하지 않다면 일반화한다.
- smallest correction: `검색 후보 목록`, `검색·추출의 중간 결과`

### `current.md`

- risk: 실제 내부 파일명을 공개 개념명으로 사용한다.
- verdict: 위험도는 낮지만 사용자 확인 필요
- 근거: 경로·원문·line은 노출하지 않고 역할만 재구성했으나, 공개 글의 핵심 이름으로 유지할지는 별도 판단이다.
- smallest correction: 공개가 의도되지 않았다면 `현재 상태 문서`, `current 문서`로 일반화한다.

### `Q4`, `Q5`

- risk: 내부 제출 설문의 문항 구조를 그대로 가리킨다.
- verdict: 낮은 공개 경계 위험
- smallest correction: 번호가 논증에 필요하지 않다면 `프로젝트 전체 역할을 묻는 문항`, `최신 구현을 묻는 문항`으로 일반화한다.

## 확인된 공개 안전 범위

- 로컬 절대 경로, task/session ID, plugin 설치 ID, cache 경로, 코드 본문, private 대화 직접 인용이 없다.
- `current` 예시는 내부 원문을 복사하지 않고 역할만 재구성했다.
- 9·15 수치와 결함은 코드 원문 없이 검증 역할과 결과만 설명한다.
- 판단 순서의 표는 `정적 목업`, `가정한 상태 변화`로 표시돼 구현 완료처럼 읽힐 경계를 지켰다.
- self-check는 사용자 private 발화를 직접 인용하지 않고 actor 기여와 인과 상한을 재서술했다.
