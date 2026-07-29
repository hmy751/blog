---
작성일: 2026-07-29
성격: registry·lifecycle·automation·recovery 형식 후보
현재상태: 형식 비교용
---

# Lifecycle, Automation, and Recovery Forms

## LA01. Asset registry

- **작동:** instruction, skill, agent, hook, tool, workflow 같은 자산의 locator와 상태를 한 overlay에서 찾게 한다.
- **적합:** 자산이 여러 runtime·scope·directory에 흩어진 하네스.
- **부적합:** registry 자체를 canonical content store로 만들기.
- **확인할 것:** id, kind, owner, locator, consumer, lifecycle status.

## LA02. Canonical source and consumer map

- **작동:** 하나의 원천과 Claude·Codex·project별 소비 위치를 연결한다.
- **적합:** bridge, symlink, import, generated wrapper, runtime-specific config.
- **부적합:** 파일 경로가 같다는 이유로 의미 parity를 가정.
- **확인할 것:** source of truth, transformation, sync evidence.

## LA03. Evidence-state ledger

- **작동:** 자산 또는 source가 discovered, present, loaded, invoked, executed, effective, verified 중 어디까지 확인됐는지 기록한다.
- **적합:** hook·skill·connector·instruction activation 조사.
- **부적합:** 상태 수를 모든 파일에 강제.
- **확인할 것:** 각 state를 증명한 receipt와 claim ceiling.

## LA04. Promotion/deprecation lifecycle

- **작동:** experiment가 shared asset이 되고, 이후 deprecated·retired되는 전환을 관리한다.
- **적합:** skill, rule, agent, workflow, reference.
- **부적합:** 처음부터 모든 candidate를 production asset으로 생성.
- **확인할 것:** promotion evidence, owner, migration, retirement date.

## LA05. Usage feedback record

- **작동:** 실제 run에서 자산이 발동했는지, 도움·오발동·마찰이 있었는지 기록한다.
- **적합:** dispatcher, skill, hook, reviewer, automation 개선.
- **부적합:** 단순 사용 횟수를 품질 점수로 사용.
- **확인할 것:** task context, expected behavior, observed effect.

## LA06. Scheduled task

- **작동:** 안정된 prompt·skill·script를 시간 또는 cadence에 따라 unattended 실행한다.
- **적합:** 반복 scan, report, maintenance, follow-up.
- **부적합:** 아직 사람이 매번 steering해야 하는 열린 workflow.
- **확인할 것:** environment, permission, result inbox, stop, first-run review.

## LA07. Background monitor

- **작동:** 외부 상태나 long-running process를 관찰하고 변화·문제·완료 시 신호를 낸다.
- **적합:** CI, deployment, orchestration surface, queue, file change.
- **부적합:** 상태를 바꾸는 actor와 monitor 책임 혼합.
- **확인할 것:** poll/event source, noise, false alarm, escalation.

## LA08. Snapshot

- **작동:** 특정 시점의 파일·config·session state를 복구 가능한 사본으로 보존한다.
- **적합:** 하네스 변경 전, destructive migration 전, session 종료 전.
- **부적합:** 현재 instruction이나 authoritative state로 읽기.
- **확인할 것:** completeness, version, storage, retention.

## LA09. Restore/replay

- **작동:** snapshot이나 recorded interaction을 실제 환경에 복원하거나 같은 입력으로 다시 실행한다.
- **적합:** configuration recovery, regression reproduction, workflow debug.
- **부적합:** snapshot 존재만으로 복구 가능하다고 주장.
- **확인할 것:** dry run, environment difference, idempotency, post-restore verification.

## LA10. Retirement and rollback condition

- **작동:** 자산을 언제 삭제·비활성화·이전 버전으로 되돌릴지 사전에 정한다.
- **적합:** experimental rule, new hook, agent, automated workflow.
- **부적합:** 효과를 관찰할 방법 없는 영구 추가.
- **확인할 것:** trigger, owner, recoverability, downstream consumer.
