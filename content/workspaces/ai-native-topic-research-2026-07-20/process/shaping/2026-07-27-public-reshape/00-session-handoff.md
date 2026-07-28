---
작성일: 2026-07-27
갱신일: 2026-07-27
성격: AI-native 다섯 글 public reshape 상세 session handoff
공개상태: 내부 작업 문서
현재상태: 이전 cycle checkpoint 커밋 완료 / 새 공개용 원고 미작성
기준커밋: 72cbec4
---

# AI-native 다섯 글 public reshape — 상세 handoff

## Session bridge

- scope: project / docs / writing / research
- touched: `content/backlog/ai-native-topic-research-2026-07-20`, `content/drafts/ai-native-topic-research-2026-07-20`
- why-now: `near-final v3`가 사실과 내부 논리는 정교해졌지만 공개 블로그 글로는 진입성, 구체성, 저자성, 매력, 포트폴리오 신호가 부족하다는 사용자 판단이 나왔다.
- crossed-contexts: 초기 backlog와 사용자 sync, 여러 draft/review의 변화, 직접 source와 공개 경계, 기존 발행 글의 페이지 감각, 현재 editorial 기준
- new-understanding: 문제는 재료 부족이나 기준 부재보다, 상대적 개선과 내부 정합성을 공개 글의 절대 품질로 오판하고 익명화·압축·검증을 독자 진입성보다 앞세운 데 있었다.
- re-entry: 기존 v3는 근거가 풍부한 내부 snapshot으로 보존하고, 다섯 중심은 유지하되 공개 독자가 문제·stakes·저자 행동을 첫 화면에서 잡는 완결 원고로 구조 재작성한다.
- insight: promote

## 10초 복구

다음 session은 아래 다섯 문장부터 복구하면 된다.

1. 현재 기준점은 Git commit `72cbec4`다. 이 commit은 당시 `near-final`을 목표로 만든 v2·v3 다섯 편과 material/source ledger, shaping·texture·evidence·regression review, main 판정을 보존한다.
2. 사용자는 그 v3를 최종에 가까운 블로그 글로 인정하지 않았다. 특히 Self-check의 `한 회사의 문제를 조사하며` 같은 도입은 공개 독자에게 대상·stakes·저자 행동을 주지 못한다.
3. v3를 폐기하지도, 최신 버전이라는 이유로 권위 있게 따르지도 않는다. 사실 교정과 살아 있는 장면은 입력으로 사용하고, 구조와 목소리는 다시 판단한다.
4. 새 원고는 `content/drafts/ai-native-topic-research-2026-07-20/2026-07-27-public-reshape-v1/`에 다섯 편의 완결본으로 만든다. 현재 이 원고 폴더와 새 draft는 아직 없다.
5. 다음 작업은 문장 polish가 아니라 public reshape다. Current·Judgment order·Self-check는 구조 재작성, Independent review·Scope control은 비교적 가벼운 부분 재작성으로 본다.

## 이번 작업의 목표

다섯 후보의 중심을 또 바꾸거나 새로운 AI 협업 방법론을 만드는 것이 목표가 아니다.

목표는 이미 확인된 다섯 판단을 다음 조건을 만족하는 공개 기술 블로그 글로 만드는 것이다.

- 처음 보는 개발자가 내부 backlog 없이도 문제 상황에 들어갈 수 있다.
- 추상 개념보다 구체적인 작업, 이상한 결과, 걸려 있던 판단이 먼저 보인다.
- 저자가 무엇을 보고 멈췄고, 어떤 기준으로 선택하거나 되돌렸는지 읽힌다.
- code, test, 상태 변화, 비교 output 같은 artifact가 감사 증빙이 아니라 발견의 장치로 작동한다.
- 글을 다 읽은 뒤 “이 사람은 이런 문제를 이렇게 보는 개발자”라는 인상이 남는다.
- 비공개 source를 숨기면서도 사실의 기능적 맥락과 의미는 남는다.
- 글마다 다른 사건과 narrative engine이 살아 있고, 다섯 편이 같은 AI식 수사 구조로 평평해지지 않는다.

사용자는 낮은 해상도의 조각을 하나씩 승인하는 방식보다, 충분히 완결된 결과물을 보고 직관적으로 좋고 나쁨을 판단하는 방식을 선호한다. 다만 이해하지 못한 기준과 큰 결과물이 한꺼번에 쌓여 제어를 잃는 것도 원하지 않는다.

따라서 이번 절충은 다음과 같다.

```text
전체 자료 종합
→ 실제 충돌과 불확실성만 묶어 사용자와 질문
→ 충분히 완결된 다섯 public draft
→ 역할이 분리된 독립 review
→ main 판정
→ 사용자가 완결된 결과와 변경 이유를 함께 보고 다음 범위 결정
```

## 지금까지의 경위

### 1. 후보와 기준을 분리했다

AI와 함께 일하며 달라진 개발자의 판단과 통제 방식을 글감으로 조사했다. 기준 형성, 후보 재조사, 후보 상태 교정을 거쳐 현재 독립 후보는 여덟 개이고, 그중 다섯 개가 상위 후보로 남아 있다.

- Current와 history의 권위 분리
- 독립 판별의 판단 상태와 회수 구조
- 제품 흐름을 보존하는 scope control
- 생성·주장 판정·후보 수렴의 판단 순서
- AI self-check의 효용과 행동 변화

후보 목록 안에는 순위가 없다. 상위 후보라는 상태도 점수 합산 결과가 아니라 현재 shaping 행동을 뜻한다.

### 2. 초기 v1~v3와 독립 review를 만들었다

다섯 후보를 모두 산문으로 만들어 실제 글이 되는지 보려고 했다. v1과 v2 뒤 독립 review를 받고, main이 채택·조정·기각·보류를 나눠 v2와 v3에 반영했다.

이 과정은 actor, 수치, 구현 여부, 인과, 주장 상한을 더 정확하게 만들었다. 그러나 reviewer 제안과 main의 임시 편집 선택이 사용자 합의처럼 굳으면서 일부 글의 중심이 달라졌다.

### 3. 사용자가 전체 sync를 다시 요구했다

사용자의 우려는 두 극단 모두였다.

