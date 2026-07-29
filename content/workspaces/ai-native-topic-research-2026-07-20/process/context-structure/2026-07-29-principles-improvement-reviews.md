---
작성일: 2026-07-29
성격: core 보강·판단 원리 신설에 대한 개선 review 보고 원문
공개상태: 내부 process
---

# 판단 원리 개선 review 보고 원문 3건

세 리뷰어 모두 같은 goal 문서를 받았고, main의 형태 구상과 예상 판정은 받지 않았다. 실행은 세션 내 subagent(Fable, effort high/xhigh/high)였고, 원고 수정 권한은 없었다. 회수는 [보강 기록](./2026-07-29-current-track-principles-and-core-reinforcement.md)에 있다.

## 설계 리뷰어 (main의 이해 + 조사 보고 + 구조 문서)

### 실제로 본 입력

- /private/tmp/claude-501/.../scratchpad/review-input/goal.md
- /private/tmp/claude-501/.../scratchpad/review-input/principles-extract.md
- /private/tmp/claude-501/.../scratchpad/sweep/baseline-v1-v3-loop.md
- /private/tmp/claude-501/.../scratchpad/sweep/baseline-post-sync.md
- /private/tmp/claude-501/.../scratchpad/sweep/baseline-near-final.md
- /private/tmp/claude-501/.../scratchpad/sweep/baseline-public-reshape.md
- /private/tmp/claude-501/.../scratchpad/sweep/turn-dual-review.md
- /private/tmp/claude-501/.../scratchpad/sweep/turn-harness-redesign.md
- /private/tmp/claude-501/.../scratchpad/sweep/rebuild-build-and-reviews.md
- /private/tmp/claude-501/.../scratchpad/sweep/endgame-triple-review.md
- /private/tmp/claude-501/.../scratchpad/sweep/artifact-diffs.md
- /Users/hammyeong-yeon/Desktop/10_work/blog/content/workspaces/ai-native-topic-research-2026-07-20/CLAUDE.md
- /Users/hammyeong-yeon/Desktop/10_work/blog/content/workspaces/ai-native-topic-research-2026-07-20/core/workflow.md
- /Users/hammyeong-yeon/Desktop/10_work/blog/content/workspaces/ai-native-topic-research-2026-07-20/core/review-workflow.md
- /Users/hammyeong-yeon/Desktop/10_work/blog/content/workspaces/ai-native-topic-research-2026-07-20/core/criteria.md
- /Users/hammyeong-yeon/Desktop/10_work/blog/content/workspaces/ai-native-topic-research-2026-07-20/active-state/index.md
- (배정 밖 파일은 열지 않음 — workspace process 원 기록 미열람)

### 제안

두 층으로 나눠 남긴다.

[1] 기존 core 문장 단위 보강 (규칙 성질인 것)
- `core/review-workflow.md` 「Main의 회수」에 두 항목 추가: (a) 판별 제안 중 새 사실 주장을 만드는 항목은 반영 전에 표시하고 원천 확인을 붙인다 — endgame의 S6 사건에서 이미 "다음 cycle 규칙"으로 선언됐으나 아직 core에 없어 다음 세션이 잃는다. (b) 수렴 판정 규칙 한 단락: 입력 경계가 다른 판별의 독립 수렴만 강한 근거다, 같은 원천 packet을 받은 판별은 몇 개든 한 표다, "이의 없음"은 수렴이 아니다.
- `core/review-workflow.md` 「결과물을 개선하는 review > 입력」에 한 문장: main이 packet을 구성할 때 기존 원고가 이미 중요하다고 본 재료로만 원천을 좁히지 않았는지, 결과물의 발생 이유·발상 계보 원천이 포함됐는지 확인한다 — dual-review 05의 핵심 진단("main이 원천 범위를 기존 원고의 frame 안에서 먼저 좁힌 것이 더 큰 제약")의 core 반영.
- `core/workflow.md` §5(현재 판단 갱신) 또는 §4에 한 줄: 판단을 바꾼 사용자 발화는 process 기록에 main의 요약과 함께 원문 인용으로 남긴다 — 조사 9구획 전부가 공통 보고한 최대 gap이며, 유일하게 원문이 남은 발화("current를 만든이유랑 근거부터…")가 이후 작업의 가장 강한 앵커였다는 사건이 근거다.
- 두 계약 문서의 자체 규칙에 따라 보강 이유와 이전 방식을 `process/context-structure/`에 남긴다.

[2] 새 문서 1개: `core/principles.md` (판단 감각 층)
- 성격 frontmatter: "사건에 앵커된 판단 원리 — 규칙이 아니라 판단 복원 재료. reviewer/판별자 입력 packet에는 포함하지 않는다(main·작업자 전용)."
- 항목 형식(원리당 최대 ~12줄, 문서 전체 ~100줄 상한): ① 원리 한 줄 ② 그 원리를 만든 사건 앵커 1~3개(process 파일 링크 + 검증 가능한 한 줄 근거) ③ 다음 작업에서 물을 판단 질문 1개 ④ 이 원리 자체의 과교정 형태 1줄. ④가 핵심 장치다 — 이 트랙의 기본 실패형이 과교정이었으므로, 각 원리가 스스로의 오용 모양을 지니게 한다.
- 내용은 principles-extract 7개를 기반으로 하되 사건 근거 대조에서 2건을 고쳐 읽었다: (수정 1) 원리 2의 "frame을 깨는 입력은 사용자의 절대 판정과 원천 재하강 둘뿐"에서 사용자 입력은 판정만이 아니었다 — Alex scaffolding 계보는 사용자의 기억 진술("지금 내가 기억난건 알렉스…")이라는 새 원천 공급으로 들어왔다. "사용자 입력(판정+새 원천)"으로 넓혀 적어야 한다. (수정 2) 원리 4의 "같은 packet N개는 한 표"는 원천 frame 기준으로 정밀화해야 한다 — A/B dual review는 기준 문서가 달랐는데도(A 무기준/B editorial) 같은 원천 packet 때문에 같은 자리에서 함께 실패했다. 경계를 가르는 것은 기준 입력이 아니라 원천 세계다. 또한 16개 신호 선후 오류가 세 차례 review를 무이의 통과한 사건을 근거로 "이의 없음의 수렴은 비신호"를 원리 4에 명시한다.
- 연결(wiring): `core/workflow.md` §1 재진입에 한 줄 링크("review·회수·packet 설계를 포함하는 작업이면 core/principles.md를 함께 읽는다"). active-state/index.md는 수정하지 않는다.
- 근거: 원리들은 명령형 규칙이 아니라 사건에서만 복원되는 판단 감각이라 criteria.md(글·후보 판단축)와 review-workflow.md(계약)에 끼우면 소유권이 흐려지고, process에 두면 "현재 반복 사용할 것"이라는 지위를 잃는다. core는 "이 작업 단위에서 반복해서 사용할 workflow와 판단축"을 소유하므로 형식상 맞다. 또한 이 문서는 남은 두 글(독립 판별, ai-self-check)의 소재와 직접 겹치므로, 사건 앵커 링크가 그 글들의 material 입구 역할을 겸한다 — 단 문장을 공개 원고로 복사하는 원천은 아니라고 문서에 명시한다(source-policy).

