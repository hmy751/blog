# Reader Flow 발동 계약 보강

작성일: 2026-05-04
관련 커밋: TBD
상태: superseded by [2026-05-04-editorial-layer-restructure.md](2026-05-04-editorial-layer-restructure.md)

## 배경

PI Lab 04 LangSmith 글을 발행 전 다듬는 과정에서 Reader Flow, Supporting Materials, Writing Partners 기준을 이미 읽었는데도 실제 편집 결과가 진단 카드에 머무르는 문제가 드러났다.

하네스에는 artifact gap, visual candidate, 문장 끝 리듬, 섹션 회수, 스크롤 손잡이 기준이 있었지만, 모델은 "스크린샷이 있으면 좋다", "미니 표가 있으면 좋다"처럼 제안만 남기고 원고에 후보 슬롯이나 직접 적용 가능한 edit move를 남기지 않았다.

또 호흡을 끊어야 하는 상황에서 `##`를 늘리는 방식으로 과잉 대응하거나, 반대로 `##`가 과해 보이면 아무 micro-break도 만들지 않는 문제가 있었다.

## 문제

기존 하네스가 놓친 것은 기준의 부재가 아니라 발동 방식이었다.

- Reader Flow가 실제로 발동했는지 확인할 결과물 계약이 약했다.
- artifact gap을 발견해도 실제 삽입, 후보 슬롯, 대체 표/도식 중 무엇을 남겨야 하는지 작업 단위가 흐렸다.
- 문장 끝 리듬 문제를 어미 polish로만 보거나, artifact/소제목/자료 회수 문제가 원인인지 확인하지 않았다.
- 긴 산문을 끊을 때 `##`만 떠올리고, 짧은 판단 소제목, lead sentence, 리스트, 작은 표, 캡션, 콜아웃 같은 낮은 층위의 micro-break가 덜 발동했다.
- review-only와 편집 모드의 결과물이 구분되지 않아, 파일을 수정해야 하는 상황에서도 진단만 남기기 쉬웠다.

## 결정

새 단계나 새 agent를 만들지 않는다. 기존 Reader Flow, Supporting Materials, Writing Partners, blog-write skill, shaping/texture agent 정의 안에 발동 계약을 보강한다.

- Reader Flow가 발동한 경우, 신호별로 최소 하나의 edit move를 원고나 검토 카드에 남긴다.
- 편집 모드에서는 직접 넣을 수 있는 표, 리스트, 짧은 의사코드, 텍스트 도식, 회수 문장 축소를 실제 원고에 적용한다.
- 실제 캡처나 공개 경계 확인이 필요한 화면성 자료만 `supporting-material candidate` 슬롯으로 남긴다.
- review-only에서는 메인 세션이 그대로 옮길 수 있는 문구, 표, 후보 슬롯 전문을 결과 카드에 포함한다.
- 호흡을 끊을 때 `##`를 늘리기 전 micro-break를 먼저 검토한다.
- Texture Keeper는 문장 끝 polish가 artifact, 소제목, 캡션, 섹션 회수 문제가 해결해야 할 리듬을 덮지 않았는지 확인한다.
- Claude agent와 Codex agent의 의미를 맞춰, shaping agent가 진단만 하지 않고 적용 가능한 move를 요구하도록 한다.

## 범위

- `editorial/lenses/reader-flow.md`
- `editorial/lenses/supporting-materials.md`
- `editorial/core/workflow.md`
- `.claude/skills/blog-write/SKILL.md`
- `.claude/agents/blog-shaping-editor.md`
- `.claude/agents/blog-texture-keeper.md`
- `.codex/agents/blog-shaping-editor.toml`
- `.codex/agents/blog-texture-keeper.toml`

주 적용 대상은 PI Lab/기술 글처럼 trace, UI, config, prompt, 그래프, 코드 구조, 수치 비교 같은 artifact가 핵심 판단을 만드는 글이다. "가시성", "읽힘", "호흡", "문장 끝", "발행 전 종합" 요청에서도 적용된다.

## 비목표

- Reader Flow를 새 독립 단계로 만들지 않는다.
- 모든 글에 스크린샷, 표, 도식, 콜아웃을 강제하지 않는다.
- 모든 긴 산문을 micro-break로 잘게 쪼개지 않는다.
- `##` 사용을 금지하지 않는다. 큰 질문이나 단계가 바뀌면 `##`를 쓴다.
- 발행 직전 원고에 후보 슬롯을 남기는 것을 허용하지 않는다. 후보 슬롯은 편집 단계의 장치이며, 발행 전에는 실제 자료로 바꾸거나 제거한다.
- 문장 어미 polish를 금지하지 않는다. 다만 artifact/섹션/자료 회수 문제가 먼저인지 확인한 뒤 국소적으로 한다.

## 근거

04 LangSmith 글에서 핵심 판단은 LangSmith trace 화면, QA 실행 경계, app/eval 공유 pipeline, config/prompt snapshot에 기대고 있었다. 기존 편집은 표와 텍스트 도식을 일부 넣었지만, 실제 trace 화면 후보는 최종 답변에만 언급되고 원고에는 남지 않았다.

사용자 피드백도 "기준을 추가했는데도 내가 다시 묻지 않으면 잘 발동하지 않는다"는 쪽이었다. 이는 기준을 더 많이 추가할 문제가 아니라, 기준이 발동했을 때 결과물이 무엇이어야 하는지 명확히 해야 하는 문제였다.

## 후속 점검

- 다음 Reader Flow 편집에서 진단 카드만 남기지 않고 실제 원고 move가 적용되는가.
- 화면성 artifact가 필요한데도 최종 답변의 제안으로만 남지 않는가.
- `##`를 늘리지 않는 대신 아무 손잡이도 만들지 않는 문제가 줄었는가.
- micro-break를 넣은 뒤 글이 더 하네스 출력처럼 평평해지지 않았는지 Texture Keeper가 확인하는가.
- Claude/Codex shaping agent가 같은 의미로 Reader / Artifact gap 결과를 반환하는가.
