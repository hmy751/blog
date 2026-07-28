# AI-native topic research 작업 규칙

이 파일은 `ai-native-topic-research-2026-07-20` 작업 단위의 입구다. 모든 자료를 한 번에 읽지 말고, 맡은 역할에 필요한 층위에서 시작한다.

## 먼저 읽을 경로

- 현재 작업을 이어가는 main은 [active-state/index.md](./active-state/index.md), 현재 cursor가 가리키는 가지, 그 가지가 연결한 `active-state` 상세가 있으면 해당 파일, [core/workflow.md](./core/workflow.md)를 먼저 읽는다.
- 원고를 수정하는 작업자는 위 자료와 [core/criteria.md](./core/criteria.md), 대상 `src` 파일을 읽는다. `active-state`가 현재 판단에 필요하다고 연결한 material·결정 기록과 확인할 사실·장면의 직접 원천만 추가로 연다.
- 결과물을 개선하는 reviewer, 원고만 읽히는지 보는 reviewer, 사실 verifier는 [core/review-workflow.md](./core/review-workflow.md)에서 자기 역할의 입력·산출 계약만 확인하고 지정된 packet에서 시작한다.
- main이 review를 회수할 때는 [core/review-workflow.md](./core/review-workflow.md#main의-회수)를 따른다.

## 층위별 소유권

- `active-state/`: 현재 함께 작업할 전체 그림, 현재 위치, 열린 판단을 소유한다.
- `core/`: 이 작업 단위에서 반복해서 사용할 workflow와 판단축을 소유한다.
- `sources/`: 실제 수집한 직접 원천의 재접근 경로와 각 원천이 지원하는 범위를 소유한다.
- `process/`: 조사, 시도, review, main 조율, 결정 변화, 이전 결과물처럼 작업하며 생긴 과정을 러프하게 보존한다.
- `src/`: 지금 수정할 최신 산출물만 둔다.

현재 사실과 과거 이유가 충돌하면 최신이라는 이유만으로 어느 한쪽을 택하지 않는다. 사실은 직접 원천으로 확인하고, 현재 함께 작업할 해석은 `active-state`에서 확인한다.

`process`는 커진 현재 판단을 밀어 넣는 곳이 아니다. 현재도 유효한 판단이 커지면 `active-state/` 하위 파일로 나누고, `index.md`에는 그 판단의 요약과 링크를 남긴다. 판단이 만들어지고 달라진 과정만 `process`가 소유한다.
