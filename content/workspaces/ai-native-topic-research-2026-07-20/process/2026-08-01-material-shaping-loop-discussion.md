---
작성일: 2026-08-01
성격: source 기반 원고 개선과 Material·Shaping 단계별 review loop 논의
공개상태: 내부 작업 문서
현재상태: 첫 시험 완료 / 실행 cycle로 연결
---

# Source 기반 원고 개선과 Material·Shaping 단계별 review loop

## 왜 지금 이 논의를 하나

Current 글을 발행한 뒤 Independent review와 AI self-check 두 편의 병렬 개선 round를 시작했다. 대상과 최소 목표를 맞추고 결과 개선 review를 맡겼지만, review packet이 현재 원고와 대표 사건에 치우쳐 있었다. Reviewer는 원고의 도입, 빠진 전환, 장면의 물성, 개념 정의는 볼 수 있었지만 다음을 충분히 보지 못했다.

- 왜 이 문제를 오래 붙들었는가.
- 무엇이 최초 artifact나 작업 방식을 만들게 했는가.
- 처음 만든 방식이 실제 사용을 거치며 어떻게 달라졌는가.
- 기대가 깨진 뒤 무엇을 다시 고쳤는가.
- 많은 경험 중 왜 이것을 글로 발전시키려 했는가.

그 결과 개선 후보가 장면 추가와 현재 원고 편집 move로 수축했다. 이 문제를 확인한 뒤 [AI self-check 생성 계보](../sources/ai-self-check-origin-and-operation.md)와 [독립 판별 생성 계보](../sources/independent-review-origin-and-operation.md)를 새로 모았고, [생성 계보를 포함한 material 재평가](./shaping/2026-07-29-parallel-improvement-round/03-origin-genealogy-material-reassessment.md)에서 기존 카드의 입력 한계를 표시했다.

지금은 source가 부족해서 아무것도 시작할 수 있는 상태가 아니다. AI self-check의 배경, 발단, 최초 구현, 실제 사용, 계약 변화, 한계까지 첫 개선에 필요한 source는 이미 충분히 펼쳐졌다. 남은 일은 source를 다시 넓게 수집하는 것이 아니라, 이 재료와 현재 원고를 함께 써서 결과물을 실제로 끌어올리고 그 과정에서 Material과 Shaping 각각의 개선 기준을 얻는 것이다.

## 이번 대화의 전환점

사용자는 현재 기억의 역할을 다음처럼 바로잡았다.

> 정확히는 내 기억을 source자체에 보태는게 아니라 보완해서 결과를 이끄는게 맞는것 같아

이어 AI self-check에서 현재 가장 강하게 느끼는 문제를 말했다.

> AI가 자기 자신을 원인에서 빼는 그냥 바보같이 객관화 못하는게 핵심이었지

Main이 이를 곧바로 글의 중심, 최초 장면, 후속 한계로 배열하자 사용자는 다시 멈췄다.

> 그래 근데 너무 중심을 딱 잡은것 같아서 이정도에서 좀 멈추고 다시 작업 루프나 뭐 이런걸 어떻게 할지 좀 얘기해보자

> 중요한건 최초 장면이라기보다 글의 시작이 되는 배경 부터 해서 머티어리얼 쉐이핑 단계를 더 개선하고 싶어 어떻게 할지 생각좀 해보자 지금 시점에서

이 정정으로 현재 과제는 `AI self-check의 중심을 먼저 확정하는 것`이 아니라 `충분히 모은 source가 원고의 배경·탐구·판단 변화로 살아나게 하고, 그 결과를 Material과 Shaping의 서로 다른 기준으로 개선하는 것`이 됐다.

## 현재 합의된 경계

