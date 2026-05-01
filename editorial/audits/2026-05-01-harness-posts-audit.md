# Harness / Posts 정합 감사

작성일: 2026-05-01

적용 메모: 이 문서는 수정 전 정합 감사를 기록한다. 같은 날 P0/P1 권고 중 `description` drift 정리, voice 4-layer 재구조화, source boundary 일반화, `blog-write`/critic의 article type 반영은 하네스에 적용했다. `series` frontmatter는 도입하지 않기로 했다.

## 목적

이 문서는 현재 블로그 하네스가 실제 발행 글의 형태와 얼마나 맞는지 점검한다.

기준은 다음처럼 둔다.

- `content/posts/`의 발행 글 11편을 현재 canon으로 본다.
- `content/drafts/`와 `content/backlog/`는 미래 글 가능성을 보여주는 보조 자료로 본다.
- `CLAUDE.md`, `editorial/`, `.claude/skills`, `.claude/agents`, `.codex/agents`, `scripts/`는 하네스로 본다.
- 이번 문서는 수정 보고서가 아니라 정합 감사다. 실제 하네스 수정은 다음 라운드에서 별도로 한다.

중요한 전제: 이 블로그는 PI Lab 전용 블로그가 아니라 기술 블로그다. PI Lab은 앞으로의 글감 중 하나이며, 하네스는 PI Lab뿐 아니라 프로젝트 회고, 회사 작업 복기, 제품/아키텍처 글, 기술 학습/실험 글을 모두 수용해야 한다.

## 한 줄 결론

하네스의 공개 경계와 evidence 원칙은 대체로 유효하다. 하지만 metadata, voice, article type 구분이 실제 posts보다 좁다. 특히 현재 하네스는 PI Lab 미래 글의 페르소나와 구조를 전체 블로그 voice처럼 읽히게 만들고, 회고 글과 기술 글의 톤 차이를 충분히 표현하지 못한다.

## 감사 범위

### 발행 글

`content/posts/`에는 11편이 있다.

| 그룹 | 글 수 | 근거 | 특징 |
| --- | ---: | --- | --- |
| 프로젝트 구현/트러블슈팅 | 6 | InterPersona 5편 + 제목/본문 기준 해커톤 InterPersona 1편 | 대부분 합니다체, 코드/구현 중심 |
| 회사 프로젝트 복기 | 2 | `company`, `service` frontmatter | 합니다체, 문제-개선-효과 구조 |
| 개인 제품/아키텍처 | 1 | Noline Offline-First | 합니다체 + 후반부 개인 문제 정의 |
| 개인/커리어 회고 | 2 | `category: Retrospective` | 했다체, 코드 없음, 자기 관찰 허용 |

### 미래 글 보조 자료

`content/drafts/pilab/`에는 PI Lab 초안 3편이 있고, `content/backlog/pilab-publishing-plan.md`에는 PI Lab 시리즈 계획이 있다. 이는 미래 글의 한 축이다. 다만 앞으로의 미래 글이 PI Lab에만 한정된다는 뜻은 아니다.

## 1. Frontmatter 정합

### 현재 posts 실태

발행 글 11편 기준 frontmatter 필드 수:

| 필드 | 사용 수 | 판정 |
| --- | ---: | --- |
| `title` | 11/11 | supported |
| `date` | 11/11 | supported |
| `author` | 11/11 | supported |
| `readTime` | 11/11 | supported |
| `platform` | 11/11 | supported |
| `tags` | 11/11 | supported |
| `project` | 6/11 | context field |
| `company` | 2/11 | context field |
| `service` | 2/11 | context field |
| `category` | 2/11 | context field |
| `description` | 0/11 | drift |

### 하네스와의 충돌

| 출처 | 현재 주장 | posts 실태 | 판정 | 정정 방향 |
| --- | --- | --- | --- | --- |
| `CLAUDE.md` | posts에는 `title`, `date`, `description`이 있어야 함 | `description`은 0/11, 대신 `author`, `readTime`, `platform`, `tags`가 11/11 | drift | `description` 요구 제거 또는 명시적 도입 중 하나를 결정. 현재 canon 기준은 제거가 자연스럽다. |
| `scripts/blog-prepublish-check.mjs` | `description` 없으면 warning | 11편 모두 warning 발생 | drift | `description` warning 제거. 대신 `author`, `readTime`, `platform`, `tags` 누락을 warning 또는 error로 점검하는 편이 posts와 맞다. |
| `content/posts/README.md` | 파일명 날짜와 frontmatter `date` 일치 | prepublish hard check 통과 | supported | 유지. |

