---
title: "네트워크가 끊겨도 멈추지 않는 앱을 만들기까지 — Noline Offline-First 아키텍처 구축기"
author: "myeongyeon ham"
date: 2026-01-29
readTime: "15 min read"
platform: Blog
project: Noline
cover: /images/posts/noline-offline-first/01-thumbnail.png
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

> [!NOTE]
> 사용자 입력 → 로컬 SQLite 저장 (즉시) → 서버 동기화 (나중에)

![Server-First와 Local-First 흐름 비교](/images/posts/noline-offline-first/02-server-first-vs-local-first.png)

Caption: Server-First vs Local-First 비교

사용자가 무언가를 입력하면 그 즉시 로컬에 저장됩니다. 서버 동기화는 네트워크가 있을 때 백그라운드에서 처리됩니다.

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

그리고 또 하나의 고민이 있었습니다. 오프라인에서 데이터를 만들고, 나중에 온라인이 되어 서버로 보낼 때 ID가 충돌하면 어떻게 될까요? 서버가 ID를 새로 만들면 클라이언트와 서버의 ID가 달라지고, 동기화가 꼬일 수 있습니다.

그래서 클라이언트가 직접 ID를 생성하고, 서버는 이를 그대로 수용하는 방식을 택했습니다.

```javascript
// 사용자가 일정을 추가할 때
const onSubmit = async (data) => {
  const scheduleId = generateId(); // 클라이언트가 ID 생성 (ULID)

  // 서버 응답을 기다리지 않고 즉시 저장
  await db.insert(schedules).values({
    id: scheduleId,
    title: '에펠탑 방문',
    ...data,
  });

  // 동기화 대기열에 추가
  await addToSyncQueue('schedules', scheduleId, 'CREATE');

  // UI 즉시 업데이트
  queryClient.invalidateQueries(['schedules']);
};
```

ULID는 시간순 정렬이 가능하면서도 충돌 확률이 극히 낮습니다. 오프라인에서 생성한 데이터가 나중에 서버로 갈 때도 ID가 그대로 유지되니 동기화가 꼬일 일이 없습니다.

## 2. 고민: 이게 맞을까?

오프라인 지도를 추가하면서 고민이 생겼습니다.

초기 설계는 모든 여행을 로컬에 저장하는 구조였습니다. SQLite에 전체 데이터를 저장하고, sync_queue로 서버 동기화하며, 오프라인 작동을 보장하는 방식이었습니다.

여기에 오프라인 지도를 얹으려니 문제가 보였습니다. 오프라인 지도는 무겁습니다.

- 소도시: 15–30MB
- 중소도시: 50–100MB
- 대도시: 150–200MB

여행 10개를 저장하면 최대 2GB입니다.

여기서 의문이 들었습니다.

> "모든 여행을 로컬에 저장하는 게 맞을까?"

- 지금 여행 중인 곳 → 오프라인 필요
- 6개월 전 다녀온 여행 → 온라인이면 충분하지 않을까?
- 내년에 갈 여행 계획 → 온라인이면 충분하지 않을까?

사용하지 않는 여행 데이터까지 모두 로컬에 쌓이고, 사용자는 이를 제어할 수 없습니다. 모든 여행을 항상 로컬에 두는 게 사용자를 위한 건지, 아니면 필요 없는 데이터로 폰을 채우는 건지 판단이 필요했습니다.

## 3. 검토한 대안들

### Option A: 동기화만 제어하기

로컬 데이터는 유지하되, 서버 동기화만 선택적으로 하는 방식입니다. 활성화된 여행만 sync_queue를 사용하고, 비활성 여행은 동기화하지 않습니다.

하지만 핵심 문제인 저장 공간이 해결되지 않습니다. 로컬에 데이터는 그대로 쌓입니다. 또한 "내 데이터가 로컬에 있는데 왜 서버에는 없지?"라는 혼란도 생길 수 있습니다.

### Option B: 비활성 여행도 오프라인 편집 가능하게

처음에는 이런 설계를 했습니다. 비활성화된 여행도 오프라인에서 편집할 수 있게 하려 했습니다. 서버에서 조회하고, temp_cache로 임시 저장하고, Merge 로직으로 일관성을 유지하는 방식이었습니다.

