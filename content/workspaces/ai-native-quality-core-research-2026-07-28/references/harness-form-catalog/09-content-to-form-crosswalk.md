---
작성일: 2026-07-29
성격: 이번 내용 후보와 reference form의 교차 지도
현재상태: 배치 미결정
---

# Content-to-Form Crosswalk

이 문서는 [첫 확장 기록](../atomic-element-expansion/)의 84개 내용을 공식 형식에 끼워 넣는 결정표가 아니다. 같은 내용이 어디에 놓이느냐에 따라 어떻게 작동이 달라지는지 보여주는 경쟁 배치 지도다.

- `지속 형식`은 반복 기억을 높이지만 context와 stale 비용이 있다.
- `조건부 형식`은 필요할 때만 작동하지만 trigger 실패가 있다.
- `역할 형식`은 다른 판단 위치를 만들지만 packet과 adjudication 비용이 있다.
- `강제 형식`은 invariant를 보장하지만 모호한 품질 판단에는 부적합하다.
- `증거 형식`은 관찰을 돕지만 행동 자체를 바꾸지는 않는다.

## 원칙·criteria 내용의 배치 후보

| 내용 후보 | 지속·지식 형식 | 실행·증거 형식 | 배치 판별 질문 |
| --- | --- | --- | --- |
| P01 결과와 판단 체계 이중 평가 | CI03 durable instruction 또는 CI08 reference | PS06 router + QO08 evaluation | 항상 떠올릴 원칙인가, stall 때만 실행할 진단인가 |
| P02 completion·acceptance·verification | CI08 vocabulary | PS07 state machine + CI11 schema | 개념 설명이 필요한가, 실제 artifact 상태 전환이 필요한가 |
| P03 비대체 품질축 | CI08 criteria reference | QO08 independent evaluation + QO09 eval | 열린 판단축인가, 반복 측정 가능한 case가 있는가 |
| P04 목적·goal·가설·성공 조건 | CI01 outcome brief template | CI07 current state + PS04 plan | 한 run 입력인가, 장기 작업의 authoritative state인가 |
| P05 목적 복구·goal 수정·goalpost | CI08 contrast reference | PS02 playbook + RI10 human owner | 대비 학습인가, 실제 변경 권한 route인가 |
| P06 constraint의 보호·축소 | CI08 reference | QO08 evaluator + PS09 loop contract | 모든 작업의 질문인가, 약한 결과 뒤 diagnostic인가 |
| P07 source 보유·작동 | CI08 source policy | LA03 evidence ledger + QO12 receipt | 원칙만 필요한가, 실제 전달·효과 evidence가 필요한가 |
| P08 criteria seed·filter·guard | CI08 criteria reference | CI10 prompt template + CI11 output contract | 역할 정의인가, generation/evaluation packet을 분리할 것인가 |
| P09 탐색·claim·수렴 | PS02 playbook | PS01 workflow + PS08 gate | 상황별 판단인가, 정해진 전환이 필요한가 |
| P10 기준별 authority limit | CI03 root instruction | CI11 reviewer schema + RI01 adjudication | 모든 역할의 공통 rule인가, report마다 명시할 field인가 |
| P11 causal path 보존 | CI08 principle | QO01 artifact + QO06 E2E | 품질 질문인가, 실제 user path verification인가 |
| P12 품질 신호 provenance | CI08 vocabulary | QO10 log + LA03 ledger | 설명만 필요한가, 시간순 증거가 필요한가 |
| P13 reference의 사실·해석·적용 | CI03 source rule 또는 CI08 reference | QO12 evidence receipt + CI12 decision record | 모든 source use에 적용할 rule인가, 큰 차용에만 record할 것인가 |
| P14 경쟁 설명 유지 | CI08 diagnostic reference | PS12 backlog + QO09 discriminating cases | 사고 원칙인가, 살아 있는 hypothesis state인가 |

## Workflow·loop·gate 내용의 배치 후보

