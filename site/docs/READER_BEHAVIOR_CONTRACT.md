---
작성일: 2026-05-06
목적: 블로그 독서 행동 분석, 히트맵, 세션 리플레이의 수집 경계와 구현 계약을 정의한다.
사용 방식: analytics/heatmap provider 추가, privacy page 수정, reader insight agent 호출, 사이트 검증 전 읽는다.
관련:
  - [platform-boundary.md](platform-boundary.md)
  - [CONTENT_CONTRACT.md](CONTENT_CONTRACT.md)
  - [SEO_CONTRACT.md](SEO_CONTRACT.md)
---

# Reader Behavior Contract

이 사이트의 행동 데이터는 광고, 리타게팅, 판매 전환 최적화가 아니라 글의 읽힘과 화면 사용성을 이해하기 위한 reader insight다.

기본 원칙:

```text
observe reading patterns, not identify readers
```

## Purpose

허용 목적:

- 글 첫 화면에서 독자가 계속 읽는지 확인한다.
- 글별 scroll depth와 이탈 지점을 본다.
- 코드 블록, 외부 링크, 태그, 관련 글 영역이 실제로 사용되는지 본다.
- 모바일/데스크톱에서 클릭이 몰리거나 묻히는 영역을 확인한다.
- 제목, lead, heading, figure, code, footer navigation의 독자 흐름을 개선한다.

비목표:

- 독자 개인 식별.
- 광고 타게팅, 리타게팅, 유사 타겟 생성.
- 독자별 장기 프로필링.
- private source나 원고 작성 과정을 추적하는 내부 도구화.
- 글쓰기 판단을 수치로 대체.

## Allowed Data

allowlist로 시작한다.

| 종류 | 예시 | 메모 |
| --- | --- | --- |
| page view | route, referrer domain, device category | 세션/사용자 식별자는 provider 기본값을 최소화한다. |
| reading progress | 25/50/75/100 scroll depth, reading time bucket | raw scroll stream 대신 milestone과 interval sample을 쓴다. |
| viewport sample | viewport top/bottom bucket, active heading | 실제 시선 추적이 아니라 화면에 걸린 영역의 근사치다. |
| pointer sample | 5% 단위 x/y bucket, pointer type | raw cursor stream이나 DOM snapshot은 저장하지 않는다. |
| click heatmap | 5% 단위 좌표 bucket 또는 element area aggregate | 개별 독자 재현보다 집계 heatmap을 우선한다. |
| area interaction | article row, code block, heading, footer link | selector는 안정적인 공용 UI 단위만 쓴다. |
| custom event | code copy, external link click, next article click | event name과 property는 아래 allowlist에 둔다. |

허용 custom event:

- `reader_page_view`
- `post_scroll_depth`
- `post_reading_time`
- `heading_reached`
- `viewport_sample`
- `pointer_heat_sample`
- `area_click`
- `code_copy`
- `external_link_click`
- `article_row_click`
- `next_article_click`
- `nav_click`

허용 property:

- `route`
- `referrer_domain`
- `post_slug`
- `post_year`
- `tag`
- `depth`
- `scroll_depth`
- `viewport_top`
- `viewport_bottom`
- `viewport_width_bucket`
- `viewport_height_bucket`
- `time_bucket`
- `heading_id`
- `active_heading_id`
- `heading_level`
- `link_domain`
- `code_block_index`
- `x_bucket`
- `y_bucket`
- `pointer_type`
- `sample_interval`
- `traffic_type`
- `test_actor`
- `is_internal_test`
- `surface`

## Disallowed Data

기본 금지:

- 이름, 이메일, 전화번호, 계정 ID 같은 개인 식별자.
- 입력값, 검색어, form value.
- 원고 본문 전체 텍스트를 analytics event property로 보내는 것.
- raw mouse/cursor coordinate stream이나 pointer path를 장기 보관하는 것.
- raw DOM/text snapshot을 장기 보관하거나 분석 원천으로 삼는 것.
- IP 주소를 운영자가 직접 내려받아 식별하는 것.
- 광고 네트워크, UTM audience, retargeting destination 연결.
- 독자별 방문 이력을 운영자가 직접 식별 가능한 형태로 결합하는 것.

## Heatmap

히트맵은 허용한다. 단, 집계 화면으로 해석한다.