설계를 진행하다 보니 엣지 케이스가 계속 나왔습니다. temp_cache와 서버 데이터를 병합할 때 버전 충돌 처리, TTL 관리, Cleanup Job까지. 복잡도가 계속 늘어났습니다.

활성화 기능을 만드는 건데 비활성 여행에 투자하는 시간이 더 많았습니다. 방향이 틀린 것 같았습니다.

### Option C: 여행 개수 제한

로컬에 저장 가능한 여행을 10~20개로 제한하고, 개수 초과 시 오래된 여행을 강제 삭제하는 방식입니다.

강제 삭제는 피하고 싶었습니다. 임의적인 제한(왜 20개?)도 설명하기 어렵고, 사용자가 제어할 수 없다는 점이 마음에 걸렸습니다.

## 4. 두번째 설계 (v2.0): Selective Activation

### 단순화: 비활성 여행은 온라인 전용

Option B를 고민하다가 다시 생각해봤습니다. 비활성 여행까지 오프라인에서 편집 가능하게 만들 필요가 있을까?

비활성 여행은 "지금 당장 오프라인이 필요한" 여행이 아닙니다. 그냥 온라인에서만 쓰게 하면 됩니다.

```javascript
// 비활성화된 여행 = 온라인 전용
if (!activated) {
  if (!isOnline) {
    throw new OfflineError('오프라인에서는 활성화한 여행만 편집 가능');
  }
  await api.post('/expenses', data); // 서버 직접 통신
}

// 활성화된 여행 = 완전 오프라인
if (activated) {
  await withTransaction(async () => {
    await db.insert(expenses).values(data);
    await db.insert(syncQueue).values(...);
  });
}
```

temp_cache, Merge 로직, 버전 충돌 처리가 전부 필요 없어졌습니다.

### 핵심 아이디어: "활성화 = 오프라인 대비"

이렇게 해서 나온 구조가 Selective Activation입니다.

![Selective Activation 아키텍처](/images/posts/noline-offline-first/03-selective-activation-architecture.png)

Caption: Selective Activation 아키텍처

- **활성화된 여행 ("지금 떠나는 곳")**
  - 로컬 저장
  - 오프라인 지도
  - 완전 오프라인 작동

- **비활성 여행들 ("추억/계획들")**
  - 서버만 사용
  - 온라인 필요
  - 저장공간 0

정리하면:

- **활성화된 여행:** 로컬 SQLite가 진실의 원천. 오프라인 작동 보장.
- **비활성 여행:** 서버 API가 진실의 원천. 온라인에서만 접근.
- **동시 1개 제한:** 저장공간 효율화 (~200MB)

### 사용자 흐름

1. 여행 계획할 때: 온라인으로 일정 추가. 저장 공간 안 씀.
2. 출발 전날: "활성화" 버튼 탭. 지도와 일정이 로컬에 다운로드.
3. 여행 중: 완전 오프라인. 지하철에서도 산속에서도 작동.
4. 여행 후: 비활성화하면 저장 공간 확보. 기록은 서버에 보관.

![사용자 플로우 타임라인](/images/posts/noline-offline-first/04-user-flow-timeline.png)

Caption: 사용자 플로우 타임라인

### 아키텍처 변화

AS-IS: 순수 Local-First

> [!NOTE]
> 사용자 요청 → Local SQLite (모든 데이터) → Sync Queue → Server

문제: 모든 여행 데이터 + 지도 = 관리되지 않는 저장 공간

TO-BE: Selective Activation

사용자 요청이 들어오면 Offline-Prep Router가 활성화 상태에 따라 자동 분기합니다.

- 활성화된 여행 → Local DB → 오프라인 OK
- 비활성 여행 → Server → 온라인만

해결: 활성화된 여행 1개만 로컬 저장 (~200MB)

## 구조는 잡혔고, 만들면서 생긴 질문들

Selective Activation으로 "언제 로컬, 언제 서버"는 해결됐습니다. 그런데 실제로 만들다 보니 새로운 질문들이 생겼습니다.

- 활성화했는데 온라인에서 구글맵이 안 된다?
- 동기화 안 된 데이터가 있는데 비활성화하면?
- 사용자는 지금 상태를 어떻게 알지?

## 5. 활성화했는데 구글맵이 안 된다?

