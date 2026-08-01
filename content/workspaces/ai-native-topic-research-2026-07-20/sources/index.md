# Sources

이 문서는 현재 작업이 다시 확인할 직접 원천과 재접근 경로를 모은다.

- 원천은 사건의 순서, 실제 구현·실행, 당시 판단, 사용자 정정을 확인할 때 연다.
- 이 작업에서 만든 해석·후보·review·판정 기록은 `process/`가 소유한다.
- 원 프로젝트 안의 `context/process/`, `docs/decisions/`는 이름과 무관하게 당시 작성된 사건 기록이므로 여기서는 원천으로 취급한다.
- 현재 초안과 이전 초안은 source가 아니라 각각 `src/`와 `process/`에 둔다.
- 원천 하나만으로 인과나 효과를 단정하지 않는다. 각 항목의 지원 범위를 넘는 주장은 다른 원천과 대조한다.

## Current 글 생성 계보와 운영

- [Current 글의 생성 계보와 실제 운영 원천](./current-origin-and-operation.md) — 해커톤 전부터 있던 context 문제, 유튜버 Alex의 ‘AX 인재전쟁’ 작업에서 본 scaffolding, 사용자가 `전체 지도 + cursor 하나`로 변형한 최초 artifact, 실제 재진입·합의 복구·후보 수렴 장면, 이후 Cofathon의 재사용·축소, recency·terminal gap을 한곳에서 다시 확인한다. 원고 구간별 재진입 순서와 아직 본문에 쓰지 않은 보강 재료도 이 문서가 안내한다.
- 사용자의 현재 기억은 이 글의 생성 이유와 실제 사용 경험을 확인하는 1인칭 원천이다. 정확한 발견 시점이 남지 않은 부분은 기억과 artifact가 일치하는 범위까지만 쓰며, AX 해커톤 참여와 Alex 사례를 하나의 현장 장면으로 합치지 않는다.

## AI self-check 생성 계보와 운영

- [AI self-check의 생성 계보와 실제 운영 원천](./ai-self-check-origin-and-operation.md) — 2026-05-21 `더 근본적으로 AI 관점으로`라는 정정을 더 큰 일반론으로 오해한 직접 발단, 최초 inline skill patch, fresh auditor로의 변화, 원문 범위 pull과 호출 문턱 축소, 진단과 행동 변화가 어긋난 후속 사례, 공개 글 후보가 된 이유를 한곳에서 다시 확인한다.
- 최초 artifact의 권위 원천은 2026-05-21 원본 Codex rollout의 `apply_patch`다. 2026-07-06 Git snapshot과 현재 global skill은 이후 계약이므로 최초 장면에 소급하지 않는다.
- 사용자의 현재 기억은 inline에서 fresh로 바꾼 정확한 계기와 공개 글로 쓰고 싶었던 개인적 이유를 보강할 1인칭 원천이다. artifact를 보고 과거 동기와 감정을 새로 만들지 않는다.

## 독립 판별 생성 계보와 운영

- [독립 판별의 생성 계보와 실제 운영 원천](./independent-review-origin-and-operation.md) — 기존 artifact가 판단을 고정한 문제, 조사 결과가 새 권위가 된 main 회수 실패, 닫힌 입력을 상속한 judge 반례, 사용자가 제안한 worker–main–fresh verifier–사용자 교정 loop, AX의 실제 구현 판별, Cofathon의 상충 판정과 후속 구현, 전역 reference로 정리된 배경을 연결한다.
- `9개 test → 15개 test`는 글의 기원이 아니라 앞서 설계한 역할 계약이 실제 구현에서 작동한 장면이다. 독립성은 agent 수나 model 차이가 아니라 입력·원자료 접근·질문 수정권·write 권한·완료 권한과 main 회수 방식으로 판정한다.
- `제3판별자`라는 표현을 처음 쓴 시점과 AX 이전부터 일반 작업 방식으로 의식했는지는 현재 원천으로 확정하지 않는다. 사용자의 기억을 받은 뒤 글의 기원 문장을 닫는다.

## AX 인재전쟁 / 마이리얼트립 작업본

원본 저장소: [전체-작업본](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본)

### Current와 active contract

