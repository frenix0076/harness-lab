import { mkdir, open, readdir } from "node:fs/promises";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

// Explicit, opt-in regeneration of the committed TCK-123 test evidence.
const testFiles = (await readdir("tests"))
  .filter((name) => name.endsWith(".test.ts"))
  .sort()
  .map((name) => join("tests", name));

await mkdir("evidence/TCK-123", { recursive: true });
const output = await open("evidence/TCK-123/tests.json", "w");
let result;
try {
  result = spawnSync(process.execPath, [
    "--experimental-strip-types", "--test",
    "--test-reporter=./scripts/json-test-reporter.mjs",
    ...testFiles,
  ], { stdio: ["inherit", output.fd, "inherit"] });
} finally { await output.close(); }
if (result.error) throw result.error;
console.log(`evidence/TCK-123/tests.json régénéré (exit ${result.status})`);
process.exit(result.status ?? 1);