- Source는 과거 발화, artifact, 실행, Git, 당시 기록을 확인하는 원천이다.
- 사용자의 현재 기억과 판단은 과거 source에 섞어 넣지 않는다. Source가 허용하는 여러 해석과 material 사이에서 무엇이 중요하고 생생한지 보완하고, 결과가 나아갈 방향을 판단하는 데 쓴다.
- `AI가 자기 자신을 원인에서 제외하고 객관화하지 못한다`는 말은 현재 강한 material 판단이다. 아직 글의 중심 문장이나 대표 장면으로 고정하지 않는다.
- 최초 사건은 중요한 source일 수 있지만, 자동으로 글의 도입이나 대표 장면이 되지 않는다.
- 첫 개선 cycle을 시작하기 위해 source를 다시 전면 수집하거나 material 카드부터 새로 펼칠 필요는 없다. 원고를 고치다가 결과를 바꿀 사실 공백이 발견될 때만 필요한 source로 돌아간다.
- 전역 `editorial/` 하네스나 workspace `core`를 지금 바로 바꾸지 않는다. AI self-check 한 편에서 먼저 시험한다.

## 작업 Goal

> AI self-check의 생성 배경과 실제 사용·변화·한계를 source에서 복구해, 현재 원고가 사건 몇 개를 설명하는 글을 넘어 하나의 탐구와 판단 변화로 읽히게 한다. 처음 읽는 개발자가 왜 이 문제가 생겼고 무엇을 다르게 보게 되었는지 따라간 뒤, 자기 AI 협업의 판단 위치와 다음 행동을 한 번 다시 보게 하는 글로 끌어올린다.

이 Goal은 특정 중심, 도입 장면, 절 순서를 미리 정하지 않는다. 결과를 끌어올리는 방향과 독자에게 남아야 할 변화만 고정한다.

리뷰에 사용할 대상과 최소 목표는 다음처럼 둔다.

### 대상

AI와 일하며 판단과 통제 방식을 고민하는 개발자.

### 최소 목표

- 처음 만난 독자가 끝까지 읽는다.
- 읽고 나면 이 문제를 겪는 동료에게 보내고 싶어진다.
- 같은 문제가 다시 생겼을 때 링크로 꺼내 보는 기준 글이 된다.
- 읽은 독자가 다음 AI 작업에서 자기 판단이나 행동 하나를 실제로 다시 본다.

## 시험할 전체 loop

```text
이미 모은 Source + 현재 원고 + 합의된 현재 판단
→ source 기반 개선 원고 작성
→ 개선 원고 + Source를 improvement reviewer에게 전달
→ Material 단계의 기준·판정·move 회수
→ Shaping 단계의 기준·판정·move 회수
→ Main이 Material부터 보완한 뒤 Shaping을 다시 판단·적용
→ 남은 blocker가 있을 때만 필요한 층위로 돌아감
```

이 loop의 핵심은 reviewer에게 `전반적으로 더 좋게 만드는 기준`을 한꺼번에 요구하지 않는 것이다. 같은 reviewer가 한 보고서에서 두 단계를 다룰 수는 있지만, Material과 Shaping을 순서대로 분리해 판단해야 한다.

## 1. Source 기반 개선 원고를 먼저 만든다

현재는 별도의 `source → material 카드 → 사용자 선택 → shaping 후보` 선행 loop를 의무화하지 않는다. 이미 모은 source와 합의된 판단을 현재 원고에 직접 다시 투입해, 완결된 개선 원고를 먼저 만든다.

### Writer 입력

- 현재 [AI self-check 원고](../src/ai-self-check.md)
- [AI self-check 생성 계보 source packet](../sources/ai-self-check-origin-and-operation.md)
- [Source index](../sources/index.md)와 packet이 연결한 직접 원천
- 이 문서에서 합의한 배경, 문제, 현재 판단, 작업 Goal

### Writer에게 주지 않을 것

- 이전 개선 review와 후보 카드
- Main이 기대하는 중심, 대표 장면, 예상 절 순서
- 기존 원고의 어느 문장을 반드시 살려야 한다는 지시

이전 review를 제외하는 이유는 지적 사항을 부분 수선하는 원고로 수축하지 않게 하기 위해서다. Writer는 현재 원고를 존중해야 하지만, source가 더 나은 움직임을 허용하면 중심과 구조를 다시 열 수 있다.

### 첫 개선 원고의 책임

