---
작성일: 2026-08-01
성격: 독립 판별 글의 생성 계보, 역할 계약, 실제 운영과 글 후보화 배경을 확인하는 직접 원천 묶음
공개상태: 내부 작업 문서
---

# 독립 판별의 생성 계보와 실제 운영 원천

이 문서는 `src/independent-review-and-recovery.md`의 `9개 test → 15개 test` 장면을 보강하는 자료가 아니다. 왜 별도 판별 역할이 필요해졌는지, fresh한 AI를 하나 더 부르는 것과 무엇이 다른지, 사용자가 구현 loop에서 어떤 권한을 나눴는지, 판별 뒤 main의 회수가 왜 같은 만큼 중요해졌는지, 이 경험이 왜 글 후보가 됐는지를 복원한다.

현재 확인된 원천으로 `제3판별자`라는 표현을 처음 쓴 정확한 날짜는 확정하지 않는다. 대신 장치 이름보다 먼저 형성된 문제와 역할 계약의 계보를 보존한다.

## 출발점 — 검토자가 더 필요한 것이 아니라 오류 상관을 끊어야 했다

독립 판별의 앞에는 서로 다른 종류의 실패가 있었다.

- 같은 main이 자기 판단을 inline으로 점검하면 기존 전제를 더 정교하게 반복할 수 있었다.
- 기존 조사결과 문서를 계속 수정하면 새 판단도 그 문서의 프레임에 묶였다.
- 여러 조사팀의 결과가 좋아도 main이 그것을 기존 합의를 보완하는 재료가 아니라 새 판단 권위로 승격할 수 있었다.
- 생성 LLM과 판정 LLM을 나눠도 판정자가 생성자가 고른 닫힌 입력만 받으면 같은 누락을 상속했다.

따라서 문제는 `AI를 몇 명 쓰는가`보다 아래 권한과 입력을 어떻게 나누는가였다.

- 누가 구현하거나 후보를 만드는가.
- 누가 원자료와 artifact를 직접 볼 수 있는가.
- 누가 main이 정한 질문과 증거 범위를 기각할 수 있는가.
- 누가 파일을 고칠 수 있는가.
- 누가 완료를 선언하고 다음 방향을 선택하는가.

이 배경은 하나의 기원 장면이 아니라 5월 21일부터 7월 중순까지 쌓인 설계 전제다.

## 앞선 전제 1 — 현재 맥락과 기존 artifact가 판정을 고정할 수 있다

[fresh doc existing anchor](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-12-fresh-doc-existing-anchor/raw.md)에서 사용자는 기존 조사결과 문서를 고치는 방식이 계속 그 프레임에 묶인다고 느꼈다. 새 문서는 기존 결과물을 보지 않고 현재 코드와 별도 개발 포인트에서 다시 시작하게 했다.

[source-first orchestration](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-12-source-first-orchestration/raw.md)에서는 원자료보다 파생 해석과 분업 구조가 먼저 권위를 얻는 문제를 다뤘다. 독립성은 새 문서나 새 agent라는 외형만으로 생기지 않고, 무엇을 먼저 읽고 무엇을 입력에서 제외하는지가 판단을 바꾼다는 전제다.

[fresh auditor 경계](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-12-subagent-fresh-auditor-boundaries/raw.md)는 같은 맥락 안의 inline 자기점검 대신 별도 report-only 관점을 실제 사용한 첫 확인 가능 사례다. 다만 이 시점의 목적은 현재 판단을 다시 보는 self-check였고, 아직 구현 loop의 일반 계약으로 확정된 것은 아니다.

## 앞선 전제 2 — 좋은 조사 결과도 main이 회수할 때 새 권력이 된다

[delegated research recovery drift](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-22-delegated-research-recovery-drift/raw.md)에서 사용자는 여러 팀에게 문서·코드·Git을 시간순으로 대조하고 충돌을 섣불리 닫지 말라고 지시했다. 조사 자체는 잘 진행됐지만, main은 결과를 기존 engineering 뼈대의 보강 재료로 쓰지 않고 조사팀의 분류와 용어로 뼈대 자체를 다시 심판했다.

이 사건이 남긴 것은 `좋은 reviewer를 쓰자`가 아니다.

