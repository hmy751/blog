---
작성일: 2026-08-01
성격: AI self-check 기존 src 기반 전체 원고 개선 cycle 계획
공개상태: 내부 작업 문서
현재상태: 실행 완료 / 최대 5회 cycle과 evidence pass / 사용자 checkpoint 대기
---

# AI self-check 기존 src 기반 전체 원고 개선 계획

## 실행 결과

이 계획은 [2026-08-02 통합 원고 개선 cycle](./shaping/2026-08-02-ai-self-check-integrated-draft-loop/README.md)에서 실행했다. Round 0의 저자·원고 지도 뒤 완결본을 다섯 회차까지 개선했고, 최종 evidence check와 국소 regression에서 P0·P1이 남지 않은 후보를 현재 `src/ai-self-check.md`에 반영했다.

실행 중 같은 writing worker는 Round 04 뒤 agent turn 상한에 도달해 Round 05의 합의된 두 국소 move를 Main이 직접 적용했다. 현재 thread의 agent 상한으로 Round 05용 collaboration reviewer도 처음에는 만들지 못했지만, 완료 감사에서 이전 작업 맥락이 없는 standalone ephemeral·read-only Codex를 단독 reviewer로 실행해 fresh 전체 판정을 회수했다. Material은 Pass, Shaping·Texture·Reader Flow는 국소 Partial, 고우선 blocker는 없었다. Main의 최종 회수 뒤 evidence regression도 P0·P1 없이 끝났다. 현재 남은 종료 조건은 사용자의 원고 checkpoint다.

## 계획을 넓힌 이유

처음에는 완료된 Material·Shaping을 고정하고 Texture와 Reader Flow만 개선하려 했다. 그러나 실행 전 사용자 인터뷰에서 현재 원고가 충분히 담지 못한 저자 판단이 다시 드러났다.

- 사용자는 언제나 완성된 정답을 들고 AI를 교정한 것이 아니었다.
- 먼저 일을 하며 생긴 어긋남을 느끼고, AI가 내놓은 후보 해석을 승인하거나 다시 정정하면서 기준을 더 분명히 한 때가 있었다.
- 정확한 메타 분석과 언어를 얻은 것 자체에는 가치가 있었지만, 그 직후 중심이 다시 흔들리거나 과교정되는 일도 있었다.
- fresh한 별도 판별은 여전히 유용했지만, Main의 회수와 입력 포장, 호출 비용에는 한계가 있었다.
- `기준을 완성하지 못한 사람과 AI가 어떻게 sync하는가`라는 이해는 최초 설계 의도가 아니라, 이후에도 AI를 계속 다루면서 뒤늦게 선명해진 현재의 깨달음이다.

이 재료는 문장 호흡만 고쳐서는 들어갈 수 없다. 현재 src를 버리지는 않되 Material, Shaping, Texture를 모두 다시 볼 수 있는 전체 원고 개선으로 범위를 넓힌다.

## Goal과 대상

Goal은 이전에 합의한 문장을 유지한다.

> AI가 결론을 고쳤거나 잘못을 인정했다는 데서 멈추지 않고, 독자가 자신의 AI 협업에서 문제 정의·전제·입력 범위·작업 순서·다음 행동 중 무엇이 실제로 달라졌는지 판별할 수 있게 하는 글. 읽은 뒤에는 최근 대화 하나를 다시 열어, 답이 아니라 답을 만든 판단 위치를 확인하고 다음 동작 하나를 바꿔 본다.

대상은 AI와 일하며 판단과 통제 방식을 고민하는 개발자다.

이번 개선에서는 같은 Goal에 다음 저자 경험을 함께 연결한다.