| 내용 후보 | 절차 형식 | 다른 가능 형식 | 배치 판별 질문 |
| --- | --- | --- | --- |
| W01 판단 artifact 먼저 | PS02 playbook | CP06 skill | 매번 artifact를 고를 판단인가, 반복 가능한 별도 task인가 |
| W02 결과/system triage | PS06 router | CI10 diagnostic prompt | 자동 분기할 만큼 signal이 안정됐는가 |
| W03 targeted reopen | PS02 playbook | PS08 gate | 선택 가이드인가, reopen 전 승인 지점인가 |
| W04 사용자 목적 복구 | CP06 skill | PS11 handoff/reentry | 반복 독립 task인가, session continuity의 일부인가 |
| W05 frame·scope·constraint 수정 | PS04 execution plan | CI07 current-state update | 작업 행동인가, authoritative state 변경인가 |
| W06 criteria/evaluation 갱신 | PS09 loop contract | CI12 decision record + QO09 eval | 반복 loop 안의 조정인가, 하네스 변경인가 |
| W07 두 correction 비교 | PS09 loop | RI07 agent team + QO01 outputs | 한 agent sequential 비교인가, 독립 병렬 생성인가 |
| W08 alternate-frame pass | CP06 skill | RI08 forked context | 재사용 절차인가, 원 대화를 보존한 branch 실험인가 |
| W09 source-first second pass | CP06 skill | RI02 subagent | main에서 재탐색할 것인가, context-heavy source 작업을 격리할 것인가 |
| W10 evaluator replay | RI03 independent reviewer | RI08 forked context + PS09 loop | 독립 판정인가, 대체 process를 실제 branch로 재수행할 것인가 |
| W11 loop goal/top purpose 대조 | PS09 loop close | CI11 report schema | loop engine의 전환인가, report field만 필요한가 |
| W12 continue·pause·reframe | PS08 gate | PS06 router | 사람이 판단할 gate인가, evidence-based route인가 |
| W13 human gate | RI10 human owner | CE07 approval gate | 의미·취향 판단인가, external action 승인인가 |
| W14 stop·미완료 기록 | PS09 loop contract | PS07 state machine + PS10 checkpoint | loop 종료 규칙인가, 복구 가능한 상태 저장인가 |

## Context·state·provenance 내용의 배치 후보

| 내용 후보 | 상태 형식 | 보조 형식 | 배치 판별 질문 |
| --- | --- | --- | --- |
| C01 전체 지도·cursor | CI07 current state | LA01 registry | work-unit map인가, 하네스 자산 전체 locator인가 |
| C02 목적·current frame | CI07 current state | CI01 outcome brief | 장기 유지할 두 층위인가, 한 run에만 필요한가 |
| C03 판단 provenance | LA03 evidence ledger | CI11 schema | 별도 ledger가 필요한가, current field로 충분한가 |
| C04 source role map | CI08 reference 또는 CI07 state | QO12 evidence receipt | 기대 역할 문서인가, 실제 source effect evidence인가 |
| C05 source universe·packet | LA01 registry + CI10 packet template | QO12 receipt | 전체 locator와 전달 manifest를 분리할 것인가 |
| C06 판단 시간축 | QO10 trace | CI12 decision record | 모든 전환 log인가, 중요한 decision만 남길 것인가 |
| C07 current·history 분리 | CI07 current + QO10 history | LA08 snapshot | 읽을 current인가, 복구용 시점 사본인가 |
| C08 stale current 감지 | LA07 monitor | QO04 check | 지속 관찰인가, 명시 실행 검사인가 |
| C09 완료·수용·검증 state | PS07 state machine | CI11 schema | 전환을 enforce할 것인가, 상태만 표현할 것인가 |
| C10 경쟁 가설 register | PS12 backlog | QO09 eval set | 열린 후보 보존인가, 반복 판별 case인가 |
| C11 cross-session sync | PS11 handoff | CI01 outcome brief | 재진입 packet인가, 새 run prompt인가 |
| C12 scaffold feedback | LA05 usage feedback | CI12 decision record | 관찰 누적인가, 실제 변경 결정인가 |

