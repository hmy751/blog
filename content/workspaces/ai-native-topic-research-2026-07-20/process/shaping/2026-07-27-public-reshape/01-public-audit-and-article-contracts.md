---
작성일: 2026-07-27
성격: AI-native 다섯 글 public reshape v1 작성 계약
공개상태: 내부 작업 문서
현재상태: 자료 종합·public-safe specificity 판정 완료 / v1 작성 기준
---

# Public audit와 글별 작성 계약

## 이번 문서의 역할

이 문서는 기존 `near-final v3`를 평가하거나 새 editorial 기준을 만드는 문서가 아니다. handoff가 지정한 자료 권위에 따라 active center, backlog material, 직접 source, v3의 사실 교정을 대조하고, 다섯 public draft를 어떤 장면과 판단 흐름으로 다시 쓸지 고정한다.

자료를 읽은 순서는 다음과 같다.

1. repo guide와 `blog-write`
2. public reshape handoff
3. active-state `README`, `criteria`, 상위 후보 다섯 section
4. post-v3 사용자 sync
5. near-final cycle의 context/material ledger
6. near-final v3 다섯 편
7. editorial workflow, article type, output contract, source, voice, developer, reader-flow, portfolio-signal, edit-patterns, supporting-materials
8. `01a~01c` source check와 필요한 직접 source
9. 후보별 독립 material report

버전이 최신이라는 이유로 v3의 구조를 따르지 않는다. 현재 중심은 active-state가, 사실·actor·수치·시간순서는 직접 source가, 살아 있는 장면과 문장은 backlog와 기존 draft가 소유한다.

## 질문 판정

v1 작성을 막는 사용자 질문은 남지 않았다.

- Current는 `여행 상품 조건을 결제 전에 검토하는 plugin의 첫 제품 경로`까지 공개 가능하게 설명할 수 있다.
- Self-check는 `여행 플랫폼의 해커톤 과제에서 어떤 미해결 사용자 문제를 더 조사할지 정하던 과정`까지 공개 가능하게 설명할 수 있다.
- 회사명, 대회명, 실제 상품명, 내부 프로젝트명은 중심 장면을 이해하는 데 필요하지 않으므로 쓰지 않는다.
- actor가 섞이는 곳에서는 저자의 행동을 `저/제가/나는`, 제품을 쓰는 사람을 `사용자`, AI의 행동을 `AI가 제안했다/점검했다/적용했다`로 구분한다.
- 직접 구현과 AI가 수행한 구현의 경계가 원천에서 완전히 닫히지 않은 곳은 `제가 구현했다`로 넓히지 않고 `AI와 구현했다`, `기준을 바꿨다`, `교정 범위를 정했다`, `다시 실행했다`처럼 확인 가능한 저자 행동만 쓴다.

정확한 회사명·대회명·서비스명 공개나 발행 순서, 시리즈 여부, 최종 제목은 v1 완결본을 본 뒤 결정할 수 있으므로 현재 blocker로 올리지 않는다.

## 공통 public contract

다섯 편 모두 다음을 지킨다.

- 첫 3~5문단에서 만들거나 결정하던 대상, 이상한 결과, stakes, 저자 행동을 복구한다.
- 내부 operator 언어는 실제 장면 뒤에 필요한 개념 한두 개만 남긴다.
- private 이름을 지운 자리를 `한 회사`, `한 프로젝트`, `다른 작업`으로 채우지 않는다. 서비스 영역과 기능, 결정 목적을 남긴다.
- 한 primary artifact가 판단 변화를 보여 준다. 다른 표·code·trace는 중심을 보조할 때만 쓴다.
- artifact 뒤에는 이미 보인 차이를 다시 장문으로 설명하지 않고, 다음 판단으로 넘긴다.
- caveat는 제한하는 주장 가까이에 둔다. 확인된 변화까지 낮추지 않는다.
- 다섯 편의 서사 엔진을 다르게 둔다.
- `A가 아니라 B였다`를 반복되는 결론 형식으로 쓰지 않는다.

## 1. Current / active-state operation

### Article type

`product-architecture`에 가까운 technical case. 파일 정리법보다 긴 AI 작업의 상태 수명, 권위, 쓰기 책임을 설계한 사례로 쓴다.

### Opening contract

여행 상품 조건을 결제 전에 검토하는 plugin의 첫 세로 slice를 닫던 장면에서 시작한다.

- 현재 goal, acceptance, evidence와 그 조건을 고른 이유가 같은 process 기록 안에 있었다.
- 제품 경로와 완료 조건이 바뀌면 과거 판단을 보존해야 하는 문장과 지금 구현자가 따라야 하는 문장이 같은 권위로 남는다.
- 저자는 현재 구현 계약을 실행 영역으로 옮기고, process에는 선택 이유와 당시 실행 결과만 남기는 쪽으로 경계를 고쳤다.

