---
작성일: 2026-07-28
성격: Current 원고와 직접 원천을 대조한 전 단계 개선 review
공개상태: 내부 process
결과: focused shaping
---

# Current source 대조·단계별 개선 review

이 review는 `src/current-active-state-operation.md`를 현재 source map과 직접 원천에 대조하고, 정확성 통과 여부보다 source가 가진 잠재력에 비해 글이 어디까지 왔는지 판단했다. 대상 workspace의 `active-state`, 이전 원고, 이전 review와 main의 과거 판정은 입력하지 않았다.

첫 reviewer는 Shaping 역할 계약 안에서만 판단했다. 이어 별도의 범용 reviewer가 같은 원고·source와 editorial core·lens를 독립적으로 읽고 Material, Shaping, Texture, Prepublish를 나눠 판정했다. 두 review 모두 원고를 수정하지 않았다.

## 높인 목표

독자가 `current.md`라는 팁을 기억하는 데서 끝나지 않고 다음 판단 변화에 도달해야 한다.

`context를 더 많이 넣는다`
→ `현재 상태를 요약한다`
→ `사람과 AI가 같은 전체 그림에서 현재 효력과 다음 판단을 다시 합의할 운영면을 만든다`
→ `그 운영면의 길이·freshness·권위·역할별 읽기 계약도 계속 다시 설계한다`

이 목표에서 외부 사례를 복제하지 않고 자기 문제에 맞게 변형한 판단, 실제 운용 장면, 반례 뒤의 재설계가 함께 보여야 한다.

## Article type

- 주된 material signature: `technical-case-study`
- 보조 material signature: `product-architecture`
- texture로 사용하는 signature: `retrospective`

핵심 기술 대상은 파일 하나가 아니라 상태, 권위, 이력, 현재 계약, source, 역할별 재진입 책임을 나누는 운영 구조다. `뭔가 계속 유지되고 있었다`는 1인칭 경험은 보호하지만, 글의 증명 엔진은 문제 정의, 운용 장면, 반례 뒤의 설계 변경에 둔다.

## Material

판정: **충분**

현재 원고는 해커톤 전부터 있던 context 불편, Alex의 procedural scaffolding, 최초 `current`, 재진입, research 수렴, recency bias, terminal gap을 이미 사용한다. 아직 본문에 쓰지 않은 다음 세 material도 직접 원천에 준비되어 있다.

- AX `current`가 96줄·9,693 bytes에서 136줄·24,040 bytes로 커진 비대화.
- main 재진입에 유효했던 recap·정지 계약이 verifier·E2E와 독립 후보 추출에는 역할 충돌과 정보 노출을 만든 장면.
- Cofathon에서 `current`를 147줄에서 46줄로, 이후 82줄·17,381 bytes에서 47줄·6,943 bytes로 줄이고 main·compact·verifier의 진입 계약을 나눈 후속 재설계.

새 source를 더 모으는 일보다 이 material을 현재 spine에 선별 배치하는 일이 필요하다. compaction 9회와 SessionStart 주입 10회 비교는 `current` 단독 효과가 아니라는 인과 경계를 강화하지만, 본문 기본값으로 넣으면 계측 보고서처럼 보일 위험이 있다.

완료 조건:

- 중심 주장, 성공 장면, 반례, 후속 재설계를 모두 직접 원천이 지원한다.
- 생산성·품질 향상 같은 더 강한 인과를 주장하지 않아도 글이 선다.
- 최초 구상 순간이나 문장별 작성자를 확인된 사실처럼 쓰지 않는다.

Material로 돌아갈 조건:

- `current`가 생산성이나 품질을 높였다고 새로 주장할 때.
- 최초 창안 순간이나 문장별 작성자를 특정해야 할 때.
- Cofathon 후속 장면을 쓰지 않으면서도 반례 뒤 실제 재설계를 보여 줄 다른 사건이 필요할 때.

## Shaping

판정: **보강 필요 / focused shaping**

도입 → Alex → 변형 → 재진입 → research 수렴 → recency·freshness 한계 → 발견이라는 spine은 유지할 가치가 있다. 부족한 것은 구조 전면 재개가 아니라 세 연결이다.

### 1. Alex의 scaffold와 사용자의 변형 사이 causal bridge

