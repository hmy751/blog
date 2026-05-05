import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { createHighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import bash from "shiki/langs/bash.mjs";
import css from "shiki/langs/css.mjs";
import diff from "shiki/langs/diff.mjs";
import html from "shiki/langs/html.mjs";
import javascript from "shiki/langs/javascript.mjs";
import json from "shiki/langs/json.mjs";
import jsx from "shiki/langs/jsx.mjs";
import markdownLang from "shiki/langs/markdown.mjs";
import python from "shiki/langs/python.mjs";
import scss from "shiki/langs/scss.mjs";
import shellscript from "shiki/langs/shellscript.mjs";
import sql from "shiki/langs/sql.mjs";
import tsx from "shiki/langs/tsx.mjs";
import typescript from "shiki/langs/typescript.mjs";
import yaml from "shiki/langs/yaml.mjs";
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

type HighlightToken = {
  content: string;
  color?: string;
};

type ShikiHighlighter = Awaited<ReturnType<typeof createHighlighterCore>>;

const shikiTheme = {
  name: "blog-prose",
  type: "light" as const,
  fg: "#3A3833",
  bg: "#F3F0E8",
  colors: {
    "editor.background": "#F3F0E8",
    "editor.foreground": "#3A3833"
  },
  settings: [
    { settings: { foreground: "#3A3833", background: "#F3F0E8" } },
    { scope: ["comment", "punctuation.definition.comment"], settings: { foreground: "#9A978C", fontStyle: "italic" } },
    { scope: ["string", "constant.character.escape", "markup.inline.raw"], settings: { foreground: "#2F7A32" } },
    { scope: ["constant.numeric", "constant.language.boolean", "constant.language.null", "constant.language.undefined"], settings: { foreground: "#B45309" } },
    { scope: ["entity.name.function", "support.function", "variable.function"], settings: { foreground: "#A16207" } },
    { scope: ["entity.name.type", "entity.name.class", "entity.name.tag", "support.type", "support.class"], settings: { foreground: "#2563EB" } },
    { scope: ["keyword", "storage.type", "storage.modifier"], settings: { foreground: "#7C3AED" } },
    { scope: ["variable.object.property", "meta.object-literal.key", "support.variable.property"], settings: { foreground: "#A16207" } }
  ]
};

const shikiLanguages = [
  "bash",
  "css",
  "diff",
  "html",
  "javascript",
  "json",
  "jsx",
  "markdown",
  "python",
  "scss",
  "shellscript",
  "sql",
  "tsx",
  "typescript",
  "yaml"
] as const;

type ShikiLanguage = (typeof shikiLanguages)[number];

const shikiLanguageSet = new Set<string>(shikiLanguages);
const languageAliases: Record<string, ShikiLanguage> = {
  cjs: "javascript",
  js: "javascript",
  md: "markdown",
  mjs: "javascript",
  py: "python",
  sh: "shellscript",
  shell: "shellscript",
  ts: "typescript",
  yml: "yaml",
  zsh: "shellscript"
};

const tokenClassByColor: Record<string, string> = {
  "#2563EB": "tk-t",
  "#2F7A32": "tk-s",
  "#7C3AED": "tk-k",
  "#9A978C": "tk-c",
  "#A16207": "tk-f",
  "#B45309": "tk-n"
};

let highlighterPromise: Promise<ShikiHighlighter> | undefined;

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
  return async (tree: AnyNode) => {
    const codeBlocks: Array<{ node: AnyNode; code: AnyNode; siblings: AnyNode[]; index: number }> = [];

    visit(tree, "element", (node: AnyNode, index: number | undefined, parent: AnyNode | undefined) => {
      if (node.tagName !== "pre" || !parent?.children || index === undefined) return;
      const code = node.children?.find((child) => child.tagName === "code");
      if (!code) return;

      codeBlocks.push({ node, code, siblings: parent.children, index });
    });

    let mermaidIndex = 0;

    for (const block of codeBlocks) {
      const { node, code, siblings, index } = block;
      const lang = codeLanguage(code);
      const filename = stringProperty(code, "dataFilename");
      const label = filename || lang;
      const source = textContent(code);

      delete code.properties?.dataMeta;
      delete code.properties?.dataFilename;

      if (isMermaidLanguage(lang)) {
        mermaidIndex += 1;
        siblings[index] = mermaidBlock(source, filename, mermaidIndex);
        continue;
      }

      const normalizedLanguage = normalizeCodeLanguage(lang);
      if (normalizedLanguage) {
        code.children = await highlightCode(source, normalizedLanguage);
      }

      if (!label) continue;

      siblings[index] = {
        type: "element",
        tagName: "div",
        properties: { className: ["code-block"] },
        children: [filenameBar(lang, filename || label), node]
      };
    }
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

async function highlightCode(source: string, lang: ShikiLanguage): Promise<AnyNode[]> {
  const highlighter = await getHighlighter();
  const result = highlighter.codeToTokens(source, { lang, theme: shikiTheme.name });
  const children: AnyNode[] = [];

  result.tokens.forEach((line, lineIndex) => {
    line.forEach((token) => {
      const className = tokenClass(token);
      children.push(className ? inlineSpan(className, token.content) : { type: "text", value: token.content });
    });

    if (lineIndex < result.tokens.length - 1) {
      children.push({ type: "text", value: "\n" });
    }
  });

  return children.length ? children : [{ type: "text", value: source }];
}

function getHighlighter(): Promise<ShikiHighlighter> {
  highlighterPromise ??= createHighlighterCore({
    engine: createJavaScriptRegexEngine(),
    langs: [bash, css, diff, html, javascript, json, jsx, markdownLang, python, scss, shellscript, sql, tsx, typescript, yaml].flat(),
    themes: [shikiTheme]
  });

  return highlighterPromise;
}

function tokenClass(token: HighlightToken): string {
  if (!token.content.trim() || isNeutralSyntax(token.content)) return "";
  const color = token.color?.toUpperCase();
  return color ? tokenClassByColor[color] ?? "" : "";
}

function isNeutralSyntax(value: string): boolean {
  return /^[{}()[\].,;:=<>/?|&!+\-*%^~`\\\s]+$/.test(value);
}

function inlineSpan(className: string, value: string): AnyNode {
  return {
    type: "element",
    tagName: "span",
    properties: { className: [className] },
    children: [{ type: "text", value }]
  };
}

function parseCodeFilename(meta: string): string {
  return meta.match(/(?:title|filename)="([^"]+)"/)?.[1] || "";
}

function mermaidBlock(source: string, filename: string, index: number): AnyNode {
  return {
    type: "element",
    tagName: "div",
    properties: { className: ["mermaid-block"], dataMermaidId: `diagram-${index}` },
    children: [
      filenameBar("mermaid", filename || "diagram"),
      {
        type: "element",
        tagName: "div",
        properties: { className: ["mermaid-render"], role: "img" },
        children: []
      },
      {
        type: "element",
        tagName: "pre",
        properties: { className: ["mermaid-source"] },
        children: [
          {
            type: "element",
            tagName: "code",
            properties: { className: ["language-mermaid"] },
            children: [{ type: "text", value: source }]
          }
        ]
      }
    ]
  };
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

function normalizeCodeLanguage(lang: string): ShikiLanguage | "" {
  const normalized = languageAliases[lang.toLowerCase()] ?? lang.toLowerCase();
  return shikiLanguageSet.has(normalized) ? normalized as ShikiLanguage : "";
}

function isMermaidLanguage(lang: string): boolean {
  return lang.toLowerCase() === "mermaid";
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
