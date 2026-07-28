---
작성일: 2026-07-27
성격: public-reshape-v1 근거·공개 경계 검토 원문
공개상태: 내부 작업 문서
검토입력: public-reshape-v1, source check, 직접 process 기록, Git snapshot, 보존된 대화 원문
검토후속: 원천 정확도 교정 3건을 v1에 반영
---

# Evidence and public-boundary review

이 review는 글의 구조나 매력을 평가하지 않는다. 사건, 수치, actor, 시간순서, 기술 설명이 직접 source가 지지하는지와 공개 원고에 비공개 식별 정보가 새지 않았는지만 확인했다.

## 1. Current / active-state operation — PARTIAL

확인된 내용:

- 판매자에게 물을 질문을 `시작 시각`과 `아동 티켓 절차` 두 개에서 `시작 시각` 하나로 줄인 교정은 source와 일치한다. 티켓 절차는 이미 확인된 준비 부담으로 남겼다.
  - Source: AX `context/process/27-loop-01-correction-cycle.md:21-26`
- 외부 제출용 다섯 문항의 시간축을 프로젝트 전체와 최신 구현으로 나누고 답변을 전면 재작성한 과정은 정확하다.
  - Source: AX `context/process/29-questionnaire-rebuild-from-current.md:5-26`
- 설문 작성 중 병렬 구현의 최신 E2E 결과를 다시 읽어 마지막 답변을 갱신한 시간순서도 맞다.
  - Source: AX `context/process/30-questionnaire-final-verification.md:23-27`
- loop gate 뒤 세 commit 동안 `current`가 갱신되지 않았고 questionnaire와 upload 기록이 빠졌다는 terminal gap은 확인된다. 원고는 원인을 추정하지 않았다.
  - Source: current audit `08-current-and-gate-audit.md:60-63`

교정한 내용:

- 원고는 질문별 시간축 배치와 다섯 답변의 실제 재작성을 저자의 직접 실행처럼 썼다. 직접 기록에서는 저자가 최근 구현 과적합을 발견하고 재작성을 지시했으며, 실제 분리와 작성은 AI가 수행했다.
- 이를 `AI에게 질문마다 필요한 시간축을 다시 나눠 다섯 답변을 전면 재작성하게 했다`로 고쳤다. 발견, 지시, 완료 책임은 저자에게 남기되 실행 actor를 보존했다.

핵심 사건이나 수치에 source 없는 내용은 발견되지 않았다.

## 2. Independent review and recovery — PASS

확인된 내용:

- 9와 15는 모두 같은 Python `unittest` runner가 실행한 test method 수다. validator, CLI, source 대조, 설치형 자연어 E2E는 두 숫자 밖의 검증이다.
  - Source: commits `61981aa`, `0bdb843`
  - Source: AX `context/process/26-loop-01-first-implementation-and-operations-retro.md:14-17`
- 문자열 `"false"`는 boolean 변환 오류가 아니다. type 검증이 없어 문자열이 `is False` 분기를 비껴간 결함이며, 교정 뒤에는 boolean이 아닌 입력을 계약 오류로 처리한다.
  - Source: `61981aa:src/scripts/tripproof.py`
  - Source: `0bdb843:src/scripts/tripproof.py`
- 공개 사실과 fixture의 모순, 참여자 범위 누수, 배열 순서에 따른 상반 claim 처리, revision lineage, 설치형 자연어 E2E 부재가 직접 기록과 일치한다.
  - Source: AX `context/process/26-loop-01-first-implementation-and-operations-retro.md:43-54`
  - Source: AX `context/process/27-loop-01-correction-cycle.md`
- 판매자 답변은 실제 판매자 발화가 아닌 fixture라고 원고 안에서 제한했다.
- 마지막 판별은 설치 상태와 E2E 기록을 입력으로 받았으므로 ZIP-only clean-room 재현이 아니라는 한계도 정확하다.

교정할 내용과 source 없는 핵심 주장은 발견되지 않았다.

## 3. Product-flow scope control — PASS

확인된 내용:

- raw `facts[]` 화면은 구현 전에 제안된 작은 경로이며, 배포된 실패가 아니다.
  - Source: Tripproof `docs/implementation-notes/2026-06-09-spec-driven-product-flow-drift/index.md:12-14`
  - Source: 같은 기록의 `raw.md:11-34`
- 실제 구현은 retrieval 후보, answer composer, 원문 grounding, `ChatAnswer`와 상태, 실제 질문 route로 이어졌다.
  - Source: `docs/specs/.../03-evidence-backed-facts.md:9-13,21-45,68-88`
  - Source: commits `02bc3d7`, `54f5924`
- `15:00 → 16:00`은 하나의 metamorphic test다. `missing`은 이 test의 세 번째 arm이 아니라 별도 계약과 behavior다.
  - Source: commit `50ad14f`
