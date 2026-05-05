export function markdownToHtml(markdown, options = {}) {
  const context = createMarkdownContext(markdown);
  const lines = context.body.split("\n");
  const html = [];
  let paragraph = [];
  const listStack = [];
  let firstParagraph = options.leadFirstParagraph ?? false;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    const text = paragraph.join(" ").trim();
    const className = firstParagraph ? " class=\"lead\"" : "";
    html.push(`<p${className}>${inline(text, context)}</p>`);
    paragraph = [];
    firstParagraph = false;
  };

  const closeLists = (targetDepth = 0) => {
    while (listStack.length > targetDepth) {
      const list = listStack.pop();
      if (list.itemOpen) {
        html.push("</li>");
      }
      html.push(`</${list.type}>`);
    }
  };

  const pushListItem = ({ type, className = "", itemClassName = "", indent, body }) => {
    flushParagraph();

    while (listStack.length && listStack.at(-1).indent > indent) {
      closeLists(listStack.length - 1);
    }

    let list = listStack.at(-1);
    if (list && list.indent === indent && (list.type !== type || list.className !== className)) {
      closeLists(listStack.length - 1);
      list = listStack.at(-1);
    }

    if (!list || list.indent < indent || list.type !== type || list.className !== className) {
      html.push(`<${type}${className ? ` class="${className}"` : ""}>`);
      list = { type, className, indent, itemOpen: false };
      listStack.push(list);
    } else if (list.itemOpen) {
      html.push("</li>");
      list.itemOpen = false;
    }

    html.push(`<li${itemClassName ? ` class="${itemClassName}"` : ""}>${body}`);
    list.itemOpen = true;
  };

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      closeLists();
      continue;
    }

    const fence = trimmed.match(/^```([A-Za-z0-9_-]+)?(?:\s+(.*))?$/);
    if (fence) {
      flushParagraph();
      closeLists();
      const lang = fence[1] || "";
      const meta = fence[2] || "";
      const codeLines = [];
      i += 1;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i += 1;
      }
      html.push(codeBlock(codeLines.join("\n"), lang, meta));
      continue;
    }

    if (trimmed === "---" || trimmed === "***") {
      flushParagraph();
      closeLists();
      html.push("<hr>");
      continue;
    }

    if (isTableStart(lines, i)) {
      flushParagraph();
      closeLists();
      const tableLines = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i]);
        i += 1;
      }
      i -= 1;
      html.push(table(tableLines, context));
      continue;
    }

    if (trimmed.startsWith(">")) {
      flushParagraph();
      closeLists();
      const quoteLines = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ""));
        i += 1;
      }
      i -= 1;
      html.push(blockquote(quoteLines, context));
      continue;
    }

    const heading = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      closeLists();
      const level = heading[1].length;
      const text = heading[2].trim();
      html.push(`<h${level} id="${slugify(text)}">${inline(text, context)}</h${level}>`);
      continue;
    }

    const task = line.match(/^(\s*)[-*]\s+\[([ xX])\]\s+(.+)$/);
    if (task) {
      const checked = task[2].toLowerCase() === "x";
      pushListItem(
        {
          type: "ul",
          className: "task",
          itemClassName: checked ? "done" : "",
          indent: task[1].length,
          body: inline(task[3], context)
        }
      );
      continue;
    }

    const unordered = line.match(/^(\s*)[-*+]\s+(.+)$/);
    if (unordered) {
      pushListItem({
        type: "ul",
        indent: unordered[1].length,
        body: inline(unordered[2], context)
      });
      continue;
    }

    const ordered = line.match(/^(\s*)\d+\.\s+(.+)$/);
    if (ordered) {
      pushListItem({
        type: "ol",
        indent: ordered[1].length,
        body: inline(ordered[2], context)
      });
      continue;
    }

    const image = trimmed.match(/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]+")?\)$/);
    if (image) {
      flushParagraph();
      closeLists();
      const caption = findFigureCaption(lines, i + 1);
      if (caption) {
        i = caption.index;
      }
      html.push(figure(image[2], image[1], caption?.text, context));
      continue;
    }

    closeLists();
    paragraph.push(trimmed);
  }

  flushParagraph();
  closeLists();
  const footnotes = renderFootnotes(context);
  if (footnotes) {
    html.push(footnotes);
  }

  return html.join("\n");
}

export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;");
}

function inline(value, context) {
  const parts = String(value).split(/(`[^`]+`)/g);
  return parts
    .map((part) => {
      if (part.startsWith("`") && part.endsWith("`")) {
        return `<code>${escapeHtml(part.slice(1, -1))}</code>`;
      }

      return escapeHtml(part)
        .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, `<img src="$2" alt="$1">`)
        .replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+"[^"]+")?\)/g, `<a class="link" href="$2">$1</a>`)
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        .replace(/\*([^*]+)\*/g, "<em>$1</em>")
        .replace(/==([^=]+)==/g, "<mark>$1</mark>")
        .replace(/&lt;kbd&gt;([\s\S]*?)&lt;\/kbd&gt;/g, "<kbd>$1</kbd>")
        .replace(/\[\^([^\]]+)\]/g, (_match, label) => footnoteRef(label, context));
    })
    .join("");
}

