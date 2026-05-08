# Heading hierarchy pass 보강

작성일: 2026-05-08
상태: accepted

## 배경

사이트에 목차 스크롤 기능이 생기면서, 기존 AI/ML 글의 heading 구조가 평면적으로 보이는 문제가 드러났다. 목차는 계기였지만 핵심은 UI가 아니라 글쓰기 기준이었다. 좋은 기술 글이라면 본문 안에서도 큰 질문, 세부 판단, 근거, 회수가 구분되어야 하는데, 기존 글에서는 각 `##`가 같은 무게로 길게 늘어서 큰 흐름과 세부 판단이 잘 나뉘지 않았다.

## 문제

- Reader Flow에는 섹션 층위와 독자 위치 기준이 이미 있었지만, heading 목록만 따로 보는 실행 트리거가 약했다.
- 소제목 문구를 선명하게 만드는 일과 heading level을 나누는 일이 구분되지 않았다.
- 본문 cadence 보강은 단락 역할 반복을 잡았지만, heading 구조의 평면성은 별도 산출물로 남기지 않았다.
- 사이트 구현 문제와 원고 구조 문제를 구분해야 했다. 코드블록 안의 `#`가 목차에 잡히는 것은 사이트 TOC 파서 문제이고, heading level이 모두 같은 무게로 보이는 것은 원고 Reader Flow 문제다.

## 결정

새 렌즈나 새 단계를 만들지 않는다. 기존 Reader Flow와 Shaping 안에 `Heading hierarchy pass`를 추가한다.

- heading 층위, 목차, generated outline이 쟁점이면 heading 목록만 따로 훑는다.
- 목록이 평문처럼 보이면 제목 문구를 먼저 꾸미지 않고, 큰 파트로 남길 `##`와 세부 판단으로 내릴 `###`/lead/micro-break를 구분한다.
- Reader Flow edit 산출물에는 큰 파트, 하위 판단, 유지할 제목을 구분한 move를 남긴다.
- blog-write skill과 shaping agent 정의가 이 트리거를 읽도록 보강한다.

## 범위

- `editorial/lenses/reader-flow.md`
- `editorial/core/output-contracts.md`
- `.claude/skills/blog-write/SKILL.md`
- `.claude/agents/blog-shaping-editor.md`
- `.codex/agents/blog-shaping-editor.toml`
- heading 층위가 평면적으로 보이는 공개 기술 글, 특히 학습/실험 글

## 비목표

- 모든 글에 3단 목차를 강제하지 않는다.
- 제목을 더 화려하게 만들기 위한 규칙이 아니다.
- 모든 `##`를 자동으로 `###`로 내리지 않는다.
- 사이트 TOC 파서 버그를 글쓰기 하네스로 해결하지 않는다.
- Reader Flow를 새 독립 단계로 승격하지 않는다.

## 근거

Sprint 04 AI/ML 글은 내용과 톤은 유지할 수 있었지만, heading 목록으로 보았을 때 문제, 실행 조건, 관측, 결론 같은 큰 흐름과 각 절의 세부 판단이 같은 레벨로 나타났다. 기존 Reader Flow의 섹션 층위 기준은 이 문제를 다룰 수 있었지만, 실제 편집 루프에서 heading 목록만 따로 보는 산출물이 없어 적용이 누락됐다.

## 후속 점검

- heading 목록만 먼저 훑어도 글의 단계가 보이는가.
- `##`를 줄인 뒤에도 본문 lead sentence와 회수 문장이 독자 위치를 유지하는가.
- heading 층위 조정이 글의 목소리와 판단 변화까지 평평하게 만들지는 않는가.
- 코드블록 heading이 목차에 잡히는 문제는 site TOC 파서에서 별도로 처리되는가.
