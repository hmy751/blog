---
name: blog-write
description: 블로그 repo에서 새 글 작성, 기존 글 편집, PI Lab/dev-hub 원천 자료 해석, 발행 전 점검을 할 때 사용한다. "블로그 쓰자", "글 다듬어줘", "발행 준비", "PI Lab 글" 같은 요청이나 content/posts, content/drafts, editorial 파일 작업 시 적용한다.
---

# blog-write

이 skill은 `~/Desktop/10_work/blog`의 글쓰기와 발행 준비에 적용한다. `dev-hub`는 원천 자료실로 읽고, 공개 가능한 글과 발행 판단은 이 repo에서 관리한다.

## 먼저 로드할 자료

| 상황 | 읽을 자료 |
| --- | --- |
| 모든 글 | `CLAUDE.md`, `editorial/README.md`, `editorial/source-policy.md`, `editorial/edit-patterns.md` |
| 목소리 점검 | `editorial/voice.md` |
| PI Lab 시리즈 | `editorial/series-pilab.md`, `content/backlog/pilab-publishing-plan.md` |
| 발행 준비 | `editorial/prepublish-check.md` |

## 작업 모드

1. **새 글**: 원천 수집 → 각도/구조 후보 → 사용자 선택 → v1 작성.
2. **편집**: 현재 초안의 목표를 확인하고, 필요한 레이어만 읽어 수정한다.
3. **review-only**: 파일은 수정하지 않고 tone/structure/evidence 카드만 반환한다.
4. **발행 준비**: frontmatter, 공개 경계, prepublish guard를 확인한다.

## 원천 수집

- 필요한 경우 `blog-source-collector`를 호출해 자료 카드를 받는다.
- `dev-hub`와 `pilab` 자료는 read-only evidence로만 사용한다.
- 원천 문장을 공개 글에 그대로 옮기지 않는다.
- 내부 경로, 미션 코드 원문, 면접 피드백 원문은 공개 글에 남기지 않는다.

## 작성 흐름

```text
1. 작업 모드 결정
2. `editorial/README.md` 확인 후 작업에 맞는 editorial 문서 로드
3. 원천 자료 카드 수집
4. 글의 각도/구조 후보 2-3개 제안
5. 사용자 선택 후 v1 작성 또는 편집
6. report-only 검토
   - blog-tone-critic
   - blog-structure-critic
   - blog-evidence-checker
7. v2 방향 결정
   - 구조 문제: 재작성/부분수정 선택
   - 표현 문제: 직접 수정안 제안
8. 발행 전 검사
   - node scripts/blog-prepublish-check.mjs
   - editorial/prepublish-check.md 수동 점검
```

## 중요한 판단

- `editorial/`은 공식 런타임 폴더가 아니라 이 블로그의 편집 기준 자료실이다. 이 skill이 필요한 문서를 명시적으로 읽는다.
- `editorial/voice.md`는 강제 문체 템플릿이 아니라 점검 거울이다.
- `editorial/series-pilab.md`의 구조는 PI Lab 시리즈 후보이며 전역 법칙이 아니다.
- 담백함은 압축이 아니다. 구체 장면과 사실 범위를 살린다.
- 발행 결정, 매체 선택, 최종 톤은 사용자 결정이다.

## 파일 위치

- 공개 글 원고: `content/posts/`
- 공개 전 초안: `content/drafts/`
- 발행 계획/글감: `content/backlog/`
- 편집 기준: `editorial/`

`content/posts/`로 승격할 때는 파일명을 `YYYY-MM-DD-slug.md` 형식으로 바꾸고, 파일명 날짜와 frontmatter `date`를 일치시킨다.
