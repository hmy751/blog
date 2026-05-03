---
title: "테스트 환경 개선기: Jest/MSW 목킹 이슈와 해결법"
author: "myeongyeon ham"
date: 2025-02-22
readTime: "9 min read"
platform: Blog
project: InterPersona
tags:
  - Jest
  - MSW
  - Testing
  - Mocking
  - Next.js
  - Redux-Saga
---

# 테스트 환경 개선기: Jest/MSW 목킹 이슈와 해결법

## 테스트 환경의 필요성과 목표

InterPersona의 핵심 기능인 모의 면접은 사용자 녹음 → STT 변환 → AI 응답 생성 등 여러 비동기 로직이 얽혀 있습니다. 이런 복잡성을 안정적으로 관리하려면:

- 실제 API 없이도 시나리오를 검증할 수 있어야 하고,
- 주요 기능의 동작을 빠르게 테스트하며,
- 협업 시 명세서처럼 활용 가능한 테스트 코드를 작성해야 했습니다.

이를 위해 Jest로 유닛/통합 테스트를 작성하고, MSW(Mock Service Worker)를 통해 모의 API 응답을 구성했습니다. 하지만 이 과정에서 몇 가지 예상치 못한 이슈가 발생했고, 하나씩 해결하며 얻은 교훈을 정리해 보았습니다.

## 주요 이슈와 해결 과정

### 이슈 1: Jest 목킹의 호이스팅 문제

처음에는 반복되는 목킹 설정을 효율적으로 관리하려고 `jest.mock`을 유틸 함수로 분리해 사용했습니다. 예를 들어, 녹음 기능을 테스트하기 위해 Recorder.js를 목킹한 유틸을 만들어 보았습니다:

```typescript
// _tests/_utils/mockRecorder.ts
jest.mock('recorder-js', () => {
  return jest.fn().mockImplementation(() => ({
    init: jest.fn(),
    start: jest.fn(),
    stop: jest.fn().mockResolvedValue({ blob: new Blob() }),
  }));
});
export const mockRecorder = require('recorder-js');

// RecordButton.spec.tsx
import RecordButton from '@/components/pages/interview/RecordButton';
import { mockRecorder } from '_tests/_utils/mockRecorder';

test('녹음 시작 테스트', () => {
  render(<RecordButton />);
  expect(mockRecorder).toHaveBeenCalled();
});
```

하지만 유틸을 import한 테스트 파일에서 목킹이 적용되지 않는 문제가 발생했습니다. 확인 결과, `jest.mock`은 자동으로 파일 상단으로 호이스팅되는데, 유틸 파일을 import하면 호이스팅 순서가 꼬여 목킹이 제대로 동작하지 않았습니다.

물론 해당 유틸들을 최상단에서 import하면 문제가 발생하지는 않지만 개발 시 순서를 강제해야하는 단점이 있어, 만약 다른 개발자가 모르는 상태에서는 문제가 발생할 가능성이 있다고 생각했습니다.

**해결 방안:** 단순 유틸 분리 대신 `jest.setup.ts` 파일을 만들어 테스트 실행 전에 전역 목킹을 설정했습니다.

```typescript
// _tests/_mocks/recorder.ts
jest.mock('recorder-js', () => {
  return jest.fn().mockImplementation(() => ({
    init: jest.fn(),
    start: jest.fn(),
    stop: jest.fn().mockResolvedValue({ blob: new Blob() }),
  }));
});

// jest.setup.ts
import '@/_tests/_mocks/recorder';
```

전역 목킹 대신 테스트 상황에 맞게 실제 모듈이 필요한 경우, `jest.unmock()`으로 전역 목킹을 해제하고, `jest.resetModules()`로 캐시를 초기화한 뒤, `jest.mock()`로 다시 설정할 수 있습니다.

```typescript
jest.resetModules(); // 모듈 캐시를 초기화하여 이전 상태 제거
jest.unmock("recorder-js"); // 전역 목킹 설정을 해제

const Recorder = require("recorder-js"); // 실제 모듈 사용

// ...

afterAll(() => {
  jest.resetModules(); // 모듈 캐시 초기화
  jest.mock("recorder-js", () => ({ mock: true })); // 실제 모듈 테스트가 끝난 후, 전역 목킹 재적용
});
```

### 이슈 2: navigator.mediaDevices 목킹 문제

녹음 기능은 `navigator.mediaDevices.getUserMedia`를 사용합니다. JSDOM 환경에서 이를 목킹하려 했으나, `window.navigator`의 속성 재정의가 필요했습니다.

**해결 방법:** `jest.setup.ts`에서 속성을 동적으로 정의했습니다.

```typescript
// _tests/_mocks/window.ts
if (!window.navigator.mediaDevices) {
  Object.defineProperty(window.navigator, 'mediaDevices', {
    configurable: true,
    writable: true,
    value: {},
  });
}

window.navigator.mediaDevices.getUserMedia = jest.fn().mockResolvedValue({});
```

### 이슈 3: 목킹 반환값의 잔존 문제