### 차선안

차선안: 새 파일 없이 criteria.md 말미에 '판단 원리' 절로 압축 삽입하고(원리당 2줄, 사건 링크 1개), 나머지는 core 보강만 수행. 최선안과 갈리는 조건: 사용자가 문서 수 최소화를 사건 앵커·과교정 짝 보존보다 우선할 때. 다만 이 경우 '행동 규칙만이 아니라 판단 감각까지'라는 goal의 절반(감각의 사건 복원)이 약해지고, criteria.md의 소유권(글·후보 판단축)과 작업 방식 원리가 한 파일에 섞이는 비용이 있다. 사용자가 '구체적인 것을 만들어야 다음 개선이 가능하다'고 밝힌 입장과도 덜 맞는다.

### 실물 스케치

core/principles.md의 한 항목을 실제로 끝까지 쓴 예시:

## 수렴은 입력 경계가 다를 때만 신호다

서로 다른 세계를 받은 판별이 같은 지점에 독립적으로 닿을 때만 강한 근거다. 같은 원천 packet을 받은 판별은 몇 개든 한 표이고, "아무도 이의를 내지 않았다"는 수렴이 아니다.

사건:
- 발행 직전 3중 판별(원고+직접 원천 / 원고 한 편만 / 원고+lens 8종)이 cursor 도식 부재, `current` 정체 문장 부재, 쌍둥이 문장 반복을 각자 다른 근거로 지목했고, 수렴 3건 전부가 채택돼 커밋 d620f44가 됐다. → [3중 판별 회수](../process/shaping/2026-07-28-current-scaffolding-rewrite/06-final-stage-triple-review-and-recovery.md)
- 같은 원천 packet을 받은 A/B dual review는 기준 입력이 달랐는데도(A 무기준, B editorial 기준) 두 후보 모두 packet에 없던 발생 이유와 Alex 계보 때문에 함께 미채택됐다. 경계를 가르는 것은 기준 문서가 아니라 원천 세계였다. → [재판정](../process/shaping/2026-07-28-current-dual-review/05-post-candidate-reassessment.md)
- 16개 신호의 선후 오류는 원천 접근 판별자를 포함한 세 차례 review를 이의 없이 통과한 뒤, 발행 직전 evidence 재확인에서야 잡혔다. → 같은 06 기록

다음 작업에서 물을 것: 지금 수렴했다고 보는 판별들은 실제로 다른 세계를 받았는가, 같은 세계에서 다른 질문만 받았는가?

과교정 형태: 이 원리를 "판별을 더 많이, 더 다르게 돌리기"로 읽으면 판별 공급만 늘어난다. 이 트랙의 실패는 전부 공급이 아니라 main의 회수에서 났다.

### 만들지 말 것

- 새 review 역할·단계·영구 agent·lens — public-reshape handoff에서 이미 '이번 사례 하나로 새 workflow 단계·lens·permanent agent를 만들지 않는다'가 합의됐고, 진단된 병목은 판별 공급이 아니라 main의 회수다
- repo 전역 editorial/·skill 반영 — goal이 판단 범위를 workspace 안으로 고정했고, 승격은 실제 반복 사용 뒤의 별도 결정이다
- 원리들의 체크리스트·게이트·점수표화 — 이 트랙에서 게이트(prepublish, hash, 검증 6종)는 매번 통과하면서 frame 층위 실패를 못 잡았다. 원리를 기계 판정으로 바꾸면 같은 종류의 거짓 안심을 하나 더 만든다
- 트랙 전체 회고·타임라인 재서술 문서 — process가 이미 과정을 소유한다. 요약 재서술은 두 번째 권위를 만들고, 이 트랙이 반복 확인한 '최신·요약본이 권위를 참칭하는' 문제를 재생산한다
- 유실된 사용자 발화의 소급 재구성 — 트랙 자체 규칙(보존되지 않은 원문을 재구성하지 않는다)과 충돌한다. 보존 관행은 앞으로만 적용한다
- principles-extract를 사건 앵커 없이 그대로 파일로 옮기기 — 링크 없는 요약 원리는 검증도 반박도 불가능한 선언문이 되고, '판단 감각까지 남긴다'는 goal을 채우지 못한다
- active-state/index.md에 원리 절 추가 — index 비대화(1,000줄)가 이 구조 재설계의 출발 실패였고, active-state는 현재 그림만 소유한다

### 기존 보강 vs 새로 필요

기존 문서 보강으로 충분한 부분: (1) 새 사실 주장을 만드는 판별 제안에 원천 확인 부착 — review-workflow.md 회수 절에 이미 있는 4번(사실 충돌 원천 확인)의 확장이며 endgame에서 규칙으로 선언까지 됐다. (2) 수렴 판정 규칙 — 회수 절의 판정 재료 문단에 얹힌다. (3) packet frame-좁힘 경고 — 입력 절의 '최소 원천 묶음 제공' 문장 옆에 한 문장. (4) 사용자 발화 원문 보존 — workflow.md의 process 기록 규칙에 한 줄. (5) '통과는 입력 경계 안의 사실', '판정의 범위 분리', 'reviewer 제안 비자동승격'은 이미 criteria.md·review-workflow.md·active-state 유지 원칙에 있으므로 추가하지 않는다.

새로 필요한 부분: 원리+사건 앵커+판단 질문+과교정 짝을 묶은 층(core/principles.md). 기존 core 문서는 전부 '무엇을 하라'는 계약 형식이라, '왜 그 계약이 생겼고 어떤 감각으로 적용해야 하는지'를 담을 자리가 없다. 이 성질(사건에 묶인 판단 감각, 규칙 아님, main 전용)은 계약 문서에 끼우면 명령으로 오독되고 process에 두면 반복 사용 지위를 잃으므로 새 파일이 맞다.