- [current.md](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/current.md) — 전체 지도, 단일 cursor, 세부 권위 원천으로 뻗는 현재 상태 문서. `current`의 역할과 실제 구조를 확인할 수 있지만 단독 효과는 증명하지 않는다.
- [분리 전 loop goal](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/25-loop-01-goal.md), [분리 후 active contract](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/engineering/01-loop-01-goal.md) — 현재 완료 조건과 선택·실행 이력의 소유권을 분리한 변화. commit `052831b`.
- [current 기반 설문 재작성](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/29-questionnaire-rebuild-from-current.md), [최종 검증](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/30-questionnaire-final-verification.md), [후속 제출 사건](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/31-submission-form-correction-and-upload-failure.md) — 프로젝트 전체 질문과 최신 구현 질문의 시간축을 다시 나눈 사건과 current에 반영되지 않은 마지막 외부 사건을 확인한다. 복구를 `current` 단독 효과로 돌릴 수는 없다.
- [current·gate 감사](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/20-작업과정-하네스-분석/02-독립조사/git/08-current-and-gate-audit.md) — current 변경과 gate 전환을 Git으로 후대 대조한 자료. 구조 변화와 누락을 지원하지만 당시 원문보다 우선하지 않는다.

### 독립 판별과 회수

- [첫 구현과 fresh 미통과](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/26-loop-01-first-implementation-and-operations-retro.md) — 9개 test method 통과 뒤 설치형 자연어 E2E, fixture·source 모순, type·scope 문제가 드러난 사건. commit `61981aa`.
- [교정 cycle과 재실행](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/27-loop-01-correction-cycle.md) — test method 15개, 별도 validator·CLI, 설치형 자연어 E2E와 짧은 회귀 판별까지 다시 닫은 과정. commit `0bdb843`.
- Git snapshot `61981aa:src/tests/test_tripproof.py`, `0bdb843:src/tests/test_tripproof.py` — 9개와 15개의 정확한 대상·assertion을 확인하는 코드 원천. 숫자만으로 품질 향상을 주장할 수는 없다.

### 판단 순서와 output 비교

- [독립 second pass](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/14-integrated-criteria-and-independent-second-pass.md), [첫 후보판](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/problem/01-candidates.md) — 기존 후보를 고치는 것과 별도 비교 단위를 만드는 것의 차이를 확인한다. second pass는 완전 blind가 아니다.
- [solution pass](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/17-performance-led-solution-passes.md), [구체화 결과](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/solution/02-grounded-concretization.md) — 문제 후보 3개에서 solution 3개씩을 펼쳐 총 9개를 만든 과정.
- [output-first 비교](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/19-output-first-comparison.md), [상태 변화 기록](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/20-output-first-interactive-demo.md), [HTML artifact](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/solution/05-output-first-interactive-demo.html), [최종 선택](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/21-prioritization-and-final-choice.md) — `3 problems → 9 solutions → 3 outputs → 상태 비교 → 선택`의 실제 artifact와 순서를 지원한다. 이 순서가 결과 품질을 높였다는 대조 실험은 아니다.

### Self-check와 과교정

- [회사 자료 가중치와 객관성](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/07-company-weight-and-objectivity.md), [두 번째 종합](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/08-second-research-synthesis.md), [논의와 self-check](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/09-discussion-and-ai-self-check.md) — 함께 보던 두 판단이 순차 구조로 과교정됐다가 역할 관계를 복구한 사건을 지원한다.
- commit `7c1fa470e08cfb7fbc33cc4bcdbd26d764d6b95d` — 위 사건의 직접 log snapshot. 보존되지 않은 중간 답변은 복원하지 않는다.

### 비공개 raw log

- [주 작업 log](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/logs/codex/019f4afd-80f9-7bc1-ba6f-99f4281c0607.jsonl), [설문 log](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/logs/codex/019f4c70-6484-7d53-80dd-4315e055d864.jsonl), [설치형 E2E log](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/logs/codex/019f4c73-cfe6-7442-9174-86c3dc05b4e6.jsonl) — 발화와 실행 순서를 확인하는 비공개 원문. 코드 변화와 효과는 Git·test 원천으로 별도 확인한다.

## Tripproof

원본 저장소: [Tripproof main repo](/Users/hammyeong-yeon/Desktop/10_work/tripproof)

- [product-flow drift](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/implementation-notes/2026-06-09-spec-driven-product-flow-drift/index.md) — raw `facts[]` 표시가 더 작은 경로로 제안되며 사용자 결과가 사라진 사건. 구현 전 제안이지 배포 실패가 아니다. commit `6adc709`.
- [evidence-backed facts spec](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/specs/2026-06-06-accommodation-checkin-agoda-fukuoka/03-evidence-backed-facts.md) — retrieval 후보에서 상태·값·근거가 붙은 답변으로 이어지는 계약과 실제 구현 범위를 확인한다. commits `02bc3d7`, `54f5924`.
- [판단·test 강제 decision](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/decisions/2026-06-10-spec-driven-judgment-and-test-enforcement/index.md) — metamorphic·grounding·routing test와 호출자 없는 fact path 제거의 판단 근거. commits `50ad14f`, `4ec59dd`, `2eaefc9`.
- [LLM answer self-certification 재정의](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/decisions/2026-06-25-llm-answer-self-certification-reframe/index.md) — 답변 생성과 의미 확정 권한을 나눈 이유를 지원한다.
- [conditional value entailment judgment](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/specs/2026-07-01-answer-pipeline-substrate-redesign/03-conditional-value-entailment-judgment.md) — 별도 judge도 앞 단계가 누락하거나 잘못 고른 닫힌 입력 밖을 자동 복구하지 못한 반례. commit `a8ca41c`.
- [work log](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/work-log.md)와 저장소 Git — 날짜, 실제 diff, 제안과 구현의 구분을 확인하는 시간축. 긴 conversation raw는 사건 순서가 다시 쟁점이 될 때만 연다.

