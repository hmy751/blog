---
작성일: 2026-07-28
성격: 경쟁 원인 가설 확장 material
상태: 수렴 전 / 채택 원인 없음
공개상태: 내부 작업 문서
---

# 경쟁 원인 가설

## 사용 방법

아래 가설은 서로 배타적인 선택지가 아니다. 한 장면에 여러 원인이 함께 작동했을 수 있고, 서로 모순되는 가설도 현재 단계에서는 보존한다.

각 가설에는 다음을 둔다.

- 가설: 무엇이 품질 정체를 만들었다고 보는가
- 지지 근거: 현재 자료에서 이 설명을 지지하는 장면
- 반대 근거 또는 대안 설명: 이 가설 하나로 닫으면 놓치는 점
- 확인 질문: 다음 판단에서 무엇을 확인해야 하는가
- 전이 가능성: 글쓰기 밖의 AI-native 작업에도 적용될 수 있는가

`근거 강도`는 사실의 확실성이 아니라 **현재 품질 실패의 원인으로서 얼마나 직접 지지되는지**를 뜻한다. 사용자 합의 상태가 아니다.

별도 보존 파일이 아니라 이 workspace를 만든 대화에만 있는 발언은 `[현재 대화 직접 근거]`로 표시한다.

## Material과 source에 관한 가설

### 가설 1 — 필요한 Material이 애초에 없었다

근거 강도: 약함

#### 가설

Current 글의 발생 이유, 사용자의 판단, Alex의 발상 계보가 material에 없었기 때문에 결과와 review에도 나올 수 없었다.

#### 지지 근거

- A/B 공통 source packet에는 current 최초 문제와 Alex scaffolding 영감이 없었다.
- 사용자는 A/B를 본 뒤 “지금 내가 기억난 건 Alex”라고 말했다. 이 표현은 일부 재료가 당시 명시적으로 보존되지 않았을 가능성을 남긴다.

#### 반대 근거 또는 대안 설명

- Current를 만든 일반적 동기와 사용자 효용은 후보 카드와 첫 shaping에 이미 있었다.
- assistant가 `Material을 건너뛰었다`고 진단하자 사용자는 이미 충분히 했다고 즉시 정정했다.
- 따라서 `모든 핵심 material이 없었다`는 설명은 현재 자료와 충돌한다.

#### 확인 질문

- Alex 영감과 Current의 최초 필요가 당시 어느 파일·대화에 실제로 남아 있었는가?
- 남아 있지 않았다면 새로 발견된 material과 전달 실패를 구분할 수 있는가?

#### 전이 가능성

조사, 제품 기획, 구현에서도 처음부터 중요한 사용자 motive가 기록되지 않으면 뒤의 agent는 결과에서 역추론할 수밖에 없다. 다만 “source가 없다”와 “찾지 못했다”를 구분해야 한다.

### 가설 2 — Material은 있었지만 일부 핵심 계보가 불완전했다

근거 강도: 혼합

#### 가설

현재의 필요·효용은 있었지만, 왜 그 아이디어를 떠올렸는지와 외부 사례를 어떻게 자기 방식으로 변형했는지는 충분히 구체화되지 않았다. 그래서 재작성은 작동 mechanism을 설명했지만 발상 계보를 만들 수 없었다.

#### 지지 근거

- 기존 후보 카드에는 “왜 필요했는가”와 효용은 있지만 Alex의 직접 영향은 현재 확인한 범위에서 전면에 보이지 않는다.
- 사용자가 A/B 뒤 Alex를 새로 떠올렸다.

#### 반대 근거 또는 대안 설명

- 공개 글에 발상 계보가 반드시 필요한지는 아직 합의되지 않았다.
- Alex가 없어도 사용자의 내부 문제와 선택만으로 발생 이유를 쓸 수 있다.
- 빠진 핵심이 계보보다 source packet과 중심 위계였을 수 있다.

#### 확인 질문

- Alex는 글의 중심 material인가, 사용자의 판단을 더 생생하게 만드는 보강 material인가?
- Alex를 빼도 Current 발생 이유와 사용자의 선택 논리가 충분히 복원되는가?

#### 전이 가능성

AI가 만든 설계의 provenance를 보존할 때 외부 참고, 사용자 변형, 실제 구현 선택을 분리하는 문제로 전이된다.

### 가설 3 — Material은 있었지만 새 작업의 실제 입력으로 전달되지 않았다

근거 강도: 강함

#### 가설

문제는 수집 부족이 아니라 이미 수집된 motive, 사용자 경험, 전체 맥락이 Current rewrite와 최종 review 입력에 포함되거나 강조되지 않은 것이다.

#### 지지 근거

- 후보 카드와 첫 shaping에 Current의 필요와 긍정적 효용이 있었다.
- rewrite brief는 Q1~Q5, map/cursor, 권위 분리, terminal gap을 구체적으로 고정했다.
- blind reviewer는 원고와 고정 질문만 받았다.
- 사용자 거부 뒤 기존 material을 다시 보자 빠진 motive가 확인됐다.

#### 반대 근거 또는 대안 설명

- material을 입력에 넣는 것만으로 결과에 작동한다고 보장할 수 없다.
- post-sync cycle은 material을 종합했는데도 글이 매력적이지 않았다.
- 전달보다 goal과 기준 위계의 문제가 더 상위일 수 있다.

#### 확인 질문

- 어떤 material이 worker brief, source packet, reviewer 질문에서 빠졌는가?
- 단순 첨부가 아니라 각 material이 중심·장면·평가에서 어떤 역할을 가져야 했는가?

#### 전이 가능성

multi-agent 구현에서 요구사항이 repository에 있어도 task brief와 acceptance에 들어오지 않으면 작동하지 않는 문제와 같다.

### 가설 4 — Material은 입력됐지만 판단 권위를 얻지 못했다

근거 강도: 중간

#### 가설

동기와 사용자 경험이 읽기 목록에는 있었지만 `Q1~Q5가 대표 장면`, `current scaffolding이 보호할 중심` 같은 더 강한 지시보다 낮은 권위를 가져 결과 선택에 영향을 주지 못했다.

#### 지지 근거

- worker에게 여러 core와 review를 모두 줬지만 보호할 중심 위계가 명시돼 있었다.
- post-sync material synthesis도 Q1~Q5를 stress test로 낮춘다고 썼지만 후속 결과에서 다시 강한 장면이 됐다.
- source가 존재하는 것과 판단에 작동하는 것이 다르다는 반복 관찰이 있다.

#### 반대 근거 또는 대안 설명

- 실제 worker가 모든 material을 읽었는지는 각 cycle마다 다르다.
- 동기가 입력 자체에서 빠진 경우와 권위가 낮은 경우를 구분해야 한다.

#### 확인 질문

- brief에서 `보호`, `중심`, `주 장면`, `참고 material`은 실제로 어떤 우선순위를 만들었는가?
- material이 현재 중심을 기각하거나 다시 열 수 있었는가?

#### 전이 가능성

AI coding task에서 문서 여러 개를 주면서 “이 interface는 유지” 같은 한 문장이 나머지 evidence보다 우선하는 현상으로 전이된다.

### 가설 5 — Source packet을 기존 결과의 frame 안에서 골랐다

근거 강도: 강함

#### 가설

reviewer에게 source를 준 것은 맞지만, main이 기존 Current 원고에서 중요해 보이는 장면을 기준으로 packet을 만들었다. reviewer가 source-first로 보더라도 탐색 범위는 이미 Q1~Q5와 최근 사건에 묶였다.

#### 지지 근거

- A/B packet은 current, 계약 분리, Q1~Q5, terminal gap, audit로 구성됐다.
- current 최초 문제와 Alex 영감은 빠졌다.
- A와 B의 차이는 같은 사건의 위계를 바꾸는 정도였다.
- 후속 사용자 판정도 “같은 최근 장면을 어느 높이에 둘지의 차이”라고 정리됐다.

#### 반대 근거 또는 대안 설명

- packet을 무한히 넓힐 수는 없다.
- reviewer에게 모든 process를 주면 과거 오독에 anchor될 위험이 이미 관찰됐다.
- Alex 영감이 사전에 명확한 핵심이 아니었다면 packet 작성 당시 합리적 선택일 수 있다.

#### 확인 질문

- packet을 만들기 전에 source universe를 결과물과 독립적으로 누가 펼칠 것인가?
- 최소 packet의 누락 위험을 어떻게 드러낼 것인가?
- reviewer가 추가 source를 요구하거나 packet 범위를 기각할 수 있었는가?

#### 전이 가능성

버그 조사에서 실패 로그 주변 파일만 수집해 architecture-level 원인을 놓치는 경우, research에서 현재 hypothesis를 지지하는 논문만 모으는 경우에 전이된다.

### 가설 6 — Source의 존재와 source의 역할을 구분하지 않았다

근거 강도: 강함

#### 가설

