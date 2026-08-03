---
작성일: 2026-08-02
성격: AI self-check 기존 src 기반 전체 원고 개선 실행 cycle
공개상태: 내부 작업 문서
현재상태: 최대 5회 완료 / Round 05 fresh review·evidence pass / 최종 회수본 src 반영 / 사용자 checkpoint 대기
---

# AI self-check 통합 원고 개선 loop

## 실행 계약

이 cycle은 [AI self-check 기존 src 기반 전체 원고 개선 계획](../../2026-08-01-ai-self-check-integrated-draft-improvement-plan.md)을 실행한다.

고정 Goal:

> AI가 결론을 고쳤거나 잘못을 인정했다는 데서 멈추지 않고, 독자가 자신의 AI 협업에서 문제 정의·전제·입력 범위·작업 순서·다음 행동 중 무엇이 실제로 달라졌는지 판별할 수 있게 하는 글. 읽은 뒤에는 최근 대화 하나를 다시 열어, 답이 아니라 답을 만든 판단 위치를 확인하고 다음 동작 하나를 바꿔 본다.

- 사용자: 실제 저자이며 경험 의미, 중심, 대표 사건, 큰 구조의 변경을 판단한다.
- Main: 인터뷰·source·현재 원고를 대조하고, reviewer report를 Material → Shaping → Texture/Reader Flow 순서로 회수한다.
- writing worker: 같은 주체를 기본 유지하며 cycle 안의 완결된 후보 원고만 작성한다.
- fresh reviewer: 매 회차 교체하고 한 원고만 Material·Shaping·Texture·Reader Flow로 나눠 report-only 판정한다.
- evidence checker: 사용자와 Main이 원고를 수용한 뒤 마지막 사실 대조만 맡는다.

Fresh reviewer는 improvement reviewer다. 먼저 `이번 원고를 가장 크게 끌어올릴 축`과 실제 원고 move를 제시한다. Source packet은 material 발견과 사실·인과 상한을 위한 guardrail로만 쓴다. Packet 밖 직접 원천이 필요하면 쟁점을 보고하고 Main이 회수하며, 전면 사실 감사는 마지막 evidence checker에게 남긴다.

독자 행동을 강화한다는 이유로 Retrospective를 표·체크리스트·빈칸 실습 중심의 사용법 문서로 자동 전환하지 않는다. 장치는 산문과 장면으로 같은 판별을 만들 수 없는 경우의 후보이며, 저자 경험과 발견의 질감을 함께 보호한다.

## 입력 분리

Writing worker는 저자 인터뷰와 저자·원고 지도를 본다. Fresh reviewer는 이를 보지 않는다.

Fresh reviewer에게 주는 것:

- 해당 회차 원고 하나
- 대상과 최소 독자 결과
- 생성 계보 source packet과 source index
- 필요한 직접 원천 접근점
- Material·Shaping·Texture 기준과 Reader Flow lens

Fresh reviewer에게 주지 않는 것:

- 사용자 인터뷰와 저자·원고 지도
- active-state와 process
- 이전 원고와 이전 review
- Main의 구조 가설·변경 이유·예상 판정
- writer가 받은 수정 brief

## Loop 상한과 종료

`완결된 수정본 → fresh 통합 review → Main 회수`를 최대 5회 수행한다. 서로 다른 fresh reviewer가 두 회차 연속 모든 책임에서 고우선 blocker가 없다고 판정하고 사용자 checkpoint도 통과하면 조기 종료한다.

마지막에는 새로 바뀐 사실 표현과 현재 회고의 시간 경계를 evidence checker가 직접 원천과 대조한다.

## 회차 상태

| 단계 | 상태 | 현재 결과 |
| --- | --- | --- |
| Round 0 | 완료 | 현재 src baseline과 저자·원고 지도를 만들었다. 사용자에게 지도 요약을 공개하고 정정이 들어오면 writer보다 지도에 먼저 반영한다. |
| Round 1 | 완료 | 저자 판단과 장면을 넓힌 첫 완결본을 만들었다. Fresh review는 source 범위, 호출 문턱 장면, 중반 발견 순서를 고우선 개선점으로 남겼다. |
| Round 2 | 완료 | 과발동 장면과 확인 가능한 전환 순서를 넣고 중반 역할 설명을 재배치했다. Material은 통과했고 Shaping·Texture·Reader Flow를 더 좁혔다. |
| Round 3 | 완료 | 다섯 판단 위치를 산문에 연결하고 AX의 처음·과교정·복구를 한 도식으로 만들었다. 남은 반복 설명과 전환을 회수했다. |
| Round 4 | 완료 | 원고 개선에 관한 고우선 blocker는 없었다. Reviewer가 찾은 source packet 간극을 직접 원천으로 보강했다. |
| Round 5 | 완료 | 다섯 위치와 별도 AI의 조건부 역할을 국소 보정했다. Thread 안의 agent 상한은 standalone ephemeral Codex reviewer로 우회해 완전히 새 입력 경계의 통합 review를 받았다. Material은 Pass, 나머지 책임은 국소 Partial, 고우선 blocker는 없었다. Main이 유효한 네 move를 회수했다. |
| 최종 | checkpoint 대기 | Fresh review 회수 뒤 evidence regression에서도 P0·P1은 남지 않았고 최종 회수본을 `src/ai-self-check.md`에 반영했다. 사용자의 경험·중심 수용 여부는 아직 열려 있다. |

## 산출물

- [현재 src baseline](./00-current-src-baseline.md)
- [저자·원고 지도](./01-author-draft-map.md)
- `round-NN-draft.md`
- `round-NN-review.md`
- `round-NN-recovery.md`
- [사용자 checkpoint 기록](./user-checkpoint.md)
- 최종 evidence report
- Main이 회수한 최신 `src/ai-self-check.md`

Writer 후보, fresh review 원문, Main 회수는 서로 다른 문서로 유지한다.

## 최종 산출물

- [Round 05 fresh review 대상 완결본](./round-05-draft.md)
- [Round 05 review 실행 한계와 regression](./round-05-review.md)
- [Round 05 Main 회수](./round-05-recovery.md)
- [최종 evidence report](./final-evidence-report.md)
- [완료 감사](./completion-audit.md)
- [최종 blind reader transfer test](./final-reader-transfer-test.md)
- [사용자 checkpoint](./user-checkpoint.md)
- [현재 src](../../../src/ai-self-check.md)

Round 05의 첫 fresh reviewer 생성은 현재 thread의 agent 상한으로 실패했지만, 완료 감사에서 standalone ephemeral·read-only reviewer를 새 문맥으로 실행해 간극을 회수했다. 앞서 받은 non-fresh diff regression은 이 판정을 대신하지 않으며 실행 이력으로만 보존한다. Fresh review와 evidence pass도 사용자 checkpoint를 대신하지 않는다.
