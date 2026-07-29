---
작성일: 2026-07-29
성격: 가능한 하네스 요소 후보 전체 색인
현재상태: 필터링 전 / 미채택
---

# Harness Element Index

이 목록은 모든 후보를 `core rule`로 만들자는 제안이 아니다. 확장 조사에서 나온 판단을 실제로 구현한다면 어떤 하네스 요소가 될 수 있는지 펼친 것이다.

같은 문제를 서로 다른 위치에서 다루는 후보도 분리한다.

- 원칙은 판단축을 보존한다.
- workflow는 판단 순서와 권한을 정한다.
- state와 context는 다음 실행이 무엇을 이어받는지 정한다.
- agent와 review 역할은 다른 판단 위치를 만든다.
- skill과 dispatcher는 언제 어떤 책임을 발동할지 정한다.
- artifact와 evaluation은 무엇으로 품질을 관찰할지 정한다.
- learning과 maintenance는 무엇을 다음 작업에 남길지 정한다.

## 1. 원칙·criteria 요소

[상세 계약](./01-principle-and-criteria-elements.md)

- P01. 결과와 판단 체계의 이중 평가축
- P02. Completion·acceptance·verification 상태 분리
- P03. 서로 대신하지 않는 품질축
- P04. 사용자 목적·작업 goal·가설·성공 조건 분리
- P05. 목적 복구·goal 수정·goalpost 이동 구분
- P06. Constraint의 보호 효과와 축소 효과 동시 평가
- P07. Source 보유와 source 작동 분리
- P08. Criteria의 seed·filter·guard 역할 분리
- P09. 탐색·claim 판정·수렴의 판단 순서
- P10. 기준마다 닫을 수 있는 범위 제한
- P11. Scope보다 핵심 causal path 보존
- P12. 품질 신호의 출처와 판정 범위 보존
- P13. Reference의 확인 사실·해석·적용·미확인 분리
- P14. 단일 근본 원인 대신 경쟁 설명 유지

## 2. Workflow·loop·gate 요소

[상세 계약](./02-workflow-loop-and-gate-elements.md)

- W01. 판단할 관계가 보이는 artifact를 먼저 만드는 workflow
- W02. 결과 결함과 생성 조건 결함을 분리하는 triage
- W03. 어긋남을 만든 책임만 다시 여는 targeted reopen
- W04. 사용자 목적 복구 route
- W05. 작업 가설·scope·constraint 수정 route
- W06. Criteria와 evaluation 갱신 route
- W07. 결과 correction과 system correction의 병렬 비교
- W08. 서로 다른 frame의 결과를 비교하는 alternate-frame pass
- W09. Source-first second pass
- W10. 첫 단계부터 다시 수행하는 evaluator replay
- W11. 한 바퀴의 loop goal과 top-level purpose 대조
- W12. Continue·pause·reframe 판단
- W13. Human gate
- W14. Stop condition과 미완료 상태 기록

## 3. Context·state·provenance 요소

[상세 계약](./03-context-state-and-provenance-elements.md)

- C01. 전체 지도와 현재 cursor
- C02. 사용자 목적과 현재 작업 frame의 동시 보존
- C03. 판단 provenance 상태
- C04. Source role map
- C05. Source universe와 review packet 분리
- C06. 판단의 시간축
- C07. Current contract와 process history 분리
- C08. Stale current 감지
- C09. Completion·acceptance·verification 상태 필드
- C10. 열린 경쟁 가설 register
- C11. Cross-session sync packet
- C12. Scaffolding feedback channel

## 4. Review·agent·role 요소

[상세 계약](./04-review-agent-and-role-elements.md)

- R01. Artifact improvement reviewer
- R02. Source+result reviewer
- R03. Frame-challenge reviewer
- R04. Fact and evidence verifier
- R05. First-reader observer
- R06. Self-check auditor
- R07. Advisor
- R08. Evaluation-system auditor
- R09. Review-packet auditor
- R10. Main adjudicator
- R11. Human taste gate
- R12. Harness observer

## 5. Skill·dispatcher·trigger 요소

[상세 계약](./05-skill-dispatch-and-trigger-elements.md)

- S01. Quality-stall dispatcher
- S02. Repeated-misalignment self-check trigger
- S03. Review-mode selector
- S04. Source/context recovery trigger
- S05. Frame-diversity trigger
- S06. Completion/acceptance guard
- S07. Goal restoration or revision router
- S08. Loop escalation/de-escalation router
- S09. Learning-capture trigger
- S10. Reentry and handoff skill

## 6. Artifact·evaluation·observability 요소

[상세 계약](./06-artifact-evaluation-and-observability-elements.md)

- A01. 충분히 통합된 v1
- A02. Concept report
- A03. Output-first comparison artifact
- A04. Vertical slice
- A05. External-contract E2E
- A06. Evaluation ledger
- A07. Review packet manifest
- A08. PASS scope record
- A09. Reviewer correlation map
- A10. Decision diff
- A11. Source-to-result trace
- A12. Quality signal log

## 7. Learning·write-back·maintenance 요소

[상세 계약](./07-learning-writeback-and-maintenance-elements.md)

- L01. Core candidate card
- L02. Candidate promotion ledger
- L03. Process chronology
- L04. Contrast library
- L05. Counterexample library
- L06. Trigger-situation library
- L07. Case evidence boundary
- L08. Stale and deprecation review
- L09. Usage feedback record
- L10. Harness change decision record

## 요소 수에 대한 주의

이 목록의 84개 요소를 모두 설치하거나 매번 실행하는 것은 목적이 아니다.

- 같은 후보가 다른 owner 형태로 경쟁하는 경우가 있다.
- 한 요소가 다른 요소의 문서 형식일 수 있다.
- 특정 작업에서만 필요한 역할도 있다.
- 실제 하네스는 일부 요소를 선택하고 나머지는 material 또는 calibration example로 남길 수 있다.

[하네스 조립 구조 후보](./08-assembled-harness-shapes.md)는 요소를 모두 한 줄로 연결하지 않고 서로 다른 조립 방식을 비교한다.
