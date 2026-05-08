# series-pilab context 삭제

작성일: 2026-05-08
상태: accepted

## 배경

`editorial/context/series-pilab.md`는 2026-05-03 결정에서 편집 렌즈가 아니라 느슨한 시리즈 배경 메모로 권한을 낮췄다. 하지만 실제 작업에서는 파일이 남아 있다는 사실만으로 PI Lab 글을 시리즈 메모와 계속 연결하려는 경향이 반복됐다.

## 문제

- PI Lab 글을 먼저 `learning-experiment`로 본다는 기준보다, 별도 시리즈 문서를 찾아야 한다는 신호가 더 크게 작동했다.
- "필요할 때만 참고"라는 문구가 있어도 agent와 skill에 경로가 남아 있으면 반복 호출 후보가 됐다.
- 소제목, 구조, 도입, 결론 같은 일반 Reader Flow 문제를 PI Lab 전용 문서 문제로 좁혀 읽을 위험이 남았다.

## 결정

`editorial/context/series-pilab.md`를 삭제한다.

- PI Lab 글은 별도 시리즈 메모가 아니라 `core/article-types.md`의 `learning-experiment`, `lenses/voice.md`, `lenses/developer.md`, `lenses/reader-flow.md`를 우선 적용한다.
- 앞선 글과의 연결이 필요하면 삭제된 메모가 아니라 실제 발행글, 현재 초안, `content/backlog/`의 발행 계획을 필요한 만큼만 읽는다.
- active 하네스, skill, agent 정의에서 `editorial/context/series-pilab.md` 직접 참조를 제거한다.

## 범위

적용 대상:

- PI Lab 글
- 학습/실험 글
- Claude/Codex blog writing agents
- `blog-write` skill
- root/project editorial guide

## 비목표

- PI Lab 시리즈 자체를 폐기하지 않는다.
- 앞선 발행글과의 자연스러운 연결을 금지하지 않는다.
- 과거 decision/audit 기록을 현재 기준처럼 다시 쓰지 않는다. 과거 기록에 남은 `series-pilab` 언급은 당시 판단의 흔적으로 둔다.
- PI Lab 글을 모두 독립 단편으로 만들지 않는다.

## 후속 점검

- PI Lab 글 shaping 때 별도 시리즈 문서를 찾기보다 현재 초안의 중심 질문과 원천 자료를 먼저 본다.
- 시리즈 연결이 필요하면 `content/backlog/pilab-publishing-plan.md`나 기존 발행글을 참고하되, 구조 템플릿으로 승격하지 않는다.
- agent output이 삭제된 `series-pilab` 경로를 언급하면 하네스 드리프트로 본다.
