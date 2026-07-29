---
작성일: 2026-07-29
성격: skill·dispatcher·trigger 하네스 요소 후보
현재상태: 미채택
---

# Skill, Dispatcher, and Trigger Elements

이 문서의 후보는 모두 별도 Skill로 만들자는 뜻이 아니다. 반복 가능한 발동 조건과 반환 계약이 있는지 시험하기 위해 Skill·dispatcher 형태로 구체화한 것이다. 한두 번만 필요한 것은 core example이나 playbook branch로 남을 수 있다.

## S01. Quality-stall dispatcher

**발동 신호**

- 한 번 이상의 수정 뒤 같은 상위 불만이 반복됨
- 여러 review가 통과했지만 사용자 수용이 없음
- 결과는 완결됐으나 문제를 잘못 풀었다는 신호

**분기**

- local artifact repair
- source recovery
- frame challenge
- evaluation audit
- user purpose recovery

**반환**

선택한 route, 선택 근거, 열지 않는 route, 다음 판별 artifact.

**오발동 방지**

첫 번째 단순 오류에는 자동 발동하지 않는다.

## S02. Repeated-misalignment self-check trigger

**발동 신호**

사용자가 이미 정정한 판단이나 행동이 다시 반복된다.

**절차**

현재 턴만 보지 않고 이전 correction, main의 해석, 실제 행동을 역추적한다. `말을 놓침`, `권한 오독`, `frame 고착`, `근거 역할 오독`을 경쟁 설명으로 둔다.

**반환**

반복 패턴, 최초 divergence, 바로 바꿀 행동, 아직 모르는 원인.

**오발동 방지**

처음 나온 가벼운 오해에는 별도 audit를 만들지 않는다.

## S03. Review-mode selector

**입력**

- 현재 artifact 상태
- 불확실한 품질축
- source 접근 필요
- 독립 context 필요

**선택지**

- improvement review
- source+result review
- frame challenge
- evidence verification
- first-reader observation
- harness audit

**반환**

선택한 역할, packet, 반환 계약, report의 변경 권한.

**오발동 방지**

모든 reviewer를 한 번에 호출하지 않는다.

## S04. Source/context recovery trigger

**발동 신호**

- source의 motive와 강한 장면이 결과에서 반복해서 사라짐
- summary가 원문 역할을 대신함
- session handoff 뒤 중심이 평평해짐

**절차**

source universe, 실제 전달 packet, 결과 trace를 대조한다. 필요하면 source-first pass로 전환한다.

**반환**

누락된 source 역할, 다시 읽을 원문, 현재 결과에서 재개할 지점.

**오발동 방지**

자료 양을 늘리는 것으로 해결하지 않는다.

## S05. Frame-diversity trigger

**발동 신호**

후보 A/B가 표현만 다르고 같은 대표 문제와 성공 조건을 공유한다.

**절차**

source에서 경쟁하는 causal story를 찾아 대표 문제, 사용자 변화, output role 중 하나 이상이 다른 frame을 만든다.

**반환**

frame별 전제와 trade-off, 비교할 artifact.

**오발동 방지**

무작위 관점 생성과 구분한다.

## S06. Completion/acceptance guard

**발동 신호**

artifact가 complete, reviewer가 PASS, test가 green이라는 이유로 current 승격이 일어날 때.

**절차**

completion, acceptance, verification, publishability 상태와 owner를 확인한다.

**반환**

현재 획득한 상태, 미획득 상태, 다음 gate.

**오발동 방지**

모든 임시 artifact에 무거운 상태 기계를 만들지 않는다.

## S07. Goal restoration or revision router

**입력**

- 사용자 원문
- current goal
- 실패한 결과
- 변경 제안

**분기**

- 목적 복구
- cycle goal 수정
- working hypothesis 수정
- success condition 수정
- goalpost 이동 거부

**반환**

무엇을 왜 바꾸는지, 변경 권한, 기존 결과 재평가 방법.

**오발동 방지**

`goal`이라는 단어 하나로 모든 층위를 묶지 않는다.

## S08. Loop escalation/de-escalation router

**발동 신호**

현재 실패가 어느 정도의 반복을 요구하는지 불명확할 때.

**선택지**

- 한 번의 local fix
- targeted reopen
- independent replay
- alternate-frame comparison
- full evaluation loop
- human gate

**반환**

선택한 loop 강도, 예상 정보 가치, stop condition.

**오발동 방지**

품질을 높인다는 이유로 항상 더 무거운 loop를 선택하지 않는다.

## S09. Learning-capture trigger

**발동 신호**

- 같은 판단이 다른 작업에도 반복될 가능성이 있음
- 사용자 사고가 중요한 방식으로 바뀜
- 기존 기준이 실제 실패를 놓침

**절차**

사건, 바뀐 판단, 대비 사례, 적용 신호, 비적용 조건을 후보로 남긴다.

**반환**

candidate card, 아직 승격하지 않을 이유, 다시 관찰할 사례.

**오발동 방지**

모든 시행착오를 rule로 저장하지 않는다.

## S10. Reentry and handoff skill

**입력**

- purpose
- current frame
- authoritative artifact
- confirmed facts
- open hypotheses
- next decision

**절차**

새 실행자가 원문에 재접근할 수 있게 하되, process 전체를 prompt에 복사하지 않는다. 수정 권한과 금지 영역을 분명히 한다.

**반환**

독립적으로 실행 가능한 sync packet과 source links.

**오발동 방지**

handoff를 current 대체물로 만들거나, 아직 합의되지 않은 판단을 확정어로 쓰지 않는다.
