# series-pilab 권한 낮추기

작성일: 2026-05-03
상태: accepted

## 배경

PI Lab 03 초안을 검토하는 과정에서 `series-pilab.md`가 "강제 아님"이라고 쓰여 있는데도 실제 편집에서는 구조 압력처럼 작동할 수 있다는 문제가 드러났다. 사용자는 `series-pilab.md` 삭제 여부를 물었고, 이후 "힘 많이 빼도 된다"고 요청했다.

## 문제

기존 하네스는 `series-pilab.md`를 PI Lab 학습/실험 글의 특화 구조 후보로 다뤘다. 문서 안에도 5단 구조, 도입 템플릿, 마무리 템플릿이 남아 있었다.

이런 문장은 다음 위험을 만든다.

- PI Lab 글이라는 이유만으로 같은 도입, 같은 전환, 같은 결말을 반복한다.
- 초안의 실제 중심 질문보다 시리즈용 구조가 우선한다.
- shaping 단계에서 글감과 판단 변화보다 "형태를 갖추는 일"이 먼저 온다.
- reader-flow나 tone 점검과 결합되면 글이 설명문처럼 평평해질 수 있다.

## 결정

`series-pilab.md`를 편집 렌즈에서 제외하고, 시리즈 배경을 확인하는 느슨한 작업 메모로 격하한다.

- `series-pilab.md`에서 5단 구조와 도입/마무리 템플릿을 제거했다.
- `CLAUDE.md`, `editorial/README.md`, `voice.md`, `developer-lens.md`에서 series-pilab의 역할을 "시리즈 배경 메모"로 낮췄다.
- `blog-write` skill에서 PI Lab 글의 기본 로드 자료에서 series-pilab을 제외했다.
- Claude/Codex blog agents에서 series-pilab은 시리즈 연속성, 발행 순서, 반복 질문 축이 헷갈릴 때만 읽도록 바꿨다.
- shaping/structure/tone agent가 series-pilab을 구조 템플릿으로 강제하지 않도록 명시했다.

## 범위

적용 문서:

- `CLAUDE.md`
- `.claude/skills/blog-write/SKILL.md`
- `editorial/README.md`
- `editorial/lenses/voice.md`
- `editorial/lenses/developer.md`
- `editorial/context/series-pilab.md`
- `.claude/agents/blog-shaping-editor.md`
- `.claude/agents/blog-structure-critic.md`
- `.claude/agents/blog-tone-critic.md`
- `.codex/agents/blog-shaping-editor.toml`
- `.codex/agents/blog-structure-critic.toml`
- `.codex/agents/blog-tone-critic.toml`

주로 적용되는 글:

- PI Lab 시리즈 글
- `learning-experiment` 중 같은 시리즈로 묶일 수 있는 글

## 비목표

- PI Lab 시리즈 메모를 삭제하지 않는다.
- 앞선 발행글과의 연결을 금지하지 않는다.
- PI Lab 글에서 개인 맥락, 판단 변화, 다음 질문을 금지하지 않는다.
- 모든 PI Lab 글을 서로 독립된 단편으로 만들지 않는다.
- `voice.md`, `developer-lens.md`, `writing-partners.md`, `reader-flow-lens.md`의 일반 편집 기준을 약화하지 않는다.

## 근거

- `series-pilab.md` 자체에는 "강제 아님"이라고 쓰여 있었지만, 주변 문서가 "우선 적용", "함께 본다", "특화 구조 후보"처럼 호출해 실제 권한이 커졌다.
- PI Lab 03 초안은 중심 질문이 "평가자가 흔들렸다"인데, 시리즈 구조와 여러 보조 기준이 결합되면 검색, 데이터 흐름, 거절 평가 등 주변 항목이 같은 무게로 커질 위험이 있었다.
- 기존 reader-flow sequencing 결정도 자료 장치와 구조 기준이 초안의 질감을 평평하게 만들 수 있음을 지적했다.

## 후속 점검

- PI Lab 03을 다시 shaping할 때 `series-pilab.md`가 아니라 현재 초안의 중심 질문과 원천 숫자를 먼저 본다.
- PI Lab 글에서 "AI 관심이 질문으로 바뀌었다"는 식의 시리즈 도입이 반복되면 줄인다.
- agent output이 5단 구조나 도입/마무리 템플릿을 제안하면 false positive로 본다.
- 시리즈 연결은 필요할 때 한 문단 정도의 맥락으로만 쓰고, 글의 구조를 결정하지 않는지 확인한다.
