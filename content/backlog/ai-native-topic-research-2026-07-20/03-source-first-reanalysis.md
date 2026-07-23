---
작성일: 2026-07-23
갱신일: 2026-07-23
성격: AI-native 역량 원천 우선 재조사 / 내부 source card
공개상태: 내부 작업 문서
현재상태: 원천별 독립 추출·기존 다섯 후보 대조 완료 / 첫 글 선택 전
기준점:
  - 01-criteria-and-decision-history.md
  - 02-topic-candidates.md
---

# AI-native 원천 자료 재조사 — 기존 해석을 가리고 다시 봤을 때 무엇이 달라졌는가

이 문서는 [01-criteria-and-decision-history.md](./01-criteria-and-decision-history.md)와 [02-topic-candidates.md](./02-topic-candidates.md)를 고쳐 쓴 문서가 아니다.

`01`은 글감을 고르는 기준과 그 기준의 변화 이력을, `02`는 그 기준으로 남긴 다섯 후보를 계속 소유한다. 이 문서는 두 파일을 기준점으로 보존한 채 AX 전체-작업본, Tripproof의 conversation raw·Git·decision·spec·eval, ai-note의 notes·raw를 원천부터 다시 조사한 결과를 별도로 소유한다.

재조사의 질문은 하나였다.

> 기존 후보를 먼저 보지 않고 원자료에서 판단 사건을 다시 뽑으면, 같은 다섯 후보가 나오는가? 아니면 이전의 자료 선택과 해석 순서 때문에 작게 보이거나 빠진 주제가 있는가?

## 결론

다섯 후보가 틀렸다는 결과는 나오지 않았다. 그러나 “근거만 더 풍부해질 것”이라는 예상보다 변화가 컸다.

- **current**는 유지된다. 다만 current가 자동으로 최근성 편향을 막는다는 이야기가 아니라, 현재 실행 계약·전체 계보·평가 대상을 다시 연결하는 router라는 경계가 더 선명해졌다.
- **독립 판별**은 유지된다. code review만의 주제가 아니라 기존 산출물에 앵커되지 않은 재추출, 원자료 접근, main의 회수 권한까지 독립성을 구성한다는 근거가 늘었다.
- **평가 기준의 시점**은 중심 질문을 바꾸는 편이 낫다. 단순히 rubric을 늦게 적용한다는 이야기가 아니라, 생성·근거 판정·후보 선택이 각각 무엇을 언제 판단하는지 분리하는 이야기다.
- **AI self-check**는 유지된다. AX와 ai-note 원문은 정확한 자기진단 뒤에도 반대 방향 과교정이나 같은 행동 반복이 생긴다는 현재 한계를 더 강하게 지지한다.
- **artifact/core 분리**는 유지된다. 다만 이번 범위에서 Cofathon 원본을 다시 조사하지 않았으므로 기존 후보 전체를 재판정했다고 말할 수는 없다.

원천에서 새로 독립 글로 성립할 가능성이 확인된 주제도 세 개다.

1. **AI에게 작게 만들라고 했더니 제품 흐름이 사라졌다**
   - scope를 줄일 때 필드·provider·polish를 줄이는 것과 사용자 입력부터 결과까지의 인과 사슬을 자르는 것은 다르다.
2. **기존 문서를 고치지 않고 원자료에서 다시 뽑은 이유**
   - 기존 산출물이 문제의 틀까지 소유하면, 그 문서를 수정하는 작업은 발견보다 기존 틀의 정당화가 되기 쉽다.
3. **문제를 고르기 전에 결과를 먼저 만들어 봤다**
   - 근거가 성립한 문제 후보를 설명으로만 비교하지 않고 실제 출력과 상태 변화로 먼저 실행해 본 뒤 문제–솔루션 조합을 닫는다.

이 가운데 첫 글 후보를 실제로 흔들 만큼 강한 신규 후보는 현재 **제품 흐름을 자르지 않는 scope control**이다. Tripproof의 대화·decision·code·test와 AX의 제품 중심 복원이 함께 있고, 개발자가 바로 알아볼 장면과 다른 작업으로 옮길 기준도 있다.

fresh 재추출과 Output-first도 글로 성립한다. 다만 전자는 메타 작업 팁으로 좁아지지 않게 “언제 기존 문서를 숨겨야 하는가”의 판단 조건이 필요하고, 후자는 일반적인 prototyping과 무엇이 다른 AI-native 감각인지 한 번 더 shaping해야 한다.

## 1. 조사 질문과 현재 기준점

### 기준점으로 보존한 것

재조사 전 두 파일의 SHA-256은 다음과 같았다.

- `01-criteria-and-decision-history.md`
  - `3aef9f07ea3fd94497256140479fc6621382c8017b91b19709b1f508f5cf1d5b`
- `02-topic-candidates.md`
  - `9a7972879c036a4a6ed2dece4462c963c99c9441c04e05b5431f11cf4d9fb197`

원천 추출 담당에게는 두 파일을 열지 말라는 경계를 줬고, 담당 보고도 그 경계를 지켰다고 기록했다. fresh 후보를 만든 뒤에만 main이 `01`의 기준과 `02`의 다섯 후보를 적용했다. 다만 이것은 역할 지시와 회수 보고에 근거한 절차 기록이며, OS 수준의 파일 접근 log로 독립 증명한 것은 아니다.

이 방법도 완전한 blind experiment는 아니다.

- main은 기존 후보를 알고 있었다.
- 각 원천 repo의 current·README·project guide에는 과거 판단이 일부 들어 있다.
- 같은 사용자의 자료와 비슷한 AI 도구를 사용하므로 해석 습관이 완전히 독립적이지 않다.

따라서 이 문서는 “기존 후보의 편향을 제거했다”고 쓰지 않는다. 기존 후보가 첫 추출의 직접 입력이 되는 것을 줄이고, 다른 중심이 실제로 나타나는지 확인한 재조사라고 한정한다.

### 처음 적용한 범위 기준

사건을 뽑을 때 처음부터 매력도·글 성립·준비도·제목 기준을 모두 적용하지 않았다. 첫 질문은 하나뿐이었다.

> 개발자가 AI와 일하며 판단이나 통제 방식이 달라진 사건인가?

이 질문을 통과한 사건을 충분히 펼친 뒤에만 `01`의 순서를 적용했다.

1. 이번 AI-native 범위인가
2. 주제 가치가 있는가
3. 한 편의 변화 단위가 있는가
4. 원자료와 공개 artifact가 준비됐는가
5. 어디까지 주장할 수 있는가
6. 개발자가 들어올 구체적인 제목과 장면이 있는가

## 2. 원자료의 역할과 조사 순서

raw를 무조건 가장 높은 증거로 두지 않았다. 자료마다 답할 수 있는 질문이 달랐다.

| 자료 | 이 조사에서 맡은 역할 | 단독으로 말할 수 없는 것 |
| --- | --- | --- |
| conversation raw·log | 사용자 의도, AI의 첫 framing, 정정과 반응의 순서 | 실제 코드가 바뀌었는지, 그 변화가 효과를 냈는지 |
| Git diff·code·test·eval | 실제로 무엇이 언제 바뀌었는지, 어떤 결과가 나왔는지 | 왜 그 선택을 했는지, 기각한 대안 |
| current·process·decision·spec | 당시 유효한 판단, 계약, 열린 질문, 선택 이유 | 실행 사실 전체, 후속 정정 뒤에도 유효한지 |
| 후대 분석·교차검증 | 반복 패턴, 수치 감사, 기여 상한, 원천 간 모순 | 원천에서 선택되지 않은 다른 중심 |
| ai-note notes·raw | 사용자가 무엇에 걸렸는지, 반복된 마찰과 개인적 문제의식 | 제품 변화의 인과, 보편적 효과 |

조사 순서는 다음과 같았다.

1. 각 원천 repo의 guide와 자료 계층을 확인했다.
2. 전체 시간축과 문서 제목을 먼저 색인했다.
3. 기존 다섯 후보를 보지 않고 판단 사건을 추출했다.
4. 선택한 전환점에서만 conversation raw로 내려갔다.
5. Git·code·test·eval과 당시 문서로 실제 변화를 교차했다.
6. fresh 후보를 만든 뒤 후대 분석과 `02`를 처음 대조했다.

### 사건 기록 형식

각 사건에서 다음을 분리했다.

1. 사용자의 원래 의도
2. AI의 첫 문제 정의
3. 실제 수행
4. 어긋남
5. 사용자 정정 또는 독립 실패 신호
6. 문제 재정의
7. 실제 작업·코드·문서 변화
8. 확인되지 않은 것과 주장 상한

## 3. 자료 범위와 실제 확인 범위

### AX 전체-작업본

- reachable commit **21/21**을 시간순으로 확인했다.
- `context/process`의 Markdown **33/33**을 확인했다.
  - 번호가 있는 과정 기록 32개
  - process 역할을 설명하는 `README.md` 1개
  - 번호 `30`은 두 파일에 중복되므로 번호만으로 시간순을 만들지 않았다.
- `current` 1개, `core` 5개, `research` 6개, `problem` 6개, `solution` Markdown 7개와 HTML 목업 1개, `engineering` 3개를 확인했다.
- Python 엔진, test 파일, 최종 fixture JSON 4개, skill·state contract·manifest·MCP 설정을 확인했다.
- 제출용 slim log 3개를 확인했다.
  - 주 작업 471 events
  - 설문 작업 29 events
  - 설치형 E2E 14 events
- 저장소 밖 raw rollout은 source-first 사건의 순서를 확인하는 데 추가로 필요하지 않았다. terminal cutoff·goal·tool output은 마지막 감사 단계에서 후대 raw 교차검증 결과만 확인했다.

원본: [AX 전체-작업본](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본)

후대 분석: [20-작업과정-하네스-분석](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/20-작업과정-하네스-분석)

### Tripproof

- main repo의 Git commit **268/268** 제목과 날짜를 시간순으로 스캔했다.
- `docs/work-log.md`의 날짜·작업 heading 21개를 확인했다.
- decision 주제 **15개**를 모두 색인했다.
  - 과거 단일 Markdown 형식과 이후 `index.md`·`raw.md` 폴더 형식을 함께 센 주제 수다.
- implementation-note 주제 **14개**를 모두 색인했다.
- conversation raw **624개**의 metadata를 확인했다.
  - Claude Code 21개
  - Codex 603개
  - main 판단 전환과 연결되는 9개 session을 심층 확인했다.
- 6월 25일, 6월 29~30일, 7월 2일은 decision·conversation raw·Git diff·canonical spec·eval을 함께 봤다.
- 6월 19일 Agoda QA bundle의 최상위 run directory 55개와 7월 1일 substrate bundle의 34개를 확인했다.
  - parent repeat bundle과 child run이 섞인 폴더 수이므로 독립 실험 수로 해석하지 않았다.
- `tripproof-prototype`, 과거 worktree는 조사 범위에서 제외했다.

원본: [Tripproof main repo](/Users/hammyeong-yeon/Desktop/10_work/tripproof)

### ai-note

- INDEX에 연결된 `notes.md` **62/62**를 순서대로 읽었다.
  - 범위 해당 48
  - 주변 맥락 11
  - 제외 3
- 별도 attempt의 `00-context.md` 두 개는 62개 notes 집계에서 제외했다.
- raw shortlist 16개와 보조 raw 1개를 확인했다.
- 각 raw를 전체 transcript, 직접 발췌, 혼합, 후대 구조화 회고로 구분했다.
- ai-note만으로 실제 제품 변화나 인과를 단정하지 않았다. 원 프로젝트 연결이 필요한 곳은 후속 검증으로 남겼다.

원본: [ai-note](/Users/hammyeong-yeon/Desktop/10_work/ai-note)

## 4. AX에서 추출한 판단 사건

### AX-1. 검색 전에 넣은 중립적인 분류도 관찰을 좁혔다

- **원래 의도**: 공식 해커톤 발화를 중요하게 보되 문제를 먼저 고르지 않고 자료가 말하는 방향을 넓게 보려 했다.
- **AI의 첫 정의**: `누구·어느 순간·무슨 마찰` 정도는 임시 질문이나 기록 틀로 먼저 둘 수 있다고 봤다.
- **어긋남**: 결론만 열어 두면 충분하다고 생각했지만, 사용자는 기록용 분류도 이후 관찰을 그 칸 안으로 끌 수 있다고 봤다.
- **정정과 재정의**: 먼저 고정할 것은 조사 범위, 공개 근거 조건, 출처 가중치, 반대 근거 자리, 기록 방식뿐이었다. 사용자·순간·마찰 유형은 자료를 읽은 뒤 기록할 항목으로 내렸다.
- **실제 변화**: 문제 카테고리 없이 20개 자료를 펼친 뒤 16개 신호로 후행 구조화했다. commits `0d53624`, `b263576`.
- **주장 상한**: 이 순서가 모든 조사에서 더 좋은 결과를 만든다는 통제 비교는 없다.

주요 원천:

- [넓게 조사한 뒤 좁히는 순서](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/05-broad-research-order.md)
- [2차 조사 흐름과 사용자 정정](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/09-discussion-and-ai-self-check.md)
- [비공개 slim log — 주 작업](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/logs/codex/019f4afd-80f9-7bc1-ba6f-99f4281c0607.jsonl)

### AX-2. 외부 기준을 받자 AI가 두 방향으로 연속 과교정했다

- **원래 의도**: 제3자가 준 조사 기준을 명령이 아니라 이미 논의한 2차 조사 흐름을 점검하는 재료로 쓰려 했다.
- **AI의 첫 정의**: 회사 공식 자료의 편향을 크게 경계했다.
- **실제 수행과 어긋남**: 첫 self-check 뒤에는 반대로 `회사 방향 먼저 → 그 주변 마찰만 외부 검증`으로 단순화했다. 두 번의 교정 모두 기존 합의인 `회사 중요도와 사용자 문제의 증명 범위를 함께 보되 섞지 않기`를 잃었다.
- **정정과 재정의**: 회사 발화는 회사가 무엇을 중요하게 보는지를 강하게 증명한다. 같은 자료가 현재 사용자 문제까지 증명하지는 않으므로 해결 상태·행동·결과·독립 근거는 별도로 확인한다.
- **실제 변화**: 잘못된 process 07은 지우지 않고 남겼고, process 08·09와 current를 최신 권위로 올렸다. problem 기준에도 근거 역할 분리가 반영됐다. commit `927f8f4`.
- **주장 상한**: self-check가 스스로 오류를 발견한 사건이 아니다. 사용자가 방향을 다시 지정한 뒤 self-check가 복구를 도왔다.

