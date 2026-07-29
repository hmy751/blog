---
작성일: 2026-07-29
성격: config·policy·permission·enforcement 형식 후보
현재상태: 형식 비교용
---

# Control and Enforcement Forms

## CE01. Runtime configuration

- **작동:** model, reasoning effort, feature, MCP, sandbox, default behavior를 runtime이 읽는 설정으로 둔다.
- **적합:** 실제 실행 환경이 일관되게 따라야 하는 option.
- **부적합:** 글의 중심, 사용자 목적, 열린 판단.
- **확인할 것:** effective value, consumer, reload timing, version.

## CE02. Configuration scope and precedence

- **작동:** managed, user, project, local, command-line layer 중 어디의 값이 적용되는지 정한다.
- **적합:** 공유 범위, 개인 override, 조직 강제, one-run 실험.
- **부적합:** 같은 내용을 여러 scope에 복제하고 우연한 우선순위에 기대기.
- **확인할 것:** override와 merge 규칙, actual load evidence.

## CE03. Managed requirement

- **작동:** user나 project가 완화할 수 없는 조직 수준의 hard constraint를 설정한다.
- **적합:** compliance, prohibited permission mode, mandatory security control.
- **부적합:** 개인 취향, 실험적 workflow, 모호한 품질 판단.
- **확인할 것:** enforcement source, exception authority, failure behavior.

## CE04. Advisory rule

- **작동:** instruction으로 모델 판단을 유도하지만 기술적으로 보장하지 않는다.
- **적합:** writing standard, architecture preference, review habit, default decision principle.
- **부적합:** secret 노출 금지나 destructive command 차단을 이것만으로 보장.
- **확인할 것:** specificity, conflict, adherence evidence.

## CE05. Command policy/rule

- **작동:** command pattern을 allow, prompt, forbid 같은 결정으로 분류한다.
- **적합:** 반복 승인 예외, 금지 command, safe tool preference.
- **부적합:** command 의미를 넘어 결과 품질을 평가.
- **확인할 것:** exact matching, compound command handling, test cases.

## CE06. Tool permission

- **작동:** 특정 tool·path·domain·action을 모델이 사용할 수 있는지 판정한다.
- **적합:** read/edit/bash/web/MCP별 접근 제어.
- **부적합:** permission이 있다고 action이 적절하다는 결론.
- **확인할 것:** deny/allow merge, scope, least privilege.

## CE07. Approval gate

- **작동:** 경계를 넘는 action 전에 user 또는 reviewer가 명시적으로 승인한다.
- **적합:** external write, destructive action, broader access, purchase.
- **부적합:** 모든 낮은 위험 command에 반복 승인.
- **확인할 것:** once/session/persistent scope와 누가 review하는지.

## CE08. Filesystem sandbox

- **작동:** process가 읽거나 쓸 수 있는 path를 OS/runtime 수준에서 제한한다.
- **적합:** autonomous local work의 피해 범위 제한.
- **부적합:** content correctness와 intent alignment 보장.
- **확인할 것:** subprocess inheritance, escape hatch, unavailable behavior.

## CE09. Network sandbox

- **작동:** process가 접근할 수 있는 network domain·resource를 제한한다.
- **적합:** data exfiltration 방지, 허용된 dependency·API만 사용.
- **부적합:** 허용된 domain의 content 신뢰성을 보장.
- **확인할 것:** proxy, allowlist, DNS/TLS limitation, audit.

## CE10. Pre-action hook

- **작동:** tool/action 직전에 matcher가 발동해 검사, context 주입, 차단, permission decision을 수행한다.
- **적합:** secret scan, forbidden path, command policy, prerequisite check.
- **부적합:** 매 action에서 긴 모호한 review를 실행.
- **확인할 것:** hook trust, timeout, failure semantics, multiple hooks.

## CE11. Post-action feedback hook

- **작동:** tool 실행 뒤 output이나 changed files를 검사해 feedback을 context로 돌려준다.
- **적합:** lint, format, schema, test, generated-file guard.
- **부적합:** human taste와 전체 purpose acceptance.
- **확인할 것:** handler success와 quality effect 분리.

## CE12. Lifecycle hook

- **작동:** session start/end, compaction, subagent start/stop, config change 같은 사건에 반응한다.
- **적합:** context restore, logging, cleanup, notification, mandatory stop check.
- **부적합:** 사건 없이 수동 판단해야 하는 workflow.
- **확인할 것:** event coverage, ordering, idempotency, reentrancy.
