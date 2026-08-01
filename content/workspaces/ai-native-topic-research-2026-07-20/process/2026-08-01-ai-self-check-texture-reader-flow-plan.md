---
작성일: 2026-08-01
성격: AI self-check Texture·Reader Flow 개선 cycle 계획
공개상태: 내부 작업 문서
현재상태: 실행 전 보류 / 저자 판단과 source 재확인 중 / 원고 미수정
---

# AI self-check Texture·Reader Flow 개선 계획

> 2026-08-01 후속 인터뷰에서 배경 이후의 저자 판단, 과교정의 실제 의미, fresh auditor에서 좋게 본 점과 한계가 현재 원고에 충분히 살아나지 않았다는 문제가 다시 열렸다. [저자 판단 인터뷰](./2026-08-01-ai-self-check-author-judgment-interview.md)의 source 확인과 Material·Shaping 재개 판단이 끝날 때까지 이 계획은 실행하지 않는다.

## 현재 위치

[Material·Shaping 실행 cycle](./shaping/2026-08-01-ai-self-check-material-shaping-loop/README.md)은 source 밖의 과거 내면 서술을 회수한 뒤, 서로 다른 fresh reviewer에게서 Material·Shaping 전체 통과를 두 번 연속 받았다. 최신 원고는 [AI self-check](../src/ai-self-check.md)다.

그 원고를 읽은 사용자는 다음처럼 판정했다.

> 글의 흐름은 많이 좋아진 것 같아. 공감이 된다고 해야 하나? 좀 내 얘기 같아. 그래도 아직 더 다듬을 것들이 많긴 하고.

이어 다음 단계에서는 Texture뿐 아니라 블로그 skill과 공통 editorial 자료에 있는 글의 리듬·호흡 기준도 함께 보자고 했다.

따라서 지금은 Material이나 Shaping을 다시 여는 단계가 아니다. 현재 생긴 `내 얘기 같다`는 감각과 중심·장면을 기준점으로 고정하고, 운영 문서처럼 들리는 밀도와 반복되는 본문 리듬을 다듬는 단계다.

## 이번 단계의 Goal

> Material·Shaping에서 살아난 `AI가 자기 자신을 오류의 원인에서 빼는 문제`와 그 뒤의 판단 변화를 유지하면서, 반복되는 판정문·운영 명사·섹션 전개가 만드는 중후반의 단조로운 호흡을 바꾼다. 처음 읽는 개발자가 내부 규칙 설명서를 읽는 대신 장면, 오독, 판단 변화, 다음 행동을 따라가고, 마지막 기준을 자기 AI 대화 하나에 옮길 수 있게 한다.

이 Goal은 다음을 고정한다.

- 현재 중심 질문과 대표 사건은 유지한다.
- `내 얘기 같다`는 사용자의 감각을 개선 전후의 최상위 회귀 기준으로 둔다.
- 사실 범위와 주장 상한을 바꾸지 않는다.
- 글을 Current와 같은 구조나 문체로 만들지 않는다.

다음은 열어 둔다.

- 소제목의 문구와 필요한 경우의 국소 층위 조정
- 문단의 시작·끝, 문장 착지, 전환 방식
- 같은 설명을 반복하는 문장의 축소·결합
- 핵심 역할을 하지 않는 내부 운용 영어와 추상 명사의 표현
- 두 도식과 마지막 리스트 앞뒤의 산문 배치

## 기준 자료의 역할

이번 계획을 위해 repo의 editorial 기준, writing agent, Current의 실제 회수 기록, 전역 skill·reference·agent를 대조했다.

- [Core workflow](../../../../editorial/core/workflow.md)는 Texture를 `말투를 예쁘게 만드는 단계`가 아니라 polish 과정에서 글감·발견·리듬·판단 감각을 보호하는 단계로 둔다.
- [Reader Flow](../../../../editorial/lenses/reader-flow.md)는 페이지 감각, 문단 호흡, 소제목, 판정문 착지, 본문 cadence와 단락 역할을 본다. 이번 리듬 판단의 주된 기준이다.
- [Output contracts](../../../../editorial/core/output-contracts.md)는 cadence가 문제일 때 반복되는 전개 패턴, 영향을 받는 구간, 실제로 역할을 바꿀 문단 move 2~3개를 남기게 한다.
- [Voice](../../../../editorial/lenses/voice.md)는 회고 글의 1인칭·자기 관찰·짧은 호흡을 허용하되, 근거 없는 전환과 자기 포장을 막는다.
- [Edit patterns](../../../../editorial/lenses/edit-patterns.md)는 `X가 아니라 Y`, 표어형 판정문, 같은 산문 엔진, polish로 글감 삭제 같은 반복 실패를 점검하는 사례집이다.
- [Page cadence](../../../../editorial/reference-profiles/technical-blog-page-cadence.md)는 섹션별 단락 역할을 볼 때만 쓰는 선택형 reference다. 표·도식·소제목 수를 강제하지 않는다.
- `blog-write`는 이 기준과 역할을 연결하는 dispatcher다. 별도의 리듬 기준을 소유하지 않는다.
- 전역 `references`, `skills`, `agents`에는 글의 리듬·Texture를 별도로 소유하는 기준이 없었다. 전역의 독립 판별 원칙은 reviewer의 입력을 분리하고 Main이 최종 회수해야 한다는 역할 배치에만 사용한다.

