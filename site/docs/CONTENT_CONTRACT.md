# Content Contract

사이트 앱은 root repo의 `content/posts/*.md`를 읽어 화면을 만든다. 원고의 발행 판단과 문장 수정은 root 글쓰기 하네스가 소유한다.

## Source

- 기본 source: `../../content/posts/*.md`
- 초안 preview가 필요할 때만 `../../content/drafts/*.md`를 별도 dev-only 경로로 읽는다.
- `content/backlog/`는 사이트 데이터 source가 아니다.

## Required Frontmatter

공개 글은 root prepublish 기준을 따른다.

- `title`
- `date`
- `author`
- `readTime`
- `platform`
- `tags`

`platform` 값은 `Blog`를 기본으로 한다.

## Optional Display Fields

아래 필드는 사이트 표시를 돕기 위한 optional 필드로 시작한다. 없을 때 fallback을 둔다.

- `description`: 목록/OG 설명. 없으면 첫 본문 paragraph를 요약 후보로 쓴다.
- `cover`: 상세/OG 이미지. 없으면 기본 OG 이미지를 쓴다.
- `featured`: 홈 강조 여부. 없으면 `false`로 본다.

optional 필드를 필요로 한다는 이유로 기존 원고를 대량 수정하지 않는다. 필요하면 root `content/`에서 별도 editorial 작업으로 고친다.

## Slug And Date

- slug는 파일명 `YYYY-MM-DD-slug.md`의 `slug` 부분에서 만든다.
- 파일명 날짜와 frontmatter `date`가 다르면 build/check에서 실패시킨다.
- `date: TBD`인 글은 public route로 내보내지 않는다.

## Markdown Rendering

- GFM table, code fence, list, blockquote, link를 지원한다.
- 본문 첫 `# 제목`이 frontmatter `title`과 같으면 화면에서는 중복 렌더링하지 않는다.
- 넓은 table과 code block은 모바일 horizontal scroll을 제공한다.
- renderer 한계를 원고 HTML 증가로 해결하지 않는다.
