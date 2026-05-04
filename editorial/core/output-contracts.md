---
작성일: 2026-05-04
목적: 작업 모드별로 결과가 진단에 머물지 않도록 필요한 산출물을 정의한다.
사용 방식: 편집, review-only, reader-flow, artifact gap, reference-guided 작업에서 읽는다.
관련:
  - [workflow.md](workflow.md) — 기본 단계
  - [reference-use.md](reference-use.md) — 레퍼런스 번역 원칙
  - [../lenses/reader-flow.md](../lenses/reader-flow.md) — 독자 흐름 렌즈
  - [../lenses/supporting-materials.md](../lenses/supporting-materials.md) — 자료 장치 처방
---

# Output Contracts

좋은 하네스는 글의 모양을 강제하지 않지만, 작업이 끝났을 때 무엇이 남아야 하는지는 분명해야 한다.

## 기본 모드

| 모드 | 파일 수정 | 남겨야 할 것 |
| --- | --- | --- |
| `review-only` | 하지 않음 | 가장 큰 막힘 1~3개, 메인 편집자가 그대로 옮길 수 있는 문구/표/슬롯/이동 후보 |
| `edit` | 함 | 실제 원고 move, 수정 범위, 남은 판단 |
| `polish` | 함 | 의미·발견을 바꾸지 않는 국소 문장 수정, 보호한 문장 |
| `shape` | 함 또는 제안 | 중심 질문, 배열 변경, build/move/cut, 필요한 원고 move |
| `publish-ready` | 함 또는 검사 | hard guard 통과 여부, 남은 blocker |

`review-only`는 파일을 고치지 않는다는 뜻이지 추상 조언만 한다는 뜻이 아니다.

## Reader-flow Edit

`가독성`, `읽기 좋게`, `스캔하기 쉽게`, `호흡`, `문장 끝`, `좋은 글처럼` 같은 요청에서 Reader Flow가 실제로 발동하면 아래 중 최소 하나는 남긴다.

- 원고에 직접 들어간 문단 재배치, 소제목 조정, lead sentence, 회수 문장 축소.
- 산문에 묻힌 비교 기준을 꺼낸 리스트/표/의사코드/텍스트 도식.
- 실제 화면이나 공개 경계 확인이 필요한 경우의 `supporting-material candidate` 슬롯.
- review-only라면 위 항목을 메인 세션이 그대로 옮길 수 있는 형태로 제공한다.

편집 모드에서 "좋아 보인다", "넣으면 좋다"로 끝내지 않는다. 다만 모든 글에 자료 장치나 micro-break를 강제하지 않는다.

## Artifact Gap

기술 판단이 trace, 로그, UI 상태, 실행 결과, config, prompt, 코드 구조, 수치 비교에 기대는데 독자가 볼 수 있는 근거가 없다면 artifact gap으로 본다.

남길 결과는 네 가지 중 하나다.

| 판단 | 결과물 |
| --- | --- |
| 바로 만들 수 있음 | 표, 리스트, 의사코드, 텍스트 도식, 짧은 비교표를 원고에 직접 삽입 |
| 화면성이 핵심임 | screenshot/image 후보, placement, caption, public-boundary |
| 자료가 필요하지만 아직 없음 | `supporting-material candidate` 슬롯 |
| 자료가 부적합함 | 왜 산문/표/도식 중 다른 형태가 더 나은지 명시 |

실제 스크린샷/이미지를 추천했지만 직접 넣을 수 없으면 최종 답변에만 남기지 않고 원고 위치나 review 카드에 슬롯 전문을 남긴다.

## Reference-guided Work

사용자가 레퍼런스, 캡처, 기존 글, "이런 느낌"을 제공하면 [reference-use.md](reference-use.md)를 먼저 적용한다.

산출물은 아래 순서로 남긴다.

1. 관찰한 효과: 레퍼런스의 표면 요소가 아니라 독자에게 만든 효과.
2. 추출한 패턴: 파일명·플랫폼·특정 글 제목 없이도 작동하는 표현.
3. 현재 글에 맞춘 move: 오프닝 약속, 대표 장면, before/after, 섹션 회수, 스크롤 손잡이, artifact slot 등.
4. 복제하지 않을 표면: 디자인, 레이아웃, 특정 자료 장치, 플랫폼 전용 형식.

레퍼런스가 페이지 리듬 자체를 보여주는 경우에는 `page cadence map`을 먼저 만든다. 편집 모드라면 그 map에서 3개 안팎의 실제 move나 후보 슬롯을 원고에 반영한다. 모든 reader-flow 작업에 이 강도를 적용하지는 않는다.

## Supporting-material Candidate Slot

후보 슬롯은 편집 단계의 임시 장치다. 발행 원고에는 남기지 않는다.

```md
<!-- supporting-material candidate
type: table | list | code | pseudocode | diagram | graph | screenshot | image
purpose: 독자가 무엇을 더 빨리 판단하게 할 것인가
placement: 어느 문단 뒤에 둘 것인가
source: 필요한 데이터, 출력, 화면, 실험 결과
style: 간단한 Markdown 표, Mermaid 도식, 공개 가능한 의사코드, 실제 스크린샷, 생성 이미지 등
user-action: 사용자가 제공해야 할 자료나 결정할 스타일
caption: 본문 아래에 붙일 설명
alt: 이미지 없이도 전달되어야 할 내용
public-boundary: 내부 경로, 비공개 코드, 개인 메모, 원천 문장 노출 위험
-->
```

`content/posts/`로 승격하기 전에는 실제 자료로 바꾸거나 제거한다.

## 멈춤 신호

- 진단 카드만 있고 원고 move, 후보 슬롯, 또는 그대로 옮길 수 있는 수정안이 없다.
- 자료 장치를 넣었다는 이유로 글감, 중심 질문, 발견, texture 점검을 생략한다.
- "자료 장치는 기본값이 아니다"를 이유로 artifact gap을 방치한다.
- reference에서 온 기준이 특정 파일명, 플랫폼, 사례 표면이 없으면 작동하지 않는다.
- observer나 agent 파일이 기준 본문을 새로 소유하기 시작한다.
