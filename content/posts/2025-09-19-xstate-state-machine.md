---
title: "예측 가능한 UI를 위한 선택, XState 상태 머신 도입 후기"
author: "myeongyeon ham"
date: 2025-09-19
readTime: "21 min read"
platform: Blog
project: InterPersona
description: "useState와 useEffect로 시작했던 녹음 기능을 XState 상태 머신으로 리팩토링하며 얻은 예측 가능성과 한계를 정리합니다."
cover: /images/posts/xstate-state-machine/01-xstate.png
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

// 녹음 시작 로직
const handleRecord = useCallback(async () => {
  // ... 수많은 try-catch와 비동기 로직
}, [recordingStatus, isDisabledRecord, ...]);

const finishRecord = useCallback(async () => {
  // ... 수많은 try-catch와 비동기 로직
}, [/* ... */]);

// 녹음 완료 시 처리 로직
useEffect(() => {
  if (recordingStatus === 'finished') {
    finishRecord();
  }
  // ...
}, [recordingStatus]);

// 외부 상태 변경에 따른 UI 상태 동기화
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

복잡해지는 상태 로직을 해결하기 위해, 저는 몇 가지 대안을 순서대로 검토했습니다.

### 1. 커스텀 훅 (useRecord)

가장 먼저 떠올린 방법은 로직을 커스텀 훅으로 분리하는 것이었습니다. 녹음 관련 \`useState\`, \`useEffect\`, 핸들러 함수들을 하나의 훅으로 묶는 방식이죠.

\`\`\`javascript
// 수도 코드: useRecord.js
function useRecord() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // ... 여전히 훅 내부에서 복잡한 비동기 로직이 얽힘
  }, [isRecording]);

  // isRecording, audioFile, error 세 가지 상태의 조합을 항상 추적해야 함
  return { isRecording, audioFile, error, setIsRecording };
}
\`\`\`

- **장점:** 컴포넌트를 깔끔하게 정리하고 로직을 재사용할 수 있다는 점.
- **한계:** 복잡한 로직이 컴포넌트에서 훅으로 '이사'했을 뿐, 본질적인 문제는 그대로였기 때문입니다.

### 2. useReducer

다음으로 \`useState\`보다 복잡한 상태를 다룰 때 사용되는 \`useReducer\`를 검토했습니다.

\`\`\`jsx
// 수도 코드: useReducer 방식
// 1. Reducer는 동기적으로 상태만 변경
const reducer = (state, action) => { /* ... */ };

function RecordButton() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // 2. 비동기 로직은 결국 useEffect에서 별도로 처리해야 함
  useEffect(() => {
    if (state.status === 'initializing') {
      // ... 비동기 작업 실행 후 dispatch 호출
    }
  }, [state.status]);

  return <button onClick={() => dispatch({ type: 'RECORD_START' })}>녹음</button>;
}
\`\`\`

- **장점:** 상태 변경 로직이 reducer라는 한곳에 모여있어 코드의 흐름을 예측하기가 조금 더 수월.
- **한계:** \`useReducer\`는 동기적인 상태 관리에 초점이 맞춰져 있어 비동기 사이드 이펙트를 다루려면 결국 \`useEffect\`의 도움이 필요했습니다.

### 3. Redux-Saga

프로젝트는 이미 다른 기능에 Redux-Saga를 사용하고 있었기에, 이 역시 자연스러운 선택지 중 하나였습니다.

- **장점:** 복잡한 비동기 흐름을 거의 동기 코드처럼 관리할 수 있다는 점.
- **한계:** Redux 자체의 보일러플레이트 코드, 그리고 익숙하지 않을 수 있는 제너레이터 문법은 트레이드오프를 고민하게 만드는 지점이었습니다.

### 최종 선택: XState

이러한 고민 끝에, XState가 현재 문제에 가장 적합한 해결책이라고 판단했습니다.

XState는 \`useReducer\`처럼 상태 로직을 중앙에서 관리하면서도, Redux-Saga처럼 비동기 사이드 이펙트까지 상태 머신 안에서 선언적으로 함께 다룰 수 있었습니다. 즉, '마이크 권한 획득' 상태에 들어가면 '권한 요청' 비동기 작업을 실행하고, 그 결과에 따라 '녹음 가능' 또는 '실패' 상태로 전환된다는 모든 시나리오를 단 하나의 설계도 안에 담을 수 있다는 의미였습니다.

## 상태 머신으로 생각하기

이러한 문제들을 해결하기 위해 저는 상태 머신(State Machine) 컨셉의 라이브러리 XState를 적용했습니다.

상태 머신은 시스템이 가질 수 있는 몇 가지 명확한 상태와, 상태들 사이를 오가는 전환(Transition)을 미리 설계하는 모델입니다.

가장 쉬운 예는 신호등입니다. 신호등은 '초록불', '노란불', '빨간불'이라는 정해진 상태 중 언제나 단 하나의 상태에만 존재하며, '시간 경과'라는 이벤트에 따라 다음 상태로 전환됩니다. '초록불'인 동시에 '빨간불'일 수 없는 것처럼, 시스템이 가질 수 없는 '불가능한 상태'를 원천적으로 방지해 줍니다.

이것이 기존 React의 상태 관리 방식과 어떻게 다른지, 간단한 자동차 예시로 비교해 보겠습니다.

일반적인 React 컴포넌트는 여러 \`useState\`를 통해 State, 데이터의 모음을 관리합니다. \`isEngineOn\`, \`gear\`, \`pedal\`처럼 말이죠. 그리고 우리는 이 데이터들의 '조합'을 통해 '지금 차가 주행 가능한가?'와 같은 개념적인 상황을 추론해야 합니다.

반면, 상태 머신은 '정차 중', '주행 중'과 같은 개념적인 상태(Status) 자체를 직접 정의하고 관리합니다. \`gear\`나 \`pedal\` 같은 개별 데이터는 그 상태에 대한 부가 정보(context)가 됩니다.

이 차이가 코드에서 어떻게 드러나는지 간단한 예시로 설명드리겠습니다.

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

반면 XState는 '정차 중'(\`idling\`) 상태에서 '기어를 변경(\`SHIFT\`)'할 수 있는 조건을 설계도에 명시합니다. UI는 이 복잡한 규칙을 알 필요 없이, 그저 '지금 \`SHIFT\` 할 수 있어?'(\`snapshot.can()\`)라고 묻기만 하면 됩니다.

저는 이 접근법이야말로 여러 단계를 오가며 흐름을 예측해야 하는 녹음 기능의 복잡성을 해결할 수 있다고 판단했습니다.

## 적용 과정

이제 실제 녹음 기능의 코드가 XState를 통해 어떻게 변했는지 살펴보겠습니다.

### Before: useState와 useEffect

리팩토링 전의 \`RecordButton.tsx\` 컴포넌트는 약 200줄이 넘는 거대한 컴포넌트였습니다. 전체 코드를 다 보여드리기보다, 그 구조가 가진 문제점에 집중해 보겠습니다.

컴포넌트는 \`recordingStatus\`, \`buttonIcon\` 등 여러 \`useState\`를 통해 UI 상태를 파편적으로 관리했습니다. 핵심 로직은 \`handleRecord\`와 \`finishRecord\`라는 두 개의 거대한 \`useCallback\` 함수에 밀집되어 있었습니다. 이 함수들 안에는 마이크 권한 획득부터 에러 처리, GTM 이벤트 전송까지 모든 책임이 뒤섞여 있었습니다.

또한, 여러 \`useEffect\` 훅들이 \`recordingStatus\`의 변화나 Redux의 외부 상태 변화를 감지해 또 다른 상태를 변경하거나 함수를 호출하는 등, 서로 복잡한 의존성을 가지고 얽혀 있었습니다.

\`\`\`typescript
// 리팩토링 전 RecordButton.tsx의 구조
export default function RecordButton() {
  const [recordingStatus, setRecordingStatus] = useState('idle');
  // ... 그 외 여러 상태와 Ref들

  const handleRecord = useCallback(async () => {
    // 1. 스트림 가져오기 (try-catch)
    // 2. Analyser 생성 (try-catch)
    // 3. Recorder 초기화 및 시작 (try-catch)
    // 4. GTM 이벤트 전송
    // 5. 에러 핸들링
    // ... 모든 책임이 이 함수 안에 혼재
  }, [/* 수많은 의존성 배열 */]);

  const finishRecord = useCallback(async () => {
    // 1. 녹음 중지 및 Blob 데이터 생성
    // 2. 파일 크기 체크
    // 3. FormData 생성 및 Redux로 dispatch
    // 4. GTM 이벤트 전송
    // 5. 에러 핸들링
  }, [/* 수많은 의존성 배열 */]);

  useEffect(() => { /* 녹음 상태 변경 시 */ }, [recordingStatus]);
  useEffect(() => { /* Redux 상태 변경 시 */ }, [currentRecordingAnswer]);
  // ... 그 외 아이콘 변경, 뒷정리 등을 위한 여러 useEffect
}
\`\`\`

### After: 명확하게 분리된 책임

XState 도입의 핵심은 관심사의 분리였습니다. 복잡한 비즈니스 로직은 \`recordMachine.ts\`로, UI 렌더링은 \`RecordButton.tsx\`로 명확하게 나눴습니다.

#### 1. 상태 설계도, recordMachine.ts

먼저 녹음 기능의 모든 시나리오를 담은 상태 머신을 정의했습니다. 이 파일이 바로 녹음 기능의 '살아있는 설계도'이자 모든 로직의 Single Source of Truth가 됩니다.

여기서 액터(Actor) 모델이 빛을 발합니다. '마이크 권한 획득', '녹음 파일 변환'과 같은 비동기 작업들을 \`fromPromise\`를 사용해 각각의 액터로 정의했습니다. 그리고 각 상태(\`gettingPermission\`, \`processing\` 등)에서 \`invoke\`를 통해 해당 액터를 호출합니다.

\`\`\`typescript
export const recordMachine = setup({
  // ...
  actors: {
    // 마이크 권한 획득 로직을 '액터'로 정의
    getMediaStreamAndConnectSourceNode: fromPromise(/* ... */),
    // 녹음 중지 및 파일 변환 로직을 '액터'로 정의
    stopAndGetBlob: fromPromise(/* ... */),
    // 음성 감지 로직을 '액터'로 정의
    detectSilence: fromCallback(/* ... */),
  },
  // ...
}).createMachine({
  id: 'recordButton',
  initial: 'idle',
  states: {
    // ...
    ready: {
      initial: 'waitingForRecord',
      states: {
        waitingForRecord: {
          on: { RECORD: 'gettingPermission' },
        },
        gettingPermission: {
          // 'gettingPermission' 상태에 진입하면, getMediaStream 액터를 실행
          invoke: {
            src: 'getMediaStreamAndConnectSourceNode',
            // 성공 시 'recording' 상태로 전환
            onDone: { target: 'recording', /* ... */ },
            // 실패 시 다시 'waitingForRecord' 상태로 돌아가며 에러 기록
            onError: { target: 'waitingForRecord', /* ... */ },
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

이제 '권한을 얻는 중'에 어떤 일이 벌어지는지, 성공하면 어디로 가고 실패하면 어디로 가는지 컴포넌트 코드를 보지 않고도 이 설계도만으로 명확하게 파악할 수 있습니다.

#### 2. 설계도를 사용하는 컴포넌트, RecordButton.tsx

비즈니스 로직이 상태 머신으로 옮겨가자, 리액트 컴포넌트는 극적으로 단순해졌습니다.

컴포넌트는 더 이상 \`recordingStatus\` 같은 상태를 직접 관리하지 않습니다. \`useMachine\` 훅을 통해 상태 머신의 현재 상태(\`snapshot\`)를 구독하고, 사용자 액션이 발생하면 \`send\` 함수로 이벤트를 보낼 뿐입니다.

복잡하게 얽혀 있던 \`useEffect\`들도 GTM 이벤트 전송, 외부 스토어와의 동기화 등 훨씬 단순하고 명확한 역할만 수행하게 되었습니다.

\`\`\`tsx
// 리팩토링 후 RecordButton.tsx
export default function RecordButton() {
  // 상태 머신을 사용. 모든 복잡한 상태는 snapshot이 관리
  const [snapshot, send] = useMachine(recordMachine);

  // ... Redux selector 등 외부 상태 연결
  // GTM 이벤트 전송과 같은 부수 효과만 처리
  useEffect(() => {
    if (snapshot.matches({ ready: 'recording' })) {
      GTMRecordingStarted(/* ... */);
    }
  }, [snapshot]);

  // Redux 스토어에 녹음 파일 전달
  useEffect(() => {
    if (snapshot.matches({ ready: 'uploading' })) {
      dispatch({ type: SEND_RECORD, payload: { /* ... */ } });
    }
  }, [snapshot, dispatch]);

  // 클릭 핸들러는 단순히 이벤트를 보낼 뿐
  const handleRecord = () => {
    if (snapshot.matches({ ready: 'recording' })) {
      send({ type: 'STOP' });
    } else if (snapshot.can({ type: 'RECORD' })) {
      send({ type: 'RECORD' });
    }
  };

  // UI 렌더링은 현재 상태(snapshot)를 확인하여 결정
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

이제 \`RecordButton\` 컴포넌트는 '어떻게' 동작할지를 고민하지 않습니다. 그저 상태 머신의 '현재 상태'가 무엇인지만 보고 그에 맞는 UI를 그려주는 역할에만 충실하면 됩니다.

## 고려할 점: 렌더링 환경 의존성 관리

XState 자체는 순수 JavaScript 라이브러리지만, 그 안에서 사용하는 로직은 특정 환경에 의존적일 수 있다는 점을 고려해야 했습니다.

제 \`recordMachine\`의 경우, \`window.AudioContext\`나 \`navigator.mediaDevices\`처럼 브라우저에만 존재하는 API를 사용했습니다. 이런 코드가 서버 렌더링 과정에서 실행되면 \`window\` 객체를 찾을 수 없어 에러가 발생합니다.

이를 해결하기 위해, 저는 컴포넌트가 클라이언트에서 마운트된 후에야 브라우저 API를 사용하는 상태로 진입하도록 머신의 흐름을 설계했습니다.

\`\`\`tsx
// RecordButton.tsx
function RecordButton() {
  const [snapshot, send] = useMachine(recordMachine);

  // 클라이언트에서만 실행되는 useEffect 안에서 'SETUP' 이벤트를 보내
  // 브라우저 API를 사용하는 로직(settingUp 상태)을 안전하게 활성화합니다.
  useEffect(() => {
    send({ type: 'SETUP' });
  }, [send]);

  // ...
}
\`\`\`

위 코드처럼 \`useEffect\` 안에서 머신에 첫 이벤트를 보내면, \`window\` 객체가 보장되는 클라이언트 환경에서만 \`settingUp\` 상태와 그 이후의 로직들이 실행됩니다. SSR 시점에는 머신이 초기 상태(\`idle\`)에 머물러 에러를 방지하는 효과적인 방법이었습니다.

## 장단점 및 회고

XState를 도입하며 제가 느낀 장단점은 명확했습니다.

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

이전부터 XState에 대해 알고 있었고 적용해보고 싶다는 생각이 있었는데, 마침 적용할 기회가 생겨 그 경험을 포스팅으로 정리하게 되었습니다.

이번 녹음 기능 리팩토링에서 XState는 복잡하게 얽힌 상태와 비동기 로직을 명확한 '흐름'으로 만들어준 훌륭한 해결책이었습니다. 하지만 이 경험을 통해 모든 상황에 XState가 정답은 아니라는 생각도 분명해졌습니다. 단순한 상태를 가진 컴포넌트에 상태 머신을 도입하는 것은 러닝 커브와 보일러플레이트를 고려했을 때 과한 투자일 수 있습니다. 대부분의 경우, React의 \`useState\`, \`useReducer\`나 커스텀 훅으로도 충분히 좋은 코드를 작성할 수 있습니다.

만약 사용하게 된다면 당장 생각나는 도메인은 장바구니나 폼 상태와 같이 흐름이 있는 경우 유용하겠지만, 많은 상황에서는 다소 과한 스펙일 수 있다는 생각이 들었습니다.

결국 가장 중요한 것은 기술 그 자체가 아니라, 마주한 도메인이나 문제의 복잡성을 정확히 진단하고 그에 맞는 적절한 도구를 선택하는 능력이 아닐까 싶습니다. 그런 의미에서 XState는 제 도구함에 추가된, 복잡한 UI 문제를 해결할 아주 강력한 선택지입니다.

### 참고자료

- [상태 기계 (State machine) - MDN Web Docs](https://developer.mozilla.org/ko/docs/Glossary/State_machine)
- [XState | Stately](https://stately.ai/docs/xstate)
- [Finite state machine & statecharts - XState | 화해 블로그](https://blog.hwahae.co.kr/all/tech/6707)
- [자바스크립트로 만든 유한 상태 기계 XState | 카카오엔터테인먼트 테크블로그](https://tech.kakaoent.com/front-end/2022/220922-make-cart-with-xstate/)
