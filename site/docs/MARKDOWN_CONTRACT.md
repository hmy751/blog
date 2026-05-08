# Markdown Contract

이 문서는 `content/posts/*.md`를 site 상세 글 화면으로 렌더링할 때 필요한 변환 계약이다. 현재 렌더링 구현은 `../src/lib/markdown.ts`가 소유하고, 시각 기준은 `../src/styles/prose.css`와 Storybook Prose stories가 소유한다.

`../archive/design-system/fixtures`는 아직 Storybook과 system-preview가 공유하는 local-only fixture asset bucket이다. fixture Markdown과 SVG는 QA 자산이며 production content나 current design source가 아니다.

## Goals

- 원고는 Markdown 중심으로 유지한다.
- renderer가 표현 책임을 가진다.
- 디자인을 맞추기 위해 원고에 임의 HTML을 늘리지 않는다.
- `Blog v2.html`의 상세 페이지가 보여준 prose 요소를 모두 지원한다.

## Pipeline

권장 순서:

1. frontmatter parse
2. Markdown AST parse
3. first H1 guard
4. excerpt/lead extraction
5. Markdown extensions transform
6. HTML render
7. post layout wrap

## Frontmatter And Body

- frontmatter `title`은 page title과 post heading source다.
- 본문 첫 `#`가 frontmatter `title`과 같으면 제거한다.
- `description`이 있으면 post subtitle로 쓴다.
- `description`이 없으면 첫 normal paragraph를 list excerpt로만 쓰고, post page subtitle은 생략한다.
- 첫 normal paragraph는 `.lead`로 승격할 수 있다. 단, frontmatter description에서 만든 excerpt와 같은 문장을 subtitle과 lead에 동시에 반복하지 않는다.

## Required Markdown Elements

| Markdown | Render target |
| --- | --- |
| paragraph | `.prose p` |
| first lead paragraph | `.prose p.lead` |
| `##`, `###` | `.prose h2`, `.prose h3` |
| `####` | compact `.prose h4` for existing post compatibility |
| `*em*`, `**strong**` | normal inline emphasis |
| inline code | `.prose code` |
| link | `a.link` or prose link equivalent |
| blockquote | `.prose blockquote` |
| unordered list | custom dash marker via CSS |
| ordered list | custom mono counter via CSS |
| task list | `.task-list-item`, `.checked` or `.task .done` |
| table | wrapped with `.table-scroll` |
| fenced code | `.prose pre code` |
| fenced code with filename | `.code-block > .filename + pre` |
| fenced `mermaid` diagram | `.mermaid-block > .filename + .mermaid-render + .mermaid-source` |
| image | `figure > img` |
| image caption | `figcaption` |
| footnote | `.footnotes`, `sup.fn-ref` or `sup.footnote-ref` |
| horizontal rule | `.prose hr` |
| `<kbd>` | `.prose kbd` |
| `mark` extension | `.prose mark` |

## Extensions

Source-import compatibility:

- Escaped backticks from imported posts, such as `\`` and `\`\`\``, are normalized by the renderer before Markdown parsing.
- The site does not rewrite the source post file for this compatibility step.

Callout:

```md
> [!NOTE]
> 한 줄 요약.
```

renders to:

```html
<div class="callout">
  <span class="ico">i</span>
  <div><p>한 줄 요약.</p></div>
</div>
```

짧은 데이터 흐름이나 핵심 규칙 요약처럼 실행 가능한 code가 아닌 내용은 fenced `text` code block보다 callout을 우선 후보로 둔다.

Warning:

```md
> [!WARNING]
> 주의 문장.
```

renders to `.callout.warn` with `!` icon.

Reference links:

```md
참고: [SWR 이해하기](https://swr.vercel.app/ko)
```

Use a plain paragraph for reference links, source links, and CTA-style links that are not actual quotations. Do not use blockquote syntax just to visually separate a `참고:` link.

If several reference links appear together, use separate plain `참고:` paragraphs or a normal list. Reserve blockquotes for quoted text and the explicit callout syntax above.

Code filename:

````md
```tsx title="components/Button.tsx"
type ButtonProps = {};
```
````

`filename="components/Button.tsx"` is also accepted. Use a public-facing filename or short module name, not a private local path.

renders to:

```html
<div class="code-block">
  <div class="filename"><span class="lang">tsx</span><span>components/Button.tsx</span></div>
  <pre><code>...</code></pre>
</div>
```

The language chip comes first because both `Blog v2.html` and `System.html` use that DOM order.

Syntax highlight:

- Code fences with supported language names are highlighted at render time with Shiki.
- Supported language aliases include `ts`/`typescript`, `tsx`, `js`/`javascript`, `jsx`, `json`, `css`, `scss`, `bash`/`sh`/`zsh`, `html`, `md`, `yaml`, `diff`, `sql`, and `python`.
- Highlight output uses the site token classes `.tk-c`, `.tk-k`, `.tk-s`, `.tk-n`, `.tk-t`, and `.tk-f` rather than inline colors.
- For partial code examples in articles, prefer a short first-line comment that says what the snippet represents. Keep implementation paths and private source names out of public code blocks.

Mermaid diagram:

````md
```mermaid
flowchart LR
  Markdown --> Renderer
  Renderer --> Page
```
````

renders to a `.mermaid-block`. The original source is kept in `.mermaid-source` as a fallback, and the client runtime renders the diagram into `.mermaid-render`.

Mark:

```md
==highlight==
```

renders to `<mark>highlight</mark>`.

Figure caption:

```md
![alt](image.png)

그림 1. 설명.
```

If a paragraph immediately after an image starts with `그림 `, `Figure `, `Fig.`, or is explicitly marked with `Caption:`, wrap image and caption in one `figure`.

`Caption:` is a source-only marker. The renderer removes the marker from visible `figcaption` text.

```md
![alt](image.png)

Caption: Medium에서 가져온 캡션.
```

renders as a figure caption with visible text `Medium에서 가져온 캡션.`.

Imported table images:

- If an external platform used an image only because native tables were awkward or unavailable, convert the content to a GFM table in `content/posts` instead of preserving it as a body figure.
- Preserve the visible labels and values from the image, including inline code terms, but do not add new claims while transcribing.
- Keep the image as a body figure only when the visual layout itself is evidence, the screenshot cannot be faithfully represented as Markdown, or the exact UI/diagram is what the reader needs to inspect.
- After converting a production image to Markdown table/list/code, remove the unreferenced production asset. Temporary migration source copies can remain in `temp/` for comparison history.

Phone figures:

- If an image `src` contains `-phone-`, the renderer adds `phone-figure`.
- Consecutive phone figures are wrapped in `.phone-figure-row`.
- CSS constrains phone screenshots to a narrow width and lays consecutive screenshots out horizontally when space allows.
- Authors should use descriptive alt text and site asset filenames such as `09-phone-trip-card-online-only.png`.
- Authors should not add inline HTML to resize phone screenshots.

## QA Fixture

Renderer QA must render:

- Storybook `Design System/Prose` Markdown fixture from `../src/stories/story-fixtures.ts`
- Storybook `Design System/Screens/PostDetail`
- local-only `/system/` and `/system/example-article/` preview
- shared local-only assets in `../archive/design-system/fixtures`
- at least one real post without `description`, `cover`, `thumbnail`, or `featured`
- at least one long technical post with code/table/list sections

Before shipping, compare Storybook, system-preview, and at least one real article route. Use `../archive/design-system/reference/blog-design/source/*.html` only when the original design intent needs to be recovered.
