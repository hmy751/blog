---
작성일: 2026-07-20
갱신일: 2026-07-23
성격: AI-native 역량 기술 블로그 주제 후보 / 내부 source card
공개상태: 내부 작업 문서
현재상태: 후보군 확정 / 첫 글과 발행 순서는 미정
주요 원천: AX 해커톤, Cofathon, Tripproof, ai-note, 2025–2026 공개 1차 자료
---

# AI-native 역량 글감 후보 — 다섯 독립 주제와 근거

이 문서는 현재 남은 다섯 주제를 축약하지 않고 보존하는 후보 문서다. 각 후보의 중심 질문, 새로 생긴 통제력, 대표 장면, 글의 전개, 주장 상한, 제목 후보, 로컬 원천을 함께 둔다.

후보를 고른 기준과 그 기준이 대화에서 어떻게 바뀌고 합의됐는지는 [01-criteria-and-decision-history.md](./01-criteria-and-decision-history.md)가 소유한다. 이 문서에서는 기준의 역사를 반복하지 않고, 그 기준을 적용한 현재 후보 상태와 근거를 상세히 남긴다.

## 현재 후보 상태

현재 남은 후보는 다섯 개다.

1. **current / active-state operation**
   기록을 많이 남기는 것과 현재 작업을 제어하는 것은 다르다. history와 current를 분리하고, 지금 유효한 상태·단일 커서·다음 판단·권위 있는 원천으로 가는 길을 유지하는 능력이다.

2. **독립 판별 / 제3판별자**
   리뷰 AI를 하나 더 부르는 일이 아니라 구현자와 판별자가 같은 가정에서 같은 오류를 반복하지 않도록 입력·원자료 접근·판정 권한·완료 권한을 분리하는 능력이다.

3. **평가 기준을 적용하는 시점**
   근거를 엄격히 보면서도 탐색을 너무 일찍 닫지 않는 능력이다. 좋은 rubric을 후보 생성의 씨앗으로 쓰는 것과 후보를 거르는 필터로 쓰는 것은 결과가 다르다.

4. **AI self-check**
   틀린 답을 다시 쓰거나 사과하는 일이 아니라, AI 자신의 문제 정의·추상화·도구 선택·작업 흐름을 실패 원인 안에 넣어 진단하는 능력이다. 진단을 정밀하게 만들 수 있지만 행동 변화까지 보장하지는 않는다.

5. **결과물 폐기와 기능 core 보존**
   AI가 만든 산출물 전체를 하나의 성과로 취급하지 않고, 잘못된 증거·표현 artifact는 폐기하면서 검증된 기능 core와 사용자 workflow는 서로 다른 교체 단위로 다루는 능력이다.

이 다섯 개 사이의 최종 순위와 발행 순서는 닫지 않았다.

- 사용자의 AI-native 관점을 가장 잘 대표하는 후보는 **current**다.
- 제목만으로 개발자가 바로 들어올 수 있고 기술 사례가 가장 준비된 후보는 **독립 판별**이다.
- 이번 조사에서 새로 선명해진 판단 감각은 **평가 기준의 시점**이다.
- 사용자의 장기적인 개인 탐구와 목소리가 가장 많이 축적된 후보는 **AI self-check**다.
- 제품 회고로 가장 강한 후보는 **결과물 폐기와 기능 core 보존**이다.

따라서 첫 글 선택은 current와 독립 판별 사이에 열려 있다. 독립 판별을 “증거가 가장 강하므로 1위”라고 확정하지 않고, current를 “인과 증명이 약하므로 후순위”로 내리지도 않는다.

## 후보 1. 기록을 남겨도 프로젝트는 제어되지 않았다

부제 후보: **AI와 긴 작업을 하며 history와 current를 분리하게 된 이유**

### 중심 질문

- 작업 로그와 결정 기록을 충분히 남겼는데도 왜 다음 AI는 지금 무엇이 유효한지 다시 추론해야 했는가?
- 긴 context와 재진입 속에서 전체 작업의 계보와 단 하나의 현재 위치를 어떻게 함께 유지할 수 있는가?

### 새로 생긴 통제력

history는 무엇이 있었는지를 보존한다. current는 지금 무엇이 유효하고 무엇을 다음에 해야 하는지를 제어한다.

current의 핵심은 상태를 많이 저장하는 데 있지 않다.

- 전체 생애주기를 한 장의 지도에서 보존한다.
- 현재 판단점에 커서 하나만 둔다.
- 현재 효력이 있는 해석과 열린 질문을 짧게 남긴다.
- 상세 이유와 과거 이력은 권위 있는 원천 문서로 연결한다.
- 방향이 바뀌면 current를 덮어쓰고, history는 append-only로 남긴다.

이 구조는 current를 진실 데이터베이스가 아니라 **active control surface이자 원천으로 가는 router**로 만든다.

### 사용자의 실제 경험

이번 주제 논의에서 사용자가 직접 짚은 효용은 다음과 같다.

- 이전 하네스에서도 기록은 계속 남았지만 기록만으로 작업이 제어된다는 느낌은 없었다.
- current를 쓰면서 전체 현황과 현재 판단점을 한 번에 볼 수 있었다.
- context가 길어지거나 세션이 바뀌어도 프로젝트의 틀이 쉽게 무너지지 않았다.
- current는 최근 대화 요약보다 더 긴 프로젝트 생애주기를 보존하고, 필요한 세부 원천으로 다시 내려갈 수 있게 했다.

