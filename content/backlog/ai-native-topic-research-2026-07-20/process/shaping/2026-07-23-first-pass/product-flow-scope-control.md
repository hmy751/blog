---
작성일: 2026-07-23
갱신일: 2026-07-27
성격: 상위 후보 1차 shaping / 내부 작업 문서
공개상태: 내부 작업 문서
권위: 1차 shaping snapshot
현재후보:
  - ../../../active-state/topic-candidates.md#작업-주제--제품-흐름을-보존하는-scope-control
---

# 제품 흐름을 보존하는 scope control

이 문서는 scope control 후보를 실제 글의 단위로 한 번 펼쳐 본 결과다. 첫 글, 제목, article type을 확정하지 않는다.

## 1. 첫 장면

첫 장면은 “얇은 slice를 요청했더니 raw `facts[]`를 화면에 렌더링하는 경로가 더 작은 구현으로 제안된 순간”이다.

원래 만들려던 것은 숙소 자료에서 근거 있는 답변 후보를 만들고, 사용자가 채팅 화면에서 그 답을 확인하는 흐름이었다. 하지만 `작게`, `얇게`, `acceptance criteria 1~3개`라는 요청을 AI는 가장 빨리 보이는 결과로 해석했다. 그 결과 검색 결과의 raw fact를 화면에 직접 표시하는 경로가 제안됐다.

그 안대로 구현했다면 화면은 생길 수 있었지만 제품의 중심 변환은 다음 단계로 밀릴 수 있었다.

- 검색 후보가 근거 수준에 따라 supported 또는 missing으로 판정되는 과정
- 그 판정이 사용자가 읽는 답변으로 바뀌는 과정
- 근거가 사라지거나 조건이 바뀌었을 때 답도 달라지는 과정
- 사용자가 그 답을 보고 다음 행동을 정하는 과정

이 장면은 “구현이 작았다”와 “제품의 최소 흐름이 살아 있었다”가 같은 말이 아님을 바로 보여 준다.

deterministic adapter와 sanitized seed를 첫 product proof로 삼자는 구현 제안도 강한 장면이다. 이 장면은 첫 사례 뒤에 붙여, 위험을 통제하는 설계와 제품이 다뤄야 할 불확실성을 경로 밖으로 미루는 제안을 구분하는 편이 현재로서는 더 자연스럽다.

주요 근거:

- [Tripproof의 product-flow drift](../../candidates/03-source-first-reanalysis.md#tripproof-1-작게라는-scope-control이-제품-흐름-자체를-잘랐다)
- [source-first 재조사의 fresh 후보](../../candidates/03-source-first-reanalysis.md#fresh-1-ai에게-작게-만들라고-했더니-제품-흐름이-사라졌다)

## 2. 중심 질문

> AI에게 scope를 줄이라고 할 때 무엇을 줄여도 되고, 무엇은 사용자가 실제로 쓰는 결과까지 끝까지 살아 있어야 하는가?

이 질문은 구현량을 줄이는 일반론보다 product proof의 최소 단위를 묻는다.

- 얇은 vertical slice와 가장 빨리 보이는 surrogate output은 어떻게 다른가?
- 필드, provider, 데이터 다양성, UI polish 가운데 무엇을 줄일 수 있는가?
- 이번 기능의 핵심 변환을 다음 spec으로 미루면 현재 slice에 무엇이 남는가?
- 실제 소비자가 받는 입력과 출력 사이에서 이번 slice가 책임지는 작용은 무엇인가?
- fixture, raw response, deterministic test double이 제품 결과처럼 보이고 있지는 않은가?

## 3. 판단이 바뀐 시간순 사건

1. 실제 숙소 자료에서 근거 있는 답변을 만들고 사용자가 채팅에서 확인하는 세로 slice를 만들려 했다.
2. AI는 `작게`와 `얇게`를 가장 빨리 화면에 표시할 수 있는 raw `facts[]` 경로로 좁히는 안을 제안했다.
3. 화면과 debug output은 생길 수 있었지만 검색 후보가 사용자 답변으로 바뀌는 핵심 변환은 다음 단계로 밀렸다.
4. 앞선 별도 장면에서는 sanitized seed와 deterministic adapter를 첫 product proof로 삼는 안이 제안됐다. 이 제안대로라면 실제 자료의 불확실성은 현재 product proof 밖으로 빠질 수 있었다.
5. 사용자는 scope를 줄이기 전에 입력, 이번 단계가 책임질 변환, 사용자가 읽는 출력, 넘지 말아야 할 선을 먼저 확인해야 한다고 정정했다.
6. prose 금지문을 더 쓰는 대신 실제 causal actor를 묻는 decision-time question과 metamorphic·grounding·routing test를 추가했다.
7. 제품행동에 사용되지 않는 fact 추출 경로를 제거했다.
8. AX에서도 MCP와 상세 정보 수집이 제품 중심처럼 올라왔다. 사용자의 조건 변경과 seller 답변 뒤 판단 상태가 어떻게 달라지는지를 제품 중심으로 다시 올렸다.

판단은 “작게 만들기”에서 “한 경로의 제품 인과를 끝까지 남기고 나머지를 줄이기”로 바뀌었다.

## 4. 독자가 볼 공개 가능한 자료

이 후보는 공개 가능한 작은 code 예제가 중심을 크게 도울 수 있다.

우선 준비할 자료:

- **축소 전후의 흐름 비교**
  - raw fact를 직접 표시하는 경로
  - 검색 후보를 판정하고 사용자 답변과 다음 행동까지 연결하는 경로
- **작은 의사코드**
  - 사용자 입력
  - 핵심 변환
  - 사용자가 읽는 출력
  - 다음 행동을 바꾸는 상태
- **test 역할 비교**
  - fixture 문구가 그대로 보이는지만 확인하는 test
  - source가 바뀌면 답도 바뀌는 metamorphic test
  - 근거가 없으면 missing이 되는 grounding test
  - 실제 소비 경로가 핵심 producer를 사용하는지 확인하는 routing test
- **줄여도 되는 것과 남겨야 하는 것**
  - 줄일 수 있는 필드 수, provider 품질, 데이터 다양성, UI polish
  - 이번 slice에서 미루면 안 되는 핵심 변환과 소비자 contract

실제 Tripproof 코드와 내부 source를 복사하지 않고, 숙소 확인과 무관한 작은 예제로 같은 판단 차이를 재현한다.

이번 교차검증에서 확인한 사실:

- June 10의 metamorphic·grounding·routing test와 호출자 없는 fact 추출 경로 제거는 실제 구현이다.
- 시간순은 June 5 deterministic product-slice 제안, June 9 raw `facts[]` 경로 제안, June 10 제품행동 test와 dead path 제거다.

추가 확인이 필요한 사실:

- AX 제품 중심 복원 전후의 acceptance 변화

## 5. 사용자의 판단이 바뀐 지점

처음에는 작은 slice를 구현 범위와 acceptance criteria 수로 설명할 수 있다고 보기 쉬웠다. 실제로는 그런 언어가 AI를 가장 싸고 확실하게 보여 줄 수 있는 대체 결과로 수렴시켰다.

이후의 판단은 다음처럼 바뀌었다.

- scope는 파일 수, 화면 수, 구현 난이도만으로 재지 않는다.
- 먼저 이번 slice가 바꿔야 할 사용자 상태를 한 줄로 쓴다.
- 실제 소비자의 입력과 출력 사이에서 핵심 변환 하나는 끝까지 살아 있어야 한다.
- 불확실성을 줄인 test double과 불확실성을 처리하는 product proof를 구분한다.
- 핵심 변환을 다음 spec으로 미루고 주변 구현만 완성한 상태를 vertical slice라고 부르지 않는다.
- prose로 금지하기보다 code와 test가 실제 제품행동을 강제하는 위치를 찾는다.

## 6. 다른 개발자가 가져갈 기준

- 이번 slice의 실제 소비자는 누구인가?
- 그 소비자가 받는 입력과 출력 사이의 핵심 변환은 무엇인가?
- 이번 slice가 바꿔야 할 사용자 상태는 무엇인가?
- 어떤 필드·provider·데이터·UI를 줄여도 그 인과는 유지되는가?
- 지금 보이는 결과는 product output인가, fixture·test double·provider response인가?
- 다음 spec으로 미룬 것이 polish인가, 이번 기능의 중심 작용인가?
- source가 바뀌거나 근거가 사라질 때 사용자 출력도 달라지는가?
- 현재 test는 제품행동을 강제하는가, 예시 문구를 고정하는가?

## 7. 이번 자료가 말하지 못하는 한계

- 모든 작은 기술 slice가 UI까지 가야 한다는 뜻은 아니다.
- 실제 소비자가 쓰는 contract까지 닫히면 UI가 없어도 세로 slice가 될 수 있다.
- 제품 본질이 deterministic contract인 기능에서는 deterministic 구현 자체가 product proof일 수 있다.
- decision-time question과 test도 고정된 gate가 되면 다른 유효한 제품 흐름을 막을 수 있다.
- 이 contract가 모든 프로젝트의 최적 slicing 방법이라는 비교 근거는 없다.
- AI가 항상 surrogate output으로 수렴한다고 일반화할 수 없다. 현재 자료에서는 `작게`, `안전하게`, `빨리 보이게`라는 조건 아래 그런 수렴이 반복됐다.
- 공개 가능한 code 예제를 아직 만들지 않았으므로 일반 vertical slicing 글과 AI 협업 판단 글의 차이가 실제 원고에서 얼마나 선명할지는 열려 있다.