- 먼저 click heatmap과 scroll map을 본다.
- move map은 해석 노이즈가 크므로 보조 자료로만 본다.
- heatmap에서 나온 발견은 디자인/콘텐츠 수정 후보이지, 글의 가치 판단 근거가 아니다.
- 화면 캡처를 외부 공유할 때는 날짜, 세그먼트, 방문자 수, provider UI의 식별 가능 정보를 지운다.

## Session Replay

session replay는 기본 off 또는 보류 상태로 둔다.

provider가 heatmap과 replay를 같은 스크립트로 묶는 경우:

- public privacy page에 고지한다.
- provider dashboard에서 masking mode를 확인한다.
- 공개 블로그 본문은 replay 문맥 확인을 위해 마스킹하지 않을 수 있다.
- 입력 요소는 항상 mask 상태로 둔다.
- 검색, 댓글, 구독, 문의 form처럼 독자 입력 surface가 생기면 해당 영역에 `data-clarity-mask="true"`를 둔다.
- replay를 읽을 때는 UI 문제 재현 목적의 짧은 샘플만 본다.
- replay를 글쓰기 평가나 독자 성향 판단에 쓰지 않는다.
- 필요성이 사라지면 provider를 제거하거나 provider 설정에서 replay 기능을 끈다.

Microsoft Clarity를 임시 provider로 쓸 경우 body 전체에 `data-clarity-mask="true"`를 두지 않는다. 현재 사이트는 로그인, 검색, 댓글, 문의 form이 없는 공개 블로그이므로 본문 텍스트를 replay에서 볼 수 있게 둔다. Clarity project 설정에서는 Balanced 또는 필요 시 Relaxed masking, cookie/consent, retention, IP blocking 옵션을 별도로 확인한다.

## Runtime Contract

현재 runtime hook은 provider env가 없으면 아무 분석 스크립트도 넣지 않는다.

환경 변수:

```text
NEXT_PUBLIC_READER_ANALYTICS_PROVIDER=clarity
NEXT_PUBLIC_READER_ANALYTICS_PROVIDERS=clarity,posthog
NEXT_PUBLIC_READER_ANALYTICS_MODE=production
NEXT_PUBLIC_CLARITY_PROJECT_ID={clarity project id}
NEXT_PUBLIC_POSTHOG_PROJECT_API_KEY={posthog project api key}
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

provider 값이 없으면 off다. `NEXT_PUBLIC_READER_ANALYTICS_PROVIDER`는 기존 단일 provider 호환용이고, 새 설정은 `NEXT_PUBLIC_READER_ANALYTICS_PROVIDERS`의 comma-separated 값을 우선한다. 허용 provider는 `clarity`, `posthog`뿐이다. `clarity`는 project id가 영문/숫자 allowlist를 통과해야 켜지고, `posthog`는 project API key와 host가 통과해야 켜진다.

`NEXT_PUBLIC_READER_ANALYTICS_MODE` 기본값은 `production`이다. 이 모드에서는 runtime hostname이 `localhost`, `127.0.0.1`, `::1`, `*.local`이면 provider env가 있어도 analytics script와 PostHog tracker를 켜지 않는다. 로컬에서 일부러 수집을 테스트해야 할 때만 `all`로 둔다. `off`는 provider env가 있어도 강제로 끈다.

운영 사이트에서 내부 테스트 방문을 구분해야 할 때는 URL에 `?reader_analytics_test=codex`를 붙인다. 이 값은 localStorage에 저장되어 이후 이벤트에 `traffic_type=internal_test`, `test_actor=codex`, `is_internal_test=true`가 붙는다. 예전 호환용으로 `?analytics_test=codex`도 허용한다. PostHog/Clarity dashboard와 local JSONL 분석에서는 이 property를 필터링해 실제 독자 데이터와 분리한다.

runtime hook은 `site/src/components/analytics/ReaderAnalytics.tsx`와 `site/src/components/analytics/ReaderBehaviorTracker.tsx`가 소유한다. provider 판단과 event/property allowlist는 `site/src/lib/analytics.ts`가 소유한다.

실제 연결 절차:

1. Clarity 또는 PostHog project를 만든다.
2. Clarity만 쓰면 배포 환경변수에 `NEXT_PUBLIC_READER_ANALYTICS_PROVIDER=clarity`, `NEXT_PUBLIC_CLARITY_PROJECT_ID={project id}`를 넣는다.
3. PostHog만 쓰면 `NEXT_PUBLIC_READER_ANALYTICS_PROVIDER=posthog`, `NEXT_PUBLIC_POSTHOG_PROJECT_API_KEY={project api key}`, `NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com`를 넣는다.
4. 둘 다 쓰면 `NEXT_PUBLIC_READER_ANALYTICS_PROVIDERS=clarity,posthog`와 각 provider key를 넣는다.
5. Clarity dashboard에서 Balanced 또는 Relaxed masking, cookie/consent mode, retention, 광고 연결 여부를 확인한다.
6. PostHog는 SDK의 autocapture/pageview/pageleave/session recording을 repo 기본값에서 끄고, `ReaderBehaviorTracker`의 allowlisted event만 capture한다. 로그인 없는 공개 블로그이므로 `identify`를 호출하지 않는다.
7. viewport/pointer sample은 reader flow의 근사치로만 쓴다. 좌표는 5% 단위 bucket으로 낮추고, input/form/contenteditable 영역은 보내지 않는다.
8. 로컬 개발과 AI/Codex 작업 테스트는 기본적으로 수집하지 않는다. 운영 URL을 직접 테스트해야 하면 `reader_analytics_test` query로 internal label을 남긴다.
9. Clarity를 켰다면 배포된 production host에서 browser runtime으로 `reader-analytics-clarity`, `clarity.ms/tag`가 실행되는지 확인한다. 로컬 host와 static HTML 원문에서는 analytics가 기본적으로 꺼져 있을 수 있다.
10. custom identifier, email, user id, 원고 본문 텍스트를 custom event/tag/identify property로 보내지 않는다.

## Local Data Export

로컬 저장은 provider별로 역할을 나눈다. Clarity는 dashboard aggregate와 수동 heatmap/recording download 정리용이고, PostHog는 allowlisted custom event를 HogQL Query API로 내려받아 장기 JSONL 분석 원천으로 둔다. 어느 쪽도 세션 녹화 원본, DOM playback payload, raw DOM/text snapshot, 개별 독자 식별 데이터를 자동 수집하지 않는다.

### Clarity Aggregate Export

Clarity 데이터를 로컬에 저장할 때는 공식 Data Export API의 dashboard aggregate를 기본 경로로 사용한다.

로컬 export 소유 파일:

- `site/scripts/clarity-export.mjs`
- `site/scripts/clarity-import-downloads.mjs`
- `site/data/clarity/raw/{run-id}/{query}.json`
- `site/data/clarity/normalized/clarity-daily.jsonl`
- `site/data/clarity/normalized/YYYY-MM-DD.jsonl`
- `site/data/clarity/manual/{import-id}/heatmaps/*`
- `site/data/clarity/manual/{import-id}/recordings/*`

`site/data/clarity/`는 git에 커밋하지 않는다. raw 응답은 Clarity API 응답과 요청 메타데이터를 함께 저장하고, normalized JSONL은 metric 단위 분석을 위해 아래 형태로 append한다.

```json
{
  "capturedAt": "2026-05-06T13:00:00.000Z",
  "windowDays": 1,
  "queryName": "device-url",
  "metricName": "Traffic",
  "dimensions": {
    "Device": "Mobile",
    "URL": "https://hmy751-blog.pages.dev/articles/..."
  },
  "values": {
    "totalSessionCount": 12,
    "totalBotSessionCount": 0,
    "distantUserCount": 8
  }
}
```

기본 query preset:

| preset | dimensions | 목적 |
| --- | --- | --- |
| `url` | `URL` | 글/페이지별 traffic, scroll, engagement, error 계열 집계 |
| `device-url` | `Device`, `URL` | 모바일/데스크톱별 읽힘 차이와 화면 문제 후보 확인 |

보조 preset은 `source-url`, `channel-url`, `country-url`, `browser-url`만 허용한다. Clarity API 제한 때문에 하루 10요청 이하, 최근 1-3일 범위, 최대 3 dimensions, 1000 rows 제한을 전제로 한다. 자동 수집은 하루 1회 이하를 기본으로 둔다.

환경 변수:

```text
CLARITY_API_TOKEN={data export api token}
CLARITY_EXPORT_NUM_DAYS=1
CLARITY_EXPORT_QUERIES=url,device-url
```

토큰은 `NEXT_PUBLIC_*`로 만들지 않는다. `site/.env.local`이나 shell 환경에서만 읽고, 배포 산출물과 git에 남기지 않는다.

### Manual Heatmap and Recording Import

Clarity UI에서 직접 내려받은 파일은 로컬 archive로 가져올 수 있다.

- Heatmap: Clarity UI의 Download CSV/PNG 결과만 import한다.
- Recordings: Clarity UI의 recording CSV만 import한다. 이 CSV는 recording 요약과 link를 담으며, 실제 replay 영상 파일이나 DOM playback 원본이 아니다.
- Import script는 `~/Downloads` 또는 지정한 폴더에서 `Clarity_*Heatmap*.csv`, `Clarity_*Heatmap*.png`, `Clarity_*Recordings*.csv` 계열 파일을 찾아 `site/data/clarity/manual/{import-id}/`로 복사한다.
- `--move`를 명시하지 않으면 원본 다운로드 파일은 이동하지 않고 복사한다.

실행:

```bash
npm run clarity:import -- --dry-run
npm run clarity:import
npm run clarity:import -- --type heatmap
npm run clarity:import -- --file ~/Downloads/Clarity_Project_Recordings_2026-05-06.csv
```

Manual import는 UI download의 로컬 정리일 뿐이다. Clarity 로그인 세션 자동화, 비공개 endpoint 호출, replay 원본 추출을 하네스 목표로 두지 않는다.

### PostHog Event Export

PostHog는 structured reader event를 로컬 JSONL로 남기는 provider다. 로컬 export는 PostHog Query API의 HogQL query를 사용하고, export 대상 event와 column은 이 문서의 allowlist에 맞춘다.

로컬 export 소유 파일:

- `site/scripts/posthog-export.mjs`
- `site/data/posthog/raw/{run-id}/events.json`
- `site/data/posthog/normalized/posthog-events.jsonl`
- `site/data/posthog/normalized/YYYY-MM-DD.jsonl`

`site/data/posthog/`는 git에 커밋하지 않는다. raw 응답은 쿼리와 응답 메타데이터를 보존하고, normalized JSONL은 event 단위 분석을 위해 아래 형태로 append한다.

```json
{
  "capturedAt": "2026-05-06T13:00:00.000Z",
  "windowDays": 1,
  "source": "posthog",
  "timestamp": "2026-05-06T12:30:00.000Z",
  "event": "post_scroll_depth",
  "route": "/articles/example/",
  "url": "https://example.com/articles/example/",
  "properties": {
    "post_slug": "example",
    "post_year": "2026",
    "depth": 50,
    "surface": "article"
  }
}
```

환경 변수:

```text
POSTHOG_PERSONAL_API_KEY={personal api key}
POSTHOG_PROJECT_ID={numeric project id}
POSTHOG_API_HOST=https://us.posthog.com
POSTHOG_EXPORT_NUM_DAYS=1
POSTHOG_EXPORT_EVENTS=reader_page_view,post_scroll_depth,post_reading_time,heading_reached,viewport_sample,pointer_heat_sample,area_click,code_copy,external_link_click,article_row_click,next_article_click,nav_click
```

`POSTHOG_PERSONAL_API_KEY`는 `NEXT_PUBLIC_*`로 만들지 않는다. 공개 runtime에는 project API key만 두고, export용 personal API key는 `site/.env.local`이나 shell 환경에서만 읽는다.

실행:

```bash
npm run posthog:export -- --dry-run
npm run posthog:export -- --num-days 1
npm run posthog:export -- --num-days 7 --events reader_page_view,post_scroll_depth,external_link_click
```

PostHog export는 raw event stream을 무제한 내려받는 도구가 아니다. 기본 기간은 1일, 기본 limit은 5000 rows이며, 허용 event 밖의 쿼리는 스크립트에서 거부한다. `viewport_sample`과 `pointer_heat_sample`은 상세 분석용이라 행 수가 빠르게 늘 수 있으므로 오래된 구간을 볼 때는 `--events`로 필요한 event만 좁힌다.

## Public Notice

`/privacy/`는 최소 공개 문장만 설명한다. 기본 화면, footer, About에는 노출하지 않는다.

- 이 사이트가 광고 목적 추적을 하지 않는다는 점.
- 익명화된 사용 통계만 사용할 수 있다는 점.
- 개인 식별 정보와 입력값은 수집하지 않는다는 점.
- 문의 채널.

privacy page는 site content다. root `content/posts` 원고로 만들지 않는다.

## Review Questions

새 provider나 이벤트를 추가할 때 묻는다.

- 이 데이터가 글/화면 개선 질문에 직접 답하는가.
- 같은 질문을 더 적은 데이터로 답할 수 있는가.
- 독자가 공개 privacy page만 읽고도 납득할 수 있는가.
- 개인별 재현보다 집계 지표로 충분한가.
- provider dashboard 설정이 repo 계약과 충돌하지 않는가.
