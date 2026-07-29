---
작성일: 2026-07-28
성격: AI-native 품질 개선 core 확장 조사 workspace
공개상태: 내부 작업 문서
현재단계: 1차 확장 완료 / 필터링 전
---

# AI-native Quality Core Research

이 workspace는 한 편의 Current 글을 고치는 곳이 아니다. Current 품질 실패와 그 뒤의 대화에서 드러난 문제를 충분히 펼쳐, 다른 AI 협업 작업에서도 다시 판단할 수 있는 품질 개선·문제 해결·학습 원리 후보를 만드는 곳이다.

출발점은 다음과 같다.

- Material과 동기는 이미 있었지만 결과와 평가에서 반복적으로 사라졌다.
- 완결된 원고와 여러 review가 있었지만 품질이 같은 frame 안에서 정교해졌다.
- A와 B는 다른 답을 냈지만 Q1~Q5와 최근 사건이 대표 문제라는 전제를 공유했다.
- 사용자의 원래 목적, main의 작업 가설, reviewer의 제안, 현재 중심의 합의 상태가 작업 중 섞였다.
- 약한 결과를 고치는 것과 그 결과를 만든 목표·맥락·제약·평가 체계를 다시 보는 것 사이의 연결이 충분히 정의되지 않았다.
- 이번 논의를 한 번의 교정으로 끝내지 않고, 사용자가 나중에 읽고 판단 감각을 복원할 수 있는 형태로 남길 필요가 있다.

## 작업 원칙

현재는 수거보다 확장이 먼저다.

- 서로 겹쳐 보이는 원인과 패턴도 바로 합치지 않는다.
- 좋은 예, 실패 예, 경계 사례, 오해하기 쉬운 대비를 함께 모은다.
- 글쓰기 사례뿐 아니라 조사, 구현, 평가, 장기 context, multi-agent 협업으로 일반화할 수 있는지 따로 본다.
- 모든 후보에는 그것이 바꾸는 판단과 적용하지 말아야 할 경우를 붙인다.
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

### Concrete candidate sources

- [이번 품질 실패에서 추론한 하네스 요소](./src/)
- [공식 문서와 일반 하네스 조사에서 가져온 형식 후보](./src-reference-forms/)

아직 만들지 않은 것:

- 합치기·분리·보류 ledger
- 사용자 합의 상태를 반영한 core 후보판
- 원본 workspace core로 가져갈 범위
- 원본 core 실제 수정

## 현재 상태

관찰, 경쟁 원인, 패턴, 대비, 발동 상황, 반례의 1차 확장을 완료했다. 현재는 확장 누락과 근거 경계를 감사하는 단계다. 후보를 몇 개로 줄이거나 원본 workspace의 core를 수정하지 않는다.