- 모든 애매한 자료를 초안 전에 닫으면 종합 판단이 사라진다.
- 반대로 “전체를 다 보라”고 하면 입력이 너무 커져 무엇을 어떤 성격으로 봐야 하는지 흐려진다.
- 큰 결과물을 적당히 이해하고 통과하면 제어가 사라진다.
- 작은 조각을 하나씩 이해하고 승인하면 비용이 너무 크고 좋은 완성본을 본 뒤 이해하는 효율도 잃는다.

그래서 전체 자료를 먼저 종합하고, 실제로 애매하거나 결과를 바꿀 부분만 질문하며, 완결된 draft를 판단하는 방식으로 맞췄다.

특히 `fresh pass`가 새로 보는 장치가 아니라 기존 backlog와 사용자 합의를 입력에서 밀어내는 방식으로 쓰여 자료가 새고 중심이 무너졌다는 점을 확인했다.

### 4. post-v3 사용자 sync에서 다섯 중심을 다시 맞췄다

가장 중요한 복구 문서는 다음이다.

`../2026-07-27-v1-v3-draft-loop/05-post-v3-reassessment-and-user-sync.md`

이 문서는 다음을 확인했다.

- 실패와 한계는 근거지만 글의 첫 가치가 아니다. 사건 뒤 새로 얻은 판단과 통제력을 먼저 본다.
- backlog는 보존물만이 아니라 새 draft의 실제 입력이다.
- 질문은 글 방향뿐 아니라 사실, 자료 의미, 현재 권위, 해석 충돌을 맞추기 위해 사용한다.
- 질문은 모든 재료를 미리 닫거나 사용자가 매 단계를 승인하게 만드는 formal interview가 아니다.
- Material → Shaping → Texture는 한 draft 안의 책임이며 draft 버전명이 아니다.
- 독립 reviewer의 결과와 main의 반영 선택은 사용자 합의로 자동 승격하지 않는다.

### 5. post-sync v1을 만들었지만 사용자에게 매력이 없었다

post-sync v1은 중심을 회수했지만 운영 언어와 추상적 설명이 앞섰다. 사용자는 기준과 낮은 해상도의 draft를 다시 읽고 무엇이 좋은지 역추적하는 반복보다, 거의 최종본에 가까운 글을 먼저 보고 판단하고 싶다고 했다.

### 6. near-final v2·v3 cycle을 진행했다

직접 source, backlog, 이전 draft와 review를 다시 입력으로 넣어 v2를 전면 재작성했다. shaping, texture, evidence reviewer를 분리하고 main 판정 뒤 v3를 만들었다. regression review, 링크, 공개 경계, prepublish, production renderer 검증도 통과했다.

당시 main은 v3를 “거의 최종본”이라고 판단했다.

### 7. 사용자가 실제 블로그 글로 읽고 다시 문제를 제기했다

사용자는 글이 여전히 매력 없고 풍부하지 않다고 판단했다. 특히 Self-check가 아무 설명 없이 `한 회사의 문제를 조사하며`로 시작하는 것이 블로그 글로 말이 되느냐고 물었다. 사용자가 지적한 문장만 고치지 말고, 최종 제출과 원래 기준에서 정말 어필하려면 무엇이 더 필요한지 스스로 찾으라고 요청했다.

공개 글만 놓고 다시 본 결과, main의 `near-final` 판정은 틀렸다고 결론 내렸다.

### 8. 이전 cycle을 checkpoint로 커밋했다

기준 commit:

`72cbec4 draft: AI-native 공개 초안 v2·v3와 검토 기록 보존`

기존 폴더명의 `near-final`은 사후에 고치지 않았다. 그 이름까지 바꾸면 당시 어떤 목표와 판단으로 작업했고 어디서 오판했는지 추적하기 어려워지기 때문이다. 대신 현재 active cursor에서 더 이상 near-final이라고 취급하지 않는다.

## 사용자의 작업 방식과 해석할 때의 주의

### 적당히 큰 결과물을 선호한다

사용자는 작은 오프닝 조각이나 섹션을 하나씩 승인한 뒤 글을 조립하고 싶은 것이 아니다. 글의 중심, 장면, 흐름, 목소리가 함께 작동하는 충분히 온전한 결과를 보고 직관적으로 판단하고 싶어 한다.

따라서 다음 session은 다섯 오프닝 후보만 던지고 승인을 기다리는 방식으로 돌아가지 않는다. 필요한 질문을 먼저 묶은 뒤 완결된 draft를 만든다.

### 그렇다고 큰 결과물을 불투명하게 만들지 않는다

완성본을 먼저 본다는 이유로 main이 혼자 기준을 수렴하거나 사용자 합의를 추정하지 않는다. 전체 자료를 대조해 다음을 함께 제시하며 질문한다.

- 어떤 source끼리 충돌했는가
- 무엇은 직접 확인됐는가
- main의 잠정 해석은 무엇인가
- 사용자 답에 따라 글의 어떤 부분이 달라지는가

질문 수를 늘리는 것이 목표가 아니다. 답이 없어도 안전하게 판단할 수 있는 것은 source로 판단하고, 사실·의미·권위가 실제 글을 바꾸는 지점만 묻는다.

### “인터뷰”는 별도 대단한 단계가 아니다

사용자가 인터뷰를 원한 이유는 AI가 근거 없이 작업을 미루거나, 사용자의 생각과 context를 오해한 채 다음 단계로 가는 것을 잡기 위해서였다. 모든 장면을 질문으로 닫거나 formal questionnaire를 만들라는 뜻이 아니다.

### backlog를 실제 입력으로 사용한다

최신 draft만 읽고 새로 쓰지 않는다. backlog와 1차 shaping에는 이후 압축 과정에서 사라진 장면, 사용자의 문제의식, 가능한 spine이 있다. v2·v3에는 actor·수치·구현 여부·주장 상한의 유효한 교정이 있다.

둘 중 하나를 고르는 것이 아니라 역할에 맞게 함께 본다.

### 독립 review를 정답 생성기로 쓰지 않는다

reviewer에게 main이 예상한 문제, 원하는 결론, 채택해야 할 기준을 정답처럼 주지 않는다.

- material/shaping reviewer는 해당 backlog, 필요한 source, draft를 직접 보고 무엇이 글을 살릴지 판단할 수 있다.
- cold reader는 공개 draft만 보고 무엇을 이해했는지 판단해야 한다.
- evidence reviewer는 source를 보고 사실·범위·공개 경계를 확인한다.
- reviewer 결과는 별도 상태로 보존한다.
- main은 active center, source, 실제 draft 효과를 기준으로 채택·조정·기각·보류한다.
- reviewer 제안이나 main의 채택이 사용자 합의가 되는 것은 아니다.

