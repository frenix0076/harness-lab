import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

// Consume hook JSON input so the handler remains compatible with Claude Code command hooks.
let input = "";
for await (const chunk of process.stdin) input += chunk;
if (input.trim()) JSON.parse(input);

// Run from the project root, whatever the session's current directory is.
const root = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();
const tests = (await readdir(join(root, "tests")))
  .filter((name) => name.endsWith(".test.ts"))
  .sort()
  .map((name) => join("tests", name));

const result = spawnSync(process.execPath, ["--experimental-strip-types", "--test", "--test-reporter=dot", ...tests], {
  cwd: root,
  encoding: "utf8",
});
if (result.error) throw result.error;
if (result.status !== 0) {
  // PostToolUse: only exit code 2 feeds stderr back to Claude; exit 1 is shown to the user only.
  process.stderr.write(`Tests en échec après cette édition :\n${(result.stdout + result.stderr).slice(-4000)}`);
  process.exit(2);
}