source를 “읽을 수 있는 자료”로만 관리하고, 이것이 motive, 사실, 대안, 반례, 장면, claim ceiling 중 무엇을 맡는지 충분히 구분하지 않아 central material이 주변 근거로 밀렸다.

#### 지지 근거

- 사용자는 “source까지 줬는데” 품질이 왜 안 움직였는지 물었다.
- Current motive는 있었지만 결과 구조를 만들지 못했다.
- 기존 criteria history에서도 evidence가 topic selector 자리를 차지한 일이 있었다.

#### 반대 근거 또는 대안 설명

- source 역할을 지나치게 태깅하면 새로운 가능성을 미리 닫을 수 있다.
- 같은 source가 cycle에 따라 다른 역할을 할 수 있다.

#### 확인 질문

- 각 source가 현재 결과에서 어떤 판단을 가능하게 해야 했는가?
- 역할은 사전에 고정할 것인가, 결과를 본 뒤 회수할 것인가?

#### 전이 가능성

요구사항 문서가 acceptance인지 배경인지, 로그가 직접 증거인지 참고인지 구분하는 모든 AI 작업에 전이된다.

### 가설 7 — 증명하기 쉬운 장면이 중요한 경험보다 선택 우위를 가졌다

근거 강도: 강함

#### 가설

Q1~Q5, terminal gap, Git audit, 계약 diff는 구체적이고 검증하기 쉬웠다. 반면 “전체 그림을 보고 sync를 맞추고 싶었다”, “도움이 됐다”, “Alex를 보고 떠올렸다”는 경험은 계측이 어렵다. evidence-rich 장면이 중심을 반복해서 차지했다.

#### 지지 근거

- criteria history에서 가장 잘 증명되는 실패가 사용자 효용보다 앞선 오류를 이미 정정했다.
- Current는 여러 cycle에서 Q1~Q5와 terminal gap이 다시 강한 장면이 됐다.
- 사용자에게 중요한 긍정적 효용은 단일 인과로 증명하기 어렵다는 claim ceiling이 있었다.

#### 반대 근거 또는 대안 설명

- 공개 글에는 독자가 확인할 concrete scene이 필요하다.
- 경험만으로 중심을 만들면 추상적 자기서사가 될 위험이 있다.
- 문제는 evidence 장면 자체보다 위계일 수 있다.

#### 확인 질문

- central value를 먼저 정하고 evidence scene을 찾았는가, evidence가 강한 scene에서 value를 역으로 만들었는가?
- 덜 계측 가능한 사용자 경험을 과장하지 않으면서 중심으로 보존하는 방법은 무엇인가?

#### 전이 가능성

제품에서는 쉽게 측정되는 proxy가 실제 사용자 가치보다 우선하는 문제, 구현에서는 test 가능한 부분이 핵심 기능보다 먼저 만들어지는 문제와 연결된다.

### 가설 8 — 너무 많은 과거 context가 reviewer와 main을 anchor했다

근거 강도: 중간

#### 가설

backlog, 과거 review, 기존 중심을 많이 읽으면 이전 분류와 언어가 판단 공간을 선점해 새 문제를 보기 어렵게 만든다.

#### 지지 근거

- 사용자는 backlog를 준 판별자가 과거 오독에 anchor돼 좋은 변화를 실패로 본 경험을 말했다.
- context layering 자체가 “애매하게 다 참고하다가 닫히는” 문제에서 시작됐다.
- fresh pass와 source-first second pass를 별도로 둔 이유도 anchor 위험이었다.

#### 반대 근거 또는 대안 설명

- Current blind reviewer는 context를 거의 받지 않았지만 핵심 누락을 못 봤다.
- A/B도 process는 가렸지만 packet frame을 공유했다.
- 양보다 역할과 선택 기준이 더 중요할 수 있다.

#### 확인 질문

- 어떤 과거 정보가 실제로 reviewer 결론을 anchor했는가?
- context를 제거하는 대신 독립 보고와 main 회수로 상관을 낮출 수 있는가?

#### 전이 가능성

장기 agent session, issue history가 긴 coding task, 누적 research notebook에서 전이된다.

### 가설 9 — context를 너무 적게 줘서 기존 합의와 발생 이유가 사라졌다

근거 강도: 강함

#### 가설

독립성을 지키기 위해 process와 합의를 가리자 reviewer가 결과의 자립성만 봤고, 기존 material과 결과의 차이를 판정할 수 없었다.

#### 지지 근거

- Current blind reviewer는 원고와 고정 질문만 받았고 `light edit`을 냈다.
- 사용자 검토에서는 motive와 전체 맥락 누락이 즉시 드러났다.
- first active-state도 완료 가지를 너무 압축해 새 session이 Material 생략으로 오진했다.

#### 반대 근거 또는 대안 설명

- 모든 합의를 주면 reviewer가 현재 frame을 그대로 보호할 수 있다.
- 원고 자체의 자립성을 보는 blind review 역할은 여전히 필요하다.
- 합의를 모르는 것보다 direct source가 없던 것이 더 직접 원인일 수 있다.

#### 확인 질문

- 어떤 review는 blind여야 하고 어떤 review는 source와 goal을 봐야 하는가?
- 두 결과를 어떤 순서와 권한으로 함께 해석할 것인가?

#### 전이 가능성

code review에서 diff-only와 architecture-aware review, model evaluation에서 black-box와 trace-aware evaluation의 역할 분리로 전이된다.

### 가설 10 — Active-state의 해상도가 전체 생각 지도를 복구하기에 너무 낮았다

근거 강도: 강함

#### 가설

active-state가 최신 결과와 cursor만 남기며 완료된 조사·사용자 sync의 현재 결론을 지웠다. 다음 session은 process를 다시 열기 전에는 무엇이 이미 존재하는지 알 수 없었다.

#### 지지 근거

- 첫 운용 보정 기록이 이 문제를 직접 확인했다.
- Material 생략 오진이 발생했다.
- 사용자가 원한 current는 최근 요약이 아니라 whole map + one cursor였다.

#### 반대 근거 또는 대안 설명

- active-state에 더 많이 넣으면 다시 context 과다와 anchor가 생길 수 있다.
- 지도에 보존하는 것과 실제 task brief에 전달하는 것은 다른 문제다.

#### 확인 질문

- 완료된 가지의 어떤 결론이 현재 판단에 여전히 필요했는가?
- 지도 자체가 아니라 first-read path와 task-specific selection이 문제였는가?

#### 전이 가능성

장기 project handoff, multi-session coding, research program 관리에 직접 전이된다.

## Goal과 frame에 관한 가설

### 가설 11 — 상위 goal이 명시되지 않았다

근거 강도: 중간

#### 가설

Current rewrite에는 구조와 장면 조건은 있었지만 “이 글이 독자에게 왜 존재해야 하는가”, “사용자의 어떤 판단 변화를 보여 줘야 하는가”라는 상위 goal이 충분히 강하지 않았다.

#### 지지 근거

- brief는 current scaffolding, Q1~Q5, 권위 분리, terminal gap을 잘 정의했다.
- 사용자는 결과에서 “왜 만들었는가”, “근거·논리·나의 생각”이 없다고 했다.
- A/B 뒤 goal을 먼저 다시 만들자는 판정이 나왔다.

#### 반대 근거 또는 대안 설명

- existing active-state에는 current의 효용과 중심 질문이 있었다.
- goal 문장을 하나 더 써도 같은 source와 장면으로 번역될 수 있다.
- 사용자의 품질 감각 일부는 결과를 보기 전에는 완전히 명시되지 않았을 수 있다.

#### 확인 질문

- 당시 goal을 한 문장으로 쓰면 무엇이었는가?
- 그 문장이 Q1~Q5를 중심에 두는 것을 막았을까?
- goal이 결과에서 관찰 가능한 성공 조건으로 번역됐는가?

#### 전이 가능성

구현 task의 business outcome, research의 decision relevance, evaluation의 user impact가 빠진 경우에 전이된다.

### 가설 12 — 서로 다른 goal 층위를 하나로 취급했다

근거 강도: 강한 후보, 아직 명칭·경계 미합의

#### 가설

다음이 모두 `현재 중심` 또는 `goal`이라는 말 안에서 섞였다.

- 사용자의 비교적 오래가는 목적
- 이번 글감이 탐구하려는 질문
- 이번 rewrite에서 시험하는 중심 가설
- writer가 따라야 할 구조·장면 목표
- reviewer의 통과 조건

국소 rewrite 목표가 상위 사용자 목적의 권위를 얻었다.

#### 지지 근거

- “current scaffolding 중심 + Q1~Q5 주 장면”은 한 rewrite를 위해 맞춘 위계였지만 여러 다음 판단에서 기본 frame이 됐다.
- reviewer/main의 임시 선택이 사용자 합의처럼 굳은 이전 실패가 있었다.
- 사용자는 goal, criteria, evaluator를 따로 다시 물었다. `[현재 대화 직접 근거]`

#### 반대 근거 또는 대안 설명