그러므로 새 단계나 새 전역 규칙을 만들지 않는다. 현재 editorial 기준을 이 한 편의 실제 edit move로 번역한다.

## 현재 원고에서 먼저 확인할 가설

아래는 수정 결론이 아니라 첫 edit에서 확인할 가설이다.

### 보호 후보

- `AI는 문제를 설명하고 있었지만, 정작 자신은 문제 밖의 해설자로 남아 있었다.`
- 굵게 놓인 중심 질문
- 오류의 인과 안에 AI의 선택을 다시 넣는다는 문장
- `진단 정확도 / 직후 행동 변화 / 장기 재발 감소`를 나누는 세 기준
- `첫 판별이 틀렸던 것은 아니었다. 어긋남은 판정을 현재 작업에 번역하는 위치에서 생겼다.`
- `inline 자기점검 → 별도 판별자 → 원문 범위를 판별자가 직접 확장 → 반복 실패에만 호출`이라는 변화
- 마지막 두 문장

보호 후보는 원문 그대로 불변이라는 뜻이 아니다. 없애거나 평평하게 만들 때 글의 발견과 사용자의 체감이 약해지는지를 먼저 보라는 뜻이다.

### 리듬 마찰 가설

- 여섯 개의 `##`가 모두 회고형 판정문에 가깝고, 중간 여러 절이 `사례 설명 → 추상화 → 한계 또는 새 기준`으로 닫힌다.
- `문제`, `설명`, `판단`, `판정`, `입력`, `범위`, `작업`, `별도` 같은 운영 명사가 중후반에 겹치며 장면보다 규칙 문서의 표면을 강하게 만들 수 있다.
- `중요한 것은`, `문제는`, `이 사례 뒤에는`, `그래서` 같은 회수 장치가 실제 사고 전환보다 자동적인 절 마감처럼 들리는 곳이 있을 수 있다.
- 두 개의 텍스트 도식과 마지막 번호 리스트가 이미 스크롤 손잡이를 제공한다. 새 표나 도식을 추가하기보다, 그 사이 산문의 역할과 밀도를 먼저 본다.
- 결말의 부정-재규정과 직전 체크리스트가 같은 발견을 여러 번 닫는지 확인한다.
- `inline`, `baseline`, `extractor`, `pipeline`, `label`은 기술 구분에 필요한 곳과 내부 작업 언어가 남은 곳을 나눠 본다.

## 고정본과 비교 기준

실행을 시작하면 최신 원고를 Texture 시작 고정본으로 복사한다. Material·Shaping 완료본 자체를 직접 덮어쓰면서 비교 근거를 잃지 않는다.

Texture Keeper의 이전 비교본이 필요하면 [Round 01 draft](./shaping/2026-08-01-ai-self-check-material-shaping-loop/round-01-draft.md)를 사용한다. Round 02, Round 03과 최신본은 동일하고, Round 01과 최신본의 차이는 source 밖 내면 서술을 걷어낸 회수와 국소 재배열이므로 실제로 무엇을 보호해야 하는지 비교하기 좋다.

`00-source-based-v0.md`는 기본 비교본으로 쓰지 않는다. 이후 Material review에서 제거한 과거 기대와 깨달음을 살아 있는 1인칭 문장으로 잘못 복구할 위험이 있다.

## 역할과 입력 경계

### Main editor

Main만 원고를 수정하고 완료를 판정한다. 최신 원고, 사용자의 판정, 이번 Goal, editorial 기준, 필요한 경우 직접 source를 본다.

첫 수정 전에 다음 세 가지를 짧게 만든다.

1. 보호할 문장·장면
2. 섹션별 현재 역할과 반복되는 본문 엔진
3. 우선 고칠 리듬 마찰 1~3개

이 진단만 남기고 끝내지 않고 한 편의 일관된 수정본을 만든다.

### Texture Keeper

역할은 유지하되 같은 reviewer를 회차 사이에 유지하지 않는다. 매 회차 fresh instance가 report-only로 판단한다.

입력:

- Texture 시작 고정본
- 해당 회차 수정본
- 보호 후보와 이번 Goal
- Texture 책임, 필요할 때만 Reader Flow와 Edit Patterns