stakes는 문서를 찾는 시간이 아니라 다음 AI가 오래된 완료 조건을 현재 계약처럼 따라 잘못된 checkpoint를 닫을 수 있다는 데 둔다.

### Primary artifact

`분리 전 / 분리 후`의 문서 목록보다 상태의 `수명 / 쓰기 권한 / 읽는 질문`을 보여 주는 권위 이동 표를 쓴다.

```text
history: 당시 이유와 결과를 보존
active contract: 지금 실행할 조건을 덮어씀
current: 전체 지도와 한 cursor에서 원천으로 연결
source: 사실·code·test·산출물을 직접 소유
```

### Second scene

외부 제출용 다섯 문항을 작성할 때 AI가 `current`를 읽고도 직전 구현·검증을 프로젝트 전체처럼 쓴 장면을 stress test로 둔다.

- 최근 구현의 사실이 틀린 것이 아니라 질문의 시간축에 맞지 않았다.
- 저자는 전체 질문과 최신 구현 질문을 나누고, 지도에서 서로 다른 원천으로 내려가 다섯 문항을 전면 재작성했다.
- 마지막 외부 사건이 current에서 빠진 일은 update ownership의 남은 한계로 짧게 둔다.

### Ending / lasting signal

`current`를 만능 요약이나 실패한 장치로 만들지 않는다. 판단을 대신하지는 않지만 잘못된 시간축에서 프로젝트 계보로 돌아갈 경로를 제공했다고 닫는다.

남겨야 할 신호:

> 긴 AI 작업에서 상태의 권위, 수명, 갱신 책임을 설계하고 잘못된 시간축에서 직접 원천으로 복구하는 개발자

### Public boundary

- 내부 문서명·경로·실제 설문 문장·상품명은 쓰지 않는다.
- commit·cursor 수는 필요하지 않으면 본문에서 뺀다. 사용 흔적이지 품질 지표가 아니다.
- current가 생산성이나 재진입 성공을 단독으로 만들었다고 쓰지 않는다.

## 2. Independent review and recovery

### Article type

`technical-case-study`.

### Opening contract

여행 상품 조건을 일행과 일정에 대입하는 plugin의 첫 checkpoint에서 시작한다.

- 같은 Python runner의 `unittest` test method 9개, 별도 validator와 CLI가 모두 초록이었다.
- read-only 판별자는 문자열 `"false"`가 boolean 계약을 비껴간 문제, 공개 source와 fixture의 모순, 참여자 범위와 답변 충돌, 설치형 자연어 E2E 부재를 찾았다.
- 저자는 checkpoint를 닫지 않고 source·실제 입력 형태·제품 경로에서 같은 기능을 다시 열었다.

### Stakes

타입 버그 하나보다 더 큰 위험은 구현, fixture, 기대 결과, 완료 설명이 같은 검증 세계를 공유해 실제 source와 사용자 입력 바깥의 공백을 완료처럼 읽는 일이다.

### Primary artifact

문자열 `"false"` 최소 재현을 첫 발견 artifact로 쓴다. 그 뒤 9와 15를 같은 runner의 test method 수로 정확히 설명하고, source 대조·validator·CLI·설치형 자연어 E2E는 숫자 밖의 검증으로 분리한다.

### Recovery

- 판별자의 미통과를 새 정답으로 받지 않는다.
- 티켓 한 항목만 고치지 않고 source, 입력 타입, 참여자 범위, 답변 충돌, 설치, 자연어 E2E까지 교정 범위를 정한다.
- 같은 제품 경로를 새 작업에서 다시 실행해 checkpoint를 닫는다.
- fixture 답변은 실제 판매자 발화가 아니라고 바로 붙인다.

### Ending / lasting signal

reviewer 수보다 구현자와 다른 source·입력·질문·write 권한·완료 권한을 보며, 판정 자체도 source와 재실행으로 회수한다고 닫는다. 닫힌 입력 밖을 자동으로 보지 못한 별도 판정 반례는 한 단락의 한계로만 둔다.

남겨야 할 신호:

> 초록 test를 버리지 않으면서 그 바깥의 source, 입력 타입, scope, 실제 E2E 경계를 다시 여는 개발자

### Public boundary

- 9와 15를 품질·사용자 가치 향상 수치로 쓰지 않는다.
- `15개 E2E`, `독립 test`라고 부르지 않는다.
- `"false"`는 `bool("false")` 변환 오류가 아니라 type check 부재로 `is False` 분기를 비껴간 문제다.
- 회귀 판별을 ZIP-only clean-room 재현이라고 쓰지 않는다.