### 평가 기준

- 재진입 시험: 다음 글(독립 판별 또는 ai-self-check) cycle에서 새 세션이 active-state+workflow+principles만 읽고 review packet을 설계할 때, 발생 이유·계보 원천 포함 여부를 스스로 점검하는가 — 실제 다음 cycle의 packet 구성 기록으로 확인
- 복원 가능성: 각 원리에서 사건 앵커 링크를 따라 2단계 안에 process 원 기록의 검증 가능한 문장에 닿는가 (링크 유효성 + 근거 인용 일치)
- 성질 유지: 원리가 명령문 규칙으로 굳지 않았는가 — 규칙 성질 항목은 전부 core 계약 문서로 옮겨졌고 principles에는 판단 질문과 사건만 남았는가 (소유권 중복 0건)
- 실사용: 다음 두 글 cycle의 process 기록에서 이 문서가 실제로 인용·참조됐는가. 한 cycle 동안 한 번도 쓰이지 않으면 축소 또는 폐기 후보로 재판정
- 과교정 짝의 작동: 이 문서를 근거로 한 결정이 반대 방향 오류(판별 수 늘리기, 승격 전면 거부, 원문 보존의 전량 복붙화 등)를 만들었을 때 해당 짝 문장이 그 시점에 실제로 인용돼 제동을 걸었는가
- 크기 상한 준수: 문서가 ~100줄 상한을 넘지 않고, 새 사건이 추가될 때 기존 앵커를 교체하는 방식으로 유지되는가 (active-state 비대화 실패의 재발 여부)
- 격리 유지: 이후 독립 판별자 보고 원문의 '실제로 본 입력' 절에 principles.md가 등장하지 않는가 (reviewer packet 오염 0건)

### 위험

- 원리 문서가 다음 cycle에서 anchoring 입력이 될 위험 — endgame에서 workspace CLAUDE.md가 판별자에게 자동 주입된 사건이 이미 있었다. 문서 상단의 'reviewer packet 비포함' 명시만으로는 실행 환경 주입을 못 막으므로, 판별자 보고의 '실제로 본 입력' 절 확인을 회수 절차에서 유지해야 한다
- 규칙화 drift — 원리가 반복 인용되며 명령으로 굳는 것. 과교정 짝 문장으로 완화하지만 완전히 막지는 못한다. eval 3·5로 주기 점검
- 사건 앵커 링크가 process 재구성·폴더 이동 시 끊어질 위험 — 이 트랙에서 이미 topic-candidates.md 경로 이동으로 같은 문제가 관찰됐다(baseline-v1-v3-loop gaps). 링크 옆에 한 줄 근거 인용을 함께 두는 형식이 보험이다
- 이 문서가 독립 판별·self-check 글의 초안 원천으로 오용되어 내부 문장이 공개 원고에 새는 위험 — source-policy 경계(해석된 문장만 공개)를 문서에 명시해야 한다
- principles-extract의 원리 7이 '보존이 가장 약했다'고 진단한 사용자 발화 원문 gap은 문서로는 해결되지 않는다 — workflow 한 줄 규칙이 실제로 지켜지는지는 다음 cycle의 process 기록에서만 확인된다

## 백지 리뷰어 (main의 이해 없이 조사 보고에서 재추출)

### 실제로 본 입력

- /private/tmp/claude-501/-Users-hammyeong-yeon-Desktop-10-work-blog/37bdfb45-7519-41ca-941d-40936f252984/scratchpad/review-input/goal.md
- /private/tmp/claude-501/.../scratchpad/sweep/baseline-v1-v3-loop.md
- /private/tmp/claude-501/.../scratchpad/sweep/baseline-post-sync.md
- /private/tmp/claude-501/.../scratchpad/sweep/baseline-near-final.md
- /private/tmp/claude-501/.../scratchpad/sweep/baseline-public-reshape.md
- /private/tmp/claude-501/.../scratchpad/sweep/turn-dual-review.md
- /private/tmp/claude-501/.../scratchpad/sweep/turn-harness-redesign.md
- /private/tmp/claude-501/.../scratchpad/sweep/rebuild-build-and-reviews.md
- /private/tmp/claude-501/.../scratchpad/sweep/endgame-triple-review.md
- /private/tmp/claude-501/.../scratchpad/sweep/artifact-diffs.md
- /Users/hammyeong-yeon/Desktop/10_work/blog/content/workspaces/ai-native-topic-research-2026-07-20/CLAUDE.md
- /Users/hammyeong-yeon/Desktop/10_work/blog/content/workspaces/ai-native-topic-research-2026-07-20/core/workflow.md
- /Users/hammyeong-yeon/Desktop/10_work/blog/content/workspaces/ai-native-topic-research-2026-07-20/core/review-workflow.md
- /Users/hammyeong-yeon/Desktop/10_work/blog/content/workspaces/ai-native-topic-research-2026-07-20/core/criteria.md
- /Users/hammyeong-yeon/Desktop/10_work/blog/content/workspaces/ai-native-topic-research-2026-07-20/active-state/index.md

### 자체 추출

## 실제로 좋아진 것 (근거 사건과 함께)

1. **판정의 범위를 입력 경계로 제한하는 감각이 규칙 이전에 몸에 붙었다.** 근거: (a) scaffolding-rewrite에서 원고+고정 질문만 받은 검토의 `light edit`이 완료 신호로 쓰였다가 사용자 검토로 뒤집힌 뒤, "당시의 가벼운 수정 제안을 전체 품질 검토로 확대해 해석할 수 없다"로 소급 재분류됐다(rebuild 보고). (b) dual-review에서 A 후보의 구조 충실도 PASS를 "해당 brief 안의 검증이다. 이 글을 쓰는 이유와 사용자의 품질 판단까지 통과했다는 뜻이 아니다"로 한정했다. (c) near-final의 6종 검증 통과 뒤에도 handoff가 "파일과 사실 범위가 안전하다는 뜻이다. 읽고 싶은 글이라는 뜻이 아니다"로 정리했다. 이 감각은 이후 core/review-workflow.md에 부분 규칙화됐다.

