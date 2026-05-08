---
title: "자연스러운 사용자 경험을 제공하기 위한 인터뷰 프로세스의 예외처리 전략"
author: "myeongyeon ham"
date: 2025-02-19
readTime: "12 min read"
platform: Blog
topic: "Error Handling"
project: InterPersona
cover: /images/posts/2025-02-19-interpersona-error-handling-strategy/01-retry-cancel-ui.png
tags:
  - Error Handling
  - UX
  - Redux-Saga
  - Jest
  - MSW
  - Web Audio API
---

# 자연스러운 사용자 경험을 제공하기 위한 인터뷰 프로세스의 예외처리 전략

## 인터뷰 프로세스의 복잡성

InterPersona 프로젝트를 개발하면서 가장 중요하게 생각한 부분은 사용자가 실제 면접과 같은 자연스러운 경험을 할 수 있도록 하는 것이었습니다. 특히 음성 녹음을 통한 답변 과정에서는 여러 기술적인 단계가 필요했고, 각 단계에서 발생할 수 있는 예외 상황들을 어떻게 하면 자연스럽게 처리할 수 있을지 고민했습니다.

예를 들어, 마이크 권한이 없거나 장치 연결에 문제가 있을 수 있고, 네트워크 지연으로 음성 인식이 실패할 수 있으며, AI 서버의 문제로 응답이 지연되는 등 다양한 문제들이 발생했을 때 단순히 에러 메시지를 보여주는 것은 면접 흐름을 이어가지 못하고 불편한 경험을 줄 수 있다고 생각했습니다.

인터뷰 과정은 다음과 같은 여러 단계로 이루어져 있습니다:

1. 사용자 음성 녹음
2. 녹음 파일 생성
3. STT(Speech-to-Text) 변환
4. AI 답변 생성 요청
5. AI 답변 응답 및 표시

각 단계는 실패할 수 있는 가능성을 가지고 있어 단순히 에러 메시지만 표시하는 것이 아니라, 각 상황에 맞는 적절한 예외 처리 전략을 세웠습니다.

## 예외 처리 전략

### 1. 녹음 과정 에러 처리

녹음 프로세스도 여러 단계로 이루어져 있습니다. 미디어 스트림 획득, 오디오 소스 변환, 음량 감지 등 여러 복잡한 단계로 구성되어 있어 각 단계별 체계적인 에러 처리가 필요했습니다. 특히 각 에러 상황에 따라 사용자가 취해야 할 행동이 다르기 때문에, 상황별로 명확한 가이드를 제공하는 것이 중요했습니다.

```typescript
const ERROR_MAPPINGS: Record<RecordErrorType, Omit<RecordErrorDetail, 'type'>> = {
  [RecordErrorType.PERMISSION_DENIED]: {
    title: "Permission Denied",
    message: "마이크 사용 권한이 필요합니다. 설정 페이지 주소를 복사하시겠어요?",
    manage: 'confirmDialog',
    callback: getMicrophonePermissionSetting
  },
  [RecordErrorType.PERMISSION_BLOCKED]: {
    title: "Permission Blocked",
    message: "마이크 권한이 차단되어 있습니다. 브라우저 설정에서 차단을 해제해주세요.",
    manage: 'alertDialog'
  },
  [RecordErrorType.DEVICE_NOT_FOUND]: {
    title: "Device Not Found",
    message: "마이크를 찾을 수 없습니다. 마이크가 정상적으로 연결되어 있는지 확인해주세요.",
    manage: 'alertDialog'
  },
  [RecordErrorType.DEVICE_IN_USE]: {
    title: "Device In Use",
    message: "마이크가 다른 앱에서 사용 중입니다. 다른 앱을 종료하고 다시 시도해주세요.",
    manage: 'alertDialog'
  },
  [RecordErrorType.DEVICE_NOT_READABLE]: {
    title: "Device Not Readable",
    message: "마이크에서 입력을 받을 수 없습니다. 장치를 확인해주세요.",
    manage: 'alertDialog'
  },
  // ...
};
```