function codeBlock(code, lang, meta) {
  const title = meta.match(/title="([^"]+)"/)?.[1] || meta.match(/filename="([^"]+)"/)?.[1];
  const escapedCode = escapeHtml(code);

  if (!title && !lang) {
    return `<pre><code>${escapedCode}</code></pre>`;
  }

  const label = title || lang;
  const filename = title && lang
    ? `<span class="lang">${escapeHtml(lang)}</span><span>${escapeHtml(title)}</span>`
    : `<span>${escapeHtml(label)}</span>`;
  return [
    "<div class=\"code-block\">",
    `<div class="filename">${filename}</div>`,
    `<pre><code>${escapedCode}</code></pre>`,
    "</div>"
  ].join("\n");
}

function blockquote(lines, context) {
  const first = lines[0]?.trim();
  const callout = first?.match(/^\[!(NOTE|INFO|TIP|WARNING|WARN)\]\s*$/i);

  if (callout) {
    const isWarn = /WARN|WARNING/i.test(callout[1]);
    const body = lines.slice(1).join("\n\n").trim();
    return [
      `<div class="callout${isWarn ? " warn" : ""}">`,
      `<div class="ico">${isWarn ? "!" : "i"}</div>`,
      `<div>${markdownToHtml(body)}</div>`,
      "</div>"
    ].join("\n");
  }

  return `<blockquote>${lines.map((line) => inline(line, context)).join("<br>")}</blockquote>`;
}

function isTableStart(lines, index) {
  return (
    lines[index]?.trim().startsWith("|") &&
    /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(lines[index + 1]?.trim() || "")
  );
}

function table(lines, context) {
  const rows = lines.map((line) =>
    line
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((cell) => cell.trim())
  );
  const header = rows[0] || [];
  const body = rows.slice(2);

  return [
    "<div class=\"table-scroll\"><table>",
    `<thead><tr>${header.map((cell) => `<th>${inline(cell, context)}</th>`).join("")}</tr></thead>`,
    `<tbody>${body.map((row) => `<tr>${row.map((cell) => `<td>${inline(cell, context)}</td>`).join("")}</tr>`).join("")}</tbody>`,
    "</table></div>"
  ].join("\n");
}

function createMarkdownContext(markdown) {
  const lines = String(markdown).replace(/\\`/g, "`").replace(/\r\n/g, "\n").split("\n");
  const bodyLines = [];
  const footnotes = new Map();

  for (let i = 0; i < lines.length; i += 1) {
    const definition = lines[i].match(/^\[\^([^\]]+)\]:\s*(.*)$/);
    if (!definition) {
      bodyLines.push(lines[i]);
      continue;
    }

    const [, label, firstLine] = definition;
    const noteLines = [firstLine];
    i += 1;
    while (i < lines.length && (!lines[i].trim() || /^( {2,}|\t)/.test(lines[i]))) {
      if (lines[i].trim()) {
        noteLines.push(lines[i].replace(/^( {2,}|\t)/, ""));
      }
      i += 1;
    }
    i -= 1;
    footnotes.set(label, noteLines.join(" ").trim());
  }

  return {
    body: bodyLines.join("\n"),
    footnotes,
    refs: [],
    refNumbers: new Map()
  };
}

function footnoteRef(label, context) {
  if (!context) {
    return `<sup class="footnote-ref">${escapeHtml(label)}</sup>`;
  }

  if (!context.refNumbers.has(label)) {
    context.refNumbers.set(label, context.refs.length + 1);
    context.refs.push(label);
  }

  return `<sup class="fn-ref">${context.refNumbers.get(label)}</sup>`;
}

function renderFootnotes(context) {
  if (!context.footnotes.size) {
    return "";
  }

  const labels = context.refs.length ? context.refs : [...context.footnotes.keys()];
  const items = labels
    .filter((label) => context.footnotes.has(label))
    .map((label) => `<li>${inline(context.footnotes.get(label), context)}</li>`);

  if (!items.length) {
    return "";
  }

  return `<div class="footnotes"><ol>${items.join("")}</ol></div>`;
}

function findFigureCaption(lines, startIndex) {
  let index = startIndex;
  while (index < lines.length && !lines[index].trim()) {
    index += 1;
  }

  const text = lines[index]?.trim();
  if (!text || !/^(그림\s*\d*\.|Figure\s*\d*\.|Fig\.\s*\d*\.|Caption:)/i.test(text)) {
    return null;
  }

  return { index, text: text.replace(/^Caption:\s*/i, "") };
}

function figure(src, alt, caption, context) {
  const captionHtml = caption ? `\n<figcaption>${inline(caption, context)}</figcaption>` : "";
  return `<figure><img src="${escapeAttribute(src)}" alt="${escapeAttribute(alt)}">${captionHtml}</figure>`;
}

function slugify(value) {
  return encodeURIComponent(
    String(value)
      .toLowerCase()
      .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
      .replace(/^-|-$/g, "")
  );
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("'", "&#39;");
}