- 사용자가 정답을 미리 알고 채점하는 사람으로만 보이지 않는다.
- 어긋남의 감각, AI의 후보 해석, 사용자의 승인·재정정, 다음 행동의 변화가 이어지는 실제 sync를 보여 준다.
- 당시 source로 확인되는 사실과 지금 생긴 회고를 시간축에서 분리한다.
- self-check를 늘 부르는 일반 도구로 넓히지 않고, 직접 대화·즉시 교정·별도 판별을 상황에 따라 구분한다.

## 현재 src를 사용하는 방식

최신 [AI self-check 원고](../src/ai-self-check.md)를 출발점으로 삼는다. 전면 백지 재작성은 아니지만 모든 절과 문단은 개선 대상으로 다시 열 수 있다.

우선 보호할 것은 다음과 같다.

- AI가 자기 탐색과 판단을 오류의 원인에서 빼는 문제
- `문제 인식 → self-check를 만듦 → 실제 사용에서 한계를 봄 → 운영을 바꿈`이라는 배경 흐름
- 진단 정확도, 직후 행동 변화, 장기 재발 감소를 구분하는 판단
- fresh 판별, Main의 회수, 사용자 판단이 서로 대신하지 않는다는 발견
- 독자가 자기 대화의 판단 위치와 다음 행동을 다시 보는 결말의 역할

다음은 열어 둔다.

- 더 좋은 직접 원천이 있을 때의 최초 사건 후보
- 중후반 절 순서와 문단 역할
- 각 사건 안에서 사용자가 무엇을 좋게 봤고 어디서 한계를 느꼈는지의 배치
- 과교정을 한 번의 반대 결론이 아니라 중심을 잃고 오가는 경험으로 더 정확히 쓰는 방식
- 계속 사용하며 뒤늦게 선명해진 이해를 넣을 위치와 분량
- 소제목, 리듬, 운영 명사, 도식과 리스트의 필요성

대표 사건, 큰 구조, 글의 중심, 사용자 경험의 의미를 실제로 바꾸려면 Main이 사용자와 먼저 맞춘다.

## 원고를 쓰기 전 저자·원고 지도

사용자 인터뷰를 마친 뒤 바로 원고를 고치지 않는다. Main이 현재 src, [저자 판단 인터뷰](./2026-08-01-ai-self-check-author-judgment-interview.md), [생성 계보 source packet](../sources/ai-self-check-origin-and-operation.md), 필요한 직접 원천을 대조해 짧은 지도를 만든다.

지도에는 다음을 구분한다.

1. 현재 원고의 중심과 작동하는 장면
2. 사용자가 직접 확인한 경험과 현재의 깨달음
3. 당시 source로 확인된 사실
4. 기억 후보 또는 아직 열어 둘 부분
5. 원고에 빠진 저자 판단과 장면 디테일
6. 보호할 흐름과 다시 열 구조
7. 작성 worker가 한 편의 원고에서 해결해야 할 우선 과제

이 지도는 확정 목차나 문장 지시서가 아니다. 사용자 경험을 잘못 고정하지 않고 작성 worker가 전체 글을 판단할 수 있게 하는 입력이다. Main은 지도를 사용자에게 먼저 보여 주고, 중심·경험·열린 기억이 맞는지 짧게 sync한 뒤 작성으로 넘어간다.

## 역할과 권한

### 사용자 — 실제 저자

- 글에 들어갈 경험과 현재 회고의 권위를 가진다.
- 대표 사건, 큰 구조, 중심, 자신의 경험 의미가 달라질 때 판단한다.
- 매 회차의 세부 수정 카드를 모두 고르지 않고, 완결된 수정본이 여전히 `내 얘기 같다`고 느껴지는지와 잘못 해석된 지점을 교정한다.
- reviewer의 통과 판정으로 대체되지 않는다.

### Main — 인터뷰어·편집자·회수자

