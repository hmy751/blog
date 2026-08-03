---
작성일: 2026-08-01
갱신일: 2026-08-03
성격: AI self-check 글의 생성 계보, 역할 변화, 글 후보화 배경을 확인하는 직접 원천 묶음
공개상태: 내부 작업 문서
---

# AI self-check의 생성 계보와 실제 운영 원천

이 문서는 `src/ai-self-check.md`의 장면을 고르기 위한 목록이 아니다. `AI가 잘못을 인정했다`보다 앞에 있던 문제, 최초 `ai-self-check` artifact가 맡은 역할, inline 점검에서 fresh auditor로 바뀐 과정, 사용 뒤 드러난 한계, 이 경험이 왜 글 후보가 됐는지를 다시 확인하는 재진입 지도다.

현재 원고와 2026-07-29 개선 review는 이 계보 전체를 입력으로 받지 않았다. 따라서 그 review가 고른 장면과 수정안은 이 문서를 읽은 뒤 다시 판정하며, 최초 사건을 현재 skill 계약에 맞춰 소급해서 쓰지 않는다.

## 직접 발단 — ‘더 근본적’이라는 말을 더 큰 일반론으로 오해했다

2026-05-21 사용자는 과제 아카이브의 `00_received` 폴더가 보이지 않는 이유를 물었다. AI는 철자와 폴더 생성 기준을 설명했다. 사용자는 재구성된 결과물이 있다면 그것을 만든 원본 또는 원본에 가까운 자료도 있었을 것이라고 지적했고, 다른 과제까지 다시 찾아보게 했다.

결과물에서 입력을 거슬러 찾자 TVING 과제에서는 원본 HEIC 31개와 변환본·문제 이미지가 나와 `00_received`를 새로 만들었다. 사용자가 다른 과제도 모두 같은 방식으로 보라고 하자 AI는 세 곳을 더 고쳤다고 보고했다. Toss Next, Specter, Gangnam Unni 과제에서 각각 screenshot, 과제 안내 README, 원본 캡처를 받은 자료 층으로 새로 분류했다. 공개 원고의 `한 과제의 원본 이미지가 나왔고, 전체를 다시 보니 세 곳의 분류도 더 고쳤다`는 문장은 이 원본 rollout의 실행 보고 범위 안에 있다.

이후 사용자가 이 패턴을 문서 원칙으로 남기려 하며 두 차례 `더 근본적으로 AI 관점으로` 생각해 보라고 했을 때, AI는 현재 과제의 실제 분류 문제보다 provenance와 출처 과확정 같은 상위 문서화 일반론으로 올라갔다. AI가 만든 `회사에서 준 원본 이미지처럼 근거 없이 출처를 확정한다`는 경계를 사용자가 어디서 나온 생각인지 묻자, AI는 그것이 이 과제 현실보다 자기 문서화 프레임을 과하게 적용한 결과라고 인정했다.

이 사건 뒤 사용자는 문제를 다음처럼 정의했다. 아래 발췌는 2026-05-21 원본 rollout과 같은 날 보존한 ai-note에서 확인한다.

> AI가 종종 근본적인 문제를 찾으려고 하지 않고 표면적인 문제를 찾으려고 혈안이 될 때가 있다.

> AI 관점으로 내 입장에서 해결해야 되는데 정작 AI인 자기 자신은 그 포인트를 안 잡고, ‘근본적인’이라는 말 자체에도 포커스를 오해한 것 같다.

여기서 생긴 최초 문제는 `AI가 답을 틀렸다`가 아니다.

- 표면 설명에서 벗어나라는 정정을 받았지만, AI는 자기 개입을 원인 안에 넣는 대신 더 추상적인 외부 일반론으로 이동했다.
- 현재 작업의 판단 위치를 다시 봐야 했는데, `더 근본적`을 `더 큰 이론`으로 번역했다.
- 사용자 문제를 해결하는 관점이어야 했는데, AI 자신은 문제 밖의 해설자로 남았다.

직접 원천:

