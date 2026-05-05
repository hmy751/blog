# Site Archive

이 폴더는 현재 production source와 분리해서 보존해야 하는 site 자료를 둔다.

현재 active UI/스타일 기준은 `../src/`, `../src/styles/`, component CSS Modules, `../src/stories/`, `../.storybook/`, `../system-preview/`다. archive 아래 자료는 evidence, legacy snapshot, local-only QA fixture로 읽고 current source of truth로 쓰지 않는다.

## Contents

| Path | Role |
| --- | --- |
| `design-system/` | Claude Design 원본, legacy renderer CSS snapshot, Storybook/system-preview용 local-only fixture를 보존하는 archived design-system bucket |

## Rule

- archive CSS나 prototype HTML을 production CSS처럼 복사하지 않는다.
- fixture Markdown과 fixture asset은 QA 자산이며 실제 `content/posts` 원고나 public route data로 승격하지 않는다.
- 원형 판단 복원이 필요할 때만 `archive/design-system/reference/blog-design`를 evidence로 읽는다.
