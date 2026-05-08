---
name: blog-write
description: 블로그 repo에서 새 글 작성, 기존 글 편집, PI Lab/dev-hub 원천 자료 해석, 발행 전 점검을 할 때 사용한다. "블로그 쓰자", "글 다듬어줘", "발행 준비", "PI Lab 글" 같은 요청이나 content/posts, content/drafts, editorial 파일 작업 시 적용한다.
---

# blog-write

이 skill은 `~/Desktop/10_work/blog`의 글쓰기와 발행 준비에 적용한다. 기준 본문은 `editorial/`이 소유하고, 이 skill은 작업 모드에 맞는 문서를 고르는 dispatcher 역할을 한다.

커스텀 블로그 사이트 구현은 이 skill의 책임이 아니다. 사이트 앱, Markdown renderer, 디자인 계약, 빌드/검증 작업은 `site/CLAUDE.md`와 `site/docs/`를 먼저 따른다. 원고 수정이 필요할 때만 root `content/`와 `editorial/` 기준으로 돌아온다.

## 먼저 로드할 자료

| 상황 | 읽을 자료 |
| --- | --- |
| 모든 글 | `CLAUDE.md`, `editorial/README.md`, `editorial/core/workflow.md`, `editorial/core/article-types.md`, `editorial/guards/source-policy.md`, `editorial/lenses/voice.md` |
| 새 글 작성/초안 다듬기 | `editorial/core/workflow.md`, `editorial/core/article-types.md`, `editorial/core/output-contracts.md`, `editorial/lenses/developer.md`, 필요 시 `editorial/lenses/edit-patterns.md` |
| 가독성/독자 흐름 점검 | `editorial/lenses/reader-flow.md`, `editorial/core/output-contracts.md`, 필요 시 `editorial/lenses/developer.md` |
| 표/코드/이미지/도식/그래프/스크린샷 판단 또는 artifact gap | `editorial/lenses/supporting-materials.md`, `editorial/core/output-contracts.md`, `editorial/guards/source-policy.md` |
| 레퍼런스 기반 글/하네스 작업 | `editorial/core/reference-use.md`, 필요 시 `editorial/reference-profiles/technical-blog-page-cadence.md` |
| 목소리 점검 | `editorial/lenses/voice.md`, 필요 시 `editorial/lenses/edit-patterns.md` |
| 공개 기술 글의 역량 신호 점검 | `editorial/lenses/portfolio-signal.md`, `editorial/lenses/developer.md` |
| PI Lab 또는 학습/실험 | `editorial/core/article-types.md`의 Learning / Experiment material signature, `editorial/lenses/voice.md`, `editorial/lenses/developer.md`, 필요 시 기존 발행글 |
| 발행 준비 | `editorial/guards/prepublish-check.md`, `node scripts/blog-prepublish-check.mjs` |

## 작업 모드

1. **새 글**: 원천 수집 -> 각도/구조 후보 -> 사용자 선택 -> v1 작성.
2. **편집**: 현재 초안의 목표를 확인하고, material/shaping/texture/prepublish 중 필요한 레이어만 적용한다.
3. **review-only**: 파일은 수정하지 않고 요청한 레이어의 카드만 반환한다. 단, 그대로 옮길 수 있는 문구/표/후보 슬롯/이동 후보를 포함한다.
4. **발행 준비**: frontmatter, 공개 경계, prepublish guard를 확인한다.

작업 모드별 결과물은 `editorial/core/output-contracts.md`를 따른다.

## 글 유형

작업 초기에 가장 가까운 유형을 하나 정한다. 각 유형의 material signature는 `editorial/core/article-types.md`를 따른다.

- `technical-case-study`: 구현, 트러블슈팅, 기술 도입, 비교, 아키텍처 복기
- `company-project`: 회사나 서비스에서 수행한 작업의 공개 가능한 복기
- `product-architecture`: 개인/제품 프로젝트의 문제 정의와 설계 결정
- `retrospective`: 개인 회고, 블로그 회고, 커리어/학습 방향 회고
- `learning-experiment`: 기술 학습, 실험, 측정, 오독과 재해석 중심의 글

유형은 분류 체계가 아니라 어떤 voice와 lens 기준을 적용할지 고르는 시작점이다.

## 원천 수집

- 필요한 경우 `blog-source-collector`를 호출해 자료 카드를 받는다.
- `dev-hub`와 `pilab` 자료는 read-only evidence로만 사용한다.
- 원천 문장을 공개 글에 그대로 옮기지 않는다.
- 내부 경로, 미션 코드 원문, 면접 피드백 원문은 공개 글에 남기지 않는다.

## 작성 흐름

