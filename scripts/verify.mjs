import { access, mkdir, open, readdir } from "node:fs/promises";
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

if (await exists("scripts/json-test-reporter.mjs") && await exists("evidence/TCK-123")) {
  await mkdir("evidence/TCK-123", { recursive: true });
  const output = await open("evidence/TCK-123/tests.json", "w");
  try {
    run(process.execPath, [
      "--experimental-strip-types", "--test",
      "--test-reporter=./scripts/json-test-reporter.mjs",
      ...testFiles,
    ], { stdio: ["inherit", output.fd, "inherit"] });
  } finally { await output.close(); }
}

console.log("verification complète : PASS");
