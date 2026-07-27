---
작성일: 2026-07-27
성격: near-final v2·v3 검증 기록
공개상태: 내부 작업 문서
---

# Validation

## 결과

| 검증 | 결과 | 범위 |
| --- | --- | --- |
| `git diff --check` | PASS | 새 process와 v2·v3 Markdown |
| prepublish checker | PASS | repo 전체 draft·post |
| 상대 링크 검사 | PASS | 이번 cycle의 process·v2·v3 26개 Markdown |
| 공개 경계 scan | PASS | v3 다섯 원고 |
| v2 동결 hash | PASS | review 입력 다섯 원고 |
| production Markdown renderer | PASS | v3 다섯 원고 |

prepublish checker가 낸 경고는 draft의 `date: TBD`뿐이다. 사용자 발행 결정 전의 의도된 상태이며 오류는 없었다.

공개 경계 scan은 로컬 절대 경로, 저장소 내부 content 경로, Claude/Codex 설정 경로, session·task 식별자, private project 이름을 확인했다. v3 본문에서 검출된 항목은 없다.

v2 다섯 파일의 SHA-256은 [v2 build record](./02-v2-build-record.md#v2-동결-hash)와 일치했다. 독립 review가 시작된 뒤 v2가 수정되지 않았음을 확인했다.

## 실제 renderer 확인

사이트의 production 경로와 같은 순서로 frontmatter를 읽고, frontmatter 제목과 같은 첫 H1을 제거한 뒤 `markdownToHtml(..., { leadFirstParagraph: true })`로 렌더링했다.

| 파일 | lead | H1 | H2 | H3 | table wrapper | code block |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `ai-self-check.md` | 1 | 0 | 5 | 0 | 0 | 1 |
| `current-active-state-operation.md` | 1 | 0 | 5 | 0 | 1 | 3 |
| `independent-review-and-recovery.md` | 1 | 0 | 4 | 1 | 1 | 3 |
| `judgment-order.md` | 1 | 0 | 3 | 3 | 2 | 2 |
| `product-flow-scope-control.md` | 1 | 0 | 5 | 1 | 1 | 3 |

다섯 편 모두 첫 정상 문단이 lead로 한 번만 승격됐고, 중복 H1은 남지 않았다. GFM 표는 `.table-scroll`로 감싸졌고 code fence도 production renderer에서 정상 변환됐다. 글마다 제목 계층과 artifact 수가 달라 한 템플릿으로 평평해지지 않았다.

## 사용자 검토 뒤에만 닫을 항목

- 발행일과 `YYYY-MM-DD-slug.md` 파일명
- 최종 제목과 tag
- 첫 글과 발행 순서
- 독립 글, 연속 글, 시리즈 중 공개 관계
- `current.md`라는 공개 이름

이 항목들은 검증 실패가 아니다. 사용자 방향 판단과 발행 결정이 필요한 열린 편집 항목이다.