```text
1. 작업 모드 결정
2. 글 유형 결정 및 material signature 확인
3. editorial/README.md 확인 후 작업에 맞는 core/lens/guard 문서 로드
4. 원천 자료 카드 수집
5. blog-material-partner로 글감, 장면, 실패, 오해, 판단 변화, 탐구 동력 후보 확인
6. 글의 각도/구조 후보 2-3개 제안
7. 사용자 선택 후 v1 작성 또는 편집
8. blog-shaping-editor로 중심 질문, 흐름, 독자 진입성, 보강/삭제/이동 후보 확인
9. blog-texture-keeper로 살아 있는 문장, 발견, 리듬이 깎이지 않는지 확인
10. 필요한 경우 tone/structure critic 보조 검토
11. v2 방향 결정
12. 발행 전 검사
```

`다듬어줘` 요청은 기본적으로 shaping 작업이다. 곧장 prepublish 검사만 하지 말고, 글이 더 좋아질 여지가 있는지 먼저 본다. 사용자가 "발행 준비만"이라고 명시하면 material/shaping/texture 단계는 건너뛴다.

## Reader Flow / Artifact Gap

`가독성`, `읽기 좋게`, `스캔하기 쉽게`, `리듬`, `호흡`, `문장 끝`, `가시성` 같은 요청은 `editorial/lenses/reader-flow.md`와 `editorial/core/output-contracts.md`를 함께 적용한다.

- 목표는 문장을 무조건 짧게 만들거나 자료 장치를 넣는 것이 아니라, 좋은 기술 글처럼 읽히는지 보는 것이다.
- 편집 모드에서는 진단 카드로 끝내지 않고 최소 하나의 실제 원고 move를 남긴다.
- trace UI, 제품 화면, 모델 답변, 그래프처럼 화면성이 강한 재료가 핵심이면 `editorial/lenses/supporting-materials.md`를 열고 visual candidate를 먼저 검토한다.
- 직접 넣을 수 없는 스크린샷/이미지는 최종 답변에만 제안하지 않고 원고 위치나 review 카드에 `supporting-material candidate` 슬롯을 남긴다.

## Reference Use

사용자가 참고 글, 캡처, 기존 글, "이런 느낌"을 제공하면 `editorial/core/reference-use.md`를 먼저 적용한다.

- 레퍼런스는 active rule이 아니라 pattern source다.
- 파일명, 플랫폼명, 특정 글 제목을 하네스 원칙에 박지 않는다.
- `observe -> abstract -> adapt -> guard` 순서로 현재 글에 맞는 move를 만든다.
- 페이지 리듬 자체가 쟁점이면 `editorial/reference-profiles/technical-blog-page-cadence.md`와 `editorial/core/output-contracts.md`의 reference-guided contract를 따른다.

## 하네스 변경

하네스 관련 요청에서는 사용자의 즉시 지시를 그대로 새 규칙이나 새 단계로 승격하지 않는다.

1. 기존 `Material -> Shaping -> Texture -> Prepublish` 구조에서 어느 층위의 문제인지 확인한다.
2. 기준 본문은 가능한 한 `editorial/core`, `editorial/lenses`, `editorial/guards`, `editorial/reference-profiles` 중 최소 소유 위치에 둔다.
3. agent 파일은 기준 저장소가 아니라 어떤 문서를 읽고 어떤 형식으로 반환할지만 둔다.
4. 새 렌즈, 새 축, agent/skill 역할 변경처럼 이후 작업 방식에 영향을 주면 `editorial/decisions/`에 decision record를 남긴다.
5. 구조 드리프트, 렌즈/단계 혼동, Claude/Codex agent 불일치가 의심되면 `blog-harness-observer`를 report-only로 호출한다.

`blog-harness-observer`는 제3자 관찰자일 뿐이며, normal writing flow에 넣거나 하네스 내용을 그 안에 누적하지 않는다.

## 중요한 판단

- `editorial/`은 공식 런타임 폴더가 아니라 이 블로그의 편집 기준 자료실이다.
- `site/`는 커스텀 블로그 앱 구현 레이어다. `blog-write`를 사이트 구현 dispatcher로 확장하지 않는다.
- Lens는 판단을 돕고, output contract는 작업 결과물을 정하고, guard는 공개 안전을 막는다.
- 담백함은 압축이 아니다. 구체 장면과 사실 범위를 살린다.
- 개인적 문장과 감각 표현은 요구사항이 아니지만, 글의 판단과 독자 이해에 기여하면 보호한다.
- 발행 결정, 매체 선택, 최종 톤은 사용자 결정이다.

## 파일 위치

- 공개 글 원고: `content/posts/`
- 공개 전 초안: `content/drafts/`
- 발행 계획/글감: `content/backlog/`
- 편집 기준: `editorial/`
- 사이트 앱 구현: `site/`

`content/posts/`로 승격할 때는 파일명을 `YYYY-MM-DD-slug.md` 형식으로 바꾸고, 파일명 날짜와 frontmatter `date`를 일치시킨다. 직접 블로그에 올리는 공개 원고의 frontmatter `platform` 값은 `Blog`로 둔다.