이 경험은 통제 실험이 아니라 사용자의 반복된 운영 경험이다. 보편적 성능 향상으로 쓰지 않고, 왜 이 방식이 중요해졌는지를 여는 1인칭 근거로 사용한다.

### 확인된 장면

- AX 작업본의 reachable commit 21개 중 18개에서 current가 바뀌었다.
- 18개 committed version 모두 active marker가 정확히 하나였고, parent 대비 marker는 13회 전환됐다.
- 실패 상태도 current에 남아 다음 행동이 correction으로 돌아갔다.
- 설문 작성 세션에서 최근 Loop 01 장면에 치우친 답변을 전체 프로젝트 계보로 복구할 때 current의 전체 지도가 실제로 다시 읽혔다.
- Cofathon에서는 상태 보고서처럼 커진 current를 147줄에서 46줄의 지도 중심 구조로 교정했다.
- 이후 82줄·17,381 bytes에서 47줄·6,943 bytes로 다시 줄이며 완료 이력은 원천 링크로 접고 현재 판단점에만 깊이를 남겼다.

### 글의 전개 후보

1. 기록은 충분했지만 “그래서 지금 무엇을 해야 하는가”가 자동으로 나오지 않았던 경험에서 시작한다.
2. log, history, compaction summary, goal, current가 서로 무엇을 소유하는지 구분한다.
3. AX의 18개 version과 단일 cursor, 실제 재진입·계보 복구 장면을 보여 준다.
4. current가 커져 상태 보고서가 됐을 때 지도 중심으로 다시 줄인 Cofathon 장면을 붙인다.
5. overwrite current와 append-only history, authority link, update ownership이라는 mechanism을 설명한다.
6. stale·비대화·다중 session writer 문제를 한계로 닫는다.

### 아직 말할 수 없는 것

- current 하나가 compaction과 재진입 성공을 만들었다고 말할 대조군은 없다.
- 연속성은 compaction summary, goal, 사용자 정정, Git 확인, current가 결합한 결과다.
- AX의 마지막 current는 package·questionnaire·upload 관련 terminal event를 놓쳤다.
- current를 읽으라는 hook이 실행됐다는 사실은 모델이 실제로 읽고 이해했다는 증거가 아니다.
- 줄 수와 byte 감소는 특정 snapshot의 정리 결과이지 영구적인 품질 지표가 아니다.

### 제목 후보

- `기록을 남겨도 프로젝트는 제어되지 않았다`
- `AI와 긴 작업을 하며 history와 current를 분리하게 된 이유`
- `current.md는 작업 로그가 아니다`
- `긴 AI 작업에서 필요한 것은 더 많은 기록이 아니었다`

### 현재 판단

사용자의 AI-native 관점과 실제 운영 감각이 가장 많이 들어가는 후보다. 기존의 넓은 “문서층위” 글은 이 글의 설명 재료로 내린다. 문서의 수명과 소유권은 current가 작동하는 이유를 설명하지만 글의 주인공은 아니다.

### 주요 원천

- [AX current·gate 전수 감사](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/20-작업과정-하네스-분석/02-독립조사/git/08-current-and-gate-audit.md)
- [AX 재진입 교차검증](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/20-작업과정-하네스-분석/03-교차검증/reentry.md)
- [AX 조사설계의 기여 상한](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/20-작업과정-하네스-분석/00-조사설계.md)
- [Cofathon current 지도 우선 교정](/Users/hammyeong-yeon/Desktop/10_work/cofathon/context/process/02-current-map-first-correction.md)
- [Cofathon 재진입과 문서 소유권 정리](/Users/hammyeong-yeon/Desktop/10_work/cofathon/context/process/34-refine-session-reentry-and-instruction-ownership.md)
- [Cofathon 현재 current 계약](/Users/hammyeong-yeon/Desktop/10_work/cofathon/context/current.md)

## 후보 2. 테스트 9개가 모두 초록인데 제품은 아직 틀렸다

부제 후보: **제3판별자는 세 번째 AI가 아니다**

### 중심 질문

- 테스트와 validator가 모두 통과했는데도 왜 실제 사용 증거의 공백과 계약·구현 결함이 남았는가?
- 별도 AI를 부르는 것과 구현자의 오류 상관을 끊는 독립 판별 구조는 무엇이 다른가?

### 새로 생긴 통제력

fixture test는 구현자가 만든 세계 안의 일관성을 확인한다. 독립 판별은 그 세계가 원자료와 외부 계약에 맞는지 다시 묻는다.

중요한 것은 reviewer 수가 아니라 판별 계약이다.

- 결과물뿐 아니라 raw·canonical source와 실제 실행면에 접근한다.
- main의 예상 결론과 정서적 framing을 정답처럼 받지 않는다.
- 필요한 증거와 평가 범위를 스스로 바꿀 수 있다.
- 질문 자체가 틀렸으면 질문을 기각하거나 다시 잡을 수 있다.
- 판정은 read-only로 두고 구현 write와 완료 선언은 분리한다.
- 판별자 자체의 판정도 자동 정답으로 취급하지 않는다.

### 본 사건: AX

