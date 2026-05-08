---
title: "프론트엔드 상태 관리 아키텍처 개선기"
author: "myeongyeon ham"
date: 2025-06-18
readTime: "17 min read"
platform: Blog
topic: "State Management"
company: 위블링 (Weebling)
service: 오라운드 (Oround)
cover: /images/posts/2025-06-18-frontend-state-management-architecture/01-thumbnail.png
thumbnail: /images/posts/2025-06-18-frontend-state-management-architecture/01-thumbnail.png
tags:
  - State Management
  - SWR
  - MobX
  - React
  - Architecture
  - Server State
  - Client State
  - 관심사의 분리
---

# 프론트엔드 상태 관리 아키텍처 개선기

## 들어가며

이전 회사에서 프론트엔드 상태 관리 아키텍처를 개선하며 애플리케이션의 성능과 팀의 개발 생산성을 동시에 끌어올렸던 경험을 공유하고자 합니다.

제가 프로젝트에 합류했을 당시, 외주사에서 개발한 프로젝트로 애플리케이션의 상태 관리는 MobX를 중심으로 이루어지고 있었습니다. MobX는 서비스 초기의 빠른 개발 속도에 기여했지만, 서비스가 성장하고 복잡해지면서 몇 가지 구조적인 문제에 직면하게 되었습니다.

## 마주한 문제들: 기존 상태 관리 방식의 한계

당시 저희가 겪고 있던 비효율은 크게 세 가지로 요약할 수 있습니다.

### 1. 거대 스토어와 뒤섞인 책임

MobX 클래스 스토어는 그 특성상 여러 상태와 로직이 한곳에 중앙 집중되는 경향이 있었습니다. 저희 프로젝트에서는 비동기 API 통신, 전역 UI 상태, 컴포넌트의 지역 상태까지 모두 하나의 거대 스토어에서 관리하는 패턴이 자리 잡고 있었습니다.

그 결과, 데이터의 흐름을 파악하기 어려워졌고 버그 발생 시 원인 추적에 많은 시간이 소모되었습니다. 또한, 모든 로직이 거대한 스토어에 강하게 결합되어 있어 기능의 수정이나 분리도 어려웠습니다.

예를 들어 `CSInquireModal` 컴포넌트에서는 비즈니스 로직의 책임이 컴포넌트와 스토어에 분산되어 있어 코드의 흐름을 추적하기가 까다로웠습니다.

```tsx
// [패턴 1] CSInquireModal.tsx - 컴포넌트가 비즈니스 로직의 일부를 소유
const CSInquireModal: React.FC<CSInquireModalProps> = (props) => {
  const store = useStoreFactory(CSInquireModalStore);

  // 컴포넌트의 이벤트 핸들러가 스토어의 내부 동작을 모두 알고 순차적으로 호출
  const handleOnChangeTypeInquiry = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    // ...
    store.setTypeCategoryItemList(selectedValue); // 1. 하위 카테고리 목록 세팅
    store.setTypeGroupIndex(selectedValue);       // 2. 상위 카테고리 인덱스 세팅
    store.initRequestItemIndex();                 // 3. 하위 카테고리 선택 값 초기화
  };

  return (
    <select onChange={handleOnChangeTypeInquiry}>
      {/* ... */}
    </select>
    {/* ... */}
    <input
      type="text"
      name="inquiryTitle"
      onChange={store.handleInputChange} // 스토어의 액션을 그대로 연결
    />
  );
};

// [패턴 2] CSInquireModalStore.ts - 스토어가 비즈니스 로직의 다른 일부를 소유
class CSInquireModalStore extends ModalStore<unknown> {
  // ...
  // 스토어가 직접 이벤트 핸들러를 소유하며 비즈니스 로직을 처리
  @action.bound
  handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    // ... 유효성 검사 및 상태 업데이트 로직 ...
  }
}
```

또 `CelebGroundPageStore`의 경우 서버에서 받아온 데이터, API 통신 로직 그리고 사이드바 노출 여부나 현재 활성화된 탭과 같은 순수 UI 상태까지 모두 한 클래스에 혼재되어 응집도가 매우 낮은 상태였습니다.

```typescript
class CelebGroundPageStore {
  // 1. 서버에서 받아온 데이터
  @observable private _ground: CelebGroundModel = { ... };

  // 2. 서버와 무관한 순수 UI 상태
  @observable private _isDrawerVisible = false;
  @observable private _activeKey = '';

  // 3. API 호출 후, 클라이언트 데이터를 직접 조작하여 동기화하는 로직
  @action.bound
  async unfollowUser() {
    await this.api.unfollow();
    this._ground.followingYn = 'N'; // 상태를 직접 변경
  }

  // 4. 데이터 재검증을 위한 포괄적인 액션
  @action.bound
  async fetchGroundInfo(shopId: string) { /*...*/ }
}
```

