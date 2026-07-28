# AI-native topic research 작업 규칙

이 파일은 `ai-native-topic-research-2026-07-20` 작업 단위의 입구다. 모든 자료를 한 번에 읽지 말고, 맡은 역할에 필요한 층위에서 시작한다.

## 먼저 읽을 경로

- 현재 작업을 이어가는 main은 [active-state/index.md](./active-state/index.md)와 [core/workflow.md](./core/workflow.md)를 먼저 읽는다.
- 원고를 수정하는 작업자는 위 두 파일과 [core/criteria.md](./core/criteria.md), 대상 `src` 파일을 읽는다. 원천은 확인할 사실이나 장면이 생겼을 때만 연다.
- 원고만 독립적으로 보는 reviewer는 지정된 `src` 파일과 review 질문만 읽는다. `active-state`, `core`, `process`는 기본 입력에 넣지 않는다.
- 사실을 검증하는 verifier는 검증할 주장과 [sources/index.md](./sources/index.md)의 직접 원천에서 시작한다. 예상 결론은 입력으로 받지 않는다.
- main이 review를 회수할 때는 review 결과와 `active-state`를 먼저 대조한다. 충돌한 사실에 필요한 원천만 열고, 과거 이유가 필요할 때만 `process`로 내려간다.

## 층위별 소유권

- `active-state/`: 현재 함께 작업할 전체 그림, 현재 위치, 열린 판단을 소유한다.
- `core/`: 이 작업 단위에서 반복해서 사용할 workflow와 판단축을 소유한다.
- `sources/`: 실제 수집한 직접 원천의 재접근 경로와 각 원천이 지원하는 범위를 소유한다.
- `process/`: 조사, 시도, review, main 조율, 결정 변화, 이전 결과물처럼 작업하며 생긴 과정을 러프하게 보존한다.
- `src/`: 지금 수정할 최신 산출물만 둔다.

현재 사실과 과거 이유가 충돌하면 최신이라는 이유만으로 어느 한쪽을 택하지 않는다. 사실은 직접 원천으로 확인하고, 현재 함께 작업할 해석은 `active-state`에서 확인한다.

## Active state 표기

라벨 없는 노드는 현재 함께 작업할 기본 그림이다. 예외인 `[열림]`과 `[보류: 다시 볼 조건]`만 표시한다. 독립 review나 main의 제안만으로 이 기본 그림을 바꾸지 않는다.

상세 표기와 갱신 계약은 [core/workflow.md](./core/workflow.md#6-상태-갱신)가 소유한다.

## 변경 권한

- 명백한 사실 오류는 직접 원천으로 확인한 뒤 고치고 사용자에게 보고한다.
- 사실 교정이 장면의 역할이나 중심을 바꾸는 경우와 대표 장면·큰 구조·글의 중심·사용자의 경험이나 해석을 바꾸는 경우에는 사용자와 먼저 상의한다.
- reviewer의 보고는 `src`나 `active-state`를 직접 갱신하지 않는다.

review 회수와 상태 갱신을 포함한 구체적인 순서는 [core/workflow.md](./core/workflow.md)를 따른다.