2. **판별을 늘리는 대신 main이 만든 source frame 자체를 의심하는 전환.** 근거: dual-review에서 입력 기준만 다른 A/B 두 reviewer가 만든 두 후보가 모두 사용자 재판정에서 미채택됐고, 원인이 "독립성 자체보다 main이 직접 원천의 범위를 기존 원고의 frame 안에서 먼저 좁힌 것"으로 귀속됐다. 발행에 도달한 원고는 review를 더 쌓아서가 아니라 사용자 발화("current를 만든이유랑 근거부터 시작해야하지 않을까", Alex scaffolding 기억)로 frame을 다시 연 뒤 생성 계보를 원천에서 복원해 나왔다(rebuild, artifact-diffs).

3. **review의 역할이 '통과 판정'에서 '개선 기준 제안'으로 재정의됐다.** 근거: harness-redesign의 18:08 보정이 "결과물만 주고 main이 미리 정한 질문에 답하게 하면 reviewer는 그 질문의 범위 안에서만 잘 작동한다"를 실패 원인으로 명시하고, 원고+최소 목표·독자+선별 원천을 주되 reviewer가 기준·빠진 재료·통과 조건을 스스로 제안하는 계약으로 바꿨다. rebuild의 stagewise review는 이 계약으로 실행돼 단계별 완료 조건/돌아갈 조건 쌍과 미사용 material 3종을 실제로 찾아냈다.

4. **늦은 편집이 새 사실 오류의 발생원이라는 발견과 그에 대한 절차 변경.** 근거: endgame에서 판별자 제안(S6 시간 앵커)을 문장 품질 근거만으로 반영했다가 원천과 충돌("통과한 날 밤" → 실제로는 진행 중)했고, 발행 직전 evidence 재확인이 잡은 두 건 모두 "이번 cycle의 수정이 만들거나 날카롭게 만든 것"이었다. 이에서 "판별 제안 중 새 사실 주장을 만드는 항목을 반영 전에 표시하고 원천 확인을 붙인다"는 작업 방식 변경이 나왔다 — 다만 이는 process 기록에만 있고 core에는 아직 없다.

5. **독립 수렴을 채택 근거로 쓰는 회수 방식.** 근거: endgame 3중 판별에서 서로 다른 입력 경계의 세 판별이 독립적으로 같은 3건(cursor 도식, current 정체 문장, 쌍둥이 문장)에 수렴했고 3건 전부 채택됐다. 반대로 한 판별의 제안을 기각할 때 다른 판별의 반대 관찰이 근거로 쓰였다(번호 리스트 교체안 기각). baseline v1-v3에서도 두 blind review의 독립 반복 기준만 승격 후보로 봤다.

6. **완결본 + 충돌·열린 판단 표시로 사용자 판단을 받는 작업 단위.** 근거: post-v3 sync의 사용자 발화("적당히 크게 만들어서 내가 생각한 기준에 직관적으로 좋은지 보고")에서 시작해, public-reshape handoff가 "완결본을 만들되 어떤 source가 충돌했는지, main의 잠정 해석은 무엇인지, 사용자 답에 따라 무엇이 달라지는지를 함께 제시"로 고정했고, rebuild~endgame에서 실제로 이 형태(선택지 3개 사용자 승인, 목록 밖 항목 별도 표시)로 운영됐다.

## 반복해서 실패한 것

1. **내부 review 전부 통과 ≠ 좋은 글 — 최소 3회 반복.** v3 완료 검증 통과 후 사용자 sync에서 4/5편 중심 뒤집힘 → near-final 6종 검증 통과 후 "매력이 없고 풍부하지 않다" → scaffolding-rewrite 검증 통과 후 "동기와 전체 맥락이 없다". 매번 원인 진단이 달랐고(reviewer가 맥락을 이미 앎 / 고정 질문만 받음 / frame 축소) 점진적으로 좁혀졌지만, 같은 형태의 실패가 세 번 났다는 사실 자체가 어디에도 한눈에 정리돼 있지 않다.

2. **정확해질수록 중심이 실패·방어 쪽으로 이동하는 압력.** v1→v3에서 "정확해지는 과정에서 몇몇 글의 중심이 실패와 방어 쪽으로 이동", 두 독립 reviewer가 각각 "방어 문장이 발견보다 자주 나타난다", "글이 스스로를 계속 반박하는 리듬"을 지적, v3 regression에서도 압축이 판단 변화를 절차문으로 평평하게 만든 사례 재발.

3. **reviewer 제안과 main의 임시 편집 선택이 사용자 합의처럼 굳는 드리프트.** post-v3 sync가 "reviewer 제안과 main의 임시 편집 선택이 사용자 합의처럼 굳으면서 일부 글의 중심이 달라졌다"로 진단했고, 이후 매 cycle 회수 문서가 '자동 승격 금지'를 반복 선언해야 했다.

4. **사용자 발화 원문 미보존 — 9개 보고 전부의 gaps에 등장.** 중심을 뒤집은 판정일수록 main의 간접 서술로만 남았다. 전역 지침이 이미 원문 발췌 보존을 요구하는데 workspace 관행으로 정착되지 않았다.

5. **판별자 실행 주체·packet manifest 미기록.** blind 오염 판정이 자기 신고에 의존(1차 reviewer rg 누출, endgame의 CLAUDE.md 자동 주입)했고, 어떤 주체가 어떤 packet을 받았는지 어느 cycle에도 남지 않아 회수를 사후 검증할 수 없다.

### 제안

두 갈래로 남긴다. (1) 규칙으로 승격할 자격을 이미 실증한 소수 항목은 기존 core 문서에 보강하고, (2) 규칙이 아니라 '언제 규칙과 절차 자체를 의심해야 하는가'라는 판단 감각은 근거 사건과 묶어 core에 새 문서 하나로 남긴다.

**A. 기존 core 보강 (4건, 각각 실증 사건과 1:1 대응)**
- `core/review-workflow.md`의 'Main의 회수' 절에 추가: 판별 제안 중 새 사실 주장(시점·수치·행위 주체·인과)을 만드는 항목은 반영 전에 표시하고 원천 확인을 붙인다. (근거: endgame S6 사건 — 이미 "다음 cycle에서는"으로 선언됐으나 process에만 있음)
- `core/workflow.md` §3의 승격 단계 또는 review-workflow의 verifier 절에 추가: `content/drafts`/`posts` 승격 직전, 이번 cycle에서 새로 넣거나 바꾼 문장만 골라 원천과 대조하는 마지막 evidence 확인을 둔다. deterministic check는 이를 대체하지 않는다. (근거: 발행 직전 확인이 세 차례 review를 통과한 오류 2건을 잡음)
- `core/review-workflow.md`의 회수 마지막 문단 확장: 같은 결과물이 서로 다른 review를 반복 통과하고도 사용자 판정에서 반복 미채택되면, 다음 review를 설계하기 전에 main이 구성한 source frame(발생 이유·발상 계보 포함 여부)을 먼저 재검토한다. (근거: dual-review 미채택 원인 귀속)
- `core/review-workflow.md` 반환 항목 1 확장 + 회수 7단계 확장: review 보존 기록에 실행 주체와 입력 packet 목록을 남기고, 사용자 판정이 중심·범위·판정을 바꾼 경우 그 발화를 1~3줄 원문 인용으로 남긴다. (근거: blind 오염 판정의 자기 신고 의존, 9개 조사 보고 전부의 원문 부재 gap, 전역 지침의 원문 보존 요구)