테스트마다 다른 API 응답을 시뮬레이션하려고 `mockResolvedValue`를 사용했는데, `jest.clearAllMocks()`를 호출해도 반환값이 초기화되지 않아 테스트 간 간섭이 발생했습니다.

**해결 방법:** 기본 설정이 아닌 다른 실행이 필요할 경우 `mockResolvedValueOnce`나 `mockRejectedValueOnce`를 사용해 단일 테스트에만 영향을 주도록 변경했습니다.

```typescript
it('녹음 중단 에러 처리', async () => {
  const recorderInstance = (Recorder as jest.Mock).mock.instances[0];
  recorderInstance.stop.mockRejectedValueOnce(new Error('Unknown stop error'));

  await waitFor(() => {
    expect(addToastMock).toHaveBeenCalledWith({
      title: '알 수 없는 오류',
      description: '다시 시도해주세요.',
    });
  });
});
```

### 이슈 4: jest.useFakeTimers()와 비동기 로직

녹음 진행 프로세스에 대한 테스트 목킹을 구현하면서, `requestAnimationFrame` 부분에서 타이머 관리가 필요했고 이를 구현하는 과정에서 이슈가 발생했습니다.

#### 렌더링 문제

렌더링이 제대로 되지 않는 이슈가 발생했고, 확인 결과 클릭 이벤트 전에 `jest.useFakeTimers()`를 설정하고 이벤트를 진행하여 리액트 내부에 영향을 주어 UI 업데이트가 제대로 되지 않았습니다.

**해결 방법:** 클릭 이벤트 이후에 `jest.useFakeTimers()`를 실행하여 렌더링 이슈를 해결했습니다.

```typescript
// _tests/_utils/recordingTest.tsx
await userEvent.click(recordButton);

// ...

jest.useFakeTimers();
```

#### Saga delay 문제

통합 테스트에서 녹음 유틸을 적용하는 과정에서 테스트가 제대로 통과되지 않았고 확인 결과 saga로직에서 중간 delay부분에서 진행이 되지 않았습니다.

`delay`는 Promise를 기반이며, `jest.advanceTimersByTime()`은 Promise가 아닌 내장 타이머 함수(`setTimeout`, `setInterval`…)에 영향을 주기 때문이었습니다.

**해결 방법:** 녹음 진행을 완료하고 바로 `jest.useRealTimers()`로 복구한 뒤, `waitFor`에 timeout을 추가하여 해결했습니다.

```typescript
// _tests/app/interview/page.spec.ts
integrationSetup.simulateRecordingFlow();
jest.useFakeTimers();
jest.advanceTimersByTime(1000);

integrationSetup.cleanup(); // useRealTimers() 호출

await waitFor(() => {
  expect(screen.getByText('다시 시도하기')).toBeInTheDocument();
}, { timeout: 2000 });
```

### 이슈 5: MSW와 Next.js 14 호환 문제

테스트 서버 뿐만 아니라 서비스 워커에 MSW로 API를 모킹하려 했으나, Next.js 14의 서버 컴포넌트 환경에서 등록되지 않았습니다. 서버 컴포넌트가 빌드된 후 클라이언트에서 워커를 실행해야 했기 때문입니다.

**해결 방법:** 개발 환경실행 중 MSW플래그 특정 환경에서만 MSW를 활성화하도록 환경 변수를 적용하고 따로 렌더링 될 수 있도록 했습니다.

```json
// turbo.json
"dev:msw": {
  "cache": false,
  "persistent": true
}
```

```json
// package.json
{
  "name": "@apps/frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev:msw": "NEXT_PUBLIC_USE_MSW=true next dev"
  }
}
```

```tsx
// app/layout.tsx
const isUseMsw = process.env.NEXT_PUBLIC_USE_MSW;

// ...

return (
  <html>
    <body>
      {!isUseMsw ? (
        <LayoutWithProviders>{children}</LayoutWithProviders>
      ) : (
        <MSWProvider>
          <LayoutWithProviders>{children}</LayoutWithProviders>
        </MSWProvider>
      )}
    </body>
  </html>
);
```

## 결론

위 과정에서 얻은 교훈을 정리하면 아래와 같습니다:

- **목킹은 전역 설정과 개별 조정이 균형을 이루어야 한다:** `jest.setup.ts`와 `mockResolvedValueOnce`로 일관성과 유연성을 모두 확보.
- **브라우저 API 목킹은 JSDOM의 한계를 고려해야 한다:** 완전히 구현되지 않을 수 있음을 숙지하고 속성 재정의로 해결.
- **타이머와 비동기는 실행 순서를 철저히 관리해야 한다:** `useFakeTimers`와 `useRealTimers`의 타이밍 조절.
- **Next.js와 MSW는 환경 분리가 필요하다:** 서버/클라이언트 렌더링 특성을 반영.

테스트 환경 구축 작업은 단순히 버그를 잡는 것 이외에 로직을 체계화 하고 협업을 용이하게 만드는데 기여할 수 있다고 생각했습니다.

앞으로도 개발 시 유지보수성과 확장성을 고려하여 테스트 코드를 명세서처럼 활용할 계획입니다.