- 실제로 어떤 합의가 국소였고 어떤 합의가 지속적이었는지 원문 경계가 불명확하다.
- 너무 많은 goal layer를 만들면 운용 부담이 커질 수 있다.

#### 확인 질문

- 각 goal은 누가 바꿀 수 있고 어떤 결과에서 다시 열리는가?
- 한 cycle의 선택이 다음 cycle에 이어질 때 명시적 승격이 필요한가?

#### 전이 가능성

제품 목표, sprint 목표, task acceptance, test oracle을 섞는 구현 작업에 넓게 전이된다.

### 가설 13 — 작업 가설이 사용자 목적처럼 굳었다

근거 강도: 강함

#### 가설

`Q1~Q5가 current 구조를 시험하는 대표 장면`은 시험 가능한 작업 가설이었다. 여러 cycle과 active-state를 거치며 보호할 중심이 되었고, 이후 source selection과 reviewer brief가 이 가설을 전제로 삼았다.

#### 지지 근거

- post-v3 sync는 Q1~Q5를 유일한 중심으로 고정하지 말라고 명시했다.
- Current rewrite는 Q1~Q5를 주 장면으로 고정했다.
- A와 B 모두 같은 장면 안에서 구조를 달리했다.
- 사용자는 왜 다섯 문항에 계속 꽂혔는지 공감하지 못했다.

#### 반대 근거 또는 대안 설명

- 사용자는 한때 current scaffolding 중심과 Q1~Q5 대표 장면 위계를 좋다고 확인했다.
- Q1~Q5는 실제 source-supported stress test다.
- 고착보다 발생 이유를 함께 넣지 않은 것이 문제일 수 있다.

#### 확인 질문

- 사용자의 당시 승인은 장면을 시험하라는 것이었나, 최종 중심으로 확정한 것이었나?
- 어떤 신호에서 작업 가설을 다시 후보 상태로 낮춰야 했나?

#### 전이 가능성

debugging의 초기 root-cause hypothesis, research의 working theory, product의 provisional persona가 사실처럼 굳는 경우에 전이된다.

### 가설 14 — 성공 조건이 brief 내부 품질로 너무 좁았다

근거 강도: 강함

#### 가설

성공 조건이 `중심 위계 유지`, `Q1~Q5 구체화`, `source support`, `공개 경계`, `reader clarity`로 구성됐다. “독자가 왜 이 글을 읽어야 하는지”, “사용자의 판단과 발상 계보가 살아 있는지”는 검증 항목에 충분히 포함되지 않았다.

#### 지지 근거

- worker와 여러 reviewer는 정한 범위에서 좋은 결과를 냈다.
- blind reviewer 질문도 구조와 읽힘 중심이었다.
- 사용자가 잡은 결손은 평가되지 않은 motive와 author judgment였다.

#### 반대 근거 또는 대안 설명

- developer·portfolio·voice lenses에는 agency와 judgment 관련 기준이 있었다.
- 기준이 없었다기보다 B와 worker가 그 기준을 적용할 권한·source가 없었을 수 있다.

#### 확인 질문

- success condition이 결과의 어떤 observable로 나타나야 했는가?
- reviewer가 새로운 품질 기준을 제안할 수 있었는가?

#### 전이 가능성

acceptance tests가 task spec 충실도만 보고 user outcome을 놓치는 구현에 전이된다.

### 가설 15 — 사용자의 goal 자체가 결과를 보며 진화했다

근거 강도: 중간

#### 가설

처음부터 완전한 goal이 숨겨져 있었던 것이 아니라, A/B와 Current 결과를 보고 사용자가 무엇이 중요한지 새로 발견했다. Alex 영감도 그 과정에서 다시 떠올랐다.

#### 지지 근거

- 사용자는 “지금 내가 기억난 건 Alex”라고 했다.
- 완결 결과를 보고 직관적으로 판단하고 싶다는 선호가 명확하다.
- goal·criteria·loop에 대한 질문을 열린 상태로 탐색했다. `[현재 대화 직접 근거]`

#### 반대 근거 또는 대안 설명

- Current의 필요와 사용자 효용은 이전 자료에 이미 있었다.
- “결과를 보고 발견”을 과도하게 강조하면 이전 material 누락 책임을 지울 수 있다.

#### 확인 질문

- 결과가 기존 goal의 누락을 드러낸 것인가, 새로운 goal을 생성한 것인가?
- 둘이 섞였다면 어떤 부분이 안정적이고 어떤 부분이 새로 생겼는가?

#### 전이 가능성

exploratory product design, research, writing처럼 output이 requirement discovery 도구가 되는 작업에 전이된다.

### 가설 16 — 국소 합의를 장기 합의로 과대해석했다

근거 강도: 강한 후보

#### 가설

사용자가 “두 번째 방향이 좋다”고 답한 것은 당시 독립 review를 회수해 Current를 재작성하기 위한 선택이었다. main과 이후 process가 이를 Current 글의 장기 중심으로 보호했다.

#### 지지 근거

- current conversation에서 사용자는 두 위계 중 두 번째가 좋다고 했다.
- worker brief는 이를 `변경 금지 중심 위계`로 전달했다.
- 이후 main은 A의 center change를 사용자 경험 해석 변경으로 보류했다.
- 사용자는 A/B 뒤 그 frame 자체를 거부했다.

#### 반대 근거 또는 대안 설명

- 중심을 보호하지 않으면 worker가 reviewer 제안으로 사용자 합의를 쉽게 덮을 위험이 있었다.
- 당시에는 실제로 가장 합리적인 current state였을 수 있다.

#### 확인 질문

- `이번 rewrite에서 보호`, `다음 결과까지 잠정 유지`, `core 수준 합의`를 어떻게 구분할 것인가?
- 결과가 반복해서 어긋날 때 재확인 조건은 무엇인가?

#### 전이 가능성

사용자와 한 번 승인한 UI 선택, architecture choice, scope tradeoff를 영구 requirement로 읽는 문제에 전이된다.

### 가설 17 — article type과 reader promise가 잘못 잡혔다

근거 강도: 약함~중간

#### 가설

Current를 product-architecture 또는 운영법 설명으로 읽으면서 발생 이유와 개인 탐구가 주변화됐다. 실제로는 더 개인적인 개발 회고나 discovery essay에 가까웠을 수 있다.

#### 지지 근거

- user는 근거·논리·나의 생각을 강조했다.
- public 글이 내부 보고서처럼 느껴진 이전 실패가 있었다.
- article type은 여러 cycle에서 잠정 편집 선택이었다.

#### 반대 근거 또는 대안 설명

- article type을 바꾸지 않아도 motive와 author agency를 넣을 수 있다.
- 현재 최종 article type은 아직 정하지 않았다.

#### 확인 질문

- 독자가 읽고 가져갈 것은 구조 설계인가, 사용자의 발견 과정인가, 둘의 결합인가?
- 각 article type이 어떤 material을 중심으로 올리고 내리는가?

#### 전이 가능성

기술 문서, RFC, 회고, tutorial 사이의 산출물 계약 선택 문제로 전이된다.

## Criteria와 evaluation에 관한 가설

### 가설 18 — 좋은 결과를 보는 criteria가 불완전했다

근거 강도: 중간

#### 가설

현재 criteria는 사실, 구조, 공개 경계, 독자 자립성은 잘 다뤘지만 발생 이유, 저자의 선택 압력, 발상 계보, 사용자의 실제 품질 감각을 충분히 요구하지 않았다.

#### 지지 근거

- Current rewrite와 A/B가 여러 criteria를 통과했지만 사용자가 핵심 결손을 찾았다.
- 사용자는 global core/lenses를 더 면밀히 보라고 요구했다.

#### 반대 근거 또는 대안 설명

- editorial lenses에는 이미 voice, developer agency, portfolio signal, material signature가 있었다.
- 기준의 부재보다 적용 시점·입력 source·brief 권한이 문제였을 수 있다.

#### 확인 질문

- 기존 기준 중 실제로 이 결손을 잡을 수 있었던 문장은 무엇인가?
- 있었는데 작동하지 않았다면 왜 선택되지 않았는가?

#### 전이 가능성

테스트 suite가 빠진 요구를 못 잡는 경우와, test가 있는데 실행 경로에 포함되지 않은 경우를 구분하는 문제로 전이된다.

### 가설 19 — 좋은 criteria를 잘못된 시점에 적용했다

근거 강도: 강함

#### 가설

글을 수렴할 때 유효한 `한 중심`, `한 사건`, claim ceiling이 material exploration과 candidate value 판단에 너무 일찍 적용돼 가능성을 잘랐다.

#### 지지 근거

- candidate state correction에서 같은 오류가 직접 기록됐다.
- Q1~Q5라는 선명한 장면이 material 복원보다 먼저 중심이 됐다.
- 사용자는 지금도 “최대한 펼치고 나중에 수거”를 반복 요구했다. `[현재 대화 직접 근거]`

#### 반대 근거 또는 대안 설명