- [2026-05-21 원본 Codex rollout](/Users/hammyeong-yeon/.codex/sessions/2026/05/21/rollout-2026-05-21T11-35-52-019e4863-ace2-7701-9291-c21656cff439.jsonl) — 발화 순서와 실제 `apply_patch`를 함께 가진 1차 원천. 메시지를 찾을 때 `더 근본적으로`, `회사에서 준 원본 이미지`, `ai 가 종종`을 기준으로 다시 찾는다.
- [AI self-check와 principle calibration 발단](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-21-ai-self-check-principle-calibration/raw.md) — 같은 날 핵심 발화와 작업 결과를 압축 보존한 탐색본. 중간 AI 답변 전문이 없으므로 정확한 순서와 문구 판정은 rollout으로 돌아간다.

## 최초 artifact — AI 자신을 결과의 인과 안에 넣는다

원본 rollout의 2026-05-21 14:12:56 KST `apply_patch`에서 최초 `~/.claude/skills/ai-self-check/SKILL.md`가 생성됐다. 같은 날 Codex bridge도 연결됐다. 별도 Git commit은 확인되지 않았으므로 최초 artifact의 권위 원천은 이 patch다.

최초 skill의 역할은 다음과 같았다.

- 입력: 사용자의 정정, 불만, 포인트를 못 잡았다는 신호, AI 관점의 근본 원인 요청.
- 점검: 직전 답변뿐 아니라 이전 분류, 탐색 범위, 라벨링, 전제, 놓친 추론, 사용자 정정에 대한 반응까지 현재 결과를 만든 AI 자신의 개입으로 본다.
- 반환: 오해 지점 재정의, 자기 개입 점검, 수정된 판단 기준, 필요한 다음 행동.
- 종료: 메타 설명을 길게 만드는 데서 끝내지 않고 사용자가 해결하려던 작업으로 돌아가 수정하거나 다음 행동을 한다.

최초 버전은 main이 현재 대화 안에서 직접 수행하는 inline 점검이었다. fresh auditor, report-only 역할 분리, auditor가 원문 범위를 직접 넓히는 현재 계약은 5월 21일 최초 artifact에 없었다. 글에서 최초 발단을 설명하며 현재 계약을 그대로 덮어씌우지 않는다.

같은 대화에서 만들어진 `principle-calibration`과도 역할이 달랐다.

- `ai-self-check`: 현재 결과를 만든 AI 자신의 판단과 작업 흐름을 원인 안에 다시 넣는다.
- `principle-calibration`: 이후 비슷하지만 다른 사례에서도 판단축을 복원하도록 본질 원칙과 대비 사례를 남긴다.

## 발단 이전의 유사 신호

아래 자료에는 5월 21일과 닮은 반복 정정, 이전 프레임 회귀, 표면 수리보다 원인 추적을 요구한 장면이 있다. 다만 현재 확인된 기록만으로 이 사건들이 5월 21일 skill 생성의 직접 원인이었다고 쓰지는 않는다. `갑자기 생긴 고민이 아니었다`는 배경 후보로만 다시 연다.

- [2026-04-29 Claude 의도 오독 정정 loop](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-04-29-claude-intent-misread-correction-loop/raw.md)
- [2026-04-29 multi-agent evaluation closing](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-04-29-multi-agent-evaluation-closing/raw.md)
- [2026-05-09 prompt analysis delegation drift](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-09-prompt-analysis-delegation-drift/raw.md)
- [2026-05-20 AI synthesis source trust](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-20-ai-synthesis-source-trust/raw.md)
- [2026-05-20 residual anchor carryover](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-20-residual-anchor-carryover/raw.md)

## 사용하면서 기대가 깨진 계보

### 2026-06-05 — 진단 문장은 맞아도 다음 행동은 같은 방향일 수 있었다

[LLM grounding demo drift](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-05-llm-grounding-demo-drift/raw.md)에서는 실제 제품에서 불확실성을 다루는 흐름을 확인하려 했지만, AI가 검증 가능한 deterministic demo를 먼저 만들며 제품 작용을 demo 밖으로 밀었다. self-check는 문제를 설명했지만 이어지는 제안은 다시 통제 가능한 해결 쪽으로 기울었고, 사용자는 핵심을 `불확실성을 통제 가능한 데모로 바꾸려는 충동`으로 재정의했다.

이 사건은 `정확한 자기 설명`, `다음 행동 변화`, `같은 판단축의 재발 감소`를 하나의 성공으로 묶을 수 없다는 근거다.

### 2026-06-12 — fresh auditor의 첫 확인 가능한 실사용

