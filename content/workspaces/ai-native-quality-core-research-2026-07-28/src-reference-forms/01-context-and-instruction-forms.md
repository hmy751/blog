---
작성일: 2026-07-29
성격: context·instruction 형식 후보
현재상태: 형식 비교용
---

# Context and Instruction Forms

## CI01. One-run outcome brief

- **작동:** 한 task/run의 입력으로만 전달된다.
- **적합:** goal, relevant context, constraints, success condition, expected output.
- **부적합:** 모든 후속 작업이 따라야 할 영구 원칙, 긴 reference library.
- **확인할 것:** 이번 run이 끝난 뒤 폐기되는지, current state로 승격되는지.
- **형식 근거:** Codex 공식 `Goal·Context·Constraints·Done when`.

## CI02. Prompt-local constraint

- **작동:** 현재 대화나 한 요청에만 적용된다.
- **적합:** 이번에는 수정하지 말 것, 특정 파일만 볼 것, 먼저 분석만 할 것.
- **부적합:** repo 전반의 반복 안전 규칙.
- **확인할 것:** 대화가 길어지거나 fork·handoff될 때 유실될 수 있다.
- **형식 근거:** 두 제품 모두 prompt를 task-local input으로 취급한다.

## CI03. Durable root instruction

- **작동:** repo 또는 사용자 범위에서 session 시작 때 자동 context로 읽힌다.
- **적합:** 저장소 역할, 반복 conventions, do-not rule, 검증 명령, owner boundary.
- **부적합:** 현재 후보, 진행률, 특정 결과의 일시 상태, 긴 절차.
- **확인할 것:** advisory context이며 strict enforcement가 아니다.
- **형식 근거:** Codex `AGENTS.md`, Claude `CLAUDE.md`.

## CI04. Path-scoped instruction

- **작동:** 특정 하위 경로나 파일 유형에 접근할 때 더 가까운 instruction이 적용된다.
- **적합:** workspace별 경계, site와 editorial의 다른 규칙, 특정 source의 공개 제한.
- **부적합:** 모든 경로가 알아야 할 top-level purpose.
- **확인할 것:** precedence·concatenation 방식과 lazy load 차이.
- **형식 근거:** nested `AGENTS.md`, nested `CLAUDE.md`, `.claude/rules/`.

## CI05. Imported reference module

- **작동:** root instruction이 별도 문서를 참조·import해 context에 포함한다.
- **적합:** architecture, review guide, source policy처럼 owner가 별도인 상세 기준.
- **부적합:** import만 해두고 실제 consumer가 언제 읽는지 모르는 자산.
- **확인할 것:** import는 파일 정리에는 도움이 되지만 context 크기를 줄이지 않을 수 있다.
- **형식 근거:** Claude `@path` import, Codex instruction에서 task-specific 문서 참조.

## CI06. Personal/local override

- **작동:** 개인 또는 한 machine/project에서 shared setting·instruction을 보충하거나 override한다.
- **적합:** 개인 취향, machine-specific command, 아직 공유하지 않을 실험.
- **부적합:** 팀 전체가 지켜야 할 safety invariant.
- **확인할 것:** gitignore, worktree 공유 여부, precedence.
- **형식 근거:** Claude `CLAUDE.local.md`와 `settings.local.json`, Codex user/project config layer.

## CI07. Project current-state document

- **작동:** 자동 instruction이 아니라 실행자가 명시적으로 읽고 이어받는 authoritative state다.
- **적합:** current goal, current frame, accepted decision, open issue, next action.
- **부적합:** 재사용 원칙과 긴 시행착오 history.
- **확인할 것:** freshness dependency와 update owner.
- **형식 근거:** 제품 고유 필수 기능이 아니라 기존 harness의 work-unit state 형식.

## CI08. Reusable knowledge reference

- **작동:** 필요할 때 읽는 개념, 사례, guard, glossary 문서다.
- **적합:** 품질축 설명, 대비 사례, source policy, domain knowledge.
- **부적합:** 매 run 반드시 실행해야 하는 절차.
- **확인할 것:** 발견 경로와 호출 조건이 없으면 존재만 하고 작동하지 않는다.
- **형식 근거:** Skill resource, project docs, reference library.

## CI09. Session memory

- **작동:** 제품이나 사용자가 이전 session의 정보를 저장해 후속 session에 불러온다.
- **적합:** 반복 선호, 안정된 작업 사실, 재진입에 필요한 요약.
- **부적합:** 검토되지 않은 추론, 민감 원문, authoritative project decision의 유일한 사본.
- **확인할 것:** 자동 write, freshness, scope, 삭제·감사 가능성.
- **형식 근거:** Claude auto memory, Codex memory surface.
- **현재 경계:** 이 프로젝트 전역 규칙은 auto memory 사용을 금지하므로 여기서는 형식 비교만 한다.

## CI10. Prompt template

- **작동:** 반복 task의 입력 슬롯과 질문 구조를 복제한다.
- **적합:** reviewer packet, investigation brief, handoff request.
- **부적합:** 상황별 판단 없이 무조건 수행할 상세 workflow.
- **확인할 것:** template이 초기 frame을 고정하지 않는지.
- **형식 근거:** custom prompt, execution plan template, skill template.

## CI11. Output contract/schema

- **작동:** 반환해야 할 section, field, status vocabulary, evidence 위치를 명시한다.
- **적합:** reviewer report, evaluator result, current-state update, machine-readable output.
- **부적합:** 결과의 substantive judgment를 schema로 대신하는 일.
- **확인할 것:** 빠진 내용을 보이게 하는지, 양식 채우기만 유도하는지.
- **형식 근거:** Skill output requirement, tool schema, structured report.

## CI12. Decision record

- **작동:** 중요한 하네스·architecture 변경의 배경, 결정, 비목표, 근거, 후속 검증을 보존한다.
- **적합:** 새 역할·rule·stage·skill의 생성과 폐기.
- **부적합:** 매번의 작은 edit와 current progress.
- **확인할 것:** decision이 아직 유효한지와 대체 record.
- **형식 근거:** 일반 engineering decision record와 이 blog repo의 editorial decision 계약.