- 조사·판별 품질과 main의 회수 품질은 다르다.
- reviewer 결과는 최종 사용자 결정이 아니라 원자료와 다시 대조할 report다.
- main은 자기 결론을 지키는 역할도, reviewer 결론을 실행하는 역할도 아니다. 목표·원자료·사용자 기준을 다시 맞춰 채택·수정·기각해야 한다.

이 `recovery` 문제는 7월의 AX 구현 장면 뒤에 붙인 보조 교훈이 아니라 독립 판별 역할을 설계하게 만든 선행 배경이다.

## 앞선 전제 3 — 판정자를 분리해도 입력이 닫혀 있으면 같은 실패를 물려받는다

[LLM 답변 자기-인증 재정의](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/decisions/2026-06-25-llm-answer-self-certification-reframe/index.md)는 답변 생성과 상태 인증을 같은 호출이 맡아 `supported` 자기선언이 제품 상태로 올라간 실패를 기록한다. 여기서 생성과 판정의 권한을 나누는 방향이 생겼다.

그러나 [조건부 값 entailment 판정](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/specs/2026-07-01-answer-pipeline-substrate-redesign/03-conditional-value-entailment-judgment.md)에서는 별도 judge도 답변이 이미 고른 값·근거와 후보 unit이라는 닫힌 입력만 받았다. 판정은 주어진 입력 안에서는 옳게 작동했지만, 앞 단계의 값 미추출, 조건과 값 뒤바꿈, 표현별 retrieval 누락을 복구하지 못했다. 한 paraphrase는 `supported ×3`으로 후퇴했고 깨끗한 문항의 과잉강등도 생겼다.

이 반례는 독립 판별이 `다른 LLM을 붙이는 것`이 아니라는 설계 근거다. 판별자가 원자료를 직접 보고 main이나 생성자의 입력 범위를 다시 열 수 없다면, 역할 이름만 달라도 오류 상관은 남는다.

## 사용자가 구현 loop로 명시한 순간 — 2026-07-10 AX

[AX 주 작업 raw log](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/logs/codex/019f4afd-80f9-7bc1-ba6f-99f4281c0607.jsonl)의 2026-07-10 22:31:35 KST 사용자 발화는 구현 loop의 역할을 다음처럼 제안했다.

> loop 01의 기준을 만족시키는 goal을 정해 개발한다. 서브에게 구현을 시키고 main은 계속 감시한다. 완료되거나 적절히 됐다고 판단되면 깨끗한 fresh 검사자가 결과와 기준, 개선점을 보고한다. 그다음 사용자와 논의해 교정하고 다시 작업한다.

같은 대화에서 사용자는 worker 구현과 fresh 검사가 진행되는 동안 결과를 자신에게도 브리핑하라고 요청했다.

이 발화가 나눈 역할은 다음과 같다.

- worker: 제한된 source 책임을 가지고 구현과 첫 실행 결과를 만든다.
- main: Goal과 acceptance를 유지하고 진행 상태를 관찰하며 통합한다.
- fresh verifier: worker의 설명이나 main의 완료 선언을 받아쓰지 않고 결과물·원자료·실행 증거를 대조해 report만 반환한다.
- 사용자: 보고를 받고 목표와 판단 기준을 교정하며 최종 방향을 정한다.

따라서 AX의 `9개 test` 사건은 독립 판별 아이디어가 우연히 성공해 생긴 기원이 아니다. 사용자가 먼저 이 작업 계약을 제안했고, 이후 실제 구현에서 그 계약이 어떤 공백을 찾는지 확인한 운영 사례다.

## AX 운영 — 구현자가 만든 초록 세계 밖을 다시 본다

[첫 구현과 fresh 미통과](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/26-loop-01-first-implementation-and-operations-retro.md)는 plugin scaffold, Python 상태 엔진, fixture, test method 9개, validator와 CLI가 통과한 상태를 기록한다. 그러나 fresh verifier는 다음을 다시 열었다.

- 실제 Codex에 설치한 뒤 새 작업에서 자연어로 처음부터 끝까지 실행한 증거가 없었다.
- 공개 상세에서 이미 닫힌 티켓 절차를 fixture는 다시 미확정 질문으로 만들었다.
- 문자열 `"false"`, 아동별 답변 scope, 상반 seller reply와 잘못된 revision 처리에 결함이 남았다.