## 자료 권위와 읽는 순서

자료는 최신 버전보다 맡은 역할로 구분한다.

### 1. 현재 중심과 사용자 합의

- `../../../active-state/README.md`
- `../../../active-state/criteria.md`
- `../../../active-state/topic-candidates.md`
- `../2026-07-27-v1-v3-draft-loop/05-post-v3-reassessment-and-user-sync.md`

이 문서들이 다섯 후보의 현재 중심, 이미 닫힌 의미, 열린 편집 판단을 소유한다. 단, 이 handoff 작성과 함께 active cursor는 public reshape 준비 상태로 갱신된다.

### 2. 직접 source와 사실 교정

- `../2026-07-27-near-final-v2-v3/01a-current-and-independent-source-check.md`
- `../2026-07-27-near-final-v2-v3/01b-scope-and-judgment-source-check.md`
- `../2026-07-27-near-final-v2-v3/01c-self-check-source-check.md`
- 각 후보 카드에 연결된 직접 source, code, test, Git

actor, 시간순서, 수치 단위, 제안과 구현의 구분, 인과와 주장 상한이 충돌하면 직접 source를 우선한다.

`dev-hub`, 개인 project, ai-note 같은 외부 원천은 read-only다. 사용자가 요청하지 않는 한 수정하지 않는다.

### 3. 살아 있는 material과 구조 시도

- `../../candidates/`
- `../2026-07-23-first-pass/`
- 기존 `v1/`, `v2/`, `v3/`
- `2026-07-27-post-sync-v1/`
- `2026-07-27-near-final-v2/`
- `2026-07-27-near-final-v3/`

이들은 가능한 장면, 강한 문장, 실패한 구조, 유효한 사실 교정을 보여 주는 입력이다. 버전 번호만으로 현재 권위를 얻지 않는다.

### 4. review와 main 판정

- `../2026-07-27-post-sync-v1/03-independent-review.md`
- `../2026-07-27-post-sync-v1/04-main-adjudication.md`
- `../2026-07-27-near-final-v2-v3/03-independent-review.md`
- `../2026-07-27-near-final-v2-v3/03a-shaping-review.md`
- `../2026-07-27-near-final-v2-v3/03b-texture-review.md`
- `../2026-07-27-near-final-v2-v3/03c-evidence-review.md`
- `../2026-07-27-near-final-v2-v3/04-main-adjudication.md`
- `../2026-07-27-near-final-v2-v3/05a-v3-regression-review.md`

이 문서들은 판단 재료다. 당시 상대적 개선에는 유효했지만, 공개 글의 절대 품질을 보증하지 못했다.

## v3가 가진 것과 가지지 못한 것

### 유지할 가치가 있는 것

- 다섯 후보의 중심은 post-v3 사용자 sync와 대체로 맞아 있다.
- 직접 source로 actor, 시간순서, 수치, 제안과 구현 여부를 교정했다.
- 공개 가능한 표, code, trace, 상태 비교 후보가 있다.
- Independent review 글의 `"false"` bug, 9개와 15개 test method의 범위, source 대조와 설치형 자연어 E2E는 강한 기술 사건이다.
- Scope 글의 raw 검색 결과와 사용자 답변 경로 대비, `15:00 → 16:00`, 별도 `missing` 계약, grounding·routing test는 강한 제품 사건이다.
- Judgment order 글의 `3 problems → 9 solutions → 3 outputs → 상태 비교 → 선택`은 실제 output 차이를 보여 줄 수 있다.
- Current의 전체 지도, 단일 cursor, active contract, history, source authority와 update ownership은 실제 운용에서 나온 중심이다.
- Self-check의 유효한 교정이 증명 역할의 관계를 지워 반대 방향으로 과교정된 사건은 중심에 맞는다.

### 그대로 따르지 않을 것

- `near-final`이라는 완료 판정
- 첫 화면의 추상적·익명화된 진입 방식
- 내부 운영 용어를 독자가 먼저 학습해야 하는 구조
- 모든 caveat와 source 상한을 본문에서 반복 설명하는 방식
- `A가 아니라 B였다`를 다섯 글의 공통 산문 엔진처럼 반복하는 방식
- reviewer가 `PASS`했으므로 structure를 다시 열 필요가 없다는 판단
- renderer와 prepublish 통과를 공개 글의 매력·완성도 통과로 해석하는 판단

## 왜 이전 review가 문제를 통과시켰는가

이 실패 원인을 다음 session이 반드시 이해해야 한다.

### 상대 평가를 절대 평가로 잘못 읽었다

review는 주로 v3가 v2보다 퇴행했는지, v2가 post-sync v1보다 풍부해졌는지를 봤다. 장면이 늘고 사실이 정확해졌으므로 통과했지만, 처음 보는 독자가 이 글 자체를 읽고 싶어 하는지는 강한 탈락 조건이 아니었다.

### 중심을 다시 열지 않는 것과 구조를 다시 짜지 않는 것을 섞었다

`다섯 중심을 다시 열지 않는다`는 판정을 `큰 구조 변경이 필요하지 않다`로 확장했다. 중심 판단을 유지하면서 공개 독자의 진입 순서는 전면 재구성할 수 있었다.

### 공개 경계를 누출 여부로만 봤다

내부 이름과 경로를 지우는 데는 성공했지만, 익명화 뒤에도 의미가 남는지는 충분히 보지 않았다. `한 회사`, `한 프로젝트`, `다른 작업`은 안전한 일반화가 아니라 기능적 맥락 삭제가 될 수 있다.

### reviewer가 내부 context를 이미 알고 있었다

shaping과 texture reviewer는 backlog와 중심을 알고 글을 읽었다. 낯선 독자가 공개 draft만 보고 무엇을 이해하는지 확인하는 pass가 없었다.

### portfolio signal이 실제 탈락 권한을 갖지 못했다

기준에는 이미 첫 장면, 개발자 문제 정의, 판단 변화, 포트폴리오 신호가 있었다. 그러나 최종 판정에서 “이 글을 읽고 어떤 개발자로 기억하는가”가 실패하면 구조를 되돌리는 gate로 작동하지 않았다.

### 기술 검증과 글 품질을 혼동했다