- 첫 구현에서 9개 fixture test와 정적 validator가 통과했다.
- 별도 판별은 설치된 자연어 E2E 부재, 공개 사실과 fixture의 모순, 문자열 "false"를 boolean처럼 받는 문제, child scope 누출, 상반 claim의 순서 의존 등을 찾았다.
- 교정 뒤 test는 해당 checkpoint에서 15개로 늘었다.
- 설치된 새 Codex task에서 자연어 요청 → MCP → 구조화 → 수정 발화 → seller 답변 흐름을 실행했다.
- 전략 평가는 제외한 제한된 fresh 회귀 판별까지 통과했다.

### 보강 사건: Cofathon

- main은 10개 후보를 모두 통과로 봤다.
- 첫 fresh review는 통과 2, 조건부 7, 탈락 1로 갈랐다.
- 다른 blind review는 통과 7, 조건부 2, 탈락 1로 더 관대했다.
- 두 review의 차이는 “독립 AI의 결론도 자동으로 정답이 아니다”라는 경계를 보여 준다.

### 반례: Tripproof의 LLM judge

생성기와 judge를 분리했다고 자동으로 전체 제품이 맞아지지는 않았다.

- judge는 받은 입력 안에서는 조건 없는 값을 올바르게 판정했다.
- 그러나 앞단 추출이 조건 문장을 값으로 바꿔 judge에게 오염된 입력을 넘겼다.
- 한 paraphrase는 supported ×3으로 후퇴했고, 다른 문항은 값 표기 열화와 실제 조건 해석이 섞인 needs_review ×3이 됐다.
- 판정 호출이 있는 요청은 해당 실험에서 대략 두 배 가까이 느려졌다.

이 장면은 독립 판별의 반대가 아니라 조건을 더 선명하게 한다. 판별자를 분리하는 것만으로 부족하고, 판별자가 보는 입력과 실패 귀속도 분리해야 한다.

### 글의 전개 후보

1. 9개 test와 validator가 모두 초록인 화면에서 시작한다.
2. 별도 판별이 자연어 E2E 공백과 문자열 "false" 문제를 찾는 장면을 깊게 보여 준다.
3. fixture가 만든 세계와 외부 계약의 차이를 설명한다.
4. 독립 판별의 입력·판정·권한 계약을 제시한다.
5. Cofathon의 서로 다른 두 review로 reviewer도 자동 정답이 아님을 보여 준다.
6. Tripproof judge의 오염된 입력 반례로 “AI를 하나 더 붙여라”는 결론을 막는다.

### 아직 말할 수 없는 것

- 9→15 test는 AX Loop 01의 한 checkpoint이지 프로젝트 전체 품질 지표가 아니다.
- fresh라는 이름만으로 clean-room이나 blind가 증명되지 않는다.
- AX의 회귀 판별은 전략·데모 임팩트를 제외한 제한된 범위였다.
- Tripproof 실험은 작은 로컬 dataset과 ON arm 추가 호출을 가진 비교이며 일반 benchmark가 아니다.
- 같은 모델을 쓰면 독립이 아니고 다른 모델을 쓰면 독립이라는 단순 규칙으로 쓰지 않는다.

### 제목 후보

- `테스트 9개가 모두 초록인데 제품은 아직 틀렸다`
- `제3판별자는 세 번째 AI가 아니다`
- `AI에게 리뷰를 한 번 더 시켰는데 왜 같은 실수를 반복할까`
- `fixture test가 만든 세계 밖으로 나가는 법`

### 현재 판단

다섯 후보 중 개발자가 가장 빨리 자기 문제로 알아볼 수 있고, 기술 장면과 반례가 가장 준비돼 있다. 첫 글의 유력 후보지만 전체 AI-native 관점을 대표한다는 이유가 아니라 **가장 읽히기 쉬운 입구**라는 이유다.

### 주요 원천

- [AX 첫 구현과 fresh 미통과](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/26-loop-01-first-implementation-and-operations-retro.md)
- [AX 교정 cycle과 설치 자연어 E2E](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/27-loop-01-correction-cycle.md)
- [AX 실패·복구 교차검증](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/20-작업과정-하네스-분석/03-교차검증/failure-recovery.md)
- [Cofathon 후보 생성과 서로 다른 판별 결과](/Users/hammyeong-yeon/Desktop/10_work/cofathon/context/process/01-candidate-generation-and-runtime.md)
- [Cofathon 독립 판별 계약](/Users/hammyeong-yeon/Desktop/10_work/cofathon/context/process/27-integrate-goal-loop-and-engineering-structure.md)
- [Cofathon 구현과 독립 판별](/Users/hammyeong-yeon/Desktop/10_work/cofathon/context/engineering/01-purchase-decision-slice/implementation.md)
- [Tripproof self-certification 진단](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/decisions/2026-06-25-llm-answer-self-certification-reframe/index.md)
- [Tripproof entailment judge 실험](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/specs/2026-07-01-answer-pipeline-substrate-redesign/03-conditional-value-entailment-judgment.md)
- [Tripproof relation 호출 A/B](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/specs/2026-06-19-agoda-original-pdf-qa-improvement/07-relation-vs-model-upgrade-ab.md)

## 후보 3. 좋은 평가 기준을 먼저 줬더니 AI의 후보가 전부 비슷해졌다

부제 후보: **탐색을 엄격하게 하면서도 너무 일찍 닫지 않는 법**

### 중심 질문

- 좋은 rubric을 AI에게 먼저 주면 왜 후보의 품질이 오르기보다 평가 문구의 변형만 늘어날 수 있는가?
- 근거를 엄격히 판단하면서 후보의 가능성은 언제까지 열어 둬야 하는가?

