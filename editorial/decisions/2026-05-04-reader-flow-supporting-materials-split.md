# Reader Flow와 Supporting Materials 분리

작성일: 2026-05-04
상태: accepted

## 배경

`reader-flow-lens.md`는 좋은 기술 글처럼 읽히는 감각을 잡기 위해 만들어졌다. 첫 화면의 밀도, 문단 호흡, 표현 리듬, 스캔 경로, 정보 배치, 판단 흐름을 함께 보려는 의도였다.

하지만 적용 과정에서 표, 코드, 이미지, 도식, 그래프, 스크린샷 같은 자료 장치 기준까지 같은 문서 안에 들어오면서 문서가 비대해졌다. 그 결과 `reader-flow`가 "좋은 글처럼 읽히는가"를 보는 렌즈라기보다 "어떤 표나 도식을 넣을까"를 묻는 체크리스트처럼 해석될 위험이 생겼다.

## 기존 하네스가 놓친 문제

- Reader Flow 본체와 자료 장치 사용 기준이 한 문서에 섞여 있었다.
- 가독성/읽힘 점검이 자료 장치 추가 판단으로 너무 빨리 이동할 수 있었다.
- 문서가 길어지면서 실제 적용 시 가장 작은 edit move보다 진단 항목을 채우는 방향으로 흐를 수 있었다.
- `Material -> Shaping -> Texture -> Prepublish` 구조 안에서 Reader Flow는 shaping/texture 보조 렌즈인데, 자료 장치 기준까지 떠안으면서 새 단계처럼 보일 여지가 있었다.

## 결정

`reader-flow-lens.md`를 Reader Flow 본체로 줄이고, 자료 장치 기준은 `supporting-materials.md`로 분리한다.

`reader-flow-lens.md`에 남기는 것:

- 좋은 글처럼 읽히는 페이지 감각
- 오프닝 약속과 독자 진입성
- 소제목과 섹션 층위
- 문단 호흡과 표현 리듬
- 정보 배치와 숫자 해석 흐름
- 가장 작은 1~3개 edit move

`supporting-materials.md`로 옮기는 것:

- 표, 리스트, 코드 예시, 의사코드, 이미지, 도식, 그래프, 스크린샷, 콜아웃 기준
- 자료 앞뒤 문장
- 숫자와 비교 자료 배치
- 후보 주석 형식
- 모바일/공개 경계
- 자료 장치가 글감이나 발견을 대체하지 않게 하는 멈춤 신호

## 적용 범위

- `reader-flow-lens.md`는 여전히 shaping/texture가 함께 참고하는 독자 흐름 렌즈다.
- `supporting-materials.md`는 새 단계가 아니다. 표, 코드, 이미지, 도식, 그래프, 스크린샷 같은 자료 장치가 실제 쟁점일 때만 추가로 읽는다.
- `editorial/README.md`, `blog-write` skill, blog agents, Codex agent bridge는 이 책임 분리를 반영한다.

## 비목표

- Reader Flow를 없애거나 축소된 체크리스트로 바꾸지 않는다.
- 자료 장치를 금지하지 않는다.
- 자료 장치 판단을 모든 글 작업의 필수 단계로 추가하지 않는다.
- 특정 레퍼런스 이미지나 외부 글을 active dependency로 두지 않는다.
- 하네스 단계를 늘리거나 기존 `Material -> Shaping -> Texture -> Prepublish` 흐름을 바꾸지 않는다.

## 후속 점검

- 실제 초안 검토에서 `reader-flow-lens.md`가 먼저 읽힘 문제를 잡고, 자료 장치가 필요할 때만 `supporting-materials.md`로 넘어가는지 본다.
- Reader Flow가 다시 정보 배치나 자료 장치 쪽으로 과하게 비대해지면, 새 기준을 추가하기보다 기존 문서의 책임 경계를 먼저 확인한다.
- 자료 장치 후보 주석이 공개 초안에 남지 않도록 prepublish 단계에서 확인한다.