**B. 새 문서: `core/calibration.md` (제목: 반복 실패에서 남긴 판단 감각)**
- 내용 범위: 이 트랙에서 2개 이상 cycle에 걸쳐 실증된 판단 감각만, 5~7항목 상한. 후보: ① 판정의 범위는 입력 경계까지다(내부 통과 ≠ 사용자 수용), ② 판별을 늘리기 전에 frame을 의심한다, ③ 늦은 편집이 새 사실 오류의 발생원이다, ④ 정확해질수록 중심이 실패·방어로 이동하는 압력이 있다 — 사실 교정 반영 시 장면·결말 보호를 별도 항목으로 지킨다, ⑤ 독립 수렴은 강한 채택 신호, 단일 항목은 개별 판정, ⑥ 완결본 + 충돌·열린 판단 표시로 사용자 판단을 받는다.
- 형식: 항목당 [한 줄 감각 / 근거 사건 2건 이내(process 링크 포함) / 다음 작업에서 물을 질문 1~2개 / 적용 경계] 4요소, 항목당 10줄 이내. 규칙 본문은 담지 않고 해당 소유 문서로 연결한다.
- 근거: core 기존 문서는 규칙·계약을 소유하지만 '왜 그 규칙이 생겼고 언제 의심해야 하는가'라는 캘리브레이션 층은 어느 live 문서도 소유하지 않는다. 그 이유들은 process의 회수 기록에 흩어져 있는데, workflow상 process는 재진입 기본 입력이 아니라 새 세션이 읽지 않는다. active-state에 담으면 '현재 판단 소유'라는 소유권과 충돌한다.
- 연결: `core/workflow.md` §1 재진입 3단계("필요한 criteria 판단축만 고른다")에 calibration을 나란히 연결하고, 새 글 cycle을 여는 시점(작업 범위가 글의 구조·중심인 경우)에는 전체를 읽는 것으로 한 줄 명시. 독립 판별자의 packet에는 넣지 않는다(앵커링 방지)를 문서 안에 명시.

**용도 충족 확인**: ai-self-check·독립 판별 글의 다음 cycle이 이 산출물에서 시작하면 — frame 재검토 신호(②)로 packet 설계 전에 각 글의 발생 이유·발상 계보 원천 확인부터 하게 되고, ①⑥으로 내부 통과를 완료로 읽는 실패를 피하며, A의 규칙 보강으로 S6형 오류와 발행 직전 검증 공백이 절차로 막힌다. Current가 도달한 수준의 방식이 문서 경로로 재진입 가능해진다.

### 차선안

신설 문서 없이 `core/criteria.md` 안에 '판단 감각' 절을 추가하고 근거 사건은 process 링크로만 대체하는 최소안. 최선안과 갈리는 조건: 감각 항목이 3개 이하로 압축되고 사건 발췌 없이 링크만으로 판단 복원이 가능하다고 판단되면 criteria 내 절로 충분하다. 반대로 항목이 5개 이상이고 사건의 구체 서술(누가 어떤 입력에서 어떤 판정을 했는지)이 감각 복원에 필요하다면 — 조사 보고상 실패 패턴들이 모두 그 구체성에 의존하므로 나는 이 경우로 본다 — criteria.md의 자기 정의('판단축만 소유한다')와 충돌해 별도 문서가 맞다.

### 실물 스케치

`core/calibration.md`의 한 항목을 끝까지 쓴 실물:

---
## 판별을 늘리기 전에 frame을 의심한다

**감각**: 독립 판별의 수·독립성·전문화는 main이 구성한 source frame의 천장을 넘지 못한다. 같은 결과물이 내부 판별을 반복 통과하거나 서로 다른 판별 구성을 시험했는데도 사용자 판정에서 계속 미채택되면, 다음 판별을 설계하기 전에 packet에 무엇이 처음부터 없었는지 본다. 특히 결과물의 발생 이유(왜 이것을 만들었는가)와 발상 계보(어디서 아이디어를 얻어 무엇을 변형했는가)를 지원하는 원천이 frame에 있는지 확인한다.

**근거 사건**:
- Current A/B dual review에서 입력 기준만 다른 두 reviewer가 서로 다른 판정(structural rewrite / local edit)과 두 후보를 냈지만 모두 사용자 재판정에서 미채택됐다. 회수 기록은 원인을 "사용자 피드백을 가린 독립성 자체보다, main이 직접 원천의 범위를 기존 원고의 frame 안에서 먼저 좁힌 것"으로 귀속했다. `current`를 만들게 한 최초 문제와 Alex scaffolding 발상이 공통 packet에 없었다. → [process/shaping/2026-07-28-current-dual-review/05-post-candidate-reassessment.md]
- 발행에 도달한 원고는 판별을 더 쌓은 결과가 아니라, 생성 계보를 원천에서 복원해 frame을 다시 연 재작성에서 나왔다. → [process/shaping/2026-07-28-current-scaffolding-rewrite/01-current-rewrite-build-record.md]

**다음 작업에서 물을 질문**:
- 이 packet은 현재 원고가 이미 중요하다고 본 것들로만 구성되지 않았는가?
- 이 글의 발생 이유와 발상 계보를 지원하는 원천이 packet에 들어 있는가?