### 새로 생긴 통제력

좋은 기준과 좋은 기준을 적용하는 시점은 다르다.

- 탐색 중에는 후보를 구성하는 주장별 근거 상태를 엄격히 본다.
- 근거가 부족하다는 이유만으로 후보 전체를 즉시 탈락시키지 않는다.
- 실제 사람·업무·망가진 workflow를 먼저 모아 후보의 닻을 만든다.
- rubric은 후보 생성의 씨앗이 아니라 후보가 생긴 뒤 비교하는 필터로 쓴다.
- 후보 단위의 선택·미선택·종료는 전체를 함께 보는 마지막 수렴에서 한다.

이는 “아이디어 단계에서는 근거를 보지 말자”는 뜻이 아니다. 근거 판정의 대상을 후보 전체가 아니라 문제 존재, 원인, 반복성, 입력 가능성, 해결 작용 같은 주장 단위로 바꾸는 일이다.

### 대표 장면 1: rubric이 후보의 씨앗이 됐다

Cofathon에서 Probe 평가 체계와 KRAFTON 가치 정리를 후보 생성의 발산 재료로 사용했다. AI는 15개의 추상 후보 계열을 만들었지만 대부분 평가 언어를 업무 문장으로 바꾼 형태였다. 실제 사람, 업무, 망가진 workflow가 입력에 없었기 때문에 후보도 실제 세계에 닻을 내리지 못했다.

사용자는 research까지는 괜찮았지만 research에서 후보로 넘어가는 단계가 작동하지 않는다고 정정했다. 이후 순서를 다음처럼 바꿨다.

1. 실제 장면을 모은다.
2. 상황 기반 후보를 만든다.
3. rubric은 후보를 비교하고 걸러 내는 데 쓴다.

### 대표 장면 2: 근거 판정이 중간 탈락으로 작동했다

이후에도 비슷한 문제가 두 번 반복됐다.

- 장면·축·gate별 근거 판정이 후보를 만드는 일보다 미통과 이유를 관리하는 일로 커졌다.
- “같은 사용자·결정·정보·판단 방식”이라는 결합 기준을 후보 생성 전에 적용해 다섯 후보를 충분히 펼치기 전에 두 방향으로 줄였다.

교정 뒤에는 중간 분석과 마지막 수렴이 판단하는 대상을 분리했다.

- 중간: 주장별로 확인됨, 불충분, 모름, 확인 필요를 표시한다.
- 마지막: 전체 후보를 비교해 선택·미선택·종료를 판단한다.

### 글의 전개 후보

1. 좋은 평가 기준을 넣고 15개 후보를 받았지만 모두 비슷하게 느껴진 장면에서 시작한다.
2. 후보가 rubric의 반향이 된 이유를 실제 입력 부재와 증명 언어 정규화에서 찾는다.
3. scene-first로 순서를 바꾼다.
4. 두 번째 조기 수렴 사건을 붙여 문제가 아이디어 생성 한 번에 그치지 않았음을 보여 준다.
5. 주장별 엄격함과 후보별 개방을 분리하는 판단 순서를 제시한다.
6. 무한 발산이 아니라 마지막 수렴과 중간 종료 조건까지 설명한다.

### 아직 말할 수 없는 것

- 순서를 바꾼 뒤 최종 제품의 품질이 통제군보다 좋아졌다는 비교는 없다.
- 확인된 변화는 후보의 비교·분화 공간을 너무 일찍 없애지 않게 된 것이다.
- Cofathon process/31의 inner evaluation cycle은 당시 prospective 운영 계약이다. 이 글의 효과 증명으로 소급하지 않는다.
- 핵심 전제가 사실과 모순하거나 공식 경계를 위반하는 후보는 중간에도 종료할 수 있다.

### 제목 후보

- `좋은 평가 기준을 먼저 줬더니 AI의 후보가 전부 비슷해졌다`
- `좋은 평가 기준은 아이디어를 만들지 않는다`
- `AI 아이디어를 엄격하게 보면서 너무 일찍 죽이지 않는 법`
- `rubric은 씨앗이 아니라 필터였다`

### 현재 판단

이번 조사에서 새로 발견한 AI-native “감각”에 가장 가깝다. 독립 판별처럼 널리 알려진 검증 주제보다 낯설고, 기획·리서치·spec·아키텍처 후보를 AI와 만드는 개발자에게 넓게 전이된다. 다만 성공 효과를 크게 말하기보다 판단 순서가 왜 필요해졌는지를 쓰는 learning-experiment에 가깝다.

### 주요 원천

- [Cofathon 장면 우선 후보 재시작](/Users/hammyeong-yeon/Desktop/10_work/cofathon/context/process/08-scene-first-candidate-restart.md)
- [Cofathon 판단 순서 core 승격](/Users/hammyeong-yeon/Desktop/10_work/cofathon/context/process/18-candidate-judgment-order-core-promotion.md)
- [현재 후보 탐색 판단 순서](/Users/hammyeong-yeon/Desktop/10_work/cofathon/context/core/candidate-exploration-judgment-order.md)
- [관련 맥락: inner evaluation cycle](/Users/hammyeong-yeon/Desktop/10_work/cofathon/context/process/31-promote-inner-evaluation-cycle.md)

## 후보 4. AI self-check는 답을 다시 쓰는 일이 아니다

