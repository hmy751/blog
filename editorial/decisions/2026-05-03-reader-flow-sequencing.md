# Reader Flow 적용 순서 조정

작성일: 2026-05-03
상태: accepted

## 배경

PI Lab sprint-02 초안을 reader-flow 기준으로 다듬는 과정에서 오프닝 약속, 도식, 표, 요약 문장은 보강되었지만, 기존 발행글인 sprint-01 글과 비교했을 때 글쓴이의 판단 속도와 질감이 약해졌다. 사용자는 02 글이 "내가 쓴 글"이라기보다 딱딱한 설명문처럼 느껴진다고 피드백했다.

## 문제

기존 하네스의 중심 구조는 `Material -> Shaping -> Texture -> Prepublish`다. `reader-flow-lens`도 새 단계가 아니라 Shaping과 Texture가 참고하는 보조 렌즈로 설계되었다.

하지만 실제 실행 문장에는 다음처럼 reader-flow의 권한이 커지는 지점이 있었다.

- `blog-write` skill에서 바로 만들 수 있는 표, 리스트, 코드 예시, 의사코드, 텍스트 도식, 요약 박스를 초안에 직접 넣으라고 읽힐 수 있었다.
- `reader-flow-lens`의 읽기 리듬 기준이 글의 목소리와 판단 변화 확인보다 먼저 적용될 수 있었다.
- Shaping 단계에서 자료 장치 후보를 보기 전에 strong lines, series voice baseline, 판단 변화 문장을 먼저 보호하라는 지시가 약했다.
- Texture Keeper가 reader-flow 적용 뒤 글이 더 읽히는지뿐 아니라 더 평평해졌는지 비교하는 기준은 있었지만, 실행 순서상 사후 점검으로 밀릴 수 있었다.

그 결과 reader-flow가 "독자 흐름 진단 렌즈"가 아니라 "가독성 수정 프로토콜"처럼 작동할 위험이 생겼다.

## 결정

reader-flow의 기준은 유지하되 적용 순서와 수정 권한을 낮춘다.

- `blog-write` skill에서 reader-flow 요청을 받으면 먼저 시리즈 목소리 기준선, strong lines, 판단 변화 문장을 확인하도록 한다.
- 표, 리스트, 코드 예시, 의사코드, 텍스트 도식, 요약 박스는 기본값으로 삽입하지 않는다.
- 자료 장치는 독자 막힘이 분명하고, 글의 핵심 판단을 돕고, Texture Keeper 관점에서 글감이나 발견을 평평하게 만들지 않을 때만 직접 넣는다.
- `reader-flow-lens`에 "적용 순서와 권한"을 추가해, 이 렌즈가 하지 않는 일을 명시한다.
- `writing-partners`와 shaping/texture agent 정의에 series voice baseline과 strong lines 보호를 reader-flow 적용 전 단계로 추가한다.
- Claude agent와 Codex agent 정의를 같은 의미로 맞춘다.

## 범위

적용 문서:

- `.claude/skills/blog-write/SKILL.md`
- `editorial/reader-flow-lens.md`
- `editorial/writing-partners.md`
- `.claude/agents/blog-shaping-editor.md`
- `.claude/agents/blog-texture-keeper.md`
- `.codex/agents/blog-shaping-editor.toml`
- `.codex/agents/blog-texture-keeper.toml`

주로 적용되는 요청:

- "가독성"
- "읽기 좋게"
- "표/이미지/도식이 필요할까"
- "하네스가 잘 적용됐나"
- "글이 딱딱하다"
- "내가 쓴 글 같지 않다"

주로 적용되는 글 유형:

- PI Lab 시리즈
- `learning-experiment`
- `technical-case-study`
- 같은 필자의 기존 발행글과 목소리 기준선을 비교할 수 있는 연속 글

## 비목표

- reader-flow 기준을 제거하지 않는다.
- 표, 도식, 요약 박스, 코드 예시를 금지하지 않는다.
- 독자 진입성과 스캔성을 낮추지 않는다.
- 모든 글을 기존 발행글의 문체로 맞추지 않는다.
- Texture Keeper를 근거 없는 개인 취향 보존 장치로 쓰지 않는다.
- 공개 경계, 사실 정합성, 수치 정확성보다 목소리 보호를 우선하지 않는다.

## 근거

- `editorial/README.md`는 강제 규칙과 참고 기준을 구분하고, 참고 기준은 글을 틀에 끼우기 위한 것이 아니라 점검 거울이라고 설명한다.
- `writing-partners.md`는 블로그 하네스의 중심을 `Material -> Shaping -> Texture -> Prepublish`로 둔다.
- `developer-lens.md`, `portfolio-signal-lens.md`, `series-pilab.md`는 모두 새 단계나 강제 템플릿이 아니라 공통 참고 관점 또는 기본 뼈대 후보로 설계되어 있다.
- reader-flow decision의 비목표에도 모든 글에 표, 코드 예시, 이미지, 도식을 넣지 않는다고 되어 있다.
- sprint-01 발행글은 독자 흐름이 있으면서도 "여기서 한 번 멈췄습니다", "문제는 #4였습니다", "결과는 반대였습니다"처럼 글쓴이가 실제로 멈추고 판단한 지점이 살아 있다.
- sprint-02 초안은 reader-flow 장치가 들어간 뒤 일부 구간에서 친절한 설명문처럼 평평해지는 위험이 드러났다.

## 후속 점검

- PI Lab 02를 다시 손볼 때, reader-flow 장치를 더 넣기 전에 sprint-01 글의 목소리 기준선과 원래 02 초안의 직접성을 먼저 비교한다.
- 초안에 표, 도식, 요약 박스를 넣은 뒤에는 "더 읽히는가"와 "더 평평해졌는가"를 함께 확인한다.
- Shaping output은 자료 장치 후보보다 `keep`, `strong lines`, `center/discovery`를 먼저 보여주는지 확인한다.
- Texture output은 reader-flow 적용 전후 비교가 가능하면 반드시 비교한다.
- 다른 시리즈 글에서도 reader-flow가 웹 문서식 설명문으로 과잉 적용되지 않는지 본다.
