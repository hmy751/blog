import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/nextjs-vite";

const storybookDir = path.dirname(fileURLToPath(import.meta.url));
const productionCssContractId = "virtual:production-contract.css";
const productionCssModules = [
  "../src/components/shell/Shell.module.css",
  "../src/components/article-row/ArticleRow.module.css",
  "../src/components/post/Post.module.css",
  "../src/app/home.module.css",
  "../src/app/page-common.module.css",
  "../src/app/note-about.module.css"
];

function readProductionCssContract() {
  return productionCssModules
    .map((file) => {
      const source = fs.readFileSync(path.resolve(storybookDir, file), "utf8");

      return `/* ${file} */\n${stripCssModuleGlobal(source)}`;
    })
    .join("\n\n");
}

function stripCssModuleGlobal(source: string) {
  const marker = ":global(";
  let output = "";
  let cursor = 0;

  while (cursor < source.length) {
    const start = source.indexOf(marker, cursor);

    if (start === -1) {
      output += source.slice(cursor);
      break;
    }

    output += source.slice(cursor, start);

    let depth = 1;
    let end = start + marker.length;

    for (; end < source.length; end += 1) {
      const char = source[end];

      if (char === "(") {
        depth += 1;
      } else if (char === ")") {
        depth -= 1;

        if (depth === 0) {
          break;
        }
      }
    }

    if (depth !== 0) {
      output += source.slice(start);
      break;
    }

    output += source.slice(start + marker.length, end);
    cursor = end + 1;
  }

  return output;
}

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx|mdx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {}
  },
  staticDirs: [
    {
      from: "../archive/design-system/fixtures",
      to: "/archive/design-system/fixtures"
    }
  ],
  viteFinal: async (config) => {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...(Array.isArray(config.resolve.alias) ? {} : config.resolve.alias),
      "@": path.resolve(storybookDir, "../src")
    };
    config.plugins = [
      ...(config.plugins ?? []),
      {
        name: "blog-production-css-contract",
        resolveId(id) {
          return id === productionCssContractId ? productionCssContractId : null;
        },
        load(id) {
          return id === productionCssContractId ? readProductionCssContract() : null;
        }
      }
    ];
    return config;
  }
};

export default config;