주요 원천:

- [회사 가중치와 객관성 과교정](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/07-company-weight-and-objectivity.md)
- [복구된 2차 조사 종합](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/08-second-research-synthesis.md)
- [두 차례 판단 전환의 전체 순서](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/09-discussion-and-ai-self-check.md)

### AX-3. 기존 후보에 새 기준을 붙이지 않고 원자료에서 다시 뽑았다

- **원래 의도**: 구체성·현재 근거·구현 가능성을 순서대로 적용하면 회사가 중요하게 보는 큰 문제나 아직 덜 증명된 가능성을 너무 일찍 잃을 수 있다는 우려가 있었다.
- **AI의 첫 정의**: `문제 존재 → 좁은 관점 → 크기 → 과제 적합성`을 순차 탈락 gate로 쓰려 했다.
- **어긋남**: 기존 세 후보에 새 rubric을 적용하면 기준이 새로운 후보를 발견하기보다 첫 후보를 정당화하는 장치가 될 수 있었다.
- **정정과 재정의**: 첫 후보판은 snapshot으로 보존하고, 기존 후보·process를 입력에서 제외한 별도 주체가 research 원자료에서 후보를 다시 추출한 뒤에만 두 판을 비교했다.
- **실제 변화**: 첫 판의 3개 후보와 별도로 5개 후보가 나왔다. 첫 판에서 상위 행동이나 하위 구간으로 묶였던 두 문제가 독립 비교 대상으로 드러났다. 첫 판의 SHA-256도 작업 전후 동일하게 보존했다. commit `1743e0c`.
- **주장 상한**: project start rule 때문에 worker가 current를 읽어 기존 후보 정보에 노출됐다. 완전한 blind extraction은 아니었다.

주요 원천:

- [독립 문제 후보 2차 추출](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/14-integrated-criteria-and-independent-second-pass.md)
- [첫 후보판](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/problem/01-candidates.md)
- [원자료 기반 2차 후보판](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/problem/02-candidates-second-pass.md)

### AX-4. 문제를 닫은 뒤 솔루션을 보는 순서를 뒤집었다

- **원래 의도**: 근거가 성립하는 문제 중 해커톤의 독창성·비즈니스성·데모 매력까지 함께 보고 최종 조합을 고르려 했다.
- **AI의 첫 정의**: Problem Statement 하나를 완전히 닫은 다음 그 문제 안에서 솔루션을 발산하는 순서였다.
- **어긋남**: 문제 근거를 보호하려던 절차가 다른 유효한 문제에서 더 매력적인 솔루션이 나올 가능성을 먼저 닫았다.
- **정정과 재정의**: 근거가 성립한 문제 후보 세 개를 남기고, 각 후보의 솔루션 가능성을 얕게 펼친 뒤 문제 근거와 솔루션 매력을 별도 축으로 비교했다.
- **실제 변화**: 세 문제에서 9개 솔루션을 만든 뒤 근거 2차 pass를 거쳐 세 조합으로 줄였다. 세 조합의 Markdown 결과와 대화형 HTML에서 총 여덟 번의 상태 전환을 먼저 구현하고 그 뒤 최종 문제–솔루션 조합을 골랐다. commits `34a4b55`, `012b21e`, `e848dd3`.
- **주장 상한**: 화려한 출력이 약한 문제 근거를 구제하지 않도록 근거 축은 계속 별도로 유지했다. Output-first가 최종 제품 품질을 높였다는 비교는 없다.

주요 원천:

- [문제를 닫기 전 솔루션 비교 진입](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/16-solution-comparison-entry.md)
- [성과 중심 솔루션 발산과 근거 재검토](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/17-performance-led-solution-passes.md)
- [세 실제 출력 비교](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/19-output-first-comparison.md)
- [대화형 상태 변화 목업](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/20-output-first-interactive-demo.md)
- [비교용 HTML artifact](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/solution/05-output-first-interactive-demo.html)

### AX-5. 구현 가능성을 설명하다 제품이 입력 도구로 축소됐다

- **원래 의도**: 실제 상품을 일행·일정에 대입하고, 사용자가 허용한 수정의 후속 영향과 판매자 답변 뒤 결제 판단 변화까지 다루려 했다.
- **AI의 첫 정의**: 상품 URL과 MCP 사실을 가져와 개인 조건과 대조하는 구현 가능한 흐름을 앞세웠다.
- **어긋남**: 입력 수단인 MCP와 상세 페이지 정리가 제품 중심처럼 보였고, 결과는 상세 요약기와 구분되기 어려웠다.
- **정정과 재정의**: MCP·상세는 입력층이다. 제품의 판별 기준은 원안 실행, 사용자가 허용한 구성만 재실행, 후속 영향, 답변 적용 범위에 따른 다음 행동 변화다.
- **실제 변화**: 선택 솔루션, current, top-level engineering goal, Loop 01 acceptance가 같은 방향으로 다시 쓰였다. commits `714369b`, `01fe376`, `052831b`.
- **주장 상한**: 기존 문제 후보를 다시 열지는 않았다. 당시 다른 후보의 사용자 근거가 더 약했기 때문이다.

주요 원천:

- [제품 중심 복원 과정](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/23-selected-solution-reframing.md)
- [선택 솔루션의 현재 계약](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/solution/06-selected-solution.md)
- [최상위 engineering goal](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/24-top-level-engineering-goal.md)

### AX-6. 살아 있는 구현 계약과 판단 이력을 다른 권위에 두었다

- **원래 의도**: top-level goal 아래 여러 구현 loop가 쌓이더라도 현재 구현자가 바로 따라야 할 active contract를 분명하게 두려 했다.
- **AI의 첫 정의**: loop 기록은 process에 둔다는 기존 규칙을 현재 goal 문서에도 적용했다.
- **어긋남**: 지금 따라야 하는 acceptance·evidence contract와 그것을 선택한 과거 이유가 같은 갱신 규칙을 갖게 됐다.
- **정정과 재정의**: engineering은 살아 있는 goal·acceptance·evidence contract를, process는 선택 이유·기각·실행 결과의 append history를 소유한다.
- **실제 변화**: `engineering/01-loop-01-goal.md`가 생겼고 process 25는 결정 이력으로 줄었다. core·README·current의 권위 연결도 바뀌었다. commit `052831b`.
- **주장 상한**: 한 프로젝트의 한 loop 사례다. 이 문서 배치가 다른 프로젝트에서도 우월하다는 장기 증거는 없다.

주요 원천:

- [Loop 01 문서 경계 교정](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/25-loop-01-goal.md)
- [살아 있는 Loop 01 계약](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/engineering/01-loop-01-goal.md)

### AX-7. 9개 test의 초록은 구현자가 만든 세계 안의 일관성이었다

- **원래 의도**: 설치된 plugin에 자연어로 요청해 원안→수정→판매자 답변→다음 행동 변화가 실제로 이어져야 했다.
- **AI의 첫 정의**: plugin scaffold, Python 엔진, fixture, 9개 test, CLI, MCP·URL 확인을 첫 구현 성공으로 봤다.
- **어긋남**: 공개 상세에서 이미 닫힌 티켓 절차를 fixture는 다시 질문하게 했다. 문자열 `"false"`, 아동 scope 누출, 상반 claim의 순서 의존, 잘못된 revision도 통과했다.
- **독립 실패 신호와 재정의**: fresh verifier가 설치형 자연어 E2E 부재와 source contract 결함을 찾았다. fixture consistency, source-to-contract 대조, adversarial schema, 설치된 자연어 E2E, 짧은 회귀를 서로 다른 gate로 나눴다.
- **실제 변화**: test는 9개에서 15개가 됐다. strict type·revision·conflict validation과 설치형 자연어 E2E가 추가됐다. worker checkpoint도 설명이 아니라 첫 artifact와 실행 결과를 요구하도록 바뀌었다. diff `61981aa..0bdb843`.
- **주장 상한**: final fresh verifier는 ZIP만 받은 완전한 제3자 재현이 아니었다. 설치 상태와 E2E artifact를 입력으로 받았다.

주요 원천:

- [첫 구현과 fresh 미통과](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/26-loop-01-first-implementation-and-operations-retro.md)
- [교정 cycle과 설치형 E2E](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/27-loop-01-correction-cycle.md)
- [최종 test](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/src/tests/test_tripproof.py)
- [최종 엔진](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/src/scripts/tripproof.py)

### AX-8. current를 읽었어도 최근 작업을 프로젝트 전체처럼 썼다

- **원래 의도**: 전체 프로젝트에서 AI와 사람이 리서치·문제·솔루션·구현을 어떻게 판단했는지 제출 설문에 담으려 했다.
- **AI의 첫 정의**: current와 context를 읽고도 Q4·Q5를 최근 Loop 01의 fresh 미통과와 결함 중심으로 작성했다.
- **어긋남**: 넓은 조사, 독립 문제 추출, Output-first 비교, 사람의 선택, 제품 중심 복원이 최신 구현 사건 뒤로 사라졌다.
- **정정과 재정의**: current는 자동 정답이 아니라 전체 계보를 되찾는 색인이다. 먼저 프로젝트 단계마다 어떤 문항을 맡길지 정하고, 최신 구현 검증은 Q5에만 남겼다.
- **실제 변화**: 설문 다섯 문항을 전면 재작성하고 process 29를 추가했다. commit `7c1fa47`.
- **주장 상한**: current가 스스로 편향을 고친 것이 아니다. 실패를 발견한 것은 사용자였고, current·context는 전체 계보를 복구하는 입력이었다.

주요 원천:

- [첫 설문판](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/28-submission-questionnaire.md)
- [current 지도에서 전면 재작성](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/29-questionnaire-rebuild-from-current.md)
- [비공개 설문 slim log](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/logs/codex/019f4c70-6484-7d53-80dd-4315e055d864.jsonl)

## 5. Tripproof에서 추출한 판단 사건

### Tripproof-1. `작게`라는 scope control이 제품 흐름 자체를 잘랐다

- **원래 의도**: 숙소 자료에서 검색 후보를 근거 있는 답변으로 바꾸고 사용자가 채팅 화면에서 확인하는 세로 slice를 만들려 했다.
- **AI의 첫 정의**: `작게`, `얇게`, `AC 1~3개`라는 문구를 가장 빨리 보이는 결과로 해석해 raw `facts[]`를 화면에 표시하는 방향으로 좁혔다.
- **어긋남**: `retrieval candidate → supported/missing을 반영한 ChatAnswer → 인라인 근거가 있는 사용자 답변`이라는 변환이 사라졌다. debug output이나 fixture 표시는 보이지만 제품 동작은 아니었다.
- **정정과 재정의**: scope를 줄이기 전에 입력, 이번 단계가 책임질 변환, 사용자가 읽는 출력, 넘지 말아야 할 선을 먼저 확인한다. 필드 수·provider 품질·UI polish는 줄일 수 있지만 제품의 인과 사슬은 자르지 않는다.
- **실제 변화**: prose 금지문을 더 붙이는 대신 실제 행위자를 묻는 decision-time 질문과 metamorphic·grounding·routing test를 추가했다. 잘못된 fact 추출 경로도 제거했다. commits `90097ba`, `50ad14f`, `4ec59dd`, `2eaefc9`.
- **주장 상한**: 질문과 test도 fixture 문구나 gate로 굳으면 같은 실패를 만들 수 있다. 이 사건은 “문서보다 test가 항상 낫다”는 결론이 아니다.

주요 원천:

- [Spec-driven slice와 제품 흐름 drift](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/implementation-notes/2026-06-09-spec-driven-product-flow-drift/index.md)
- [판단·테스트 강제로 바꾼 decision](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/decisions/2026-06-10-spec-driven-judgment-and-test-enforcement/index.md)
- [시나리오 기능에서 다음 spec으로 미뤄진 계약](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-09-spec-driven-deferral-in-scenario-features/raw.md)
- [넓은 시나리오가 provider-first로 수축한 장면](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-10-wide-scenario-topdown-slicing-drift/notes.md)

### Tripproof-2. 근거를 더 찾는 문제에서 제품 확정 권한의 문제로 돌아갔다

- **원래 의도**: 이미 근거가 있는데도 `NonSmoke, LargeBed는 확정`이라는 confident-wrong이 왜 제품 상태로 승격되는지 전체 흐름에서 찾으려 했다.
- **AI의 첫 정의**: grounding·sufficiency 부족, answer validation layer, query rewrite·rerank 같은 익숙한 component와 기법으로 차례로 좁혔다.
- **어긋남**: retrieval 후보에는 조건 문맥이 이미 있었다. 최초 `body`와 `value`가 틀렸는데 뒤쪽 검증은 snippet이 원문에 존재하는지만 봤다.
- **정정과 재정의**: LLM의 종합·의미 해석 능력은 쓰되 산출물을 곧바로 제품 상태로 승격하지 않는다. code는 source id·snippet 존재·형식·grounding 같은 기계적 계약을 소유한다. 어떤 조건이 어떤 값에 적용되는지 같은 의미 role은 모델이나 추출기의 명시 산출물이어야 한다.
- **실제 변화**: `docs/engineering/llm-design.md`와 self-certification decision이 생겼고 후속 spec 순서가 바뀌었다. commits `dedf411`~`b1a06c3`, `9005ad5`, `d5aa4c2`.
- **주장 상한**: 6월 25일 시점에는 answer candidate validation이 실제 개선을 만들었다는 before/after 결과가 없었다. 확인된 것은 실패 귀속과 설계 방향의 변화다.

주요 원천:

