# Editorial

블로그 글 작성, 편집, 검토, 발행 준비 시 이 폴더의 관련 문서를 먼저 읽는다.

이 폴더는 Claude/Codex 공식 실행 구조가 아니라, 이 블로그의 편집 기준 자료실이다. `CLAUDE.md`, `blog-write` skill, blog agents가 필요할 때 이 문서들을 참조한다.

커스텀 블로그 사이트 구현 기준은 이 폴더가 아니라 `../site/`가 소유한다. 사이트 경계와 content/design contract는 `../site/docs/`를 따른다.

## Layers

| 층위 | 역할 |
| --- | --- |
| `core/` | 글쓰기 흐름, 글 유형별 글감 모델, 작업 모드별 산출물 계약, 레퍼런스 사용 원칙 |
| `lenses/` | 글을 볼 때 켜는 판단 렌즈. 단계가 아니다 |
| `guards/` | 공개 경계와 발행 전 hard guard |
| `reference-profiles/` | 레퍼런스에서 추출한 재사용 가능한 패턴 |
| `context/` | 특정 시리즈나 프로젝트 배경 메모 |
| `decisions/` | 하네스 변경의 배경, 문제, 결정, 비목표 기록 |
| `audits/` | 하네스와 발행 글의 정합성 감사 기록 |

## When To Read

| 상황 | 먼저 읽을 문서 |
| --- | --- |
| 모든 블로그 작업 | `core/workflow.md`, `core/article-types.md`, `guards/source-policy.md`, `lenses/voice.md` |
| 새 글 작성/초안 다듬기 | `core/workflow.md`, `core/article-types.md`, `core/output-contracts.md`, `lenses/voice.md`, `lenses/developer.md`, 필요 시 `lenses/edit-patterns.md` |
| 가독성/독자 흐름 점검 | `lenses/reader-flow.md`, `core/output-contracts.md`, 필요 시 `lenses/developer.md` |
| 표/코드/이미지/도식/그래프/스크린샷 판단 | `lenses/supporting-materials.md`, `core/output-contracts.md`, `guards/source-policy.md` |
| 레퍼런스 기반 하네스/글 편집 | `core/reference-use.md`, 필요 시 `reference-profiles/technical-blog-page-cadence.md` |
| 공개 기술 글의 포트폴리오 신호 점검 | `lenses/portfolio-signal.md`, `lenses/developer.md`, `core/workflow.md` |
| 톤 점검 | `lenses/voice.md`, 필요 시 `lenses/edit-patterns.md` |
| 기술 구현/복기 글 | `core/article-types.md`의 Technical Case Study material signature, `lenses/voice.md`, `lenses/developer.md` |
| 회사 프로젝트 글 | `core/article-types.md`, `guards/source-policy.md`, `lenses/voice.md`, `lenses/developer.md` |
| 제품/아키텍처 글 | `core/article-types.md`, `guards/source-policy.md`, `lenses/voice.md`, `lenses/developer.md` |
| 개인/블로그 회고 | `core/article-types.md`의 Retrospective material signature, `lenses/voice.md` |
| PI Lab 또는 학습/실험 글 | `core/article-types.md`의 Learning / Experiment material signature, `lenses/voice.md`, `lenses/developer.md`, 필요 시 기존 발행글 |
| 발행 전 | `guards/prepublish-check.md`, `core/output-contracts.md`의 candidate slot 기준 |

## 문서 역할

- `core/workflow.md`: `Material -> Shaping -> Texture -> Prepublish` 단계와 각 단계 책임.
- `core/article-types.md`: 글 유형별로 좋은 글감이 어떤 형태를 가져야 하는지 정의하는 material signature.
- `core/output-contracts.md`: review-only, edit, reader-flow, artifact gap, reference-guided, publish-ready 모드별 산출물 계약.
- `core/reference-use.md`: 레퍼런스를 표면 규칙으로 하드코딩하지 않고 패턴으로 번역하는 원칙.
- `lenses/voice.md`: 글 유형별 목소리와 공통 톤 기준.
- `lenses/developer.md`: 기술 블로그다운 문제 정의, 제약, 선택, 트레이드오프, 판단 변화 기준.
- `lenses/portfolio-signal.md`: 공개 기술 글이 동료 개발자와 나를 궁금해하는 개발자에게 남기는 역량 신호 기준.
- `lenses/reader-flow.md`: 좋은 기술 글처럼 읽히는 페이지 감각, 문단 호흡, 스캔 경로, 정보 배치, 판단 흐름.
- `lenses/supporting-materials.md`: artifact gap이 확인된 뒤 표, 코드, 이미지, 도식, 그래프, 스크린샷 중 어떤 자료로 풀지 고르는 처방 기준.
- `lenses/edit-patterns.md`: 반복해서 거부된 수정 방향과 보호해야 할 패턴.
- `guards/source-policy.md`: 원천 자료와 공개 경계.
- `guards/prepublish-check.md`: 발행 직전 hard guard.
- `reference-profiles/technical-blog-page-cadence.md`: 좋은 기술 글의 페이지 단위 리듬 패턴.