부제 후보: **AI가 자기 개입을 원인에 넣기 시작했을 때**

### 중심 질문

- AI가 자신의 개입을 문제 원인 안에 넣는다는 것은 구체적으로 무엇인가?
- 왜 자기 오류를 정확히 설명하고도 다음 행동에서 같은 방향을 반복할 수 있는가?
- self-check는 언제 발동하고 어디에서 끝나야 하는가?

### 새로 생긴 통제력

self-check는 문제를 외부 대상으로만 설명하지 않고, 방금 결과를 만든 AI의 판단 위치로 돌아간다.

- AI가 무엇을 문제로 정의했는가.
- 무엇을 위험으로 보고 무엇을 피했는가.
- 위험을 줄였는가, 아니면 제품 밖으로 밀어냈는가.
- 어떤 중간 산출물과 요약을 과하게 믿었는가.
- 자기 추상화·도구 선택·workflow가 실패를 어떻게 만들었는가.

“더 근본적으로”는 더 큰 일반론으로 올라가는 것이 아니라 결과가 만들어진 결정 위치로 돌아가는 일이다.

### 대표 장면

- 안전한 데모를 만들며 실제 자료의 불확실성을 제품 밖으로 밀어냈고, 그 장치를 제품 증거처럼 말한 사건.
- “AI 관점으로 더 근본적으로”라는 요청을 AI 일반론과 provenance 문제로 추상화했다가, AI 자신의 개입을 원인 안에 넣으라는 정정으로 돌아온 발단.
- forward bias를 고치는 규칙을 논의하면서 AI가 여러 번 바로 초안 작성으로 앞질러 가, 고치려던 행동을 같은 대화에서 재현한 사건.
- 단순한 설명 요청을 판단 오류로 읽어 self-check를 과잉 발동하면 사용자가 원하지 않은 메타 절차를 떠안게 되는 경계.

### 중요한 한계

self-check의 가장 정직한 결론은 다음과 같다.

> AI가 자기 개입을 원인에 넣으면 진단은 정밀해질 수 있다. 하지만 그 설명이 다음 행동의 변화를 보장하지는 않는다.

같은 오염된 frame 안에서 자기점검을 하면 기존 방향을 더 정교하게 변호할 수도 있다. 그래서 다음 행동이 실제로 달라졌는지를 확인하고, 같은 축의 오독이 반복될 때만 원문에 다시 접근하는 fresh audit로 올릴 필요가 있다.

단순한 “이 말이 무슨 뜻이야?”는 설명 문제일 수 있다. 첫 정정은 바로 반영하면 된다. 모든 오해를 self-check와 독립 감사로 올리면 self-check 자체가 메타 작업이 된다.

### 글의 전개 후보

1. 체크인 시간 기능이 안전한 demo drift로 바뀐 장면에서 시작한다.
2. 데모의 문제가 아니라 AI가 위험을 제품 밖으로 밀어낸 판단을 본다.
3. 사과, 수정, 일반론, self-check의 차이를 다음 행동으로 구분한다.
4. 같은 맥락의 자기설명이 기존 frame을 더 정교하게 만들 수 있음을 보여 준다.
5. 단순 설명 질문·첫 정정·반복 오독·fresh audit의 경계를 제시한다.
6. 효과가 아니라 남은 질문으로 닫는다: self-check는 어디에서 끝나야 하는가.

### 아직 말할 수 없는 것

- self-check가 재발을 막거나 행동 변화를 안정적으로 만든다는 증거는 없다.
- 현재 자료에는 성공 사례만큼 과잉 발동과 반복 위반도 많다.
- self-check skill의 존재와 실제 판단 변화는 같은 것이 아니다.
- 공개 글에서는 개인 raw 대화를 그대로 인용하지 않고 사건과 판단 이동을 재서술한다.

### 제목 후보

- `AI self-check는 답을 다시 쓰는 일이 아니다`
- `AI가 자기 개입을 원인에 넣기 시작했을 때`
- `AI는 자기 오류를 설명하고도 같은 방향으로 다시 틀렸다`
- `더 근본적으로 보라는 말은 더 추상적으로 보라는 뜻이 아니었다`

### 현재 판단

방법론 성공담보다 개인적인 탐구와 회고에 가깝다. 이미 목소리와 본문 장면이 살아 있는 초안이 있으므로 새로 시작하기보다, “행동 변화는 보장하지 않는다”는 최신 경계와 발동 종료 조건을 반영해 재구성하는 편이 낫다.

### 주요 원천

- [AI self-check 기존 초안](/Users/hammyeong-yeon/Desktop/10_work/blog/content/drafts/ai-self-check-fundamental.md)
- [ai-self-check와 principle calibration의 발단 — 요약 source card](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-21-ai-self-check-principle-calibration/notes.md)
  - [정정 순서와 직접 발화 raw](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-21-ai-self-check-principle-calibration/raw.md)
- [불확실성 통제 demo drift — 요약 source card](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-05-llm-grounding-demo-drift/notes.md)
  - [제품 밖으로 위험을 밀어낸 정정 raw](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-05-llm-grounding-demo-drift/raw.md)
- [fresh auditor의 입력 경계 — 요약 source card](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-12-subagent-fresh-auditor-boundaries/notes.md)
  - [같은 frame과 독립 감사 경계 raw](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-12-subagent-fresh-auditor-boundaries/raw.md)