- 사용자 인터뷰를 진행하고 원문을 보존한다.
- 인터뷰, source, 현재 src를 대조해 저자·원고 지도를 만든다.
- 작성 worker에게 Goal, 지도, 원천 접근점과 변경 권한을 준다.
- reviewer 결과를 채택·조정·기각·보류하고, 받아들인 수정만 작성 worker에게 다시 전달한다.
- 최종 반영과 완료 판정, 사용자 checkpoint, active-state 갱신을 맡는다.

Main은 reviewer의 보고를 그대로 작성 지시로 전달하지 않는다. 원천과 사용자 판단에 대조한 뒤, 이번 수정본에서 실제로 해결할 brief로 바꾼다.

### 작성 worker — 완결된 수정본 작성

작성 worker는 공개 글의 실제 저자를 대신하지 않는다. 사용자의 경험과 Main이 맞춘 지도를 바탕으로 한 편의 완결된 후보 원고를 만드는 작업자다.

입력:

- 현재 src 고정본
- 이번 Goal과 대상
- 저자·원고 지도
- 사용자 인터뷰 원문
- 생성 계보 source packet과 source index
- 지도에서 필요하다고 표시한 직접 원천
- 현재 작업에 필요한 editorial 기준

권한과 제약:

- process cycle 안에 완결된 후보 원고를 쓴다.
- 일부 문장 polish가 아니라 글 전체에서 장면, 저자 판단, 구조, Texture를 함께 개선한다.
- 기억 후보를 당시 사실처럼 채우지 않고, 현재 회고는 시간 표지를 둔다.
- 중심이나 대표 사건을 바꿀 필요가 생기면 임의로 확정하지 않고 Main에 변경 이유와 대안을 보고한다.
- `src`의 최종 교체와 완료 선언은 하지 않는다.

작성 worker는 한 cycle 안에서는 기본적으로 같은 주체를 유지한다. 글의 판단과 목소리를 회차마다 처음부터 다시 만들지 않기 위해서다. 다만 같은 고우선 어긋남을 두 회차 연속 되풀이하면 worker를 바로 교체하기보다 지도, Main의 brief, 실제 수정 위치를 먼저 점검하고 필요할 때만 새 작성 worker로 바꾼다.

작성 worker에게 fresh reviewer의 원문 report를 통째로 주지 않는다. Main이 회수해 채택한 수정 brief만 전달한다.

작성 worker는 기존 `blog-material-partner`, `blog-shaping-editor`, `blog-texture-keeper`가 아니다. 이 writing agent들은 report-only 계약을 유지한다. 이번 cycle에서는 원고 후보 작성만 맡는 별도 generic worker에게 위 입력과 process cycle 안의 후보 원고 소유권을 준다.

### Fresh reviewer — 한 원고를 판단면별로 판정

각 회차에는 이전 회차를 보지 않은 fresh reviewer 한 명을 둔다. Material reviewer, Shaping reviewer, Texture reviewer를 순서대로 따로 호출하지 않는다. reviewer는 해당 회차의 완결된 원고 하나를 한 번 읽고, 결과를 책임별로 나눠 보고한다.

이 reviewer의 제1 역할은 사실 감사가 아니라 원고 개선이다. 먼저 현재 원고를 가장 크게 끌어올릴 개선 축과 그 축을 실제로 바꿀 move를 찾아야 한다. Source 대조는 살아 있는 material을 더 찾고, 근거 없는 과거 사실·인과가 개선안을 왜곡하지 않게 하는 guardrail로 사용한다. 사실 표현을 빠짐없이 감사하는 역할은 마지막 evidence checker에게 남긴다.

독자의 최소 결과가 행동이라고 해서 Retrospective를 worksheet나 사용법 문서로 자동 전환하지 않는다. 표·체크리스트·빈칸 실습은 산문과 기존 장면으로 같은 판별을 만들 수 없는지 먼저 확인한 뒤 후보로만 제안한다. Reviewer는 독자 행동뿐 아니라 저자 경험, 발견의 순서, 살아 있는 문장을 함께 개선해야 한다.