- 생성 배경과 문제의 발단이 독자에게 필요한 만큼 살아 있는가.
- artifact의 존재보다 왜 만들었고 실제 사용 중 무엇이 달라졌는가가 드러나는가.
- 사건, 당시 판단, 후대 해석이 한 층으로 섞이지 않는가.
- source의 지원 범위를 넘지 않으면서도 구체적인가.
- 독자가 따라갈 질문과 저자의 판단 변화가 있는가.

이 항목은 최종 reviewer 기준을 대신하지 않는다. Writer가 source를 원고로 바꿀 때 놓치지 않을 최소 책임이다.

## 2. 개선 원고와 Source를 reviewer에게 함께 준다

Reviewer는 원고만 보고 문장과 장면을 평하는 역할이 아니다. 개선 원고가 source에 있던 중요한 material을 무엇을 살리고 놓쳤는지, 그 material이 하나의 글로 어떻게 배열됐는지를 차례대로 판단한다.

### Reviewer 입력

- source 기반 개선 원고
- [AI self-check 생성 계보 source packet](../sources/ai-self-check-origin-and-operation.md)
- [Source index](../sources/index.md)와 필요한 직접 원천 재접근 경로
- 대상과 최소 목표

### Reviewer에게 주지 않을 것

- 이 process 논의 문서
- `active-state`
- 이전 review와 후보 카드
- Writer의 변경 내역과 선택 이유
- Main이 기대하는 중심, 대표 장면, 구조

Reviewer가 Main의 예상 답을 따라가지 않고 원고와 source의 간극을 독립적으로 보게 하기 위한 입력 경계다.

## 3. Reviewer는 단계별 기준부터 제시한다

Reviewer에게 전체 개선 기준 하나를 달라고 하지 않는다. 먼저 Material 단계에서 무엇을 기준으로 볼 것인지 밝히고 판정한 뒤, 별도의 Shaping 기준으로 넘어가게 한다.

### 3-1. Material 단계 반환

Reviewer는 다음 순서로 반환한다.

1. 이 글의 Material을 평가할 개선 기준 후보와 각 기준이 중요한 이유
2. 각 기준에서 source와 개선 원고를 대조한 판정
3. 원고가 놓쳤거나 약하게 쓴 material, 과도하게 해석한 material
4. 더 발굴하거나 구체화하거나 덜어내야 할 Material move
5. Material 단계가 충분해졌다고 볼 수 있는 통과 조건

이때 중심, 도입, 절 순서를 먼저 고치는 처방으로 넘어가지 않는다. 같은 source 안에 있는 배경, 발단, 실제 사용, 실패, 오해, 판단 변화, 한계가 원고에 어떤 밀도로 살아 있는지를 먼저 본다. 추가 source를 요구할 때는 `있으면 더 좋은 자료`가 아니라 `없으면 판정이나 원고의 방향이 달라지는 공백`인지 구분한다.

### 3-2. Shaping 단계 반환

Material 판정을 마친 뒤 별도 구획에서 다음을 반환한다.

1. 이 글의 Shaping을 평가할 개선 기준 후보와 각 기준이 중요한 이유
2. 중심 질문, 탐구의 진행, 발견의 시점, 사건 순서, 문단 역할에 대한 판정
3. 독자가 들어오고 계속 읽고 판단 변화를 따라가는 데 생기는 단절
4. 구체적인 `Build / Move / Cut / Keep` move
5. Shaping 단계가 충분해졌다고 볼 수 있는 통과 조건

Shaping 기준은 `Material이 충분히 존재한다`고 가정하고 배열만 고치는 기준이어서는 안 된다. Material 단계에서 확인한 공백 때문에 아직 해결할 수 없는 구조 문제가 있다면 그 의존 관계를 표시한다.

### 3-3. 두 단계 사이의 의존 관계

보고서 마지막에는 다음만 묶어 준다.

- 어떤 Shaping 문제가 어떤 Material 공백을 먼저 해결해야 풀리는가.
- Material 보완 뒤에도 그대로 유효한 Shaping move는 무엇인가.
- 실행 우선순위는 무엇인가.
- 현재 원고가 부분 수정으로 가능한가, 재배열이 필요한가, 다시 쓰는 편이 나은가.

두 단계의 결과를 하나의 총점이나 종합 품질 기준으로 합치지 않는다.

## 4. Main은 Material부터 회수한다