## 3. Product-flow scope control

### Article type

`product-architecture`.

### Opening contract

숙소 자료에서 체크인 시각을 답하고 근거 원문을 보여 주는 첫 slice에서 시작한다.

- AI는 `질문 → 검색 → raw facts[] → 화면`을 더 작은 안으로 제안했다.
- 저자는 화면에 도달했어도 사용자가 검색 후보를 다시 해석해야 한다면 제품이 맡을 변환이 빠졌다고 보고 그 경로를 product proof로 세우지 않았다.

### Stakes

중간 검색 결과가 답 자리를 차지하면, 사용자가 어느 구절이 답인지, 근거가 충분한지, 값이 없는데 만들어진 것은 아닌지 다시 판단해야 한다.

### Primary artifact

`15:00 / 16:00 / missing`의 값·근거·상태·다음 행동 표를 쓴다.

- 앞의 두 행은 source 시각이 바뀌면 answer도 바뀌는 실제 metamorphic test다.
- `missing`은 같은 test의 세 번째 arm이 아니라 별도 상태 계약과 behavior를 합친 공개 설명이다.

### Author action and implementation

- 저자는 slice 기준을 파일·화면 수에서 `source → answer → evidence/state → actual route → next action`의 인과로 바꿨다.
- retrieval 결과와 사용자 답변의 책임을 나눴다.
- source 변화, 실제 evidence, route 소비자를 보는 제품행동 test를 남겼다.
- 호출자 없는 fact path를 제거했다.

### Ending / lasting signal

raw 결과는 retrieval debugger에는 정확할 수 있지만 product proof에는 불완전하다는 역할 차이로 닫는다. UI 유무가 아니라 실제 소비자가 받는 contract가 slice의 끝을 정한다.

남겨야 할 신호:

> scope 압력 아래에서도 사용자가 받는 가치 흐름과 source-to-action 인과를 지키는 product-minded architect

### Public boundary

- raw path와 deterministic adapter는 구현 전 제안이지 배포 실패가 아니다.
- 세 test가 의미 품질이나 실제 사용자 가치 전체를 증명했다고 쓰지 않는다.
- AI가 의도적으로 쉬운 일을 골랐다고 단정하지 않는다.

## 4. Judgment order

### Article type

`learning-experiment`.

### Opening contract

여행 상품 결제 전 판단을 돕는 제품 후보를 고르던 실제 output 비교에서 시작한다.

- 문제 후보 3개를 바로 고르지 않고 각 문제에서 solution 3개씩 총 9개를 만든다.
- 세 결합 방향을 같은 Markdown output과 정적 대화 목업으로 만들고, 후보마다 초기·사용자 수정·가정 답변 뒤 상태를 비교한다.
- 문제 이름이 아니라 사용자가 바꿀 수 있는 것, 판단이 멈추는 조건, 답변 뒤 보존되는 상태를 본 뒤 마지막에 한 방향을 선택한다.

### Stakes

근거가 잘 보이고 구현하기 쉬운 문제를 먼저 고르면, 다른 후보가 만들 수 있는 더 큰 행동 변화와 새 통제력을 output으로 보기 전에 제거할 수 있다. AI의 지적 노력도 가치 생성보다 탈락 이유 작성에 먼저 쓰인다.

### Primary artifact

세 output의 `처음 보이는 판단 / 사용자가 바꿀 수 있는 것 / 답변 뒤 보존되는 상태` 비교표를 중심 artifact로 둔다. `3 problems → 9 solutions → 3 outputs → 총 9 snapshot → 선택`은 읽는 trace로 보조한다.

### Claim strictness

발산 중에도 `확인됨 / 불충분 / 모름 / 확인 필요`로 개별 주장을 엄격히 관리한다. 엄격함을 늦춘 것이 아니라 엄격함이 겨누는 대상과 후보 전체를 닫는 권한을 나눴다는 데 중심을 둔다.

### Mirror

마지막에 현재 블로그 글감 조사에서 작업 cursor를 가치 순위로, 주장 상한을 후보 감점으로 읽은 같은 오류를 짧게 비춘다. 글을 meta 장면으로 시작하지 않는다.

### Ending / lasting signal

더 좋은 결과를 증명했다고 닫지 않는다. 수렴 전에 비교 가능한 사용자 결과와 상태 차이를 얻었다고 닫고, 좋은 기준이 지금 무엇을 판정하고 무엇을 끝낼 권한이 있는지 묻는다.

남겨야 할 신호:

> 성급한 수렴을 막고 실제 user outcome을 비교한 뒤 선택하는 개발자

### Public boundary