이 reviewer 역시 기존 specialist agent 하나의 역할을 넓혀 쓰지 않는다. 매 회차 일회성 generic integrated reviewer를 report-only로 두고, Material·Shaping·Texture의 판단면과 Reader Flow lens를 한 report 안에서 구분하게 한다. 새 repo·global agent를 만들지는 않는다.

입력:

- 해당 회차의 완결된 후보 원고
- 이번 대상과 독자가 얻어야 할 최소 결과로 제한한 Goal
- 생성 계보 source packet과 source index
- 이번 개선 move와 직접 연결된 쟁점이 이미 확인됐을 때만 Main이 지정한 직접 원천 접근점
- Material, Shaping, Texture에 필요한 editorial 기준과 Reader Flow lens

Improvement reviewer는 source index를 따라 전면 조사를 다시 펼치지 않는다. Packet만으로 판단할 수 없는 특정 사실·인과가 원고 개선을 막으면 그 쟁점을 보고하고, Main이 회수 단계에서 직접 원천을 열거나 다음 회차 입력으로 지정한다. Reviewer가 직접 원천을 보는 경우에도 현재 move를 판정하는 데 필요한 구간에서 멈춘다.

주지 않을 것:

- 사용자 인터뷰 원문
- 저자·원고 지도
- active-state와 process
- 이전 원고와 이전 reviewer report
- Main의 구조 가설, 변경 이유, 예상 판정
- 작성 worker가 받은 수정 brief

Goal에는 Main이 기대하는 중심, 대표 장면, 구조, 예상 결론을 넣지 않는다.

사용자 인터뷰를 주지 않는 이유는, writer가 인터뷰에서 받은 경험과 판단을 실제 원고 안에 충분히 구현했는지 독립적으로 보기 위해서다. Reviewer는 인터뷰에서만 알 수 있는 내면을 추측하거나 만들어서는 안 된다. 현재 회고가 source 사실과 다르다는 이유로 자동 탈락시키지 않고, 원고가 이를 `당시 사실`과 `지금의 이해`로 구분했는지를 본다.

Reviewer는 한 회차의 원고 하나만 보므로 이전 고정본보다 무엇이 평평해졌는지는 직접 판정하지 않는다. 현재본 안에서 보호할 질감과 평평한 구간을 보고하고, 실제 Texture 회귀는 Main이 시작 고정본·저자 지도와 대조해 회수한다.

### Evidence checker — 마지막 사실 대조

매 회차에 붙이지 않는다. 사용자와 Main이 원고의 중심·구조·Texture를 수용한 뒤, 바뀐 시점·행위 주체·인과·수치·도식과 새 사실 표현만 직접 원천에 대조한다. 저자의 현재 감각을 과거 사실처럼 바꿔 쓰지 않았는지도 함께 본다.

## Fresh review의 반환 계약

한 번의 report 안에서 다음 순서를 지킨다. 단계별로 별도 agent를 호출한다는 뜻이 아니라, 같은 완결본의 간극을 책임별로 섞지 않고 돌려준다는 뜻이다.

### 0. 이번 원고의 가장 큰 개선 축

- 한 번에 가장 크게 좋아질 중심 간극
- 그 간극이 독자의 이해·저자 판단·장면의 생동감 가운데 무엇을 막는지
- 이번 회차에서 실제로 시도할 1~3개 원고 move
- source 확인은 이 개선 축을 보강하거나 막는 경계만 기록하고, 사실 감사 전체로 확장하지 않는다.

### 1. 실제 입력 경계

- 본 원고와 source 범위
- 보지 않은 process와 사용자 인터뷰
- 추가로 넓혀 본 직접 원천과 이유

### 2. Material

- 살아 있는 배경, 장면, 실패, 대비, 저자 판단
- source에 있는데 빠졌거나 약하게 쓰인 material
- source 밖 과거 내면 추정이나 현재 회고와 당시 사실의 혼합
- 가장 큰 간극, 실제 원고 move, 이 단계의 통과 조건
- `Pass / Partial / Fail`