[교정 cycle](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/27-loop-01-correction-cycle.md)에서는 test method 15개, 별도 validator·CLI, 실제 설치와 자연어 E2E, 상태 전이, 제한된 fresh 회귀까지 다시 닫았다.

이 사건이 지원하는 주장은 `독립 AI가 test보다 낫다`가 아니다.

- fixture test는 구현자가 정의한 계약 안의 일관성을 확인했다.
- verifier는 그 계약이 공개 source, 실제 설치 환경, 자연어 사용 흐름과 맞는지 다시 물었다.
- 교정은 verifier가 직접 구현한 것이 아니라 main과 worker가 원자료를 대조해 반영했다.
- 최종 fresh 검사는 설치·자연어 E2E·상태 정확성·치명 결함이라는 제한된 범위만 봤다.

## 독립 판별자는 자동 정답이 아니다

### Cofathon — 같은 후보를 본 두 판별자가 크게 다르게 갈랐다

[후보 생성과 판별 runtime](/Users/hammyeong-yeon/Desktop/10_work/cofathon/context/process/01-candidate-generation-and-runtime.md)에서 main은 후보 10개를 모두 통과로 봤다. 첫 fresh 검사는 `통과 2 / 조건부 7 / 탈락 1`, 다른 blind 검사는 `통과 7 / 조건부 2 / 탈락 1`로 판정했다.

두 결과의 차이는 fresh 또는 blind라는 이름이 결론의 권위를 보장하지 않음을 보여 준다. main은 공통점과 차이를 다시 보고, `앞으로 만들 수 있는 증거`와 `이미 확보된 증거`를 구분하는 첫 번째 보수적 판정을 현재판으로 채택했다. 두 번째 결과는 조건부 후보가 승격될 가능성을 보여 주는 반증으로 보존했다.

### Cofathon 구현 — report를 원자료와 재판정하고 test를 늘렸다

[구매 검토 세로 슬라이스 구현 기록](/Users/hammyeong-yeon/Desktop/10_work/cofathon/context/engineering/01-purchase-decision-slice/implementation.md)에서는 작업자, 계약 검토자, main, 독립 판별자의 역할을 나눴다. main은 독립 보고를 원자료와 source에 다시 대조해 실제 결함만 반영했고 test는 14개에서 17개, 이후 replay와 원자 저장 경계 보강으로 19개가 됐다.

이후에도 실제 사용자 입력과 baseline 비교가 없다는 제품 가치 경계는 별도로 남았다. 기술 계약이 더 단단해진 것과 사용자 가치가 증명된 것은 다른 완료 조건이다.

## 2026-07-14 — 역할 설계의 공통 감각으로 정리됐다

`ai-harness-history` commit `6af78e6`에서 사용자는 fresh 판별자가 main이 포장한 사건을 검토하는 것이 아니라 발동 발화와 직전 교환에서 시작해 필요한 원문을 스스로 추적해야 한다고 정정했다. 이때 독립 판별 설계의 핵심은 파일·agent 수가 아니라 판단권 배분으로 정리됐다.

같은 날 commit `0f930e7`은 이를 새 실행 skill이 아니라 `~/.claude/references/independent-review.md`라는 공유 reference로 옮겼다. 여러 verifier·auditor·reviewer·advisor가 필요할 때 공통으로 읽되, 매 작업에 자동 발동하는 workflow로 만들지 않기 위해서였다.

현재 계보에서 독립 판별의 최소 조건은 다음과 같다.

- 결과물뿐 아니라 필요한 원자료와 실행 증거에 접근한다.
- main의 요약과 예상 결론을 정답처럼 받지 않는다.
- 필요하면 질문, 평가 범위, 증거 범위를 다시 정할 수 있다.
- report-only로 반환하며 source 수정과 완료 선언을 맡지 않는다.
- main은 보고를 원자료와 대조해 채택·수정·기각하고, Goal 의미가 바뀌면 사용자와 다시 합의한다.

모든 판별자가 같은 배치와 입력을 가져야 한다는 고정 규칙은 아니다. 목적이 code regression인지, 문제 정의 재검토인지, 독자 반응인지에 따라 필요한 독립성이 다르다.

