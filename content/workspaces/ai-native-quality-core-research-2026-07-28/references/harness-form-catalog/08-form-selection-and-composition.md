---
작성일: 2026-07-29
성격: 하네스 형식 선택축과 조합 후보
현재상태: 비교용 / 미채택
---

# Form Selection and Composition

## 형식을 고르기 전에 묻는 열두 질문

### 1. 얼마나 오래 유효한가

- 한 turn
- 한 task/run
- 한 project cycle
- repository 전반
- 개인 전역
- 조직 전역

유효 기간이 짧은 판단을 durable instruction에 넣으면 stale rule이 된다. 반복 규칙을 prompt에만 두면 session 이동 때 유실된다.

### 2. 무엇이 발동시키는가

- 사용자 직접 요청
- 모델의 relevance 판단
- dispatcher
- filesystem path
- tool event
- lifecycle event
- 시간 schedule
- 외부 상태 변화

내용이 같아도 발동 방식이 다르면 prompt, skill, hook, automation 중 owner가 달라진다.

### 3. 누가 소비하는가

- main agent
- 특정 subagent
- 모든 agent
- 사람 reviewer
- runtime
- script/tool
- external service

consumer가 다르면 같은 canonical source를 runtime-specific wrapper로 제공할 수 있다.

### 4. advisory인가 enforced인가

- 모델이 상황에 맞게 해석할 기준
- 사람이 승인할 gate
- test가 확인할 formal contract
- hook이 차단할 event
- sandbox가 제한할 OS access
- managed policy가 금지할 configuration

강한 문구는 enforcement가 아니다. 반대로 enforcement 가능한 것만 중요한 것도 아니다.

### 5. 판단이 열려 있는가 닫혀 있는가

- 열린 의미·취향·trade-off
- 제한된 분류
- deterministic check
- exact command policy

열린 판단을 script로 밀어 넣으면 brittleness가 생기고, 닫힌 invariant를 reviewer에게 매번 맡기면 비용과 누락이 생긴다.

### 6. 현재 context가 필요한가 격리가 필요한가

- main 대화의 의도와 결정을 계속 봐야 함
- 많은 로그·source를 읽지만 summary만 필요
- independent judgment가 필요
- file write 충돌을 피해야 함

이에 따라 main, skill, subagent, fork, worktree가 달라진다.

### 7. live data나 external action이 필요한가

- 고정 reference만 필요
- 자주 바뀌는 data를 읽어야 함
- 인증된 external action이 필요
- local deterministic command만 필요

reference, local script, MCP resource, MCP tool, connector를 구분한다.

### 8. 실패가 어떤 모습인가

- 발견되지 않음
- load되지 않음
- 발동하지 않음
- 실행 실패
- 잘못된 결과
- 결과는 맞지만 품질 변화 없음
- stale state

형식 선택은 happy path보다 관찰 가능한 failure state를 포함해야 한다.

### 9. 무엇이 성공을 증명하는가

- artifact inspection
- test
- contract check
- E2E
- human acceptance
- trace
- evidence receipt
- repeated eval

하나의 proof가 다른 품질축을 대신하지 않는다.

### 10. 누가 변경하고 누가 승인하는가

- 사용자
- project maintainer
- main agent
- runtime admin
- reviewer
- script

owner와 authority가 없으면 current와 candidate가 섞인다.

### 11. 어떤 수명주기를 갖는가

- experiment
- local trial
- shared active
- deprecated
- retired

처음부터 plugin·global rule로 만들지, project candidate로 시험할지 결정한다.

### 12. 비용과 마찰은 어디에 생기는가

- context token
- model/tool invocation
- review latency
- approval fatigue
- maintenance
- false trigger
- file conflict

`가능한 형식`과 `채택할 가치가 있는 형식`은 다르다.

## 형식 조합 후보

아래 조합은 내용이 아니라 작동 topology의 예다.

## Composition 01. One-run judgment

**형식**

CI01 outcome brief → PS04 execution plan → QO01 artifact → QO07 human review

**적합한 상황**

아직 반복성이 증명되지 않은 복잡한 한 번의 작업.

**장점**

하네스 자산을 만들기 전에 실제 문제와 결과를 배운다.

**위험**

배운 판단이 write-back되지 않으면 다음 session에서 유실된다.

## Composition 02. Durable project convention

**형식**

CI03 root instruction + CI04 path-scoped instruction + CE01 project config + QO04 deterministic check

**적합한 상황**

repository 역할, command, naming, public boundary처럼 반복되고 검증 가능한 convention.

