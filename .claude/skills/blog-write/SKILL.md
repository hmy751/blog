---
name: blog-write
description: 블로그 repo에서 새 원고, 기존 원고의 수정본, 원고 검토 결과, 발행 준비 결과 중 하나를 만들 때 사용한다.
---

# blog-write

이 skill은 사용자가 원하는 원고 관련 결과를 `editorial/`의 소유 문서와 필요한 writing agent로 연결하는 dispatcher다. 주제, source 이름, 프로젝트 이름으로 발동 범위를 정하지 않고 기준이나 단계의 본문을 이 파일에 복사하지 않는다.

발동 여부는 frontmatter description의 결과 계약으로 판단한다.

## Dispatch

- `CLAUDE.md`에서 프로젝트 영역, 원천 자료 경계, 대상 경로의 로컬 guide 우선순위를 확인한다.
- `editorial/README.md`를 필요한 기준 문서의 단일 색인으로 사용한다.
- 결과 형식은 `editorial/core/output-contracts.md`에서 고른다.
- 실제 글쓰기의 시작 단계와 전환은 현재 산출물과 요청을 기준으로 `editorial/core/workflow.md`에서 고른다.
- 글 유형이나 material signature가 현재 판단에 필요할 때만 `editorial/core/article-types.md`를 읽는다.
- lens는 판단에 필요한 경우에만 켜고 새 단계처럼 운용하지 않는다.
- writing agent는 현재 판단에 독립 report가 실제로 필요할 때 필요한 역할만 선택하고 자동 순차 호출하지 않는다.
- 선택한 단계와 agent는 사용자의 요청 범위를 넓히지 않는다.

## 소유권

- `editorial/core/`는 단계·작업 결과·글 유형·reference use를 소유한다.
- `editorial/lenses/`는 판단 기준을 소유하고 작업 순서를 결정하지 않는다.
- `editorial/guards/`는 공개 안전과 발행 가능성을 막으며 초안의 창작 기준으로 되돌려 적용하지 않는다.
- agent는 기준 저장소가 아니라 선택된 역할의 report-only 실행자다.
