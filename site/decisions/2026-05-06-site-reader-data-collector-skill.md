---
작성일: 2026-05-06
상태: accepted
관련:
  - ../.claude/skills/site-reader-data-collector/SKILL.md
  - ./2026-05-06-clarity-local-export.md
  - ../docs/READER_BEHAVIOR_CONTRACT.md
---

# Site reader data collector skill 추가

## 배경

Clarity export/import 스크립트가 생겼지만, 다음 대화에서 어떤 순서로 토큰을 확인하고 dry-run을 돌리고 결과 JSONL을 읽을지 매번 다시 설명해야 한다. 데이터 수집은 privacy boundary와 provider API 제한을 같이 다루기 때문에, 단순 명령어 목록보다 작업 절차가 필요하다.

## 결정

`site/.claude/skills/site-reader-data-collector`를 사이트 전용 skill로 추가한다. 이 skill은 Clarity Data Export API 집계 수집, Clarity UI에서 직접 내려받은 heatmap/recordings 파일 import, normalized JSONL 기반의 짧은 reader behavior snapshot 정리를 맡는다.

Codex bridge는 `site/.agents/skills/site-reader-data-collector` symlink로 둔다. root writing skill이나 editorial 하네스에는 이 절차를 섞지 않는다.

## 적용 범위

- `npm run clarity:export` 실행 전 dry-run과 query preset 확인.
- `site/data/clarity/normalized/*.jsonl`의 URL/device/source 계열 집계 읽기.
- `npm run clarity:import`로 UI download 파일을 로컬 archive에 정리.
- 수집 결과를 독서 흐름과 화면 사용성 개선 후보로 요약.

## 비목표

- Clarity dashboard scraping.
- replay 영상 또는 DOM playback payload 자동 저장.
- 독자 식별자나 입력값 수집.
- 글쓰기 품질 판단을 수치로 대체.
- root `content/posts` 자동 수정.

## 후속 점검

- 실제 데이터가 쌓이면 snapshot 출력 형식이 너무 장황하지 않은지 본다.
- 반복 수집을 켤 때 하루 1회 이하 실행과 token 비공개 경계를 다시 확인한다.