### Router만으로는 부족했다

v2.0에서 Router는 데이터(Trip, Schedule, Expense)의 저장 위치를 해결했습니다. 활성화 상태에 따라 로컬/서버를 자동 분기합니다.

```javascript
// Router가 데이터 저장 위치를 결정
await routeChildQuery(tripId, {
  local: () => db.select().from(expenses),
  remote: () => api.get('/expenses'),
});
```

하지만 구현하다 보니 예상치 못한 문제가 생겼습니다.

활성화된 여행에서 일정을 추가하려면 장소를 검색해야 합니다. 장소 검색은 Google Places API를 사용합니다. 그런데 활성화 = Local-First라는 규칙을 적용하면, 온라인 상태에서도 Google Places를 쓸 수 없게 됩니다.

"오프라인 대비"를 위해 활성화했는데, 오히려 온라인에서 기능이 제한되는 모순이 생겼습니다.

### Data와 Service는 다르다

문제는 데이터와 서비스를 구분하지 않고 동일한 정책을 적용했다는 점이었습니다.

- **Data** (Trip, Schedule, Expense): 소유권 있음, 동기화 필요
- **Service** (지도, 장소 검색, 길찾기): 소유권 없음, 외부 API 의존

![Data와 Service 구분](/images/posts/noline-offline-first/05-data-vs-service.png)

Caption: Data vs Service 구분

Data는 Router로 해결됩니다. 하지만 Service는 다릅니다. 외부 API에 의존하기 때문에 "어디에 저장할까?"가 아니라 "지금 쓸 수 있을까?"가 중요합니다.

### Policy Layer: 상태별 정책 결정

그래서 Policy Layer를 도입했습니다. 네트워크 상태 × 활성화 상태 = 4가지 조합에 대한 정책을 중앙에서 관리합니다.

![Policy Layer 4상태 매트릭스](/images/posts/noline-offline-first/06-policy-layer-matrix.png)

Caption: Policy Layer 4상태 매트릭스

```javascript
// 4가지 상태 조합
const POLICY = {
  online_active: {
    mapProvider: 'google', // 온라인이니까 구글맵 OK
    searchMode: 'api', // 장소 검색 API 사용
    createSchedule: { allowed: true, mode: 'full' },
  },
  offline_active: {
    mapProvider: 'mapbox', // 오프라인 맵 사용
    searchMode: 'manual', // API 없이 수동 입력
    createSchedule: { allowed: true, mode: 'manual-only' },
  },
  // ...
};
```

### 수동 입력: 외부 API 없이도 핵심 기능 유지

오프라인에서 장소 검색 API를 쓸 수 없다면? 그냥 텍스트로 입력하면 됩니다.

```javascript
// 온라인: Google Places API로 좌표까지 자동 입력
{ location: "에펠탑", latitude: 48.8584, longitude: 2.2945 }

// 오프라인: 텍스트만 입력, 좌표는 나중에 보강
{ location: "에펠탑", latitude: null, longitude: null }
```

핵심 정보(제목, 날짜, 금액)는 오프라인에서도 입력 가능하고, 부가 정보(좌표, 사진)는 온라인 복구 후 보강합니다.

### UX와 DX 모두 고려하기

```tsx
// 컴포넌트에서는 정책만 확인
const policy = useAppPolicy(tripId);

if (!policy.schedule.create.allowed) {
  return <PolicyErrorDisplay permission={policy.schedule.create} />;
}

// 수동 입력 모드인지 확인
if (policy.schedule.create.mode === 'manual-only') {
  return <ManualScheduleForm />; // 장소 검색 없이 텍스트 입력
}
```

4가지 상태 조합을 컴포넌트마다 if문으로 처리할 필요가 없습니다. Policy가 캡슐화하고, 컴포넌트는 `allowed`와 `mode`만 확인하면 됩니다.

- Router의 역할: 데이터를 어디서 가져올까? → `Repository.getAll(tripId)`
- Policy의 역할: 이 기능을 쓸 수 있을까? → `policy.schedule.create.allowed`

## 6. 동기화 안 된 데이터를 삭제하면?

비활성화하면 로컬 데이터를 정리해야 합니다. 단순하게 생각하면 그냥 삭제하면 됩니다.

### 위험한 시나리오