prepublish, 공개 경계, 링크, renderer 통과는 파일과 사실 범위가 안전하다는 뜻이다. 읽고 싶은 글이고 기억에 남는 글이라는 뜻이 아니다.

## 최신 공개 글 audit에서 찾은 공통 문제

### 1. 저자가 글에서 사라졌다

Self-check와 일부 글에서 실제 저자의 행동을 `사용자`라고 부르거나 수동태로 숨겼다.

- 저자인 myeongyeon: 필요한 곳에서 `나`, `저`, `제가`
- 제품을 사용하는 사람: `사용자`
- AI: `AI가 제안했다`, `판별자가 찾았다`처럼 역할과 행동으로 식별

1인칭을 많이 넣으라는 뜻이 아니다. “내가 무엇을 느꼈다”보다 “내가 무엇을 봤고, 멈췄고, 선택했고, 틀렸는가”를 남긴다.

### 2. 익명화가 무맥락화가 됐다

비공개 이름을 지워도 다음은 남겨야 한다.

- 서비스나 기능의 영역
- 그때 하던 작업
- 결정해야 했던 것
- 잘못 판단했을 때 사라지는 가치나 생기는 결과
- 판단을 바꾼 artifact

private 이름을 공개하지 않는 것과 독자가 아무것도 상상할 수 없게 만드는 것은 다르다.

### 3. 내부 operator 언어가 독자 욕구보다 먼저 나왔다

다음 표현은 내부 작업에서는 정확할 수 있지만 첫 화면에 쌓이면 독자가 개념부터 배워야 한다.

- current
- active contract
- source authority
- checkpoint
- main
- shaping
- claim ceiling
- update ownership
- 판단 위치
- 판별 결과 회수

글마다 중심을 설명하는 핵심 개념 한두 개만 남기고 나머지는 실제 행동과 결과로 번역한다.

### 4. stakes와 consequence가 늦다

독자는 taxonomy보다 먼저 무엇이 잘못될 수 있었는지 알아야 한다.

- 틀린 상태를 통과시키는가
- 사용자가 검색 결과를 직접 해석해야 하는가
- 프로젝트 전체 질문이 최신 구현 하나로 축소되는가
- 가치 있는 후보가 solution을 보기 전에 탈락하는가
- AI의 반성은 바뀌지만 다음 행동은 그대로인가

### 5. 저자의 agency가 수동태에 숨었다

`더 작은 구현안이 제안됐다`, `사용자가 정정했다`, `구조가 복구됐다`만으로는 개발자로서의 판단이 남지 않는다.

누가 어떤 근거로 무엇을 멈추거나 선택했는지 확인 가능한 범위에서 명시한다.

### 6. artifact가 발견보다 감사 증빙처럼 놓였다

표, code, trace를 보여 주기 전에 독자가 무엇을 판별해야 하는지 알아야 한다.

각 artifact는 다음 질문에 답해야 한다.

> 이것을 보기 전에는 무엇을 몰랐고, 보고 나서 어떤 판단이 달라지는가?

답이 없으면 자료를 줄이거나 위치를 바꾼다.

### 7. caveat가 글의 확신을 분산시켰다

한계는 해당 주장 바로 옆에 붙이거나 한 구역에 모은다. 확인된 변화까지 계속 낮추지 않는다. 주장 상한은 정확성을 지키는 장치이지 모든 문장을 방어적으로 만드는 문체가 아니다.

### 8. 다섯 글의 수사와 섹션 기능이 비슷하다

`처음에는 A처럼 보였다 → 하지만 B였다 → 그래서 C로 나눴다 → 중요한 것은 A가 아니라 B였다`가 여러 절과 글에서 반복된다.

각 글에서 가장 강한 대비 하나만 남기고, 다른 절은 scene, evidence, mechanism, decision, consequence, carry-forward처럼 다른 역할을 맡긴다.

### 9. Self-check는 사례가 많아 중심 장면이 흐려진다

회사 조사 과교정, assignment 분류, forward-bias까지 모두 길게 다루면서 재료 모음처럼 보인다. 회사 조사 과교정을 주 장면으로 두고, 다른 사례는 같은 mechanism을 검증하거나 한계를 보여 줄 만큼만 사용한다.

### 10. 풍부함을 completeness와 분량으로 오해했다

공개 글의 풍부함은 모든 판단과 단서를 남기는 데서 생기지 않는다.

- 구체적인 긴장
- 실제로 갈린 선택
- 저자의 판단
- 그 판단이 바꾼 행동
- 독자가 눈으로 확인할 결과

주요 장면 하나, 필요한 대비 하나, 한계 하나가 모든 process를 압축해 넣는 것보다 풍부할 수 있다.

## 이번 cycle의 공개 독자 gate

새로운 editorial 단계나 lens를 만들지 않는다. 아래는 기존 Reader Flow, Developer, Portfolio Signal, Source Policy를 이번 다섯 글에서 실제로 집행하기 위한 로컬 질문이다.

### 첫 화면 gate

제목을 가리고 첫 3~5문단만 읽은 낯선 독자가 다음을 답할 수 있어야 한다.

1. 무엇을 만들거나 결정하고 있었는가?
2. 무엇이 이상하거나 위험했는가?
3. 왜 중요한가?
4. 글쓴이는 무엇을 했는가?
5. 이 글을 계속 읽으면 무엇을 알게 되는가?

하나라도 복구되지 않으면 문장 polish가 아니라 structure reshape 대상으로 본다.

### public-safe specificity

고유명사를 지운 뒤에도 영역, 작업, 판단, 결과, artifact가 남아야 한다. `한 회사`, `한 프로젝트`, `다른 작업`으로 시작한 뒤 다음 절까지 기능적 맥락이 나오지 않으면 실패다.

### actor와 agency

- 저자와 제품 사용자를 같은 `사용자`로 부르지 않는다.
- AI 역할은 행동으로 식별한다.
- 수동태가 실제 판단 주체를 숨기지 않는지 본다.

### stakes before mechanism

상태 taxonomy, 판단 단계, source 권위를 설명하기 전에 틀리면 어떤 결정·제품 상태·사용자 행동이 생기는지 보여 준다.

### title-opening contract

제목이 약속한 긴장이 첫 화면의 실제 장면, 출력, 모순으로 나타나야 한다.

### thought-to-action bridge

중요한 통찰은 test, 구조, 입력 범위, 비교 방식, 다음 행동 가운데 하나의 실제 변화로 이어져야 한다.

### one primary artifact