## 왜 글 후보가 됐나

[선정 기준과 결정 변화](../process/candidates/01-criteria-and-decision-history.md)는 사용자가 제3판별자를 좋은 예로 든 이유를 `자기 생각과 실제 적용 사례를 함께 비출 수 있다`는 데서 찾는다. 동시에 제3판별자는 전체 탐색의 목표가 아니라 하나의 예시라고 명시한다.

[다섯 후보 source card](../process/candidates/02-topic-candidates.md)는 독립 판별 글의 강점을 다음처럼 기록한다.

- `test 9개가 초록인데 제품은 아직 틀렸다`는 개발자가 빠르게 자기 문제로 알아볼 수 있는 입구가 있다.
- code, fixture, test, 자연어 E2E, commit 전후가 있어 기술 사건을 구체적으로 복원할 수 있다.
- 사용자 자신이 worker–main–fresh verifier–사용자 교정 loop를 제안한 직접 발화가 있다.
- AX 성공 장면뿐 아니라 Cofathon 판정 충돌과 Tripproof 닫힌 judge라는 반례가 있다.
- reader가 가져갈 것은 reviewer 수가 아니라 입력, 원자료 접근, 질문 수정권, write 권한, 완료 권한, main 회수 계약을 보는 질문이다.

이 후보가 우선으로 올라온 이유는 모든 AI-native 작업을 가장 잘 대표해서가 아니라 읽기 쉬운 기술 입구와 실제 운영 증거가 준비돼 있었기 때문이다. `9→15` 장면만 깊게 쓰면 입구는 선명해져도 사용자가 왜 이 구조를 만들었고 어떤 실패를 피하려 했는지는 사라진다.

## 원고 재진입 지도

- 독립 판별 이전의 문제: 5월 21일 self-check 발단 → 6월 12일 existing anchor·source-first·fresh auditor → 6월 22일 recovery drift.
- 판정자 분리의 한계: 6월 25일 self-certification decision → 7월 2일 closed-input entailment judge 결과.
- 사용자가 제안한 작업 계약: AX raw log의 2026-07-10 22:31:35 KST 발화와 후속 브리핑 요청.
- 실제 구현 판별: AX process 26 → process 27 → commit `61981aa..0bdb843`의 code·test.
- 판별 충돌과 main 판정: Cofathon process 01.
- 후속 구현 운영: Cofathon purchase-decision-slice implementation.
- 공통 설계 감각 정리: `ai-harness-history`의 `6af78e6` → `0f930e7`.
- 공개 글 후보가 된 이유: 7월 candidate decision history → topic candidate card → 7월 23일 first-pass와 이후 draft 계보.

## 아직 비어 있는 기억과 원천

- 사용자가 `제3판별자`라는 표현을 처음 쓴 대화와 날짜.
- AX 이전부터 독립 판별을 일반 작업 방식으로 의식하고 있었는지, AX에서 처음 구현 loop로 묶였는지.
- AX loop를 제안할 때 앞선 self-check와 main recovery 실패를 의식적으로 연결했는지.
- 이 글을 쓰고 싶었던 가장 큰 개인적 이유가 기술적 반전, 자기 판단 방식, 다른 개발자에게 필요한 문제 중 무엇이었는지.

이 빈칸은 `9개 test`의 강한 장면으로 대신하지 않는다. 최종 중심과 첫 장면을 고르기 전에 사용자의 기억을 1인칭 원천으로 추가한다.

## 주장 상한

- 서로 다른 agent나 model을 썼다는 사실만으로 독립성을 주장하지 않는다.
- fresh, blind, clean-room이라는 이름을 실제 정보 노출과 원자료 접근 확인 없이 사용하지 않는다.
- AX 한 번의 `9→15` 변화를 보편적 품질 향상이나 reviewer 우월성으로 쓰지 않는다.
- verifier의 판정을 자동 정답으로 쓰지 않는다. Cofathon의 상충 판정과 main recovery가 같은 글 안의 경계다.
- 별도 judge가 생성과 분리됐다는 사실만으로 실패 상관이 끊겼다고 쓰지 않는다.
- 비공개 log와 내부 경로는 공개 원고에 그대로 옮기지 않는다. 역할, 입력, 실행 변화가 남도록 다시 쓴다.
