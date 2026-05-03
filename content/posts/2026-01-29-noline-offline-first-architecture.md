---
title: "네트워크가 끊겨도 멈추지 않는 앱을 만들기까지 — Noline Offline-First 아키텍처 구축기"
author: "myeongyeon ham"
date: 2026-01-29
readTime: "15 min read"
platform: Blog
project: Noline
tags:
  - Offline-First
  - Local-First
  - SQLite
  - React Native
  - TanStack Query
  - Selective Activation
  - ULID
  - Architecture
---

# 네트워크가 끊겨도 멈추지 않는 앱을 만들기까지 — Noline Offline-First 아키텍처 구축기

## 들어가며: 해외에서 겪은 불편함

해외여행 중에 네트워크가 끊기면 앱이 무력해집니다.

로밍을 안 켜면 카카오톡도, 네이버 지도도 안 됩니다. 현지 유심을 사더라도 지하철, 건물 내부, 산간 지역에서는 끊깁니다. 그리고 바로 그 순간 길을 찾아야 할 때, 일정을 확인해야 할 때, 지출을 기록해야 할 때 앱이 멈춥니다.

저는 여행 관리 앱 Noline을 개발하면서 이 문제를 직접 해결해보고 싶었습니다. 네트워크 상태에 관계없이 앱이 작동하도록 만들고 싶었습니다.

이 글에서는 Offline-First 아키텍처를 직접 구축하면서 마주한 기술적 도전과, 중간에 설계를 수정하게 된 과정을 공유합니다.

## 1. 초기 설계 (v1.0): 모든 것을 로컬에

### TanStack Query 캐시로는 부족했다

처음에는 TanStack Query의 캐시만으로 오프라인을 해결할 수 있을지 고민했습니다. 캐시를 쓰면 일시적으로는 작동합니다. 하지만 생각해보면 불완전한 부분이 많았습니다.

- 네트워크가 느리거나 불안정한 상황에서는?
- 재검증(revalidation) 중에 오류가 나면?
- 오프라인에서 새 일정을 추가하면?

캐시는 "읽기"에는 좋지만, 네트워크 상태가 불안정할 때의 "쓰기"와 "동기화"까지 책임지기엔 한계가 있었습니다.

결국 로컬 데이터베이스를 진실의 원천(Single Source of Truth)으로 두는 구조가 필요했습니다.

### Local-First 구조

```
사용자 입력 → 로컬 SQLite 저장 (즉시) → 서버 동기화 (나중에)
```

Server-First 앱의 경우:
- 저장 버튼 → 로딩… → 완료
- 비행기 모드 → 기능 중단
- "저장 실패" 알림이 뜸

Local-First (Noline)의 경우:
- 저장 버튼 → 즉시 완료
- 비행기 모드 → 정상 작동
- 저장됨 = 진짜 저장됨

### 클라이언트 주도 ID 생성

서버에서 ID를 받아오려면 네트워크가 필요합니다. 오프라인에서는 불가능합니다.

그래서 클라이언트가 직접 ID를 생성하고, 서버는 이를 그대로 수용하는 방식을 택했습니다.