[fresh auditor 경계](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-12-subagent-fresh-auditor-boundaries/raw.md)에서 사용자는 `ai-self-check`로 한 번 더 물어보라고 직접 요청하고 반환 형식까지 정했다. 별도 auditor는 main이 동적인 상황 해석 문제를 pipeline과 label 문제로 좁혔다고 판정했다.

현재 원천에서 확인되는 것은 6월 12일에 fresh auditor가 실제 사용됐다는 사실이다. inline 방식에서 fresh 방식으로 처음 전환한 정확한 날짜와 최초 결정 대화는 아직 확인되지 않았다.

### 2026-06-17 — 판별 품질과 main의 회수·설명 품질은 달랐다

[문서 자기정당화 장면](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-17-doc-self-justification/raw.md)에서 auditor는 문제를 넓은 `대화 맥락 누수`보다 문서가 자기 객관성과 정당성을 본문에서 변호하려는 충동으로 좁혀 잡았다. 사용자는 이 관점 자체는 좋다고 했지만, 그 뒤 main의 분석이 어렵고 지나치게 길다고 정정했다.

fresh 판별자가 더 나은 원인을 찾는 것과 main이 그것을 사용자의 언어와 다음 행동으로 회수하는 것은 별도 계약이어야 한다.

### 2026-07-09 — 규칙을 고친 뒤에도 같은 작업 모드가 돌아왔다

[forward bias와 impact 축](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-07-09-harness-forward-bias-impact-axis/raw.md)에서는 사용자가 `일단 전진`하는 기본 태도를 여러 차례 좁혔지만 main이 다시 초안 작성과 다음 작업으로 서둘렀다. 진단과 전역 규칙 수정이 실제 다음 판단을 자동으로 바꾸지 않는다는 후속 사례다.

### 2026-07-10 — 맞는 판정을 적용하며 다른 조사 경로를 지웠다

‘AX 인재전쟁’ 해커톤의 마이리얼트립 과제에서 다음 조사 질문을 정할 때 처음 합의한 흐름은 두 결과를 함께 만들되 증명 범위를 섞지 않는 것이었다. 마이리얼트립은 해커톤 주최가 아니라 출제 기업이다.

- 회사 직접 자료로 회사가 중요하게 보는 잠정 방향을 만든다.
- 사용자·독립 자료로 현재 해결 상태와 남은 문제, 자료의 빈 곳을 본다.
- 두 결과가 만나는 지점에서 다음 조사 질문을 고른다.

회사 자료를 높게 본 것이 나쁜 편향인지 첫 self-check로 물었을 때, 별도 판별은 그 가중치가 해커톤 목적에 맞는다고 판단했다. 객관성의 역할은 모든 출처 비중을 같게 만드는 것이 아니라 회사 방향을 사용자 전체 문제로 일반화하거나 이미 해결된 문제를 다시 고르는 일을 막는 데 있다고 봤다. 이 판정 자체는 이후에도 유지됐다.

어긋남은 main이 이를 현재 조사에 옮길 때 생겼다. 앞서 만든 종합을 폐기하고 흐름을 `회사 방향 먼저 정리 → 주변의 현재 미해결 마찰만 확인`으로 단순화하면서, 잠정 회사 방향과 사용자 문제의 빈 곳을 함께 펼치던 두 번째 경로가 사라졌다. 사용자가 이전 종합과 더 넓은 대화를 다시 보라고 정정한 뒤 두 번째 self-check가 이 전환 지점을 찾았다.

최종 복구에서는 회사 직접 자료의 높은 가중치를 유지했다. 동시에 같은 자료가 현재 남은 사용자 문제까지 자동으로 증명하지 않는다고 분리하고, 회사 방향과 사용자 문제의 빈 곳을 서로 다른 근거 범위로 다시 열었다. 두 결과가 만나는 지점에서 다음 조사 질문을 고르고 재조사하는 순서도 복구했다.

이 사건이 지원하는 상한은 `첫 판별이 틀렸다`가 아니다. 맞는 판정을 main이 반영하는 동안 기존 입력 경로와 작업 순서를 지울 수 있고, 두 번째 점검은 첫 판정의 핵심을 유지하면서 삭제된 범위와 다음 행동을 복구했다는 것이다.

직접 원천:

