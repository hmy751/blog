---
title: "Markdown renderer fixture"
date: 2026-05-04
author: "myeongyeon ham"
readTime: "7 min read"
platform: Blog
tags:
  - Design System
  - Markdown
description: "상세 글 페이지에서 지원해야 하는 Markdown 요소를 한 번에 확인하기 위한 fixture."
featured: false
---

# Markdown renderer fixture

좋은 컴포넌트는 자기가 무엇인지 떠들지 않는다. 사용하는 쪽에서 필요한 만큼만 보이고, 나머지는 조용히 자기 자리에 머문다.

프론트엔드에서 컴포넌트를 만든다는 건 결국 *경계*를 긋는 일이다. 좋은 경계는 쓰는 사람을 **자유롭게 만들고**, 나쁜 경계는 점점 더 많은 `prop`을 요구한다.[^surface]

> [!NOTE]
> 한 줄 요약. API의 표면적은 줄이고, 사용자의 결정 공간은 늘린다.
>
> 이 callout은 `.callout`으로 렌더링되어야 한다.

## 1. API의 표면적

"이 컴포넌트가 받는 prop이 몇 개인가"보다 중요한 건 "그 prop들이 서로 독립적인가"이다.

### 코드 파일명

```tsx title="components/Button.tsx"
type ButtonProps = {
  tone?: "neutral" | "accent" | "danger";
  children: ReactNode;
};

export function Button({ tone = "neutral", children }: ButtonProps) {
  return <button data-tone={tone}>{children}</button>;
}
```

`children`으로 받게 두면 사용자가 더 많은 자유를 얻는다. 단축키 표기는 <kbd>Command</kbd>+<kbd>K</kbd>처럼 렌더링한다.

## 2. 리스트

- 의도가 분명한 prop 이름
- 합리적인 기본값
  - 기본값이 곧 가장 자주 쓰는 형태
  - 기본값을 바꾸지 않아도 대부분의 케이스가 해결
- 관련된 prop은 객체로 묶기보다 구조를 재설계

1. 이 컴포넌트가 무엇을 책임지는지 한 문장으로 적는다.
2. 그 문장에 들어가지 않는 prop을 후보로 둔다.
3. 후보 prop을 합치거나, 떼어내거나, 사용자에게 돌려준다.

- [x] 기본값으로 합리적인 결과가 나오는가
- [x] prop 이름이 구현이 아닌 의도를 가리키는가
- [ ] 두 prop이 서로의 존재에 의존하지 않는가

## 3. 표

| 관점 | Props 중심 | Slot 중심 |
| --- | --- | --- |
| 러닝 커브 | 낮다 | 중간 |
| 장기 변경 비용 | 높다 | 낮다 |
| 커스텀 가능성 | 제한적 | 거의 무제한 |
| 잘못된 조합 방지 | 강함 | 사용자 책임 |

## 4. 인라인 요소

본문에는 `inline code`, **strong**, *emphasis*, [link](https://example.com), ==mark== 같은 인라인 요소가 자연스럽게 섞일 수 있다.

> [!WARNING]
> children으로 모든 걸 받는 컴포넌트는 자유로운 만큼 일관성이 깨지기 쉽다.

## 5. 이미지와 캡션

![component anatomy diagram](/design-system/fixtures/component-anatomy-placeholder.svg)

그림 1. 컴포넌트의 외부 인터페이스와 내부 책임의 경계.

---

2026년 5월. 이 fixture는 디자인 시스템과 Markdown renderer가 같은 방향을 보고 있는지 확인하기 위한 문서다.

[^surface]: 일반적으로 prop 수가 늘어나면 책임이 둘 이상 섞여 있을 가능성이 높다. 무조건적인 규칙은 아니다.
