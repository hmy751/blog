---
작성일: 2026-07-29
성격: role·delegation·isolation 형식 후보
현재상태: 형식 비교용
---

# Role, Delegation, and Isolation Forms

## RI01. Main agent

- **작동:** 사용자 목적, 현재 decision, source, delegated report를 한 위치에서 종합한다.
- **적합:** 요구사항 해석, 역할 배치, adjudication, 최종 결과.
- **부적합:** 모든 탐색 로그와 반복 실행을 main context에 누적.
- **확인할 것:** main만 가진 권한과 넘길 수 있는 bounded work.

## RI02. Specialized subagent

- **작동:** 별도 context에서 한 bounded task를 수행하고 요약·artifact를 main에 반환한다.
- **적합:** 독립 code exploration, source collection, test, 큰 문서 분석.
- **부적합:** task 경계가 불명확하거나 main과 지속적으로 같은 파일을 공동 수정.
- **확인할 것:** inherited context, tools, source access, return contract.

## RI03. Independent reviewer

- **작동:** 결과 생성자와 다른 판단 위치에서 source·criteria에 따라 report-only 판정을 낸다.
- **적합:** frame challenge, evidence review, first-reader, final quality check.
- **부적합:** 생성자와 같은 prompt·summary·assumption을 받고 독립성을 주장.
- **확인할 것:** packet, authority, correlation, main adjudication.

## RI04. Verifier/auditor

- **작동:** 지정된 claim, config, state, invariant가 실제 evidence와 일치하는지 확인한다.
- **적합:** facts, links, runtime load, public boundary, harness drift.
- **부적합:** 새로운 방향 제안과 artifact rewrite.
- **확인할 것:** verification scope와 evidence receipt.

## RI05. Advisor

- **작동:** main의 결정을 대신하지 않고 빠진 관점과 판단 질문을 제공한다.
- **적합:** 큰 전환, repeated failure, trade-off, direction review.
- **부적합:** implementation owner, final authority.
- **확인할 것:** verified facts와 advisor inference 분리.

## RI06. Worker

- **작동:** 명시된 파일·module·artifact의 생산 책임을 갖는다.
- **적합:** 분리 가능한 implementation, draft production, mechanical migration.
- **부적합:** owner가 겹치는 parallel write, 사용자 판단이 먼저 필요한 방향 선택.
- **확인할 것:** ownership boundary, concurrent edits, verification duty.

## RI07. Agent team

- **작동:** 여러 독립 agent가 shared task 또는 message를 통해 협력하고 main/lead가 종합한다.
- **적합:** 서로 독립적인 넓은 조사, 다면 review, 큰 implementation 분할.
- **부적합:** 작은 task, 강한 sequential dependency, 한 file의 동시 편집.
- **확인할 것:** coordination cost, token cost, conflict, stop.

## RI08. Forked context

- **작동:** 기존 conversation state를 복제한 뒤 별도 branch에서 다른 방향을 시험한다.
- **적합:** 서로 양립하지 않는 frame, 위험한 실험, 원 대화 보존.
- **부적합:** 단순 subtask나 같은 결론을 병렬 반복.
- **확인할 것:** fork 시점, inherited error, merge/adjudication.

## RI09. Worktree-isolated worker

- **작동:** 같은 repository의 별도 working tree에서 파일 변경을 격리한다.
- **적합:** parallel implementation, scheduled change, 원 작업과 충돌 위험이 있는 실험.
- **부적합:** non-git artifact, read-only analysis, 작은 동일 파일 edit.
- **확인할 것:** shared untracked files, integration, cleanup, branch ownership.

## RI10. Human decision owner

- **작동:** irreversible action, taste, value conflict, identity-bearing choice의 최종 권한을 가진다.
- **적합:** publish center, public disclosure, spending, destructive action, personal voice.
- **부적합:** main이 증거로 닫을 수 있는 단순 사실·local implementation.
- **확인할 것:** 질문 전에 선택 차이와 권고가 충분히 정리됐는지.
