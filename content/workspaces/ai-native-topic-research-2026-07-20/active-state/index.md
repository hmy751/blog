---
작성일: 2026-07-28
갱신일: 2026-07-28
성격: 현재 전체 그림과 단일 cursor
공개상태: 내부 작업 문서
---

# Active state

이 문서는 이 작업 단위의 현재 전체 그림을 낮은 해상도의 트리로 유지한다. 라벨이 없는 노드는 현재 함께 작업할 기본 그림이며 영구 불변이라는 뜻은 아니다. 긴 근거와 과거 과정은 링크로 접는다.

- `[열림]`: 지금 판단하거나 시험할 질문
- `[보류: 다시 볼 조건]`: 현재 작업을 막지 않으며 조건이 충족될 때 다시 볼 질문
- 독립 review와 main의 제안은 사용자 합의로 자동 승격되지 않는다.

## 현재 지도

- 작업의 목적
  - AI 도구 자체보다 개발자가 AI와 일하며 새로 얻거나 바꾼 판단·통제 방식을 공개 글로 만든다.
  - 후보 가치, shaping 상태, 근거 준비도, 주장 상한은 서로 대신하지 않는다.
  - 한 사실이나 장면의 문제가 후보 전체 또는 사용자의 해석을 자동으로 틀린 것으로 만들지 않는다.
  - 반복 판단축은 [core/criteria.md](../core/criteria.md), 실제 원천은 [sources/index.md](../sources/index.md)가 소유한다.

- 현재 산출물
  - [src](../src/README.md)에 `public-reshape-v1` 다섯 편만 최신 작업본으로 둔다.
  - 이전 v1~v3, post-sync, near-final 원고는 해당 [process/shaping](../process/shaping/README.md) 과정 안에 이전 결과물로 둔다.
  - 다섯 편의 목록에는 후보 가치나 발행 순위가 없다.

- 다섯 글의 현재 그림
  - Current / active-state operation
    - 중심은 `current`의 실패담보다 전체 그림과 단일 cursor를 보여 주며 세션 사이의 sync를 돕는 scaffolding에 있다.
    - Q1~Q5 오류는 한계와 회수 과정을 보여 주는 자료이지, `current` 전체가 나빴다는 판정 근거가 아니다.
    - Q1~Q5 회수는 사용자 정정, current 지도, process와 직접 원천이 함께 작동한 결과다. `current` 단독 효과로 주장하지 않는다.
    - `[열림]` 지금 초안의 대표 장면이 이 중심을 충분히 살리는지, 다른 장면이 더 맞는지 다시 본다.
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

- review와 다음 편집
  - 2026-07-27 contextual review와 [main adjudication](../process/shaping/2026-07-27-public-reshape/04-main-adjudication.md)은 당시 입력에서 나온 판정으로 보존한다.
  - 2026-07-28 [draft-only blind review](../process/shaping/2026-07-27-public-reshape/05-blind-draft-only-quality-criteria.md)는 다섯 편 모두 `partial rewrite`로 판정했다.
  - blind review는 원고만 읽었고 사실·source 검증과 main 조율을 포함하지 않았다. 현재 그림을 바꾼 합의가 아니라 새 관찰이다.
  - `[보류: 새 workspace 구조 검토 뒤]` 두 review 관점과 현재 그림을 대조해 한 편부터 고칠지 다섯 편을 함께 볼지 정한다.

- 현재 작업
  - `*-> 지금*` `[열림]` 새 층위와 첫 active-state 트리가 의도한 sync 장치로 작동하는지 사용자와 검토한다.
  - `[열림]` 실제 항목을 보며 `core/criteria`, `active-state`, `process`의 경계가 맞는지 조정한다.

- 발행
  - `[보류: 다음 edit 범위와 첫 글을 정한 뒤]` 첫 글, 최종 제목, article type, 발행 순서, 연결 또는 시리즈 여부를 정한다.
  - 선택한 원고가 공개 전 후보가 되면 `content/drafts/`로 승격해 repo prepublish 흐름에 넣는다.

## 갱신 계약

- 현재 그림이나 cursor가 바뀔 때 이 문서를 덮어쓴다.
- 독립 review가 완료됐다는 사실과 그 결론을 채택했다는 판단을 구분한다.
- 명백한 사실 오류는 직접 원천으로 고치고 사용자에게 보고한다.
- 대표 장면, 큰 구조, 글의 중심, 사용자의 경험·해석 변경은 사용자와 상의한 뒤 반영한다.
- 완료된 설명과 이전 상태는 `process`로 내리고 이 트리에 계속 누적하지 않는다.
- 진행 표시는 이 문서에 정확히 하나만 둔다.