Alex는 요구사항과 출제 의도, 회사 context, research, 문제와 해결안 비교, engineering, verification까지 전체 문제 해결 과정을 scaffold로 외부화하고 작업하며 계속 고쳤다. 서로 다른 회사 context를 분리한 채 같은 scaffold를 병렬로 운용할 수 있다는 것은 이 구조가 만든 효과 중 하나이지, scaffold의 목적 전부가 아니다.

사용자는 이 넓은 scaffolding에서 `긴 문제 해결 과정을 외부에 펼쳐 사람과 AI가 함께 본다`는 감각을 가져오고, 여러 세션이 하나의 프로젝트를 이어 가는 자기 문제에 맞춰 전체 지도와 현재 위치 하나를 붙였다. 완료 기준은 외부 사례의 표면을 복사했다는 인상 대신 다음 연결이 보이는 것이다.

`Alex가 외부화한 전체 문제 해결 과정 → 사용자가 거기서 본 가능성 → 기존 context 문제와의 결합 → 전체 지도·단일 cursor·역할별 원천 링크로의 변형`

### 2. Research inventory를 판단 trace로 바꾸기

현재의 `20 source → 16 signal → 두 후보판 → 5 후보 → 9 solution → 3 output → 1 선택`은 좋은 근거지만 숫자와 산출물 계보가 연달아 나온다. 다음 판단 이동이 먼저 보여야 한다.

```text
20개 source와 16개 signal을 펼침
→ 외부 기준을 적용하다 회사 방향과 사용자 문제를 양자택일로 과교정
→ 회사 근거는 가중치, 외부 기준은 주장 guard라는 사용자 정정
→ 앞선 자료와 두 증거축으로 복귀
→ 첫 후보판 보존
→ raw research와 criteria에서 두 번째 후보판 재추출
→ 후보 계보와 다시 열 조건
→ solution과 실제 output을 펼친 뒤 선택
```

현재 원고의 `모든 대화를 기억해서가 아니라, 펼친 재료가 어디에 있고 지금 무엇을 좁히는 중인지 잃지 않은 채 수렴할 수 있었기 때문`이라는 회수 문장은 보호한다.

### 3. 한계를 후속 재설계까지 연결하기

현재 원고는 recency bias와 terminal gap을 정확히 보여 주지만, 실패가 다음 구조를 어떻게 바꿨는지까지 가지 않는다. freshness 절을 다음 역할까지 넓힌다.

- 마지막 세 commit 미갱신: 쓰기 책임과 freshness 계약 부재.
- 96줄에서 136줄로 커진 AX `current`: 전체 지도를 남기는 일과 세부를 한 파일에 쌓는 일의 혼동.
- main용 계약의 verifier·E2E 역할 충돌: 같은 context를 모든 역할에 같은 방식으로 적용할 수 없음.
- Cofathon 축소와 역할별 재진입 분리: 반례 뒤 실제 운영 계약 변경.

후속 사례는 성공 증거가 아니라 처음 설계에서 놓친 조건을 발견해 다시 고친 계보로만 쓴다. Cofathon 자체가 두 번째 본편이 되지 않게 한 문단 안에서 회수한다.

Shaping 완료 조건:

- 본문만 읽어도 `기록량 문제 → 현재 효력 제어 → 전체 지도·cursor·권위 분리 → 실제 사용 → recency·freshness·비대화·역할 충돌 → 후속 재설계`를 복구할 수 있다.
- `current.md`라는 파일명을 지워도 사람과 AI가 같은 전체 그림에서 판단을 다시 맞추는 운영 설계가 남는다.

구조를 다시 열 조건:

- 역할별 context와 hook 설계가 별도 중심으로 커져 Current 사례보다 앞설 때.
- Cofathon이 한 문단 보강이 아니라 AX와 나란한 두 번째 프로젝트 복기가 될 때.

## Texture

판정: **아직 볼 시점 아님 / focused shaping 뒤**

보호할 문장:

- `남아 있는 것 중 무엇이 지금 유효한지를 제어하기가 더 어려웠습니다.`
- `전체 작업 지도와 그 위의 현재 위치 하나`
- `이 구분은 정보 정리 방식보다 갱신 규칙에 가까웠습니다.`
- `펼친 재료가 어디에 있고 지금 무엇을 좁히는 중인지 잃지 않은 채 수렴할 수 있었기 때문`
- “`current`에는 자동 효력이 없습니다.”
- `기억을 늘리는 대신, 다시 맞출 자리를 만든다`
- 마지막 문장 전체.

Shaping 뒤 볼 것:

- research 절의 산문 inventory를 trace가 나눠 맡고 산문은 해석에 집중하는가.
- 결말의 `외부 기억이 아니라 작업면`, `전체 그림으로 돌아갈 자리`, `모든 대화보다 판단과 합의`가 세 번 같은 발견을 회수하지 않는가.
- `처음에는 context의 양 문제로 봤다`가 당시의 직접 발화가 아니라 현재의 회고적 해석으로 읽히는가.
- `current`, `cursor`, `guard`, `source`의 영어 혼용이 각 역할을 구분하는 데 실제로 필요한가.

완료 조건:

- 각 절의 첫 문장과 끝 문장이 다른 역할을 맡는다.
- 판단 변화가 매끄러운 일반론으로 평평해지지 않는다.
- 결말은 후속 재설계에서 자연스럽게 나온 한 번의 회수와 마지막 문장으로 닫힌다.

Shaping으로 돌아갈 조건:

- polish 중 `왜 전체 지도와 cursor 하나였는가` 또는 `반례 뒤 무엇을 바꿨는가`를 새 설명으로 보충해야 할 때.

## Prepublish

판정: **아직 볼 시점 아님**

현재 blocker:

- `date: TBD`
- workspace `src` 상태이며 발행 파일명·날짜가 정해지지 않음.
- 최종 원고에 맞춘 `readTime`과 tags 미확정.
- Alex 라이브의 원본 YouTube URL이 로컬 archive에 없음.
- 후속 shaping에서 추가할 줄 수, 역할 충돌, Cofathon 축소 수치를 다시 직접 원천과 맞춰야 함.

현재 원고에는 로컬 절대 경로, 내부 source 문장, supporting-material candidate가 직접 드러나지 않는다. 사실 정합성, 장면 가치, 구조, 공개 준비도를 하나로 합치지 않는다.

통과 조건:

- Shaping과 Texture가 끝난 뒤 Alex 귀속, 18 version·13 cursor 전환, 20 source·16 signal, 마지막 세 commit, AX·Cofathon 줄 수와 역할 계약을 evidence checker가 다시 확인한다.
- 발행 선택 뒤 실제 날짜와 파일명이 일치한다.
- deterministic prepublish check를 통과한다.
- 원본 영상 URL을 복구하지 못하면 해당 공개 링크 없이도 Alex의 공개 정체와 발화 근거를 과장하지 않는 표현으로 닫는다.

## 개선 강도

`focused shaping`

Material을 다시 수집하거나 구조 전체를 재개할 필요는 없다. Alex 변형의 causal bridge, research 판단 trace, 반례 뒤 Cofathon 재설계 세 곳을 보강한 뒤 Texture로 넘어간다.

## 이후에도 반복할 기준 후보

- 외부 사례를 가져왔을 때, 표면 구조가 아니라 내 문제의 어떤 실패 조건이 어떤 설계 요소로 번역됐는가?
- 협업 구조가 작동했다고 말할 때, 상태의 전후와 사람의 확인·정정 중 하나를 독자가 직접 볼 수 있는가?
- 한계가 면책 문단으로 끝나지 않고 문서·코드·역할·갱신 규칙 중 실제로 다시 설계한 것이 무엇인지 이어지는가?
- 계속 고치는 상태 문서라면 누가 쓰고, 어떤 사건 뒤 갱신하며, 종료·배포·제출 같은 저장소 밖 사건을 누가 합치는가?
- main에 유용한 context가 verifier·E2E·독립 생성의 입력 경계를 오염시키지 않는가?
- 문서 수, 줄 수, test 수, cursor 이동 수가 무엇의 흔적인지 쓰고 생산성·품질의 직접 지표로 확대하지 않았는가?
- 도구명과 파일명을 지워도 다음 AI 협업 작업에서 다시 물을 판단 질문이 남는가?