**경계**: 반복 미채택이 항상 frame 문제는 아니다. 사실 오류나 표현 층위로 설명되면 그 층위에서 먼저 처리한다. frame 재개방이 글의 중심을 바꾸면 [workflow.md의 변경 권한](./workflow.md#2-작업-범위-정하기)에 따라 사용자와 상의한다.
---

이 형식이 나머지 항목(판정의 범위, 늦은 편집의 사실 오류, 정확화의 중심 이동 압력, 독립 수렴, 완결본 판단 방식)에 그대로 반복된다.

### 만들지 말 것

- 새 영구 review 단계·새 lens·새 permanent agent — public-reshape handoff가 이미 '이번 사례 하나를 근거로 만들지 않는다'로 결정했고, 이 트랙의 실제 개선은 역할 재배치와 frame 재개방에서 왔지 장치 추가에서 오지 않았다
- 다섯 글 공통 템플릿 — Current의 성공 구조(생성 계보 도입, artifact 구성, ending 형식)를 self-check·독립 판별 글의 계약으로 복제하는 것. 트랙 자체가 'artifact 하나 처방'의 전역 승격을 두 번 기각했고, 다섯 편이 같은 표면으로 수렴한 것이 반복 실패였다
- stated_lessons 전수 보관용 대형 lessons 문서 — active-state 1,000줄 비대화 실패의 재현. 감각 문서는 2개 cycle 이상 실증된 항목만 5~7개 상한으로 제한한다
- v1→v3식 자동 다단계 수렴 pipeline의 규칙화 — post-v3 sync에서 이미 폐기된 방식이다
- editorial/ 등 repo 전역으로의 즉시 승격 — goal이 판단 범위를 workspace 안으로 한정했고, 반복 사용이 확인된 뒤에만 승격한다
- 과거 process 기록·폴더명의 소급 수정 — near-final 폴더명을 고치지 않은 것과 같은 원칙으로, calibration 문서는 링크만 하고 원 기록을 재작성하지 않는다

### 기존 보강 vs 새로 필요

**기존 문서 보강으로 충분한 부분** — 이미 규칙 문장으로 성립하고 실증 사건이 1:1로 붙는 것들: (1) 새 사실 주장을 만드는 판별 제안의 반영 전 표시·원천 확인 → review-workflow.md 회수 절 (endgame S6에서 이미 선언된 절차 변경의 core 반영), (2) 승격·발행 직전 이번 cycle 변경분 한정 evidence 재확인 → workflow.md §3 또는 review-workflow verifier 절, (3) 반복 미채택 시 source frame 재검토 신호 → review-workflow 회수 마지막 문단, (4) review 기록의 실행 주체·packet manifest, 사용자 판정 발화의 원문 인용 관행 → review-workflow 반환·회수 절. 판정 범위 제한('독립 review는 주어진 입력 경계에서 나온 관찰'), 자동 승격 금지, 채택≠합의는 이미 review-workflow.md와 criteria.md에 있으므로 중복 추가하지 않는다.

**새로 필요한 부분** — 규칙 문장으로 환원되지 않는 판단 감각 층: '언제 절차 자체를 의심하는가', '어떤 실패 패턴이 이 트랙에서 반복됐는가'는 계약 문서(review-workflow)도 판단축 문서(criteria)도 소유하지 않고, active-state는 현재 판단 소유라 방법 감각을 담으면 소유권이 충돌한다. process 회수 기록들이 이유를 담지만 재진입 기본 입력이 아니라 새 세션에 읽히지 않는다. 따라서 근거 사건과 묶인 감각 문서 `core/calibration.md` 하나가 새 층위로 필요하다. core의 자기 정의('반복해서 사용할 workflow와 판단축')와도 충돌하지 않는다.

### 평가 기준

- 근거 연결성: calibration의 모든 항목이 process 원 기록 링크가 붙은 근거 사건을 갖는가. 사건 없는 일반론 항목이 하나라도 있으면 그 항목을 제거한다
- 소유권 무중복: 규칙 본문이 review-workflow·criteria·workflow와 중복 서술되지 않고 연결로만 처리되는가. 같은 계약을 두 문서가 소유하면 harness-redesign에서 확인된 소유권 문제가 재발한다
- 실사용 검증: ai-self-check 또는 독립 판별 글의 첫 cycle에서 main이 이 문서를 실제로 읽고 어느 항목이 판단에 쓰였는지 process 기록으로 확인 가능한가. 한 cycle 뒤 사용되지 않은 항목을 제거·수정하는 회수가 실제로 일어나는가
- 분량 상한 준수: 항목 7개 이하, 항목당 10줄 이내를 유지하는가. 넘으면 '지도가 상태 관리표가 되는' 실패의 재현이다
- 재발 방지 시뮬레이션: 새 세션이 이 산출물(calibration + 보강된 core)만 읽고, 이 트랙의 확인된 실패 3종 — 고정 질문 검토의 light edit을 완료 신호로 쓰기, 판별 제안의 새 사실 주장을 미확인 반영하기, 미채택 반복에 판별 추가로 대응하기 — 를 피할 수 있는지 질문으로 점검한다
- 격리 유지: calibration이 독립 판별자 packet에 들어가지 않는다는 명시가 있고 실제 cycle에서 지켜지는가 (endgame의 CLAUDE.md 자동 주입 누수와 같은 경로 포함)
- 보강 규칙의 실증 대응: core에 추가된 각 규칙이 어느 사건에서 왔는지 decision record 또는 process 링크로 복원 가능한가

### 위험

- 감각 문서가 이후 cycle마다 교훈을 덧붙이는 누적 문서로 변질될 위험 — 항목 상한과 미사용 항목 제거 규칙을 문서 자체에 명시해야 한다
- calibration이 main·작업자를 넘어 reviewer 입력에 새면 기존 판단으로의 앵커링(layering-decision이 확인한 backlog 앵커링 문제)이 재현된다 — 실행 환경의 자동 주입 경로(CLAUDE.md 사례)까지 고려한 격리 명시가 필요하다
- 회수 절차 보강이 누적되면 회수가 다시 무거워진다(7단계→10단계 전례) — 보강 4건을 새 단계가 아니라 기존 단계 안의 문장으로 넣어야 한다
- 감각의 언어가 규칙 언어로 굳으면 '판단 감각까지 남긴다'는 goal이 다시 행동 규칙 목록으로 축소된다 — 근거 사건과 질문 형식을 유지하는 것이 핵심이다
- 이 제안 자체가 한 트랙(Current 발행)의 성공 사례에서 추출됐다 — self-check·독립 판별 글에서 항목이 실제로 쓰이는지 첫 실사용에서 확인하고, 안 쓰이면 축소를 우선한다

## 최소안 리뷰어 (새 층위 없는 안을 최선으로 논증, 조사 보고 없음)

### 실제로 본 입력

- /private/tmp/claude-501/.../scratchpad/review-input/goal.md
- /private/tmp/claude-501/.../scratchpad/review-input/principles-extract.md
- content/workspaces/ai-native-topic-research-2026-07-20/CLAUDE.md
- content/workspaces/ai-native-topic-research-2026-07-20/core/workflow.md
- content/workspaces/ai-native-topic-research-2026-07-20/core/review-workflow.md
- content/workspaces/ai-native-topic-research-2026-07-20/core/criteria.md
- content/workspaces/ai-native-topic-research-2026-07-20/active-state/index.md
- 배정 밖 확인: process/ 전체 디렉토리 목록(ls), process/shaping/2026-07-28-current-scaffolding-rewrite/03-main-review-recovery.md와 06-final-stage-triple-review-and-recovery.md의 헤딩만(grep, 링크 앵커 실재 확인 목적). 조사 보고 9건은 배정대로 읽지 않았다.

### 제안

최소안: 새 문서·새 층위 없이 다섯 곳을 보강한다. (1) core/review-workflow.md — 원리 1·2·3·4·6의 실행 규칙을 이 문서에 담는다. 서두에 지배 문장 두 개(판별 설계는 입력 세계 설계다 / frame을 깨는 입력은 사용자 판정과 원천 재확장 둘뿐), '결과물을 개선하는 review > 입력'에 packet 재단 규칙(원천 묶음은 기존 원고의 frame이 아니라 sources에서 이번 쟁점 기준으로 다시 자른다; 같은 자리에서 통과 뒤 사용자 반려가 반복되면 판별 수를 늘리기 전에 packet을 의심한다), 'Main의 회수'에 통과 읽기·수렴 규칙·승격하지 않는 것 목록을 추가하고 각 규칙에 근거 사건 링크를 1개씩 단다. (2) core/workflow.md — 원리 5·7. '5. 현재 판단 갱신'에 사용자 판정·전환점 발화의 원문 보존 규칙, '4. Review와 회수' 끝에 개선 반영 뒤 과교정 확인(이번 개선이 주입했을 새 오류를 이전본 대비로 한 번 본다) 규칙. (3) core/criteria.md — 사실상 무변경. '판정의 범위'의 기존 문장("독립 review는 주어진 입력 경계에서 나온 관찰이다")이 원리 3의 판단축 접점을 이미 소유하므로 중복 기술하지 않는다. (4) process/context-structure/2026-07-29-current-retrospective-principles.md — 이번 추출의 과정 기록. 원리 7개 전문, 각 원리의 근거 사건 링크, 어떤 core 문안으로 반영됐는지의 매핑. process에 cycle 기록을 새로 만드는 것은 기존 관행이지 새 층위가 아니다. 판단 감각의 원천은 여기 보존된다. (5) active-state/index.md — '작업 context 구조' 가지에 현재 결론 1~2줄("Current 발행 과정에서 검증된 packet 재단·통과 읽기·승격 거부 원칙을 core에 반영했다. 원리 전문과 근거 사건은 process 기록에")과 링크. 근거: 이 workspace의 재진입 경로는 active-state index → core로 고정돼 있으므로, 다음 글(ai-self-check, 독립 판별)이 그 수준에서 시작하게 하려면 실행 규칙이 core 계약 문서 안에 있어야 한다. 별도 원리 문서는 재진입 경로에 편입되지 않으면 읽히지 않고, 편입하면 core 계약과 이중 소유가 생긴다. 판단 감각은 규칙마다 단 근거 사건 링크와 서두 지배 문장으로 core에 얇게 심고, 전체 종합은 process 기록이 소유한다.

### 차선안

차선안: 새 층위 없이 기존 메커니즘 하나를 더 쓰는 절충 — active-state 유지 원칙이 이미 허용하는 하위 파일(예: active-state/working-principles.md)에 원리 7개의 요약과 근거 사건 링크를 두고 index에서 연결한다. 새 층위는 아니고 current-active-state-operation.md라는 선례도 있다. 최선안과 갈리는 조건: 재진입 테스트에서 core 보강만으로는 원리가 실행되지 않는 것이 관찰되거나, 규칙 준수에도 통과 오독·과교정이 재발할 때. 다만 이 경우에도 '반복 기준을 active-state가 소유하게 되는' 소유권 뒤틀림은 남으므로, 그 시점에는 차선안 대신 core 쪽 새 자리를 정면으로 논의하는 것이 맞을 수 있다.

### 실물 스케치

core/review-workflow.md에 실제로 넣을 문안 (전체를 끝까지 씀):

[서두 소유권 목록 아래, "입력을 얼마나 가렸는지만으로..." 문단 앞에 추가]

이 계약의 전제 두 가지는 Current 발행 과정에서 확인됐다. 판별자는 받은 입력 안에서는 항상 잘 작동하므로, 판별 설계는 질문 설계이기 전에 packet에 어떤 세계를 담는가의 설계다. 그리고 그 세계의 frame 자체를 깨는 입력은 사용자의 판정과 원천으로 다시 내려가기 둘뿐이었다. 근거 사건은 [Current 회고 원리 기록](../process/context-structure/2026-07-29-current-retrospective-principles.md)에 있다.

["결과물을 개선하는 review > 입력" 절, "Main은 현재 쟁점에 필요한 최소 원천 묶음을..." 문단 뒤에 추가]

원천 묶음은 현재 원고가 이미 쓴 범위가 아니라 `sources/index.md`에서 이번 쟁점 기준으로 다시 자른다. packet에 없는 재료의 누락은 어떤 판별자도 볼 수 없다. 같은 자리에서 review 통과 뒤 사용자 반려가 반복되면, 판별자를 늘리거나 질문을 정교화하기 전에 packet의 범위를 먼저 의심한다. Current에서 원고 frame 안에서 자른 packet의 마지막 검토는 `light edit`으로 닫혔고, 원천 묶음을 통째로 받은 판별이 누락된 동기·판단 재료를 찾았다([회수 기록](../process/shaping/2026-07-28-current-scaffolding-rewrite/03-main-review-recovery.md)).

["Main의 회수" 절, 기존 9단계 목록 뒤에 추가]

### 통과를 읽는 방식

- 판별의 통과·PASS·light edit은 그 판별이 받은 입력 경계 안에서만 사실이다. 통과를 작업 완료로 읽지 않고, 회수 기록에 "이 판별이 보지 못한 층위"를 한 줄 적는다.
- 서로 다른 입력 경계의 판별이 같은 지점에 독립적으로 닿았을 때만 수렴을 강한 근거로 쓴다. 같은 packet을 받은 판별 여러 개의 일치는 한 표로 센다([3중 판별 기록](../process/shaping/2026-07-28-current-scaffolding-rewrite/06-final-stage-triple-review-and-recovery.md)).

### 회수에서 승격하지 않는 것

다음 승격은 회수의 반복 실패 지점이었다. 각각 별도 합의가 있을 때만 올린다.

- reviewer의 관찰을 반복 규칙으로
- 이번 결과물에 대한 처방을 전역 기준으로
- 판별의 통과를 완료로
- main의 임시 편집을 사용자와 합의된 판단으로

---

core/workflow.md '5. 현재 판단 갱신'에 넣을 문안:

사용자의 판정과 전환점 발화는 main의 요약으로 대신하지 않고 원문 그대로 해당 `process` cycle에 남긴다. Current 트랙에서 원문으로 남은 유일한 전환점 발화가 이후 작업의 가장 강한 앵커였고, 간접 서술만 남은 판정은 재검토가 불가능했다.

### 만들지 말 것

- core/ 안의 4번째 문서(principles.md, lessons-learned.md 류) — 재진입 경로(active-state index → core 3종)에 자동 편입되지 않으면 읽히지 않는 문서가 되고, 편입하면 review-workflow·workflow와 이중 소유가 생긴다. argument_limits의 조건이 충족되기 전에는 만들지 않는다.
- 원리 7개를 repo 전역 editorial/로 승격 — goal이 판단 범위를 workspace로 못박았고, 나머지 네 편에서 반복 사용이 검증되기 전이다.
- core 문서에 사건 서사 전체를 인라인 복붙 — 계약 문서가 회고록이 된다. 규칙당 근거 사건 링크 1개로 제한한다.
- active-state/index.md에 원리 7개 전문 나열 — index는 낮은 해상도 지도라는 유지 원칙과 충돌한다. 현재 결론 1~2줄과 링크만 둔다.
- 새 checklist형 발행 게이트, 새 agent/skill — 기존 prepublish check와 회수 계약이 이미 그 자리를 소유하며, 원리 5(모든 개선은 새 오류 주입)가 경고하는 과교정의 전형이다.

### 기존 보강 vs 새로 필요

기존 보강으로 충분한 부분: 실행 가능한 규칙 전부가 기존 core 두 문서의 기존 절에 자연스러운 자리를 갖는다 — packet 재단과 frame 의심(review-workflow '입력'), 통과=경계 내 사실·수렴 규칙·승격 거부 목록(review-workflow '회수'), 사용자 발화 원문 보존(workflow '현재 판단 갱신'), 과교정 확인(workflow '4. Review와 회수'). criteria.md는 원리 3의 판단축 접점을 이미 갖고 있어 무변경. 원리 전문과 추출 과정은 process 기록(기존 관행), 현재 결론 반영은 active-state index. 기존 구조에 정확한 자리가 없는 부분: 원리들의 종합 — 7개가 서로 연결된 하나의 진단("품질을 만든 것은 판별 수가 아니라 frame·통과 읽기·승격 거부였다")으로서의 전체 그림. 이것은 '반복 기준'이라 active-state 소유권(현재 그림)과 어긋나고, '서사적 근거'라 core 계약 문서에 다 담기지 않으며, process에 두면 재진입 기본 경로에서 빠진다. 최소안은 이를 서두 지배 문장 2개 + 규칙별 링크로 근사한다.

### 평가 기준

- 재진입 테스트: 다음 글(ai-self-check) 작업을 표준 재진입 경로(active-state index → core)만 읽고 시작했을 때 packet 재단, 통과의 경계 내 읽기, 승격 거부, 원문 보존이 실제 행동으로 나타나는가.
- 복원 가능성: 보강된 각 규칙의 근거 사건 링크를 열면 그 규칙이 나온 실제 사건이 재구성되는가 — 링크가 장식이 아니라 판단 감각의 재접근 경로로 작동하는가.
- 계약 성격 유지: 보강 후에도 review-workflow.md·workflow.md의 서두 소유권 선언과 충돌하는 내용이 없고, 문서가 계약에서 교훈 모음으로 변질되지 않았는가.
- 사용 흔적: 다음 cycle의 회수 기록에서 승격 거부 목록과 '보지 못한 층위' 한 줄이 실제로 인용·기재되는가.
- 원문 보존 실행: 다음 cycle의 process에 사용자 전환점 발화가 main의 요약이 아니라 원문 인용으로 남는가.
- 재발 감시(argument_limits 판별 겸용): 규칙이 지켜졌는데도 통과의 완료 오독이나 과교정이 같은 형태로 재발하는가 — 재발하면 최소안의 감각 전달 실패이자 새 층위의 근거.

### 논증의 한계

최소안이 정직하게 실패하는 지점 세 가지. (1) 종합의 자리: 원리 7개는 개별 규칙의 합이 아니라 하나의 연결된 진단인데, 최소안은 이를 두 문서에 분산하고 전체 종합은 process 기록에만 남긴다. workflow.md가 명시하듯 process는 재진입 기본 context가 아니므로, 다음 글 작업자는 규칙은 실행해도 '왜'의 감각 없이 형식 준수로 퇴화할 수 있다. 서두 지배 문장 2개는 근사이지 종합이 아니다. (2) 구조 자체의 신호: active-state 유지 원칙은 '현재도 유효한 판단이 커지면 active-state/ 하위 파일로 나눈다'고 말한다. 이 원리들이 바로 그 '커진 유효한 판단'이라면 기존 구조가 스스로 새 파일을 요구하는 셈인데, 원리들은 '현재 그림'이 아니라 '반복 기준' 성격이라 active-state 소유권과도 어긋난다. 즉 반복 기준이면서 계약 문서에 다 담기지 않는 서사적 근거를 가진 산출물의 자리가 기존 5층위에 정확히 없다 — 이것이 새 층위의 가장 강한 잠재 근거다. (3) 밀도 손실: 원리 5(발행을 막은 사실 오류 2건 모두 개선이 만들었다)와 원리 6(실패는 전부 회수에서 났다)의 사건 밀도는 규칙 한 줄 + 링크 1개로는 다 전달되지 않는다. 판별 조건: 다음 cycle에서 보강 규칙이 지켜졌는데도 같은 실패 형태가 재발하면 최소안의 감각 전달이 실패한 것이고, 그때 종합을 재진입 경로에 두는 새 자리가 정당화된다.