- [forward bias 교정 중 같은 행동 반복 — 요약 source card](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-07-09-harness-forward-bias-impact-axis/notes.md)
  - [교정 중 반복 행동 raw](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-07-09-harness-forward-bias-impact-axis/raw.md)

## 후보 5. 결과물을 뒤엎고도 기능은 살리는 법

부제 후보: **AI가 만든 artifact와 제품 core를 다른 교체 단위로 보기**

### 중심 질문

- AI가 만든 결과물이 사용자 장면과 어긋났을 때 왜 전체를 지키거나 전체를 버리는 두 선택만 남는가?
- 잘못된 증거·표현 artifact를 폐기하면서 이미 검증된 기능 core는 어떻게 보존할 수 있는가?

### 새로 생긴 통제력

한 프로젝트 안에서도 다음은 같은 교체 단위가 아니다.

- **evidence·presentation artifact**: 심사자 페이지, 통제 비교 자료, 데모 화면처럼 가치를 보여 주기 위해 만든 것
- **validated function core**: 조건 승인, 질문 승인, 답변 적용, 상태 전이, 저장처럼 test와 계약이 있는 기능
- **user workflow**: 사용자가 어떤 입력으로 시작하고 어떤 판단과 다음 행동을 얻는지

결과물이 틀렸을 때 이 셋을 분리하면, 잘못된 표현 artifact는 버리고 기능 core는 남기며 사용자 진입은 다시 설계할 수 있다.

### 대표 장면

Cofathon에서 정적 reviewer artifact는 상품 ID, option ID, revision, scope 같은 내부 상태를 전면에 보여 줬다. 기술 비교와 재현성은 있었지만 실제 여행자가 상품을 검토하는 장면과 맞지 않았다.

사용자는 최근 작업을 뒤엎되 기능 개발분은 남기라고 결정했다.

- reviewer artifact와 evidence cycle을 제거했다.
- plugin 기능 코드, fixture, product test는 보존했다.
- 삭제한 evidence JSON과 product test의 결합을 끊었다.
- 보존한 core는 구조화 입력 이후의 조건 계약·승인·질문·답변 적용·상태 전이·저장 기능으로 한정했다.
- 상품 URL과 자연어 여행 조건에서 core까지 이어지는 실제 사용자 E2E는 별도의 미완성 상태로 남겼다.

후속 작업에서는 주 진입점을 이미 고른 상품의 검토에서 자연어 여행 상황으로 후보를 찾고 좁히는 흐름까지 앞당겼다. 동시에 URL과 MCP를 경쟁시키지 않고, 상품을 골랐는지에 따라 자연스러운 사용자 진입을 고르고 필요한 live 데이터를 MCP로 회수하도록 다시 나눴다.

### MCP 전사 누락이 보여 준 후속 경계

폐기한 cycle에서는 사람이 MCP 결과를 Markdown과 JSON으로 옮기며 공개 사실 7개와 request·response envelope를 빠뜨렸다. 이 사건은 MCP가 나쁘다는 뜻이 아니라 acquisition과 product core 사이의 수동 전사가 별도 실패 지점이라는 뜻이다.

후속 구조는 자연어 요청 → live 조회 → versioned raw bundle → consistency 확인 → 후보 판단 → 선택한 한 상품의 review core로 책임을 나눴다.

### 글의 전개 후보

1. 기술적으로 그럴듯한 reviewer 화면이 실제 사용자는 쓸 수 없는 결과가 된 장면에서 시작한다.
2. “최근 작업을 뒤엎되 기능 개발분만 남긴다”는 결정의 어려움을 보여 준다.
3. artifact, function core, user workflow를 서로 다른 교체 단위로 나눈다.
4. 삭제한 것과 남긴 것을 test 결합·상태 계약 수준에서 구체적으로 보여 준다.
5. MCP 수동 전사 누락과 사용자 진입 재설계를 후속 사건으로 연결한다.
6. 결과물 전체를 성과로 방어하지 않고 제품 질문으로 돌아가는 기준으로 닫는다.

### 아직 말할 수 없는 것

- 보존한 core 뒤 실제 사용자 E2E는 폐기 시점에 완성되지 않았다.
- 이후 search-first 기술 slice가 생겼어도 실제 사용자 가치와 구매 결과는 별도 검증 영역이다.
- 한 프로젝트의 한 lifecycle이므로 “artifact를 버리면 제품이 산다”는 보편 법칙으로 쓰지 않는다.
- “제품을 살렸다”보다 “제품 질문으로 돌아갔다”, “선택적으로 되돌렸다”가 정확하다.

### 제목 후보

- `결과물을 뒤엎고도 기능은 살리는 법`
- `AI가 만든 결과물 전체를 하나의 성과로 취급하지 않기`
- `심사자 페이지는 버리고 product core는 남겼다`
- `잘못 만든 결과물에서 무엇을 살릴 것인가`

### 현재 판단

제품·아키텍처 회고로 가장 강하다. 예전의 “하네스가 제품을 먹어버렸다”는 실패 에세이보다, 사용자가 실제로 무엇을 폐기하고 무엇을 보존했는지에 더 구체적인 판단이 있다.

### 주요 원천

