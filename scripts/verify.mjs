import { access, readdir } from "node:fs/promises";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { cwd: process.cwd(), stdio: "inherit", ...options });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

async function exists(path) {
  try { await access(path); return true; } catch { return false; }
}

const testFiles = (await readdir("tests"))
  .filter((name) => name.endsWith(".test.ts"))
  .sort()
  .map((name) => join("tests", name));

if (testFiles.length === 0) throw new Error("Aucun fichier *.test.ts trouvé dans tests/");

if (await exists("scripts/validate-static.mjs")) {
  run(process.execPath, ["scripts/validate-static.mjs"]);
}

run(process.execPath, ["--experimental-strip-types", "--test", ...testFiles]);

// Read-only on purpose: committed evidence is regenerated only by `npm run evidence:tck-123`.
console.log("verification complète : PASS");
