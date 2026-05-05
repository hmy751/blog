import {
  nextArgs,
  previewRoot,
  runNode,
  syncSystemPreviewAssets,
  systemDevDistDirName,
  valueAfter
} from "./system-preview-utils.mjs";

const host = valueAfter("--host") || process.env.HOST || "127.0.0.1";
const port = valueAfter("--port") || process.env.PORT || "4322";

await syncSystemPreviewAssets();
await runNode(nextArgs("dev", ["-H", host, "-p", port]), {
  cwd: previewRoot,
  env: {
    SYSTEM_PREVIEW_DIST_DIR: systemDevDistDirName
  }
});
