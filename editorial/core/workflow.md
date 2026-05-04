---
작성일: 2026-05-01
수정일: 2026-05-04
목적: 블로그 글쓰기의 기본 단계와 각 단계의 책임을 정의한다.
사용 방식: 새 글 작성, 기존 초안 편집, review-only, 발행 준비 작업을 시작할 때 읽는다.
관련:
  - [output-contracts.md](output-contracts.md) — 작업 모드별 산출물 계약
  - [reference-use.md](reference-use.md) — 레퍼런스를 패턴으로 번역하는 원칙
  - [../lenses/voice.md](../lenses/voice.md) — 글 유형별 목소리
  - [../lenses/developer.md](../lenses/developer.md) — 개발자로서의 문제 정의와 판단 기준
  - [../lenses/reader-flow.md](../lenses/reader-flow.md) — 좋은 글처럼 읽히는 표면감과 독자 흐름
  - [../lenses/supporting-materials.md](../lenses/supporting-materials.md) — 자료 장치 처방 기준
  - [../guards/prepublish-check.md](../guards/prepublish-check.md) — 발행 직전 hard guard
---

# Core Workflow

이 문서는 블로그 하네스의 중심축만 소유한다. 세부 렌즈, 자료 장치 기준, 레퍼런스 사용 원칙, 발행 guard는 각 소유 문서에 둔다.

```text
Material -> Shaping -> Texture -> Prepublish
```

## 1. Material

역할: 글감을 꺼내는 단계.

이 단계는 비판하거나 고치지 않는다. 질문, 장면, 실패, 오해, 판단 변화, 이상한 디테일을 찾아 다음 초안의 재료로 만든다.

확인할 것:

- 이 글을 쓰고 싶은 실제 이유가 무엇인가.
- 예상과 결과가 어긋난 지점이 있는가.
- 실제로 막혔던 순간, 대화, 선택, 판단 변화가 있는가.
- 기술 설명 뒤에 숨어 있는 구체 장면이나 실험 조건이 있는가.
- 결과나 장면 뒤에 글쓴이의 이해, 초기 가정, 비교, 선택 기준이 있는가.
- 개발자로서 어떤 문제 해결 욕구, 제약 인식, 선택 기준이 작동했는가.
- 공개 기술 글이라면, 이 장면이 어떤 역량 신호로 읽힐 수 있는가.

출력은 수정문이 아니라 `material to surface`, `buried scene`, `underused contrast`, `missing question`, `strong lines to protect`, `questions to ask` 중심으로 둔다.

## 2. Shaping

역할: 꺼낸 재료를 글로 배열하는 단계.

이 단계는 중심 질문, 탐구 동력, 전개 순서, 단락의 기능, 보강/삭제/이동 후보를 본다. tone/structure critic보다 먼저 작동한다.

확인할 것:

- 이 글은 어떤 오해, 문제, 질문에서 시작하는가.
- 글감이 결과 나열이 아니라 판단의 흐름으로 배열되는가.
- 문제 정의, 제약, 선택지, 버린 대안, 트레이드오프, 바뀐 판단이 필요한 만큼 보이는가.
- 개인적 문장이나 장면이 장식이 아니라 주장이나 판단으로 이어지는가.
- 실험표, 코드, 수치, 실행 흔적이 독자의 판단을 돕는 위치에 있는가.
- 사건이나 결과에서 결론으로 바로 뛰지 않고, 글쓴이의 이해·가정·비교·선택 기준을 독자가 따라갈 수 있는가.
- 글의 절 순서가 자료를 발견한 순서가 아니라 독자가 같은 판단에 도착하는 순서인가.
- 마지막 문단이 글의 발견을 회수하는가.

Shaping에서 reader-flow나 artifact gap이 실제로 발동하면 결과물은 [output-contracts.md](output-contracts.md)를 따른다.

## 3. Texture

역할: 편집과 polish 과정에서 살아 있는 질감을 지키는 단계.

이 단계는 tone keeper가 아니다. 말투만 보는 것이 아니라 글감, 발견, 리듬, 판단의 감각이 매끄럽게 다듬는 과정에서 사라지지 않는지 본다.

확인할 것:

- 이 문장을 없애면 글의 발견이나 판단 변화가 약해지는가.
- 단어 하나가 글의 핵심 감각을 담고 있는가.
- polish 과정에서 이해, 가정, 비교, 판단 기준이 단순 결과 요약으로 사라졌는가.
- 가독성을 높인다는 이유로 살아 있는 장면, 실패, 판단 변화가 표/리스트/이미지/도식이나 요약문으로 대체되었는가.
- 반대로 artifact 후보가 과하게 빠져 글이 다시 산문 주장처럼 보이지 않는가.
- 소제목, 문장 끝, 전환 문장을 다듬는 과정에서 글의 기본 말투나 판단 흐름을 전역으로 바꿔버렸는가.

충돌이 있으면 자동으로 한쪽을 고르지 않고 아래처럼 드러낸다.

```text
Conflict:
- Editor concern: 이 문장은 장황하거나 흐름을 늦출 수 있음
- Texture concern: 하지만 이 문장은 판단이 바뀐 지점을 담고 있음
- Recommendation: 표현은 줄이되 핵심 단어는 유지
```

## 4. Prepublish

역할: 공개 직전의 안전 점검.

이 단계에서만 엄격해진다.

확인할 것:

- 공개하면 안 되는 내부 경로, 코드 원문, 개인 메모, 회사 내부 정보가 있는가.
- 수치, 기술 용어, 시점, 사람, 출처가 맞는가.
- frontmatter와 파일명이 발행 기준을 만족하는가.
- AI 생성 흔적이나 과장된 일반화가 남아 있는가.
- 편집 중 남긴 `supporting-material candidate` 슬롯이 공개 원고에 남아 있지 않은가.

## 기본 사용 흐름

새 글:

```text
source card -> material partner -> v1 -> shaping editor -> texture keeper -> evidence/prepublish
```

기존 초안 다듬기:

```text
material partner(선택) -> shaping editor -> texture keeper -> 필요한 부분 수정 -> evidence/prepublish
```

발행 준비만 요청한 경우:

```text
evidence checker -> prepublish script -> manual checklist
```

사용자가 "그냥 발행 준비만"이라고 말하면 material/shaping/texture 단계는 건너뛴다.

## 경계

- Lens는 판단을 돕는다. 단계가 아니다.
- Output contract는 작업 모드별 산출물을 정한다. 글의 스타일을 강제하지 않는다.
- Guard는 공개 안전과 발행 가능성을 막는다. 초안의 창작 기준으로 되돌려 적용하지 않는다.
- Agent는 기준 저장소가 아니라 얇은 실행자다. 기준 본문은 `editorial/`이 소유한다.
