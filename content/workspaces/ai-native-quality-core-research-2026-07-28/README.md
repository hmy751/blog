---
작성일: 2026-07-28
성격: AI-native 품질 개선 판단·작동 방식 조사 workspace
공개상태: 내부 작업 문서
현재단계: 목표 교정 반영 / 실용 후보 수렴 설계
---

# AI-native Quality Harness Research

이 workspace는 한 편의 Current 글을 고치거나 `core` 문서를 완성하는 곳이 아니다. Current 품질 실패와 그 뒤의 대화, 다른 AI-native 사례와 하네스 형식을 비교해 실제 작업에서 차이를 낼 수 있는 판단과 작동 방식을 찾고 시험하는 곳이다.

현재 전체 그림과 진행 cursor는 [active-state](./active-state.md)가 소유한다.

출발점은 다음과 같다.

- Material과 동기는 이미 있었지만 결과와 평가에서 반복적으로 사라졌다.
- 완결된 원고와 여러 review가 있었지만 품질이 같은 frame 안에서 정교해졌다.
- A와 B는 다른 답을 냈지만 Q1~Q5와 최근 사건이 대표 문제라는 전제를 공유했다.
- 사용자의 원래 목적, main의 작업 가설, reviewer의 제안, 현재 중심의 합의 상태가 작업 중 섞였다.
- 약한 결과를 고치는 것과 그 결과를 만든 목표·맥락·제약·평가 체계를 다시 보는 것 사이의 연결이 충분히 정의되지 않았다.
- 이번 논의를 한 번의 교정으로 끝내지 않고, 사용자가 나중에 읽고 판단 감각을 복원할 수 있는 형태로 남길 필요가 있다.

## 현재 목표

> 사용자 의도와 실제 실패 장면을 source에서 복구하고, 공식 문서와 기존 하네스가 제공하는 서로 다른 작동 형식을 비교해, 다른 AI-native 작업에서도 성과를 낼 가능성이 있는 완결된 후보를 만든다. 후보가 실제 판단과 결과를 어떻게 바꾸는지 사례로 확인한 뒤에만 적절한 하네스 위치를 정한다.

여기서 `성과`는 후보 수나 문서 완성도가 아니다. 같은 문제에서 더 나은 판단 또는 결과를 만들거나, 반복 실패를 더 일찍 발견하거나, 다음 작업에서 유효한 판단을 다시 사용할 수 있게 되는 변화를 뜻한다.

## 작업 원칙

- 1·2차 발산 결과는 탐색 기록으로 보존하되 후보를 더 원자화하지 않는다.
- source는 문제의 실제 모습, 인과, 제약, 사용자 품질 신호를 정한다.
- reference form은 가능한 발동·권한·검증 방식을 비교하게 하지만 좋은 내용의 근거가 되지는 않는다.
- 하나의 후보에는 문제부터 작동·기대 변화·증거·한계까지 이어지는 인과가 보여야 한다.
- 실제 사례에서 차이를 만들지 못한 후보는 표현을 다듬어 살리지 않고 보류하거나 버린다.
- Alex의 사례는 실제 원본에서 확인된 범위와 우리의 해석을 분리한다.

## 작업 지도

### Sources

- [source map](./sources/source-map.md)
- [Alex evidence boundary](./sources/alex-evidence-boundary.md)
- [Codex·Claude 공식 하네스 surface 조사](./sources/official-harness-surfaces-2026-07-29.md)
- [기존 ai-native-harness 재사용 경계](./sources/local-ai-native-harness-reuse-boundary.md)

### Material

- [작업 계약과 main 판단 교정](./material/00-task-contract-and-main-correction.md)
- [사용자 의도와 품질 신호](./material/01-user-intent-and-quality-signals.md)
- [관찰된 실패 장면](./material/02-observed-failure-scenes.md)
- [52개 경쟁 원인 가설](./material/03-competing-causal-hypotheses.md)
- [Current·AX·Alex 교차 비교](./material/04-cross-case-comparison.md)
- [열린 질문과 미정의 개념](./material/05-open-questions-and-undefined-concepts.md)
- [분석 차원](./material/06-analysis-dimensions.md)

### Candidates

- [50개 AI-native 패턴 bank](./candidates/01-ai-native-pattern-bank.md)
- [65개 개념 대비와 경계](./candidates/02-concept-contrasts-and-boundaries.md)
- [30개 발동 상황과 대응 선택지](./candidates/03-trigger-situations-and-response-options.md)
- [전이 위험과 반례](./candidates/04-transfer-risks-and-counterexamples.md)

### Synthesis

- [필터링 전 확장 계약](./synthesis/00-expansion-before-filtering.md)
- [필터링 전 전체 확장 지도](./synthesis/01-expanded-landscape.md)
- [문제 후보 선별과 실용 후보 수렴 방향](./synthesis/02-problem-candidate-convergence.md)

### Current output

- [현재 수렴 작업면](./src/)
- [source 기반 문제 후보 지도](./src/01-source-grounded-problem-candidate-map.md)

### References

- [첫 확장에서 만든 84개 하네스 요소 계약](./references/atomic-element-expansion/)
- [공식 문서와 일반 하네스 조사에서 가져온 형식 카탈로그](./references/harness-form-catalog/)

두 reference는 같은 종류가 아니다. 첫째는 이번 사례를 과도하게 원자화했던 내용 확장 기록이고, 둘째는 내용을 담을 수 있는 구현 형식의 카탈로그다. 문제 후보를 source에서 수거하는 동안에는 둘 다 입력으로 사용하지 않는다.

아직 만들지 않은 것:

- source·문제·작동 원리·기대 변화가 이어지는 완결 후보
- 여러 후보를 같은 사례에서 비교한 결과
- Current 밖 사례에서의 전이 검증
- 사용자 합의·보류·기각 상태를 반영한 수거 지도
- 실제 owner와 하네스 형식 결정
- 원본 workspace 또는 다른 하네스 반영

## 현재 상태

관찰, 경쟁 원인, 패턴, 대비, 발동 상황, 반례의 1차 발산과 84개 내용 요소·78개 reference form의 2차 발산을 완료했다. 충분히 펼친다는 요구를 후보 원자 수로 과도하게 해석했다는 사용자 교정을 반영했고, 이 두 결과는 역할이 다른 reference로 옮겼다.

현재 `src/`에 source 기반 문제 후보 지도의 1차 수거본을 만들었다. 원자 목록을 직접 필터링하지 않고, 사용자가 문제의 누락·중복·원인·결과 관계와 우선순위를 판단하는 단계다. 어떤 문제가 중요한지 확인하기 전에는 reference form이나 실제 하네스 반영 위치를 정하지 않는다.