- [Cofathon evidence cycle 폐기와 기능 core 보존](/Users/hammyeong-yeon/Desktop/10_work/cofathon/context/process/36-discard-evidence-cycle-and-preserve-feature-core.md)
- [Cofathon live 상품 후보 진입으로 확장](/Users/hammyeong-yeon/Desktop/10_work/cofathon/context/process/37-upgrade-solution-to-live-purchase-entry.md)
- [Cofathon 사용자 장면별 URL·MCP 진입](/Users/hammyeong-yeon/Desktop/10_work/cofathon/context/process/38-choose-entry-by-user-scene-and-use-mcp-fully.md)
- [Cofathon 현재 상태 지도](/Users/hammyeong-yeon/Desktop/10_work/cofathon/context/current.md)
- [Tripproof meta-stage trap](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-28-tripproof-meta-stage-trap/notes.md)
- [Tripproof source tracing layers](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-27-tripproof-source-tracing-layers/notes.md)

## 다섯 후보 비교

후보의 역할을 정리하면 다음과 같다.

| 후보 | 가장 강한 매력 | 현재 근거의 성격 | 어울리는 글 유형 | 가장 큰 위험 |
| --- | --- | --- | --- | --- |
| current | 사용자의 고유한 운영 감각과 반복 효용 | Git 전수·재진입 사건·사용자 경험, 단일 인과는 미분리 | technical case study + retrospective | 문서 관리 팁이나 폴더 소개로 좁아짐 |
| 독립 판별 | 제목 즉시성과 기술적 촉감 | test·E2E·계약 결함·반례가 가장 풍부 | technical case study | “review AI를 더 붙여라”로 단순화 |
| 평가 기준의 시점 | 낯설지만 넓게 전이되는 판단 감각 | 두 번의 조기 수렴과 운영 원칙, 최종 품질 비교 없음 | learning experiment | 무한 발산론으로 오해 |
| AI self-check | 개인 목소리와 장기 탐구 | 반복 관찰과 초안은 풍부, 행동 변화 효과는 미증명 | retrospective + learning experiment | self-check 성공 protocol처럼 과장 |
| artifact/core 분리 | 구체적인 제품 폐기·보존 결정 | 삭제·보존 diff와 후속 설계, 실제 사용자 가치 미검증 | product architecture + retrospective | “실패했지만 다 살렸다”는 성공담으로 변형 |

## 기존 후보에서 내리거나 병합한 것

### LLM judge

별도 AI-native 역량 글보다 독립 판별의 기술 반례로 둔다. 답변 pipeline과 eval을 깊게 파면 훌륭한 AI engineering 글이 될 수 있지만, 현재 시리즈의 관점에서는 “판별자를 분리해도 입력이 오염되면 전체 제품은 틀릴 수 있다”는 경계를 맡는다.

### 넓은 문서층위

독립 후보에서 내리고 current 글의 mechanism으로 넣는다. Goal, current, core, research, engineering, process가 다른 수명과 소유권을 가져야 한다는 설명은 중요하지만, 글의 중심 효용은 폴더 구조가 아니라 active state를 제어하는 경험이다.

### 하네스가 제품을 먹어버린 한 달

현재 제목은 폐기한다.

- 원천 기간은 “한 달”로 쓰기 어렵고 실제로는 훨씬 짧은 특정 구간이다.
- 약 13,000줄·85개 파일·제품 코드 0줄은 특정 시점의 내부 회고 수치이므로 공개 전 재계수가 필요하다.
- 실패 수치만으로는 사용자가 무엇을 할 수 있게 됐는지가 약하다.

메타 산출물이 제품 질문을 가린 장면은 artifact/core 글의 배경으로 사용할 수 있다.

### MCP 수동 전사 누락

독립 주제에서 artifact/core 글의 후속 workflow 교체 장면으로 내린다. MCP 호출 성공과 raw 보존은 다르다는 provenance 글로 나중에 다시 확장할 수 있다.

### 실제 causal actor 추적

오류를 retrieval, extraction, judge, code certification 중 올바른 층에 귀속하는 렌즈로 남긴다. 독립 판별과 self-check의 보조 mechanism이지만 단독 글로 올리면 AI engineering forensic에 가까워진다.

### 예시를 실행 가능한 spec으로 쓰기

독립 판별이나 평가 기준 시점 글의 구체 장면으로 사용한다. 지금은 독립된 지속 문제와 사용자의 고유한 효용이 다른 다섯 후보보다 약하다.

### stop·delete·no-op

하나의 역량으로 합치지 않는다.

- delete는 artifact/core 분리에 속한다.
- 탐색을 멈추는 시점은 평가 기준의 시점에 속한다.
- 불필요한 component를 만들지 않거나 제거하는 판단은 별도 기술 글 후보가 될 수 있다.
- 사용자 정정 뒤 멈추는 경계는 self-check의 발동·종료 조건에 가깝다.

## 공개 자료와의 위치

아래 자료는 2026-07-20 조사 당시 확보한 외부 위치 확인용 index다. 이번 갱신에서는 웹 내용을 새로 검증하지 않았다. 실제 초안에 인용할 때 최신 문서와 접근일을 다시 확인한다.

- OpenAI, [Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/) (2026-02-11, 2026-07-20 접근)
  - 거대한 instruction 한 파일보다 짧은 map과 구조화된 docs를 강조한다. current 글에서 “map, not manual”의 외부 접점으로만 쓴다.
