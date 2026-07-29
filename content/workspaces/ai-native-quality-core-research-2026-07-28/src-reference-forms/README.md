---
작성일: 2026-07-29
성격: 공식 문서와 기존 일반 조사에서 추출한 하네스 형식 후보
현재상태: 내용 비채택 / 형식 비교용
---

# Harness Reference Forms

이 디렉토리는 Codex·Claude 공식 문서나 기존 `ai-native-harness`의 권장 내용을 따르는 곳이 아니다. 그 자료에서 확인되는 `담는 위치`, `발동 방식`, `권한`, `격리`, `검증`, `수명주기`의 형식만 추출한다.

내용 후보는 [../src/](../src/)에 있다. 이 디렉토리는 그 내용을 어느 형식에 배치할 수 있는지 비교하기 위한 별도 카탈로그다.

## 읽는 순서

1. [00 — 전체 형식 색인](./00-form-index.md)
2. 필요한 작동 면의 상세 형식
3. [08 — 형식 선택과 조합](./08-form-selection-and-composition.md)
4. [09 — 이번 내용 후보와 형식의 교차 지도](./09-content-to-form-crosswalk.md)

## 문서

- [01 — context·instruction 형식](./01-context-and-instruction-forms.md)
- [02 — procedure·plan·state 형식](./02-procedure-plan-and-state-forms.md)
- [03 — capability·tool·package 형식](./03-capability-tool-and-package-forms.md)
- [04 — role·delegation·isolation 형식](./04-role-delegation-and-isolation-forms.md)
- [05 — config·policy·permission·enforcement 형식](./05-control-and-enforcement-forms.md)
- [06 — artifact·verification·observation 형식](./06-quality-and-observation-forms.md)
- [07 — registry·lifecycle·automation·recovery 형식](./07-lifecycle-automation-and-recovery-forms.md)
- [08 — 형식 선택과 조합](./08-form-selection-and-composition.md)
- [09 — 내용 후보와 형식 교차 지도](./09-content-to-form-crosswalk.md)

## 사용 규칙

- 공식 제품이 제공한다는 이유로 채택하지 않는다.
- 한 내용을 여러 형식에 복제하기 전에 canonical owner와 consumer를 정한다.
- advisory instruction과 runtime enforcement를 같은 보장으로 설명하지 않는다.
- 존재, load, activation, execution, effect를 서로 다른 상태로 본다.
- 형식은 내용의 타당성을 증명하지 않는다.
- 이 디렉토리의 어떤 후보도 현재 global·project harness를 수정하지 않는다.

## 근거

- [Codex·Claude 공식 하네스 surface 조사](../sources/official-harness-surfaces-2026-07-29.md)
- [기존 ai-native-harness 재사용 경계](../sources/local-ai-native-harness-reuse-boundary.md)