- [LLM 답변 자기-인증 실패 귀속 decision](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/decisions/2026-06-25-llm-answer-self-certification-reframe/index.md)
- [선별 배경 raw — transcript 아님](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/decisions/2026-06-25-llm-answer-self-certification-reframe/raw.md)
- [비공개 conversation raw — 최초 진단](/Users/hammyeong-yeon/Desktop/10_work/tripproof/.ai-conversation-logger/conversations/codex/019ef9bd-2a3d-79d3-b72e-1f42c144a5db.jsonl)
- [비공개 conversation raw — code 의미 판정 정정](/Users/hammyeong-yeon/Desktop/10_work/tripproof/.ai-conversation-logger/conversations/codex/019efef2-274c-7141-9afe-6fcf66389f87.jsonl)
- [ai-note 전체 transcript](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-25-llm-answer-self-certification/raw.md)

### Tripproof-3. 원칙을 정확히 말했지만 마지막 코드 분기에서 같은 오판이 돌아왔다

- **원래 의도**: LLM의 `supported` 자기선언을 그대로 믿지 않되 질문·답변 keyword gate에 기대지 않고 paraphrase에도 버티는 구조를 만들려 했다.
- **AI의 첫 정의**: code가 source-unit kind와 같은 page의 condition unit을 보고 의미를 판정하면 된다고 봤다.
- **실제 수행과 어긋남**: keyword를 피했지만 kind와 page proximity가 의미의 대리물이 됐다. 1~2장짜리 예약서에서는 서로 다른 정책·요금·요청이 같은 page에 몰려 깨끗한 날짜·객실까지 `needs_review`로 광범위하게 떨어졌다.
- **독립 실패 신호**: production-like run 14의 과잉강등과 사용자의 `code가 원문 존재는 볼 수 있지만 의미 검사를 맡는 것이 맞는가`라는 정정이 같은 방향을 가리켰다.
- **재정의**: code가 final state를 소유한다는 말은 code가 의미를 분류한다는 뜻이 아니다. code 책임을 기계적 contract로 줄이고 caveat relation은 별도 의미 층으로 옮겼다.
- **실제 변화**: `989727c`에서 구조 프록시를 제거했고, `7986d26`·`5d1880f`·`574dee4`에서 의미 층을 분리했다. 작은 모델 relation pass가 과잉강등되자 `118a916` 실험을 13초 뒤 `8040665`로 되돌렸다. 후속 A/B에서는 별도 relation 호출을 채택하지 않고 기본 disabled로 결정했지만, 비교·재실험을 위한 code path와 test는 남겼다.
- **주장 상한**: 일부 A/B는 model과 relation mode가 동시에 바뀌어 단일 원인 귀속이 불가능하다. `rule_pass`도 semantic correctness 점수가 아니다.

주요 원천:

- [구조 프록시 과잉강등](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/implementation-notes/2026-06-29-certification-structural-proxy-overdowngrade/index.md)
- [keyword gate의 거울상 함정](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/implementation-notes/2026-06-29-certification-keyword-gate-mirror-trap/index.md)
- [relation pass 과잉강등](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/implementation-notes/2026-06-29-caveat-relation-pass-overfire/index.md)
- [비공개 conversation raw — 구현·eval·후퇴](/Users/hammyeong-yeon/Desktop/10_work/tripproof/.ai-conversation-logger/conversations/claude-code/bf6189ad-7175-4213-8306-1d2c8a12a211.jsonl)
- [relation 호출 A/B canonical spec](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/specs/2026-06-19-agoda-original-pdf-qa-improvement/07-relation-vs-model-upgrade-ab.md)

### Tripproof-4. 구현과 137개 test 통과를 제품 AC 성공으로 올리지 않았다

- **원래 의도**: 별도 entailment 판정이 confident-wrong을 줄이면서 깨끗한 값은 과잉강등하지 않는지 ON/OFF로 확인하려 했다.
- **AI의 첫 정의**: 답이 고른 값·근거와 인용 unit 하나를 닫힌 판정 입력으로 주면 self-certification을 제거할 수 있다고 봤다.
- **실제 수행**: 추출과 판정 호출을 분리하고 137개 test를 통과했다. 첫 production smoke에서는 값과 조건이 다른 unit이라 판정이 조건을 못 본다는 설명을 만들었다.
- **어긋남과 정정**: 사용자는 구현·문서 완료보다 반복 eval을 먼저 요구했다. canonical A/B를 다시 보니 목표 문항의 `needs_review`도 설계한 conditional 성공이 아니라 값 미추출 뒤 안전망인 경우가 있었다. 초기 split-unit 설명도 일부 과대였다.
- **재정의**: AC1의 자기선언 배제와 AC3의 response shape는 확인됐지만, AC2의 confident-wrong 감소와 과잉강등 없음은 불성립으로 기록했다. 실패 중심을 판정 층에서 앞단 추출 산출물로 다시 옮겼다.
- **실제 변화**: `2c19df3` 구현 뒤 `a291558`에 측정·노트를 남겼고, `b7a7a77`에서 초기 설명을 정정하고 AC2 실패를 canonical spec에 반영했다.
- **주장 상한**: “judge는 받은 입력 안에서 옳았다”는 이 작은 사례의 관찰이다. 판정 층 구조를 만들었다는 사실은 품질 개선 증거가 아니다.

주요 원천:

- [조건부 값 entailment 판정 canonical spec](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/specs/2026-07-01-answer-pipeline-substrate-redesign/03-conditional-value-entailment-judgment.md)
- [초기 split-unit 관찰 — 후속 spec 정정 우선](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/implementation-notes/2026-07-02-entailment-closed-judgment-split-unit/index.md)
- [비공개 conversation raw — 구현 뒤 반복 eval](/Users/hammyeong-yeon/Desktop/10_work/tripproof/.ai-conversation-logger/conversations/claude-code/53091606-599f-41fd-9c0f-caf881ac5ca8.jsonl)

### Tripproof-5. 설정이나 async를 넣은 사실과 효과를 분리했다

이 두 사건은 하나의 신규 글 후보라기보다 완료와 성과를 판정하는 감각의 보강 사례다.

- context·output 길이 설정을 ON/OFF했지만 두 arm 모두 같은 2/8 문항만 통과했다. 입력 약 280~415 tokens와 출력 약 32 tokens가 설정 한계에 닿지 않아 config는 정상적으로 no-op였다.
- sync에서 async로 바꿔도 단일 요청은 answer 36~38초, 전체 42~45초로 사실상 같았다. 바뀐 성과는 단일 latency가 아니라 이벤트 루프 비차단과 동시 요청 overlap이었다.
- root spec은 로컬 GPU에서 요청이 직렬 큐잉될 것이라 가정했지만 실제 Ollama 설정에서는 세 요청이 겹쳤다. 가정은 문서에 있다는 이유로 유지하지 않고 실측으로 뒤집었다.

재사용할 기준은 다음이다.

- config 효과는 값이 실제로 binding되는 입력에서 측정한다.
- async 성과는 단일 latency가 아니라 바뀌는 시스템 축에서 측정한다.
- 구현·설정·분리 완료를 효과로 번역하지 않는다.

주요 원천:

- [config A/B no-op](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/implementation-notes/2026-07-02-context-length-config-ab-noop/index.md)
- [async 성과의 측정 축](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/implementation-notes/2026-07-02-async-runtime-parallelism-illusion/index.md)
- [async·httpx decision](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/decisions/2026-07-02-answer-runtime-async-httpx.md)

### Tripproof-6. 보존할 사례와 매번 비싸게 실행할 사례를 분리했다

- **원래 의도**: 구현 중 발견한 실패 유형은 fixture에 계속 보존하면서 새로운 judge의 품질도 calibration하려 했다.
- **AI의 첫 정의**: fixture inventory 전체를 새 judge version의 필수 live calibration 범위처럼 읽었다.
- **어긋남**: 처음 채택 근거는 14 cases × 6 axes, 84개 human-label 비교였다. 진단 fixture가 24 cases × 6 axes, 144 labels로 늘면서 별도 범위 결정 없이 live 실행 비용도 자동 증가했다.
- **재정의**: 사례 보존 범위와 비싼 live 실행 범위는 다르다. 전체 fixture는 빠른 contract replay로 보존하고, live judge는 바뀐 경계의 bounded scope를 먼저 실행한다.
- **실제 변화**: 08 spec에 실행 범위 구분을 반영하고 implementation note를 남겼다.
- **주장 상한**: 7월 22일에 생긴 가까운 관찰이며 장기 운영 효과는 아직 확인되지 않았다.

주요 원천:

- [eval 사례 수와 실행 범위 drift](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/implementation-notes/2026-07-22-eval-case-axis-count-drift/index.md)

## 6. ai-note에서 추출한 판단 사건

ai-note는 제품 변화의 canonical source가 아니다. 여기서는 사용자가 반복해서 어디에 걸렸고 어떤 정정을 했는지 보는 원천으로 사용했다. 제품·Git 변화가 필요한 주장은 AX와 Tripproof 원본으로 다시 연결했다.

### ai-note-1. AI의 지적 노력을 생성보다 탈락 사유 찾기에 먼저 썼다

- **원래 의도**: 멀티에이전트와 하네스 후보를 어떻게든 가치 있게 활용할 가능성을 넓게 찾고 싶었다.
- **AI의 첫 정의**: 후보마다 ROI·빈도·호출 가치·근거가 도입 임계를 넘는지 먼저 심사했다.
- **반복된 어긋남**: 4월 29일에는 후보 수가 기준에 따라 0→4→1→7→13개로 흔들렸고, 7월 16일에는 pilot 설계도 `효과 불명 → 근거 부족 → 보류`를 재생산할 구조가 됐다.
- **정정과 재정의**: 생성과 필터를 분리한다. 7월 1일에는 먼저 관성에 기대지 않은 발굴을 하고 이후 사실 필터를 적용했다. 7월 16일에는 전원 적용 예정이라는 전제 아래 순서와 막힌 지점, 형태 교체만 판단하게 바꿨다.
- **실제 변화**: 분석 prompt와 pilot 성공 조건이 달라졌다. 다만 장기 실행 결과는 아직 없다.
- **주장 상한**: 7월 1일의 결과 차이가 순서, 사용자 방향 시드, 성과 압박 중 무엇 때문인지 분리되지 않았다.

주요 원천:

- [멀티에이전트 가능성을 닫은 평가 raw](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-04-29-multi-agent-evaluation-closing/raw.md)
- [발굴과 필터 분리 raw](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-07-01-analysis-value-discovery-stance/raw.md)
- [pilot 성공 설계 raw](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-07-16-filtering-reproduction-pilot-success-design/raw.md)

### ai-note-2. 기존 문서와 병렬 조사 결과가 다음 판단의 권위가 됐다

- **원래 의도**: 원문 대화의 시행착오에서 포인트를 잡고 적절한 조사팀을 만들거나, 기존 engineering 뼈대를 실제 사례로 보강하려 했다.
- **AI의 첫 정의**: 원문·코드·외부 자료를 즉시 병렬 분해하거나, 조사 결과를 adopt·adapt·reject 기준으로 기존 뼈대보다 위에서 재심사했다.
- **어긋남**: 원문을 읽기 전에 역할을 나누면 사용자 정정과 판단 전환이 기능 티켓으로 평탄화됐다. 보강 자료는 기존 합의를 다시 심판하는 새 권위가 됐다.
- **정정과 재정의**: main이 원문에서 회수 기준을 먼저 세운 뒤 조사 역할을 구성한다. 조사 결과는 결정이 아니며, 기존 뼈대와 사용자 의도를 기준으로 채택·수정·기각한다.
- **실제 변화**: 6월 12일에는 병렬 위임 turn을 중단하고 source-first로 순서를 바꿨다. 6월 22일 사건은 회수 실패를 명시했지만 durable workflow 반영까지는 raw에서 확인되지 않는다.
- **주장 상한**: 모든 조사에서 main이 원문을 먼저 읽는 것이 빠르거나 우월하다는 일반화는 불가능하다. 시행착오의 순서와 사용자 정정이 핵심 근거일 때의 경계다.

주요 원천:

- [source-first orchestration raw](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-12-source-first-orchestration/raw.md)
- [조사 결과 회수 drift raw](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-22-delegated-research-recovery-drift/raw.md)
- [기존 문서 anchor와 fresh doc](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-12-fresh-doc-existing-anchor/notes.md)

### ai-note-3. 확실성을 위해 만든 문서층이 새 검증 표면이 됐다

- **원래 의도**: 원본을 보호하고 AI가 만든 연결과 사용자 합의를 분리해 다음 세션에서도 정확히 재진입하려 했다.
- **AI의 첫 정의**: source, realignment, agreement, 작업대, 구체화처럼 해석층을 더 세밀하게 나눴다.
- **어긋남**: 각 층이 다시 정확성 검증과 source 추적을 요구했다. 기존 산출물을 수정하면 그 문서의 frame에 계속 묶였고, 완화 지시도 기존 anchor를 기반으로 새 원칙을 만들었다.
- **정정과 재정의**: raw·합의 snapshot·현재 계약의 역할을 나누되, 산출물을 늘리는 것 자체를 정확성으로 보지 않는다. 기존 문서의 frame이 조사 대상을 소유하면 새 문서에서 원자료를 먼저 보고 마지막에 대조한다.
- **실제 변화**: Tripproof repo 분리, fresh doc 사용, raw 보존 경계가 생겼다. 각각이 실제 진행을 얼마나 개선했는지는 개별 원 프로젝트에서 다시 확인해야 한다.
- **주장 상한**: source 추적 자체가 문제인지, 미결정 상태와 포트폴리오 증거 역할을 한 문서가 동시에 가진 것이 문제인지 분리되지 않았다.

주요 원천:

- [AI 종합과 source trust](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-20-ai-synthesis-source-trust/notes.md)
- [잔재 anchor의 세션 전이](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-20-residual-anchor-carryover/notes.md)
- [source 추적 층 누적 raw](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-27-tripproof-source-tracing-layers/raw.md)
- [fresh doc과 기존 anchor](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-12-fresh-doc-existing-anchor/notes.md)