### 3. Shaping

- 중심 질문과 독자가 따라가는 탐구
- 사건 사이의 인과, 판단 변화, 절·문단의 역할
- 사용자가 이미 정답을 가진 심판으로만 보이는지 여부
- build / move / cut / rewrite 후보와 이 단계의 통과 조건
- `Pass / Partial / Fail`

### 4. Texture

- 보호할 살아 있는 문장, 장면, 판단의 리듬
- 운영 문서처럼 들리는 추상 명사와 반복 판정문
- polish가 경험과 발견을 평평하게 만든 곳
- 구체적인 safe edit와 이 단계의 통과 조건
- `Pass / Partial / Fail`

### 5. Reader Flow

Reader Flow는 별도 단계가 아니라 원고 전체를 처음 읽는 흐름에 적용하는 lens다.

- 독자 진입, 중반 재독, 소제목과 전환, 결말 회수
- 반복되는 본문 cadence와 영향을 받는 구간
- 실제로 역할을 바꿀 문단 move 2~3개
- `Pass / Partial / Fail`

### 6. 회수 우선순위

- 여러 책임에 동시에 걸리는 고우선 blocker
- Material을 바꾸면 무효가 될 Shaping·Texture 제안
- 이번 수정본에서 먼저 고칠 1~3개
- 각 제안이 중심·대표 사건·사용자 경험 의미 중 무엇을 바꾸는지

`좋아 보인다`, `더 짧게`, `표를 넣자` 같은 추상 조언으로 끝내지 않는다. Reviewer가 제안한 중심이나 구조도 자동 채택되지 않는다.

## 실행 순서

### Round 0 — 인터뷰 회수와 지도

- 지금까지의 사용자 인터뷰를 source와 대조한다.
- 저자·원고 지도를 만든다.
- 사용자와 중심, 확인된 경험, 현재 회고, 열린 기억을 맞춘다.
- 현재 src를 새 process cycle의 시작 고정본으로 복사한다.

Round 0은 review loop 횟수에 포함하지 않는다.

### Round 1 — 작성 worker의 전체 수정본

- 작성 worker가 지도와 직접 원천을 사용해 한 편의 완결된 수정본을 만든다.
- Main은 후보가 Goal과 변경 권한을 벗어나지 않았는지만 먼저 확인한다.
- fresh reviewer가 같은 원고를 Material, Shaping, Texture, Reader Flow로 나눠 한 report에 반환한다.

### Main 회수와 다음 수정본

Main은 한 report를 받더라도 다음 책임 순서로 회수한다.

1. Material의 source 충돌과 빠진 저자 판단을 먼저 본다.
2. Material 반영 뒤에도 유효한 Shaping 제안만 남긴다.
3. 중심과 구조가 안정된 범위에서 Texture와 Reader Flow를 적용한다.
4. 중심, 대표 사건, 큰 구조, 사용자 경험 의미가 갈리는 제안은 사용자에게 올린다.
5. 채택한 내용만 다음 작성 brief로 만들어 같은 작성 worker에게 보낸다.
6. 완결된 회수본을 사용자에게 보여 주고 `내 얘기 같다 / 문서 같다 / 내 판단이 빠졌다 / 과하게 단정했다`는 감각을 확인한다.

회수 책임의 순서는 유지하지만 각 단계를 따로 실행하고 별도 review를 반복하지 않는다. 한 원고, 한 fresh report, 한 Main 회수, 한 다음 수정본이 한 회차다.

### 후속 round

- 매 회차 reviewer는 교체한다.
- 작성 worker는 기본적으로 유지한다.
- 이전 reviewer report는 새 reviewer에게 주지 않는다.
- 사용자의 새 정정은 Main이 인터뷰 기록과 지도에 먼저 반영한 뒤 작성 brief로 옮긴다.
- 새 source가 필요하면 전체 조사를 다시 펼치지 않고 쟁점에 필요한 직접 원천만 연다.

