# 독자 흐름 렌즈 추가

작성일: 2026-05-03
관련 커밋: 미정
상태: accepted

## 배경

PI Lab sprint-02, sprint-03 초안을 다듬는 과정에서 사용자는 "가독성"을 보완하고 싶다고 말했다. 처음에는 한 글의 문장 polish 문제처럼 보였지만, 실제로는 이후 여러 글에도 반복 적용될 수 있는 하네스 기준이었다.

특히 sprint-02 RAG 글에서는 `threshold`, `chunk`, `top-k`, `Context 명명`처럼 여러 실험 레버가 이어졌다. 본문 내용은 충분했지만, 독자가 중간에 들어와도 판단 흐름을 복구할 수 있도록 소제목, 문단 첫 문장, 표, 도식, 숫자 배치를 보는 기준이 필요했다.

사용자는 블로그에서 필요할 경우 표나 이미지로 보여주는 방식도 함께 고려하고 싶다고 했다. 단, 무조건 이미지를 넣자는 뜻이 아니라, 어떤 경우에 표/이미지/도식이 글을 더 잘 읽히게 하는지 판단 기준이 필요했다.

## 문제

기존 하네스에는 `구조와 독자 흐름`이라는 축이 있었고, `Shaping Editor`도 단락 기능과 실험표·수치 배치를 보도록 되어 있었다. 하지만 "가독성"을 독립적으로 다루는 언어가 약했다.

그 결과 편집 요청이 아래처럼 흐를 위험이 있었다.

- 가독성을 문장 길이 줄이기나 단순 polish로만 해석한다.
- 소제목이 주제명만 반복되어, 독자가 훑어볼 때 판단 변화가 보이지 않는다.
- 숫자와 실험 조건이 본문에 묻혀 판단 근거로 작동하지 않는다.
- 표, 이미지, 도식, 그래프, 스크린샷을 장식처럼 넣거나, 반대로 필요한 시각 장치를 놓친다.
- 표나 리스트로 정리하는 과정에서 살아 있는 장면과 판단 변화 문장이 사라진다.

## 결정

`editorial/reader-flow-lens.md`를 새 렌즈로 추가한다.

핵심 원칙:

- 가독성은 문장을 쉽게 만드는 일이 아니라, 독자가 글의 판단 흐름을 놓치지 않게 하는 구조 장치다.
- 소제목, 문단 첫 문장, 표/리스트/이미지/도식, 숫자 배치는 독자 진입성과 스캔성을 돕는 도구다.
- 표, 이미지, 도식, 그래프, 스크린샷은 블로그답게 보이기 위한 장식이 아니라 독자의 판단을 돕는 장치일 때만 쓴다.
- 요약 장치는 글감을 대체하지 않는다. 살아 있는 장면, 실패, 판단 변화는 필요한 경우 표 밖 본문에 남긴다.

이 렌즈는 새 단계나 새 agent가 아니다. `Shaping Editor`가 주로 참고하고, `Texture Keeper`가 polish 과정에서 과한 요약 장치가 글감과 질감을 죽이지 않는지 본다. 필요하면 `Structure Critic`이 구조 리스크를 판단할 때 보조로 참고한다.

## 범위

반영한 위치:

- `CLAUDE.md`
- `.claude/skills/blog-write/SKILL.md`
- `editorial/README.md`
- `editorial/writing-partners.md`
- `editorial/reader-flow-lens.md`
- `editorial/developer-lens.md`
- `editorial/portfolio-signal-lens.md`
- `editorial/edit-patterns.md`
- `.claude/agents/blog-shaping-editor.md`
- `.claude/agents/blog-texture-keeper.md`
- `.claude/agents/blog-structure-critic.md`
- `.codex/agents/blog-shaping-editor.toml`
- `.codex/agents/blog-texture-keeper.toml`
- `.codex/agents/blog-structure-critic.toml`

주로 적용되는 요청:

- "가독성"
- "읽기 좋게"
- "스캔하기 쉽게"
- "표나 이미지가 필요할까"
- 기술 글/학습 실험 글의 소제목, 문단 첫 문장, 숫자·실험 조건 배치 점검

주로 적용되는 글 유형:

- `learning-experiment`
- `technical-case-study`
- `product-architecture`

회고 글에도 적용할 수 있지만, 회고의 호흡과 자기 관찰을 웹 문서식 요약으로 강제로 바꾸지 않는다.

## 비목표

- 모든 글에 표나 이미지를 넣지 않는다.
- 모든 문장을 짧게 만들지 않는다.
- 모든 소제목을 결론형으로 바꾸지 않는다.
- 이미지/도식 생성을 별도 필수 단계로 만들지 않는다.
- 새 readability agent를 만들지 않는다.
- 시각 자료가 본문 주장이나 해석을 대신하게 하지 않는다.
- 모바일에서 읽히지 않는 복잡한 표나 내부 자료 화면을 공개 글에 넣지 않는다.

## 근거

- PI Lab sprint-02 RAG 글은 실험 레버가 여러 개라, 산문만으로 이어 쓰면 독자가 중간 비교를 놓치기 쉬웠다.
- PI Lab sprint-03 Judge 글은 지표, Judge, 검색 조건, 데이터 흐름이 얽혀 있어 숫자와 조건을 어떻게 배치하는지가 글의 설득력에 직접 영향을 준다.
- 기존 `developer-lens.md`와 `portfolio-signal-lens.md`는 수치와 표가 자랑이 아니라 판단의 근거로 쓰여야 한다고 본다.
- 기존 `writing-partners.md`는 구조와 독자 흐름을 보지만, 소제목·문단 첫 문장·시각 자료 사용 기준까지는 세분화하지 않았다.
- 웹 글은 독자가 처음부터 끝까지 정독하지 않을 수 있으므로, 중간 진입과 훑어 읽기를 돕는 신호가 필요하다.

## 후속 점검

다음 PI Lab 글에서 확인할 것:

- Shaping 단계에서 소제목만 훑어도 중심 질문과 판단 변화가 보이는가.
- 반복 실험이 같은 리듬으로 정리되는가.
- 숫자가 본문에 묻히지 않고 바로 해석으로 이어지는가.
- 표, 이미지, 도식 후보를 장식이 아니라 독자 판단 장치로 검토하는가.
- Texture 단계에서 표/리스트/도식 때문에 살아 있는 장면이나 판단 변화가 사라지지 않았는가.