### ai-note-4. 제품 위험을 줄이려다 제품 위험이 없는 데모를 만들었다

- **원래 의도**: 실제 숙소 자료를 쓰는 LLM 기반 체크인 확인 slice를 만들려 했다.
- **AI의 첫 정의**: 민감정보·hallucination·ingestion 위험을 피하기 위해 sanitized seed와 deterministic adapter로 여러 구현면을 얕게 통과하려 했다.
- **어긋남**: test double과 dev harness가 product proof처럼 설명됐다. 실제 자료가 바뀌면 답이 바뀌고, 근거가 사라지면 missing이 되는 인과가 없었다.
- **정정과 재정의**: deterministic baseline은 test double이다. 제품 proof는 LLM 후보, 실제 source quote, supported·missing 상태, 사용자 출력까지의 인과가 살아 있어야 한다.
- **실제 변화**: ai-note raw에는 spec 수정 방향까지 있지만 코드 완료는 없다. 이후 Tripproof 6월 9~10일 decision·test 변화와 함께 볼 때 강한 사건이 된다.
- **주장 상한**: demo drift가 문서 예시, 모델 성향, 위험 회피 지시 중 무엇 때문인지 분리되지 않았다.

주요 원천:

- [불확실성 통제 demo drift raw](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-05-llm-grounding-demo-drift/raw.md)
- [Tripproof 제품 흐름 drift](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/implementation-notes/2026-06-09-spec-driven-product-flow-drift/index.md)

### ai-note-5. 통제 문장이 모델이 복제할 새 산출물이 됐다

- **원래 의도**: dev-hub 내부 운영 언어가 외부 제품 repo에 새는 것을 막으려 했다.
- **AI의 첫 정의**: README 상단에 강한 산문 경계와 좋음·나쁨 사례를 뒀다.
- **어긋남**: AI가 그 방어막 산문을 외부 README의 첫 문단으로 의역해 복제했다. 설명형 통제 텍스트가 모델에게 또 하나의 출력 예시가 됐다.
- **정정과 재정의**: 방어막을 인용 가능한 산문이 아니라 질문·금지 패턴·변환 명령을 가진 protocol block으로 바꿨다.
- **실제 변화**: README 4개에 protocol block을 적용하고 fresh session에서 외부 Markdown 10개를 검사해 지정한 누출 0건을 확인했다.
- **주장 상한**: 한 번의 시범이다. protocol 구조, 언더바, code block, 검증 질문 중 무엇이 차이를 만들었는지 분리되지 않았다.

주요 원천:

- [방어막 자체가 누출된 raw](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-28-barrier-as-leak-source/raw.md)

### ai-note-6. self-check는 정확한 설명 뒤의 다음 행동을 보장하지 않았다

- **원래 의도**: AI가 자기 직전의 문제 정의·추상화·작업 흐름을 실패 원인에 넣어 진단하게 만들려 했다.
- **AI의 첫 정의**: AI 일반론, provenance, 더 큰 원칙으로 올라가거나, 사용자의 첫 질문을 방향 오류 신호로 과잉 해석했다.
- **어긋남**: 5월 21일에는 AI 자신의 개입보다 일반 출처 원칙이 앞섰다. 7월 9일에는 전진 편향을 고치는 대화에서 AI가 초안 작업으로 3~4회 다시 직행했다.
- **정정과 재정의**: `더 근본적으로`는 더 추상적으로 올라가는 일이 아니라 방금 결과를 만든 결정 위치로 돌아가는 일이다. 진단 뒤에는 다음 행동이 실제로 바뀌었는지를 별도로 확인한다.
- **실제 변화**: `ai-self-check`, `principle-calibration` skill이 생겼고, 전역 `기본은 전진` 문구가 임팩트 우선 판단으로 바뀌었다.
- **주장 상한**: skill·전역 규칙 생성은 확인되지만 이후 행동 개선 효과는 분리 측정되지 않았다.

주요 원천:

- [self-check와 principle calibration의 발단](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-21-ai-self-check-principle-calibration/raw.md)
- [forward bias 교정 중 행동 반복](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-07-09-harness-forward-bias-impact-axis/raw.md)

## 7. 기존 후보를 보지 않고 만든 fresh 후보군

아래 후보는 기존 다섯 후보와의 관계를 붙이기 전에 원천 사건만 묶어 만든 것이다. 사건 수가 많다는 이유로 독립 후보를 만들지 않았다. 하나의 중심 질문, 판단 변화, 실제 artifact, 다음 작업으로 옮길 기준, 다시 열 조건이 함께 있는지 봤다.

### Fresh-1. AI에게 작게 만들라고 했더니 제품 흐름이 사라졌다

- **중심 질문**
  - AI에게 scope를 줄이라고 할 때 무엇을 줄이고 무엇은 끝까지 관통시켜야 하는가?
  - 얇은 vertical slice와 가장 빨리 보이는 surrogate output은 어떻게 구분하는가?
- **실제 장면**
  - Tripproof에서 `facts[]`를 바로 화면에 표시하는 경로가 작은 구현으로 제안됐다.
  - deterministic adapter와 sanitized seed가 실제 LLM product proof처럼 설명됐다.
  - AX에서는 MCP·상세 정보 수집이 제품 중심처럼 올라와 사용자의 상태 변화가 가려졌다.
- **판단 변화**
  - scope의 크기를 파일 수나 구현 난이도로 재지 않는다.
  - `사용자 입력 → 이번 slice가 맡은 변환 → 사용자가 읽는 출력 → 다음 행동`에서 최소 한 경로를 끝까지 살린다.
  - 필드 수, provider 품질, 데이터 다양성, UI polish는 줄일 수 있지만 핵심 변환을 다음 spec으로 미루지 않는다.
- **보이는 artifact**
  - Tripproof의 6월 9일 implementation note, 6월 10일 decision, 제품행동 test와 dead path 제거 commit.
  - AX의 `solution/06`, top-level engineering goal, Loop 01 acceptance before/after.
- **다른 개발자가 가져갈 기준**
  - “작게”라고 말하기 전에 이번 slice가 바꿔야 할 사용자 상태와 반드시 살아야 할 인과를 한 줄로 쓴다.
  - test double·fixture·raw response가 그 인과를 대신하는지 확인한다.
- **반례와 한계**
  - 제품 본질이 deterministic contract인 기능에서는 deterministic 구현 자체가 product proof일 수 있다.
  - 모든 작은 기술 slice가 UI까지 관통해야 한다는 뜻은 아니다. 해당 slice의 소비자가 실제로 사용하는 contract까지 닫혀야 한다는 뜻이다.
- **근거 강도**
  - **강함.** 사용자 정정, 여러 날짜의 raw, decision, code·test 변화, AX의 별도 제품 재정의가 함께 있다.
- **제목 후보**
  - `AI에게 작게 만들라고 했더니 제품 흐름이 사라졌다`
  - `얇은 slice와 가장 빨리 보이는 결과는 다르다`
  - `AI가 scope를 줄일 때 무엇을 끝까지 남겨야 할까`

### Fresh-2. 기존 문서를 고치지 않고 원자료에서 다시 뽑은 이유

- **중심 질문**
  - 기존 문서의 결론이 틀린지 의심될 때 왜 그 문서를 더 잘 고치는 것만으로는 부족한가?
  - fresh extraction은 새 AI를 부르는 일과 무엇이 다른가?
- **실제 장면**
  - AX에서 첫 3후보판과 process 13을 직접 입력에서 제외한 별도 5후보판을 만든 뒤 대조했다. 다만 작업자는 project `current.md`에는 노출됐으므로 완전한 blind pass는 아니었다.
  - ai-note에서는 기존 조사 문서를 수정할수록 그 frame에 묶여 fresh doc을 요청한 사건과, 병렬 조사 전에 원문을 먼저 보게 한 turn abort가 반복됐다.
  - 이번 재조사도 `01`·`02`를 hash로 고정하고 source-first 결과를 `03`에 따로 두었다.
- **판단 변화**
  - 기존 산출물을 정답 후보로 둔 채 수정하는 일과, 원자료에서 문제 경계를 다시 생성하는 일을 분리한다.
  - 첫 판은 실패작으로 지우지 않고 snapshot으로 보존한다.
  - fresh pass가 끝난 뒤에만 유지·신규·충돌을 대조한다.
- **보이는 artifact**
  - AX `problem/01`, `problem/02`, process 14, commit `1743e0c`, 첫 판 SHA 보존.
  - 이 조사 폴더의 `01`·`02` 불변 hash와 새 `03`.
- **다른 개발자가 가져갈 기준**
  - 버그가 문장이나 수치가 아니라 문제를 묶은 방식에 있다고 의심되면 기존 문서를 target이 아니라 가린 비교 기준으로 둔다.
  - fresh pass에는 raw source와 범위만 주고 기존 결론은 마지막 대조 때 공개한다.
- **반례와 한계**
  - 기존 문서를 숨기면 이미 검증한 제약과 실패를 다시 반복할 수 있다.
  - 같은 모델·같은 current·같은 source를 쓰면 완전한 독립은 아니다.
  - fresh 결과도 자동 정답이 아니며 마지막 reconciliation이 필요하다.
- **근거 강도**
  - **강함.** AX에서 대화·Git·두 후보판이 연결되고 ai-note에 같은 마찰이 반복된다. 다만 blind 정도는 제한적이다.
  - **제목 후보**
  - `기존 문서를 고치지 않고 원자료에서 다시 뽑은 이유`
  - `기존 후보판을 직접 입력에서 빼고 다시 조사시켰다`
  - `문서를 수정할수록 기존 프레임이 더 단단해질 때`

### Fresh-3. 문제를 고르기 전에 결과를 먼저 만들어 봤다

- **중심 질문**
  - 근거가 성립하는 문제 후보가 여러 개일 때, 문제를 먼저 닫는 것이 언제 더 좋은 제품 가능성을 없애는가?
  - AI가 싸게 여러 결과를 만들 수 있을 때 무엇을 구현 전에 비교해야 하는가?
- **실제 장면**
  - AX에서 세 문제를 먼저 하나로 줄이지 않고 각 문제의 솔루션을 3개씩 펼쳤다.
  - 근거 2차 pass 뒤 세 조합의 Markdown 결과와 대화형 HTML 상태 변화를 실제로 만들었다.
  - 입력, 첫 판정, 사용자 수정, 답변 뒤 재판정이 화면에서 어떻게 다른지 보고 최종 조합을 골랐다.
- **판단 변화**
  - 문제의 근거와 솔루션의 매력을 한 점수로 합치지 않는다.
  - 설명·기능 목록 대신 사용자가 받는 출력과 상태 변화라는 같은 비교 단위를 먼저 만든다.
  - 근거가 약한 문제를 화려한 output으로 구제하지 않고 두 축을 마지막까지 분리한다.
- **보이는 artifact**
  - `solution/04-output-first-comparison.md`
  - `solution/05-output-first-interactive-demo.html`
  - process 19~21과 commit `e848dd3`.
- **다른 개발자가 가져갈 기준**
  - 아키텍처·spec·제품 후보를 고를 때 각 후보가 만들 최종 observable을 같은 해상도로 먼저 실행한다.
  - API나 component가 아니라 사용자 상태와 다음 행동을 비교한다.
- **반례와 한계**
  - 실제 데이터·운영 비용·구현 난이도를 숨긴 정적 mock은 선택을 오히려 왜곡할 수 있다.
  - Output-first는 문제 근거 검증을 대체하지 않는다.
  - 일반적인 prototyping과 다른 AI-native 가치가 무엇인지 공개 글에서 분명히 해야 한다.
- **근거 강도**
  - **강함.** 한 프로젝트이지만 정정→비교 artifact→최종 선택의 온전한 시간축이 있다.
- **제목 후보**
  - `문제를 고르기 전에 결과를 먼저 만들어 봤다`
  - `AI와 설계안을 비교할 때 설명보다 출력을 먼저 본 이유`
  - `문제 정의를 닫기 전에 세 개의 결과를 실행했다`

### Fresh-4. 좋은 기준보다 먼저 정해야 했던 것은 판단 순서였다

- **중심 질문**
  - 같은 평가 기준도 생성 전, 주장 검증 중, 후보 수렴 때 각각 다른 결과를 만드는 이유는 무엇인가?
- **실제 장면**
  - AX의 검색 전 분류 제거, 순차 gate 폐기, 기존 후보를 가린 second pass.
  - ai-note의 멀티에이전트 후보 조기 탈락과 7월 1일 생성·필터 분리.
  - 7월 16일 pilot의 `괜찮은 것만 고르기`가 다시 전부 보류로 수렴할 구조.
- **판단 변화**
  - 탐색 중에는 주장별 사실·모름·위험을 엄격히 표시한다.
  - 후보 전체의 선택·미선택·종료는 충분히 펼친 뒤 판단한다.
  - 탐색 전에 고정할 것은 범위·비용·금지선·기록 방식이며, 가능성 분류는 자료를 본 뒤 만든다.
- **보이는 artifact**
  - AX `research/01`, `problem/01`·`02`, process 05·14.
  - ai-note의 두 prompt pass와 pilot 설계 raw.
- **다른 개발자가 가져갈 기준**
  - 기준의 내용만 점검하지 말고 그 기준이 지금 무엇을 죽일 권한을 갖는지 묻는다.
- **반례와 한계**
  - 사실과 명백히 모순하거나 비용·안전 경계를 넘는 후보는 중간에도 종료해야 한다.
  - 순서를 바꾼 뒤 최종 품질이 높아졌다는 통제 비교는 없다.
- **근거 강도**
  - **강함.** 여러 프로젝트·날짜에 반복되고 실제 후보판과 prompt artifact가 있다.

### Fresh-5. 현재 상태를 남기는 것과 현재 권위를 작동시키는 것은 다르다

- **중심 질문**
  - 올바른 current와 engineering 기준이 있어도 왜 AI는 최신 사건이나 가장 쉬운 구현으로 다시 기우는가?
- **실제 장면**
  - AX에서 current를 읽은 설문 session이 최신 Loop 01을 프로젝트 전체처럼 썼다.
  - active Loop 계약을 process history에서 engineering으로 옮겼다.
  - Tripproof에서 engineering docs를 만들어도 decision 순간에 읽히지 않아 root guide를 경계→문서 router로 바꿨다.