주지 않을 것:

- 이전 Texture report
- Main의 변경 이유와 예상 판정
- Material·Shaping review 전체
- source 밖의 사용자 내면 추정

반환:

- Protect
- Flattening risk
- Editor concern과 Texture concern의 충돌
- Safe polish

### Reader Flow reviewer

수정본만 처음 읽는 fresh reviewer다. source와 이전 version, process, Main의 설명을 받지 않는다. Reader Flow, Output Contract, Edit Patterns, Page Cadence 중 현재 질문에 필요한 기준만 본다.

반환:

- 반복되는 본문 cadence 한 가지
- 영향을 받는 섹션
- 실제로 역할을 바꿀 문단 move 2~3개
- heading hierarchy나 판정문 착지에서 고우선 마찰이 있으면 해당 move
- 중심·대표 장면·큰 구조를 건드리지 않는 범위의 우선순위

`좋아 보인다`, `더 짧게`, `표를 넣자` 같은 추상 처방으로 끝내지 않는다.

### Tone Critic

자동으로 매 회차 호출하지 않는다. Texture·Reader Flow 회수 뒤에도 아래 문제가 남을 때만 한 번 쓴다.

- 내부 운영 문서처럼 들리는 언어가 여전히 독자 거리를 만든다.
- 개인적 문장이 줄어 글이 generic해졌다.
- 자기 관찰이 실제 장면보다 앞서거나 자기 포장처럼 들린다.
- 반복되는 부정-재규정과 관용구가 결론을 대신한다.

입력은 당시 최신 원고와 Voice·Edit Patterns뿐이다. Article type은 현재 frontmatter와 원고의 중심에 맞춰 `Retrospective / Meta`를 주 렌즈로 제공하되, 고정 템플릿으로 사용하지 않는다.

### Evidence Checker

이번 Texture loop의 매 회차 reviewer가 아니다. Texture·Reader Flow·Tone 반영이 끝난 뒤, 바뀐 시점·행위 주체·인과·도식 화살표·숫자만 source와 다시 대조한다. 표현 개선이 새 사실을 만들면 Texture 통과 여부와 무관하게 고친다.

## 실행 순서

### Round 0 — Main의 Texture 지도

원고는 수정하지 않는다.

- 보호 후보를 확정한다.
- 여섯 섹션의 `여는 방식 / 닫는 방식 / 실제 역할`을 한 줄씩 적는다.
- 반복되는 산문 엔진과 운영 명사 밀도를 확인한다.
- 이번 edit에서 실제로 움직일 2~3곳을 정한다.

이 결과는 사용자에게 여러 후보 중 하나를 고르게 하는 카드판이 아니다. `내 얘기 같다`, `문서 같다`, `늘어진다`, `내 말이 아니다`라는 사용자 감각과 Main의 진단이 맞는지 짧게 교정할 수 있는 지도다.

### Round 1 — 일관된 Texture·리듬 수정본

Main이 원고 전체를 한 번에 전역 변환하지 않고, 선택한 2~3개 구간에서 실제 단락 역할을 바꾼다.

- 장면이 있는 절은 설명보다 장면이 먼저 일하게 한다.
- 정의와 기준은 단정하게 두되, 경험과 오해는 자연스러운 호흡으로 둔다.
- 중복 판정은 줄이되 판단이 바뀐 문장은 보호한다.
- 소제목 문구나 층위를 바꿀 때는 섹션 역할 차이가 보이는 최소 범위에서만 한다.
- 내부 영어와 운영 명사는 의미 구분에 필요한 것만 남긴다.
- 도식 앞에는 무엇을 볼지 열고, 뒤에는 같은 내용을 재설명하지 않고 다음 판단만 회수한다.

수정본 뒤에 Texture Keeper와 Reader Flow reviewer를 같은 시점에 독립 실행한다.

### Main 회수

두 report를 다음 순서로 회수한다.

1. 살아 있는 문장·장면·판단 변화가 평평해진 곳부터 복구한다.
2. 그 보호 조건 안에서 Reader Flow의 cadence·heading·착지 move를 적용한다.
3. 두 역할이 충돌하면 한쪽을 자동 채택하지 않고, `줄일 이유 / 살릴 이유 / 조정안`을 남긴다.
4. 중심, 대표 장면, 큰 절 순서를 바꾸는 제안은 적용하지 않고 사용자 판단으로 올린다.
5. Tone 조건이 실제로 남았을 때만 Tone Critic을 호출한다.

### 사용자 checkpoint

첫 완결 round 뒤에는 원고 전체와 함께 다음 세 가지만 보여 준다.

- 무엇을 보호했는가.
- 어느 구간의 호흡이 실제로 달라졌는가.
- 아직 `문서 같다`거나 `내 말이 아니다`고 느낄 수 있는 곳은 어디인가.

