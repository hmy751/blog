---
date: 2026-05-07
area: reader analytics
status: accepted
---

# Reader Analytics Local and Internal Test Guard

## Background

PostHog와 Clarity를 연결한 뒤, 로컬 개발 서버나 AI/Codex 테스트 방문이 실제 독자 행동 데이터와 섞일 위험이 생겼다. 특히 `site/.env.local`에 provider key가 있으면 로컬 빌드에서도 analytics runtime이 켜질 수 있다.

## Decision

reader analytics runtime에 두 겹의 가드를 둔다.

- `NEXT_PUBLIC_READER_ANALYTICS_MODE=production`을 기본값으로 둔다.
- runtime hostname이 `localhost`, `127.0.0.1`, `::1`, `*.local`이면 provider env가 있어도 analytics를 켜지 않는다.
- 로컬에서 의도적으로 analytics를 켜기 위해 `NEXT_PUBLIC_READER_ANALYTICS_MODE=all`을 사용하면 event와 Clarity custom tag에 `traffic_type=local_test`, `test_actor=local`, `is_internal_test=true`를 붙인다.
- 운영 URL에서 내부 테스트가 필요하면 `?reader_analytics_test={label}` 또는 `?analytics_test={label}` query를 붙인다.
- 내부 테스트 label은 localStorage에 저장하고, 이후 PostHog event에는 `traffic_type=internal_test`, `test_actor={label}`, `is_internal_test=true`를 붙인다.
- Clarity에는 같은 label을 custom tag로 보낸다.

## Scope

이 결정은 로컬 개발, preview 확인, AI/Codex 작업 테스트 트래픽을 실제 독자 데이터와 분리하기 위한 것이다. 로컬에서 의도적으로 analytics 동작을 검증해야 할 때만 `NEXT_PUBLIC_READER_ANALYTICS_MODE=all`을 사용하고, 해당 데이터는 `local_test`로만 해석한다.

## Non-goals

- 실제 독자 세그먼트를 운영자가 수동으로 라벨링하는 기능.
- 개인 식별 가능한 내부 사용자 추적.
- PostHog `identify` 기반 내부 사용자 관리.

## Follow-up

분석할 때 `traffic_type IN (internal_test, local_test)`를 기본 제외 조건으로 둔다. 내부 테스트 label이 쌓이면 `test_actor=codex`, `test_actor=manual`, `test_actor=local`처럼 원인별로 나눠 확인한다.
