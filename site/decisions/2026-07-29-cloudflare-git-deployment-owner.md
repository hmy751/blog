---
작성일: 2026-07-29
상태: accepted
관련:
  - ../docs/DEPLOYMENT.md
  - ../README.md
---

# Cloudflare Git Deployment Owner

## 배경

2026-07-29 공개 원고를 GitHub `main`에 push했지만 Cloudflare Pages의 production 사이트에는 반영되지 않았다. 같은 시점에 GitHub Actions에는 Pages/Jekyll 실패가 나타나 실제 배포 주체가 GitHub Pages인지 Cloudflare Pages인지 혼동이 생겼다.

조사 결과 production 사이트는 Cloudflare Pages `hmy751-blog`였고, 과거에는 GitHub `main` push를 받아 자동 배포하고 있었다. 그러나 Cloudflare 프로젝트 화면에서는 Git repository 연결이 끊긴 상태였다. GitHub Pages는 별도로 `main`의 repository root를 Jekyll로 빌드하도록 활성화되어 있었다.

## 기존 문서가 놓친 문제

- `site/README.md`에 Cloudflare build 설정과 수동 배포 명령은 있었지만, 평소 자동 배포 trigger와 유일한 production 주체가 분명하지 않았다.
- GitHub Actions의 Pages 실패와 Cloudflare Pages 배포 실패를 구분하는 점검 순서가 없었다.
- Git integration이 끊겼을 때 확인할 설정과 수동 배포의 역할 경계가 한곳에 없었다.

## 결정

- 커스텀 블로그의 표준 production 배포 주체는 Cloudflare Pages `hmy751-blog` 하나로 둔다.
- 표준 발행 경로는 GitHub `main` push와 Cloudflare Pages Git integration이다.
- Cloudflare build 설정은 root `site`, command `npm run build`, output `out`으로 유지한다.
- GitHub Pages/Jekyll은 production 경로로 사용하지 않고 repository Pages source를 `None`으로 유지한다.
- `npm run deploy`는 Git integration을 즉시 복구할 수 없는 incident fallback으로만 둔다.
- 배포 기준, 확인 순서, 장애 분리는 `site/docs/DEPLOYMENT.md`가 소유한다.

## 적용 범위

- Cloudflare Pages project 설정
- GitHub repository Pages 설정
- `site/docs`
- `site/README.md`
- `site/CLAUDE.md`

## 비목표

- GitHub Actions 기반의 새 production pipeline 추가
- Cloudflare Pages가 아닌 새 hosting service로 이전
- custom domain 추가
- 원고 작성과 prepublish 판단 방식 변경

## 근거

- Cloudflare Pages에는 `hmy751/blog`의 `main` commit을 source로 한 과거 production deployment 이력이 남아 있었다.
- 2026-07-29 Git repository를 다시 연결하자 목표 commit `0932ae8`의 자동 deployment가 즉시 생성되어 성공했다.
- 같은 commit의 공개 글이 `hmy751-blog.pages.dev`에서 정상 노출되었다.
- GitHub Pages는 repository root를 Jekyll로 빌드하는 별도 시스템이어서 `site/`의 Next.js static export 배포 상태를 나타내지 않았다.

## 후속 점검

- 발행 전 `site/`에서 `npm run verify`를 실행한다.
- push 후 Cloudflare deployment source commit, status, 공개 URL을 확인한다.
- GitHub Actions에 Pages workflow가 다시 나타나면 GitHub `Settings → Pages`의 source가 `None`인지 확인한다.
- Git integration이 다시 끊기면 Cloudflare와 GitHub의 audit 기록을 확인하되, 근거가 없으면 끊긴 원인을 추정해 기록하지 않는다.