- grounding과 routing을 포함한 세 제품행동 test와 호출자 없는 fact 경로 삭제가 확인된다.
  - Source: decision `2026-06-10-spec-driven-judgment-and-test-enforcement/index.md:25-34`
  - Source: commits `50ad14f`, `4ec59dd`
- 원고는 이 test가 사용자 가치나 semantic quality 전체를 증명한다고 넓히지 않았다.

교정할 내용과 source 없는 핵심 주장은 발견되지 않았다.

## 4. Judgment order — PARTIAL

확인된 내용:

- `문제 3 → solution 9 → 결합 방향 3 → output 3 → snapshot 9 → 선택`의 숫자와 단위가 직접 기록과 일치한다.
  - Source: AX `context/process/17-performance-led-solution-passes.md:5-23`
  - Source: AX `context/process/19-output-first-comparison.md:5-16`
  - Source: AX `context/process/20-output-first-interactive-demo.md:5-12`
- 9 snapshots는 후보마다 세 상태를 만든 수다. 별도로 기록된 상태 전환 8회와 혼합하지 않았다.
- Markdown output과 HTML 대화 목업이 실제 plugin이 아닌 정적 비교 산출물이라는 상한을 지켰다.
- 두 번째 방향은 AI가 사용자의 위임 아래 판단하고 사용자가 확인해 닫았다.
- 최종 제품 품질이나 사용자 가치가 향상됐다고 쓰지 않았다.

교정한 내용:

- 세 번째 output에서 `현재 상품과 연락 경로를 찾은 뒤`라고 써 실제 확인처럼 읽혔다. 원천에서는 현재 활성 상품과 판매자 연락 경로가 없어 바로 질문을 보낼 수 없었고, 목업 안에서만 찾았다고 가정했다.
- 이를 `목업에서는 ... 현재 상품과 연락 경로를 찾았다고 가정한 뒤`로 고쳤다.

핵심 사건이나 수치에 source 없는 내용은 발견되지 않았다.

## 5. AI self-check — PARTIAL

확인된 내용:

- 첫 별도 점검의 판정은 유효했고, main AI가 이를 적용하며 기존 동시 검토를 `회사 방향 우선 → 주변 마찰 확인` 순차 구조로 과교정했다.
  - Source: AX `context/process/09-discussion-and-ai-self-check.md:131-190`
- 저자가 앞선 종합으로 돌아가게 했고, 두 번째 점검과 main의 재적용으로 회사 자료와 사용자·독립 자료의 증명 범위를 다시 나눴다.
  - Source: 같은 파일 `:192-224`
  - Source: AX `context/process/08-second-research-synthesis.md:16-28`
- assignment 사례의 한 과제 누락과 세 곳 분류 교정, 중간 AI 답변이 남지 않았다는 한계, 이후 기록의 해석은 직접 원문과 일치한다.
  - Source: ai-note `2026-05-21-ai-self-check-principle-calibration/raw.md:20-79`
- forward-bias 사례의 사용자 제동 세 번과 지침 변경 전후가 보존된 원문과 맞다. 장기 재발 감소는 증명하지 않았다고 제한했다.
  - Source: ai-note `2026-07-09-harness-forward-bias-impact-axis/raw.md:21-53,71-80`

교정한 내용:

- 조사 실행 actor는 main AI이고, 저자는 문제 카테고리를 고정하지 않는 방식을 정정·승인했다.
- `20`은 원자적인 URL 20개가 아니라 조사 문서에서 번호를 붙인 자료 항목 수다. 일부 항목은 여러 자료를 묶는다.
- 이를 `AI와 공개 자료를 조사했고, 조사 문서에는 이를 20개의 자료 항목으로 묶어 남겼다`로 고쳤다. 다음 문장에서도 `20`이 URL 수나 품질 점수가 아닌 항목 수임을 명시했다.

핵심 사건에 source 없는 내용은 발견되지 않았다.

## Unsupported와 공개 경계

- 완전히 원천이 없는 핵심 사건이나 수치는 발견되지 않았다.
- `current` 누락의 원인, self-check의 장기 예방 효과, 판단 순서가 제품 품질을 높였다는 인과는 원고가 모두 미확인으로 제한했다.
- 로컬 절대 경로, 내부 mission·code 경로, session·task ID, private fixture 전문, 상품 URL, 회사명·해커톤명, 내부 agent 이름, 면접 피드백 원문은 다섯 공개 원고에서 발견되지 않았다.
- Independent의 Python code는 private 함수 원문이 아니라 결함 범주를 재현한 일반화 예시다.
- Claude·Codex·model명, 생성 prompt, `supporting-material candidate`, TODO, FIXME 같은 생성·편집 흔적은 발견되지 않았다.

위 세 교정은 source 정확도만 바로잡았다. 글의 중심, primary artifact, 구조, ending은 바꾸지 않았으므로 다른 독립 review의 판독 대상은 유지된다. 교정 뒤 해당 문단만 다시 대조한 후속 evidence 확인에서도 세 곳 모두 PASS였고, 새 unsupported 주장이나 공개 경계 위험은 발견되지 않았다.
