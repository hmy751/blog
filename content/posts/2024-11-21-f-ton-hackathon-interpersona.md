---
title: "F-TON 해커톤 후기, InterPersona 프로젝트 개발기"
author: "myeongyeon ham"
date: 2024-11-21
readTime: "12 min read"
platform: Blog
tags:
  - Hackathon
  - Next.js
  - Redux-Saga
  - STT
  - Web Audio API
---

# F-TON 해커톤 후기, InterPersona 프로젝트 개발기

안녕하세요 해커톤 F-TON에 참가하여 팀 프로젝트인 InterPersona를 개발했습니다.

약 일주일 동안 진행된 해커톤에서 겪은 기술적인 도전과 해결 과정을 공유하고자 합니다.

## 프로젝트 소개: InterPersona

InterPersona는 개발자들이 이직 준비나 현업에서 면접 연습을 효율적으로 할 수 있도록 돕는 웹 애플리케이션입니다. ChatGPT의 프롬프트를 활용하여 가상의 면접관과 모의 면접을 진행하고, 결과를 점수로 평가받을 수 있습니다. 특히, 면접관의 스타일을 선택하고 실제 면접처럼 음성으로 질문과 답변을 주고받을 수 있는 것이 특징입니다.

## 내가 구현한 기능들

### 실제 면접처럼 음성으로 전달하기

텍스트 기반의 채팅 대신 사용자의 음성을 녹음하고, 이를 텍스트로 변환하여 프롬프트에 전달하는 기능을 구현했습니다. 이를 통해 실제 면접 상황과 유사한 환경에서 연습할 수 있습니다.

### 프롬프트 대화 구현하기

녹음된 음성을 STT(Speech-To-Text)로 변환한 후, 프롬프트와의 대화를 자연스럽게 이어나갈 수 있도록 구현했습니다. 면접관의 질문에 대한 답변하고, 그에 따른 피드백을 실시간으로 받을 수 있습니다.

## 구현 과정에서의 어려움과 해결 방법

### STT API 요청, CORS 에러 발생

프로젝트의 서버 작업 리소스를 고려하여 STT 기능을 클라이언트에서 개발하기로 결정했습니다.

하지만 네이버 STT API를 클라이언트 측에서 직접 호출하려니 CORS 에러가 발생했습니다. 공식 문서에는 서버에서의 요청을 가정하고 있어 클라이언트 요청 시 문제가 생겼습니다.

Next.js의 Route Handler를 이용하여 서버 측에서 STT API를 호출하도록 수정했습니다. 이를 통해 클라이언트와 STT API 사이의 CORS 문제를 해결할 수 있었습니다.

```typescript
// app/api/chat/route.ts

const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET as string;
const INVOKE_URL = process.env.NEXT_PUBLIC_INVOKE_URL as string;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const response = await fetch(`${INVOKE_URL}/recognizer/upload`, {
      method: "POST",
      headers: {
        "X-CLOVASPEECH-API-KEY": CLIENT_SECRET,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("STT API request failed");
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
  }
}
```

### 음성 녹음, 파일 포맷 에러

MediaRecorder API를 사용하여 음성을 녹음하고 `audio/wav` 형식으로 저장했지만, STT API에서 지원하지 않는 파일 형식이라는 에러가 발생했습니다.

```javascript
const handleRecord = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorder.start();
    // ...
  }
};

const handleFinishRecord = () => {
  if (mediaRecorderRef.current === null) return;
  mediaRecorderRef.current.onstop = () => {
    const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
    const audioFile = new File([audioBlob], "recording.wav", {
      type: "audio/wav",
    });
    // ...
  };
};
```

생성된 파일을 콘솔에 출력할 때도 `audio/wav` 타입을 출력했고, 실제 파일 재생도 정상적으로 이루어졌습니다.

확인해보니 콘솔에 표시된 타입은 개발자가 명시한 값일 뿐이었습니다. MediaRecorder API는 장치에 접근하는게 주 목적으로, `audio/webm` 형식만 지원하여 파일 재생은 가능했지만 실제 형식은 `audio/webm`이었습니다.

> 참고: [MediaStream Recording API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API)

에러를 해결하기 위해서는 오디오 데이터 처리에 적합한 AudioContext API가 필요했으며, 파일 데이터의 비트 단위로 접근하여 헤더 정보를 wav 형식으로 지정하는 과정이 필요했습니다.