### 2. 비효율적인 비동기 통신

서버 데이터에 대한 캐싱 전략이 없어, 사용자가 페이지를 오가거나 특정 인터랙션을 반복할 때마다 동일한 API가 중복으로 호출되었습니다. 이는 불필요한 서버 부하와 사용자 경험 저하를 유발하는 성능 문제로 이어졌습니다.

### 3. 수동으로 관리되는 비동기 UI 상태

비동기 API 요청에 대한 UI 상태를 표시하기 위해서는 수동으로 `isLoading`, `error` 같은 상태를 조작해야 했습니다.

```typescript
class CelebArtworkTabStore extends ListStore<CelebArtworkModel> {
  @action.bound
  async fetchArtworks(artistMemberNo, params, isInit) {
    this.setIsLoading(true); // 1. 로딩 시작 (수동)
    try {
      const response = await api.fetchCelebArtworks(artistMemberNo, params);
      // ... 데이터 가공 및 저장 (수동) ...
    } catch (e) {
      this.error = e; // 2. 에러 처리 (수동)
    } finally {
      this.setIsLoading(false); // 3. 로딩 종료 (수동)
    }
  }
}
```

이러한 문제들의 근원은 '서버 상태(Server State)'와 '클라이언트 상태(Client State)'를 명확히 구분하지 않고 하나의 스토어에서 관리했던 아키텍처라고 판단했습니다. 이를 개선하기 위해, 저희는 서버 상태를 명확히 분리하고 관리하는 작업을 결정했습니다.

## SWR 도입을 통한 아키텍처 재정의

### React-Query와 SWR

| 구분 | SWR (by Vercel) | React Query (by TanStack) |
| --- | --- | --- |
| 핵심 철학 | Stale-While-Revalidate 패턴의 구현체. 가볍고 간결한 데이터 패칭에 집중 | 서버 상태(Server State) 관리 그 자체에 집중. 클라이언트 상태와 서버 상태의 분리를 지향 |
| 데이터 식별 | 문자열 기반의 키(Key). 주로 API 엔드포인트 URL. | 배열 기반의 쿼리 키(Query Key). 계층적이고 상세한 쿼리 관리가 가능. |
| 캐시 관리 | 전역 캐시. `mutate` 함수를 통한 직접 조작. | `QueryClient` 인스턴스를 통한 중앙 집중식 캐시 관리. `invalidateQueries`, `setQueryData` 등 강력한 API 제공. |
| 핵심 추상화 | `useSWR` 훅 | `QueryClient` 인스턴스. `useQuery`, `useMutation`은 클라이언트와 상호작용하는 인터페이스. |

두 라이브러리 모두 대부분의 메서드나 관리 방식이 비슷한 면이 많았습니다.

메인 컨셉은 SWR의 경우 데이터 패칭에 좀 더 중점적이고 React-Query는 서버 상태 관리 자체에 집중을 한 차이가 있었습니다. 그래서 SWR은 `SWRConfig` 전달 없이 전역 캐시로 바로 `useSwr`을 활용할 수 있고, React-Query는 중앙에 `QueryClient` 인스턴스를 생성하고 관리하는 방식으로 구현되어 있었습니다.

SWR, React-Query 둘 다 동일한 문제를 해결할 수 있는 라이브러리였지만 저희 팀은 두 라이브러리를 비교하고 검토한 후, 상대적으로 API가 더 간결하고 학습 곡선이 낮다고 판단한 SWR을 채택했습니다. 오라운드는 서비스 초기 단계로 빠른 검증이 중요했기 때문에 SWR이 더 실용적일 거라고 판단해 선택했습니다.