글마다 중심 차이를 가장 잘 보이게 하는 artifact 하나를 먼저 고른다. 자료가 많다는 이유로 모두 본문에 넣지 않는다.

### lasting portfolio signal

글을 읽은 개발자가 저자를 한 문장으로 기억할 수 있어야 한다.

`복잡한 AI 작업 절차를 운영하는 사람`만 남으면 실패다.

### section progress

각 절은 이전 절의 질문이나 판단을 바꿔야 한다. 같은 개념을 더 정교하게 나누거나 caveat를 추가하는 절이 반복되면 합치거나 역할을 바꾼다.

### selective completeness

main scene, 필요한 contrast, 한계 하나를 기본으로 한다. backlog의 completeness와 공개 글의 completeness는 다르다.

## 글별 현재 중심, 공개 문제, reshape 방향

### 1. Current / active-state operation

현재 판정: **구조 재작성**

유지할 중심:

- Current는 실패한 장치가 아니라 전반적으로 도움이 됐고 지금도 active-state 운영을 계속 사용한다.
- 긴 AI 작업에서 과거 이유를 보존하는 상태와 지금 행동을 제어하는 상태는 같은 수명과 갱신 권한을 가질 수 없다.
- 전체 지도, 단일 cursor, active contract, history, 직접 source를 역할에 맞게 나누며 새 통제력을 얻었다.
- 최근성 편향과 terminal event 누락은 효용을 뒤집는 중심이 아니라 남은 한계다.

v3의 문제:

- `한 구현 loop`라는 generic 장면으로 시작한다.
- 독자가 서비스·기능·결정 stakes를 알기 전에 상태 역할과 용어가 나온다.
- “문서를 잘 분류한 사람”이라는 인상은 남지만, 긴 작업의 권위와 갱신 책임을 설계한 개발자라는 신호가 약하다.

reshape 방향:

- active contract와 과정 기록이 충돌해 실제 완료 조건을 잘못 따를 수 있었던 구체적 작업 장면에서 시작한다.
- 어떤 기능을 닫는 중이었고, 어떤 계약이 stale하면 무엇이 잘못되는지 public-safe하게 복구한다.
- 권위 이동 표는 유지할 수 있지만, 먼저 왜 이 차이가 필요했는지 보여 준다.
- 설문 최근성 장면은 두 번째 stress test로 내린다.
- 결말은 current를 만능 요약으로 만들지 않고 state lifetime, authority, update ownership으로 닫는다.

남아야 할 개발자 신호:

> 긴 AI 작업에서 상태의 권위, 수명, 갱신 책임을 설계하는 개발자

### 2. 독립 판별 / 제3판별자

현재 판정: **부분 재작성 — 다섯 편 중 공개 글에 가장 가까움**

유지할 중심:

- 독립성은 AI 수가 아니라 구현자와 다른 source, 입력, 질문, write 권한, 완료 선언 권한에서 생긴다.
- 판별 결과는 기존 완료 설명에 합쳐지기 전 별도 판단 상태로 남고, source 대조와 재실행으로 회수한다.

강한 장면:

- 여행 상품 조건을 판별하는 plugin
- Python `unittest` test method 9개 통과
- 문자열 `"false"`가 boolean 계약을 비껴간 bug
- 공개 source와 fixture의 모순
- 교정 뒤 같은 runner의 test method 15개
- 숫자 밖의 별도 validator·CLI·설치형 자연어 E2E

v3의 문제:

- 후반의 recovery governance와 독립성 설명이 반복된다.
- 다른 답변 시스템의 반례가 중심 technical case를 약간 분산시킨다.
- 저자의 선택과 판정 기준보다 시스템 설명이 앞서는 구간이 있다.

reshape 방향:

- 첫 checkpoint와 `"false"` bug를 중심으로 유지한다.
- 왜 green test가 거짓말한 것이 아니라 세계가 닫혀 있었는지 보여 준다.
- 판별자가 연 다른 검증 세계, main의 교정·재실행, 남은 한계를 한 흐름으로 묶는다.
- read-only reviewer의 역할은 한 번만 정의한다.
- 다른 판별 반례는 입력 경계가 별도 문제라는 짧은 한계로 줄인다.

남아야 할 개발자 신호:

> 초록 test 바깥의 source·입력 타입·scope·E2E 경계를 다시 여는 개발자

보존할 사실 단위:

- 9와 15는 같은 Python runner의 test method 수다.
- validator, CLI, source 대조, 설치형 자연어 E2E는 그 숫자에 포함되지 않는다.
- fixture 답변은 실제 판매자 발화가 아니다.
- 9→15를 제품 품질이나 사용자 가치 상승 수치로 쓰지 않는다.

### 3. 제품 흐름을 보존하는 scope control

현재 판정: **부분 재작성**

유지할 중심:

- `작게`, `안전하게`, `빨리 보이게`라는 압력 아래 불확실하지만 가치가 생기는 중심 변환보다 완료로 세기 쉬운 중간 결과가 선택될 수 있다.
- 범위를 줄일 때 폭은 줄여도 실제 소비자가 받는 핵심 변환과 다음 행동은 끝까지 남겨야 한다.
- `vertical slice`는 이 생각을 설명하는 한 구현 원칙이지 글의 본질 전체가 아니다.
- `AI 회피성`은 내부 감각이며 AI의 의도나 보편적 성격으로 단정하지 않는다.

강한 장면:

- 숙소 자료에서 체크인 시각을 답하고 근거 원문을 보여 주는 기능
- raw `facts[]` 검색 결과를 화면에 바로 붙이는 더 작은 안
- 사용자 답·근거·상태까지 만드는 실제 경로
- source의 `15:00 → 16:00` 변경에 답도 바뀌는 test
- 근거가 없으면 값을 만들지 않는 별도 `missing` 계약
- grounding, routing test와 미사용 path 제거

v3의 문제:

- 첫 화면과 title은 비교적 작동하지만 `제안됐다`라는 수동태가 저자의 판단을 숨긴다.
- 같은 결론을 여러 방식으로 반복한다.
- deterministic baseline이 필요한 반례 이상으로 길다.
- artifact 뒤에 다시 개념을 설명하는 구간이 있다.

reshape 방향:

- AI가 raw 결과 경로를 제안했고, 저자가 실제 사용자가 소비하는 변환을 기준으로 거부·수정한 agency를 드러낸다.
- 두 경로와 한 값의 state trace를 중심 artifact로 둔다.
- test는 제품 가치 전체를 증명하는 것이 아니라 source→answer→evidence→actual route의 인과를 지킨 범위로 쓴다.
- deterministic baseline은 반대 경계를 보여 주는 짧은 문단으로 줄인다.

남아야 할 개발자 신호:

> scope 압력 아래에서도 사용자가 받는 가치 흐름과 인과를 지키는 product-minded architect

### 4. 생성·주장 판정·후보 수렴의 판단 순서

현재 판정: **구조 재작성**

유지할 중심:

- 좋은 기준도 가능한 가치와 결과를 만들기 전에 후보 전체를 닫을 권한을 가지면 AI의 노력을 탈락 이유 정교화에 먼저 쓸 수 있다.
- 발산은 느슨함이 아니다.
- 후보와 가능한 가치·성과·새 통제력을 먼저 펼친다.
- 그동안 개별 사실, 모름, 위험, 주장 상한은 엄격히 본다.
- 후보 전체의 선택·보류·종료는 충분히 본 뒤 결정한다.

v3의 문제:

- 현재 블로그 글감 조사라는 meta 장면으로 시작해 공개 독자가 바로 들어가기 어렵다.
- 강한 product discovery 사건인 `3 problems → 9 solutions → 3 outputs → 상태 비교 → 선택`이 뒤에 나온다.
- 판단 단계 설명과 caveat가 실제 output의 차이보다 앞선다.
- title은 AI의 동기처럼 읽힐 수 있으므로 구조를 다시 잡은 뒤 검토해야 한다.

reshape 방향:

- 제품 후보 세 개를 일찍 고르지 않고 아홉 solution과 세 output을 같은 해상도로 만든 장면을 opening으로 올린다.
- 세 output에서 사용자가 바꿀 수 있는 것, 판단이 멈추는 조건, 답변 뒤 보존되는 상태가 어떻게 달랐는지 보여 준다.
- 현재 블로그 cursor 오독은 마지막에 같은 판단 문제가 재현된 mirror로 사용한다.
- `확인됨 / 불충분 / 모름 / 확인 필요`는 발산 중에도 claim strictness가 유지됐다는 보강으로 둔다.
- 일반적인 “브레인스토밍은 넓게”가 아니라, 기준이 무엇을 판정하고 무엇을 닫을 권한을 갖는지로 닫는다.

남아야 할 개발자 신호:

> 성급한 수렴을 막고 실제 user outcome을 비교한 뒤 선택하는 개발자

보존할 사실 단위:

- `3 → 9 → 3`은 후보 품질 향상 수치가 아니다.
- 정적 목업은 실제 plugin이나 사용자 가치 검증이 아니다.
- 공개 원고에는 총 9개 snapshot만 사용한다.
- 과거 `8회 전환`은 화면 순회와 내부 상태 변화 단위를 혼동할 수 있어 v3에서 제거했다. 다시 부활시키지 않는다.
- `Output-informed problem selection`의 자료 소유권은 아직 열려 있다.

### 5. AI self-check

현재 판정: **구조 재작성 — 가장 큰 public gap**

유지할 중심:

- Self-check는 답을 다시 설명하거나 반대 결론을 내는 일이 아니다.
- AI 자신의 문제 정의, 전제, 입력 범위, 추상화, scope, 도구 선택, 판단축과 다음 행동을 검사 대상으로 옮기는 일이다.
- 유효한 교정을 적용하고도 같은 축의 반대편으로 과교정할 수 있다.
- AI의 객관화와 별도 판단 위치는 독립 판별 글과 연결되지만 같은 글은 아니다.

주 장면:

- 회사 직접 자료는 회사가 중요하게 보는 방향을, 사용자·독립 자료는 현재 문제의 해결 상태와 반복 여부를 보도록 함께 두되 증명 범위를 나눴다.
- “회사 직접 자료의 가중치가 높아도 된다”는 유효한 점검을 적용하는 과정에서 AI가 `회사 방향 우선 → 주변 마찰 나중 확인`으로 과교정했다.
- 결론은 달라졌지만 어떤 자료가 어떤 주장을 끝낼 권한을 갖는지의 판단축은 그대로였다.
- 더 넓은 원문과 두 번째 점검, 사용자 정정, main 재적용으로 역할 관계를 복구했다.

v3의 문제:

- `한 회사의 문제를 조사하며`는 service, task, decision, stakes를 모두 지운다.
- 저자인 사용자를 `사용자`라고 부르고 AI를 `작업을 조율한 AI`로 두어 화자와 agency가 흐리다.
- 회사 조사, assignment, forward-bias 세 사례가 모두 길어 중심이 분산된다.
- 독자가 AI 객관화의 문제를 잡기 전에 epistemic 관계 설명을 해독해야 한다.

reshape 방향:

- 회사명은 숨기되 어떤 서비스·제품 후보를 조사했고 무엇을 정하려 했는지 public-safe하게 구체화한다. source만으로 안전한 표현을 정할 수 없으면 사용자에게 한 번에 질문한다.
- 과교정으로 실제로 무엇이 조사 범위에서 사라졌는지 첫 화면에서 보여 준다.
- 저자의 행동은 `나/저`로, 제품 사용자는 `사용자`로 구분한다.
- 회사 조사 과교정을 main scene으로 둔다.
- assignment는 `더 근본적`을 `더 추상적`으로 읽은 보강 장면으로 짧게 쓸 수 있다.
- forward-bias는 설명과 다음 행동, 장기 재발이 다른 결과라는 stress test로 필요한 만큼만 남긴다.
- 독립 판별 글은 같은 frame을 반복할 때 바깥 판단 위치가 필요하다는 짧은 연결만 맡긴다.

보호할 문장과 감각:

- `결론은 달라졌지만 판단축은 그대로일 수 있었다.`
- `더 근본적으로`를 `더 추상적으로` 읽었다.
- 문제를 설명하는 것과 다음 행동이 달라지는 것은 같은 결과가 아니었다.
- AI의 설명과 행동을 같은 결과로 보지 않게 됐다.

남아야 할 개발자 신호:

> AI의 전제와 자기 교정을 다시 감사하고 실제 행동 변화까지 확인하는 개발자

## 글끼리의 material 소유권

현재 소유권은 반복을 줄이는 편집 경계이지 영구 금지 규칙이 아니다.

