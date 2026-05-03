# Editorial

블로그 글 작성, 편집, 검토, 발행 준비 시 이 폴더의 관련 문서를 먼저 읽는다.

이 폴더는 Claude/Codex 공식 실행 구조가 아니라, 이 블로그의 편집 기준 자료실이다. `CLAUDE.md`, `blog-write` skill, blog agents가 필요할 때 이 문서들을 참조한다.

## When To Read

| 상황 | 먼저 읽을 문서 |
| --- | --- |
| 모든 블로그 작업 | `source-policy.md`, `voice.md` |
| 새 글 작성/초안 다듬기 | `writing-partners.md`, `voice.md`, `developer-lens.md`, `edit-patterns.md` |
| 공개 기술 글의 포트폴리오 신호 점검 | `portfolio-signal-lens.md`, `developer-lens.md`, `writing-partners.md` |
| 톤 점검 | `voice.md`, `edit-patterns.md` |
| 기술 구현/복기 글 | `voice.md`의 Technical Case Study 기준, `developer-lens.md` |
| 회사 프로젝트 글 | `source-policy.md`, `voice.md`의 Technical Case Study 기준, `developer-lens.md` |
| 제품/아키텍처 글 | `source-policy.md`, `voice.md`의 Technical Case Study 기준, `developer-lens.md` |
| 개인/블로그 회고 | `voice.md`의 Retrospective / Meta 기준 |
| PI Lab 또는 학습/실험 글 | `voice.md`의 Learning / Experiment 기준, `developer-lens.md`, 필요 시 `series-pilab.md` |
| 발행 전 | `prepublish-check.md` |

## 문서 역할

- `source-policy.md`: 원천 자료와 공개 경계.
- `voice.md`: 글 유형별 목소리와 공통 톤 기준.
- `developer-lens.md`: 기술 블로그다운 문제 정의, 제약, 선택, 트레이드오프, 판단 변화 기준.
- `portfolio-signal-lens.md`: 공개 기술 글이 동료 개발자와 나를 궁금해하는 개발자에게 남기는 역량 신호 기준.
- `writing-partners.md`: 글을 키우는 단계 모델.
- `edit-patterns.md`: 반복해서 거부된 수정 방향과 보호해야 할 패턴.
- `series-pilab.md`: PI Lab 학습/실험 글의 특화 구조 후보.
- `prepublish-check.md`: 발행 직전 hard guard.
- `decisions/`: 하네스 변경의 배경, 문제, 결정, 비목표 기록.
- `audits/`: 하네스와 발행 글의 정합성 감사 기록.

## 강제 규칙과 참고 기준

- 강제 규칙: `source-policy.md`의 공개 경계, `prepublish-check.md`의 발행 전 필수 항목
- 참고 기준: `writing-partners.md`, `voice.md`, `developer-lens.md`, `portfolio-signal-lens.md`, `edit-patterns.md`, `series-pilab.md`

참고 기준은 글을 틀에 끼우기 위한 것이 아니라, 초안이 의도한 목소리와 구조에서 벗어나는지 확인하기 위한 점검 거울이다.

## 단계별 파트너

글을 다듬을 때는 검사 기준을 한 번에 적용하지 않는다.

- `blog-material-partner`: 글감, 장면, 실패, 오해, 판단 변화, 차분한 호기심의 출발점을 찾는다.
- `blog-shaping-editor`: 중심 질문, 탐구 동력, 흐름, 단락 기능, 보강/삭제/이동 후보를 본다.
- `blog-texture-keeper`: polish 과정에서 살아 있는 문장, 발견, 리듬, 질감이 깎이지 않는지 본다.
- `blog-evidence-checker`와 prepublish guard: 발행 직전 사실 정합성과 공개 경계를 본다.

자세한 흐름은 `writing-partners.md`를 따른다.

## 하네스 변경 기록

새 렌즈, 새 축, agent/skill 역할 변경처럼 이후 글쓰기 방식에 영향을 주는 하네스 변경은 `decisions/`에 decision record를 남긴다. 커밋 메시지는 요약과 짧은 의도를 담고, decision record는 왜 그 기준이 생겼는지, 무엇을 막으려는지, 어디까지 적용할지 남긴다.

오타 수정, 링크 정리, 이미 합의된 기준의 표현 polish처럼 맥락이 자명한 변경은 기록하지 않아도 된다.

## 글 유형

글 작업을 시작할 때 먼저 가장 가까운 유형을 정한다.

- `technical-case-study`: 구현, 트러블슈팅, 기술 도입, 비교, 아키텍처 복기
- `company-project`: 회사나 서비스에서 수행한 작업의 공개 가능한 복기
- `product-architecture`: 개인/제품 프로젝트의 문제 정의와 설계 결정
- `retrospective`: 개인 회고, 블로그 회고, 커리어/학습 방향 회고
- `learning-experiment`: 기술 학습, 실험, 측정, 오독과 재해석 중심의 글

유형은 분류표가 아니라 편집 기준을 고르기 위한 시작점이다. 한 글이 여러 유형을 섞을 수 있지만, 검토할 때는 주된 유형을 하나 정한다.