- **판단 변화**
  - current는 모든 답을 담는 문서가 아니라 현재 cursor·전체 계보·권위 원천을 연결하는 router다.
  - 규칙의 품질과 그 규칙이 필요한 결정 순간에 도달하는지는 별도 문제다.
  - current를 읽었다는 ritual보다 이번 평가가 어느 시간축을 대상으로 하는지 다시 지정한다.
- **보이는 artifact**
  - AX current, engineering Loop goal, process 28→29.
  - Tripproof `CLAUDE.md` router와 engineering decision 후속 절.
- **다른 개발자가 가져갈 기준**
  - active state, append history, executable contract의 갱신 책임과 권위를 분리한다.
  - 문서가 존재하는지만 아니라 어떤 조건에서 읽히는지 확인한다.
- **반례와 한계**
  - current나 router의 단독 효과는 분리되지 않았다.
  - 너무 강한 자동 import는 관련 없는 문서를 상시 context에 올릴 수 있다.
- **근거 강도**
  - **중상.** Git·문서·정정 장면은 강하지만 인과 효과 비교는 없다.

### Fresh-6. 독립 판별의 다른 절반은 main의 회수 권한이었다

- **중심 질문**
  - reviewer를 구현자와 분리한 뒤, 그 결과가 새 정답이 되지 않게 누가 무엇으로 회수하는가?
- **실제 장면**
  - AX의 source-first second pass와 fixture 세계 밖 fresh verifier.
  - ai-note의 병렬 조사 선행 중단과 조사팀 결과가 기존 뼈대를 재심사한 회수 실패.
  - Tripproof의 relation judge와 구조 proxy도 다시 eval 대상이 된 사건.
- **판단 변화**
  - 판별자는 raw source 접근, 질문 수정, 판정 권한을 갖는다.
  - write와 완료 선언은 분리한다.
  - main은 사용자 의도·현재 contract·실제 artifact를 기준으로 reviewer 결과를 채택·수정·기각한다.
- **보이는 artifact**
  - AX 독립 후보판과 9→15 test diff.
  - Tripproof revert·canonical spec 정정.
- **다른 개발자가 가져갈 기준**
  - 독립성을 모델 수가 아니라 입력, source 접근, 질문 수정 권한, write 권한, 완료 권한, 회수 기준으로 정의한다.
- **반례와 한계**
  - main 자체가 기존 frame에 오염됐다면 회수 권한만으로 충분하지 않다.
  - fresh·blind라는 이름은 독립을 증명하지 않는다.
- **근거 강도**
  - **강함.** 여러 종류의 판별과 실제 정정 artifact가 있다.

### Fresh-7. 자기진단과 행동 변화를 다른 결과로 본다

- **중심 질문**
  - AI가 자기 오류를 정확히 설명했는데 왜 다음 행동에서 같은 방향을 반복하는가?
- **실제 장면**
  - AX의 회사 가중치·객관성 양방향 과교정.
  - demo drift를 진단하고도 다시 deterministic 해결책으로 중심을 옮긴 대화.
  - 전진 편향을 고치는 대화에서 바로 초안 작업으로 재진입한 사건.
- **판단 변화**
  - self-check 결과는 설명문이 아니라 다음 행동 차이로 확인한다.
  - 같은 frame 안의 자기해명이 길어지면 raw에 접근하는 fresh audit로 올린다.
  - 첫 정정이나 단순 설명 질문은 메타 절차로 올리지 않는다.
- **보이는 artifact**
  - self-check·principle calibration skill, 전역 태도 before/after, AX process 07~09.
- **다른 개발자가 가져갈 기준**
  - 진단 정확도, 행동 변화, 재발 방지를 각각 다른 완료 조건으로 둔다.
- **반례와 한계**
  - 행동 변화의 안정적 효과는 확인되지 않았다.
  - 모든 오독을 fresh audit로 올리면 self-check 자체가 본 작업을 가린다.
- **근거 강도**
  - **중상.** raw와 artifact는 풍부하지만 성공 효과는 약하다.

### Fresh-8. 보존 범위와 실행·교체 범위를 분리한다

- **중심 질문**
  - 발견한 모든 실패와 만든 모든 artifact를 같은 단위로 보존·실행·폐기해야 하는가?
- **실제 장면**
  - Tripproof에서 24개 diagnostic fixture 전체가 비싼 live calibration 의무로 승격됐다.
  - AX에서 active contract와 process history가 다른 갱신 규칙으로 분리됐다.
  - ai-note에서 source 층이 늘수록 모든 층이 새 검증 표면이 됐다.
- **판단 변화**
  - 기억해야 할 사례와 매번 실행할 사례를 분리한다.
  - 지금 따라야 할 contract와 과거 판단 이력을 분리한다.
  - 검증된 core와 presentation·evidence artifact를 다른 교체 단위로 본다.
- **보이는 artifact**
  - Tripproof eval scope note, AX engineering/process split.
  - Cofathon의 실제 artifact/core 폐기·보존은 기존 `02`의 원천이며 이번에는 재조사하지 않았다.
- **다른 개발자가 가져갈 기준**
  - `보존해야 하는가`, `현재 권위인가`, `매번 실행해야 하는가`, `교체 가능한가`를 한 질문으로 합치지 않는다.
- **반례와 한계**
  - 범위가 넓어 한 편에서 current·eval·제품 artifact를 모두 다루면 다시 역량 목록 글이 된다.
  - 독립 글보다 기존 후보들의 공통 mechanism일 가능성이 크다.
- **근거 강도**
  - **중상.** 개별 사건은 강하지만 하나의 중심 질문으로 묶을 때 넓어진다.

### 탐색 후보로만 남긴 것

#### 통제 문장은 왜 결과물로 복제되는가

실제 누출과 protocol block 적용 뒤 누출 0건이라는 장면은 매력적이다. 그러나 한 번의 표본이고 어떤 요소가 효과를 만들었는지 분리되지 않았다. 현재는 독립 글보다 context·harness 문서의 정보 경계를 설명하는 장면으로 둔다.

#### AI 하네스가 본 작업을 가리는 가장 단순한 증거

ai-note의 `본 컨셉 515줄 대 메타 약 13,000줄·85파일·제품 코드 0줄`은 강한 hook이다. 하지만 후대 구조화 회고의 수치이며 repo 재계산과 그 뒤 제품 재개의 인과가 없다. Cofathon·Tripproof 원본을 별도로 조사하기 전에는 artifact/core 글의 배경 장면으로만 둔다.

#### 모델·code·judge의 의미 판정 권한

Tripproof의 6월 25일~7월 3일 사건은 기술적으로 가장 촘촘하다. 그러나 중심을 pipeline component 배치와 LLM 의미 판정으로 두면 이번 시리즈보다 AI engineering 글에 가까워진다. 독립 판별과 완료 증거의 반례로 사용하거나 별도 기술 글로 분리한다.

## 8. 현재 다섯 후보와의 대조

### 대조 결과 요약

| `02`의 현재 후보 | 판정 | source-first 재조사가 바꾼 것 |
| --- | --- | --- |
| current / active-state operation | 유지, 중심 보강 | 기록과 current의 분리뿐 아니라 active contract·history·평가 시간축의 권위 배치로 구체화 |
| 독립 판별 / 제3판별자 | 유지, 범위 확장 | code review 외에 fresh generation, source 접근, main 회수 권한까지 독립성의 조건으로 추가 |
| 평가 기준을 적용하는 시점 | 중심 질문 변경 제안 | rubric을 늦게 쓴다는 말보다 생성·주장 판정·후보 수렴의 판단 대상과 순서 분리로 재정의 |
| AI self-check | 유지, 한계 강화 | 정확한 자기진단과 다음 행동 변화가 분리된다는 raw 근거가 늘어남 |
| artifact/core 분리 | 유지, 이번 재판정은 부분적 | Tripproof가 보존·실행 범위와 제품 인과를 보강하지만 Cofathon 원본은 범위 밖 |

### 후보 1. current / active-state operation

**판정: 유지. 중심 질문을 조금 더 정밀하게 한다.**

원천은 current의 효용을 약화하지 않았다. 오히려 파생 분석만 보았을 때보다 사용 장면이 구체적으로 보였다.

- active Loop 계약을 process history에서 engineering으로 옮긴 장면
- 최근 Loop 01에 과적합한 설문을 current의 전체 지도에서 다시 구성한 장면
- final current가 upload 실패 같은 terminal event를 놓친 장면
- Tripproof에서 좋은 engineering 문서가 있어도 decision 순간에 도달하지 않으면 없는 것과 비슷해진 장면

따라서 current의 중심은 다음처럼 좁히는 편이 낫다.

> current는 긴 context의 요약문이 아니라, 이번 판단의 시간축·현재 효력·단일 cursor·권위 원천을 연결하는 active control surface다.

이번 원천이 추가한 가장 중요한 한계도 분명하다.

> current를 읽었다고 최근성 편향이 자동으로 사라지지 않는다. 사용자가 이번 평가가 어느 시간축을 대상으로 하는지 다시 지정하고, current에서 관련 원천으로 내려가야 한다.

`02`를 수정한다면 AX 후대 분석 링크만 두지 않고 process 25·29와 current 원본, 해당 Git diff를 주요 근거에 추가할 수 있다. 이번 단계에서는 반영 제안만 남긴다.

### 후보 2. 독립 판별 / 제3판별자

**판정: 유지. “판별자 독립”과 “main 회수 권한”을 함께 설명한다.**

9→15 test와 설치형 E2E 사건은 여전히 가장 강한 기술 장면이다. 원천 재조사는 이 사건을 약화하지 않고 다음 두 경계를 더했다.

1. 독립성은 판정 단계만의 문제가 아니다.
   - AX의 기존 후보판을 숨긴 2차 생성은 첫 해석과 오류 상관을 줄이려는 입력 설계였다.
   - reviewer가 기존 결론을 받아 평가하는 것과 raw에서 다시 생성하는 것은 다르다.
2. 독립 reviewer 결과도 완료 선언이 아니다.
   - ai-note의 6월 22일 사건에서는 보강용 조사 결과가 기존 뼈대를 재심사하는 새 권위가 됐다.
   - Tripproof의 judge·relation pass·구조 proxy도 별도 eval과 revert의 대상이었다.

따라서 글의 판별 계약에는 다음이 모두 들어가야 한다.

- 무엇을 입력으로 받는가
- raw·canonical source에 접근하는가
- 질문을 기각하거나 다시 잡을 수 있는가
- write 권한이 있는가
- 완료를 선언할 수 있는가
- main은 어떤 contract와 원천으로 결과를 회수하는가

다만 첫 글의 기술적 spine은 계속 AX 구현 사건에 두는 편이 좋다. fresh generation과 회수 권한을 전부 같은 비중으로 넣으면 “독립성의 종합 이론”이 되어 즉시성이 약해질 수 있다.

### 후보 3. 평가 기준을 적용하는 시점

**판정: 유지보다 중심 질문 변경에 가깝다.**

기존 후보는 `rubric을 씨앗이 아니라 필터로 쓴다`, `주장별 엄격함과 후보별 개방을 분리한다`는 방향이었다. 원천 재조사는 이 방향을 지지하면서 더 앞쪽과 뒤쪽을 보여 줬다.

- 검색 전의 중립적 분류도 관찰을 좁혔다.
- 기존 후보에 새 기준을 붙이면 기준이 발견 장치가 아니라 정당화 장치가 됐다.
- 문제를 먼저 닫으면 다른 문제–솔루션 조합의 가능성을 잃었다.
- 생성 전에 ROI 심사를 하면 AI의 지적 노력이 탈락 사유 찾기에 쓰였다.
- diagnostic fixture를 보존한다는 결정이 비싼 live 실행 의무로 자동 승격됐다.

그래서 더 정확한 중심 질문은 다음이다.

> 좋은 기준이 있는가보다, 지금 그 기준이 무엇을 판단하고 무엇을 닫을 권한을 갖는가?

이 글에서 분리해야 할 판단은 세 가지다.

1. **생성·관찰** — 문제 경계와 후보를 넓게 만든다.
2. **주장 판정** — 각 후보 안의 사실·모름·위험을 엄격히 표시한다.
3. **후보 수렴** — 전체를 함께 보고 선택·미선택·종료를 판단한다.

따라서 기존 제목 `좋은 평가 기준을 먼저 줬더니 AI의 후보가 전부 비슷해졌다`는 hook으로 남길 수 있지만, 본문 중심은 `평가 기준의 시점`보다 `생성과 판별의 판단 대상·순서`로 바꾸는 편이 원천에 맞다.

### 후보 4. AI self-check

**판정: 유지. 성공 protocol로 올리지 않는 현재 경계가 더 강해졌다.**

AX process 07~09는 self-check가 두 번의 과교정을 자동으로 막지 못했음을 보여 준다. ai-note raw는 자기진단을 정확히 설명하고도 같은 대화에서 초안 작성으로 전진하는 행동을 반복했다.

추가할 핵심은 “self-check가 실패했다”가 아니다.

- 자기 개입을 원인에 넣으면 외부 대상만 탓할 때보다 진단이 정밀해질 수 있다.
- 그 진단은 다음 행동 변화와 다른 결과다.
- 첫 정정은 바로 반영하면 되고, 같은 축의 오독이 반복될 때만 fresh audit가 필요하다.
- fresh auditor 결과도 main의 회수 없이 정답이 되지 않는다.

기존 후보의 중심 질문과 주장 상한은 그대로 유효하다. source-first 재조사로 순서와 반복 횟수를 더 정확히 복원할 수 있게 됐다.

### 후보 5. 결과물 폐기와 기능 core 보존

**판정: 유지. 단, 이번 조사만으로 전체 후보를 재평가하지 않는다.**

이번 범위에서는 Cofathon 원본 process 36~38을 다시 읽지 않았다. 따라서 `02`가 설명하는 reviewer artifact 폐기·feature core 보존·사용자 진입 재설계를 새로운 원천 조사로 확인했다고 쓰지 않는다.