- AX 9→15 test와 판별·회수 계약: Independent review
- AX 조사 과교정과 main 판단의 객관화: Self-check
- AX 3→9→3 output 비교: Judgment order
- Current의 제출 설문 최근성 복구: Current
- Tripproof raw 결과 제안과 product behavior test: Scope
- 닫힌 입력 바깥을 못 본 별도 판정 실험: Independent review의 짧은 한계

같은 사건을 다른 글에서 언급하더라도 다른 질문을 맡아야 하며, 같은 무게로 반복하지 않는다.

## 다음 review 설계

새로운 단계나 영구 reviewer 유형을 하네스에 추가하지 않는다. 기존 agent와 lens를 역할에 맞게 분리한다.

### Material / Shaping

- backlog, active center, 관련 source, draft를 본다.
- main의 최신 공개 audit를 정답으로 주지 않는다.
- 묻는 것은 “이 글을 더 좋은 공개 글로 만들려면 어떤 장면·질문·대비·artifact·배열이 필요한가”다.
- 기존 backlog가 실제로 어떻게 쓰였고 무엇이 과하게 남거나 빠졌는지도 보고하게 한다.

### Cold reader

- 공개 draft만 준다.
- backlog, 기대 verdict, main의 문제 목록을 주지 않는다.
- 제목을 가린 첫 화면에서 복구한 문제, stakes, actor, 저자 행동을 보고하게 한다.
- 어디서 계속 읽고 싶었고 어디서 내부 보고서처럼 느껴졌는지 구체 문단 기준으로 받는다.

### Texture

- reshape가 장면과 agency를 살렸는지 본다.
- public-safe하게 만든다는 이유로 다시 generic해졌는지 본다.
- 살아 있는 문장, 발견, 글마다 다른 리듬을 보호한다.

### Portfolio signal

- 이 글을 읽고 어떤 개발자로 기억하는지 한 문장으로 답하게 한다.
- `복잡한 AI 프로세스를 운영한다`만 남으면 실패로 판정한다.
- 자기소개서 문체를 추가하라는 요청은 하지 않는다.

### Evidence / Source boundary

- 직접 source와 draft를 함께 본다.
- actor, 수치 단위, 시간순서, 제안과 구현, 사실·경험·해석·미확인을 확인한다.
- 익명화가 의미를 바꾸거나 source보다 구체적인 문장을 만들지 않았는지 본다.

### Main adjudication

- reviewer별 원문을 별도로 보존한다.
- 채택, 조정 채택, 기각, 보류를 나눈다.
- reviewer 공통 의견도 active center나 source와 충돌하면 자동 적용하지 않는다.
- 사용자 합의가 필요한 변화와 main이 source로 판단할 수 있는 변화를 나눈다.

## 파일 배치와 버전 규칙

### 보존할 이전 cycle

- process:
  - `../2026-07-27-near-final-v2-v3/`
- draft:
  - `content/drafts/ai-native-topic-research-2026-07-20/2026-07-27-near-final-v2/`
  - `content/drafts/ai-native-topic-research-2026-07-20/2026-07-27-near-final-v3/`

이 파일들은 수정하거나 이름을 바꾸지 않는다.

### 새 process

현재 폴더:

`content/backlog/ai-native-topic-research-2026-07-20/process/shaping/2026-07-27-public-reshape/`

예상 산출물:

1. `00-session-handoff.md` — 현재 문서
2. `01-public-audit-and-article-contracts.md` — 글별 scene, stakes, agency, artifact, public boundary, portfolio signal과 필요한 사용자 질문
3. `02-public-reshape-v1-build-record.md` — 완결된 다섯 v1의 source 선택, build/move/cut, 보호 문장
4. `03-independent-reviews.md`와 필요 시 reviewer별 원문
5. `04-main-adjudication.md`
6. 사용자 검토 뒤에만 다음 버전 기록

파일명은 다음 session이 실제 작업 범위에 맞춰 약간 조정할 수 있다. 중요한 것은 결과와 review와 main 판정을 한 파일에 합치지 않는 것이다.

### 새 draft

예정 위치:

`content/drafts/ai-native-topic-research-2026-07-20/2026-07-27-public-reshape-v1/`

예정 파일:

- `current-active-state-operation.md`
- `independent-review-and-recovery.md`
- `product-flow-scope-control.md`
- `judgment-order.md`
- `ai-self-check.md`
- `README.md`

새 cycle을 `v4`로 부르지 않는다. 기존 v3의 문장 개선이 아니라 완료 판정과 독자 진입 구조를 다시 여는 작업이기 때문이다.

다섯 글은 같은 version 안에서 충분히 완결된 깊이로 만든다. 내부 작성 순서는 작업 효율을 위한 cursor일 뿐 후보 가치나 발행 순위가 아니다.

## 다음 session의 읽기 순서

모든 과거 파일을 처음부터 정독할 필요는 없다. 다음 순서로 읽으면 된다.

1. repo `CLAUDE.md`
2. `.claude/skills/blog-write/SKILL.md`
3. 이 handoff 전체
4. `../../../active-state/README.md`
5. `../../../active-state/criteria.md`
6. `../../../active-state/topic-candidates.md`의 상위 후보 다섯 section
7. `../2026-07-27-v1-v3-draft-loop/05-post-v3-reassessment-and-user-sync.md`
8. `../2026-07-27-near-final-v2-v3/01-context-and-material-ledger.md`
9. `content/drafts/ai-native-topic-research-2026-07-20/2026-07-27-near-final-v3/`의 다섯 원고
10. `editorial/core/workflow.md`
11. `editorial/core/article-types.md`
12. `editorial/core/output-contracts.md`
13. `editorial/guards/source-policy.md`
14. `editorial/lenses/voice.md`
15. `editorial/lenses/developer.md`
16. `editorial/lenses/reader-flow.md`
17. `editorial/lenses/portfolio-signal.md`
18. `editorial/lenses/edit-patterns.md`

사실 충돌이나 public-safe specificity가 필요할 때만 `01a~01c source check`와 연결된 직접 source로 내려간다. 이전 reviewer가 왜 그렇게 판정했는지 필요할 때만 review 원문을 연다.

## 다음 session의 실제 행동 순서

사용자가 이 handoff를 들고 “진행해줘”라고 하면 다음 순서로 움직인다.

