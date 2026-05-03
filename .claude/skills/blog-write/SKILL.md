---
name: blog-write
description: 블로그 repo에서 새 글 작성, 기존 글 편집, PI Lab/dev-hub 원천 자료 해석, 발행 전 점검을 할 때 사용한다. "블로그 쓰자", "글 다듬어줘", "발행 준비", "PI Lab 글" 같은 요청이나 content/posts, content/drafts, editorial 파일 작업 시 적용한다.
---

# blog-write

이 skill은 `~/Desktop/10_work/blog`의 글쓰기와 발행 준비에 적용한다. `dev-hub`는 원천 자료실로 읽고, 공개 가능한 글과 발행 판단은 이 repo에서 관리한다.

## 먼저 로드할 자료

| 상황 | 읽을 자료 |
| --- | --- |
| 모든 글 | `CLAUDE.md`, `editorial/README.md`, `editorial/source-policy.md`, `editorial/voice.md` |
| 새 글 작성/초안 다듬기 | `editorial/writing-partners.md`, `editorial/voice.md`, `editorial/developer-lens.md`, 필요 시 `editorial/edit-patterns.md` |
| 가독성/독자 흐름 점검 | `editorial/reader-flow-lens.md`, `editorial/writing-partners.md`, 필요 시 `editorial/developer-lens.md` |
| 목소리 점검 | `editorial/voice.md`, 필요 시 `editorial/edit-patterns.md` |
| 기술 구현/복기 | `editorial/voice.md`의 Technical Case Study 기준, `editorial/developer-lens.md` |
| 회사 프로젝트 | `editorial/source-policy.md`, `editorial/voice.md`의 Technical Case Study 기준, `editorial/developer-lens.md` |
| 제품/아키텍처 | `editorial/source-policy.md`, `editorial/voice.md`의 Technical Case Study 기준, `editorial/developer-lens.md` |
| 개인/블로그 회고 | `editorial/voice.md`의 Retrospective / Meta 기준 |
| PI Lab 또는 학습/실험 | `editorial/voice.md`의 Learning / Experiment 기준, `editorial/developer-lens.md`, 필요 시 `editorial/series-pilab.md`, `content/backlog/pilab-publishing-plan.md` |
| 발행 준비 | `editorial/prepublish-check.md` |

## 작업 모드

1. **새 글**: 원천 수집 → 각도/구조 후보 → 사용자 선택 → v1 작성.
2. **편집**: 현재 초안의 목표를 확인하고, material/shaping/texture/prepublish 중 필요한 레이어만 적용한다.
3. **review-only**: 파일은 수정하지 않고 요청한 레이어의 material/shaping/texture/tone/structure/evidence/prepublish 카드만 반환한다.
4. **발행 준비**: frontmatter, 공개 경계, prepublish guard를 확인한다.

## 글 유형

작업 초기에 가장 가까운 유형을 하나 정한다.

- `technical-case-study`: 구현, 트러블슈팅, 기술 도입, 비교, 아키텍처 복기
- `company-project`: 회사나 서비스에서 수행한 작업의 공개 가능한 복기
- `product-architecture`: 개인/제품 프로젝트의 문제 정의와 설계 결정
- `retrospective`: 개인 회고, 블로그 회고, 커리어/학습 방향 회고
- `learning-experiment`: 기술 학습, 실험, 측정, 오독과 재해석 중심의 글

유형은 분류 체계가 아니라 어떤 voice와 critic 기준을 적용할지 고르는 시작점이다.

## 원천 수집

- 필요한 경우 `blog-source-collector`를 호출해 자료 카드를 받는다.
- `dev-hub`와 `pilab` 자료는 read-only evidence로만 사용한다.
- 원천 문장을 공개 글에 그대로 옮기지 않는다.
- 내부 경로, 미션 코드 원문, 면접 피드백 원문은 공개 글에 남기지 않는다.

## 작성 흐름

```text
1. 작업 모드 결정
2. 글 유형 결정
3. `editorial/README.md` 확인 후 작업에 맞는 editorial 문서 로드
4. 원천 자료 카드 수집
5. blog-material-partner로 글감, 장면, 실패, 오해, 판단 변화, 탐구 동력, 개발자 관점, 이해와 판단의 연결 후보 확인
6. 글의 각도/구조 후보 2-3개 제안
7. 사용자 선택 후 v1 작성 또는 편집
8. blog-shaping-editor로 중심 질문, 흐름, 독자 진입성, 보강/삭제/이동 후보 확인
9. blog-texture-keeper로 polish 과정에서 살아 있는 문장, 발견, 리듬이 깎이지 않는지 확인. 표/이미지/도식 같은 요약 장치가 글감을 대체하지 않는지도 확인
10. 필요한 경우 보조 critic 검토
   - blog-tone-critic
   - blog-structure-critic
11. v2 방향 결정
   - 구조 문제: 재작성/부분수정 선택
   - 표현 문제: 직접 수정안 제안
12. 발행 전 검사
   - blog-evidence-checker
   - node scripts/blog-prepublish-check.mjs
   - editorial/prepublish-check.md 수동 점검
```

`다듬어줘` 요청은 기본적으로 shaping 작업이다. 곧장 prepublish 검사만 하지 말고, 글이 더 좋아질 여지가 있는지 먼저 본다. 사용자가 "발행 준비만"이라고 명시하면 material/shaping/texture 단계를 건너뛴다.