**장점**

지침과 runtime setting과 verification을 한 문서에 섞지 않는다.

**위험**

같은 내용을 여러 layer에 복제할 수 있다.

## Composition 03. Focused repeatable workflow

**형식**

CP06 skill + CP07 resource bundle + PS01 workflow + CI11 output contract + LA05 usage feedback

**적합한 상황**

여러 번 수동으로 성공했고 trigger·입출력이 비교적 안정된 task.

**장점**

긴 prompt를 반복하지 않고 필요할 때만 load한다.

**위험**

description이 잘못되면 미발동·과발동하며, skill 존재가 사용 성공을 보장하지 않는다.

## Composition 04. Independent review

**형식**

CI10 review packet template + RI03 reviewer + QO08 independent evaluation + QO12 evidence receipt + RI01 main adjudication

**적합한 상황**

생성자와 다른 판단 위치가 필요하고 source·criteria·권한을 명시할 수 있는 결과.

**장점**

review 결과를 생성 flow와 분리한다.

**위험**

같은 summary와 frame을 물려주면 독립성은 이름뿐이다.

## Composition 05. Enforced invariant

**형식**

CE04 advisory explanation + CE05 command rule 또는 CE10 pre-action hook + CE08/CE09 sandbox + QO04 test

**적합한 상황**

secret, destructive command, forbidden path, exact schema 같은 닫힌 경계.

**장점**

왜 필요한지 설명하는 layer와 실제 차단 layer를 분리한다.

**위험**

hook·policy가 잘못되면 legitimate work를 막고, handler 자체도 실패할 수 있다.

## Composition 06. External live-context workflow

**형식**

CP04 MCP resource 또는 CP03 MCP tool + CP06 skill + CE06 permission + QO12 evidence receipt

**적합한 상황**

외부 data가 자주 바뀌고 정해진 방식으로 조회·행동해야 하는 작업.

**장점**

stale pasted context와 수동 복사를 줄인다.

**위험**

tool output이 크거나 불완전하고, 인증·권한·외부 side effect가 생긴다.

## Composition 07. Isolated parallel work

**형식**

RI01 main + RI02 subagents + 필요 시 RI09 worktree + PS11 handoff packet + QO10 trace + main synthesis

**적합한 상황**

서로 독립인 exploration·test·analysis 또는 file ownership을 분리한 구현.

**장점**

main context pollution을 줄이고 wall-clock을 단축한다.

**위험**

coordination cost, duplicated assumptions, write conflict, summary loss.

## Composition 08. Stable scheduled workflow

**형식**

CP06 skill 또는 CP02 script + LA06 scheduled task + RI09 isolated worktree + LA07 monitor + QO11 run view

**적합한 상황**

수동으로 여러 번 검증된 scan·report·maintenance.

**장점**

method와 cadence와 execution isolation을 분리한다.

**위험**

unattended permission, stale prompt, noisy output, cleanup cost.

## Composition 09. Harness learning loop

**형식**

LA05 usage feedback → QO09 eval set → CI12 decision record → LA04 promotion/deprecation → LA10 rollback

**적합한 상황**

실제 사용 결과를 보고 rule·skill·agent를 개선하려는 경우.

**장점**

하네스를 영구 추가물이 아니라 평가 가능한 자산으로 본다.

**위험**

관리 overhead가 실제 작업보다 커질 수 있다.

## Composition 10. Recovery-capable operation

**형식**

LA01 registry + LA02 canonical source map + LA08 snapshot + LA09 restore/replay + QO06 post-restore verification

**적합한 상황**

config·hook·session·deployment처럼 잘못된 변경의 복구가 중요한 작업.

**장점**

capture와 restore와 restored success를 분리한다.

**위험**

snapshot만 있고 실제 restore를 시험하지 않는 false confidence.

## 형식 선택의 현재 결론

공식 문서에서 여러 기능을 확인했다는 사실은 `더 많은 장치가 필요하다`는 결론이 아니다. 현재 내용 후보를 다음 네 부류로 먼저 나눠야 한다.

- 항상 기억할 판단축
- 특정 failure signal에서만 실행할 route
- 사람·agent·tool 중 다른 판단 위치가 필요한 작업
- 자동 enforcement나 반복 실행이 실제로 필요한 invariant

그 뒤 가장 작은 형식을 고르는 것이 아니라, 필요한 작동 성질을 만족하는 형식을 고른다. 형식이 작아도 유실되면 틀리고, 형식이 커도 검증되지 않으면 틀린다.
