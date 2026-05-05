"use client";

import { useEffect } from "react";

type MermaidApi = typeof import("mermaid").default;

let mermaidPromise: Promise<MermaidApi> | undefined;

export function MermaidRuntime() {
  useEffect(() => {
    let cancelled = false;

    async function renderDiagrams() {
      const blocks = Array.from(document.querySelectorAll<HTMLElement>(".mermaid-block:not([data-mermaid-state])"));
      if (!blocks.length) return;

      blocks.forEach((block) => {
        block.dataset.mermaidState = "queued";
      });

      const mermaid = await loadMermaid();
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        theme: "base",
        themeVariables: mermaidThemeVariables()
      });

      for (const [index, block] of blocks.entries()) {
        const source = block.querySelector<HTMLElement>(".mermaid-source code")?.textContent?.trim();
        const target = block.querySelector<HTMLElement>(".mermaid-render");
        if (!source || !target) continue;

        block.dataset.mermaidState = "rendering";

        try {
          const renderId = `blog-mermaid-${hashString(source)}-${index}`;
          const { svg } = await mermaid.render(renderId, source);
          if (cancelled) return;

          target.innerHTML = svg;
          block.dataset.mermaidState = "rendered";
        } catch {
          if (cancelled) return;
          target.replaceChildren();
          block.dataset.mermaidState = "error";
        }
      }
    }

    renderDiagrams();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}

function loadMermaid(): Promise<MermaidApi> {
  mermaidPromise ??= import("mermaid").then((module) => module.default);
  return mermaidPromise;
}

function mermaidThemeVariables() {
  const isDark = document.documentElement.dataset.theme === "dark";

  if (isDark) {
    return {
      background: "transparent",
      fontFamily: "var(--sans)",
      lineColor: "#908D80",
      mainBkg: "#1C1C16",
      noteBkgColor: "#1C1C16",
      noteTextColor: "#D6D3C6",
      primaryBorderColor: "rgba(239, 238, 230, 0.16)",
      primaryColor: "#1C1C16",
      primaryTextColor: "#EFEEE6",
      secondaryColor: "#24241D",
      tertiaryColor: "#14140F"
    };
  }

  return {
    background: "transparent",
    fontFamily: "var(--sans)",
    lineColor: "#9A978C",
    mainBkg: "#F3F0E8",
    noteBkgColor: "#F3F0E8",
    noteTextColor: "#3A3833",
    primaryBorderColor: "rgba(26, 26, 23, 0.16)",
    primaryColor: "#F3F0E8",
    primaryTextColor: "#1A1A17",
    secondaryColor: "#EEF1E5",
    tertiaryColor: "#F7F5EF"
  };
}

function hashString(value: string): string {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = Math.imul(31, hash) + value.charCodeAt(index) | 0;
  }

  return Math.abs(hash).toString(36);
}