- Current rewrite 시점은 이미 exploration이 아니라 edit 단계였다고 볼 수 있다.
- 실제 문제는 earlier exploration 결과가 잘 전달되지 않은 것일 수 있다.

#### 확인 질문

- 현재 작업이 exploration, hypothesis test, convergence, verification 중 어디인가?
- 같은 기준이 단계마다 어떤 권한을 가져야 하는가?

#### 전이 가능성

solution ideation 전에 feasibility filter를 강하게 적용하거나, research question을 evidence availability로 너무 일찍 좁히는 경우에 전이된다.

### 가설 20 — criteria가 평가 기준이 아니라 생성 seed와 anchor가 됐다

근거 강도: 강한 후보

#### 가설

reviewer와 writer에게 Q1~Q5, reader clarity, authority separation 같은 criteria를 주자, 이들이 결과를 점검하는 축을 넘어 무엇을 써야 하는지를 생성하는 frame이 됐다.

#### 지지 근거

- worker brief의 평가 요구가 원고 구조와 scene selection을 직접 만들었다.
- candidate feature 한 줄이 이후 평가 anchor가 될 수 있다는 사용자 우려가 이전에도 있었다.
- B는 lenses를 받았지만 보호할 중심 안에서 국소 편집했다.

#### 반대 근거 또는 대안 설명

- 모든 생성에는 어느 정도 goal과 criteria가 필요하다.
- criteria 없이 쓰면 방향 없는 결과가 나올 수 있다.

#### 확인 질문

- 이 항목은 generation constraint인가, evaluation question인가?
- reviewer만 알아야 할 기준과 writer도 알아야 할 기준을 나눌 필요가 있는가?

#### 전이 가능성

코드 생성에서 test가 implementation을 과도하게 특정하거나 benchmark가 model behavior를 형성하는 문제로 전이된다.

### 가설 21 — criteria의 우선순위와 충돌 처리 방식이 없었다

근거 강도: 중간

#### 가설

정확성, public safety, 독자 자립성, author agency, attractiveness, 현재 중심 보호가 동시에 주어졌지만 충돌할 때 무엇을 우선할지 충분히 정의되지 않았다. 검증하기 쉬운 hard guard가 중심 material보다 앞섰다.

#### 지지 근거

- 여러 review는 개별 기준에서 pass했지만 전체 사용자 판단과 달랐다.
- evidence/claim ceiling이 과거 candidate value를 밀어낸 사례가 있다.

#### 반대 근거 또는 대안 설명

- 모든 기준을 사전 ranking하면 새로운 상황에 경직될 수 있다.
- 우선순위보다 판단 역할과 시점 분리가 더 적절할 수 있다.

#### 확인 질문

- hard guard, 품질 lens, 작업 가설, 사용자 경험이 충돌할 때 누가 결정하는가?
- 어떤 기준은 탈락 조건이고 어떤 기준은 비교 질문인가?

#### 전이 가능성

성능·안전·개발 속도·사용자 가치가 충돌하는 제품 및 시스템 설계에 전이된다.

### 가설 22 — global lens는 upstream goal과 source frame을 고칠 권한이 없었다

근거 강도: 강한 후보

#### 가설

B가 core와 lenses를 사용했어도 그 역할은 주어진 중심 안에서 좋은 글을 만드는 것이었다. lens는 goal을 다시 세우거나 packet 밖 source를 찾는 권한이 없어 local improvement에 머물렀다.

#### 지지 근거

- B writer brief는 현재 구조와 Q1~Q5 주 장면을 보호했다.
- B는 `local / partial edit`로 판정했다.
- 후속 재판정은 lens의 무용이 아니라 goal/source frame 권한 부재로 해석했다.

#### 반대 근거 또는 대안 설명

- 일부 lens는 central question과 material depth를 다시 열 수 있었을 가능성이 있다.
- B reviewer가 관련 기준을 충분히 강하게 적용했는지 별도 확인이 필요하다.

#### 확인 질문

- lens는 frame 안 quality만 보는가, frame 자체의 적합성도 보고할 수 있는가?
- 보고할 수 있어도 writer가 바꿀 권한이 있는가?

#### 전이 가능성

lint, unit tests, security review가 product requirement 오류를 고칠 수 없는 것과 유사하다.

### 가설 23 — evaluation이 결과만 보고 결과를 만든 판단 체계를 보지 않았다

근거 강도: 강함

#### 가설

대부분의 review는 원고의 scene, structure, clarity, evidence를 봤다. 이 결과를 만든 goal, source packet selection, protected center, reviewer question, main brief는 평가 대상에서 빠졌다.

#### 지지 근거

- Current rewrite는 artifact checks를 통과했지만 frame이 틀렸다는 사용자 판정이 나왔다.
- A/B 후속 판단은 결과보다 공통 packet과 frame을 문제로 봤다.
- 사용자는 ai-self-check나 판별자에게 main의 러프한 판단까지 근본적으로 보라고 했다. `[현재 대화 직접 근거]`

#### 반대 근거 또는 대안 설명

- 모든 review가 upstream system을 다시 보면 역할이 무거워진다.
- 국소 품질 문제에는 artifact review만으로 충분하다.

#### 확인 질문

- 어떤 반복 신호에서 artifact evaluation을 system evaluation으로 올리는가?
- upstream 판단을 누가 독립적으로 볼 것인가?

#### 전이 가능성

모델 output 평가에서 prompt, retrieval, tool selection, evaluator rubric까지 causal chain에 넣는 작업에 직접 전이된다.

### 가설 24 — 제한된 `PASS`를 전체 품질과 완료로 확대했다

근거 강도: 강함

#### 가설

각 판정은 특정 범위만 지원했지만 main이 이를 더 넓게 읽었다.

- shaping pass → 중심이 좋은 글
- evidence pass → 결과 전체가 준비됨
- blind `light edit` → 작업 완료에 가까움
- A structural fidelity `PASS` → 좋은 후보

#### 지지 근거

- Current build record가 이후 사용자 검토 뒤 과거 `최종 검증` 해석을 정정했다.
- active-map refinement도 제한된 review가 completion signal로 확대됐다고 기록했다.
- A/B 후속 재판정이 A `PASS`의 범위를 다시 제한했다.

#### 반대 근거 또는 대안 설명

- main은 일부 보고에서 범위를 명시했다.
- 실제 문제는 사용자가 결과를 보기 전 상태를 `완료`라고 부른 표현일 수 있다.

#### 확인 질문

- 각 pass는 어떤 claim만 지원하는가?
- 모든 required judgment가 끝났는지 누가 확인하는가?

#### 전이 가능성

unit test pass를 production readiness로 읽거나 benchmark score를 user value로 읽는 문제에 전이된다.

### 가설 25 — 사용자의 taste를 평가 체계가 포착하지 못했다

근거 강도: 중간

#### 가설

매력, 생생함, “공감이 안 된다”, “틀을 못 벗어난다” 같은 품질은 명시적 rubric으로 완전히 환원되지 않았다. 전문 reviewer는 구조와 근거를 봤지만 사용자의 taste와 중심 감각을 대체하지 못했다.

#### 지지 근거

- 여러 전문 pass 뒤 사용자가 결과를 즉시 거부했다.
- A는 생생함에서 B보다 낫지만 중심은 둘 다 틀렸다는 복합 판정이 나왔다.
- Alex도 scaffolding 뒤 결과 impact를 판별할 human taste를 강조했다.

#### 반대 근거 또는 대안 설명

- taste라는 말로 설명하면 구체적 누락과 원인을 덮을 수 있다.
- 사용자는 실제로 motive, lineage, author reasoning, scene hierarchy라는 구체 기준을 제시했다.

#### 확인 질문

- taste 신호를 어느 수준까지 관찰 가능한 기준으로 풀 수 있는가?
- 풀지 못한 잔여 판단은 언제 사용자에게 남겨야 하는가?

#### 전이 가능성

UI, product concept, writing, naming처럼 qualitative judgment가 큰 작업에 전이된다.

### 가설 26 — 약한 결과 뒤 evaluation criteria를 갱신하는 loop가 없었다

근거 강도: 중간

#### 가설

결과가 약하면 원고를 다시 쓰고 같은 종류의 review를 반복했지만, “무엇을 좋은 결과로 볼지” 자체를 명시적으로 업데이트해 다음 cycle에 전달하는 loop가 충분하지 않았다.

#### 지지 근거

- 사용자 거부가 반복될 때마다 새 cycle은 생겼지만 기존 frame 안 local improvement가 누적됐다.
- Alex는 약한 solution 뒤 scope와 evaluation criteria를 바꾸고 재위임했다.
- 사용자는 goal·criteria·evaluator loop 가능성을 직접 물었다. `[현재 대화 직접 근거]`

#### 반대 근거 또는 대안 설명

- criteria evolution과 사용자 sync 기록은 실제로 존재했다.
- 문제는 criteria 갱신 부재보다 갱신된 criteria가 source/brief에 작동하지 않은 것일 수 있다.
- Alex의 autonomous loop 완료는 확인되지 않았다.