## ai-note raw

원본 자료실: [ai-note](/Users/hammyeong-yeon/Desktop/10_work/ai-note)

- [LLM grounding demo drift](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-05-llm-grounding-demo-drift/raw.md) — 불확실성을 통제하다 실제 제품 작용을 demo 밖으로 밀어낸 정정 순서. 직접 발췌와 후대 설명이 섞여 있어 구현 사실은 Tripproof 원천으로 대조한다.
- [AI self-check와 principle calibration 발단](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-21-ai-self-check-principle-calibration/raw.md) — 원본 자료의 존재를 역추적하라는 사용자 정정과 self-check 문제의식. 중간 AI 답변 전문이 없어 그 문구를 재구성할 수 없다. commit `1bea2dd426d2a1c7c0e677f2818f6459ed0e25cc`.
- [forward bias와 impact 축](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-07-09-harness-forward-bias-impact-axis/raw.md) — 같은 전진 방향을 사용자가 세 차례 좁힌 장면과 지침 변경. 장기 재발 감소는 지원하지 않는다. commit `8c61f5561cc116899356f4a9385393fe2cb55f8b`.
- [analysis value discovery stance](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-07-01-analysis-value-discovery-stance/raw.md) — 결함 탐지에만 매몰된 분석과 가능성 발굴을 함께 하는 분석의 차이. 판단 순서 글의 보조 원천이지 결과 우월성 증거는 아니다.
- [source-first orchestration](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-12-source-first-orchestration/raw.md), [fresh auditor 경계](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-12-subagent-fresh-auditor-boundaries/raw.md) — 원자료보다 파생 해석이 먼저 권위가 된 문제와 독립 생성·검증·main 회수 역할 구분을 지원한다.

## Cofathon 보조 비교 원천

원본 저장소: [Cofathon](/Users/hammyeong-yeon/Desktop/10_work/cofathon)

- [current.md](/Users/hammyeong-yeon/Desktop/10_work/cofathon/context/current.md), [지도 우선 교정](/Users/hammyeong-yeon/Desktop/10_work/cofathon/context/process/02-current-map-first-correction.md), [재진입·문서 소유권 정리](/Users/hammyeong-yeon/Desktop/10_work/cofathon/context/process/34-refine-session-reentry-and-instruction-ownership.md) — 전체 지도, 현재 cursor, 재진입과 문서 소유권의 보조 비교 사례. AX 사건의 효과를 증명하는 대조군은 아니다.
- [후보 탐색 판단 순서](/Users/hammyeong-yeon/Desktop/10_work/cofathon/context/core/candidate-exploration-judgment-order.md) — 발산, 개별 주장 검증, 후보 수렴을 다른 시점의 판단으로 나눈 현재 계약. 결과 우월성보다 판단 역할 비교를 지원한다.

## 공개 배경 자료

다음 자료는 2026-07-20에 수집한 공개 참고 자료다. 장기 작업의 context 관리와 독립 평가를 설명하는 배경에는 사용할 수 있지만, 위 개인 프로젝트 사건의 직접 증거는 아니다.

- OpenAI, [Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/)
- Anthropic, [Harness design for long-running application development](https://www.anthropic.com/engineering/harness-design-long-running-apps)
- Anthropic, [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- OpenAI, [Separating signal from noise in coding evaluations](https://openai.com/index/separating-signal-from-noise-coding-evaluations/)
- Anthropic, [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
- Shankar et al., [Who Validates the Validators?](https://people.eecs.berkeley.edu/~bjoern/papers/shankar-validators-uist2024.pdf)
- [The Self-Correction Illusion: LLMs Correct Others but Not Themselves](https://arxiv.org/abs/2606.05976)
- [Quantifying and Mitigating Self-Preference Bias of LLM Judges](https://arxiv.org/abs/2604.22891)

전체 조사 범위와 긴 후보별 원천 색인은 [source-first 재조사](../process/candidates/03-source-first-reanalysis.md)에 보존한다.
