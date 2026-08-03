---
작성일: 2026-07-28
갱신일: 2026-08-03
성격: 현재 전체 그림과 단일 cursor
공개상태: 내부 작업 문서
---

# Active state

이 문서는 이 작업 단위에서 사람과 AI가 전체 그림과 현재 위치를 맞추기 위한 active-state다. 본체는 현재 단계의 요약이 아니라, 이 작업의 전체 생각 구조를 낮은 해상도로 보여 주는 최신 지도다.

## 유지 원칙

- 새 session을 시작하거나 대화가 엉켰을 때 이 문서부터 읽고 작업의 목적, 현재 위치, 다음 판단을 맞춘다. 사용자가 가진 전체 그림과 다르면 작업을 이어가기 전에 이 문서를 고친다.
- 현재 그림은 낮은 해상도의 트리로 둔다. 작업을 시작한 이유, 조사와 판단의 큰 가지, 현재 산출물, 열린 질문과 다음 방향을 같은 화면에서 본다. 완료된 큰 가지도 현재 위치나 중심을 이해하는 데 필요하면 현재 결론을 한두 줄로 접어 남긴다.
- 사람과 AI가 늘 같은 자리에서 전체 그림을 맞출 수 있도록 `## 현재 지도`는 이름과 문서 안의 층위를 유지한다. 그 아래 트리의 첫 가지와 골격은 현재 그림을 더는 제대로 담지 못할 때 바꿀 수 있지만, 정리 편의를 위해 임의로 바꾸지는 않는다. 골격을 바꿔야 한다면 먼저 사용자와 새 그림을 맞춘다.
- 방향이 바뀌면 각 가지의 현재 결론을 최신 상태로 덮어쓰고, 이전 상태와 갱신 과정은 `process`에 남긴다. 최신만 남긴다는 말은 현재 단계만 남긴다는 뜻이 아니다. 전체 지도 안에서 각 가지의 최신 해석을 유지한다.
- 현재도 유효한 판단이 커지면 `active-state/` 하위 파일로 나누고, 이 지도에는 그 판단의 역할·현재 결론·링크를 남긴다. `process`는 커진 판단을 접는 곳이 아니라 그 판단이 만들어지고 달라진 과정을 보존하는 곳이다.
- 판단이 세워지는 방식, 직접 원천, 지난 과정, 현재 작업본의 상세는 각각 `core`, `sources`, `process`, `src`로 연결한다. 링크를 열지 않아도 무엇을 거쳤고 무엇이 현재 유지되는지 알 수 있어야 하며, 자세한 이유가 필요할 때만 링크로 내려간다.
- 라벨 없는 노드는 현재 함께 작업할 기본 그림이며 영구 불변이라는 뜻은 아니다. 지금 판단하거나 시험할 질문은 `[열림]`, 현재 작업을 막지 않으며 다시 볼 조건이 있는 질문은 `[보류: 다시 볼 조건]`으로 표시한다. 미래 가지는 확정 계획이 아니라 현재 보이는 가설로 다룬다.
- 진행 cursor는 이 `index.md`에 정확히 하나만 둔다. 하위 active-state 파일에는 별도 cursor를 만들지 않는다.
- 독립 review와 main의 제안은 그 자체로 현재 그림이 아니다. [review workflow](../core/review-workflow.md)의 회수 뒤 현재 함께 작업할 판단이 실제로 바뀐 경우에만 지도에 반영한다.

## 현재 지도

- 작업의 목적
  - AI 도구 자체보다 개발자가 AI와 일하며 새로 얻거나 바꾼 판단·통제 방식을 공개 글로 만든다.
  - 후보 가치, shaping 상태, 근거 준비도, 주장 상한은 서로 대신하지 않는다.
  - 한 사실이나 장면의 문제가 후보 전체 또는 사용자의 해석을 자동으로 틀린 것으로 만들지 않는다.
  - 반복 판단축은 [core/criteria.md](../core/criteria.md), 실제 원천은 [sources/index.md](../sources/index.md)가 소유한다.

