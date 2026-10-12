import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

// Consume hook JSON input so the handler remains compatible with Claude Code command hooks.
let input = "";
for await (const chunk of process.stdin) input += chunk;
if (input.trim()) JSON.parse(input);

const tests = (await readdir("tests"))
  .filter((name) => name.endsWith(".test.ts"))
  .sort()
  .map((name) => join("tests", name));

const result = spawnSync(process.execPath, ["--experimental-strip-types", "--test", ...tests], {
  cwd: process.cwd(),
  stdio: "inherit",
});
if (result.error) throw result.error;
process.exit(result.status ?? 1);