## Review·agent·role 내용의 배치 후보

| 내용 후보 | 역할 형식 | procedure·evidence 형식 | 배치 판별 질문 |
| --- | --- | --- | --- |
| R01 artifact improvement reviewer | RI03 reviewer | CP06 review skill | context isolation이 핵심인가, 반복 절차가 핵심인가 |
| R02 source+result reviewer | RI03 reviewer | QO12 evidence receipt | 독립 해석이 필요한가, source trace만 필요한가 |
| R03 frame challenge reviewer | RI03 reviewer 또는 RI05 advisor | RI08 fork | report만 필요한가, alternate artifact까지 만들 것인가 |
| R04 fact verifier | RI04 verifier | QO05 contract/QO12 receipt | 사람·모델 판정인가, deterministic check가 가능한가 |
| R05 first-reader observer | RI03 reviewer | QO07 human review | agent simulation인가, 실제 독자 판단인가 |
| R06 self-check auditor | RI04 auditor | CP06 self-check skill | 독립 report인가, main이 따르는 재사용 절차인가 |
| R07 advisor | RI05 advisor | CI10 advisor prompt | 지속 custom role인가, 일회 질문 형식인가 |
| R08 evaluation-system auditor | RI04 auditor | QO09 eval set | 구조 drift report인가, grader regression인가 |
| R09 packet auditor | RI04 verifier | QO12 receipt | packet 의미 판단인가, 전달 사실 검사인가 |
| R10 main adjudicator | RI01 main | CI11 adjudication schema | main의 기본 책임인가, report 양식 보조가 필요한가 |
| R11 human taste gate | RI10 human owner | QO01 comparison artifact | 선택 권한은 사람에게 두고 무엇을 비교물로 만들 것인가 |
| R12 harness observer | RI04 auditor | LA01 registry + CI12 record | 구조 report인가, inventory evidence가 먼저 필요한가 |

## Skill·dispatcher·trigger 내용의 배치 후보

| 내용 후보 | 조건부 형식 | 자동 형식 | 배치 판별 질문 |
| --- | --- | --- | --- |
| S01 quality-stall dispatcher | CP06 skill + PS06 router | CE12 lifecycle hook | 사용자가 호출할 것인가, 반복 실패 event를 감지할 수 있는가 |
| S02 repeated-misalignment self-check | CP06 skill | CE12 stop hook | 의미 판정이 필요한가, 명확한 반복 signal이 있는가 |
| S03 review-mode selector | PS06 router | CI10 prompt template | 선택 logic을 재사용할 것인가, 사람이 매번 고를 것인가 |
| S04 source/context recovery | CP06 skill | RI02 subagent | 절차 load가 필요한가, 많은 source read를 격리할 것인가 |
| S05 frame-diversity | CP06 skill | RI08 fork + RI07 team | main에서 여러 frame을 만들 것인가, context를 분기할 것인가 |
| S06 completion/acceptance guard | PS08 gate | CE11 post-action hook | 열린 acceptance인가, machine-detectable status misuse인가 |
| S07 goal restoration/revision router | PS02 playbook | CP06 skill | 판단 reference로 충분한가, 독립 workflow가 필요한가 |
| S08 loop escalation router | PS06 router | CE12 stop hook | main 판단인가, loop event에서 자동 제안할 것인가 |
| S09 learning capture | CP06 skill | CE12 session-end hook | 무엇이 학습인지 모델 판단이 필요한가, 단순 capture인가 |
| S10 reentry/handoff | CP06 skill + PS11 packet | CE12 session-end/start hook | 내용을 생성하는 판단과 전달 event를 분리할 것인가 |

## Artifact·evaluation·observability 내용의 배치 후보

