---
작성일: 2026-05-06
상태: accepted
관련:
  - ../src/app/layout.tsx
  - ../docs/READER_BEHAVIOR_CONTRACT.md
  - ./2026-05-06-reader-behavior-seo-harness.md
---

# Clarity body-level masking 제거

## 배경

초기 Clarity 연결은 보수적으로 `body` 전체에 `data-clarity-mask="true"`를 걸었다. 그 결과 Recordings에서 공개 블로그 제목과 본문까지 모두 점으로 표시되어, 독자가 어느 글과 문맥에서 어떻게 움직였는지 보기 어려웠다.

현재 사이트는 로그인, 검색, 댓글, 구독, 문의 form이 없는 공개 블로그다. 독자 입력값이나 계정 정보가 화면에 나타나는 구조가 아니므로 전체 body mask는 목적에 비해 과하다.

## 결정

`body`의 `data-clarity-mask="true"`를 제거한다. 공개 글 본문은 Clarity replay에서 보일 수 있게 두고, Clarity dashboard의 Balanced 또는 필요 시 Relaxed masking을 사용한다.

입력 surface가 생기면 그때 해당 form/search/comment 영역에 `data-clarity-mask="true"`를 명시적으로 추가한다.

## 적용 범위

- `site/src/app/layout.tsx`
- `site/docs/READER_BEHAVIOR_CONTRACT.md`
- Clarity dashboard masking 확인 절차

## 비목표

- 독자 입력값 수집.
- custom user id, email, 계정 식별자 연결.
- 광고/리타게팅 연결.
- 기존 녹화의 마스킹을 소급 변경.

## 후속 점검

- 새 배포 후 Clarity Recordings에서 새 세션부터 글자가 보이는지 확인한다.
- Clarity masking 설정 변경은 기존 녹화에 소급 적용되지 않고 반영에 시간이 걸릴 수 있음을 감안한다.
- 검색, 댓글, 구독, 문의 form을 추가할 때는 배포 전 masking 계약을 다시 확인한다.