- 조사와 후보 형성
  - 2026-07-20에 AX 마이리얼트립, Tripproof, ai-note, Cofathon과 공개 배경 자료를 대조해 AI와 일하며 판단·통제 방식이 바뀐 사건을 다시 모았다. 직접 원천의 현재 입구는 [sources](../sources/index.md), 조사와 후보 형성 과정은 [process/candidates](../process/candidates/README.md)가 맡는다.
  - 기존 후보를 고치는 대신 원자료에서 다시 추출한 결과를 대조했고, 사실 오류·후보 가치·shaping 상태·근거 준비도·주장 상한을 서로 다른 판정으로 유지했다.
  - 이 과정을 거쳐 Current, Independent review, Product-flow scope, Judgment order, AI self-check 다섯 중심을 남겼다. 이 다섯 편은 순위나 발행 순서가 아니다.

- 글감과 원고화
  - 2026-07-23 [첫 shaping 묶음](../process/shaping/README.md#2026-07-23-first-pass)은 각 후보의 첫 장면, 중심 질문, 판단이 바뀐 사건, 사용자 판단, 공개 자료와 한계를 이미 펼쳤다. 이후 작업에서 이 material이 사라졌다고 새로 수집할 단계로 오인하지 않는다.
  - 다섯 후보를 v1~v3로 써 본 뒤 사용자와 중심을 다시 맞췄고, post-sync, near-final, public reshape를 거쳤다. `near-final`이라는 이름도 사용자 검토 뒤 철회될 수 있었으며, 자세한 변화는 [process/shaping](../process/shaping/README.md)에 보존한다.
  - [src](../src/README.md)는 아직 workspace 안에서 수정할 원고만 소유한다. Current는 review를 마치고 workspace 밖 [발행글](../../../posts/2026-07-29-current-active-state-operation.md)이 됐으므로 이후 수정은 repo의 발행 원고 기준을 따른다. 이전 결과물은 각 shaping cycle 안에 두되, 현재 판단은 이 지도와 필요한 active-state 상세가 소유한다.

- 다섯 글의 현재 그림
  - Current / active-state operation
    - 기록이 많아도 지금 무엇이 유효한지 다시 추론해야 했던 경험에서 시작해, 전체 생각지도와 현재 판단점 하나로 사람과 AI의 sync를 돕는 scaffolding을 다룬다.
    - 유튜버 Alex가 AX 인재전쟁에서 전체 문제 해결 과정을 외부화한 scaffolding을 보고, 기존 context 문제와 결합해 `전체 지도 + 현재 위치 하나`로 변형한 생성 계보에서 시작한다.
    - 첫 재진입과 research 수렴은 실제 사용 장면, Q1~Q5의 최근 맥락 편향과 terminal gap은 한계 장면, Cofathon의 문서 축소와 역할별 재진입 분리는 후속 재설계다. current 단독 효과나 전체 실패로 쓰지 않는다.
    - 최종 품질 review와 발행 직전 3중 독립 판별을 거쳐 2026-07-29 [발행글](../../../posts/2026-07-29-current-active-state-operation.md)이 됐다.
    - 현재 material, 합의된 중심, 작업본 상태와 열린 판단은 [Current 글 active-state](./current-active-state-operation.md)가 소유한다.
  - Independent review and recovery
    - 독립성은 reviewer 수가 아니라 입력, 원자료 접근, 질문 수정, write·완료 권한, main의 회수 구조에서 만든다.
    - 독립 판정은 새 정답이 아니며 사용자에게 차이와 충돌이 보이기 전에 main의 기존 언어로 합치지 않는다.
    - 현재 원고와 2026-07-29 개선 review에는 역할 계약의 생성 배경이 충분히 들어가지 않았다. [독립 판별 생성 계보 source packet](../sources/independent-review-origin-and-operation.md)으로 기존 artifact에 묶인 판단, main의 회수 실패, 닫힌 입력을 상속한 judge, 사용자가 제안한 worker–main–fresh–사용자 loop를 다시 확보했다. 최종 중심과 첫 장면은 아직 열어 둔다.
  - Product-flow scope control
    - 작게 만드는 일과 제품의 중심 작용을 대체 결과로 바꾸는 일을 구분한다.
    - 한 slice에서 `사용자 입력 → 핵심 변환 → 사용자가 읽는 출력 → 다음 행동`의 책임 경로를 보존한다.
  - Judgment order
    - 가치와 후보를 펼치는 일, 개별 주장을 판정하는 일, 후보를 수렴하는 일은 다른 시점과 권한을 가진다.
    - 발산은 사실 검증을 늦추는 일이 아니라, 개별 사실의 오류로 후보 공간 전체를 너무 일찍 닫지 않는 일이다.
  - AI self-check
    - 최신 [AI self-check 원고](../src/ai-self-check.md)는 `더 근본적으로 보라`는 정정을 받은 AI가 자기 탐색과 분류를 원인에 넣지 않고 더 큰 문서화 일반론으로 이동한 발단에서 시작한다. 최초 inline 규칙, 정확한 진단 뒤 같은 방향으로 돌아간 demo, fresh 판별과 main 회수, 맞는 판정을 적용하며 다른 조사 경로를 지운 장면, 입력 pull과 호출 문턱 축소까지 이어진다.
    - 현재 중심 질문은 `AI가 자신의 오류를 그럴듯하게 설명했을 때 실제로 무엇이 고쳐졌다고 볼 수 있는가`다. 결론보다 문제 정의·전제·입력 범위·작업 순서·직후 행동 중 달라진 위치를 보고, `진단 정확도 / 직후 행동 변화 / 장기 재발 감소`를 다른 결과로 둔다.
    - [AI self-check 생성 계보 source packet](../sources/ai-self-check-origin-and-operation.md)의 주장 상한을 유지한다. 최초 fresh 전환 날짜와 당시 개인 동기는 만들지 않고, fresh 판별의 보편적 우월성이나 장기 재발 감소도 주장하지 않는다.
    - [Material·Shaping 실행 cycle](../process/shaping/2026-08-01-ai-self-check-material-shaping-loop/README.md)에서 Round 01의 source 밖 1인칭 기대를 회수했고, 서로 다른 fresh reviewer가 Round 02·03에 연속 전체 통과를 냈다. 이 결과는 현재 src의 기준점으로 유지하되, 후속 사용자 인터뷰에서 저자 판단과 현재 회고가 충분히 살아나지 않은 문제가 확인돼 전체 원고 개선을 다시 열었다.
    - [저자 판단 인터뷰](../process/2026-08-01-ai-self-check-author-judgment-interview.md)는 사용자가 늘 완성된 정답을 가진 것은 아니며, 어긋남의 감각과 AI의 후보 해석을 대조하며 기준을 더 선명하게 한 경험, fresh 판별에서 본 가치와 한계, 계속 사용하며 뒤늦게 생긴 이해를 구분해 보존한다. 지금의 이해를 최초 설계 의도로 소급하지 않는다.
    - [통합 원고 개선 cycle](../process/shaping/2026-08-02-ai-self-check-integrated-draft-loop/README.md)은 인터뷰와 직접 원천을 저자·원고 지도로 만든 뒤 최대 5회 완결본·통합 review·Main 회수를 실행했다. Round 05는 thread 안 agent 상한을 피해 standalone ephemeral·read-only reviewer에게 새 입력 경계의 전체 판정을 받았고, 고우선 blocker 없이 국소 move를 회수했다. 최종본은 evidence P0·P1 없이 현재 src에 반영됐고, 원고만 읽은 [blind reader transfer test](../process/shaping/2026-08-02-ai-self-check-integrated-draft-loop/final-reader-transfer-test.md)에서도 낯선 대화의 다섯 위치를 구분해 다음 요청 하나로 바꾸는 데 성공했다.
    - 2026-08-03 checkpoint에서 사용자는 이 글을 나의 회고가 아니라 개발 글(개발적 회고)로 정정했다. 했다체와 `나`는 발행 개발 글의 합니다체와 `저`로 바꾸고, 재료와 큰 틀은 유지한 채 언어화되지 않은 잔여 아쉬움을 후보 대조로 좁힌다. checkpoint 전에 받은 [standalone review](../process/shaping/2026-08-03-ai-self-check-standalone-improvement-review/review.md)의 회수를 포함해, 실행은 [개발 글 정합 계획](../process/2026-08-03-ai-self-check-dev-article-refinement-plan.md)이 소유한다.
    - Independent 글과 연결하되 합치지 않는다. Independent는 외부 판단 위치의 계약, Self-check는 main의 판단을 그 위치에 올릴 조건을 맡는다.

- review와 개선 loop
  - 2026-07-27 contextual review와 [main adjudication](../process/shaping/2026-07-27-public-reshape/04-main-adjudication.md)은 당시 입력에서 나온 판정으로 보존한다.
  - 2026-07-28 [원고만 본 당시 quality review](../process/shaping/2026-07-27-public-reshape/05-blind-draft-only-quality-criteria.md)는 다섯 편 모두 `partial rewrite`로 판정했다.
  - 위 review는 원고만 읽었지만 다음 version의 평가 기준, 필요한 자료, 구조 move까지 제안했다. 반면 Current 재작성 뒤의 마지막 검토는 원고와 고정 질문만 보고 `light edit`으로 닫혀, 원천에 남은 동기·판단 재료의 누락을 보지 못했다.
  - 다음 개선에는 결과물과 직접 원천을 대조하는 [review workflow](../core/review-workflow.md)를 적용한다. 원고만 처음 읽히는 모습을 보는 검토와 사실 verifier는 다른 역할로 유지한다.
  - Current는 생성 계보와 직접 원천을 복구한 뒤 focused shaping을 거쳤고, 2026-07-29 [통합 review와 main 회수](../process/shaping/2026-07-28-current-scaffolding-rewrite/04-post-shaping-review-and-recovery.md) 뒤 [Texture·Tone·Evidence 전문 review](../process/shaping/2026-07-28-current-scaffolding-rewrite/05-final-quality-specialist-review-and-recovery.md)까지 마쳤다.
  - draft 승격 뒤에는 입력 경계를 서로 다르게 자른 [3중 독립 판별](../process/shaping/2026-07-28-current-scaffolding-rewrite/06-final-stage-triple-review-and-recovery.md)로 발행 직전 품질을 다시 봤다. 세 판별 모두 중심·구성 유지로 판정했고, 도식·용어·반복 문장 중심의 개선을 원고에 반영했다. 원고 품질 회수는 끝났고, 발행 선택 뒤 제목·metadata·post 승격·deterministic check만 남았다.
  - 2026-07-29 Independent review와 AI self-check 두 편의 병렬 개선 round를 시작했다. 대상과 최소 목표 frame을 사용자와 합의해 [review goal 보정 기록](../process/context-structure/2026-07-29-review-commission-goal-boundary.md)에 남겼고, 두 원고 각각에 결과물을 개선하는 review를 맡겼다.
  - 첫 improvement review와 [AI self-check 후보 카드](../process/shaping/2026-07-29-parallel-improvement-round/02-ai-self-check-improvement-candidate-cards.md)는 현재 원고의 장면·전환·개념 문제를 찾았지만 생성 배경과 실제 운영 계보를 입력으로 받지 못했다. 이후 두 글의 origin·operation source packet을 만들고 [material 재평가](../process/shaping/2026-07-29-parallel-improvement-round/03-origin-genealogy-material-reassessment.md)에서 기존 후보의 입력 한계를 표시했다.
  - AI self-check의 첫 재개선은 별도 material 카드 선택을 선행하지 않고 [Source 기반 원고 개선과 단계별 review loop](../process/2026-08-01-material-shaping-loop-discussion.md)를 실제로 시험했다. Source 기반 v0 뒤 fresh reviewer를 매 회차 교체했고, Main은 Material부터 회수한 뒤 Shaping을 다시 판단했다. [실행 cycle](../process/shaping/2026-08-01-ai-self-check-material-shaping-loop/README.md)은 Round 01 `Fail`과 회수, Round 02·03 연속 `Pass`, 회차별 원고와 기준 ledger를 보존한다.
  - 후속 [기존 src 기반 전체 원고 개선 계획](../process/2026-08-01-ai-self-check-integrated-draft-improvement-plan.md)은 Texture 전용 계획을 넓혔다. Main이 인터뷰와 source로 저자·원고 지도를 만들고, 작성 worker가 완결본을 쓴다. 회차마다 fresh reviewer 한 명이 같은 원고를 Material·Shaping·Texture·Reader Flow 책임별로 나눠 보고하며, Main은 그 순서로 회수한다. Reviewer에게 사용자 인터뷰와 지도, 이전 report는 주지 않는다.
  - 위 계획을 [2026-08-02 통합 개선 cycle](../process/shaping/2026-08-02-ai-self-check-integrated-draft-loop/README.md)로 실행해 다섯 회차, Round 05 standalone fresh review, 최종 evidence regression까지 마쳤다. 먼저 받은 non-fresh diff regression은 독립 통과 판정으로 올리지 않고 실행 이력으로만 남겼다.
  - 2026-08-03 checkpoint는 전체 수용 대신 유형 정정(개발 글, 톤 전환)과 언어화되지 않은 잔여 아쉬움을 냈다. checkpoint 전에 별도로 받은 [standalone fresh review](../process/shaping/2026-08-03-ai-self-check-standalone-improvement-review/review.md)와 함께 [개발 글 정합 계획](../process/2026-08-03-ai-self-check-dev-article-refinement-plan.md)으로 이어진다.
  - 다음 단일 cursor: [개발 글 정합 계획](../process/2026-08-03-ai-self-check-dev-article-refinement-plan.md)의 준비(톤 전환 → 재독으로 잔여 아쉬움과 보류 결정 3건 확정 → 반영)를 실행하고, 최대 3회 개선 loop로 넘어간다. `*→ 지금*`

- 작업 context 구조
  - 2026-07-28 backlog와 drafts를 workspace로 합치고 `core`, `active-state`, `sources`, `process`, `src`의 역할을 나눴다. 첫 결정과 원문 복구 경로는 [layering decision](../process/context-structure/2026-07-28-layering-decision.md)에 있다.
  - 첫 운용에서는 `최신만 유지`를 `현재 단계만 유지`로 좁혀 읽어 완료된 큰 가지와 이미 확보한 material이 지도에서 사라졌고, review도 입력 제한만 남아 개선 기준 갱신 역할이 빠졌다.
  - 전체 생각지도와 source+result 개선 review로 고친 뒤, 여러 live 문서에 반복된 review 계약도 [core/review-workflow.md](../core/review-workflow.md)로 분리했다. 현재 소유권과 보정 이유는 [첫 운용 보정 기록](../process/context-structure/2026-07-28-active-map-and-improvement-review-refinement.md)에 남겼다.
  - 관심사별 소유권을 정리한 현재 구조가 역할별 재진입과 다음 review에서 필요한 그림만 복구하는지는 Current shaping·review 과정에서 계속 확인한다.
  - Current 발행 뒤 트랙 전체를 회고해 [판단 순간의 감각](../core/moments.md)을 신설하고, 새 사실 주장 확인·반영 재확인·기록 규칙·원문 보존을 core 계약 문서에 보강했다. 결정 과정과 근거 사건 매핑은 [보강 기록](../process/context-structure/2026-07-29-current-track-principles-and-core-reinforcement.md)에 있다. 다음 글 cycle에서 실제로 쓰이는지가 이 보강의 검증이다.
  - 두 글 병렬 개선의 review를 맡기기 전, goal에 main의 진단과 지금 원고의 중심 문장이 섞여 들어가는 구멍을 확인했다. 다른 workspace 판을 참고해 review-workflow에 `Review가 필요한 이유`와 `대상과 최소 목표` frame 절을 세우고 moments에 `주는 순간`을 추가했다. 정정 원문과 반영 범위는 [review goal 보정 기록](../process/context-structure/2026-07-29-review-commission-goal-boundary.md)에 있다.
  - `[열림]` 원칙 층(계속 지켜야 할 계율)을 둘지, 둔다면 어떤 내용과 형태로 둘지는 사용자가 고민 중이다. 시도했던 원칙 3개의 문안은 보강 기록에 보존되어 있다.

- 발행
  - Current를 이 workspace의 첫 발행글로 정해 2026-07-29 [content/posts](../../../posts/2026-07-29-current-active-state-operation.md)로 승격했다. 제목 꼬리·tags·발행일 확정과 deterministic prepublish 통과까지 마쳤다.
  - `[열림]` 나머지 네 편의 발행 순서, 연결 또는 시리즈 여부는 아직 정하지 않았다. Current에 쓴 `AI Native` 태그를 시리즈 우산으로 이어갈지도 그때 함께 본다.
