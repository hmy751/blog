---
name: site-reader-data-collector
description: blog/site에서 Clarity/PostHog 독서 행동 데이터를 로컬로 export/import하고 집계 스냅샷을 읽어 다음 행동 후보를 정리할 때 사용한다. "Clarity 데이터 수집", "PostHog 이벤트 export", "reader behavior 집계", "히트맵/녹화 다운로드 정리", "분석 데이터 로컬 저장" 요청에 적용한다.
metadata:
  short-description: Collect blog reader data
---

# Site Reader Data Collector

이 skill은 `site/` 전용이다. Clarity 집계/수동 다운로드와 PostHog allowlisted event를 로컬에 남기고, 결과를 읽어 블로그 화면과 독서 흐름 개선 후보를 정리한다.

## 먼저 볼 자료

필요한 만큼만 읽는다.

1. `site/CLAUDE.md`
2. `site/docs/READER_BEHAVIOR_CONTRACT.md`
3. `site/decisions/2026-05-06-clarity-local-export.md`
4. PostHog event export가 관련되면 `site/decisions/2026-05-06-posthog-reader-events-local-export.md`
5. 명령 옵션이 헷갈릴 때만 `site/scripts/clarity-export.mjs`, `site/scripts/clarity-import-downloads.mjs`, `site/scripts/posthog-export.mjs`
6. export 후 `site/data/clarity/normalized/*.jsonl`, `site/data/posthog/normalized/*.jsonl`

## 수집 전 확인

- 작업 기준 디렉토리는 `site/`다.
- `CLARITY_API_TOKEN`은 `site/.env.local`, `site/.env`, shell 환경에서만 읽는다.
- 토큰을 `NEXT_PUBLIC_*`로 만들거나 코드에 넣지 않는다.
- `site/data/clarity/`는 로컬 전용 archive이며 git에 올리지 않는다.
- `site/data/posthog/`는 로컬 전용 archive이며 git에 올리지 않는다.
- 실제 API 호출 전에는 항상 dry-run으로 범위와 query 수를 확인한다.
- Clarity Data Export API 제한을 따른다: 최근 1-3일, 하루 10요청 이하.
- PostHog export는 personal API key와 numeric project id를 사용하고, runtime용 project API key와 혼동하지 않는다.
- `viewport_sample`, `pointer_heat_sample`, `area_click`은 상세 reader flow용 event다. 실제 시선 추적이 아니라 viewport/pointer 근사치이며, raw cursor path나 입력 영역 이벤트를 분석 대상으로 삼지 않는다.
- 로컬 개발/AI 테스트 트래픽은 기본 분석에서 제외한다. 운영 URL을 직접 테스트한 경우 `traffic_type=internal_test` 또는 `test_actor` property를 먼저 필터링한다.

## 실행

기본 집계 export:

```bash
cd site
npm run clarity:export -- --dry-run
npm run clarity:export -- --num-days 1 --queries url,device-url
```

필요할 때만 보조 preset을 추가한다.

```bash
npm run clarity:export -- --num-days 1 --queries url,device-url,source-url
```

허용 preset은 `url`, `device-url`, `source-url`, `channel-url`, `country-url`, `browser-url`이다.

Clarity UI에서 직접 내려받은 heatmap/recordings 파일 정리:

```bash
cd site
npm run clarity:import -- --dry-run --from ~/Downloads
npm run clarity:import -- --from ~/Downloads
npm run clarity:import -- --type heatmap --from ~/Downloads
npm run clarity:import -- --type recording --from ~/Downloads
```

`--move`는 사용자가 명시적으로 원본 다운로드 파일 이동을 원할 때만 쓴다. 기본은 복사다.

PostHog allowlisted reader event export:

```bash
cd site
npm run posthog:export -- --dry-run
npm run posthog:export -- --num-days 1
npm run posthog:export -- --num-days 7 --events reader_page_view,post_scroll_depth,viewport_sample,pointer_heat_sample,external_link_click
```

PostHog export 대상 event는 `site/docs/READER_BEHAVIOR_CONTRACT.md`의 allowlist에 맞춘다. 허용되지 않은 event 이름으로 임의 쿼리를 만들지 않는다.

## 결과 읽기

응답에는 다음을 짧게 남긴다.

- 실행 범위: 기간, query preset, 저장 경로
- provider: Clarity aggregate/manual import인지 PostHog event export인지
- 수집 결과: raw run path, normalized JSONL path, row 수
- 눈에 띄는 패턴: URL, device, source/channel 차이
- 해석: 독서 흐름이나 화면 사용성 개선 후보
- 다음 행동: UI 확인, 글 lead/heading 점검, 추가 query, 며칠 더 수집 등
- 한계: 데이터 없음, token 없음, dashboard에서만 확인 가능한 설정

데이터가 없으면 추정하지 않는다. "아직 트래픽/row가 없다"를 그대로 말한다.

## 주기 실행

사용자가 주기 수집을 원하면 하루 1회 이하로 `npm run clarity:export -- --num-days 1 --queries url,device-url` 또는 `npm run posthog:export -- --num-days 1`를 실행하게 구성한다. Codex automation이나 로컬 cron을 쓰되, prompt/command에는 수집 작업만 담고 해석과 공개 판단은 별도로 둔다.

## 하지 않을 것

- Clarity dashboard 로그인 세션을 자동화하거나 private endpoint를 호출하지 않는다.
- replay 영상, DOM playback payload, raw DOM/text snapshot을 추출하지 않는다.
- heatmap/recordings를 공식 UI download 없이 자동으로 긁어오지 않는다.
- 개인 식별자, 입력값, 이메일, user id를 수집/결합하지 않는다.
- heatmap이나 session replay를 글의 가치 판단으로 단정하지 않는다.
- `content/posts` 원고를 데이터 수치만 보고 자동 수정하지 않는다.