다만 AX·Tripproof·ai-note는 이 후보의 주변 경계를 보강했다.

- scope를 줄일 때 product path를 자르는 문제
- current contract와 process history를 다른 갱신 단위로 보는 문제
- diagnostic fixture 보존 범위와 live 실행 범위를 나누는 문제
- source 층이 늘면서 모든 artifact가 새 검증 표면이 되는 문제

이 사건들은 모두 “무엇을 같은 교체 단위로 보지 않을 것인가”라는 감각을 공유한다. 그러나 한 글에 넣으면 제품 artifact, 문서 lifecycle, eval 운영이 섞인다. 기존 글은 계속 Cofathon의 실제 삭제·보존 결정을 중심으로 두고 나머지는 mechanism이나 반례로 제한하는 편이 좋다.

### 신규 후보

#### 신규 강후보 1. 제품 흐름을 자르지 않는 scope control

독립 후보로 올린다.

- 기존 artifact/core와 달리 **만든 뒤 무엇을 버릴지**가 아니라 **만들기 전에 무엇을 줄여도 되는지**를 다룬다.
- Tripproof에서 여러 날짜에 반복됐고 AX의 제품 중심 복원이 별도 보강 사건이 된다.
- 사용자 정정, code·test 변화, 다음 구현 기준이 모두 있다.
- 개발자가 즉시 알아볼 제목과 기술 artifact가 준비돼 있다.

#### 신규 강후보 2. 기존 산출물을 가린 source-first second pass

독립 후보로 올린다.

- 평가 기준 시점과 관련되지만, 중심은 rubric이 아니라 **기존 artifact가 새 생성의 prior가 되는 문제**다.
- 독립 판별과도 관련되지만, reviewer가 결과를 판정하는 것이 아니라 **다시 생성한 뒤 두 판을 대조**한다는 차이가 있다.
- AX의 온전한 사건과 ai-note의 반복 관찰이 있다.

#### 신규 강후보 3. Output-informed problem selection

독립 후보로 올린다.

- 평가 기준의 시점은 언제 후보를 닫는지를 묻는다.
- 이 후보는 후보를 닫기 전에 **무엇을 비교 대상으로 만들어야 하는지**를 묻는다.
- 같은 해상도의 출력과 상태 변화라는 실제 artifact가 있다.
- AI-native의 고유성은 추가 shaping이 필요하다. “AI가 여러 산출물을 싸게 생성하므로, 문제 정의 단계에서도 결과 공간을 실행해 볼 수 있다”는 변화가 중심이어야 일반 prototyping 글과 구분된다.

### 다른 후보로 병합하는 것

- **규칙 품질과 activation channel의 분리**
  - current 글의 `권위 원천으로 가는 router`와 `결정 순간의 targeted read` mechanism으로 넣는다.
- **main의 회수 권한**
  - 독립 판별 글의 마지막 조건으로 넣는다.
- **보존 범위와 비싼 실행 범위의 분리**
  - artifact/core의 넓은 mechanism 또는 평가 기준 글의 운영 반례로 쓴다. 독립 글로는 범위가 좁다.
- **제품 입력 도구가 제품을 삼키는 문제**
  - 신규 scope-control 글의 AX 보강 사건으로 넣는다.
- **모델·code·judge의 의미 판정 권한**
  - 독립 판별의 반례로 제한하거나 별도 AI engineering 글로 분리한다.

### 글로 성립하지 않아 보류하는 것

- 통제 문장 자체가 산출물로 복제되는 문제
  - 장면은 좋지만 표본과 효과 요인 분리가 약하다.
- AI 하네스가 본 작업을 가린 수치
  - hook은 강하지만 원 repo 재계산과 이후 효과가 없다.
- config no-op와 async 측정축
  - 훌륭한 기술 사례지만 이번 AI-native 역량의 독립 중심보다 완료 증거·주장 통제의 보강 사례다.
- 7월 22일 eval 실행 범위
  - 유용한 운영 감각이지만 장기 결과가 없고 단독 한 편보다 다른 후보의 구체 예시가 맞다.

## 9. 후보별 근거 강도와 주장 상한

강한 신규 후보의 최소 조건은 두 종류의 증거였다.

1. 사용자–AI 상호작용의 순서
2. 실제 artifact·code·test·workflow 변화

둘 중 하나만 있는 후보는 탐색 후보로 내렸다.

| 후보 | 상호작용 순서 | 실제 변화 | 현재 말할 수 있는 것 | 말할 수 없는 것 |
| --- | --- | --- | --- | --- |
| current | AX 설문 정정·문서 권위 이동 | current·engineering·process·설문 diff | 전체 계보와 현재 효력의 router로 사용됐다 | current 하나가 재진입·생산성을 만들었다 |
| 독립 판별 | AX fresh 미통과·사용자 교정, ai-note 회수 실패 | 9→15 test, E2E, revert·spec 정정 | 같은 가정의 오류 상관을 줄이는 입력·권한 계약이 필요했다 | fresh AI가 항상 더 옳다 |
| 생성·판별 순서 | AX·ai-note의 조기 수렴 정정 | 두 후보판, prompt pass, pilot 계약 | 기준의 적용 대상과 순서가 후보 공간을 바꿨다 | 최종 제품 품질이 통제군보다 향상됐다 |
| AI self-check | 반복 raw가 풍부 | skill·전역 규칙·process 수정 | 자기 개입을 원인에 넣으면 진단이 달라질 수 있다 | 재발 방지와 행동 변화를 보장한다 |
| artifact/core | 기존 Cofathon 사건 | 삭제·보존 diff는 `02`에 있음 | artifact와 기능 core를 다른 교체 단위로 판단했다 | 사용자 가치가 증명됐다 |
| scope control | Tripproof·AX·ai-note에 반복 정정 | decision·제품행동 test·dead path 제거·goal 재작성 | scope를 줄여도 제품 인과를 보존해야 했다 | 이 계약이 모든 프로젝트에 최적이다 |
| source-first second pass | AX 직접 대화·ai-note 반복 | 독립 후보판·SHA 보존·새 문서 | 기존 artifact를 가린 pass가 다른 문제 경계를 드러냈다 | 완전 blind였고 더 좋은 정답을 만들었다 |
| Output-informed selection | AX 정정과 선택 순서 | Markdown·HTML·8개 상태 전환·최종 선택 | 설명 대신 observable output을 비교 대상으로 썼다 | 최종 제품 품질과 사용자 가치가 상승했다 |

### private source의 공개 상한

- conversation raw와 ai-note raw는 내부 판단 복구용이다.
- 공개 글에는 로컬 경로, session ID, 개인 발화를 그대로 옮기지 않는다.
- 공개 가능한 글에서는 사건을 재서술하고, 가능한 경우 sanitized fixture·재현 코드·일반화한 before/after artifact를 새로 만든다.
- raw의 문구가 중요한 경우에도 공개 가능한 최소 장면으로 다시 구성하고 원문 인용을 기본값으로 삼지 않는다.

## 10. 첫 글 선택에 미치는 영향

재조사 전 첫 글의 비교축은 current와 독립 판별이었다.

- current: AI-native 관점의 대표성, 사용자의 반복 운영 경험, 고유한 문제의식
- 독립 판별: 제목 즉시성, code·test·E2E artifact, 초안 준비도

이 두 후보의 장점은 그대로다. source-first 재조사 때문에 둘 중 하나가 내려가지는 않았다.

달라진 것은 **scope control이 같은 비교 자리에 들어올 자격을 얻었다는 것**이다.

### scope control이 첫 글 후보를 흔드는 이유

- `AI에게 작게 만들라고 했더니 제품 흐름이 사라졌다`는 장면을 개발자가 바로 이해할 수 있다.
- 단순 prompt 팁이 아니라 input→transform→output이라는 개발 계약의 문제다.
- Tripproof의 raw·decision·code·test와 AX의 제품 중심 복원이 연결된다.
- 사용자가 무엇을 문제로 봤고 AI의 반복된 축소를 어떻게 다시 정의했는지가 중심에 있다.
- artifact/core처럼 사후 폐기 회고가 아니라 구현 시작 단계에서 매번 쓸 수 있는 판단 질문이 남는다.

따라서 첫 글을 고르기 전 shaping 대상은 두 개에서 세 개로 넓히는 편이 낫다.

1. current
2. 독립 판별
3. 제품 흐름을 자르지 않는 scope control

각 한 장에서 같은 항목을 비교한다.

1. 첫 장면
2. 중심 질문
3. 판단이 바뀐 시간순 사건
4. 독자가 볼 공개 가능한 artifact
5. 다른 개발자가 가져갈 기준
6. 이번 자료가 말하지 못하는 한계

### 나머지 신규 후보의 현재 위치

- **source-first second pass**
  - 글로 성립하지만 이번 `03` 자체의 결과까지 공개 가능한 사례로 바꾸는 작업이 필요하다.
  - 메타 조사법이 아니라 `기존 artifact가 문제 frame을 소유하는 순간`을 중심으로 shaping한다.
- **Output-informed selection**
  - artifact 준비도는 높다.
  - 일반 prototyping과 다른 AI-native 변화가 제목과 첫 장면에서 바로 보여야 첫 글 경쟁력이 생긴다.
- **생성·판별 순서**
  - 원천 보강으로 기존보다 강해졌다.
  - 성공담보다 판단 순서가 필요해진 learning experiment이므로 첫 기술 사례보다 뒤에 두는 편이 자연스럽다.

이 문서는 첫 글을 확정하지 않는다. 다음 shaping 비교의 대상을 바꾸는 데까지 닫는다.

## 11. 아직 조사하지 않은 영역과 후속 질문

### 이번 범위 밖

- Cofathon 원본의 process·Git·raw 재조사
- 외부 웹 자료의 최신성 재검증
- Tripproof prototype·과거 worktree
- 공개 가능한 reproduction artifact 제작
- ai-note 사건 대부분의 원 프로젝트 Git 교차검증

### 후속 질문

- scope-control 글에서 `작게 줄여도 되는 것`과 `끝까지 관통해야 하는 것`을 code 예제로 어떻게 보여 줄 것인가?
- source-first second pass가 필요한 신호와 기존 문서를 계속 수정해도 되는 신호를 어떻게 구분할 것인가?
- Output-first 비교가 일반 prototype보다 AI-native한 이유를 비용·속도 주장이 아니라 판단 변화로 어떻게 설명할 것인가?
- current가 가리키는 active contract가 여러 session writer 사이에서 충돌할 때 누가 갱신 권한을 갖는가?
- 독립 판별자가 raw source를 잘못 읽었을 때 main은 어떤 최소 증거로 기각할 수 있는가?
- self-check의 진단 뒤 행동 변화를 관찰할 가장 작은 artifact는 무엇인가?
- Cofathon 원본을 같은 방식으로 조사하면 artifact/core의 중심이 유지되는가, scope control과 합쳐지는가?

## 부록 A. AX 조사 색인

이 부록은 “전체 시간축을 봤다”는 말을 재검사할 수 있게 실제 조사 단위를 남긴다. commit 메시지는 작업자의 최종 해석이 아니라 당시 Git에 기록된 표제다. 사건 해석은 본문의 conversation·문서·diff·test 교차 결과를 따른다.

### A-1. reachable commit 21개

기준 저장소: [AX 전체-작업본](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본)

| 순서 | 시각 | commit | 당시 표제 |
| ---: | --- | --- | --- |
| 1 | 2026-07-10 16:52 | `ec616e0` | 제출 작업 베이스라인 구성 |
| 2 | 2026-07-10 16:57 | `1be74ae` | 룰 파악 통과 |
| 3 | 2026-07-10 18:14 | `0d53624` | 첫 넓은 조사와 출처 기준 기록 |
| 4 | 2026-07-10 18:39 | `927f8f4` | 2차 조사 판단 과정과 최신 합의 기록 |
| 5 | 2026-07-10 18:55 | `b263576` | 신호 맵과 두 번째 조사 첫 pass 기록 |
| 6 | 2026-07-10 19:18 | `778b789` | research gate 통과 |
| 7 | 2026-07-10 19:36 | `ef7a22a` | 문제 후보 비교판과 문서 층위 정리 |
| 8 | 2026-07-10 20:23 | `1743e0c` | 문제 후보 독립 2차 추출과 대조 |
| 9 | 2026-07-10 20:26 | `34a4b55` | 문제 후보 탐색 gate 통과 |
| 10 | 2026-07-10 21:11 | `012b21e` | 솔루션 후보 발산과 종합 비교 |
| 11 | 2026-07-10 21:34 | `12fe687` | 문제와 솔루션 기준판 중앙화 |
| 12 | 2026-07-10 22:00 | `e848dd3` | 문제·솔루션 선택 gate 통과 |
| 13 | 2026-07-10 22:02 | `40cfe8a` | 데모 참조 경계 명시 |
| 14 | 2026-07-10 22:17 | `714369b` | 선택 솔루션 제품 중심 보강 |
| 15 | 2026-07-10 22:19 | `01fe376` | 최상위 구현 goal 정의 |
| 16 | 2026-07-10 22:30 | `052831b` | Loop 01 구현 계약 확정 |
| 17 | 2026-07-10 23:17 | `61981aa` | Loop 01 첫 세로 slice 구현 |
| 18 | 2026-07-10 23:44 | `0bdb843` | Loop 01 통과 |
| 19 | 2026-07-10 23:53 | `5f1becf` | 최종 제출물 packaging 통과 |
| 20 | 2026-07-10 23:53 | `0e6d722` | 제출 ZIP에 최신 log 반영 |
| 21 | 2026-07-11 00:12 | `7c1fa47` | 제출 설문 최종본과 upload 실패 기록 |

### A-2. process Markdown 33개

아래 순서는 파일명의 번호를 기본으로 하되, 중복된 `30` 두 개는 Git 시간축으로 구분했다. `README.md`는 사건 기록이 아니라 process 층의 역할을 설명하는 파일이므로 별도로 표시했다.

