import { cp, rm } from "node:fs/promises";
import path from "node:path";
import {
  nextArgs,
  previewRoot,
  runNode,
  siteRoot,
  systemBuildDistDirName,
  systemExportDir,
  syncSystemPreviewAssets,
  systemOutDir
} from "./system-preview-utils.mjs";

await syncSystemPreviewAssets();
await rm(systemExportDir, { recursive: true, force: true });
await runNode(nextArgs("build"), {
  cwd: previewRoot,
  env: {
    SYSTEM_PREVIEW_DIST_DIR: systemBuildDistDirName
  }
});
await rm(systemOutDir, { recursive: true, force: true });
await cp(systemExportDir, systemOutDir, { recursive: true });

console.log(`Built Next system preview to ${path.relative(siteRoot, systemOutDir)}`);
