# Content Contract

사이트 앱은 root repo의 `content/posts/*.md`를 읽어 화면을 만든다. 원고의 발행 판단과 문장 수정은 root 글쓰기 하네스가 소유한다.

## Source

- 기본 source: `../../content/posts/*.md`
- Note source: `../../content/notes/*.md`. 디렉토리가 없으면 빈 목록으로 본다.
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
- `topic`: 상세 상단 태그 묶음의 첫 항목. 있으면 `topic`을 먼저 보여주고, 그 뒤에 frontmatter `tags` 전체를 이어 붙인다. SEO keyword source는 계속 `tags` 전체다.
- `cover`: 상세 글 상단 hero와 OG 이미지 후보. 목록 썸네일로 자동 사용하지 않는다.
- `thumbnail`: 홈/목록 row에 보이는 썸네일. `cover` 이미지, 본문 이미지, 별도 썸네일 asset 중 하나를 명시적으로 골라 넣는다. 없으면 목록은 no-thumbnail 상태로 둔다.
- `featured`: 홈 강조 여부. 없으면 `false`로 본다.

optional 필드를 필요로 한다는 이유로 기존 원고를 대량 수정하지 않는다. 필요하면 root `content/`에서 별도 editorial 작업으로 고친다.

이미지는 역할별로 분리한다. 상세 상단에 크게 놓을 이미지는 `cover`, 본문 판단을 돕는 이미지는 Markdown figure, 목록에서 독자가 글을 구분하도록 돕는 이미지는 `thumbnail`이다. 같은 파일을 세 역할에 모두 쓸 수 있지만, 사이트가 본문 첫 이미지나 `cover`를 목록 썸네일로 자동 승격하지는 않는다.

홈의 `Featured` section은 `featured: true`인 글이 있을 때만 보여준다. `Recent`는 `featured` 여부와 관계없이 오늘 기준 공개된 최신 글을 날짜순으로 보여준다.

## Slug And Date

- slug는 파일명 `YYYY-MM-DD-slug.md`의 `slug` 부분에서 만든다.
- 파일명 날짜와 frontmatter `date`가 다르면 build/check에서 실패시킨다.
- `date: TBD`인 글은 public route로 내보내지 않는다.
- 오늘보다 미래 날짜인 글은 public route와 목록에 내보내지 않는다. 로컬 검증에서 특정 기준일이 필요하면 `SITE_PUBLISH_CUTOFF_DATE=YYYY-MM-DD`로 override한다.

## Notes

- Note는 `content/notes/*.md`가 생기면 같은 `YYYY-MM-DD-slug.md` 규칙으로 읽는다.
- `title`, `date`, `description`은 optional이다. `description`이 없으면 첫 본문 paragraph를 목록 문장으로 쓴다.
- 아직 공개 note source가 없으면 내부 구현 문구 없이 조용한 empty state만 보여준다.

## Markdown Rendering

- GFM table, code fence, list, blockquote, link를 지원한다.
- 본문 첫 `# 제목`이 frontmatter `title`과 같으면 화면에서는 중복 렌더링하지 않는다.
- 넓은 table과 code block은 모바일 horizontal scroll을 제공한다.
- renderer 한계를 원고 HTML 증가로 해결하지 않는다.

상세 변환 규칙은 `MARKDOWN_CONTRACT.md`를 따른다.