#### 확인 질문

- 각 사용자 거부 뒤 어떤 evaluation criterion이 바뀌었고 다음 결과에서 어떻게 검증됐는가?
- result correction과 criteria correction을 process에서 구분했는가?

#### 전이 가능성

agent loop, model tuning, iterative design, QA에서 전이된다.

### 가설 27 — criteria를 더 많이 주면 오히려 같은 frame이 더 강해질 수 있다

근거 강도: 중간

#### 가설

문제는 criteria 부족이 아니라 기존 frame 안에서 criteria를 더 많이 적용한 것이다. B처럼 global lenses를 추가하면 잘못된 중심을 더 세련되고 방어 가능한 결과로 만들 수 있다.

#### 지지 근거

- B는 A보다 더 많은 editorial 기준을 받았지만 user가 보기에 전진하지 못했다.
- self-check 후보는 같은 오염된 frame에서 자기점검하면 기존 방향을 더 정교하게 변호할 수 있다고 이미 기록했다.

#### 반대 근거 또는 대안 설명

- B의 문제는 criteria 자체가 아니라 center protection과 source packet이었다.
- motive·agency 기준을 더 잘 적용했다면 frame을 흔들었을 가능성도 있다.

#### 확인 질문

- criteria 추가가 판단 공간을 넓혔는가, 기존 중심의 충실도만 높였는가?
- 기준이 main의 질문 자체를 기각할 수 있는가?

#### 전이 가능성

더 많은 tests와 linters가 잘못된 product requirement를 더 안정적으로 구현하게 만드는 경우에 전이된다.

## Reviewer, main, worker 역할에 관한 가설

### 가설 28 — reviewer들이 서로 다른 agent여도 오류 상관이 높았다

근거 강도: 강함

#### 가설

A와 B는 역할과 criteria가 달랐지만 같은 원고, source packet, 사건 universe를 공유했다. 서로 다른 결론은 frame 밖 독립 증거가 아니라 같은 frame 안의 상관된 변형이었다.

#### 지지 근거

- A/B 후속 사용자 재판정이 공통 frame을 직접 지적했다.
- 기존 독립 판별 후보도 reviewer 수보다 입력·질문·권한이 중요하다고 정의했다.

#### 반대 근거 또는 대안 설명

- A는 center를 실제로 바꿨고 B는 유지했다. 판단 차이가 전혀 없었던 것은 아니다.
- 일부 공통 사실 범위는 필요하다.

#### 확인 질문

- 독립성을 만드는 최소 차이는 agent identity, source universe, question authority, result separation 중 무엇인가?
- reviewer 간 공통 입력과 독립 입력을 어떻게 명시할 것인가?

#### 전이 가능성

ensemble model, multiple code reviewers, parallel research agents의 correlated failure에 전이된다.

### 가설 29 — draft-only blind review는 독립적이었지만 개선 역할에는 정보가 부족했다

근거 강도: 강함

#### 가설

원고 외 context를 가린 reviewer는 first-read quality를 독립적으로 볼 수 있었지만 source omission, user intent, goal mismatch를 볼 수 없었다. 독립성과 개선 능력을 같은 축으로 봤다.

#### 지지 근거

- Current blind reviewer는 `light edit`, 사용자는 중심 material 누락을 판정했다.
- active-map refinement가 draft-only review와 source+result improvement review를 구분했다.

#### 반대 근거 또는 대안 설명

- first-read review는 공개 글 자립성을 보는 데 유효하다.
- reviewer에게 user intent를 주면 기존 합의를 보호하는 editor가 될 수 있다.

#### 확인 질문

- 이 reviewer의 목적은 관찰인가, 진단인가, 개선안 생성인가?
- 결과를 완료 판정에 사용할 수 있는 범위는 어디까지인가?

#### 전이 가능성

black-box evaluation과 root-cause analysis의 차이로 전이된다.

### 가설 30 — source+result review도 packet 선택자에게 종속됐다

근거 강도: 강함

#### 가설

reviewer에게 direct source를 주고 질문 자유를 줘도, 어떤 direct source가 universe에 들어오는지는 main이 정했다. packet selection을 독립성 밖에 둔 것이 한계였다.

#### 지지 근거

- A/B packet이 기존 current frame 안에서 구성됐다.
- 둘 다 Alex와 최초 motive를 보지 못했다.

#### 반대 근거 또는 대안 설명

- reviewer가 무제한 repository를 탐색하게 하면 비용과 noise가 커진다.
- 현재 review-workflow에는 추가 source 요청 가능성이 일부 정의돼 있다.

#### 확인 질문

- reviewer가 packet 누락을 어떻게 감지하고 source 범위를 확장할 수 있는가?
- 별도 source collector가 결과물과 독립적으로 universe를 만들 필요가 있는가?

#### 전이 가능성

incident review, legal discovery, research literature review에서 evidence scope selection 문제로 전이된다.

### 가설 31 — reviewer가 goal과 질문 자체를 기각할 권한이 부족했다

근거 강도: 중간~강함

#### 가설

reviewer는 “이 원고를 어떻게 개선할까”에 답했지만 “왜 이 원고를 이 중심으로 쓰고 있는가”, “이 질문이 잘못됐는가”를 판단할 명시적 권한이 약했다.

#### 지지 근거

- A는 중심을 바꾸긴 했지만 Q1~Q5 사건 universe 안에서 바꿨다.
- B는 current 중심을 보호하는 writer brief를 받았다.
- 기존 independent-review 원리는 main의 질문 자체를 기각할 수 있어야 한다고 기록돼 있다.

#### 반대 근거 또는 대안 설명

- 모든 reviewer가 goal을 다시 열면 작업이 수렴하지 않는다.
- goal 변경은 사용자 권한일 수 있으므로 reviewer는 제안만 해야 한다.

#### 확인 질문

- reviewer는 goal mismatch를 보고만 할 수 있는가?
- 어떤 신호에서 main은 사용자와 goal을 다시 맞춰야 하는가?

#### 전이 가능성

code reviewer가 implementation 대신 requirement 문제를 제기할 권한, evaluator가 benchmark 자체를 비판할 권한으로 전이된다.

### 가설 32 — main은 review를 회수했지만 자기 frame을 감사하지 않았다

근거 강도: 강함

#### 가설

main은 A/B를 active-state와 대조해 채택·보류했지만, active-state와 source packet을 만든 자신의 판단이 오류 원인일 가능성은 판별 대상에 넣지 않았다.

#### 지지 근거

- main adjudication은 B를 현재 합의 안에서 진행 가능하다고 판정했다.
- 후속 사용자 판정은 공통 packet과 기존 frame을 문제로 봤다.
- 사용자는 판별자에게 main의 러프한 생각과 판단까지 근본적으로 보라고 요청했다. `[현재 대화 직접 근거]`

#### 반대 근거 또는 대안 설명

- main은 source fact와 user authority를 보호해야 하므로 current state를 기준으로 삼는 것이 필요했다.
- 당시에는 frame 오류를 알 수 있는 새 evidence가 없었을 수 있다.

#### 확인 질문

- 반복 실패 뒤 main의 problem definition, source selection, tool choice, delegation brief를 누가 본 것인가?
- main self-check와 독립 advisor의 역할을 어떻게 구분하는가?

#### 전이 가능성

incident commander, tech lead, research lead의 framing이 팀 전체 output에 상관 오류를 만드는 경우에 전이된다.

### 가설 33 — worker의 높은 brief 충실도가 잘못된 frame을 더 완성했다

근거 강도: 강한 후보

#### 가설

worker는 source, criteria, protected center를 충실히 따랐다. 실행 품질이 높았기 때문에 잘못된 frame이 더 완결되고 여러 검증을 통과했다.

#### 지지 근거

- Current worker는 합의 위계를 정확히 구현하고 별도 검증까지 했다.
- A writer도 A 구조 충실도 `PASS`를 받았다.
- 사용자는 결과의 polish보다 frame을 거부했다.

#### 반대 근거 또는 대안 설명

- worker가 brief를 임의로 바꾸면 역할 충돌이 생긴다.
- frame 감지는 main/reviewer 책임이지 writer 책임이 아닐 수 있다.

#### 확인 질문

- worker에게 brief contradiction이나 missing motive를 보고할 권한은 있는가?
- execution role과 upstream critique role을 같은 agent에 둘 것인가?

#### 전이 가능성

정확히 잘못된 spec을 구현하는 coding agent, data pipeline, automation에 전이된다.

### 가설 34 — reviewer와 main이 같은 언어와 분류를 공유해 새 관찰이 회수 과정에서 흡수됐다

근거 강도: 중간

#### 가설

reviewer가 다른 관찰을 내도 main이 `중심 유지/변경`, `장면/구조`, `채택/보류`라는 기존 분류로 즉시 회수하면서 새로운 문제 이름이 사라졌다.

#### 지지 근거

- 독립 판별 원리는 결과를 main 언어로 바로 합치지 말라고 이미 기록했다.
- A의 다른 중심도 main 회수에서 기존 active-state 대비 선택으로 정리됐다.