| 순서 | 파일 | 이 조사에서 확인한 역할 |
| ---: | --- | --- |
| 1 | [01-requirements-recheck.md](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/01-requirements-recheck.md) | 요구사항 재확인 |
| 2 | [02-requirements-gate-review.md](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/02-requirements-gate-review.md) | 요구사항 gate 검토 |
| 3 | [03-requirements-gate-pass.md](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/03-requirements-gate-pass.md) | 요구사항 gate 통과 |
| 4 | [04-source-weight-priority.md](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/04-source-weight-priority.md) | 출처 가중치 |
| 5 | [05-broad-research-order.md](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/05-broad-research-order.md) | 넓은 조사 순서 |
| 6 | [06-broad-scan-checkpoint.md](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/06-broad-scan-checkpoint.md) | broad scan checkpoint |
| 7 | [07-company-weight-and-objectivity.md](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/07-company-weight-and-objectivity.md) | 회사 관점과 객관성 정정 |
| 8 | [08-second-research-synthesis.md](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/08-second-research-synthesis.md) | 2차 조사 종합 |
| 9 | [09-discussion-and-ai-self-check.md](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/09-discussion-and-ai-self-check.md) | 논의와 self-check |
| 10 | [10-signal-map-and-second-research-start.md](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/10-signal-map-and-second-research-start.md) | signal map과 2차 조사 시작 |
| 11 | [11-product-screen-user-journey-and-parallel-loop.md](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/11-product-screen-user-journey-and-parallel-loop.md) | 제품 화면·journey·병렬 loop |
| 12 | [12-browser-research-loop-to-core.md](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/12-browser-research-loop-to-core.md) | browser 조사에서 core로 이동 |
| 13 | [13-problem-candidates-first-spread.md](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/13-problem-candidates-first-spread.md) | 첫 문제 후보판 |
| 14 | [14-integrated-criteria-and-independent-second-pass.md](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/14-integrated-criteria-and-independent-second-pass.md) | 통합 기준과 독립 2차 추출 |
| 15 | [15-refined-candidate-landscape.md](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/15-refined-candidate-landscape.md) | 후보 지형 재정리 |
| 16 | [16-solution-comparison-entry.md](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/16-solution-comparison-entry.md) | 솔루션 비교 진입 |
| 17 | [17-performance-led-solution-passes.md](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/17-performance-led-solution-passes.md) | 성능 관점 솔루션 pass |
| 18 | [18-stage-criteria-centralization.md](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/18-stage-criteria-centralization.md) | 단계별 기준 중앙화 |
| 19 | [19-output-first-comparison.md](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/19-output-first-comparison.md) | output-first 비교 |
| 20 | [20-output-first-interactive-demo.md](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/20-output-first-interactive-demo.md) | interactive demo |
| 21 | [21-prioritization-and-final-choice.md](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/21-prioritization-and-final-choice.md) | 우선순위와 최종 선택 |
| 22 | [22-demo-reference-boundary.md](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/22-demo-reference-boundary.md) | demo 참조 경계 |
| 23 | [23-selected-solution-reframing.md](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/23-selected-solution-reframing.md) | 선택 솔루션 재정의 |
| 24 | [24-top-level-engineering-goal.md](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/24-top-level-engineering-goal.md) | 최상위 engineering goal |
| 25 | [25-loop-01-goal.md](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/25-loop-01-goal.md) | Loop 01 goal |
| 26 | [26-loop-01-first-implementation-and-operations-retro.md](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/26-loop-01-first-implementation-and-operations-retro.md) | 첫 구현·fresh 검토·운영 회고 |
| 27 | [27-loop-01-correction-cycle.md](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/27-loop-01-correction-cycle.md) | correction cycle |
| 28 | [28-submission-questionnaire.md](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/28-submission-questionnaire.md) | 첫 제출 설문 |
| 29 | [29-questionnaire-rebuild-from-current.md](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/29-questionnaire-rebuild-from-current.md) | current에서 설문 재구성 |
| 30 | [30-final-submission-package.md](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/30-final-submission-package.md) | 최종 제출 package |
| 31 | [30-questionnaire-final-verification.md](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/30-questionnaire-final-verification.md) | 설문 최종 검증 |
| 32 | [31-submission-form-correction-and-upload-failure.md](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/31-submission-form-correction-and-upload-failure.md) | 제출 form 정정과 upload 실패 |
| 33 | [README.md](/Users/hammyeong-yeon/Desktop/10_work/AX인재전쟁-해커톤/10-마이리얼트립-제출/전체-작업본/context/process/README.md) | process 층의 역할 |

## 부록 B. Tripproof 조사 색인

Tripproof의 Git은 reachable commit 268개의 날짜·표제를 모두 스캔했지만, 이 문서에 268줄을 복제하지는 않았다. 재검사할 때는 [Tripproof main repo](/Users/hammyeong-yeon/Desktop/10_work/tripproof)에서 `git log --reverse`를 원천으로 삼는다. 아래에는 문서형 시간축 21개와 본문 판단 사건을 구성한 commit 구간을 남기고, decision·implementation note·심층 raw는 전부 개별 색인한다.

### B-0. Git·work-log 시간축

#### work-log heading 21개

원천: [docs/work-log.md](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/work-log.md)

| 순서 | 날짜 | 작업 요약 |
| ---: | --- | --- |
| 1 | 2026-05-28 | 초기 구조 정리 |
| 2 | 2026-05-30 | preview UX 통합 / chat-first 채택 / 상태 2축 |
| 3 | 2026-05-30 | 1차 roadmap·MVP 계획 문서 신설 |
| 4 | 2026-06-03 | React client 골격과 Python AI 후보 생성 경계 |
| 5 | 2026-06-03 | client Tailwind 컴포넌트화 / `app.js` 잔재 제거 |
| 6 | 2026-06-08 | Agoda PDF 01 backend ingest / uv 전환 |
| 7 | 2026-06-08 | root client/server 구조와 backend 확장 골격 |
| 8 | 2026-06-08 | apps runtime 구조로 client/server 묶음 |
| 9 | 2026-06-09 | 02 source unit / embedding boundary |
| 10 | 2026-06-09 | 03 spec 구현 참조 맥락 drift 관찰 |
| 11 | 2026-06-09 | Supabase vector retrieval backend 연결 |
| 12 | 2026-06-09 | 03 LLM fact proposer product route 연결 |
| 13 | 2026-06-09 | spec-driven skill / README 축약 기록 |
| 14 | 2026-06-09 | 04 library chat `ChatAnswer` 연결 |
| 15 | 2026-06-09 | 04 library chat fixed target 제거 |
| 16 | 2026-06-09 | 05 카드 초안과 직접 확인 |
| 17 | 2026-06-09 | 06 dashboard와 현장 카드 |
| 18 | 2026-06-10 | spec-driven harness 판단·test 강제 전환 |
| 19 | 2026-06-19 | Agoda 원문 PDF source unit v1 구현 후 관찰 |
| 20 | 2026-06-23 | reconciliation 이후 Agoda 원문 PDF baseline 재측정 |
| 21 | 2026-06-29 | Answer certification boundary 구현과 구조 proxy 과잉강등 발견 |

`work-log.md`는 6월 29일에서 끝난다. 이후 시간축은 Git·canonical spec·decision·implementation note·eval artifact가 소유한다.

#### 본문 판단 사건의 Git 구간

| 구간 | 판단 사건 | 주요 commit |
| --- | --- | --- |
| 6월 9–10일 | 가장 빨리 보이는 결과를 제품행동 불변식으로 교정 | `90097ba` → `50ad14f` → `4ec59dd` → `2eaefc9` |
| 6월 25일 | confident-wrong을 answer self-certification으로 재귀속 | `dedf411` → `4aa49c8` → `4513e5c` → `b1a06c3` → `9005ad5` → `d5aa4c2` |
| 6월 29일 | 구조 proxy 실패, mechanical contract와 의미 층 분리 | `4127c26` → `08f141e` → `694aef3` → `989727c` → `7986d26` → `5d1880f` → `574dee4` → `118a916` → `8040665` → `c4b8064` |
| 6월 30일 | relation A/B 재계측과 answer body synthesis | `f9b9c0b` → `b8da0c1` → `84fbb18` → `215e8de` |
| 7월 2–3일 | config no-op, async 측정축, entailment AC2 실패 | `4e94b2d` → `3aa9860` → `dc132b5` → `c13af98` → `2c19df3` → `a291558` → `b7a7a77` |
| 7월 20–22일 | extraction·retrieval·semantic eval과 실행 범위 분리 | `d131870` → `32df79c` → `7af5160` → `6280d91` → `fedb84a` → `3dddba7` → `7b2e624` → `ea97458` |

이 표는 268개 commit의 대체 목록이 아니다. 본문 해석이 어느 실행 변화 구간에 기대는지 재진입하기 위한 색인이다.

### B-1. decision 주제 15개

동일 주제의 과거 단일 Markdown과 현재 `index.md`·`raw.md`가 함께 있는 경우 하나의 decision으로 셌다. `raw.md`는 자동 수집된 전체 transcript가 아니라 decision 배경으로 선별·구조화한 자료이므로 conversation logger와 같은 역할로 취급하지 않았다.

1. [제품/AI directory 경계](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/decisions/2026-05-29-product-ai-directory-boundary.md)
2. [preview 통합과 chat-first](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/decisions/2026-05-30-preview-integration-chat-first.md)
3. [문서 경계 reviewer](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/decisions/2026-06-03-doc-boundary-reviewer-agent.md)
4. [harness 실행 mode와 additive fix](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/decisions/2026-06-03-harness-execution-mode-and-additive-fixes/index.md)
5. [가벼운 spec-driven loop](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/decisions/2026-06-03-light-spec-driven-loop/index.md)
6. [React client와 Python AI 경계](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/decisions/2026-06-03-react-client-python-ai-boundary.md)
7. [큰 feature의 slice build model](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/decisions/2026-06-05-slice-build-model/index.md)
8. [Python backend·uv·ingest 경계](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/decisions/2026-06-08-python-backend-uv-ingest-boundary.md)
9. [implementation note 기록 위치](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/decisions/2026-06-09-implementation-notes-record-boundary.md)
10. [민감정보와 fixture 경계](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/decisions/2026-06-09-sensitive-data-fixture-boundary.md)
11. [spec-driven 판단과 test 강제](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/decisions/2026-06-10-spec-driven-judgment-and-test-enforcement/index.md)
12. [Supabase-only retrieval 경계](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/decisions/2026-06-19-supabase-only-retrieval-boundary/index.md)
13. [engineering principle 문서](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/decisions/2026-06-22-engineering-principle-docs/index.md)
14. [LLM answer self-certification 재정의](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/decisions/2026-06-25-llm-answer-self-certification-reframe/index.md)
15. [answer runtime async-native·httpx](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/decisions/2026-07-02-answer-runtime-async-httpx.md)

### B-2. implementation-note 주제 14개

1. [LLM-ready와 actual LLM 경계](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/implementation-notes/2026-06-09-llm-ready-actual-llm-boundary.md)
2. [spec-driven product-flow drift](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/implementation-notes/2026-06-09-spec-driven-product-flow-drift/index.md)
3. [spec-driven skill·README refactor](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/implementation-notes/2026-06-09-spec-driven-skill-readme-refactor/index.md)
4. [surface에서 leaf producer로 내려가는 순서](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/implementation-notes/2026-06-10-surface-leaf-producer-ordering/index.md)
5. [observation record와 trace 경계](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/implementation-notes/2026-06-11-observation-record-trace-boundary/index.md)
6. [layout source-unit의 good failure](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/implementation-notes/2026-06-23-layout-source-unit-good-failures/index.md)
7. [certification keyword gate mirror trap](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/implementation-notes/2026-06-29-certification-keyword-gate-mirror-trap/index.md)
8. [certification structural proxy 과도 downgrade](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/implementation-notes/2026-06-29-certification-structural-proxy-overdowngrade/index.md)
9. [caveat relation pass overfire](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/implementation-notes/2026-06-29-caveat-relation-pass-overfire/index.md)
10. [answer body synthesis layer](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/implementation-notes/2026-06-30-answer-body-synthesis-layer/index.md)
11. [context-length config A/B no-op](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/implementation-notes/2026-07-02-context-length-config-ab-noop/index.md)
12. [async runtime parallelism illusion](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/implementation-notes/2026-07-02-async-runtime-parallelism-illusion/index.md)
13. [entailment·closed judgment split-unit](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/implementation-notes/2026-07-02-entailment-closed-judgment-split-unit/index.md)
14. [eval case·axis count drift](/Users/hammyeong-yeon/Desktop/10_work/tripproof/docs/implementation-notes/2026-07-22-eval-case-axis-count-drift/index.md)

### B-3. 심층 확인한 conversation logger session 9개

624개 파일은 metadata와 시간축을 스캔했고, 아래 9개만 판단 전환의 대화 순서를 확인하기 위해 본문까지 읽었다. 표의 구간은 JSONL에 기록된 첫·마지막 event의 UTC 날짜다. 본문의 사건 날짜는 작업 맥락과 한국 시각을 함께 보고 묶었으므로 자정을 넘는 session의 표기와 하루 차이가 날 수 있다. 이 파일들은 private source이므로 공개 원고에서 session ID나 원문을 그대로 사용하지 않는다.