### 제안 스키마

공통 필드:

```yaml
title: ...
author: ...
date: YYYY-MM-DD
readTime: ...
platform: ...
tags:
  - ...
```

컨텍스트 필드:

```yaml
# 프로젝트/제품 글
project: ...

# 회사 작업 복기
company: ...
service: ...

# 메타/회고 글
category: Retrospective
```

`project`는 개인 프로젝트 전용이 아니라 글의 대상이 되는 프로젝트/제품을 가리키는 필드로 보는 편이 좋다. InterPersona, Noline 같은 글에 이미 그렇게 쓰이고 있다.

연속되는 글은 별도 `series` metadata를 도입하지 않아도 된다. 파일명 날짜, 제목, 본문 맥락, 글 사이의 자연스러운 참조만으로도 독자는 연속성을 읽을 수 있다. 현재 단계에서는 연재를 분류 체계로 만들기보다, 각 글이 독립적으로 읽히면서도 다음 글로 이어질 수 있게 쓰는 편이 더 가볍다.

## 2. 글 유형 지도

현재 하네스는 글 유형을 먼저 고르는 단계가 약하다. 실제 posts는 이미 여러 유형을 갖고 있다.

| 글 유형 | 현재 증거 | 기본 톤 | 구조 특징 | 하네스 상태 |
| --- | --- | --- | --- | --- |
| 기술 구현/트러블슈팅 | InterPersona, Turborepo, XState | 합니다체 | 문제, 원인, 대안, 구현, 교훈 | 부분 지원 |
| 회사 프로젝트 복기 | i18n, 상태 관리 아키텍처 | 합니다체 | 기존 문제, 제약, 개선 방향, 효과, 한계 | source boundary 보강 필요 |
| 제품/아키텍처 구축기 | Noline Offline-First | 합니다체 | 실제 불편, 설계 변경, 트레이드오프, 사용자 흐름 | 부분 지원 |
| 개인/블로그 회고 | 중간 회고, 1년 회고 | 했다체 | 자기 관찰, 변화, 고민, 다음 방향 | 현재 voice와 충돌 |
| 기술 학습/실험 글 | PI Lab drafts/backlog | 합니다체 또는 기술 회고체 | 실험, 수치, 오독, 재해석, 다음 질문 | PI Lab에만 과특화 |

하네스는 PI Lab 구조를 기술 블로그 전체의 미래 방향으로 착각하면 안 된다. 더 넓은 기본 단위는 `technical article type`이어야 하고, PI Lab은 그중 `learning/experiment` 성격의 글에 적용되는 specialization으로 두는 편이 안정적이다.

## 3. Voice 정합

### 현재 voice 문서의 성격

`editorial/voice.md`는 문서 목적부터 PI Lab 블로그 화자 페르소나를 정의한다. 존댓말, 감정 과잉 경계, memoir-style 자기 관찰 경계, 불필요한 `저/제가` 축소가 중심이다.

이 원칙은 PI Lab 기술 회고나 일반 기술 글에는 대체로 도움이 된다. 하지만 발행된 회고 글 두 편에는 그대로 적용하면 false positive가 난다.

### posts 증거

| 관찰 | 증거 | 판정 |
| --- | --- | --- |
| 기술 글은 대체로 합니다체다. | InterPersona, 회사 복기, Noline, XState 대부분 | supported |
| 회고 글은 했다체다. | `2025-06-03-2025-mid-year-retrospective.md`, `2026-02-03-blog-1year-retrospective.md` | supported |
| 회고 글은 자기 관찰과 memoir-style 전환을 일부러 사용한다. | 1년 회고의 "척", 블로그를 쓰며 달라진 감각, 앞으로의 고민 | supported |
| 현재 voice는 memoir-style 자기 관찰을 경계한다. | `voice.md`의 금기/경계 항목 | drift |

### 정정 방향: 4-layer voice

`voice.md`를 전체 공통 문서로 유지하려면 PI Lab 페르소나를 바로 전면에 두기보다 다음 계층으로 나누는 편이 좋다.

1. **Core voice: 모든 글 공통**
   - 공개 가능한 문장만 남긴다.
   - AI 생성 흔적을 남기지 않는다.
   - 사실, 수치, 시점, 사람, 기술 용어를 흐리지 않는다.
   - 과장된 자기 포장이나 근거 없는 결론을 피한다.
   - bold/결론 문장은 본문에서 근거를 받아야 한다.