- Anthropic, [Harness design for long-running application development](https://www.anthropic.com/engineering/harness-design-long-running-apps) (2026-03-24, 2026-07-20 접근)
  - 별도 evaluator도 합리화와 calibration 문제를 보였다는 설명이 독립 판별의 외부 비교점이다.
- Anthropic, [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) (2025-09-29, 2026-07-20 접근)
  - just-in-time context와 progressive disclosure는 current가 모든 내용을 직접 품지 않고 원천으로 route하는 이유를 설명할 때 연결한다.
- OpenAI, [Separating signal from noise in coding evaluations](https://openai.com/index/separating-signal-from-noise-coding-evaluations/) (2026-07-08, 2026-07-20 접근)
  - test와 eval 자체가 잘못된 계약을 담을 수 있다는 산업 사례로만 사용한다.
- Anthropic, [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) (2026-01-09, 2026-07-20 접근)
  - outcome과 transcript를 나눠 보고 judge도 사람 기준에 맞춰 보정해야 한다는 배경이다.
- Shankar et al., [Who Validates the Validators?](https://people.eecs.berkeley.edu/~bjoern/papers/shankar-validators-uist2024.pdf) (UIST 2024, 2026-07-20 접근)
  - grading 중 criteria가 변하는 문제와 validator calibration의 기반 자료다.
- [The Self-Correction Illusion: LLMs Correct Others but Not Themselves](https://arxiv.org/abs/2606.05976) (2026 preprint, 2026-07-20 접근)
  - bounded reasoning task의 preprint이므로 software workflow와 self-check 효과 증명으로 확대하지 않는다.
- [Quantifying and Mitigating Self-Preference Bias of LLM Judges](https://arxiv.org/abs/2604.22891) (2026 preprint, 2026-07-20 접근)
  - judge도 평가 대상이라는 보조 자료다. 같은 모델이면 독립이 아니라는 단순 주장에 쓰지 않는다.

## 합치지 말아야 할 경계

- current, 독립 판별, 평가 기준의 시점, self-check, artifact/core를 한 편의 역량 목록으로 합치지 않는다.
- self-check와 독립 판별을 같은 것으로 쓰지 않는다. self-check는 main이 자기 개입을 원인에 넣는 일이고, 독립 판별은 main과 오류 상관을 끊도록 별도 입력과 권한을 설계하는 일이다.
- 독립 판별과 LLM judge를 같은 것으로 쓰지 않는다. LLM judge는 특정 pipeline의 판정 component일 수 있지만 독립 판별은 원자료 접근·질문 수정·권한 분리까지 포함하는 작업 계약이다.
- current와 “문서를 많이 써야 한다”를 합치지 않는다. current는 상세 내용을 줄이고 원천으로 route해야 작동한다.
- 평가 기준의 시점과 “근거를 나중에 보자”를 합치지 않는다. 중간에도 주장별 근거는 엄격히 본다.
- reviewer가 기술적으로 옳다는 사실과 reviewer artifact가 제품에 필요하다는 판단을 합치지 않는다.
- artifact를 폐기했다는 사실과 기능 core의 사용자 가치가 증명됐다는 주장을 합치지 않는다.

## 공개 전 다시 확인할 주장

### current

- 21개 reachable commit, 18개 current 변경, 18개 version의 단일 active marker, 13회 marker 전환이 같은 감사 범위를 가리키는지 다시 확인한다.
- 147→46줄과 82줄·17,381 bytes→47줄·6,943 bytes는 서로 다른 Cofathon 교정 시점임을 구분한다.
- AX terminal event 누락을 current 전체의 무용성으로 일반화하지 않는다.
- 사용자 경험은 1인칭 운영 경험으로 쓰고 생산성·성능의 보편 효과로 바꾸지 않는다.

### 독립 판별

- 9→15 test는 AX Loop 01 checkpoint다.
- fresh 판별이 찾은 문제는 test suite가 무능해서가 아니라 fixture와 계약 범위가 만든 blind spot이었다고 쓴다.
- 판별자가 받은 context와 blind 경계가 사건마다 달랐음을 숨기지 않는다.
- Tripproof 6월 25일 진단, 6월 29~30일 relation 실험, 7월 2일 entailment 실험의 시간순을 지킨다.

### 평가 기준의 시점

- 15개 후보가 “전부 같았다”는 제목 표현은 사용자 체감의 hook이다. 본문에서는 rubric 반향, 실제 장면 부재, 조기 정규화라는 확인된 원인을 구체적으로 쓴다.
- 판단 순서 교정 뒤 최종 결과 품질이 상승했다고 말하지 않는다.
- process/31은 작동 검증 전 운영 계약이므로 성공 근거로 쓰지 않는다.

### AI self-check

- 진단이 정밀해졌다는 관찰과 다음 행동이 달라졌다는 사실을 나눈다.
- 과잉 발동·반복 위반 사례의 원천 위치를 초안 작성 전에 다시 연결한다.
- 2026 preprint를 로컬 workflow의 효과 증명으로 쓰지 않는다.

### artifact/core

- process/36 시점의 보존 core와 process/37·38 이후 workflow 변경을 같은 순간처럼 쓰지 않는다.
- 현재 test 수는 기술 계약·회귀 범위이며 사용자 가치 지표가 아니다.
- MCP 전사에서 빠진 7개 사실과 raw envelope 경계는 공개 가능한 재현 자료를 만들기 전 원천에서 다시 확인한다.
- Tripproof meta-stage의 줄 수·파일 수·기간은 공개 전에 Git 기준으로 재계수한다.