## Loop 상한과 종료 조건

`완결된 수정본 → fresh 판단면별 review → Main 회수`를 최대 5회 실행한다. 예상 종료는 2~3회다.

다음을 모두 만족하면 5회 전이라도 끝낸다.

- 사용자가 수정본을 자신의 경험과 판단을 담은 글로 받아들인다.
- Material과 Shaping에 고우선 blocker가 없다.
- Texture와 Reader Flow가 살아 있는 장면과 판단을 평평하게 만들지 않으며, 내부 운영 문서처럼 읽히는 고우선 마찰이 없다.
- 독자가 문제 정의·전제·입력 범위·작업 순서·다음 행동 중 실제로 달라진 위치를 판별할 수 있다.
- 독자가 최근 AI 대화 하나에서 확인할 다음 동작을 얻는다.
- 현재 회고와 당시 source 사실이 섞이지 않는다.
- 마지막 evidence 대조에 새 충돌이 없다.

서로 다른 fresh reviewer가 두 회차 연속 모든 책임에서 고우선 blocker가 없다고 판정하고 사용자 checkpoint도 통과하면 조기 종료한다. 5회차에서만 처음 이 조건을 만족하면 잠정 완료로 남기고 사용자와 추가 작업 여부를 판단한다.

같은 고우선 지적이 두 회차 연속 반복되면 reviewer를 더 붙이기 전에 다음을 본다.

- 저자·원고 지도가 빠뜨린 판단
- Main이 report를 잘못 회수한 지점
- 작성 worker에게 전달한 brief와 실제 수정 위치
- source 입력 경계

## 실행 산출물

계획이 합의되면 `process/shaping/` 아래 새 cycle을 만든다.

- `00-current-src-baseline.md`
- `01-author-draft-map.md`
- `round-NN-draft.md`
- `round-NN-review.md`
- `round-NN-recovery.md`
- 사용자 checkpoint 원문
- 최종 수정 문장 evidence report
- Main이 회수한 최신 `src/ai-self-check.md`

역할별 입력 packet과 실제로 보지 않은 층위를 각 report에 남긴다. 작성 worker의 후보, reviewer report, Main 회수를 한 문서에 합치지 않는다.

## 이전 Texture 계획에서 유지하는 판단

Texture는 별도 첫 단계에서는 내려왔지만 책임 자체가 사라진 것은 아니다.

- `내 얘기 같다`는 사용자 감각을 회귀 기준으로 둔다.
- 장면과 판단 변화가 요약문이나 절차문으로 평평해지지 않게 한다.
- 반복되는 `사례 → 추상화 → 새 기준` 엔진, 운영 명사, 부정-재규정 문장을 본다.
- 도식과 리스트를 자동 추가하지 않는다.
- Reader Flow를 이유로 중심과 대표 장면을 자동 변경하지 않는다.
- 표현을 바꾼 뒤 새 사실이 생기지 않았는지 다시 확인한다.

## 이번 계획에서 하지 않는 것

- source 전체를 처음부터 다시 조사하기
- reviewer마다 별도의 원고를 쓰게 하기
- Material, Shaping, Texture agent를 자동 순차 호출하기
- 사용자 인터뷰를 fresh reviewer의 정답지로 제공하기
- Independent review 글과 통합하기
- 제목·metadata·발행일 확정과 Prepublish 전체 점검
- 이 한 편의 결과만으로 editorial·agent·skill·전역 하네스를 수정하기

이 계획은 이미 만들어진 src에서 시작해, 사용자 인터뷰를 저자·원고 지도로 바꾸고, 작성 worker가 완결본을 만들며, fresh reviewer가 한 원고를 단계별 책임으로 나눠 검토하는 전체 개선 cycle이다.