2. **Technical case study: 기술 구현/복기 글**
   - 기본 톤은 합니다체.
   - 문제, 제약, 대안, 선택, 구현, 한계가 보이게 쓴다.
   - 코드와 수치는 자랑이 아니라 판단 근거로 쓴다.
   - 회사/서비스 맥락은 공개 가능한 수준으로 일반화한다.

3. **Retrospective/meta: 개인 회고 글**
   - 했다체를 허용한다.
   - 자기 관찰, 고민, 변화의 감각을 허용한다.
   - 단, 사실을 줄여 드라마를 만들거나 자기 포장으로 흐르는 것은 경계한다.
   - 이 유형에는 `memoir-style` 자체를 금지하면 안 된다. 문제는 memoir 톤이 아니라 과장과 근거 없는 전환이다.

4. **Learning/experiment: 기술 학습/실험 글**
   - PI Lab은 이 계층의 한 사례다.
   - 실험, 오독, 재해석, 측정, 다음 질문을 중심에 둔다.
   - `series-pilab.md`의 5단 구조는 이 유형의 PI Lab specialization으로 둔다.

## 4. Editorial 문서별 판정

| 파일 | 현재 역할 | 판정 | 수정 방향 |
| --- | --- | --- | --- |
| `editorial/README.md` | 모든 작업에서 읽을 문서를 안내 | partial drift | "글 유형 먼저 결정" 단계를 추가해야 한다. |
| `editorial/voice.md` | PI Lab 화자 페르소나 | drift | 전체 공통 voice와 글 유형별 변형으로 재구조화. PI Lab 페르소나는 하위 섹션으로 이동. |
| `editorial/edit-patterns.md` | 반복 거부 패턴 사례집 | partial drift | PI Lab/기술 글에는 유효하지만 회고 글에는 false positive 가능. 적용 범위를 명시해야 한다. |
| `editorial/series-pilab.md` | PI Lab 시리즈 구조 | supported, but narrow | PI Lab 전용 specialization으로 유지. 전체 기술 블로그 구조 법칙으로 승격하지 않는다. |
| `editorial/source-policy.md` | dev-hub/PI Lab 원천 사용 경계 | partial gap | 공개 경계 원칙은 유효하지만 회사 작업 복기, 개인 프로젝트, 일반 기술 학습 글의 source boundary가 부족하다. |
| `editorial/prepublish-check.md` | 발행 전 수동 체크 | drift | `description` 제거, 공통 필드와 글 유형별 점검 항목 추가. |

## 5. Agent / skill 정합

### `blog-write` skill

현재 `blog-write`는 작업 모드를 먼저 정하고 editorial 문서를 읽도록 한다. 하지만 글 유형을 먼저 정하는 단계가 없다.

정정 방향:

```text
작업 모드 결정
→ 글 유형 결정: technical-case-study | company-project | product-architecture | retrospective | learning-experiment
→ 유형에 맞는 editorial 문서 로드
→ 원천 수집 / 작성 / 검토
```

### tone critic

현재 tone critic은 `voice.md`와 `edit-patterns.md`를 기준으로 memoir-style before/after, `저/제가`, formulaic 표현을 점검한다. 이 기준은 기술 글에는 유효하지만 회고 글에는 과잉 적용될 수 있다.

정정 방향:

- tone critic이 `article_type`을 받도록 한다.
- retrospective에서는 자기 관찰을 문제로 보지 않고, 과장/자기 포장/근거 없는 전환만 본다.
- technical case study에서는 현재 기준을 대부분 유지한다.
- learning/experiment에서는 `series-pilab.md` 또는 해당 시리즈 문서를 추가로 읽는다.

### structure critic

현재 structure critic은 현상, 원인, 시도, 판단 분리를 본다. 기술 글에는 잘 맞지만 회고 글에는 구조 판정 기준이 다르다.

정정 방향:

- technical: 문제-원인-대안-결정-효과 구조를 본다.
- retrospective: 변화의 축, 반복되는 질문, 다음 방향의 정직성을 본다.
- learning/experiment: 실험 설계, 측정, 오독, 재해석, 다음 질문을 본다.

### evidence checker / source collector

현재 두 agent는 dev-hub/PI Lab을 source로 강하게 가정한다. 앞으로 일반 기술 블로그에서는 source가 다음처럼 다양해진다.

- 기존 발행 글
- 프로젝트 코드/작업 기록
- 회사 작업 회고의 공개 가능한 요약
- 공식 문서와 외부 레퍼런스
- 개인 프로젝트의 제품/설계 메모
- PI Lab 자료

정정 방향:

- 기본 source 우선순위를 PI Lab 중심이 아니라 "사용자가 지정한 원천 → 현재 repo → 프로젝트별 source → 외부 공식 문서"로 일반화한다.
- PI Lab은 별도 branch로 둔다.

## 6. 자동화 정합

### 현재 prepublish 결과

`scripts/blog-prepublish-check.mjs`는 hard error 없이 통과한다. 다만 다음 warning이 발생한다.

- posts 11편 모두 `missing description`
- PI Lab draft 3편 모두 `draft date is still TBD`

`description` warning은 posts canon과 맞지 않는다.

### 수정 후보

1. `description` warning 제거
2. `author`, `readTime`, `platform`, `tags` 누락 warning 추가
3. posts에 `status: draft` 또는 `status: blog-ready`가 남으면 warning 유지
4. draft의 `date: TBD` warning 유지
5. backlog는 public article이 아니므로 prepublish guard 대상에서 제외하되, repo를 외부 공유할 경우 별도 scrub 기준 필요

## 7. 공개 경계와 source boundary

### posts/drafts guard surface

발행 글과 초안에서는 다음 항목이 발견되지 않았다.

- Claude/Codex 생성 footer
- 로컬 절대 경로
- desktop 내부 경로
- PI Lab mission path
- posts의 workflow status metadata

이 범위에서는 공개 경계가 잘 지켜지고 있다.

### backlog 주의

`content/backlog/pilab-publishing-plan.md`는 source planning 문서라서 내부 source pointer를 포함한다. 이는 발행 글 문제가 아니라 repo boundary 문제다.

따라서 이 repo를 외부 공개하거나 블로그 플랫폼에 통째로 연결할 때는 다음 경계를 분리해야 한다.

- `content/posts/`: 공개 surface
- `content/drafts/`: 공개 전 원고. 플랫폼에 자동 노출 금지
- `content/backlog/`: 내부 기획/출처 지도. 외부 공개 전 scrub 필요
- `editorial/`: 운영 기준. 공개 여부는 별도 판단

## 8. 우선순위

### P0: 지금 하네스와 posts가 직접 충돌하는 것

1. `description` 요구 제거 또는 명시 도입 결정
2. `voice.md`의 PI Lab 페르소나를 전체 블로그 voice로 읽히지 않게 재구조화
3. 회고 글에 memoir-style 금기를 그대로 적용하지 않도록 tone 기준 분리

### P1: 앞으로 글이 늘수록 비용이 커지는 것

1. 글 유형 선택 단계 도입
2. `source-policy.md`를 일반 기술 블로그 source boundary로 확장
3. tone/structure critic에 `article_type` 개념 추가

### P2: 나중에 해도 되는 것

1. 2024 해커톤 글에 `project: InterPersona`를 넣을지 결정
2. 각 글 유형별 prepublish 수동 체크리스트 세분화

## 9. 다음 라운드 권장 작업

다음 라운드는 한 번에 전부 고치기보다 아래 순서가 좋다.

1. `voice.md`를 4-layer 구조로 재작성한다.
2. `CLAUDE.md`, `prepublish-check.md`, `scripts/blog-prepublish-check.mjs`에서 `description` drift를 정리한다.
3. `blog-write` skill에 글 유형 결정 단계를 추가한다.
4. tone/structure critic에 article type 기준을 추가한다.
5. `source-policy.md`를 PI Lab 중심에서 일반 기술 블로그 source boundary로 확장한다.

## 부록: 판정 요약

| 영역 | 판정 | 요약 |
| --- | --- | --- |
| Frontmatter | drift | `description`은 하네스 요구와 posts 실태가 반대다. |
| Tags/readTime/platform | gap | posts에서는 공통인데 하네스 필수 기준에는 약하다. |
| Voice | drift | PI Lab voice가 전체 블로그 voice처럼 읽힌다. |
| 회고 톤 | gap | 했다체와 자기 관찰을 허용하는 기준이 필요하다. |
| 기술 글 구조 | partial support | 문제-대안-구현-판단 기준은 이미 잘 맞는다. |
| PI Lab | supported but narrow | 시리즈 기준으로는 유효하지만 전체 기술 블로그 기준은 아니다. |
| Source policy | partial gap | 공개 경계 원칙은 좋지만 source 종류가 PI Lab에 치우쳐 있다. |
| Agents/skill | partial drift | article type을 받지 않아 회고 글에 false positive 위험이 있다. |
| Prepublish script | drift | hard guard는 유효하지만 `description` warning은 canon과 불일치한다. |
| Public boundary | supported with caveat | posts/drafts는 깨끗하다. backlog는 내부 source planning으로 별도 경계가 필요하다. |
