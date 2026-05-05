import type { Post } from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";

type FixturePostInput = Partial<Post> & Pick<Post, "title" | "date" | "slug">;

export const fixtureCover = "/design-system/fixtures/example-article-cover.svg";
export const fixtureDiagram = "/design-system/fixtures/example-article-diagram.svg";

export function makePost(input: FixturePostInput): Post {
  const tags = input.tags ?? ["Design"];
  const dateText = input.date.replaceAll("-", ".");

  return {
    author: siteConfig.author,
    body: "",
    dateShort: input.date.slice(5).replace("-", "."),
    dateText,
    description: "구현의 표면보다 경계와 판단이 어떻게 바뀌는지 기록한 글입니다.",
    descriptionSource: "frontmatter",
    featured: false,
    file: `${input.date}-${input.slug}.md`,
    platform: "Blog",
    primaryTag: tags[0] ?? "Blog",
    readTime: "6 min read",
    tags,
    year: input.date.slice(0, 4),
    ...input
  };
}

export const fixturePosts: Post[] = [
  makePost({
    title: "RAG 평가에서 judge prompt를 고정하기 전에 본 것",
    date: "2026-04-18",
    slug: "rag-judge-evaluation",
    tags: ["AI", "RAG"],
    cover: fixtureCover,
    featured: true
  }),
  makePost({
    title: "긴 한국어 제목이 목록과 상세 화면에서 어떻게 접히는지 확인하기 위한 아주 긴 기술 글 제목",
    date: "2026-04-17",
    slug: "long-korean-title-wrap",
    tags: ["Frontend", "Layout"],
    description: "목록 row, post title, mobile measure에서 줄바꿈과 정렬을 확인하기 위한 fixture입니다."
  }),
  makePost({
    title: "DistilBERT 파인튜닝에서 accuracy와 loss를 같이 본 이유",
    date: "2026-04-16",
    slug: "distilbert-finetuning-accuracy-loss",
    tags: ["ML", "Experiment"],
    readTime: ""
  }),
  makePost({
    title: "Offline-first 구조에서 상태 전이를 먼저 그린 이유",
    date: "2026-01-29",
    slug: "noline-offline-first-architecture",
    tags: ["Architecture", "Product"],
    cover: fixtureDiagram,
    descriptionSource: "excerpt"
  })
];

export const markdownFixture = [
  "첫 문단은 상세 글에서 lead paragraph로 올라간다. 구현 선택의 이유와 독자가 판단해야 할 범위를 먼저 좁혀 준다.",
  "",
  "## 문제",
  "",
  "본문에는 `inline code`, **strong**, *emphasis*, [link](https://example.com), ==mark==, <kbd>Command</kbd>+<kbd>K</kbd>가 섞인다.",
  "",
  "> [!NOTE]",
  "> callout은 원고 HTML이 아니라 Markdown convention에서 변환한다.",
  "",
  "> [!WARNING]",
  "> 넓은 표와 코드 블록은 모바일에서 가로 스크롤을 가져야 한다.",
  "",
  "## 리스트",
  "",
  "- 컴포넌트 상태를 fixture로 분리한다.",
  "- 화면 조합은 production class contract를 유지한다.",
  "  - 중첩 목록의 marker 간격도 확인한다.",
  "",
  "1. 토큰을 본다.",
  "2. 컴포넌트를 본다.",
  "3. 페이지 흐름을 본다.",
  "",
  "- [x] no-cover row",
  "- [ ] cover row",
  "",
  "## 코드",
  "",
  "~~~tsx title=\"components/Button.tsx\"",
  "type ButtonProps = {",
  "  label: string;",
  "  tone?: \"quiet\" | \"accent\";",
  "};",
  "~~~",
  "",
  "## 표",
  "",
  "| Surface | Purpose | Risk |",
  "| --- | --- | --- |",
  "| Storybook | isolated states | fixture drift |",
  "| System preview | route integration | slower iteration |",
  "",
  "![component anatomy](/design-system/fixtures/component-anatomy-placeholder.svg)",
  "",
  "그림 1. 컴포넌트 anatomy placeholder.",
  "",
  "Footnote를 가진 문장입니다.[^1]",
  "",
  "[^1]: footnote 영역과 ref 스타일을 확인한다."
].join("\n");

export const noteItems = [
  {
    when: "2026.05",
    body: "Storybook은 컴포넌트 상태를 고립해서 보고, system-preview는 실제 route 결합을 확인한다."
  },
  {
    when: "empty",
    body: "아직 site 전용 note source는 연결하지 않았습니다."
  }
];