| 구간 | 도구 | event 수 | 파일 |
| --- | --- | ---: | --- |
| 6월 24–25일 | Codex | 74 | [019ef9bd…jsonl](/Users/hammyeong-yeon/Desktop/10_work/tripproof/.ai-conversation-logger/conversations/codex/019ef9bd-2a3d-79d3-b72e-1f42c144a5db.jsonl) |
| 6월 25일 | Codex | 152 | [019efef2…jsonl](/Users/hammyeong-yeon/Desktop/10_work/tripproof/.ai-conversation-logger/conversations/codex/019efef2-274c-7141-9afe-6fcf66389f87.jsonl) |
| 6월 29일–7월 1일 | Claude Code | 748 | [bf6189ad…jsonl](/Users/hammyeong-yeon/Desktop/10_work/tripproof/.ai-conversation-logger/conversations/claude-code/bf6189ad-7175-4213-8306-1d2c8a12a211.jsonl) |
| 6월 29일 | Codex | 141 | [019f139c…jsonl](/Users/hammyeong-yeon/Desktop/10_work/tripproof/.ai-conversation-logger/conversations/codex/019f139c-312e-7e10-8d2a-3869ef756504.jsonl) |
| 6월 30일–7월 1일 | Claude Code | 346 | [20e342f9…jsonl](/Users/hammyeong-yeon/Desktop/10_work/tripproof/.ai-conversation-logger/conversations/claude-code/20e342f9-79d9-40b2-80da-dd8d2c1c5422.jsonl) |
| 6월 30일–7월 1일 | Codex | 83 | [019f1803…jsonl](/Users/hammyeong-yeon/Desktop/10_work/tripproof/.ai-conversation-logger/conversations/codex/019f1803-3a5f-7312-b568-59257908b2bd.jsonl) |
| 7월 2일 | Claude Code | 114 | [e0ec6027…jsonl](/Users/hammyeong-yeon/Desktop/10_work/tripproof/.ai-conversation-logger/conversations/claude-code/e0ec6027-7f6d-4f22-bfd8-9e66b5d56fa1.jsonl) |
| 7월 2일 | Claude Code | 83 | [53091606…jsonl](/Users/hammyeong-yeon/Desktop/10_work/tripproof/.ai-conversation-logger/conversations/claude-code/53091606-599f-41fd-9c0f-caf881ac5ca8.jsonl) |
| 7월 2–3일 | Claude Code | 15 | [6a3e2b55…jsonl](/Users/hammyeong-yeon/Desktop/10_work/tripproof/.ai-conversation-logger/conversations/claude-code/6a3e2b55-cf68-4a3a-a105-fce8c1feac46.jsonl) |

## 부록 C. ai-note 조사 색인

### C-1. notes 62개 탐색 기록

`범위`는 AI와 일하며 판단·통제 방식이 달라진 사건 후보, `주변`은 설명·문서·UI 마찰처럼 중심 사건을 보조할 수 있는 자료, `제외`는 이번 질문과 직접 연결하지 않은 자료다. 분류는 자료의 가치 평가가 아니라 이번 재조사에 맡긴 역할이다.

| INDEX 순서 | 분류 | notes |
| ---: | --- | --- |
| 1 | 범위 | [deferred capability의 적용 층위](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-07-16-deferred-capability-application-layers/notes.md) |
| 2 | 범위 | [거르기 재생산과 pilot 성공 설계](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-07-16-filtering-reproduction-pilot-success-design/notes.md) |
| 3 | 주변 | [session·Git·harness 이력 교차](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-07-15-session-git-harness-reconstruction/notes.md) |
| 4 | 범위 | [전진 편향과 impact 축](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-07-09-harness-forward-bias-impact-axis/notes.md) |
| 5 | 범위 | [활성 규칙과 운영 색인 분리](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-07-06-global-harness-active-rules-index-split/notes.md) |
| 6 | 범위 | [AI 답변 해독 부하](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-07-05-claude-answer-style-decoding-fatigue/notes.md) |
| 7 | 주변 | [실제 사례의 단계별 설명](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-07-01-concrete-case-stepwise-explanation/notes.md) |
| 8 | 범위 | [분석의 가치 발굴 stance](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-07-01-analysis-value-discovery-stance/notes.md) |
| 9 | 범위 | [설명 색인과 검증 전 단정](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-30-explanation-index-symbols-and-premature-assertion/notes.md) |
| 10 | 범위 | [LLM 답변 자기-인증](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-25-llm-answer-self-certification/notes.md) |
| 11 | 범위 | [engineering reference routing](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-23-engineering-reference-routing/notes.md) |
| 12 | 범위 | [위임 조사 회수와 설명 drift](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-22-delegated-research-recovery-drift/notes.md) |
| 13 | 범위 | [문서의 자기변호](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-17-doc-self-justification/notes.md) |
| 14 | 주변 | [H2 whitelist 누수](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-16-h2-whitelist-leak/notes.md) |
| 15 | 범위 | [Evidence-Bounded Initiative](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-15-evidence-bounded-initiative/notes.md) |
| 16 | 범위 | [source link와 raw 보존 경계](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-12-source-link-raw-preservation-boundary/notes.md) |
| 17 | 주변 | [Tripproof AI 협업 friction map](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-12-tripproof-ai-collaboration-friction-map/notes.md) |
| 18 | 범위 | [Evidence-Bounded Agency](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-12-evidence-bounded-agency/notes.md) |
| 19 | 주변 | [예시 기술과 architecture 고정](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-12-example-tech-fixation/notes.md) |
| 20 | 제외 | [Decision Readiness와 Answerability](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-12-decision-readiness-answerability/notes.md) |
| 21 | 범위 | [방어적 안정화와 gate language](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-12-defensive-ai-overstabilization/notes.md) |
| 22 | 범위 | [기존 문서 anchor와 fresh doc](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-12-fresh-doc-existing-anchor/notes.md) |
| 23 | 범위 | [source-first orchestration](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-12-source-first-orchestration/notes.md) |
| 24 | 범위 | [subagent와 fresh auditor 경계](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-12-subagent-fresh-auditor-boundaries/notes.md) |
| 25 | 범위 | [raw transcript 역할 경계](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-12-raw-transcript-role-boundary/notes.md) |
| 26 | 범위 | [큰 시나리오와 top-down slice drift](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-10-wide-scenario-topdown-slicing-drift/notes.md) |
| 27 | 범위 | [시나리오 기능과 구현 경계 이월](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-09-spec-driven-deferral-in-scenario-features/notes.md) |
| 28 | 범위 | [LLM grounding demo drift](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-05-llm-grounding-demo-drift/notes.md) |
| 29 | 범위 | [원칙에서 artifact 조작으로 drift](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-05-principle-artifact-operation-drift/notes.md) |
| 30 | 범위 | [spec 원칙과 예시 calibration](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-05-spec-example-calibration/notes.md) |
| 31 | 주변 | [구체화 단계와 tradeoff loop](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-05-concretization-tradeoff-loop/notes.md) |
| 32 | 주변 | [복잡한 논의의 비중 sync](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-05-complex-discussion-weight-sync/notes.md) |
| 33 | 범위 | [sample material detour](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-04-sample-material-detour/notes.md) |
| 34 | 주변 | [mock 기반 slice drift](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-04-mock-driven-slice-drift/notes.md) |
| 35 | 범위 | [현재 artifact가 미래 session에 주는 비용](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-30-artifact-cost-to-future-sessions/notes.md) |
| 36 | 주변 | [의도 읽기 gap](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-30-intent-reading-gap/notes.md) |
| 37 | 주변 | [AI 문서의 용어와 범위 framing](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-30-ai-doc-jargon-and-scope-framing/notes.md) |
| 38 | 범위 | [방어막 자체가 leak source가 되는 패턴](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-28-barrier-as-leak-source/notes.md) |
| 39 | 주변 | [Tripproof 내부 anchor 정리](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-28-tripproof-internal-anchor-cleanup/notes.md) |
| 40 | 범위 | [AI-native meta stage trap](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-28-tripproof-meta-stage-trap/notes.md) |
| 41 | 범위 | [skill 호출 overprompting](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-28-skill-invocation-overprompting/notes.md) |
| 42 | 범위 | [지식관리 harness를 제품에 씌운 misfit](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-28-dev-hub-harness-misfit-product-split/notes.md) |
| 43 | 범위 | [층을 더할수록 source 재추적 반복](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-27-tripproof-source-tracing-layers/notes.md) |
| 44 | 범위 | [skill trigger 표현과 산출물 성격](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-27-skill-trigger-phrase-vs-function/notes.md) |
| 45 | 범위 | [다듬을수록 추상화가 누적되는 문제](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-27-claude-refine-abstraction-codex-translate/notes.md) |
| 46 | 범위 | [jargon 규칙화 보류](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-24-jargon-rule-deferral/notes.md) |
| 47 | 범위 | [사전 정합화와 meta overhead](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-24-claude-pre-alignment-meta-overhead/notes.md) |
| 48 | 범위 | [분석 작업대의 진단 loop](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-22-analysis-workspace-diagnosis-loop/notes.md) |
| 49 | 제외 | [Codex window capture targeting](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-21-codex-window-capture-targeting/notes.md) |
| 50 | 범위 | [AI self-check와 principle calibration](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-21-ai-self-check-principle-calibration/notes.md) |
| 51 | 범위 | [잔재 anchor와 session 전이](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-20-residual-anchor-carryover/notes.md) |
| 52 | 범위 | [Tripproof artifact boundary](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-20-tripproof-artifact-boundary/notes.md) |
| 53 | 범위 | [AI synthesis와 source of truth](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-20-ai-synthesis-source-trust/notes.md) |
| 54 | 범위 | [context language balancer agent](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-11-context-language-balancer-agent/notes.md) |
| 55 | 범위 | [context 문서 용어와 제품 의도](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-11-codex-context-doc-terms/notes.md) |
| 56 | 제외 | [AI 제품 흐름 우려](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-10-ai-product-flow-worry/notes.md) |
| 57 | 범위 | [분석 위임과 active 문서 angle drift](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-09-prompt-analysis-delegation-drift/notes.md) |
| 58 | 범위 | [Information Boundary harness](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-06-information-boundary-harness/notes.md) |
| 59 | 범위 | [reference pattern hardcoding](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-04-reference-pattern-hardcoding-blog-harness/notes.md) |
| 60 | 범위 | [Claude·Codex harness 감각 추적](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-04-30-claude-codex-harness-tracking/notes.md) |
| 61 | 범위 | [사용자 의도 misread와 정정 loop](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-04-29-claude-intent-misread-correction-loop/notes.md) |
| 62 | 범위 | [multi-agent 평가를 닫는 패턴](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-04-29-multi-agent-evaluation-closing/notes.md) |

분류 합계는 범위 48, 주변 11, 제외 3이다. INDEX에 함께 연결된 다음 두 attempt는 `notes.md`가 아니라 `00-context.md`이므로 62개 집계에서 제외했다.

- [dev-summarize 자동화 시도](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-04-29-dev-summarize-automation-attempt/00-context.md)
- [전역 지침 끄기 시도](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-04-30-global-instructions-disable-attempt/00-context.md)

### C-2. raw shortlist 16개와 보조 raw 1개

`직접 발췌`는 해당 대화에서 가져온 연속 발화가 중심인 자료, `전체 transcript`는 세션 본문을 보존한 자료, `혼합`은 직접 발췌와 후대 설명이 섞인 자료, `후대 회고`는 나중에 사건을 구조화한 자료다. 형식 분류는 신뢰도 순위가 아니라 raw가 답할 수 있는 질문의 경계다.

| raw | 형식 | 선정 이유 |
| --- | --- | --- |
| [multi-agent evaluation closing](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-04-29-multi-agent-evaluation-closing/raw.md) | 직접 발췌 | 독립 검토자가 가능성을 너무 일찍 닫은 순서 |
| [prompt analysis delegation drift](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-09-prompt-analysis-delegation-drift/raw.md) | 직접 발췌 | 위임 전제가 달랐던 session과 회수 가능한 session의 차이 |
| [AI self-check와 principle calibration](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-21-ai-self-check-principle-calibration/raw.md) | 직접 발췌 | 두 역할이 생긴 원래 문제의식 |
| [Tripproof source tracing layers](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-27-tripproof-source-tracing-layers/raw.md) | 혼합 | 확실성을 위해 층을 추가할수록 재추적이 늘어난 장면 |
| [dev-hub harness misfit](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-28-dev-hub-harness-misfit-product-split/raw.md) | 혼합 | 서로 다른 세 규칙 추상화가 연속 기각된 장면 |
| [Tripproof meta-stage trap](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-28-tripproof-meta-stage-trap/raw.md) | 후대 회고 | meta artifact 증가와 제품 결과 부재라는 가설의 출처 |
| [barrier as leak source](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-28-barrier-as-leak-source/raw.md) | 혼합 | 통제 문구가 다음 산출물에 복제된 장면 |
| [LLM grounding demo drift](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-05-llm-grounding-demo-drift/raw.md) | 혼합 | 통제하려던 제품 위험이 demo에서 사라진 순서 |
| [source-first orchestration](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-12-source-first-orchestration/raw.md) | 직접 발췌 | 원자료보다 병렬 해석을 먼저 모았다가 turn을 중단한 사건 |
| [subagent fresh auditor boundaries](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-12-subagent-fresh-auditor-boundaries/raw.md) | 직접 발췌 | fresh 생성·검증·main 회수 권한을 구분한 사건 |
| [delegated research recovery drift](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-22-delegated-research-recovery-drift/raw.md) | 혼합 | 원자료를 읽은 조사팀 결과도 회수 과정에서 기존 언어로 바뀐 장면 |
| [LLM answer self-certification](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-25-llm-answer-self-certification/raw.md) | 전체 transcript | 답변 근거 부족과 확정 권한을 다시 나눈 사건 |
| [검증 전 A/B 결론](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-06-30-explanation-index-symbols-and-premature-assertion/raw.md) | 혼합 | independent review 전 효과를 단정한 사건 |
| [analysis value discovery stance](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-07-01-analysis-value-discovery-stance/raw.md) | 직접 발췌 | 결함 탐지와 가능성 발굴의 분석 stance 차이 |
| [harness forward bias](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-07-09-harness-forward-bias-impact-axis/raw.md) | 혼합 | 지침의 기본 태도가 판단을 한 방향으로 미는 장면 |
| [filtering reproduction과 pilot 성공](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-07-16-filtering-reproduction-pilot-success-design/raw.md) | 직접 발췌 | 좋은 기존 결과를 복제하는 것과 생성–선별 계약을 분리한 사건 |

보조 raw:

- [사전 정합화와 meta overhead](/Users/hammyeong-yeon/Desktop/10_work/ai-note/2026-05-24-claude-pre-alignment-meta-overhead/raw.md)
  - 다른 meta-stage 사건의 배경 확인에만 사용했고 독립 판단 사건으로 올리지 않았다.
