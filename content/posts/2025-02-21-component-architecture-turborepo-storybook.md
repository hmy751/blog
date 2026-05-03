---
title: "컴포넌트 아키텍처 설계: Turborepo와 Storybook 활용기"
author: "myeongyeon ham"
date: 2025-02-21
readTime: "10 min read"
platform: Blog
project: InterPersona
tags:
  - Component Architecture
  - Turborepo
  - Storybook
  - Compound Component Pattern
  - Monorepo
  - React
---

# 컴포넌트 아키텍처 설계: Turborepo와 Storybook 활용기

Inter persona 프로젝트를 개선하면서 컴포넌트 아키텍처에 관한 고민과 경험을 나눠 보려고합니다.

프론트엔드 개발에서 중요한 부분중 하나는 컴포넌트를 구성하고 관리하는 방법이라고 생각합니다. 이유는 확장이 가능하고 재사용성이 높은 컴포넌트를 설계하면, 추후에 UI변경에 유연하게 대응하면서 또 코드의 재사용성을 높여 유지보수성을 높일수 있기 때문이라 생각합니다.

그래서 적용한 컴포넌트 아키텍처 구조 및 관리 전략은 아래와 같습니다:

- Turborepo를 활용한 모노레포 기반 패키지 분리
- 합성 컴포넌트 활용으로 재사용성 확보
- Storybook을 활용한 컴포넌트 문서화

## 모노레포 기반의 패키지 분리

### 공통 컴포넌트 패키지

현재 프로젝트는 Turborepo에 기반한 모노레포 구조로, 컴포넌트를 공통 요소와 앱 요소로 나누어 구성했습니다.

공통 컴포넌트의 경우 가장 기본이 되는 요소들로 디자인시스템에서 atom요소처럼, 첫 단계의 컴포넌트 역할을 하는 컴포넌트로 나누어 개발했습니다.

```
root/
├── apps/
│   └── frontend/
│       └── src/
│           ├── _components/      # 앱 전용 컴포넌트
│           │   ├── layout/       # 레이아웃 컴포넌트
│           │   └── pages/        # 페이지별 컴포넌트
│           └── _storybook/       # 앱 전용 컴포넌트 스토리북
└── packages/
    └── ui/                       # 공통 UI 컴포넌트
        └── src/
            ├── Button/           # 기본 버튼 컴포넌트
            │   ├── Button.tsx
            │   └── Button.stories.tsx
            ├── Dialog/           # 다이얼로그 컴포넌트
            │   ├── Dialog.tsx
            │   └── Dialog.stories.tsx
            └── style/            # 글로벌 테마 관리
                └── theme.ts
```

이러한 구조는 다음과 같은 이점이 있습니다.

- 공통 컴포넌트의 독립적인 관리
- 명확한 의존성 구조
- 패키지 단위의 버전 관리

### config 패키지

컴포넌트 뿐만 아니라 컴포넌트 관리에 필요한 Storybook 설정도 패키지를 분리하여 공통되는 설정을 패키지로 분리하여 구성했습니다.

```
root/
├── apps/
│   └── frontend/
│       └── .storybook/          # 앱 전용 Storybook 설정
│           ├── main.ts
│           └── preview.ts
├── packages/
    ├── ui/
    │   └── .storybook/         # UI 패키지 Storybook 설정
    │       ├── main.ts
    │       └── preview.ts
    └── storybook-config/       # Storybook 공통 설정
        ├── src/
        │   └── preset.ts
        └── package.json
```

## 합성 컴포넌트 패턴의 효과적인 활용

합성 컴포넌트 패턴은 다른 블로그 포스팅에서도 많이 언급되는 패턴으로, 단일 컴포넌트를 여러 개의 작은 컴포넌트로 분리하고 이를 사용측에서 자유롭게 조합하여 활용하는 패턴입니다. 특징은 재사용성은 높이고 또 디자인 변경에 유연하게 대응할 수 있다는 특징이 있습니다.

