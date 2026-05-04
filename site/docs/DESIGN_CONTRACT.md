# Design Contract

이 문서는 `../../../blog-design` fixture를 실제 사이트 구현 기준으로 번역하는 자리다. 아직 확정되지 않은 값은 앱 코드에 hard-code하지 않는다.

## Source Priority

1. `../../../blog-design/Blog v2.html`
2. `../../../blog-design/System.html`
3. `../../../blog-design/screenshots/`
4. `../../../blog-design/Blog.html`

`Blog v2.html`과 `System.html`이 충돌하면 구현 전에 이 문서에서 선택을 기록한다.

## To Decide Before Scaffold

- framework와 routing 방식
- typography token
- color token
- article row와 thumbnail variant
- post detail prose width와 mobile exception
- code/table overflow 처리
- Note/About 화면의 실제 데이터 source

## Non Goals

- 디자인 fixture의 임시 tweak를 그대로 런타임 계약으로 가져오지 않는다.
- editorial voice나 글쓰기 workflow를 디자인 규칙으로 바꾸지 않는다.
- 사이트 미감을 맞추기 위해 원고 구조를 임의 HTML 중심으로 바꾸지 않는다.