`가독성`, `읽기 좋게`, `표`, `이미지`, `도식`, `스캔하기 쉽게` 같은 요청은 `reader-flow-lens`를 함께 적용한다. 이때 목표는 문장을 무조건 짧게 만드는 것이 아니라, 독자가 글의 판단 흐름을 놓치지 않도록 오프닝 약속, 섹션 층위, 소제목, 문단 첫 문장, 자료 앞뒤 문장, 숫자 배치를 점검하는 것이다. 다만 reader-flow는 글의 목소리를 다시 쓰는 단계가 아니다. PI Lab처럼 시리즈 글이거나 기존 발행글이 있는 경우에는 먼저 시리즈의 목소리 기준선, strong lines, 판단 변화 문장을 확인한 뒤 독자 흐름을 본다.

바로 만들 수 있는 Markdown 표, 리스트, 짧은 코드 예시, 의사코드, 텍스트 도식, 요약 박스도 기본값으로 삽입하지 않는다. 독자 막힘이 분명하고, 그 장치가 글의 핵심 판단을 돕고, `Texture Keeper` 관점에서 글감이나 발견을 평평하게 만들지 않을 때만 초안에 직접 넣는다. 목소리나 자료 배치 판단이 남아 있으면 먼저 후보로 제안하거나 주석 슬롯으로 남긴다.

`리듬`, `호흡`, `뭔가 이상함`, `막힘`, `단조로움` 같은 요청은 곧바로 문체나 소제목을 전역 변경하지 않는다. 먼저 문제가 구조, 문단, 전환, 소제목, 문장 끝, 자료 배치 중 어디에 있는지 분리하고, 글의 기본 말투와 핵심 판단 문장은 유지한 채 필요한 범위만 고친다. 리듬 문제를 장치 부족으로만 보지 말고, 장치를 추가한 뒤에는 `Texture Keeper` 관점으로 글이 더 하네스 출력처럼 평평해지지 않았는지 다시 본다.

`하네스가 잘 적용됐는지`, `한 번 봐줘`, `점검해줘`처럼 검토 의도가 강한 요청은 `review-only`로 먼저 시작한다. 특히 가독성/리듬 점검은 바로 수정안으로 들어가지 말고 `적용된 것 / 덜 적용된 것 / 손대면 위험한 것 / 국소 수정 후보`를 먼저 나눈다. 파일 수정을 요청받은 뒤에도 한 번에 전체 문체를 바꾸지 않고, 문제가 드러난 3~5개 구간만 좁게 고친다.

편집 요청이 모호하면 아래 모드를 구분한다.

- `sync`: frontmatter, 링크, 파일명, 참조 표현 같은 운영 정합성만 맞춘다.
- `polish`: 문장 흐름, 중복, 단정 수위를 정리한다. 의미, 리듬, 발견을 바꾸지 않는다.
- `shape`: 글감, 중심 질문, 발견, 탐구 동력, 구조, 질감까지 본다.

## 중요한 판단

- `editorial/`은 공식 런타임 폴더가 아니라 이 블로그의 편집 기준 자료실이다. 이 skill이 필요한 문서를 명시적으로 읽는다.
- `editorial/voice.md`는 강제 문체 템플릿이 아니라 점검 거울이다.
- `editorial/writing-partners.md`는 글을 키우는 단계와 공개 전 점검 단계를 분리한다.
- `editorial/developer-lens.md`는 새 단계가 아니라 기존 파트너들이 공통으로 읽는 개발자 관점 렌즈다.
- `editorial/reader-flow-lens.md`는 새 단계가 아니라 shaping/texture가 함께 참고하는 독자 흐름 렌즈다. 오프닝 약속, 섹션 층위, 자료 앞뒤 문장, 읽기 리듬을 함께 보고, 표, 이미지, 도식은 장식이 아니라 독자의 판단을 돕는 장치일 때만 쓴다.
- `editorial/series-pilab.md`의 구조는 PI Lab 학습/실험 글의 후보이며 전역 법칙이 아니다.
- 새 렌즈, 새 축, agent/skill 역할 변경처럼 이후 글쓰기 방식에 영향을 주는 하네스 변경은 `editorial/decisions/`에 배경과 결정 맥락을 남긴다.
- 담백함은 압축이 아니다. 구체 장면과 사실 범위를 살린다.
- 회고 글에는 했다체와 자기 관찰이 자연스러울 수 있다. 기술 글의 금기를 그대로 적용하지 않는다.
- 개인적 문장과 감각 표현은 요구사항이 아니지만, 글의 판단과 독자 이해에 기여하면 보호한다.
- 좋은 글의 축은 톤만이 아니다. 글감, 중심 질문, 발견, 차분한 호기심으로 생기는 탐구 동력, 구조와 독자 흐름, 목소리와 리듬을 함께 본다.
- 기술 글에서는 개발자로서 무엇을 문제로 봤고, 어떤 제약과 선택 기준으로 판단했는지가 보이면 글이 강해진다. 단, 이를 자기소개서 문체나 강제 서사로 만들지 않는다.
- 글쓴이의 생각이나 통찰은 실제 선택, 실험 설계, 지표 해석, 디버깅, 다음 행동으로 이어질 때 글에 남긴다. 원천에 없는 생각을 그럴듯하게 만들지 않는다.
- 발행 결정, 매체 선택, 최종 톤은 사용자 결정이다.

## 파일 위치

- 공개 글 원고: `content/posts/`
- 공개 전 초안: `content/drafts/`
- 발행 계획/글감: `content/backlog/`
- 편집 기준: `editorial/`

`content/posts/`로 승격할 때는 파일명을 `YYYY-MM-DD-slug.md` 형식으로 바꾸고, 파일명 날짜와 frontmatter `date`를 일치시킨다.
직접 블로그에 올리는 공개 원고의 frontmatter `platform` 값은 `Blog`로 둔다.