그리고 각 에러 상황별로 적절한 UI를 선택하여 사용자에게 전달하고, 필요한 경우 문제 해결을 위한 추가 액션(callback)을 제공했습니다.

```typescript
} catch (error) {
  if (error instanceof RecordError) {
    handleRecordError(error);
    return;
  }
  // ...
}

// ...
export const handleRecordError = (error: RecordError) => {
  const { manage, title, message, callback } = error.detail;
  switch (manage) {
    case "alertDialog":
      useAlertDialogStore.getState().setAlert(title, message);
      break;
    case "confirmDialog":
      useConfirmDialogStore.getState().setConfirm(title, message, () => {
        if (callback) callback();
      });
      break;
    case "toast":
      useToastStore.getState().addToast({
        title,
        description: message,
        duration: 3000,
      });
      break;
    default:
      useToastStore.getState().addToast({
        title: "알 수 없는 오류",
        description: "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.",
        duration: 3000,
      });
  }
};
```

특히 녹음 시 마이크 권한이 없을 경우, 메시지 표시보다 권한을 설정할 수 있는 추가 액션을 제공해 실제 문제 해결이 가능하도록 구현했습니다.

```typescript
const getMicrophonePermissionSetting = async () => {
  const isChrome = /chrome/i.test(navigator.userAgent) && !/edg/i.test(navigator.userAgent);
  const isFirefox = /firefox/i.test(navigator.userAgent);

  // ...

  let url = '';
  if (isChrome) {
    url = 'chrome://settings/content/microphone';
  } else if (isFirefox) {
    url = 'about:preferences#privacy';
  }

  // ...

  window?.navigator?.clipboard?.writeText(url)
    .then(() => {
      useToastStore.getState().addToast({
        title: "클립 보드 복사",
        description: "클립 보드에 복사되었습니다. 설정 페이지에서 마이크 접근 권한을 허용해주세요.",
        duration: 3000,
      });
    });
};
```

### 2. STT 변환 실패 시 자동 재시도

음성 인식이 실패하는 경우는 다양한 이유로 발생할 수 있습니다. 네트워크 문제일 수도 있고, 음성이 너무 작거나 노이즈가 많을 수도 있습니다. 이런 경우 바로 에러를 표시하는 대신, 자동으로 재시도하는 전략을 구현했습니다.

```typescript
export function* speechToTextSaga(action: SendRecordAction): Generator<any, void, any> {
  try {
    // ... 중략 ...

    if (data.text === '' && trySpeechCount < 3) {
      useToastStore
        .getState()
        .addToast(STT_ERROR_TOAST);
      yield put(removeContent());
      yield put(increaseTrySpeechCount());
      return;
    }

    // ... 중략 ...
  } catch (err) {
    useToastStore
      .getState()
      .addToast(STT_NETWORK_ERROR_TOAST);
    yield put(removeContent());
  }
}
```

이 구현의 핵심은 다음과 같습니다:

- 최대 3번까지 자동 재시도
- 각 시도마다 사용자에게 알림 표시
- 실패 횟수 카운트 관리

### 3. AI 응답 생성 실패 시 대체 옵션 제공

AI 응답 생성이 실패하는 경우, 단순히 에러 메시지를 전달하는 것보다 답변 재녹음과 기존 메시지 재전송이라는 선택지를 제안하는 것이 인터뷰의 흐름을 자연스럽게 이어갈 수 있다고 생각했습니다.

에러 상황에서 사용자에게 "다시 시도하기"와 "취소하기" 두 가지 옵션을 통해 답변 재녹음과 기존 메시지 재전송이라는 선택지를 제시하고 자연스러운 흐름을 유도하려고 했습니다.

![AI 응답 생성 실패 시 다시 시도하기와 취소하기를 보여주는 UI](/images/posts/2025-02-19-interpersona-error-handling-strategy/01-retry-cancel-ui.png)

