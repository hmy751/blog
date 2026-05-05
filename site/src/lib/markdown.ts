import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";

type MarkdownOptions = {
  leadFirstParagraph?: boolean;
};

type AnyNode = {
  type: string;
  tagName?: string;
  value?: string;
  lang?: string;
  meta?: string;
  data?: Record<string, unknown>;
  properties?: Record<string, unknown>;
  children?: AnyNode[];
};

export async function markdownToHtml(markdown: string, options: MarkdownOptions = {}): Promise<string> {
  const normalized = normalizeMarkdown(markdown);
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMark)
    .use(remarkCodeMeta)
    .use(remarkRehype, { allowDangerousHtml: false })
    .use(rehypeSlug)
    .use(rehypeLinks)
    .use(rehypeCallouts)
    .use(rehypeTaskItems)
    .use(rehypeFigures)
    .use(rehypeCodeBlocks)
    .use(rehypeTableScroll)
    .use(rehypeFootnotes)
    .use(rehypeLeadParagraph, options)
    .use(rehypeStringify)
    .process(normalized.markdown);

  return restoreKbd(String(file), normalized.kbd);
}

function normalizeMarkdown(markdown: string): { markdown: string; kbd: string[] } {
  const kbd: string[] = [];
  const normalized = String(markdown)
    .replace(/\\`/g, "`")
    .replace(/\r\n/g, "\n")
    .replace(/<kbd>([\s\S]*?)<\/kbd>/gi, (_match, value: string) => {
      const index = kbd.push(value) - 1;
      return `KBDTOKEN${index}END`;
    });

  return { markdown: normalized, kbd };
}

function remarkMark() {
  return (tree: AnyNode) => {
    visit(tree, "text", (node: AnyNode, index: number | undefined, parent: AnyNode | undefined) => {
      if (!node.value?.includes("==") || !parent?.children || index === undefined) return;

      const parts: AnyNode[] = [];
      const pattern = /==([^=]+)==/g;
      let cursor = 0;
      let match: RegExpExecArray | null;

      while ((match = pattern.exec(node.value))) {
        if (match.index > cursor) {
          parts.push({ type: "text", value: node.value.slice(cursor, match.index) });
        }
        parts.push(inlineElement("mark", match[1]));
        cursor = match.index + match[0].length;
      }

      if (!parts.length) return;
      if (cursor < node.value.length) {
        parts.push({ type: "text", value: node.value.slice(cursor) });
      }

      parent.children.splice(index, 1, ...parts);
    });
  };
}

function remarkCodeMeta() {
  return (tree: AnyNode) => {
    visit(tree, "code", (node: AnyNode) => {
      const filename = parseCodeFilename(node.meta || "");
      node.data = {
        ...node.data,
        hProperties: {
          dataMeta: node.meta || "",
          dataFilename: filename || ""
        }
      };
    });
  };
}

function rehypeLinks() {
  return (tree: AnyNode) => {
    visit(tree, "element", (node: AnyNode) => {
      if (node.tagName !== "a") return;
      addClass(node, "link");
    });
  };
}

function rehypeCallouts() {
  return (tree: AnyNode) => {
    visit(tree, "element", (node: AnyNode) => {
      if (node.tagName !== "blockquote") return;

      const children = node.children ?? [];
      const firstIndex = nextMeaningfulIndex(children, 0);
      const first = firstIndex === -1 ? undefined : children[firstIndex];
      if (!first || first.tagName !== "p") return;

      const marker = textContent(first).trim().match(/^\[!(NOTE|INFO|TIP|WARNING|WARN)\]$/i);
      const markerWithBody = textContent(first).match(/^\s*\[!(NOTE|INFO|TIP|WARNING|WARN)\]([\s\S]*)$/i);
      if (!marker && !markerWithBody) return;

      const type = marker?.[1] ?? markerWithBody?.[1] ?? "NOTE";
      const isWarn = /WARN|WARNING/i.test(type);
      const firstBody = cloneWithoutCalloutMarker(first);
      const bodyChildren = [
        ...(hasVisibleText(firstBody) ? [firstBody] : []),
        ...children.slice(firstIndex + 1)
      ];

      node.tagName = "div";
      node.properties = { className: isWarn ? ["callout", "warn"] : ["callout"] };
      node.children = [
        {
          type: "element",
          tagName: "span",
          properties: { className: ["ico"] },
          children: [{ type: "text", value: isWarn ? "!" : "i" }]
        },
        {
          type: "element",
          tagName: "div",
          properties: {},
          children: bodyChildren
        }
      ];
    });
  };
}

function rehypeTaskItems() {
  return (tree: AnyNode) => {
    visit(tree, "element", (node: AnyNode) => {
      if (node.tagName !== "li") return;
      const input = node.children?.find((child) => child.tagName === "input");
      if (!input) return;

      addClass(node, "task-list-item");
      if (input.properties?.checked === true || input.properties?.checked === "") {
        addClass(node, "checked");
      }
    });
  };
}

function rehypeFigures() {
  return (tree: AnyNode) => {
    visit(tree, (node: AnyNode) => {
      if (!node.children) return;

      for (let index = 0; index < node.children.length; index += 1) {
        const child = node.children[index];
        if (!isImageParagraph(child)) continue;

        const captionIndex = nextMeaningfulIndex(node.children, index + 1);
        const caption = captionIndex === -1 ? undefined : node.children[captionIndex];
        const isCaption = caption?.tagName === "p" && isFigureCaption(textContent(caption));
        const image = child.children?.find((item) => item.tagName === "img");
        if (!image) continue;

        const figureChildren = [image];
        let deleteCount = 1;

        if (isCaption && caption) {
          figureChildren.push({
            type: "element",
            tagName: "figcaption",
            properties: {},
            children: caption.children ?? []
          });
          deleteCount = captionIndex - index + 1;
        }

        node.children.splice(index, deleteCount, {
          type: "element",
          tagName: "figure",
          properties: {},
          children: figureChildren
        });
      }
    });
  };
}

function rehypeCodeBlocks() {
  return (tree: AnyNode) => {
    visit(tree, "element", (node: AnyNode, index: number | undefined, parent: AnyNode | undefined) => {
      if (node.tagName !== "pre" || !parent?.children || index === undefined) return;
      const code = node.children?.find((child) => child.tagName === "code");
      if (!code) return;

      const lang = codeLanguage(code);
      const filename = stringProperty(code, "dataFilename");
      const label = filename || lang;

      delete code.properties?.dataMeta;
      delete code.properties?.dataFilename;

      if (!label) return;

      parent.children[index] = {
        type: "element",
        tagName: "div",
        properties: { className: ["code-block"] },
        children: [filenameBar(lang, filename || label), node]
      };
    });
  };
}

function rehypeTableScroll() {
  return (tree: AnyNode) => {
    visit(tree, "element", (node: AnyNode, index: number | undefined, parent: AnyNode | undefined) => {
      if (node.tagName !== "table" || !parent?.children || index === undefined) return;
      parent.children[index] = {
        type: "element",
        tagName: "div",
        properties: { className: ["table-scroll"] },
        children: [node]
      };
    });
  };
}

function rehypeFootnotes() {
  return (tree: AnyNode) => {
    visit(tree, "element", (node: AnyNode) => {
      if (node.tagName !== "sup") return;
      const hasFootnoteRef = node.children?.some((child) => child.tagName === "a" && "dataFootnoteRef" in (child.properties ?? {}));
      if (hasFootnoteRef) {
        addClass(node, "footnote-ref");
      }
    });
  };
}

function rehypeLeadParagraph(options: MarkdownOptions) {
  return (tree: AnyNode) => {
    if (!options.leadFirstParagraph || !tree.children) return;
    const paragraph = tree.children.find((child) => child.tagName === "p");
    if (!paragraph) return;
    addClass(paragraph, "lead");
  };
}

function inlineElement(tagName: string, value: string): AnyNode {
  return {
    type: tagName,
    data: {
      hName: tagName
    },
    children: [{ type: "text", value }]
  };
}

function restoreKbd(html: string, values: string[]): string {
  return values.reduce(
    (current, value, index) => current.replaceAll(`KBDTOKEN${index}END`, `<kbd>${escapeHtml(value)}</kbd>`),
    html
  );
}

function cloneWithoutCalloutMarker(node: AnyNode): AnyNode {
  const clone = structuredClone(node) as AnyNode;
  const firstText = clone.children?.find((child) => child.type === "text");
  if (firstText?.value) {
    firstText.value = firstText.value.replace(/^\s*\[!(NOTE|INFO|TIP|WARNING|WARN)\]\s*/i, "");
  }
  return clone;
}

function hasVisibleText(node: AnyNode): boolean {
  return Boolean(textContent(node).trim());
}

function parseCodeFilename(meta: string): string {
  return meta.match(/(?:title|filename)="([^"]+)"/)?.[1] || "";
}

