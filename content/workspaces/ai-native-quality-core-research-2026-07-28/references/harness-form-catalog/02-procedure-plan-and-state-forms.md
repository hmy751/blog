---
작성일: 2026-07-29
성격: procedure·plan·state 형식 후보
현재상태: 형식 비교용
---

# Procedure, Plan, and State Forms

## PS01. Workflow

- **작동:** 시작 조건에서 결과까지 반복되는 활동과 전환을 정의한다.
- **적합:** source research, publish preparation, implementation-validation cycle.
- **부적합:** 상황에 따라 달라지는 모든 선택을 한 순서로 고정.
- **확인할 것:** 입력, 전환 조건, output, stop, failure route.

## PS02. Playbook

- **작동:** 여러 가능한 상황에서 다음 행동을 고르는 판단 기준을 제공한다.
- **적합:** 품질 정체, source retrieval 실패, review disagreement.
- **부적합:** 명령 순서가 한 가지로 정해진 운영 복구.
- **확인할 것:** signal과 선택지가 실제로 구별 가능한지.

## PS03. Runbook

- **작동:** 알려진 운영 상황에서 재현 가능한 명령·확인·복구 순서를 제공한다.
- **적합:** build, deploy, backup, restore, prepublish check.
- **부적합:** 글의 중심이나 사용자 목적 같은 열린 판단.
- **확인할 것:** environment, prerequisites, expected output, rollback.

## PS04. Execution plan

- **작동:** 한 복잡한 작업의 단계, 의존성, 검증, 상태를 실행 중 갱신한다.
- **적합:** multi-step change, 장기 조사, 여러 artifact를 잇는 구현.
- **부적합:** 모든 작은 task의 의식적 plan.
- **확인할 것:** plan이 목적을 대신하지 않는지, 변경 이유를 기록하는지.

## PS05. Checklist

- **작동:** 닫힌 확인 항목의 누락을 방지한다.
- **적합:** frontmatter, link, file naming, test command, public boundary.
- **부적합:** 좋은 글인지, 중심이 맞는지 같은 비결정적 품질.
- **확인할 것:** 항목 통과가 전체 acceptance로 확대되지 않는지.

## PS06. Router/dispatcher

- **작동:** signal과 task state를 보고 적절한 skill, reviewer, workflow branch를 선택한다.
- **적합:** review-mode 선택, quality-stall route, source recovery.
- **부적합:** 분기 근거 없이 모든 장치를 순차 호출.
- **확인할 것:** false positive, false negative, fallback.

## PS07. Event-state machine

- **작동:** artifact나 task의 상태와 허용된 전환을 명시한다.
- **적합:** candidate→trial→accepted→retired, complete→reviewed→verified.
- **부적합:** 모호한 탐색을 너무 일찍 닫는 상태표.
- **확인할 것:** state owner, transition evidence, terminal state.

## PS08. Gate

- **작동:** 다음 단계 전에 사람·test·policy·review의 명시 판정을 요구한다.
- **적합:** publish, deploy, destructive action, user taste decision.
- **부적합:** 낮은 위험의 모든 국소 판단.
- **확인할 것:** gate owner, pass evidence, override authority.

## PS09. Loop contract

- **작동:** 생성·평가·수정 반복의 목표, evaluator, 변경 가능한 변수, stop을 정한다.
- **적합:** scored improvement, repeated draft refinement, benchmark loop.
- **부적합:** evaluator가 불안정하거나 목적이 아직 불명확한 상태의 무한 반복.
- **확인할 것:** 같은 frame을 더 정교하게 만드는 loop인지.

## PS10. Checkpoint

- **작동:** 긴 작업 중 복구 가능한 artifact와 판단 상태를 특정 시점에 고정한다.
- **적합:** source collection 완료, frame 선택 전, implementation slice 완료.
- **부적합:** 모든 미세 변경의 복제본.
- **확인할 것:** 복구 대상이 파일인지 판단 상태인지 둘 다인지.

## PS11. Handoff/reentry packet

- **작동:** 새 session·agent·사람이 현재 작업을 이어갈 최소 권위 정보를 전달한다.
- **적합:** 장기 task 분리, fork, session 이동, bounded delegation.
- **부적합:** 전체 transcript dump나 합의되지 않은 conclusion.
- **확인할 것:** source access, current authority, next decision, forbidden changes.

## PS12. Queue/backlog

- **작동:** 아직 current가 아닌 후보·후속 작업을 보존하고 우선순위를 나중에 결정한다.
- **적합:** 열린 가설, 개선 후보, deferred source, harness candidate.
- **부적합:** 즉시 해결해야 할 blocker나 현재 계약.
- **확인할 것:** promotion trigger, owner, stale cleanup.