1. `git status`와 기준 commit `72cbec4`를 확인한다.
2. 이 handoff와 active-state가 충돌하면 최신 사용자 판단을 반영한 이 handoff 및 public reshape cursor를 우선하되, 후보 중심 자체는 active-state 상세 section을 따른다.
3. 다섯 글별로 public-safe scene, stakes, author action, primary artifact, lasting signal을 한 장에 종합한다.
4. source만으로 결정할 수 없는 사실·표현·공개 범위를 묶어 사용자에게 질문한다. 문장 조각 승인을 요구하지 않는다.
5. 사용자 답과 source를 반영해 `public-reshape-v1` 다섯 완결본을 만든다.
6. Material → Shaping → Texture를 각 완결본 안에서 수행하고 build record에 남긴다. 각 책임을 draft version으로 세지 않는다.
7. draft-only cold reader, material/shaping, texture, portfolio-signal, evidence 역할을 분리해 독립 review를 받는다.
8. main이 review를 판정하고 파일로 남긴다.
9. 다음 버전으로 자동 진행하지 않는다. 사용자가 다섯 완결본과 review·main 판정을 보고 수정 범위를 정한다.
10. 사용자가 발행 후보를 정하기 전에는 `content/posts/`로 옮기지 않는다.

## 다음 session이 사용자에게 물을 수 있는 핵심 질문

아래는 모두 자동 질문 목록이 아니다. source를 종합한 뒤 답이 실제 글을 바꿀 때만 묻는다.

### public-safe specificity

- Self-check의 회사 조사 장면에서 공개 가능한 서비스 영역, 조사 대상, 결정 목적을 어디까지 말할 수 있는가?
- Current의 첫 contract 충돌 장면에서 공개 가능한 기능과 stakes를 어디까지 구체화할 수 있는가?

private 이름을 묻는 것이 아니라, 이름 없이도 의미를 보존할 기능적 설명의 상한을 맞추는 질문이다.

### 화자와 목소리

- Self-check의 했다체와 1인칭을 유지할지
- 다른 네 기술 글의 합니다체에서 저자 agency를 어느 정도 직접 드러낼지

현재 기본값은 Self-check는 retrospective 성격을 유지하고, 다른 글은 합니다체 안에서 필요한 행동만 1인칭으로 드러내는 것이다.

### 열린 편집 판단

- `current.md`라는 공개 이름을 유지할지
- Judgment order가 `Output-informed problem selection` 재료를 계속 소유할지
- 첫 공개 글, 최종 제목, 발행 순서, 독립 글/연결 글/시리즈 관계

이 판단은 v1 작성 전 전부 닫을 필요가 없다. 완결된 글을 본 뒤 결정하는 항목이 많다.

## 하지 말아야 할 것

- 기존 `near-final-v3`를 직접 수정하거나 이름을 바꾸지 않는다.
- 새 작업을 단순 `v4 polish`로 취급하지 않는다.
- 최신 draft만 읽고 backlog를 보존물로 밀어내지 않는다.
- 반대로 오래된 backlog 문장을 현재 사실보다 높은 권위로 올리지 않는다.
- `fresh pass`라는 이름으로 기존 합의와 자료를 입력에서 가리지 않는다.
- 모든 애매한 자료를 초안 전에 pass/fail로 닫지 않는다.
- 사용자에게 모든 기준과 문단을 작은 조각으로 하나씩 승인하게 하지 않는다.
- 충분한 분석 없이 큰 원고를 만들고 “일단 읽어 보라”고 넘기지 않는다.
- reviewer에게 main이 기대한 문제와 결론을 정답으로 주지 않는다.
- reviewer 제안을 사용자 합의나 전역 editorial 기준으로 자동 승격하지 않는다.
- 이번 사례 하나를 근거로 새 workflow 단계, 새 lens, 새 permanent agent를 만들지 않는다.
- `editorial/`을 먼저 고치지 않는다. 현재 문제는 기준 부재보다 기존 기준을 최종 gate로 집행하지 못한 데 가깝다.
- `한 회사`, `한 프로젝트`, `다른 작업` 같은 placeholder로 private 이름만 지우고 의미까지 지우지 않는다.
- Current를 `current가 실패했다`는 글로 재중심화하지 않는다.
- Self-check를 forward-bias 한 사례만의 글로 좁히거나, 반대로 모든 self-check 사례를 다 넣지 않는다.
- Scope를 일반 vertical slice 튜토리얼로 만들지 않는다.
- Judgment order를 “브레인스토밍은 넓게 하라”는 일반론으로 줄이지 않는다.
- Independent review를 “AI를 한 명 더 부르면 된다”는 글로 만들지 않는다.
- 근거 상한을 후보 매력이나 사용자 효용의 감점으로 사용하지 않는다.
- prepublish와 renderer 통과를 글의 매력·완성도 통과로 해석하지 않는다.

## 성공 조건

public-reshape-v1이 성공하려면 사용자가 process 문서를 먼저 해독하지 않고도 다섯 글을 실제 블로그 글로 읽고 방향을 판단할 수 있어야 한다.

각 글은 최소한 다음을 만족해야 한다.

- 첫 화면에서 대상, 이상한 결과, stakes, 저자 행동이 복구된다.
- private 이름을 지운 뒤에도 서비스·기능·결정 맥락이 남는다.
- 중심 개념은 한두 개만 전면에 있고 나머지는 행동과 결과로 번역된다.
- 한 primary artifact가 판단 변화를 실제로 보이게 한다.
- artifact 뒤에 같은 결론을 산문으로 반복하지 않는다.
- 한계는 주장 가까이에 붙고 글 전체가 방어문처럼 보이지 않는다.
- 각 section이 질문이나 판단을 진전시킨다.
- 다섯 글의 오프닝, 전개, ending이 서로 다른 장면과 역할을 가진다.
- 글을 다 읽은 개발자가 저자를 어떤 개발자로 기억하는지 한 문장으로 말할 수 있다.
- 사실, actor, 수치, 인과, 공개 경계가 직접 source와 충돌하지 않는다.

가장 짧은 최종 gate는 다음 세 질문이다.

1. 제목을 가리고 첫 화면만 읽어도 문제·stakes·저자 행동이 복구되는가?
2. 비공개 명칭을 지운 뒤에도 구체적인가?
3. 글을 다 읽고 이 개발자를 한 문장으로 기억할 수 있는가?

이 세 질문에 답하지 못하면 문장 polish를 계속하지 않고 해당 글의 구조로 돌아간다.