function filenameBar(lang: string, label: string): AnyNode {
  const children: AnyNode[] = [];

  if (lang && label !== lang) {
    children.push({
      type: "element",
      tagName: "span",
      properties: { className: ["lang"] },
      children: [{ type: "text", value: lang }]
    });
  }

  children.push({
    type: "element",
    tagName: "span",
    properties: {},
    children: [{ type: "text", value: label }]
  });

  return {
    type: "element",
    tagName: "div",
    properties: { className: ["filename"] },
    children
  };
}

function codeLanguage(code: AnyNode): string {
  const className = code.properties?.className;
  const classes = Array.isArray(className) ? className : [];
  const languageClass = classes.find((value) => typeof value === "string" && value.startsWith("language-"));
  return typeof languageClass === "string" ? languageClass.replace(/^language-/, "") : "";
}

function stringProperty(node: AnyNode, key: string): string {
  const value = node.properties?.[key];
  return typeof value === "string" ? value : "";
}

function addClass(node: AnyNode, className: string): void {
  node.properties = node.properties ?? {};
  const current = node.properties.className;
  const classes = Array.isArray(current)
    ? current.filter((value): value is string => typeof value === "string")
    : typeof current === "string"
      ? current.split(/\s+/)
      : [];

  if (!classes.includes(className)) {
    classes.push(className);
  }

  node.properties.className = classes;
}

function isImageParagraph(node: AnyNode): boolean {
  if (node.tagName !== "p" || !node.children) return false;
  const meaningfulChildren = node.children.filter((child) => child.type !== "text" || child.value?.trim());
  return meaningfulChildren.length === 1 && meaningfulChildren[0]?.tagName === "img";
}

function nextMeaningfulIndex(children: AnyNode[], startIndex: number): number {
  for (let index = startIndex; index < children.length; index += 1) {
    const child = children[index];
    if (child.type === "text" && !child.value?.trim()) continue;
    return index;
  }
  return -1;
}

function isFigureCaption(value: string): boolean {
  return /^(그림\s*\d*\.|Figure\s*\d*\.|Fig\.\s*\d*\.|Caption:)/i.test(value.trim());
}

function textContent(node: AnyNode): string {
  if (node.type === "text") return node.value ?? "";
  return (node.children ?? []).map(textContent).join("");
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;");
}