해당 로직은 직접 구현하기 어렵다고 판단하여 이를 지원하는 라이브러리 [Recorder.js](https://github.com/mattdiamond/Recorderjs)를 활용하여 해결했습니다.

> 참고: [Recorderjs/src/recorder.js](https://github.com/mattdiamond/Recorderjs/blob/master/src/recorder.js)

해결된 코드는 아래와 같습니다.

```javascript
const handleRecord = async () => {
  // ...

  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

  const audioContext = new window.AudioContext();
  const analyserNode = audioContext.createAnalyser();
  analyserNode.fftSize = 2048;
  const dataArray = new Uint8Array(analyserNode.fftSize);

  const recorder = new Recorder(audioContext);
  recorderRef.current = recorder;

  await recorderRef.current.init(stream);

  recorderRef.current.start().then(() => setIsRecording("recording"));

  const source = audioContext.createMediaStreamSource(stream);
  source.connect(analyserNode);

  // ...
};

const finishRecord = async () => {
  // ...

  const { blob } = await recorderRef.current.stop();
  const audioFile = new File([blob], "recording.wav", { type: "audio/wav" });

  // ...
};
```

### Redux-Saga를 활용한 프롬프트 대화 상태 관리

음성 녹음, STT 변환, 프롬프트 응답 등 여러 비동기 작업이 연속적으로 이루어져 상태 관리가 복잡했습니다.

프롬프트 대화 과정은 음성 녹음, STT 변환, 프롬프트 응답 등 여러 비동기 작업이 연속적으로 처리되어야 하며, 이를 예측 가능하게 제어하는게 중요하다고 생각했습니다.

그래서 Redux-Saga가 적합하다고 판단하여 이를 적용했습니다.

면접을 주고받는 과정은 다음과 같습니다.

1. 사용자가 면접관 질문에 대한 답변을 녹음한다.
2. 사용자 말풍선을 생성하고, STT API 요청 전에 로딩 상태를 표시하기 위해 딜레이를 준다.
3. STT API에 녹음 파일을 전송하여 텍스트로 변환한다.
4. 변환된 텍스트를 UI에 표시한다.
5. 변환된 텍스트를 기반으로 프롬프트 대화를 요청한다.
6. 면접관 말풍선을 생성하고, 프롬프트 답변 API 요청 전에 로딩 상태를 표시하기 위해 딜레이를 준다.
7. 프롬프트 답변 API를 요청한다.
8. 프롬프트에서 응답받은 면접관의 답변을 UI에 표시한다.

```typescript
// 1. 음성 녹음 액션을 감지하여 Saga 실행
export function* watchRecord() {
  yield takeLatest(SEND_RECORD, speechToTextSaga); // --- 1
}

function* speechToTextSaga(action: SendRecordAction) {
  try {
    // 이 딜레이는 takeLatest와 조합하여 중복 요청 오류를 방지하기 위해 설정
    yield call(delay, 200);

    // --- 2: 사용자 말풍선 생성
    yield put(triggerChat({ speaker: "user" }));

    // --- 2: STT API 요청 전 추가 딜레이로 말풍선의 로딩 상태 유지
    yield call(delay, 500);

    // --- 3: STT API 요청하여 음성을 텍스트로 변환
    const data: SpeechToTextData = yield call(fetchSpeechToText, {
      formData: action.payload.formData,
    });

    if (data.text) {
      // --- 4: 변환된 텍스트를 UI에 표시
      yield put(updateContent({ content: data.text }));

      // --- 5: 변환된 텍스트로 프롬프트 대화 요청
      yield* requestInterviewSaga({
        type: REQUEST_INTERVIEW,
        payload: { content: data.text },
      });
    } else {
      yield put(removeContent());
    }
  } catch (err) {
    yield put(removeContent());
  }
}

// 5. 프롬프트 대화 요청 액션을 감지하여 Saga 실행
export function* watchStartChat() {
  yield takeLatest(START_CHAT, requestInterviewSaga); // --- 5
}

function* requestInterviewSaga(action: RequestInterviewAction) {
  try {
    // 이 딜레이는 takeLatest와 조합하여 중복 요청 오류를 방지하기 위해 설정
    yield call(delay, 200);

    if (action.type === START_CHAT) {
      yield put(startChat({ id: action.payload.chatId }));
    }
    const chatId = yield select(selectChatState);

    // --- 6: 면접관 말풍선 생성
    yield put(triggerChat({ speaker: "bot" }));

    // --- 6: 프롬프트 답변 API 요청 전 추가 딜레이로 말풍선의 로딩 상태 유지
    yield call(delay, 500);

    // --- 7: 프롬프트 답변 API 요청
    const data: AIChatData = yield call(fetchAIChat, {
      chatId,
      content: action.payload.content,
    });

    if (data.content) {
      // --- 8: 면접관의 답변을 UI에 표시
      yield put(updateContent({ content: data.content }));
    } else {
      yield put(removeContent());
    }
  } catch (err) {
    yield put(removeContent());
  }
}
```

## 마치며

약 일주일 동안 해커톤을 진행하면서 짧은 시간 내에 구현하려다 보니 부족한 부분이 많았지만 여러 문제를 해결하면서 많이 배울 수 있는 기회였던 것 같습니다.

많은 기능은 구현할 수 없어 프롬프트 대화 과정을 최대한 자연스럽게 만들어 기본적인 사용자 경험을 향상시키는 데 집중했습니다.

개발하면서 느낀 점은, 오디오를 다루는 데 예상치 못한 이슈가 있어 어려움이 있었습니다.

또한 Redux-Saga를 활용하면서 흐름을 명확히 제어할 수 있다는 장점은 있었지만, 코드량이 많아지고 문법을 익히는 데 러닝 커브가 있었습니다. 특별한 경우가 아니라면 다른 라이브러리를 사용하는 것이 더 나을 수 있다는 생각이 들었습니다.

추후에 에러 및 예외 처리 케이스에 대한 리팩토링 내용을 포스팅하겠습니다.