#### 반대 근거 또는 대안 설명

- main adjudication은 실제 적용을 위해 필요하다.
- A 보고 원문은 별도로 보존됐다.

#### 확인 질문

- reviewer 원문과 main 해석을 사용자가 함께 보기 전에 어떤 압축이 일어났는가?
- 새 관찰을 일정 시간 별도 상태로 유지할 필요가 있는가?

#### 전이 가능성

multi-agent synthesis에서 minority report가 main taxonomy에 흡수되는 문제로 전이된다.

### 가설 35 — 사용자의 러프한 품질 신호가 익숙한 workflow 언어로 너무 빨리 번역됐다

근거 강도: 강한 후보

#### 가설

사용자의 “왜 current를 만들었는지 없다”, “뭔가 이상하다”, “근본적으로 보라”는 신호를 assistant가 곧바로 `Material 생략`, `source+result review`, `goal` 같은 익숙한 범주로 바꿨다. 번역 과정에서 아직 이름 없는 원인이 사라졌다.

#### 지지 근거

- Material 생략 오진이 즉시 발생했다.
- 사용자는 이후에도 “그보다 더 근본적”, “Material만이 아니다”, “최소 범위가 아니다”라고 반복 정정했다. `[현재 대화 직접 근거]`
- 기존 self-check 사례에서도 “더 근본적”을 “더 추상적”으로 읽은 실패가 있었다.

#### 반대 근거 또는 대안 설명

- 작업하려면 rough signal을 어느 정도 구조화해야 한다.
- 사용자의 뒤 발언도 goal, criteria, evaluator 같은 workflow 언어를 직접 사용했다.

#### 확인 질문

- 구조화 전에 사용자의 관찰을 가능한 원인 여러 개로 보존했는가?
- 번역한 용어가 무엇을 추가하고 무엇을 지웠는가?

#### 전이 가능성

사용자 bug report를 기존 issue category로 너무 빨리 분류하거나 qualitative feedback을 metric 하나로 환원하는 경우에 전이된다.

## 완결 결과와 workflow에 관한 가설

### 가설 36 — 완결된 결과를 acceptance로 오해했다

근거 강도: 강함

#### 가설

사용자가 전체 품질을 볼 수 있도록 완결본을 만드는 계약이, 여러 cycle에서 `완성됐으니 다음은 polish/selection`이라는 완료 감각으로 바뀌었다.

#### 지지 근거

- near-final v3, public reshape, Current rewrite가 각각 완료 또는 near-final 언어를 가졌다.
- 사용자 실제 읽기 뒤 판정이 여러 번 뒤집혔다.
- Current blind `light edit`가 완료 신호가 됐다.

#### 반대 근거 또는 대안 설명

- process는 사용자 검토 대기를 명시한 경우가 많다.
- 완결본이 없으면 사용자의 직관적 판단 자체가 어려웠다.

#### 확인 질문

- artifact completeness, evaluation completeness, user acceptance를 어떻게 별도로 기록할 것인가?
- 완결본 뒤 기본 다음 행동은 selection인가, diagnosis인가?

#### 전이 가능성

feature complete와 product accepted, test complete와 production ready를 구분하는 문제로 전이된다.

### 가설 37 — 완결 결과를 upstream 판단 체계의 probe로 사용하지 않았다

근거 강도: 강함

#### 가설

결과를 보고 “무엇을 고칠까”는 물었지만 “이 결과가 현재 goal, context, constraints, evaluation 중 무엇이 잘못됐음을 보여 주는가”를 체계적으로 묻지 않았다.

#### 지지 근거

- 여러 cycle은 다음 rewrite 범위를 정했지만 같은 frame이 유지됐다.
- A/B 뒤에야 packet과 frame이 문제로 명시됐다.
- 사용자는 완결 결과 뒤 어느 단계나 판단으로 돌아갈지 일반화하고 싶다고 했다. `[현재 대화 직접 근거]`

#### 반대 근거 또는 대안 설명

- post-v3 sync와 public audit은 실제로 upstream 기준 일부를 다시 봤다.
- 모든 약한 결과가 upstream 문제를 뜻하지는 않는다.

#### 확인 질문

- 결과의 어떤 패턴이 local defect와 system defect를 구분하는가?
- upstream을 다시 열 때 전체를 여는가, 원인 후보만 여는가?

#### 전이 가능성

prototype, benchmark result, failed test를 requirement·architecture·evaluation 개선에 사용하는 작업에 전이된다.

### 가설 38 — 여러 rewrite가 같은 frame의 path dependence를 강화했다

근거 강도: 중간

#### 가설

한 번 선택된 Q1~Q5와 authority separation이 버전·review·active-state·source packet에 반복되며 “이미 많이 검증된 중심”이 됐다. 각 cycle의 개선이 다음 cycle의 starting point를 더 강하게 고정했다.

#### 지지 근거

- Q1~Q5는 v1~v3, post-sync, near-final, public reshape, Current rewrite, A/B까지 반복됐다.
- 사용자 sync는 유일한 중심으로 고정하지 말라고 했지만 다시 중심이 됐다.

#### 반대 근거 또는 대안 설명

- 반복된 것은 source-supported 대표 사건이기 때문일 수 있다.
- 각 cycle은 기존 version을 덮지 않고 새 v1로 시작하기도 했다.

#### 확인 질문

- 새 cycle이 이전 결과를 실제로 가리고 source-first로 시작했는가?
- 반복 노출 자체가 선택 확률을 높였는가?

#### 전이 가능성

legacy architecture, prompt iteration, model fine-tuning에서 이전 solution이 search space를 제한하는 경우에 전이된다.

### 가설 39 — 판단 분리와 산출물 분할을 혼동했다

근거 강도: 강한 후보

#### 가설

“단계를 나눈다”는 말을 작은 draft 여러 개와 사용자 승인으로 해석했다가, 사용자가 완결 v1을 원하자 반대로 모든 책임을 한 번에 처리했다. 실제 필요는 artifact를 쪼개는 것이 아니라 탐색·구성·평가를 다른 판단 위치와 시점에서 보는 것이었다.

#### 지지 근거

- post-v3 sync가 Material·Shaping·Texture를 한 v1 안의 책임으로 정의했다.
- 사용자는 완결본과 단계 재진입이 양립할 수 있는지 물었다. `[현재 대화 직접 근거]`

#### 반대 근거 또는 대안 설명

- 실제 workflow 문서에는 역할 분리가 이미 있었다.
- 문제는 분리 자체보다 upstream feedback edge 부재일 수 있다.

#### 확인 질문

- 어떤 판단을 누가 언제 하는가?
- 그것을 위해 별도 artifact가 반드시 필요한가?
- 같은 artifact를 다른 reviewer가 보는 것으로 충분한가?

#### 전이 가능성

설계·구현·test를 commit 단위로 쪼개는 것과 역할 독립성을 혼동하는 coding workflow에 전이된다.

### 가설 40 — 결과 결손을 어느 upstream 책임으로 돌릴지 판별하는 연결이 없었다

근거 강도: 강함

#### 가설

review 결과에서 source, material, shaping, goal, constraints, evaluation, role 중 무엇을 다시 열지 결정하는 명시적 진단이 없었다. 그래서 전체 rewrite를 시작하거나 익숙한 단계로 돌아가는 선택이 반복됐다.

#### 지지 근거

- Material 생략이라는 빠른 오진.
- 사용자는 “전체 뒤 단계 분석인가, 종합 처리인가”를 물었다. `[현재 대화 직접 근거]`
- 기존 review-workflow는 center를 reopen할 수 있으나 구체적인 return 판단은 약하다.

#### 반대 근거 또는 대안 설명

- 너무 명시적인 router를 만들면 무거운 workflow가 될 수 있다.
- 숙련된 main의 종합 판단으로 충분한 경우도 있다.

#### 확인 질문

- 어떤 관찰이 source selection, goal, evaluation, artifact 각각을 의심하게 하는가?
- 모든 단계를 점검하지 않고 최초 문제 위치를 찾는 질문은 무엇인가?

#### 전이 가능성

debugging에서 symptom에서 component를 localize하고 필요한 layer만 다시 여는 방식에 전이된다.

### 가설 41 — 모든 단계를 처음부터 다시 하는 것도 같은 frame을 더 길게 반복할 수 있다

근거 강도: 반대 가설로 중요

#### 가설

사용자가 evaluator가 첫 단계부터 다시 해봐야 했는지 물었지만, 같은 goal과 source frame으로 전체 workflow를 재실행하면 비용만 늘고 같은 결과를 더 확신할 수 있다. 질문 자체는 `[현재 대화 직접 근거]`다.

#### 지지 근거

- 이미 여러 complete cycle과 full material pass가 있었다.
- post-sync와 near-final은 상당히 넓은 재수행이었다.
- 같은 frame 안 self-check가 기존 방향을 더 정교하게 변호할 수 있다는 기존 관찰이 있다.