| 내용 후보 | artifact 형식 | 관찰·검증 형식 | 배치 판별 질문 |
| --- | --- | --- | --- |
| A01 integrated v1 | QO01 integrated artifact | QO07 review | 무엇을 통합해 누가 판단할 것인가 |
| A02 concept report | QO01 artifact + CI11 schema | QO08 evaluation | 생성 format인가, 독립 판정까지 필요한가 |
| A03 output-first comparison | QO01 multiple artifacts | RI08 fork/RI07 team | 한 context 비교인가, 독립 branch가 필요한가 |
| A04 vertical slice | QO01 artifact | QO06 E2E | slice 자체인가, 실제 user path 실행인가 |
| A05 external-contract E2E | QO06 E2E | QO12 receipt | 실행만 할 것인가, 재현 증거를 남길 것인가 |
| A06 evaluation ledger | LA03 ledger | QO11 observability view | source of truth인가, 사람이 보는 집계인가 |
| A07 review packet manifest | CI10 template | QO12 receipt | 계획된 packet인가, 실제 전달 evidence인가 |
| A08 PASS scope record | CI11 schema | LA03 ledger | report-local인가, 여러 run을 추적할 것인가 |
| A09 reviewer correlation map | QO11 observability report | RI04 auditor | 단순 view인가, independence 판정 역할이 필요한가 |
| A10 decision diff | CI12 decision record | QO10 trace | 중요한 change인가, 모든 전환 log인가 |
| A11 source-to-result trace | QO10 trace | QO11 view | 원증거인가, 사람이 읽을 map인가 |
| A12 quality signal log | QO10 trace | LA05 usage feedback | 결과 신호 보존인가, 하네스 개선 feedback인가 |

## Learning·maintenance 내용의 배치 후보

| 내용 후보 | 지식·상태 형식 | lifecycle 형식 | 배치 판별 질문 |
| --- | --- | --- | --- |
| L01 core candidate card | PS12 backlog + CI11 schema | LA04 lifecycle | 아이디어 보존인가, trial/승격 전환까지 관리할 것인가 |
| L02 promotion ledger | LA03 ledger | LA04 lifecycle | 상태 기록인가, 전환 규칙인가 |
| L03 process chronology | QO10 trace | LA08 snapshot | 사건 history인가, 복구 가능한 시점 사본인가 |
| L04 contrast library | CI08 reference | CP07 skill resource | 독립 지식인가, 특정 skill에서만 소비하는가 |
| L05 counterexample library | CI08 reference | QO09 eval set | 설명용 calibration인가, 자동 regression case인가 |
| L06 trigger-situation library | PS02 playbook | CP06 skill metadata | 판단 사례인가, 실제 activation description인가 |
| L07 case evidence boundary | CI08 source reference | QO12 receipt | 사례별 설명인가, claim별 evidence인가 |
| L08 stale/deprecation review | LA04 lifecycle | LA07 monitor | 주기적 human review인가, stale signal 자동 감지인가 |
| L09 usage feedback | LA05 record | QO11 observability | 원자료 기록인가, aggregate view인가 |
| L10 harness change decision | CI12 decision record | LA10 rollback condition | 왜 바꿨는지와 언제 되돌릴지를 한 record에 둘 것인가 |

## 이 교차 지도가 드러내는 것

첫째, 첫 확장 기록의 많은 내용은 core rule 하나로만 구현되지 않는다. 같은 판단을 기억하게 하는 형식과 실제 상황에서 발동시키는 형식, 작동했는지 보는 증거 형식이 별개일 수 있다.

둘째, 반대로 모든 내용을 세 겹으로 구현할 필요도 없다. 아직 재사용성이 검증되지 않은 후보는 CI01 one-run brief나 PS12 backlog로 시험할 수 있다.

셋째, 공식 레퍼런스에서 가져온 것은 `AGENTS.md를 써라`, `Skill을 만들어라`, `Hook을 붙여라`라는 처방이 아니다. 하나의 내용을 지속 context, 조건부 procedure, 별도 role, enforcement, evidence 중 무엇으로 만들 것인지 묻는 배치 축이다.

넷째, 실제 수거에서는 먼저 내용 후보의 합의 상태와 반복 가치를 결정한 뒤 형식을 고른다. 형식 카탈로그가 내용 후보의 우선순위를 결정하지 않는다.
