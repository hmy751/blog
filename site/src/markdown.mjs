export function markdownToHtml(markdown, options = {}) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html = [];
  let paragraph = [];
  let list = null;
  let firstParagraph = options.leadFirstParagraph ?? false;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    const text = paragraph.join(" ").trim();
    const className = firstParagraph ? " class=\"lead\"" : "";
    html.push(`<p${className}>${inline(text)}</p>`);
    paragraph = [];
    firstParagraph = false;
  };

  const closeList = () => {
    if (!list) return;
    html.push(`</${list.type}>`);
    list = null;
  };

  const pushListItem = (type, itemHtml, className = "") => {
    flushParagraph();
    if (!list || list.type !== type || list.className !== className) {
      closeList();
      html.push(`<${type}${className ? ` class="${className}"` : ""}>`);
      list = { type, className };
    }
    html.push(itemHtml);
  };

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      closeList();
      continue;
    }

    const fence = trimmed.match(/^```([A-Za-z0-9_-]+)?(?:\s+(.*))?$/);
    if (fence) {
      flushParagraph();
      closeList();
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
      closeList();
      html.push("<hr>");
      continue;
    }

    if (isTableStart(lines, i)) {
      flushParagraph();
      closeList();
      const tableLines = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i]);
        i += 1;
      }
      i -= 1;
      html.push(table(tableLines));
      continue;
    }

    if (trimmed.startsWith(">")) {
      flushParagraph();
      closeList();
      const quoteLines = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ""));
        i += 1;
      }
      i -= 1;
      html.push(blockquote(quoteLines));
      continue;
    }

    const heading = trimmed.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      closeList();
      const level = heading[1].length;
      const text = heading[2].trim();
      html.push(`<h${level} id="${slugify(text)}">${inline(text)}</h${level}>`);
      continue;
    }

    const task = trimmed.match(/^[-*]\s+\[([ xX])\]\s+(.+)$/);
    if (task) {
      const checked = task[1].toLowerCase() === "x";
      pushListItem(
        "ul",
        `<li class="task-list-item${checked ? " checked" : ""}"><input type="checkbox"${checked ? " checked" : ""} disabled> ${inline(task[2])}</li>`,
        "task contains-task-list"
      );
      continue;
    }

    const unordered = trimmed.match(/^[-*+]\s+(.+)$/);
    if (unordered) {
      pushListItem("ul", `<li>${inline(unordered[1])}</li>`);
      continue;
    }

    const ordered = trimmed.match(/^\d+\.\s+(.+)$/);
    if (ordered) {
      pushListItem("ol", `<li>${inline(ordered[1])}</li>`);
      continue;
    }

    const image = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (image) {
      flushParagraph();
      closeList();
      html.push(`<figure><img src="${escapeAttribute(image[2])}" alt="${escapeAttribute(image[1])}"></figure>`);
      continue;
    }

    closeList();
    paragraph.push(trimmed);
  }

  flushParagraph();
  closeList();

  return html.join("\n");
}

export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;");
}

function inline(value) {
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
        .replace(/\[\^([^\]]+)\]/g, `<sup class="footnote-ref">$1</sup>`);
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

function blockquote(lines) {
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

  return `<blockquote>${lines.map((line) => inline(line)).join("<br>")}</blockquote>`;
}

function isTableStart(lines, index) {
  return (
    lines[index]?.trim().startsWith("|") &&
    /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(lines[index + 1]?.trim() || "")
  );
}

function table(lines) {
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
    `<thead><tr>${header.map((cell) => `<th>${inline(cell)}</th>`).join("")}</tr></thead>`,
    `<tbody>${body.map((row) => `<tr>${row.map((cell) => `<td>${inline(cell)}</td>`).join("")}</tr>`).join("")}</tbody>`,
    "</table></div>"
  ].join("\n");
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
