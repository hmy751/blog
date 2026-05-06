---
작성일: 2026-05-06
상태: accepted
관련:
  - ../docs/READER_BEHAVIOR_CONTRACT.md
  - ../scripts/clarity-export.mjs
---

# Clarity 로컬 집계 export 경계

## 배경

Clarity를 켠 뒤 dashboard만 보는 것이 아니라, 시간이 지나도 독서 행동 집계 데이터를 로컬에 남기고 싶어졌다. 다만 세션 녹화 원본이나 heatmap 파일을 자동으로 긁어오는 방식은 privacy boundary와 유지보수 안정성 모두에서 과하다.

## 결정

로컬 집계 저장은 Microsoft Clarity Data Export API의 dashboard aggregate를 사용한다. 기본 수집 query는 `url`, `device-url` 두 개로 제한하고, 결과는 `site/data/clarity/raw/`와 `site/data/clarity/normalized/`에 저장한다.

히트맵과 녹화 목록은 공식 API 자동 수집 대상이 아니므로, Clarity UI에서 사용자가 직접 다운로드한 CSV/PNG 파일만 `npm run clarity:import`로 `site/data/clarity/manual/`에 정리한다. 녹화 CSV는 recording 요약과 link를 담는 자료로 취급하고, replay 영상이나 DOM playback 원본으로 취급하지 않는다.

`site/data/clarity/`는 gitignore 대상이다. 토큰은 `CLARITY_API_TOKEN`으로만 읽고 `NEXT_PUBLIC_*` 환경변수나 코드에 넣지 않는다.

## 적용 범위

- `npm run clarity:export`는 최근 1일 기준 집계 데이터를 저장한다.
- raw 파일은 API 응답과 요청 메타데이터를 보존한다.
- normalized JSONL은 metric 단위로 append하여 나중에 로컬 분석하기 쉽게 둔다.
- manual import는 `~/Downloads` 또는 지정한 폴더에서 Clarity heatmap CSV/PNG와 recordings CSV를 찾아 복사한다.
- 공식 API 제한인 하루 10요청, 최근 1-3일, 최대 3 dimensions, 1000 rows 제한을 하네스 경계로 받아들인다.

## 비목표

- 세션 replay 원본 자동 저장.
- heatmap PNG/CSV 자동 다운로드.
- Clarity 로그인 세션을 이용한 browser scraping.
- 독자 식별용 custom user id 저장.
- 원고 본문 텍스트나 DOM snapshot을 로컬 분석 원천으로 삼기.
- Clarity dashboard를 대체하는 내부 analytics 제품 만들기.

## 후속 점검

- 실제 트래픽이 쌓이면 `source-url` 또는 `channel-url` preset을 추가로 쓸지 판단한다.
- 로컬 자동 실행은 토큰 설정 후 하루 1회 이하로만 켠다.
- export 결과를 공개 글 판단의 대체 지표로 쓰지 않고, UI/reader-flow 개선 후보를 찾는 보조 자료로만 쓴다.