사용자는 세부 edit 카드를 모두 선택하지 않는다. 수정 뒤에도 `내 얘기 같다`는 감각이 남는지, Main이 잘못 보호하거나 잘못 줄인 한두 곳을 바로잡는다.

### 후속 round

남은 blocker가 있을 때만 해당 판단면으로 돌아간다.

- 살아 있는 판단이 평평해짐 → fresh Texture regression
- 섹션 역할과 문단 호흡이 반복됨 → fresh Reader Flow
- 공개 언어와 독자 거리 문제만 남음 → Tone Critic 한 번
- 표현을 고치려면 사건 추가나 큰 재배열이 필요함 → Texture loop를 멈추고 Shaping 재개 여부를 사용자와 판단
- 사실 표현이 바뀜 → 필요한 source만 확인

이전 report를 다음 fresh reviewer에게 넘기지 않는다. 같은 종합 질문을 reviewer만 바꿔 반복하지 않는다.

## Loop 상한과 종료 조건

Hard cap은 앞 cycle과 같이 최대 5회로 둔다. 다만 Texture는 많이 돌릴수록 좋아지는 단계가 아니므로 예상 종료는 2~3회다.

다음 조건을 모두 만족하면 5회 전이라도 끝낸다.

- 사용자가 수정본도 여전히 `내 얘기 같다`고 느낀다.
- 현재 중심 질문, 대표 사건, 사실 범위가 유지된다.
- 보호 문장과 판단 변화가 요약문이나 절차문으로 평평해지지 않는다.
- 연속된 세 섹션 이상이 같은 `사례 → 추상화 → 새 기준` 엔진으로 닫히지 않는다.
- 소제목만 훑어도 사례, 한계, 적용 실패, 운영 변화, 다음 행동의 역할 차이가 보인다.
- 내부 운영 명사와 영어가 독자에게 필요한 구분보다 앞서지 않는다.
- 도식과 리스트가 산문을 대신하지도, 산문이 도식을 그대로 반복하지도 않는다.
- 처음 읽는 Reader Flow reviewer에게 고우선 `내부 설명서처럼 읽힘`, `중반 되읽기`, `결말 중복` blocker가 남지 않는다.
- 마지막 사실 대조에서 새 충돌이 없다.

같은 고우선 지적이 두 회차 연속 반복되면 reviewer를 더 붙이지 않는다. 입력 경계, Main의 회수, 실제 수정 위치가 문제인지 먼저 본다.

## 실행 산출물

계획이 합의되면 `process/shaping/` 아래에 새 실행 cycle을 만든다. 최소 산출물은 다음과 같다.

- Texture 시작 고정본
- Round 0 Texture·body cadence 지도
- 회차별 수정본
- Texture Keeper report
- Reader Flow report
- 조건부 Tone report
- Main 회수와 채택·조정·기각 기록
- 사용자 checkpoint 원문
- 최종 Texture regression과 수정 문장 evidence 확인

역할별 report 원문을 따로 보존한다. Current의 최종 전문 review처럼 한 문서에 합치면 나중에 어느 역할이 실제로 무엇을 발견했는지 복구하기 어렵다.

## Current에서 가져오고 가져오지 않을 것

[Current 최종 품질 회수](./shaping/2026-07-28-current-scaffolding-rewrite/05-final-quality-specialist-review-and-recovery.md)에서 재사용할 것은 역할 분리, 살아 있는 사용자 체감 보호, Main의 채택·조정·기각, 모든 표현 수정 뒤의 사실 재확인이다.

가져오지 않을 것은 다음과 같다.

- Current의 `발상 → 구조 → 성공 → 한계 → 재설계` 배열
- specialist 수 자체를 품질 조건으로 삼는 방식
- 사용자 수용을 reviewer `PASS`로 대신하는 방식
- 실제 1인칭 체감을 객관 문장으로 바꾸는 방식
- Reader Flow라는 이유로 `###`, 표, 인용 블록, 번호 리스트를 자동 추가하는 방식
- 수렴 수정과 선택 수정을 사용자가 변화를 보기 전에 한꺼번에 적용하는 방식

## 이번 계획에서 하지 않는 것

- Material·Shaping 전체 재검토
- 새로운 source 전면 조사
- Independent review 글과의 통합 또는 경계 재설계
- 제목·metadata·발행일 확정
- Prepublish 전체 점검
- 이 한 편의 결과를 근거로 editorial·agent·skill·전역 하네스 수정

이 계획은 AI self-check 한 편의 Texture·Reader Flow를 실제로 개선하기 위한 실행안이다. 하네스 개선 여부는 실행 결과와 사용자의 판정을 본 뒤 별도 논의한다.