> 참고: [합성 컴포넌트로 재사용성 극대화하기 | 카카오엔터테인먼트 FE 기술블로그](https://fe-developers.kakaoent.com/2022/220731-composition-component/)

회사 프로젝트에서도 합성 패턴을 활용해서 재사용성과 확장성을 개선한 경험을 했고, 적합한 패턴이라고 생각해 이번 프로젝트 개선작업에도 활용했습니다.

### Dialog 컴포넌트 구현 예시

아래는 합성 패턴을 활용해서 구현한 Dialog 컴포넌트 코드 입니다. Dialog의 UI요소들을 속성으로 분리하여 사용하려는 UI에서 조합할 수 있도록 구현합니다.

```tsx
export default function Dialog({
  children,
  open: controlledOpen,
  onOpenChange,
}: DialogProps): ReactElement {
  // ...
  return (
    <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
  );
}

Dialog.Trigger = ({ children }: { children: ReactNode }) => {
  // ...
  return <div onClick={() => setOpen(true)}>{children}</div>;
};

Dialog.Content = ({ children }: { children: ReactNode }) => {
  // ...
  return createPortal(
    <>
      <div className={styles.overlay} onClick={() => setOpen(false)} />
      <div className={styles.content}>{children}</div>
    </>,
    document.body
  );
};

Dialog.Title = ({ children }: { children: ReactNode }) => {
  return <Text as="h2">{children}</Text>;
};

Dialog.Description = ({ children }: { children: ReactNode }) => {
  return <Text as="p">{children}</Text>;
};

Dialog.Footer = ({ children }: { children: ReactNode }) => {
  return <div className={styles.footer}>{children}</div>;
};

Dialog.Confirm = ({
  callback,
  children,
}: {
  callback: () => void;
  children: ReactNode;
}) => {
  // ...
  return (
    <Button variant="primary" fullWidth={true} onClick={handleConfirm}>
      {children}
    </Button>
  );
};

Dialog.Cancel = ({
  callback,
  children,
}: {
  callback?: () => void;
  children: ReactNode;
}) => {
  // ...
  return (
    <Button variant="outline" fullWidth={true} onClick={handleCancel}>
      {children}
    </Button>
  );
};
```

아래처럼 Dialog의 요소들을 UI디자인 필요에 맞게 합성하여 활용합니다.

```tsx
export default function AppAlertDialog() {
  const { open, setOpen, title, description, clearAlert } =
    useAlertDialogStore();

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Content>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Description>{description}</Dialog.Description>
          <Dialog.Footer>
            <Dialog.Cancel callback={clearAlert}>Ok</Dialog.Cancel>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </>
  );
}

// ...

export default function AppConfirmDialog() {
  const { open, setOpen, title, description, confirmCallback, clearConfirm } =
    useConfirmDialogStore();

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Content>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Description>{description}</Dialog.Description>
          <Dialog.Footer>
            <Dialog.Cancel callback={clearConfirm}>Cancel</Dialog.Cancel>
            <Dialog.Confirm callback={confirmCallback}>Confirm</Dialog.Confirm>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </>
  );
}
```

이러한 구현의 장점은:

- 자유롭게 조합이 가능하고, 새로운 요구사항에 따라 확장이 용이 합니다.
- 컴포넌트의 구조를 직관적으로 파악이 가능합니다.
- 각 서브 컴포넌트의 책임이 명확합니다.

## Storybook을 활용한 문서화

Storybook을 활용해 컴포넌트의 활용사례와 특징을 문서화 했습니다.

```tsx
// ChatArticle.stories.tsx

export const UserChatWithInterviewerError = {
  decorators: [
    (Story: any) => (
      <div style={{ height: "200px" }}>
        <Story />
      </div>
    ),
  ],
  render: () => {
    const { status, speaker, content } =
      mockUserChatContentWithInterviewerError;
    return (
      <ChatArticle type={speaker} status={status} content={content}>
        <ChatArticle.Speech />
        <ChatArticle.Avatar src={user?.imageSrc} />
        <ChatArticle.RetryCancelSelector />
      </ChatArticle>
    );
  },
};
```

위 코드는 ChatArticle컴포넌트의 Storybook 구현 예시입니다. 일반적인 시나리오가 아닌 특정 에러 상황에서 어떻게 UI가 보여지는지 Storybook을 통해 확인할 수 있도록 작성했습니다.

이렇게 Storybook을 활용하면 특정 상태를 직접 확인할 수 있을 뿐만 아니라, 컴포넌트의 활용이나 특징을 공유할 수 있어 협업에도 유리하다고 생각했습니다.

## 결론

지금까지 컴포넌트 아키텍처 구성을 하는 고민, 과정 그리고 활용사례들을 정리해봤습니다.

모노레포 환경으로 독립성과 확장성을 개선하고, 합성 컴포넌트 패턴으로 재사용성을 개선하면서 유지보수성을 향상 시켰습니다. 특히 복잡한 컴포넌트의 경우 Storybook을 통해 문서화와 테스트의 이점도 얻을수 있었습니다.

다만 모든 컴포넌트를 꼭 이 패턴에 적용해야 한다고 생각은 하지 않습니다. 오히려 복잡도를 높여 작은 규모의 프로젝트에서는 과도할 수 있다고 생각하고, 현재 프로젝트의 초기 단계에서는 단순하게 구조를 잡고 개발했습니다.

컴포넌트의 성격과 요구사항에 맞게 적절히 선택하는게 가장 중요하다고 생각합니다.