참고: [Overview | TanStack Query React Docs](https://tanstack.com/query/latest/docs/framework/react/overview)

참고: [SWR 이해하기](https://swr.vercel.app/ko)

### 새로운 아키텍처: 명확한 아키텍처와 역할 분리

저희는 이 문제를 해결하기 위해 SWR을 활용해 아래처럼 새로운 상태 관리 아키텍처를 정의했습니다.

- **서버 상태 → SWR:** API 통신, 캐싱, 재검증 등 서버 데이터의 생명주기 전체를 SWR이 전담합니다.
- **전역 클라이언트 상태 → MobX:** 여러 컴포넌트에서 공유하고 서버와 무관한 글로벌 전역 상태는 계속해서 MobX가 담당합니다.
- **지역 상태 → React State:** 특정 컴포넌트 내에서만 유효한 상태는 `useState`로 관리합니다.

프로젝트의 코드를 모두 개선하기보다는 신규 기능 개발에 먼저 적용하고 기존의 코드는 점진적으로 개선해 나가며 작업을 진행했습니다.

## 작업 과정: 비효율적인 코드 패턴 개선

작업은 신규 기능 개발에는 개선된 아키텍처를 바탕으로 진행했고 기존 코드는 기능 개발 작업 시에 점차적으로 개선하며 진행했습니다.

작업시 기존의 비효율적인 MobX + 명령형 로직 패턴을 SWR 기반의 선언적 코드로 전환하는 데 집중되었습니다.

아래는 작업 과정을 보여주는 예시로 그라운드 페이지에서 상품 탭에 상품 목록을 보여주는 `CelebProductTab` 컴포넌트 입니다.

### [Before]: 여러 스토어를 넘나드는 명령형 코드

MobX 액션을 직접 호출하여 데이터를 가져오고 모든 로딩/에러 상태를 스토어 내에서 수동으로 관리했습니다.

```tsx
// [Before] components/.../CelebProductTab.tsx (MobX ver.)
const CelebProductTab: React.FC<CelebProductTabProps> = observer(() => {
  // 기능 하나를 위해 여러 스토어의 존재와 관계를 모두 알아야 함
  const {
    celebGroundPageStore,
    celebProductSidebarStore,
    celebProductTabStore,
  } = useRootStore();

  // 컴포넌트가 '어떻게' 데이터를 가져올지 모든 과정을 지시
  const onFilterChanged = async (param: GetArtworkProductListParam) => {
    celebProductSidebarStore.setPageNo(1);
    celebProductSidebarStore.setListParamAndUrlQuery();
    // ... 라우터 조작 ...
    await celebProductTabStore.fetchProducts(/*...*/);
  };
  // ...
});

// [Before] stores/CelebProductTabStore.ts
class CelebProductTabStore extends ListStore<CelebProductModel> {
  // 모든 API 호출에 반복되는 수동 로딩/에러 처리 로직
  @action.bound
  async fetchProducts(/*...*/) {
    this.setIsLoading(true);
    try {
      /*...*/
    } catch (e) {
      this.error = e;
    } finally {
      this.setIsLoading(false);
    }
  }
}
```

### [After]: 역할이 명확해진 선언적 코드

데이터가 필요한 컴포넌트에서 SWR 기반의 커스텀 훅을 호출하기만 하면, 데이터와 함께 로딩, 에러 상태를 즉시 얻을 수 있었습니다. 서버 데이터의 생명주기는 이제 컴포넌트가 아닌 SWR 훅이 관리하게 했습니다.

```typescript
// [After] data/CreatorGroundProduct/useCreatorGroundProductData.ts (Custom Hook)
// '어떻게' 데이터를 가져올지에 대한 모든 로직이 이 훅 하나에 응집됨
export default function useCreatorGroundProductData({ artistMemberNo, publicStatus, categoryIndex }) {
  const getKey = (/*...*/) => { /*...*/ };

  // SWR이 로딩, 에러, 데이터, 페이지네이션 함수를 모두 자동으로 관리하고 반환
  const { data, error, size, setSize, mutate, isLoading } = useSWRInfinite(getKey, fetcher);

  // 컴포넌트가 사용하기 편하도록 가공된 데이터만 반환
  const productList = data ? [].concat(...data.map(page => page.productlist)) : [];
  return { productList, isLoading, size, setSize, mutate };
}

// [After] components/.../CelebProductTab.tsx (SWR ver.)
const CelebProductTab: React.FC<CelebProductTabProps> = (props) => {
  // 필터 상태는 서버 데이터와 분리된 단순한 UI 상태로 관리
  const { productPublicStatus, currentProductCategoryIndex } = useContext(TabContext);

  // 단 한 줄로 필요한 모든 서버 상태와 관련 함수를 '선언적으로' 얻음
  // 컴포넌트는 더 이상 '어떻게' 데이터를 가져올지 고민하지 않음
  const { productList, loading, size, setSize, mutate } = useCreatorGroundProductData({/*...*/});

  // 데이터 변경 후, 컴포넌트는 '갱신이 필요하다'는 사실만 알리면 끝
  const handleRefresh = () => mutate();

  if (loading && !productList.length) return <Loading />;

  return (
    <InfiniteScroll next={() => setSize(size + 1)} {/*...*/}>
      {productList.map(product => <CelebProductItem onUpdated={handleRefresh} />)}
    </InfiniteScroll>
  );
};
```

이러한 전환을 통해 스토어에서 비동기 관련 보일러플레이트 코드를 제거하고, 컴포넌트는 오직 UI 렌더링에만 집중할 수 있게 되었습니다.

## 성과 분석

SWR 도입을 중심으로 한 아키텍처 개선은 특정 기술의 교체를 넘어, 개발 방식과 서비스 품질 전반에 긍정적인 선순환을 만들어냈습니다.

### 개발 생산성: 예측 가능하고 응집도 높은 코드

가장 먼저 체감한 변화는 개발 생산성의 향상이었습니다. 이는 코드의 응집도가 높아지고 책임이 명확해진 덕분입니다.

기존에는 `CelebProductTab.tsx`, `CelebProductTabStore.ts`, `CelebProductSidebarStore.ts` 파일을 넘나들며 각 파일들의 상호 작용들을 모두 파악했다면, 개선 후에는 `CelebProductTab.tsx`파일에서 각 비즈니스로직을 보고 쉽게 역할이나 흐름을 파악할 수 있었습니다.

이러한 관심사의 분리는 다음과 같은 생산성 향상으로 이어졌습니다.

- **코드 가독성 및 유지보수성 향상:** 데이터의 흐름이 명확해져 코드를 이해하고 수정하기가 쉬워졌습니다.
- **사이드 이펙트 감소:** 데이터 로직과 UI 로직의 결합도가 낮아져 코드 변경 시 사이드 이펙트에 대한 우려가 크게 줄었습니다.

### 서비스 성능: 효율적인 데이터 통신

SWR의 내장된 캐싱 및 중복 제거 기능은 서버와의 통신을 최적화했습니다.

캐싱 전략의 부재로 다른 페이지를 방문했다가 다시 돌아올 때마다 동일한 API가 중복으로 호출되었지만 SWR을 적용하면서는 데이터를 캐싱하여 동일한 요청은 캐시에서 즉시 반환하도록 했습니다.

#### 캐싱 제어 재확인

현재 시점에서 SWR 작업 이후 다시 확인해보니 일부 API만 제어되고 있었습니다. 크롬 브라우저의 Network 탭 확인 결과 컴포넌트가 언마운트되는 탭 전환 시 캐시가 동작하지 않고 재요청이 발생하는 문제를 발견했습니다.

부끄럽지만 `revalidate` 옵션만 믿고 지정하고 있었기 때문에 캐싱제어가 되고 있었다고 착각했습니다.

다시 캐싱 제어를 확인하기 위해 `dedupingInterval` 옵션을 추가로 설정하여 캐싱 문제를 해결했습니다.

![dedupingInterval 적용 전 네트워크 재요청](/images/posts/2025-06-18-frontend-state-management-architecture/03-dedupinginterval-before.gif)

Caption: dedupingInterval 적용 전

![dedupingInterval 적용 후 네트워크 요청 제어](/images/posts/2025-06-18-frontend-state-management-architecture/04-dedupinginterval-after.gif)

Caption: dedupingInterval 옵션 적용 전 후

참고: [성능 - SWR](https://swr.vercel.app/ko/docs/advanced/performance.ko#deduplication)

### 사용자 경험(UX) 개선: 비동기 UI 제공

SWR이 제공하는 `isLoading`, `error` 상태를 활용하면서, 데이터 로딩 중에는 스켈레톤 UI를, 오류 발생 시에는 명확한 에러 메시지를 일관되게 보여줄 수 있었습니다. 이를 통해 화면이 비어있거나 멈춰 보이는 현상을 줄여 사용자가 체감하는 로딩 속도를 개선했습니다.

![스켈레톤 적용 전 상품 목록 로딩 화면](/images/posts/2025-06-18-frontend-state-management-architecture/05-skeleton-before.gif)

Caption: 스켈레톤 적용 전

![SWR 스켈레톤 적용 후 상품 목록 로딩 화면](/images/posts/2025-06-18-frontend-state-management-architecture/06-skeleton-after.gif)

Caption: SWR을 활용한 스켈레톤 적용 전 후

## 마치며

돌이켜보면, 저희가 마주한 문제는 특정 라이브러리 자체의 결함이 아니었습니다. 오히려 '서버 상태'와 '클라이언트 상태'라는, 각기 다른 역할과 생명주기를 가진 데이터들을 하나의 방식으로만 관리하려 했던 구조가 문제의 본질이었습니다.

해결책은 단순히 라이브러리를 교체하는 것이 아니라, '관심사의 분리'라는 기본 원칙으로 돌아가는 것이었습니다. SWR에게는 데이터 동기화라는 가장 잘하는 역할을, MobX에게는 순수 UI 상태 관리라는 본래의 역할로 분리하여, 복잡하게 얽혔던 코드의 흐름이 비로소 명확해졌습니다.

좋은 라이브러리 그 자체보다 문제의 본질을 파악하고 그에 맞는 적절한 해결책을 선택하는 것이 더 중요함을 체감한 의미 있는 경험이었습니다.

### 참고자료

- [SWR 이해하기 — SWR](https://swr.vercel.app/ko)
- [Overview | TanStack Query React Docs](https://tanstack.com/query/latest/docs/framework/react/overview)
- [React에서 서버 데이터를 최신으로 관리하기(React Query, SWR) | 카카오엔터테인먼트 테크블로그](https://tech.kakaoent.com/front-end/2023/230720-react-query/)
