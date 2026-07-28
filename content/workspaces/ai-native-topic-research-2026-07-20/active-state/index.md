---
작성일: 2026-07-28
갱신일: 2026-07-29
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
- 반복 기준, 직접 원천, 지난 과정, 현재 작업본의 상세는 각각 `core`, `sources`, `process`, `src`로 연결한다. 링크를 열지 않아도 무엇을 거쳤고 무엇이 현재 유지되는지 알 수 있어야 하며, 자세한 이유가 필요할 때만 링크로 내려간다.
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
  - [src](../src/README.md)는 아직 workspace 안에서 수정할 원고만 소유한다. Current는 최종 품질 review 뒤 [공개 전 후보](../../../drafts/current-active-state-operation.md)로 승격했다. 이전 결과물은 각 shaping cycle 안에 두되, 현재 판단은 이 지도와 필요한 active-state 상세가 소유한다.

- 다섯 글의 현재 그림
  - Current / active-state operation `*-> 지금*`
    - 기록이 많아도 지금 무엇이 유효한지 다시 추론해야 했던 경험에서 시작해, 전체 생각지도와 현재 판단점 하나로 사람과 AI의 sync를 돕는 scaffolding을 다룬다.
    - 유튜버 Alex가 AX 인재전쟁에서 전체 문제 해결 과정을 외부화한 scaffolding을 보고, 기존 context 문제와 결합해 `전체 지도 + 현재 위치 하나`로 변형한 생성 계보에서 시작한다.
    - 첫 재진입과 research 수렴은 실제 사용 장면, Q1~Q5의 최근 맥락 편향과 terminal gap은 한계 장면, Cofathon의 문서 축소와 역할별 재진입 분리는 후속 재설계다. current 단독 효과나 전체 실패로 쓰지 않는다.
    - 최종 품질 review와 사용자 확인 뒤 [content/drafts 원고](../../../drafts/current-active-state-operation.md)로 승격했다.
    - 현재 material, 합의된 중심, 작업본 상태와 열린 판단은 [Current 글 active-state](./current-active-state-operation.md)가 소유한다.
  - Independent review and recovery
    - 독립성은 reviewer 수가 아니라 입력, 원자료 접근, 질문 수정, write·완료 권한, main의 회수 구조에서 만든다.
    - 독립 판정은 새 정답이 아니며 사용자에게 차이와 충돌이 보이기 전에 main의 기존 언어로 합치지 않는다.
  - Product-flow scope control
    - 작게 만드는 일과 제품의 중심 작용을 대체 결과로 바꾸는 일을 구분한다.
    - 한 slice에서 `사용자 입력 → 핵심 변환 → 사용자가 읽는 출력 → 다음 행동`의 책임 경로를 보존한다.
  - Judgment order
    - 가치와 후보를 펼치는 일, 개별 주장을 판정하는 일, 후보를 수렴하는 일은 다른 시점과 권한을 가진다.
    - 발산은 사실 검증을 늦추는 일이 아니라, 개별 사실의 오류로 후보 공간 전체를 너무 일찍 닫지 않는 일이다.
  - AI self-check
    - 답을 다시 설명하는 것보다 AI 자신의 framing·전제·scope·다음 행동을 별도 판별 대상으로 만드는 데 중심이 있다.
    - Independent 글과 연결하되 합치지 않는다. Independent는 외부 판단 위치의 계약, Self-check는 main의 판단을 그 위치에 올릴 조건을 맡는다.

- review와 개선 loop
  - 2026-07-27 contextual review와 [main adjudication](../process/shaping/2026-07-27-public-reshape/04-main-adjudication.md)은 당시 입력에서 나온 판정으로 보존한다.
  - 2026-07-28 [원고만 본 당시 quality review](../process/shaping/2026-07-27-public-reshape/05-blind-draft-only-quality-criteria.md)는 다섯 편 모두 `partial rewrite`로 판정했다.
  - 위 review는 원고만 읽었지만 다음 version의 평가 기준, 필요한 자료, 구조 move까지 제안했다. 반면 Current 재작성 뒤의 마지막 검토는 원고와 고정 질문만 보고 `light edit`으로 닫혀, 원천에 남은 동기·판단 재료의 누락을 보지 못했다.
  - 다음 개선에는 결과물과 직접 원천을 대조하는 [review workflow](../core/review-workflow.md)를 적용한다. 원고만 처음 읽히는 모습을 보는 검토와 사실 verifier는 다른 역할로 유지한다.
  - Current는 생성 계보와 직접 원천을 복구한 뒤 focused shaping을 거쳤고, 2026-07-29 [통합 review와 main 회수](../process/shaping/2026-07-28-current-scaffolding-rewrite/04-post-shaping-review-and-recovery.md) 뒤 [Texture·Tone·Evidence 전문 review](../process/shaping/2026-07-28-current-scaffolding-rewrite/05-final-quality-specialist-review-and-recovery.md)까지 마쳤다. 원고 품질 회수와 draft 승격은 끝났고, 발행 선택 뒤 metadata·공개 링크·post 승격·deterministic check만 남았다.

- 작업 context 구조
  - 2026-07-28 backlog와 drafts를 workspace로 합치고 `core`, `active-state`, `sources`, `process`, `src`의 역할을 나눴다. 첫 결정과 원문 복구 경로는 [layering decision](../process/context-structure/2026-07-28-layering-decision.md)에 있다.
  - 첫 운용에서는 `최신만 유지`를 `현재 단계만 유지`로 좁혀 읽어 완료된 큰 가지와 이미 확보한 material이 지도에서 사라졌고, review도 입력 제한만 남아 개선 기준 갱신 역할이 빠졌다.
  - 전체 생각지도와 source+result 개선 review로 고친 뒤, 여러 live 문서에 반복된 review 계약도 [core/review-workflow.md](../core/review-workflow.md)로 분리했다. 현재 소유권과 보정 이유는 [첫 운용 보정 기록](../process/context-structure/2026-07-28-active-map-and-improvement-review-refinement.md)에 남겼다.
  - 관심사별 소유권을 정리한 현재 구조가 역할별 재진입과 다음 review에서 필요한 그림만 복구하는지는 Current shaping·review 과정에서 계속 확인한다.

- 발행
  - Current를 첫 공개 전 후보로 정해 [content/drafts](../../../drafts/current-active-state-operation.md)로 승격했다.
  - `[보류: 실제 발행을 선택한 뒤]` 최종 제목·readTime·tags·발행일을 확정하고 `content/posts/` 승격과 prepublish 검사를 진행한다.
  - 나머지 네 편의 발행 순서, 연결 또는 시리즈 여부는 아직 정하지 않았다.
