# 하네스 관찰자 agent 추가

작성일: 2026-05-04
상태: accepted

## 배경

Reader Flow, Supporting Materials, 리듬 편집, 이해와 판단의 연결 기준을 보강하면서 하네스는 점점 더 많은 상황을 다룰 수 있게 되었다. 동시에 사용자는 하네스 관련 수정이나 반복 작업 뒤에 구조가 조금씩 깨질 수 있다는 문제를 제기했다.

기존 `blog-write` skill과 shaping/texture/structure agent에는 사용자의 즉시 지시가 기존 하네스 구조를 우회하지 않게 하는 guard가 있다. 하지만 이 guard는 실행 중 판단에 가깝다. 하네스 자체를 고친 뒤, 그 변경이 전체 구조 안에서 제자리를 유지하는지 제3자처럼 조망하는 역할은 따로 없었다.

## 문제

기존 하네스가 놓친 것은 새 기준의 부재라기보다, 하네스 변경 이후의 구조 드리프트를 보는 시야였다.

- 특정 글에서 생긴 임시 판단이 전체 원칙으로 과잉 승격될 수 있다.
- 렌즈가 새 단계처럼 커지거나, agent가 기준 저장소처럼 비대해질 수 있다.
- root guide, skill, editorial 문서, agent 정의, decision record 사이의 책임 경계가 흐려질 수 있다.
- Claude agent와 Codex agent 정의를 따로 유지하는 구조라 의미가 조금씩 어긋날 수 있다.
- 실행자인 `blog-write`가 자기 자신의 구조 변경까지 충분히 제3자처럼 보기 어렵다.

## 결정

로컬 report-only agent `blog-harness-observer`를 추가한다.

이 agent는 normal writing flow에 들어가지 않는다. 초안 작성, shaping, texture, tone, structure, evidence, prepublish 검토는 기존 agent가 계속 맡는다.

`blog-harness-observer`의 역할은 하네스 관련 수정 뒤에 아래를 점검하는 것이다.

- 변경이 기존 `Material -> Shaping -> Texture -> Prepublish` 구조 중 어디에 속하는가.
- 새 기준이 렌즈, 단계, agent, hard guard, 일회성 audit 중 무엇인지 분명한가.
- 기존 문서나 agent의 책임을 중복하지 않는가.
- 특정 글이나 한 대화의 표현이 전체 하네스 원칙으로 과잉 승격되지 않았는가.
- decision record에 배경, 문제, 결정, 적용 범위, 비목표, 후속 점검이 남았는가.
- `.claude/agents/*.md`와 `.codex/agents/*.toml` 정의가 의미상 맞는가.

## 범위

추가 파일:

- `.claude/agents/blog-harness-observer.md`
- `.codex/agents/blog-harness-observer.toml`

관련 안내를 보강하는 위치:

- `CLAUDE.md`
- `.claude/skills/blog-write/SKILL.md`
- `editorial/README.md`

호출 대상 작업:

- 새 렌즈, 새 축, 새 agent, skill guard 추가 또는 역할 변경
- `CLAUDE.md`, `blog-write`, `editorial/`, `.claude/agents/`, `.codex/agents/`를 함께 수정했고 배치나 브릿지 드리프트가 애매한 작업
- 하네스 구조가 비대해졌거나 특정 기준이 단계처럼 커졌는지 의심되는 작업

## 비목표

- 글쓰기의 새 단계로 만들지 않는다.
- 모든 글 작업에 매번 호출하지 않는다.
- 하네스 내용을 이 agent 안으로 옮겨 저장하지 않는다.
- 기존 Material/Shaping/Texture/Prepublish 책임을 가져오지 않는다.
- 새 규칙을 대신 작성하는 agent로 쓰지 않는다.
- 전역 Claude/Codex 하네스 감사까지 맡기지 않는다. 전역 브릿지나 global agent/skill 정합성은 `tooling-map-auditor`가 본다.

## 근거

- [2026-05-04 Reader Flow 목적 재정의와 하네스 구조 가드](2026-05-04-reader-flow-page-feel-and-harness-guard.md)는 사용자 지시나 특정 렌즈가 전체 편집 권한을 가져갈 수 있는 위험을 이미 기록했다.
- [2026-05-04 Reader Flow와 Supporting Materials 분리](2026-05-04-reader-flow-supporting-materials-split.md)는 하나의 렌즈가 자료 장치 기준까지 떠안으며 비대해지는 문제를 기록했다.
- 기존 `blog-write` skill은 실행 중 guard로 적합하지만, 하네스 수정 이후의 제3자 관찰 역할과는 다르다.
- 기존 local agent들은 모두 report-only이며, Claude `.md`와 Codex `.toml` 쌍으로 관리된다. 새 observer도 이 패턴을 따른다.

## 후속 점검

- 다음 하네스 변경 뒤 `blog-harness-observer`가 실제로 normal writing flow에 끼지 않고 사후 구조 점검으로만 쓰이는지 확인한다.
- observer가 새 규칙 작성자가 되거나, 하네스 내용을 자기 파일에 누적하지 않는지 확인한다.
- observer 자체가 커지기 시작하면 그것도 구조 드리프트로 보고, 새 기준은 기존 소유 문서나 decision record로 되돌린다.
- Claude/Codex agent 정의가 함께 갱신되는지 확인한다.
- 이 장치 때문에 하네스 변경 절차가 과하게 무거워지면 호출 조건을 더 좁힌다.