Reviewer가 한 번에 Material과 Shaping 보고를 주더라도 Main은 동시에 적용하지 않는다.

1. Material 기준과 source 대조 판정을 먼저 검토한다.
2. 사용자의 현재 판단이 필요한 지점과 직접 source 확인이 필요한 지점을 나눈다.
3. 필요한 material을 보완해 원고를 고친다.
4. Material이 달라진 원고 위에서 Shaping 판정이 여전히 유효한지 다시 본다.
5. 유효한 Shaping move를 적용하고 완결본을 만든다.

Material 보완으로 중심이나 발견의 순서가 달라졌다면 첫 보고서의 Shaping 처방을 기계적으로 적용하지 않는다. 필요할 때만 갱신된 원고로 Shaping 재검토를 요청한다.

## 5. 필요한 층위로만 돌아간다

- 과거 사실이나 인과가 비어 원고의 방향이 달라짐 → 필요한 source만 추가 조사한다.
- Source는 충분하지만 배경, 실패, 판단 변화가 원고에 살아나지 않음 → Material 단계로 돌아간다.
- Material은 충분한데 중심 질문이나 발견의 순서가 약함 → Shaping 단계로 돌아간다.
- 완결된 글이 처음 읽히지 않거나 문장 질감이 약함 → 그때 reader-flow나 texture review를 사용한다.
- 같은 지적이 반복됨 → reviewer 수를 늘리기 전에 input, 단계 경계, 적용 순서가 다시 섞였는지 확인한다.

이 구분은 source 조사와 review가 무한 반복되는 것을 막고, 실제로 막힌 층위만 다시 열기 위한 계약이다.

## AI self-check에서 첫 시험

### 산출물 순서

1. Source 기반 AI self-check 개선 원고
2. Material·Shaping 단계별 improvement review 보고서
3. Main의 Material 회수 판단과 수정본
4. 수정본 기준 Shaping 적용 판단과 완결본

### 첫 cycle에서 확인할 것

- 생성 배경이 설명용 연표가 아니라 글의 질문과 판단 변화를 만드는 material로 살아났는가.
- `AI가 자기 자신을 원인에서 제외한다`는 현재 판단이 source와 원고를 통해 더 선명해졌는가, 아니면 더 나은 중심 후보가 발견됐는가.
- Reviewer의 Material 기준과 Shaping 기준이 실제로 서로 다른 문제를 찾아냈는가.
- Material을 먼저 보완하자 Shaping 판단이 달라졌는가.
- 이 방식이 현재 원고에 review patch를 쌓는 것보다 결과를 크게 끌어올렸는가.

## 이번에는 하지 않는 것

- 첫 개선 전에 source를 다시 전면 수집하기
- Material 카드를 별도로 펼쳐 사용자에게 하나씩 선택받는 선행 절차
- 중심, 대표 장면, 도입을 process 문서에서 미리 확정하기
- 여러 reviewer에게 같은 종합 개선 질문을 반복하기
- AI self-check 한 번의 결과만으로 전역 `editorial/`이나 workspace `core`를 수정하기

## 실행 결과

[AI self-check Material·Shaping 실행 cycle](./shaping/2026-08-01-ai-self-check-material-shaping-loop/README.md)에서 이 문서의 Goal과 입력 경계를 그대로 사용했다. Source 기반 v0를 만든 뒤 서로 이전 회차를 보지 않은 fresh reviewer 3명이 단계별로 판정했다.

- Round 01: 확인되지 않은 과거 1인칭 기대·깨달음을 원고가 채운 문제로 Material `Fail`, Shaping `Pass`
- Main 회수: 과거 내면을 current source 해석으로 낮추고 Material부터 보완한 뒤 운영 변화 구간을 국소 재배열
- Round 02: Material·Shaping·Goal 전체 `Pass`
- Round 03: Material·Shaping·Goal 전체 `Pass`

연속 fresh 통과 2회 조건을 충족해 최대 5회 중 Round 03에서 종료했다. 최신 원고는 `src/ai-self-check.md`, 회차별 report·회수 판단·snapshot과 기준 ledger는 실행 cycle에 보존한다.
