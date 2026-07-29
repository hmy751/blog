---
작성일: 2026-07-29
성격: 실제 core 형태를 가정해 조립했던 첫 확장 기록
현재상태: 미채택 / 현재 수렴의 직접 입력이 아닌 coverage 참고
---

# Harness Element Candidates

이 디렉토리는 `candidates/`의 패턴 문구를 그대로 옮긴 곳이 아니다. 실제 하네스 요소가 되었다고 가정했을 때 어떤 입력을 받고, 무엇을 판단하며, 무엇을 반환하고, 누가 채택하는지를 요소 단위로 조립한 후보군이다.

아직 원본 `ai-native-topic-research-2026-07-20/core/`에 반영하지 않는다.

Codex·Claude 공식 문서와 기존 일반 하네스 조사는 이 디렉토리의 내용을 정하는 기준으로 쓰지 않았다. 그 자료에서 추출한 형식 후보는 [별도 형식 카탈로그](../harness-form-catalog/)에 분리했다.

이 기록은 현재 `src/`가 아니다. source 기반 문제 후보 지도를 먼저 만든 뒤, 중요한 판단을 빠뜨리지 않았는지 점검할 때만 보조 자료로 연다.

## 읽는 순서

1. [전체 하네스 요소 목록](./00-harness-element-index.md)에서 후보 범위를 본다.
2. 관심 있는 요소 유형의 실제 계약 후보를 읽는다.
3. [조립 구조 후보](./08-assembled-harness-shapes.md)에서 요소를 어떤 하네스로 묶을 수 있는지 비교한다.

## 문서

- [00 — 전체 하네스 요소 목록](./00-harness-element-index.md)
- [01 — 원칙·criteria 요소](./01-principle-and-criteria-elements.md)
- [02 — workflow·loop·gate 요소](./02-workflow-loop-and-gate-elements.md)
- [03 — context·state·provenance 요소](./03-context-state-and-provenance-elements.md)
- [04 — review·agent·role 요소](./04-review-agent-and-role-elements.md)
- [05 — skill·dispatcher·trigger 요소](./05-skill-dispatch-and-trigger-elements.md)
- [06 — artifact·evaluation·observability 요소](./06-artifact-evaluation-and-observability-elements.md)
- [07 — learning·write-back·maintenance 요소](./07-learning-writeback-and-maintenance-elements.md)
- [08 — 하네스 조립 구조 후보](./08-assembled-harness-shapes.md)

## 후보 상태

- 각 요소는 사용할 수 있을 정도로 구체화했지만 채택된 하네스는 아니다.
- 서로 양립하는 후보와 경쟁하는 후보를 모두 포함한다.
- Current 사례의 판단과 다른 AI-native 작업으로 전이할 판단을 구분한다.
- `core`, `skill`, `agent`, `active-state`, `process`, `source contract`, `artifact`, `audit` 중 어디가 실제 owner가 될지는 아직 정하지 않는다.
- 하나의 문서를 채택한다고 그 안의 모든 요소를 함께 채택할 필요는 없다.
- 이 디렉토리의 다음 작업은 문장 polish가 아니라 사용자 판단에 따른 채택·분리·owner 결정·재조립이다.