#### 반대 근거 또는 대안 설명

- 독립된 source-first evaluator가 처음부터 문제를 재구성하면 다른 frame이 나올 수 있다.
- 현재 A/B는 source universe 자체가 좁았으므로 진짜 full restart가 아니었다.

#### 확인 질문

- restart에서 무엇이 실제로 독립적인가?
- 기존 goal·source·criteria를 가리거나 challenge할 권한이 있는가?

#### 전이 가능성

CI rerun, model retry, fresh agent run에서 동일 input을 반복하는 것과 독립 재구성을 구분하는 데 전이된다.

### 가설 42 — 완료와 전진 압력이 탐색을 너무 빨리 닫았다

근거 강도: 중간~강함

#### 가설

assistant와 workflow가 다음 산출물, 다음 version, 최소 반영 범위를 빠르게 제안하는 경향을 보였다. 사용자의 rough signal을 충분히 펼치기 전에 action plan으로 닫았다.

#### 지지 근거

- Material 생략 진단 뒤 즉시 새 partner/reviewer를 돌리려 했다.
- 사용자가 더 근본적인 논의를 요청했는데 assistant가 반복해서 한 원리와 최소 범위로 압축했다. `[현재 대화 직접 근거]`
- 마지막에는 사용자가 “왜 자꾸 최소 범위냐”고 직접 정정했다. `[현재 대화 직접 근거]`

#### 반대 근거 또는 대안 설명

- 사용자는 실제 작업과 결과물을 원하며 끝없는 분석을 원하지 않는다.
- 실행 압력이 없으면 연구 workspace가 수거되지 않을 수 있다.

#### 확인 질문

- 현재 단계의 성공은 action인가, candidate expansion인가?
- 사용자가 “생각해보자”고 했을 때 어떤 종류의 산출물이 적절한가?

#### 전이 가능성

AI agent의 progress bias, premature implementation, issue closure에 전이된다.

### 가설 43 — workflow 단계 이름이 원인 분석을 대신했다

근거 강도: 강한 후보

#### 가설

결과에서 motive가 빠지자 `Material 누락`, 흐름이 약하면 `Shaping`, 문장이 평평하면 `Texture`라고 부르는 식으로 stage taxonomy가 causal diagnosis를 대신했다.

#### 지지 근거

- Material 생략 오진이 직접 발생했다.
- 사용자는 “더 자세히 봐봐, 좋은 글의 조건 있잖아”라고 정정했다.
- 현재 논의에서도 Material로 돌아가기만으로 좁히지 말라고 했다.

#### 반대 근거 또는 대안 설명

- 단계 이름은 책임을 찾는 유용한 시작점이다.
- 실제로 특정 stage responsibility가 누락된 경우도 있다.

#### 확인 질문

- stage label 아래 실제로 빠진 판단은 무엇인가?
- 같은 symptom이 다른 stage 원인에서 나올 수 있는가?

#### 전이 가능성

`frontend bug`, `data issue`, `prompt problem` 같은 component label이 root cause를 대신하는 경우에 전이된다.

## 압축, 설명, 학습에 관한 가설

### 가설 44 — 압축이 motive·lineage·author agency를 잘라냈다

근거 강도: 강함

#### 가설

사실 방어, 반복 축소, 한 중심, public-safe 변환을 거치며 사용자의 살아 있는 문제의식과 판단 과정이 주변 설명으로 줄었다.

#### 지지 근거

- post-v3 sync가 v1/backlog material이 압축 과정에서 줄었다고 기록했다.
- near-final/public reshape에서 내부 보고서 같은 느낌이 반복됐다.
- Current는 구조와 artifact는 늘었지만 발생 이유와 저자 판단이 빠졌다.

#### 반대 근거 또는 대안 설명

- 긴 material을 모두 넣으면 글이 산만해질 수 있다.
- 문제는 양적 압축보다 잘못된 중심 선택일 수 있다.

#### 확인 질문

- cut된 문장 중 중심 인과를 만드는 것은 무엇이었는가?
- 반복을 줄이면서 motive와 judgment를 보존하는 최소 scene은 무엇인가?

#### 전이 가능성

session summary, design doc, incident report에서 의사결정 이유가 삭제되는 문제로 전이된다.

### 가설 45 — 일반화를 너무 빨리 몇 개 원칙으로 수거했다

근거 강도: 현재 작업 방식에 대해 강함

#### 가설

복잡한 실패를 `결과와 판단 체계를 분리한다`, `Material로 돌아간다`, `최소 세 파일을 고친다` 같은 소수 결론으로 일찍 정리해 경쟁 원인과 구체 감각을 잃었다.

#### 지지 근거

- 사용자는 계속 “더 근본적”, “최대한 펼치고 수거”, “최소 범위가 아니다”라고 정정했다. `[현재 대화 직접 근거]`
- 기존 candidate history에서도 특징 한 줄이 평가 anchor가 된 문제가 있었다.

#### 반대 근거 또는 대안 설명

- 결국 core에는 사용 가능한 수준의 수거가 필요하다.
- 지나친 확장은 사용자가 부담스러워한 층위 과다를 만들 수 있다.

#### 확인 질문

- 아직 합치면 안 되는 가설은 무엇인가?
- 수거할 준비가 됐다는 증거는 무엇인가?

#### 전이 가능성

postmortem의 단일 root cause, research summary의 세 가지 takeaway, architecture principle의 과도한 압축에 전이된다.

### 가설 46 — “근본적”을 “추상적”으로 읽었다

근거 강도: 강함

#### 가설

사용자가 결과를 만든 결정 위치로 돌아가라고 했는데 assistant가 더 큰 AI 일반론이나 상위 workflow 용어로 올라갔다. 설명은 커졌지만 실제 인과 위치는 보지 못했다.

#### 지지 근거

- 기존 self-check 후보의 대표 실패와 동일하다.
- 이번 대화에서도 사용자는 surface omission 설명 뒤 더 근본적으로 보라고 반복했다. `[현재 대화 직접 근거]`
- Material stage라는 상위 라벨로 올라갔다가 정정됐다.

#### 반대 근거 또는 대안 설명

- 일반화 자체가 현재 core 연구의 목표다.
- 인과 위치와 일반 원리는 함께 남길 수 있다.

#### 확인 질문

- 이 원리가 어떤 실제 decision을 다시 보게 만드는가?
- 구체 장면 없이도 발동 조건과 반례를 설명할 수 있는가?

#### 전이 가능성

bug를 “communication problem”, “complexity”, “AI hallucination” 같은 큰 말로 닫는 모든 작업에 전이된다.

### 가설 47 — 사용자의 학습 목표가 artifact 개선 goal에 포함되지 않았다

근거 강도: 중간~강함

#### 가설

기존 workflow는 좋은 글과 원본 core 반영을 목표로 했지만, 사용자가 이번 논의에서 자기 사고를 구체화하고 나중에 역량을 복원하려는 목적은 별도 goal로 다뤄지지 않았다. 그래서 결과 규칙과 최소 수정만 남기려 했다. 사용자의 학습 목적은 `[현재 대화 직접 근거]`다.

#### 지지 근거

- 사용자는 실컷 논의하고 기준만 고치면 배우지 못한다고 말했다.
- core에 감각, 절차, 사고 방식, 예시와 반례를 남기고 싶어 했다.
- assistant의 첫 map은 최종에 최소 파일 반영 범위를 제안했다.

#### 반대 근거 또는 대안 설명

- core가 너무 서사적이면 반복 실행 기준으로 쓰기 어려울 수 있다.
- process가 학습 계보를 소유하고 core는 짧게 유지하는 구조도 가능하다.

#### 확인 질문

- 학습 복원에 꼭 필요한 사례·대비·질문은 무엇인가?
- core와 process가 각각 무엇을 소유해야 다시 읽기 쉬운가?

#### 전이 가능성

postmortem, engineering playbook, 개인 학습 archive를 설계하는 작업에 전이된다.

## Current와 Alex에 특화된 가설

### 가설 48 — Q1~Q5가 구체적이고 반복 사용된 장면이라 과도한 인지 우위를 가졌다

근거 강도: 강함

#### 가설

Q1~Q5는 질문 개수, 전후 시간축, source mapping, actor가 있어 쓰고 검증하기 쉽다. 여러 draft와 review에 등장해 familiarity가 높아졌고, Current를 설명할 때 자동으로 대표 장면이 됐다.

#### 지지 근거

- v1~v3부터 A/B까지 반복 등장했다.
- blind reviewer가 더 펼치라고 했고 worker brief의 주 장면이 됐다.
- 사용자는 “저 다섯 문항은 왜 이렇게 꽂혔냐”고 직접 물었다.

#### 반대 근거 또는 대안 설명

- Q1~Q5는 실제로 whole map의 필요와 한계를 동시에 보여 주는 좋은 stress test일 수 있다.
- 문제는 앞에 motive와 whole hackathon을 두지 않은 배열일 수 있다.