## 강제 규칙과 참고 기준

- 강제 규칙: `guards/source-policy.md`의 공개 경계, `guards/prepublish-check.md`의 발행 전 필수 항목, `core/output-contracts.md`의 발행 원고 후보 슬롯 제거.
- 참고 기준: `core/workflow.md`, `core/article-types.md`, `lenses/voice.md`, `lenses/developer.md`, `lenses/portfolio-signal.md`, `lenses/reader-flow.md`, `lenses/supporting-materials.md`, `lenses/edit-patterns.md`.

참고 기준은 글을 틀에 끼우기 위한 것이 아니라, 초안이 의도한 목소리와 구조에서 벗어나는지 확인하기 위한 점검 거울이다. 시리즈 연결은 별도 템플릿이 아니라 기존 발행글과 현재 초안의 중심 질문을 비교해 필요한 만큼만 다룬다.

## 단계별 파트너

글을 다듬을 때는 검사 기준을 한 번에 적용하지 않는다.

- `blog-material-partner`: 글감, 장면, 실패, 오해, 판단 변화, 차분한 호기심의 출발점을 찾는다.
- `blog-shaping-editor`: 중심 질문, 탐구 동력, 흐름, 단락 기능, 독자 진입성, artifact gap, 보강/삭제/이동 후보를 본다.
- `blog-texture-keeper`: polish 과정에서 살아 있는 문장, 발견, 리듬, 질감이 깎이지 않는지 본다.
- `blog-evidence-checker`와 prepublish guard: 발행 직전 사실 정합성과 공개 경계를 본다.

자세한 흐름은 `core/workflow.md`를 따른다. 작업 모드별 결과물은 `core/output-contracts.md`를 따른다.

## 하네스 변경 기록

새 렌즈, 새 축, writing agent/skill 역할 변경처럼 이후 글쓰기 방식에 영향을 주는 하네스 변경은 `decisions/`에 decision record를 남긴다.

사이트 구현과 사이트 전용 agent/skill 변경은 `../site/decisions/`에 기록한다. `editorial/decisions/`는 글쓰기 하네스의 결정 기록으로 유지한다.

writing 하네스 관련 수정 뒤에는 필요할 때 `blog-harness-observer`를 report-only로 호출해 구조 드리프트를 본다. 이 observer는 글쓰기 단계가 아니며, 새 규칙을 저장하는 장소도 아니다.

오타 수정, 링크 정리, 이미 합의된 기준의 표현 polish처럼 맥락이 자명한 변경은 기록하지 않아도 된다.

## 글 유형

글 작업을 시작할 때 먼저 가장 가까운 유형을 정한다. 각 유형에서 어떤 글감을 찾아야 하는지는 `core/article-types.md`를 따른다.

- `technical-case-study`: 구현, 트러블슈팅, 기술 도입, 비교, 아키텍처 복기
- `company-project`: 회사나 서비스에서 수행한 작업의 공개 가능한 복기
- `product-architecture`: 개인/제품 프로젝트의 문제 정의와 설계 결정
- `retrospective`: 개인 회고, 블로그 회고, 커리어/학습 방향 회고
- `learning-experiment`: 기술 학습, 실험, 측정, 오독과 재해석 중심의 글

유형은 분류표가 아니라 편집 기준을 고르기 위한 시작점이다. 한 글이 여러 유형을 섞을 수 있지만, 검토할 때는 주된 유형을 하나 정한다.
