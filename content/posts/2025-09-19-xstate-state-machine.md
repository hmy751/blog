---
title: "예측 가능한 UI를 위한 선택, XState 상태 머신 도입 후기"
author: "myeongyeon ham"
date: 2025-09-19
readTime: "21 min read"
platform: Blog
project: InterPersona
tags:
  - XState
  - State Machine
  - React
  - useState
  - useReducer
  - Actor Model
  - 상태 관리
  - Refactoring
---

# 예측 가능한 UI를 위한 선택, XState 상태 머신 도입 후기

프론트엔드 개발을 하다 보면, 상태 관리는 언제나 마주하게 되는 고민거리입니다. 서버 상태와 전역 상태를 어떻게 다룰지, 또 상태의 범위를 어디까지로 한정해야 할지 같은 문제들은 늘 어려운 과제였습니다.

특히 컴포넌트의 복잡도가 올라가면서 다수의 상태와 비동기 로직이 얽히기 시작하면, 전체 흐름을 한눈에 파악하기 힘든 코드가 만들어지곤 합니다.

저는 최근 '녹음' 기능을 구현하며 이 복잡성을 다시 한번 체감했습니다. 이 글은 \`useState\`와 \`useEffect\`로 시작했던 코드가 어떤 문제에 부딪혔고, 상태 머신 라이브러리인 XState를 통해 그 문제를 어떻게 해결했는지에 대한 제 경험과 생각을 공유해보려고 합니다.

## 서서히 드러나는 복잡성

처음 녹음 기능을 구현할 때, 저는 React의 \`useState\`와 \`useEffect\`를 사용하는 일반적인 접근 방식을 택했습니다. 당시에는 '녹음 중', '완료' 같은 명시적인 상태(Status)를 기준으로 로직을 설계하기보다, 필요한 데이터들을 개별 \`useState\`로 두고 이를 조합해 UI를 제어하는 방식이었습니다.

처음에는 이 방식이 문제없어 보였습니다. 하지만 기능이 확장되면서 '처리 중', '업로드 중', '실패'와 같은 단계들이 추가되고, 여기에 관련된 비동기 로직(\`getUserMedia\`, \`fetch\` 등)이 얽히면서 코드는 점차 복잡해졌습니다.

\`\`\`typescript
// 수정 전 코드의 일부
const [recordingStatus, setRecordingStatus] = useState<RecordingStatusType>('idle');
const isDisabledRecord = currentRecordingAnswer?.status === 'fail';

const handleRecord = useCallback(async () => {
  // ... 수많은 try-catch와 비동기 로직
}, [recordingStatus, isDisabledRecord, ...]);

const finishRecord = useCallback(async () => {
  // ... 수많은 try-catch와 비동기 로직
}, [/* ... */]);

useEffect(() => {
  if (recordingStatus === 'finished') {
    finishRecord();
  }
  // ...
}, [recordingStatus]);

useEffect(() => {
  if (currentRecordingAnswer?.status === 'success') {
    setRecordingStatus('idle');
  }
  // ...
}, [currentRecordingAnswer]);
\`\`\`

결과적으로 \`useState\`와 여러 \`useEffect\`를 조합한 방식은 몇 가지 문제점을 드러냈습니다.

- **흩어진 로직:** 상태를 변경하는 책임이 \`handleRecord\`, \`finishRecord\` 같은 핸들러와 여러 \`useEffect\`에 흩어져 있어 전체적인 흐름을 파악하기가 어려웠습니다.
- **암시적 상태와 상태 폭발:** \`recordingStatus\`와 \`isDisabledRecord\` 같은 여러 상태(State) 값의 '조합'으로 실제 컴포넌트의 상태가 결정되었습니다. 이는 예측하지 못한 '불가능한 상태'가 발생할 여지를 남겼습니다.
- **추적의 어려움:** 사용자 인터랙션 하나가 어떤 \`useEffect\`를 연쇄적으로 실행시키는지, 그리고 그 과정에서 상태들이 어떻게 변하는지 디버깅하고 추적하는 것이 매우 까다로웠습니다.

## 대안 탐색

### 1. 커스텀 훅 (useRecord)

- **장점:** 컴포넌트를 깔끔하게 정리하고 로직을 재사용할 수 있다는 점.
- **한계:** 복잡한 로직이 컴포넌트에서 훅으로 '이사'했을 뿐, 본질적인 문제는 그대로였기 때문입니다.

### 2. useReducer

- **장점:** 상태 변경 로직이 reducer라는 한곳에 모여있어 코드의 흐름을 예측하기가 조금 더 수월.
- **한계:** \`useReducer\`는 동기적인 상태 관리에 초점이 맞춰져 있어 비동기 사이드 이펙트를 다루려면 결국 \`useEffect\`의 도움이 필요했습니다.

### 3. Redux-Saga

- **장점:** 복잡한 비동기 흐름을 거의 동기 코드처럼 관리할 수 있다는 점.
- **한계:** Redux 자체의 보일러플레이트 코드, 그리고 익숙하지 않을 수 있는 제너레이터 문법은 트레이드오프를 고민하게 만드는 지점이었습니다.

### 최종 선택: XState

XState는 \`useReducer\`처럼 상태 로직을 중앙에서 관리하면서도, Redux-Saga처럼 비동기 사이드 이펙트까지 상태 머신 안에서 선언적으로 함께 다룰 수 있었습니다.

## 상태 머신으로 생각하기

상태 머신은 시스템이 가질 수 있는 몇 가지 명확한 상태와, 상태들 사이를 오가는 전환(Transition)을 미리 설계하는 모델입니다.

가장 쉬운 예는 신호등입니다. 신호등은 '초록불', '노란불', '빨간불'이라는 정해진 상태 중 언제나 단 하나의 상태에만 존재하며, '시간 경과'라는 이벤트에 따라 다음 상태로 전환됩니다.

\`\`\`javascript
// useState: '데이터의 조합'으로 상황을 추론
function CarWithUseState() {
  const [isEngineOn, setEngineOn] = useState(false);
  const [gear, setGear] = useState('P');
  const [pedal, setPedal] = useState('released');

  const handleShift = (targetGear) => {
    if (!isEngineOn) return alert('시동을 켜주세요!');
    if (pedal !== 'brake') return alert('브레이크를 밟아야 합니다!');
    setGear(targetGear);
  };
  return (
    <button
      onClick={() => handleShift('D')}
      disabled={!isEngineOn || pedal !== 'brake' || gear === 'D'}
    >
      D로 변경
    </button>
  );
}
\`\`\`

\`\`\`javascript
// XState: '명시적인 상태'를 기준으로 상황을 판단
export const carMachine = createMachine({
  states: {
    idling: {
      on: {
        SHIFT: {
          target: 'driving',
          cond: ({ context }) => context.pedal === 'brake',
          actions: assign({ gear: ({ event }) => event.gear }),
        },
      },
    },
  },
});

function CarWithXState() {
  const [snapshot, send] = useMachine(carMachine);
  return (
    <button
      onClick={() => send({ type: 'SHIFT', gear: 'D' })}
      disabled={!snapshot.can({ type: 'SHIFT', gear: 'D' })}
    >
      D로 변경
    </button>
  );
}
\`\`\`

## 적용 과정

### Before: useState와 useEffect

리팩토링 전의 \`RecordButton.tsx\` 컴포넌트는 약 200줄이 넘는 거대한 컴포넌트였습니다.

\`\`\`typescript
// 리팩토링 전 RecordButton.tsx의 구조
export default function RecordButton() {
  const [recordingStatus, setRecordingStatus] = useState('idle');

  const handleRecord = useCallback(async () => {
    // 1~5. 모든 책임이 이 함수 안에 혼재
  }, [/* 수많은 의존성 배열 */]);

  const finishRecord = useCallback(async () => {
    // 1~5. 모든 책임이 이 함수 안에 혼재
  }, [/* 수많은 의존성 배열 */]);

  useEffect(() => { /* 녹음 상태 변경 시 */ }, [recordingStatus]);
  useEffect(() => { /* Redux 상태 변경 시 */ }, [currentRecordingAnswer]);
}
\`\`\`

### After: 명확하게 분리된 책임

#### 1. 상태 설계도, recordMachine.ts

\`\`\`typescript
export const recordMachine = setup({
  actors: {
    getMediaStreamAndConnectSourceNode: fromPromise(/* ... */),
    stopAndGetBlob: fromPromise(/* ... */),
    detectSilence: fromCallback(/* ... */),
  },
}).createMachine({
  id: 'recordButton',
  initial: 'idle',
  states: {
    ready: {
      initial: 'waitingForRecord',
      states: {
        waitingForRecord: {
          on: { RECORD: 'gettingPermission' },
        },
        gettingPermission: {
          invoke: {
            src: 'getMediaStreamAndConnectSourceNode',
            onDone: { target: 'recording' },
            onError: { target: 'waitingForRecord' },
          },
        },
        recording: { /* ... */ },
        processing: { /* ... */ },
        uploading: { /* ... */ },
      },
    },
    failure: { type: 'final' },
  },
});
\`\`\`

#### 2. 설계도를 사용하는 컴포넌트, RecordButton.tsx

\`\`\`tsx
export default function RecordButton() {
  const [snapshot, send] = useMachine(recordMachine);

  useEffect(() => {
    if (snapshot.matches({ ready: 'recording' })) {
      GTMRecordingStarted(/* ... */);
    }
  }, [snapshot]);

  useEffect(() => {
    if (snapshot.matches({ ready: 'uploading' })) {
      dispatch({ type: SEND_RECORD, payload: { /* ... */ } });
    }
  }, [snapshot, dispatch]);

  const handleRecord = () => {
    if (snapshot.matches({ ready: 'recording' })) {
      send({ type: 'STOP' });
    } else if (snapshot.can({ type: 'RECORD' })) {
      send({ type: 'RECORD' });
    }
  };

  return (
    <Image
      onClick={handleRecord}
      className={clsx(
        snapshot.matches({ ready: 'recording' }) && styles.recording
      )}
    />
  );
}
\`\`\`

## 고려할 점: 렌더링 환경 의존성 관리

XState 자체는 순수 JavaScript 라이브러리지만, \`window.AudioContext\`나 \`navigator.mediaDevices\`처럼 브라우저에만 존재하는 API를 사용했습니다. SSR 환경에서 에러를 방지하기 위해 \`useEffect\` 안에서 머신에 첫 이벤트를 보내는 방식을 사용했습니다.

\`\`\`tsx
function RecordButton() {
  const [snapshot, send] = useMachine(recordMachine);
  useEffect(() => {
    send({ type: 'SETUP' });
  }, [send]);
}
\`\`\`

## 장단점 및 회고

### 장점 👍

- **명확한 흐름:** 상태 전환이 다이어그램처럼 명시적으로 정의
- **예측 가능성 및 안정성:** '불가능한 상태'가 원천적으로 방지
- **테스트 용이성:** 상태 머신 로직 자체를 UI 없이 독립적으로 테스트 가능
- **유지보수 용이성:** 상태 머신 설계도만 수정하면 됨
- **경쟁 상태(Race Condition) 방지:** 특정 상태에서 단 하나의 비동기 작업만 실행되도록 보장

### 단점 👎

- **러닝 커브:** 상태 머신 개념과 XState API에 대한 초기 학습 필요
- **초기 설정 비용:** 간단한 컴포넌트에는 보일러플레이트가 다소 많을 수 있음

## 결론은 상황에 맞는 도구의 선택

이번 녹음 기능 리팩토링에서 XState는 복잡하게 얽힌 상태와 비동기 로직을 명확한 '흐름'으로 만들어준 훌륭한 해결책이었습니다. 하지만 모든 상황에 XState가 정답은 아닙니다. 단순한 상태를 가진 컴포넌트에는 \`useState\`, \`useReducer\`나 커스텀 훅으로도 충분합니다.

결국 가장 중요한 것은 기술 그 자체가 아니라, 마주한 도메인이나 문제의 복잡성을 정확히 진단하고 그에 맞는 적절한 도구를 선택하는 능력이 아닐까 싶습니다. 그런 의미에서 XState는 제 도구함에 추가된, 복잡한 UI 문제를 해결할 아주 강력한 선택지입니다.

### 참고자료

- [상태 기계 (State machine) - MDN Web Docs](https://developer.mozilla.org/ko/docs/Glossary/State_machine)
- [XState | Stately](https://stately.ai/docs/xstate)
- [Finite state machine & statecharts - XState | 화해 블로그](https://blog.hwahae.co.kr/)
- [자바스크립트로 만든 유한 상태 기계 XState | 카카오엔터테인먼트 테크블로그](https://tech.kakaoent.com/)