```tsx
// ChatArticle.RetryCancelSelector
function ChatRetryCancelSelector() {
  const { status, content } = useContext(ChatArticleContext);
  const dispatch = useDispatch();

  if (status !== ChatContentStatusType.fail) return null;

  const handleRetry = () => {
    dispatch({
      type: RETRY_ANSWER,
      payload: {
        content: content as unknown as string,
      },
    });
  };

  const handleCancel = () => {
    dispatch({
      type: CANCEL_CURRENT_REQUEST_ANSWER,
    });
  };

  return (
    <div className={styles.retryCancelSelector}>
      <Button size="sm" variant="secondary" onClick={handleRetry}>
        다시 시도하기
      </Button>
      <Button size="sm" variant="outline" onClick={handleCancel}>
        취소하기
      </Button>
    </div>
  );
}
```

## 테스트를 통한 안정성 확보

예외 처리 전략의 안정성을 확보하기 위해 Jest와 MSW를 활용한 테스트를 구현했습니다.

아래 코드는 STT 변환 실패 시 3회까지 재시도를 허용하고 이후에는 에러 메시지를 보여주는 대표적인 테스트입니다.

```typescript
// redux/chat/saga.spec.ts
it('재요청 3회 이후에는 새로고침 토스트 메시지를 표시한다.', async () => {
  const setAddToastSpy = jest.spyOn(useToastStore.getState(), 'addToast');
  let attemptCount = 3;

  server.use(
    http.post('/api/interview', async ({ request }) => {
      return Response.json({ text: '' });
    })
  );

  const dispatched: any[] = [];
  const action = {
    type: SEND_RECORD,
    payload: {
      id: BigInt(1),
      formData: new FormData()
    }
  };

  for (let i = 0; i < 3; i++) {
    await runSaga({
      dispatch: (action) => dispatched.push(action),
      getState: () => ({ chat: { interviewId: 1, trySpeechCount: 0 } })
    }, speechToTextSaga, action).toPromise();

    expect(dispatched[i * 3]).toEqual(
      triggerContent({ speaker: ChatContentSpeakerType.user }),
    );
    expect(dispatched[i * 3 + 1]).toEqual(
      removeContent()
    );
    expect(dispatched[i * 3 + 2]).toEqual(
      increaseTrySpeechCount()
    );
    expect(setAddToastSpy).toHaveBeenCalledWith(STT_ERROR_TOAST);
    attemptCount++;
  }

  await runSaga({
    dispatch: (action) => dispatched.push(action),
    getState: () => ({ chat: { interviewId: 1, trySpeechCount: attemptCount } })
  }, speechToTextSaga, action).toPromise();

  expect(setAddToastSpy).toHaveBeenCalledWith(STT_NETWORK_ERROR_TOAST);
});
```

그리고 알 수 없는 에러 발생 시 토스트 메시지를 표시하는 에러 처리도 테스트를 구현했습니다.

```typescript
// RecordButton.spec.tsx
it("알 수 없는 에러가 발생하면, addToast 호출한다.", async () => {
  await testSetup.setupSuccessRecordingEnvironment();
  const recorderInstance = (Recorder as unknown as jest.Mock).mock.instances[0];

  recorderInstance.stop.mockRejectedValueOnce(new Error("Unknown stop error"));

  await waitFor(() => {
    expect(recorderInstance.stop).toHaveBeenCalled();
  });

  await waitFor(() => {
    expect(addToastMock).toHaveBeenCalledTimes(1);
    expect(addToastMock).toHaveBeenCalledWith({
      title: "알 수 없는 오류",
      description: "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.",
      duration: 3000,
    });
  });
});
```

이러한 테스트들을 통해 예외 처리 로직의 안정성을 확보하고, 향후 코드 수정 시에도 기존 기능을 빠르게 확인할 수 있었습니다.

## 결론

인터뷰 프로세스에서의 예외 처리는 단순히 에러 메시지를 표시하는 것을 넘어, 사용자가 자연스럽게 면접을 이어갈 수 있도록 하는 것이 중요하다고 생각했고 구현한 전략들을 공유해 보았습니다.

이러한 전략들을 통해 문제가 발생하더라도 사용자가 끊김 없이 면접을 진행할 수 있도록 구현했습니다.