\`\`\`javascript
const onSubmit = async (data) => {
  const scheduleId = generateId(); // 클라이언트가 ID 생성 (ULID)

  await db.insert(schedules).values({
    id: scheduleId,
    title: '에펠탑 방문',
    ...data,
  });
  await addToSyncQueue('schedules', scheduleId, 'CREATE');
  queryClient.invalidateQueries(['schedules']);
};
\`\`\`

ULID는 시간순 정렬이 가능하면서도 충돌 확률이 극히 낮습니다.

## 2. 고민: 이게 맞을까?

오프라인 지도를 추가하면서 고민이 생겼습니다. 오프라인 지도는 무겁습니다.

- 소도시: 15–30MB
- 중소도시: 50–100MB
- 대도시: 150–200MB

여행 10개를 저장하면 최대 2GB입니다.

"모든 여행을 로컬에 저장하는 게 맞을까?"

- 지금 여행 중인 곳 → 오프라인 필요
- 6개월 전 다녀온 여행 → 온라인이면 충분하지 않을까?
- 내년에 갈 여행 계획 → 온라인이면 충분하지 않을까?

## 3. 검토한 대안들

**Option A: 동기화만 제어하기** — 핵심 문제인 저장 공간이 해결되지 않음.

**Option B: 비활성 여행도 오프라인 편집 가능하게** — 엣지 케이스가 계속 나와서 복잡도가 폭발.

**Option C: 여행 개수 제한** — 강제 삭제는 피하고 싶었고 임의적인 제한도 설명하기 어려움.

## 4. 두번째 설계 (v2.0): Selective Activation

### 단순화: 비활성 여행은 온라인 전용

\`\`\`javascript
// 비활성화된 여행 = 온라인 전용
if (!activated) {
  if (!isOnline) {
    throw new OfflineError('오프라인에서는 활성화한 여행만 편집 가능');
  }
  await api.post('/expenses', data);
}

// 활성화된 여행 = 완전 오프라인
if (activated) {
  await withTransaction(async () => {
    await db.insert(expenses).values(data);
    await db.insert(syncQueue).values(...);
  });
}
\`\`\`

### 핵심 아이디어: "활성화 = 오프라인 대비"

- **활성화된 여행:** 로컬 SQLite가 진실의 원천. 오프라인 작동 보장.
- **비활성 여행:** 서버 API가 진실의 원천. 온라인에서만 접근.
- **동시 1개 제한:** 저장공간 효율화 (~200MB)

### 사용자 흐름

1. 여행 계획할 때: 온라인으로 일정 추가. 저장 공간 안 씀.
2. 출발 전날: "활성화" 버튼 탭. 지도와 일정이 로컬에 다운로드.
3. 여행 중: 완전 오프라인. 지하철에서도 산속에서도 작동.
4. 여행 후: 비활성화하면 저장 공간 확보. 기록은 서버에 보관.

## 5. 활성화했는데 구글맵이 안 된다?

### Data와 Service는 다르다

- **Data** (Trip, Schedule, Expense): 소유권 있음, 동기화 필요
- **Service** (지도, 장소 검색, 길찾기): 소유권 없음, 외부 API 의존

### Policy Layer: 상태별 정책 결정

\`\`\`javascript
const POLICY = {
  online_active: {
    mapProvider: 'google',
    searchMode: 'api',
    createSchedule: { allowed: true, mode: 'full' },
  },
  offline_active: {
    mapProvider: 'mapbox',
    searchMode: 'manual',
    createSchedule: { allowed: true, mode: 'manual-only' },
  },
};
\`\`\`

\`\`\`tsx
const policy = useAppPolicy(tripId);

if (!policy.schedule.create.allowed) {
  return <PolicyErrorDisplay permission={policy.schedule.create} />;
}

if (policy.schedule.create.mode === 'manual-only') {
  return <ManualScheduleForm />;
}
\`\`\`

## 6. 동기화 안 된 데이터를 삭제하면?

### 해결책: 동기화 대기열 확인

\`\`\`javascript
const deactivate = async (tripId) => {
  const hasPending = await hasPendingTasksForTrip(tripId);

  await withTransaction(async () => {
    await db.update(tripActivations).set({
      isActivated: false,
      cleanupPending: hasPending,
    });
    if (!hasPending) {
      const now = new Date().toISOString();
      await db.update(schedules).set({ deletedAt: now });
      await db.update(expenses).set({ deletedAt: now });
    }
  });

  // Phase 2: 백그라운드에서 동기화 완료 후 Soft Delete
  // Phase 3: 7일 후 실제 삭제
};
\`\`\`

- 비활성화는 즉시 완료
- 동기화 대기 중인 데이터가 있으면 삭제 보류
- 백그라운드에서 안전하게 정리
- 7일 이내 복구 가능

## 7. 사용자는 지금 상태를 어떻게 알지?

- **활성화 상태 (TripCard):** 비활성 → "온라인 전용", 활성화 중 → "준비 중… 67%", 활성화 완료 → "준비 완료"
- **네트워크 상태 (Header):** Online / Offline 표시
- **제한 안내 (PolicyErrorDisplay):** 무엇이 안 되는지, 왜 안 되는지, 어떻게 하면 되는지 안내

## 마치며

업무에서도 사용자 경험 문제를 고민하고 해결한 경험은 있습니다. 다만 대부분 주어진 문제를 해결하는 경우였고, "내가 직접 불편함을 정의하고, 처음부터 끝까지 해결해본 적이 있나?" 하면 많지 않았습니다.

그래서 여행 중에 네트워크가 끊길 때마다 느꼈던 답답함을 직접 건드려보고 싶었습니다. 쉽지 않았습니다. 설계를 몇 번이나 갈아엎었는지 모르겠습니다. 그래도 고민하고 부딪히고 다시 고치는 과정은 꽤 인상 깊게 남았습니다.

배포는 했는데, 아직 실제 여행에서 써보진 못했습니다. 분명히 예상 못한 문제도 나오겠지만 또 고치면서 개선해보려고 합니다.

> [Noline 앱 - App Store](https://apps.apple.com)