#### 확인 질문

- Q1~Q5를 제거한 material map에서도 Current의 가치와 mechanism이 성립하는가?
- 복원 뒤 Q1~Q5가 맡을 정확한 역할은 무엇인가?

#### 전이 가능성

가장 잘 문서화된 bug가 product narrative 전체를 대표하는 경우에 전이된다.

### 가설 49 — Current의 긍정 효용은 인과 증명이 약해 실패 장면보다 쉽게 밀렸다

근거 강도: 강함

#### 가설

사용자는 current가 실제로 도움이 됐다고 느꼈지만 current 하나의 효과를 분리한 대조군은 없었다. claim ceiling을 엄격히 적용할수록 Q1~Q5와 terminal gap처럼 직접 증명되는 한계가 더 중심에 남았다.

#### 지지 근거

- criteria history가 이 과보정을 직접 정정했다.
- current 효용은 개인 경험으로, Q1~Q5는 direct process로 더 강하게 지원됐다.
- 여러 draft가 실패/한계 장면을 앞세웠다.

#### 반대 근거 또는 대안 설명

- 개인 경험을 중심으로 쓰되 인과를 제한하는 방법이 있다.
- public 글에는 concrete mechanism과 scene이 필요하다.

#### 확인 질문

- “도움이 됐다”를 어떤 경험 주장으로 정직하게 쓸 수 있는가?
- mechanism 설명과 causal proof를 어떻게 구분하는가?

#### 전이 가능성

qualitative user value가 quantitative proxy보다 낮게 취급되는 product evaluation에 전이된다.

### 가설 50 — Alex의 scaffolding과 quality loop를 하나의 모범 workflow로 합치려 했다

근거 강도: 위험 가설

#### 가설

Alex 사례에서 작업 전 scaffolding과 약한 output 뒤 evaluation refinement가 모두 인상적이어서, 이를 하나의 end-to-end 정답으로 가져오려는 유혹이 생겼다. 그러면 Current의 발생 계보와 이번 core의 quality-loop 참고 역할이 섞인다.

#### 지지 근거

- 사용자는 Alex를 두 맥락에서 언급했다.
- 실제 원본에는 scaffolding, human intervention, loop engineering이 모두 나온다.
- 사용자는 surface copy가 아니라 합의된 해석만 가져오라고 명시했다.

#### 반대 근거 또는 대안 설명

- 두 역할은 실제로 연결된다. scaffolding이 output을 만들고 output이 scaffolding/criteria를 다시 고치게 할 수 있다.
- 분리만 강조하면 전체 작동 관계를 놓칠 수 있다.

#### 확인 질문

- Current 글에서는 Alex의 어느 장면이 발상 계보인가?
- core에서는 어느 행동이 quality 개선 원리의 evidence인가?
- 둘을 함께 쓸 때 역할을 어떻게 명시할 것인가?

#### 전이 가능성

한 사례에서 architecture, process, evaluation을 모두 가져올 때 각 역할과 근거 범위를 나누는 문제로 전이된다.

### 가설 51 — 고정 goal에 맞추는 개선과 goal 자체를 개선하는 일을 구분하지 않았다

근거 강도: 강한 일반화 후보

#### 가설

기존 cycle은 현재 중심을 고정하고 결과를 그 중심에 맞췄다. 그러나 약한 결과는 중심·scope·evaluation이 잘못됐다는 관찰일 수 있다. quality improvement를 fixed-goal optimization으로만 봤다.

#### 지지 근거

- Current worker와 B는 protected center 안에서 좋은 결과를 만들었다.
- 사용자는 결과 뒤 goal과 criteria를 다시 물었다. `[현재 대화 직접 근거]`
- Alex는 약한 solution 뒤 자신의 scope constraint와 evaluation을 바꿨다.

#### 반대 근거 또는 대안 설명

- 결과가 마음에 안 들 때마다 goal을 바꾸면 실패를 합리화하거나 수렴하지 못할 수 있다.
- top-level user purpose와 작업 가설은 다르게 다뤄야 한다.

#### 확인 질문

- 어떤 evidence가 결과 defect보다 goal defect를 지지하는가?
- goal 변경 권한은 누구에게 있는가?
- 변경 전후를 어떤 artifact로 비교하는가?

#### 전이 가능성

optimization, agent loop, product discovery, research question refinement 전반에 전이된다.

### 가설 52 — 하나의 근본 원인이 아니라 여러 원인이 순차적으로 상호작용했다

근거 강도: 매우 중요한 대안

#### 가설

이번 품질 정체는 다음이 연쇄적으로 작동했을 수 있다.

1. 사용자 목적 일부는 있었지만 일부 계보는 불완전했다.
2. 작업 가설이 Q1~Q5 중심으로 굳었다.
3. 그 가설을 기준으로 source packet을 골랐다.
4. writer와 reviewer가 같은 frame 안에서 다른 역할을 수행했다.
5. 각 pass의 범위가 전체 완료로 확대됐다.
6. 완결 결과를 upstream 판단 probe보다 다음 수정 대상으로 썼다.
7. 사용자 거부 뒤 익숙한 stage label로 빠르게 진단했다.
8. 일반화 단계에서도 최소 원칙으로 일찍 압축했다.

#### 지지 근거

- 어느 단일 가설도 모든 cycle을 충분히 설명하지 못한다.
- material synthesis와 review가 있어도 실패했고, context를 가려도 실패했으며, lenses를 더해도 실패했다.
- 사용자 정정도 한 방향 반전보다 역할·시점·권한 분리를 반복 요구했다.

#### 반대 근거 또는 대안 설명

- 너무 많은 원인을 나열하면 실제 leverage point를 찾지 못할 수 있다.
- 중심 causal bottleneck이 하나 있고 나머지는 증상일 가능성도 있다.

#### 확인 질문

- 각 장면에서 최초로 결과를 바꿀 수 있었던 결정 지점은 어디였는가?
- 어떤 원인을 제거하면 downstream 문제가 함께 사라지는가?
- 어떤 원인은 독립적으로 재발할 수 있는가?

#### 전이 가능성

복잡한 socio-technical AI workflow에서는 single root cause보다 interacting conditions가 더 타당할 수 있다. 다만 최종 대응은 원인 수만큼 절차를 늘리는 것이 아니라 leverage가 큰 판단을 골라야 한다.

## 서로 합치면 안 되는 가설 쌍

수거 단계에서도 아래는 증거 없이 하나로 합치지 않는다.

### Material 부재와 Material 전달 실패

- 없어서 못 쓴 것
- 있었지만 task/review에 들어오지 않은 것
- 들어왔지만 낮은 권위로 작동하지 않은 것

은 다른 원인이다.

### Goal 부재와 goal 진화

- 처음부터 필요한 목적이 있었는데 놓친 것
- 결과를 보며 사용자가 새 목적을 발견한 것

을 같게 보면 책임과 workflow가 달라진다.

### context 과다와 context 부족

둘은 반대 해결책이 아니라 review 역할마다 다른 실패다.

### criteria 부족과 criteria 과잉

빠진 기준을 추가하는 일과 기존 frame을 criteria가 강화한 일을 구분해야 한다.

### reviewer 독립성과 reviewer 정보량

정보를 적게 주는 것이 독립성 전체가 아니다. source universe와 질문 권한이 다르면 더 많은 direct source를 봐도 독립적일 수 있다.

### artifact completeness와 judgment completeness

완결 결과는 전체 품질을 볼 수 있게 하지만, goal·context·evaluation이 적절했다는 보증은 아니다.

### stage separation과 artifact fragmentation

판단 책임을 나누기 위해 초안을 여러 조각으로 만들 필요는 없다.

### result correction과 criteria/goal correction

결과가 약하다고 항상 evaluation을 바꿔서도 안 되고, 항상 결과만 다시 써서도 안 된다.

### Alex의 확인된 행동과 우리의 일반화

원본에서 확인한 scope·criteria 갱신과, 그것을 AI-native quality loop로 해석하는 일은 별도다.

## 다음 수거 전에 필요한 대조

- Current 외 다른 네 글의 실패에서도 같은 가설이 실제로 나타났는가?
- 글쓰기 아닌 coding/research 사례에서 `결과가 frame을 시험하는 probe`였던 성공·실패 사례가 있는가?
- 사용자 목적, 작업 가설, result goal, evaluation criteria를 구분하면 실제 brief가 어떻게 달라지는가?
- A/B source packet을 결과물과 독립적으로 다시 구성하면 중심 후보가 달라지는가?
- reviewer가 packet과 goal을 기각할 권한을 가졌을 때 noise와 비용은 얼마나 커지는가?
- 완결본 뒤 local defect와 upstream defect를 구분한 실제 사례가 있는가?
- criteria update가 실제 다음 결과를 바꾼 사례와 같은 frame을 강화한 반례를 함께 찾을 수 있는가?
- core가 규칙과 학습을 함께 소유할 때 active-state·process·source와 중복되지 않는 형태는 무엇인가?
