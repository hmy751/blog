---
작성일: 2026-07-29
목적: 커스텀 블로그의 실제 production 배포 주체와 점검·복구 절차를 한곳에 둔다.
관련:
  - ../README.md
  - ../scripts/deploy.mjs
  - ../decisions/2026-07-29-cloudflare-git-deployment-owner.md
---

# Deployment

## 현재 production 배포 기준

- 공개 주소: `https://hmy751-blog.pages.dev`
- 호스팅 서비스와 프로젝트: Cloudflare Pages `hmy751-blog`
- source repository: GitHub `hmy751/blog`
- production branch: `main`
- Cloudflare root directory: `site`
- build command: `npm run build`
- output directory: `out`
- 자동 배포 trigger: GitHub `main` push를 Cloudflare Pages Git integration이 감지

평소 발행 경로는 아래 하나다.

```text
content/posts 원고 커밋
→ GitHub main push
→ Cloudflare Pages가 site/에서 npm run build
→ out/을 hmy751-blog.pages.dev에 배포
```

GitHub Actions와 GitHub Pages/Jekyll은 이 사이트의 production 배포 경로가 아니다. GitHub 저장소의 Pages source는 `None`으로 유지한다.

## 발행 전후 확인

`site/`에서 로컬 preflight를 실행한다.

```bash
npm run verify
```

`main`에 push한 뒤에는 다음을 확인한다.

1. Cloudflare Pages `hmy751-blog`의 최신 production deployment source가 방금 push한 commit인지 본다.
2. deployment status가 `success`인지 본다.
3. `https://hmy751-blog.pages.dev` 또는 해당 글의 공개 URL에서 제목, 날짜, 본문을 확인한다.

GitHub Actions의 `pages build and deployment` 결과는 production 상태의 근거로 사용하지 않는다. 그 workflow가 보이면 GitHub Pages가 다시 활성화되지 않았는지 저장소 `Settings → Pages`에서 source가 `None`인지 확인한다.

## push했는데 배포되지 않을 때

먼저 세 상태를 분리해서 본다.

- GitHub: 원격 `main`에 목표 commit이 실제로 올라갔는가
- Cloudflare: 프로젝트가 `hmy751/blog`에 연결되어 있고 자동 배포가 켜져 있는가
- build: root `site`, command `npm run build`, output `out`이 유지되는가

Cloudflare deployment가 아예 생기지 않았다면 build 오류보다 Git integration 연결 상태를 먼저 확인한다. deployment가 생겼지만 실패했다면 해당 deployment의 build log에서 실패 단계를 확인한다.

원인을 확인하기 전 GitHub Pages/Jekyll 실패와 Cloudflare Pages 실패를 같은 문제로 취급하지 않는다.

## 수동 배포

`npm run deploy`는 Git integration을 즉시 복구할 수 없을 때만 쓰는 incident fallback이다. 이 명령은 `site/scripts/deploy.mjs`를 통해 `out/`을 Cloudflare Pages에 올리므로, 먼저 `npm run verify` 또는 `npm run build`가 성공해야 하고 로컬에 Wrangler 실행 환경과 Cloudflare 인증이 있어야 한다.

평소 발행은 수동 배포 명령이 아니라 `main` push와 Cloudflare Git integration을 사용한다.

## 2026-07-29 확인 기록

- `main`의 Current 글 commit `0932ae8`이 GitHub에는 있었지만 Cloudflare 프로젝트의 Git repository 연결이 끊겨 있어 자동 deployment가 생성되지 않았다.
- Cloudflare의 과거 자동 배포 이력과 GitHub App 접근 권한은 남아 있었다.
- 프로젝트를 `hmy751/blog`에 다시 연결하고 production branch `main`, root `site`, build `npm run build`, output `out`을 확인했다.
- 재연결 직후 commit `0932ae8` deployment가 생성되었고 52초 후 `success`가 되었다.
- 공개 글 `/articles/current-active-state-operation/`에서 2026-07-29 제목과 본문 노출을 확인했다.
- 별도로 활성화되어 있던 GitHub Pages 게시를 내리고 source branch를 `None`으로 바꿨다.
- 연결이 끊긴 정확한 시점과 원인은 확보한 기록만으로 확인되지 않았다.