- [회사 자료 가중치와 객관성](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/07-company-weight-and-objectivity.md) — 첫 판정을 반영하며 단순화된 시점의 기록.
- [회사 방향과 두 번째 조사 기준의 종합 복구](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/08-second-research-synthesis.md) — 사라진 흐름과 복구한 두 증명 범위·다음 행동을 짧게 정리한 최신 판단.
- [논의와 self-check](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/09-discussion-and-ai-self-check.md) — 첫 판정, main의 반영, 사용자 정정, 두 번째 self-check, 최종 채택의 순서를 보존한 과정 원천. 특히 8~10절을 함께 본다.

같은 09 파일의 61~65행은 비호출 장면 하나를 더 지원한다. 첫 조사 직후 사용자가 `기준을 정하고 조사한 건 아니지?`라고 묻자 main은 이를 방향 정정 신호로 읽어 `ai-self-check`를 발동하려 했고, 사용자의 `아냐 그냥 물어본거야`로 점검을 중단한 뒤 `문제 선정 기준을 먼저 정한 것이 아니라 조사 방법만 고정하고 넓게 봤다`고 평범하게 설명했다. 이해 확인 질문에 별도 점검이 필요 없었다는 원고의 비호출 장면은 이 기록 범위 안에 있다. 2026-08-03 개선 loop round 1 review의 원천 미등재 쟁점을 이 등재로 닫는다.

## 계약이 바뀐 과정

### 2026-07-06 snapshot — fresh report-only 구조는 이미 들어와 있었다

`ai-harness-history` commit `9f04631`은 현재 확인 가능한 첫 Git snapshot이다. 이 버전에는 같은 main이 inline으로 자기를 점검하면 기존 맥락의 오염을 더 정교하게 반복할 수 있다는 이유로 fresh report-only auditor가 들어가 있다. 최초 생성 시점이 아니라 7월 6일 당시의 계약을 보여 주는 snapshot이다.

재현:

```bash
git -C /Users/hammyeong-yeon/Desktop/10_work/ai-harness-history show 9f04631:claude/skills/ai-self-check/SKILL.md
```

### 2026-07-14 — main이 포장한 사건을 검토하지 않고 원문 범위를 직접 찾는다

`ai-harness-history` commit `6af78e6`과 당시 `claude/CLAUDE.md.history`는 두 문제를 기록한다.

- 한 실행은 약 240초였고 auditor 자체는 약 57초, main의 호출 전 작업은 약 137초, 회수 후 작업은 약 46초였다. 한 사례의 시간 분해일 뿐 일반 성능 수치로 쓰지 않는다.
- 사용자는 fresh 판별자의 목적이 main이 정제한 사건을 검토하는 데 있지 않고, 발동 발화와 직전 교환에서 시작해 필요한 원문을 스스로 추적하는 데 있다고 정정했다.

이에 main의 사전 문제 정의와 수동 원문 포장을 줄이고 auditor가 필요한 범위를 직접 넓히도록 바뀌었다. 같은 날 commit `0f930e7`에서는 이 감각을 실행 skill로 하나 더 만드는 대신 여러 verifier·auditor·reviewer 설계가 함께 읽는 전역 reference로 옮겼다.

### 2026-07-20 — 첫 정정과 독립 감사의 문턱을 나눈다

`ai-harness-history` commit `e8c2bc2`는 첫 방향 정정마다 fresh auditor를 부르며 느려지고 메타 의식이 커지는 문제를 반영했다.

- 사용자가 첫 정정에서 방향을 분명히 주면 main이 즉시 반영한다.
- 반영 뒤에도 같은 판단축의 어긋남이 반복되거나, 사용자가 독립·fresh 관점이나 과거 원문을 거슬러 간 원인 추적을 명시할 때 auditor를 부른다.
- 이해 질문과 표면 오류에는 평범한 답을 먼저 한다.

따라서 이 계보는 `inline 자기점검 → fresh 분리 → 원문 범위 pull → 호출 문턱 축소`다. 항상 더 무거운 장치로 확장된 성공담이 아니라, 독립성을 얻은 뒤 그 비용과 과발동을 다시 줄인 변화다.

## 왜 글 후보가 됐나

[선정 기준과 결정 변화](../process/candidates/01-criteria-and-decision-history.md)와 [다섯 후보 source card](../process/candidates/02-topic-candidates.md)는 7월의 후대 후보화 기록이다. 5월 사건의 직접 원천은 아니지만, 왜 이 경험을 공개 글로 발전시키려 했는지를 확인한다.