![동기화 전 비활성화로 데이터가 유실될 수 있는 시나리오](/images/posts/noline-offline-first/07-dangerous-data-loss-scenario.png)

Caption: 위험한 시나리오 (데이터 손실)

```javascript
// 단순한 접근
const deactivate = async (tripId) => {
  await db.update(tripActivations).set({ isActivated: false });
  await db.delete(schedules).where(eq(schedules.tripId, tripId));
  await db.delete(expenses).where(eq(expenses.tripId, tripId));
};
```

문제:

1. 오프라인에서 지출 3건 추가 (동기화 대기열에 저장)
2. 네트워크 복구 전에 비활성화 실행
3. 로컬 데이터 삭제
4. 네트워크 복구 → 동기화 시도 → 데이터 없음
5. 3건의 지출 기록 영구 손실

"저장됐습니다"라고 떴는데 데이터가 사라지면, 저라도 그 앱을 다시 열기가 망설여질 것 같습니다. 그래서 이 부분을 신경 썼습니다.

### 해결책: 동기화 대기열 확인

![안전한 비활성화 플로우](/images/posts/noline-offline-first/08-safe-deactivation-flow.png)

Caption: 안전한 비활성화 플로우

```javascript
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
```

- 비활성화는 즉시 완료
- 동기화 대기 중인 데이터가 있으면 삭제 보류
- 백그라운드에서 안전하게 정리
- 7일 이내 복구 가능

## 7. 사용자는 지금 상태를 어떻게 알지?

온라인인지 오프라인인지, 이 여행이 오프라인에서 쓸 수 있는지. 사용자가 모르면 불안할 것 같습니다. 그래서 상태를 명확히 보여주는 것도 신경 썼습니다.

### 활성화 상태 (TripCard)

각 여행 카드에는 현재 상태를 나타내는 배지가 표시됩니다.

![비활성 여행 카드와 오프라인 활성화 버튼](/images/posts/noline-offline-first/09-phone-trip-card-online-only.png)

![여행 활성화 전후 비교](/images/posts/noline-offline-first/10-phone-trip-activation-comparison.png)

Caption: 여행 활성화 비교

- 비활성: "온라인 전용" — 온라인에서만 사용 가능
- 활성화 중: "준비 중… 67%" — 다운로드 진행 중
- 활성화 완료: "준비 완료" — 오프라인 사용 준비 완료

### 네트워크 상태 (Header)

앱 헤더에는 현재 네트워크 상태가 표시됩니다.

![온라인 상태의 일정 화면](/images/posts/noline-offline-first/11-phone-online-schedule-google-map.png)

![오프라인 상태의 지도와 경로 화면](/images/posts/noline-offline-first/12-phone-online-offline-comparison.png)

Caption: 온, 오프라인 시 비교

- Online: 네트워크 연결됨
- Offline: 네트워크 끊김

### 제한 안내 (PolicyErrorDisplay)

기능을 사용할 수 없을 때는 이유와 해결 방법을 안내합니다.

![오프라인에서 장소 검색 대신 직접 입력을 안내하는 화면](/images/posts/noline-offline-first/13-phone-offline-guide-message.png)

Caption: 오프라인 시 안내 메시지

무엇이 안 되는지, 왜 안 되는지, 어떻게 하면 되는지. 이 세 가지를 알면 기다릴 수 있지 않을까요?

## 마치며

업무에서도 사용자 경험 문제를 고민하고 해결한 경험은 있습니다. 다만 대부분 주어진 문제를 해결하는 경우였고, "내가 직접 불편함을 정의하고, 처음부터 끝까지 해결해본 적이 있나?" 하면 많지 않았습니다.

그래서 여행 중에 네트워크가 끊길 때마다 느꼈던 답답함을 직접 건드려보고 싶었습니다. 쉽지 않았습니다. 설계를 몇 번이나 갈아엎었는지 모르겠습니다. 그래도 고민하고 부딪히고 다시 고치는 과정은 꽤 인상 깊게 남았습니다.

배포는 했는데, 아직 실제 여행에서 써보진 못했습니다. 분명히 예상 못한 문제도 나오겠지만 또 고치면서 개선해보려고 합니다.

[Noline 앱 - App Store](https://apps.apple.com/kr/app/noline/id6757186547)