- `3 → 9 → 3`은 품질 향상 수치가 아니다.
- 세 output은 Markdown과 정적 목업이지 실제 plugin이나 사용자 가치 검증이 아니다.
- 공개 원고에는 총 9개 snapshot만 쓴다. 단위가 섞인 `8회 전환`은 부활시키지 않는다.
- second pass를 완전 blind 실험이나 기존 차이의 최초 발견으로 쓰지 않는다.

## 5. AI self-check

### Article type

`retrospective`, 사건 전개에는 learning-experiment의 오독·재해석을 빌린다.

### Opening contract

여행 플랫폼의 해커톤 과제에서 아직 풀리지 않은 사용자 문제를 찾고, 어떤 문제를 두 번째로 깊게 조사할지 정하던 장면에서 시작한다.

- 20개의 공개 자료를 보고 있었다. 숫자는 조사 범위이지 품질 지표가 아니다.
- 회사 직접 자료는 회사가 중요하게 보는 방향을, 사용자·독립 자료는 현재 문제의 해결 상태와 반복 여부를 판단하도록 역할을 나눴다.
- 회사 자료에 높은 가중치를 둔 것이 편향인지 별도 점검했고, 목적에 맞는 가중치라는 유효한 판정을 받았다.
- AI가 이를 적용하며 `회사 방향 먼저 → 주변 미해결 마찰 나중 확인`으로 바꿔, 사용자 문제를 독립적으로 산출하던 경로를 지웠다.

stakes는 회사 방향을 현재 사용자 문제로 오인하거나, 이미 해결된 문제를 다시 고르는 데 둔다.

### Author action

- 저자는 직전 결론을 반대로 고치게 하지 않고 앞선 종합과 더 넓은 대화를 다시 읽게 했다.
- 두 번째 점검 뒤 회사 자료와 사용자·독립 자료의 비중이 아니라 각각 어떤 주장을 끝낼 권한이 있는지 복구했다.
- self-check의 대상으로 직전 답뿐 아니라 문제 정의, 입력 범위, 추상화, 판단축, 다음 행동을 올렸다.

### Primary artifact

`함께 산출하되 증명 범위 분리 → 회사 방향 우선 과교정 → 두 경로와 접점 복구`의 세 상태 도식을 쓴다.

### Supporting scene

`더 근본적으로`를 `더 추상적으로` 읽은 assignment 장면은 한두 문단으로 보강한다. forward-bias 장면은 진단, 바로 다음 행동, 장기 재발이 서로 다른 결과라는 stress test로 짧게 둔다.

### Ending / lasting signal

self-check가 장기 재발을 막았다고 쓰지 않는다. AI의 오류 설명이 설득력 있는지와 다음 행동이 실제로 달라졌는지를 다른 결과로 보게 됐다고 닫는다.

보호할 문장:

- `결론은 달라졌지만 판단축은 그대로일 수 있었다.`
- `더 근본적으로를 더 추상적으로 읽었다.`
- `문제를 설명하는 것과 다음 행동이 달라지는 것은 같은 결과가 아니었다.`
- `AI의 설명과 행동을 같은 결과로 보지 않게 됐다.`

남겨야 할 신호:

> 각 source가 끝낼 수 있는 주장을 나누고, AI의 자기 교정도 실제 행동 변화까지 다시 감사하는 개발자

### Public boundary

- 회사명, 대회명, 내부 프로젝트명, agent 이름, session ID, raw 발화 원문을 쓰지 않는다.
- 첫 점검의 판정이 틀렸다고 쓰지 않는다. AI가 유효한 판정을 적용하며 앞선 종합 구조를 지운 것이 문제다.
- 복구를 self-check 단독 성과로 만들지 않는다.
- 보존되지 않은 중간 AI 답변이나 장기 재발 감소를 만들지 않는다.

## 글간 material 소유권

- `9 → 15`와 판별·회수: Independent review
- 현재 계약과 history의 권위, 제출 질문의 시간축: Current
- raw `facts[]`, source-to-answer test: Scope control
- `3 → 9 → 3` output 비교: Judgment order
- 회사 조사 과교정과 main 판단의 객관화: Self-check

같은 사건을 다른 글에서 언급하면 다른 질문을 맡기고, 같은 무게로 반복하지 않는다.

## v1 완료 gate

1. 제목을 가리고 첫 화면만 읽어도 문제·stakes·저자 행동이 복구되는가.
2. 비공개 명칭을 지운 뒤에도 서비스·기능·결정 맥락이 남는가.
3. primary artifact가 보기 전 몰랐던 차이를 보여 주는가.
4. 글을 다 읽고 저자를 어떤 개발자로 기억하는지 한 문장으로 말할 수 있는가.
5. 다섯 글의 opening, section 역할, ending이 서로 다른가.