- 사용자가 오래 붙들어 온 개인적 질문과 자기 언어가 가장 많이 축적된 후보였다.
- AI engineering 기술보다 개발자가 AI와 일하며 문제 정의와 판단 위치를 어떻게 바꾸는지를 보여 줄 수 있었다.
- `AI가 사과하거나 결론을 고쳤다`와 `답을 만든 판단 위치가 바뀌었다`의 차이는 다른 개발자가 자기 대화에 옮겨 볼 질문이 된다.
- 최초 artifact, 실제 사용, 기대가 깨진 장면, 호출 문턱을 줄인 변화가 함께 있어 단일 성공 방법보다 학습 계보로 쓸 수 있다.

이 글이 답해야 할 독자 문제 후보는 다음과 같다.

- AI의 자기 설명이 정확해 보여도 왜 다음 행동은 그대로일 수 있는가.
- 문제 정의, 전제, 입력 범위, 작업 순서, 다음 행동 중 실제로 바뀐 위치는 어디인가.
- 평범한 설명과 즉시 정정으로 충분한 때, 별도 fresh 판별이 필요한 때는 언제인가.
- 진단 정확도, 행동 변화, 재발 방지를 어떻게 다른 결과로 볼 것인가.

이 문단은 최종 중심을 고정하지 않는다. 다만 `두 번의 과교정 장면을 더 선명하게 쓰기`만으로는 글을 만든 이유와 장치의 변화가 복원되지 않는다는 source 기준을 둔다.

## 원고 재진입 지도

- 생성 이유와 최초 문제 정의: 2026-05-21 원본 rollout → 같은 날 ai-note.
- 최초 artifact의 실제 계약: rollout의 14:12:56 KST `apply_patch`.
- fresh 방식의 확인 가능한 실사용: 2026-06-12 fresh auditor raw.
- 판별과 회수의 분리: 2026-06-17 문서 자기정당화 raw.
- 진단 뒤 행동 재발: 2026-06-05 demo drift → 2026-07-09 forward bias.
- 비호출 장면(이해 확인 질문에는 점검 중단): 7월 마이리얼트립 조사 기록 09 파일 61~65행.
- 현재 계약으로 변한 이유: `ai-harness-history`의 `9f04631` → `6af78e6` → `0f930e7` → `e8c2bc2`.
- 공개 글 후보가 된 이유: 7월 candidate decision history → topic candidate card → 7월 23일 first-pass와 이후 draft 계보.

초안 계보는 Git에서 다음 경로를 기준으로 다시 확인한다.

```bash
git log --all -- content/backlog/ai-native-topic-research-2026-07-20/process/shaping/2026-07-23-first-pass/ai-self-check.md
git log --all -- content/drafts/ai-native-topic-research-2026-07-20/v1/ai-self-check.md
git log --all -- content/workspaces/ai-native-topic-research-2026-07-20/src/ai-self-check.md
```

## 아직 비어 있는 기억과 원천

- inline 점검에서 fresh auditor로 처음 바꾸기로 한 정확한 대화와 날짜.
- 6월 12일이 최초 fresh 실행인지, 그보다 앞선 실행이 있었는지.
- 이 경험을 공개 글로 쓰고 싶다고 처음 생각한 시점과 당시 가장 중요했던 개인적 이유.
- 5월의 최초 문제, 6월의 fresh 운영, 7월의 호출 문턱 조정 중 사용자가 지금 가장 생생하게 기억하는 변화.

이 빈칸은 현재 artifact를 보고 과거 감정을 만들어 채우지 않는다. 최종 중심과 장면을 고르기 전에 사용자 기억을 별도 1인칭 원천으로 받는다.

## 주장 상한

- `ai-self-check`가 장기적으로 AI의 행동을 바꾸거나 같은 오류를 줄였다고 주장하지 않는다.
- skill이 존재한다는 사실을 실제 판단 변화의 증거로 쓰지 않는다.
- fresh auditor가 inline 점검보다 항상 정확하거나 빠르다고 주장하지 않는다.
- 5월 최초 artifact와 7월 현재 계약을 같은 것으로 쓰지 않는다.
- 비공개 대화와 내부 경로는 공개 원고에 그대로 옮기지 않는다. 필요한 장면은 역할과 판단 변화가 남도록 다시 쓴다.
